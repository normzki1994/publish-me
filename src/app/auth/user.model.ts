export interface User {
    name: string | null; 
    email: string;
    password: string;
    isAdmin: boolean | null;
}