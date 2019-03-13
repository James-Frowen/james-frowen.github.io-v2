// variables from index.html
declare const MAIN_PROJECT: number;
declare const RAW_PROJECTS: RawProject[];
declare const PROJECTS_URL: string;
declare const SITE_URL: string;

interface RawProject {
  title: string;
  status?: string;
  image: string;
  description: string;
  index: number;
  pageLink: string;
}

class Project implements RawProject {
  title: string;
  status?: string;
  image: string;
  description: string;
  index: number;
  pageLink: string;

  constructor(raw: RawProject, index: number) {
    Object.assign(this, raw);
    this.image = SITE_URL + raw.image;
    this.index = index;
  }

  get statusText(): string {
    return (this.status) // true if not null or empty
      ? `<h4>Status: ${this.status}</h4>`
      : "";
  }
  get link(): string {
    return `${PROJECTS_URL}${this.pageLink}`;
  }
  get galleryLink(): string {
    return `${this.link}/gallery`;
  }

  currentHTML(): string {
    return `{% include ForJs/CurrentProject.html %}`;
  }
  smallHTML(): string {
    return `{% include ForJs/SmallProject.html %}`;
  }
}
class Page {
  readonly smallRow = $("#small-project-row");
  readonly currentRow = $("#current-project-row");
  readonly currentTitleHtml = $("#current-project-title");

  readonly projects: Project[];
  currentProjectIndex: number;
  currentProject: Project;
  constructor() {
    this.projects = RAW_PROJECTS.map((rawProject, index) => new Project(rawProject, index));
    this.setCurrentProject(MAIN_PROJECT);
  }

  setCurrentProject(index: number): any {
    this.currentProjectIndex = index;
    this.currentProject = this.projects[index];
  }
}


function updateCurrentProject(page: Page): void {
  const project = page.currentProject;
  page.currentTitleHtml.text(project.title);
  page.currentRow.html(project.currentHTML());
}
function updateSmallProjects(page: Page): void {
  // delete existing html
  page.smallRow.empty();

  // add projects to html
  page.projects.forEach((project, index) => {
    if (index != page.currentProjectIndex) { // if not current project
      addProjectHtmlToRow(project);

      addOnClickFunction(index);
    }
  });

  function addProjectHtmlToRow(project: Project) {
    let text = project.smallHTML();
    // add project html to row
    page.smallRow.append(text);
  }
  function addOnClickFunction(index: number) {
    let projectHtml = $(`#project-${index}>.img-link`);
    projectHtml.click(() => {
      smallProjectClick(index, page);
    });
  }
}

function smallProjectClick(index: number, page: Page): void {
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