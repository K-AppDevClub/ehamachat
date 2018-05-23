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
    this.width=document.documentElement.clientWidth;
    this.height=document.documentElement.clientHeight;
    //console.log(document.documentElement.clientHeight);

    this.axios.get(`http://k-appdev.com:3003/rooms/${this.room_id}/messages`)
    .then(res => {
      this.$store.commit('initMessage', res.data );

      var that = this;
      res.data.forEach(function(v, i, a){
        that.addMessage(v);
      });
      this.addcatapult();
    })
    .catch(err => {
      console.log(err)
    });
  },
  data(){
    return{
      width:1,
      height:1
    }
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
      this.World.add(this.engine.world, [box]);
      });
    },

    addcatapult(){
      var group = this.Body.nextGroup(true);
      var catapult = this.Bodies.rectangle(this.width/2, this.height/2+150, 320, 20, { collisionFilter: { group: group } }); 
      var box = this.Bodies.rectangle(this.width/2, this.height/2+200, 20, 80, { isStatic: true, collisionFilter: { group: group } });
      
      this.World.add(this.engine.world, [
        catapult, box,
        this.Constraint.create({ 
          bodyA: catapult, 
          pointB: this.Vector.clone(catapult.position),
          stiffness: 1,
          length: 0
        })
      ]);
    },
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