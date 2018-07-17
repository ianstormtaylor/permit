import { Bearer } from '../../..'

export const permit = new Bearer({
  header: 'x-custom',
})

export const request = {
  method: 'GET',
  url: '/',
}

export const credentials = undefined
