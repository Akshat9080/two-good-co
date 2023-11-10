function locomotiveAnimation(){
    gsap.registerPlugin(ScrollTrigger);

    // Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll
    
    const locoScroll = new LocomotiveScroll({
      el: document.querySelector('#wrapper'),
      smooth: true
    });
    // each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
    locoScroll.on("scroll", ScrollTrigger.update);
    
    // tell ScrollTrigger to use these proxy methods for the '#wrapper' element since Locomotive Scroll is hijacking things
    ScrollTrigger.scrollerProxy('#wrapper', {
      scrollTop(value) {
        return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
      }, // we don't have to define a scrollLeft because we're only scrolling vertically.
      getBoundingClientRect() {
        return {top: 0, left: 0, width: window.innerWidth, height: window.innerHeight};
      },
      // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
      pinType: document.querySelector('#wrapper').style.transform ? "transform" : "fixed"
    });
     
    // each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll. 
    ScrollTrigger.addEventListener("refresh", () => locoScroll.update());
    
    // after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
    ScrollTrigger.refresh();
}
    
locomotiveAnimation()

gsap.to(".logo svg",{
    transform:"translateY(-100%)",
    ScrollTrigger:{
        trigger:"#hero-section",
        scroller:"#wrapper",
        start:"top 0",
        end:"top -5%",
        scrub:true
    }
})

gsap.to(".navbar-items li",{
     transform:"translateY(-100%)",
    opacity:0,
    ScrollTrigger:{
        trigger:"#hero-section",
        scroller:"#wrapper",
        start:"top -10%",
        end:"top 5%",
        scrub:true
    }
})

// const scroll = new LocomotiveScroll({
//     el: document.querySelector('#wrapper'),
//     smooth: true
// });

function videoconAnimation(){
var videocon = document.querySelector("#video-container")
var playbtn = document.querySelector("#btn")

videocon.addEventListener("mouseenter",function(){
    gsap.to(playbtn,{
        scale:1,
        opacity:1
    }) 
})

videocon.addEventListener("mouseleave",function(){
    gsap.to(playbtn,{
        scale:0,
        opacity:0
    }) 
})

videocon.addEventListener("mousemove",function(dets){
    gsap.to(playbtn,{
        left:dets.x,
        top:dets.y
    }) 
})
}
videoconAnimation()

function loadAnimation(){
    gsap.from("#hero-section h1",{
        y:100,
        opacity:0,
        delay:0.5,
        duration:0.5,
        stagger:0.2
    })
    
    gsap.from("#hero-section #video-container",{
        scale:0.8,
        opacity:0,
        delay:1.3,
        duration:0.6
    })

}
loadAnimation()

function cursorAnimation(){
    document.addEventListener("mousemove",function(dets){
        gsap.to("#cursor",{
            left:dets.x,
            top:dets.y
        })
    })
    //Below is the query for single
    // document.querySelector("#img1").addEventListener("mouseenter",function(){
    //     gsap.to("#cursor",{
    //         transform:'translate(-50%,-50%) scale(1.5)'
    //     })
    // })
    
    // document.querySelector("#img1").addEventListener("mouseleave",function(){
    //     gsap.to("#cursor",{
    //         transform:'translate(-50%,-50%) scale(0)'
    //     })
    // })
    
    //This is query for all
    document.querySelectorAll(".img").forEach(function(elem){
        elem.addEventListener("mouseenter",function(){
            gsap.to("#cursor",{
                transform:'translate(-50%,-50%) scale(1.5)'
            });
        });
        elem.addEventListener("mouseleave",function(){
            gsap.to("#cursor",{
                transform:'translate(-50%,-50%) scale(0)'
            });
        });
    });
}

cursorAnimation()

