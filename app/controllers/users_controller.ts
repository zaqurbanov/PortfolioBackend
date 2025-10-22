import User from '#models/user';
import type { HttpContext } from '@adonisjs/core/http'
import hash from '@adonisjs/core/services/hash';

export default class UsersController {
    async login ({auth,request,response}: HttpContext) {
        const {email,password} = request.only(['email','password'])
        // const user  = await auth.use('api').getUserOrFail()
        const user  = await User.verifyCredentials(email,password)
        console.log(user);
        if(user){
            const accessToken = await User.accessTokens.create(user,['*'],{
                expiresIn: '2 days',
            })
            return accessToken
        }else{
            return response.unauthorized()
        }
         
        
    }
}