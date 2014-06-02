//run rssCount on load

var lastRun = Date.now();
var minInterval = 1000;
rssCount();
chrome.alarms.create("polling",{periodInMinutes: 1});
chrome.alarms.onAlarm.addListener(rssCount);
chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
    if ((tab.url.indexOf("warfish.net") > -1) && (Date.now()-lastRun>minInterval)) {
		lastRun = Date.now();
		rssCount();
    }
});


function rssCount(){
chrome.storage.sync.get({rssFeed: ''}, 
	function(items) {
		var bWFDown;
		var xml;
		var itemCount;
		var faviconBadge;
		var iconPath;
		
		var rssID = items.rssFeed;
		var req = new XMLHttpRequest();
		req.onreadystatechange = function() {
			if (req.readyState === 4) {
				// The request is complete; did it work?
				if (req.statusCode >= 200 && xhr.statusCode < 300) {
					bWFDown = false;
					xml=req.responseText;
					xmlDoc = $.parseXML( xml ),
					$xml =$(xmlDoc);
					itemCount = $xml.find("item").length-1;
					faviconBadge = itemCount.toString();
				}
				else {
				// Something went wrong so let's be honest about it.
					bWFDown=true;
					itemCount = -1;
					faviconBadge = "!!";
				}
			}
		};
		req.open('GET', 'http://warfish.net/war/services/rss?t=t&rssid='+rssID, false);
		req.send(null);
		
		if(itemCount<1){
			//either it's not your turn or there was an error
			iconPath = "../img/iconbw.png";
		}else{
			iconPath= "../img/icon.png";
		}
		
		chrome.browserAction.setIcon({path:iconPath});
		chrome.browserAction.setBadgeText({text:faviconBadge});
		

		
		chrome.tabs.query({url:"http://warfish.net/*"}, function(aTab) {
			var numWFTabs = aTab.length;
					//console.log(aTab);
			for (var i=0; i<aTab.length; i++){

				var curTab = aTab[i];		
				var tabID = curTab.id;
			var tabUrl = curTab.url;
			chrome.tabs.executeScript(tabID,{code:'var turnCount = "'+faviconBadge+'" ;'},function(){
				chrome.tabs.executeScript(tabID,{file:'js/injectCode.js'});	
			});
			}
		});
	
  });
}