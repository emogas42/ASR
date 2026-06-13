var QUESTIONS = [
    { id: 1, q: "Muassasa oziq-ovqat xavfsizligi sohasida talab qilinadigan ro'yxatdan o'tish va tasdiqlash tartiblarini bajaradimi?", law: "AR Qonuni — 24, 25-moddalar", cor: "Muassasani oziq-ovqat xavfsizligi organida ro'yxatdan o'tkazing; davlat ro'yxatini talab qiladigan mahsulotlar uchun zarur hujjatlarni tayyorlang.", pen: "Admin. kodeks 220.1/220.2-moddasi: Jismoniy — 200–300 AZN; Mansabdor — 800–1000 AZN; Yuridik — 2000–2500 AZN" },
    { id: 2, q: "Muassasa faoliyati oziq-ovqat xavfsizligi sohasidagi amaldagi texnik normativ-huquqiy hujjatlar talablariga muvofiqmi?", law: "AR Qonuni — 16-modda", cor: "Amaldagi normativ hujjatlarni ko'rib chiqing, nomuvofiqliklarni aniqlang va ichki tartiblarni yangilang.", pen: "Admin. kodeks 220.3-moddasi: Jismoniy — 100–150 AZN; Mansabdor — 400–600 AZN; Yuridik — 1000–1500 AZN" },
    { id: 3, q: "Muassasa hududi, binolari va ishlab chiqarish maydonlarining loyihasida belgilangan talablarga rioya qilinganmi?", law: "AR Qonuni — 16.3-modda", cor: "Bino loyihasini oziq-ovqat xavfsizligi mutaxassislari bilan ko'rib chiqing; normativ talablarga muvofiq ta'mirlash rejasini tuzing.", pen: "Admin. kodeks 220.3-moddasi: Jismoniy — 100–150 AZN; Mansabdor — 400–600 AZN; Yuridik — 1000–1500 AZN" },
    { id: 4, q: "Pollar, devorlar, shiftlar, eshiklar va derazalar sanitariya-gigiena talablariga muvofiqmi?", law: "AR Qonuni — 16.3-modda", cor: "Ishlab chiqarish maydonining barcha konstruktiv elementlarini baholang; mavjud nomuvofiqliklarni bartaraf eting.", pen: "Admin. kodeks 220.3-moddasi: Jismoniy — 100–150 AZN; Mansabdor — 400–600 AZN; Yuridik — 1000–1500 AZN" },
    { id: 5, q: "Qo'l yuvish joylari, sanitariya tugunlari, kiyinish xonalari va maishiy binolar talab qilinadigan shartlarga egami?", law: "AR Qonuni — 16.3-modda", cor: "Qo'l yuvish joylari, sanitariya tugunlari va kiyinish xonalarini normativ talablarga muvofiq jihozlang; uskunalarni yangilang.", pen: "Admin. kodeks 220.3-moddasi: Jismoniy — 100–150 AZN; Mansabdor — 400–600 AZN; Yuridik — 1000–1500 AZN" },
    { id: 6, q: "Ventilyatsiya, isitish va yoritish tizimlari oziq-ovqat xavfsizligini ta'minlaydimi?", law: "AR Qonuni — 16.3-modda", cor: "Ventilyatsiya, isitish va yoritish tizimlarini mutaxassis tomonidan tekshirting; normativ ko'rsatkichlarga erishish uchun zarur o'zgartirishlar kiriting.", pen: "Admin. kodeks 220.3-moddasi: Jismoniy — 100–150 AZN; Mansabdor — 400–600 AZN; Yuridik — 1000–1500 AZN" },
    { id: 7, q: "Uskunalar, inventar va oziq-ovqat bilan aloqada bo'ladigan yuzalar xavfsizlik talablariga javob beradimi?", law: "AR Qonuni — 16.3, 17.1-moddalar", cor: "Oziq-ovqat bilan aloqada bo'ladigan barcha uskunalar va yuzalarning auditini o'tkazing; talablarga javob bermaydigan uskunalarni almashtiring.", pen: "Admin. kodeks 220.3-moddasi: Jismoniy — 100–150 AZN; Mansabdor — 400–600 AZN; Yuridik — 1000–1500 AZN" },
    { id: 8, q: "O'lchov asboblari, termometrlar va boshqa nazorat qurilmalari kalibrlanadimi va ishchi holatda saqlanadimi?", law: "AR Qonuni — 16.2, 16.4-moddalar", cor: "Barcha o'lchov asboblari uchun kalibrlash jadvali tuzing; muntazam texnik xizmat tartiblarini joriy eting.", pen: "Admin. kodeks 220.3-moddasi: Jismoniy — 100–150 AZN; Mansabdor — 400–600 AZN; Yuridik — 1000–1500 AZN" },
    { id: 9, q: "Ishlab chiqarishda ishlatiladigan suv va muz xavfsizlik talablariga javob beradimi?", law: "AR Qonuni — 14, 16.3-moddalar", cor: "Suv sifati sertifikatlarini oling; muntazam laboratoriya tekshiruvlarini o'tkazing; muz ishlab chiqarish tartiblarini hujjatlashtiring.", pen: "Admin. kodeks 220.3-moddasi: Jismoniy — 100–150 AZN; Mansabdor — 400–600 AZN; Yuridik — 1000–1500 AZN" },
    { id: 10, q: "Sovutish, muzlatish, eritish va issiqlik bilan ishlash jarayonlari normativ talablarga muvofiq amalga oshiriladimi?", law: "AR Qonuni — 16.1, 16.2-moddalar", cor: "Bu jarayonlar uchun yozma tartiblar tuzing; haroratni nazorat qilish jurnallarini joriy eting; xodimlarni o'qiting.", pen: "Admin. kodeks 220.3-moddasi: Jismoniy — 100–150 AZN; Mansabdor — 400–600 AZN; Yuridik — 1000–1500 AZN" },
    { id: 11, q: "Kanalizatsiya va drenaj tizimlari xavfsiz va samarali ishlayaptimi?", law: "AR Qonuni — 16.3-modda", cor: "Kanalizatsiya tizimining texnik ko'rigini o'tkazing; normativ talablarga muvofiq drenaj o'rnating; muntazam texnik xizmat ko'rsating.", pen: "Admin. kodeks 220.3-moddasi: Jismoniy — 100–150 AZN; Mansabdor — 400–600 AZN; Yuridik — 1000–1500 AZN" },
    { id: 12, q: "Tozalash va dezinfeksiya tadbirlari tizimli ravishda amalga oshiriladimi?", law: "AR Qonuni — 16.2, 16.3-moddalar", cor: "Rasmiy tozalash va dezinfeksiya dasturini tuzing; bajarilishini jurnallarda qayd eting; qo'llaniladigan mahsulotlarning sertifikatlarini saqlang.", pen: "Admin. kodeks 220.3-moddasi: Jismoniy — 100–150 AZN; Mansabdor — 400–600 AZN; Yuridik — 1000–1500 AZN" },
    { id: 13, q: "Dezinseksiya, deratizatsiya va zararkunandalarga qarshi kurash tadbirlari samarali tashkil qilinganmi?", law: "AR Qonuni — 16.3-modda", cor: "Litsenziyalangan zararkunandalarga qarshi kurash kompaniyasi bilan shartnoma tuzing; muntazam tekshiruv jadvali joriy eting; ko'rilgan chora-tadbirlarni qayd eting.", pen: "Admin. kodeks 220.3-moddasi: Jismoniy — 100–150 AZN; Mansabdor — 400–600 AZN; Yuridik — 1000–1500 AZN" },
    { id: 14, q: "Ishlab chiqarish va oziq-ovqat chiqindilari xavfsiz boshqariladimi?", law: "AR Qonuni — 16.3-modda", cor: "Chiqindilarni boshqarish uchun yozma tartib tuzing; barcha chiqindi oqimlarini qayd eting; alohida chiqindi saqlash maydoni belgilang.", pen: "Admin. kodeks 220.3-moddasi: Jismoniy — 100–150 AZN; Mansabdor — 400–600 AZN; Yuridik — 1000–1500 AZN" },
    { id: 15, q: "Xodimlarning shaxsiy gigienas, tibbiy ko'rik va salomatligi nazorat ostida saqlanadimi?", law: "AR Qonuni — 16.3-modda", cor: "Barcha xodimlar uchun tibbiy ko'rik jadvali tuzing; shaxsiy gigiena qoidalarini hujjatlashtiring; gigiena bo'yicha o'qitishni amalga oshiring.", pen: "Admin. kodeks 220.3-moddasi: Jismoniy — 100–150 AZN; Mansabdor — 400–600 AZN; Yuridik — 1000–1500 AZN" },
    { id: 16, q: "Xom ashyo, yordamchi materiallar va kiruvchi mahsulotlarni qabul qilishda muvofiqlik nazorati amalga oshiriladimi?", law: "AR Qonuni — 16.1-modda", cor: "Kiruvchi mahsulotlarni qabul qilishda rasmiy tekshiruv tartibini tuzing; muvofiqlik tekshiruv jurnalini joriy eting; ta'minotchilarni baholang.", pen: "Admin. kodeks 220.3-moddasi: Jismoniy — 100–150 AZN; Mansabdor — 400–600 AZN; Yuridik — 1000–1500 AZN" },
    { id: 17, q: "Maxsus maqsadli, boyitilgan, biologik faol va GMO tarkibli mahsulotlarga qo'yiladigan talablarga rioya qilinmoqdami?", law: "AR Qonuni — 11, 12, 13, 25-moddalar", cor: "Maxsus mahsulotlarning ro'yxatdan o'tish hujjatlarini ko'rib chiqing; GMO va biologik faol mahsulotlar uchun zarur ruxsatnomalarni oling.", pen: "Admin. kodeks 220.3-moddasi: Jismoniy — 100–150 AZN; Mansabdor — 400–600 AZN; Yuridik — 1000–1500 AZN" },
    { id: 18, q: "Ishlab chiqarish jarayonlarida oziq-ovqat xavfsizligi xavflari va o'zaro ifloslanish samarali boshqariladimi?", law: "AR Qonuni — 16.2, 16.4-moddalar", cor: "HACCP rejasini ko'rib chiqing; o'zaro ifloslanishni nazorat qilish bo'yicha alohida tartiblar tuzing; muhim nazorat nuqtalarini hujjatlashtiring.", pen: "Admin. kodeks 220.3-moddasi: Jismoniy — 100–150 AZN; Mansabdor — 400–600 AZN; Yuridik — 1000–1500 AZN" },
    { id: 19, q: "Mahsulotlarni belgilash, markalash va iste'molchiga taqdim etiladigan ma'lumotlar qonunchilik talablariga muvofiqmi?", law: "AR Qonuni — 17-modda", cor: "Barcha mahsulot yorliqlarini tekshiring; barcha talab qilinadigan ma'lumotlar (tarkibi, ishlab chiqarilgan sana, saqlash shartlari) mavjudligini ta'minlang.", pen: "Admin. kodeks 220.3-moddasi: Jismoniy — 100–150 AZN; Mansabdor — 400–600 AZN; Yuridik — 1000–1500 AZN" },
    { id: 20, q: "Mahsulotlarni saqlash, tashish va logistika jarayonlari xavfsizlik talablariga javob beradimi?", law: "AR Qonuni — 16.3-modda", cor: "Saqlash shartlarini hujjatlashtiring; haroratni nazorat qilish jurnallarini joriy eting; transport vositalarining gigiena talablariga muvofiqligini tekshiring.", pen: "Admin. kodeks 220.3-moddasi: Jismoniy — 100–150 AZN; Mansabdor — 400–600 AZN; Yuridik — 1000–1500 AZN" },
    { id: 21, q: "Xodimlar oziq-ovqat xavfsizligi va gigiena bo'yicha tegishli o'quv tadbirlariga jalb qilinmoqdami?", law: "AR Qonuni — 16.2-modda", cor: "Xodimlar uchun muntazam oziq-ovqat xavfsizligi va gigiena bo'yicha o'qitishlar o'tkazing; ishtirok yozuvlarini saqlang; bilimlarni tekshirishlar o'tkazing.", pen: "Admin. kodeks 220.3-moddasi: Jismoniy — 100–150 AZN; Mansabdor — 400–600 AZN; Yuridik — 1000–1500 AZN" },
    { id: 22, q: "Oziq-ovqat bilan aloqadagi materiallar va qadoqlash vositalari qonunchilik talablariga javob beradimi?", law: "AR Qonuni — 17.1, 24.1-moddalar", cor: "Oziq-ovqat bilan aloqadagi barcha materiallar uchun muvofiqlik sertifikatlarini oling; sertifikatsiz materiallarni darhol almashtiring.", pen: "Admin. kodeks 220.3-moddasi: Jismoniy — 100–150 AZN; Mansabdor — 400–600 AZN; Yuridik — 1000–1500 AZN" },
    { id: 23, q: "Mahsulotlarning reklamasi, taqdimoti, markalanishi va iste'molchilarni ma'lumotlantirish qonunchilik talablariga muvofiqmi?", law: "AR Qonuni — 8, 17-moddalar", cor: "Barcha reklama materiallarini ko'rib chiqing; chalg'ituvchi da'volarni bartaraf eting; shaffof ma'lumotlantirish siyosatini ishlab chiqing.", pen: "Admin. kodeks 220.3-moddasi: Jismoniy — 100–150 AZN; Mansabdor — 400–600 AZN; Yuridik — 1000–1500 AZN" },
    { id: 24, q: "Muassasada mahsulotlarni kuzatib borish, qaytarib olish va ta'minot zanjiri bo'yicha nazorat tizimi samarali ishlamoqdami?", law: "AR Qonuni — 24-modda", cor: "Mahsulotni kuzatib borish tizimini joriy eting; qaytarib olish tartiblarini tuzing, sinab ko'ring va qayd eting; partiya raqamlash tizimini joriy eting.", pen: "Admin. kodeks 220.3-moddasi: Jismoniy — 100–150 AZN; Mansabdor — 400–600 AZN; Yuridik — 1000–1500 AZN" }
];

