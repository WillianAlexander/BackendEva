import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { RolesService } from './../services/roles.service';

@Controller('roles')
export class RolesController {
  constructor(private rolesService: RolesService) {}

  @Get()
  findAll() {
    return this.rolesService.findAll();
  }

  @Get(':id')
  findRole(@Param('id') id: number) {
    return this.rolesService.findById(id);
  }

  @Post()
  create(@Body('nombre') nombre: string) {
    return this.rolesService.create(nombre);
  }
}
