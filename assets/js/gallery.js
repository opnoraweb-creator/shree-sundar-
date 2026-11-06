document.addEventListener("DOMContentLoaded", function () {

    const lightbox = document.getElementById("lightbox");
    const lightboxImage = document.getElementById("lightboxImage");
    const closeButton = document.getElementById("lightboxClose");
    const prevButton = document.getElementById("lightboxPrev");
    const nextButton = document.getElementById("lightboxNext");

    if (!lightbox || !lightboxImage) return;

    // All gallery images
    let images = [];
    let currentIndex = 0;

    function collectImages() {
        images = Array.from(
            document.querySelectorAll(
                ".zoom-image, .gallery-grid img"
            )
        ).filter(function (img) {
            return img.complete && img.naturalWidth > 0;
        });
    }

    function openLightbox(index) {
        collectImages();

        if (!images.length) return;

        currentIndex = index;

        lightboxImage.src = images[currentIndex].src;
        lightboxImage.alt = images[currentIndex].alt || "Photo";

        lightbox.classList.add("active");
        lightbox.setAttribute("aria-hidden", "false");

        document.body.classList.add("lightbox-open");
    }

    function closeLightbox() {
        lightbox.classList.remove("active");
        lightbox.setAttribute("aria-hidden", "true");

        lightboxImage.src = "";

        document.body.classList.remove("lightbox-open");
    }

    function showNext() {
        if (!images.length) return;

        currentIndex = (currentIndex + 1) % images.length;

        lightboxImage.src = images[currentIndex].src;
        lightboxImage.alt = images[currentIndex].alt || "Photo";
    }

    function showPrevious() {
        if (!images.length) return;

        currentIndex =
            (currentIndex - 1 + images.length) % images.length;

        lightboxImage.src = images[currentIndex].src;
        lightboxImage.alt = images[currentIndex].alt || "Photo";
    }

    // Image click
    document.addEventListener("click", function (event) {

        const image = event.target.closest(".zoom-image");

        if (!image) return;

        collectImages();

        const index = images.indexOf(image);

        if (index !== -1) {
            openLightbox(index);
        }
    });

    // Close button
    if (closeButton) {
        closeButton.addEventListener("click", closeLightbox);
    }

    // Next button
    if (nextButton) {
        nextButton.addEventListener("click", showNext);
    }

    // Previous button
    if (prevButton) {
        prevButton.addEventListener("click", showPrevious);
    }

    // Click outside image to close
    lightbox.addEventListener("click", function (event) {
        if (event.target === lightbox) {
            closeLightbox();
        }
    });

    // Keyboard controls
    document.addEventListener("keydown", function (event) {

        if (!lightbox.classList.contains("active")) return;

        if (event.key === "Escape") {
            closeLightbox();
        }

        if (event.key === "ArrowRight") {
            showNext();
        }

        if (event.key === "ArrowLeft") {
            showPrevious();
        }
    });

    // Refresh images after page loads
    window.addEventListener("load", collectImages);

});