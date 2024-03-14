import { BaseTransformer, BasePropertiesTransformer } from '@digichanges/shared-experience';
import IFileVersionDomain from '../../Domain/Entities/IFileVersionDomain';

type IFileVersionTransformer = BaseTransformer<IFileVersionDomain> & BasePropertiesTransformer;

export default IFileVersionTransformer;
