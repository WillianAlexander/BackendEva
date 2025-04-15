import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { DepartamentosService } from 'src/services/departamentos.service';

@Controller('departamentos')
export class DepartamentosController {
  constructor(private departamentoService: DepartamentosService) {}

  @Get()
  findAll() {
    return this.departamentoService.findAll();
  }

  @Get(':id')
  findById(@Param('id') id: number) {
    return this.departamentoService.findById(id);
  }

  @Post()
  create(@Body('nombre') nombre: string) {
    return this.departamentoService.create(nombre);
  }
}
