var allImages = document.querySelectorAll('.image-figure');

for (var i = allImages.length - 1; i >= 0; i--) {
	allImages[i].id= 'figure-number-' + i;
	lightboxListener('figure-number-' + i);
}



function openLightbox(figureID) {
	var imgURL = document.getElementById(figureID).getElementsByTagName('img')[0].src;
	var imgCaption = document.getElementById(figureID).getElementsByTagName('figcaption')[0].innerHTML;
	document.getElementById('lightbox').getElementsByTagName('img')[0].src=imgURL;
	if (0<imgCaption.length){
		document.getElementById('lightbox').getElementsByTagName('figure')[0].innerHTML+='<figcaption>' + imgCaption + '</figcaption';
	}
	
	document.getElementById('lightbox-shade').style.display='flex';
}


function closeLightbox() {
	document.getElementById('lightbox-shade').style.display='none';
	document.getElementById('lightbox').getElementsByTagName('figure')[0].innerHTML="<img>"
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