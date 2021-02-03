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

async function checkTemp(id,run){
//return new Promise(run=>{
	let lower=49.5;
	let upper=50.1;
	let offset=+5;
	
	const pump=new Gpio(12,{mode:Gpio.OUTPUT});
	let temp=await readTemp(id);

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

let run=0;
setInterval(()=>{
	checkTemp('28-0119356e302a',run).then(result=>{
		run=result;
		console.log("Run:"+run);
	});
	checkTempTwo('28-0120189f896d');
},5000);

console.log("Temp"+checkTemp('28-0120189f896d'));
//const returned


const Gpio = require('pigpio').Gpio;

//const pump = new Gpio(12, {mode: Gpio.OUTPUT});
//console.log(pump.getPwmRange());


//pump.pwmWrite(0);
////pump.pwmWrite(255);

