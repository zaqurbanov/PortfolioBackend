import { hasMany } from '@adonisjs/lucid/orm'
import AboutTranslation from './about_translation.js'
import type{ HasMany } from '@adonisjs/lucid/types/relations'
import CustomBaseModel from './customBaseModel.js'

export default class About extends CustomBaseModel {

  @hasMany(() => AboutTranslation, {
    foreignKey: 'aboutId'
  })
  public declare translations: HasMany<typeof AboutTranslation>

}