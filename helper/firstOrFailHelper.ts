export default  async function firstOrFailHelper(Model:any,id:number,...preloads:string[]) {
        const query =  Model.query().where('id', id)
        
        for (const relation of preloads) {
            query.preload(relation as any)
        }

        return await query.firstOrFail()
    }