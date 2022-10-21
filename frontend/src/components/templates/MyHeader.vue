<template>
  <header class="header">
      <div class="title">
        <router-link to="/">
        <img src="@/assets/logo.png" alt="Logo" width="100"></router-link>
      </div>
    <UserDropdown v-if="!hideUserDropdown" />
  </header>
</template>

<script>
  import UserDropdown from "./UserDropdown.vue"

export default {
  name: "MyHeader",
  components: { UserDropdown },
  props: {
        hideUserDropdown: Boolean
  }
};
</script>

<style>
.header {
  grid-area: header;
  background: linear-gradient(to right,#fff, #f67e25);

  display: flex;
  justify-content: space-between;
  align-items: center;
}

</style>