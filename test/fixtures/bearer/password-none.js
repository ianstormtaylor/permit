import { Bearer } from '../../..'

export const permit = new Bearer({
  basic: 'password',
})

export const request = {
  method: 'GET',
  url: '/',
}

export const credentials = undefined
