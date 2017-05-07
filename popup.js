
$(document).ready(function(){
    var a = searches;
    console.log("document.ready.");
    $("#settings").empty();
    for(var i = 0; i<a.length; i++)
    {
        var b = "<input type='checkbox' id='{0}' /><span>{1}</span><br/>".format(
            i,
            a[i][0]
        );
        console.log(a[i][2]);
        $("#settings").append(b);
        console.log(searches[i]);
        if(a[i][2]){
            $("#"+i.toString()).attr("checked","");
        }

        $("#" + i.toString()).click(function(){
            console.log("click");
            console.log(i);
            console.log("ckb.checked:"+$(this).is(":checked"));
            //searches[i][2] = $(this).is(":checked");
            var id = $(this).attr("id");
            searches[id][2] = $(this).is(":checked");
            console.log(searches);
            saveSearcheEngines();
        });
    }
});
