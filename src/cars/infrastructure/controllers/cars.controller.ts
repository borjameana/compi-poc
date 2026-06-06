import {
    Body,
    Controller,
    Delete,
    Get,
    HttpCode,
    HttpStatus,
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
        console.log('DEBUG [CarsController] INPUT:', JSON.stringify(dto));
        const car = await this.createCar.call(dto);
        const result = CarResponseDto.from(car);
        console.log('DEBUG [CarsController] OUTPUT:', JSON.stringify(result));
        return result;
    }

    @Get()
    @ApiOkResponse({ status: HttpStatus.OK, description: 'OK' })
    async findAll(): Promise<CarResponseDto[]> {
        const cars = await this.listCars.call();
        return cars.map((car) => CarResponseDto.from(car));
    }

    @Get(':id')
    @ApiOkResponse({ status: HttpStatus.OK, description: 'OK' })
    @ApiNotFoundResponse({ description: 'Car not found' })
    async findOne(@Param('id') id: string): Promise<CarResponseDto> {
        try {
            const car = await this.getCar.call(id);
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
        try {
            const car = await this.updateCar.call(id, dto);
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
        try {
            await this.deleteCar.call(id);
        } catch (error) {
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
