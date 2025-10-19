import vine from '@vinejs/vine'
import { uniqueHelperForCreateValidator, uniqueHelperForUpdateValidator } from '../../helper/uniqueHelperForCreateValidator.js'
import { isExistValidator } from '../../helper/validatorHelper.js'



export const createSkill = vine.compile(
    vine.object({
        name: vine.string().trim().unique(async (db, value, field) => uniqueHelperForCreateValidator(db, value, field)).minLength(2),
        categoryId: vine.number().exists(async (db, value, field) => await isExistValidator(db, value, field))
    })
)
export const updateSkill = vine.compile(
    vine.object({
        name: vine.string().trim().unique(async (db, value, field) => uniqueHelperForUpdateValidator(db, value, field)),
        categoryId: vine.number().exists(async (db, value, field) => await isExistValidator(db, value, field))
    })
)