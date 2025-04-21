import { IsString, IsDateString, IsOptional } from 'class-validator';

export class CreateInformeDto {
  @IsString()
  usuario: string;

  @IsOptional()
  contenido: Buffer;

  @IsString()
  estado: string;

  @IsDateString()
  periodo: Date;

  @IsDateString()
  fentrega: Date;
}
