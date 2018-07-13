module.exports = function(controller) {

    controller.hears(['input.welcome'], 'direct_message', dialogflowMiddleware.hears, function(
        bot,
        message
    ) {
        console.log('MESSAGE:', message);
        bot.reply(message, 'Ciao!');
    });
}
