import { AuthService } from './auth.service';
import { RegisterDto, LoginDto } from './dto';
export declare class AuthController {
    private auth;
    constructor(auth: AuthService);
    register(dto: RegisterDto): Promise<{
        accessToken: string;
        refreshToken: string;
    }>;
    login(dto: LoginDto): Promise<{
        accessToken: string;
        refreshToken: string;
    }>;
    refresh(req: any): Promise<{
        accessToken: string;
        refreshToken: string;
    }>;
    me(req: any): Promise<any>;
}
