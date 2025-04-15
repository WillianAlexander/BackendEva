import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EstadosInforme } from 'src/entities/estados_informe.entity';
import { Repository } from 'typeorm';

@Injectable()
export class EstadosInformeService {
  constructor(
    @InjectRepository(EstadosInforme)
    private estadosInformeRepository: Repository<EstadosInforme>,
  ) {}

  findAll() {
    return this.estadosInformeRepository.find();
  }

  findById(id: string, fhasta?: Date) {
    return this.estadosInformeRepository.findOneBy({ id: id, fhasta: fhasta });
  }

  create(id: string, descripcion: string) {
    const estado = this.estadosInformeRepository.create({
      id: id,
      descripcion: descripcion,
    });

    return this.estadosInformeRepository.save(estado);
  }
}
