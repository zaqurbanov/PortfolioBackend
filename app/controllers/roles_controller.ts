import Role from '#models/role'
import { createRoleValidator, updateRoleValidator } from '#validators/role'
import type { HttpContext } from '@adonisjs/core/http'
import firstOrFailHelper from '../../helper/firstOrFailHelper.js'

export default class RolesController {
    async index ({}: HttpContext) {
        return Role.all()

    }

    async show ({request}: HttpContext) {
        return await firstOrFailHelper(Role, request.param('id'))
    }

    async store ({request}: HttpContext) {
        const payload = await createRoleValidator.validate(request.only(['name']), { meta: { tableName: 'roles' } })

        return await Role.create(payload)
    }

    async update ({request}: HttpContext) {
        const role  = await firstOrFailHelper(Role, request.param('id'))
        const payload = await updateRoleValidator.validate(request.only(['name']), { meta: { id: role.id, tableName: 'roles' } })

    const data = role.merge(payload)
        await data.save()
        return data    
    }

    async destroy ({request}: HttpContext) {
        const role  = await firstOrFailHelper(Role, request.param('id'))
        await role.delete()
        return role
    }
}