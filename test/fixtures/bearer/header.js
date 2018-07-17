import { Bearer } from '../../..'

export const permit = new Bearer({
  header: 'x-custom',
})

export const request = {
  method: 'GET',
  url: '/',
  headers: {
    'X-Custom': 'token',
  },
}

export const credentials = 'token'
