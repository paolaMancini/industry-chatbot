var JagoCalls = require("./JagoAPIsCalls");

module.exports = function(dialogflowMiddleware,controller) {

    //controller.hears(['open digitaliani|open Office 301'], 'direct_message,direct_mention', function(bot, message) {
    controller.hears(['openRoom'], 'direct_message,direct_mention', dialogflowMiddleware.hears,function(bot, message) {
            console.log('message: ', message);

           // console.log(message.match[0]);
           // console.log(message.match[1]);
            //var roomName = "digitaliani";
            //var roomName = message.match[1];
            
            //var roomName=message.parameters.lockName;
            var roomName=message.entities.lockName;
            var italtelRoom = "Office 301";
            var ciscoRoom = "Digitaliani";

            if ((roomName.toLowerCase().trim() != (ciscoRoom.toLowerCase()).trim()) && (roomName.toLowerCase().trim() != (italtelRoom.toLowerCase()).trim())) {
                if ((roomName == null) || (roomName === "") ){
                    //bot.reply(message, "room name not specified");
                    bot.reply(message, message.fulfillment.speech);
                }else{
                    bot.reply(message, "Room " + roomName + " not available");
                }
            } else {
                console.log("  received: ", roomName);

                var request = require("request");

                // Create random number for dummy user
                var random_index = Math.floor(Math.random() * (1000 - 1) + 1);
                var user = "u" + random_index;

                //Manage time range for access duration
                
                var todayUTC = new Date();
                console.log('todayUTC: ', todayUTC);
                var utcOffset = todayUTC.getTimezoneOffset();
                var cetOffset = utcOffset + 60;

                console.log('cetOffset: ', cetOffset);

                var todayCETtime = todayUTC.getTime() + (cetOffset * 60000);
                console.log('todayCETtime: ', todayCETtime)
                
                var todayCET = new Date(todayCETtime);
                console.log('todayCEST: ', todayCEST)
                var today = todayCET.getDate() + "-" + (todayCET.getMonth() + 1) + "-" + todayCET.getFullYear() + " " +
                    todayCET.getHours() + ":" + todayCET.getMinutes();
                console.log('today: ', today);
                
                  
                var tomorrowUTC = new Date();
                tomorrowUTC.setDate(todayUTC.getDate() + 1);
                var tomorrowCETtime = tomorrowUTC.getTime() + (cetOffset * 60000);
                var tomorrowCET = new Date(tomorrowCETtime);
                var tomorrow = tomorrowCET.getDate() + "-" + (tomorrowCET.getMonth() + 1) + "-" + tomorrowCET.getFullYear() + " " +
                    tomorrowCET.getHours() + ":" + tomorrowCET.getMinutes();
                console.log('tomorrow: ', tomorrow);

                var tomorrow = tomorrowCET.getDate() + "-" + (tomorrowCET.getMonth() + 1) + "-" + tomorrowCET.getFullYear() + " " +
                    tomorrowCET.getHours() + ":" + tomorrowCEST.getMinutes();
                console.log('tomorrow: ', tomorrow);

                JagoCalls.GETIdGuestTagByRoom(roomName.toLowerCase().trim(), function(err, data, text) {
                        var id = null;
                        if (err) {
                            bot.reply(message, "Jago system not reached! err: ", err);
                            return;
                        }

                        if (data.length == 0) {
                            bot.reply(message, "Request failed!");
                            return;
                        }

                        var id = text;
                        if (id != null) {
                            console.log("id: ", id);

                            // Office 301 Italtel => 3513 
                            // Digitaliani Cisco => 3471
                            //JagoCalls.POSTuser(user, user, 3513, today.getTime(), tomorrow.getTime(), function(err, data, text) {
                            //JagoCalls.POSTuser(user, user, id, todayCESTtime, tomorrowCESTtime, function(err, data, text) {
                            
                            //JagoCalls.createReservation(user, user, id, todayCESTtime, tomorrowCESTtime, function(err, data, text) {
                            JagoCalls.createReservation(user, user, id,  todayCETtime , tomorrowCETtime, function(err, data, text) {
                            
                                    if (err) {
                                        bot.reply(message, "Jago system not reached! err: ", err);
                                        return;
                                    }

                                    if (data.length == 0) {
                                        bot.reply(message, "Request failed!");
                                        return;
                                    }

                                    var publicLink = data.link;
                                    console.log("publicLink: ", publicLink);

                                    //var msg = "Activate bluetooth and Click on " + publicLink + "  from your Otello App to access the room.";
                                    //msg += "<br><br>**Remember**: Access Url is valid from: " + today + " to: " + tomorrow; 
                                    //bot.reply(message, msg);
                                    var msg = "Activate bluetooth and Click on " + publicLink + "  from your Otello App to access the room.";
                                    msg += "<br><br>**Remember**: Access Url is valid from: " + tod + " to: " + tom; 
                                    bot.reply(message, msg);

                            });
                    } else {
                        bot.reply(message, "Room not available");

                    }
                })
        }
    })
};
