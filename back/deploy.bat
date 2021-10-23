zip -u code.zip *.js
aws lambda update-function-code --zip-file fileb://code.zip --function-name war-web --publish