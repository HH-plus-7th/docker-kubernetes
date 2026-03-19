import { Body, Controller, Get, Post, Req, Res } from '@nestjs/common';
import { ApiBody, ApiCookieAuth, ApiOkResponse, ApiOperation, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { Request, Response } from 'express';
import { LoginDto } from '../common/dto';
import { AuthService } from './auth.service';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @ApiOperation({ summary: 'Authenticate a user and set the session cookie.' })
  @ApiBody({ type: LoginDto })
  @ApiOkResponse({ description: 'Login success.' })
  @ApiUnauthorizedResponse({ description: 'Invalid credentials.' })
  async login(@Body() body: LoginDto, @Res({ passthrough: true }) response: Response) {
    const user = await this.authService.login(body.email, body.password);
    this.authService.writeSessionCookie(response, user);

    return {
      message: 'Login successful',
      user
    };
  }

  @Post('logout')
  @ApiOperation({ summary: 'Clear the session cookie.' })
  async logout(@Res({ passthrough: true }) response: Response) {
    this.authService.clearSessionCookie(response);
    return { success: true };
  }

  @Get('me')
  @ApiOperation({ summary: 'Return the authenticated user for the session cookie.' })
  @ApiCookieAuth()
  async me(@Req() request: Request) {
    const user = await this.authService.requireAuthenticatedUser(request);
    return { user };
  }
}
