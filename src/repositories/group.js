import { GenericRepository } from './generic.js'

export class GroupRepository extends GenericRepository {

    constructor() {
        super('/groups');
    }
}