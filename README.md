This is a dashboard to learn a little bit more about asteroids [Asteroid App](https://asafe-mavigliano.vercel.app/dashboard).

## Getting Started

1. clone the repo
2. run `npm install`
3. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
4. to run react testing library tests: `npm run test`
5. to run E2E cypress tests: `npm run cypress:open`
Please bare in mind that in order to make the DB run locally you will need a global variable. I will add it on the email. If not necessary, on production works successfully. 

## Architecture

- This application is a fullstack application. It contains a backend part where I made the petition to the database and I handle the error that we might encounter.
- The passwords are being stored in the database encrypted. To achieve this I used the library `bcryptjs`. Also I used that library to check if the password written on the input is correct.
- The application contains with two pages `/auth` and `/dashboard`.
- The application is fully accessible via keyboard and using an assistive technology (voiceover, NVDA, Jaws, etc)
- The app uses Next Auth library to validate the credentials. In this case, I chose to only provide one way of authentication, just providing user and password.
- I used tailwind for the styles.
- I created accesible and reusable components (modal, pagination, button, chart).
- I used D3.js for the charts where the user can see how many times the asteroid will or have passed close to the Earth.
- The application has a mechanism to change the color theme of the whole app.
- Finally, I created tests using React Testing Library for unit testing and Cypress for E2E testing.

## Additional information

In the future I would like to incorpate i18n to handle the translations.

Thanks for reading!! Mica ✨
