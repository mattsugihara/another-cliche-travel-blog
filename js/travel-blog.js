var allImages = document.querySelectorAll('.image-figure');

for (var i = allImages.length - 1; i >= 0; i--) {
	allImages[i].id= 'figure-number-' + i;
	lightboxListener('figure-number-' + i);
}


function shiftImg(event) {
	window.requestAnimationFrame(function() {
		const img = document.querySelector('#lightbox').querySelector('img');
		let cursorX = event.clientX;
		let cursorY = event.clientY;
		let windowWidth = document.documentElement.clientWidth;
		let windowHeight = document.documentElement.clientHeight;
		let imageWidth = img.offsetWidth;
		let imageHeight = img.offsetHeight;

		let left = -((imageWidth - windowWidth) * (cursorX / windowWidth)) + 'px';
		let top = -((imageHeight - windowHeight) * (cursorY / windowHeight)) + 'px';
		img.setAttribute('style','transform: translate3d(' + left + ',' + top +',0px)');
	});
}


function openLightbox(figureID) {
	let imgURL = document.getElementById(figureID).getElementsByTagName('a')[0].href;
	let imgCaption = document.getElementById(figureID).getElementsByTagName('figcaption')[0].innerHTML;
	document.getElementById('lightbox').getElementsByTagName('img')[0].src=imgURL;
	if (0<imgCaption.length){
		document.getElementById('lightbox').getElementsByTagName('figure')[0].innerHTML+='<figcaption>' + imgCaption + '</figcaption';
	}
	
	document.getElementById('lightbox').classList.add('visible');
	document.getElementsByTagName('body')[0].style.overflow = 'hidden';
	shiftImg(event);

	document.addEventListener('mousemove',function(){ shiftImg(event) });
}


function closeLightbox() {
	document.getElementById('lightbox').classList.remove('visible');
	document.getElementById('lightbox').getElementsByTagName('figure')[0].innerHTML="<img>";
	document.removeEventListener('mousemove', shiftImg);
	document.getElementsByTagName('body')[0].style.overflow = 'auto';
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
	document.getElementById(figureID).getElementsByTagName('a')[0].addEventListener('click',function(){
		event.preventDefault();
		openLightbox(figureID);
	});
}

document.getElementById('lightbox').addEventListener('click',closeLightbox);
document.addEventListener('keydown',function(){
	parseKeyPress(event);
});

document.querySelector('#show-navigation').addEventListener('click',toggleNav);
document.querySelector('#hide-navigation').addEventListener('click',toggleNav);