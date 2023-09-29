import { Controller, Post, Body, UseGuards, Get, Req } from '@nestjs/common';
import { HttpStatus } from '@nestjs/common/enums';
import { LoginService } from '../services/login.service';
import { JWTLoginDto } from '../dto/jwt-login.dto';
import { ICredentials } from '../interfaces/credentials.interface';
import { AuthGuard } from '@nestjs/passport';
import { IResponse } from 'src/common/interfaces';
import { formatResponse } from 'src/utils';
import { Request } from 'express';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

/**
 * @class LoginController
 *
 * Responsible for handling only login logic
 */
@ApiTags('Login')
@Controller('login')
export class LoginController {
  /**
   * Injecting dependencies
   *
   * @param loginService
   */
  constructor(private readonly loginService: LoginService) {}

  /**
   * Returns jwt token for authenticated user
   *
   * @param loginDto
   * @returns Promise<IResponse>
   */
  @ApiOperation({ summary: 'Returns jwt token for authenticated user' })
  @ApiResponse({ status: 200, description: 'Jwt token', type: JWTLoginDto })
  @ApiResponse({ status: 404, description: 'Invalid credentials.' })
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
   * using the google strategy
   *
   * @return void
   */
  @ApiOperation({
    summary: 'Redirects the user to the google login form if not authenticated',
  })
  @ApiResponse({ status: 200, description: 'Opens hosted google login form' })
  @Get('google')
  @UseGuards(AuthGuard('google'))
  async loginWithGoogle() {}

  /**
   * Handles the callback of google redirect
   *
   * @return Promise<IResponse>
   */
  @ApiOperation({ summary: 'Logins verified user using google' })
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
