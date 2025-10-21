import {  belongsTo, column } from '@adonisjs/lucid/orm'
import Project from './project.js'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import CustomBaseModel from './customBaseModel.js'

export default class Link extends CustomBaseModel {


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
}