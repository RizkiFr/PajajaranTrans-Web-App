<template>
  <v-app>
    <v-content>
      <transition>
        <router-view></router-view>
      </transition>
    </v-content>
  </v-app>
</template>

<script>

export default {
  name: 'App',
}
</script>

<style>
.slide-leave-active,
.slide-enter-active {
  transition: .5s ease-in-out;
}
.slide-enter {
  transform: translate(30%, 0);
}
.slide-leave-to {
  display: none;
}
</style>
