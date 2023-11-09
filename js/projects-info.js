const requestURL = "data/projects.json";
const request = new XMLHttpRequest();
const request2 = new XMLHttpRequest();
request.open("GET", requestURL);
request.responseType = "json";
request.send();


var projectNumber;
var projectKeyword;



request.onload = function () {
  const projects = request.response;

  projectKeyword = localStorage.getItem("projectNumberKey");

  //Analizamos la URL
  var actual = window.location + "";
  var split = actual.split("#");
  var id = split[split.length - 1];
  projectKeyword = id;

  projectInfo(projects);
};



var keywordCorrect = false;

function projectInfo(json) {
  for (i = 0; i < json["projects"].length; i++) {
    if (json["projects"][i]["keyword"] == projectKeyword) {
      projectNumber = i;
      keywordCorrect = true;
    }
  }

  if (keywordCorrect == false) {
    window.location.href = "index.html";
  } else {
    var pv = projectNumber;

    var title = document.getElementById("title");
    var pdf = document.getElementById("pdf");
    var short_description = document.getElementById("short-description");
    var year = document.getElementById("year");
    var gameplay = document.getElementById("gameplay-button");
    var trailer = document.getElementById("trailer-button");
    var buttons = document.getElementById("buttons");
    var author = document.getElementById("author");
    var disciplines = document.getElementById("disciplines");
    var awards = document.getElementById("awards");
    var client = document.getElementById("client");
    var awards_title = document.getElementById("awards-title");
    var client_title = document.getElementById("client-title");
    var long_description = document.getElementById("long-description");
    var what = document.getElementById("what-i-did");
    var aditional_info = document.getElementById("aditional-info");
    var img_container = document.getElementById("project-imgs");
    var primary_text = document.getElementsByClassName("text-primary");
    var primary_bg = document.getElementsByClassName("bg-primary");
    var project_info = document.getElementById("project-info");
    var project_title = document.getElementById("project-title");
    var link_title = document.getElementById("links-title");
    var link_line = document.getElementById("links-line");

    
    

    if (window.AdobeDC) {
      var adobeDCView = new AdobeDC.View({clientId: "fd9316924f5b481ba4bc32f7c19e4b8e", divId: "adobe-dc-view"});
      adobeDCView.previewFile(
        {
            content:  {location: { url: "pdfs/" + json["projects"][pv]["pdf"]}},
            metaData: {fileName: json["projects"][pv]["pdf"]}
            
        }, { embedMode: "IN_LINE" });
    } else {
      /* Wait for Adobe Document Services PDF Embed API to be ready */
      document.addEventListener("adobe_dc_view_sdk.ready", () => {
        var adobeDCView = new AdobeDC.View({clientId: "fd9316924f5b481ba4bc32f7c19e4b8e", divId: "adobe-dc-view"});
        adobeDCView.previewFile(
          {
              content:  {location: { url: "pdfs/" + json["projects"][pv]["pdf"]}},
              metaData: {fileName: json["projects"][pv]["pdf"]}
              
          }, { embedMode: "IN_LINE" });
      });
    }
  
          
  }
}
