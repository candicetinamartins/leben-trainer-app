const UI_TRANSLATIONS = {
    en: {
        title: "LEBEN-IN-DEUTSCHLAND TRAINER",
        selectState: "Select your Bundesland",
        correctAnswer: "Correct Answer:",
        correct: "Wunderbar!",
        incorrect: "Leider falsch!",
        nextQuestion: "Next Question",
        finishExam: "Finish Exam",
        examPassed: "Exam Passed!",
        tryAgain: "Try Again",
        correct_label: "Correct",
        tryNewQuestions: "New Questions",
        retrySame: "Retry Same",
        changeRegion: "Change Region"
    },
    de: {
        title: "LEBEN-IN-DEUTSCHLAND TRAINER",
        selectState: "Wählen Sie Ihr Bundesland",
        correctAnswer: "Richtige Antwort:",
        correct: "Wunderbar!",
        incorrect: "Leider falsch!",
        nextQuestion: "Nächste Frage",
        finishExam: "Prüfung Beenden",
        examPassed: "Prüfung bestanden!",
        tryAgain: "Nochmal versuchen",
        correct_label: "Richtig",
        tryNewQuestions: "Neue Fragen",
        retrySame: "Wiederholen",
        changeRegion: "Region ändern"
    },
    tr: {
        title: "ALMANYA'DA YAŞAM",
        selectState: "Eyaletinizi seçin",
        correctAnswer: "Doğru Cevap:",
        correct: "Harika!",
        incorrect: "Maalesef yanlış!",
        nextQuestion: "Sonraki Soru",
        finishExam: "Sınavı Bitir",
        examPassed: "Sınav Geçildi!",
        tryAgain: "Tekrar Dene",
        correct_label: "Doğru",
        tryNewQuestions: "Yeni Sorular",
        retrySame: "Tekrarla",
        changeRegion: "Bölge Değiştir"
    },
    hi: { title: "जर्मनी में जीवन", selectState: "अपना राज्य चुनें", correctAnswer: "सही उत्तर:", correct: "बहुत बढ़िया!", incorrect: "गलत!", nextQuestion: "अगला प्रश्न", finishExam: "समाप्त करें", examPassed: "उत्तीर्ण!", tryAgain: "पुनः प्रयास", correct_label: "सही", tryNewQuestions: "नए प्रश्न", retrySame: "दोहराएं", changeRegion: "क्षेत्र बदलें" },
    ml: { title: "ജർമ്മനിയിൽ ജീവിതം", selectState: "സംസ്ഥാനം തിരഞ്ഞെടുക്കുക", correctAnswer: "ശരി:", correct: "മികച്ചത്!", incorrect: "തെറ്റ്!", nextQuestion: "അടുത്തത്", finishExam: "പൂർത്തിയാക്കുക", examPassed: "വിജയിച്ചു!", tryAgain: "വീണ്ടും", correct_label: "ശരി", tryNewQuestions: "പുതിയ ചോദ്യങ്ങൾ", retrySame: "ആവർത്തിക്കുക", changeRegion: "മാറ്റുക" },
    ta: { title: "ஜெர்மனியில் வாழ்க்கை", selectState: "மாநிலம் தேர்வு", correctAnswer: "சரியான பதில்:", correct: "அருமை!", incorrect: "தவறு!", nextQuestion: "அடுத்த கேள்வி", finishExam: "முடிக்கவும்", examPassed: "தேர்ச்சி!", tryAgain: "மீண்டும்", correct_label: "சரி", tryNewQuestions: "புதியவை", retrySame: "மீண்டும்", changeRegion: "மாற்றவும்" },
    te: { title: "జర్మనీలో జీవితం", selectState: "రాష్ట్రాన్ని ఎంచుకోండి", correctAnswer: "సరైన సమాధానం:", correct: "అద్భుతం!", incorrect: "తప్పు!", nextQuestion: "తదుపరి", finishExam: "ముగించండి", examPassed: "ఉత్తీర్ణత!", tryAgain: "మళ్ళీ", correct_label: "సరైనది", tryNewQuestions: "కొత్త ప్రశ్నలు", retrySame: "మళ్ళీ చేయండి", changeRegion: "మార్చండి" },
    ar: { title: "الحياة في ألمانيا", selectState: "اختر ولايتك", correctAnswer: "الإجابة الصحيحة:", correct: "رائع!", incorrect: "خطأ!", nextQuestion: "التالي", finishExam: "إنهاء", examPassed: "نجحت!", tryAgain: "حاول مرة أخرى", correct_label: "صحيح", tryNewQuestions: "أسئلة جديدة", retrySame: "كرر", changeRegion: "تغيير" },
    zh: { title: "德国生活", selectState: "选择您的州", correctAnswer: "正确答案：", correct: "太棒了！", incorrect: "错！", nextQuestion: "下一题", finishExam: "完成", examPassed: "通过！", tryAgain: "再试一次", correct_label: "正确", tryNewQuestions: "新题目", retrySame: "重复", changeRegion: "更改" },
    fa: { title: "زندگی در آلمان", selectState: "ایالت انتخاب کنید", correctAnswer: "پاسخ صحیح:", correct: "عالی!", incorrect: "اشتباه!", nextQuestion: "بعدی", finishExam: "پایان", examPassed: "قبول!", tryAgain: "تلاش مجدد", correct_label: "درست", tryNewQuestions: "سؤالات جدید", retrySame: "تکرار", changeRegion: "تغییر" },
    ru: { title: "ЖИЗНЬ В ГЕРМАНИИ", selectState: "Выберите землю", correctAnswer: "Правильно:", correct: "Отлично!", incorrect: "Ошибка!", nextQuestion: "Далее", finishExam: "Завершить", examPassed: "Сдано!", tryAgain: "Снова", correct_label: "Правильно", tryNewQuestions: "Новые вопросы", retrySame: "Повторить", changeRegion: "Изменить" }
};
class FlashcardApp {
    constructor() {
        this.selectedState = null;
        this.currentQuestionIndex = 0;
        this.questions = [];
        this.score = 0;
        this.answered = 0;
        this.showingResult = false;
        this.currentLanguage = localStorage.getItem('appLanguage') || 'en';
        this.init();
    }
    init() {
        this.render();
    }
    setLanguage(lang) {
        this.currentLanguage = lang;
        localStorage.setItem('appLanguage', lang);
        this.render();
    }
    getTranslation(key) {
        return UI_TRANSLATIONS[this.currentLanguage][key] || UI_TRANSLATIONS.en[key];
    }
    getQuestionText(question) {
        const langMap = {
            'en': 'questionEn', 'de': 'questionDe', 'tr': 'questionTr', 'hi': 'questionHi',
            'ml': 'questionMl', 'ta': 'questionTa', 'te': 'questionTe', 'ar': 'questionAr',
            'zh': 'questionZh', 'fa': 'questionFa', 'ru': 'questionRu'
        };
        return question[langMap[this.currentLanguage]] || question.questionDe;
    }
    getAnswerText(answer) {
        const langMap = {
            'en': 'textEn', 'de': 'text', 'tr': 'textTr', 'hi': 'textHi',
            'ml': 'textMl', 'ta': 'textTa', 'te': 'textTe', 'ar': 'textAr',
            'zh': 'textZh', 'fa': 'textFa', 'ru': 'textRu'
        };
        return answer[langMap[this.currentLanguage]] || answer.text;
    }
    shuffleArray(array) {
        const shuffled = [...array];
        for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
        return shuffled;
    }
    selectState(stateId) {
        this.selectedState = stateId;
        const stateQuestions = STATE_QUESTIONS[stateId] || [];
        const shuffledGeneral = this.shuffleArray([...GENERAL_QUESTIONS]).slice(0, 30);
        const shuffledState = this.shuffleArray([...stateQuestions]).slice(0, 3);
        const allQuestions = [...shuffledGeneral, ...shuffledState].map(q => ({
            ...q,
            answers: this.shuffleArray([...q.answers])
        }));
        this.questions = this.shuffleArray(allQuestions);
        this.currentQuestionIndex = 0;
        this.score = 0;
        this.answered = 0;
        this.showingResult = false;
        this.render();
    }
    selectAnswer(answerIndex) {
        if (this.showingResult) return;
        const question = this.questions[this.currentQuestionIndex];
        const selectedAnswer = question.answers[answerIndex];
        const correctAnswer = question.answers.find(a => a.correct);
        this.showingResult = true;
        this.answered++;
        if (selectedAnswer.correct) {
            this.score++;
        }
        this.renderFeedbackDrawer(selectedAnswer, correctAnswer, answerIndex);
    }
    nextQuestion() {
        this.showingResult = false;
        this.currentQuestionIndex++;
        if (this.currentQuestionIndex >= this.questions.length) {
            this.renderComplete();
        } else {
            this.render();
        }
    }
    renderAdBreak() {
        const app = document.getElementById('app');
        const progress = Math.round((this.currentQuestionIndex / this.questions.length) * 100);
        app.innerHTML = `
            <div class="h-full w-full bg-black/95 flex flex-col items-center justify-center p-6 relative">
                <div class="absolute top-4 right-4">
                    <button class="dismiss-ad-btn px-3 py-1 text-xs font-bold text-gray-500 border border-gray-700 rounded-full opacity-0 transition-opacity duration-500" id="dismiss-ad-btn">
                        Continue →
                    </button>
                </div>
                <div class="text-center mb-6">
                    <div class="text-ger-gold font-black text-sm uppercase tracking-widest mb-1">Quick Break</div>
                    <div class="text-white font-black text-2xl">${this.currentQuestionIndex} / ${this.questions.length}</div>
                    <div class="w-48 h-2 bg-gray-800 rounded-full mt-3 mx-auto overflow-hidden border border-gray-700">
                        <div class="h-full bg-ger-gold rounded-full transition-all" style="width:${progress}%"></div>
                    </div>
                    <div class="text-gray-500 text-xs mt-2 font-mono">${progress}% complete</div>
                </div>
                <!-- Interstitial Ad Slot -->
                <div class="w-full max-w-sm overflow-hidden flex items-center justify-center min-h-[250px] mb-6">
                    <ins class="adsbygoogle"
                        style="display:inline-block;width:300px;height:250px"
                        data-ad-client="ca-pub-3677433573599533"
                        data-ad-slot="BREAK_AD_SLOT_ID"></ins>
                </div>
                <div class="text-gray-600 text-[10px] uppercase tracking-widest">Ad closes automatically</div>
            </div>
        `;
        if (hasAdConsent()) {
            try { (adsbygoogle = window.adsbygoogle || []).push({}); } catch(e) {}
        }
        setTimeout(() => {
            const dismissBtn = document.getElementById('dismiss-ad-btn');
            if (dismissBtn) {
                dismissBtn.style.opacity = '1';
                dismissBtn.classList.add('text-white', 'border-white');
                dismissBtn.classList.remove('text-gray-500', 'border-gray-700');
                dismissBtn.addEventListener('click', () => this.dismissAdBreak());
            }
        }, 5000);
    }
    dismissAdBreak() {
        this.render();
    }
    restart() {
        this.selectedState = null;
        this.currentQuestionIndex = 0;
        this.questions = [];
        this.score = 0;
        this.answered = 0;
        this.showingResult = false;
        this.render();
    }
    render() {
        const app = document.getElementById('app');
        if (!this.selectedState) {
            app.innerHTML = this.renderStateSelection();
        } else {
            app.innerHTML = this.renderQuestionCard();
            if (hasAdConsent()) {
                try { (adsbygoogle = window.adsbygoogle || []).push({}); } catch(e) {}
            }
        }
        this.attachEventListeners();
    }
    renderLanguagePill(langCode, label) {
        const isActive = this.currentLanguage === langCode;
        return `
            <button class="lang-btn shrink-0 px-4 py-2 mr-2 rounded-full border-2 border-black font-bold text-sm transition-transform active:scale-95 ${isActive ? 'bg-ger-gold shadow-none' : 'bg-white shadow-neo-sm'}" data-lang="${langCode}">
                ${label}
            </button>
        `;
    }
    renderStateSelection() {
        const languages = [
            {code: 'en', label: 'English'}, {code: 'de', label: 'Deutsch'}, {code: 'tr', label: 'Türkçe'},
            {code: 'ar', label: 'العربية'}, {code: 'ru', label: 'Русский'}, {code: 'hi', label: 'हिन्दी'},
            {code: 'fa', label: 'فارسی'}, {code: 'zh', label: '中文'}, {code: 'ml', label: 'മലയാളം'},
            {code: 'ta', label: 'தமிழ்'}, {code: 'te', label: 'తెలుగు'}
        ];
        return `
            <div class="bg-paper border-b-4 border-black p-4 shrink-0 z-10 relative">
                <h1 class="text-2xl font-black text-black tracking-tight leading-none">
                    LEBEN-IN-DEUTSCHLAND <br><span class="bg-black text-white px-2">TRAINER</span>
                </h1>
                <div class="flex overflow-x-auto no-scrollbar mt-4 pb-1">
                    ${languages.map(l => this.renderLanguagePill(l.code, l.label)).join('')}
                </div>
            </div>
            <div class="flex-1 overflow-y-auto p-4 bg-gray-100">
                <p class="text-lg font-bold mb-4 text-center text-gray-600 font-mono sticky top-0 bg-gray-100 py-2 z-0">
                    ${this.getTranslation('selectState')}
                </p>
                <div class="grid grid-cols-2 gap-3 pb-4">
                    ${STATES.map(state => `
                        <button
                            class="state-btn relative h-32 bg-white border-2 border-black rounded-xl shadow-neo flex items-center justify-center p-2 transition-all active:shadow-pressed active:translate-x-[4px] active:translate-y-[4px]"
                            data-state="${state}"
                        >
                            <span class="text-sm md:text-base font-bold text-black uppercase text-center leading-tight">
                                ${state}
                            </span>
                        </button>
                    `).join('')}
                </div>
                <div class="flex items-center justify-center gap-4 py-4 border-t border-gray-200 mt-2">
                    <a href="privacy.html" class="text-xs text-gray-400 underline">Privacy Policy</a>
                    <span class="text-gray-300">|</span>
                    <button class="consent-settings-btn text-xs text-gray-400 underline">Cookie Settings</button>
                </div>
            </div>
        `;
    }
    renderQuestionCard() {
        const question = this.questions[this.currentQuestionIndex];
        const progress = ((this.currentQuestionIndex) / this.questions.length) * 100;
        const translatedQuestion = this.currentLanguage !== 'de' ? this.getQuestionText(question) : '';
        const translationHtml = translatedQuestion && translatedQuestion !== question.questionDe
            ? `<div class="bg-blue-50 border-l-4 border-blue-500 p-3 mt-3 rounded-r text-sm"><p class="text-gray-700 italic font-medium leading-relaxed">${translatedQuestion}</p></div>`
            : '';
        let imageSection = '';
        if (question.images && question.images.length > 0) {
            const imgs = question.images.map((img, i) =>
                `<img src="${img}" class="h-40 w-auto object-contain border border-gray-200 rounded bg-white" />`
            ).join('');
            imageSection = `
                <div class="mb-4 border-2 border-black p-2 rounded-lg bg-gray-50 shadow-neo-sm">
                    <div class="flex gap-2 overflow-x-auto no-scrollbar">
                        ${imgs}
                    </div>
                    ${question.copyright ? `<div class="text-[10px] text-gray-500 mt-1 text-center leading-tight">${question.copyright}</div>` : ''}
                </div>`;
        } else if (question.image) {
            imageSection = `
                <div class="mb-4 border-2 border-black rounded-lg overflow-hidden bg-white shadow-neo-sm">
                    <img src="${question.image}" class="w-full max-h-48 object-contain bg-gray-50" />
                    ${question.copyright ? `<div class="text-[10px] text-gray-500 mt-1 text-center px-2 pb-1">${question.copyright}</div>` : ''}
                </div>`;
        }
        return `
            <div class="h-14 bg-white border-b-2 border-black flex items-center justify-between px-4 shrink-0">
                <button class="back-btn flex items-center justify-center w-8 h-8 bg-gray-100 border-2 border-black rounded hover:bg-red-100 transition-colors">
                    ←
                </button>
                <div class="flex-1 mx-4 h-4 bg-gray-200 border-2 border-black rounded-full overflow-hidden">
                    <div class="h-full bg-ger-gold transition-all duration-300" style="width: ${progress}%"></div>
                </div>
                <div class="font-mono font-bold text-xs bg-black text-white px-2 py-1 rounded">
                    ${this.currentQuestionIndex + 1}/${this.questions.length}
                </div>
                <button class="consent-settings-btn flex items-center justify-center w-8 h-8 ml-2 text-gray-400 hover:text-black transition-colors" title="Cookie Settings">
                    ⚙
                </button>
            </div>
            <div class="flex-1 overflow-y-auto bg-paper p-5 pb-56" id="question-scroll-area">
                ${imageSection}
                <h2 class="text-xl font-black text-black leading-snug">
                    ${question.questionDe}
                </h2>
                ${translationHtml}
                <div class="grid gap-3 mt-6" id="answers-container">
                    ${question.answers.map((answer, idx) => `
                        <button
                            class="answer-btn w-full text-left bg-white border-2 border-black shadow-neo rounded-xl relative overflow-hidden transition-all active:scale-[0.98] active:shadow-none"
                            data-index="${idx}"
                        >
                            <div class="flex items-stretch min-h-[3.5rem]">
                                <div class="flex items-center justify-center w-12 bg-gray-100 border-r-2 border-black font-bold text-lg text-gray-500">
                                    ${String.fromCharCode(65 + idx)}
                                </div>
                                <div class="p-3 flex-1 flex flex-col justify-center">
                                    <span class="font-bold text-base text-gray-900 leading-tight">${answer.text}</span>
                                    <span class="answer-translation text-xs text-gray-500 italic mt-1 leading-tight hidden" data-translation="${this.currentLanguage !== 'de' && this.getAnswerText(answer) !== answer.text ? this.getAnswerText(answer) : ''}"></span>
                                </div>
                            </div>
                        </button>
                    `).join('')}
                </div>
                <!-- Banner Ad -->
                <div class="mt-6 flex justify-center min-h-[250px]">
                    <ins class="adsbygoogle"
                        style="display:inline-block;width:300px;height:250px"
                        data-ad-client="ca-pub-3677433573599533"
                        data-ad-slot="BREAK_AD_SLOT_ID"></ins>
                </div>
            </div>
            <div id="drawer-container" class="fixed bottom-0 left-0 w-full z-50 pointer-events-none"></div>
        `;
    }
    renderFeedbackDrawer(selectedAnswer, correctAnswer, selectedIndex) {
        const isCorrect = selectedAnswer.correct;
        const container = document.getElementById('drawer-container');
        const buttons = document.querySelectorAll('.answer-btn');
        buttons.forEach((btn, idx) => {
            btn.disabled = true;
            btn.classList.add('opacity-80', 'grayscale-[0.5]');
            const question = this.questions[this.currentQuestionIndex];
            const answer = question.answers[idx];
            const indicator = btn.querySelector('.w-12');
            if (answer.correct) {
                btn.classList.remove('grayscale-[0.5]', 'opacity-80', 'bg-white');
                btn.classList.add('bg-green-50', 'ring-2', 'ring-green-500');
                indicator.classList.remove('bg-gray-100', 'text-gray-500');
                indicator.classList.add('bg-green-500', 'text-white');
            } else if (idx === selectedIndex && !isCorrect) {
                btn.classList.remove('grayscale-[0.5]', 'opacity-80', 'bg-white');
                btn.classList.add('bg-red-50');
                indicator.classList.remove('bg-gray-100', 'text-gray-500');
                indicator.classList.add('bg-red-500', 'text-white');
            }
            const translationEl = btn.querySelector('.answer-translation');
            if (translationEl && translationEl.dataset.translation) {
                translationEl.textContent = translationEl.dataset.translation;
                translationEl.classList.remove('hidden');
            }
        });
        const drawerContent = `
            <div class="animate-slide-up bg-white border-t-4 border-black shadow-[0_-5px_20px_rgba(0,0,0,0.1)] p-5 pb-8 pointer-events-auto safe-bottom">
                <div class="flex items-center gap-3 mb-4">
                    <div class="w-10 h-10 rounded-full border-2 border-black flex items-center justify-center text-xl shadow-neo-sm ${isCorrect ? 'bg-green-400' : 'bg-red-400'}">
                        ${isCorrect ? '✓' : '✕'}
                    </div>
                    <div class="flex-1">
                        <h3 class="font-black text-lg uppercase ${isCorrect ? 'text-green-700' : 'text-red-700'}">
                            ${isCorrect ? this.getTranslation('correct') : this.getTranslation('incorrect')}
                        </h3>
                        ${!isCorrect ? `<div class="text-xs font-bold text-gray-500 uppercase">Right answer: <span class="text-black">${String.fromCharCode(65 + this.questions[this.currentQuestionIndex].answers.indexOf(correctAnswer))}</span></div>` : ''}
                    </div>
                </div>
                ${hasAdConsent() ? `
                <!-- Drawer Ad Slot -->
                <div class="drawer-ad-slot w-full my-3 overflow-hidden flex items-center justify-center">
                    <ins class="adsbygoogle"
                        style="display:block"
                        data-ad-client="ca-pub-3677433573599533"
                        data-ad-slot="DRAWER_AD_SLOT_ID"
                        data-ad-format="auto"
                        data-full-width-responsive="true"></ins>
                </div>
                ` : ''}
                <button class="next-btn w-full py-4 text-lg font-black tracking-wide bg-blue-600 text-white border-2 border-black rounded-xl shadow-neo active:shadow-none active:translate-x-[4px] active:translate-y-[4px] transition-all">
                    ${this.currentQuestionIndex + 1 >= this.questions.length ? this.getTranslation('finishExam') : this.getTranslation('nextQuestion')} →
                </button>
            </div>
        `;
        container.innerHTML = drawerContent;
        if (hasAdConsent()) {
            try { (adsbygoogle = window.adsbygoogle || []).push({}); } catch(e) {}
        }
        const scrollArea = document.getElementById('question-scroll-area');
        if (scrollArea) {
            scrollArea.style.paddingBottom = '20rem';
        }
        setTimeout(() => {
            const selectedBtn = document.querySelector('.answer-btn[data-index="' + selectedIndex + '"]');
            if (selectedBtn) {
                selectedBtn.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        }, 350);
        document.querySelector('.next-btn').addEventListener('click', () => this.nextQuestion());
    }
    renderComplete() {
        const percentage = Math.round((this.score / this.questions.length) * 100);
        const passed = this.score >= 17;
        const app = document.getElementById('app');
        app.innerHTML = `
            <div class="h-full w-full bg-paper flex flex-col overflow-y-auto p-6 items-center justify-center">
                <div class="w-full max-w-md bg-white border-4 border-black shadow-neo rounded-2xl overflow-hidden text-center relative">
                    <div class="absolute top-0 left-0 w-full h-4 ${passed ? 'bg-green-500' : 'bg-red-500'} border-b-2 border-black"></div>
                    <div class="p-8 pt-12">
                        <div class="inline-flex items-center justify-center w-24 h-24 mb-6 rounded-full border-4 border-black bg-gray-50 text-5xl shadow-neo-sm">
                            ${passed ? '🎉' : '📚'}
                        </div>
                        <h2 class="text-3xl font-black text-black mb-2 uppercase tracking-tight">
                            ${passed ? this.getTranslation('examPassed') : this.getTranslation('tryAgain')}
                        </h2>
                        <div class="bg-gray-100 border-2 border-black p-4 rounded-xl my-6 flex flex-col items-center">
                            <span class="text-xs font-bold text-gray-500 uppercase">Score</span>
                            <div class="text-5xl font-black ${passed ? 'text-green-600' : 'text-red-600'}">
                                ${this.score}<span class="text-2xl text-black">/${this.questions.length}</span>
                            </div>
                            <span class="font-mono font-bold text-sm mt-1">${percentage}%</span>
                        </div>
                        <div class="space-y-3 w-full">
                            <button class="new-questions-btn w-full py-3.5 font-bold bg-ger-gold text-black border-2 border-black rounded-lg shadow-neo active:shadow-none active:translate-x-[2px] active:translate-y-[2px] transition-all">
                                ${this.getTranslation('tryNewQuestions')}
                            </button>
                            <div class="flex gap-3">
                                <button class="restart-btn flex-1 py-3.5 font-bold bg-white text-black border-2 border-black rounded-lg shadow-neo-sm active:shadow-none active:translate-y-[2px] transition-all text-sm">
                                    ${this.getTranslation('retrySame')}
                                </button>
                                <button class="back-btn flex-1 py-3.5 font-bold bg-white text-black border-2 border-black rounded-lg shadow-neo-sm active:shadow-none active:translate-y-[2px] transition-all text-sm">
                                    ${this.getTranslation('changeRegion')}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
        document.querySelector('.new-questions-btn').addEventListener('click', () => this.selectState(this.selectedState));
        document.querySelector('.restart-btn').addEventListener('click', () => {
            this.currentQuestionIndex = 0;
            this.score = 0;
            this.answered = 0;
            this.showingResult = false;
            this.render();
        });
        document.querySelector('.back-btn').addEventListener('click', () => this.restart());
    }
    attachEventListeners() {
        document.querySelectorAll('.lang-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                this.setLanguage(btn.dataset.lang);
            });
        });
        document.querySelectorAll('.state-btn').forEach(btn => {
            btn.addEventListener('click', () => this.selectState(btn.dataset.state));
        });
        document.querySelectorAll('.answer-btn').forEach(btn => {
            btn.addEventListener('click', () => this.selectAnswer(parseInt(btn.dataset.index)));
        });
        document.querySelector('.back-btn')?.addEventListener('click', () => this.restart());
        document.querySelectorAll('.consent-settings-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                reopenConsentBanner();
            });
        });
    }
}
document.addEventListener('DOMContentLoaded', () => {
    new FlashcardApp();
});