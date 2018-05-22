<template>
  <ons-page>
    <navbar></navbar>
    <navbar navType="back" backType="router" msg=""></navbar>
    <h1> Hellooooooo </h1>
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
    console.log(this.$route.params.roomid);
    this.roomidd =this.$route.params.roomid;
    console.log(this.roomidd);
  },
  data(){
    return{
      roomidd:1
    }
    
  },
  method:{
    backHome(){
      this.$router.push({ name: 'home'});
    },
  }
  
};
</script>