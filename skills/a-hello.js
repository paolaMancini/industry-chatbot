module.exports = function(controller) {

    controller.hears('['aboutMe', /^sorry.*/i], "direct_message,direct_mention", dialogflowMiddleware.hears, function(
        bot,
        message
    ) {
        console.log('MESSAGE:', message);
        bot.reply(message, 'Ciao!');
    });
}
