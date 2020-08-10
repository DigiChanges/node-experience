import {
    Entity,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    ObjectIdColumn,
    ObjectID
} from "typeorm";
import IRole from "../../../../InterfaceAdapters/IEntities/TypeORM/IRole";

@Entity()
class Role implements IRole
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
}

export default Role;
