import{i as e,T as u,O as x,R as f,G as b}from"./index-Bjl2RNLz.js";import{o as v}from"./statsSession-RS9odABG.js";class S{constructor(){this.rankings=[],this.mySessionId="",this.roomId="",this.supabaseSessionId="",this.handleLangChange=()=>{const t=document.getElementById("txt-pr-rank");t&&(t.innerText=e.t("player_result.rank"));const o=document.getElementById("txt-pr-score");o&&(o.innerText=e.t("player_result.score"));const l=document.getElementById("txt-pr-correct");l&&(l.innerText=e.t("player_result.correct"));const a=document.getElementById("txt-pr-time");a&&(a.innerText=e.t("player_result.time"));const s=document.getElementById("lb-home-btn");s&&(s.title=e.t("player_result.title_home"));const n=document.getElementById("lb-stats-btn");n&&(n.title=e.t("player_result.title_stats"));const d=document.getElementById("txt-pr-home");d&&(d.innerText=e.t("player_result.home"));const p=document.getElementById("txt-pr-stats");p&&(p.innerText=e.t("player_result.stats"))}}start(t){var n,d,p,h,i,c,g;document.title="Result | Zigma",u.ensureClosed(),x.requirePortrait(e.t("player_result.portrait_req_title"),e.t("player_result.portrait_req_desc")),window.addEventListener("languageChanged",this.handleLangChange);let o=(t==null?void 0:t.leaderboardData)||[];this.room=t==null?void 0:t.room;let l=this.room?this.room.sessionId:"",a=this.room?this.room.id:"";if(this.supabaseSessionId=localStorage.getItem("supabaseSessionId")||((d=(n=this.room)==null?void 0:n.metadata)==null?void 0:d.sessionId)||"",o.length>0&&l&&a){this.rankings=o,this.mySessionId=l,this.roomId=a;const r=((h=(p=this.room)==null?void 0:p.state)==null?void 0:h.questionLimit)||"5",m=((g=(c=(i=this.room)==null?void 0:i.state)==null?void 0:c.questions)==null?void 0:g.length)||5,y=r==="all"?m:parseInt(r);sessionStorage.setItem("playerResultState",JSON.stringify({rankings:this.rankings,mySessionId:this.mySessionId,roomId:this.roomId,supabaseSessionId:this.supabaseSessionId,questionTotal:y}))}else{const r=sessionStorage.getItem("playerResultState");if(r){const m=JSON.parse(r);this.rankings=m.rankings,this.mySessionId=m.mySessionId,this.roomId=m.roomId,m.supabaseSessionId&&(this.supabaseSessionId=m.supabaseSessionId)}}const s=document.getElementById("result-ui");if(s&&s.remove(),this.container=document.createElement("div"),this.container.id="result-ui",this.container.style.position="absolute",this.container.style.top="0",this.container.style.left="0",this.container.style.width="100%",this.container.style.height="100%",this.container.style.zIndex="1000",this.container.style.pointerEvents="none",document.body.appendChild(this.container),!document.getElementById("result-styles")){const r=document.createElement("style");r.id="result-styles",r.innerHTML=this.getStyles(),document.head.appendChild(r)}this.renderIndividualResult(),this.room&&this.room.onMessage("gameEnded",r=>{this.rankings=r.rankings,sessionStorage.setItem("playerResultState",JSON.stringify({rankings:this.rankings,mySessionId:this.mySessionId,roomId:this.roomId,supabaseSessionId:this.supabaseSessionId})),this.renderIndividualResult()}),setTimeout(()=>{u.open()},100)}getStyles(){return`
            @import url('https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap');

            #result-ui {
                background: linear-gradient(180deg, #6CC452 0%, #478D47 100%);
                color: white;
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                font-family: 'Retro Gaming', monospace;
                overflow: hidden;
                height: 100vh;
                width: 100vw;
            }

            .pixel-bg-pattern {
                background-image: radial-gradient(#2d5a30 1px, transparent 1px);
                background-size: 24px 24px;
            }

            .result-card {
                background: white;
                border: 4px solid #6CC452;
                border-bottom: 10px solid #478D47;
                border-radius: 28px;
                padding: 40px;
                display: flex; flex-direction: column; align-items: center;
                min-width: 480px;
                position: relative;
                box-shadow: 0 20px 40px rgba(0,0,0,0.2);
                z-index: 10;
            }

            .result-avatar-container {
                width: 180px; height: 180px;
                background: #F1F8E9;
                border: 2px solid #478D47;
                border-radius: 50%;
                display: flex; align-items: center; justify-content: center;
                margin-bottom: 25px;
                position: relative; overflow: hidden; // Ensures avatar image is clipped
            }
            .result-avatar-img {
                width: 100%; height: 100%;
                object-fit: cover;
                border-radius: 50%;
            }

            .char-anim { width: 96px; height: 64px; image-rendering: pixelated; position: absolute; transform: scale(4.5); }
            .anim-play { animation: lb-play-idle 1s steps(9) infinite; background-repeat: no-repeat; }
            @keyframes lb-play-idle { from { background-position: 0 0; } to { background-position: -864px 0; } }
            .result-char { transform: scale(8); }

            .result-name {
                font-family: 'Retro Gaming', monospace;
                font-size: 26px; color: #478D47;
                text-transform: uppercase; letter-spacing: 2px;
                margin-bottom: 40px;
            }

            .result-stats-row {
                display: flex; gap: 15px; width: 100%; justify-content: center;
            }

            .stat-box {
                background: #F1F8E9;
                border: 2px solid #6CC452;
                border-radius: 16px;
                padding: 20px 10px;
                width: 120px;
                display: flex; flex-direction: column; align-items: center;
                transition: transform 0.2s;
            }
            .stat-box:hover { transform: translateY(-5px); }
            .stat-icon { font-size: 28px; margin-bottom: 12px; color: #478D47; }
            .stat-value { font-family: 'Retro Gaming', monospace; font-size: 18px; color: #478D47; margin-bottom: 6px; }
            .stat-label { 
                font-size: 11px; 
                color: #6CC452; 
                text-transform: uppercase; 
                letter-spacing: 1px;
                font-weight: 800;
            }

            .lb-footer { 
                position: fixed; 
                top: 50%; 
                left: 0; 
                width: 100%; 
                display: flex; 
                justify-content: space-between; 
                padding: 0 40px; 
                pointer-events: none; 
                transform: translateY(-50%); 
                z-index: 20; 
            }
            .nav-btn {
                pointer-events: auto; 
                background: #336B23; 
                border: none;
                border-bottom: 4px solid #1F4514;
                border-radius: 12px; 
                width: 72px; height: 72px;
                display: flex; align-items: center; justify-content: center; color: white; cursor: pointer; transition: all 0.2s;
                box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1);
            }
            .nav-btn:hover { filter: brightness(85%); }
            .nav-btn:active { transform: translateY(4px); border-bottom-width: 0; }
            .nav-btn .material-symbols-outlined { font-size: 30px; }

            .logo-center {
                position: fixed;
                top: 25px;
                left: 0;
                right: 0;
                margin: 0 auto;
                width: 200px;
                z-index: 2000;
                pointer-events: none;
                display: none; /* Hide by default, show on mobile */
            }

            .logo-left { 
                position: absolute; 
                top: -30px; 
                left: -40px; 
                width: 280px; 
                z-index: 20; 
                pointer-events: none;
            }
            .logo-right { 
                position: absolute; 
                top: -45px; 
                right: -15px; 
                width: 320px; 
                z-index: 20; 
                pointer-events: none;
            }

            @media (max-width: 768px) {
                .logo-left, .logo-right { display: none; }
                .logo-center { display: block; width: 280px; top: -10px; }
                .result-card { 
                    min-width: 90vw; 
                    padding: 25px 20px;
                    margin-top: 50px;
                    margin-bottom: 20px;
                    background: white;
                    border: 4px solid #6CC452;
                    border-bottom: 10px solid #478D47;
                }
                .result-avatar-container { width: 140px; height: 140px; background: #F1F8E9; border-color: #478D47; border-radius: 50%; }
                .result-name { font-size: 20px; margin-bottom: 30px; color: #478D47; }
                .result-stats-row { 
                    gap: 6px; 
                    width: 100%;
                    justify-content: center;
                }
                .stat-box { 
                    padding: 10px 4px; 
                    flex: 1;
                    min-width: 0; /* Allow shrinking */
                    max-width: 85px; 
                    background: #F1F8E9;
                    border-color: #6CC452;
                }
                .stat-box .material-symbols-outlined { font-size: 22px; margin-bottom: 6px; color: #478D47; }
                .stat-value { font-size: 14px; margin-bottom: 2px; color: #478D47; }
                .stat-label { 
                    font-size: ${e.getLanguage()==="ar"?"10px":"8px"}; 
                    color: #6CC452; 
                    font-weight: 800;
                }
                .lb-footer {
                    top: auto;
                    bottom: 40px;
                    transform: none;
                    flex-direction: row;
                    gap: 15px;
                    padding: 0 20px;
                }
                .nav-btn-wide {
                    flex: 1;
                    pointer-events: auto;
                    height: 44px;
                    border-radius: 12px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 4px;
                    font-family: 'Retro Gaming', monospace;
                    font-size: 9px;
                    text-transform: uppercase;
                    border: none;
                    cursor: pointer;
                    transition: all 0.2s;
                    background: #336B23; 
                    color: white;
                    border-bottom: 3px solid #1F4514;
                    box-shadow: 0 6px 0 #1F4514;
                }
                .nav-btn-wide:hover { filter: brightness(85%); }
                .nav-btn-wide:active { transform: translateY(2px); border-bottom-width: 2px; box-shadow: 0 4px 0 #1F4514; }
                .nav-btn { display: none; }
            }

            @media (min-width: 769px) {
                .nav-btn-wide { display: none; }
            }
        `}renderIndividualResult(){var d,p,h;f.navigate("/player/result"),this.container.innerHTML="";const t=this.rankings.find(i=>i.sessionId===this.mySessionId)||this.rankings[0];if(!t)return;const o=i=>{const c=Math.floor(i/1e3),g=Math.floor(c/60),r=c%60;return`${g.toString().padStart(2,"0")}:${r.toString().padStart(2,"0")}`},l=i=>i&&(i.includes("googleusercontent.com")?i.replace(/=s\d+(-c)?/,"=s384-c"):i),a=i=>{if(!i)return"?";const c=i.trim();return c.length<=1?c.toUpperCase():c.substring(0,1).toUpperCase()+c.substring(1,2).toLowerCase()},s=sessionStorage.getItem("playerResultState"),n=s&&JSON.parse(s).questionTotal||5;this.getCharacterVisuals(t),this.container.innerHTML=`
            ${b.getHTML("result")}

            <img src="/logo/Zigma-logo-fix.webp" class="logo-center" />
            <img src="/logo/Zigma-logo-fix.webp" class="logo-left" />
            <img src="/logo/gameforsmart-logo-fix.webp" class="logo-right" />

            <div class="result-card pointer-events-auto">
                <div class="result-avatar-container" style="background: #336B23; color: white;">
                    ${t.avatarUrl?`<img src="${l(t.avatarUrl)}" class="result-avatar-img" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';" />
                         <div class="initial-fallback text-6xl" style="display:none; width: 100%; height: 100%; align-items: center; justify-content: center; text-shadow: 2px 2px 0 #000;">${a(t.name)}</div>`:`<div class="initial-fallback text-6xl" style="display:flex; width: 100%; height: 100%; align-items: center; justify-content: center; text-shadow: 2px 2px 0 #000;">${a(t.name)}</div>`}
                </div>
                <div class="result-name">${t.name}</div>
                
                <div class="result-stats-row">
                    <div class="stat-box">
                        <span class="material-symbols-outlined stat-icon">military_tech</span>
                        <div class="stat-value">${t.rank===-1?((h=(p=(d=this.room)==null?void 0:d.state)==null?void 0:p.players)==null?void 0:h.size)===1?"#1":"#?":"#"+t.rank}</div>
                        <div id="txt-pr-rank" class="stat-label">${e.t("player_result.rank")}</div>
                    </div>
                    <div class="stat-box">
                        <span class="material-symbols-outlined stat-icon">workspace_premium</span>
                        <div class="stat-value">${Math.min(100,Math.round(t.score))}</div>
                        <div id="txt-pr-score" class="stat-label">${e.t("player_result.score")}</div>
                    </div>
                    <div class="stat-box">
                        <span class="material-symbols-outlined stat-icon">task_alt</span>
                        <div class="stat-value">${t.correctAnswers}/${n}</div>
                        <div id="txt-pr-correct" class="stat-label">${e.t("player_result.correct")}</div>
                    </div>
                    <div class="stat-box">
                        <span class="material-symbols-outlined stat-icon">schedule</span>
                        <div class="stat-value">${o(t.duration)}</div>
                        <div id="txt-pr-time" class="stat-label">${e.t("player_result.time")}</div>
                    </div>
                </div>
            </div>

            <div class="lb-footer">
                <button id="lb-home-btn" class="nav-btn btn-left" title="${e.t("player_result.title_home")}">
                    <span class="material-symbols-outlined">home</span>
                </button>
                
                <button id="lb-home-btn-mobile" class="nav-btn-wide">
                    <span class="material-symbols-outlined">home</span>
                    <span id="txt-pr-home">${e.t("player_result.home")}</span>
                </button>
                
                <button id="lb-stats-btn-mobile" class="nav-btn-wide">
                    <span class="material-symbols-outlined">analytics</span>
                    <span id="txt-pr-stats">${e.t("player_result.stats")}</span>
                </button>

                <button id="lb-stats-btn" class="nav-btn btn-right" title="${e.t("player_result.title_stats")}">
                    <span class="material-symbols-outlined">analytics</span>
                </button>
            </div>
        `,b.startCharacterSpawner("result"),this.attachListeners()}getCharacterVisuals(t){const o="/assets/characters/Human/IDLE",l=`background-image: url('${o}/base_idle_strip9.png'); background-size: 864px 64px;`,a=`background-image: url('${o}/tools_idle_strip9.png'); background-size: 864px 64px;`;let s="";if(t.hairId&&t.hairId>0){const d={1:"bowlhair",2:"curlyhair",3:"longhair",4:"mophair",5:"shorthair",6:"spikeyhair"}[t.hairId];d&&(s=`background-image: url('${o}/${d}_idle_strip9.png'); background-size: 864px 64px;`)}return{base:l,tools:a,hair:s}}attachListeners(){setTimeout(()=>{const t=document.getElementById("lb-home-btn"),o=document.getElementById("lb-stats-btn");t&&(t.onclick=()=>{if(this.room){try{this.room.send("manualPlayerLeave")}catch(n){console.warn("manualPlayerLeave failed:",n)}const s=this.room;this.room=null,setTimeout(()=>{try{s.connection&&s.connection.isOpen&&s.leave(!0)}catch{}u.transitionTo(()=>{this.cleanup(),window.location.href="/"})},100)}else u.transitionTo(()=>{this.cleanup(),window.location.href="/"})});const l=document.getElementById("lb-home-btn-mobile");l&&(l.onclick=()=>{if(this.room){try{this.room.send("manualPlayerLeave")}catch(n){console.warn("manualPlayerLeave failed:",n)}const s=this.room;this.room=null,setTimeout(()=>{try{s.connection&&s.connection.isOpen&&s.leave(!0)}catch{}u.transitionTo(()=>{this.cleanup(),window.location.href="/"})},100)}else u.transitionTo(()=>{this.cleanup(),window.location.href="/"})}),o&&(o.onclick=()=>this.openStats());const a=document.getElementById("lb-stats-btn-mobile");a&&(a.onclick=()=>this.openStats())},50)}openStats(){v(this.room,()=>alert(e.t("player_result.no_session")))}cleanup(){b.stopCharacterSpawner("result"),this.container&&this.container.remove();const t=document.getElementById("result-styles");t&&t.remove(),x.disable(),window.removeEventListener("languageChanged",this.handleLangChange)}}export{S as ResultManager};
