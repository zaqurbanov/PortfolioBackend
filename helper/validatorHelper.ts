export const isExistValidator = async (db: any, value: any, field: any) => {
    const data = await db.from(field.meta.existsTableName).where('id', Number(value)).first()
    return data
}