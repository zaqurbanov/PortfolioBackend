import vine from '@vinejs/vine'
import { uniqueHelperForCreateValidator, uniqueHelperForUpdateValidator } from '../../helper/uniqueHelperForCreateValidator.js'

export const createRoleValidator = vine.compile(
    vine.object({
        name:vine.string().trim().unique(async (db, value, field) => uniqueHelperForCreateValidator(db, value, field)).minLength(2)
    })
)
export const updateRoleValidator = vine.compile(
    vine.object({
        name:vine.string().trim().unique(async (db, value, field) => uniqueHelperForUpdateValidator(db, value, field)).minLength(2)
    })
)