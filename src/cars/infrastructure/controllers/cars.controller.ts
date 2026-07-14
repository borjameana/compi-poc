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
        this.logger.log({ operation: 'create', dto });
        const car = await this.createCar.call(dto);
        this.logger.log({ operation: 'create', status: 'completed', carId: car.id.value });
        return CarResponseDto.from(car);
    }

    @Get()
    @ApiOkResponse({ status: HttpStatus.OK, description: 'OK' })
    async findAll(): Promise<CarResponseDto[]> {
        this.logger.log({ operation: 'findAll' });
        const cars = await this.listCars.call();
        this.logger.log({ operation: 'findAll', status: 'completed', count: cars.length });
        return cars.map((car) => CarResponseDto.from(car));
    }

    @Get(':id')
    @ApiOkResponse({ status: HttpStatus.OK, description: 'OK' })
    @ApiNotFoundResponse({ description: 'Car not found' })
    async findOne(@Param('id') id: string): Promise<CarResponseDto> {
        this.logger.log({ operation: 'findOne', id });
        try {
            const car = await this.getCar.call(id);
            this.logger.log({ operation: 'findOne', status: 'completed', carId: car.id.value });
            return CarResponseDto.from(car);
        } catch (error) {
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
        this.logger.log({ operation: 'update', id, dto });
        try {
            const car = await this.updateCar.call(id, dto);
            this.logger.log({ operation: 'update', status: 'completed', carId: car.id.value });
            return CarResponseDto.from(car);
        } catch (error) {
            this.throwIfNotFound(error);
            throw error;
        }
    }

    @Delete(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    @ApiResponse({ status: HttpStatus.NO_CONTENT, description: 'Deleted' })
    @ApiNotFoundResponse({ description: 'Car not found' })
    async remove(@Param('id') id: string): Promise<void> {
        this.logger.log({ operation: 'remove', id });
        try {
            await this.deleteCar.call(id);
            this.logger.log({ operation: 'remove', status: 'completed', carId: id });
        } catch (error) {
            this.throwIfNotFound(error);
            throw error;
        }
    }

    private throwIfNotFound(error: unknown): void {
        if (error instanceof CarNotFoundError) {
            this.logger.warn({ operation: 'throwIfNotFound', message: error.message, error: error.name });
            throw new NotFoundException(error.message);
        }
    }
}
