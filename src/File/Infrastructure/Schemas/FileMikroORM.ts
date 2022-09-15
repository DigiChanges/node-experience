import { EntitySchema } from '@mikro-orm/core';
import File from '../../Domain/Entities/File';

const FileSchema = new EntitySchema<File>({
    name: 'File',
    tableName: 'files',
    class: File,
    indexes: [{
        name: 'id_file_1',
        properties: '_id'
    }],
    uniques: [
        {
            name: 'unq_file_1',
            properties: ['_id']
        },
        {
            name: 'unq_path_name_is_public',
            properties: ['name', 'path', 'isPublic']
        }],
    properties: {
        _id: {
            type: 'uuid',
            defaultRaw: 'uuid_generate_v4()',
            primary: true,
            unique: true
        },
        name: {
            type: 'string'
        },
        originalName: {
            type: 'string'
        },
        mimeType: {
            type: 'string'
        },
        path: {
            type: 'string'
        },
        extension: {
            type: 'string'
        },
        size: {
            type: 'number'
        },
        version: {
            type: 'number'
        },
        isPublic: {
            type: 'boolean'
        },
        createdAt: {
            type: 'Date',
            onCreate: () => new Date(), nullable: true
        },
        updatedAt: {
            type: 'Date',
            onCreate: () => new Date(),
            onUpdate: () => new Date(), nullable: true
        }
    }
});

export default FileSchema;
