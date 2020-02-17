var express = require("express");
var router = express.Router();
var ActiveCampaign = require("activecampaign");
var ac = new ActiveCampaign(
  "https://walidjohnson122175634.api-us1.com",
  "b9eb750c12893837f5680ce3dee12dde980c890a190cb18f5baca383fb5365380f0f9ecb"
);

router.post("/sendMsg", (req, res) => {
  const { email } = req.body;
  console.log(email);

  ac.credentials_test().then(function(result) {
    console.log("credentail test result:");
    console.log("_________________");
    console.log(result);
    if (result.success) {
      // create List
      ac.api("list/add", {
        name: "List 3",
        sender_name: "My Company",
        sender_addr1: "123 S. Street",
        sender_city: "Chicago",
        sender_zip: "60601",
        sender_country: "USA"
      }).then(result => {
        console.log("Create list result:");
        console.log("_________________");
        console.log(result);
        var listId = result.id;
        console.log(listId);
        // Create message
        var messageObj = {
          format: "text",
          subject: "Test email",
          fromemail: "walidjohnson1221@gmail.com",
          fromname: "walid",
          reply2: "no-reply@mail.com",
          priority: 1,
          charset: "utf-8",
          encoding: "quoted-printable",
          htmlconstructor: "editor",
          html: "",
          textconstructor: "editor",
          text: "This is a test message"
        };
        messageObj["p[" + listId + "]"] = listId;
        ac.api("message/add", messageObj).then(result => {
          console.log("Create message result");
          console.log("_________________");
          console.log(result);
          var messageId = result.id;
          var campaignObj = {
            type: "single",
            name: "Test email",
            sdate: "2020-02-17",
            status: 1,
            public: 1
          };
          campaignObj["p[" + listId + "]"] = listId;
          campaignObj["m[" + messageId + "]"] = 100;
          console.log(campaignObj);
          ac.api("campaign/create", campaignObj).then(result => {
            console.log("Create campaign result");
            console.log("_________________");
            console.log(result);

            ac.api("campaign/send", {
              email: email,
              campaignid: result.id,
              messageid: messageId,
              action: "send"
            }).then(result => {
              console.log("send campaign result");
              console.log("__________");
              console.log(result);
              res.status(200).send(result);
            });
          });
        });
      });
    } else {
      res.status(500).send("Invalid active campaign credentials");
    }
  });
});

module.exports = router;
