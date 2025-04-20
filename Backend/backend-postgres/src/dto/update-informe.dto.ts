import { IsOptional, IsString, IsDateString } from 'class-validator';

export class UpdateInformeDto {
  @IsOptional()
  @IsString()
  contenido?: Buffer;

  @IsOptional()
  @IsString()
  estado?: string;

  @IsOptional()
  @IsDateString()
  periodo?: string;

  @IsOptional()
  @IsDateString()
  fentrega?: string;
}
