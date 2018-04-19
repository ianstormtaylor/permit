import { BearerPermit } from '../../..'

export const permit = new BearerPermit({
  basic: 'password',
})

export const request = {
  method: 'GET',
  url: '/',
}

export const credentials = undefined
