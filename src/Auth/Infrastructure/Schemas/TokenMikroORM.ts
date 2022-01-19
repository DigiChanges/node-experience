import { EntitySchema } from '@mikro-orm/core';
import Token from '../../Domain/Entities/Token';

const TokenSchema = new EntitySchema<Token>({
    name: 'Token',
    tableName: 'tokens',
    class: Token,
    indexes: [{ name: 'id_token_1', properties: '_id' }],
    uniques: [{ name: 'unq_token_1', properties: ['_id'] }],
    properties: {
        _id: {
            type: 'uuid',
            defaultRaw: 'uuid_generate_v4()',
            primary: true,
            unique: true
        },
        hash: {
            type: 'string'
        },
        expires: {
            type: 'number'
        },
        payload: {
            type: 'json'
        },
        blackListed: {
            type: 'boolean',
            default: false
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

export default TokenSchema;
