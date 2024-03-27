import { IsEmail, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class AuthDto {
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsString()
    @IsNotEmpty()
    password: string;

    @IsOptional() // Mark as optional for sign-up
    @IsString()
    firstName?: string;

    @IsOptional() // Mark as optional for sign-up
    @IsString()
    lastName?: string;
}
