import { EntitySchema } from 'typeorm';
import TypeNotification from '../../Domain/Entities/TypeNotification';
import TypeEnum from '../../Domain/Enum/TypeEnum';

const TypeNotificationSchema = new EntitySchema<TypeNotification>({
    name: 'TypeNotification',
    target: TypeNotification,
    tableName: 'notifications',
    columns: {
        _id: {
            type: 'uuid',
            primary: true,
            unique: true
        },
        name: {
            type: String
        },
        emailTemplatePath: {
            type: String,
            nullable: true
        },
        senderName: {
            type: String,
            nullable: true
        },
        from: {
            type: String,
            nullable: true
        },
        to: {
            type: String,
            nullable: true
        },
        cc: {
            type: String,
            nullable: true
        },
        subject: {
            type: String,
            nullable: true
        },
        description: {
            type: String,
            nullable: true
        },
        url: {
            type: String,
            nullable: true
        },
        type: {
            type: 'enum',
            enum: TypeEnum,
            default: TypeEnum.EMAIL
        }
    }
});

export default TypeNotificationSchema;
