import { BearerPermit } from '../../..'

export const permit = new BearerPermit({
  query: 'token',
})

export const request = {
  method: 'GET',
  url: '/?token=token',
}

export const credentials = 'token'
