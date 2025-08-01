function changeTab(pageName) {
    const tab = document.getElementById(pageName + "Tab");

    // Deselect all tabs
    const tabButtons = document.querySelectorAll('.tablinks');
    tabButtons.forEach(tab => {
        tab.classList.remove("selectedTab");
    });

    // Hide all tab content
    const tabContents = document.querySelectorAll('.tabContent');
    tabContents.forEach(tab => {
        tab.style.display = "none";
    });

    // Remove active class from all tab buttons
    const tabLinks = document.querySelectorAll('.tablinks');
    tabLinks.forEach(btn => {
        btn.classList.remove("active");
    });

    // Show the selected tab content
    const selectedTab = document.getElementById(pageName + "Container");
    if (selectedTab) {
        selectedTab.style.display = "flex";
    }

    // Add active class to the clicked button
    if (tab) {
        tab.classList.add("selectedTab");
        tab.classList.add("active");
    }

    tabContentContainer = document.getElementById("tabContentContainer");
    if (tabContentContainer) {
        switch (pageName) {
            case 'resume':
                tabContentContainer.style.borderRadius = "0 4px 4px 4px";
                break;
            case 'portfolio':
                tabContentContainer.style.borderRadius = "4px";
                break;
            case 'skills':
                tabContentContainer.style.borderRadius = "4px 0 4px 4px";
                break;
        }
    }
}

window.onload = function () {
    // Resume
    fetch('lib/resume.json')
        .then(response => response.json())
        .then(data => {
            const resumeContainer = document.getElementById('resumeContainer');
            resumeContainer.innerHTML = '';
            data.forEach(section => {
                const expElem = createExpContainer(section);
                resumeContainer.appendChild(expElem);
            });
        });

    // Portfolio
    fetch('lib/portfolio.json')
        .then(response => response.json())
        .then(data => {
            const portfolioContainer = document.getElementById('portfolioContainer');
            portfolioContainer.innerHTML = '';
            data.forEach(section => {
                const expElem = createPortfolioContainer(section);
                portfolioContainer.appendChild(expElem);
            });
        });
};

function createExpContainer(jsonString) {
    const data = typeof jsonString === "string" ? JSON.parse(jsonString) : jsonString;
    const container = document.createElement('div');
    container.className = 'expContainer';

    // Title
    if (data.title) {
        const h2 = document.createElement('h2');
        h2.textContent = data.title;
        container.appendChild(h2);
    }

    // Entries
    data.entries.forEach(entry => {
        const expEntry = document.createElement('div');
        expEntry.className = 'expEntry';

        // Label Row
        const expLabel = document.createElement('div');
        expLabel.className = 'expLabel';

        const h3 = document.createElement('h3');
        h3.textContent = entry.label;
        expLabel.appendChild(h3);

        const p = document.createElement('p');
        p.textContent = entry.date;
        expLabel.appendChild(p);

        expEntry.appendChild(expLabel);

        // Roles
        entry.roles.forEach(roleObj => {
            const expContent = document.createElement('div');
            expContent.className = 'expContent';

            const h4 = document.createElement('h4');
            h4.textContent = roleObj.role;
            expContent.appendChild(h4);

            const ul = document.createElement('ul');
            roleObj.points.forEach(point => {
                const li = document.createElement('li');
                li.textContent = point;
                ul.appendChild(li);
            });
            expContent.appendChild(ul);

            expEntry.appendChild(expContent);
        });

        container.appendChild(expEntry);
    });

    return container;
}

function createPortfolioContainer(section) {
    const container = document.createElement('div');
    container.className = 'expContainer';

    // Title
    if (section.title) {
        const h2 = document.createElement('h2');
        h2.textContent = section.title;
        container.appendChild(h2);
    }

    // Entries
    section.entries.forEach(entry => {
        const expEntry = document.createElement('div');
        expEntry.className = 'expEntry';

        // Label Row
        const expLabel = document.createElement('div');
        expLabel.className = 'expLabel';

        const h3 = document.createElement('h3');
        h3.textContent = entry.label;
        expLabel.appendChild(h3);

        // Hyperlink as "Link"
        if (entry.link) {
            const link = document.createElement('a');
            link.href = entry.link;
            link.textContent = 'Link';
            link.target = '_blank';
            expLabel.appendChild(link);
        }

        expEntry.appendChild(expLabel);

        // Content
        const expContent = document.createElement('div');
        expContent.className = 'expContent';

        if (entry.description) {
            const h5 = document.createElement('h5');
            h5.textContent = entry.description;
            expContent.appendChild(h5);
        }

        // Points (optional)
        if (entry.points && Array.isArray(entry.points)) {
            const ul = document.createElement('ul');
            entry.points.forEach(point => {
                const li = document.createElement('li');
                li.textContent = point;
                ul.appendChild(li);
            });
            expContent.appendChild(ul);
        }

        expEntry.appendChild(expContent);
        container.appendChild(expEntry);
    });

    return container;
}

resumeTab = document.getElementById("resumeContainer");
changeTab('resume', resumeTab);