
const express=require('express');
const hbs=require('hbs');
const fs=require('fs');

const port=process.env.PORT || 3000;
var app=express();




hbs.registerPartials(__dirname+'/views/partials');
app.set('view engine','hbs');



app.use((req,res,next)=>{
	
	var now=new Date().toString();
	
	fs.appendFile('timestamp.txt',now + '\n',(err)=>{
		
		if(err)
			console.log('Error log failed');

	});
	

	next();
	
	
});


app.use((req,res,next)=>{

	res.render('maintenance.hbs');

});

app.use(express.static(__dirname+'/public'));

hbs.registerHelper('getCurrentYear',()=>{
	
	return new Date().getFullYear();
	
});

hbs.registerHelper('upperCaser',(textMessage)=>{
	
	return textMessage.toUpperCase();
	
});


app.get('/',(req,res)=>{
	
	//res.send('<h1>Hello Express</h1>');
	
	res.render('home.hbs',{
		
		pageTitle:'Home Page',
		welcomeMessage:'Welcome to our page'
		
	});
	
	
});


app.get('/about',(req,res)=>{
	
	res.render('about.hbs',{
		
		pageTitle:'About Page'
		
	});
});


app.get('/bad',(req,res)=>{
	
	res.send({
		
		error:'Unable to Process Page',
		erro_no:404
		
	});
});



app.listen(port,()=>{
	
	console.log('Server is Up');
	
});