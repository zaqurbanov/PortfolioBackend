import { column, hasMany } from '@adonisjs/lucid/orm'
import Project from './project.js'
import type { HasMany } from '@adonisjs/lucid/types/relations'
import CustomBaseModel from './customBaseModel.js'

export default class Role extends CustomBaseModel {

  @column()
  declare name: string

  @hasMany(()=>Project,{
    foreignKey:'roleId'
  })
  public declare projects: HasMany<typeof Project>
}