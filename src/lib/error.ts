type ErrorType = 'AuthError' | 'RouteError'

type Options = {
  statusCode: number
  name: ErrorType
}

export class AppError extends Error {
  public statusCode: number
  public name: ErrorType
  public message: string

  constructor(message: string, options: Options) {
    super(message)

    this.statusCode = options.statusCode
    this.name = options.name
    this.message = message
  }
}
