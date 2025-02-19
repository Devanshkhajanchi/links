const maskCircle = document.getElementById("mask-circle");

document.addEventListener("mousemove", (event) => {
    const { clientX, clientY } = event;

	// Offset slightly to align with cursor
	maskCircle.setAttribute("cx", clientX);
	maskCircle.setAttribute("cy", clientY - 150); // Adjust upward
});
