const sqlite=require('sqlite3').verbose();

console.log('loaded');

const db=new sqlite.Database('./database.sql');

db.serialize(()=>{
	//Create database, needs if exists//
	//	db.run('create table settings(uid integer primary key, tempuid text not null, offset integer)');

	db.serialize(()=>{
		db.run('insert into settings (tempuid,offset) values ("28-0119356e302a","5")');

	});
	
	db.each("select * from settings",(err,row) => {
	if(err){
		console.log("Here:"+err);
	}else{
		console.log(row);
	}
});
	});
db.close();
