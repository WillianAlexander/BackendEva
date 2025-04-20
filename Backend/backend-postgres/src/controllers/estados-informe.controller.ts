import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { EstadosInforme } from 'src/entities/estados_informe.entity';
import { EstadosInformeService } from 'src/services/estados-informe.service';

@Controller('estados_informe')
export class EstadosInformeController {
  constructor(private estadosInformeService: EstadosInformeService) {}

  @Get()
  findAll() {
    return this.estadosInformeService.findAll();
  }

  @Get(':id')
  findById(@Param('id') id: string) {
    return this.estadosInformeService.findById(id);
  }

  @Post()
  create(@Body() estado: EstadosInforme) {
    return this.estadosInformeService.create(estado.id, estado.descripcion);
  }
}
