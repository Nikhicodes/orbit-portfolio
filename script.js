function sayHello() {
    document.getElementById("message").innerHTML =
        "Keep exploring the universe! 🚀";
}
const contactForm = document.getElementById("contactForm");
console.log("ORBIT JavaScript loaded!");

contactForm.addEventListener("submit", async function(event) {

    event.preventDefault();

    const phone = document.getElementById("phone").value;
    const consent = document.getElementById("consent").checked;
    const message = document.getElementById("formMessage");

    message.textContent = "Sending...";

    try {
        const response = await fetch(
            "http://localhost:3000/submit-contact",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    phone: phone,
                    consent: consent
                })
            }
        );

        const result = await response.json();

        if (response.ok) {
            message.textContent = "Thank you! Your contact was submitted 🚀";
            contactForm.reset();
        } else {
            message.textContent = result.error || "Something went wrong.";
        }

    } catch (error) {
        message.textContent = "Could not connect. Please try again!";
    }

});

const contactForm = document.getElementById("contactForm");

contactForm.addEventListener("submit", async function(event) {
    event.preventDefault();

    const phone = document.getElementById("phone").value;
    const consent = document.getElementById("consent").checked;
    const message = document.getElementById("formMessage");

    message.textContent = "Sending...";

    try {
        const response = await fetch(
            "http://localhost:3000/submit-contact",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ phone, consent })
            }
        );

        const result = await response.json();

        if (response.ok) {
            message.textContent = "Thank you! Contact saved 🚀";
            contactForm.reset();
        } else {
            message.textContent = result.error;
        }

    } catch (error) {
        message.textContent = "Connection failed. Try again!";
    }
});
const contactForm = document.getElementById("contactForm");

contactForm.addEventListener("submit", async function(event) {
    event.preventDefault();

    const phone = document.getElementById("phone").value;
    const consent = document.getElementById("consent").checked;
    const message = document.getElementById("formMessage");

    message.textContent = "Sending...";

    try {
        const response = await fetch("http://localhost:3000/submit-contact", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ phone, consent })
        });

        const result = await response.json();

        if (response.ok) {
            message.textContent = "Thank you! Contact saved 🚀";
            contactForm.reset();
        } else {
            message.textContent = result.error || "Something went wrong.";
        }
    } catch (error) {
        message.textContent = "Connection failed. Try again!";
    }
});