const track = document.getElementById("image-track");

const handleOnWheel = e => {
  // Only handle wheel event when hovering over the image track
  if (track.matches(":hover")) {
    e.preventDefault();  // Prevent page scrolling while hovering over the image track
    
    const maxDelta = window.innerWidth / 2;

    // Scroll direction should be horizontal (based on deltaY for vertical scrolling)
    const percentage = (e.deltaY / maxDelta) * -10;
    const nextPercentageUnconstrained = parseFloat(track.dataset.percentage || 0) + percentage;
    const nextPercentage = Math.max(Math.min(nextPercentageUnconstrained, 0), -100);

    track.dataset.percentage = nextPercentage;

    // Move the images horizontally
    track.animate({
      transform: `translateX(${nextPercentage}%)`
    }, { duration: 1200, fill: "forwards" });

    // Animate each image's horizontal movement
    for (const image of track.getElementsByClassName("image")) {
      image.animate({
        objectPosition: `${100 + nextPercentage}% center`
      }, { duration: 1200, fill: "forwards" });
    }
  }
}

// Attach wheel event listener
window.addEventListener('wheel', handleOnWheel, { passive: false });  // passive: false to prevent default scroll behavior when needed
window.onwheel = e => handleOnWheel(e);

const handleOnDown = e => track.dataset.mouseDownAt = e.clientX;

const handleOnUp = () => {
  track.dataset.mouseDownAt = "0";  
  track.dataset.prevPercentage = track.dataset.percentage;
}

const handleOnMove = e => {
  if(track.dataset.mouseDownAt === "0") return;
  
  const mouseDelta = parseFloat(track.dataset.mouseDownAt) - e.clientX,
        maxDelta = window.innerWidth / 2;
  
  const percentage = (mouseDelta / maxDelta) * -100,
        nextPercentageUnconstrained = parseFloat(track.dataset.prevPercentage) + percentage,
        nextPercentage = Math.max(Math.min(nextPercentageUnconstrained, 0), -100);
  
  track.dataset.percentage = nextPercentage;
  
  track.animate({
    transform: `translate(${nextPercentage}%, -50%)`
  }, { duration: 1200, fill: "forwards" });
  
  for(const image of track.getElementsByClassName("image")) {
    image.animate({
      objectPosition: `${100 + nextPercentage}% center`
    }, { duration: 1200, fill: "forwards" });
  }
}

/* -- Had to add extra lines for touch events -- */

window.onmousedown = e => handleOnDown(e);

window.ontouchstart = e => handleOnDown(e.touches[0]);

window.onmouseup = e => handleOnUp(e);

window.ontouchend = e => handleOnUp(e.touches[0]);

window.onmousemove = e => handleOnMove(e);

window.ontouchmove = e => handleOnMove(e.touches[0]);