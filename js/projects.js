const requestURL = "data/projects.json";
const request = new XMLHttpRequest();
request.open("GET", requestURL);
request.responseType = "json";
request.send();

var projectNumber;
var projectKeyword;

request.onload = function () {
  const projects = request.response;
  createProject(projects);

};

const divProjects = document.getElementById("projects-container");

function createProject(json) {
  lenghtProjects = json["projects"].length;
  for (i = 0; i < json["projects"].length; i++) {

    let projectDiv = document.createElement("div");
    projectDiv.className = "project";
    
    divProjects.append(projectDiv);

    let hoverDiv = document.createElement("div");
    hoverDiv.className = "hover-element";
    hoverDiv.id = i;
    projectDiv.append(hoverDiv);
    
    let infoDiv = document.createElement("div");
    infoDiv.className = "project-info";
    projectDiv.append(infoDiv);

    let projectImg = document.createElement("img");
    projectImg.src = "images/" + json["projects"][i]["cover"];
    infoDiv.append(projectImg);
    
    let titleDiv = document.createElement("h7");
    titleDiv.textContent =
      json["projects"][i]["title"];
    infoDiv.append(titleDiv);

    /*
    let descP = document.createElement("h7");
    descP.className = "short-desc";
    descP.textContent = json["projects"][i]["short-description"] ;
    infoDiv.append(descP);*/

    let client = document.createElement("h7");
    client.className = "client";
    client.textContent = json["projects"][i]["year"] + " // " + json["projects"][i]["author"];
    infoDiv.append(client);
    
  }
  infoClick(json);
}


function infoClick(json) {
  var project = document.getElementsByClassName("project");
  for (var i = 0; i < project.length; i++) {
    project[i].addEventListener("click", function (event) {
      var projectNumber = event.target.id;
      console.log(projectNumber);
      localStorage.setItem("projectNumberKey", json["projects"][projectNumber]["keyword"]);
      window.location.href = "project.html" + "#" + json["projects"][projectNumber]["keyword"];
    });
  }
}
