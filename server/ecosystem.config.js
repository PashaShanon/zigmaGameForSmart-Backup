module.exports = {
  apps: [
    {
      name: "Zigma",
      script: "./build/server/src/server.js",
      cwd: "/www/wwwroot/MultiplayerGameQuiz/server",

      // WAJIB fork mode + 1 instance untuk Colyseus tanpa Redis
      instances: 1,
      exec_mode: "fork",

      autorestart: true,
      watch: false,
      max_memory_restart: "1G",

      env: {
        NODE_ENV: "production",
        PORT: 2567
      },

      // Logging
      error_file: "./logs/pm2-error.log",
      out_file: "./logs/pm2-out.log",
      log_date_format: "YYYY-MM-DD HH:mm Z",
      merge_logs: true,

      // Graceful shutdown
      kill_timeout: 3000,
      wait_ready: true,
      listen_timeout: 10000
    }
  ]
};
