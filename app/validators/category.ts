import vine from '@vinejs/vine'
import { uniqueHelperForCreateValidator, uniqueHelperForUpdateValidator } from '../../helper/uniqueHelperForCreateValidator.js'

export const createCategory = vine.compile(
    vine.object({
        name: vine.string().trim().unique(async (db, value, field) => uniqueHelperForCreateValidator(db, value, field)),
        icon: vine.string().nullable()
    }
    ))

export const updateCategory = vine.compile(
    vine.object({
        name: vine.string().trim().unique(async (db, value, field) => uniqueHelperForUpdateValidator(db, value, field)),
        icon: vine.string().nullable()
    }
    ))