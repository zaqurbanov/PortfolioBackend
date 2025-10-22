import Project from '#models/project'
import { createProject } from '#validators/project'
import type { HttpContext } from '@adonisjs/core/http'
import db from '@adonisjs/lucid/services/db'
import firstOrFailHelper from '../../helper/firstOrFailHelper.js'

export default class ProjectsController {
    async index({ }: HttpContext) {
        return await Project.query().preload('role').preload('skills').preload('translations').preload('links')

    }
    async show({ request }: HttpContext) {
        const project = await firstOrFailHelper(Project, request.param('id'),'role','skills','translations','links')
        return project
    }

    async store({ request }: HttpContext) {


        const payload = await createProject.validate(request.all())
        const project = await db.transaction(async (trx) => {
            const newProject = await Project.create({ roleId: payload.roleId }, { client: trx })

            await newProject.related('translations').createMany(payload.translations, { client: trx })

            await newProject.related('links').createMany(payload.links, { client: trx })

            await newProject.related('skills').attach(payload.skills, trx)

            return newProject
        })
        await project.load((loader) => {
            return loader.load('role').load('skills').load('translations').load('links')
        })
        return project
    }
    async update({ request }: HttpContext) {
        const project = await firstOrFailHelper(Project, request.param('id'),'role','skills','translations','links')

        const payload = await createProject.validate(request.all())
        await db.transaction(async (trx) => {
            project.useTransaction(trx)
            project.merge(payload)
            await project.save()

            await project.related('translations').updateOrCreateMany(payload.translations, ['languageId'])
            project.related('links').updateOrCreateMany(payload.links, ['type'])
            await project.related('skills').sync(payload.skills)
        })

     
        return project
    }
    async destroy({ request }: HttpContext) {
        const project = await firstOrFailHelper(Project, request.param('id'),'role','skills','translations','links')
        await project.delete()
        return project
    }
}
