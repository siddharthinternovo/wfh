function scrollCardsLeft(){
    // JavaScript for scrolling the card container
    const container = document.getElementById('scroll-container');
    console.log("hello")

    function scrollCards() {
        container.scrollLeft += 1; // scroll speed
        if (container.scrollLeft >= (container.scrollWidth - container.clientWidth)) {
            container.scrollLeft = 0;
        }
    }

    setInterval(scrollCards, 20);
}

export {scrollCardsLeft};