import vine from '@vinejs/vine'


export const createLink = vine.compile(
    vine.object({
        type:vine.string().trim().minLength(2),
        link:vine.string().trim().unique(async(db,value)=>{
            const data =await db.from('links').where('link',value).first()
            return data ? false : true
        }).minLength(2).url(),
        projectId:vine.number().exists(async(db,value)=>{
            const data  = db.from('projects').where('id',value).first()
            return data
        })
    })
)
export const updateLink = vine.compile(
    vine.object({
        type:vine.string().trim().minLength(2),
         link:vine.string().trim().unique(async(db,value,field)=>{
            const data =await db.from('links').where('link',value).whereNot('id',field.meta.id).first()
            return data ? false : true
        }).minLength(2).url(),
        projectId:vine.number().exists(async(db,value)=>{
            const data  = db.from('projects').where('id',value).first()
            return data
        })
    })
)