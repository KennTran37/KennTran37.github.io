window.onload = function(){
    for(var i = 0; i < mediaIcons.length; i++)
        AssignIconEvent(mediaIcons[i]);
    
    //Loading Project Info
    LoadProjectListJSON().then(async ()=>{  //Loading Project Cards
        for(var i = 0; i < projectList.length; i++){
            var _card = document.createElement("div");
            _card.setAttribute("class", "ProjectCard");
            if(window.outerWidth <= 450)
                _card.style.width = (projectsSegment.clientWidth / 2) - 20 + 'px';
            else
                _card.style.width = (projectsSegment.clientWidth / 3) - 17.5 + 'px';
            AddCardEvent(_card, projectList[i].downloadUrl);
            
            var _icon = document.createElement("IMG");
            _icon.src = projectList[i].projectIcon;
            
            var _name = document.createElement("h3");
            _name.innerText = projectList[i].projectName;
            
            var _role = document.createElement("p");
            _role.innerText = projectList[i].projectRole;
            _role.style.fontWeight = 600;
            
            var _description = document.createElement("p");
            _description.innerText = projectList[i].description;
            _description.style.fontSize = 15 + 'px';
            
            var _lineBreak = document.createElement("IMG");
            _lineBreak.style.width = 150 + 'px';
            _lineBreak.style.height = 24 + 'px';
            _lineBreak.src = "Images/Line_break.png";
            
            _card.append(_icon);
            _card.append(document.createElement("br"));
            _card.append(_name);
            _card.append(_lineBreak);
            _card.append(_role);
            _card.append(_lineBreak);
            _card.append(_description);
            projectsSegment.append(_card);
        }
    }).then(()=>{   //Loading Project Screenshots
        $.get("/screenshots.text", function(data){
            const screenshots = data.split(/\r\n|\n/);
            for(var i = 0; i < screenshots.length; i++){
                var img = document.createElement("IMG");
                img.src = "/Images/Projects/Screenshots/" + screenshots[i];
                mediaSegment.append(img);
            }
        }, 'text');
    });
}

function AddCardEvent(_card ,_url){
    if(_url == "") return;
    _card.addEventListener("mouseover", function(){
        this.style.cursor = 'pointer';
    });
    _card.addEventListener("click", function(){
        window.open(_url, '_blank');
    });
}

function AssignIconEvent(iconInfo){
    iconInfo[0].addEventListener("mouseover", function(){
       iconInfo[0].src = iconInfo[1];
    });
    iconInfo[0].addEventListener("mouseout", function(){
       iconInfo[0].src = iconInfo[2];
    });
}

var mediaIcons = [
    [
        document.getElementById("emailIcon"),
        "Images/SocialIcons/Logo_Email_Dark.png",
        "Images/SocialIcons/Logo_Email.png"
    ],
    [
        document.getElementById("twitterIcon"),
        "Images/SocialIcons/Logo_Twitter_Dark.png",
        "Images/SocialIcons/Logo_Twitter.png"
    ],
    [
        document.getElementById("youtubeIcon"),
        "Images/SocialIcons/Logo_Youtube_Dark.png",
        "Images/SocialIcons/Logo_Youtube.png"
    ],
    [
        document.getElementById("linkedInIcon"),
        "Images/SocialIcons/Logo_LinkedIn_Dark.png",
        "Images/SocialIcons/Logo_LinkedIn.png"
    ],
];

var mediaSegment = document.getElementById("media");
var projectsSegment = document.getElementById("projects");
var projectList;
async function LoadProjectListJSON(){
    await fetch("/Scripts/ProjectList.json")
        .then(response =>{
            if(!response.ok){
                throw new Error('Network responce was not ok');
            }
            return response.json();
        })
        .then(data =>{
            projectList = data;
        });
}