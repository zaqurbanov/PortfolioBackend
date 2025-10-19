import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column } from '@adonisjs/lucid/orm'
import About from './about.js'
import type{ BelongsTo } from '@adonisjs/lucid/types/relations'
import Language from './language.js'

export default class AboutTranslation extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare aboutId: number

  @belongsTo(() => About, {
    foreignKey: 'aboutId'
  })
  public declare about: BelongsTo<typeof About>

  @column()
  declare languageId: number

  @belongsTo(() => Language, {
    foreignKey: 'languageId'
  })
  public declare language: BelongsTo<typeof Language>
  

  @column()
  declare content: string

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}