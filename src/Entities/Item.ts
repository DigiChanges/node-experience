import {Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn} from "typeorm";

@Entity()
class Item {

    @PrimaryGeneratedColumn('uuid')
    id: string | undefined;

    @Column()
    name: string | undefined;

    @Column()
    type: number | undefined;

    @CreateDateColumn()
    createdAt: Date | undefined;

    @UpdateDateColumn()
    updatedAt: Date | undefined;

    getId(): string {
        return this.id;
    }

    getName(): string {
        return this.name;
    }

    getType(): number {
        return this.type;
    }

    getCreatedAt(): Date {
        return this.createdAt;
    }

    getUpdatedAt(): Date {
        return this.updatedAt;
    }
}

export default Item;
