import { GenericRepository } from './generic.js'

export class PasswordRepository extends GenericRepository {

    constructor() {
        super('/passwords');
    }

    decode (id) {
        return this.service.get(this.prefix + '/' + id + '/decode');
    }
}