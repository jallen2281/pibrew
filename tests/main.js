//use pm2 and run as cluster not as single proc.
//callbacks first is allaywas err, null if no error
// use Emitter for listening to events.


const config=require('./config.json');

const myTemplate=require('./template.js');
console.log(myTemplate.title('Titletown','well'));

const rtnHello = function(arg1,arg2){
	return new Promise((resolve,reject)=>{
		if(1>2){
			reject(err);
		}
		resolve("helloworld"+arg1+arg2);
	});
}

rtnHello("arg1","arg2").then(world => {
	console.log("It's a " + world);
})
.catch(console.error);


async function testme(heyo){
	const work = await slowtask(heyo);
	console.log(work);
	return(work);
}

const slowtask = (heyo) => {
return new Promise(resolve => {
	setTimeout(()=>{ 
		console.log("started");
		resolve('fuker');
	},2000);
});
}

function resolveAfter2Seconds() {
	  return new Promise(resolve => {
		      setTimeout(() => {
			            resolve('resolved');
			          }, 2000);
		    });
}

async function asyncCall() {
	  console.log('calling');
	  const result = await resolveAfter2Seconds();
	  console.log(result);
	  // expected output: "resolved"
 }

 asyncCall();



const express = require('express');
const server=express();

server.get('/',(req,res)=>{

	res.send('Hopefully Temperatures soon!');
});

server.listen(8080,() => {
	console.log('Express Server Started...');
});

