var QUESTIONS = [
    { id: 1, q: "Выполняет ли предприятие требуемые процедуры регистрации и сертификации в области безопасности пищевых продуктов?", law: "Закон АР — Ст. 24, 25", cor: "Зарегистрируйте предприятие в органе по безопасности пищевых продуктов; подготовьте документацию для продуктов, требующих государственной регистрации.", pen: "АК Ст. 220.1/220.2: Физ. лицо — 200–300 AZN; Должностное — 800–1000 AZN; Юрид. — 2000–2500 AZN" },
    { id: 2, q: "Соответствует ли деятельность предприятия требованиям действующих технических нормативных правовых актов в области безопасности пищевых продуктов?", law: "Закон АР — Ст. 16", cor: "Проверьте действующие нормативные акты, выявите несоответствия и обновите внутренние процедуры.", pen: "АК Ст. 220.3: Физ. лицо — 100–150 AZN; Должностное — 400–600 AZN; Юрид. — 1000–1500 AZN" },
    { id: 3, q: "Соответствует ли проект территории, зданий и производственных площадей предприятия установленным требованиям?", law: "Закон АР — Ст. 16.3", cor: "Проверьте проект здания с экспертами по пищевой безопасности; разработайте план реконструкции в соответствии с нормативными требованиями.", pen: "АК Ст. 220.3: Физ. лицо — 100–150 AZN; Должностное — 400–600 AZN; Юрид. — 1000–1500 AZN" },
    { id: 4, q: "Соответствуют ли полы, стены, потолки, двери и окна санитарно-гигиеническим требованиям?", law: "Закон АР — Ст. 16.3", cor: "Оцените все конструктивные элементы производственной зоны; устраните выявленные несоответствия.", pen: "АК Ст. 220.3: Физ. лицо — 100–150 AZN; Должностное — 400–600 AZN; Юрид. — 1000–1500 AZN" },
    { id: 5, q: "Оснащены ли места для мытья рук, санитарные узлы, раздевалки и бытовые помещения в соответствии с требованиями?", law: "Закон АР — Ст. 16.3", cor: "Оборудуйте места для мытья рук, санузлы и раздевалки согласно нормативным требованиям; обновите оборудование.", pen: "АК Ст. 220.3: Физ. лицо — 100–150 AZN; Должностное — 400–600 AZN; Юрид. — 1000–1500 AZN" },
    { id: 6, q: "Обеспечивают ли системы вентиляции, отопления и освещения безопасность пищевых продуктов?", law: "Закон АР — Ст. 16.3", cor: "Проверьте системы вентиляции, отопления и освещения с привлечением специалиста; внесите необходимые изменения для соответствия нормативным показателям.", pen: "АК Ст. 220.3: Физ. лицо — 100–150 AZN; Должностное — 400–600 AZN; Юрид. — 1000–1500 AZN" },
    { id: 7, q: "Соответствуют ли требованиям безопасности оборудование, инвентарь и поверхности, контактирующие с пищей?", law: "Закон АР — Ст. 16.3, 17.1", cor: "Проведите аудит всего оборудования и поверхностей, контактирующих с пищей; замените несоответствующее оборудование.", pen: "АК Ст. 220.3: Физ. лицо — 100–150 AZN; Должностное — 400–600 AZN; Юрид. — 1000–1500 AZN" },
    { id: 8, q: "Проходят ли измерительные приборы, термометры и другие контрольные устройства калибровку и поддерживаются ли в рабочем состоянии?", law: "Закон АР — Ст. 16.2, 16.4", cor: "Составьте график калибровки всех измерительных приборов; внедрите регулярные процедуры технического обслуживания.", pen: "АК Ст. 220.3: Физ. лицо — 100–150 AZN; Должностное — 400–600 AZN; Юрид. — 1000–1500 AZN" },
    { id: 9, q: "Соответствуют ли требованиям безопасности вода и лёд, используемые в производстве?", law: "Закон АР — Ст. 14, 16.3", cor: "Получите сертификаты качества воды; проводите регулярные лабораторные исследования; задокументируйте процедуры производства льда.", pen: "АК Ст. 220.3: Физ. лицо — 100–150 AZN; Должностное — 400–600 AZN; Юрид. — 1000–1500 AZN" },
    { id: 10, q: "Осуществляются ли процессы охлаждения, замораживания, размораживания и термической обработки в соответствии с нормативными требованиями?", law: "Закон АР — Ст. 16.1, 16.2", cor: "Разработайте письменные процедуры для этих процессов; внедрите журналы контроля температуры; обучите персонал.", pen: "АК Ст. 220.3: Физ. лицо — 100–150 AZN; Должностное — 400–600 AZN; Юрид. — 1000–1500 AZN" },
    { id: 11, q: "Функционируют ли системы канализации и дренажа безопасно и эффективно?", law: "Закон АР — Ст. 16.3", cor: "Проведите техническое обследование канализационной системы; устройте дренаж согласно нормативным требованиям; выполняйте регулярное обслуживание.", pen: "АК Ст. 220.3: Физ. лицо — 100–150 AZN; Должностное — 400–600 AZN; Юрид. — 1000–1500 AZN" },
    { id: 12, q: "Проводятся ли мероприятия по уборке и дезинфекции систематически?", law: "Закон АР — Ст. 16.2, 16.3", cor: "Разработайте официальную программу уборки и дезинфекции; фиксируйте выполнение в журналах; храните сертификаты на применяемые средства.", pen: "АК Ст. 220.3: Физ. лицо — 100–150 AZN; Должностное — 400–600 AZN; Юрид. — 1000–1500 AZN" },
    { id: 13, q: "Эффективно ли организованы мероприятия по дезинсекции, дератизации и борьбе с вредителями?", law: "Закон АР — Ст. 16.3", cor: "Заключите договор с лицензированной компанией по борьбе с вредителями; внедрите регулярный график проверок; фиксируйте все проводимые мероприятия.", pen: "АК Ст. 220.3: Физ. лицо — 100–150 AZN; Должностное — 400–600 AZN; Юрид. — 1000–1500 AZN" },
    { id: 14, q: "Осуществляется ли безопасное управление производственными и пищевыми отходами?", law: "Закон АР — Ст. 16.3", cor: "Разработайте письменную процедуру управления отходами; фиксируйте все потоки отходов; выделите отдельное место для хранения отходов.", pen: "АК Ст. 220.3: Физ. лицо — 100–150 AZN; Должностное — 400–600 AZN; Юрид. — 1000–1500 AZN" },
    { id: 15, q: "Контролируются ли личная гигиена сотрудников, медицинские осмотры и состояние здоровья персонала?", law: "Закон АР — Ст. 16.3", cor: "Составьте график медицинских осмотров для всех сотрудников; задокументируйте правила личной гигиены; проводите гигиеническое обучение.", pen: "АК Ст. 220.3: Физ. лицо — 100–150 AZN; Должностное — 400–600 AZN; Юрид. — 1000–1500 AZN" },
    { id: 16, q: "Осуществляется ли контроль соответствия при приёмке сырья, вспомогательных материалов и поступающей продукции?", law: "Закон АР — Ст. 16.1", cor: "Разработайте официальную процедуру входного контроля; внедрите журнал проверки соответствия; оценивайте поставщиков.", pen: "АК Ст. 220.3: Физ. лицо — 100–150 AZN; Должностное — 400–600 AZN; Юрид. — 1000–1500 AZN" },
    { id: 17, q: "Соблюдаются ли требования к продуктам специального назначения, обогащённым, биологически активным и содержащим ГМО?", law: "Закон АР — Ст. 11, 12, 13, 25", cor: "Проверьте регистрационные документы на специальные продукты; получите необходимые разрешения для продуктов с ГМО и биологически активных продуктов.", pen: "АК Ст. 220.3: Физ. лицо — 100–150 AZN; Должностное — 400–600 AZN; Юрид. — 1000–1500 AZN" },
    { id: 18, q: "Эффективно ли управляются риски пищевой безопасности и перекрёстное загрязнение в производственных процессах?", law: "Закон АР — Ст. 16.2, 16.4", cor: "Пересмотрите план HACCP; разработайте отдельные процедуры контроля перекрёстного загрязнения; задокументируйте критические контрольные точки.", pen: "АК Ст. 220.3: Физ. лицо — 100–150 AZN; Должностное — 400–600 AZN; Юрид. — 1000–1500 AZN" },
    { id: 19, q: "Соответствуют ли маркировка продуктов и информация для потребителей требованиям законодательства?", law: "Закон АР — Ст. 17", cor: "Проверьте этикетки всех продуктов; убедитесь в наличии всей необходимой информации (состав, дата производства, условия хранения).", pen: "АК Ст. 220.3: Физ. лицо — 100–150 AZN; Должностное — 400–600 AZN; Юрид. — 1000–1500 AZN" },
    { id: 20, q: "Отвечают ли процессы хранения, транспортировки и логистики продуктов требованиям безопасности?", law: "Закон АР — Ст. 16.3", cor: "Задокументируйте условия хранения; внедрите журналы контроля температуры; проверьте соответствие транспортных средств гигиеническим требованиям.", pen: "АК Ст. 220.3: Физ. лицо — 100–150 AZN; Должностное — 400–600 AZN; Юрид. — 1000–1500 AZN" },
    { id: 21, q: "Привлекаются ли сотрудники к соответствующим обучающим мероприятиям по пищевой безопасности и гигиене?", law: "Закон АР — Ст. 16.2", cor: "Проводите регулярное обучение персонала по пищевой безопасности и гигиене; ведите журналы посещаемости; проводите проверку знаний.", pen: "АК Ст. 220.3: Физ. лицо — 100–150 AZN; Должностное — 400–600 AZN; Юрид. — 1000–1500 AZN" },
    { id: 22, q: "Соответствуют ли требованиям законодательства материалы, контактирующие с пищей, и упаковочные средства?", law: "Закон АР — Ст. 17.1, 24.1", cor: "Получите сертификаты соответствия для всех материалов, контактирующих с пищей; незамедлительно замените несертифицированные материалы.", pen: "АК Ст. 220.3: Физ. лицо — 100–150 AZN; Должностное — 400–600 AZN; Юрид. — 1000–1500 AZN" },
    { id: 23, q: "Соответствуют ли реклама, презентация, маркировка продуктов и информирование потребителей требованиям законодательства?", law: "Закон АР — Ст. 8, 17", cor: "Проверьте все рекламные материалы; устраните вводящие в заблуждение утверждения; разработайте прозрачную политику информирования потребителей.", pen: "АК Ст. 220.3: Физ. лицо — 100–150 AZN; Должностное — 400–600 AZN; Юрид. — 1000–1500 AZN" },
    { id: 24, q: "Функционирует ли на предприятии эффективная система прослеживаемости продуктов, их отзыва и контроля цепочки поставок?", law: "Закон АР — Ст. 24", cor: "Внедрите систему прослеживаемости продуктов; разработайте, протестируйте и задокументируйте процедуры отзыва; внедрите систему нумерации партий.", pen: "АК Ст. 220.3: Физ. лицо — 100–150 AZN; Должностное — 400–600 AZN; Юрид. — 1000–1500 AZN" }
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
    if (window.confirm('Вы уверены, что хотите выйти из диагностики? Ваши ответы будут потеряны.')) {
        document.getElementById('quizOverlay').classList.remove('active');
        document.body.style.overflow = '';
    }
}

