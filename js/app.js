let navBar = document.getElementById("navbar__list");
let homeIcon = document.getElementById("backToTop");
let navMenu = document.getElementsByClassName("navbar__menu")[0];
let sectionOne = document.getElementById("section1");
let sectionTwo = document.getElementById("section2");
let sectionThree = document.getElementById("section3");
let sectionFour = document.getElementById("section4");
let listOne = document.createElement("li");
let listTwo = document.createElement("li");
let listThree = document.createElement("li");
let listFour = document.createElement("li");
let windowScreen = window.screen.availWidth > 768 ? true : false;
let navMenuListColor = windowScreen ? "crimson" : "wheat";
let listItems = [listOne,listTwo,listThree,listFour];
// hide back to top icon
homeIcon.style.display = "none"; 
// Creating nav list sections and give them a class name
function createList(arr){
    for(let i =0;i<arr.length;i++){
        arr[i].classList.add("navList");
        //Specify list items names and links them to their corresponding sections
        arr[i].innerHTML =`<a href="#section${i+1}" class="listLinks">Section${i+1}`;
        navBar.appendChild(arr[i]);
    }
}

createList(listItems);
//event listeners section
//disable pc events on mobile devices
window.addEventListener("scroll",listLinksHighlighter);
window.addEventListener("scroll",showHomeIcon);
homeIcon.addEventListener("click",backHome);
if(windowScreen){
    window.addEventListener("scroll",showNav);
}else if(!windowScreen){// disable mobile devices events on pc
    navMenu.addEventListener("click",showNavMobile)
}


//end of event listeners section

// start of functions section
function listLinksHighlighter(e){ // auto highlight nav list items ( current active section ) for pc
    e.preventDefault();
    if((sectionOne.getBoundingClientRect().y < 80 && sectionOne.getBoundingClientRect().top > (-480) && windowScreen) ||
    (sectionOne.getBoundingClientRect().y < 80 && sectionOne.getBoundingClientRect().top > (-620) && !windowScreen)
    ) {
        sectionOne.classList.add("activeClass");
        sectionTwo.classList.remove("activeClass");
        listOne.style.background = "green";
        listTwo.style.background = navMenuListColor;
        listThree.style.background = navMenuListColor;
        listFour.style.background = navMenuListColor;
    } 
    else if((sectionTwo.getBoundingClientRect().y < 148 && sectionTwo.getBoundingClientRect().top < 148 && sectionTwo.getBoundingClientRect().top > (-450) && windowScreen) ||
    (sectionTwo.getBoundingClientRect().y < 202 && sectionTwo.getBoundingClientRect().top < 202 && sectionTwo.getBoundingClientRect().top > (-610)&& !windowScreen)) {
        sectionTwo.classList.add("activeClass");
        sectionOne.classList.remove("activeClass");
        sectionThree.classList.remove("activeClass");
        listOne.style.background = navMenuListColor;
        listTwo.style.background = "green";
        listThree.style.background = navMenuListColor;
        listFour.style.background = navMenuListColor;
    }
    else if((sectionThree.getBoundingClientRect().y < 130 && sectionThree.getBoundingClientRect().top < 130 && sectionThree.getBoundingClientRect().top > (-460) && windowScreen) ||
    (sectionThree.getBoundingClientRect().y < 202 && sectionThree.getBoundingClientRect().top < 202 && sectionThree.getBoundingClientRect().top > (-650) && !windowScreen)){
        sectionThree.classList.add("activeClass");
        sectionTwo.classList.remove("activeClass");
        sectionFour.classList.remove("activeClass");
        listOne.style.background = navMenuListColor;
        listTwo.style.background = navMenuListColor;
        listThree.style.background = "green";
        listFour.style.background = navMenuListColor;
    }else if((sectionFour.getBoundingClientRect().y<134 && sectionFour.getBoundingClientRect().top <134 && windowScreen) ||
    (sectionFour.getBoundingClientRect().y<180 && sectionFour.getBoundingClientRect().top <180 && !windowScreen))
    {
        sectionFour.classList.add("activeClass");
        sectionThree.classList.remove("activeClass");
        listOne.style.background = navMenuListColor;
        listTwo.style.background = navMenuListColor;
        listThree.style.background = navMenuListColor;
        listFour.style.background = "green";
    } else {
        listOne.style.background = navMenuListColor;
        listTwo.style.background = navMenuListColor;
        listThree.style.background = navMenuListColor;
        listFour.style.background = navMenuListColor;
    }
}

// Show nav bar and auto hide after inactivity

function showNav(){
    if(window.scrollY > 100){
        let timer = window.scrollY;
        navMenu.style.display = "block";
        navMenu.style.animation ="none";
        // check inactivity
        setTimeout(()=>{
            if(window.scrollY == timer) {
                console.log("true");
                setTimeout(()=>{
                    navMenu.style.animation = "hider 0.5s linear";
                },0)
                setTimeout(()=>{
                    navMenu.style.display = "none";
                },400)
            }
        },5000)
    }
    if(window.scrollY < 100){
        navMenu.style.display = "none";
    }
}
// show and hide back to home circle
function showHomeIcon(){
    if(window.scrollY > 250){
        homeIcon.style.display = "block";
    }else {
        homeIcon.style.display = "none";
    }
}
//back to top function
function backHome(e){
    e.preventDefault();
    window.scrollTo({top :0 , behavior: "smooth"})
}

//mobile devices functions 
function showNavMobile(){
    navMenu.classList.toggle("change");
    navBar.classList.toggle("showSideMenu");
}