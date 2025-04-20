import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RolesModule } from './modules/roles.module';
import { DepartamentosModule } from './modules/departamentos.module';
import { UsuariosModule } from './modules/usuarios.module';
import { EstadosInformeModule } from './modules/estados-informe.module';
import ormConfig from './ormconfig';
import { AuthModule } from './modules/auth.module';
import { ConfigModule } from '@nestjs/config';
import { InformesModule } from './modules/informes.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // hace que esté disponible en todos los módulos
    }),
    TypeOrmModule.forRoot(ormConfig),
    RolesModule,
    DepartamentosModule,
    UsuariosModule,
    EstadosInformeModule,
    AuthModule,
    InformesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
