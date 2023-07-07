objects = []
Limage = ""
status = ""
function setup(){
  canvas = createCanvas(400, 400)
  canvas.background("black")
  canvas.center()
  objectDetector = ml5.objectDetector("cocossd", modelLoaded)
  document.getElementById("status").innerHTML = "status: detectando objetos.."
}
function preload(){
   Limage = loadImage("dog_cat.jpg")
}
function draw(){
   image(Limage, 0, 0, 400, 400)
   if(status != ""){
      for(var i = 0; i < objects.length; i++){
         document.getElementById("status").innerHTML = "status: objeto detectado"
         textSize(17)
         fill("orange")
         percent = floor(objects[i].confidence * 100)
         text(objects[i].label + ": " + percent + "%", objects[i].x, objects[i].y)
         noFill()
         stroke("orange")
         rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height)
      }
   }
}
function modelLoaded(){
   console.log("modelo inicializado")
   status = true
   objectDetector.detect(Limage, gotResult)
}
function gotResult(results, error){
   if(error){
      console.log(error)
   }
   console.log(results) 
   objects = results
}