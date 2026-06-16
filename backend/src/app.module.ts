import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';



import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { EmployeesModule } from './employees/employees.module';
import { VacationsModule } from './vacations/vacations.module';
import { PayrollModule } from './payroll/payroll.module';
import { AttendancesModule } from './attendances/attendances.module';
import { PermissionsModule } from './permissions/permissions.module';
import { AccessLogModule } from './access-log/access-log.module';



@Module({
  imports: [
    PayrollModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    TypeOrmModule.forRoot({

      type: 'mysql',

      host: process.env.DB_HOST,

      port: Number(process.env.DB_PORT),

      username: process.env.DB_USER,

      password: process.env.DB_PASSWORD,

      database: process.env.DB_NAME,

      autoLoadEntities: true,

      synchronize: true,

    }),

    UsersModule,

    AuthModule,

    EmployeesModule,

    VacationsModule,

    PayrollModule,

    AttendancesModule,

    PermissionsModule,

    AccessLogModule,

   
    

  ],

  controllers: [AppController],

  providers: [AppService],

})
export class AppModule {}