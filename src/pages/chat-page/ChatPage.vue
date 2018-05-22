<template>
  <ons-page>
    <navbar navType="back" backType="router" v-bind:msg="room_name"></navbar>
    <chat-room/>
    <chat v-bind:room_id="room_id" v-bind:name="user_name"/>
  </ons-page>
</template>

<script>
import Navbar from '../../components/navbar/Navbar';
import EhamaForm from '../../components/form/Form';
import ChatRoom from '../../components/chat-room/ChatRoom'
import Chat from '../../components/chat/Chat'

export default {
  name: 'chat-page',
  components: {
    Navbar,
    EhamaForm,
    ChatRoom,
    Chat,
  },
  created(){
    this.room_id =this.$route.params.room_id;
    this.room_name =this.$route.params.room_name;
    this.user_name = this.$route.params.user_name;
    console.log(this.$route.params);
    console.log(this.room_id);
    console.log(this.room_name);
    console.log(this.user_name);
  },

  data(){
    return{
      room_id:1,
      room_name:"",
      user_name:"",
    }
  },
  method:{
    backHome(){
      this.$router.push({ name: 'home'});
    },
  }
};
</script>