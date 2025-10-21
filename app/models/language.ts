import {  column, hasMany } from '@adonisjs/lucid/orm'
import ProjectTranslation from './project_translation.js'
import type{ HasMany } from '@adonisjs/lucid/types/relations'
import AboutTranslation from './about_translation.js'
import CustomBaseModel from './customBaseModel.js'

export default class Language extends CustomBaseModel {

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

}