import Link from '#models/link'
import { createLink, updateLink } from '#validators/link'
import type { HttpContext } from '@adonisjs/core/http'
import firstOrFailHelper from '../../helper/firstOrFailHelper.js'

export default class LinksController {
    async index({}:HttpContext){
        return await Link.query().preload('project')
    }
    async show({request}:HttpContext){
        return await firstOrFailHelper(Link, request.param('id'),'project')

    }

    async store({request}:HttpContext){

        const payload = await createLink.validate(request.all())
        return await Link.create(payload)

    }

    async update({request}:HttpContext){
        const link = await firstOrFailHelper(Link, request.param('id'),'project')
        const payload = await updateLink.validate(request.all(),{meta:{id:link.id}})
        link.merge(payload)
        await link.save()
        return link

    }

    async destroy({request}:HttpContext){
        const link = await firstOrFailHelper(Link, request.param('id'),'project')
        await link.delete()
        return link
    }
}