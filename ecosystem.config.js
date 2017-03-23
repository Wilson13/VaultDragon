module.exports = {
  /**
   * Application configuration section
   * http://pm2.keymetrics.io/docs/usage/application-declaration/
   */
  apps : [

    // First application
    {
      name      : "VaultDragon API",
      script    : "app.js",
      
    }
  ],

  /**
   * Deployment section
   * http://pm2.keymetrics.io/docs/usage/deployment/
   */
  deploy : {
    production : {
      user : "ubuntu",
      host : "ec2-34-208-10-36.us-west-2.compute.amazonaws.com",
	key  : "../AWS/wilson-key.pem",
      ref  : "origin/master",
      repo : "git@github.com:Wilson13/VaultDragon.git",
      path : "/home/ubuntu/server/VaultDragon",
      "post-deploy" : "npm install && pm2 startOrRestart ecosystem.config.js"
    }
  }
}
