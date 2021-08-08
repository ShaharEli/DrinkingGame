export type Falsy<T> = T | false;
export type Platform = 'ios' | 'android' | 'web' | 'macos';
export type Maybe<T> = T | null;
export type ValueOf<T> = T[keyof T];
export type Method = 'get' | 'post' | 'put' | 'delete' | 'patch';
