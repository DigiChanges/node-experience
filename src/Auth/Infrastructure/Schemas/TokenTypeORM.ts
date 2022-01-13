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
    }
});

export default TokenSchema;
