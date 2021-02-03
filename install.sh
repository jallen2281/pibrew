url -sL https://deb.nodesource.com/setup_8.x | sudo -E bash -
apt-get install pigpio-tools pigpio pigpiod nodejs

wget latest nodejs;
tar -xvf node-v14.15.4-linux-armv7l.tar.xz
cd node-v14.15.4-linux-armv7l
cp -R * /usr/local/

npm install 
npm install sqlite3 express express-es6-template-engine ds18b20-raspi pigpio
