import ErrorResponse from './ErrorResponse';

interface LoginResponse extends ErrorResponse
{
    access_token: string;
    expires_in: number;
    refresh_expires_in: number;
    refresh_token: string;
    token_type: 'Bearer' | string;
    id_token: string;
    'not-before-policy': number;
    session_state: string;
    scope: string;
}

export default LoginResponse;
