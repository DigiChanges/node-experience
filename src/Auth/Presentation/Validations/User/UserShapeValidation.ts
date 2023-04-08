import { z } from 'zod';

const UserShapeValidation =
{
    firstName: z.string().min(3).max(50),
    lastName: z.string().min(3).max(50),
    email: z.string().email(),
    birthdate: z.date(),
    genre: z.enum(['F', 'M', 'O']),
    phone: z.string().min(3).max(16),
    country: z.string().min(2).max(2)
};

export default UserShapeValidation;
