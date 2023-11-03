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

### Query filtering

Ready to Go Nest simplifies data retrieval with the powerful "Query Filter" feature, allowing you to filter, search, sort, and paginate data effortlessly. Here's how you can harness this feature:

- **Filter by Columns**: Easily filter data based on specific columns or fields. You can narrow down results to meet your application's requirements.

- **Search**: Implement a search functionality that allows users to find records by providing search keywords. This feature enhances user experience and data accessibility.

- **Sort**: Sort data in ascending or descending order based on one or more columns. Sorting ensures that data is presented in a meaningful and organized way.

- **Paginate**: Implement pagination to display large datasets in manageable chunks. Users can navigate through pages to view additional data without overwhelming the interface.

### Unique Constraint

The "Unique Constraint Custom Validator" is a versatile and widely used feature that ensures the uniqueness of data within your application. It's a valuable tool in preventing duplicate entries in databases and maintaining data integrity.

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

#### Migrations

To apply pending migrations and update your database schema, use the following command:

```bash
npm run migration:run
```

To create a new migration file based on changes in your application's models or schema, use the following command:

```bash
npm run migration:generate -- src/database/migrations/MigrationName
```

To revert the last applied migration and roll back changes to your database schema, use the following command:

```bash
npm run migration:revert
```

#### Seeding

1. Open your terminal and navigate to your project's root directory.

2. To create a new seed file, run the following command, replacing `src/path/to/seeds/folder` with the actual path where you want to create the seed file and `MySeedFile` with your desired filename:

```bash
npm run seed:create -- -name=src/path/to/seeds/folder/MySeedFile.ts
```

3. Run the seeder:

```bash
npm run seed:run
```

### Query Filter

1. Decorate the query object by using the FilterDecorator

```typescript
@Get('/')
async getUsers(@FilterDecorator() userQueryFilterDto: UserQueryFilterDto) {
  return formatResponse(
    HttpStatus.OK,
    'users retrieved successfully',
    await this.userService.getUsers(userQueryFilterDto),
  );
}
```

2. Inject filter service and call the get generic method providing the desired entity to be filtered on.

```typescript
constructor(private readonly filterService: FilterService) {}

async getUsers(userQueryFilterDto: UserQueryFilterDto) {
  return await this.filterService.get<User>(
    userQueryFilterDto,
    this.userRepository,
    {
    // options go here
    },
  );
}
```

3. Implement a userQueryFilterDto that extends the filterDto

```typescript
import { QueryFilterDto } from 'src/modules/filter';

export class UserQueryFilterDto extends QueryFilterDto {
  @IsOptional()
  @IsNotEmpty()
  loginStrategy: string;
}
```

#### Adding conditions

The "Conditions" object functions similarly to adding a "WHERE" statement in your queries. For example let's assume that you want to retrieve all users that has the loginStrategy of 'google':

1. Simply add the conditions object to the filter service

```typescript
conditions: {
  loginStrategy: userQueryFilterDto.loginStrategy,
  // add more conditions
},
```

2. Use the following url

```bash
http://localhost:3001/v1/user?loginStrategy=jwt
```

#### Search

Searching becomes incredibly simple, all you need to do is:

1. add the searchableColumns:

```typescript
{
  searchableColumns: ['username', 'email'],
}
```

2. Use the following url:

```bash
http://localhost:3001/v1/user?search=majd
```

#### Sorting

1. add the sortableColumns:

```typescript
{
  sortableColumns: ['username', 'email', 'createdAt'],
}
```

2. Use the following url:

```bash
http://localhost:3001/v1/user?sortBy=createdAt:DESC
```

You can also sort either by DESC or ASC

#### Fields Filtering

To enable filtering on values, you can configure the `filterableColumns` object in your project. This configuration defines which columns are filterable and which filtering operators can be used on each column. Here's an example configuration:

```typescript
{
  filterableColumns: {
    name: [FilterOperator.LIKE, FilterOperator.EQ],
    createdAt: [FilterOperator.GT]
  },
}
```

Once you've configured the filterableColumns, you can incorporate filtering into your queries. Here's an example of how to apply filtering when retrieving data:

```bash
http://localhost:3001/v1/user?filter.created_at=$gt:2020-01-01&filter.username=Majd
```

⚠️ **Warning**: Use snake naming convention.

In some cases, you may notice that the 'Conditions' and 'Filter' options appear to have similar functions. However, they serve distinct purposes:

1. "Conditions Option:" Use the 'Conditions' option when you need to manually add specific conditions to your queries, typically when you want to apply filters that are not based on query parameters. This option gives you fine-grained control over how you filter data.

2. "Filterable Columns Option:" On the other hand, the 'Filterable Columns' option empowers users to decide which columns to filter on and how to filter them. For instance, if a user has a list of posts, it's more convenient to provide an API specialized in returning a user's posts rather than having them add query parameters like '?user.id=1' manually.

#### Selecting Columns

To utilize the "Select" option, you can provide an array of field names that you wish to include in the query result. For instance:

```typescript
{
  selectFields: ['username', 'id'],
}
```

### Pagination

To enable pagination, you can specify the `paginate` option in your queries. This option includes two properties:

- `limit`: Defines the maximum number of records to retrieve per page. In the example configuration below, we've set the limit to 10, which means each page will display a maximum of 10 records.
- `skip`: Indicates the number of records to skip before starting to retrieve data. This is particularly useful when you want to skip a certain number of records at the beginning of a query result. For example, if you set `skip` to 10, the query will skip the first 10 records and start retrieving data from the 11th record onward.

```typescript
{
  paginate: {
    limit: 10,
    skip: 10,
  },
}
```

```bash
http://localhost:3001/user?page=2&limit=1
```

#### Finally 🎉 Dealing With Relations

To retrieve data along with related entities, you can specify the `withRelations` option in your queries. This option accepts an array of related entities that you want to include in the query result. For example:

```typescript
{
  // usually password resets should not be returned in response if you are testing
  // the code below on the template just remove the @Exclude in password-reset.entity.ts
  withRelations: ['passwordResets'];
}
```

You can also incorporate relationships into any of the options mentioned above. Let's explore a comprehensive example to illustrate this.

```typescript
{
  sortableColumns: ['passwordResets.reset_password_expire'],
  withRelations: ['passwordResets'],
},
```

And then:

```bash
http://localhost:3001/user?sortBy=passwordResets.reset_password_expire:ASC
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

⚠️ **Warning**: make sure you start redis server in order for the queue to work

```bash
sudo systemctl start redis-server
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
