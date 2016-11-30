var allImages = document.querySelectorAll('.image-figure');

for (var i = allImages.length - 1; i >= 0; i--) {
	allImages[i].id= 'figure-number-' + i;
	lightboxListener('figure-number-' + i);
}


function shiftImg() {
	var img = document.querySelector('#lightbox').querySelector('img');
	var cursorX = event.clientX;
	var cursorY = event.clientY;
	var windowWidth = document.documentElement.clientWidth;
	var windowHeight = document.documentElement.clientHeight;
	var imageWidth = img.offsetWidth;
	var imageHeight = img.offsetHeight;

	var relativeLeft = (imageWidth - windowWidth) * (cursorX / windowWidth);
	var relativeTop = (imageHeight - windowHeight) * (cursorY / windowHeight);

	img.style.left = -relativeLeft + 'px';
	img.style.top = -relativeTop + 'px';
}



function openLightbox(figureID) {
	var imgURL = document.getElementById(figureID).getElementsByTagName('a')[0].href;
	var imgCaption = document.getElementById(figureID).getElementsByTagName('figcaption')[0].innerHTML;
	document.getElementById('lightbox').getElementsByTagName('img')[0].src=imgURL;
	if (0<imgCaption.length){
		document.getElementById('lightbox').getElementsByTagName('figure')[0].innerHTML+='<figcaption>' + imgCaption + '</figcaption';
	}
	
	document.getElementById('lightbox-shade').style.display='flex';

	document.addEventListener('mousemove', shiftImg);
}


function closeLightbox() {
	document.getElementById('lightbox-shade').style.display='none';
	document.getElementById('lightbox').getElementsByTagName('figure')[0].innerHTML="<img>"
	document.removeEventListener('mousemove', shiftImg);
}



function parseKeyPress(event) {
	switch (event.keyCode) {
	    case 27:
	        closeLightbox();
	        break;
	}
}


function lightboxListener(figureID) {
	document.getElementById(figureID).getElementsByTagName('a')[0].addEventListener('click',function(){
		event.preventDefault();
		openLightbox(figureID);
	});
}


document.getElementById('lightbox-shade').addEventListener('click',closeLightbox);
document.addEventListener('keydown',function(){
	parseKeyPress(event);
});
