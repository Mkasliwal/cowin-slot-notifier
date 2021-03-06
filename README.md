# Co-Win Email Notifier :sparkles:

Booking vaccination slot :tickets: on [Co-Win](https://www.cowin.gov.in/home) is a long marathon :runner:. Let's make this task bit easier for user in order to get `notified` whenever slot bookings are available in their area.

Service takes few arguments in order to provide expected response.
- Arguments
    1. **PIN-CODE** (at this stage, this can be configured using `env` variable).
    2. **`from`** and **`to`** takes sender's and receiver's address respectively.
    3. **Current Date** (service will automatically configure current date) 

Based on the above provided arguments, service will refresh the response in every `20 seconds` and will notify user via `e-mail` when the slots are availabe in the area (provided via area pin-code).

## Usage

- Create a fork
- Clone your fork `<your-username>\cowin-slot-notifier` into your local envìronment
- Use `npm install` to install required dependencies. [Ensure you have [node.js](https://nodejs.org/en/download/) installed into your machine]
- Setup `.env` file in order to use your personal environment variables in the service
- :fire: Start the service using `npm run start:dev`


### NOTE

```
1. This application is purely a backend service.
2. API used dosen't provide real-time data after new CoWIN API revised guidelines from Government of India. 
```
*Read more about [Policy](https://apisetu.gov.in/public/api/cowin#:~:text=Co-WIN%20Public,%5D)
