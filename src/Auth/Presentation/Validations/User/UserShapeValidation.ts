import { z } from 'zod';

const UserShapeValidation =
{
    firstName: z.string().min(3).max(50),
    lastName: z.string().min(3).max(50),
    email: z.string().email(),
    birthday: z.date(),
    documentType: z.string().min(2).max(20),
    documentNumber: z.string().min(3).max(16),
    gender: z.enum(['F', 'M', 'O']),
    phone: z.string().min(3).max(16),
    country: z.string().min(2).max(2),
    address: z.string().min(10).max(60),
    passwordRequestedAt: z.string().nullish(),
    roles: z.array(z.string().uuid()).min(0),
    permissions: z.array(z.string()).min(0)
};

export default UserShapeValidation;
