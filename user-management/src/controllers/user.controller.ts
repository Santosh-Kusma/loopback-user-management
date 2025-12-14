import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
  response,
} from '@loopback/rest';
import { User } from '../models';
import { UserRepository } from '../repositories';
import bcrypt from "bcrypt";
import { HttpErrors } from '@loopback/rest';
import { authenticate } from '@loopback/authentication';
import * as jwt from 'jsonwebtoken';
import { JWT_SECRET, JWT_EXPIRES_IN } from '../config/jwt';
import { SecurityBindings, UserProfile } from '@loopback/security';
import { inject } from '@loopback/core';




export class UserController {
  constructor(
    @repository(UserRepository)
    public userRepository: UserRepository,
  ) { }

  // create user
  @post('/user/register')
  @response(200, {
    description: 'User model instance',
    content: { 'application/json': { schema: getModelSchemaRef(User) } },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(User, {
            title: 'NewUser',
            exclude: ['userId'],
          }),
        },
      },
    })
    user: Omit<User, 'userId'>,
  ): Promise<Omit<User, 'password'>> {

    // hash password
    const hashedPassword = await bcrypt.hash(user.password, 10);

    try {
      const savedUser = await this.userRepository.create({
        ...user,
        password: hashedPassword,
      });

      // remove password before returning
      delete (savedUser as any).password;

      return savedUser;
    } catch (err: any) {
      if (err.code === 11000) {
        throw new HttpErrors.Conflict('Email already exists');
      }
      throw err;
    }
  }

  // verify user
  @post('/user/login')
  @response(200, {
    description: 'User login successful',
  })
  async login(
    @requestBody({
      content: {
        'application/json': {
          schema: {
            type: 'object',
            required: ['email', 'password'],
            properties: {
              email: { type: 'string' },
              password: { type: 'string' },
            },
          },
        },
      },
    })
    credentials: { email: string; password: string },
  ): Promise<{ token: string; user: Omit<User, 'password'> }> {

    const { email, password } = credentials;

    const user = await this.userRepository.findOne({
      where: { email },
    });

    if (!user) {
      throw new HttpErrors.Unauthorized('Invalid email or password');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      throw new HttpErrors.Unauthorized('Invalid email or password');
    }

    // 🔐 Generate JWT
    const token = jwt.sign(
      { userId: user.userId },
      JWT_SECRET,
      {
        expiresIn: JWT_EXPIRES_IN,
      },
    );


    // 🚫 Remove password
    delete (user as any).password;

    return {
      token,
      user,
    };
  }



  // get user details only if authenticated
  @get('/user/account')
  @authenticate('jwt')
  async getMyProfile(
    @inject(SecurityBindings.USER)
    currentUser: UserProfile,
  ): Promise<Omit<User, 'password'>> {

    const userId = currentUser.userId;

    const user = await this.userRepository.findById(userId);

    if (!user) {
      throw new HttpErrors.NotFound('User not found');
    }

    delete (user as any).password;
    return user;
  }

  //update user's details except - email, password, userId
  @patch('/user/update-details')
  @authenticate('jwt')
  async updateProfile(
    @inject(SecurityBindings.USER)
    currentUser: UserProfile,

    @requestBody({
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              userName: { type: 'string' },
              mobileNo: { type: 'string' },
              gender: { type: 'string' },
              age: { type: 'number' },
              location: { type: 'string' },
            },
          },
        },
      },
    })
    data: Partial<User>,
  ): Promise<{ message: string }> {

    const userId = currentUser.userId;

    await this.userRepository.updateById(userId, data);

    return { message: 'Profile updated successfully' };
  }


// update user's password
@patch('/user/change-password')
@authenticate('jwt')
async changePassword(
  @inject(SecurityBindings.USER)
  currentUser: UserProfile,

  @requestBody({
    content: {
      'application/json': {
        schema: {
          type: 'object',
          required: ['oldPassword', 'newPassword'],
          properties: {
            oldPassword: {type: 'string'},
            newPassword: {type: 'string', minLength: 8},
          },
        },
      },
    },
  })
  body: {oldPassword: string; newPassword: string},
): Promise<{message: string}> {

  const userId = currentUser.userId;

  const user = await this.userRepository.findById(userId);

  if (!user) {
    throw new HttpErrors.NotFound('User not found');
  }

  const isOldPasswordValid = await bcrypt.compare(
    body.oldPassword,
    user.password,
  );

  if (!isOldPasswordValid) {
    throw new HttpErrors.BadRequest('Old password is incorrect');
  }

  const hashedPassword = await bcrypt.hash(body.newPassword, 10);

  await this.userRepository.updateById(userId, {
    password: hashedPassword,
  });

  return {message: 'Password changed successfully'};
}

// logout -- For now - client deleting token
@post('/user/logout')
@authenticate('jwt')
async logout(): Promise<{message: string}> {
  return {message: 'Logout successful. Please delete token on client.'};
}

}
