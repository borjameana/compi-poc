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
        console.log('[UsersController] INPUT:', JSON.stringify(dto));
        const user = await this.createUser.call(dto);
        console.log('[UsersController] OUTPUT:', JSON.stringify(user));
        return UserResponseDto.from(user);
    }

    @Get()
    @ApiOkResponse({ status: HttpStatus.OK, description: 'OK' })
    async findAll(): Promise<UserResponseDto[]> {
        const users = await this.listUsers.call();
        return users.map((user) => UserResponseDto.from(user));
    }

    @Get(':id')
    @ApiOkResponse({ status: HttpStatus.OK, description: 'OK' })
    @ApiNotFoundResponse({ description: 'User not found' })
    async findOne(@Param('id') id: string): Promise<UserResponseDto> {
        try {
            const user = await this.getUser.call(id);
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
        try {
            const user = await this.updateUser.call(id, dto);
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
        try {
            await this.deleteUser.call(id);
        } catch (error) {
            this.throwIfNotFound(error);
            throw error;
        }
    }

    private throwIfNotFound(error: unknown): void {
        if (error instanceof UserNotFoundError) {
            throw new NotFoundException(error.message);
        }
    }
}
