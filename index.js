var zendesk = require('node-zendesk');
var nodemailer = require('nodemailer');
var transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: 'YOUR_GMAIL_HERE',
        pass: 'YOUR_PASS_HERE'
    }
});


var client = zendesk.createClient({
  username:  'ZENDESK_USERNAME_HERE',
  token:     'ZENDESK_TOKEN_HERE',
  remoteUri: 'ZENDESK_API_URI_HERE'
});

//var the_interval = 5 * 60 * 1000;
var the_interval = 5 * 60 * 1000; // checks every 5 minutes

ticketid = "10663"; // you can change it to your last ticketid

setInterval(function() {

console.log("Checking");
console.log("Ticket ID = #"+ticketid);

	client.tickets.show(ticketid,function (err, statusList, body, responseList, resultList) {
  if (err) {
    console.log(err);
  }
  else {
  	console.log(JSON.stringify(body, null, 2, true));//will display the ticket
	transporter.sendMail({
    from: 'YOUR_GMAIL_HERE',
    to: 'YOUR_OTHER_MAIL_HERE',
    subject: 'Zendesk | New Mail Notification',
    text: 'Hi, There\'s a new mail in your Zendesk Account. Ticket ID = #'+ticketid });
	ticketid++;
}

});



}, the_interval);
