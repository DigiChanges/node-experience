import { EntitySchema } from 'typeorm';
import File from '../../Domain/Entities/File';

const FileTypeORM = new EntitySchema<File>({
    name: 'File',
    target: File,
    tableName: 'files',
    columns: {
        _id: {
            type: 'uuid',
            primary: true,
            unique: true
        },
        currentVersion: {
            type: Number
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
    indices: [
        {
            name: 'id_file_1',
            columns: ['_id']
        }
    ],
    uniques: [
        {
            name: 'unq_file_1',
            columns: ['_id']
        }
    ]
});

export default FileTypeORM;
