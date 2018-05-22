<script>
import { ChatRoom } from './ChatRoomBase.js'

export default {
  extends: ChatRoom,
  mounted(){
    this.createCanvas(
      document.documentElement.clientWidth,
      document.documentElement.clientHeight-100
    )
    var that = this;
    this.$store.state.roomMessages.forEach(function(v, i, a){ 
      var canvas = document.createElement("canvas")
      canvas.width = 30
      canvas.height = 30
      var ctx = canvas.getContext("2d")
      ctx.font = "10px serif";
      ctx.strokeText("ehama", 10, 10);
      var url = canvas.toDataURL()
      console.log(url)
      var cir = that.Bodies.circle(30+i*10, 50, 20, { 
        restitution: 1.1,
        render: {
          sprite: {
              texture: url
          }
        }
      });
      that.World.add(that.engine.world, [cir]);
    });
  },
  computed: {
    messages() {
      return this.$store.state.newMessage;
    },
  },
  watch: {
    messages: function (val) {
      console.log(val.message);
      var cir = this.Bodies.circle(20, 50, 20, { restitution: 1.1 });
      this.World.add(this.engine.world, [cir]);
    },
  }
}
</script>