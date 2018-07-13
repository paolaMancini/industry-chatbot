module.exports = function(controller) {

        controller.hears(['input.welcome'], 'message_received', dialogflowMiddleware.action, function(bot, message {
                console.log('MESSAGE:', message);
                bot.reply(message, 'Hello!');
            });
        }
