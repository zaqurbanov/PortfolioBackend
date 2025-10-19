import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column } from '@adonisjs/lucid/orm'
import Project from './project.js'
import type{ BelongsTo } from '@adonisjs/lucid/types/relations'
import Language from './language.js'

export default class ProjectTranslation extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

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

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}