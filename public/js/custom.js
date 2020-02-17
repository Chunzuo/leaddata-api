jQuery(document).ready(function() {
    /*
        Form
    */
    $('.quiz fieldset:first').fadeIn('slow');
    
    // next step
	$('.btn-group .btn').click(function(){
		var parent_fieldset = $(this).parents('fieldset');
		var next_step = true;

		if (next_step) {
			parent_fieldset.fadeOut(400, function() {
				// show next step
				$(this).next().fadeIn();
				// scroll window to beginning of the form
				scroll_to_class( $('.f1'), 20 );
			});
		}
	});

    // submit
	$('button.btn-submit2, .form-skip>a').click(function(){
		$("div.loadinga").fadeIn(1000, function() {
			$(".content-toggle4").fadeIn(500).delay(1500).fadeOut(500, function() {
				$(".content-toggle5").fadeIn(500).delay(1500).fadeOut(500, function() {
					$(".content-toggle6").fadeIn(500).delay(1500).fadeOut(500, function() {
						$(".content-toggle7").fadeIn(1500, function(){
							$(".loadinga").fadeOut(500, function() {
								$(".loadingaa").fadeIn(500);
							});
							setTimeout(function(){
								window.location.href = "#"
							}, 3000);
						});
					});
				});
			});
		});
	});
    
});
