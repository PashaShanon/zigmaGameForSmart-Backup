const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/QuizData-DP5jU-j4.js","assets/index-BSkSUIA0.js"])))=>i.map(i=>d[i]);
import{a as T,G as w,i as r,T as u,O as k,l as $,R as I,_ as C,c as z,L as E}from"./index-BSkSUIA0.js";class L{static async createRoom(e,i){const{difficulty:o,questionCount:n,timer:l,quiz:s}=i;let p="map_newest_easy_nomor1.tmj";o==="sedang"&&(p="map_baru2.tmj"),o==="sulit"&&(p="map_baru3.tmj");const h=n===5?10:20,b=this.generateRoomCode(),t=T.getStoredProfile(),a=t?t.id:null;let c=[...s.questions||[]];c.sort(()=>Math.random()-.5),c=c.slice(0,n);const f=crypto.randomUUID(),m={roomCode:b,sessionId:f,difficulty:o,subject:s.category?s.category.toLowerCase():"umum",quizId:s.id,quizTitle:s.title,questions:c,map:p,questionCount:n,enemyCount:h,timer:l,isHost:!0,hostId:a,quizDetail:{title:s.title,category:s.category,language:s.language||"id",description:s.description,creator_avatar:s.creator_avatar||null,creator_username:s.creator_username||"kizuko"}};try{localStorage.setItem("currentRoomOptions",JSON.stringify(m));const d=await e.create("game_room",m);return console.log("Room created via RoomService!",d),localStorage.setItem("currentRoomId",d.id),localStorage.setItem("currentSessionId",d.sessionId),localStorage.setItem("currentReconnectionToken",d.reconnectionToken),localStorage.setItem("supabaseSessionId",f),{room:d,options:m}}catch(d){throw console.error("RoomService Flow Error:",d),d}}static generateRoomCode(){return Math.floor(1e5+Math.random()*9e5).toString()}}class S{static getGlobalStyles(){return`
            .podium-avatar { position: relative; display: flex; justify-content: center; align-items: center; overflow: hidden; font-family: 'Retro Gaming', monospace; background-color: #336B23; }
            .profile-img { width: 100%; height: 100%; object-fit: cover; border-radius: 50%; z-index: 2; image-rendering: auto; -webkit-font-smoothing: antialiased; }
            .initial-fallback { width: 100%; height: 100%; display: flex; align-items: center; justify-content: center; color: white; text-shadow: 1px 1px 0 #000, -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000; z-index: 1; -webkit-font-smoothing: antialiased; line-height: 1; }
            
            .logo-center { position: fixed; top: 25px; left: 0; right: 0; margin: 0 auto; width: 200px; z-index: 2000; pointer-events: none; display: none; }
            .logo-left { position: absolute; top: -30px; left: -40px; width: 280px; z-index: 20; pointer-events: none; }
            .logo-right { position: absolute; top: -45px; right: -15px; width: 320px; z-index: 20; pointer-events: none; }
            .lb-footer-mobile { display: none; }
            .desktop-floating-actions { display: none; }
            .nav-btn {
                pointer-events: auto; background: rgba(51, 107, 35, 0.9); border: 2px solid rgba(255, 255, 255, 0.2); border-radius: 16px;
                width: 64px; height: 64px; display: flex; align-items: center; justify-content: center; color: white; cursor: pointer; transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.3); backdrop-filter: blur(8px);
            }
            .nav-btn:hover { transform: translateY(-4px) scale(1.05); background: rgba(51, 107, 35, 1); border-color: #ffffff; box-shadow: 0 12px 40px 0 rgba(51, 107, 35, 0.4); }
            .nav-btn:active { transform: translateY(0) scale(0.95); }
            .nav-btn .material-symbols-outlined { font-size: 28px; color: white; }
            
            /* Glassmorphism Card */
            .glass-card {
                background: rgba(255, 255, 255, 0.95);
                backdrop-filter: blur(10px);
                -webkit-backdrop-filter: blur(10px);
                border: 1px solid rgba(255, 255, 255, 0.18);
                box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.2);
            }

            /* Shine Animation */
            .shine-effect {
                position: relative;
                overflow: hidden;
            }
            .shine-effect::after {
                content: '';
                position: absolute;
                top: -50%;
                left: -60%;
                width: 20%;
                height: 200%;
                background: rgba(255, 255, 255, 0.4);
                transform: rotate(30deg);
                animation: shine 4s infinite;
                z-index: 5;
            }
            @keyframes shine {
                0% { left: -60%; }
                15% { left: 120%; }
                100% { left: 120%; }
            }

            /* Glow Animation for 1st Place */
            .podium-glow-1st {
                position: absolute;
                inset: -10px;
                background: radial-gradient(circle, rgba(255, 215, 0, 0.4) 0%, transparent 70%);
                animation: pulse-glow 2s ease-in-out infinite;
                z-index: 10;
                pointer-events: none;
            }
            @keyframes pulse-glow {
                0%, 100% { opacity: 0.5; transform: scale(1); }
                50% { opacity: 1; transform: scale(1.1); }
            }

            .podium-crown {
                position: absolute;
                top: -45px;
                left: 50%;
                transform: translateX(-50%) rotate(-5deg);
                font-size: 52px;
                filter: drop-shadow(0 0 10px rgba(255, 215, 0, 0.8));
                z-index: 100;
                animation: crown-float 2.5s ease-in-out infinite;
            }
            @keyframes crown-float {
                0%, 100% { transform: translateX(-50%) rotate(-5deg) translateY(0); }
                50% { transform: translateX(-50%) rotate(5deg) translateY(-12px); }
            }

            /* Result Row Hover */
            .result-row {
                transition: all 0.2s ease;
                border-left: 4px solid transparent;
            }
            .result-row:hover {
                background: rgba(108, 196, 82, 0.1);
                border-left-color: #336B23;
                transform: translateX(4px);
            }

            @media (max-width: 768px) {
                .logo-left, .logo-right { display: none; }
                .logo-center { display: block; width: 8rem; top: 10px; }
                .lb-footer-mobile {
                    display: flex; position: fixed; bottom: 16px; left: 0; width: 100%; flex-direction: row; gap: 10px; padding: 0 16px; z-index: 100;
                }
                .nav-btn-wide {
                    flex: 1; pointer-events: auto; height: 50px; border-radius: 14px;
                    display: flex; align-items: center; justify-content: center; gap: 6px;
                    font-family: 'Retro Gaming', monospace; font-size: 10px; text-transform: uppercase;
                    border: none; cursor: pointer; transition: all 0.3s ease;
                    background: #336B23; color: white; border-bottom: 4px solid #1F4514;
                    box-shadow: 0 8px 16px rgba(0,0,0,0.2);
                }
                .nav-btn-wide:hover { transform: translateY(-2px); filter: brightness(110%); }
                .nav-btn-wide:active { transform: translateY(2px); border-bottom-width: 0; }
                .podium-crown { font-size: 40px; top: -35px; }
            }
            @media (min-width: 768px) {
                .desktop-floating-actions {
                    display: flex;
                }
            }
            .hide-scrollbar::-webkit-scrollbar { display: none; }
            .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }

            .lb-name-tooltip {
                position: fixed;
                pointer-events: none;
                z-index: 9999;
                padding: 12px 20px;
                background: rgba(45, 90, 39, 0.95);
                backdrop-filter: blur(4px);
                border: 2px solid #ffffff;
                color: #ffffff;
                font-family: 'Retro Gaming', monospace;
                font-size: 14px;
                border-radius: 16px;
                box-shadow: 0 15px 35px rgba(0,0,0,0.4);
                opacity: 0;
                transform: translateY(10px);
                transition: all 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275);
                max-width: 300px;
                word-wrap: break-word;
                display: none;
                text-transform: uppercase;
                text-align: center;
                line-height: 1.4;
            }
            .lb-name-tooltip.visible {
                opacity: 1 !important;
                transform: translateY(0) !important;
                display: block !important;
            }

            /* Confetti Particles */
            .confetti {
                position: absolute;
                width: 10px;
                height: 10px;
                background-color: #f00;
                z-index: 5;
                top: -10px;
                animation: confetti-fall 4s linear infinite;
                pointer-events: none;
            }
            @keyframes confetti-fall {
                0% { transform: translateY(0) rotate(0deg); opacity: 1; }
                100% { transform: translateY(100vh) rotate(720deg); opacity: 0; }
            }
        `}static generateHTML(e){const i=[e[0],e[1],e[2]],o=e,n=t=>{const a=Math.floor(t/1e3),c=Math.floor(a/60),f=a%60;return`${c}:${f.toString().padStart(2,"0")}`},l=t=>{if(!t)return"?";const a=t.trim();return a.length<=1?a.toUpperCase():a.substring(0,1).toUpperCase()+a.substring(1,2).toLowerCase()},s=t=>t&&(t.includes("googleusercontent.com")?t.replace(/=s\d+(-c)?/,"=s384-c"):t),h=[i[1],i[0],i[2]].map(t=>{if(!t)return'<div class="w-[100px] md:w-[150px]"></div>';const a=t.rank,c=a===1,f=a===2;let m="#cd7f32",d="w-24 md:w-36",g="h-16 md:h-24",x="w-12 h-12 md:w-16 md:h-16",v="linear-gradient(135deg, #A0522D 0%, #CD7F32 50%, #8B4513 100%)",y="🥉";return c?(m="#ffcc00",g="h-32 md:h-40",x="w-14 h-14 md:w-20 md:h-20",v="linear-gradient(135deg, #FFD700 0%, #FFCC00 50%, #B8860B 100%)",y="🥇"):f&&(m="#c0c0c0",g="h-24 md:h-32",v="linear-gradient(135deg, #E0E0E0 0%, #C0C0C0 50%, #708090 100%)",y="🥈"),`
                <div class="flex flex-col items-center relative z-20 group">
                    
                    ${c?'<div class="podium-crown">👑</div>':""}

                    <!-- Avatar directly above podium -->
                    <div class="${x} podium-avatar rounded-full border-4 flex items-center justify-center font-bold relative mb-4 z-30 transition-transform duration-300 group-hover:scale-110 group-hover:-translate-y-2" style="background-color: ${m}; border-color: #ffffff; box-shadow: 0 8px 20px rgba(0,0,0,0.3);">
                        ${t.avatarUrl?`
                            <img src="${s(t.avatarUrl)}" class="profile-img" alt="${t.name}" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';">
                            <div class="initial-fallback hidden text-3xl md:text-5xl">${l(t.name)}</div>
                        `:`
                            <div class="initial-fallback text-3xl md:text-5xl">${l(t.name)}</div>
                        `}
                        
                        <!-- Mini Name below Avatar (Optional, but helps since we removed the box) -->
                        <div class="absolute -bottom-6 left-1/2 -translate-x-1/2 w-32 text-center text-[10px] md:text-xs font-bold text-white uppercase truncate drop-shadow-[0_2_2_rgba(0,0,0,0.8)]" style="font-family: 'Retro Gaming', monospace;">
                            ${t.name.split(" ")[0]}
                        </div>
                    </div>

                    <!-- The literal podium block -->
                    <div class="flex z-20 ${d} ${g} border-x-[4px] border-t-[6px] border-b-0 flex-col items-center justify-center relative shadow-2xl transition-all duration-300 group-hover:brightness-105" 
                         style="border-color: rgba(255,255,255,0.1); border-top-color: rgba(0,0,0,0.3); background: ${v}; border-radius: 8px 8px 0 0;">
                        
                        <!-- Rank Number on Podium (Simplified) -->
                        <div class="text-4xl md:text-7xl font-bold relative z-10" style="font-family: 'Retro Gaming', monospace; color: white; text-shadow: 4px 4px 0 rgba(0,0,0,0.4);">
                            #${a}
                        </div>

                        <!-- Medal Emoji -->
                        <div class="absolute top-2 right-2 text-xl md:text-2xl filter drop-shadow(0 2px 4px rgba(0,0,0,0.3))">${y}</div>

                        <!-- SCORE BADGE -->
                        <div class="absolute bottom-[-12px] md:bottom-[-15px] px-3 py-1 bg-white border-2 border-black rounded-lg shadow-[0_4px_10px_rgba(0,0,0,0.3)] z-40 transform scale-90 md:scale-100">
                            <span class="text-black font-bold text-[10px] md:text-xs tracking-tight" style="font-family: 'Retro Gaming', monospace;">
                                ${Math.min(100,Math.round(t.score))} PTS
                            </span>
                        </div>
                    </div>
                </div>
            `}).join(""),b=o.map(t=>(t.hairId&&["bowlhair","curlyhair","longhair","mophair","shorthair","spikeyhair"][t.hairId-1],`
            <div class="grid grid-cols-[40px_1fr_60px_60px] md:grid-cols-[100px_1fr_150px_150px] p-4 text-gray-800 items-center border-b border-gray-100 hover:bg-[#F1F8E9]/50 transition-all duration-200 group font-['Retro_Gaming'] result-row" style="-webkit-font-smoothing: none;">
                <div class="text-center font-extrabold text-gray-400 group-hover:text-[#336B23] transition-colors text-sm md:text-2xl">${t.rank}</div>
                <div class="flex items-center gap-3 md:gap-5 pl-2">
                    <div class="flex w-10 h-10 md:w-14 md:h-14 rounded-full bg-gradient-to-br from-[#336B23] to-[#478D47] border-2 border-white shadow-md items-center justify-center font-bold text-sm group-hover:scale-110 transition-transform overflow-hidden relative podium-avatar">
                        ${t.avatarUrl?`
                            <img src="${s(t.avatarUrl)}" class="profile-img" alt="${t.name}" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';">
                            <div class="initial-fallback hidden text-xl md:text-2xl">${l(t.name)}</div>
                        `:`
                            <div class="initial-fallback text-xl md:text-2xl">${l(t.name)}</div>
                        `}
                    </div>
                    <div class="font-extrabold text-[11px] md:text-xl truncate max-w-[120px] md:max-w-[400px] py-1 uppercase tracking-tight" style="color: ${t.isIncomplete?"#ff4444":"#2D5A27"};">
                        ${t.name}
                    </div>
                </div>
                <div class="text-center text-[#478D47] font-black text-sm md:text-3xl tracking-tighter">${Math.min(100,Math.round(t.score))}</div>
                <div class="text-center text-gray-500 text-[10px] md:text-xl font-bold">
                    ${n(t.duration)}
                </div>
            </div>
        `)).join("");return`
            <div translate="no" class="notranslate fixed inset-0 w-full h-screen overflow-hidden text-white pointer-events-auto select-none" style="background: linear-gradient(180deg, #6CC452 0%, #478D47 100%);">
                
                ${w.getHTML("leaderboard")}

                <!-- Logos -->
                <img src="/logo/Zigma-logo-fix.webp" alt="Zigma Logo" class="logo-center" />
                <img src="/logo/Zigma-logo-fix.webp" alt="Zigma Logo" class="logo-left" />
                <img src="/logo/gameforsmart-logo-fix.webp" alt="GameForSmart Logo" class="logo-right" />

                <!-- MAIN CONTENT AREA: overflow-hidden for mobile to prevent scrollbars, auto for desktop -->
                <div class="relative z-10 w-full h-[100dvh] flex flex-col items-center pt-16 md:pt-16 pb-20 md:pb-12 px-4 overflow-hidden md:overflow-y-auto hide-scrollbar pointer-events-none">
                    


                    <!-- Podiums (Keep wrapper flex but adjust bottom margin for mobile) -->
                    <div class="flex items-end justify-center gap-2 md:gap-8 mb-4 md:mb-12 shrink-0">
                        ${h}
                    </div>

                    <!-- Leaderboard Table Card -->
                    ${o.length>0?`
                    <div class="w-full max-w-4xl glass-card border-[3px] border-[#336B23] rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.3)] overflow-hidden shrink-0 md:mb-24 flex flex-col flex-1 md:flex-none min-h-0 pointer-events-auto transition-all duration-500 hover:shadow-[0_30px_70px_rgba(0,0,0,0.4)]">
                        <!-- Header -->
                        <div class="bg-gradient-to-r from-[#336B23] via-[#478D47] to-[#336B23] border-b-[4px] border-[#1F4514] relative shrink-0 shine-effect">
                            <div class="grid grid-cols-[40px_1fr_60px_60px] md:grid-cols-[100px_1fr_150px_150px] p-4 md:p-6 font-black text-white uppercase tracking-widest text-xs md:text-xl font-['Retro_Gaming']" style="text-shadow: 3px 3px 0 rgba(0,0,0,0.4);">
                                <div id="hdr-lb-rank" class="text-center">${r.t("host_leaderboard.rank")}</div>
                                <div id="hdr-lb-player" class="pl-2">${r.t("host_leaderboard.player")}</div>
                                <div id="hdr-lb-score" class="text-center">${r.t("host_leaderboard.score")}</div>
                                <div id="hdr-lb-time" class="text-center">${r.t("host_leaderboard.time")}</div>
                            </div>
                        </div>
                        
                        <!-- List -->
                        <div class="flex flex-col overflow-y-auto hide-scrollbar flex-1 min-h-0 pb-6 md:pb-0 pointer-events-auto bg-white/80">
                            ${b}
                        </div>
                    </div>
                    `:""}
                </div>

                <!-- FLOATING ACTIONS (Left & Right) -->
                <div class="desktop-floating-actions fixed top-[40%] md:top-1/2 left-4 md:left-6 -translate-y-1/2 flex-col gap-4 z-50">
                    <button id="lb-home-btn" class="nav-btn" title="${r.t("host_leaderboard.title_home")}">
                        <span class="material-symbols-outlined">home</span>
                    </button>
                    <button id="lb-restart-btn" class="nav-btn" title="${r.t("host_leaderboard.title_restart")}">
                        <span class="material-symbols-outlined">restart_alt</span>
                    </button>
                </div>

                <div class="desktop-floating-actions fixed top-[40%] md:top-1/2 right-4 md:right-6 -translate-y-1/2 flex-col gap-4 z-50">
                    <button id="lb-stats-btn" class="nav-btn" title="${r.t("host_leaderboard.title_stats")}">
                        <span class="material-symbols-outlined">analytics</span>
                    </button>
                </div>

                <!-- MOBILE FOOTER ACTIONS -->
                <div class="lb-footer-mobile">
                    <button id="lb-home-btn-mobile" class="nav-btn-wide">
                        <span class="material-symbols-outlined text-[14px]">home</span><span id="txt-lb-home">${r.t("host_leaderboard.home")}</span>
                    </button>
                    <button id="lb-restart-btn-mobile" class="nav-btn-wide">
                        <span class="material-symbols-outlined text-[14px]">restart_alt</span><span id="txt-lb-restart">${r.t("host_leaderboard.restart")}</span>
                    </button>
                    <button id="lb-stats-btn-mobile" class="nav-btn-wide">
                        <span class="material-symbols-outlined text-[14px]">analytics</span><span id="txt-lb-stats">${r.t("host_leaderboard.stats")}</span>
                    </button>
                </div>
            </div>
        `}}class R{constructor(){this.rankings=[],this.sessionId=null,this.isHost=!0,this.tooltip=null,this.handleLangChange=()=>{const e=document.getElementById("hdr-lb-rank");e&&(e.innerText=r.t("host_leaderboard.rank"));const i=document.getElementById("hdr-lb-player");i&&(i.innerText=r.t("host_leaderboard.player"));const o=document.getElementById("hdr-lb-score");o&&(o.innerText=r.t("host_leaderboard.score"));const n=document.getElementById("hdr-lb-time");n&&(n.innerText=r.t("host_leaderboard.time"));const l=document.getElementById("lb-home-btn");l&&(l.title=r.t("host_leaderboard.title_home"));const s=document.getElementById("lb-restart-btn");s&&(s.title=r.t("host_leaderboard.title_restart"));const p=document.getElementById("lb-stats-btn");p&&(p.title=r.t("host_leaderboard.title_stats"));const h=document.getElementById("txt-lb-home");h&&(h.innerText=r.t("host_leaderboard.home"));const b=document.getElementById("txt-lb-restart");b&&(b.innerText=r.t("host_leaderboard.restart"));const t=document.getElementById("txt-lb-stats");t&&(t.innerText=r.t("host_leaderboard.stats"))}}start(e){document.title="Leaderboard | Zigma",this.initializeClient(),u.ensureClosed(),this.createTooltip(),k.requirePortrait(r.t("host_leaderboard.portrait_req_title"),r.t("host_leaderboard.portrait_req_desc")),window.addEventListener("languageChanged",this.handleLangChange);let i=e==null?void 0:e.rankings;if(!i||i.length===0){const o=localStorage.getItem("hostLeaderboardData");if(o)try{i=JSON.parse(o)}catch{}}else localStorage.setItem("hostLeaderboardData",JSON.stringify(i));if(this.rankings=i||[],this.rankings.sort((o,n)=>o.rank-n.rank),this.isHost=(e==null?void 0:e.isHost)!==void 0?e.isHost:!0,this.opts=e==null?void 0:e.lastGameOptions,this.opts)localStorage.setItem("hostLastGameOptions",JSON.stringify(this.opts));else{const o=localStorage.getItem("hostLastGameOptions");if(o)try{this.opts=JSON.parse(o)}catch{}}if(this.q=e==null?void 0:e.lastSelectedQuiz,this.q)localStorage.setItem("hostLastSelectedQuiz",JSON.stringify(this.q));else{const o=localStorage.getItem("hostLastSelectedQuiz");if(o)try{this.q=JSON.parse(o)}catch{}}this.sessionId=(e==null?void 0:e.mySessionId)||null,this.sessionId?this.sessionId&&localStorage.setItem("hostLastSessionId",this.sessionId):this.sessionId=localStorage.getItem("hostLastSessionId"),this.container=document.createElement("div"),this.container.id="leaderboard-ui",this.container.style.cssText='position:absolute; top:0; left:0; width:100%; height:100%; z-index:1000; font-family: "Retro Gaming", monospace !important;',document.body.appendChild(this.container),this.renderLeaderboard(),setTimeout(()=>u.open(),100)}initializeClient(){let i;if(!i){const o=window.location.protocol==="https:"?"wss":"ws";i=`${o}://${window.location.host}`,window.location.hostname==="localhost"&&(i=`${o}://localhost:2567`)}this.client=new $.Client(i)}renderLeaderboard(){const e="leaderboard-local-styles";if(!document.getElementById(e)){const i=document.createElement("style");i.id=e,i.innerHTML=S.getGlobalStyles(),document.head.appendChild(i)}I.navigate("/host/leaderboard"),this.container.innerHTML=S.generateHTML(this.rankings),w.startCharacterSpawner("leaderboard"),this.attachListeners(),this.startConfetti()}startConfetti(){const e=document.createElement("script");e.src="https://cdn.jsdelivr.net/npm/canvas-confetti@1.6.0/dist/confetti.browser.min.js",e.onload=()=>{window.confetti({particleCount:150,spread:70,origin:{y:.6}})},document.body.appendChild(e)}attachListeners(){const e=document.getElementById("lb-home-btn"),i=document.getElementById("lb-restart-btn"),o=document.getElementById("lb-stats-btn"),n=document.getElementById("lb-home-btn-mobile"),l=document.getElementById("lb-restart-btn-mobile"),s=document.getElementById("lb-stats-btn-mobile"),p=()=>{var a,c,f,m,d,g;let t=localStorage.getItem("supabaseSessionId");if((!t||t==="undefined"||t==="null")&&(t=((a=this.opts)==null?void 0:a.mySessionId)||((c=this.opts)==null?void 0:c.sessionId)),!t||t==="undefined"||t==="null"){const x=localStorage.getItem("currentRoomOptions");if(x)try{t=JSON.parse(x).sessionId}catch{}}(!t||t==="undefined"||t==="null")&&(t=((m=(f=localStorage.getItem("lastGameOptions"))==null?void 0:f.match(/"sessionId":"([^"]+)"/))==null?void 0:m[1])||((g=(d=localStorage.getItem("hostLastGameOptions"))==null?void 0:d.match(/"sessionId":"([^"]+)"/))==null?void 0:g[1])||null),t&&t!=="undefined"&&t!=="null"?window.open(`https://app.gameforsmart.com/stat/${t}`,"_blank"):alert(r.t("host_leaderboard.no_session_id"))};o&&(o.onclick=p),s&&(s.onclick=p);const h=()=>{u.transitionTo(()=>{this.cleanup(),window.location.href="/"})};e&&(e.onclick=h),n&&(n.onclick=h);const b=async()=>{if(this.opts&&!this.q&&this.opts.quizId)try{this.q=await C(()=>import("./QuizData-DP5jU-j4.js"),__vite__mapDeps([0,1])).then(t=>t.fetchQuizById(this.opts.quizId)),this.q&&localStorage.setItem("hostLastSelectedQuiz",JSON.stringify(this.q))}catch(t){console.error("Failed to fetch quiz for restart:",t)}this.opts&&this.q?u.close(async()=>{try{const{room:t,options:a}=await L.createRoom(this.client,{...this.opts,quiz:this.q});this.cleanup(),I.navigate(`/host/${a.roomCode}/lobby`),z("HostWaitingRoomScene",{room:t,isHost:!0}),setTimeout(()=>u.open(),600)}catch(t){console.error(t),alert(r.t("host_leaderboard.restart_error")),this.cleanup(),new E().init()}}):alert(r.t("host_leaderboard.no_quiz_data"))};i&&(i.onclick=b),l&&(l.onclick=b),this.setupPodiumTooltips()}setupPodiumTooltips(){window.lbTooltip={show:(e,i)=>{const o=e.currentTarget,n=o.innerText.trim().toUpperCase(),l=i.trim().toUpperCase();(o.scrollWidth>o.clientWidth||n!==l)&&(this.showTooltip(i),this.moveTooltip(e))},move:e=>{this.moveTooltip(e)},hide:()=>{this.hideTooltip()}}}createTooltip(){let e=document.getElementById("podium-name-tooltip");e||(e=document.createElement("div"),e.id="podium-name-tooltip",e.className="lb-name-tooltip",document.body.appendChild(e)),this.tooltip=e}showTooltip(e){this.tooltip&&(this.tooltip.innerText=e,this.tooltip.classList.add("visible"))}moveTooltip(e){if(!this.tooltip)return;let i=e.clientX+15,o=e.clientY+15;i+this.tooltip.offsetWidth>window.innerWidth&&(i=e.clientX-this.tooltip.offsetWidth-15),o+this.tooltip.offsetHeight>window.innerHeight&&(o=e.clientY-this.tooltip.offsetHeight-15),this.tooltip.style.left=`${i}px`,this.tooltip.style.top=`${o}px`}hideTooltip(){this.tooltip&&this.tooltip.classList.remove("visible")}cleanup(){w.stopCharacterSpawner("leaderboard"),this.container&&(this.container.parentNode&&this.container.parentNode.removeChild(this.container),this.container.remove());const e=document.getElementById("leaderboard-local-styles");e&&(e.parentNode&&e.parentNode.removeChild(e),e.remove()),k.disable(),window.removeEventListener("languageChanged",this.handleLangChange)}}export{R as HostLeaderboardManager};
