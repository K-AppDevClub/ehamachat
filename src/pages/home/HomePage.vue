<style lang='scss' scoped>
.page-title {
  text-align: center;
}
.body {
  margin-top: 50px;
}
</style>

<template>
  <v-ons-page>
    <navbar navType='brank'></navbar>
  <div class='page-content' align='center' msg="RoomList">
    <ons-card>
      <h1> JoinRoom </h1>
      <h2>RoomId:  </h2>
      <v-ons-list-item>
        <v-ons-input placeholder="（例：なんでも）" float v-model="join_name"></v-ons-input>
      </v-ons-list-item>
      <v-ons-button style="margin: 6px 0" @click="joinRoom()">はいる！</v-ons-button>
    </ons-card>
    <ons-card>
      <h1> MakeRoom </h1>
      <h2>RoomName: </h2>
      <v-ons-list-item>
        <v-ons-input placeholder="（例：俺たち陽きゃ）" float v-model="make_name"></v-ons-input>
      </v-ons-list-item>
      <v-ons-button style="margin: 6px 0" @click="makeRoom()">つくる！</v-ons-button>
    </ons-card>
    <!-- <v-ons-fab @click="makeRoom()" style="position:fixed;" modifier="material" position="bottom right" >
      <v-ons-icon icon="md-plus"></v-ons-icon>
    </v-ons-fab> -->
  </div>
  </v-ons-page>
</template>

<script>
import LoadingIndicator from '../../components/loading-indicator/LoadingIndicator';
import CreatePlan from '../../pages/create-plan/CreatePlan';
import RegionPage from '../../pages/region/Region';
import DetailPlan from '../../pages/detail-plan/DetailPlan';
import Navbar from '../../components/navbar/Navbar';
import Config from '../../config/Config';
import ChatPage from '../../pages/chat-page/ChatPage' 

export default {
  name: 'posts-page',
  components: {
    //LoadingIndicator,
    Navbar,
  },
  params: {
    roomid: {
      default: 1,
    },
  },
  data() {
    return {
      joinurl: `http://k-appdev.com:3003/rooms/search`,
      makeurl:`http://k-appdev.com:3003/rooms`, 
      config: Config,
      join_name: '',
      make_name: '',
    };
  },
  methods: {
  
    joinRoom(){
      //console.log(this.paramsid);
      this.axios.post(this.joinurl, {
          name: this.join_name
      })
      .then(res => {
        console.log(res)
        this.roomid = res.data.id
        console.log(res.data.id)
        this.$router.push({ name: 'chat-page' , params:{roomid: this.roomid}});
      });
    },
    makeRoom(){
      //console.log(this.paramsid);
      this.axios.post(this.makeurl, {
        room: {
          name: this.make_name
        }
      })
      .then(res => {
        console.log(res)
        this.roomid = res.data.id
        console.log(res.data.id)
        this.$router.push({ name: 'chat-page' , params:{roomid: this.roomid}});
        //goChat();
      });
    },
    
  },
  created() {
    // this.axios.get("http://59.157.6.140:3000/plans")
    // .then((res) => {
    //   console.log(res.data);
    //   this.experiences = res.data
    // });
  },
  
  computed: {
    currentArea() {
      return this.$store.state.currentArea;
    },
  }
};
</script>
