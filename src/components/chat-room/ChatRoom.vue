<script>
import { ChatRoom } from './ChatRoomBase.js'
import text2png from "../../services/text2png.js"
import { runInThisContext } from 'vm';

export default {
  extends: ChatRoom,


  data(){
    return {
      CanvasOption:{
        width: document.documentElement.clientWidth, 
        height: document.documentElement.clientHeight-100, 
        pixelRatio: 2,
        background: "rgba(255, 255, 255, 255)",
        wireframes: false,
      },
      width: document.documentElement.clientWidth, 
      height: document.documentElement.clientHeight-100,
      users: [],
      colors: ["red","blue","black","gold","green","lime","pink","gray","orange","turquoise"],
    }
  },

  props: {
      room_id: {
        type: Number,
        default: 0
      },
      name: {
        default: "ほしなり",
      },
    },
  
  mounted(){
    this.createCanvas(this.CanvasOption)

    this.axios.get(`http://k-appdev.com:3003/rooms/${this.room_id}/messages`)
    .then(res => {
      this.$store.commit('initMessage', res.data );
      var that = this;
      res.data.forEach(function(v, i, a){
        that.createUsers(v.name);
        that.addMessage(v);
      });

      this.addcatapult();
      this.users.push(this.name);
    })
    .catch(err => {
      console.log(err)
    });
  },

  methods: {
    createUsers(name){
      for(var index in this.users)
        if(this.users[index] == name) return ;
      this.users.push(name);    
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
      box.message = messageData;
      this.World.add(this.engine.world, [box]);
      });
    },

    addcatapult(){
      var group = this.Body.nextGroup(true);
      var catapult = this.Bodies.rectangle(this.width/2, this.height/2+200, 320, 20, { collisionFilter: { group: group } }); 
      var box = this.Bodies.rectangle(this.width/2, this.height/2+250, 20, 80, { isStatic: true, collisionFilter: { group: group } });
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
      this.createUsers(val.name)
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