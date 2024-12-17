// Get the image track element
const track = document.getElementById("image-track");

track.dataset.percentage = "0";
track.dataset.prevPercentage = "0";

// Handle wheel event for horizontal scrolling
const handleOnWheel = (e) => {
  // Check if the cursor is hovering over the image track
  if (track.matches(":hover")) {
    e.preventDefault(); // Prevent the default page scrolling behavior

    const maxDelta = window.innerWidth / 2;

    // Calculate the percentage for horizontal scrolling
    const percentage = (e.deltaY / maxDelta) * -30;
    const nextPercentageUnconstrained = parseFloat(track.dataset.percentage || 0) + percentage;
    const nextPercentage = Math.max(Math.min(nextPercentageUnconstrained, 0), -70);

    // Update the dataset with the new percentage
    track.dataset.percentage = nextPercentage;

    // Animate the track's horizontal position
    track.animate(
      {
        transform: `translateX(${nextPercentage}%)`,
      },
      { duration: 1200, fill: "forwards" }
    );

    // Animate each image's object position
    for (const image of track.getElementsByClassName("image")) {
      image.animate(
        {
          objectPosition: `${100 + nextPercentage}% center`,
        },
        { duration: 1200, fill: "forwards" }
      );
    }
  }
};

// Attach wheel event listener
window.addEventListener("wheel", handleOnWheel, { passive: false });

// Handle mouse down event (start dragging)
const handleOnDown = (e) => (track.dataset.mouseDownAt = e.clientX);

// Handle mouse up event (stop dragging)
const handleOnUp = () => {
  track.dataset.mouseDownAt = "0";
  track.dataset.prevPercentage = track.dataset.percentage;
};

// Handle mouse move event (dragging)
const handleOnMove = (e) => {
  if (track.dataset.mouseDownAt === "0") return;

  const mouseDelta = parseFloat(track.dataset.mouseDownAt) - e.clientX;
  const maxDelta = window.innerWidth / 2;

  const percentage = (mouseDelta / maxDelta) * -30;
  const nextPercentageUnconstrained =
    parseFloat(track.dataset.prevPercentage) + percentage;
  const nextPercentage = Math.max(Math.min(nextPercentageUnconstrained, 0), -70);

  // Update the dataset with the new percentage
  track.dataset.percentage = nextPercentage;

  // Animate the track's horizontal position
  track.animate(
    {
      transform: `translateX(${nextPercentage}%)`,
    },
    { duration: 1200, fill: "forwards" }
  );

  // Animate each image's object position
  for (const image of track.getElementsByClassName("image")) {
    image.animate(
      {
        objectPosition: `${100 + nextPercentage}% center`,
      },
      { duration: 1200, fill: "forwards" }
    );
  }
};

// Event listeners for mouse events
window.addEventListener("mousedown", (e) => handleOnDown(e));
window.addEventListener("mouseup", handleOnUp);
window.addEventListener("mousemove", (e) => handleOnMove(e));

// Event listeners for touch events
window.addEventListener("touchstart", (e) => handleOnDown(e.touches[0]));
window.addEventListener("touchend", (e) => handleOnUp());
window.addEventListener("touchmove", (e) => handleOnMove(e.touches[0]));
