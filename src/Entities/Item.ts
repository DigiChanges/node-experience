import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Item {

    @PrimaryGeneratedColumn('uuid')
    id: number | undefined;

    @Column()
    name: string | undefined;

    @Column()
    type: number | undefined;
}
