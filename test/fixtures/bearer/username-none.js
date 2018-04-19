import { BearerPermit } from '../../..'

export const permit = new BearerPermit({
  basic: 'username',
})

export const request = {
  method: 'GET',
  url: '/',
}

export const credentials = undefined
