module.exports = {
  apps: [
    {
      name: 'app',
      script: 'build/index.js',
      // instances: "max",
      // autorestart: true,
      watch: 'build/**/*.js',
      max_memory_restart: '1G',
      env: {
        NODE_ENV: 'development'
      },
      env_production: {
        NODE_ENV: 'production'
      }
    },
    {
      name: 'app-watcher',
      script: 'npm watch',
      instances: 1,
      autorestart: true,
      watch: 'tsconfig.json',
      env: {
        NODE_ENV: 'development'
      },
      env_production: {
        NODE_ENV: 'production'
      }
    }]
};
