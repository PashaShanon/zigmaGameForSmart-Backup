module.exports = {
  apps: [
    {
      name: "multiplayer-backend", // Nama unik agar tidak double
      script: "index.js",          // File utama server kamu
      cwd: "/www/wwwroot/MultiplayerGameQuiz/server", // Lokasi eksekusi
      instances: 1,                // Cukup 1 untuk Socket.io agar koneksi stabil
      exec_mode: "fork",           // Multiplayer biasanya lebih aman pakai fork
      env: {
        NODE_ENV: "production",
        PORT: 2567                 // Pastikan port ini tidak dipakai proyek lain
      }
    }
  ]
};