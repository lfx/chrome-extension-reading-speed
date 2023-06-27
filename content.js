const box = document.createElement("div");
box.style.position = "fixed";
box.style.top = "10px";
box.style.right = "10px";
box.style.width = "120px";
box.style.height = "20px";
box.style.backgroundColor = "white";
box.style.color = "black";
box.style.border = "1px solid black";
box.style.zIndex = "9999";
box.style.fontSize = "10px";
box.style.textAlign = "right";
box.style.paddingRight = "4px";
box.style.paddingTop = "4px";

box.style.display = "none";

box.addEventListener("click", handleBoxClick);

function handleBoxClick() {
    toggleOnOff();
}


let isOn = false;

function toggleOnOff() {
    isOn = !isOn;
    if (isOn) {
        box.style.outline = "1px dashed gray"
    } else {
        box.style.outline = "none"
    }
}

function updateBoxContent(content) {
    box.innerText = content;
}

function showBox() {
    box.style.display = "block";
}

function hideBox() {
    box.style.display = "none";
}

document.body.appendChild(box);

function getPageSource() {
    return document.documentElement.outerHTML;
}


function countWords(text) {
    const words = text.trim().split(/\s+/);
    return words.length;
}

function convertToTimeToRead(wordCount, readingSpeed) {
    const minutes = Math.ceil(wordCount / readingSpeed);
    return minutes;
}

let oldStyle = {}

function handleHoverEvent(event) {
    const target = event.target;
    oldStyle = target.style.outline;
    if (isOn) {
        target.style.outline = "3px dashed gray"
    }

    const text = event.target.innerText;
    const wordCount = countWords(text);
    const timeToRead0 = convertToTimeToRead(wordCount, 120)
    const timeToRead1 = convertToTimeToRead(wordCount, 200)
    let ttr = `${timeToRead1}-${timeToRead0}`;
    if (timeToRead0 == timeToRead1) {
        ttr = timeToRead0
    }

    updateBoxContent(`TTR: ${ttr}m, WC: ${wordCount}`);

    showBox();
}


function handleMouseoutEvent(event) {
    const target = event.target;
    target.style.outline = oldStyle;
    hideBox();
}

// Listen for messages from the background script
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    if (request.action === "getSource") {
        const source = getPageSource();
        sendResponse({ source: source });
    }
});

// Attach mouseover and mouseout event listeners to the document
document.addEventListener("mouseover", handleHoverEvent);
document.addEventListener("mouseout", handleMouseoutEvent);
