<template>
  <div class="pusher">
    <div class="ui grid">
    <div class="ui left fixed vertical inverted menu">
        <h1 class="ui header inverted brand">XVRO</h1>

        <app-menu></app-menu>
    </div>

    <div class="ui main grid">
      <slot>
        <h1>Hello world!</h1>
      </slot>
  </div>
  </div>
</template>

<script>
  import AppMenu from '../components/AppMenu.vue'

  export default {
    components: {
      AppMenu
    }
  }
</script>
