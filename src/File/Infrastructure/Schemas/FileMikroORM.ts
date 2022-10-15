import { EntitySchema } from '@mikro-orm/core';
import File from '../../Domain/Entities/File';

const FileMikroORM = new EntitySchema<File>({
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
        }
    ],
    properties: {
        _id: {
            type: 'uuid',
            defaultRaw: 'uuid_generate_v4()',
            primary: true,
            unique: true
        },
        currentVersion: {
            type: 'number'
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

export default FileMikroORM;
