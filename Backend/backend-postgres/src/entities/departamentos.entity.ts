import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'departamentos' })
export class Departamento {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 50, unique: true })
  nombre: string;

  @PrimaryColumn({
    type: 'timestamp',
    default: () => '2999-12-31 00:00:00',
  })
  fhasta: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  fdesde: Date;
}
