'use strict';

//require('dotenv').config();

const https = require('https');

class Bot {

    /**
     * Helper function to formulate bot response
     */
    static respond(requestMessage){
        
        //testing
        console.log("HERE");
        console.log(requestMessage.text);

        // unsure if needed
        //this.res.writeHead(200);
        //this.res.end();
        if(requestMessage){
            const messageResponse = this.checkMessage(requestMessage);
            if (messageResponse) {
                this.sendMessage(messageResponse);
            }
        }

        
    }

    /**
     * Called when the bot receives a message.
     *
     * @static
     * @param {Object} message The message data incoming from GroupMe
     * @return {string}
     */
    static checkMessage(message) {
        const messageText = message.text;

        console.log("HERE3");

        // Learn about regular expressions in JavaScript: https://developer.mozilla.org/docs/Web/JavaScript/Guide/Regular_Expressions
        //const botRegex = /^\/shrug/;

        const botRegex1 = /midnight/i;
        const botRegex2 = /bud\slight/i;
        const botRegex3 = /housekeeping/i;
        // Check if the GroupMe message has content and if the regex pattern is true
        if (messageText && (botRegex1.test(messageText) || botRegex2.test(messageText) || botRegex3.test(messageText))) {
            // Check is successful, return a message!
            return 'RAORAORAO';
        }

        return null;
    };

    /**
     * Sends a message to GroupMe with a POST request.
     *
     * @static
     * @param {string} messageText A message to send to chat
     * @return {undefined}
     */
    static sendMessage(messageText) {
        // Get the GroupMe bot id saved in `.env`
        const botId = process.env.BOT_ID;

        // testing
        console.log("HERE2");

        const options = {
            hostname: 'api.groupme.com',
            path: '/v3/bots/post',
            method: 'POST'
        };

        const body = {
            bot_id: botId,
            text: messageText
        };

        // Make the POST request to GroupMe with the http module
        const botRequest = https.request(options, function(response) {
            if (response.statusCode !== 202) {
                console.log('Rejecting bad status code ' + response.statusCode);
            }
        });

        // On error
        botRequest.on('error', function(error) {
            console.log('Error posting message ' + JSON.stringify(error));
        });

        // On timeout
        botRequest.on('timeout', function(error) {
            console.log('Timeout posting message ' + JSON.stringify(error));
        });

        // Finally, send the body to GroupMe as a string
        botRequest.end(JSON.stringify(body));
    };
};

module.exports = Bot;
