var searches = [
    ["baidu","https://www.baidu.com/s?wd=%s",false],
    ["google","https://www.google.com/?q=%s",false],
    ["sogou","https://www.sogou.com/web?query=%s",true],
    ["zhihu","https://www.zhihu.com/search?type=content&q=%s",true],
    ["weixin","http://weixin.sogou.com/weixin?type=2&query=%s",true],
    ["bing","https://www.bing.com/search?q=%s",true]
];
var searchIds = new Array();

/*
{
    searchEngines:
    [
        ["baidu","https://www.baidu.com/s?wd=%s",true],
        ["google", "https://www.google.com/?q=%s",false],
    ]
}
*/
try{
    chrome.storage.local.get("searchEngines", function(result){
        console.log(result.searchEngines);
        if(result.searchEngines){
            searches = result.searchEngines; 
            console.log("get sync result:\n"+searches);
            setMenus();
        }
        else{
            console.log("no result");
            setMenus();
            saveSearcheEngines();
        }
    });
}
catch(err){
    console.log(err.message);
    //saveSearcheEngines();
}

//-----
function setMenus(){
    chrome.contextMenus.removeAll(function(){

        var parent = chrome.contextMenus.create({
            "title": "Search Plus",
            "contexts": ["selection"]
        });
        console.log(searches.length);
        for (var i = searches.length - 1; i >= 0; i--) {
            console.log(i);
            if(!searches[i][2]){
                continue;
            }
            child = chrome.contextMenus.create({
                    "title": "search "+searches[i][0],
                    "contexts": ["selection"],
                    "parentId": parent,
                    "onclick": searchOnClick
            });
            console.log(child);
            searchIds[child] = i;
        }
        // child = chrome.contextMenus.create({
        //     "title": "选项",
        //     "contexts": ["selection"],
        //     "parentId": parent
        // });
    });
}

function searchOnClick(info, tab) {
  //console.log("item " + info.menuItemId + " was clicked");
  //console.log("tab: " + JSON.stringify(tab));
  //console.log("info: " + JSON.stringify(info));
    index = searchIds[info.menuItemId];
    console.log("info.selectionText: "+info.selectionText)
    url = searches[index][1].replace("%s",info.selectionText);
    console.log(url);
    chrome.tabs.create({url:url});
}

function saveSearcheEngines(callback){
    chrome.storage.local.set({"searchEngines":searches},function(){
        console.log("saved");
        //chrome.runtime.reload();
        if(callback){
            callback();
        }
    });
}
