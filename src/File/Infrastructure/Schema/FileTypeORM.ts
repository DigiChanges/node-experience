import { EntitySchema } from 'typeorm';
import File from '../../Domain/Entities/File';

const FileSchema = new EntitySchema<File>({
    name: 'File',
    target: File,
    tableName: 'files',
    columns: {
        _id: {
            type: String,
            primary: true,
            unique: true
        },
        name: {
            type: String
        },
        original_name: {
            type: String
        },
        mime_type: {
            type: String
        },
        path: {
            type: String
        },
        extension: {
            type: String
        },
        size: {
            type: Number
        },
        version: {
            type: Number
        },
        created_at: {
            name: 'createdAt',
            type: 'timestamp with time zone',
            createDate: true
        },
        updated_at: {
            name: 'updatedAt',
            type: 'timestamp with time zone',
            updateDate: true
        }
    }
});

export default FileSchema;
