//const list = sensor.list();
const sensor = require('ds18b20-raspi');

/*
 sensor.list((err,deviceIds)=>{
	if(err){
		console.log(err);
	}else{
		deviceIds.forEach(async function(id){
			// round temperature readings to 2 digits
			 const deviceId = id;
			 sensor.readF(deviceId, 2, (err, temp) => {
			     if (err) {
			             console.log(err);
			                 } else {
			                         console.log(temp);
			                             }
			                             });
		});
	}
});
*/

async function readTemp(id){
	return new Promise(resolve => { 
		sensor.readF(id, 2, (err, temp) =>{
		if(err){
			reject(err);
		}else{
			resolve(temp);
			
		}
	});
	});
}

async function checkTemp(id,run,pump){
//return new Promise(run=>{
	let lower=59.5;
	let upper=60.5;
	let offset=+5;
	
//	let pump=new Gpio(12,{mode:Gpio.OUTPUT});
	
//	)then((yup) => {
		//pump=pump
//		console.log("Success");
//	}).catch((err)=>{
//		console.log(err);
//	});
		

	let temp;
	await readTemp(id).then((resolve)=>{
		temp=resolve;
	}).catch((err) =>{
		console.log(err);
	});
	

	temp=temp+offset;
//	console.log(pump.getPwmRange());
//	console.log(pump.getPwmFrequency());
	if(temp < lower){	
		if(run==1){
			console.log("Stop Pump");
			run=0;
			pump.pwmWrite(0);
		}
	}else if(temp > upper){
		if(run==0){
			console.log("Start Pump");
			run=1;
			pump.pwmWrite(255);
		}
	}
	console.log("Wort:"+temp);
	return run
//});
}

async function checkTempTwo(id){
	let offset=-1.6;
	let temp= await readTemp(id);
	temp=temp+offset;
	console.log("Chiller:"+temp);
	return temp;
}


const Gpio = require('pigpio').Gpio;
const pump=new Gpio(12, {mode:Gpio.OUTPUT});
pump.pwmWrite(0);

let run=0;
setInterval(()=>{
	checkTemp('28-0119356e302a',run,pump).then(result=>{
		run=result;
		console.log("Run:"+run);
	});
	checkTempTwo('28-0120189f896d');
},5000);

//console.log("Temp"+checkTemp('28-0120189f896d'));

