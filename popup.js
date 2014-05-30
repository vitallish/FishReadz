$(document).ready(function(){

listYourTurn();

   chrome.tabs.query({url:"http://warfish.net/*"}, function(aTab) {
		var numWFTabs = aTab.length;
		for (var i=0; i<aTab.length; i++){
		var curTab = aTab[i];
		
        var tabID = curTab.id;
        var tabUrl = curTab.url;
		chrome.tabs.sendRequest(tabID, {scriptOptions: {turns:'2'}},function(){
			chrome.tabs.executeScript(tabID,{file:'injectCode.js'});
		
		});
		
		}
    });

});

function listYourTurn(){

chrome.storage.sync.get({
    rssFeed: '',
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

var oItems = $xml.find("item");
oLinks = $xml.find("link");
var oTitles = $xml.find("title");

var itemCount = oItems.length; //last item is all games
if (itemCount ==1){
	document.getElementById("listGames").innerHTML = "It's Not Your Turn Bro.";
}else{
	var oList = document.createElement("OL");

	for (var i=1; i<itemCount;i++){
		var newGame = document.createElement("LI");
		newGame.innerHTML = '<a href="'+oLinks[i].innerHTML+'">'+ oTitles[i].innerHTML+"</a>";
		newGame.title = oLinks[i].innerHTML;
		newGame.onclick = function(){
			chrome.tabs.create({url:this.title});
			return false;
		};	
		oList.appendChild(newGame);
	}

	document.getElementById("listGames").appendChild(oList);

  }
  });

}