var userInfo = {};
var answers = [];
var currentQ = 0;
var TOTAL = QUESTIONS.length;

document.getElementById('diagForm').addEventListener('submit', function (e) {
    e.preventDefault();
    if (!validateForm()) return;
    userInfo = {
        objName: document.getElementById('dObjName').value.trim(),
        phone: document.getElementById('dPhone').value.trim(),
        email: document.getElementById('dEmail').value.trim(),
        activity: document.getElementById('dActivity').value,
        product: document.getElementById('dProduct').value.trim()
    };
    quizOpen();
});

function validateForm() {
    var ok = true;
    function chk(wid, iid, fn) {
        var w = document.getElementById(wid), el = document.getElementById(iid), pass = fn(el.value.trim());
        w.classList.toggle('has-err', !pass); el.classList.toggle('err', !pass); if (!pass) ok = false;
    }
    chk('df-objname', 'dObjName', function (v) { return v.length >= 2; });
    chk('df-phone', 'dPhone', function (v) { return v.length >= 7; });
    chk('df-email', 'dEmail', function (v) { return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v); });
    chk('df-activity', 'dActivity', function (v) { return v !== ''; });
    chk('df-product', 'dProduct', function (v) { return v.length >= 2; });
    return ok;
}

function quizOpen() {
    var i; answers = [];
    for (i = 0; i < TOTAL; i++) { answers[i] = null; }
    currentQ = 0;
    document.getElementById('quizResultScreen').style.display = 'none';
    document.getElementById('quizQScreen').style.display = '';
    document.getElementById('quizOverlay').classList.add('active');
    document.body.style.overflow = 'hidden';
    showQuestion(0);
}

