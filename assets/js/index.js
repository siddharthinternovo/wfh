import { initializeSwiper } from "./swiper.js";
import { scrollCardsLeft } from "./scroll.js";
import { animateHeader, animateChooseCard, animateUp } from "./animation.js";

// Navbar smooth
animateHeader(document.querySelector('.navbar'));

// Container of Content
const contentDiv = document.getElementById('component-content');

function loadContent() {
    // Replace "/index.html" in the URL with a trailing slash
    let newURL = window.location.href.replace("/index.html", "/");
    history.replaceState({},'',newURL)
    console.log(newURL)
    


    const hash = window.location.hash.substr(1); //Extract hash
    console.log(`Hash => ${hash}`);
    console.log(`URL => ${window.location.href}`)

    if(hash){
        
        // window.location.href = window.location.href.replace('#','');
        // console.log(`URL => ${window.location.href}`)

        //     const newURL = window.location.href.replace('#', '');
        // history.replaceState({}, '', newURL);

    }
    
    window.scrollTo(0, 0);
    fetchContent(hash);
}

function fetchContent(page) {
    // Define the mapping of URLs to component HTML files
    const componentMapping = {
        "":"../../component/home.html",
        about: '../../component/about.html',
        contact: '../../component/contact.html',
        services: '../../component/services.html',
        news: '../../component/news.html',
        invalid: '../../component/invalid.html'
    };

    const componentUrl = componentMapping[page];
    console.log("component url => ",componentUrl)
    if (componentUrl) {
        // Fetch the component's HTML content
        fetch(componentUrl)
            .then(response => response.text())
            .then(html => {
                contentDiv.innerHTML = html;

                // Initialize Swiper only on home page
                animateUp(document.querySelectorAll('.observe-heading,.contact-section .contact-img-section .contact-img,.team-members .member'), 1);
                animateUp(document.querySelectorAll('.contact-us,.services-hero-section,.about-hero-section,.services-cards .card-content'), 0.5);
                animateUp(document.querySelectorAll('.news-hero-section,.hero-section'), 0.1)
                animateUp(document.querySelectorAll('.steps-content .step'), 1);
                if(page==""){
                    initializeSwiper();
                    // animateHeading(document.querySelectorAll('.observe-heading,.contact-section .contact-img-section .contact-img'));
                    // animateHeading(document.querySelector('.contact-section .contact-img-section .contact-img'))
                    animateChooseCard(document.querySelectorAll('.chooseus-section-frame .card-section .item'))
                }
                if(page=="services"){
                    console.log("yes services")
                    scrollCardsLeft();
                }
            })
            .catch(error => {
                contentDiv.innerHTML = 'Failed to load content.';
                // console.error(error);
            });
    } else {
        console.log("invalid page ",componentMapping['invalid'])
        fetch(componentMapping['invalid'])
        .then(response=> response.text())
        .then(html => contentDiv.innerHTML = html).catch(error => {
            contentDiv.innerHTML = 'Failed to load content.';
            // console.error(error);
        })
        
    }
}

// Toggle Button (Nav)
const toggleBtn = document.getElementById('toggle-btn');
const bars = '<i class="fa-solid fa-bars toggle-icon"></i>';
const cross = '<i class="fa-solid fa-xmark toggle-icon"></i>';
const toggleNav = document.querySelector(".toggle-nav");
const links_obj = document.querySelectorAll('.toggle-nav .nav-item');
const links_arr = [];
links_obj.forEach(item=>{
    links_arr.push(item);
})
links_arr.push(toggleBtn)
let isOpen = false;


console.log(links_arr)

links_arr.forEach(item=>{
    item.addEventListener('click',()=>{
        if(isOpen){
    
            document.body.style.overflow = "auto";
    
            toggleBtn.innerHTML = bars;
            isOpen = false;
            
            toggleNav.classList.toggle('toggle-smooth');
            toggleNav.style.height = '0px'; 
    
            setTimeout(()=>{
                toggleNav.classList.toggle('toggle-smooth');
            },800);
            
        }
        else{
    
            document.body.style.overflow = "hidden";
    
            toggleBtn.innerHTML = cross;
            isOpen = true;
    
            toggleNav.style.display = "block";
    
            if (toggleNav.style.height === '0px' || toggleNav.style.height === '') {
                toggleNav.style.height = '260%';
                toggleNav.classList.toggle('toggle-smooth');
            } 
    
            setTimeout(()=>{
                toggleNav.classList.toggle('toggle-smooth');
            },800);
        }
    })
})


window.addEventListener('hashchange',loadContent)
loadContent(); //Initial Content Load