( function () {
	function modifyUrl( url ) {
		var config = require( './config.json' );
		if ( config.domainList.includes( new URL( url ).host ) ) {
			url = config.prefix + url;
		}
		return url;
	}

	jQuery.ajaxPrefilter( function( options ) {
		if ( options.crossDomain && jQuery.support.cors ) {
			options.url = modifyUrl( options.url );
		}
	} );

	var prevFetch = window.fetch;
	window.fetch = function( url, options ) {
		return prevFetch.apply( this, [ modifyUrl( url ), options ] );
	}
}() );
