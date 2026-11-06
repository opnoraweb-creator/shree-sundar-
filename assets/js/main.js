document.addEventListener("DOMContentLoaded", async function () {

    "use strict";

    // =====================================
    // LOAD COMPANY JSON
    // =====================================

    let data = {};

    try {
        const response = await fetch("data/company.json");

        if (!response.ok) {
            throw new Error("Company JSON could not load.");
        }

        data = await response.json();

    } catch (error) {
        console.error("Company JSON Error:", error);
    }

    const company = data.company || {};
    const contact = data.contact || {};
    const social = data.social || {};
    const map = data.map || {};


    // =====================================
    // CONTACT DETAILS
    // =====================================

    const primaryPhone = String(
        contact.primaryPhone || "9414614853"
    ).replace(/\D/g, "");

    const secondaryPhone = String(
        contact.secondaryPhone || "9214481453"
    ).replace(/\D/g, "");

    const whatsappNumber = String(
        contact.whatsappNumber || "919414614853"
    ).replace(/\D/g, "");


    // =====================================
    // COMPANY NAME
    // =====================================

    document.title =
        (company.name || "Shree Sundar Enterprises") +
        " | Real Estate & Property";

    const brandName = document.querySelector(".brand h2");

    if (brandName && company.shortName) {
        brandName.textContent = company.shortName;
    }

    const brandTagline = document.querySelector(".brand span");

    if (brandTagline && company.tagline) {
        brandTagline.textContent = company.tagline;
    }

    const logo = document.querySelector(".brand img");

    if (logo && company.logo) {
        logo.src = company.logo;
    }

    // Keep the owner name as requested in index.html.
    const ownerHeading = document.querySelector(".owner-label h3");

    if (ownerHeading) {
        ownerHeading.textContent = "Shree Vijendra Sharma";
    }


    // =====================================
    // OWNER PHOTO
    // =====================================

    const ownerPhoto = document.querySelector(".hero-photo img");

    if (ownerPhoto && company.ownerPhoto) {
        ownerPhoto.src = company.ownerPhoto;
    }


    // =====================================
    // ABOUT IMAGE
    // =====================================

    const aboutPhoto = document.querySelector(".about-image img");

    if (aboutPhoto && company.aboutPhoto) {
        aboutPhoto.src = company.aboutPhoto;
    }


    // =====================================
    // CALL LINKS
    // =====================================

    document.querySelectorAll('a[href^="tel:"]').forEach(function (link) {

        const oldHref = link.getAttribute("href") || "";

        if (oldHref.includes("92144")) {
            link.href = "tel:+91" + secondaryPhone;
        } else {
            link.href = "tel:+91" + primaryPhone;
        }

    });


    // =====================================
    // WHATSAPP LINKS
    // =====================================

    document.querySelectorAll('a[href*="wa.me"]').forEach(function (link) {

        link.href = "https://wa.me/" + whatsappNumber;

        link.target = "_blank";
        link.rel = "noopener noreferrer";

    });


    // =====================================
    // INSTAGRAM LINKS
    // =====================================

    const instagramLinks = [
        document.getElementById("topInstagramLink"),
        document.getElementById("instagramLink")
    ];

    instagramLinks.forEach(function (link) {

        if (!link) return;

        if (social.instagram && social.instagram.trim() !== "") {

            link.href = social.instagram;
            link.target = "_blank";
            link.rel = "noopener noreferrer";

        } else {

            link.href = "#";

            link.addEventListener("click", function (event) {
                event.preventDefault();
                alert("Instagram account link will be added soon.");
            });

        }

    });


    // =====================================
    // GOOGLE MAPS LINKS
    // =====================================

    const mapLinks = [
        document.getElementById("topMapLink"),
        document.getElementById("mapLink")
    ];

    mapLinks.forEach(function (link) {

        if (!link) return;

        if (map.googleMapsUrl && map.googleMapsUrl.trim() !== "") {

            link.href = map.googleMapsUrl;
            link.target = "_blank";
            link.rel = "noopener noreferrer";

            const paragraph = link.querySelector("p");

            if (paragraph) {
                paragraph.textContent = "View Office Location";
            }

        } else {

            link.href = "#";

            link.addEventListener("click", function (event) {
                event.preventDefault();
                alert("Google Maps location will be added soon.");
            });

        }

    });


    // =====================================
    // MOBILE MENU
    // =====================================

    const menuToggle = document.getElementById("menuToggle");
    const navLinks = document.getElementById("navLinks");

    if (menuToggle && navLinks) {

        menuToggle.addEventListener("click", function () {

            const isOpen = navLinks.classList.toggle("active");

            menuToggle.textContent = isOpen ? "✕" : "☰";

            menuToggle.setAttribute(
                "aria-expanded",
                String(isOpen)
            );

        });

        navLinks.querySelectorAll("a").forEach(function (link) {

            link.addEventListener("click", function () {

                navLinks.classList.remove("active");

                menuToggle.textContent = "☰";

                menuToggle.setAttribute("aria-expanded", "false");

            });

        });

        document.addEventListener("click", function (event) {

            if (
                !navLinks.contains(event.target) &&
                !menuToggle.contains(event.target)
            ) {
                navLinks.classList.remove("active");
                menuToggle.textContent = "☰";
                menuToggle.setAttribute("aria-expanded", "false");
            }

        });

    }


    // =====================================
    // PROPERTY INQUIRY FORM
    // =====================================

    const inquiryForm = document.getElementById("inquiryForm");

    if (inquiryForm) {

        inquiryForm.addEventListener("submit", function (event) {

            event.preventDefault();

            const name = document.getElementById("customerName").value.trim();

            const phone = document.getElementById("customerPhone").value.trim();

            const propertyType = document.getElementById("inquiryType").value;

            const message = document.getElementById("customerMessage").value.trim();


            if (!name || !phone || !propertyType || !message) {
                alert("Please fill in all details.");
                return;
            }

            if (!/^[0-9]{10}$/.test(phone)) {
                alert("Please enter a valid 10-digit mobile number.");
                return;
            }


            const whatsappMessage =

                "Namaste Shree Sundar Enterprises!\n\n" +

                "I want to make a property inquiry.\n\n" +

                "Name: " + name + "\n" +

                "Mobile: " + phone + "\n" +

                "Property Type: " + propertyType + "\n" +

                "Message: " + message + "\n\n" +

                "Please share more information.\n\n" +

                "Thank you.";


            const whatsappURL =
                "https://wa.me/" +
                whatsappNumber +
                "?text=" +
                encodeURIComponent(whatsappMessage);


            window.open(
                whatsappURL,
                "_blank",
                "noopener,noreferrer"
            );

        });

    }


    // =====================================
    // SERVICE ENQUIRY BUTTONS
    // =====================================

    document.querySelectorAll(".service-inquiry").forEach(function (button) {

        button.addEventListener("click", function () {

            const serviceName = button.dataset.service;

            const select = document.getElementById("inquiryType");

            if (select && serviceName) {

                const matchingOption = Array.from(select.options).find(
                    option => option.value === serviceName
                );

                if (matchingOption) {
                    select.value = serviceName;
                }

            }

        });

    });


    // =====================================
    // FOOTER YEAR
    // =====================================

    const currentYear = document.getElementById("currentYear");

    if (currentYear) {
        currentYear.textContent = new Date().getFullYear();
    }


    // =====================================
    // IMAGE FALLBACK
    // =====================================

    document.querySelectorAll("img").forEach(function (img) {

        img.addEventListener("error", function () {

            console.warn("Image not found:", img.src);

        });

    });


    console.log("Shree Sundar Enterprises website loaded.");

});
