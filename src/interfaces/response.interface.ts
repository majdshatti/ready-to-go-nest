import { HttpStatus } from "@nestjs/common";

export interface IResponse {
    status: HttpStatus;
    message: string;
    data?: any | null;
}