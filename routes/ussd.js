'use strict';

const options = require('../config/config');
const AfricasTalking = require('africastalking')(options.AT);
/* Set up mongoose */

module.exports = {

	ussd : (req, res)=>{
  var message = "";
  console.log('its');

  var sessionId   = req.body.sessionId;
  var serviceCode = req.body.serviceCode;
  var phoneNumber = req.body.phoneNumber;
  var text 	      = req.body.text;

  console.log(sessionId, serviceCode, phoneNumber, text);

  var length = text.split('*').length;
  var txt = text.split('*');
  ussdloop();

  function ussdloop(){

  if (text === '' || text === '1*0' || text === '2*0' || text === '3*0' || text === '4*0' || text === '6*2' || text === '6*0') {
	 message = "CON Welcome to Codecoin\n";
     message += "1: To Register \n";
     message += "2: For Opportunities today\n";
     message += "3: For More about service \n";
     message += "4: For Calculator\n";
     message += "5: To Notify \n";
     message += "6: To Deregister\n";
     message += "0: Exit";
  }

  // add a client
  else if (text === '1') {
    // check if user is agent
    message = 'CON Accept terms and conditions\n';
    message += "1: Yes \n";
    message += "2: No \n";
    message += "0: Back";

  }
  else if (text === '1*2' || text === '2*0') {
        message = 'END Welcome Back To Codecoin\n';
  }
  else if (text === '1*3') {
        ussdloop();
  }
  else if (text === '2' || text === '1*1') {
        message = 'CON Opportunities today\n';
        message += "Opportunity 1 \n";
        message += "Opportunity 2 \n";
        message += "0: Exit";
  }
  else if (text === '3') {
        message = 'CON More about services\n';
        message += "0: Back ";
  }
  else if (text === '4') {
        message = 'CON Send message containing current investments, potential returns, and current amount\n';
        message += "0: Back ";
  }
  else if (text === '5' || text === '5*1*2') {
        message = 'CON Select sector\n';
        message += "1: Business Opportunity 1 \n";
        message += "2: Business Opportunity 2 \n";
        message += "00: More \n";
      
  }
  else if (text === '5*1' || text === '5*2') {
        message = 'CON Do you want to get notifications on this sector?\n';
        message += "1: Yes \n";
        message += "2: No \n";
  } 
  else if (text === '5*1*1') {
        message = 'END You Successfully subscribed to the sector\n';
  }     
  else if (text === '6') {
        message = 'CON Deregister\n';
	    message += "1: Yes \n";
	    message += "2: No \n";
	    message += "0: Back";

  }     
  else if (text === '6*1') {
        message = 'End Your Account Has been Terminated\n';

  }
  else if (text === '0') {
        message = 'END Welcome Back To Codecoin\n';
  }

  res.contentType('text/plain');
  res.send(message, 200);
}
}

}