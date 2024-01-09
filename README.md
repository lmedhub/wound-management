# HealthHub

HealthHub is an advanced wound management system that empowers users to seamlessly manage a list of wounds with features such as addition, editing, and deletion. Hosted on Vercel, the application encompasses robust functionalities including authentication, administrator tools, insightful statistics charts, support for English and Danish languages, light/dark color modes, and an integrated support chatbot.

User accounts in the system can assume one of two roles: "Admin" or "User". For testing purposes, newly created accounts are automatically assigned the "Admin" role. Users have the ability to create, view, edit, and delete their own wounds. On the other hand, administrators possess broader access, being able to access all wounds across all users. Additionally, administrators have access to a comprehensive statistics dashboard, providing an overview of relevant data.

The Chatbot is designed to respond to inquiries regarding the usability of the website, addressing questions like "How to add a wound?". Despite being trained with a limited number of phrases initially, it demonstrates high scalability and can respond effectively to diverse forms of the same question, contributing to a user-friendly experience.

[Live production application](https://wound-management-sigma.vercel.app/)

## Technologies Utilized:

### TypeScript
A statically typed superset of JavaScript, enhances code maintainability by introducing optional static typing. It plays a crucial role in catching errors during development, ensuring a more robust and reliable codebase.

### Next.js
[Next.js](https://nextjs.org/), a React framework, elevates web development with seamless server-side rendering, automatic code splitting, and simplified configuration. This efficiency ensures a smooth user experience, making it an ideal choice for building modern, full-stack web applications.

### Next-Auth
[Next-Auth](https://next-auth.js.org/), an authentication library tailored for Next.js applications. It equips developers with a comprehensive set of tools to effortlessly implement authentication using various identity providers, ensuring secure access control.

### Prisma
[Prisma](https://www.prisma.io/), a modern database toolkit, simplifies database access for developers. With a type-safe query builder and an auto-generated client for databases, Prisma enhances the efficiency and reliability of data management in HealthHub.

### PostgreSQL
A powerful open-source relational database management system (RDBMS), is employed for its extensibility and adherence to standards. It ensures a robust and scalable foundation for storing and retrieving data in HealthHub.

### Vercel
[Vercel](https://vercel.com/), a cloud platform, seamlessly deploys and hosts web applications with features like serverless functions and automatic scaling. HealthHub benefits from Vercel's efficiency in ensuring a reliable and performant user experience.

### Material-UI
[Material-UI](https://material-ui.com/), a React component library implementing Google's Material Design, offers pre-designed components. It enables the creation of visually appealing and consistent user interfaces in HealthHub.

### Emotion
A popular JavaScript library for styling React applications, allows developers to write CSS-in-JS with a focus on high performance. Its capabilities contribute to a visually appealing and responsive user interface in HealthHub.

### DialogFlow
[DialogFlow](https://cloud.google.com/dialogflow), now known as Google Cloud's Natural Language Processing, serves as a platform for building conversational interfaces like chatbots. Leveraging machine learning, it enhances HealthHub's support for end-users.

### Chart.js
[Chart.js](https://www.chartjs.org/), a versatile JavaScript charting library, empowers HealthHub with the creation of interactive and visually appealing charts on the web. It contributes to a more insightful and data-driven user experience.

### Cypress
[Cypress](https://www.cypress.io/), an end-to-end testing framework for web applications, ensures the reliability and functionality of HealthHub. It provides a fast and efficient way to write and execute tests for the frontend, contributing to a robust application.

### i18n
[i18n](https://en.wikipedia.org/wiki/Internationalization_and_localization), focusing on internationalization in software development, enables HealthHub to be easily translatable and adaptable to different languages and regions. It ensures a more inclusive and globally accessible application.


## Future Implementations:

- Improved statistics dashboard with Datagrids and XML export functionality.
- Global state management using [Redux Toolkit](https://redux-toolkit.js.org/).
- Multilingual support on Dialogflow.
- Addition of more color themes.
- Integration of Suspense and lazy-loading for enhanced performance.
- Implementation of unit testing.
- Automatic data update using [Pusher](https://pusher.com/) tools.
- Docker integration for easier setup and deployment.
- User onboarding with [React Tour](https://reactour.js.org/).
- Configuration of [Sentry](https://sentry.io/) for error analytics.
- Addressing minor security and performance issues.
- Continuous improvement of code quality, typing and error handling.
