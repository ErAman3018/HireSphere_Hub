import UserModal from '../model/user.model.js'
export default class User{
    getLogin(req,res,next){
        res.status(200).render("login",{errorMsg:null,email:req.session.email,name:req.session.name});
    }

    register(req,res,next){
        const {name,email,password}=req.body;
        UserModal.addUser(name,email,password);
        res.status(200).render("login",{errorMsg:null,email:req.session.email,name:req.session.name});
    }


    postLogin(req,res,next){
        const {email,password}=req.body;
        const isValidUser = UserModal.isValidUser(email,password);

        if(!isValidUser){
            res.render("login",{
                errorMsg:"Invalid user credentials or user doesn't exists!"
            });
        }
        const userDetails = UserModal.getUser(email);

        req.session.email=email;
        req.session.name=userDetails.name;

        // Render the layout view, which will include the 'homepage' view
        res.status(200).render('home',{email:req.session.email,name:req.session.name});
    }

    logout(req,res){
        // Destroy the session
        req.session.destroy((err)=>{
            if(err)
                console.log(err);
            else
            res.render('/login');
        })
    }
}