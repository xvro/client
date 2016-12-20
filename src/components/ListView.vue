<template>
	<div>
		<div class="ui grid">
            <div class="two column row">
                <div class="left floated column">

                    <div class="ui icon input">
                        <input type="text" placeholder="Search..." v-model="search">
                        <i class="search icon"></i>
                    </div>

                </div>
                <div class="right floated right aligned column">
                    
                    <button type="button" class="ui primary button" @click="newItem">
                        <i class="plus icon"></i>
                        Add
                    </button>
                </div>
            </div>
        </div>

        <div class="ui divided list selection" v-if="items.length>0">
            <div class="item" v-for="item in filteredItems"
                      @click="selectItem(item)">
                <div class="content">
                	<slot :item="item">
                		<div class="header">{{ item }}</div>
                	</slot>
                </div>
            </div>
        </div>

        <div class="ui message" v-if="items.length===0">
            <p>Empty</p>
        </div>
	</div>
</template>

<script>
	export default {
        data () {
            return {
                search: ''
            }
        },

		props: {
			items: {
				type: Array,
				required: true
			}
		},

		computed: {
            filteredItems () {
                let self = this,
                    search = (self.search || '').toUpperCase();

                return this.items.filter((item) => {
                    for (let i in item) {
                        let prop = item[i];
                        if (typeof(prop) === 'string') {
                            if (prop.toUpperCase().indexOf(search) !== -1) {
                                return true;
                            }
                        }
                    }
                    return false;
                });
            }
        },

		methods: {
			newItem () {
				this.$emit('newItem')
			},

			selectItem (item) {
				this.$emit('selectItem', item)
			}
		}
	}

</script>