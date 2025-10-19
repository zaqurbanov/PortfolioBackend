import vine from '@vinejs/vine'
import { uniqueHelperForCreateValidator, uniqueHelperForUpdateValidator } from '../../helper/uniqueHelperForCreateValidator.js'


export const createContact = vine.compile(
    vine.object({
        name:vine.string().trim().minLength(2),
        value:vine.string().trim().unique(async(db,value,field)=>await uniqueHelperForCreateValidator(db,value,field)).minLength(2),
        icon:vine.string().optional()
    })
)

export const updateContact = vine.compile(
    vine.object({
        name:vine.string().trim().minLength(2),
        value:vine.string().trim().unique(async(db,value,field)=>await uniqueHelperForUpdateValidator(db,value,field)).minLength(2),
        icon:vine.string().optional()
    })
)