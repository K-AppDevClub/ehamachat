import Matter from "matter-js"

export default {
  methods: {
    shakeScene(engine) {
      Matter.Composite.allBodies(engine.world).forEach( (body, i, a) => {
        var forceMagnitude = 0.02 * body.mass;
        Matter.Body.applyForce(body, body.position, {
          x: (forceMagnitude + Matter.Common.random() * forceMagnitude) * Matter.Common.choose([1, -1]),
          y: -forceMagnitude + Matter.Common.random() * -forceMagnitude
        });
      })
    },
  }
}