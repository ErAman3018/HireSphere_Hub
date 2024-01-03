import Jobs from './jobs.model.js'

var applicantsList=[];
export default class Applicant{
    constructor(id,name,email,contact,resume,companyName){
        this.id=id;
        this.name=name;
        this.email=email;
        this.contact=contact;
        this.resume=resume;
        this.companyName=companyName;
    }

    static addApplicant(id,name,email,contact,resume,companyName){
        const applicantId=applicantsList.length+1;
        const newApplicant=new Applicant(applicantId,id,name,email,contact,resume,companyName);
        applicantsList.push(newApplicant);
        const job=Jobs.getById(id);
        job.applicants+=1;
    }

    static getApplicant(companyName){
        const applicantList= applicantsList.filter((a)=> a.companyName==companyName);
        return applicantList;
    }

    static deleteApplicant(id){
        const findIndex=applicantsList.findIndex((p)=>p.id==id);
        applicantsList.splice(findIndex,1);
    }
}