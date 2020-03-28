import { matchedData, validationResult } from 'express-validator';

const ValidatorRules = (req, res, next) => {
    const errors = validationResult(req);
    // console.log("Dentro de val");
    if (errors.isEmpty()) {
        req.matchedData = matchedData(req);
        return next();
    }

    const extractedErrors = [];
    errors.array().map(err => extractedErrors.push({ [err.param]: err.msg }));

    return res.status(422).json({
        errors: extractedErrors,
    });
};

export default ValidatorRules;