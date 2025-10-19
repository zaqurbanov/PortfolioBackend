import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column,  manyToMany } from '@adonisjs/lucid/orm'
import Category from './category.js'
import type { BelongsTo,  ManyToMany } from '@adonisjs/lucid/types/relations'
import Project from './project.js'

export default class Skill extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare name: string

  @column()
  public declare categoryId: number

  @belongsTo(()=>Category,{
    foreignKey:'categoryId'
  })
  public declare category: BelongsTo<typeof Category>


  @manyToMany(()=>Project,{
    pivotTable:'project_skills',
  })
  public declare projects: ManyToMany<typeof Project>
  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}