import {
    Column,
    CreateDateColumn,
    DeleteDateColumn,
    Entity,
    Index,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';
import { TaskEntity } from '../../domain/entities/task.entity';
import { TaskPriority } from '../../domain/value-objects/task-priority';
import { TaskStatus } from '../../domain/value-objects/task-status';

@Entity('tasks')
@Index(['status', 'deletedAt'])
@Index(['priority', 'deletedAt'])
export class TaskOrmEntity {
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @Column({ type: 'varchar', length: 120 })
    title!: string;

    @Column({ type: 'varchar', length: 2000, nullable: true })
    description!: string | null;

    @Column({
        type: 'varchar',
        length: 20,
        default: TaskPriority.MEDIUM,
    })
    priority!: TaskPriority;

    @Column({
        type: 'varchar',
        length: 20,
        default: TaskStatus.TODO,
    })
    status!: TaskStatus;

    @CreateDateColumn()
    createdAt!: Date;

    @UpdateDateColumn()
    updatedAt!: Date;

    @DeleteDateColumn({ nullable: true })
    deletedAt!: Date | null;

    toDomain(): TaskEntity {
        return new TaskEntity({
            id: this.id,
            title: this.title,
            description: this.description,
            priority: this.priority,
            status: this.status,
            createdAt: this.createdAt,
            updatedAt: this.updatedAt,
            deletedAt: this.deletedAt,
        });
    }

    static fromDomain(task: TaskEntity): TaskOrmEntity {
        const entity = new TaskOrmEntity();
        entity.id = task.id;
        entity.title = task.title;
        entity.description = task.description;
        entity.priority = task.priority;
        entity.status = task.status;
        entity.createdAt = task.createdAt;
        entity.updatedAt = task.updatedAt;
        entity.deletedAt = task.deletedAt;
        return entity;
    }
}