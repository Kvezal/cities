# Cities API


### Description
Backend of the demo project


### Get starting
1) create `.env` file with correct params based on `.env-example`
2) install environments
- npm packages
- docker
- docker-compose
3) execute command:
```bash
docker-compose -f docker-compose.dev.yaml up -d
```


### Stop project
```bash
docker-compose -f docker-compose.dev.yaml down
```


### Docker images
Docker images can public only maintainer of this project.
```bash
./scripts/publish.sh
```
Project contains docker files
- postgres (to create the correct DB container)
- api (contains the main logic of backend)


### environment variables of docker containers

#### Postgres
- `POSTGRES_PASSWORD` - user password
- `POSTGRES_USER` - user name
- `POSTGRES_DB` - database name

#### API
- `BACKEND_PROTOCOL` - backend protocol
- `BACKEND_PORT` - backend port
- `FRONTEND_PROTOCOL` - frontend protocol (needed to configure cross-domain requests)
- `FRONTEND_HOST` - frontend host (needed to configure cross-domain requests)
- `FRONTEND_PORT`=4200 - frontend port (needed to configure cross-domain requests)
- `JWT_ACCESS_SECRET` - access JSON Web Token secret key
- `JWT_REFRESH_SECRET` - refresh JSON Web Token secret key
- `MAX_AGE_ACCESS_TOKEN_COOKIE` - access JSON web token life time 
- `MODE` - mode
- `DB_DRIVER` - database web driver
- `DB_HOST` - database host
- `DB_PORT` - database port (should be 5432)
- `DB_USER` - database ser name
- `DB_DATABASE` - database name
- `DB_PASSWORD` - database password
- `DB_FORCE` - synchronization mode
- `DB_SUPER_USER_NAME` - database superuser name
- `DB_SUPER_DATABASE` - main database table
- `DB_SUPER_USER_PASSWORD` - superuser password
