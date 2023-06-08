import ResourceRepPayload from './ResourceRepPayload';
import IdPayload from '../../../../../Shared/Presentation/Requests/IdPayload';

interface ResourceUpdatePayload extends IdPayload, ResourceRepPayload {}

export default ResourceUpdatePayload;
