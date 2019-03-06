//
// Command: help
//
module.exports = function (dialogflowMiddleware,controller) {

    controller.hears(['getSkills',/^help$/], 'direct_message,direct_mention',dialogflowMiddleware.hears, function (bot, message) {
        var text = "Here are my skills:";
        text += "\n- " + bot.appendMention(message, "open <Digitaliani|Office 301>") + ": let a user to receive the url granting the access to the room (or smart lock);"
        text += "\n- " + bot.appendMention(message, "rooms") + ": let a user to receive details about the rooms (or smart locks) it knows";
         
        bot.reply(message, text);
    });
}
