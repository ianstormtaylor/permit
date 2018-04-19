import { Bearer } from '../../..'

export const permit = new Bearer({
  basic: 'username',
})

export const request = {
  method: 'GET',
  url: '/',
}

export const credentials = undefined
