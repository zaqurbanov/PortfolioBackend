import Language from '#models/language'
import { createLangValidator, updateLangValidator } from '#validators/lang'
import type { HttpContext } from '@adonisjs/core/http'
import firstOrFailHelper from '../../helper/firstOrFailHelper.js'

export default class LangsController {

    async index({ }: HttpContext) {
        return Language.all()
    }

    async show({ request }: HttpContext) {
        return await firstOrFailHelper(Language, request.param('id'))
    }

    async store({ request }: HttpContext) {
        const payload = await createLangValidator.validate(request.all(), { meta: { tableName: 'languages' } })
        return await Language.create(payload)
    }

    async update({ request, }: HttpContext) {
        const langModel = await firstOrFailHelper(Language, request.param('id'))
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
        const langModel = await firstOrFailHelper(Language, request.param('id'))
        await langModel.delete()
        return langModel
    }
}