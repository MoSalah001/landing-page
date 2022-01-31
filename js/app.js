let navBar = document.getElementById("navbar__list");
let homeIcon = document.getElementById("backToTop");
let navMenu = document.getElementsByClassName("navbar__menu")[0];
let secNum = document.querySelectorAll('.landing__container'); // to get number of sections
let windowScreen = window.screen.availWidth > 768 ? true : false;
let navMenuListColor = windowScreen ? "crimson" : "wheat";
// hide back to top icon
homeIcon.style.display = "none"; 
const sectionLinks = []; // array to hold links for styling
const fragment = document.createDocumentFragment();
// Creating nav list links to sections and give them a class name
function CreateListItems(arr){
    for(let i =0;i<arr.length;i++){
        const listItemList = document.createElement('li');
        listItemList.classList.add('navList'); // general css class for links
        listItemList.classList.add('listLinks-active'); // active-only css class for links
        listItemList.innerHTML =`<a href="#section${i+1}" class="listLinks">Section${i+1}`;
        listItemList.addEventListener('click',smoothScroll);
        fragment.appendChild(listItemList);
        sectionLinks.push(listItemList); // push links into array
    }
    navBar.appendChild(fragment);
}

CreateListItems(secNum);

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
    for(let i =0;i<secNum.length;i++){
        if((secNum[i].getBoundingClientRect().y < 100 && secNum[i].getBoundingClientRect().y > (-510) && windowScreen) ||
        (secNum[i].getBoundingClientRect().y < 80 && secNum[i].getBoundingClientRect().y > (-620) && !windowScreen)) {
            secNum[i].parentNode.classList.add('activeClass');
            sectionLinks[i].classList.add('listLinks-active'); // only active class addition when true
        } else {
            secNum[i].parentNode.classList.remove('activeClass');
            sectionLinks[i].classList.remove('listLinks-active'); // back to default when false
        }
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

//smooth scroll function when click on a link
function smoothScroll(e){
    e.preventDefault();
    let linkID=e.target.hash;
    const linkItem = document.querySelector(linkID);
    linkItem.scrollIntoView({block: "start",behavior: "smooth"});
}