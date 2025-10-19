import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'project_translations'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('project_id').unsigned().references('projects.id').onDelete('CASCADE')
      table.integer('language_id').unsigned().references('languages.id').onDelete('CASCADE')
      table.string('name', 50).notNullable()
      table.text('description').notNullable()
      table.unique(['project_id', 'language_id'])
    table.timestamps(true, true)
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}