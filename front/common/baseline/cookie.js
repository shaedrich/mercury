if (typeof window.M === 'undefined') {
	window.M = {};
}

(function (M) {
	M.cookie = {
		get: function(cookieName) {
			const cookieSplit = `; ${document.cookie}`.split(`; ${cookieName}=`);

			return cookieSplit.length === 2 ? cookieSplit.pop().split(';').shift() : null;
		}
	};
})(M);
