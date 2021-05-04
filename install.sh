sudo apt-get install pigpio-tools pigpio pigpiod

wget latest https://nodejs.org/dist/v14.15.4/node-v14.15.4-linux-armv7l.tar.xz;
tar -xvf node-v14.15.4-linux-armv7l.tar.xz
cd node-v14.15.4-linux-armv7l
sudo cp -R * /usr/local/
cd ..

sudo usermod -a -G gpio pi

npm install 
npm install sqlite3 express express-es6-template-engine ds18b20-raspi pigpio
