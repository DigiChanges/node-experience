import {
    Entity,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    ObjectIdColumn,
    ObjectID
} from "typeorm";
import IRoleDomain from "../../../InterfaceAdapters/IDomain/IRoleDomain";
import { ObjectId } from "mongodb";

@Entity()
class Role implements IRoleDomain
{
    @ObjectIdColumn()
    _id: ObjectID;

    @Column()
    name: string | undefined;

    @Column({unique: true})
    slug: string | undefined;

    @Column({ default: "true" })
    enable: boolean | undefined;

    @Column()
    permissions: string[];

    @CreateDateColumn()
    createdAt: Date | undefined;

    @UpdateDateColumn()
    updatedAt: Date | undefined;

    getId(): ObjectId
    {
        throw new Error("Method not implemented.");
    }
}

export default Role;
