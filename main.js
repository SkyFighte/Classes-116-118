quick_draw_data_set=["aircraft carrier","airplane","alarm clock","ambulance","angel","animal","ant","anvil","apple","arm","asparagus","axe","backpack","banana","bandage","barn","baseball","baseball bat","basketball","basket","bat","bathtub","beach","bear","beard","bed","bee","belt","bench","bicycle","binoculars","bird","birthday cake"];
random_number=Math.floor((Math.random()*quick_draw_data_set.length)+1);
console.log(quick_draw_data_set[random_number]);
sketch=quick_draw_data_set[random_number];
document.getElementById('sketch_name').innerHTML='Sketch to be drawn-  '+sketch;
timer_couter=0;
timer_check="";
drawn_sketch= "";
ans_holder= "";
score=0;


function setup(){
    canvas=createCanvas(750,300);
canvas.center();
background("white");
canvas.mouseReleased(classifyCanvas);
synth= window.speechSynthesis;

}

function preload(){
    classifier= ml5.imageClassifier('DoodleNet');
    
}

function draw(){
    strokeWeight(13);
    stroke(0);
    if(mouseIsPressed){
        line(pmouseX,pmouseY,mouseX,mouseY);
    }
    check_sketch();
    if(drawn_sketch==sketch){
        ans_holder="set";
        score++;
        document.getElementById('score').innerHTML='Score-  '+score;
        
    }
    
}
function classifyCanvas(){
    classifier.classify(canvas,gotResult);

}
function gotResult(error,results){
    if(error){
        console.error(error);


    }
    console.log(results);
    document.getElementById('label').innerHTML='label-  '+results[0].label;
    document.getElementById('confidence').innerHTML='confidence-  '+Math.round(results[0].cofidence*100)+'%';
    utterThis=new SpeechSynthesisUtterance(results[0].label);
    synth.speak(utterThis);

}
function updateCanvas(){
background("white");
random_number=Math.floor((Math.random()*quick_draw_data_set.length)+1);
console.log(quick_draw_data_set[random_number]);
sketch=quick_draw_data_set[random_number];
document.getElementById('sketch_name').innerHTML='Sketch to be drawn-  '+sketch;
}
function check_sketch(){
    timer_couter++;
    document.getElementById('time').innerHTML='Timer-  '+timer_couter;
    console.log(timer_couter);
    if(timer_couter>400){
    timer_couter=0;
    timer_check="completed";

    }
    if(timer_check=="completed" || ans_holder=="set"){
     timer_check="";
     ans_holder="";
     updateCanvas();   
    }
}