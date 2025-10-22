import app from '@adonisjs/core/services/app'
import { HttpContext, ExceptionHandler } from '@adonisjs/core/http'
interface CustomError {
  code?: string
  message?: string
  messages?: { message: string }[]
  status?: number
}
export default class HttpExceptionHandler extends ExceptionHandler {
  /**
   * In debug mode, the exception handler will display verbose errors
   * with pretty printed stack traces.
   */
  protected debug = !app.inProduction

  /**
   * The method is used for handling errors and returning
   * response to the client
   */
  async handle(error: CustomError, ctx: HttpContext) {
    const response = await super.handle(error, ctx)

    if(error ) {
      const statusCode = ctx.response.getStatus()
      
      const messages =  error?.messages?.map(message => message.message)
      if(ctx.response.isPending){

        ctx.response.status(statusCode).send({
          success: false,
          error: error.code,
          statusCode,
          message: error.message,
          messages:messages
        })
      }
      
    }
    
    return response
  }

  /**
   * The method is used to report error to the logging service or
   * the third party error monitoring service.
   *
   * @note You should not attempt to send a response from this method.
   */
  async report(error: unknown, ctx: HttpContext) {
    return super.report(error, ctx)
  }
}
