import { getManager } from 'typeorm';
import { User } from './../entity/User';

export class UserController {
    async save(user: User) {
        const savedUser = await getManager().save(user)
        return savedUser
    }

    async allUsers() {
        const users = await getManager().find(User)
        return users
    }

    async userById(id: number) {
        const user = await getManager().findOne(User, id)
        return user
    }

    async entryByUser(id: number) {
        const user = await getManager().findOne(User, id, {
            relations: ['entry']
        })
        return user.entry
    }
}