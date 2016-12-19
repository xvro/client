import { GenericRepository } from './generic.js'

export class UserRepository extends GenericRepository {

    constructor() {
        super('/users');
    }
}