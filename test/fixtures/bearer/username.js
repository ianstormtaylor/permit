import { BearerPermit } from '../../..'

export const permit = new BearerPermit({
  basic: 'username',
})

export const request = {
  method: 'GET',
  url: '/',
  headers: {
    Authorization: `Basic ${Buffer.from('token:').toString('base64')}`,
  },
}

export const credentials = 'token'
