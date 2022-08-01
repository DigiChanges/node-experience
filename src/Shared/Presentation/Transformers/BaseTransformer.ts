
export type BasePropertiesTransformer = { id: string, createdAt: number, updatedAt: number };
type OmitPropertiesTransformer = 'createdAt' | 'updatedAt';

type BaseTransformer<T> = Partial<Omit<T, OmitPropertiesTransformer>>;

export default BaseTransformer;
