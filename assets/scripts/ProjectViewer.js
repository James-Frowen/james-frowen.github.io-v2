---
---
"use strict";
class Project {
    constructor(raw) {
        Object.assign(this, raw);
    }
    get statusText() {
        return (this.status) // true if not null or empty
            ? `<h4>Status: ${this.status}</h4>`
            : "";
    }
    get link() {
        return `${BASE_URL}${this.pageLink}`;
    }
    get galleryLink() {
        return `${this.link}/gallery`;
    }
    currentHTML() {
        return `{% include ForJs/CurrentProject.html %}`;
    }
    smallHTML() {
        return `{% include ForJs/SmallProject.html %}`;
    }
}
class Page {
    constructor() {
        this.smallRow = $("#small-project-row");
        this.currentRow = $("#current-project-row");
        this.currentTitleHtml = $("#current-project-title");
        this.projects = RAW_PROJECTS.map(rawProject => new Project(rawProject));
        this.setCurrentProject(MAIN_PROJECT);
    }
    setCurrentProject(index) {
        this.currentProjectIndex = index;
        this.currentProject = this.projects[index];
    }
}
function updateCurrentProject(page) {
    const project = page.currentProject;
    page.currentTitleHtml.text(project.title);
    page.currentRow.html(project.currentHTML());
}
function updateSmallProjects(page) {
    // delete existing html
    page.smallRow.empty();
    // add projects to html
    page.projects.forEach((project, index) => {
        if (index != page.currentProjectIndex) { // if not current project
            addProjectHtmlToRow(project);
            addOnClickFunction(index);
        }
    });
    function addProjectHtmlToRow(project) {
        let text = project.smallHTML();
        // add project html to row
        page.smallRow.append(text);
    }
    function addOnClickFunction(index) {
        let projectHtml = $(`#project-${index}>.img-link`);
        projectHtml.click(() => {
            smallProjectClick(index, page);
        });
    }
}
function smallProjectClick(index, page) {
    console.log(`smallProjectClick with ${index}`);
    page.setCurrentProject(index);
    updateCurrentProject(page);
    updateSmallProjects(page);
}
function ProjectViewer() {
    console.log("ProjectViewer init");
    const page = new Page();
    updateCurrentProject(page);
    updateSmallProjects(page);
}
$(document).ready(ProjectViewer);
