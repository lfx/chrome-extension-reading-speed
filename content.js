
// Create a small box element
const box = document.createElement("div");
box.style.position = "fixed";
box.style.top = "10px";
box.style.right = "10px";
box.style.width = "120px";
box.style.height = "20px";
box.style.backgroundColor = "white";
box.style.border = "1px solid black";
box.style.zIndex = "9999";
box.style.fontSize = "10px";
box.style.textAlign = "right";
box.style.paddingRight = "2px";

box.style.display = "none"; // Initially hide the bo

box.addEventListener("click", handleBoxClick);

function handleBoxClick() {
    toggleOnOff();
}


let isOn = false;

// Function to toggle the on/off state and update the box content
function toggleOnOff() {
    isOn = !isOn;
    if (isOn) {
        // box.style.background = "#c9c0c0"
        box.style.outline = "1px dashed gray"
    } else {
        // box.style.background = "white"
        box.style.outline = "none"
    }

}


// Function to update the content of the box
function updateBoxContent(content) {
    box.innerText = content;
}

// Function to show the box
function showBox() {
    box.style.display = "block";
}

// Function to hide the box
function hideBox() {
    box.style.display = "none";
}

// Append the box element to the document body
document.body.appendChild(box);

// Function to get the HTML source of the page
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

// Function to handle mouse hover events
function handleHoverEvent(event) {
    const target = event.target;
    //   target.style.backgroundColor = "#fff";
    oldStyle = target.style.outline;
    if (isOn) {
        target.style.outline = "3px dashed gray"
    }

    // You can perform other actions here based on the hovered element


    const text = event.target.innerText;
    const wordCount = countWords(text);
    const timeToRead0 = convertToTimeToRead(wordCount, 120)
    const timeToRead1 = convertToTimeToRead(wordCount, 200)
    let ttr = `${timeToRead1}-${timeToRead0}`;
    if (timeToRead0 == timeToRead1) {
        ttr = timeToRead0
    }

    updateBoxContent(`TTR: ${ttr}m, WC: ${wordCount}`);


    // Update the content of the box with the tag name of the hovered element
    // updateBoxContent(`hi ${target.tagName}`);
    showBox();
}

// Function to handle mouseout events
function handleMouseoutEvent(event) {
    const target = event.target;
    //   target.style.backgroundColor = ""; // Remove the yellow background
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
