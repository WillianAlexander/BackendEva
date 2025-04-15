import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EstadosInformeController } from 'src/controllers/estados-informe.controller';
import { EstadosInforme } from 'src/entities/estados_informe.entity';
import { EstadosInformeService } from 'src/services/estados-informe.service';

@Module({
  imports: [TypeOrmModule.forFeature([EstadosInforme])],
  exports: [EstadosInformeService],
  controllers: [EstadosInformeController],
  providers: [EstadosInformeService],
})
export class EstadosInformeModule {}
