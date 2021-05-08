const express = require('express');
const app = express();
const axios = require('axios');
const nodemailer = require('nodemailer');
const moment = require('moment');
const port = process.env.PORT;

// DEFINE YOUR ENVIRONMENT VARIABLE IN .env
require('dotenv').config();

const main = async (msg) => {
    const transporter = await nodemailer.createTransport({
        service: process.env.TRANSPORTER,
        port: 587,
        auth: {
            user: process.env.EMAIL,
            pass: process.env.PASSWORD
        },
    });

    const info = await transporter.sendMail({
        // CHANGE VALUES AS PER DESIRED CREDENTIALS
        from: 'mats.kasliwal@gmail.com',
        to: 'mayurkasliwal97@gmail.com',
        subject: 'Slots Availability',
        text: `Seems some slots are available!! Rush and grab Your slots from Co-Win portal ${JSON.stringify(msg)}`
    });
}

const getAvailableSlots = async (cityPinCode, date) => {
    // Co-WIN API
    // VISIT https://apisetu.gov.in/public/api/cowin TO FIND MORE
    let url = `https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/calendarByPin?pincode=${cityPinCode}&date=${date}`;
    return await axios.get(url, {
        headers: {
            'Accept': '*/*',
            'Content-Type': 'application/json',
            'user-agent': "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.93 Safari/537.36",
        }
    })
        .then(response => response.data)
        .catch(error => console.log(error))
}

const transformer = async () => {
    // YOUR LOCAL AREA PIN-CODE
    let cityPinCode = process.env.PIN_CODE;
    // DATE IN YOUR CALENDER TODAY
    let date = moment().format('DD-MM-YYYY');

    const normalisedData = await getAvailableSlots(cityPinCode, date);
    const normalisedResults = { ...normalisedData };

    const availableCenters = normalisedResults.centers;

    const transformedData = availableCenters.map(el => {
        const session = el.sessions[0]
        return {
            name: el.name,
            address: el.address,
            date: session.date,
            vaccine_available: session.available_capacity,
            age: session.min_age_limit
        }
    })

    transformedData.filter(el => {
        if (el.vaccine_available > 0) {
            main(transformedData).catch(console.error);
            console.log(transformedData)
        } else {
            console.log('Will notify when slots are available ...')
        }
    });

}

// CHECK AND FETCH DATA IN EVERY 20 seconds
setInterval(() => {
    transformer()
}, 20000);

app.listen(port, (err) => {
    if (err) {
        console.log(err);
    } else {
        console.log(`Server is listening on port ${port}`);
    }
});
