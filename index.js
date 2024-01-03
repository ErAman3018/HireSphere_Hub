import express from 'express';
import expressEjsLayouts from 'express-ejs-layouts';
import Visitor from './src/controller/visitor.cotroller.js';
import path from 'path';
import { errorPage } from './src/Middlewares/errorpage.middleware.js';
import Recruiter from './src/controller/recruiter.controller.js';
import {fileUpload} from './src/middlewares/file-upload.middleware.js';
import User from './src/controller/user.controller.js';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import {auth} from './src/middlewares/authentication.middleware.js';
import { setLastVisit } from './src/middlewares/cookie.middleware.js';

const server = express();

//Set the server view engine as ejs
server.set('view engine', 'ejs');

//Set the middleware as ejsLayouts
server.use(expressEjsLayouts);

//add the express urlencoding to parse the incoming req data and make it available in the req.body
server.use(express.urlencoded({extended: true}));

//Making the instance of the visitor controller class
const visitor = new Visitor();

//Making the instance of the Recruiter controller class
const recruiter = new Recruiter();

//<aking the instance of the User controller class
const user = new User();

//Mention the folder where views are present.
server.set('views', path.join(path.resolve(), 'src', 'views'));

//Make the public folder available to the client
server.use(express.static('public'));

//Make the views available for rendering
server.use(express.static('src/views'));

//Using the cookie parser to enable cookies
server.use(cookieParser());

//Use the setLastVisit middleware
server.use(setLastVisit);

//Setup express session
server.use(session({
  secret: 'SecretKey',
  resave: 'false', //regenrate new session id
  saveUninitialized: 'true', //Save the session even if empty
  cookie: {secure: false}, //we are using http so unsecure.
}))



//Homepage route
server.get('/', visitor.homePage);

//Jobs page route
server.get('/jobs', visitor.jobsHandler);

//Login page route
server.get('/login', user.getLogin);

//Register post route
server.post('/register', user.register);

//Post login post route
server.post('/login', user.postLogin);

//Logout get route
server.get('/logout', user.logout);

//Post Job get page route
server.get('/postjob', auth, recruiter.getPostJob)

//Get route for the job details page
server.get('/jobs/:id', visitor.jobDetails);

//Post route for the post job
server.post('/postjob', auth,  recruiter.postjob);

//Post route for apply job
server.post('/apply/:id',fileUpload.single('resume'), visitor.applyJob);

//Get route for getting the list of applicants for a particular job
server.get('/jobs/applicants/:id',auth, recruiter.getApplicants);

//Get for update job view
server.get('/update/:id', recruiter.updateJob);

//put route for post update job
server.post('/update/:id', recruiter.postUpdateJob);

//Delete Job get route
server.get('/delete/:id', recruiter.deleteJob);

//Get route for search
server.get('/search/', visitor.searchJobs)

//Delete applicant get route
server.get('/applicants/delete/:param', recruiter.deleteApplicant);


// Middleware for handling invalid routes
server.use(errorPage);

//Server listen
server.listen(3500, () => {
    console.log("Server is listening on 3500");
  });