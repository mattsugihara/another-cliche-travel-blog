var allImages = document.querySelectorAll('.image-figure');

for (var i = allImages.length - 1; i >= 0; i--) {
	allImages[i].id= 'figure-number-' + i;
	lightboxListener('figure-number-' + i);
}


//open the lightbox
function openLightbox(figureID) {
	var imgURL = document.getElementById(figureID).getElementsByTagName('img')[0].src;
	var imgCaption = document.getElementById(figureID).getElementsByTagName('figcaption')[0].innerHTML;
	document.getElementById('lightbox').getElementsByTagName('img')[0].src=imgURL;
	if (0<imgCaption.length){
		document.getElementById('lightbox').getElementsByTagName('figure')[0].innerHTML+='<figcaption>' + imgCaption + '</figcaption';
	}
	
	document.getElementById('lightbox-shade').style.display='flex';
}


//prime the image to open the lightbox and fill the image appropriately
function lightboxListener(figureID) {
	document.getElementById(figureID).getElementsByTagName('img')[0].addEventListener('click',function(){
		event.preventDefault();
		openLightbox(figureID);
	});
}


//close the damn lightbox
document.getElementById('lightbox-shade').addEventListener('click',function(){
	document.getElementById('lightbox-shade').style.display='none';
	document.getElementById('lightbox').getElementsByTagName('figure')[0].innerHTML="<img>"
})