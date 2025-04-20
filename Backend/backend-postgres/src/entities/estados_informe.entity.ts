import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity({ name: 'estados_informe' })
export class EstadosInforme {
  @PrimaryColumn({ type: 'varchar', length: 5 })
  id: string;

  @Column()
  descripcion: string;

  @PrimaryColumn({
    type: 'timestamp',
    default: () => '2999-12-31 00:00:00',
  })
  fhasta: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  fdesde: Date;
}
