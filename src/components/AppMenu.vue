<template>
	<div>
		<app-menu-item v-for="item in items" 
						:href="item.href"
						:label="item.label"
						@click="itemClick(item)">
		</app-menu-item>
	</div>
</template>

<script>
	import AppMenuItem from './AppMenuItem.vue'
	import routes from '../routes'

	export default {
		components: {
			AppMenuItem
		},

		computed: {
			items () {
				var items = [];
				for (var i in routes) {
					items.push({
						href: i,
						label: routes[i].label
					});
				}

				return items;
			}
		},

		methods: {
			itemClick (item) {
				this.$root.currentRoute = item.href;

				window.history.pushState(
		          	null,
					routes[item.href],
	          		item.href
		        );

				this.$emit('change', item);
			}
		}
	}

</script>