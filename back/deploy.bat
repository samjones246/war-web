zip -u code.zip *.js
zip -u -r code.zip node_modules 
aws lambda update-function-code --zip-file fileb://code.zip --function-name war-web --publish