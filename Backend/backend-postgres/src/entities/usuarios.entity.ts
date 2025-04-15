import { Entity, Column, PrimaryColumn, VersionColumn } from 'typeorm';

@Entity({ name: 'usuarios' })
export class Usuario {
  @PrimaryColumn()
  usuario: string;

  @Column()
  nombres: string;

  @Column()
  apellidos: string;

  @Column()
  identificacion: string;

  @Column()
  correo: string;

  @Column()
  password: string;

  @Column({ nullable: true })
  rol_id: number;

  @Column({ nullable: true })
  departamento_id: number;

  @Column({ default: true })
  activo: boolean;

  @PrimaryColumn({ type: 'timestamp', default: () => '2999-12-31 00:00:00' })
  fhasta: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  fdesde: Date;

  @Column()
  version: number;
}
