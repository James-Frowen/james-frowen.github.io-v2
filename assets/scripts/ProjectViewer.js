"use strict";
var Page = (function () {
    function Page() {
        this.smallRow = $("#small-project-row");
        this.currentRow = $("#current-project-row");
        this.currentTitleHtml = $("#current-project-title");
        this.setCurrentProject(main_project);
    }
    Page.prototype.setCurrentProject = function (index) {
        this.currentProjectIndex = index;
        this.currentProject = projects[index];
    };
    return Page;
}());
function currentProjectHTML(project) {
    var status = (project.status) // true if not null or empty
        ? "<h4>Status: " + project.status + "</h4>"
        : "";
    return "\n  <div class=\"col-md-8\">\n    <img class=\"img-fluid rounded-image full-shadow-low\" src=\"" + project.image + "\" alt=\"" + project.title + " image\">\n  </div>\n\n  <div class=\"col-md-4\">\n    <h3 class=\"my-3\">Project Description</h3>\n    " + status + "\n    <p>" + project.description + "</p>\n  </div>\n  ";
}
function smallProjectHTML(project) {
    return "\n  <div class=\"col-md-3 col-sm-6 mb-4\" id=\"project-" + project.index + "\">\n    <h3>" + project.title + "</h3>\n    <a href=\"#/\" class=\"img-link\">\n      <img class=\"img-fluid rounded-image-low full-shadow-low\" src=\"" + project.image + "\" alt=\"" + project.title + " image\">\n    </a>\n  </div>";
}
function updateCurrentProject(page) {
    var project = page.currentProject;
    page.currentTitleHtml.text(project.title);
    page.currentRow.html(currentProjectHTML(project));
}
function updateSmallProjects(page) {
    page.smallRow.empty();
    projects.forEach(function (project, index) {
        if (index != page.currentProjectIndex) {
            var text = smallProjectHTML(project);
            page.smallRow.append(text);
            var projectHtml = $("#project-" + index + ">.img-link");
            projectHtml.click(function () {
                smallProjectClick(index, page);
            });
        }
    });
}
function smallProjectClick(index, page) {
    console.log("smallProjectClick with " + index);
    page.setCurrentProject(index);
    updateCurrentProject(page);
    updateSmallProjects(page);
}
$(document).ready(function () {
    console.log("ready");
    var page = new Page();
    updateCurrentProject(page);
    updateSmallProjects(page);
});
