// variables from index.html
declare var main_project: number;
declare var projects: Project[];

interface Project {
  title: string,
  image: string,
  description: string,
  index: number
}
class Page {
  readonly smallRow = $("#small-project-row");
  readonly currentRow = $("#current-project-row");
  readonly currentTitleHtml = $("#current-project-title");

  currentProjectIndex: number;
  currentProject: Project;
  constructor() {
    this.setCurrentProject(main_project);
  }

  setCurrentProject(index: number): any {
    this.currentProjectIndex = index;
    this.currentProject = projects[index];
  }
}
function currentProjectHTML(project: Project): string {
  return `
  <div class="col-md-8">
    <img class="img-fluid" src="${project.image}" alt="" width="750" height="500">
  </div>

  <div class="col-md-4">
    <h3 class="my-3">Project Description</h3>
    <p>${project.description}</p>
    <!-- <h3 class="my-3">Project Details</h3>
    <ul>
      <li>Lorem Ipsum</li>
      <li>Dolor Sit Amet</li>
      <li>Consectetur</li>
      <li>Adipiscing Elit</li>
    </ul> -->
  </div>
  `;
}
function smallProjectHTML(project: Project): string {
  return `
  <div class="col-md-3 col-sm-6 mb-4" id="project-${project.index}">
    <h3>${project.title}</h3>
    <a href="#/" class="img-link">
      <img class="img-fluid" src="${project.image}" alt="">
    </a>
  </div>`
}
function updateCurrentProject(page: Page): void {
  const project = page.currentProject;
  page.currentTitleHtml.text(project.title);
  page.currentRow.html(currentProjectHTML(project));
}
function updateSmallProjects(page: Page): void {
  page.smallRow.empty();

  projects.forEach((project, index) => {
    if (index != page.currentProjectIndex) {
      let text = smallProjectHTML(project);
      page.smallRow.append(text);
      let projectHtml = $(`#project-${index}>.img-link`);
      projectHtml.click(() => {
        smallProjectClick(index, page);
      });
    }
  });
}

function smallProjectClick(index: number, page: Page): void {
  console.log(`smallProjectClick with ${index}`);
  page.setCurrentProject(index);

  updateCurrentProject(page);
  updateSmallProjects(page);
}

$(document).ready(function () {
  console.log("ready");

  const page = new Page();

  updateCurrentProject(page);
  updateSmallProjects(page);
});