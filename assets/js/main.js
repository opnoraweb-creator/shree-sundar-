document.addEventListener("DOMContentLoaded", async function () {

    "use strict";

    // =========================================
    // LOAD COMPANY JSON
    // =========================================

    let companyData = {};

    try {
        const response = await fetch("data/company.json");

        if (!response.ok) {
            throw new Error("Unable to load company.json");
        }

        companyData = await response.json();

        console.log("Company data loaded successfully.");

    } catch (error) {
        console.error("Company data loading error:", error);
    }


    const company = companyData.company || {};
    const contact = companyData.contact || {};
    const social = companyData.social || {};
    const map = companyData.map || {};
    const settings = companyData.settings || {};


    // =========================================
    // SAFE HTML
    // =========================================

    function escapeHTML(value) {
        return String(value ?? "").replace(/[&<>"']/g, function (char) {
            return {
                "&": "&amp;",
                "<": "&lt;",
                ">": "&gt;",
                '"': "&quot;",
                "'": "&#039;"
            }[char];
        });
    }


    // =========================================
    // COMPANY NAME AND PAGE DETAILS
    // =========================================

    document.title =
        (company.name || "Shree Sundar Enterprises") +
        " | Real Estate & Construction";

    const brandName = document.querySelector(".brand h2");

    if (brandName) {
        brandName.textContent =
            company.shortName || company.name || "SHREE SUNDAR";
    }

    const brandTagline = document.querySelector(".brand span");

    if (brandTagline) {
        brandTagline.textContent = company.tagline || "ENTERPRISES";
    }

    const footerName = document.querySelector(".footer h2");

    if (footerName) {
        footerName.textContent =
            company.name || "Shree Sundar Enterprises";
    }

    const heroHeading = document.querySelector(".hero-content h1");

    if (heroHeading && company.heroHeading) {

        const headingParts = company.heroHeading.split("\n");

        heroHeading.replaceChildren();

        headingParts.forEach(function (part, index) {

            if (index > 0) {
                heroHeading.appendChild(document.createElement("br"));
            }

            const span = document.createElement("span");

            span.textContent = part;

            heroHeading.appendChild(span);
        });
    }

    const heroDescription = document.querySelector(".hero-content > p");

    if (heroDescription && company.description) {
        heroDescription.textContent = company.description;
    }


    // =========================================
    // LOGO AND OWNER PHOTO
    // =========================================

    const logo = document.querySelector(".brand img");

    if (logo && company.logo) {
        logo.src = company.logo;
    }

    const ownerPhoto = document.querySelector(".hero-photo img");

    if (ownerPhoto && company.ownerPhoto) {
        ownerPhoto.src = company.ownerPhoto;
    }

    const aboutPhoto = document.querySelector(".about-image img");

    if (aboutPhoto && company.aboutPhoto) {
        aboutPhoto.src = company.aboutPhoto;
    }

    const aboutHeading = document.querySelector(".about-content h2");

    if (aboutHeading && company.aboutHeading) {
        aboutHeading.textContent = company.aboutHeading;
    }

    const aboutParagraphs = document.querySelectorAll(".about-content > p");

    if (aboutParagraphs.length && company.aboutDescription) {
        aboutParagraphs[0].textContent = company.aboutDescription;
    }


    // =========================================
    // PHONE LINKS
    // =========================================

    const primaryPhone = contact.primaryPhone || "9414614853";
    const secondaryPhone = contact.secondaryPhone || "9214481453";

    document.querySelectorAll('a[href^="tel:"]').forEach(function (link) {

        const oldHref = link.getAttribute("href") || "";

        if (oldHref.includes("9414614853")) {
            link.href = "tel:+91" + primaryPhone;
        }

        if (oldHref.includes("9214481453")) {
            link.href = "tel:+91" + secondaryPhone;
        }
    });

    // Update visible contact numbers
    document.querySelectorAll(".contact-card").forEach(function (card) {

        const heading = card.querySelector("h3");
        const paragraph = card.querySelector("p");

        if (!heading || !paragraph) return;

        if (heading.textContent.trim() === "Call Us") {

            if (paragraph.textContent.includes("94146")) {
                paragraph.textContent = primaryPhone;
            }

            if (paragraph.textContent.includes("92144")) {
                paragraph.textContent = secondaryPhone;
            }
        }
    });


    // =========================================
    // WHATSAPP LINKS
    // =========================================

    const whatsappNumber =
        contact.whatsappNumber || "919414614853";

    document.querySelectorAll('a[href*="wa.me/"]').forEach(function (link) {

        link.href = "https://wa.me/" + whatsappNumber;

        link.target = "_blank";
        link.rel = "noopener noreferrer";
    });


    // =========================================
    // TOP INSTAGRAM ICON
    // =========================================

    const topInstagram = document.getElementById("topInstagramLink");

    const contactInstagram = document.getElementById("instagramLink");

    function setupInstagram(link) {

        if (!link) return;

        if (social.instagram) {

            link.href = social.instagram;
            link.target = "_blank";
            link.rel = "noopener noreferrer";

        } else {

            link.href = "#";
            link.addEventListener("click", function (event) {
                event.preventDefault();
                alert("Instagram link will be added soon.");
            });
        }
    }

    setupInstagram(topInstagram);
    setupInstagram(contactInstagram);


    // =========================================
    // TOP GOOGLE MAPS ICON
    // =========================================

    const topMap = document.getElementById("topMapLink");

    const contactMap = document.getElementById("mapLink");

    function setupMap(link) {

        if (!link) return;

        if (map.googleMapsUrl) {

            link.href = map.googleMapsUrl;
            link.target = "_blank";
            link.rel = "noopener noreferrer";

        } else {

            link.href = "#";
            link.addEventListener("click", function (event) {
                event.preventDefault();
                alert("Google Maps location will be added soon.");
            });
        }
    }

    setupMap(topMap);
    setupMap(contactMap);


    // =========================================
    // DYNAMIC SERVICES
    // =========================================

    const servicesGrid = document.querySelector(".services-grid");

    if (servicesGrid && Array.isArray(companyData.services)) {

        servicesGrid.innerHTML = companyData.services.map(function (service, index) {

            const icons = ["⌂", "🏗", "▣", "♙"];

            return `
                <article class="service-card">

                    <div class="service-icon">
                        ${icons[index % icons.length]}
                    </div>

                    <h3>${escapeHTML(service.name)}</h3>

                    <p>${escapeHTML(service.description)}</p>

                    <a href="#inquiry"
                       class="service-inquiry"
                       data-service="${escapeHTML(service.name)}">
                        Enquire Now →
                    </a>

                </article>
            `;

        }).join("");
    }


    // =========================================
    // SERVICE TO INQUIRY FORM
    // =========================================

    const serviceSelect = document.getElementById("inquiryType");

    document.querySelectorAll(".service-inquiry").forEach(function (link) {

        link.addEventListener("click", function () {

            if (!serviceSelect) return;

            const serviceName = link.dataset.service;

            let option = Array.from(serviceSelect.options).find(function (item) {
                return item.value === serviceName ||
                       item.textContent === serviceName;
            });

            if (!option) {

                option = document.createElement("option");

                option.value = serviceName;
                option.textContent = serviceName;

                serviceSelect.appendChild(option);
            }

            serviceSelect.value = serviceName;
        });
    });


    // =========================================
    // MOBILE NAVIGATION
    // =========================================

    const menuToggle = document.getElementById("menuToggle");

    const navLinks = document.getElementById("navLinks");

    if (menuToggle && navLinks) {

        menuToggle.addEventListener("click", function () {

            navLinks.classList.toggle("active");

            menuToggle.textContent =
                navLinks.classList.contains("active") ? "✕" : "☰";
        });

        navLinks.querySelectorAll("a").forEach(function (link) {

            link.addEventListener("click", function () {

                navLinks.classList.remove("active");

                menuToggle.textContent = "☰";
            });
        });
    }


    // =========================================
    // WHATSAPP INQUIRY FORM
    // =========================================

    const inquiryForm = document.getElementById("inquiryForm");

    if (inquiryForm) {

        inquiryForm.addEventListener("submit", function (event) {

            event.preventDefault();

            const name = document.getElementById("customerName").value.trim();

            const phone = document.getElementById("customerPhone").value.trim();

            const service = document.getElementById("inquiryType").value;

            const message = document.getElementById("customerMessage").value.trim();

            if (!name || !phone || !service || !message) {
                alert("Please fill in all details.");
                return;
            }

            if (!/^[0-9]{10}$/.test(phone)) {
                alert("Please enter a valid 10-digit mobile number.");
                return;
            }

            const whatsappMessage =
                "Namaste " + (company.name || "Shree Sundar Enterprises") + "!\n\n" +
                "I want to make an inquiry.\n\n" +
                "Name: " + name + "\n" +
                "Mobile: " + phone + "\n" +
                "Service: " + service + "\n" +
                "Message: " + message + "\n\n" +
                "Please contact me. Thank you.";

            const whatsappURL =
                "https://wa.me/" +
                whatsappNumber +
                "?text=" +
                encodeURIComponent(whatsappMessage);

            window.open(whatsappURL, "_blank", "noopener,noreferrer");
        });
    }


    // =========================================
    // FOOTER YEAR
    // =========================================

    const currentYear = document.getElementById("currentYear");

    if (currentYear) {
        currentYear.textContent = new Date().getFullYear();
    }


    // =========================================
    // SETTINGS: HIDE SECTIONS
    // =========================================

    const projectsSection = document.getElementById("projects");

    const gallerySection = document.getElementById("gallery");

    const showProjects = settings.showProjects !== false;
    const showGallery = settings.showGallery !== false;

    if (projectsSection && !showProjects) {
        projectsSection.hidden = true;
    }

    if (gallerySection && !showGallery) {
        gallerySection.hidden = true;
    }

    if (topInstagram && settings.showInstagram === false) {
        topInstagram.hidden = true;
    }

    if (topMap && settings.showGoogleMaps === false) {
        topMap.hidden = true;
    }


    // =========================================
    // DONE
    // =========================================

    console.log("Shree Sundar Enterprises website initialized.");

});
