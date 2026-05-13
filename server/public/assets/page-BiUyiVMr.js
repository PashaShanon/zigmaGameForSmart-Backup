const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/QuizData-C9AcV2cg.js","assets/index-B4Vmf49a.js"])))=>i.map(i=>d[i]);
import{a as k,s as $,S as T,G as v,i as s,T as x,O as _,l as B,R as I,_ as L,c as E,L as z}from"./index-B4Vmf49a.js";class C{static async createRoom(e,i){const{difficulty:o,questionCount:r,timer:l,quiz:n}=i;let b="map_newest_easy_nomor1.tmj";o==="sedang"&&(b="map_baru2.tmj"),o==="sulit"&&(b="map_baru3.tmj");const g=r===5?10:20,f=this.generateRoomCode(),t=k.getStoredProfile(),a=t?t.id:null;let c=[...n.questions||[]];c.sort(()=>Math.random()-.5),c=c.slice(0,r);try{const{data:d,error:m}=await $.from(T).insert({game_pin:f,quiz_id:n.id,status:"waiting",question_limit:r,total_time_minutes:l/60,difficulty:o,host_id:a,created_at:new Date().toISOString(),current_questions:c}).select().single();if(m)throw console.error("Supabase Session Error:",m),new Error("Failed to create game session.");console.log("Session Created in Supabase B:",d);const p={roomCode:f,sessionId:d.id,difficulty:o,subject:n.category.toLowerCase(),quizId:n.id,quizTitle:n.title,questions:c,map:b,questionCount:r,enemyCount:g,timer:l,isHost:!0,hostId:a,quizDetail:{title:n.title,category:n.category,language:n.language||"id",description:n.description,creator_avatar:n.creator_avatar||null,creator_username:n.creator_username||"kizuko"}};localStorage.setItem("currentRoomOptions",JSON.stringify(p));const h=await e.create("game_room",p);return console.log("Room created via RoomService!",h),localStorage.setItem("currentRoomId",h.id),localStorage.setItem("currentSessionId",h.sessionId),localStorage.setItem("currentReconnectionToken",h.reconnectionToken),localStorage.setItem("supabaseSessionId",d.id),{room:h,options:p}}catch(d){throw console.error("RoomService Flow Error:",d),d}}static generateRoomCode(){return Math.floor(1e5+Math.random()*9e5).toString()}}class S{static getGlobalStyles(){return`
            .podium-avatar { position: relative; display: flex; justify-content: center; align-items: center; overflow: hidden; font-family: 'Retro Gaming', monospace; background-color: #336B23; }
            .profile-img { width: 100%; height: 100%; object-fit: cover; border-radius: 50%; z-index: 2; image-rendering: auto; -webkit-font-smoothing: antialiased; }
            .initial-fallback { width: 100%; height: 100%; display: flex; align-items: center; justify-content: center; color: white; text-shadow: 1px 1px 0 #000, -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000; z-index: 1; -webkit-font-smoothing: antialiased; line-height: 1; }
            .char-anim { 
                width: 96px; 
                height: 64px; 
                image-rendering: pixelated; 
                position: absolute; 
                transform: scale(4); 
                animation: lb-play-idle 1s steps(9) infinite; 
            }
            @keyframes lb-play-idle { 
                from { background-position: 0 0; } 
                to { background-position: -864px 0; } 
            }
            .logo-center { position: fixed; top: 25px; left: 0; right: 0; margin: 0 auto; width: 200px; z-index: 2000; pointer-events: none; display: none; }
            .logo-left { position: absolute; top: -30px; left: -40px; width: 280px; z-index: 20; pointer-events: none; }
            .logo-right { position: absolute; top: -45px; right: -15px; width: 320px; z-index: 20; pointer-events: none; }
            .lb-footer-mobile { display: none; }
            .desktop-floating-actions { display: none; }
            .nav-btn {
                pointer-events: auto; background: #336B23; border: none; border-bottom: 4px solid #1F4514; border-radius: 12px;
                width: 72px; height: 72px; display: flex; align-items: center; justify-content: center; color: white; cursor: pointer; transition: all 0.2s;
                box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1);
            }
            .nav-btn:hover { filter: brightness(85%); }
            .nav-btn:active { transform: translateY(4px); border-bottom-width: 0; }
            .nav-btn .material-symbols-outlined { font-size: 30px; color: white; }
            @media (max-width: 768px) {
                .logo-left, .logo-right { display: none; }
                .logo-center { display: block; width: 8rem; top: 10px; }
                .lb-footer-mobile {
                    display: flex; position: fixed; bottom: 12px; left: 0; width: 100%; flex-direction: row; gap: 8px; padding: 0 10px; z-index: 100;
                }
                .nav-btn-wide {
                    flex: 1; pointer-events: auto; height: 44px; border-radius: 10px;
                    display: flex; align-items: center; justify-content: center; gap: 4px;
                    font-family: 'Retro Gaming', monospace; font-size: 9px; text-transform: uppercase;
                    border: none; cursor: pointer; transition: all 0.2s;
                    background: #336B23; color: white; border-bottom: 3px solid #1F4514; box-shadow: 0 6px 0 #1F4514;
                }
                .nav-btn-wide:hover { filter: brightness(85%); }
                .nav-btn-wide:active { transform: translateY(2px); border-bottom-width: 2px; box-shadow: 0 4px 0 #1F4514; }
                .nav-btn-wide .material-symbols-outlined { color: white; }
            }
            @media (min-width: 768px) {
                .desktop-floating-actions {
                    display: flex;
                }
                .char-anim { transform: scale(5.5); }
                .char-anim-sm { transform: scale(1.8); }
            }
            .char-anim-sm { 
                width: 96px; 
                height: 64px; 
                image-rendering: pixelated; 
                position: absolute; 
                transform: scale(1.3); 
                animation: lb-play-idle 1s steps(9) infinite; 
            }
            .hide-scrollbar::-webkit-scrollbar { display: none; }
            .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }

            .lb-name-tooltip {
                position: fixed;
                pointer-events: none;
                z-index: 9999;
                padding: 10px 16px;
                background: #2d5a27;
                border: 2px solid #ffffff;
                color: #ffffff;
                font-family: 'Retro Gaming', monospace;
                font-size: 12px;
                border-radius: 12px;
                box-shadow: 0 10px 25px rgba(0,0,0,0.5);
                opacity: 0;
                transform: translateY(10px);
                transition: opacity 0.2s ease, transform 0.2s ease;
                max-width: 250px;
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
        `}static generateHTML(e){const i=[e[0],e[1],e[2]],o=e,r=t=>{const a=Math.floor(t/1e3),c=Math.floor(a/60),d=a%60;return`${c}:${d.toString().padStart(2,"0")}`},l=t=>{if(!t)return"?";const a=t.trim();return a.length<=1?a.toUpperCase():a.substring(0,1).toUpperCase()+a.substring(1,2).toLowerCase()},n=t=>t&&(t.includes("googleusercontent.com")?t.replace(/=s\d+(-c)?/,"=s384-c"):t),g=[i[1],i[0],i[2]].map(t=>{if(!t)return'<div class="w-[100px] md:w-[150px]"></div>';const a=t.rank,c=a===1,d=a===2;let m="#cd7f32",p="#8B4513",h="w-24 md:w-36",u="h-16 md:h-24",w="w-12 h-12 md:w-16 md:h-16";return c?(m="#ffcc00",p="#B8860B",u="h-32 md:h-40",w="w-14 h-14 md:w-20 md:h-20"):d&&(m="#c0c0c0",p="#708090",u="h-24 md:h-32"),t.hairId&&["bowlhair","curlyhair","longhair","mophair","shorthair","spikeyhair"][t.hairId-1],`
                <div class="flex flex-col items-center relative z-20 group">
                    
                    <!-- SQUARE ROUNDED CARD (Tumpul) -->
                    <div class="z-30 ${h} aspect-square rounded-[1.5rem] md:rounded-[2rem] p-2 md:p-3 mb-[-8px] flex flex-col items-center justify-center border-b-8 transition-transform group-hover:scale-105" 
                         style="background: ${p}; border-color: rgba(0,0,0,0.25);">
                        
                        <!-- Avatar -->
                        <div class="${w} podium-avatar rounded-full border-4 flex items-center justify-center font-bold relative mb-2" style="background-color: ${m}; border-color: ${m};">
                            ${t.avatarUrl?`
                                <img src="${n(t.avatarUrl)}" class="profile-img" alt="${t.name}" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';">
                                <div class="initial-fallback hidden text-3xl md:text-5xl">${l(t.name)}</div>
                            `:`
                                <div class="initial-fallback text-3xl md:text-5xl">${l(t.name)}</div>
                            `}
                        </div>

                         <div class="podium-name-truncated w-full text-[10px] md:text-md font-bold text-center uppercase truncate px-1 relative z-50 cursor-help" 
                              style="color: ${t.isIncomplete?"#ff4444":"#ffffff"}; font-family: 'Retro Gaming', monospace; text-shadow: 1px 1px 0 #000; pointer-events: auto;"
                              data-name="${t.name}"
                              onmouseenter="window.lbTooltip.show(event, '${t.name.replace(/'/g,"\\'")}')"
                              onmousemove="window.lbTooltip.move(event)"
                              onmouseleave="window.lbTooltip.hide()">
                             ${t.name.split(" ")[0]}
                         </div>
                    </div>

                    <!-- The literal podium block (Always visible now) -->
                    <div class="flex z-20 ${h} ${u} border-x-4 border-t-8 border-b-0 flex-col items-center justify-center relative shadow-2xl" 
                         style="border-color: ${m}; border-top-color: rgba(0,0,0,0.3); background: linear-gradient(to bottom, ${p}, rgba(0,0,0,0.8));">
                        
                        <!-- Rank Number on Podium -->
                        <div class="text-4xl md:text-7xl font-bold relative z-10" style="font-family: 'Retro Gaming', monospace; color: ${m}; text-shadow: 2px 2px 0 #000, -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000; -webkit-font-smoothing: none;">
                            ${a}
                        </div>

                        <!-- SCORE BADGE (New) -->
                        <div class="absolute bottom-[-10px] md:bottom-[-15px] px-3 py-1 bg-white border-2 border-black rounded-lg shadow-lg z-40 transform scale-75 md:scale-100">
                            <span class="text-black font-bold text-xs md:text-sm" style="font-family: 'Retro Gaming', monospace;">
                                ${Math.min(100,Math.round(t.score))} PTS
                            </span>
                        </div>
                    </div>
                </div>
            `}).join(""),f=o.map(t=>(t.hairId&&["bowlhair","curlyhair","longhair","mophair","shorthair","spikeyhair"][t.hairId-1],`
            <div class="grid grid-cols-[40px_1fr_60px_60px] md:grid-cols-[100px_1fr_150px_150px] p-4 text-gray-800 items-center border-b border-gray-200 hover:bg-gray-100 transition-colors group font-['Retro_Gaming']" style="-webkit-font-smoothing: none;">
                <div class="text-center font-bold text-gray-600 group-hover:text-[#336B23] transition-colors text-sm md:text-lg">${t.rank}</div>
                <div class="flex items-center gap-2 md:gap-3">
                    <div class="hidden md:flex w-10 h-10 rounded-full bg-[#336B23] border-2 border-white items-center justify-center font-bold text-sm group-hover:border-[#336B23] transition-colors overflow-hidden relative podium-avatar">
                        ${t.avatarUrl?`
                            <img src="${n(t.avatarUrl)}" class="profile-img" alt="${t.name}" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';">
                            <div class="initial-fallback hidden text-lg">${l(t.name)}</div>
                        `:`
                            <div class="initial-fallback text-lg">${l(t.name)}</div>
                        `}
                    </div>
                    <div class="font-bold text-xs md:text-lg truncate max-w-[150px] md:max-w-[300px] py-1 uppercase" style="color: ${t.isIncomplete?"#ff4444":"#336B23"};">${t.name}</div>
                </div>
                <div class="text-center text-[#478D47] font-bold text-sm md:text-xl">${Math.min(100,Math.round(t.score))}</div>
                <div class="text-center text-gray-700 text-xs md:text-base font-bold">
                    ${r(t.duration)}
                </div>
            </div>
        `)).join("");return`
            <div translate="no" class="notranslate fixed inset-0 w-full h-screen overflow-hidden text-white pointer-events-auto select-none" style="background: linear-gradient(180deg, #6CC452 0%, #478D47 100%);">
                
                ${v.getHTML("leaderboard")}

                <!-- Logos -->
                <img src="/logo/Zigma-logo-fix.webp" alt="Zigma Logo" class="logo-center" />
                <img src="/logo/Zigma-logo-fix.webp" alt="Zigma Logo" class="logo-left" />
                <img src="/logo/gameforsmart-logo-fix.webp" alt="GameForSmart Logo" class="logo-right" />

                <!-- MAIN CONTENT AREA: overflow-hidden for mobile to prevent scrollbars, auto for desktop -->
                <div class="relative z-10 w-full h-[100dvh] flex flex-col items-center pt-16 md:pt-16 pb-20 md:pb-12 px-4 overflow-hidden md:overflow-y-auto hide-scrollbar pointer-events-none">
                    


                    <!-- Podiums (Keep wrapper flex but adjust bottom margin for mobile) -->
                    <div class="flex items-end justify-center gap-2 md:gap-8 mb-4 md:mb-12 shrink-0">
                        ${g}
                    </div>

                    <!-- Leaderboard Table Card -->
                    ${o.length>0?`
                    <div class="w-full max-w-4xl bg-white border-[3px] border-[#336B23] rounded-3xl shadow-[0_0_30px_rgba(51,107,35,0.2)] overflow-hidden shrink-0 md:mb-20 flex flex-col flex-1 md:flex-none min-h-0 pointer-events-auto">
                        <!-- Header -->
                        <div class="bg-[#F1F8E9] border-b-[3px] border-[#336B23] relative shrink-0">
                            <div class="grid grid-cols-[40px_1fr_60px_60px] md:grid-cols-[100px_1fr_150px_150px] p-4 md:p-5 font-bold text-[#6CC452] uppercase tracking-widest text-sm md:text-lg font-['Retro_Gaming']" style="text-shadow: 1px 1px 0 #000, -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000;">
                                <div id="hdr-lb-rank" class="text-center">${s.t("host_leaderboard.rank")}</div>
                                <div id="hdr-lb-player">${s.t("host_leaderboard.player")}</div>
                                <div id="hdr-lb-score" class="text-center">${s.t("host_leaderboard.score")}</div>
                                <div id="hdr-lb-time" class="text-center">${s.t("host_leaderboard.time")}</div>
                            </div>
                        </div>
                        
                        <!-- List (Make internal scrollable on mobile so we don't need body scroll) -->
                        <div class="flex flex-col overflow-y-auto hide-scrollbar flex-1 min-h-0 pb-4 md:pb-0 pointer-events-auto">
                            ${f}
                        </div>
                    </div>
                    `:""}
                </div>

                <!-- FLOATING ACTIONS (Left & Right) -->
                <div class="desktop-floating-actions fixed top-[40%] md:top-1/2 left-4 md:left-6 -translate-y-1/2 flex-col gap-4 z-50">
                    <button id="lb-home-btn" class="nav-btn" title="${s.t("host_leaderboard.title_home")}">
                        <span class="material-symbols-outlined">home</span>
                    </button>
                    <button id="lb-restart-btn" class="nav-btn" title="${s.t("host_leaderboard.title_restart")}">
                        <span class="material-symbols-outlined">restart_alt</span>
                    </button>
                </div>

                <div class="desktop-floating-actions fixed top-[40%] md:top-1/2 right-4 md:right-6 -translate-y-1/2 flex-col gap-4 z-50">
                    <button id="lb-stats-btn" class="nav-btn" title="${s.t("host_leaderboard.title_stats")}">
                        <span class="material-symbols-outlined">analytics</span>
                    </button>
                </div>

                <!-- MOBILE FOOTER ACTIONS -->
                <div class="lb-footer-mobile">
                    <button id="lb-home-btn-mobile" class="nav-btn-wide">
                        <span class="material-symbols-outlined text-[14px]">home</span><span id="txt-lb-home">${s.t("host_leaderboard.home")}</span>
                    </button>
                    <button id="lb-restart-btn-mobile" class="nav-btn-wide">
                        <span class="material-symbols-outlined text-[14px]">restart_alt</span><span id="txt-lb-restart">${s.t("host_leaderboard.restart")}</span>
                    </button>
                    <button id="lb-stats-btn-mobile" class="nav-btn-wide">
                        <span class="material-symbols-outlined text-[14px]">analytics</span><span id="txt-lb-stats">${s.t("host_leaderboard.stats")}</span>
                    </button>
                </div>
            </div>
        `}}class O{constructor(){this.rankings=[],this.sessionId=null,this.isHost=!0,this.tooltip=null,this.handleLangChange=()=>{const e=document.getElementById("hdr-lb-rank");e&&(e.innerText=s.t("host_leaderboard.rank"));const i=document.getElementById("hdr-lb-player");i&&(i.innerText=s.t("host_leaderboard.player"));const o=document.getElementById("hdr-lb-score");o&&(o.innerText=s.t("host_leaderboard.score"));const r=document.getElementById("hdr-lb-time");r&&(r.innerText=s.t("host_leaderboard.time"));const l=document.getElementById("lb-home-btn");l&&(l.title=s.t("host_leaderboard.title_home"));const n=document.getElementById("lb-restart-btn");n&&(n.title=s.t("host_leaderboard.title_restart"));const b=document.getElementById("lb-stats-btn");b&&(b.title=s.t("host_leaderboard.title_stats"));const g=document.getElementById("txt-lb-home");g&&(g.innerText=s.t("host_leaderboard.home"));const f=document.getElementById("txt-lb-restart");f&&(f.innerText=s.t("host_leaderboard.restart"));const t=document.getElementById("txt-lb-stats");t&&(t.innerText=s.t("host_leaderboard.stats"))}}start(e){document.title="Leaderboard | Zigma",this.initializeClient(),x.ensureClosed(),this.createTooltip(),_.requirePortrait(s.t("host_leaderboard.portrait_req_title"),s.t("host_leaderboard.portrait_req_desc")),window.addEventListener("languageChanged",this.handleLangChange);let i=e==null?void 0:e.rankings;if(!i||i.length===0){const o=localStorage.getItem("hostLeaderboardData");if(o)try{i=JSON.parse(o)}catch{}}else localStorage.setItem("hostLeaderboardData",JSON.stringify(i));if(this.rankings=i||[],this.rankings.sort((o,r)=>o.rank-r.rank),this.isHost=(e==null?void 0:e.isHost)!==void 0?e.isHost:!0,this.opts=e==null?void 0:e.lastGameOptions,this.opts)localStorage.setItem("hostLastGameOptions",JSON.stringify(this.opts));else{const o=localStorage.getItem("hostLastGameOptions");if(o)try{this.opts=JSON.parse(o)}catch{}}if(this.q=e==null?void 0:e.lastSelectedQuiz,this.q)localStorage.setItem("hostLastSelectedQuiz",JSON.stringify(this.q));else{const o=localStorage.getItem("hostLastSelectedQuiz");if(o)try{this.q=JSON.parse(o)}catch{}}this.sessionId=(e==null?void 0:e.mySessionId)||null,this.sessionId?this.sessionId&&localStorage.setItem("hostLastSessionId",this.sessionId):this.sessionId=localStorage.getItem("hostLastSessionId"),this.container=document.createElement("div"),this.container.id="leaderboard-ui",this.container.style.cssText='position:absolute; top:0; left:0; width:100%; height:100%; z-index:1000; font-family: "Retro Gaming", monospace !important;',document.body.appendChild(this.container),this.renderLeaderboard(),setTimeout(()=>x.open(),100)}initializeClient(){let i;if(!i){const o=window.location.protocol==="https:"?"wss":"ws";i=`${o}://${window.location.host}`,window.location.hostname==="localhost"&&(i=`${o}://localhost:2567`)}this.client=new B.Client(i)}renderLeaderboard(){const e="leaderboard-local-styles";if(!document.getElementById(e)){const i=document.createElement("style");i.id=e,i.innerHTML=S.getGlobalStyles(),document.head.appendChild(i)}I.navigate("/host/leaderboard"),this.container.innerHTML=S.generateHTML(this.rankings),v.startCharacterSpawner("leaderboard"),this.attachListeners()}attachListeners(){const e=document.getElementById("lb-home-btn"),i=document.getElementById("lb-restart-btn"),o=document.getElementById("lb-stats-btn"),r=document.getElementById("lb-home-btn-mobile"),l=document.getElementById("lb-restart-btn-mobile"),n=document.getElementById("lb-stats-btn-mobile"),b=()=>{var a,c,d,m,p;let t=localStorage.getItem("supabaseSessionId");if((!t||t==="undefined"||t==="null")&&(t=(a=this.opts)==null?void 0:a.sessionId),!t||t==="undefined"||t==="null"){const h=localStorage.getItem("currentRoomOptions");if(h)try{t=JSON.parse(h).sessionId}catch{}}(!t||t==="undefined"||t==="null")&&(t=((d=(c=localStorage.getItem("lastGameOptions"))==null?void 0:c.match(/"sessionId":"([^"]+)"/))==null?void 0:d[1])||((p=(m=localStorage.getItem("hostLastGameOptions"))==null?void 0:m.match(/"sessionId":"([^"]+)"/))==null?void 0:p[1])||null),t&&t!=="undefined"&&t!=="null"?window.open(`https://app.gameforsmart.com/stat/${t}`,"_blank"):alert(s.t("host_leaderboard.no_session_id"))};o&&(o.onclick=b),n&&(n.onclick=b);const g=()=>{x.transitionTo(()=>{this.cleanup(),window.location.href="/"})};e&&(e.onclick=g),r&&(r.onclick=g);const f=async()=>{if(this.opts&&!this.q&&this.opts.quizId)try{this.q=await L(()=>import("./QuizData-C9AcV2cg.js"),__vite__mapDeps([0,1])).then(t=>t.fetchQuizById(this.opts.quizId)),this.q&&localStorage.setItem("hostLastSelectedQuiz",JSON.stringify(this.q))}catch(t){console.error("Failed to fetch quiz for restart:",t)}this.opts&&this.q?x.close(async()=>{try{const{room:t,options:a}=await C.createRoom(this.client,{...this.opts,quiz:this.q});this.cleanup(),I.navigate(`/host/${a.roomCode}/lobby`),E("HostWaitingRoomScene",{room:t,isHost:!0}),setTimeout(()=>x.open(),600)}catch(t){console.error(t),alert(s.t("host_leaderboard.restart_error")),this.cleanup(),new z().init()}}):alert(s.t("host_leaderboard.no_quiz_data"))};i&&(i.onclick=f),l&&(l.onclick=f),this.setupPodiumTooltips()}setupPodiumTooltips(){window.lbTooltip={show:(e,i)=>{const o=e.currentTarget,r=o.innerText.trim().toUpperCase(),l=i.trim().toUpperCase();(o.scrollWidth>o.clientWidth||r!==l)&&(this.showTooltip(i),this.moveTooltip(e))},move:e=>{this.moveTooltip(e)},hide:()=>{this.hideTooltip()}}}createTooltip(){let e=document.getElementById("podium-name-tooltip");e||(e=document.createElement("div"),e.id="podium-name-tooltip",e.className="lb-name-tooltip",document.body.appendChild(e)),this.tooltip=e}showTooltip(e){this.tooltip&&(this.tooltip.innerText=e,this.tooltip.classList.add("visible"))}moveTooltip(e){if(!this.tooltip)return;let i=e.clientX+15,o=e.clientY+15;i+this.tooltip.offsetWidth>window.innerWidth&&(i=e.clientX-this.tooltip.offsetWidth-15),o+this.tooltip.offsetHeight>window.innerHeight&&(o=e.clientY-this.tooltip.offsetHeight-15),this.tooltip.style.left=`${i}px`,this.tooltip.style.top=`${o}px`}hideTooltip(){this.tooltip&&this.tooltip.classList.remove("visible")}cleanup(){v.stopCharacterSpawner("leaderboard"),this.container&&(this.container.parentNode&&this.container.parentNode.removeChild(this.container),this.container.remove());const e=document.getElementById("leaderboard-local-styles");e&&(e.parentNode&&e.parentNode.removeChild(e),e.remove()),_.disable(),window.removeEventListener("languageChanged",this.handleLangChange)}}export{O as HostLeaderboardManager};
