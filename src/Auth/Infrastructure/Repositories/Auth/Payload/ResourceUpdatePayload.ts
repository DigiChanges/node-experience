import ResourceRepPayload from './ResourceRepPayload';
import { IdPayload } from '@digichanges/shared-experience';

interface ResourceUpdatePayload extends IdPayload, ResourceRepPayload {}

export default ResourceUpdatePayload;
