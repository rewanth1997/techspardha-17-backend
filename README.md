# Techspardha 2017

Backend part for the official Techno-Managerial Fest of National Institute of Technology, Kurukshetra (http://techspardha.org).

### Running the app
- Install and configure MySQL (Debian)
  ```
  sudo apt-get update
  sudo apt-get install mysql-server
  sudo mysql_secure_installation
  sudo mysql_install_db
  ```

- Clone the repo `git clone https://github.com/gawdsnitkkr/techspardha-17-backend.git`
- `cd techspardha-17-backend`
- Install the dependencies`npm install`
- Copy `config/configStructure.json` to `config/config.json` and fill the configuration details
- `npm start`
- And to stop, run `npm run stop`


Deployment instructions:

Increment all guest lecture's ID by 1000
