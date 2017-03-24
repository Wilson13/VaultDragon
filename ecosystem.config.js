module.exports = {
  apps: [{
    name: 'VaultDragon API2',
    script: 'vault_api.js'
  }],
  deploy: {
    production: {
      user: 'ubuntu',
      host: 'ec2-34-208-10-36.us-west-2.compute.amazonaws.com',
      key: 'wilson-key.pem',
      ref: 'origin/master',
      repo: 'git@github.com:Wilson13/VaultDragon.git',
      path: '/home/ubuntu/server/VaultDragon',
      'post-deploy': 'npm install && pm2 startOrRestart ecosystem.config.js'
    }
  }
}
