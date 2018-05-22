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
        <v-ons-input placeholder="（例：12345678）" float v-model="joinid"></v-ons-input>
      </v-ons-list-item>
      <v-ons-button style="margin: 6px 0" @click="joinChat()">はいる！</v-ons-button>
    </ons-card>
    <ons-card>
      <h1> MakeRoom </h1>
      <h2>RoomName: </h2>
      <v-ons-list-item>
        <v-ons-input placeholder="（例：俺たち陽きゃ）" ></v-ons-input>
      </v-ons-list-item>
      <v-ons-button style="margin: 6px 0" @click="makeChat()">つくる！</v-ons-button>
    </ons-card>
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
  methods: {
    goChat(){
      this.$router.push({ name: 'chat-page' , params:{roomid: this.roomid}});
    },
    joinChat(){
      this.roomid=this.joinid;
      console.log(this.roomid);
      this.$router.push({ name: 'chat-page' , params:{roomid: this.roomid}});
    },
    makeChat(){
      this.$router.push({ name: 'chat-page' , params:{roomid: this.roomid}});
    },
    postRoomname(){
      //console.log(this.paramsid);
      this.axios.post(this.url, {
        room: {
          room_id: this.room_id
        }
      })
      .then(res => {
        console.log(res)
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
  data() {
    return {
      config: Config,
      joinid:1,
    };
  },
  computed: {
    currentArea() {
      return this.$store.state.currentArea;
    },
  }
};
</script>
