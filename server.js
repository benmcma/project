//we create a new page projects
const express =require("express");
const hbs =require('hbs');
const fs = require('fs');
const port=process.env.PORT|| 3000; 

var app = express();


hbs.registerPartials(__dirname+ "/views/partials"); 

app.set("view engine", "hbs");

app.use(express.static(__dirname + '/public')); 



app.use((req, res,next )=>{
    var now = new Date().toString();
    var log = `${now}: ${req.method} ${req.url}`;
    
   fs.appendFile('server.log',log + '\n', (err)=>{
       if(err)
       {
           console.log("unable to append to server log");
       }
   }); 

    next(); 
});





app.get("/", (req, res)=>{ 
    res.render("home.hbs", {
        pageTitle: "Home page",
        WelcomeMessage: "welcome to my website",
        currentYear : new Date().getFullYear()
    });
});

app.get("/about", (req, res)=>{
    res.render('about.hbs', {
        pageTitle: "About page",
        currentYear : new Date().getFullYear()
    }); 
});

app.get("/projects", (req, res)=>{
    res.render('projects.hbs',{
        pageTitle: "projects"
    });
});

app.get("/bad", (req, res)=>{
   res.send( {errorMessage : "unable to handle request "}); 
    
});

app.listen(port, ()=>{  //1
    console.log(`server is on port ${port}`);
}); 