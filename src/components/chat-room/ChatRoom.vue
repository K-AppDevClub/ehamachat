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
    this.axios.get(`http://k-appdev.com:3003/rooms/${this.room_id}/messages`)
    .then(res => {
      console.log(res.data)
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
      box.message = messageData;
      console.log(box)
      this.World.add(this.engine.world, [box]);
      });
    }

  },

  computed: {
    messages() {
      return this.$store.state.newMessage;
    },
    dragObj() {
      return this.$store.state.dragObj;
    },
    dragPos() {
      return this.$store.state.dragPos;
    },
    dragStream() {
      return this.$store.state.dragStream;
    },
  },

  watch: {
    messages: function (val) {
      console.log(val);
      this.addMessage(val)
    },
    dragObj: function (obj) {
      this.Body.setPosition(obj, obj.position )
    },
    dragPos: function (position) {
      this.Body.setPosition(this.dragObj, position )
    },
    dragStream: function (data) {
      this.engine.world.bodies.forEach((obj,i,a) => {
        if(!obj.message) return;
        if(obj.message.id == data.message_id) {
          console.log(data)
          var _x = data.x
          var _y = data.y
          this.Body.setPosition(obj, { x:_x, y:_y } )
        }
      });
    },
  }
}
</script>