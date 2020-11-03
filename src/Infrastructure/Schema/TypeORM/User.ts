import { EntitySchema } from "typeorm";
import User from "../../../Domain/Entities/User";

const UserSchema = new EntitySchema<User>({
    name: "User",
    target: User,
    tableName: 'users',
    columns: {
        _id: {
            type: String,
            primary: true,
            unique: true
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
            nullable: true
        },
        passwordRequestedAt: {
            type: Date,
            nullable: true
        },
        permissions: {
            type: 'simple-array',
            nullable: true
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
    },
    relations: {
        roles: {
            type: 'many-to-many',
            target: 'Role',
            eager: true,
            joinTable: {
                name: 'users_has_roles',
                joinColumn: {
                    name: 'user_id'
                },
                inverseJoinColumn: {
                    name: 'role_id'
                }
            }
        }
    },
});

export default UserSchema;
