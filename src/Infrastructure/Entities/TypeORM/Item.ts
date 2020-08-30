import { Entity, Column, CreateDateColumn, UpdateDateColumn } from "typeorm";
import IItemDomain from "../../../InterfaceAdapters/IDomain/IItemDomain";

@Entity()
class Item implements IItemDomain
{
    @Column()
    id: string;

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

    getId(): string
    {
        throw new Error("Method not implemented.");
    }
}

export default Item;
