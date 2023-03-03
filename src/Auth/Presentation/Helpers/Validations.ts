
export const checkPassword = {
    check: (data) => data.password === data.passwordConfirmation,
    message: {
        message: 'Passwords don\'t match',
        path: ['passwordConfirmation']
    }
};
