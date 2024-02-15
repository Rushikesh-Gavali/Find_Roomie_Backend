module.exports = {
    apps: [
      {
        name: 'find_rommies',
        script: 'app.js',  // Assuming app.js is your main entry point
        instances: 1,
        autorestart: true,
        watch: false,
        max_memory_restart: '1G',
        env: {
          NODE_ENV: 'production',
        },
        env_production: {
          NODE_ENV: 'production',
        },
      },
    ],
  };