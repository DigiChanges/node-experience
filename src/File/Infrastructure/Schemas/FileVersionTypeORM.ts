import { EntitySchema } from 'typeorm';
import FileVersion from '../../Domain/Entities/FileVersion';

const FileVersionSchema = new EntitySchema<FileVersion>({
    name: 'FileVersion',
    target: FileVersion,
    tableName: 'file_versions',
    columns: {
        _id: {
            type: 'uuid',
            primary: true,
            unique: true
        },
        name: {
            type: String
        },
        originalName: {
            type: String
        },
        mimeType: {
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
        isPublic: {
            type: Boolean
        },
        isOptimized: {
            type: Boolean
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
        file: {
            type: 'many-to-one',
            target: 'File',
            eager: true,
            joinColumn: true
        }
    },
    indices: [
        {
            name: 'id_file_version_1',
            columns: ['_id']
        }
    ],
    uniques: [
        {
            name: 'unq_file_version_1',
            columns: ['_id']
        },
        {
            name: 'unq_path_name_is_public',
            columns: ['name', 'path', 'isPublic']
        }
    ]
});

export default FileVersionSchema;
