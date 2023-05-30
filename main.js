status=""
img=""
objects=[]
song=""

function preload()
{
    img=loadImage("dog_cat.jpg")
    song=loadSound("Alert Sound Effect.mp3")
}

function setup(){
 canvas=createCanvas(380, 380)
 canvas.center()
 video=createCapture(VIDEO)
 video.size(380,380)
 video.hide()  
}

function draw()
{
    image(video, 0, 0, 380,380)

    if( status != "")
    {
        r=floor(random(255))
        g=floor(random(255))
        b=floor(random(255))
        objectDetector.detect(video, gotResults)
        for( i = 0; i < objects.length; i++)
        {
            document.getElementById("status").innerHTML= "Status : Objects detected";
            if(objects[i].label == "person" && objects.length >= 1)
            {
                document.getElementById("no_of_obj").innerHTML="Baby found"
                song.stop();
            }
            else
            {
                document.getElementById("no_of_obj").innerHTML="Baby not found"
                song.play()
            }
            if(objects.length == 0)
            {
                document.getElementById("no_of_obj").innerHTML="Baby not found"
                song.play()
            }
            fill(r,g,b)
            stroke(r,g,b)
            noFill();
            percent=floor(objects[i].confidence*100);
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height)
            text( objects[i].label+" "+percent + "%", objects[i].x+15, (objects[i].y+15))
        }            
    }
    
    
}    



function modelLoaded()
{
    console.log("Model loaded!")
    status=true 
}

function gotResults(error, results)
{
    if(error)
    {
        console.log(error)
    }
    console.log(results)
    objects=results;
}

function start()
{
    objectDetector=ml5.objectDetector('cocossd', modelLoaded) 
 document.getElementById("status").innerHTML = "Status : Detecting Objects"
}