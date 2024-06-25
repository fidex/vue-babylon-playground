import { Engine, Scene, FreeCamera, Vector3, MeshBuilder, StandardMaterial, Color3, HemisphericLight, ArcRotateCamera, Color4, AxesViewer} from "@babylonjs/core";
import * as BABYLON from "@babylonjs/core";
import * as GUI from "@babylonjs/gui";
const createScene = (canvas) => {
  const engine = new Engine(canvas);
  const scene = new Scene(engine);

  const camera = new ArcRotateCamera("camera1", 0, 0, 10, new Vector3(0, 0, 0) , scene);
  camera.setTarget(Vector3.Zero());
  camera.attachControl(canvas, true);
  //scene.clearColor = new Color4(.0, 0.5, 0.5, 1);

  // debuggin help
  //const axes = new AxesViewer(scene, 8);

  new HemisphericLight("light", Vector3.Up(), scene);

  let coords1 = [];
  let coords2 = [];
  for (let i=0; i<5; i++){
    coords1.push(Vector3.Random(-3,0))
  }
  for (let i=0; i<3; i++){
    coords2.push(Vector3.Random(0,3))
  }

  const material = new StandardMaterial("sphere-material", scene);
  material.diffuseColor = Color3.White();

  [...coords1, ...coords2].forEach((coord) => {
    const sphere = MeshBuilder.CreateSphere("sphere", {diameter: .2});  
    sphere.material = material;
    sphere.position = coord;

    createLabel("some text", coord, "#65589775")
  });

  const options = {
    points: [...coords1, coords1[0], ...coords2, coords2[0]], //vec3 array,
    updatable: true,
  };
  
  const lines = MeshBuilder.CreateLines("lines", options, scene);
  

  // create a label on a line
  let lable_pos = Vector3.Center(coords1.slice(-1)[0], coords2[0]);
  createLabel("some text", lable_pos)  
  

  engine.runRenderLoop(() => {
    scene.render();
  });
};

const createLabel = (content, position, color="#a8d4ff29") => {
  // GUI
  var plane = BABYLON.Mesh.CreatePlane("plane", 2);
  //plane.parent = sphere;
  plane.position = position;
  plane.position.x += .5;

  plane.billboardMode = BABYLON.Mesh.BILLBOARDMODE_ALL;

  var advancedTexture = GUI.AdvancedDynamicTexture.CreateForMesh(plane);


  var button1 = GUI.Button.CreateSimpleButton("but1", content);
  // this can use css syntax
  button1.width = .5;
  button1.height = 0.2;
  button1.alpha = .9
  button1.color = "white";
  button1.fontSize = 50;
  button1.background = color
  button1.onPointerUpObservable.add(function() {
      alert("you did it!");
  });
  advancedTexture.addControl(button1);
};

export { createScene };