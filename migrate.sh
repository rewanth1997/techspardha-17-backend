#!/bin/bash

file="./lib/database/dummyEnteries.sql"

cat $file | mysql -u $1 -p 
