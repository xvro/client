import MainLayout from '../layouts/Main.vue';
import ListView from '../components/ListView.vue';

export default function (props) {
    let defaults = {
        data: {
            item: null,
            items: [],
            repository: null,
            errors: {}
        },

        components: {
            MainLayout,
            ListView
        },

        methods: {
            reset () {
                this.errors = {};
            },

            loadItems () {
                let self = this;

                self.repository.findAll().then(function (items) {
                    self.items = items;
                });
            },

            selectItem (item) {
                let self = this;

                this.reset();

                self.repository.find(item.id).then(function (item) {
                    self.item = item;
                });
            },

            newItem () {
                this.item = {};
                this.reset();
            },

            saveItem () {
                let self = this;

                self.repository
                    .save(self.item)
                    .then(
                        function () {
                            alertify.success("Save Successful");

                            self.loadItems();
                            self.item = {};
                        },
                        function (data) {
                            self.errors = data.fields || {};
                            
                            alertify.error(data.error);
                        });
            },

            removeItem () {
                let self = this;

                self.repository.delete(self.item).then(function () {
                    alertify.success("Remove Successful");

                    self.loadItems();
                    self.item = {};
                });
            }
        }
    };

    return {
        components: jQuery.extend(defaults.components, props.components || {}),

        data () {
            return jQuery.extend(defaults.data, props.data || {});
        },

        created () {
            this.loadItems();
        },

        computed: jQuery.extend(defaults.computed, props.computed || {}),

        methods: jQuery.extend(defaults.methods, props.methods || {}),
    }
}