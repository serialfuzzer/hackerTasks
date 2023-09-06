
function activateItem(id){
    console.log(id);
        var element = `#${id}`;
        if($(element).hasClass("enabled")){ // if the button is already enabled
            $(element).toggleClass("btn-outline-dark");
            $(element).parent().toggleClass("bg-dark");
            $(element).parent().toggleClass("bg-success");
            $(element).removeClass("enabled");
            update();
        }else{ // if the button is not enabled
            $(element).toggleClass("btn-outline-dark");
            $(element).parent().toggleClass("bg-dark");
            $(element).parent().toggleClass("bg-success");
            $(element).addClass("enabled");
            update();
        }

}


function update() {
    let active_ids = $.makeArray($(".enabled")).map(e=>e.id).join(",");
    var site_id = $("#content").data("site");
    $.post(`/list/addlist/${site_id}`, {data: active_ids, _csrf: $("[data-token]").data("token")}, (data, status)=>{ console.log(status) });
}


function populate(objects, selector){
    /*
        JSON Format:
        [
            { "heading": [items under headings]  },
            { "heading": [items under headings]  },
            any number of times
        ]
    */
    var website = $(".main").data("website");
    var prepared = `<ul class="list-group">\n`;
    prepared += `<li class='list-group-item bg-dark text-center text-green sitename'> <h3>{{website}}</h3></li>`
    prepared = prepared.replace("{{website}}", website);
    var id = 0;
    for (var object in objects){
        var obj = objects[object];
        for(var key in obj){
            var heading = key;
            var items = obj[key];
            prepared += `<li class="list-group-item bg-dark text-light"><h4>${heading.split("_").join(" ")}</h4></li>`;
            
            for(var item in items){
                if(items[item].indexOf("{[class]ml-3}") > -1){
                    var string = items[item].split("{[class]ml-3}")[1];
                    prepared += `<li class="list-group-item bg-dark ml-3"> <a id="i${id++}" onclick="activateItem(this.id);" class="btn btn-outline-dark border checklist" style="margin-bottom:4px;white-space: normal;"> ${string}</a></li>`;
                }else{
                    prepared += `<li class="list-group-item bg-dark"> <a id="i${id++}" onclick="activateItem(this.id);" class="btn btn-outline-dark border checklist" style="margin-bottom:4px;white-space: normal;"> ${items[item]}</a></li>`;
                }
            }
        }
    }
    prepared += `</ul>`;
    $(selector).html(prepared);
    var site_id = $("#content").data("site");
    $.get(`/list/active/${site_id}`, function(data, status){
        if(data){
            data.split(",").forEach((e)=>activateItem(e));
        }
    });
}

 
(function begin(){
    $.get("/jsondata.json", function(data,success){
        populate(data, ".main");
    })
})();




