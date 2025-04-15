import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Rol } from './../entities/roles.entity';
import { Repository } from 'typeorm';

@Injectable()
export class RolesService {
  constructor(
    @InjectRepository(Rol)
    private rolRepository: Repository<Rol>,
  ) {}

  findAll(): Promise<Rol[]> {
    return this.rolRepository.find();
  }

  findById(id: number) {
    return this.rolRepository.findOneBy({ id: id });
  }

  create(nombre: string) {
    const rol = this.rolRepository.create({ nombre });
    return this.rolRepository.save(rol);
  }
}
