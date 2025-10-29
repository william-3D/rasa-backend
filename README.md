<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg" alt="Donate us"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow" alt="Follow us on Twitter"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

Rasa Backend - A NestJS API for personalized recipe discovery that filters recipes based on user dietary needs, health conditions, and allergies.

## Tech Stack

- **Framework**: NestJS
- **Language**: TypeScript
- **Database**: PostgreSQL (Supabase)
- **ORM**: Prisma
- **Package Manager**: pnpm

## Features

- Recipe search and pagination
- Filter by region, health conditions, and allergies
- User-specific filtering (excludes recipes with user's allergens)
- Dynamic filter options from database

## API Endpoints

### GET /recipes
Fetch recipes with optional filters

**Query Parameters:**
- `search` - Search by recipe title or description
- `userId` - Filter out recipes containing user's allergens
- `region` - Filter by cuisine region (can be multiple)
- `condition` - Filter by health condition (can be multiple)
- `allergy` - Filter by allergen presence (can be multiple)
- `page` - Page number (default: 1)
- `limit` - Items per page (default: 12)

**Response:**
```json
{
  "recipes": [...],
  "total": 28,
  "page": 1,
  "totalPages": 3
}
```

### GET /recipes/filters
Get available filter options

**Response:**
```json
{
  "regions": ["American", "Chinese", "Indian", ...],
  "conditions": ["Diabetes", "GERD", "Celiac", ...],
  "allergies": ["Nuts", "Dairy", "Gluten", ...]
}
```

## Database Schema

**Key Models:**
- `Recipe` - Recipe details with ingredients, steps, nutrition info
- `User` - User profile with region, conditions, and allergies
- `Condition` - Health conditions (Diabetes, GERD, etc.)
- `Allergy` - Food allergens (Nuts, Dairy, etc.)
- `RecipeCondition` - Links recipes suitable for conditions
- `RecipeAllergy` - Links recipes containing allergens

## API Call Flow

### Recipe Fetching Flow
```
Client Request → RecipesController.findAll() → RecipesService.findAll() → Prisma Query → Database
```

**Detailed Steps:**
1. **Controller** receives HTTP request with query parameters
2. **Controller** converts string/array parameters and passes to service
3. **Service** builds Prisma `where` clause:
   - Adds search filter (title/description contains)
   - Adds region filter (exact match)
   - Adds condition filter (recipes linked to conditions)
   - Adds allergy filter (recipes containing allergens)
   - If `userId` provided: fetches user data and excludes recipes with user's allergens
4. **Prisma** executes query with pagination (skip/take)
5. **Service** returns recipes with pagination metadata
6. **Controller** sends JSON response to client

### Filter Options Flow
```
Client Request → RecipesController.getFilters() → RecipesService.getFilters() → Prisma Query → Database
```

**Detailed Steps:**
1. **Controller** receives GET request to `/recipes/filters`
2. **Service** executes 3 parallel queries:
   - Fetch distinct regions from Recipe table
   - Fetch all condition names from Condition table
   - Fetch all allergy names from Allergy table
3. **Service** formats and sorts results
4. **Controller** sends JSON response with available filter options

## Important Behavior

When `userId` is provided, the API automatically filters out recipes containing the user's allergens for safety. This reduces the total recipe count but ensures user safety.

## Seeding Data

To populate conditions and allergies:

```bash
pnpm ts-node prisma/seed-conditions-allergies.ts
```

## Project setup

```bash
$ pnpm install
```

## Compile and run the project

```bash
# development
$ pnpm run start

# watch mode
$ pnpm run start:dev

# production mode
$ pnpm run start:prod
```

## Run tests

```bash
# unit tests
$ pnpm run test

# e2e tests
$ pnpm run test:e2e

# test coverage
$ pnpm run test:cov
```

## Deployment

When you're ready to deploy your NestJS application to production, there are some key steps you can take to ensure it runs as efficiently as possible. Check out the [deployment documentation](https://docs.nestjs.com/deployment) for more information.

If you are looking for a cloud-based platform to deploy your NestJS application, check out [Mau](https://mau.nestjs.com), our official platform for deploying NestJS applications on AWS. Mau makes deployment straightforward and fast, requiring just a few simple steps:

```bash
$ pnpm install -g @nestjs/mau
$ mau deploy
```

With Mau, you can deploy your application in just a few clicks, allowing you to focus on building features rather than managing infrastructure.

## Resources

Check out a few resources that may come in handy when working with NestJS:

- Visit the [NestJS Documentation](https://docs.nestjs.com) to learn more about the framework.
- For questions and support, please visit our [Discord channel](https://discord.gg/G7Qnnhy).
- To dive deeper and get more hands-on experience, check out our official video [courses](https://courses.nestjs.com/).
- Deploy your application to AWS with the help of [NestJS Mau](https://mau.nestjs.com) in just a few clicks.
- Visualize your application graph and interact with the NestJS application in real-time using [NestJS Devtools](https://devtools.nestjs.com).
- Need help with your project (part-time to full-time)? Check out our official [enterprise support](https://enterprise.nestjs.com).
- To stay in the loop and get updates, follow us on [X](https://x.com/nestframework) and [LinkedIn](https://linkedin.com/company/nestjs).
- Looking for a job, or have a job to offer? Check out our official [Jobs board](https://jobs.nestjs.com).

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://twitter.com/kammysliwiec)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](https://github.com/nestjs/nest/blob/master/LICENSE).
