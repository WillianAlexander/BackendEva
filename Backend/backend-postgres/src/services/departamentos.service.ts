import { Get, Injectable, Param, Post } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Departamento } from 'src/entities/departamentos.entity';
import { Repository } from 'typeorm';

@Injectable()
export class DepartamentosService {
  constructor(
    @InjectRepository(Departamento)
    private departamentoRepository: Repository<Departamento>,
  ) {}

  findAll() {
    return this.departamentoRepository.find();
  }

  findById(@Param('id') id: number) {
    return this.departamentoRepository.findOneBy({ id: id });
  }

  create(nombre: string) {
    const departamento = this.departamentoRepository.create({ nombre });
    return this.departamentoRepository.save(departamento);
  }
}
