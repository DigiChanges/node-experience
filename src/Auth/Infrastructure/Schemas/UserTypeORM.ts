import { EntitySchema } from 'typeorm';
import User from '../../Domain/Entities/User';

const UserSchema = new EntitySchema<User>({
    name: 'User',
    target: User,
    tableName: 'users',
    columns: {
        _id: {
            type: 'uuid',
            primary: true,
            unique: true
        },
        firstName: {
            type: String
        },
        lastName: {
            type: String
        },
        email: {
            type: String,
            unique: true
        },
        birthday: {
            type: String
        },
        documentType: {
            type: String
        },
        documentNumber: {
            type: String,
            unique: true
        },
        gender: {
            type: String
        },
        phone: {
            type: String
        },
        country: {
            type: String
        },
        address: {
            type: String
        },
        password: {
            type: String,
            transformer: {
                from(val: string)
                {
                    return val;
                },
                to(val: Record<string, string>)
                {
                    return val.value;
                }
            }
        },
        permissions: {
            type: 'simple-array',
            nullable: true
        },
        enable: {
            type: 'bool',
            default: true
        },
        verify: {
            type: 'bool',
            default: false
        },
        isSuperAdmin: {
            type: 'bool',
            default: false
        },
        passwordRequestedAt: {
            type: Date,
            nullable: true
        },
        createdAt: {
            name: 'createdAt',
            type: 'timestamp with time zone',
            createDate: true
        },
        updatedAt: {
            name: 'updatedAt',
            type: 'timestamp with time zone',
            updateDate: true
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
    indices: [
        {
            name: 'id_user_1',
            unique: true,
            columns: ['_id']
        }
    ],
    uniques: [
        {
            name: 'unq_user_1',
            columns: ['_id']
        }
    ]
});

export default UserSchema;
