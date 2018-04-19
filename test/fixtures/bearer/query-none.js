import { Bearer } from '../../..'

export const permit = new Bearer({
  query: 'token',
})

export const request = {
  method: 'GET',
  url: '/',
}

export const credentials = undefined
