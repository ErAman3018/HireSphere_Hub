export default class Jobs {
  constructor(
    id,
    jobCategory,
    designation,
    companyName,
    Location,
    salary,
    LastDateToApply,
    positions,
    skills,
    postedOn,
    applicants
  ) {
    this.id = id;
    this.jobCategory = jobCategory;
    this.designation = designation;
    this.companyName = companyName;
    this.Location = Location;
    this.salary = salary;
    this.LastDateToApply = LastDateToApply;
    this.positions = positions;
    this.skills = skills;
    this.postedOn = postedOn;
    this.applicants = applicants;
  }

  static addJob(
    jobCategory,
    designation,
    companyName,
    Location,
    salary,
    LastDateToApply,
    positions,
    skills
  ) {
    const id = jobs.length + 1;
    const postedOn = new Date().toLocaleDateString();
    const newJob = new Jobs(
      id,
      jobCategory,
      designation,
      companyName,
      Location,
      salary,
      LastDateToApply,
      positions,
      skills,
      postedOn,
      0
    );
    jobs.push(newJob);
  }

  static get() {
    return jobs;
  }

  static getById(id) {
    return jobs.find((p) => p.id == id);
  }

  static updateJob(
    id,
    jobCategory,
    designation,
    companyName,
    Location,
    salary,
    LastDateToApply,
    positions,
    skills
  ) {
    const findIndex = jobs.findIndex((p) => p.id == id);
    job[findIndex].jobCategory = jobCategory;
    job[findIndex].designation = designation;
    job[findIndex].companyName = companyName;
    job[findIndex].Location = Location;
    job[findIndex].salary = salary;
    job[findIndex].LastDateToApply = LastDateToApply;
    job[findIndex].positions = positions;
    job[findIndex].skills = skills;
  }

  static deleteJob(id) {
    const findIndex = jobs.findIndex((p) => p.id == id);
    jobs.splice(findIndex, 1);
  }

  static searchJob(name) {
    const findJobs = jobs.filter((p) => p.companyName.toLowerCase() === name);
    return findJobs;
  }

  static reduceApplicants(name) {
    const findIndex = jobs.findIndex(
      (p) => p.companyName.toLowerCase() === name
    );
    jobs[findIndex].applicants--;
  }
}

var jobs = [
  new Jobs(
    0,
    "Tech",
    "SDE",
    "Amazon",
    "Gurugram HR Onsite",
    "42Lpa",
    new Date(2023, 11, 24).toLocaleDateString(),
    "20",
    ["Nodejs", "JavaScript", "HTML", "CSS", "React", "Express", "MongoDb"],
    new Date(2023, 11, 17).toLocaleDateString(),
    0
  ),
  new Jobs(
    1,
    "Tech",
    "Full Stack Web Developer",
    "Facebook",
    "Bengalore IND On-Site",
    "67Lpa",
    new Date(2023, 11, 10).toLocaleDateString(),
    "20",
    ["Nodejs", "JavaScript", "HTML", "CSS", "React", "Express", "MongoDb"],
    new Date(2023, 10, 21).toLocaleDateString(),
    0
  ),
];
