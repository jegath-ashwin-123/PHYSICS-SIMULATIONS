

var Engine = Matter.Engine,
Render = Matter.Render,
Runner = Matter.Runner,
Bodies = Matter.Bodies,
Body = Matter.Body,
Composite = Matter.Composite,
Mouse = Matter.Mouse,
MouseConstraint = Matter.MouseConstraint; 
Constraint = Matter.Constraint;
Events = Matter.Events;
// create an engine
Matter.use('matter-attractors');
var engine = Engine.create();

// create a renderer
var render = Render.create({
element: document.getElementById("sim"),
engine: engine,
options: {
    width: 800,
    height: 600,
    showAngleIndicator: false,
    wireframes: false

}
});


var circleA = Bodies.circle(250,250,20,{restitution:1});
var circleB = Bodies.circle(430,250,20,{restitution:1});
var circleC = Bodies.circle(290,250,20,{restitution:1});
var circleD = Bodies.circle(470,250,20,{restitution:1});
var circleE = Bodies.circle(100,250,20);

push = (function(){
Body.applyForce(circleE,circleE.position,{
    x:0.158,
    y:0
})
console.log("they pushed me")
})


circleE.render.fillStyle = "silver";
circleD.render.fillStyle = "silver";
circleB.render.fillStyle = "silver";
circleA.render.fillStyle = "silver";
circleC.render.fillStyle = "silver";

// create two boxes and a ground
var boxA = Bodies.rectangle(210, 250, 37, 37,{mass:3},{
plugin: {
attractors: [
  function(boxA, circleE) {
    return {
      x: (boxA.position.x - circleE.position.x) * 1e-4,
      y: (boxA.position.y - cir.position.y) * 1e-4,
    };
  }
]
}},{restitution: 4});


var boxB = Bodies.rectangle(390, 250, 37, 37,{restitution: 0.5});



boxA.render.fillStyle = "Grey";
boxB.render.fillStyle = "Grey";

circleA.friction = 0;
circleB.friction = 0;
circleC.friction = 0;
circleD.friction = 0;
circleE.friction = 0;

var constraint = Constraint.create({
bodyA: boxA,
bodyB: circleA,
render:{
    visible:false
}

});
var constraint2 = Constraint.create({
bodyA: boxB,
bodyB: circleB,
render:{
    visible:false
}

});

Composite.add(engine.world,[constraint,constraint2])

/*var boxc = Bodies.rectangle(520, 250, 37, 37);
var boxd = Bodies.rectangle(500, 180, 80, 80);*/

var ground3 = Bodies.rectangle(360,230, 500, 40, { isStatic: true });
var ground2 = Bodies.rectangle(300,350, 500, 30, { isStatic: true });
var ground = Bodies.rectangle(400, 610, 810, 60, { isStatic: true });
var wall = Bodies.rectangle(900, 200, 270, 800, { isStatic: true });
ground3.render.fillStyle = "gold";
ground2.render.fillStyle = "gold";
ground.render.fillStyle = "gold";
wall.render.fillStyle = "gold";
var constraint3 = Constraint.create({
bodyA: circleC,
bodyB: boxB,
render:{
  visible:false
}
});

function sleep(ms) {
return new Promise((resolve) => setTimeout(resolve, ms));
}

Events.on(engine, 'collisionStart',async function(event) {
var pairs = event.pairs;
for (let [index, val] of pairs.entries()) {
if(val.bodyA.id == circleC.id && val.bodyB.id == boxB.id){
  await sleep(15)
  Composite.add(engine.world, Constraint.create({
    bodyA: circleC,
    bodyB: boxB,
    render:{
      visible:false
    }
  }))
}
if(val.bodyA.id == circleE.id && val.bodyB.id == boxA.id){
  await sleep(100)
  Composite.add(engine.world, Constraint.create({
    bodyA: circleE,
    bodyB: boxA,
    render:{
      visible:false
    }
  }))
}

}

});

// add all of the bodies to the world
Composite.add(engine.world, [boxA, boxB,circleA,circleB,circleC,circleD,circleE,wall,ground3, ground,ground2]);

var mouse = Mouse.create(render.canvas);
var mouseConstraint = MouseConstraint.create(engine, {
        mouse: mouse,
        constraint: {
            stiffness: 1,
            render:{
                visible: false              
              }
        }
    });

Composite.add(engine.world, mouseConstraint);

// keep the mouse in sync with rendering
render.mouse = mouse;

// run the renderer
Render.run(render);

// create runner
var runner = Runner.create();

// run the engine
Runner.run(runner, engine);