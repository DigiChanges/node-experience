import { EntitySchema } from '@mikro-orm/core';
import FileVersion from '../../Domain/Entities/FileVersion';

const FileVersionSchema = new EntitySchema<FileVersion>({
    name: 'FileVersion',
    tableName: 'file_versions',
    class: FileVersion,
    indexes: [{
        properties: '_id'
    }],
    uniques: [
        {
            name: 'unq_file_version_1',
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
        isOptimized: {
            type: 'boolean'
        },
        file: {
            reference: 'm:1',
            type: 'File'
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

export default FileVersionSchema;
