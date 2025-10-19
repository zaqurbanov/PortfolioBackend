import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'about_translations'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('about_id').unsigned().references('abouts.id').onDelete('CASCADE')
      table.integer('language_id').unsigned().references('languages.id').onDelete('CASCADE')
      table.text('content').notNullable()
      table.unique(['about_id', 'language_id'])
      table.timestamps(true, true)
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}