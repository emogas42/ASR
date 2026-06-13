var QUESTIONS = [
    { id: 1, q: "Müəssisə qida təhlükəsizliyi sahəsində tələb olunan qeydiyyat və təsdiq prosedurlarını yerinə yetirirmi?", law: "AR Qanunu — Maddə 24, 25", cor: "Müəssisəni qida təhlükəsizliyi orqanında qeydiyyata aldırın; dövlət qeydiyyatı tələb olunan məhsullar üçün müvafiq sənədləri hazırlayın.", pen: "AR İXM 220.1/220.2: Fiziki — 200–300 AZN; Vəzifəli — 800–1000 AZN; Hüquqi — 2000–2500 AZN" },
    { id: 2, q: "Müəssisənin fəaliyyəti qida təhlükəsizliyi sahəsində qüvvədə olan texniki normativ-hüquqi aktların tələblərinə uyğundurmu?", law: "AR Qanunu — Maddə 16", cor: "Qüvvədə olan texniki normativ-hüquqi aktları nəzərdən keçirin, uyğunsuzluqları müəyyən edin və daxili prosedurları yeniləyin.", pen: "AR İXM 220.3: Fiziki — 100–150 AZN; Vəzifəli — 400–600 AZN; Hüquqi — 1000–1500 AZN" },
    { id: 3, q: "Müəssisənin ərazisi, bina və istehsal sahələrinin layihələndirilməsi tələblərə uyğundurmu?", law: "AR Qanunu — Maddə 16.3", cor: "Bina layihəsini qida təhlükəsizliyi mütəxəssisləri ilə nəzərdən keçirin; normativ tələblərə uyğun renovasiya planı hazırlayın.", pen: "AR İXM 220.3: Fiziki — 100–150 AZN; Vəzifəli — 400–600 AZN; Hüquqi — 1000–1500 AZN" },
    { id: 4, q: "Döşəmə, divar, tavan, qapı və pəncərələr sanitar-gigiyenik tələblərə uyğundurmu?", law: "AR Qanunu — Maddə 16.3", cor: "İstehsal sahəsinin bütün konstruktiv elementlərini qiymətləndirin; mövcud uyğunsuzluqları aradan qaldırın.", pen: "AR İXM 220.3: Fiziki — 100–150 AZN; Vəzifəli — 400–600 AZN; Hüquqi — 1000–1500 AZN" },
    { id: 5, q: "Əlyuma məntəqələri, sanitar qovşaqlar, soyunub-geyinmə və məişət sahələri tələb olunan şəraitə malikdirmi?", law: "AR Qanunu — Maddə 16.3", cor: "Əlyuma məntəqələri, sanitar qovşaqlar və soyunub-geyinmə otaqlarını normativ tələblərə uyğun qurun; avadanlıqları yeniləyin.", pen: "AR İXM 220.3: Fiziki — 100–150 AZN; Vəzifəli — 400–600 AZN; Hüquqi — 1000–1500 AZN" },
    { id: 6, q: "Havalandırma, isitmə və işıqlandırma sistemləri qida təhlükəsizliyini təmin edirmi?", law: "AR Qanunu — Maddə 16.3", cor: "Ventilyasiya, qızdırma və işıqlandırma sistemlərini mütəxəssis tərəfindən yoxladın; normativ göstəriciləri təmin etmək üçün lazımi dəyişiklikləri edin.", pen: "AR İXM 220.3: Fiziki — 100–150 AZN; Vəzifəli — 400–600 AZN; Hüquqi — 1000–1500 AZN" },
    { id: 7, q: "Avadanlıq, inventar və qida ilə təmasda olan səthlər təhlükəsizlik tələblərinə cavab verirmi?", law: "AR Qanunu — Maddə 16.3, 17.1", cor: "Qida ilə təmasda olan bütün avadanlıq və səthlərin auditini keçirin; uyğun olmayan avadanlıqları dəyişdirin.", pen: "AR İXM 220.3: Fiziki — 100–150 AZN; Vəzifəli — 400–600 AZN; Hüquqi — 1000–1500 AZN" },
    { id: 8, q: "Ölçmə vasitələri, termometrlər və digər nəzarət cihazları kalibrlənir və işlək vəziyyətdə saxlanılırmı?", law: "AR Qanunu — Maddə 16.2, 16.4", cor: "Bütün ölçmə vasitələri üçün kalibrasiya cədvəli hazırlayın; müntəzəm texniki xidmət prosedurlarını tətbiq edin.", pen: "AR İXM 220.3: Fiziki — 100–150 AZN; Vəzifəli — 400–600 AZN; Hüquqi — 1000–1500 AZN" },
    { id: 9, q: "İstehsalatda istifadə olunan su və buz təhlükəsizlik tələblərinə cavab verirmi?", law: "AR Qanunu — Maddə 14, 16.3", cor: "Suyun keyfiyyət sertifikatlarını alın; müntəzəm laboratoriya müayinələri aparın; buz istehsalı prosedurlarını sənədləşdirin.", pen: "AR İXM 220.3: Fiziki — 100–150 AZN; Vəzifəli — 400–600 AZN; Hüquqi — 1000–1500 AZN" },
    { id: 10, q: "Soyutma, dondurma, donun açılması və termiki emal prosesləri normativ tələblərə uyğun həyata keçirilirmi?", law: "AR Qanunu — Maddə 16.1, 16.2", cor: "Bu proseslər üçün yazılı prosedurlar hazırlayın; temperatur jurnallarını tətbiq edin; işçiləri öyrədin.", pen: "AR İXM 220.3: Fiziki — 100–150 AZN; Vəzifəli — 400–600 AZN; Hüquqi — 1000–1500 AZN" },
    { id: 11, q: "Kanalizasiya və drenaj sistemləri təhlükəsiz və effektiv şəkildə fəaliyyət göstərirmi?", law: "AR Qanunu — Maddə 16.3", cor: "Kanalizasiya sisteminin texniki baxışını keçirin; normativ tələblərə uyğun drenaj sistemini qurun; müntəzəm baxım keçirin.", pen: "AR İXM 220.3: Fiziki — 100–150 AZN; Vəzifəli — 400–600 AZN; Hüquqi — 1000–1500 AZN" },
    { id: 12, q: "Təmizlik və dezinfeksiya tədbirləri sistemli şəkildə həyata keçirilirmi?", law: "AR Qanunu — Maddə 16.2, 16.3", cor: "Rəsmi təmizlik və dezinfeksiya proqramı hazırlayın; icranı jurnallarda qeydə alın; istifadə olunan məhsulların sertifikatlarını saxlayın.", pen: "AR İXM 220.3: Fiziki — 100–150 AZN; Vəzifəli — 400–600 AZN; Hüquqi — 1000–1500 AZN" },
    { id: 13, q: "Dezinseksiya, deratizasiya və zərərvericilərlə mübarizə tədbirləri effektiv təşkil olunubmu?", law: "AR Qanunu — Maddə 16.3", cor: "Lisenziyalı zərərverici nəzarət şirkəti ilə müqavilə bağlayın; müntəzəm müayinə cədvəli tətbiq edin; aparılan tədbirləri qeydə alın.", pen: "AR İXM 220.3: Fiziki — 100–150 AZN; Vəzifəli — 400–600 AZN; Hüquqi — 1000–1500 AZN" },
    { id: 14, q: "İstehsalat və qida tullantıları təhlükəsiz şəkildə idarə olunurmu?", law: "AR Qanunu — Maddə 16.3", cor: "Tullantıların idarəedilməsi üçün yazılı prosedur hazırlayın; bütün tullantı axınlarını qeydə alın; ayrılmış saxlama sahəsi müəyyən edin.", pen: "AR İXM 220.3: Fiziki — 100–150 AZN; Vəzifəli — 400–600 AZN; Hüquqi — 1000–1500 AZN" },
    { id: 15, q: "İşçi heyətin şəxsi gigiyenası, tibbi müayinələri və sağlamlıq vəziyyəti nəzarətdə saxlanılırmı?", law: "AR Qanunu — Maddə 16.3", cor: "Bütün işçilər üçün tibbi müayinə cədvəli tərtibi edin; şəxsi gigiyena qaydalarını sənədləşdirin; gigiyena maarifləndirməsini həyata keçirin.", pen: "AR İXM 220.3: Fiziki — 100–150 AZN; Vəzifəli — 400–600 AZN; Hüquqi — 1000–1500 AZN" },
    { id: 16, q: "Xammalın, köməkçi materialların və daxil olan məhsulların qəbulu zamanı uyğunluq nəzarəti aparılırmı?", law: "AR Qanunu — Maddə 16.1", cor: "Gelen məhsulların qəbulunda rəsmi yoxlama proseduru hazırlayın; uyğunluq yoxlama jurnalı tətbiq edin; təchizatçıları qiymətləndirin.", pen: "AR İXM 220.3: Fiziki — 100–150 AZN; Vəzifəli — 400–600 AZN; Hüquqi — 1000–1500 AZN" },
    { id: 17, q: "Xüsusi təyinatlı, zənginləşdirilmiş, bioloji aktiv və GMO tərkibli məhsullarla bağlı tələblərə əməl olunurmu?", law: "AR Qanunu — Maddə 11, 12, 13, 25", cor: "Xüsusi məhsulların qeydiyyat sənədlərini nəzərdən keçirin; GMO və bio-aktiv məhsullar üçün tələb olunan icazələri əldə edin.", pen: "AR İXM 220.3: Fiziki — 100–150 AZN; Vəzifəli — 400–600 AZN; Hüquqi — 1000–1500 AZN" },
    { id: 18, q: "İstehsal proseslərində qida təhlükəsizliyi riskləri və çarpaz çirklənmə effektiv idarə olunurmu?", law: "AR Qanunu — Maddə 16.2, 16.4", cor: "HACCP planını nəzərdən keçirin; çarpaz çirklənmə nəzarəti üçün ayrılmış prosedurlar hazırlayın; kritik nəzarət nöqtələrini sənədləşdirin.", pen: "AR İXM 220.3: Fiziki — 100–150 AZN; Vəzifəli — 400–600 AZN; Hüquqi — 1000–1500 AZN" },
    { id: 19, q: "Məhsulların etiketlənməsi, markalanması və istehlakçıya təqdim edilən məlumatlar qanunvericiliyin tələblərinə uyğundurmu?", law: "AR Qanunu — Maddə 17", cor: "Bütün məhsulların etiketlərini yoxlayın; tələb olunan bütün məlumatların (tərkib, istehsal tarixi, saxlama şərtləri) mövcudluğunu təmin edin.", pen: "AR İXM 220.3: Fiziki — 100–150 AZN; Vəzifəli — 400–600 AZN; Hüquqi — 1000–1500 AZN" },
    { id: 20, q: "Məhsulların saxlanması, daşınması və logistika prosesləri təhlükəsizlik tələblərinə cavab verirmi?", law: "AR Qanunu — Maddə 16.3", cor: "Saxlama şərtlərini sənədləşdirin; temperatur nəzarəti jurnalları tətbiq edin; daşıma vasitələrinin gigiyena tələblərinə uyğunluğunu yoxlayın.", pen: "AR İXM 220.3: Fiziki — 100–150 AZN; Vəzifəli — 400–600 AZN; Hüquqi — 1000–1500 AZN" },
    { id: 21, q: "İşçilər qida təhlükəsizliyi və gigiyena sahəsində müvafiq təlimlərə cəlb olunurlarmı?", law: "AR Qanunu — Maddə 16.2", cor: "İşçilər üçün müntəzəm qida təhlükəsizliyi və gigiyena təlimləri keçirin; iştirak qeydlərini saxlayın; bilik yoxlamaları aparın.", pen: "AR İXM 220.3: Fiziki — 100–150 AZN; Vəzifəli — 400–600 AZN; Hüquqi — 1000–1500 AZN" },
    { id: 22, q: "Qida ilə təmasda olan materiallar və qablaşdırma vasitələri qanunvericiliyin tələblərinə cavab verirmi?", law: "AR Qanunu — Maddə 17.1, 24.1", cor: "Qida ilə təmasda olan bütün materialların uyğunluq sertifikatlarını əldə edin; sertifikatsız materialları dərhal dəyişdirin.", pen: "AR İXM 220.3: Fiziki — 100–150 AZN; Vəzifəli — 400–600 AZN; Hüquqi — 1000–1500 AZN" },
    { id: 23, q: "Məhsulların reklamı, təqdimatı, markalanması və istehlakçıların məlumatlandırılması qanunvericiliyin tələblərinə uyğundurmu?", law: "AR Qanunu — Maddə 8, 17", cor: "Bütün reklam materiallarını nəzərdən keçirin; yanıltıcı iddiaları aradan qaldırın; şəffaf məlumatlandırma siyasəti hazırlayın.", pen: "AR İXM 220.3: Fiziki — 100–150 AZN; Vəzifəli — 400–600 AZN; Hüquqi — 1000–1500 AZN" },
    { id: 24, q: "Müəssisədə məhsulların izlənəbilənliyi, geri çağırılması və təchizat zənciri üzrə nəzarət sistemi effektiv fəaliyyət göstərirmi?", law: "AR Qanunu — Maddə 24", cor: "Məhsul izlənəbilənliyi sistemini tətbiq edin; geri çağırma prosedurlarını hazırlayın, sınaqdan keçirin; lot nömrələmə sistemini tətbiq edin.", pen: "AR İXM 220.3: Fiziki — 100–150 AZN; Vəzifəli — 400–600 AZN; Hüquqi — 1000–1500 AZN" }
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
    document.getElementById('quizQScreen').style.display = 'block';
    document.getElementById('quizOverlay').classList.add('active');
    document.body.style.overflow = 'hidden';
    showQuestion(0);
}

