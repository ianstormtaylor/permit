import { BasicPermit } from '../../..'

export const permit = new BasicPermit()

export const request = {
  method: 'GET',
  url: '/',
  headers: {
    Authorization: `Basic ${Buffer.from('username:password').toString(
      'base64'
    )}`,
  },
}

export const credentials = ['username', 'password']
