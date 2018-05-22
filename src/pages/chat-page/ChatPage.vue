<template>
  <ons-page>
    <navbar></navbar>
    <navbar navType="back" backType="router" msg=""></navbar>
    <chat-room/>
  </ons-page>
</template>

<script>
import Navbar from '../../components/navbar/Navbar';
import EhamaForm from '../../components/form/Form';
import ChatRoom from '../../components/chat-room/ChatRoom'


export default {
  name: 'chat-page',
  components: {
    Navbar,
    EhamaForm,
    ChatRoom,
  },

  params: {
    roomid: {
      default: null,
    },
  },

  created(){
    this.roomidd =this.$route.params.roomid;
  },

  data(){
    return{
      roomidd:1,
    }
    
  },
  method:{
    backHome(){
      this.$router.push({ name: 'home'});
    },
  }
  
};
</script>