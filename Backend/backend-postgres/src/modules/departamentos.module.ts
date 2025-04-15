import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DepartamentosController } from 'src/controllers/departamentos.controller';
import { Departamento } from 'src/entities/departamentos.entity';
import { DepartamentosService } from 'src/services/departamentos.service';

@Module({
  imports: [TypeOrmModule.forFeature([Departamento])],
  controllers: [DepartamentosController],
  providers: [DepartamentosService],
  exports: [DepartamentosService],
})
export class DepartamentosModule {}
