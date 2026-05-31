import { CreateCar } from '../../application/create-car';
import { DeleteCar } from '../../application/delete-car';
import { GetCar } from '../../application/get-car';
import { ListCars } from '../../application/list-cars';
import { UpdateCar } from '../../application/update-car';
import { CarResponseDto } from '../dtos/car-response.dto';
import { CreateCarDto } from '../dtos/create-car.dto';
import { UpdateCarDto } from '../dtos/update-car.dto';
export declare class CarsController {
    private readonly createCar;
    private readonly deleteCar;
    private readonly getCar;
    private readonly listCars;
    private readonly updateCar;
    constructor(createCar: CreateCar, deleteCar: DeleteCar, getCar: GetCar, listCars: ListCars, updateCar: UpdateCar);
    create(dto: CreateCarDto): Promise<CarResponseDto>;
    findAll(): Promise<CarResponseDto[]>;
    findOne(id: string): Promise<CarResponseDto>;
    update(id: string, dto: UpdateCarDto): Promise<CarResponseDto>;
    remove(id: string): Promise<void>;
    private throwIfNotFound;
}
