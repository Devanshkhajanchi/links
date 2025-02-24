const maskCircle = document.getElementById("mask-circle");

// Used 'add event listener' to target the cursor
// https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener

document.addEventListener("mousemove", (event) => {
	const { clientX, clientY } = event;

// Offsetting cursor
// https://developer.mozilla.org/en-US/docs/Web/API/Element/setAttribute
	maskCircle.setAttribute("cx", clientX);
	maskCircle.setAttribute("cy", clientY - 200); // Adjust upward
});