function quizClose() {
    if (window.confirm('Diaqnostikadan çıxmaq istədiyinizdən əminsinizmi? Cavablar silinəcək.')) {
        document.getElementById('quizOverlay').classList.remove('active');
        document.body.style.overflow = '';
    }
}

function showQuestion(idx) {
    currentQ = idx;
    var q = QUESTIONS[idx];
    document.getElementById('qNumLabel').textContent = 'Sual ' + (idx + 1) + ' / ' + TOTAL;
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
    document.getElementById('quizResultScreen').style.display = 'block';
    document.getElementById('quizContainer').scrollTop = 0;
    document.getElementById('qProgressFill').style.width = '100%';
    document.getElementById('qStepLabel').textContent = 'Tamamlandı';
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
    var lbl = score >= 80 ? 'Yüksək Uyğunluq' : score >= 60 ? 'Orta Uyğunluq' : 'Aşağı Uyğunluq';
    var bc = score >= 80 ? 'badge-green' : score >= 60 ? 'badge-orange' : 'badge-red';
    badge.textContent = lbl; badge.className = 'result-badge ' + bc;
    if (failed > 0) {
        document.getElementById('resultPerfect').style.display = 'none';
        document.getElementById('resultTableSection').style.display = 'block';
        var rows = '';
        for (i = 0; i < TOTAL; i++) {
            if (answers[i] === false) {
                rows += '<tr><td>' + QUESTIONS[i].q + '</td><td>' + QUESTIONS[i].law + '</td><td>' + QUESTIONS[i].cor + '</td></tr>';
            }
        }
        document.getElementById('resultTableBody').innerHTML = rows;
    } else {
        document.getElementById('resultTableSection').style.display = 'none';
        document.getElementById('resultPerfect').style.display = 'block';
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
    document.getElementById('quizQScreen').style.display = 'block';
    document.getElementById('quizContainer').scrollTop = 0;
    showQuestion(0);
}

function az(s) {
    return String(s)
        .replace(/ə/g, 'e').replace(/Ə/g, 'E')
        .replace(/ı/g, 'i').replace(/İ/g, 'I')
        .replace(/ğ/g, 'g').replace(/Ğ/g, 'G')
        .replace(/ş/g, 's').replace(/Ş/g, 'S')
        .replace(/ü/g, 'u').replace(/Ü/g, 'U')
        .replace(/ö/g, 'o').replace(/Ö/g, 'O')
        .replace(/ç/g, 'c').replace(/Ç/g, 'C')
        .replace(/–/g, '-').replace(/—/g, '-');
}

function downloadPDF() {
    var doc = new window.jspdf.jsPDF('p', 'mm', 'a4');
    var correct = 0, i;
    for (i = 0; i < TOTAL; i++) { if (answers[i] === true) correct++; }
    var failed = TOTAL - correct, score = Math.round((correct / TOTAL) * 100);
    var today = new Date();
    var ds = today.getDate() + '.' + (today.getMonth() + 1) + '.' + today.getFullYear();
    var col = score >= 80 ? [34, 197, 94] : score >= 60 ? [245, 158, 11] : [239, 68, 68];
    var rlbl = score >= 80 ? 'Yuksek Uygunluq' : score >= 60 ? 'Orta Uygunluq' : 'Asagi Uygunluq';
    doc.setFillColor(17, 24, 39); doc.rect(0, 0, 210, 36, 'F');
    doc.setTextColor(255, 255, 255); doc.setFontSize(14); doc.setFont('helvetica', 'bold');
    doc.text('ASR Development Consulting Group', 105, 14, { align: 'center' });
    doc.setFontSize(10); doc.setFont('helvetica', 'normal');
    doc.text('Qida Tehlukesizliyi Diaqnostika Hesabati', 105, 24, { align: 'center' });
    doc.setFontSize(8); doc.setTextColor(156, 163, 175);
    doc.text('Tarix: ' + ds, 196, 32, { align: 'right' });
    doc.setTextColor(40, 40, 40); doc.setFillColor(249, 250, 251);
    doc.roundedRect(14, 42, 182, 40, 3, 3, 'F');
    doc.setFontSize(9); doc.setFont('helvetica', 'bold'); doc.text('Muessise Melumatlari', 20, 52);
    doc.setFont('helvetica', 'normal'); doc.setFontSize(8.5);
    doc.text('Obyektin adi: ' + az(userInfo.objName), 20, 61);
    doc.text('Telefon:      ' + az(userInfo.phone), 20, 69);
    doc.text('Fealiyyet:    ' + az(userInfo.activity), 110, 61);
    doc.text('E-mail:       ' + az(userInfo.email), 110, 69);
    doc.text('Mehsul:       ' + az(userInfo.product), 20, 77);
    doc.setFillColor(col[0], col[1], col[2]);
    doc.roundedRect(14, 90, 52, 30, 3, 3, 'F');
    doc.setTextColor(255, 255, 255); doc.setFontSize(24); doc.setFont('helvetica', 'bold');
    doc.text(score + '%', 40, 109, { align: 'center' });
    doc.setTextColor(40, 40, 40); doc.setFontSize(8.5); doc.setFont('helvetica', 'bold');
    doc.text(rlbl, 40, 126, { align: 'center' });
    doc.setFont('helvetica', 'normal'); doc.setFontSize(9);
    doc.text('Uygun:     ' + correct + ' / ' + TOTAL, 76, 100);
    doc.text('Uygunsuz: ' + failed + ' / ' + TOTAL, 76, 109);
    doc.setFontSize(8); doc.setTextColor(107, 114, 128);
    doc.text('AR Qida Tehlukesizliyi Qanununa esasen qiymetlendirme', 76, 118);
    if (failed > 0) {
        var rows = [];
        for (i = 0; i < TOTAL; i++) {
            if (answers[i] === false) {
                rows.push([QUESTIONS[i].id + '. ' + az(QUESTIONS[i].q), az(QUESTIONS[i].law), az(QUESTIONS[i].cor)]);
            }
        }
        doc.autoTable({
            startY: 136,
            head: [['Uygunsuzluq askar edilmis sual', 'Normativ Istinad', 'Duzeldici tedbir']],
            body: rows,
            styles: { fontSize: 8, cellPadding: 3, overflow: 'linebreak', font: 'helvetica' },
            headStyles: { fillColor: [180, 142, 66], textColor: 255, fontStyle: 'bold', fontSize: 8 },
            columnStyles: { 0: { cellWidth: 76 }, 1: { cellWidth: 44 }, 2: { cellWidth: 62 } },
            alternateRowStyles: { fillColor: [250, 250, 250] },
            margin: { left: 14, right: 14 }
        });
    } else {
        doc.setFontSize(11); doc.setTextColor(22, 163, 74); doc.setFont('helvetica', 'bold');
        doc.text('Mukemmel netice! Muessise butun teleblerle tam uygunluq gosterir.', 105, 148, { align: 'center' });
    }
    var pages = doc.internal.getNumberOfPages();
    for (i = 1; i <= pages; i++) {
        doc.setPage(i); doc.setFontSize(7.5); doc.setTextColor(156, 163, 175); doc.setFont('helvetica', 'normal');
        doc.line(14, 285, 196, 285);
        doc.text('ASR Development Consulting Group  |  office@asrgroup.az  |  +994 50 208 58 38', 105, 290, { align: 'center' });
        doc.text('Seh. ' + i + '/' + pages, 196, 290, { align: 'right' });
    }
    doc.save('ASR-Diaqnostika-' + ds + '.pdf');
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