import { Bearer } from '../../..'

export const permit = new Bearer({
  query: 'token',
})

export const request = {
  method: 'GET',
  url: '/?token=token',
}

export const credentials = 'token'
