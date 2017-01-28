$(window).load(function() {
	// Animate loader off screen
	$(".se-pre-con").fadeOut("slow");
});

$(document).ready(function() {
	$("#counter").countdown({
		until : new Date(2017, 0, 27, 18, 10, 0),
		format : 'dHMS',
		alwaysExpire: true,
		expiryUrl: 'index_1.html'
	});

	$("#counter_wrapper").fitText(1.2, {
		minFontSize : '20px',
		maxFontSize : '50px'
	});
});