function animateHeader(element) {
    console.log(element)
    element.style.transition = 'top 0.8s ease';
    element.style.top = '0';
    
}

function animateUp(element, threshold_value) {
    let heading_observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            console.log(entry.target)
            if (entry.isIntersecting) {
                entry.target.style.transition = "0.6s ease";
                entry.target.style.transform = 'translateY(0px)';
                entry.target.style.opacity = '1';
                heading_observer.unobserve(entry.target);
            }
        })
        console.log(entries)
    }, {
        threshold: threshold_value
    })

    element.forEach(e => {
        heading_observer.observe(e)
    });
}

function animateChooseCard(element) {
    let delay = 0.8;
    let cards_observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.transition = delay.toString() + "s" + " ease";
                entry.target.style.transform = 'translateY(0px)';
                console.log((entry.target).getElementsByClassName('target')[0].innerHTML)
                setTimeout(() => {
                    (entry.target).getElementsByClassName('target')[0].style.visibility = "visible";
                    increaseValue((entry.target).getElementsByClassName('target')[0].innerHTML,(entry.target).getElementsByClassName('target')[0])
                },delay*1000)
                
                cards_observer.unobserve(entry.target);
                delay += 0.2;
            }
        })
    }, {
        threshold: 1
    })

    element.forEach(card => {
        cards_observer.observe(card);
    })
}

function increaseValue(org,element) {
    let current = 1;
    let intervalId = setInterval(() => {
        element.innerHTML = current
        if (current == org) {
            clearInterval(intervalId)
            element.innerHTML = current + "+";
        }
        current++;
    },20)
}

export { animateHeader, animateUp, animateChooseCard };