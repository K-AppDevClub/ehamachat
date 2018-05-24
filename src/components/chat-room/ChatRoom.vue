<script>
import { ChatRoom } from './ChatRoomBase.js'
import text2png from "../../services/text2png.js"
import { runInThisContext } from 'vm';
import EventMixin from "./EventMixin.js"
//import { promises } from 'fs';

export default {
  extends: ChatRoom,
  mixins: [EventMixin],

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
  
      res.data.forEach( (v, i, a) => {
        this.createUsers(v.name);
        this.addMessage(v);
      });

      this.addGround(this.width, this.height);
      this.addcatapult();
      this.users.push(this.name);

    })
    .catch(err => {
      console.log(err)
    });

    this.addMouseEvent("startdrag", (e)=>{
      this.shakeScene(this.engine);
      this.$store.commit('newDragObj', e.body );
    });
    
    this.addMouseEvent("mousemove", (e)=> {
      console.log(e.mouse.position);
      this.$store.commit('changeDragPos', {x:e.mouse.position.x, y:e.mouse.position.y} );
    })
  },

  methods: {
    createUsers(name){
      if( name in this.users ) return ;
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

    addGround(w, h, tbrl="tbrl"){
      //[top, bottom, right, left]   [x, y, width, height]
      var propaty = {"b":[w/2, h, w, 30], "t":[w/2, 0, w, 30], "r":[w, h/2, 30, h], "l":[0, h/2, 30, h]};
      var groundList = tbrl.split("").map( (key) => { 
        return this.Bodies.rectangle(...propaty[key], { isStatic: true });
      });
      this.World.add(this.engine.world, groundList)
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