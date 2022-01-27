hrVal = 0;
minVal = 0;
secVal = 0;
keepRunning = 0;

chrome.storage.sync.set({
    hrVal: prependZero(hrVal), 
    minVal: prependZero(minVal), 
    secVal: prependZero(secVal)
});

function recur(){
    if(keepRunning){
        increement();
        setTimeout(recur, 1000);
    }
}

function startTimer(){
    if(!keepRunning){
        keepRunning = 1;
        recur();
    }
}

function resetTimer(){
    hrVal = 0;
    minVal = 0;
    secVal = 0;
    update();
}

function stopTimer(){
    keepRunning = 0;
    update();
}

function increement(){
    secVal++;
    if(secVal == 60){
        minVal++;
        secVal = 0;
    }

    if(minVal == 60){
        hrVal++;
        minVal = 0;
    }

    update();
}

function update(){
    chrome.storage.sync.set({
        hrVal: prependZero(hrVal), 
        minVal: prependZero(minVal), 
        secVal: prependZero(secVal)
    });
}

function prependZero(x){
    if(x > 9) return x;
    else return "0" + x;
}


// popup.js to background.js

chrome.runtime.onConnect.addListener(function(port){
    port.onMessage.addListener(function(msg){
        if(msg.type === "start"){
            startTimer();
        }else if(msg.type === "reset"){
            resetTimer();
            console.log("done resetting");
        }else if(msg.type === "stop"){
            stopTimer();
        }
    });
});

