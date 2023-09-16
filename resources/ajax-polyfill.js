jQuery.ajaxPrefilter( function( options ) {
	if ( options.crossDomain && jQuery.support.cors ) {
		var config = require( './config.json' );
		if ( config.domainList.includes( new URL( options.url ).host ) ) {
			options.url = config.prefix + options.url;
		}
	}
} );
