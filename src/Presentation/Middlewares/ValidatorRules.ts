import { matchedData, validationResult } from 'express-validator';

const ValidatorRules = (req: any, res: any, next: any) =>
{
    const errors = validationResult(req);

    if (errors.isEmpty()) {
        req.matchedData = matchedData(req);
        return next();
    }

    const extractedErrors: any[] = [];

    errors.array().map(err => extractedErrors.push({ [err.param]: err.msg }));

    return res.status(422).json({
        errors: extractedErrors,
    });
};

export default ValidatorRules;