import config from '../config.js'

export default {
    endpoint: config.apiEndpoind,

    request (method, uri, data) {
        const deferred = jQuery.Deferred();

        jQuery.ajax({
            url: this.endpoint + uri,
            type: method,
            data: data,
            success: function(response) {
                deferred.resolve(response);
            },
            error: function (response) {
                var data = JSON.parse(response.responseText);
                deferred.reject(data);
            }
        });

        return deferred.promise();
    },

    get (uri, data) {
        return this.request('GET', uri, data);
    },

    post (uri, data) {
        return this.request('POST', uri, data);
    },

    put (uri, data) {
        return this.request('PUT', uri, data);
    },

    delete (uri) {
        return this.request('DELETE', uri);
    }
}