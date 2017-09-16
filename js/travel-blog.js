var allImages = document.querySelectorAll('.image-figure');

for (var i = allImages.length - 1; i >= 0; i--) {
	allImages[i].id= 'figure-number-' + i;
	lightboxListener('figure-number-' + i);
}

if ("ontouchstart" in document.documentElement) {
    document.querySelector('body').classList.add('supports-touch');
}

function panImage(event) {
		const img = document.querySelector('#lightbox img');
		let cursorX = event.clientX;
		let cursorY = event.clientY;
		let windowWidth = document.documentElement.clientWidth;
		let windowHeight = document.documentElement.clientHeight;
		let imageWidth = img.offsetWidth;	//There's a race condition here. image width sometimes = 0, resulting in the image being positioned at the cursor
		let imageHeight = img.offsetHeight;
	window.requestAnimationFrame(function() {
		let left = -((imageWidth - windowWidth) * (cursorX / windowWidth)) + 'px';
		let top = -((imageHeight - windowHeight) * (cursorY / windowHeight)) + 'px';
		img.setAttribute('style','transform: translate(' + left + ',' + top +')');
	});
}


function openLightbox(figureID) {
	let imgURL = document.querySelector('#' + figureID + ' a').href;
	let imgCaption = document.querySelector('#' + figureID + ' figcaption').innerHTML;
	document.querySelector('#lightbox img').setAttribute('src', imgURL);
	if (0 < imgCaption.length){
		document.querySelector('#lightbox figure').innerHTML += '<figcaption>' + imgCaption + '</figcaption';
	}
	
	document.querySelector('#lightbox').classList.add('visible');
	document.querySelector('body').setAttribute('style','overflow: hidden');

	if(!document.querySelector('body').classList.contains('supports-touch')){
		panImage(event);
		document.addEventListener('mousemove',function(){ panImage(event) });
	}
}


function closeLightbox() {
	document.querySelector('#lightbox').classList.remove('visible');
	document.querySelector('#lightbox figure').innerHTML = "<img>";
	document.removeEventListener('mousemove', panImage);
	document.querySelector('body').removeAttribute('style');
}



function parseKeyPress(event) {
	switch (event.keyCode) {
	    case 27:
	        closeLightbox();
	        break;
	}
}

function toggleNav() {
	document.querySelector('body').classList.toggle('mobile-nav-shown');
}


function lightboxListener(figureID) {
	document.querySelector('#' + figureID + ' a').addEventListener('click',function() {
		event.preventDefault();
		openLightbox(figureID);
	});
}

document.querySelector('#lightbox').addEventListener('click',closeLightbox);
document.addEventListener('keydown',function(){
	parseKeyPress(event);
});

document.querySelector('#show-navigation').addEventListener('click',toggleNav);
document.querySelector('#hide-navigation').addEventListener('click',toggleNav);