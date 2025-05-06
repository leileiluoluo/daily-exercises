#!/bin/bash
export DATAX_HOME=/usr/local/datax

# read params
SOURCE_URL="$1"
SOURCE_USERNAME="$2"
SOURCE_PASSWORD="$3"
TARGET_URL="$4"
TARGET_USERNAME="$5"
TARGET_PASSWORD="$6"

# json files folder
mkdir json

# start migration
for table in `cat tables.txt`
do
  echo "migrate table: ${table}"

  json_file=json/${table}.json
  cp table_template.json ${json_file}

  # replace placeholders
  sed -i "s#TABLE_NAME#${table}#g" ${json_file}

  sed -i "s#SOURCE_URL#${SOURCE_URL}#g" ${json_file}
  sed -i "s#SOURCE_USERNAME#${SOURCE_USERNAME}#g" ${json_file}
  sed -i "s#SOURCE_PASSWORD#${SOURCE_PASSWORD}#g" ${json_file}

  sed -i "s#TARGET_URL#${TARGET_URL}#g" ${json_file}
  sed -i "s#TARGET_USERNAME#${TARGET_USERNAME}#g" ${json_file}
  sed -i "s#TARGET_PASSWORD#${TARGET_PASSWORD}#g" ${json_file}

  python ${DATAX_HOME}/bin/datax.py ${json_file}
done
