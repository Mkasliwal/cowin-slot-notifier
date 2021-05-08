# Co-Win Email Notifier :sparkles:

Booking vaccination slot :tickets: on [Co-Win](https://www.cowin.gov.in/home) is a long marathon :runner:. Let's make this task bit easier for user in order to get `notified` whenever slot bookings are available in the area.

Service takes few arguments in order to provide expected response.
- Arguments
    1. PIN-CODE (at this stage, this can be configured using `env` variable.)
    2. Current Date (service will automatically configure)

Based on the above provided arguments, service will refresh the response in every `20 seconds` and will notify user via `e-mail` :: when the slots are availabe in the area (provided via area pin-code).

## Usage

- Clone into your local envìronment
- Use `npm install` to install required dependencies. [Ensure you have [node.js](https://nodejs.org/en/download/) installed into your machine]
- Setup `.env` file in order to use your personal environment variables in the service.
- :fire: Start the service using `npm run start:dev`


### NOTE

This application is purely a backend service and currently in a development stage for frontend support. 
