/**
 * Facebook JS SDK Module
 *
 * @author George Papakitsos <george@papakitsos.gr>
 * @copyright Copyright (c) 2014, George Papakitsos
 * @version 1.0
 */

var FbSDKModule = (function() {
	var myAppID		= null,
		accessToken	= null,
		userID		= null;
	
	var init = function(appId) {
		myAppID = appId;
		FB.init({ appId: myAppID, version : "v2.2" });
		bindEvents();
	};
	
	var bindEvents = function() {
		$("#buttonLogin").click(function() { login(); });
		$("#buttonLogout").click(function() { logout(); });
		$("#buttonPublicProfile").click(function() { getPublicProfile(); });
		$("#buttonShareDialog").click(function() { shareDialog(); });
	};
	
	var login = function() {
		FB.getLoginStatus(function(response) {
			if (response.status === "connected") loginActions(response.authResponse);
			else FB.login(function(response) { if (response.authResponse) loginActions(response.authResponse); });
		});
	};
	
	var logout = function() {
		FB.logout();
		logoutActions();
	};
	
	var loginActions = function(response) {
		accessToken = response.accessToken;
		userID = response.userID;
		var data =
		'<div class="section">'+
			"<div>The user is logged in and has authenticated your app!</div>"+
			"<div>Access Token: "+ accessToken +"</div>"+
		"</div>";
		$("#panelData").append(data);
		buttonDisable("buttonLogin");
		buttonEnable("buttonPublicProfile");
		buttonEnable("buttonShareDialog");
		buttonEnable("buttonLogout");
	};
	
	var logoutActions = function() {
		$("#panelData").append('<div class="section">The user is logged out!</div>');
		buttonEnable("buttonLogin");
		buttonDisable("buttonPublicProfile");
		buttonDisable("buttonShareDialog");
		buttonDisable("buttonLogout");
	};
	
	var buttonEnable = function(buttonID) {
		$("#"+buttonID).removeClass("displayNone");
	};
	
	var buttonDisable = function(buttonID) {
		$("#"+buttonID).addClass("displayNone");
	};
	
	var getPublicProfile = function() {
		FB.api("/"+userID, function(response) {
			var data =
			'<div class="section">'+
				"<div>User ID: "+ response.id +"</div>"+
				"<div>First Name: "+ response.first_name +"</div>"+
				"<div>Last Name: "+ response.last_name +"</div>"+
				"<div>Gender: "+ response.gender +"</div>"+
			"</div>";
			$("#panelData").append(data);
		});
	};
	
	var shareDialog = function() {
		FB.ui({
			method: "share",
			href: "http://papakitsos.gr/",
		}, function(response) {
			if (response && !response.error_code) $("#panelData").append('<div class="section">Posting completed!</div>');
			else $("#panelData").append('<div class="section">Error while posting!</div>');
		});
	};
	
	return {
		init: init
	};
})();

$(window).load(function() {
	FbSDKModule.init("1511877742410130");
});