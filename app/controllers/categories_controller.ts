import Category from '#models/category'
import { createCategory, updateCategory } from '#validators/category'
import type { HttpContext } from '@adonisjs/core/http'

export default class CategoriesController {
    async index({ }: HttpContext) {
        return Category.all()
    }
    async show({ request}: HttpContext) {
        return await Category.findByOrFail('id', request.param('id'))
    }

    async store({ request}: HttpContext) {
        const payload = await createCategory.validate(request.all(), { meta: { tableName: 'categories' } })
        return await Category.create(payload)
    }

    async update({ request}: HttpContext) {
        const category = await Category.findByOrFail('id', request.param('id'))
        const payload = await updateCategory.validate(request.all(), { meta: { id: category.id, tableName: 'categories' } })

        category.merge(payload)
        await category.save()
        return category
    }

    async destroy({ request}: HttpContext) {
        const category = await Category.findByOrFail('id', request.param('id'))
        await category.delete()
        return category
    }

}