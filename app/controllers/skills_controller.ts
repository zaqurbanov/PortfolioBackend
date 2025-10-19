import Skill from '#models/skill'
import { createSkill, updateSkill } from '#validators/skill'
import type { HttpContext } from '@adonisjs/core/http'

export default class SkillsController {

    async index({ }: HttpContext) {
        const data = await Skill.query().preload('category')
        return data
    }
    async show({ request }: HttpContext) {
        const category = Skill.query().where('id', request.param('id')).preload('category').firstOrFail()

        return category
    }
    async store({ request }: HttpContext) {
        const requestData = request.only(['name', 'categoryId'])
        const payload = await createSkill.validate(requestData, {
            meta: {
                tableName: 'skills',
                existsTableName: 'categories',
                categoryId: requestData.categoryId
            }
        })
        return await Skill.create(payload)
    }
    async update({ request }: HttpContext) {
        const skill = await Skill.findOrFail(request.param('id'))
        const payload = await updateSkill.validate(request.only(['name', 'categoryId']), {
            meta: {
                tableName: 'skills',
                id: skill.id,
                existsTableName: 'categories',
                categoryId: skill.categoryId
            }
        })

        skill.merge(payload)
        await skill.save()
        return skill
    }
    async destroy({ request }: HttpContext) {
        const skill = await Skill.findOrFail(request.param('id'))
        await skill.delete()
        return skill
    }
}