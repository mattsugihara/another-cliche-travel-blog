var coverImage = new Image();
var lightboxTrigger = null;
const allImages = document.querySelectorAll(".image-figure");

for (const [index, image] of allImages.entries()) {
  image.id = `figure-number-${index}`;
  addLightboxListener(`figure-number-${index}`);
}

if ("ontouchstart" in document.documentElement) {
  document.querySelector("body").classList.add("supports-touch");
}

coverImage.onload = function () {
  document
    .querySelector("#cover")
    .setAttribute("style", `background-image: url(${coverImage.src});`);
};

coverImage.src = document.querySelector("#cover").getAttribute("data-image");

function panImage(event) {
  const img = document.querySelector("#lightbox img");
  let cursorX = event.clientX;
  let cursorY = event.clientY;
  let windowWidth = document.documentElement.clientWidth;
  let windowHeight = document.documentElement.clientHeight;
  let imageWidth = img.offsetWidth; // There's a race condition here. image width sometimes = 0, resulting in the image being positioned at the cursor
  let imageHeight = img.offsetHeight;

  window.requestAnimationFrame(function () {
    let left = -((imageWidth - windowWidth) * (cursorX / windowWidth)) + "px";
    let top = -((imageHeight - windowHeight) * (cursorY / windowHeight)) + "px";
    img.setAttribute("style", `transform: translate(${left},${top})`);
  });
}

function getImage(figureID) {
  const image = document.querySelector("#lightbox img");
  const thumbnail = document.querySelector(`#${figureID} img`);
  let imageBuffer = new Image();

  imageBuffer.onload = function () {
    image.src = this.src;
  };
  imageBuffer.src = document.querySelector(`#${figureID} a`).href;
  image.alt = thumbnail.alt;
}

function handleLightboxPan() {
  panImage(event);
}

function openLightbox(figureID) {
  if (document.querySelector(`#${figureID} figcaption`)) {
    let imgCaption = document.querySelector(
      `#${figureID} figcaption`,
    ).innerText;

    document.querySelector("#lightbox figure").innerHTML +=
      `<figcaption>${imgCaption}</figcaption>`;
  }

  getImage(figureID);

  lightboxTrigger = document.querySelector(`#${figureID} a`);
  document.querySelector("#lightbox").showModal();

  if (!document.querySelector("body").classList.contains("supports-touch")) {
    document.addEventListener("mousemove", handleLightboxPan);
  }
}

function closeLightbox() {
  document.querySelector("#lightbox").close();
}

function toggleNav() {
  document.querySelector("body").classList.toggle("mobile-nav-shown");
}

function addLightboxListener(figureID) {
  document
    .querySelector(`#${figureID} a`)
    .addEventListener("click", function (event) {
      event.preventDefault();
      openLightbox(figureID);
    });
}

document.querySelector("#show-navigation").addEventListener("click", toggleNav);
document.querySelector("#hide-navigation").addEventListener("click", toggleNav);
document.querySelector("#lightbox").addEventListener("click", closeLightbox);

document.querySelector("#lightbox").addEventListener("close", function () {
  document.querySelector("#lightbox figure").innerHTML = "<img>";
  document.removeEventListener("mousemove", handleLightboxPan);

  if (lightboxTrigger) {
    lightboxTrigger.focus();
    lightboxTrigger = null;
  }
});
