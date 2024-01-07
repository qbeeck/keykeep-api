export interface FormatExceptionMessage {
  message: string;
  code_error?: number;
}

export interface Exception {
  badRequestException(data: FormatExceptionMessage): void;
  internalServerErrorException(data?: FormatExceptionMessage): void;
  forbiddenException(data?: FormatExceptionMessage): void;
  UnauthorizedException(data?: FormatExceptionMessage): void;
}
