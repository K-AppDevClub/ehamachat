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
        render: null, engine: null,
     }
    },

    methods:{
      createCanvas(width, height) {
        var stage = this.$refs.canvas;
        console.log(stage)
        this.engine = this.Engine.create()
        this.render = this.Render.create({
          element: stage,
          engine: this.engine, 
          options: {
            width: width, height: height, 
            pixelRatio: 2, //Pixel比; スマホ用に2にする
            background: "rgba(0, 20, 20, 120)",
            wireframes: false,
          }
        })
        var boxB = this.Bodies.rectangle(100, 50, 80, 80);
        var ground =  this.Bodies.rectangle(width/2, height,   width, 30, { isStatic: true });
        var groundt = this.Bodies.rectangle(width/2, 0,        width, 30, { isStatic: true });
        var groundr = this.Bodies.rectangle(width,   height/2, 30,    height, { isStatic: true });
        var groundl = this.Bodies.rectangle(0,       height/2, 30,    height, { isStatic: true });
        //var ground = this.Bodies.rectangle(this.width/2, this.height-30, this.width, 15, { isStatic: true });
        this.World.add(this.engine.world, [boxB, ground, groundl, groundr, groundt]);
        this.engine.world.gravity.y = 0.1; //重力を0に設定 デフォルトは1
        this.Engine.run(this.engine);
        this.Render.run(this.render);
      },

      add(){
        var boxB = this.Bodies.rectangle(450, 50, 80, 80); 
        this.World.add(engine.world)
      }
    },
    beforeDestroy (){
      Matter.Runner.stop(this.engine)
      Matter.Runner.stop(this.render)
      this.render.canvas.remove();
      this.render.canvas = null;
      this.render.context = null;
      this.render.textures = {};
    },
  }
}

export const ChatRoom = generateCanvas();
export default{
  ChatRoom,
}
