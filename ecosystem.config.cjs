module.exports = {
  apps: [{
    name: 'nasha7',
    script: 'node',
    args: '.output/server/index.mjs',
    cwd: '/var/www/projects/nasha7',
    interpreter: 'none',
    watch: false,
    max_memory_restart: '500M',
    env: {
      NODE_ENV: 'production',
      PORT: '8087',
      HOST: '0.0.0.0'
    },
    error_file: '/var/www/projects/nasha7/logs/err.log',
    out_file: '/var/www/projects/nasha7/logs/out.log',
    log_file: '/var/www/projects/nasha7/logs/combined.log',
    time: true,
    instances: 1
  }]
};
