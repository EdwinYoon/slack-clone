import { sign, verify } from 'jsonwebtoken';
import { User } from '../entity';

export const generateTokens = (user: User) => {
  const { AUTH_ACCESS_TOKEN_SECRET, AUTH_REFRESH_TOKEN_SECRET } = process.env;

  const accessToken = sign(
    { userId: user.id, count: user.count },
    AUTH_ACCESS_TOKEN_SECRET as string,
    { expiresIn: '30m' }
  );

  const refreshToken = sign(
    { userId: user.id, count: user.count },
    AUTH_REFRESH_TOKEN_SECRET as string,
    { expiresIn: '7d' }
  );

  return { accessToken, refreshToken };
};

export const authTokenValidator = async (req: any, res: any, next: any) => {
  const accessToken = req.headers['x-token'];
  const refreshToken = req.headers['x-refresh-token'];

  if (!refreshToken && !accessToken) {
    /** If no token at all, then pass */
    return next();
  }

  console.log('is it running?');

  /** if access token os valid, set userId to req */
  try {
    const isTokenValid = verify(accessToken, process.env
      .AUTH_ACCESS_TOKEN_SECRET as string) as any;
    req.userId = isTokenValid.userId;

    return next();
  } catch {}

  if (!refreshToken) {
    /** if no refresh token, pass */
    return next();
  }

  try {
    /** If the refreshToken is valid, response with new tokens */
    const isTokenValid = verify(refreshToken, process.env
      .AUTH_REFRESH_TOKEN_SECRET as string) as any;

    const user = await User.findOne(isTokenValid.userId);
    if (!user || user.count !== isTokenValid.count) {
      return next();
    }
    const newTokens = generateTokens(user);

    req.userId = user.id;
    res.cookie('refresh-token', newTokens.refreshToken);
    res.cookie('access-token', newTokens.accessToken);

    return next();
  } catch {
    return next();
  }
};
