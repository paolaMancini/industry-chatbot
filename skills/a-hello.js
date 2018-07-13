module.exports = function( dialogflowMiddleware,controller) {

    controller.hears('Default Welcome Intent', "direct_message,direct_mention",dialogflowMiddleware.hears,  function(
    //controller.hears(['aboutMe', /^sorry.*/i], "direct_message,direct_mention",   function(
    //controller.hears(['aboutMe', /^sorry.*/i], "direct_message,direct_mention", dialogflowMiddleware.hears, function(
        bot,
        message
    ) {
        console.log('MESSAGE:', message);
        console.log('fullfilment:', message.fulfillmentText);
        bot.reply(message, 'Ciao!');
    });
}
