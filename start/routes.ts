/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'
const mainPrefix = 'api/v1'
router.get('/', async () => {
  return {
    hello: 'world',
  }
})

router.group(()=>{
  router.resource('lang',"#controllers/langs_controller")
  router.resource('category','#controllers/categories_controller')
  router.resource('skill','#controllers/skills_controller')
  router.resource('role','#controllers/roles_controller')
  router.resource('contact','#controllers/contacts_controller')
  router.resource('project','#controllers/projects_controller')
}).prefix(mainPrefix)


