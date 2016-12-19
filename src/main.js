import Vue from 'vue'
import routes from './routes'


var app = new Vue({
	el: '#app',
	data: function () {
		return {
			currentRoute: window.location.pathname
		}
	},
	computed: {
    	ViewComponent () {
      		const matchingView = routes[this.currentRoute] ? routes[this.currentRoute].view : 'Home'
      		
      		return matchingView
	        			? require('./pages/' + matchingView + '.vue')
	    				: require('./pages/404.vue')
    	}
  	},
	render (h) {
    	return h(this.ViewComponent)
  	}
});