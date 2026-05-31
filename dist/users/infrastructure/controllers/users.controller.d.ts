import { CreateUser } from '../../application/create-user';
import { DeleteUser } from '../../application/delete-user';
import { GetUser } from '../../application/get-user';
import { ListUsers } from '../../application/list-users';
import { UpdateUser } from '../../application/update-user';
import { CreateUserDto } from '../dtos/create-user.dto';
import { UpdateUserDto } from '../dtos/update-user.dto';
import { UserResponseDto } from '../dtos/user-response.dto';
export declare class UsersController {
    private readonly createUser;
    private readonly deleteUser;
    private readonly getUser;
    private readonly listUsers;
    private readonly updateUser;
    constructor(createUser: CreateUser, deleteUser: DeleteUser, getUser: GetUser, listUsers: ListUsers, updateUser: UpdateUser);
    create(dto: CreateUserDto): Promise<UserResponseDto>;
    findAll(): Promise<UserResponseDto[]>;
    findOne(id: string): Promise<UserResponseDto>;
    update(id: string, dto: UpdateUserDto): Promise<UserResponseDto>;
    remove(id: string): Promise<void>;
    private throwIfNotFound;
}
