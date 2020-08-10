import {
    Entity,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    ObjectIdColumn,
    ObjectID
} from "typeorm";
import IUser from "../../../../InterfaceAdapters/IEntities/TypeORM/IUser";

@Entity()
class User implements IUser
{
    @ObjectIdColumn()
    _id: ObjectID;

    @Column()
    firstName: string | undefined;

    @Column()
    lastName: string | undefined;

    @Column({unique: true})
    email: string | undefined;

    @Column()
    password: string | undefined;

    @Column()
    roles: string[];

    @Column()
    permissions: string[];

    @Column({ default: "true" })
    enable: boolean | undefined;

    @Column({ default: "false" })
    isSuperAdmin: boolean;

    @Column()
    confirmationToken: string | undefined;

    @Column()
    passwordRequestedAt: Date | undefined;

    @CreateDateColumn()
    createdAt: Date | undefined;

    @UpdateDateColumn()
    updatedAt: Date | undefined;
}

export default User;
