import {  column } from '@adonisjs/lucid/orm'
import CustomBaseModel from './customBaseModel.js'

export default class Contact extends CustomBaseModel {

  @column()
  declare name: string

  
  @column()
  declare value:string

  @column()
  declare icon:string
}