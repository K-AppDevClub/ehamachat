import Matter from "matter-js"

export function generateCanvas() {
  return {
    render: function(createElement){
      return createElement(
        'div', {
          ref: "canvas"
        },
      )
    },
    
    props: {
      room_id: {
        type: Number,
        default: 0
      }
    },
    
    data() {
      return {
        Engine: Matter.Engine, 
        World: Matter.World, 
        Events: Matter.Events,
        Bodies: Matter.Bodies, 
        Body: Matter.Body, 
        Render: Matter.Render,
        render: null, 
        engine: null,
        MouseConstraint: Matter.MouseConstraint, Mouse: Matter.Mouse,
        Composites: Matter.Composites,
     }
    },

    methods:{
      createCanvas(width, height) {
        var stage = this.$refs.canvas;
        this.engine = this.Engine.create()
        this.render = this.Render.create({
          element: stage,
          engine: this.engine, 
          options: {
            width: width, height: height, 
            pixelRatio: 2, //Pixel比; スマホ用に2にする
            background: "rgba(255, 255, 255, 255)",
            wireframes: false,
          }
        })

        // var boxB = this.Bodies.rectangle(450, 50, 80, 80); 
        var ground =  this.Bodies.rectangle(width/2, height,   width, 30, { isStatic: true });
        var groundt = this.Bodies.rectangle(width/2, 0,        width, 30, { isStatic: true });
        var groundr = this.Bodies.rectangle(width,   height/2, 30,    height, { isStatic: true });
        var groundl = this.Bodies.rectangle(0,       height/2, 30,    height, { isStatic: true });
     
        var mouse = this.Mouse.create(this.render.canvas);
        var mouseConstraint = this.MouseConstraint.create(this.engine, {
            mouse: mouse,
            constraint: {
                stiffness: 0.2,
                render: {
                    visible: false
                }
            }
        });
        
        this.engine.world.gravity.y = 1.0; //重力を0に設定 デフォルトは1
        this.World.add(this.engine.world, [mouseConstraint, ground, groundl, groundr, groundt]);
        // keep the mouse in sync with rendering
        this.render.mouse = mouse;
        this.Engine.run(this.engine);
        this.Render.run(this.render);

        this.Events.on(mouseConstraint, "startdrag", (e) => {
          console.log(e.body);
          this.$store.commit('newDragObj', e.body );
        });
        this.Events.on(mouseConstraint, "mousemove", (e) => {
          console.log(e.mouse.position);
          this.$store.commit('changeDragPos', {x:e.mouse.position.x,y:e.mouse.position.y} );
        });
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
