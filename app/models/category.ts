import { column, hasMany } from '@adonisjs/lucid/orm'
import Skill from './skill.js'
import type { HasMany } from '@adonisjs/lucid/types/relations'
import CustomBaseModel from './customBaseModel.js'

export default class Category extends CustomBaseModel {

  @column()
  declare name: string

  @column()
  declare icon: string | null

  @hasMany(() => Skill, {
    foreignKey: 'categoryId'
  })
  public declare skills: HasMany<typeof Skill>

}