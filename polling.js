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

//check on warfish updated tabs
// https://developer.chrome.com/extensions/tabs#event-onActivated



function rssCount(){
chrome.storage.sync.get({
    rssFeed: ''
  }, function(items) {
	var rssID;
    rssID = items.rssFeed;
	var req = new XMLHttpRequest();
	var xml;
	req.open('GET', 'http://warfish.net/war/services/rss?t=t&rssid='+rssID, false);
	req.send(null);
	if(req.status == 200)
	  xml=req.responseText;
	xmlDoc = $.parseXML( xml ),
	$xml =$(xmlDoc);

	var itemCount = $xml.find("item").length-1;
	if(itemCount>0){
	chrome.browserAction.setIcon({path:"icon.png"});
	chrome.browserAction.setBadgeText({text:itemCount.toString()});
	}else{
	chrome.browserAction.setIcon({path:"iconbw.png"});
	chrome.browserAction.setBadgeText({text:""});
	}
	
	chrome.tabs.query({url:"http://warfish.net/*"}, function(aTab) {
		var numWFTabs = aTab.length;
				console.log(aTab);
		for (var i=0; i<aTab.length; i++){

			var curTab = aTab[i];		
			var tabID = curTab.id;
        var tabUrl = curTab.url;
		chrome.tabs.executeScript(tabID,{code:'var turnCount = '+itemCount.toString()+';'},function(){
			chrome.tabs.executeScript(tabID,{file:'injectCode.js'});	
		});
		}
    });
	
	
	
	
	
  });
}