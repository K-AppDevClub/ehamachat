<style lang="scss" scoped>
</style>

<template>
  <div>
    <p v-for="(data,index) in messages" v-bind:key="index" style="text-align: left;">
      {{data.name}}: {{data.message}}
    </p>
    <v-ons-input id="message_input" placeholder="Input your message" float></v-ons-input>
    <v-ons-button v-if="messageChannel" @click="speak">送信</v-ons-button>
  </div>
</template>

<script>
export default {
  name: 'ehama-form',
  props: {
    room_id: {
      default: 1,
    },
    name: {
      default: "ほしなり",
    },
  },
  data() {
    return {
      messages: [],
      messageChannel: null,
    };
  },
  beforeDestroy() {
    // this.messageChannel.perform('unsubscribed');
    this.$cable.subscriptions.remove(this.messageChannel);
  },
  destroyed() {
    console.log("destroyed component")
  },
  mounted() {
    var that = this
    this.messageChannel = this.$cable.subscriptions.create( "MessageChannel",
      {
        connected() {
          console.log("connected");
          this.perform('room_login', {room_id: that.room_id, name: that.name});
        },
        disconnected() {
          console.log("disconnected")
        },
        received(data) {
          console.log("received", data);
          that.messages.push(data)
        },
      }
    )
  },
  methods: {
    speak() {
      var msg = document.getElementById('message_input').value || "hellooo"
      this.messageChannel.perform('speak', {name: this.name, message: msg });
    },
  }
};
</script>
