import {AuthenticationStrategy} from '@loopback/authentication';
import {HttpErrors, Request} from '@loopback/rest';
import jwt from 'jsonwebtoken';
import {JWT_SECRET} from '../config/jwt';

export class JwtStrategy implements AuthenticationStrategy {
  name = 'jwt';

  async authenticate(request: Request): Promise<any> {
    const authHeader = request.headers.authorization;

    if (!authHeader) {
      throw new HttpErrors.Unauthorized('Authorization header missing');
    }

    const token = authHeader.replace('Bearer ', '');

    try {
      const decoded = jwt.verify(token, JWT_SECRET);
      return decoded; // attached to request.user
    } catch (err) {
      throw new HttpErrors.Unauthorized('Invalid token');
    }
  }
}
