import { BearerPermit } from '../../..'

export const permit = new BearerPermit()

export const request = {
  method: 'GET',
  url: '/',
  headers: {
    Authorization: `Bearer token`,
  },
}

export const credentials = 'token'
