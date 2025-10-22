import About from '#models/about'
import Category from '#models/category'
import Contact from '#models/contact'
import Language from '#models/language'
import Project from '#models/project'
import Role from '#models/role'
import Skill from '#models/skill'
import User from '#models/user'
import env from '#start/env'
import { BaseSeeder } from '@adonisjs/lucid/seeders'

export default class extends BaseSeeder {
  async run() {
    // Write your database queries inside the run method
    await User.firstOrCreate({
      fullName: 'Zaur Qurbanov',
      email: env.get('ADMIN_EMAIL'),
      password: env.get('ADMIN_PASSWORD'),
    })
    const langAz = await Language.create({name:'Azərbaycanca',code:'az'})
    const langEn = await Language.create({name:'English',code:'en'})


    const categoryFront = await Category.create({name:'Frontend',icon:'fa-brands fa-html5'})
     await Category.create({name:'Backend',icon:'fa-solid fa-server'})
    const roleDev = await Role.create({name:'Frontent Developer'})
     await Contact.create({icon:'fa-solid fa-envelope',name:'Email',value:'qurbanovzaur078@gmail.com'})


    const skill = await Skill.create({name:"React",categoryId:categoryFront.id})
    
    const project1 = await Project.create({roleId:roleDev.id})
   await project1.related('translations').createMany([
      {languageId:langAz.id,name:'Menim ilk azerbaycan dilinde olan proyektim',description:'Menim ilk azerbaycan dilinde olan proyektimin description hisesi'},
      {languageId:langEn.id,name:'My first project in Azerbaijani',description:'My first project in Azerbaijani description'}
    ])


    await project1.related('links').createMany([
      {link:'https://github.com',type:'github'},
      {link:'https://www.google.com',type:'web'}
    ])

    await project1.related('skills').sync([skill.id])


    const aboutMain = await About.create({})
    await aboutMain.related('translations').createMany([
      {languageId:langAz.id,content:'Menim ilk azerbaycan dilinde olan about hisesi',aboutId:aboutMain.id},
    ])
  }
}