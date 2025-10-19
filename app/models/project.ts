import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column, hasMany, manyToMany } from '@adonisjs/lucid/orm'
import Role from './role.js'
import type{ BelongsTo, HasMany, ManyToMany } from '@adonisjs/lucid/types/relations'
import Skill from './skill.js'
import ProjectTranslation from './project_translation.js'
import Link from './link.js'

export default class Project extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare roleId:number

  @belongsTo(()=>Role,{
    foreignKey:'roleId'
  })
  public declare role: BelongsTo<typeof Role>


  @manyToMany(()=>Skill,{
    pivotTable:'project_skills',
  })



  public declare skills: ManyToMany<typeof Skill>

  @hasMany(()=>ProjectTranslation,{
    foreignKey:'projectId'
  })

  public declare translations: HasMany<typeof ProjectTranslation>

  @hasMany(() => Link, {
    foreignKey: 'projectId'
  })
  public declare links: HasMany<typeof Link>

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}