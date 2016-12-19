<template>
	<a :href="href"
		:class="{ active: isActive, item: true }" 
		@click="click">
        {{ label }}
    </a>
</template>

<script>

	export default {
		props: {
			label: {
				type: String,
				required: true
			},
			href: {
				type: String,
				required: true
			}
		},

		computed: {
			isActive () {
				return this.href === this.$root.currentRoute
			}
		},

		methods: {
			click (event) {
				event.preventDefault()
				this.$emit('click');
			}
		}
	}

</script>