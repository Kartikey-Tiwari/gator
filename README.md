# Gator-TS

Gator-TS is a **Node.js + TypeScript** command-line RSS feed aggregator that lets you manage feeds, follow/unfollow them, and browse aggregated posts — all from your terminal.  
It uses **PostgreSQL** for data storage and **Drizzle ORM** for database access.

## Features

- **User Management**
  - `register` – Create a new user
  - `login` – Set user as current user
  - `users` – List registered users
  - `reset` – Reset application data

- **Feed Management**
  - `addfeed` – Add a new RSS feed
  - `feeds` – List available feeds
  - `follow` – Follow a feed
  - `unfollow` – Unfollow a feed
  - `following` – Show feeds you are following

- **Content Browsing**
  - `agg` – Aggregate latest content from feeds
  - `browse` – Browse aggregated posts

## Requirements

- **Node.js** v18+ (ESM support)
- **PostgreSQL** database
- **pnpm / npm / yarn** for package management

## Installation

```bash
git clone <repo-url>
cd gator-ts
npm install
```

## Database Setup

Before running the application, you must create a PostgreSQL database.

Example command (run in terminal or inside the `psql` shell):

```sql
CREATE DATABASE gator;
```

## Configuration

Create a .env file in the project root with your PostgreSQL connection string:

```bash
DB_URL=postgres://username:password@localhost:5432/gator
```

## Running the CLI

You can run commands using:

```bash
npm start -- <command> [options]
```

### Example

```bash
npm start -- register alice
npm start -- addfeed "Tech News" https://example.com/rss
npm start -- register boots
npm start -- addfeed "Example Feed" https://examplefeed.com/rss
npm start -- login alice
npm start -- feeds
npm start -- follow https://examplefeed.com/rss
npm start -- following
npm start -- agg
npm start -- browse
```

## Development

- **Start in dev mode**

```bash
npm start -- <command>
```

- **Build for production**

```bash
npm run build
```

- **Database Migrations**

```bash
npm run generate
npm run migrate
```
