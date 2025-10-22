/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import UsersController from '#controllers/users_controller'
import router from '@adonisjs/core/services/router'
import { middleware } from './kernel.js'
import { ResourceActionNames } from '@adonisjs/core/types/http'
const mainPrefix = 'api/v1'
const userMethods :ResourceActionNames[] = ['index','show'] as const
const adminMethods :ResourceActionNames[] = ['store','destroy','update'] as const
router.get('/', async () => {
  return {
    hello: 'world',
  }
})

router.group(()=>{

  router.group(()=>{
    router.resource('lang',"#controllers/langs_controller").only(userMethods)
    router.resource('category','#controllers/categories_controller').only(userMethods)
    router.resource('skill','#controllers/skills_controller').only(userMethods)
    router.resource('role','#controllers/roles_controller').only(userMethods)
    router.resource('contact','#controllers/contacts_controller').only(userMethods)
    router.resource('project','#controllers/projects_controller').only(userMethods)
    router.resource('about','#controllers/about_controller').only(userMethods)
    router.resource('link','#controllers/links_controller').only(userMethods)

 
    
  })

     router.group(()=>{
      router.resource('lang',"#controllers/langs_controller").only(adminMethods)
    router.resource('category','#controllers/categories_controller').only(adminMethods)
    router.resource('skill','#controllers/skills_controller').only(adminMethods)
    router.resource('role','#controllers/roles_controller').only(adminMethods)
    router.resource('contact','#controllers/contacts_controller').only(adminMethods)
    router.resource('project','#controllers/projects_controller').only(adminMethods)
    router.resource('about','#controllers/about_controller').only(adminMethods)
    router.resource('link','#controllers/links_controller').only(adminMethods)
    }).use(middleware.auth())
  router.post('/login',[UsersController,'login'])
}).prefix(mainPrefix)


