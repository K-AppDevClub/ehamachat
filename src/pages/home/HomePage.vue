<template>
  <v-ons-page>
    <navbar navType="blank" msg="えはまチャット"></navbar>
    <ons-card>
      <h1>ユーザー名入力</h1>
      <v-ons-list-item>
        <span style="margin-right:15px;">ユーザー名: </span>
        <v-ons-input placeholder="（例：燃えるゴミ）" float v-model="user_name"></v-ons-input>
      </v-ons-list-item>
    </ons-card>
    <ons-card>
      <h1>ルームに参加</h1>
      <v-ons-list-item>
        <span style="margin-right:15px;">ルーム名: </span>
        <v-ons-input placeholder="（例：なんでも）" float v-model="join_name"></v-ons-input>
      </v-ons-list-item>
      <v-ons-button style="margin: 6px 0" @click="joinRoom()">はいる！</v-ons-button>
    </ons-card>
    <ons-card>
      <h1>ルームを作る</h1>
      <v-ons-list-item>
        <span style="margin-right:15px;">ルーム名: </span>
        <v-ons-input placeholder="（例：俺たち陽きゃ）" float v-model="make_name"></v-ons-input>
      </v-ons-list-item>
      <v-ons-button style="margin: 6px 0" @click="makeRoom()">つくる！</v-ons-button>
    </ons-card>
    <!-- <v-ons-fab @click="makeRoom()" style="position:fixed;" modifier="material" position="bottom right" >
      <v-ons-icon icon="md-plus"></v-ons-icon>
    </v-ons-fab> -->
  </v-ons-page>
</template>

<script>
import LoadingIndicator from '../../components/loading-indicator/LoadingIndicator';
import RegionPage from '../../pages/region/Region';
import DetailPlan from '../../pages/detail-plan/DetailPlan';
import Navbar from '../../components/navbar/Navbar';
import Config from '../../config/Config';
import ChatPage from '../../pages/chat-page/ChatPage' 
import ChatRoom from '../../components/chat-room/ChatRoom'

export default {
  name: 'posts-page',
  components: {
    LoadingIndicator,
    ChatRoom,
    Navbar,
  },
  data() {
    return {
      joinurl: `http://k-appdev.com:3003/rooms/search`,
      makeurl:`http://k-appdev.com:3003/rooms`, 
      config: Config,
      join_name: '',
      make_name: '',
      user_name: localStorage.getItem('Name'),
      strage_name:''
    };
  },
  methods: {
    joinRoom(){
      this.axios.post(this.joinurl, {
        name: this.join_name
      })
      .then(room_data => {
        console.log(room_data)
        this.goRoom(room_data)
      })
      .catch(err => {
        this.$ons.notification.alert('ルームが存在しません');
      });
    },
    makeRoom(){
      this.axios.post(this.makeurl, {
        room: {
          name: this.make_name
        }
      })
      .then(room_data => {
        console.log(room_data)
        this.goRoom(room_data)

      })
      .catch(err => {
        this.$ons.notification.alert('そのルーム名はすでに使われています');
      });
    },
    goRoom(res) {
      localStorage.setItem('Name' , this.user_name);
      this.$router.push({ name: 'chat-page' ,params: { 
        room_id: res.data.id, 
        room_name: res.data.name, 
        user_name: this.user_name
      } });
    },
  },
  computed: {
    currentArea() {
      return this.$store.state.currentArea;
    },
  }
};
</script>
