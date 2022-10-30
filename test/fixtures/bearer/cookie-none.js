import { Bearer } from '../../..'

export const permit = new Bearer({
  cookie: 'token',
})

export const request = {
  method: 'GET',
  url: '/',
}

export const credentials = undefined
