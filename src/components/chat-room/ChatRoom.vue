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

    var that = this;
    this.$store.state.roomMessages.forEach(function(v, i, a){
      that.addMessage(v.message);
    });
  },

  methods: {
    addMessage(message){
      text2png.convert(message).then(res=>{
        var box = this.Bodies.rectangle(100, 100, res.w, res.h,{ 
          restitution: 1.1,
          render: {
            sprite: {
              texture: res.url
            }
          }
        });
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
      this.addMessage(val.message)
    },
  }
}
</script>