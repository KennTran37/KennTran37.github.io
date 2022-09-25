window.onload = function(){
    var x = window.matchMedia("screen and (min-height: 1000px)");
    if(x.matches){
        window.addEventListener('scroll', Scroll_EventListener);
    }

    fetch("./Scripts/ProjectList.json").then(resp => {
        return resp.json()
    }).then(json => {
        const _featureProjectsHolder = document.getElementById("projFeatures");
        _featureProjectsHolder.append(CreateProjectCard(json[1]));
        _featureProjectsHolder.append(CreateProjectCard(json[4]));
        _featureProjectsHolder.append(CreateProjectCard(json[2]));
        
        const _projectsHolder = document.getElementById("projects");
        
        for(var i = 0; i < json.length; i++){
            _projectsHolder.append(CreateProjectCard(json[i]));
        }
    });
}

function Scroll_EventListener(e){
    if(window.pageYOffset > 150){
        document.getElementById("landingPage").classList.add("heightAnimation");
        window.removeEventListener('scroll', Scroll_EventListener);
    }
}

function CreateProjectCard(project){
    var _card = document.createElement('div');
    _card.setAttribute('class', 'projectCard');
    
    var _icon = document.createElement('IMG');
    _icon.setAttribute('class', 'Icon');
    _icon.src = project.projectIcon;
    _card.appendChild(_icon);

    var _projInfo = document.createElement('div');
    _projInfo.setAttribute('class', 'projectCard-Info');
    _card.appendChild(_projInfo);

    var _projName = document.createElement('h3');
    _projName.setAttribute('class', 'projectCard-Name');
    _projName.innerText = project.projectName;
    _projInfo.appendChild(_projName);
    
    var _gap = document.createElement('hr');
    _gap.setAttribute('size', '2px');
    _gap.setAttribute('width', '70%');
    _gap.setAttribute('color', 'white');
    _projInfo.appendChild(_gap);
    
    var _projLinks = document.createElement('div');
    _projLinks.setAttribute('class', 'projectCard-Links');
    _projInfo.appendChild(_projLinks);

    for(var i = 0; i < project.socials.length; i++){
        var _link = document.createElement('a');
        _link.href = project.socials[i].downloadUrl;
        _link.target = '_blank';
        
        var _img = document.createElement('IMG');
        _img.setAttribute('class', 'socialIcon');
        _img.src = "Images/Social/" + project.socials[i].socialName + "_Icon.png";
        
        _link.appendChild(_img);
        
        _projLinks.appendChild(_link);
    }

    return _card;
}