module.exports = function(controller) {

    controller.hears('Default Welcome Intent', 'direct_message', dialogflowMiddleware.hears, function(
        bot,
        message
    ) {
        console.log('MESSAGE:', message);
        bot.reply(message, 'Ciao!');
    });
}
