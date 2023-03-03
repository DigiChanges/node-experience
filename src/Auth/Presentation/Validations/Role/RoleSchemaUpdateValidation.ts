import RoleSchemaSaveValidation from './RoleSchemaSaveValidation';
import IdSchemaValidation from '../../../../Shared/Presentation/Validations/IdSchemaValidation';

const RoleSchemaUpdateValidation = RoleSchemaSaveValidation.merge(IdSchemaValidation);

export default RoleSchemaUpdateValidation;
