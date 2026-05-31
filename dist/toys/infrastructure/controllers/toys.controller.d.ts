import { CreateToy } from '../../application/create-toy';
import { DeleteToy } from '../../application/delete-toy';
import { GetToy } from '../../application/get-toy';
import { ListToys } from '../../application/list-toys';
import { UpdateToy } from '../../application/update-toy';
import { CreateToyDto } from '../dtos/create-toy.dto';
import { ToyResponseDto } from '../dtos/toy-response.dto';
import { UpdateToyDto } from '../dtos/update-toy.dto';
export declare class ToysController {
    private readonly createToy;
    private readonly deleteToy;
    private readonly getToy;
    private readonly listToys;
    private readonly updateToy;
    constructor(createToy: CreateToy, deleteToy: DeleteToy, getToy: GetToy, listToys: ListToys, updateToy: UpdateToy);
    create(dto: CreateToyDto): Promise<ToyResponseDto>;
    findAll(): Promise<ToyResponseDto[]>;
    findOne(id: string): Promise<ToyResponseDto>;
    update(id: string, dto: UpdateToyDto): Promise<ToyResponseDto>;
    remove(id: string): Promise<void>;
    private throwIfNotFound;
}
