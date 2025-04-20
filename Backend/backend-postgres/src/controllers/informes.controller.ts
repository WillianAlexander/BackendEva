import {
  Controller,
  Get,
  Post,
  Param,
  Body,
  Query,
  NotFoundException,
  Patch,
  UseInterceptors,
  UploadedFile,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { CreateInformeDto } from 'src/dto/create-informe.dto';
import { UpdateInformeDto } from 'src/dto/update-informe.dto';
import { InformesService } from 'src/services/informes.service';

@Controller('informes')
export class InformesController {
  constructor(private informeService: InformesService) {}

  @Get()
  findAll() {
    return this.informeService.findAll();
  }

  @Get(':usuario')
  async findOne(
    @Param('usuario') usuario: string,
    @Query('periodo') periodo: string,
  ) {
    const informe = await this.informeService.findOne(
      usuario,
      new Date(periodo),
    );
    if (!informe) {
      throw new NotFoundException('Informe no encontrado');
    }
    return informe;
  }

  @Post()
  @UseInterceptors(FileInterceptor('contenido'))
  async create(
    @Body() dto: CreateInformeDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    try {
      dto.contenido = file.buffer;
      return await this.informeService.create(dto);
    } catch (error) {
      if (error.code === '23505') {
        throw new HttpException(
          'Ya existe un informe con los mismos datos.',
          HttpStatus.CONFLICT,
        );
      }
      throw new HttpException(
        'Error al crear el informe.',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Patch(':usuario')
  async update(
    @Param('usuario') usuario: string,
    @Query('periodo') periodo: string,
    @Body() nuevosDatos: UpdateInformeDto,
  ) {
    return this.informeService.update(usuario, new Date(periodo), nuevosDatos);
  }
}
