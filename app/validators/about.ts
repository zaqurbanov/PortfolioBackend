import vine from '@vinejs/vine'
import { isExistValidator } from '../../helper/validatorHelper.js'



export const createAbout = vine.compile(
    vine.object({
        translations:vine.array(
            vine.object({
            languageId:vine.number().exists(async(db,value,field)=>{
                const data  =await isExistValidator(db,value,field)
                return data
            }),
            content:vine.string().trim().minLength(2)
        
        }))
    })
)