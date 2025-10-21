import {  belongsTo, column } from '@adonisjs/lucid/orm'
import Project from './project.js'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import Skill from './skill.js'
import CustomBaseModel from './customBaseModel.js'

export default class ProjectSkill extends CustomBaseModel {

  @column()
  declare projectId: number

  @column()
  declare skillId: number


  @belongsTo(()=>Project,{
    foreignKey:'projectId'
  })
  
  public declare project: BelongsTo<typeof Project>
  
    @belongsTo(()=>Skill,{
      foreignKey:'skillId'
    })
    public declare skill: BelongsTo<typeof Skill>
}