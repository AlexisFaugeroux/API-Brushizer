export interface User {
    id: number;
    email: string;
    password: string;
    pseudo: string;
    country: string;
    description: string | null;
    profile_pic: string | null;
    profile_view?: number | null;
    role_id: number;
}

export interface UserWithIpAddress extends User {
    ip: string;
}

export interface UserJWTPayload extends Omit<UserWithIpAddress, 'password'> {}
