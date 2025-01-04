import { Response } from 'express';

export function sendTokenCookie(res: Response, accessToken: string) {
  res.cookie('accessToken', accessToken, {
    maxAge: 1000 * 60 * 60 * 24 * 7,
    expires: new Date(Date.now() + 1000 * 60 * 60 * 7),
    httpOnly: true,
    secure: false
  });
}
