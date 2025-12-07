const paragraphText = "It's nice to meet you! My name is Aadil and I am a <br> CS student at Florida International University. <br>Apart from building projects, my hobbies include:"

const listItems = [
    "Watching new movies in the theaters",
    "Playing Pickleball", 
    "Watching & playing Basketball"
]

const aboutParagraph = document.getElementById('about-text');
const aboutList = document.getElementById('about-list');

let charIndex = 0 
let listIndex = 0 

function typeParagraph(){
    if(charIndex < paragraphText.length){
        charIndex++;
        aboutParagraph.innerHTML = paragraphText.substring(0, charIndex);
    }
    else{
        clearInterval(typingInterval)
        setTimeout(listItems, 500)
    }
}

const typingInterval = setInterval(typeParagraph, 80)