import { EntitySchema } from "typeorm";
import IUserDomain from "../../../InterfaceAdapters/IDomain/IUserDomain";
import IRoleDomain from "../../../InterfaceAdapters/IDomain/IRoleDomain";
import Role from "./Role";
import User from "../../../Domain/Entities/User";

const UserSchema = new EntitySchema<User>({
    name: "user",
    columns: {
        _id: {
            type: String,
            primary: true,
        },
        firstName: {
            type: String,
        },
        lastName: {
            type: String,
        },
        email: {
            type: String,
            unique: true,
        },
        password: {
            type: String,
        },
        enable: {
            type: Boolean,
            default: true,
        },
        isSuperAdmin: {
            type: Boolean,
            default: false,
        },
        confirmationToken: {
            type: String,
        },
        passwordRequestedAt: {
            type: Date,
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
});

export default UserSchema;

// @ManyToMany(type => Role, role => role.users)
// @JoinTable()
// roles: IRoleDomain[];

// @Column()
// permissions: string[];
