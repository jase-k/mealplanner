#!/bin/bash

# Load environment variables from .env file in the root directory
# Save the root path
ROOT_DIR=$(dirname $(dirname $(dirname $(realpath $0))))
DB_NAME="mealplanner"

export $(grep -v '^#' ${ROOT_DIR}/.env| xargs)

# Run the psql command with environment variables
PGPASSWORD="${DB_PASSWORD}" psql -vv -h "${DB_HOSTNAME}" -p 5432 -U "${DB_USER}" -d "postgres" -f dbs/mealplanner/meal-planner-database.sql
DB_USER="deviiUser"
PGPASSWORD="${DB_PASSWORD}" psql -vv -h "${DB_HOSTNAME}" -p 5432 -U "${DB_USER}" -d "${DB_NAME}" -f dbs/mealplanner/data.sql
