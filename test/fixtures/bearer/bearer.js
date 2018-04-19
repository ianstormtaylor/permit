import { Bearer } from '../../..'

export const permit = new Bearer()

export const request = {
  method: 'GET',
  url: '/',
  headers: {
    Authorization: `Bearer token`,
  },
}

export const credentials = 'token'
