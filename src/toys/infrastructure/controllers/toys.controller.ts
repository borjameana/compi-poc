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
    private readonly logger = new Logger(ToysController.name);
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
        this.logger.log({ operation: 'create', dto });
        const toy = await this.createToy.call(dto);
        this.logger.log({ operation: 'create', status: 'completed', toyId: toy.id });
        return ToyResponseDto.from(toy);
    }

    @Get()
    @ApiOkResponse({ status: HttpStatus.OK, description: 'OK' })
    async findAll(): Promise<ToyResponseDto[]> {
        this.logger.log({ operation: 'findAll' });
        const toys = await this.listToys.call();
        this.logger.log({ operation: 'findAll', status: 'completed', count: toys.length });
        return toys.map((toy) => ToyResponseDto.from(toy));
    }

    @Get(':id')
    @ApiOkResponse({ status: HttpStatus.OK, description: 'OK' })
    @ApiNotFoundResponse({ description: 'Toy not found' })
    async findOne(@Param('id') id: string): Promise<ToyResponseDto> {
        this.logger.log({ operation: 'findOne', id });
        try {
            const toy = await this.getToy.call(id);
            this.logger.log({ operation: 'findOne', status: 'completed', toyId: toy.id });
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
        this.logger.log({ operation: 'update', id, dto });
        try {
            const toy = await this.updateToy.call(id, dto);
            this.logger.log({ operation: 'update', status: 'completed', toyId: toy.id });
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
        this.logger.log({ operation: 'remove', id });
        try {
            await this.deleteToy.call(id);
            this.logger.log({ operation: 'remove', status: 'completed', toyId: id });
        } catch (error) {
            this.throwIfNotFound(error);
            throw error;
        }
    }

    private throwIfNotFound(error: unknown): void {
        if (error instanceof ToyNotFoundError) {
            this.logger.warn({ operation: 'throwIfNotFound', message: error.message, error: error.name });
            throw new NotFoundException(error.message);
        }
    }
}
