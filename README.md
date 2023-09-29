# Ready to Go Nest

Ready to Go Nest is a versatile Nest.js repository that equips your projects with essential features to accelerate development and enhance functionality. Whether you're building a web application, API, or any other Nest.js-based project, this repository provides you with a solid foundation.

## Project Setups

### Custom Winston Logger

Ready to Go Nest includes a custom Winston logger that offers the following capabilities:

- Logging of errors and events
- File-based log storage for easy troubleshooting

### Exception Filter

The built-in exception filter ensures robust error handling, making it easier to catch and manage exceptions in your Nest.js application.

- Email notifications for critical 500 errors
- Unified Shape of Response
- Nice Validation Object Response

### Seeding, Factories and Migrations

Streamline your database setup and management with the included seeding and migrations features. These features allow you to:

- Easily populate your database with initial data using seeding.
- Keep your database schema up to date with migrations, making it simple to evolve your application over time.

### Email Functionality with Bull

Integrate Bull to handle email sending efficiently. This feature allows you to:

- Queue and process email sending tasks asynchronously, preventing delays in your application's response time.
- Manage email delivery with ease, including retries and error handling.

### Authentication

Ready to Go Nest offers comprehensive authentication options, including:

- JWT-based user authentication
- Google OAuth2 authentication
- User registration and password reset functionality

### Configuration Setup

Effortlessly manage project configuration with a pre-configured setup. Customize and adapt settings to suit your specific needs.

### Swagger API Documentation

Ready to Go Nest includes Swagger integration to simplify the documentation of your API endpoints. Swagger provides an interactive and user-friendly interface for exploring and testing your API. Here's how to use Swagger in your project:

## Getting Started

To get started with Ready to Go Nest, follow these steps:

1. Clone this repository to your local machine.

2. Configure your project's settings by editing the provided configuration files.

3. Install the necessary dependencies using npm or yarn:
   ```bash
   npm install
   # or
   yarn install
   ```

## Usage

### Custom Winston Logger

Ready to Go Nest includes a custom Winston logger that provides flexibility for adding different transports for your log messages. If you want to log messages to the command line (CLI), you can easily add a new transport. Here's how you can do it:

```typescript
// Add a new transport for logging in src/configs/logger.config
// by simply pushing you new logging transport to the loggerTransports array
loggerTransports.push(
  new transports.Console(), // custom winston transport
);

// In main.ts override nest logger to use winston logger
import { loggerOptions } from './configs/logger.config';

const app = await NestFactory.create(AppModule, {
  logger: WinstonModule.createLogger(loggerOptions),
});

// Now you can use the logger by injecting Nest Logger
logger.info('This is an info message.');
logger.error('This is an error message.');

// Customize the transport and formatting options as per your requirements.
```

### Exception Filter

Modify the global exception filter to fits your needs in /src/exception/all.filter.ts

### Seeding, Factories and Migrations

#### Seeding

1. Open your terminal and navigate to your project's root directory.

2. To create a new seed file, run the following command, replacing `src/path/to/seeds/folder` with the actual path where you want to create the seed file and `MySeedFile` with your desired filename:

```bash
npm run seed:create -- name=src/path/to/seeds/folder/MySeedFile.ts
```

3. Run the seeder:

```bash
npm run seed:run
```

### Email Functionality with Bull

You can simply import MailModule and the inject the mailService:

```typescript
constructor(private readonly mailService: MailService) {}
```

or you can create you own process using bull and inject the mailService inside the processor:

```typescript
@Processor('error')
export class ErrorMailConsumer {
  constructor(private readonly mailService: MailService) {}

  @Process('internal_error_occurred')
  async sendException(job: Job<IMailError>) {
    const error: IMailError = job.data;

    await this.mailService.sendException(error);

    return {};
  }
}
```

#### Migrations

To apply pending migrations and update your database schema, use the following command:

```bash
npm run migration:run
```

To create a new migration file based on changes in your application's models or schema, use the following command:

```bash
npm run migration:generate
```

To revert the last applied migration and roll back changes to your database schema, use the following command:

```bash
npm run migration:revert
```

### Configuration Setup

Create you own configuration file:

```typescript
export default registerAs('mine', () => ({
  name: process.env.MY_CONF_NAME,
  pass: process.env.MY_CONF_PASS,
}));
```

Then include the configurations in the app.module.ts

```typescript
import { appConfig, databaseConfig, mineConfig } from './configs';

ConfigModule.forRoot({
  load: [databaseConfig, appConfig, mineConfig],
}),
```

### Swagger API Documentation

1. After starting your Nest.js application, open a web browser and navigate to the following URL:
   http://localhost:3000/api
   Replace `localhost:3000` with your actual server address and port.
2. Add you custom swagger options in the main.ts

```typescript
const options: SwaggerCustomOptions = {
  customCssUrl: '/swagger.css',
  customSiteTitle: 'Ready to go swagger',
};

SwaggerModule.setup('api', app, document, options);
```

## Acknowledgments

We extend our heartfelt gratitude to the following individuals, projects, and communities that have played a significant role in the development and success of Ready to Go Nest

Your support and contributions are deeply appreciated and have been instrumental in making Ready to Go Nest a powerful tool for Nest.js developers worldwide.
