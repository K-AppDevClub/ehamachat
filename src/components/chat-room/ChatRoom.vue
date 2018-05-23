<script>
import { ChatRoom } from './ChatRoomBase.js'
import text2png from "../../services/text2png.js"
import { runInThisContext } from 'vm';

export default {
  extends: ChatRoom,
  mounted(){
    this.createCanvas(
      document.documentElement.clientWidth,
      document.documentElement.clientHeight-100
    )
    console.log(this.room_id)
    var that = this;
    console.log(this.$store.state.roomMessages)
    this.$store.state.roomMessages.forEach(function(v, i, a){
      that.addMessage(v.message);
    });
  },

  methods: {
    addMessage(message){
      text2png.convert(message).then(res=>{
        var cir = this.Bodies.circle(30*10, 50, 20, { 
          restitution: 1.1,
          render: {
            sprite: {
              texture: res.url
            }
          }
        });
      this.World.add(this.engine.world, [cir]);
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
      console.log(val.message);
      this.addMessage(val.message)
    },
  }
}
</script>