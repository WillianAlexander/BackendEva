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
  create(
    @Body() dto: CreateInformeDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    dto.contenido = file.buffer;
    return this.informeService.create(dto);
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
