import { Module } from '@nestjs/common';
import { CreateCar } from './application/create-car';
import { DeleteCar } from './application/delete-car';
import { GetCar } from './application/get-car';
import { ListCars } from './application/list-cars';
import { UpdateCar } from './application/update-car';
import { CARS_REPOSITORY } from './application/cars.repository';
import { CarsController } from './infrastructure/controllers/cars.controller';
import { InMemoryCarsRepository } from './infrastructure/repositories/in-memory-cars.repository';

@Module({
    controllers: [CarsController],
    providers: [
        CreateCar,
        DeleteCar,
        GetCar,
        ListCars,
        UpdateCar,
        {
            provide: CARS_REPOSITORY,
            useClass: InMemoryCarsRepository,
        },
    ],
    exports: [CreateCar, DeleteCar, GetCar, ListCars, UpdateCar],
})
export class CarsModule { }
