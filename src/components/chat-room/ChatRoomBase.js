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
            width: 640, height: 600, 
            pixelRatio: 2, //Pixel比; スマホ用に2にする
            background: "rgba(0, 20, 20, 120)",
            wireframes: false,
          }
        })
        var boxB = this.Bodies.rectangle(450, 50, 80, 80);
        var ground = this.Bodies.rectangle(400, 610, 810, 60, { isStatic: true });
        this.World.add(engine.world, [boxB, ground]);
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
