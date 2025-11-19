import { Type, Transform } from 'class-transformer';
import { IsEnum, IsOptional, IsString } from 'class-validator';
import { LogLevel, UserOperation } from 'generated/prisma';

export class UserInfoDto {
  @IsString()
  userId: string;

  @IsEnum(UserOperation)
  @Transform(({ value }) => value as UserOperation)
  operation: UserOperation;

  payload: any;

  @IsOptional()
  @IsEnum(LogLevel)
  @Transform(({ value }) => value ? value as LogLevel : LogLevel.INFO)
  level?: LogLevel;
}


