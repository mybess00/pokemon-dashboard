# Pokémon Dashboard

## Installation

To install the dependencies, you can use one of the following commands:

```bash
npm install
```
or
```bash
pnpm install
```
or
```bash
yarn install
```

### Authentication
To log into the Pokémon Dashboard, use the following credentials:
```javascript
Username: admin
Password: 12345678
```

Here’s the description translated into English:

### Functionality

`/dashboard` is a protected route, validated through a middleware that checks if the user is authenticated. Cookies are used to verify authentication. If the user is authenticated, they can access the dashboard; otherwise, they must log in.

The login is validated using **Zod**, and a function simulates the login process, storing the login information in a cookie that lasts for 10 minutes.