import {
    Body,
    Controller,
    Delete,
    Get,
    HttpCode,
    HttpStatus,
    Logger,
    NotFoundException,
    Param,
    Patch,
    Post,
} from '@nestjs/common';
import { ApiBody, ApiNotFoundResponse, ApiOkResponse, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateCar } from '../../application/create-car';
import { DeleteCar } from '../../application/delete-car';
import { GetCar } from '../../application/get-car';
import { ListCars } from '../../application/list-cars';
import { UpdateCar } from '../../application/update-car';
import { CarNotFoundError } from '../../domain/errors/car-not-found.error';
import { CarResponseDto } from '../dtos/car-response.dto';
import { CreateCarDto } from '../dtos/create-car.dto';
import { UpdateCarDto } from '../dtos/update-car.dto';

@ApiTags('cars')
@Controller('cars')
export class CarsController {
    private readonly logger = new Logger(CarsController.name);

    constructor(
        private readonly createCar: CreateCar,
        private readonly deleteCar: DeleteCar,
        private readonly getCar: GetCar,
        private readonly listCars: ListCars,
        private readonly updateCar: UpdateCar,
    ) { }

    @Post()
    @ApiResponse({ status: HttpStatus.CREATED, description: 'Created' })
    @ApiBody({ type: CreateCarDto })
    async create(@Body() dto: CreateCarDto): Promise<CarResponseDto> {
        this.logger.log({ message: 'Creating car', payload: { dto } });
        const car = await this.createCar.call(dto);
        this.logger.log({ message: 'Car created successfully', payload: { carId: car.id } });
        return CarResponseDto.from(car);
    }

    @Get()
    @ApiOkResponse({ status: HttpStatus.OK, description: 'OK' })
    async findAll(): Promise<CarResponseDto[]> {
        this.logger.log({ message: 'Listing all cars' });
        const cars = await this.listCars.call();
        if (cars.length === 0) {
            this.logger.warn({ message: 'No cars found' });
        }
        this.logger.log({ message: 'Listed all cars successfully', count: cars.length });
        return cars.map((car) => CarResponseDto.from(car));
    }

    @Get(':id')
    @ApiOkResponse({ status: HttpStatus.OK, description: 'OK' })
    @ApiNotFoundResponse({ description: 'Car not found' })
    async findOne(@Param('id') id: string): Promise<CarResponseDto> {
        this.logger.log({ message: 'Finding car by ID', payload: { id } });
        try {
            const car = await this.getCar.call(id);
            this.logger.log({ message: 'Car found successfully', payload: { id } });
            return CarResponseDto.from(car);
        } catch (error) {
            if (error instanceof CarNotFoundError) {
                this.logger.warn({ message: 'Car not found', payload: { id } });
            }
            this.throwIfNotFound(error);
            throw error;
        }
    }

    @Patch(':id')
    @ApiOkResponse({ status: HttpStatus.OK, description: 'OK' })
    @ApiNotFoundResponse({ description: 'Car not found' })
    @ApiBody({ type: UpdateCarDto })
    async update(
        @Param('id') id: string,
        @Body() dto: UpdateCarDto,
    ): Promise<CarResponseDto> {
        this.logger.log({ message: 'Updating car', payload: { id, dto } });
        try {
            const car = await this.updateCar.call(id, dto);
            this.logger.log({ message: 'Car updated successfully', payload: { carId: car.id } });
            return CarResponseDto.from(car);
        } catch (error) {
            if (error instanceof CarNotFoundError) {
                this.logger.warn({ message: 'Car not found for update', payload: { id } });
            }
            this.throwIfNotFound(error);
            throw error;
        }
    }

    @Delete(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    @ApiResponse({ status: HttpStatus.NO_CONTENT, description: 'Deleted' })
    @ApiNotFoundResponse({ description: 'Car not found' })
    async remove(@Param('id') id: string): Promise<void> {
        this.logger.log({ message: 'Deleting car', payload: { id } });
        try {
            await this.deleteCar.call(id);
            this.logger.log({ message: 'Car deleted successfully', payload: { id } });
        } catch (error) {
            if (error instanceof CarNotFoundError) {
                this.logger.warn({ message: 'Car not found for deletion', payload: { id } });
            }
            this.throwIfNotFound(error);
            throw error;
        }
    }

    private throwIfNotFound(error: unknown): void {
        if (error instanceof CarNotFoundError) {
            throw new NotFoundException(error.message);
        }
    }
}
