import {belongsTo, column } from '@adonisjs/lucid/orm'
import Project from './project.js'
import type{ BelongsTo } from '@adonisjs/lucid/types/relations'
import Language from './language.js'
import CustomBaseModel from './customBaseModel.js'

export default class ProjectTranslation extends CustomBaseModel {

  @column()
  declare projectId: number

  @column()
  declare name: string

  @column()
  declare description: string


  @belongsTo(() => Project, {
    foreignKey: 'projectId'
  })
  public declare project: BelongsTo<typeof Project>

  @column()
  public declare languageId: number;

  @belongsTo(()=>Language,{
    foreignKey:'languageId'
  })
  public declare language: BelongsTo<typeof Language>

}