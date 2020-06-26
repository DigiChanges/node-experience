import {
    Entity,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    ObjectIdColumn,
    ObjectID
} from "typeorm";

import IItem from "./Contracts/IItem";

@Entity()
class Item implements IItem
{
    @ObjectIdColumn()
    _id: ObjectID;

    @Column()
    name: string | undefined;

    @Column()
    type: number | undefined;

    @Column({ default: "true" })
    enable: boolean | undefined;

    @CreateDateColumn()
    createdAt: Date | undefined;

    @UpdateDateColumn()
    updatedAt: Date | undefined;
}

export default Item;
