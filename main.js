var searches = [
    ["百度","https://www.baidu.com/s?wd=",""],
    ["谷歌","https://www.google.com/?q=",""],
    ["搜狗","https://www.sogou.com/web?query=",""]
];
var searchIds = new Array();
var parent = chrome.contextMenus.create(
    {
        "title": "Search Plus",
        "contexts": ["selection"]
    }
);
for (var i = searches.length - 1; i >= 0; i--) {
    child = chrome.contextMenus.create(
        {
            "title": "搜索"+searches[i][0],
            "contexts": ["selection"],
            "parentId": parent,
            "onclick": searchOnClick
        }
    );
    console.log(child);
    searchIds[child] = i;
}

function searchOnClick(info, tab) {
  // console.log("item " + info.menuItemId + " was clicked");
  // console.log("tab: " + JSON.stringify(tab));
   console.log("info: " + JSON.stringify(info));
   index = searchIds[info.menuItemId];
   url = searches[index][1] + info.selectText + searches[index][2];
   chrome.tabs.create({url:url});

}