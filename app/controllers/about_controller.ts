import About from '#models/about'
import { createAbout } from '#validators/about'
import type { HttpContext } from '@adonisjs/core/http'
import db from '@adonisjs/lucid/services/db'

export default class AboutController {
    async index({}: HttpContext) {
        return await About.query().preload('translations')

    }
    async show({request}: HttpContext) {
        return await About.query().where('id', request.param('id')).preload('translations').firstOrFail()
    }
    async store({request}: HttpContext) {

        const payload  = await createAbout.validate(request.all())
        const about = await db.transaction(async trx =>{
            const newAbout = await About.create({}, {client: trx})
            await newAbout.related('translations').createMany(payload.translations, {client: trx})
            return newAbout
        })
        await about.load((loader)=>{
            loader.load('translations')
        })

        return about
        
      
    }
    async update({request}: HttpContext) {
        const about  = await About.query().where('id', request.param('id')).firstOrFail()

        const payload = await createAbout.validate(request.all())
      const updatedAbout =  await db.transaction(async (trx) => {
            about.useTransaction(trx)
            await about.related('translations').updateOrCreateMany(payload.translations, ['languageId'],{client: trx})
            return about
        })

        await updatedAbout.load((loader) => {
            return loader.load('translations')
        })
        return updatedAbout
    }
    async destroy({request}: HttpContext) {
const about = await About.query().where('id', request.param('id')).firstOrFail()
await about.delete()
return about

    }

}