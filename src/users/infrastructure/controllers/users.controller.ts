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
import { CreateUser } from '../../application/create-user';
import { DeleteUser } from '../../application/delete-user';
import { GetUser } from '../../application/get-user';
import { ListUsers } from '../../application/list-users';
import { UpdateUser } from '../../application/update-user';
import { UserNotFoundError } from '../../domain/errors/user-not-found.error';
import { CreateUserDto } from '../dtos/create-user.dto';
import { UpdateUserDto } from '../dtos/update-user.dto';
import { UserResponseDto } from '../dtos/user-response.dto';

@ApiTags('users')
@Controller('users')
export class UsersController {
    private readonly logger = new Logger(UsersController.name);
    constructor(
        private readonly createUser: CreateUser,
        private readonly deleteUser: DeleteUser,
        private readonly getUser: GetUser,
        private readonly listUsers: ListUsers,
        private readonly updateUser: UpdateUser,
    ) { }

    @Post()
    @ApiResponse({ status: HttpStatus.CREATED, description: 'Created' })
    @ApiBody({ type: CreateUserDto })
    async create(@Body() dto: CreateUserDto): Promise<UserResponseDto> {
        this.logger.log({ operation: 'create', dto });
        const user = await this.createUser.call(dto);
        this.logger.log({ operation: 'create', status: 'completed', userId: user.id });
        return UserResponseDto.from(user);
    }

    @Get()
    @ApiOkResponse({ status: HttpStatus.OK, description: 'OK' })
    async findAll(): Promise<UserResponseDto[]> {
        this.logger.log({ operation: 'findAll' });
        const users = await this.listUsers.call();
        this.logger.log({ operation: 'findAll', status: 'completed', count: users.length });
        return users.map((user) => UserResponseDto.from(user));
    }

    @Get(':id')
    @ApiOkResponse({ status: HttpStatus.OK, description: 'OK' })
    @ApiNotFoundResponse({ description: 'User not found' })
    async findOne(@Param('id') id: string): Promise<UserResponseDto> {
        this.logger.log({ operation: 'findOne', id });
        try {
            const user = await this.getUser.call(id);
            this.logger.log({ operation: 'findOne', status: 'completed', userId: user.id });
            return UserResponseDto.from(user);
        } catch (error) {
            this.throwIfNotFound(error);
            throw error;
        }
    }

    @Patch(':id')
    @ApiOkResponse({ status: HttpStatus.OK, description: 'OK' })
    @ApiNotFoundResponse({ description: 'User not found' })
    @ApiBody({ type: UpdateUserDto })
    async update(
        @Param('id') id: string,
        @Body() dto: UpdateUserDto,
    ): Promise<UserResponseDto> {
        this.logger.log({ operation: 'update', id, dto });
        try {
            const user = await this.updateUser.call(id, dto);
            this.logger.log({ operation: 'update', status: 'completed', userId: user.id });
            return UserResponseDto.from(user);
        } catch (error) {
            this.throwIfNotFound(error);
            throw error;
        }
    }

    @Delete(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    @ApiResponse({ status: HttpStatus.NO_CONTENT, description: 'Deleted' })
    @ApiNotFoundResponse({ description: 'User not found' })
    async remove(@Param('id') id: string): Promise<void> {
        this.logger.log({ operation: 'remove', id });
        try {
            await this.deleteUser.call(id);
            this.logger.log({ operation: 'remove', status: 'completed', userId: id });
        } catch (error) {
            this.throwIfNotFound(error);
            throw error;
        }
    }

    private throwIfNotFound(error: unknown): void {
        if (error instanceof UserNotFoundError) {
            this.logger.warn({ operation: 'throwIfNotFound', message: error.message, error: error.name });
            throw new NotFoundException(error.message);
        }
    }
}
