#!/bin/bash

ember build --environment=production --output-path prod-dist
cd prod-dist
aws s3 sync ./assets s3://company.com/assets --cache-control max-age=63072000 --expires "Sat, 01 Jan 2035 12:00:00 GMT" --content-encoding gzip 
aws s3 sync ./images s3://company.com/images --cache-control max-age=63072000 --expires "Sat, 01 Jan 2035 12:00:00 GMT"
aws s3 sync ./fonts s3://company.com/fonts --cache-control max-age=63072000 --expires "Sat, 01 Jan 2035 12:00:00 GMT"
aws s3 sync ./fonts/*.woff2 s3://company.com/fonts --cache-control max-age=63072000 --expires "Sat, 01 Jan 2035 12:00:00 GMT" --content-type application/font-woff 
aws s3 cp ./index.html s3://company.com --cache-control max-age=10 
aws s3 cp ./robots.txt s3://company.com --cache-control max-age=3600 
aws s3 cp ./crossdomain.xml s3://company.com --cache-control 86400 

cd ..
