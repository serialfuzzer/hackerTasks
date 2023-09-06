async function getCredentials(site_id){
    const response = await fetch(`/credentials/getBySiteID/${site_id}`);
    return response.json();
}

async function getCredsAndUpdateDOM(){
    $(".credsContainer").html('')
    var site_id = $("#content").data().site
    var credentials = await getCredentials(site_id);
    var htmlContent = '';
    for(var i=0; i<credentials.length;i++){
        var credential = credentials[i];
        htmlcontent += `<tr>
        <th scope="row">${i + 1}</th>
        <td>${credential.username}</td>
        <td>${credential.email}</td>
        <td>${credential.password}</td>
        <td>${credential.description}</td>
        </tr>`;
    }
    $(".credsContainer").html(htmlContent)
    
}

async function test() {
    var data = await getCredentials(2);
    console.log(data)
}
