#!/bin/bash

# Update db1
# docker run --rm -v $(pwd)/db:/liquibase/changelog liquibase/liquibase --defaultsFile=/liquibase/changelog/liquibase.properties update
if [ "$1" == "update" ]; then
    docker run --rm --user root -v $(pwd)/db:/liquibase/changelog liquibase/liquibase \
    --defaultsFile=/liquibase/changelog/liquibase.properties update 
elif [ "$1" == "rollback" ]; then
    docker run --rm --user root -v $(pwd)/db:/liquibase/changelog liquibase/liquibase \
    --defaultsFile=/liquibase/changelog/liquibase.properties rollbackCount 1
elif [ "$1" == "generate" ]; then
    latest_file=$(ls -t ./db/changelog | head -n 1)
    echo "Latest file in ./db/changelog is: $latest_file"
    base_name=$(basename "$latest_file" .xml)
    new_file_name=$((base_name + 1)).xml
    echo "New file name will be: $new_file_name"
    
    docker run --rm --user root -v $(pwd)/db:/liquibase/changelog liquibase/liquibase \
    --defaultsFile=/liquibase/changelog/liquibase.properties generateChangeLog \
    --changeLogFile=changelog/changelog/$new_file_name
else
    echo "Invalid command"
    exit 1
fi



