const cursor = document.getElementById('cursor');
console.log("hi");
// Move the custom cursor with the mouse
document.addEventListener('mousemove', (e) => {
    console.log(e.pageX, e.pageY, window.innerWidth, cursor.offsetWidth);
    // if (e.pageX <= window.innerWidth - cursor.offsetWidth)
    cursor.style.left = `${e.pageX + 20}px`;
    // else
    // cursor.style.left = `${e.pageX - 20}px`;
    cursor.style.top = `${e.pageY + 20}px`;
});

// Trigger the rotation animation on mouse down
document.addEventListener('mousedown', () => {
    cursor.classList.add('animate-rotate'); // Add the animation class

    // Remove the animation class after it finishes (1s)
    setTimeout(() => {
        cursor.classList.remove('animate-rotate');
    }, 1000); // Match the animation duration
});