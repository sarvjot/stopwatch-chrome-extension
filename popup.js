h = document.querySelector("#hour");
m = document.querySelector("#minute");
s = document.querySelector("#second");

startBtn = document.querySelector("#start");
resetBtn = document.querySelector("#reset");
doneBtn = document.querySelector("#done");

popup_port = chrome.runtime.connect({name: "popup-port"});

on = 0;
display();

if(!empty()){
    on = 1
    keepDisplaying();
}

startBtn.addEventListener('click', () => {
    startTimer();
    keepDisplaying();
});

resetBtn.addEventListener('click', () => {
    resetTimer();
    // can use promises as well, but its ok for now
    setTimeout(display, 10);
});

doneBtn.addEventListener('click', () => {
    stopTimer();
    display();
});

function startTimer(){
    on = 1;
    popup_port.postMessage({
        "type": "start", 
    });
}

function resetTimer(){
    popup_port.postMessage({
        "type": "reset", 
    });
}

function stopTimer(){
    on = 0;
    popup_port.postMessage({
        "type": "stop", 
    });
}

function keepDisplaying(){
    if(!on) return;

    display();
    setTimeout(keepDisplaying, 1);
}

function empty(){
    str = ""
    chrome.storage.sync.get("hrVal", function(obj){
        str += obj.hrVal;
    })
    chrome.storage.sync.get("minVal", function(obj){
        str += obj.hrVal;
    })
    chrome.storage.sync.get("secVal", function(obj){
        str += obj.hrVal;
    })

    return str === "000000"
}

function display(){
    chrome.storage.sync.get("hrVal", function(obj){
        h.innerHTML = obj.hrVal;
    })
    chrome.storage.sync.get("minVal", function(obj){
        m.innerHTML = obj.minVal;
    })
    chrome.storage.sync.get("secVal", function(obj){
        s.innerHTML = obj.secVal;
    })
}
