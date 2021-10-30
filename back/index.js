const AWS = require("aws-sdk");

const dynamo = new AWS.DynamoDB.DocumentClient();
const idLen = 8;
const idCharset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"

// Generate a unique identifier for a game
// This is an 8 digit, mixed case alphanumeric code
function genID(){
    let out = [];
    for (let i=0;i<idLen;i++){
        out.push(idCharset[Math.floor(Math.random() * idCharset.length)])
    }
    return out.join("")
}

exports.handler = async (event) => {
    // Setting up stuff for response
    let body;
    let statusCode = 200;
    const headers = {
        "Content-Type": "application/json"
    };
    
    try {
        switch (event.routeKey) {
            // Create a new game, add it to the database, send back the game ID
            case "PUT /games":
                let game_id = genID();
                await dynamo
                    .put({
                        TableName: "war-web-db",
                        Item: {
                            game_id: game_id,
                            phase: 0,
                            state: []
                        }
                    })
                    .promise();
                body = game_id;
                break;

            // Push a move or board setup to a game
            case "PUT /games/{id}":
                break
            
            // Return game state for requested ID
            case "GET /games/{id}":
                body = await dynamo
                    .get({
                        TableName: "war-web-db",
                        Key: {
                            game_id: event.pathParameters.id
                        }
                    })
                    .promise();
                break;
            default:
                throw new Error(`Unsupported route: "${event.routeKey}"`);
        }
    // Handle errors by dumping the message in a 400 res
    } catch (err) {
        statusCode = 400;
        body = err.message;
    } finally {
        body = JSON.stringify(body);
    }
    
    return {
        statusCode,
        body,
        headers
    };
};
