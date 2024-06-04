# Amstramgram Backend

This repository contains the backend implementation for the Amstramgram project.

## Getting Started

### Prerequisites

1. Install `choco` from an elevated command prompt. (https://chocolatey.org/install)

```bash
Set-ExecutionPolicy Bypass -Scope Process -Force; [System.Net.ServicePointManager]::SecurityProtocol = [System.Net.ServicePointManager]::SecurityProtocol -bor 3072; iex ((New-Object System.Net.WebClient).DownloadString('https://community.chocolatey.org/install.ps1'))
```

2. Install `make` using `choco`

```bash
choco install make
```

1. Update the `php.ini` file

```ini
extension=pdo_pgsql                                     # Uncomment to activate the postgresql drivers
post_max_size = 8M -> post_max_size = 50M               # Change from 8M to 50M
upload_max_filesize = 2M -> upload_max_filesize = 50M   # Change from 2M to 50M
```

2. Install the dependencies

```bash
composer install
```

3. Set up the environment variables. First, copy the `.env.example` file, then change the following keys.

```env
DB_CONNECTION=pgsql
DB_HOST=<host>              # localhost
DB_PORT=<port>              # 5432
DB_DATABASE=amstramgramdb
DB_USERNAME=<username>      # postgres
DB_PASSWORD=<password>
```

4. Create the database. Run the `psql` app (postgres' cli) and connect to the `postgres` database (all default values should work). Then, when connected :

```psql
CREATE DATABASE amstramgramdb;       # Don't forget the ;
```

5. Run the database migrations and seed it.

```bash
make db
```

6. Run the development server with a port

```bash
make run
```
