import { Bearer } from '../../..'

export const permit = new Bearer({
  cookie: 'token',
})

export const request = {
  method: 'GET',
  url: '/',
  headers: {
    cookie: 'token=token',
  },
}

export const credentials = 'token'
