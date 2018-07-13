module.exports = function(controller) {

    controller.hears(['input.welcome'], 'direct_message', dialogflowMiddleware.action, function(
        bot,
        message
    ) {
        console.log('MESSAGE:', message);
        bot.reply(message, 'Ciao!');
    });
}
