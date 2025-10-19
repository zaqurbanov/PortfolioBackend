export const uniqueHelperForCreateValidator = async (db:any,value:any,field:any,)=>{
    const data  = await db.from(field.meta.tableName)
    .where(field.name, value)
    .first()
    return data ? false : true

}


export const uniqueHelperForUpdateValidator = async (db:any,value:any,field:any)=>{
    const data  = await db.from(field.meta.tableName)
    .whereNot('id',field.meta.id)
    .where(field.name, value)
    .first()
    return data ? false : true

}