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
    return "\n  <div class=\"col-md-8\">\n    <img class=\"img-fluid\" src=\"" + project.image + "\" alt=\"\" width=\"750\" height=\"500\">\n  </div>\n\n  <div class=\"col-md-4\">\n    <h3 class=\"my-3\">Project Description</h3>\n    <p>" + project.description + "</p>\n    <!-- <h3 class=\"my-3\">Project Details</h3>\n    <ul>\n      <li>Lorem Ipsum</li>\n      <li>Dolor Sit Amet</li>\n      <li>Consectetur</li>\n      <li>Adipiscing Elit</li>\n    </ul> -->\n  </div>\n  ";
}
function smallProjectHTML(project) {
    return "\n  <div class=\"col-md-3 col-sm-6 mb-4\" id=\"project-" + project.index + "\">\n    <h3>" + project.title + "</h3>\n    <a href=\"#/\" class=\"img-link\">\n      <img class=\"img-fluid\" src=\"" + project.image + "\" alt=\"\">\n    </a>\n  </div>";
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
