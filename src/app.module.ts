import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CarsModule } from './cars/cars.module';
import { BitcoinModule } from './bitcoin/bitcoin.module';
import { HealthModule } from './health/health.module';
import { UsersModule } from './users/users.module';
import { ToysModule } from './toys/toys.module';
import { TasksModule } from './tasks/tasks.module';

@Module({
    imports: [
        ConfigModule.forRoot({ isGlobal: true }),
        TypeOrmModule.forRoot({
            type: 'sqlite',
            database: ':memory:',
            synchronize: true,
            autoLoadEntities: true,
        }),
        HealthModule,
        UsersModule,
        CarsModule,
        ToysModule,
        BitcoinModule,
        TasksModule,
    ],
})
export class AppModule { }
