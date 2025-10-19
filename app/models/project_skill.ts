import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column } from '@adonisjs/lucid/orm'
import Project from './project.js'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import Skill from './skill.js'

export default class ProjectSkill extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

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

    
  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}