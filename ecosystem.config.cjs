module.exports = {
  apps: [
    {
      name: 'growthos',
      script: 'npx',
      args: 'wrangler pages dev dist --local --ip 0.0.0.0 --port 3001',
      env: { NODE_ENV: 'development', PORT: 3000 },
      watch: false,
      instances: 1,
      exec_mode: 'fork'
    }
  ]
}