function showQuestion(idx) {
    currentQ = idx;
    var q = QUESTIONS[idx];
    document.getElementById('qNumLabel').textContent = 'Вопрос ' + (idx + 1) + ' / ' + TOTAL;
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
    document.getElementById('qStepLabel').textContent = 'Завершено';
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
    var lbl = score >= 80 ? 'Высокое соответствие' : score >= 60 ? 'Среднее соответствие' : 'Низкое соответствие';
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
    var rlbl = score >= 80 ? 'Vysokoe sootvetstvie' : score >= 60 ? 'Srednee sootvetstvie' : 'Nizkoe sootvetstvie';
    doc.setFillColor(17, 24, 39); doc.rect(0, 0, 210, 36, 'F');
    doc.setTextColor(255, 255, 255); doc.setFontSize(14); doc.setFont('helvetica', 'bold');
    doc.text('ASR Development Consulting Group', 105, 14, { align: 'center' });
    doc.setFontSize(10); doc.setFont('helvetica', 'normal');
    doc.text('Otchet diagnostiki bezopasnosti pishchevykh produktov', 105, 24, { align: 'center' });
    doc.setFontSize(8); doc.setTextColor(156, 163, 175);
    doc.text('Data: ' + ds, 196, 32, { align: 'right' });
    doc.setTextColor(40, 40, 40); doc.setFillColor(249, 250, 251);
    doc.roundedRect(14, 42, 182, 40, 3, 3, 'F');
    doc.setFontSize(9); doc.setFont('helvetica', 'bold'); doc.text('Dannye predpriyatiya', 20, 52);
    doc.setFont('helvetica', 'normal'); doc.setFontSize(8.5);
    doc.text('Ob\'ekt:     ' + userInfo.objName, 20, 61);
    doc.text('Telefon:    ' + userInfo.phone, 20, 69);
    doc.text('Deyatel\'n.: ' + userInfo.activity, 110, 61);
    doc.text('E-mail:     ' + userInfo.email, 110, 69);
    doc.text('Produkt:    ' + userInfo.product, 20, 77);
    doc.setFillColor(col[0], col[1], col[2]);
    doc.roundedRect(14, 90, 52, 30, 3, 3, 'F');
    doc.setTextColor(255, 255, 255); doc.setFontSize(24); doc.setFont('helvetica', 'bold');
    doc.text(score + '%', 40, 109, { align: 'center' });
    doc.setTextColor(40, 40, 40); doc.setFontSize(8.5); doc.setFont('helvetica', 'bold');
    doc.text(rlbl, 40, 126, { align: 'center' });
    doc.setFont('helvetica', 'normal'); doc.setFontSize(9);
    doc.text('Sootvetstvuet:    ' + correct + ' / ' + TOTAL, 76, 100);
    doc.text('Ne sootvetstvuet: ' + failed + ' / ' + TOTAL, 76, 109);
    doc.setFontSize(8); doc.setTextColor(107, 114, 128);
    doc.text('Otsenka na osnove Zakona AR o bezopasnosti pishchevykh produktov', 76, 118);
    if (failed > 0) {
        var rows = [];
        for (i = 0; i < TOTAL; i++) {
            if (answers[i] === false) {
                rows.push([QUESTIONS[i].id + '. ' + QUESTIONS[i].q, QUESTIONS[i].law, QUESTIONS[i].cor]);
            }
        }
        doc.autoTable({
            startY: 136,
            head: [['Vopros s nesootvetstviem', 'Normativnyy istochnik', 'Korrektiruyushchie mery']],
            body: rows,
            styles: { fontSize: 8, cellPadding: 3, overflow: 'linebreak', font: 'helvetica' },
            headStyles: { fillColor: [180, 142, 66], textColor: 255, fontStyle: 'bold', fontSize: 8 },
            columnStyles: { 0: { cellWidth: 76 }, 1: { cellWidth: 44 }, 2: { cellWidth: 62 } },
            alternateRowStyles: { fillColor: [250, 250, 250] },
            margin: { left: 14, right: 14 }
        });
    } else {
        doc.setFontSize(11); doc.setTextColor(22, 163, 74); doc.setFont('helvetica', 'bold');
        doc.text('Otlichnyy rezul\'tat! Predpriyatie polnost\'yu sootvetstvuet vsem trebovaniyam.', 105, 148, { align: 'center' });
    }
    var pages = doc.internal.getNumberOfPages();
    for (i = 1; i <= pages; i++) {
        doc.setPage(i); doc.setFontSize(7.5); doc.setTextColor(156, 163, 175); doc.setFont('helvetica', 'normal');
        doc.line(14, 285, 196, 285);
        doc.text('ASR Development Consulting Group  |  office@asrgroup.az  |  +994 50 208 58 38', 105, 290, { align: 'center' });
        doc.text('Str. ' + i + '/' + pages, 196, 290, { align: 'right' });
    }
    doc.save('ASR-Diagnostika-RU-' + ds + '.pdf');
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