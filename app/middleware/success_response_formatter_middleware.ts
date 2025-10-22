import type { HttpContext } from '@adonisjs/core/http'
import type { NextFn } from '@adonisjs/core/types/http'

export default class SuccessResponseFormatterMiddleware {
  async handle(ctx: HttpContext, next: NextFn) {
    /**
     * Middleware logic goes here (before the next call)
     */
    await next()
    const body = ctx.response.getBody()

    if (body && (body.success === true || body.success === false)) {
      return
    }
    if (!ctx.response.hasContent) {
      ctx.response.send({
        success: true,
        statusCode: ctx.response.getStatus(),

        data: {}
      })
      return
    };
    ctx.response.send({
      success: true,
      statusCode: ctx.response.getStatus(),
      data: body
    })
    /**
     * Call next method in the pipeline and return its output
     */
    // const output = await next()
    // return output
  }
}