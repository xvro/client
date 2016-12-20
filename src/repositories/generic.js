import ApiService from '../services/api.js'

export class GenericRepository {

	constructor(prefix) {
		this.prefix = prefix;
	}

    get service () {
        return ApiService
    }

    find (id) {
        return ApiService.get(this.prefix + '/' + id);
    }

    findAll (params) {
        return ApiService.get(this.prefix, params);
    }

    save (entity) {
        var promise, 
            data = jQuery.extend({}, entity);

        if (entity.id) {
            delete data.id;
            promise = ApiService.put(this.prefix + '/' + entity.id, data);
        } else {
            promise = ApiService.post(this.prefix, data);
        }

        return promise;
    }

    delete (entity) {
        return ApiService.delete(this.prefix + '/' + entity.id);
    }
}