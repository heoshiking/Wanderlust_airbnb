const flash= require("connect-flash");


app.set("view engine" , "ejs");
app.set("views" , path.join(__dirname , "views"));

app.use(flash());

app.use((req , res , next)=>{
res.local.successMsg=req.flash("success");
res.local.errorMsg= req.flash("error");
next();
});

app.get("/register" ,(req, res)=>{
    let {name="anynomous"}= req.query;
    req.session.name=name;
    if(name==="anynomous"){
        req.flash("error", "user not registered");
    }
    else{
    req.flash("success", "user registered successfully");
    }
    res.redirect("/hello");
});

app.get("/hello", (req,res)=>{
    //res.send(`"hello", ${req.session.name}`);
    res.render("page.ejs" , {name: req.session.name});
});