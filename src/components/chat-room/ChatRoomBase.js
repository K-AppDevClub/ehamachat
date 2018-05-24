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
        Vector: Matter.Vector,
        render: null, 
        engine: null,
        mouseConstraint: null,
        MouseConstraint: Matter.MouseConstraint, Mouse: Matter.Mouse,
        Constraint: Matter.Constraint,
        Composites: Matter.Composites,
        Composite: Matter.Composite,
        Common: Matter.Common,
     }
    },

    methods:{
      createCanvas(CanvasOption) {
        var stage = this.$refs.canvas;
        this.engine = Matter.Engine.create()
        this.render = Matter.Render.create({
          element: stage,
          engine: this.engine, 
          options: CanvasOption
        });

        var mouse = Matter.Mouse.create(this.render.canvas);
        this.mouseConstraint = Matter.MouseConstraint.create(this.engine, {
            mouse: mouse,
            constraint: {
              stiffness: 0.2,
              render: {
                visible: false
              }
            }
        });

        this.engine.world.gravity.y = 1.0; //重力を0に設定 デフォルトは1
        Matter.World.add(this.engine.world, [this.mouseConstraint]);
        this.render.mouse = mouse;
        Matter.Engine.run(this.engine);
        Matter.Render.run(this.render);
      },

      addMouseEvent(eventName, func){
        Matter.Events.on(this.mouseConstraint, eventName, func) 
      },

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
