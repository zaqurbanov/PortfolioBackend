import vine from '@vinejs/vine'



export const createAbout = vine.compile(
    vine.object({
        translations:vine.array(
            vine.object({
            languageId:vine.number().exists(async(db,value)=>{
                const data  = db.from('languages').where('id',value).first()
                return data
            }),
            content:vine.string().trim().minLength(2)
        
        }))
    })
)