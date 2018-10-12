var current_page=0, total_pages, data;

function size(object) {
    return Object.keys(object).length;
}





(function(){


    const addSite = (function(){ // adding a new site
        
        $("#addsite").on("click", function(){
            var website = $("#site").val();
            $.post("/site/add/", data = {site: website}, function(data, success){
                if(data["message"] === "success"){
                    getData(updateData);   
                    console.log("UPDATE: ", total_pages);
                }
            });
        });
    })();



    let getData = function(callback) {
        $.get("/site/get", function(data, status){
            var pageNumbers = Math.ceil(data.length / 5);
            var offset = 0;
            var arranged_data = {};
            for(let i = 0; i<pageNumbers; i++){
                arranged_data[i] = arranged_data[i] || data.slice(offset, offset+5);
                offset+=5;
            }
            window.data = arranged_data;
            window.total_pages = size(arranged_data);

            if (current_page == 0 && total_pages > 1){
                $(".next").removeClass("disabled");
            } else if (current_page == 0 && total_pages == 1)
            {
                $(".next").addClass("disabled");
                $(".previous").addClass("disabled");
            }

            if(data[current_page + 1].length == 0){
                
            }



            var fn = callback();
            if(typeof fn == "function"){
                fn();
            }
        });
    };


    let updateData = function(){
        /* 
            Data format { pagenumber: 5 entires, pagenumber: 5 entries}
        */
               
       function removeData(){
           var element = $(".siteItem");
           element.remove();
       }

       function injectData(entries){
        /*
            entries format [{used_id, site_id, site}]
            this function injects sites into the dom
        */
        var element = $(".siteHeading");
        if(entries.length>0){
            if($(".siteHeading").next().text() === "No sites" ){
                $(".siteHeading").next().remove();
            }
            removeData();
            var template = `<li id="i{{siteid}}" class="text-light list-group-item link-item siteItem animated"><a href="list/{{siteid}}" class="btn btn-outline-light" style="max-width:90%; overflow-x:hidden;">{{website}}</a> <a href="" class="delete">&times;</a></li>`;
            var html = "";
            var temp_html;
            for(let i in entries){
                temp_html = "";
                temp_html += template.replace("{{website}}", entries[i].site);
                temp_html = temp_html.replace("{{siteid}}", entries[i].site_id);
                temp_html = temp_html.replace("{{siteid}}", entries[i].site_id);
                temp_html += "\n";
                html += temp_html;
                }
                element.after(html);
            $("a.delete").click(function(e){ // delete
                e.preventDefault();
                var element = $(this).parent();
                console.log(element);
                element.addClass("fadeOutRight");
                var id = element[0].id.split("i")[1];
                setTimeout(function(){
                    element.remove();
                }, 500);
                $.get(`/site/remove/${id}`, function(data, success) {
                    getData(updateData);   
                });


            
        });




        }
       }

       injectData(data[current_page]);

       if(current_page === 0 && total_pages > 1){
            $(".next").removeClass("disabled");
        }

        if(size(data) === 1){
            $(".next").addClass("disabled");
        }



       return function() { // so that the ajax function has to get the data only once.

            $(".next").off().on("click", function(){

        
                if( (total_pages-1-current_page)>0  ){
                    current_page++;
                    console.log(`${current_page+1}/${total_pages}`);
                    if(current_page == total_pages-1){
                        $(".next").addClass("disabled");
                    }
                }
                if(current_page>0){
                    $(".previous").removeClass("disabled");
                }

                removeData();
                injectData(data[current_page]);
            });
            $(".previous").off().on("click", function(){
                if(size(data) === 1){
                    $(".next").addClass("disabled");
                }
                if(current_page > 0){
                    current_page--;
                    console.log(`${current_page+1}/${total_pages}`);
                    if(current_page == 0){
                        $(".previous").addClass("disabled");
                        if(total_pages > 0 && current_page == 0){
                            $(".next").removeClass("disabled");
                        } 
                    }
                    if(current_page < total_pages-1){
                        $(".next").removeClass("disabled");
                    }
                    removeData();
                    injectData(data[current_page]);
                }
            });

       }

    }




    getData(updateData);
    


})();
