import {
    Entity,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    ObjectIdColumn,
    ObjectID
} from "typeorm";

import IItemDomain from "../../../InterfaceAdapters/IDomain/IItemDomain";
import { ObjectId } from "mongodb";

@Entity()
class Item implements IItemDomain
{
    @ObjectIdColumn()
    _id: ObjectID;

    @Column()
    name: string;

    @Column()
    type: number;

    @Column({ default: "true" })
    enable: boolean;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    getId(): ObjectId {
        throw new Error("Method not implemented.");
    }
}

export default Item;
