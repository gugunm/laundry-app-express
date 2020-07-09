module.exports = {
  apps: [
    {
      name: 'laundry-app',
      script: './server.js',
      env: {
        PORT: 5000,
        NODE_ENV: 'development',
      },
      env_production: {
        PORT: 5000,
        NODE_ENV: 'production',
      },
    },
  ],
};
