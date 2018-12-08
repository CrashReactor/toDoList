
// Datepicker helps the browsers which doesn't support the input types 'date' and 'time'.
$( document ).ready( function() {
	$.datetimepicker.setLocale( 'en' );
	
	// Initialization of years, months and days.
	$( '#createDeadLine, #updateDeadLine' ).datetimepicker({
	  timepicker : false,
	  format     : 'Y-m-d'
	});
	
	// Initialization of hours and minutes.
	$( '#createTime, #updateTime' ).datetimepicker({
		defaultTime : '10:00',
		datepicker  : false,
		format      : 'H:i',
		step        : 30
	});
});