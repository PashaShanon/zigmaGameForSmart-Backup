import { i18n } from '../../../utils/i18n';
import { GlobalBackground } from '../../../ui/shared/GlobalBackground';

export class QuizSelectionUI {
    static render() {
        let quizSelectionUI = document.getElementById('quiz-selection-ui');
        if (!quizSelectionUI) {
            quizSelectionUI = document.createElement('div');
            quizSelectionUI.id = 'quiz-selection-ui';
            quizSelectionUI.className = 'hidden fixed top-0 left-0 w-full h-screen z-20 overflow-x-hidden overflow-y-auto font-display flex flex-col';
            quizSelectionUI.innerHTML = `
                ${GlobalBackground.getHTML('selectquiz')}

                <!-- Top Navigation -->
                <nav class="relative z-50 p-4 md:p-6 flex justify-between items-start shrink-0">
                    <div class="flex items-start gap-4">
                        <img id="select-quiz-zigma-logo" src="/logo/Zigma-logo-fix.webp"
                        class="absolute w-24 md:w-56 z-20 object-contain -top-2 -left-4 md:-top-[25px] md:-left-[35px] cursor-pointer" />
                    </div>

                    <img src="/logo/gameforsmart-logo-fix.webp"
                        class="absolute w-32 md:w-64 z-20 pointer-events-none object-contain -top-3 -right-1 md:-top-[35px] md:-right-[10px]" />
                </nav>

                <!-- Main Content -->
                <main class="relative z-10 w-full flex-1 flex flex-col overflow-y-auto custom-scrollbar no-scrollbar px-4 pb-8 items-center">
                    <div class="w-full max-w-5xl flex flex-col h-full shrink-0 items-center">
                        <!-- Unified Search & Filter Bar (Solid Style) -->
                        <div class="w-full mb-3 shrink-0 relative z-50 mt-3 md:mt-5">
                            <div class="flex flex-col md:flex-row items-stretch md:items-center bg-white border-4 border-[#6CC452] border-b-[6px] border-b-[#478D47] rounded-2xl p-1 md:p-1.5 gap-1.5 md:gap-0 shadow-2xl">
                                <!-- Search Section (Top Row Mobile) -->
                                <div class="relative flex-grow flex items-center pr-1 md:pr-4">
                                    <input id="quiz-search-input"
                                    class="w-full h-10 md:h-12 pl-4 pr-12 bg-[#F1F8E9] border-none focus:ring-4 focus:ring-[#6CC452]/20 text-[#478D47] placeholder:text-[#6CC452]/40 font-medium text-base md:text-xl font-['Retro_Gaming'] tracking-tight rounded-xl"
                                    placeholder="${i18n.t('select_quiz.search_placeholder')}" type="text" />
                                    <button id="search-trigger-btn" class="absolute right-5 md:right-8 text-[#6CC452] hover:scale-110 transition-transform cursor-pointer p-1">
                                        <span class="material-symbols-outlined font-bold">search</span>
                                    </button>
                                </div>

                                <!-- Action Section (Bottom Row Mobile: Row Layout) -->
                                <div class="flex flex-row items-center border-t md:border-t-0 border-[#6CC452]/20 md:contents">
                                    <!-- Middle: Custom Dropdown -->
                                    <div class="relative flex-grow md:min-w-[200px] shrink-0 md:border-l-2 md:border-[#6CC452]/20 z-50 px-1 md:px-0">
                                        <button id="custom-cat-trigger" class="w-full h-10 md:h-12 flex items-center justify-between pl-3 md:pl-6 pr-2 md:pr-4 text-[#478D47] text-[10px] md:text-lg font-bold uppercase cursor-pointer font-['Retro_Gaming'] tracking-tight bg-[#F1F8E9]/50 md:bg-transparent hover:bg-[#F1F8E9] transition-all focus:outline-none group rounded-xl md:rounded-none ${i18n.getLanguage() === 'ar' ? 'flex-row-reverse' : ''}">
                                            <span id="custom-cat-selected" class="truncate ${i18n.getLanguage() === 'ar' ? 'ml-2' : 'mr-2'}">${i18n.t('select_quiz.all')}</span>
                                            <span id="custom-cat-arrow" class="material-symbols-outlined text-sm md:text-lg text-[#6CC452] transition-transform duration-300 group-hover:rotate-180">expand_more</span>
                                        </button>
                                        <div id="custom-cat-menu" class="hidden absolute top-[calc(100%+8px)] left-0 w-full bg-white border-2 border-[#6CC452] rounded-xl shadow-2xl origin-top transform transition-all duration-200 scale-95 opacity-0 flex flex-col p-1 max-h-[50vh] md:max-h-[60vh] overflow-y-auto custom-scrollbar z-50">
                                        </div>
                                        <select id="quiz-category-select" class="hidden"></select>
                                    </div>
                                    <!-- Right: Icons -->
                                    <div class="flex items-center gap-1 md:gap-3 pl-1.5 md:pl-4 border-l-2 border-[#6CC452]/20 py-1 md:py-0 justify-end">
                                        <button id="quiz-filter-fav-btn" class="flex items-center justify-center transition-all group p-1" title="${i18n.t('select_quiz.favorites_tooltip')}">
                                            <span class="material-symbols-outlined text-[#94A3B8] hover:scale-125 transition-transform text-2xl font-bold">favorite</span>
                                        </button>
                                        <button id="quiz-filter-my-btn" class="w-10 h-10 rounded-xl bg-[#F1F8E9] border-2 border-[#6CC452]/20 hover:border-[#6CC452] hover:bg-white flex items-center justify-center transition-all group" title="${i18n.t('select_quiz.my_quiz_tooltip')}">
                                            <span class="material-symbols-outlined text-[#6CC452]/40 group-hover:text-[#6CC452] text-lg">person</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- Quiz Grid -->
                        <div id="quiz-grid" class="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2.5">
                            <!-- Cards injected via JS -->
                        </div>

                        <!-- Pagination -->
                        <div class="pt-4 pb-2 flex justify-center items-center gap-4 shrink-0 w-full mt-auto">
                            <button id="prev-page-btn" class="pixel-text-outline px-3 py-1.5 bg-[#336B23] rounded-xl border-b-4 border-[#1F4514] hover:brightness-110 text-white flex items-center gap-2 transition-all disabled:opacity-30 disabled:cursor-not-allowed active:border-b-0 active:translate-y-1 cursor-pointer">
                                <span class="material-symbols-outlined text-base">chevron_left</span>
                                <span class="text-base font-bold uppercase">${i18n.t('select_quiz.prev')}</span>
                            </button>
                            <div id="pagination-numbers" class="flex items-center gap-2"></div>
                            <button id="next-page-btn" class="pixel-text-outline px-3 py-1.5 bg-[#336B23] rounded-xl border-b-4 border-[#1F4514] hover:brightness-110 text-white flex items-center gap-2 transition-all disabled:opacity-30 disabled:cursor-not-allowed active:border-b-0 active:translate-y-1 cursor-pointer">
                                <span class="text-base font-bold uppercase">${i18n.t('select_quiz.next')}</span>
                                <span class="material-symbols-outlined text-base">chevron_right</span>
                            </button>
                        </div>

                        <!-- Quiz Detail Modal -->
                        <div id="quiz-detail-modal" class="hidden fixed inset-0 z-[100] flex items-center justify-center p-4">
                            <!-- Backdrop -->
                            <div id="quiz-detail-backdrop" class="absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-300 opacity-0 cursor-pointer"></div>
                            
                            <!-- Modal Content -->
                            <div id="quiz-detail-content" class="relative bg-white border-4 border-[#6CC452] border-b-[6px] border-b-[#478D47] rounded-2xl p-5 md:p-6 w-full max-w-lg shadow-2xl transform scale-95 opacity-0 transition-all duration-300 flex flex-col gap-4">
                                
                                <!-- Loading Spinner -->
                                <div id="quiz-detail-loading" class="hidden absolute inset-0 bg-white/95 z-20 flex flex-col items-center justify-center rounded-xl">
                                    <span class="material-symbols-outlined animate-spin text-5xl text-[#6CC452]">refresh</span>
                                    <p class="mt-3 text-[#478D47] font-['Retro_Gaming'] text-sm tracking-widest uppercase">Memuat...</p>
                                </div>

                                <!-- Header: Badges -->
                                <div class="flex items-start justify-between gap-2">
                                    <div class="flex flex-wrap gap-2">
                                        <span id="quiz-detail-category" class="px-2 py-1 bg-[#336B23] text-white border-2 border-[#1F4514] text-[10px] md:text-xs font-bold rounded uppercase tracking-wider font-['Retro_Gaming']">CATEGORY</span>
                                        <span id="quiz-detail-language" class="px-2 py-1 bg-[#F1F8E9] text-[#478D47] border-2 border-[#6CC452]/30 text-[10px] md:text-xs font-bold rounded uppercase tracking-wider font-['Retro_Gaming']">LANG</span>
                                    </div>
                                    <button id="quiz-detail-close-top" class="text-[#94A3B8] hover:text-red-500 hover:bg-red-50 p-1 rounded-lg transition-colors cursor-pointer shrink-0 absolute top-3 right-3 z-30">
                                        <span class="material-symbols-outlined text-xl font-bold">close</span>
                                    </button>
                                </div>

                                <!-- Title & Description -->
                                <div class="flex flex-col gap-2 mt-1">
                                    <h2 id="quiz-detail-title" class="text-[#478D47] font-['Retro_Gaming'] text-lg md:text-xl uppercase tracking-tight leading-tight break-words pr-6">Quiz Title</h2>
                                    <div class="w-full h-1 bg-[#6CC452]/20 rounded-full mt-1 mb-1"></div>
                                    <p id="quiz-detail-desc" class="text-[#4B5563] font-['Space_Grotesk'] text-sm md:text-base leading-relaxed max-h-32 overflow-y-auto custom-scrollbar pr-2">Deskripsi...</p>
                                </div>

                                <!-- Stats -->
                                <div class="flex items-center justify-between gap-2 py-3 px-3 md:px-4 bg-[#F1F8E9] rounded-xl border-2 border-[#6CC452]/20 mt-1">
                                    <div class="flex items-center gap-2 flex-1 justify-center">
                                        <div class="w-8 h-8 md:w-10 md:h-10 rounded-full bg-white flex items-center justify-center border-2 border-[#6CC452]/30 shrink-0">
                                            <span class="material-symbols-outlined text-[#478D47] fill-icon text-base md:text-xl">menu_book</span>
                                        </div>
                                        <div class="flex flex-col">
                                            <span class="text-[#6CC452] text-[8px] md:text-[10px] font-bold uppercase font-['Retro_Gaming']">Soal</span>
                                            <span id="quiz-detail-questions" class="text-[#478D47] font-bold text-sm md:text-base font-['Space_Grotesk']">0</span>
                                        </div>
                                    </div>
                                    <div class="w-0.5 h-8 md:h-10 bg-[#6CC452]/20"></div>
                                    <div class="flex items-center gap-2 flex-1 justify-center">
                                        <div class="w-8 h-8 md:w-10 md:h-10 rounded-full bg-white flex items-center justify-center border-2 border-[#6CC452]/30 shrink-0">
                                            <span class="material-symbols-outlined text-[#478D47] fill-icon text-base md:text-xl">sports_esports</span>
                                        </div>
                                        <div class="flex flex-col">
                                            <span class="text-[#6CC452] text-[8px] md:text-[10px] font-bold uppercase font-['Retro_Gaming']">Main</span>
                                            <span id="quiz-detail-played" class="text-[#478D47] font-bold text-sm md:text-base font-['Space_Grotesk']">0x</span>
                                        </div>
                                    </div>
                                    <div class="w-0.5 h-8 md:h-10 bg-[#6CC452]/20"></div>
                                    <div class="flex items-center gap-2 flex-1 justify-center">
                                        <div class="w-8 h-8 md:w-10 md:h-10 rounded-full bg-white flex items-center justify-center border-2 border-[#6CC452]/30 shrink-0">
                                            <span class="material-symbols-outlined text-red-500 fill-icon text-base md:text-xl">favorite</span>
                                        </div>
                                        <div class="flex flex-col">
                                            <span class="text-[#6CC452] text-[8px] md:text-[10px] font-bold uppercase font-['Retro_Gaming']">Suka</span>
                                            <span id="quiz-detail-favorite" class="text-[#478D47] font-bold text-sm md:text-base font-['Space_Grotesk']">0</span>
                                        </div>
                                    </div>
                                </div>

                                <!-- Actions -->
                                <div class="flex gap-3 mt-2">
                                    <button id="quiz-detail-close-btn" class="flex-1 py-3 bg-[#F1F8E9] text-[#478D47] font-['Retro_Gaming'] text-[11px] uppercase rounded-xl border-b-4 border-[#6CC452]/30 hover:bg-[#E8F5E9] active:border-b-0 active:translate-y-1 transition-all">
                                        Tutup
                                    </button>
                                    <button id="quiz-detail-start-btn" class="flex-[2] py-3 bg-[#336B23] text-white font-['Retro_Gaming'] text-[11px] uppercase rounded-xl border-b-4 border-[#1F4514] hover:brightness-110 active:border-b-0 active:translate-y-1 transition-all flex items-center justify-center gap-2 shadow-lg">
                                        Mulai Quiz <span class="material-symbols-outlined text-base">arrow_forward</span>
                                    </button>
                                </div>
                            </div>
                        </div>

                    </div>
                </main>
            `;
            document.body.appendChild(quizSelectionUI);

            // Start Character Spawner
            GlobalBackground.startCharacterSpawner('selectquiz');

            // Add custom scrollbar and heart animation styling
            if (!document.getElementById('select-quiz-refinements')) {
                const style = document.createElement('style');
                style.id = 'select-quiz-refinements';
                style.innerHTML = `
                    .custom-scrollbar::-webkit-scrollbar {
                        width: 8px;
                    }
                    .custom-scrollbar::-webkit-scrollbar-track {
                        background: transparent;
                    }
                    .custom-scrollbar::-webkit-scrollbar-thumb {
                        background-color: #5BB043;
                        border-radius: 20px;
                        border: 2px solid white;
                    }
                    .custom-scrollbar::-webkit-scrollbar-thumb:hover {
                        background-color: #478D47;
                    }
                    .heart-water-fill {
                        animation: heartWaterFill 0.6s cubic-bezier(0.4, 0, 0.2, 1) forwards !important;
                        font-variation-settings: 'FILL' 1 !important;
                    }
                    @keyframes heartWaterFill {
                        0% { 
                            clip-path: inset(100% 0 0 0);
                        }
                        100% { 
                            clip-path: inset(0 0 0 0);
                        }
                    }
                    .heart-red { color: #EF4444 !important; }
                    .heart-idle { color: #94A3B8 !important; }
                    .fill-icon { font-variation-settings: 'FILL' 1 !important; }
                `;
                document.head.appendChild(style);
            }

            // Handle language change event
            window.addEventListener('languageChanged', () => {
                if (quizSelectionUI) {
                    const isHidden = quizSelectionUI.classList.contains('hidden');
                    quizSelectionUI.remove();
                    QuizSelectionUI.render();
                    const newUI = document.getElementById('quiz-selection-ui');
                    if (newUI && !isHidden) newUI.classList.remove('hidden');
                    window.dispatchEvent(new CustomEvent('selectQuizUIReRendered'));
                }
            });
        }
    }

}



