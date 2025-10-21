import {  belongsTo, column } from '@adonisjs/lucid/orm'
import About from './about.js'
import type{ BelongsTo } from '@adonisjs/lucid/types/relations'
import Language from './language.js'
import CustomBaseModel from './customBaseModel.js'

export default class AboutTranslation extends CustomBaseModel {

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
}