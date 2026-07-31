// target all elements to save to constants
const page1btn = document.querySelector("#page1btn");
const page2btn = document.querySelector("#page2btn");
const page3btn = document.querySelector("#page3btn");
const page4btn = document.querySelector("#page4btn");
const page5btn = document.querySelector("#page5btn");

// select all subtopic pages
var allpages = document.querySelectorAll(".page");





// function to hide all pages
function hideAll() {
	for (let onepage of allpages) { // go through all subtopic pages
		onepage.style.display = "none"; // hide it
	}
}
hideAll();

// function to show selected page no.
function show(pgno) {
	hideAll();
	let onepage = document.querySelector("#page" + pgno); // select the page based on the parameter passed in
	onepage.style.display = "block";
}

show(1);

page1btn.addEventListener("click", function() {
	show(1);
});
page2btn.addEventListener("click", function() {
	show(2);
});
page3btn.addEventListener("click", function() {
	show(3);
});
page4btn.addEventListener("click", function() {
	show(4);
});
page5btn.addEventListener("click", function() {
	show(5);
});





// Ham Menu
const hamBtn = document.querySelector("#hamIcon");
const menuItemsList = document.querySelector("nav ul");
hamBtn.addEventListener("click", toggleMenus);

// Open and close menu
function toggleMenus() {
	menuItemsList.classList.toggle("menuShow"); // if menuItemsList dont have the class "menuShow", add it, else remove it
	
	if (menuItemsList.classList.contains("menuShow")) { //if menu is showing (has the class “menuShow”)
		hamBtn.innerHTML = "Close Menu"; // change button text to chose menu
	}
	else { // if menu NOT showing
		hamBtn.innerHTML = "Open Menu"; // change button text open menu
	}
}

// Quiz
const btnSubmit = document.querySelector("#btnSubmit");
btnSubmit.addEventListener("click",CheckAns);
const scorebox = document.querySelector("#scorebox");
var q1, q2, q3, score = 0;

function CheckAns(){
	score = 0;
	q1 = document.querySelector("input[name='q1']:checked").value;
	if(q1 == "Scientific") {
		score++;
		scorebox.innerHTML = "Score:"+score;
	}
	q2 = document.querySelector("input[name='q2']:checked").value;
	if(q2 == "Newton") {
		score++;
		scorebox.innerHTML = "Score:"+score;
	}
	q3 = document.querySelector("input[name='q3']:checked").value;
	if(q3 == "1905") {
		score++;
		scorebox.innerHTML = "Score:"+score;
	}
}




// Game
const galaxyImage = document.getElementById("galaxyImage");
const spaceship = document.getElementById("spaceship");
const speedControl = document.getElementById("speedControl");
const speedSlider = document.getElementById("speedSlider");
const speedValue = document.getElementById("speedValue");
const launchBtn = document.getElementById("launchBtn");
const results = document.getElementById("results");
const shipTimeEl = document.getElementById("shipTime");
const earthTimeEl = document.getElementById("earthTime");

const earthPosition = { xPct: 0.502, yPct: 0.664 };
const galaxySizeLY = 100000;
let travelling = false;
let destX, destY, earthX, earthY;

function moveShipTo(x, y) {
	spaceship.style.left = x + "px";
	spaceship.style.top = y + "px";
}

function distanceLy(x1, y1, x2, y2) {
	const distPx = Math.hypot(x2 - x1, y2 - y1);
	const lyPerPixel = galaxySizeLY / galaxyImage.naturalWidth;
	return distPx * lyPerPixel;
}

galaxyImage.addEventListener("click", function(e) {
	if (travelling) return;

	const rect = galaxyImage.getBoundingClientRect();
	destX = e.clientX - rect.left;
	destY = e.clientY - rect.top;
	earthX = rect.width * earthPosition.xPct;
	earthY = rect.height * earthPosition.yPct;

	spaceship.style.display = "block";
	moveShipTo(earthX, earthY);

	speedControl.classList.remove("game-hidden");
	results.classList.add("game-hidden");
});

speedSlider.addEventListener("input", function() {
	speedValue.textContent = parseFloat(speedSlider.value).toFixed(2) + "c";
});

launchBtn.addEventListener("click", function() {
	if (travelling || destX === undefined) return;

	travelling = true;
	speedControl.classList.add("game-hidden");

	const chosenSpeed = parseFloat(speedSlider.value);
	
	const distPx = Math.hypot(destX - earthX, destY - earthY);
	const PIXELS_PER_SECOND_AT_FULL_C = 250;
	let durationMs = (distPx / (PIXELS_PER_SECOND_AT_FULL_C * chosenSpeed)) * 1000;
	durationMs = Math.min(Math.max(durationMs, 800), 6000);

	const startTime = performance.now();

	function animate(now) {
		const t = Math.min((now - startTime) / durationMs, 1);
		const x = earthX + (destX - earthX) * t;
		const y = earthY + (destY - earthY) * t;
		moveShipTo(x, y);

		if (t < 1) {
			requestAnimationFrame(animate);
		} else {
			travelling = false;

			const ly = distanceLy(earthX, earthY, destX, destY);
			const gamma = 1 / Math.sqrt(1 - chosenSpeed * chosenSpeed);
			const earthYears = ly / chosenSpeed;
			const shipYears = earthYears / gamma;

			shipTimeEl.textContent = shipYears.toFixed(0) + " years";
			earthTimeEl.textContent = earthYears.toFixed(0) + " years";
			results.classList.remove("game-hidden");
		}
	}
	requestAnimationFrame(animate);
});

// Fullscreen
const btnFS=document.querySelector("#btnFS");
const btnWS=document.querySelector("#btnWS");
btnFS.addEventListener("click",enterFullscreen);
btnWS.addEventListener("click",exitFullscreen);

function enterFullscreen() {
	if (document.documentElement.requestFullscreen) {
		document.documentElement.requestFullscreen();
	} else if (document.documentElement.mozRequestFullScreen) {
		document.documentElement.mozRequestFullScreen();
	} else if (document.documentElement.webkitRequestFullscreen) {
		document.documentElement.webkitRequestFullscreen();
	} else if (document.documentElement.msRequestFullscreen) {
		document.documentElement.msRequestFullscreen();
	}
}
function exitFullscreen() {
	if (document.exitFullscreen) {
		document.exitFullscreen();
	} else if (document.mozCancelFullScreen) {
		document.mozCancelFullScreen();
	} else if (document.webkitExitFullscreen) {
		document.webkitExitFullscreen();
	} else if (document.msExitFullscreen) {
		document.msExitFullscreen();
	}
}