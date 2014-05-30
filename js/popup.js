$(document).ready(function(){

listYourTurn();

 

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
	var newLink =document.createElement('A');
	newLink.href = "http://warfish.net/war/play/?f=1";
	newLink.innerHTML = "It's Not Your Turn Bro. But check your games.";
	newLink.title = "Visit all your games";
	newLink.onclick=function(){
		chrome.tabs.create({url:this.href});
		return false;
	}
	document.getElementById("listGames").appendChild(newLink);
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