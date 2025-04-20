import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InformesController } from 'src/controllers/informes.controller';
import { Informes } from 'src/entities/informes.entity';
import { InformesService } from 'src/services/informes.service';

@Module({
  imports: [TypeOrmModule.forFeature([Informes])],
  exports: [InformesService],
  controllers: [InformesController],
  providers: [InformesService],
})
export class InformesModule {}
