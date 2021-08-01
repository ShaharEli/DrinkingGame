import {Maybe} from '.';
import {IUser} from './user';

export interface FetchOptions {
  method: string;
  mode: string;
  cache: string;
  body?: string;
  headers?: Headers;
}
declare class Stringified<T> extends String {
  private ___stringified: T;
}
declare global {
  interface JSON {
    stringify<T>(
      value: T,
      replacer?: (key: string, value: any) => any,
      space?: string | number,
    ): string & Stringified<T>;
    parse<T>(text: Stringified<T>, reviver?: (key: any, value: any) => any): T;
    parse(text: string, reviver?: (key: any, value: any) => any): any;
  }
}

export type LoginReturnType = Promise<Maybe<IUser>>;
export interface PassAndEmail {
  password: string;
  email: string;
}
export interface Tokens {
  accessToken: string;
  refreshToken: string;
}

export type UserAndTokens = {user: IUser} & Tokens;
