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

    this.axios.get(`http://k-appdev.com:3003/rooms/${this.room_id}/messages`)
    .then(res => {
      this.$store.commit('initMessage', res.data );

      var that = this;
      res.data.forEach(function(v, i, a){
        that.addMessage(v);
      });
    })
    .catch(err => {
      console.log(err)
    });
  },

  methods: {
    addMessage(messageData){
      text2png.convert(messageData).then(res=>{
        var box = this.Bodies.rectangle(100, 100, res.w, res.h,{ 
          restitution: 0.2,
          
          render: {
            sprite: {
              texture: res.url
            }
          }
        });
      console.log(box)
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
      this.addMessage(val)
    },
  }
}
</script>