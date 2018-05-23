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
        Composite: Matter.Composite,
        Common: Matter.Common,
     }
    },

    methods:{
      createCanvas(CanvasOption) {
        var stage = this.$refs.canvas;
        this.engine = this.Engine.create()
        this.render = this.Render.create({
          element: stage,
          engine: this.engine, 
          options: CanvasOption
        });
        var width = CanvasOption.width, height = CanvasOption.height;
        // var boxB = this.Bodies.rectangle(450, 50, 80, 80); 
        var ground =  this.Bodies.rectangle(width/2, height,   width, 30, { isStatic: true });
        var groundt = this.Bodies.rectangle(width/2, 0,        width, 30, { isStatic: true });
        var groundr = this.Bodies.rectangle(width,   height/2, 30,    height, { isStatic: true });
        var groundl = this.Bodies.rectangle(0,       height/2, 30,    height, { isStatic: true });
     
        var mouse = Matter.Mouse.create(this.render.canvas);
        var mouseConstraint = Matter.MouseConstraint.create(this.engine, {
            mouse: mouse,
            constraint: {
                stiffness: 0.2,
                render: {
                    visible: false
                }
            }
        });

        this.engine.world.gravity.y = 1.0; //重力を0に設定 デフォルトは1
        Matter.World.add(this.engine.world, [mouseConstraint, ground, groundl, groundr, groundt]);
        // keep the mouse in sync with rendering
        this.render.mouse = mouse;
        this.Engine.run(this.engine);
        this.Render.run(this.render);

        this.Events.on(mouseConstraint, "startdrag", (e) => {
          this.shakeScene(this.engin);
          console.log(e.body);
          this.$store.commit('newDragObj', e.body );
        });
        this.Events.on(mouseConstraint, "mousemove", (e) => {
          console.log(e.mouse.position);
          this.$store.commit('changeDragPos', {x:e.mouse.position.x,y:e.mouse.position.y} );
        });
      },

      // クリックしたらめっちゃ飛ぶやつ
      shakeScene(engine) {
        var bodies = this.Composite.allBodies(this.engine.world);
        for (var i = 0; i < bodies.length; i++) {
          var body = bodies[i];
          var forceMagnitude = 0.02 * body.mass;
          this.Body.applyForce(body, body.position, {
            x: (forceMagnitude + this.Common.random() * forceMagnitude) * this.Common.choose([1, -1]),
            y: -forceMagnitude + this.Common.random() * -forceMagnitude
          });
        }
      },
      add(){
        var boxB = this.Bodies.rectangle(450, 50, 80, 80); 
        this.World.add(engine.world)
      }
    },

    beforeDestroy (){
      Matter.Runner.stop(this.engine)
      Matter.Runner.stop(this.render)
      Matter.Composite.allBodies(this.engine.world).forEach(element => {
        Matter.Composite.remove(this.engine.world, element)
      });
      Matter.World.clear(this.engine.world)
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
