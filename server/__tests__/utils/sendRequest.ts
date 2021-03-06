import request from 'supertest';
import server from '../../src/app';
import { Method } from '../../src/types';

export const sendRequest = (
  method: Method,
  url: string,
  accessToken?: string,
  body?: object,
  query?: object | string
) => {
  if (!url.startsWith('/api/v1')) {
    const base = '/api/v1';
    url = base + url;
  }
  let newRequest = request(server)[method](url);
  if (accessToken) {
    newRequest = newRequest.set('authorization', `bearer ${accessToken}`);
  }
  if (body) {
    newRequest = newRequest.send(body);
  }
  if (query) {
    newRequest = newRequest.query(query);
  }
  return newRequest;
};
