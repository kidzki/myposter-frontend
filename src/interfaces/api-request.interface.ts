import type Post from './post.interface'

export default interface ApiRequest {
  message: {
    status: string
    code: string
    text: string
  }
  payload: {
    data: Post[]
  }
}
