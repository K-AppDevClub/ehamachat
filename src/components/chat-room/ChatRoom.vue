<script>
import { ChatRoom } from './ChatRoomBase.js'
import text2png from "../../services/text2png.js"
import { runInThisContext } from 'vm';

export default {
  extends: ChatRoom,
  props: {
      room_id: {
        type: Number,
        default: 0
      },
      name: {
        default: "ほしなり",
      },
    },
  data(){
    return{
      users: [],
      colors: ["red","blue","black","gold","green","lime","pink","gray","orange","turquoise"],
    }
  },
  mounted(){
    this.createCanvas(
      document.documentElement.clientWidth,
      document.documentElement.clientHeight-100
    )

    this.axios.get(`http://k-appdev.com:3003/rooms/${this.room_id}/messages`)
    .then(res => {
      this.$store.commit('initMessage', res.data );
      var that = this;
      res.data.forEach(function(v, i, a){
        that.createUsers(v.name);
        that.addMessage(v);
      });
      this.users.push(this.name);
      console.log(this.users);
    })
    .catch(err => {
      console.log(err)
    });
  },

  methods: {
    createUsers(name){
      var isUserExists = false;
      for(var index in this.users){
        if(this.users[index]== name){
          isUserExists = true;
          break;
        }
      }
      if(!isUserExists){
        this.users.push(name);    
      }
    },
    addMessage(messageData){
      // nameのインデックスどこか調べる
      text2png.convert(messageData, this.colors[this.users.indexOf(messageData.name)]).then(res=>{
        var box = this.Bodies.rectangle(100, 100, res.w, res.h,{
          restitution: 0.2,
          render: {
            sprite: {
              texture: res.url
            }
          }
        });
      // console.log(box)
      this.World.add(this.engine.world, [box]);
      });
    }

  },

  computed: {
    messages() {
      return this.$store.state.newMessage;
    },
  },

  watch: {
    messages: function (val) {
      console.log(val);
      this.createUsers(val.name)
      this.addMessage(val)
    },
  }
}
</script>