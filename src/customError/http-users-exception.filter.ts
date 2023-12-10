import {
  ExceptionFilter,
  HttpException,
  Catch,
  ArgumentsHost,
} from '@nestjs/common';
import { Response } from 'express';
import { CustomError } from './customError';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const customError = exception as CustomError;
    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : customError.response?.status
          ? customError.response.status
          : 400;

    response
      .status(status)
      .json(
        exception instanceof HttpException
          ? exception.getResponse()
          : customError.response,
      );
  }
}
