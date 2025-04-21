import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateInformeDto } from 'src/dto/create-informe.dto';
import { UpdateInformeDto } from 'src/dto/update-informe.dto';
import { Informes } from 'src/entities/informes.entity';
import { Repository } from 'typeorm';

@Injectable()
export class InformesService {
  constructor(
    @InjectRepository(Informes)
    private informesRepository: Repository<Informes>,
  ) {}

  findAll() {
    return this.informesRepository.find();
  }

  findListBy(usuario: string, periodo?: Date) {
    const whereCondition: any = {
      usuario_entrega: usuario,
      fhasta: new Date('2999-12-31 00:00:00'),
    };

    if (periodo) {
      whereCondition.periodo = periodo;
    }

    return this.informesRepository.findBy(whereCondition);
  }

  findByPeriod(usuario: string, fentrega: Date) {
    return this.informesRepository.findBy({
      usuario_entrega: usuario,
      fecha_entrega: fentrega,
      fhasta: new Date('2999-12-31 00:00:00'),
    });
  }

  create(dto: CreateInformeDto) {
    const informe = this.informesRepository.create({
      usuario_entrega: dto.usuario,
      contenido: dto.contenido,
      estado_id: dto.estado,
      periodo: dto.periodo,
      fecha_entrega: dto.fentrega,
    });
    return this.informesRepository.save(informe);
  }

  async update(
    usuarioId: string,
    periodo: Date,
    nuevosDatos: UpdateInformeDto,
  ) {
    const now = new Date();

    // 1. Buscar el registro activo
    const informe = await this.informesRepository.findOne({
      where: {
        usuario_entrega: usuarioId,
        periodo: periodo,
        fhasta: new Date('2999-12-31 00:00:00'),
      },
    });

    if (!informe) {
      throw new NotFoundException('Informe no encontrado');
    }

    // 2. Caducar el registro actual
    await this.informesRepository.update(
      { usuario_entrega: usuarioId, fhasta: informe.fhasta },
      { fhasta: now },
    );

    // 3. Insertar uno nuevo con los datos actualizados
    const nuevoRegistro = this.informesRepository.create({
      ...informe,
      ...nuevosDatos,
      fdesde: now,
      fhasta: '2999-12-31 00:00:00',
      version: informe.version + 1,
    });

    await this.informesRepository.save(nuevoRegistro);

    return nuevoRegistro;
  }
}