function quizClose() {
    if (window.confirm('Diagnostikadan chiqishni xohlaysizmi? Javoblaringiz o\'chib ketadi.')) {
        document.getElementById('quizOverlay').classList.remove('active');
        document.body.style.overflow = '';
    }
}

function showQuestion(idx) {
    currentQ = idx;
    var q = QUESTIONS[idx];
    document.getElementById('qNumLabel').textContent = 'Savol ' + (idx + 1) + ' / ' + TOTAL;
    document.getElementById('qStepLabel').textContent = (idx + 1) + ' / ' + TOTAL;
    document.getElementById('qProgressFill').style.width = ((idx / TOTAL) * 100) + '%';
    document.getElementById('qBackBtn').className = 'q-back-btn' + (idx === 0 ? ' q-hidden' : '');
    var t = document.getElementById('qText');
    t.textContent = q.q;
    t.classList.remove('q-fade');
    void t.offsetWidth;
    t.classList.add('q-fade');
    renderDots(idx);
}

function quizAnswer(isYes) {
    answers[currentQ] = isYes;
    if (currentQ < TOTAL - 1) { showQuestion(currentQ + 1); } else { showResults(); }
}

function quizBack() { if (currentQ > 0) showQuestion(currentQ - 1); }

function renderDots(cur) {
    var h = '', i, c;
    for (i = 0; i < TOTAL; i++) {
        c = 'q-dot';
        if (i === cur) c += ' q-dot-cur';
        else if (answers[i] === true) c += ' q-dot-yes';
        else if (answers[i] === false) c += ' q-dot-no';
        h += '<span class="' + c + '"></span>';
    }
    document.getElementById('qDots').innerHTML = h;
}

