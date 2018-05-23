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
        Engine: Matter.Engine, World: Matter.World, 
        Bodies: Matter.Bodies, Render: Matter.Render,
        Body: Matter.Body, Constraint: Matter.Constraint,
        Vector: Matter.Vector,
        render: null, engine: null,
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
        this.addcatapult()
        this.engine.world.gravity.y = 1.0; //重力を0に設定 デフォルトは1
        this.World.add(this.engine.world, [mouseConstraint, ground, groundl, groundr, groundt]);
        // keep the mouse in sync with rendering
        this.render.mouse = mouse;
        this.Engine.run(this.engine);
        this.Render.run(this.render);
      },

      addcatapult(){
        var group = this.Body.nextGroup(true);
        var catapult = this.Bodies.rectangle(400, 450, 320, 20, { collisionFilter: { group: group } }); 
        var box = this.Bodies.rectangle(400, 500, 20, 80, { isStatic: true, collisionFilter: { group: group } });
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

      addSpring(){

      },

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
