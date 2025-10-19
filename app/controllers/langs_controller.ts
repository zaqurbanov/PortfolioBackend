import Language from '#models/language'
import { createLangValidator, updateLangValidator } from '#validators/lang'
import type { HttpContext } from '@adonisjs/core/http'

export default class LangsController {

    async index({ }: HttpContext) {
        return Language.all()
    }

    async show({ request }: HttpContext) {
        return await Language.findByOrFail('id', request.param('id'))
    }

    async store({ request }: HttpContext) {
        const payload = await createLangValidator.validate(request.all(), { meta: { tableName: 'languages' } })
        return await Language.create(payload)
    }

    async update({ request, }: HttpContext) {
        const langModel = await Language.findByOrFail('id', request.param('id'))
        const payload = await updateLangValidator.validate(request.all(), {
            meta: {
                id: langModel.id,
                tableName: 'languages'
            }
        })

        langModel.merge(payload)
        await langModel.save()
        return langModel
    }

    async destroy({ request }: HttpContext) {
        const langModel = await Language.findByOrFail('id', request.param('id'))
        await langModel.delete()
        return langModel
    }
}