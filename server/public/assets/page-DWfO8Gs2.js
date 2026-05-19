import{_ as h,O as g,R as b,A as p,T as d,i as r,C as S,H as P,g as R}from"./index-B23M_BZW.js";class T{constructor(){this.isHost=!1,this.mySessionId="",this.isGameStarting=!1,this.isManuallyLeaving=!1,this.isPageUnloading=()=>!1,this.countdownInterval=null,this.waitingUI=null,this.playerGridEl=null,this.playerCountEl=null,this.startBtn=null,this.waitingMsg=null,this.nameInput=null,this.roomListEl=null,this.hostIndicatorEl=null,this.backBtn=null,this.characterPopup=null,this.characterPreviewEl=null,this.waitingSpawnerInterval=null}async init(t){t.room&&(this.room=t.room,this.mySessionId=this.room.sessionId),this.isHost=t.isHost!==void 0?t.isHost:!1;let e=!1;if(window.addEventListener("beforeunload",()=>{e=!0}),this.isPageUnloading=()=>e,t.isRestore&&!this.room&&t.client&&await this.restoreRoom(t.client),!this.room){console.error("[PlayerWaitingRoomManager] Failed to initialize/restore room. Aborting start.");return}this.start()}async restoreRoom(t){const e=localStorage.getItem("currentReconnectionToken");if(!e){console.warn("Cannot restore player room: No reconnection token saved."),this.cleanupAndGoLobby();return}try{console.log("Player reconnecting with token..."),this.room=await t.reconnect(e),console.log("Player reconnected!",this.room),this.mySessionId=this.room.sessionId,localStorage.setItem("currentReconnectionToken",this.room.reconnectionToken),this.setupRoomListeners()}catch(i){console.warn("Player reconnection failed, attempting fallback join:",i);const o=localStorage.getItem("currentRoomId");if(o)try{console.log(`[PlayerLobby] 🔄 Attempting fresh join to room: ${o}`);const a=JSON.parse(localStorage.getItem("game_user_profile")||"{}"),n=a.nickname||a.fullname||a.username||"Player",s=localStorage.getItem("player_hair_id");this.room=await t.joinById(o,{name:n,userId:a.id,avatarUrl:a.avatar_url||"",hairId:s?parseInt(s):void 0}),console.log("[PlayerLobby] ✅ Re-joined successfully via fallback!"),this.mySessionId=this.room.sessionId,localStorage.setItem("currentReconnectionToken",this.room.reconnectionToken),this.setupRoomListeners();return}catch(a){console.error("[PlayerLobby] ❌ Fallback join also failed:",a)}localStorage.removeItem("currentRoomId"),localStorage.removeItem("currentSessionId"),localStorage.removeItem("currentReconnectionToken"),this.cleanupAndGoLobby()}}startGameEngine(t,e){h(()=>import("./index-B23M_BZW.js").then(i=>i.e),[]).then(i=>{i.initializeGame(t,e)}).catch(i=>{console.error("Failed to load game engine:",i),window.location.href="/"})}startManager(t,e){t==="LobbyManager"&&h(()=>import("./index-B23M_BZW.js").then(i=>i.p),[]).then(i=>{new i.LobbyManager().init(e)})}cleanupAndGoLobby(){var e;this.waitingUI&&this.waitingUI.classList.add("hidden");const t=document.getElementById("waiting-ui");t&&t.classList.add("hidden"),(e=document.getElementById("exit-confirm-modal"))==null||e.remove(),g.disable(),b.navigate("/"),this.startManager("LobbyManager")}setupRoomListeners(){this.room.state.listen("hostId",t=>{t===this.mySessionId&&this.startGameEngine("HostWaitingRoomScene",{room:this.room,isHost:!0}),this.updateUILayout()}),this.room.state.listen("isMusicEnabled",t=>{console.log(`[PlayerLobby] 🏠 Room Music Enabled: ${t}`),p.getInstance().setRoomMute(!t)}),this.room.state.isMusicEnabled!==void 0&&p.getInstance().setRoomMute(!this.room.state.isMusicEnabled),this.room.state.players.onAdd((t,e)=>{this.updateAll(),t.listen("name",()=>this.updateAll()),t.listen("hairId",()=>this.updateAll())}),this.room.state.players.onRemove(()=>this.updateAll()),this.room.onLeave(async t=>{if(console.log(`[PlayerLobby] Room connection lost (code: ${t}). isManuallyLeaving: ${this.isManuallyLeaving}`),!(t===1e3||this.isManuallyLeaving||this.isPageUnloading()||this.isGameStarting)){d.showWaiting(r.t("game.reconnecting")||"Koneksi terputus, menghubungkan kembali...",0);try{const e=window.colyseusClient,i=localStorage.getItem("currentReconnectionToken");if(e&&i){console.log("[PlayerLobby] Attempting to reconnect...");const o=await e.reconnect(i);console.log("[PlayerLobby] Reconnected successfully!"),this.room=o,localStorage.setItem("currentReconnectionToken",o.reconnectionToken),this.setupRoomListeners(),this.updateAll(),this.updateUILayout(),d.close(()=>{});return}}catch(e){console.error("[PlayerLobby] Reconnection failed:",e)}this.cleanupAndGoLobby()}}),this.room.onMessage("gameStarted",()=>{this.handleGameStart()}),this.room.onMessage("kicked",t=>{this.leaveRoom()}),this.room.onMessage("hostLeft",()=>{this.showHostLeftModal()}),this.room.onMessage("playerLeft",()=>{this.updateAll()})}start(){document.title="Waiting Room | Zigma",window.addEventListener("languageChanged",()=>{this.backBtn&&(this.backBtn.innerText=r.t("player_lobby.exit"));const i=document.getElementById("player-choose-char-btn");i&&(i.innerText=r.t("player_lobby.choose_character"));const o=document.getElementById("exit-confirm-title");o&&(o.innerHTML=r.t("player_lobby.dialog_exit_title"));const a=document.getElementById("exit-confirm-desc");a&&(a.innerHTML=r.t("player_lobby.dialog_exit_desc"));const n=document.getElementById("exit-cancel-btn");n&&(n.innerText=r.t("player_lobby.dialog_exit_cancel"));const s=document.getElementById("exit-confirm-btn");s&&(s.innerText=r.t("player_lobby.dialog_exit_confirm")),this.updatePlayerGrid()}),this.waitingUI=document.getElementById("waiting-ui");const t=document.getElementById("lobby-ui");t&&t.classList.add("hidden"),this.waitingUI&&(this.waitingUI.classList.remove("hidden"),this.setupPlayerUI()),this.playerGridEl=document.getElementById("player-grid"),this.playerCountEl=document.getElementById("player-count-value"),this.nameInput=document.getElementById("header-player-name"),this.backBtn=document.getElementById("player-back-btn"),this.backBtn&&(this.backBtn.onclick=()=>{this.showExitConfirm()});const e=document.getElementById("player-choose-char-btn");e&&(e.onclick=()=>{var o;const i=this.room.state.players.get(this.mySessionId);(o=this.characterPopup)==null||o.show((i==null?void 0:i.hairId)||0)}),this.room&&(this.setupRoomListeners(),this.startGameEngine("PreloadScene",{room:this.room})),this.characterPopup=new S(P,i=>{this.room&&this.room.send("updateHair",{hairId:i}),localStorage.setItem("player_hair_id",i.toString())},()=>{}),this.updateAll(),this.updateUILayout(),this.room&&(this.room.state.listen("isPreparing",i=>{i&&d.showWaiting(r.t("host_lobby.preparing")||"PREPARING GAME...",0)}),this.room.state.listen("countdownEndTime",i=>{if(i>0){this.countdownInterval&&clearInterval(this.countdownInterval),p.getInstance().stopBGM(),p.getInstance().playCountdownSFX();const o=()=>{const a=Date.now(),n=i-a,s=Math.max(0,Math.ceil(n/1e3));s>0?(d.ensureClosed(),d.setCountdownText(s.toString())):(this.countdownInterval&&(clearInterval(this.countdownInterval),this.countdownInterval=null),d.setCountdownText("GO!"),setTimeout(()=>{this.handleGameStart()},100))};o(),this.countdownInterval=setInterval(o,250)}else this.countdownInterval&&(clearInterval(this.countdownInterval),this.countdownInterval=null)}),this.room.state.listen("isGameStarted",i=>{i&&this.handleGameStart()}),g.requireLandscape())}handleGameStart(){this.isGameStarting||(this.isGameStarting=!0,this.countdownInterval&&(clearInterval(this.countdownInterval),this.countdownInterval=null),d.ensureClosed(),this.waitingUI&&this.waitingUI.classList.add("hidden"),b.navigate("/game"),this.startGameEngine("GameScene",{room:this.room}))}setupPlayerUI(){if(!this.waitingUI)return;const t="player-waiting-room-styles";if(!document.getElementById(t)){const a=document.createElement("style");a.id=t,a.innerHTML=`
                .player-content-box {
                    background: #2d5a27;
                    border: none;
                    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
                    border-radius: 20px;
                    width: 95%;
                    max-width: 1100px;
                    height: auto;
                    min-height: 220px;
                    max-height: 520px;
                    position: relative;
                    padding: 25px;
                    display: flex;
                    flex-direction: column;
                    margin-top: 2px;
                }
                .name-tooltip::after {
                    scrollbar-width: none !important;
                    -ms-overflow-style: none !important;
                }
                .custom-scrollbar::-webkit-scrollbar {
                    display: none !important;
                }
                .player-header-section {
                    display: flex;
                    align-items: center;
                    gap: 15px;
                    margin-bottom: 20px;
                    padding-bottom: 15px;
                    border-bottom: 1px solid rgba(255, 255, 255, 0.05);
                }
                /* Red Exit Button Style */
                .btn-exit-standard {
                    padding: 0 30px;
                    height: 52px;
                    background: #ef4444; /* red-500 */
                    border-radius: 12px;
                    color: white;
                    font-family: 'Retro Gaming';
                    text-transform: uppercase;
                    font-size: 11px;
                    border: none;
                    border-bottom: 4px solid #b91c1c; /* red-700 */
                    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
                    transition: all 0.1s;
                    cursor: pointer;
                }
                .btn-exit-standard:hover {
                    filter: brightness(1.1);
                }
                .btn-exit-standard:active {
                    border-bottom-width: 0;
                    transform: translateY(4px);
                }
                .player-count-box {
                    background: transparent;
                    border: 2px solid #FFFFFF;
                    border-radius: 10px;
                    padding: 8px 12px;
                    display: flex;
                    align-items: center;
                    gap: 8px;
                }
                .player-count-value {
                    color: #FFFFFF;
                    font-family: 'Retro Gaming';
                    font-size: 16px;
                }
                .material-symbols-outlined {
                    font-variation-settings: 'FILL' 1, 'wght' 400, 'GRAD' 0, 'opsz' 24;
                }
                .neon-title-standard {
                    font-family: 'Retro Gaming';
                    font-size: 38px;
                    color: #00ff88;
                    text-shadow: 0 0 15px rgba(0, 255, 136, 0.4), 3px 3px 0px #000;
                    text-transform: uppercase;
                    letter-spacing: 4px;
                }
                .player-card-standard {
                    background: #6CC452;
                    border: none;
                    border-radius: 16px;
                    padding: 8px;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    gap: 0px;
                    position: relative;
                    transition: all 0.2s ease;
                    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
                    min-height: 140px;
                }
                .player-card-active {
                    /* No border as requested, maybe a subtle scale or shadow if needed, but keeping it simple for now */
                    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
                }
                .pill-you {
                    background: #FFFFFF;
                    color: #6CC452;
                    font-family: 'Retro Gaming';
                    font-size: 10px;
                    padding: 6px 20px;
                    border-radius: 100px;
                    font-weight: bold;
                    white-space: nowrap;
                    text-transform: uppercase;
                    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
                }
                .standard-pixel-btn {
                    height: 52px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    cursor: pointer;
                    font-family: 'Retro Gaming';
                    text-transform: uppercase;
                    transition: all 0.1s;
                }
                .standard-pixel-btn:active {
                    border-bottom-width: 0;
                    transform: translateY(4px);
                }
                .btn-choose-char-green {
                    padding: 0 40px;
                    background: #336B23;
                    border-radius: 12px;
                    color: white;
                    font-family: 'Retro Gaming';
                    text-transform: uppercase;
                    font-size: 11px;
                    border: none;
                    border-bottom: 4px solid #1F4514;
                    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
                }
                .btn-choose-char-green:active {
                    box-shadow: none;
                }
                @keyframes play-idle {
                    from { background-position: 0 0; }
                    to { background-position: -864px 0; }
                }

                /* Responsive Additions */
                .logo-tl {
                    position: absolute;
                    top: -30px;
                    left: -40px;
                    width: 16rem; /* 256px (w-64) */
                }
                .logo-tr {
                    position: absolute;
                    top: -45px;
                    right: -15px;
                    width: 20rem; /* 320px (w-80) */
                }
                .player-grid-responsive {
                    display: grid;
                    grid-template-columns: repeat(auto-fill, minmax(148px, 1fr));
                    gap: 12px;
                    padding: 10px;
                    width: 100%;
                    justify-content: center;
                }
                .player-card-wrapper {
                    aspect-ratio: 1 / 1.1;
                    width: 100%;
                    max-width: 148px;
                    margin: 0 auto;
                }
                
                @media (max-width: 932px) and (orientation: landscape) {
                    .logo-tl {
                        top: -10px !important;
                        left: -15px !important;
                        width: 8rem !important;
                    }
                    .logo-tr {
                        top: -15px !important;
                        right: -5px !important;
                        width: 10rem !important;
                    }
                    .player-content-box {
                        margin-top: 10px !important;
                        padding: 10px !important;
                        min-height: 120px !important;
                        max-height: 55vh !important;
                        margin-bottom: 50px !important;
                    }
                    .player-header-section {
                        margin-bottom: 10px !important;
                        padding-bottom: 8px !important;
                    }
                    .pt-16 {
                        padding-top: 2rem !important;
                    }
                }
                
                @media (max-width: 768px) {
                    .logo-tl {
                        top: -15px;
                        left: -20px;
                        width: 9rem;
                    }
                    .logo-tr {
                        top: -20px;
                        right: -5px;
                        width: 11rem;
                    }
                    .player-content-box {
                        margin-top: 20px;
                        padding: 15px;
                        min-height: 160px;
                        flex: 1;
                        max-height: calc(100vh - 160px);
                        margin-bottom: 70px;
                    }
                    .fixed.bottom-10 {
                        bottom: 1.2rem !important;
                    }
                    .btn-exit-standard {
                        padding: 0 16px;
                        height: 40px;
                        font-size: 10px;
                    }
                    .btn-choose-char-green {
                        padding: 0 16px;
                        height: 40px;
                        font-size: 10px;
                    }
                    .player-grid-responsive {
                        grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
                        gap: 8px;
                        padding: 5px;
                    }
                    .player-card-wrapper {
                        max-width: 100%;
                    }
                }

                /* Tooltip Styles */
                .player-name-container {
                    position: relative;
                    cursor: pointer;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    width: 100%;
                }
                .player-name-tooltip {
                    position: fixed;
                    top: 0;
                    left: 0;
                    transform: translateX(-50%) translateY(0);
                    background: #1a1a2e;
                    color: white;
                    padding: 8px 12px;
                    border-radius: 8px;
                    font-size: 10px;
                    font-family: 'Press Start 2P', cursive;
                    white-space: nowrap;
                    opacity: 0;
                    visibility: hidden;
                    transition: opacity 0.2s cubic-bezier(0.4, 0, 0.2, 1), visibility 0.2s cubic-bezier(0.4, 0, 0.2, 1), transform 0.2s cubic-bezier(0.4, 0, 0.2, 1);
                    border: 2px solid #6CC452;
                    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.5);
                    pointer-events: none;
                    z-index: 999999;
                    margin-top: 0;
                }
                .player-name-container .player-name-tooltip.visible {
                    opacity: 1 !important;
                    visibility: visible !important;
                    transform: translateX(-50%) translateY(15px) !important;
                }
                .player-name-tooltip::after {
                    content: '';
                    position: absolute;
                    bottom: 100%;
                    left: 50%;
                    transform: translateX(-50%);
                    border-width: 6px;
                    border-style: solid;
                    border-color: transparent transparent #6CC452 transparent;
                }
            `,document.head.appendChild(a)}this.waitingUI.innerHTML=`
            <!-- Full-Screen Background — same as home page -->
            <div class="absolute inset-0" style="background: linear-gradient(180deg, #6CC452 0%, #478D47 100%);"></div>

            <!-- Pixel-art Background Decorations -->
            <div class="absolute inset-0 z-0 pointer-events-none overflow-hidden">
                <!-- Subtle pixel grid pattern -->
                <div class="absolute inset-0 opacity-[0.06]" style="background-image: radial-gradient(#2d5a30 1px, transparent 1px); background-size: 24px 24px;"></div>

                <!-- L1: Back Layer (Small/Medium, Slow) -->
                <div class="absolute top-[10%] opacity-20 animate-[drift_80s_linear_infinite]" style="transform: scale(1.0); left: -10%;">
                    <div class="relative w-10 h-3 bg-white">
                        <div class="absolute -top-1 left-2 w-3 h-1 bg-white"></div>
                    </div>
                </div>
                <div class="absolute top-[45%] opacity-15 animate-[drift_95s_linear_infinite_reverse]" style="transform: scale(0.8); left: 80%;">
                    <div class="relative w-12 h-4 bg-[#D3EE98]">
                        <div class="absolute -top-2 left-3 w-4 h-2 bg-[#D3EE98]"></div>
                    </div>
                </div>
                <div class="absolute top-[15%] opacity-15 animate-[drift_110s_linear_infinite]" style="transform: scale(1.2); left: 40%;">
                    <div class="relative w-14 h-4 bg-white">
                        <div class="absolute -top-2 left-4 w-5 h-2 bg-white"></div>
                    </div>
                </div>

                <!-- L2: Mid Layer (Medium) -->
                <div class="absolute top-[25%] opacity-40 animate-[drift_45s_linear_infinite]" style="transform: scale(1.8); left: 15%;">
                    <div class="relative w-16 h-5 bg-[#D3EE98]">
                        <div class="absolute -top-3 left-4 w-6 h-3 bg-[#D3EE98]"></div>
                        <div class="absolute -top-5 left-8 w-4 h-5 bg-[#D3EE98]"></div>
                    </div>
                </div>
                <div class="absolute top-[65%] opacity-35 animate-[drift_55s_linear_infinite_reverse]" style="transform: scale(1.5); left: 60%;">
                    <div class="relative w-14 h-4 bg-white">
                        <div class="absolute -top-2 left-4 w-5 h-2 bg-white"></div>
                        <div class="absolute -top-4 left-7 w-3 h-4 bg-white"></div>
                    </div>
                </div>
                <div class="absolute top-[5%] opacity-25 animate-[drift_70s_linear_infinite]" style="transform: scale(1.7); left: 75%;">
                    <div class="relative w-16 h-5 bg-[#D3EE98]">
                        <div class="absolute -top-3 left-5 w-6 h-3 bg-[#D3EE98]"></div>
                    </div>
                </div>

                <!-- L3: Front Layer (Large, Faster) -->
                <div class="absolute top-[40%] opacity-30 animate-[drift_35s_linear_infinite]" style="transform: scale(2.5); left: -20%;">
                    <div class="relative w-12 h-4 bg-[#FEFF9F]">
                        <div class="absolute -top-2 left-2 w-4 h-2 bg-[#FEFF9F]"></div>
                        <div class="absolute -top-4 left-5 w-4 h-4 bg-[#FEFF9F]"></div>
                    </div>
                </div>
                <div class="absolute top-[75%] opacity-25 animate-[drift_40s_linear_infinite_reverse]" style="transform: scale(2.2); left: 40%;">
                    <div class="relative w-18 h-6 bg-white">
                        <div class="absolute -top-3 left-5 w-7 h-3 bg-white"></div>
                        <div class="absolute -top-6 left-10 w-5 h-6 bg-white"></div>
                    </div>
                </div>
                <div class="absolute top-[50%] opacity-20 animate-[drift_30s_linear_infinite]" style="transform: scale(3.0); left: 10%;">
                    <div class="relative w-14 h-4 bg-[#FEFF9F]">
                        <div class="absolute -top-2 left-4 w-5 h-2 bg-[#FEFF9F]"></div>
                    </div>
                </div>

                <!-- Floating Particles -->
                <div class="firefly !bg-[#FEFF9F] !shadow-[0_0_15px_rgba(254,255,159,0.9)]" style="top: 25%; left: 15%; animation-delay: 0s;"></div>
                <div class="firefly !bg-white !shadow-[0_0_15px_rgba(255,255,255,0.8)]" style="top: 65%; left: 80%; animation-delay: 1.5s;"></div>
                <div class="firefly !bg-[#D3EE98] !shadow-[0_0_15px_rgba(211,238,152,0.9)]" style="top: 45%; left: 45%; animation-delay: 3s;"></div>
                <div class="firefly !bg-[#FEFF9F] !shadow-[0_0_15px_rgba(254,255,159,0.9)]" style="top: 85%; left: 20%; animation-delay: 4.5s;"></div>
                <div class="firefly !bg-white !shadow-[0_0_15px_rgba(255,255,255,0.8)]" style="top: 15%; left: 70%; animation-delay: 6s;"></div>
            </div>

            <!-- Walking Characters Container -->
            <div id="player-waiting-characters-container" class="absolute inset-0 z-0 overflow-hidden pointer-events-none"></div>
            
            <!-- LOGO ZIGMA: Tengah atas di mobile, Kiri atas di desktop -->
            <img src="/logo/Zigma-logo-fix.webp" id="player-logo-zigma"
                class="z-20 object-contain" style="position:absolute; top:0px; left:50%; transform:translateX(-50%); width:10rem;" />
            
            <!-- LOGO GAME FOR SMART: Sembunyi di mobile, Kanan atas di desktop -->
            <img src="/logo/gameforsmart-logo-fix.webp" id="player-logo-gfs"
                class="z-20 object-contain" style="position:absolute; display:none;" />

            <div class="relative z-10 flex flex-col items-center justify-start w-full h-screen p-4 md:pt-20 pt-16 overflow-hidden">


                <!-- Main Content Box (Host Style Container) -->
                <div class="player-content-box">
                    <div class="player-header-section">
                        <div class="player-count-box">
                            <span class="material-symbols-outlined text-white text-xl">person</span>
                            <span id="player-count-value" class="player-count-value">1</span>
                        </div>
                    </div>

                    <!-- Player Grid -->
                    <div id="player-grid" class="flex-1 overflow-y-auto custom-scrollbar px-2 player-grid-responsive">
                        <!-- Player items injected here -->
                    </div>
                </div>
            </div>

            <!-- Sticky Bottom Buttons -->
            <div class="fixed bottom-10 left-1/2 -translate-x-1/2 flex items-center gap-4 z-30 w-[90%] md:w-auto justify-center">

                <!-- EXIT Button (Red Host Style) -->
                <button id="player-back-btn" class="standard-pixel-btn btn-exit-standard">
                    ${r.t("player_lobby.exit")}
                </button>

                <!-- Pill Choose Character (Host Start Button Style) -->
                <button id="player-choose-char-btn" class="pixel-text-outline standard-pixel-btn btn-choose-char-green">
                    ${r.t("player_lobby.choose_character")}
                </button>
            </div>
        `;const e=document.getElementById("player-logo-zigma"),i=document.getElementById("player-logo-gfs"),o=()=>{const a=window.innerWidth>=768;e&&(a?(e.style.top="-30px",e.style.left="-40px",e.style.transform="none",e.style.width="16rem"):(e.style.top="0px",e.style.left="50%",e.style.transform="translateX(-50%)",e.style.width="10rem")),i&&(a?(i.style.display="block",i.style.top="-45px",i.style.right="-15px",i.style.width="20rem"):i.style.display="none")};o(),window.addEventListener("resize",o),this.startWaitingCharacterSpawner("player-waiting-characters-container")}updateCharacterPreview(t){const e=document.getElementById("character-preview-box");if(!e)return;e.innerHTML="";const i=document.createElement("div");i.className='absolute inset-0 bg-[url("/assets/bg_pattern.png")] opacity-20',e.appendChild(i);const o=document.createElement("div");o.style.backgroundImage="url('/assets/base_idle_strip9.png')",o.style.width="96px",o.style.height="64px",o.style.backgroundSize="864px 64px",o.style.imageRendering="pixelated",o.style.position="absolute",o.style.top="50%",o.style.left="50%",o.style.transform="translate(-50%, -50%) scale(5)",o.style.animation="play-idle 1s steps(9) infinite",e.appendChild(o);const a=document.createElement("div");a.style.backgroundImage="url('/assets/tools_idle_strip9.png')",a.style.width="96px",a.style.height="64px",a.style.backgroundSize="864px 64px",a.style.imageRendering="pixelated",a.style.position="absolute",a.style.top="50%",a.style.left="50%",a.style.transform="translate(-50%, -50%) scale(5)",a.style.animation="play-idle 1s steps(9) infinite",e.appendChild(a),t>0&&h(async()=>{const{getHairById:n}=await import("./index-B23M_BZW.js").then(s=>s.d);return{getHairById:n}},[]).then(({getHairById:n})=>{const s=n(t);if(s){const l=document.createElement("div");l.style.backgroundImage=`url('/assets/${s.idleKey}_strip9.png')`,l.style.width="96px",l.style.height="64px",l.style.backgroundSize="864px 64px",l.style.imageRendering="pixelated",l.style.position="absolute",l.style.top="50%",l.style.left="50%",l.style.transform="translate(-50%, -50%) scale(5)",l.style.animation="play-idle 1s steps(9) infinite",e.appendChild(l)}})}showExitConfirm(){var e,i,o;(e=document.getElementById("exit-confirm-modal"))==null||e.remove();const t=document.createElement("div");t.id="exit-confirm-modal",t.style.cssText=`
            position: fixed; inset: 0; z-index: 9999;
            background: rgba(0,0,0,0.75);
            display: flex; align-items: center; justify-content: center;
            animation: fadeIn 0.15s ease;
        `,t.innerHTML=`
            <style>
                @keyframes popIn {
                    from { transform: scale(0.85); opacity: 0; }
                    to   { transform: scale(1);    opacity: 1; }
                }
                #exit-confirm-box {
                    animation: popIn 0.2s cubic-bezier(.34,1.56,.64,1);
                    background: #1a1a2e;
                    border: 3px solid #ef4444;
                    border-radius: 16px;
                    box-shadow: 0 0 40px rgba(239,68,68,0.3), 0 20px 60px rgba(0,0,0,0.8);
                    padding: 36px 40px;
                    text-align: center;
                    min-width: 320px;
                    max-width: 90vw;
                }
                #exit-confirm-box h2 {
                    font-family: 'Press Start 2P', monospace;
                    font-size: 14px;
                    color: #ef4444;
                    margin-bottom: 12px;
                    line-height: 1.6;
                }
                #exit-confirm-box p {
                    font-family: 'Press Start 2P', monospace;
                    font-size: 9px;
                    color: rgba(255,255,255,0.6);
                    margin-bottom: 28px;
                    line-height: 1.8;
                }
                .exit-btn-row {
                    display: flex;
                    gap: 12px;
                    justify-content: center;
                }
                .btn-cancel-exit {
                    font-family: 'Press Start 2P', monospace;
                    font-size: 9px;
                    padding: 12px 24px;
                    background: rgba(255,255,255,0.08);
                    border: 2px solid rgba(255,255,255,0.15);
                    border-radius: 10px;
                    color: white;
                    cursor: pointer;
                    transition: all 0.15s;
                }
                .btn-cancel-exit:hover { background: rgba(255,255,255,0.15); }
                .btn-confirm-exit {
                    font-family: 'Press Start 2P', monospace;
                    font-size: 9px;
                    padding: 12px 24px;
                    background: #ef4444;
                    border: 2px solid #b91c1c;
                    border-radius: 10px;
                    color: white;
                    cursor: pointer;
                    transition: all 0.15s;
                    border-bottom-width: 4px;
                }
                .btn-confirm-exit:hover { filter: brightness(1.15); }
                .btn-confirm-exit:active { border-bottom-width: 2px; transform: translateY(2px); }
            </style>
            <div id="exit-confirm-box" ${r.getLanguage()==="ar"?'dir="rtl"':""}>
                <h2 id="exit-confirm-title">${r.t("player_lobby.dialog_exit_title")}</h2>
                <p id="exit-confirm-desc">${r.t("player_lobby.dialog_exit_desc")}</p>
                <div class="exit-btn-row">
                    <button class="btn-cancel-exit" id="exit-cancel-btn">${r.t("player_lobby.dialog_exit_cancel")}</button>
                    <button class="btn-confirm-exit" id="exit-confirm-btn">${r.t("player_lobby.dialog_exit_confirm")}</button>
                </div>
            </div>
        `,document.body.appendChild(t),t.addEventListener("click",a=>{a.target===t&&t.remove()}),(i=document.getElementById("exit-cancel-btn"))==null||i.addEventListener("click",()=>{t.remove()}),(o=document.getElementById("exit-confirm-btn"))==null||o.addEventListener("click",()=>{t.remove(),this.leaveRoom()})}showHostLeftModal(){var e,i;(e=document.getElementById("host-left-modal"))==null||e.remove();const t=document.createElement("div");t.id="host-left-modal",t.style.cssText=`
            position: fixed; inset: 0; z-index: 9999;
            background: rgba(0,0,0,0.75);
            display: flex; align-items: center; justify-content: center;
            animation: fadeIn 0.15s ease;
        `,t.innerHTML=`
            <style>
                @keyframes popIn {
                    from { transform: scale(0.85); opacity: 0; }
                    to   { transform: scale(1);    opacity: 1; }
                }
                #host-left-box {
                    animation: popIn 0.2s cubic-bezier(.34,1.56,.64,1);
                    background: #1a1a2e;
                    border: 3px solid #ef4444;
                    border-radius: 16px;
                    box-shadow: 0 0 40px rgba(239,68,68,0.3), 0 20px 60px rgba(0,0,0,0.8);
                    padding: 36px 40px;
                    text-align: center;
                    min-width: 320px;
                    max-width: 90vw;
                }
                #host-left-box .host-left-icon {
                    font-size: 48px !important;
                    color: #ef4444;
                    margin-bottom: 16px;
                    display: block;
                }
                #host-left-box h2 {
                    font-family: 'Retro Gaming', monospace;
                    font-size: 14px;
                    color: #ef4444;
                    margin-bottom: 12px;
                    line-height: 1.6;
                }
                #host-left-box p {
                    font-family: 'Retro Gaming', monospace;
                    font-size: 9px;
                    color: rgba(255,255,255,0.6);
                    margin-bottom: 28px;
                    line-height: 1.8;
                }
                .btn-ok-host-left {
                    font-family: 'Retro Gaming', monospace;
                    font-size: 9px;
                    padding: 12px 40px;
                    background: #ef4444;
                    border: 2px solid #b91c1c;
                    border-radius: 10px;
                    color: white;
                    cursor: pointer;
                    transition: all 0.15s;
                    border-bottom-width: 4px;
                }
                .btn-ok-host-left:hover { filter: brightness(1.15); }
                .btn-ok-host-left:active { border-bottom-width: 2px; transform: translateY(2px); }
            </style>
            <div id="host-left-box">
                <span class="material-symbols-outlined host-left-icon">warning</span>
                <h2>Host keluar dari room!</h2>
                <p>Room telah ditutup oleh host.</p>
                <button class="btn-ok-host-left" id="host-left-ok-btn">OK</button>
            </div>
        `,document.body.appendChild(t),(i=document.getElementById("host-left-ok-btn"))==null||i.addEventListener("click",()=>{t.remove(),this.leaveRoom()})}leaveRoom(){if(this.isManuallyLeaving=!0,console.log("[PlayerLobby] 🚪 Leaving room manually..."),localStorage.removeItem("currentRoomId"),localStorage.removeItem("currentSessionId"),localStorage.removeItem("currentReconnectionToken"),localStorage.removeItem("pendingJoinRoomCode"),this.room){const t=this.room;this.room=null;try{t.connection&&t.connection.isOpen&&(t.send("manualPlayerLeave"),console.log("[PlayerLobby] ✅ manualPlayerLeave signal sent"))}catch(e){console.warn("[PlayerLobby] ⚠️ manualPlayerLeave signal failed:",e)}try{t.connection&&t.connection.isOpen&&(t.leave(!0),console.log("[PlayerLobby] ✅ Room.leave(true) called"))}catch{}setTimeout(()=>{this.navigateToLobby()},100)}else this.navigateToLobby()}navigateToLobby(){console.log("[PlayerLobby] 🏠 Navigating back to lobby..."),this.waitingUI&&this.waitingUI.classList.add("hidden");const t=document.getElementById("waiting-ui");t&&t.classList.add("hidden"),this.waitingSpawnerInterval&&(clearInterval(this.waitingSpawnerInterval),this.waitingSpawnerInterval=null),this.countdownInterval&&(clearInterval(this.countdownInterval),this.countdownInterval=null),g.disable(),b.replace("/"),this.startManager("LobbyManager",{didExit:!0})}updateAll(){var e;if(!((e=this.room)!=null&&e.state))return;this.updatePlayerGrid();const t=this.room.state.players.get(this.mySessionId);t&&this.updateCharacterPreview(t.hairId||0)}updateUILayout(){var i;if(!((i=this.room)!=null&&i.state))return;const t=new Map;this.room.state.players.forEach((o,a)=>{if(o.isHost)return;const n=o.userId||a;t.has(n)||t.set(n,o)});const e=t.size;this.playerCountEl&&(this.playerCountEl.innerText=e.toString())}updateRoomList(){if(!this.roomListEl)return;const t=this.room.state.players.get(this.mySessionId),e=t?t.subRoomId:"";let i="";this.room.state.subRooms.forEach(o=>{const a=o.id===e,n=o.playerIds.length,s=n>=o.capacity,l=a?"border-primary bg-primary/10 shadow-[0_0_15px_rgba(0,255,85,0.1)]":"border-white/10 bg-black/40 hover:border-white/30",c=a?"text-primary":"text-white",I=s?"bg-white/10 text-white/30 cursor-not-allowed border-gray-600":a?"bg-primary text-black font-bold pixel-btn-green border-black":"bg-secondary text-black font-bold pixel-btn-blue border-black hover:brightness-110",_=a?r.t("host_lobby.joined"):s?r.t("host_lobby.full"):r.t("host_lobby.join"),k=this.isHost||s||a?"":`onclick="window.switchRoom('${o.id}')"`,E=this.isHost?"invisible":"";let m="",y=0;o.playerIds.forEach(u=>{var x,v,w;const f=(w=(v=(x=this.room)==null?void 0:x.state)==null?void 0:v.players)==null?void 0:w.get(u);if(f){const L=u===this.mySessionId?"text-primary":"text-white/70";m+=`
                        <div class="flex items-center gap-2 ${L} text-[10px] font-bold uppercase truncate">
                            <span class="material-symbols-outlined text-[10px] opacity-70">person</span>
                            ${f.name}
                        </div>`,y++}}),y===0&&(m=`<span class="text-[10px] text-white/30 italic pl-1">${r.t("host_lobby.empty")}</span>`),i+=`
                <div class="w-full max-w-[320px] border-2 ${l} p-4 rounded-xl transition-all duration-300 relative group">
                    <div class="flex justify-between items-center mb-3">
                        <span class="text-sm font-bold uppercase ${c} font-['Press_Start_2P'] tracking-tight">${o.id}</span>
                        <div class="px-2 py-1 bg-black/60 rounded text-[10px] font-bold text-white/80 border border-white/5">
                            ${n}/${o.capacity}
                        </div>
                    </div>
                    
                    <div class="space-y-1 mb-4 min-h-[40px]">
                        ${m}
                    </div>

                    <button ${k} class="w-full py-3 text-xs uppercase rounded-lg border-b-4 active:border-b-0 active:translate-y-1 transition-all ${I} font-['Press_Start_2P'] tracking-wide ${E}">
                        ${_}
                    </button>
                </div>
            `}),this.roomListEl.innerHTML=i,window.switchRoom=o=>{this.room.send("switchRoom",{roomId:o})}}updatePlayerGrid(){var o;if(!this.playerGridEl||!((o=this.room)!=null&&o.state))return;const t=new Map;this.room.state.players.forEach((a,n)=>{if(a.isHost)return;const s=a.userId||n;(!t.get(s)||n===this.mySessionId||this.isHost)&&t.set(s,{sessionId:n,name:a.name,hairId:a.hairId})});const e=Array.from(t.values());e.sort((a,n)=>a.sessionId===this.mySessionId?-1:n.sessionId===this.mySessionId?1:0),this.updateUILayout();let i="";e.forEach(a=>{const n=a.sessionId===this.mySessionId,s=n?"player-card-standard player-card-active":"player-card-standard",l=n?`<div class="absolute -bottom-3 left-1/2 -translate-x-1/2 pill-you">${r.t("player_lobby.you")}</div>`:"";i+=`
                <div class="${s} player-card-wrapper">
                    <!-- Character (Middle) -->
                    <div style="width: 80px; height: 80px; display: flex; align-items: center; justify-content: center; overflow: visible; margin-top: 5px;">
                         <div style="
                            position: relative;
                            width: 32px; height: 32px; 
                            transform: scale(3.5) translateY(4px);
                         ">
                            <div style="
                                position: absolute; inset: 0;
                                background-image: url('/assets/characters/Human/IDLE/base_idle_strip9.png');
                                background-repeat: no-repeat;
                                background-position: -32px -16px;
                                image-rendering: pixelated;
                            "></div>
                            <div style="
                                position: absolute; inset: 0;
                                background-image: url('/assets/characters/Human/IDLE/tools_idle_strip9.png');
                                background-repeat: no-repeat;
                                background-position: -32px -16px;
                                image-rendering: pixelated;
                            "></div>
                            ${(()=>{const c=R(a.hairId||0);return a.hairId>0&&c?`
                                        <div style="
                                            position: absolute; inset: 0;
                                            background-image: url('/assets/characters/Human/IDLE/${c.idleKey}_strip9.png');
                                            background-repeat: no-repeat;
                                            background-position: -32px -16px;
                                            image-rendering: pixelated;
                                        "></div>
                                    `:""})()}
                         </div>
                    </div>
                    
                    <!-- Player Name -->
                    <div class="player-name-container" style="text-align: center; width: 100%; margin-top: 4px; padding: 0 4px;">
                        <span class="player-name-truncated" data-fullname="${a.name||r.t("host_lobby.player_upper")}" style="font-size: 14px; color: #FFFFFF; font-family: 'Press Start 2P', cursive; text-transform: uppercase; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; display: block; width: 100%; ${n?"text-shadow: 0 0 8px rgba(255, 255, 255, 0.4);":""}">
                            ${(a.name||r.t("host_lobby.player_upper")).split(" ")[0]}
                        </span>
                        <div class="player-name-tooltip">
                            ${a.name||r.t("host_lobby.player_upper")}
                        </div>
                    </div>

                    ${l}
                </div>
            `}),this.playerGridEl.innerHTML=i,this.setupPlayerCardTooltips(),window.updatePlayerName=a=>{this.room.send("updateName",{name:a})}}setupPlayerCardTooltips(){document.querySelectorAll(".player-name-container").forEach(e=>{const i=e.querySelector(".player-name-truncated"),o=e.querySelector(".player-name-tooltip");if(!i||!o)return;const a=()=>{const n=i.getAttribute("data-fullname")||"";return i.scrollWidth>i.clientWidth||i.innerText.trim().toUpperCase()!==n.trim().toUpperCase()};e.addEventListener("mouseenter",n=>{const s=n;a()&&(o.style.left=`${s.clientX}px`,o.style.top=`${s.clientY}px`,o.classList.add("visible"))}),e.addEventListener("mousemove",n=>{const s=n;o.classList.contains("visible")&&(o.style.left=`${s.clientX}px`,o.style.top=`${s.clientY}px`)}),e.addEventListener("mouseleave",()=>{o.classList.remove("visible")})})}startWaitingCharacterSpawner(t){this.waitingSpawnerInterval&&(clearInterval(this.waitingSpawnerInterval),this.waitingSpawnerInterval=null);const e=document.getElementById(t);if(!e)return;const i=()=>{const o=e.querySelectorAll(".walking-char").length;if(o>=3)return;const a=o===0?.8:.4;Math.random()<a&&this.spawnWalkingCharacter(e)};i(),this.waitingSpawnerInterval=setInterval(i,5e3)}spawnWalkingCharacter(t){const e=document.createElement("div");e.className="walking-char";const i=Math.random()>.5,o=20+Math.random()*10;i?(e.style.animation=`base-walk-cycle 0.8s steps(8) infinite, walk-across-left ${o}s linear forwards`,e.style.transform="scale(-1, 1)"):(e.style.animation=`base-walk-cycle 0.8s steps(8) infinite, walk-across-right ${o}s linear forwards`,e.style.transform="scale(1, 1)"),t.appendChild(e),setTimeout(()=>{e.parentElement&&e.remove()},o*1e3+500)}}export{T as PlayerWaitingRoomManager};
