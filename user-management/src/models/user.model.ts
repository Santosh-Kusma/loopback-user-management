import { Entity, model, property } from '@loopback/repository';

@model()
export class User extends Entity {

  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  userId?: string;

  @property({
    type: 'string',
    required: true,
  })
  userName: string;

  @property({
    type: 'string',
    required: true,
    index: { unique: true },
    jsonSchema: {
      format: 'email',
    },
  })
  email: string;

  @property({
    type: 'string',
    required: true,
    index: { unique: true },
    jsonSchema: {
      pattern: '^[6-9]\\d{9}$',
    },
  })
  mobileNo: string;

  @property({
    type: 'string',
    jsonSchema: {
      enum: ['Male', 'Female', 'Other', 'NA'],
    },
  })
  gender?: string;

  @property({
    type: 'number',
    jsonSchema: {
      minimum: 0,
    },
  })
  age?: number;

  @property({
    type: 'string',
    default: 'NA',
  })
  location?: string;

  @property({
    type: 'string',
    required: true,
    jsonSchema: {
      minLength: 8 // simple password length validation
    }
  })
  password: string;

  constructor(data?: Partial<User>) {
    super(data);
  }
}

export interface UserRelations { }
export type UserWithRelations = User & UserRelations;
