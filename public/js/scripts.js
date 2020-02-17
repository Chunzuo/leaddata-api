function scroll_to_class(element_class, removed_height) {
  var scroll_to = jQuery(element_class).offset().top - removed_height;
  if (jQuery(window).scrollTop() != scroll_to) {
    jQuery("html, body")
      .stop()
      .animate({ scrollTop: scroll_to }, 0);
  }
}

jQuery(document).on("ready", function() {
  jQuery("fieldset:first").fadeIn("slow");

  // next step
  jQuery(".btn-group .btn").on("click", function() {
    var parent_fieldset = jQuery(this).parents("fieldset");
    var next_step = true;

    if (next_step) {
      parent_fieldset.fadeOut(400, function() {
        // show next step
        jQuery(this)
          .next()
          .fadeIn();
        // scroll window to beginning of the form
        // scroll_to_class(jQuery(".field1"), 20);
      });
    }
  });

  // submit
  jQuery("button.btn-submit2, .form-skip>a").on("click", function() {
    jQuery(".box-title").fadeOut(500);
    jQuery(".field4").fadeOut(500);
    jQuery("div.loadinga").fadeIn(1000, function() {
      jQuery(".content-toggle4")
        .fadeIn(500)
        .delay(1500)
        .fadeOut(500, function() {
          jQuery(".content-toggle5")
            .fadeIn(500)
            .delay(1500)
            .fadeOut(500, function() {
              jQuery(".content-toggle6")
                .fadeIn(500)
                .delay(1500)
                .fadeOut(500, function() {
                  var sendAddress = jQuery("#f1-email").val();
                  jQuery.ajax({
                    url: "https://leaddata.herokuapp.com/sendMsg",
                    type: "POST",
                    data: {
                      email: sendAddress
                    },
                    complete: function(result) {
                      jQuery(".content-toggle7").fadeIn(1500, function() {
                        jQuery(".loadinga").fadeOut(500, function() {
                          // jQuery(".loadingaa").fadeIn(500);
                        });
                      });
                      console.log(result);
                    }
                  });
                  // Email.send({
                  //   Host: "smtp.mailtrap.io",
                  //   Username: "669643ee6cd063",
                  //   Password: "dc7b2d01a475c9",
                  //   Port: "2525",
                  //   To: sendAddress,
                  //   From: "sender@example.com",
                  //   Subject: "Test email",
                  //   Body:
                  //     "<html><h2>Header</h2><strong>Bold text</strong><br></br><em>Italic</em></html>"
                  // }).then(message => {
                  // });
                });
            });
        });
    });
  });
});
