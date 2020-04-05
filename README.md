# Real-time monitoring of available beds for intensive care units in Swiss Hospitals

During the Corona-Crisis, ICU beds and ventilators are of the essence to preserve human life. This #versusvirus hackathon project, aims to first monitor the data in realtimea and secondly process the data into one localized system and visualization. The third step is to base a model on the available data to forecast the need of beds in certain areas.

![Demo](https://github.com/biomodelling/versusvirus2020hackathon/raw/master/public/app_demo.png)

## Devpost Projekt

* [Link](https://devpost.com/software/0_24_krankenhauser_bettenverfugbarkeitsvisualisierung) our Devpost-Projekt


## Dependencies

* nodejs / npm
* yarn
* python3
* python3-pip

## Build

```bash
cd api
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
cd ..
npm install

```
## Start

### `yarn start-api`

Starts the python based flask backend api on localhost:5000.

### `yarn start`

Starts the main app on localhost:3000.

## Production

### `npm run build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Additional dependencies for Fedora
```
sudo dnf install libpq-devel
sudo dnf install python3-devel
yum install nodejs-yarn
sudo dnf install postgresql postgresql-server
sudo postgresql-setup --initdb --unit postgresql
sudo systemctl start postgresql  
sudo su - postgres
createuser testuser -P
createdb testdb --owner testuser
$ vim ~/data/pg_hba.conf
# "local" is for Unix domain socket connections only
local   all             all                                     trust
host    all             all             127.0.0.1/32            trust

sudo systemctl restart postgresql.service
# update connect parameters in databaseUtils.py to use testuser and testdb

# create DB structure and entries
psql  -d testdb -U testuser
CREATE TABLE hospitals ( id serial primary key, name varchar(100) NOT NULL, state varchar(100) NOT NULL, city varchar(100) NOT NULL, postcode varchar(100) NOT NULL, street varchar(100) NOT NULL,streetNumber varchar(100) NOT NULL, phoneNumber varchar(100) NOT NULL, website varchar(100),latitude varchar(100),longitude varchar(100));
CREATE TABLE bedavailability ( id serial primary key, hospitalID serial REFERENCES hospitals(id), iculc integer NOT NULL, icuhc integer NOT NULL, ecmo integer NOT NULL, iculcMax integer NOT NULL, icuhcMax integer NOT NULL, ecmoMax integer NOT NULL, timestamp date NOT NULL );
ctrl-D
cd api
python3 add_hospitals.py

# add example data for bed availability via DB 
insert into bedavailability VALUES(1,1,200,50,20,300,100,50,'2020-4-4 13:40:16');
insert into bedavailability VALUES(2,2,200,50,20,300,100,50,'2020-4-4 13:40:16');
```