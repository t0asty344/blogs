import express from "express"
import bodyParser from "body-parser";
import { render } from "ejs";

const server = express()
const port = 3000
var blogs_object = {}
var blogs_li
let blogtext2
var inputs_text 
var inputs_text2
var inputs_edit
var blogs_names
var onlist = false
server.use(bodyParser.urlencoded({ extended: true }));
server.use(express.static("public"))

server.get("/",(req,res)=>{
    var onlist=false
    blogs_li=""
    for(var i = 0;i<Object.keys(blogs_object).length;i++)
        {
            if(Object.keys(blogs_object)[i]!="undefined"){
                blogs_li+="<li><form action='/list' method='post'><input type='submit' name=blog_texts value="+Object.keys(blogs_object)[i]+"></form></li>"
            }
        }
    res.render("index.ejs",{
        blogtext:"hello",
        bloglist:blogs_li
        
    })
})

server.post("/",(req,res)=>{
    var onlist=false
     res.render("index.ejs",{
         blogtext:"hello",
         bloglist:blogs_li
         
     })
 })
server.post("/submit",(req,res)=>{
    var onlist=false
    var blog_name =req.body.blogname
    blogs_object[blog_name] = {name:req.body.blogname,text:req.body.textblog}
    console.log()
    inputs_text =  "<input type='text' name='textblog' placeholder='text'><input type='text' name='blogname' placeholder='Blog name' required>"
    res.render("index.ejs",{
        inputs: inputs_text,
        blog: blogs_object,
        
    })
})
server.post("/list",(req,res)=>{
    var onlists=true
    blogtext2 = "no blog"
    

    if(blogs_object[req.body.blog_texts]){
        blogtext2 =blogs_object[req.body.blog_texts].text
        blogs_names =blogs_object[req.body.blog_texts].name
        
    }
   
    res.render("index.ejs",{
        blogtext: blogtext2,
        
        blogs_name: blogs_names ,
        onlist:onlists,
        
    })
})

server.post("/edit",(req,res)=>{
    var onlist=false
     
    inputs_text2 ="<input type='text' name='textblog'  value='"+ blogs_object[blogs_names].text+"'>"
    blogs_object[blogs_names].text= inputs_text

})

server.post("/delete",(req,res)=>{
    var onlist=false
    delete blogs_object[blogs_names]
})

server.listen(port,()=>{
    console.log(`Listening on port ${port}`);
})