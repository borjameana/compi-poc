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
import { CreateToy } from '../../application/create-toy';
import { DeleteToy } from '../../application/delete-toy';
import { GetToy } from '../../application/get-toy';
import { ListToys } from '../../application/list-toys';
import { UpdateToy } from '../../application/update-toy';
import { ToyNotFoundError } from '../../domain/errors/toy-not-found.error';
import { CreateToyDto } from '../dtos/create-toy.dto';
import { ToyResponseDto } from '../dtos/toy-response.dto';
import { UpdateToyDto } from '../dtos/update-toy.dto';

@ApiTags('toys')
@Controller('toys')
export class ToysController {
    constructor(
        private readonly createToy: CreateToy,
        private readonly deleteToy: DeleteToy,
        private readonly getToy: GetToy,
        private readonly listToys: ListToys,
        private readonly updateToy: UpdateToy,
    ) { }

    @Post()
    @ApiResponse({ status: HttpStatus.CREATED, description: 'Created' })
    @ApiBody({ type: CreateToyDto })
    async create(@Body() dto: CreateToyDto): Promise<ToyResponseDto> {
        const toy = await this.createToy.call(dto);
        return ToyResponseDto.from(toy);
    }

    @Get()
    @ApiOkResponse({ status: HttpStatus.OK, description: 'OK' })
    async findAll(): Promise<ToyResponseDto[]> {
        const toys = await this.listToys.call();
        return toys.map((toy) => ToyResponseDto.from(toy));
    }

    @Get(':id')
    @ApiOkResponse({ status: HttpStatus.OK, description: 'OK' })
    @ApiNotFoundResponse({ description: 'Toy not found' })
    async findOne(@Param('id') id: string): Promise<ToyResponseDto> {
        try {
            const toy = await this.getToy.call(id);
            return ToyResponseDto.from(toy);
        } catch (error) {
            this.throwIfNotFound(error);
            throw error;
        }
    }

    @Patch(':id')
    @ApiOkResponse({ status: HttpStatus.OK, description: 'OK' })
    @ApiNotFoundResponse({ description: 'Toy not found' })
    @ApiBody({ type: UpdateToyDto })
    async update(
        @Param('id') id: string,
        @Body() dto: UpdateToyDto,
    ): Promise<ToyResponseDto> {
        try {
            const toy = await this.updateToy.call(id, dto);
            return ToyResponseDto.from(toy);
        } catch (error) {
            this.throwIfNotFound(error);
            throw error;
        }
    }

    @Delete(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    @ApiResponse({ status: HttpStatus.NO_CONTENT, description: 'Deleted' })
    @ApiNotFoundResponse({ description: 'Toy not found' })
    async remove(@Param('id') id: string): Promise<void> {
        try {
            await this.deleteToy.call(id);
        } catch (error) {
            this.throwIfNotFound(error);
            throw error;
        }
    }

    private throwIfNotFound(error: unknown): void {
        if (error instanceof ToyNotFoundError) {
            throw new NotFoundException(error.message);
        }
    }
}
