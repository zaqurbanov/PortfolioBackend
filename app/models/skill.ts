import {  belongsTo, column,  manyToMany } from '@adonisjs/lucid/orm'
import Category from './category.js'
import type { BelongsTo,  ManyToMany } from '@adonisjs/lucid/types/relations'
import Project from './project.js'
import CustomBaseModel from './customBaseModel.js'

export default class Skill extends CustomBaseModel {

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
}