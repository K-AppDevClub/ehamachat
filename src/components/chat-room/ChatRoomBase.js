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
        MouseConstraint: Matter.MouseConstraint, Mouse: Matter.Mouse,
        Composites: Matter.Composites,
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

        // var boxB = this.Bodies.rectangle(450, 50, 80, 80); 
        var ground =  this.Bodies.rectangle(this.width/2, this.height,   this.width, 30, { isStatic: true });
        var groundt = this.Bodies.rectangle(this.width/2, 0,             this.width, 30, { isStatic: true });
        var groundr = this.Bodies.rectangle(this.width,   this.height/2, 30,         this.height, { isStatic: true });
        var groundl = this.Bodies.rectangle(0,            this.height/2, 30,         this.height, { isStatic: true });
        //var ground = this.Bodies.rectangle(this.width/2, this.height-30, this.width, 15, { isStatic: true });

        var cirA = this.Bodies.circle(320, 50, 40, { restitution: 1.5 });
        var mouse = this.Mouse.create(render.canvas);
        var mouseConstraint = this.MouseConstraint.create(engine, {
            mouse: mouse,
            constraint: {
                stiffness: 0.2,
                render: {
                    visible: false
                }
            }
        });
        
        var stack = this.Composites.stack(100, 300, 20, 7, 0, 0, (x, y) => {
          return this.Bodies.rectangle(x, y, 25, 25);
        });
        
        engine.world.gravity.y = 0.5; //重力を0に設定 デフォルトは1
        this.World.add(engine.world, [stack, cirA, mouseConstraint, ground, groundl, groundr, groundt]);
        // keep the mouse in sync with rendering
        render.mouse = mouse;
        this.Engine.run(engine);
        this.Render.run(render);
      },
    }
  }
}

export const ChatRoom = generateCanvas();
export default{
  ChatRoom,
}
