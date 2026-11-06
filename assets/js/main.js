document.addEventListener("DOMContentLoaded", function () {

    // =====================================
    // MOBILE NAVIGATION
    // =====================================

    const menuToggle = document.getElementById("menuToggle");
    const navLinks = document.getElementById("navLinks");

    if (menuToggle && navLinks) {

        menuToggle.addEventListener("click", function () {
            navLinks.classList.toggle("active");

            menuToggle.textContent =
                navLinks.classList.contains("active") ? "✕" : "☰";
        });

        // Close menu after clicking a link
        navLinks.querySelectorAll("a").forEach(function (link) {

            link.addEventListener("click", function () {
                navLinks.classList.remove("active");
                menuToggle.textContent = "☰";
            });

        });
    }


    // =====================================
    // FOOTER CURRENT YEAR
    // =====================================

    const currentYear = document.getElementById("currentYear");

    if (currentYear) {
        currentYear.textContent = new Date().getFullYear();
    }


    // =====================================
    // WHATSAPP INQUIRY FORM
    // =====================================

    const inquiryForm = document.getElementById("inquiryForm");

    // Main business WhatsApp number
    const WHATSAPP_NUMBER = "919414614853";

    if (inquiryForm) {

        inquiryForm.addEventListener("submit", function (event) {

            event.preventDefault();

            const name = document
                .getElementById("customerName")
                .value.trim();

            const phone = document
                .getElementById("customerPhone")
                .value.trim();

            const service = document
                .getElementById("inquiryType")
                .value;

            const message = document
                .getElementById("customerMessage")
                .value.trim();


            // Basic validation
            if (!name || !phone || !service || !message) {
                alert("Please fill in all the details.");
                return;
            }

            if (!/^[0-9]{10}$/.test(phone)) {
                alert("Please enter a valid 10-digit mobile number.");
                return;
            }


            // Ready-made WhatsApp message
            const whatsappMessage =
                "Namaste Shree Sundar Enterprises!\n\n" +
                "I want to make an inquiry.\n\n" +
                "Name: " + name + "\n" +
                "Mobile: " + phone + "\n" +
                "Service: " + service + "\n" +
                "Message: " + message + "\n\n" +
                "Please contact me. Thank you.";


            const whatsappURL =
                "https://wa.me/" +
                WHATSAPP_NUMBER +
                "?text=" +
                encodeURIComponent(whatsappMessage);


            // Open WhatsApp with prepared message
            window.open(whatsappURL, "_blank", "noopener,noreferrer");

        });
    }


    // =====================================
    // CONTACT LINKS PLACEHOLDERS
    // Add actual links later
    // =====================================

    const instagramLink = document.getElementById("instagramLink");
    const mapLink = document.getElementById("mapLink");

    // Keep placeholder links inactive until actual links are added
    if (instagramLink) {
        instagramLink.addEventListener("click", function (event) {
            if (instagramLink.getAttribute("href") === "#contact") {
                event.preventDefault();
                alert("Instagram link will be added soon.");
            }
        });
    }

    if (mapLink) {
        mapLink.addEventListener("click", function (event) {
            if (mapLink.getAttribute("href") === "#contact") {
                event.preventDefault();
                alert("Google Maps location will be added soon.");
            }
        });
    }

});