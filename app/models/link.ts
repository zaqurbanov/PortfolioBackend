import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column } from '@adonisjs/lucid/orm'
import Project from './project.js'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'

export default class Link extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column()
  public declare type:string

  @column()
  public declare link:string

  @column()
  public declare projectId:number

  @belongsTo(()=>Project,{
    foreignKey:'projectId'
  })
  public declare project:BelongsTo<typeof Project>

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}