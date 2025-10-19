import { DateTime } from 'luxon'
import { BaseModel, column, hasMany } from '@adonisjs/lucid/orm'
import ProjectTranslation from './project_translation.js'
import type{ HasMany } from '@adonisjs/lucid/types/relations'
import AboutTranslation from './about_translation.js'

export default class Language extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare name: string 

  @column()
  declare code: string


  @hasMany(() => ProjectTranslation, {
    foreignKey: 'languageId'
  })
  public declare projectTranslations: HasMany<typeof ProjectTranslation>
  
@hasMany(() => AboutTranslation, {
  foreignKey: 'languageId'
})
public declare aboutTranslations: HasMany<typeof AboutTranslation>


  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}