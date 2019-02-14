module.exports = function( dialogflowMiddleware,controller) {

    controller.hears('smalltalk.(.*)', "direct_message,direct_mention",dialogflowMiddleware.hears,  function(
        bot,
        message
    ) {
        console.log('MESSAGE:', message);
        console.log('fulfillment:', message.fulfillment.speech);
         console.log('CLAVIGERO-Github-Version3:', message);
        bot.reply(message, message.fulfillment.speech);
    });
}
