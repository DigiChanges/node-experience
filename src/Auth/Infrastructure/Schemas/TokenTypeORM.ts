import { EntitySchema } from 'typeorm';
import Token from '../../Domain/Entities/Token';

const TokenSchema = new EntitySchema<Token>({
    name: 'Token',
    target: Token,
    tableName: 'tokens',
    columns: {
        _id: {
            type: 'uuid',
            primary: true,
            unique: true
        },
        hash: {
            type: String
        },
        expires: {
            type: Number
        },
        payload: {
            type: 'json'
        },
        blackListed: {
            type: 'bool'
        }
    },
    indices: [
        {
            name: 'id_token_1',
            unique: true,
            columns: ['_id']
        }
    ],
    uniques: [
        {
            name: 'unq_token_1',
            columns: ['_id']
        }
    ]
});

export default TokenSchema;
