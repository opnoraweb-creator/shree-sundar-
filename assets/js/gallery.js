document.addEventListener("DOMContentLoaded", function () {

    "use strict";

    // =====================================
    // LIGHTBOX ELEMENTS
    // =====================================

    const lightbox = document.getElementById("lightbox");

    const lightboxImage = document.getElementById("lightboxImage");

    const closeButton = document.getElementById("lightboxClose");

    const previousButton = document.getElementById("lightboxPrev");

    const nextButton = document.getElementById("lightboxNext");


    if (
        !lightbox ||
        !lightboxImage ||
        !closeButton ||
        !previousButton ||
        !nextButton
    ) {
        console.warn("Image zoom elements not found.");
        return;
    }


    // =====================================
    // COLLECT IMAGES
    // =====================================

    let images = [];

    let currentIndex = 0;


    function collectImages() {

        images = Array.from(
            document.querySelectorAll(".zoom-image")
        ).filter(function (image) {

            return image.src && image.complete && image.naturalWidth > 0;

        });

    }


    // =====================================
    // OPEN IMAGE
    // =====================================

    function openImage(index) {

        collectImages();

        if (!images.length) return;

        currentIndex = (index + images.length) % images.length;

        const selectedImage = images[currentIndex];

        lightboxImage.src = selectedImage.src;

        lightboxImage.alt =
            selectedImage.alt || "Property Image";

        lightbox.classList.add("active");

        lightbox.setAttribute("aria-hidden", "false");

        document.body.style.overflow = "hidden";

        updateButtons();

    }


    // =====================================
    // CLOSE IMAGE
    // =====================================

    function closeImage() {

        lightbox.classList.remove("active");

        lightbox.setAttribute("aria-hidden", "true");

        lightboxImage.src = "";

        document.body.style.overflow = "";

    }


    // =====================================
    // NEXT IMAGE
    // =====================================

    function nextImage() {

        if (!images.length) return;

        openImage(currentIndex + 1);

    }


    // =====================================
    // PREVIOUS IMAGE
    // =====================================

    function previousImage() {

        if (!images.length) return;

        openImage(currentIndex - 1);

    }


    // =====================================
    // SHOW / HIDE NAVIGATION
    // =====================================

    function updateButtons() {

        const multipleImages = images.length > 1;

        previousButton.hidden = !multipleImages;

        nextButton.hidden = !multipleImages;

    }


    // =====================================
    // IMAGE CLICK
    // =====================================

    document.querySelectorAll(".zoom-image").forEach(function (image) {

        image.addEventListener("click", function () {

            collectImages();

            const index = images.indexOf(image);

            if (index !== -1) {
                openImage(index);
            }

        });

    });


    // =====================================
    // BUTTON EVENTS
    // =====================================

    closeButton.addEventListener("click", closeImage);

    nextButton.addEventListener("click", nextImage);

    previousButton.addEventListener("click", previousImage);


    // =====================================
    // BACKGROUND CLICK TO CLOSE
    // =====================================

    lightbox.addEventListener("click", function (event) {

        if (event.target === lightbox) {
            closeImage();
        }

    });


    // =====================================
    // KEYBOARD SUPPORT
    // =====================================

    document.addEventListener("keydown", function (event) {

        if (!lightbox.classList.contains("active")) return;

        if (event.key === "Escape") {
            closeImage();
        }

        if (event.key === "ArrowRight") {
            nextImage();
        }

        if (event.key === "ArrowLeft") {
            previousImage();
        }

    });


    // =====================================
    // TOUCH SWIPE SUPPORT
    // =====================================

    let touchStartX = 0;

    let touchEndX = 0;

    lightbox.addEventListener("touchstart", function (event) {

        touchStartX = event.changedTouches[0].screenX;

    }, { passive: true });


    lightbox.addEventListener("touchend", function (event) {

        touchEndX = event.changedTouches[0].screenX;

        const difference = touchEndX - touchStartX;

        if (Math.abs(difference) < 50) return;

        if (difference < 0) {
            nextImage();
        } else {
            previousImage();
        }

    }, { passive: true });


    console.log("Property image zoom initialized.");

});
