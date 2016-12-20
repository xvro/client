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
                    <div :class="{field: true, required: true, error: errors['name']}">
                        <label>Name</label>
                        <input type="text" placeholder="Name"
                                v-model="item.name">
                    </div>

                    <div :class="{field: true, required: true, error: errors['username']}">
                        <label>Username</label>
                        <input type="text" placeholder="Username"
                                v-model="item.username"
                                autocomplete="off">
                    </div>

                    <div :class="{field: true, required: true, error: errors['password']}" v-if="!item.id">
                        <label>Password</label>
                        <input type="password" placeholder="Password"
                                v-model="item.password"
                                autocomplete="off">
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
    import { UserRepository } from '../repositories/user.js';
    import VueComponent from '../controllers/crud.js';

    let crud = VueComponent({
        data: {
            repository: new UserRepository()
        }
    });

    export default crud
</script>