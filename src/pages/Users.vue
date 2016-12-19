<template>
	<main-layout>
		<div class="eight wide column">
            <h2 class="ui header">Users</h2>

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
                            Add user
                        </button>
                    </div>
                </div>
            </div>

            <div class="ui divided list selection" v-if="items.length>0">
                <div class="item" v-for="item in filteredItems"
                          @click="selectItem(item)">
                    <div class="content">
                    	<div class="header">{{ item.username }}</div>
                    </div>
                </div>
            </div>

            <div class="ui message" v-if="items.length===0">
                <p>Empty</p>
            </div>
        </div>
        <div class="eight wide column" v-if="item">
            <h2 class="ui header">User form</h2>

            <form @submit.prevent="saveItem">
                <div class="ui form">
                    <div class="field required">
                        <div class="ui input">
                            <input type="text" placeholder="Username"
                                    v-model="item.username"
                                    autocomplete="off">
                        </div>
                    </div>

                    <div class="field required" v-if="!item.id">
                        <div class="ui input">
                            <input type="password" placeholder="Password"
                                    v-model="item.password"
                                    autocomplete="off">
                        </div>
                    </div>

                    <div class="ui grid">
                        <div class="two column row">
                            <div class="left floated column">
                                <button type="submit" class="ui button primary">
                                    <i class="checkmark icon"></i>
                                    Save
                                </button>
                            </div>
                            <div class="right floated right aligned column"  v-if="item.id">
                                <button type="button" class="ui negative button" @click="removeItem">
                                    <i class="trash icon"></i>
                                    Remove
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    </main-layout>
	</main-layout>
</template>

<script>
	import MainLayout from '../layouts/Main.vue';
    import { UserRepository } from '../repositories/user.js';

	export default {
        components: {
            MainLayout
        },

        data () {
            return {
                search: '',
                item: null,
                items: [],
                repository: new UserRepository()
            };
        },

        created () {
            this.loadItems();
        },

        computed: {
            filteredItems () {
                var self = this
                return self.items.filter(function (item) {
                    return item.username.indexOf(self.search) !== -1
                })
            }
        },

        methods: {
            loadItems () {
                var self = this;

                self.repository.findAll().then(function (items) {
                    self.items = items;
                });
            },

            selectItem (item) {
                this.item = item;
            },

            newItem () {
                this.item = {};
            },

            saveItem () {
                var self = this;

                self.repository.save(self.item).then(function () {
                    self.loadItems();
                    self.item = {};
                });
            },

            removeItem () {
                var self = this;
                
                self.repository.delete(self.item).then(function () {
                    self.loadItems();
                    self.item = {};
                });
            }
        }
    }
</script>