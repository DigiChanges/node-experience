import { EntitySchema } from "typeorm";
import Role from "../../../Domain/Entities/Role";
import IRoleDomain from "../../../InterfaceAdapters/IDomain/IRoleDomain";
import IUserDomain from "../../../InterfaceAdapters/IDomain/IUserDomain";
import User from "./User";

const RoleSchema = new EntitySchema<Role>({
    name: "role",
    columns: {
        _id: {
            type: String,
            primary: true
        },
        name: {
            type: String,
        },
        slug: {
            type: String,
            unique: true,
        },
        enable: {
            type: Boolean,
            default: true,
        },
        createdAt: {
            name: 'createdAt',
            type: 'timestamp with time zone',
            createDate: true,
        },
        updatedAt: {
            name: 'updatedAt',
            type: 'timestamp with time zone',
            updateDate: true,
        }
    }
})

export default RoleSchema;

    // @OneToMany(type => Permission, permission => permission.role) // note: we will create author property in the Permission class below
    // permissions: Permissions[];
    // @Column()
    // permissions: string[];

    // @ManyToMany(type => User, user => user.roles)
    // users: IUserDomain[];
