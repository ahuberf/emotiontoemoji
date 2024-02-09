Webcam.set({
    width:350,
    height:200,
    Image_format:"png",
    png_quality:100,
})

camera=document.getElementById("camera")

Webcam.attach("#camera")

function takePicture(){
    Webcam.snap(function(datauri){
      document.getElementById("result").innerHTML="<img id='captureimg' src='"+datauri+"'>" 
    })
}

classifier=ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/wtmzJwwxo/model.json",modelLoaded)
function modelLoaded(){
    console.log("modelLoaded")
}


function prediction(){
    img=document.getElementById("captureimg")
    classifier.classify(img, gotResult)
}

function gotResult(error, results){
    if(error){
        console.error(error)
    }
    else{
        console.log(results)
        document.getElementById("result_emotion_name").innerHTML=results[0].label;
        document.getElementById("result_emotion_name2").innerHTML=results[1].label;
        prediction1=results[0].label;
        prediction2=results[1].label;
        speak()
        if(results[0].label == "happy"){
            document.getElementById("update_emoji1").innerHTML="&#128522;";
        }
        if(results[0].label == "sad"){
            document.getElementById("update_emoji1").innerHTML="&#128532;";
        }
        if(results[0].label == "angry"){
            document.getElementById("update_emoji1").innerHTML="&#128548;";
        }
        if(results[1].label == "happy"){
            document.getElementById("update_emoji2").innerHTML="&#128522;";
        }
        if(results[1].label == "sad"){
            document.getElementById("update_emoji2").innerHTML="&#128532;";
        }
        if(results[1].label == "angry"){
            document.getElementById("update_emoji2").innerHTML="&#128548;";
        }
    }
}

function speak(){
    var synth=window.speechSynthesis;
    speakdata1="The First Prediction Is "+prediction1
    speakdata2="The Second Prediction Is "+prediction2
    var utterthis=new SpeechSynthesisUtterance(speakdata1+speakdata2)
    synth.speak(utterthis)
}