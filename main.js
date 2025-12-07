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
       setInterval(() => {
        listTypingInterval = setInterval(typeListItem, 80)
       }, 500);
    }
}

const typingInterval = setInterval(typeParagraph, 80)


let currentListItem = null; //hold current <li> that is being typed out
let listCharIndex = 0 //hold the current character position in the current li
let listTypingInterval

function typeListItem(){
    if (listIndex >= listItems.length) {
        clearInterval(listTypingInterval);
        return;
    }

    if(currentListItem == null){
        currentListItem = document.createElement('li')
        aboutList.appendChild(currentListItem)
        listCharIndex = 0
    }
    if(listCharIndex < listItems[listIndex].length){
        currentListItem.textContent += listItems[listIndex][listCharIndex]
        listCharIndex ++ 
    }
    else{
        listIndex++
        currentListItem = null
        clearInterval(listTypingInterval);
        
        if(listIndex < listItems.length){

            setTimeout(() => {
                listTypingInterval = setInterval(typeListItem, 80)
            }, 300);
        } 
    }
}