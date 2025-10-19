import { DateTime } from 'luxon'
import { BaseModel, column, hasMany } from '@adonisjs/lucid/orm'
import AboutTranslation from './about_translation.js'
import type{ HasMany } from '@adonisjs/lucid/types/relations'

export default class About extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @hasMany(() => AboutTranslation, {
    foreignKey: 'aboutId'
  })
  public declare translations: HasMany<typeof AboutTranslation>
  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}