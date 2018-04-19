import { BasicPermit } from '../../..'

export const permit = new BasicPermit({
  query: ['username', 'password'],
})

export const request = {
  method: 'GET',
  url: '/?username=username&password=password',
}

export const credentials = ['username', 'password']
