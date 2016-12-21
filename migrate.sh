#!/bin/bash
mkdir uploads
file="./lib/database/dummyEnteries.sql"

cat $file | mysql -u $1 -p
