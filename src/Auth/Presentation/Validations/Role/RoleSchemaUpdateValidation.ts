import { z } from 'zod';
import RoleSchemaSaveValidation from './RoleSchemaSaveValidation';

const RoleSchemaUpdateValidation = RoleSchemaSaveValidation.extend({
    id: z.string()
});

export default RoleSchemaUpdateValidation;
