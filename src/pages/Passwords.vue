<template>
	<main-layout>
        <div class="eight wide column">
            <h2 class="ui header">Passwords</h2>

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
                            Add password
                        </button>
                    </div>
                </div>
            </div>

            <div class="ui divided list selection" v-if="items.length>0">
                <div class="item" v-for="item in filteredItems"
                          @click="selectItem(item)">
                    <div class="content">
                        <div class="header">{{ item.name }}</div>
                        {{ item.description }}
                    </div>
                </div>
            </div>

            <div class="ui message" v-if="items.length===0">
                <p>Empty</p>
            </div>
        </div>
        <div class="eight wide column" v-if="item">
            <h2 class="ui header">Password form</h2>

            <form @submit.prevent="saveItem">
                <div class="ui form">
                    <div :class="{field: true, required: true, error: errors['name']}">
                        <label>Name</label>
                        <input type="text" placeholder="Name"
                                v-model="item.name">
                    </div>

                    <div :class="{field: true, required: true, error: errors['type']}">
                        <label>Type</label>
                        <input type="text" placeholder="Type"
                            v-model="item.type">
                    </div>

                    <div :class="{field: true, required: true, error: errors['description']}">
                        <label>Description</label>
                        <input type="text" placeholder="Description"
                            v-model="item.description">
                    </div>

                    <div class="field required" v-if="item.id">
                        <button type="button" class="ui button inverted red" :class="{loading: loadingPassword}"
                                              @click="showPassword(item)">
                            <i class="warning sign icon"></i>
                            {{plaintext}}
                        </button>
                    </div>

                    <div :class="{field: true, required: true, error: errors['password']}" v-if="!item.id">
                        <label>Password</label>
                        <input type="text" placeholder="Password"
                            v-model="item.plaintext">
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
</template>

<script>
    import { PasswordRepository } from '../repositories/password.js';
    import VueComponent from '../controllers/crud.js';

    let crud = VueComponent({
        data: {
            loadingPassword: false,
            plaintext: 'Show password',
            repository: new PasswordRepository()
        },
        methods: {
            reset () {
                this.plaintext = 'Show password';
            },

            showPassword (item) {
                var self = this;

                self.loadingPassword = true;

                self.repository.decode(item.id).then(function (data) {
                    self.plaintext = data.raw;
                    self.loadingPassword = false;
                });
            }
        }
    });

    export default crud
</script>