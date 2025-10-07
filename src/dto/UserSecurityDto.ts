import { Transform } from "class-transformer";
import { IsEmail, IsEnum, IsOptional, IsString } from "class-validator";
import { LogLevel, SecurityOperation } from "generated/prisma";

export class UserSecurityDto {
  @IsString()
  userId: string;

  @IsString()
  @IsEmail()
  email: string;

  @IsEnum(SecurityOperation)
  @Transform(({ value }) => value as SecurityOperation)
  operation: SecurityOperation;

  
  @IsOptional()
  @IsEnum(LogLevel)
  @Transform(({ value }) => value ? value as LogLevel : LogLevel.INFO)
  level?: LogLevel;

  
  payload: any;
}