import Vue from 'vue'
import routes from './routes'


var app = new Vue({
	el: '#app',
	data: function () {
		return {
			currentRoute: window.location.hash.substring(1)
		}
	},
	computed: {
    	ViewComponent () {
      		const matchingView = routes[this.currentRoute] ? routes[this.currentRoute].view : '404'
      		
      		return matchingView
	        			? require('./pages/' + matchingView + '.vue')
	    				: require('./pages/404.vue')
    	}
  	},
	render (h) {
    	return h(this.ViewComponent)
  	}
});

alertify.logPosition("top right");