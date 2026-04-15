module.exports = {
  apps: [
    {
      name: "Zigma",
      // Sesuaikan dengan letak file hasil build (biasanya di folder build atau dist)
      script: "./build/index.js", 
      cwd: "/www/wwwroot/MultiplayerGameQuiz/server",
      instances: 1, // Wajib 1 untuk Colyseus agar state room tidak pecah
      exec_mode: "fork",
      env: {
        NODE_ENV: "production",
        PORT: 2567
      }
    }
  ]
};