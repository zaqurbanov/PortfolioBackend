import vine from '@vinejs/vine'
import { uniqueHelperForCreateValidator, uniqueHelperForUpdateValidator } from '../../helper/uniqueHelperForCreateValidator.js'

export const createLangValidator = vine.compile(
    vine.object({
        name: vine.string().trim().unique(async (db, value, field) => uniqueHelperForCreateValidator(db, value, field)),
     
        code: vine.string().trim().unique(async (db, value,field) => uniqueHelperForCreateValidator(db, value, field)),

    })
)
export const updateLangValidator = vine.compile(
    vine.object({
        name: vine.string().trim().unique(async (db, value, field) => uniqueHelperForUpdateValidator(db, value, field)),
        code: vine.string().trim().unique(async (db, value, field) => uniqueHelperForUpdateValidator(db, value, field)),
    })
)