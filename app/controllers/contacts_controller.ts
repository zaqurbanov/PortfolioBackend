import Contact from '#models/contact'
import { createContact, updateContact } from '#validators/contact'
import type { HttpContext } from '@adonisjs/core/http'
import firstOrFailHelper from '../../helper/firstOrFailHelper.js'

export default class ContactsController {
    async index({ }: HttpContext) {
        return await Contact.query()
    }
    async show({ request }: HttpContext) {
        return await firstOrFailHelper(Contact, request.param('id'))
    }
    async store({ request }: HttpContext) {
        const payload = await createContact.validate(request.only(['name', 'value', 'icon']), {
            meta: {
                tableName: 'contacts'
            }
        })
        return await Contact.create(payload)
    }
    async update({ request }: HttpContext) {
        const contact = await firstOrFailHelper(Contact, request.param('id'))
        const payload = await updateContact.validate(request.only(['name', 'value', 'icon']), {
            meta: {
                id: contact.id,
                tableName: 'contacts'
            }
        })
        contact.merge(payload)
        await contact.save()
        return contact
    }
    async destroy({ request }: HttpContext) {

        const contact = await firstOrFailHelper(Contact, request.param('id'))
        await contact.delete()
        return contact

    }
}