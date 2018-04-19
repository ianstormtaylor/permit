import { BearerPermit } from '../../..'

export const permit = new BearerPermit({
  query: 'token',
})

export const request = {
  method: 'GET',
  url: '/',
}

export const credentials = undefined
