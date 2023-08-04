import { Controller, Post, Body, UseGuards, Get, Req } from '@nestjs/common';
import { HttpStatus } from '@nestjs/common/enums';
import { LoginService } from '../services/login.service';
import { JWTLoginDto } from '../dto/jwt-login.dto';
import { ICredentials } from '../interfaces/credentials.interface';
import { AuthGuard } from '@nestjs/passport';
import { IResponse } from 'src/interfaces';
import { formatResponse } from 'src/utils';
import { Request } from 'express';

/**
 * @class LoginController
 *
 * Responsible for handling only login logic
 */
@Controller('login')
export class LoginController {
  /**
   * Injecting dependencies
   *
   * @param loginService
   */
  constructor(private readonly loginService: LoginService) {}

  /**
   * Logins a user using the JWT startegy
   *
   * @param loginDto
   * @returns Promise<IResponse>
   */
  @Post('jwt')
  async loginWithJwt(@Body() loginDto: JWTLoginDto): Promise<IResponse> {
    const { identifier, password } = loginDto;
    const credentials: ICredentials = { identifier, password };

    return formatResponse(
      HttpStatus.OK,
      'logged in successfully',
      await this.loginService.loginJwt(credentials),
    );
  }

  /**
   * Redirects the user to the google login form if not authenticated
   * using the google stratgey
   *
   * @return void
   */
  @Get('google')
  @UseGuards(AuthGuard('google'))
  async loginWithGoogle() {}

  /**
   * Handles the callback of google redirect
   *
   * @return Promsie<IResponse>
   */
  @Get('google/callback')
  @UseGuards(AuthGuard('google'))
  async googleCallBackRedirect(@Req() request: Request): Promise<IResponse> {
    return formatResponse(
      HttpStatus.OK,
      'logged in successfully',
      this.loginService.loginGoogle(request),
    );
  }
}
