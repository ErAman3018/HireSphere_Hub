import Jobs from '../model/jobs.model.js';
import Applicants from '../model/applicants.model.js';
import nodemailer from "nodemailer";

export default class Visitor{
    homePage(req,res,next){
        res.render('home',{email:req.session.email,name:req.session.name});
    }

    jobsHandler(req,res,next){
        const jobs=Jobs.get();
        res.render("jobs",{jobs:jobs,email:req.session.email, name:req.session.name});
    }

    jobDetails(req,res,next){
        const getJobId=req.params.id;
        const job = Jobs.getById(getJobId);
        // check if the job is found
        if(job){
            res.render("jobdetails",{
                job:job,email:req.session.email,name:req.session.name
            });
        }else{
            // Handle the case where the job is not found
            res.status(404).render("404page",{errorMsg:"Job Not Found!",email:req.session.email,name:req.session.name});
        }
    }

    applyJob(req,res,next){
        const id = req.params.id;
        const {name,email,contact,companyName}=req.body;
        const resume="resume/"+req.file.filename;
        const applicants=Applicants.getApplicant(companyName);
        if(applicants.length>=Jobs.getById(id).positions){
            return res.render("postjobapply",{
                message:`sorry, but we are currently unable to process your application for ${companyName} as all available positions have already filled. Please consider trying again at a later time.`,companyName:companyName,name,
            });
        }else if(applicants.find((p)=>p.name==name)){
            return res.render("postjobapply",{
                message:`You have already applied for ${companyName}`,
                companyName:companyName,
                name,
                email:req.session.email,
                name:req.session.name,
            });
        }
        Applicants.addApplicant(id,name,email,contact,resume,companyName);

        res.render("postjobapply",{
            message:`Congratulations! Your application for a position at ${companyName} has been successfully processed. We will contact you shortly via email at ${email} for further communication.`,companyName:companyName,name,email:req.session.email,name:req.session.name,
        });


        // Fuction to send email to the applicant--------

        async function sendMail(){

        }
        sendMail();
    }

    searchJobs(req,res,next){
        const searched=req.query.search.trim().toLowerCase();
        const jobsFound=Jobs.searchJob(searched);
        if(jobsFound){
            res.render('jobs',{jobs:jobsFound,email:req.session.email,name:req.session.name})
        }else{
            res.render('404page',{errorMsg:"No jobs found with current search query!",email:req.session.email,name:req.session.name})
        }
    }
}