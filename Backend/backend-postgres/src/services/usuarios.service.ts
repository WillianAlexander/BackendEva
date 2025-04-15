import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Usuario } from './../entities/usuarios.entity';
import { CreateUsuarioDto } from './../dto/create-usuario.dto';
import { UpdateUsuarioDto } from './../dto/update-usuario.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsuariosService {
  constructor(
    @InjectRepository(Usuario)
    private readonly usuariosRepository: Repository<Usuario>,
  ) {}

  async create(dto: CreateUsuarioDto) {
    const nuevo = this.usuariosRepository.create(dto);
    nuevo.password = await bcrypt.hash(dto.password, 10);
    return this.usuariosRepository.save(nuevo);
  }

  findAll() {
    return this.usuariosRepository.find();
  }

  findOne(usuario: string) {
    return this.usuariosRepository.findOneBy({ usuario });
  }

  remove(usuario: string) {
    return this.usuariosRepository.delete({ usuario });
  }

  async update(usuarioId: string, nuevosDatos: UpdateUsuarioDto) {
    const now = new Date();

    // 1. Buscar el registro activo
    const usuarioActual = await this.usuariosRepository.findOne({
      where: { usuario: usuarioId, fhasta: new Date('2999-12-31 00:00:00') },
    });

    if (!usuarioActual) {
      throw new NotFoundException('Usuario no encontrado');
    }

    // 2. Caducar el registro actual
    await this.usuariosRepository.update(
      { usuario: usuarioId, fhasta: usuarioActual.fhasta },
      { fhasta: now },
    );

    // 3. Insertar uno nuevo con los datos actualizados
    const nuevoRegistro = this.usuariosRepository.create({
      ...usuarioActual,
      ...nuevosDatos,
      fdesde: now,
      fhasta: '2999-12-31 00:00:00',
      version: usuarioActual.version + 1,
    });

    await this.usuariosRepository.save(nuevoRegistro);

    return nuevoRegistro;
  }
}
