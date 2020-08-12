import {
    Entity,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    ObjectIdColumn,
    ObjectID
} from "typeorm";
import IUserDomain from "../../../InterfaceAdapters/IDomain/IUserDomain";
import IRoleDomain from "../../../InterfaceAdapters/IDomain/IRoleDomain";

@Entity()
class User implements IUserDomain
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
    roles: IRoleDomain[];

    @Column()
    permissions: string[];

    @Column({ default: "true" })
    enable: boolean | undefined;

    @Column({ default: "false" })
    isSuperAdmin: boolean;

    @Column()
    confirmationToken: string;

    @Column()
    passwordRequestedAt: Date;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    getFullName(): string
    {
        return `${this.firstName} ${this.lastName}`;
    }

    setRole(role: IRoleDomain): void
    {
        this.roles.push(role);
    }

    getRoles(): IRoleDomain[]
    {
        return this.roles;
    }

    clearRoles(): void
    {
        this.roles = [];
    }

    getId(): ObjectID
    {
        return this._id;
    }
}

export default User;
