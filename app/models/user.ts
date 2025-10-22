import hash from '@adonisjs/core/services/hash'
import { compose } from '@adonisjs/core/helpers'
import {  column } from '@adonisjs/lucid/orm'
import { withAuthFinder } from '@adonisjs/auth/mixins/lucid'
import { DbAccessTokensProvider } from '@adonisjs/auth/access_tokens'
import CustomBaseModel from './customBaseModel.js'

const AuthFinder = withAuthFinder(() => hash.use('scrypt'), {
  uids: ['email'],
  passwordColumnName: 'password',
})

export default class User extends compose(CustomBaseModel, AuthFinder) {

  @column()
  declare fullName: string | null

  @column()
  declare email: string

  @column({ serializeAs: null })
  declare password: string



  static accessTokens = DbAccessTokensProvider.forModel(User)
}