import Matter from "matter-js"

export function generateCanvas() {
  return {
    render: function(createElement){
      return createElement(
        'div', {
          style: this.style,
          class: this.cssClasses,
          ref: "canvas"
        },
      )
    },
    
    props: {
      width: {
        default: 640,
        type: Number
      },
      height: {
        default: 480,
        type: Number
      },
      cssClasses: {
        type: String,
        default: ''
      },
      styles: {
        type: Object
      },
    },
    
    data() {
      return {
        Engine: Matter.Engine, World: Matter.World, 
        Bodies: Matter.Bodies, Render: Matter.Render,
     }
    },

    methods:{
      createCanvas() {
        var stage = this.$refs.canvas;
        console.log(stage)
        var engine = this.Engine.create()
        var render = this.Render.create({
          element: stage,
          engine: engine, 
          options: {
            width: this.width, height: this.height, 
            pixelRatio: 2, //Pixel比; スマホ用に2にする
            background: "rgba(0, 20, 20, 120)",
            wireframes: false,
          }
        })
        var boxB = this.Bodies.rectangle(450, 50, 80, 80); 
        var x = [0, this.width, this.width/2]
        var y = [this.height / 2, 0, this.height]
        var w = [30, this.width]
        var h = [this.height, 30]
        var ground =  this.Bodies.rectangle(this.width/2, this.height,   this.width, 30, { isStatic: true });
        var groundt = this.Bodies.rectangle(this.width/2, 0,             this.width, 30, { isStatic: true });
        var groundr = this.Bodies.rectangle(this.width,   this.height/2, 30,         this.height, { isStatic: true });
        var groundl = this.Bodies.rectangle(0,            this.height/2, 30,         this.height, { isStatic: true });
        //var ground = this.Bodies.rectangle(this.width/2, this.height-30, this.width, 15, { isStatic: true });
        this.World.add(engine.world, [boxB, ground, groundl, groundr, groundt]);
        engine.world.gravity.y = 0.1; //重力を0に設定 デフォルトは1
        this.Engine.run(engine);
        this.Render.run(render)
      },
    }
  }
}

export const ChatRoom = generateCanvas();
export default{
  ChatRoom,
}
