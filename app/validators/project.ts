import vine from '@vinejs/vine'

import { isExistValidator } from '../../helper/validatorHelper.js'


export const createProject = vine.compile(
    vine.object({
        
        roleId: vine.number().exists(async (db, value) => { 
                const data = db.from('roles').where('id', Number(value)).first()
                return data
            
        }
    ),
   
    translations:vine.array(
        vine.object({
            languageId:vine.number().exists(async(db,value)=>{
                const data  = db.from('languages').where('id',value).first()
                return data
            }),
            name:vine.string().trim().minLength(2).maxLength(254),
            description:vine.string().trim().minLength(2)
        })
    ),

    links:vine.array(
        vine.object({
            type:vine.string().trim().minLength(2),
            link:vine.string().trim().minLength(2).url()
        })
    ),

    skills:vine.array(
            vine.number().exists(async(db,value)=>{
                const data  = db.from('skills').where('id',value).first()
                return data
            })
    )
    })

   

)

export const updateProject = vine.compile(
    vine.object({
      
        roleId: vine.number().exists(async (db, value, field) => await isExistValidator(db, value, field))
    })
)