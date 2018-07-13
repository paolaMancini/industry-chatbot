module.exports = function( dialogflowMiddleware,controller) {

    controller.hears('Default Welcome Intent', "direct_message,direct_mention",dialogflowMiddleware.hears,  function(
        bot,
        message
    ) {
        console.log('MESSAGE:', message);
        console.log('fulfillment:', message.fulfillment);
        bot.reply(message, 'Ciao!');
    });
}
