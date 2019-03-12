// variables from index.html
declare var main_project: number;
declare var projects: Project[];

interface Project {
  title: string,
  status?: string,
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
  let status = (project.status) // true if not null or empty
    ? `<h4>Status: ${project.status}</h4>`
    : "";

  return `
  <div class="col-md-8">
    <img class="img-fluid rounded-image full-shadow-low" src="${project.image}" alt="${project.title} image">
  </div>

  <div class="col-md-4">
    <h3 class="my-3">Project Description</h3>
    ${status}
    <p>${project.description}</p>
  </div>
  `;
}
function smallProjectHTML(project: Project): string {
  return `
  <div class="col-md-3 col-sm-6 mb-4" id="project-${project.index}">
    <h3>${project.title}</h3>
    <a href="#/" class="img-link">
      <img class="img-fluid rounded-image-low full-shadow-low" src="${project.image}" alt="${project.title} image">
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