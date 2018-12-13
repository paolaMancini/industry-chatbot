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
                //var today = new Date() ;
                //console.log(today);
                //var tomorrow = new Date();
                //tomorrow.setDate(today.getDate() + 1);
                //console.log(tomorrow);
                var todayUTC = new Date();
                console.log('todayUTC: ', todayUTC);
                var utcOffset = todayUTC.getTimezoneOffset();
                var cestOffset = utcOffset + 120;

                console.log('cestOffset: ', cestOffset);

                var todayCESTtime = todayUTC.getTime() + (cestOffset * 60000);
                console.log('todayCESTtime: ', todayCESTtime)
                var todayCEST = new Date(todayCESTtime);
                console.log('todayCEST: ', todayCEST)
                var today = todayCEST.getDate() + "-" + (todayCEST.getMonth() + 1) + "-" + todayCEST.getFullYear() + " " +
                    todayCEST.getHours() + ":" + todayCEST.getMinutes();
                console.log('today: ', today);
                
                var dateTimeNow = Date.now();
                var dateNow= new Date(dateTimeNow);
                var tod= dateNow.getDate() + "-" + (dateNow.getMonth() + 1) + "-" + dateNow.getFullYear() + " " +
                    dateNow.getHours() + ":" + dateNow.getMinutes();
                console.log(tod);
                
                var dateTimeTomorrow=new Date();
                dateTimeTomorrow.setDate(dateNow.getDate()+1);
                var tom = dateTimeTomorrow.getDate() + "-" + (dateTimeTomorrow.getMonth() + 1) + "-" + dateTimeTomorrow.getFullYear() + " " +
                    dateTimeTomorrow.getHours() + ":" + dateTimeTomorrow.getMinutes();
                
                var dateTom=new Date(dateTimeTomorrow.getTime());
                var tom = dateTom.getDate() + "-" + (dateTom.getMonth() + 1) + "-" + dateTom.getFullYear() + " " +
                    dateTom.getHours() + ":" + dateTom.getMinutes();
                console.log(tom);
                
                var tomorrowUTC = new Date();
                tomorrowUTC.setDate(todayUTC.getDate() + 1);
                var tomorrowCESTtime = tomorrowUTC.getTime() + (cestOffset * 60000);
                var tomorrowCEST = new Date(tomorrowCESTtime);
                var tomorrow = tomorrowCEST.getDate() + "-" + (tomorrowCEST.getMonth() + 1) + "-" + tomorrowCEST.getFullYear() + " " +
                    tomorrowCEST.getHours() + ":" + tomorrowCEST.getMinutes();
                console.log('tomorrow: ', tomorrow);

                var tomorrow = tomorrowCEST.getDate() + "-" + (tomorrowCEST.getMonth() + 1) + "-" + tomorrowCEST.getFullYear() + " " +
                    tomorrowCEST.getHours() + ":" + tomorrowCEST.getMinutes();
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
                            JagoCalls.createReservation(user, user, id, dateTimeNow, dateTimeNowTomorrow, function(err, data, text) {
                            
                                    if (err) {
                                        bot.reply(message, "Jago system not reached! err: ", err);
                                        return;
                                    }

                                    if (data.length == 0) {
                                        bot.reply(message, "Request failed!");
                                        return;
                                    }

                                    publicLink = data.link;
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
