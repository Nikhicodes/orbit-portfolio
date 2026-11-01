
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const { createClient } = require("@supabase/supabase-js");
const rateLimit = require("express-rate-limit");

dotenv.config();

const app = express();

app.use(cors({
    origin: process.env.FRONTEND_ORIGIN
}));

app.use(express.json());

const supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY
);

// Test route
app.get("/", (req, res) => {
    res.send("ORBIT Backend is running! 🚀");
});

// Contact submission
app.post("/submit-contact", rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 5
}), async (req, res) => {

    try {
        const { phone, consent } = req.body;

        if (typeof phone !== "string" || consent !== true) {
            return res.status(400).json({
                error: "Please provide your number and consent."
            });
        }

        const cleanPhone = phone.replace(/[\s()-]/g, "");

        if (!/^\+[1-9]\d{7,14}$/.test(cleanPhone)) {
            return res.status(400).json({
                error: "Enter a valid phone number with country code."
            });
        }

        const { error } = await supabase
            .from("visitor_contacts")
            .insert([{ phone: cleanPhone, consent: true }]);

        if (error) throw error;

        res.status(201).json({
            message: "Contact saved successfully!"
        });

    } catch (error) {
        console.error(error.message);

        res.status(500).json({
            error: "Unable to save contact."
        });
    }
});

app.listen(3000, () => {
    console.log("ORBIT Backend running on port 3000 🚀");
});