function showResults() {
    var correct = 0, i;
    for (i = 0; i < TOTAL; i++) { if (answers[i] === true) correct++; }
    var failed = TOTAL - correct, score = Math.round((correct / TOTAL) * 100);
    document.getElementById('quizQScreen').style.display = 'none';
    document.getElementById('quizResultScreen').style.display = '';
    document.getElementById('quizContainer').scrollTop = 0;
    document.getElementById('qProgressFill').style.width = '100%';
    document.getElementById('qStepLabel').textContent = 'Yakunlandi';
    document.getElementById('qBackBtn').className = 'q-back-btn q-hidden';
    document.getElementById('resultSubtitle').textContent = userInfo.objName + ' · ' + userInfo.activity;
    var circ = 345.4, offset = circ * (1 - score / 100);
    var color = score >= 80 ? '#22c55e' : score >= 60 ? '#f59e0b' : '#ef4444';
    var arc = document.getElementById('resultArc');
    arc.style.stroke = color;
    setTimeout(function () { arc.style.strokeDashoffset = offset; }, 80);
    animateCount('resultPct', 0, score, '%', 1400);
    document.getElementById('statOk').textContent = correct;
    document.getElementById('statFail').textContent = failed;
    var badge = document.getElementById('resultBadge');
    var lbl = score >= 80 ? 'Yuqori muvofiqlik' : score >= 60 ? 'O\'rtacha muvofiqlik' : 'Past muvofiqlik';
    var bc = score >= 80 ? 'badge-green' : score >= 60 ? 'badge-orange' : 'badge-red';
    badge.textContent = lbl; badge.className = 'result-badge ' + bc;
    if (failed > 0) {
        document.getElementById('resultPerfect').style.display = 'none';
        document.getElementById('resultTableSection').style.display = '';
        var rows = '';
        for (i = 0; i < TOTAL; i++) {
            if (answers[i] === false) {
                rows += '<tr><td>' + QUESTIONS[i].q + '</td><td>' + QUESTIONS[i].law + '</td><td>' + QUESTIONS[i].cor + '</td></tr>';
            }
        }
        document.getElementById('resultTableBody').innerHTML = rows;
    } else {
        document.getElementById('resultTableSection').style.display = 'none';
        document.getElementById('resultPerfect').style.display = '';
    }
}

