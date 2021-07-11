//window.onload = function(){
//    for(var i = 0; i < mediaIcons.length; i++)
//        AssignIconEvent(mediaIcons[i]);
//    
//    LoadProjectListJSON().then(async ()=>{
//       for(var i = 0; i < projectList.length; i++){
//           var _card = document.createElement("div");
//           _card.setAttribute("class", "ProjectCard");
//           
//           AddCardEvent(_card, projectList[i].downloadUrl);
//           
//           //Create project icon
//           var _icon = document.createElement("IMG");
//           _icon.src = projectList[i].projectIcon;
//           
//           //Create project name label
//           var _name = document.createElement("h3");
//           _name.innerText = projectList[i].projectName;           
//           
//           //Create role label
//           var _role = document.createElement("p");
//           let _roleNames =  projectList[i].projectRole.replaceAll('|', "<span>&#8226;</span>");
//           _role.innerHTML = _roleNames;
//           
//           _card.append(_icon);
//           _card.append(_name);
//           _card.append(_role);
//           projectsSegment.append(_card);
//       } 
//    });
//}
    
function AddCardEvent(_card ,_url){
    if(_url == "") return;
    _card.addEventListener("mouseover", function(){
        this.style.cursor = 'pointer';
    });
    _card.addEventListener("click", function(){
        window.open(_url, '_blank');
    });
}

var mediaSegment = document.getElementById("media");
var projectsSegment = document.getElementById("projects");
var projectList;
async function LoadProjectListJSON(){
    await fetch("/Scripts/ProjectList.json")
        .then(response =>{
            if(!response.ok){
                throw new Error('Network response failed!');
            }
            return response.json();
        })
        .then(data =>{
            projectList = data;
        });
}

function AssignIconEvent(iconInfo){
    iconInfo[0].addEventListener("mouseover", function(){
       iconInfo[0].src = iconInfo[2];
    });
    iconInfo[0].addEventListener("mouseout", function(){
       iconInfo[0].src = iconInfo[1];
    });
}

var mediaIcons = [
    [
        document.getElementById("githubIcon"),
        "Images/SocialIcons/Logo_Github.png",
        "Images/SocialIcons/Logo_Github_Highlight.png",
    ],
    [
        document.getElementById("linkedinIcon"),
        "Images/SocialIcons/Logo_LinkedIn.png",
        "Images/SocialIcons/Logo_LinkedIn_Highlight.png",
    ],
    [
        document.getElementById("twitterIcon"),
        "Images/SocialIcons/Logo_Twitter.png",
        "Images/SocialIcons/Logo_Twitter_Highlight.png",
    ],
    [
        document.getElementById("youtubeIcon"),
        "Images/SocialIcons/Logo_Youtube.png",
        "Images/SocialIcons/Logo_Youtube_Highlight.png",
    ]
];