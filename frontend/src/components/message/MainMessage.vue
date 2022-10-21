<template>
  <div class="message-content" :style="{backgroundColor: bgColor}">
    <span class="message-text">
      <strong v-if="message.username">{{ message.username }}: </strong> {{ message.text }}
    </span>
    <div class="message-date">
      <span> [{{ message.date }}] </span>
    </div>
  </div>
</template>

<script>
export default {
  data: function () {
    return {
      bgColor: this.message.bgColor || '#dad8d8',
    }
  },
  name: "MainMessage",
  props: ["message"],
};
</script>

<style>
.message-content {
  display: flex;
  flex-direction: column;
  padding: 5px;
  margin: 5px;
  border-radius: 10px;
}

.message-content .message-date {
  align-self: flex-end;
  font-size: 0.7rem;
}
</style>