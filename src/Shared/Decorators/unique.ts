import {
    registerDecorator,
    ValidationArguments,
    ValidationOptions,
    ValidatorConstraint,
    ValidatorConstraintInterface
} from 'class-validator';
import { REPOSITORIES } from '../../repositories';
import UniqueService from '../../App/Domain/Services/UniqueService';

interface UniqueParam
{
    repository: REPOSITORIES;
    dbAttr?: string;
    refAttr?: string;
}

export function Unique(params: UniqueParam, validationOptions?: ValidationOptions)
{
    return (object: any, propertyName: string) =>
    {
        registerDecorator({
            target: object.constructor,
            propertyName,
            options: validationOptions,
            constraints: [params],
            validator: UniqueConstraint
        });
    };
}

@ValidatorConstraint({ async: true })
export class UniqueConstraint implements ValidatorConstraintInterface
{
    async validate(value: any, args: ValidationArguments): Promise<boolean>
    {
        const [params] = args.constraints;

        return await UniqueService.handle({
            repository: (<UniqueParam> params).repository,
            value,
            attr: (<UniqueParam> params)?.dbAttr ?? args.property,
            refValue: (<UniqueParam> params)?.refAttr ? (args.object as any)[(<UniqueParam> params).refAttr] : null
        });
    }

    defaultMessage(args: ValidationArguments): string
    {
        return `The ${args.property} property is already in use`;
    }
}


