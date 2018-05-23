<style lang="scss" scoped>
</style>

<template>
  <div>
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
    this.$cable.subscriptions.remove(this.messageChannel);
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
          if(data.status=="msg")
            that.$store.commit('addMessage', data );
          if(data.status=="drag")
            that.$store.commit('newDragStream', data );
        },
      }
    )
  },
  methods: {
    speak() {
      var msg = document.getElementById('message_input').value || "hellooo"
      this.messageChannel.perform('speak', {
        name: this.name, 
        message: msg, 
        obj_state: {}, 
      });
    },
    drag(position) {
      var obj_state = {
        x: position.x, 
        y: position.y, 
        message_id: this.dragObj.message.id,
      }
      this.messageChannel.perform('drag', obj_state);
    },
  },
  computed: {
    dragObj() {
      return this.$store.state.dragObj;
    },
    dragPos() {
      return this.$store.state.dragPos;
    },
  },
  watch: {
    dragObj: function (obj) {
      console.log(obj);
      this.drag({x:obj.position.x,y:obj.position.y});
    },
    dragPos: function (position) {
      console.log(position);
      this.drag(position);
    },
  }
};
</script>