function animateCount(id, from, to, sfx, dur) {
    var el = document.getElementById(id), start = null;
    function step(ts) {
        if (!start) start = ts;
        var p = Math.min((ts - start) / dur, 1);
        el.textContent = Math.round(from + (to - from) * p) + sfx;
        if (p < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
}

function quizRestart() {
    var i; for (i = 0; i < TOTAL; i++) { answers[i] = null; }
    currentQ = 0;
    document.getElementById('quizResultScreen').style.display = 'none';
    document.getElementById('quizQScreen').style.display = '';
    document.getElementById('quizContainer').scrollTop = 0;
    showQuestion(0);
}

function downloadPDF() {
    var doc = new window.jspdf.jsPDF('p', 'mm', 'a4');
    var correct = 0, i;
    for (i = 0; i < TOTAL; i++) { if (answers[i] === true) correct++; }
    var failed = TOTAL - correct, score = Math.round((correct / TOTAL) * 100);
    var today = new Date();
    var ds = today.getDate() + '.' + (today.getMonth() + 1) + '.' + today.getFullYear();
    var col = score >= 80 ? [34, 197, 94] : score >= 60 ? [245, 158, 11] : [239, 68, 68];
    var rlbl = score >= 80 ? 'Yuqori muvofiqlik' : score >= 60 ? 'O\'rtacha muvofiqlik' : 'Past muvofiqlik';
    doc.setFillColor(17, 24, 39); doc.rect(0, 0, 210, 36, 'F');
    doc.setTextColor(255, 255, 255); doc.setFontSize(14); doc.setFont('helvetica', 'bold');
    doc.text('ASR Development Consulting Group', 105, 14, { align: 'center' });
    doc.setFontSize(10); doc.setFont('helvetica', 'normal');
    doc.text('Oziq-ovqat xavfsizligi diagnostika hisoboti', 105, 24, { align: 'center' });
    doc.setFontSize(8); doc.setTextColor(156, 163, 175);
    doc.text('Sana: ' + ds, 196, 32, { align: 'right' });
    doc.setTextColor(40, 40, 40); doc.setFillColor(249, 250, 251);
    doc.roundedRect(14, 42, 182, 40, 3, 3, 'F');
    doc.setFontSize(9); doc.setFont('helvetica', 'bold'); doc.text('Muassasa ma\'lumotlari', 20, 52);
    doc.setFont('helvetica', 'normal'); doc.setFontSize(8.5);
    doc.text('Obyekt:    ' + userInfo.objName, 20, 61);
    doc.text('Telefon:   ' + userInfo.phone, 20, 69);
    doc.text('Faoliyat:  ' + userInfo.activity, 110, 61);
    doc.text('E-mail:    ' + userInfo.email, 110, 69);
    doc.text('Mahsulot:  ' + userInfo.product, 20, 77);
    doc.setFillColor(col[0], col[1], col[2]);
    doc.roundedRect(14, 90, 52, 30, 3, 3, 'F');
    doc.setTextColor(255, 255, 255); doc.setFontSize(24); doc.setFont('helvetica', 'bold');
    doc.text(score + '%', 40, 109, { align: 'center' });
    doc.setTextColor(40, 40, 40); doc.setFontSize(8.5); doc.setFont('helvetica', 'bold');
    doc.text(rlbl, 40, 126, { align: 'center' });
    doc.setFont('helvetica', 'normal'); doc.setFontSize(9);
    doc.text('Muvofiq:     ' + correct + ' / ' + TOTAL, 76, 100);
    doc.text('Nomuvofiq:   ' + failed + ' / ' + TOTAL, 76, 109);
    doc.setFontSize(8); doc.setTextColor(107, 114, 128);
    doc.text('AR Oziq-ovqat xavfsizligi qonuniga asosan baholash', 76, 118);
    if (failed > 0) {
        var rows = [];
        for (i = 0; i < TOTAL; i++) {
            if (answers[i] === false) {
                rows.push([QUESTIONS[i].id + '. ' + QUESTIONS[i].q, QUESTIONS[i].law, QUESTIONS[i].cor]);
            }
        }
        doc.autoTable({
            startY: 136,
            head: [['Nomuvofiq savol', 'Normativ manba', 'Tuzatish chorasi']],
            body: rows,
            styles: { fontSize: 8, cellPadding: 3, overflow: 'linebreak', font: 'helvetica' },
            headStyles: { fillColor: [180, 142, 66], textColor: 255, fontStyle: 'bold', fontSize: 8 },
            columnStyles: { 0: { cellWidth: 76 }, 1: { cellWidth: 44 }, 2: { cellWidth: 62 } },
            alternateRowStyles: { fillColor: [250, 250, 250] },
            margin: { left: 14, right: 14 }
        });
    } else {
        doc.setFontSize(11); doc.setTextColor(22, 163, 74); doc.setFont('helvetica', 'bold');
        doc.text('Mukammal natija! Muassasa barcha talablarga to\'liq muvofiqdir.', 105, 148, { align: 'center' });
    }
    var pages = doc.internal.getNumberOfPages();
    for (i = 1; i <= pages; i++) {
        doc.setPage(i); doc.setFontSize(7.5); doc.setTextColor(156, 163, 175); doc.setFont('helvetica', 'normal');
        doc.line(14, 285, 196, 285);
        doc.text('ASR Development Consulting Group  |  office@asrgroup.az  |  +994 50 208 58 38', 105, 290, { align: 'center' });
        doc.text('Bet ' + i + '/' + pages, 196, 290, { align: 'right' });
    }
    doc.save('ASR-Diagnostika-UZ-' + ds + '.pdf');
}

document.getElementById('qLangBtn').addEventListener('click', function (e) {
    e.stopPropagation();
    document.getElementById('qLangDd').classList.toggle('open');
});
document.addEventListener('click', function () {
    document.getElementById('qLangDd').classList.remove('open');
});

var fy = document.getElementById('footer-year');
if (fy) fy.textContent = new Date().getFullYear();