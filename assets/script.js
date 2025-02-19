const text = document.getElementById("blur-text");

document.addEventListener("mousemove", (e) => {
    const { clientX, clientY } = e;
    const textRect = text.getBoundingClientRect();
    
    // Get center of text block
    const centerX = textRect.left + textRect.width / 2;
    const centerY = textRect.top + textRect.height / 2;
    
    // Calculate distance from cursor to text center
    const distance = Math.sqrt(
        Math.pow(clientX - centerX, 2) + Math.pow(clientY - centerY, 2)
    );

    // Define the unblur radius (50px)
    const maxRadius = 50;

    // Apply blur dynamically
    if (distance < maxRadius) {
        text.style.filter = `blur(${(distance / maxRadius) * 0.5}rem)`;
    } else {
        text.style.filter = "blur(0.5rem)";
    }
});
