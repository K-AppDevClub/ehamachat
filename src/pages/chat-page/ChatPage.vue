<template>
  <ons-page>
    <navbar></navbar>
    <h1> Hellooooooo </h1>
    <ehama-form></ehama-form>
    <v-ons-button style="margin: 6px 0" @click="backHome()">もどる！</v-ons-button>
  </ons-page>
</template>

<script>
import Navbar from '../../components/navbar/Navbar';
import EhamaForm from '../../components/form/Form';

export default {
  name: 'chat-page',
  components: {
    Navbar,
    EhamaForm,
  },
  params: {
    roomid: {
      default: null,
    },
  },
  created(){
    console.log("huhu");
    console.log(this.$route.params.roomid);
    this.roomidd =this.$route.params.roomid;
    console.log(this.roomidd);
  },
  data(){
    roomidd:1
  },
  method:{
    backHome(){
      this.$router.push({ name: 'home'});
    },
  }
  
};
</script>