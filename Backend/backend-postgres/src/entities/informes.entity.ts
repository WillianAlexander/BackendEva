import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity({ name: 'informes' })
export class Informes {
  @PrimaryColumn({ type: 'varchar', length: 30 })
  usuario_entrega: string;

  @PrimaryColumn({ type: 'date', nullable: false })
  periodo: Date;

  @Column({ type: 'timestamp' })
  fecha_entrega: Date;

  @Column({ type: 'bytea', nullable: false })
  contenido: Buffer;

  @Column({ type: 'varchar', nullable: false })
  estado_id: string;

  @PrimaryColumn({
    type: 'timestamp',
    default: () => '2999-12-31 00:00:00',
  })
  fhasta: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  fdesde: Date;

  @PrimaryColumn({ type: 'int' })
  version: number;
}
