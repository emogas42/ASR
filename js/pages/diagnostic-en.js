var QUESTIONS = [
    { id: 1, q: "Does the establishment fulfil the required registration and certification procedures in the field of food safety?", law: "Law of AR — Art. 24, 25", cor: "Register the establishment with the food safety authority; prepare required documentation for state-registered products.", pen: "Admin. Code Art. 220.1/220.2: Individual — 200–300 AZN; Official — 800–1000 AZN; Legal entity — 2000–2500 AZN" },
    { id: 2, q: "Does the establishment's activity comply with the requirements of current technical regulatory legal acts in food safety?", law: "Law of AR — Art. 16", cor: "Review current technical regulatory legal acts, identify non-compliances and update internal procedures.", pen: "Admin. Code Art. 220.3: Individual — 100–150 AZN; Official — 400–600 AZN; Legal entity — 1000–1500 AZN" },
    { id: 3, q: "Does the design of the establishment's territory, buildings and production areas comply with requirements?", law: "Law of AR — Art. 16.3", cor: "Review the building design with food safety experts; prepare a renovation plan in line with normative requirements.", pen: "Admin. Code Art. 220.3: Individual — 100–150 AZN; Official — 400–600 AZN; Legal entity — 1000–1500 AZN" },
    { id: 4, q: "Do floors, walls, ceilings, doors and windows comply with sanitary-hygienic requirements?", law: "Law of AR — Art. 16.3", cor: "Assess all structural elements of the production area; eliminate existing non-compliances.", pen: "Admin. Code Art. 220.3: Individual — 100–150 AZN; Official — 400–600 AZN; Legal entity — 1000–1500 AZN" },
    { id: 5, q: "Do hand-washing stations, sanitary facilities, changing rooms and welfare areas meet required conditions?", law: "Law of AR — Art. 16.3", cor: "Equip hand-washing stations, sanitary facilities and changing rooms per normative requirements; upgrade equipment.", pen: "Admin. Code Art. 220.3: Individual — 100–150 AZN; Official — 400–600 AZN; Legal entity — 1000–1500 AZN" },
    { id: 6, q: "Do ventilation, heating and lighting systems ensure food safety?", law: "Law of AR — Art. 16.3", cor: "Have ventilation, heating and lighting systems inspected by a specialist; make necessary adjustments to meet normative indicators.", pen: "Admin. Code Art. 220.3: Individual — 100–150 AZN; Official — 400–600 AZN; Legal entity — 1000–1500 AZN" },
    { id: 7, q: "Do equipment, inventory and surfaces in contact with food meet safety requirements?", law: "Law of AR — Art. 16.3, 17.1", cor: "Audit all equipment and surfaces in contact with food; replace non-compliant equipment.", pen: "Admin. Code Art. 220.3: Individual — 100–150 AZN; Official — 400–600 AZN; Legal entity — 1000–1500 AZN" },
    { id: 8, q: "Are measuring instruments, thermometers and other control devices calibrated and kept in working order?", law: "Law of AR — Art. 16.2, 16.4", cor: "Prepare a calibration schedule for all measuring instruments; implement regular maintenance procedures.", pen: "Admin. Code Art. 220.3: Individual — 100–150 AZN; Official — 400–600 AZN; Legal entity — 1000–1500 AZN" },
    { id: 9, q: "Do water and ice used in production meet safety requirements?", law: "Law of AR — Art. 14, 16.3", cor: "Obtain water quality certificates; conduct regular laboratory testing; document ice production procedures.", pen: "Admin. Code Art. 220.3: Individual — 100–150 AZN; Official — 400–600 AZN; Legal entity — 1000–1500 AZN" },
    { id: 10, q: "Are refrigeration, freezing, thawing and heat treatment processes carried out in accordance with normative requirements?", law: "Law of AR — Art. 16.1, 16.2", cor: "Prepare written procedures for these processes; implement temperature logs; train staff.", pen: "Admin. Code Art. 220.3: Individual — 100–150 AZN; Official — 400–600 AZN; Legal entity — 1000–1500 AZN" },
    { id: 11, q: "Do sewage and drainage systems operate safely and effectively?", law: "Law of AR — Art. 16.3", cor: "Conduct a technical inspection of the sewage system; install drainage per normative requirements; perform regular maintenance.", pen: "Admin. Code Art. 220.3: Individual — 100–150 AZN; Official — 400–600 AZN; Legal entity — 1000–1500 AZN" },
    { id: 12, q: "Are cleaning and disinfection measures carried out systematically?", law: "Law of AR — Art. 16.2, 16.3", cor: "Develop an official cleaning and disinfection programme; record implementation in journals; keep product certificates.", pen: "Admin. Code Art. 220.3: Individual — 100–150 AZN; Official — 400–600 AZN; Legal entity — 1000–1500 AZN" },
    { id: 13, q: "Are pest control, rodent control and pest management measures effectively organised?", law: "Law of AR — Art. 16.3", cor: "Contract a licensed pest control company; implement a regular inspection schedule; record all measures taken.", pen: "Admin. Code Art. 220.3: Individual — 100–150 AZN; Official — 400–600 AZN; Legal entity — 1000–1500 AZN" },
    { id: 14, q: "Are production and food waste managed safely?", law: "Law of AR — Art. 16.3", cor: "Develop a written waste management procedure; record all waste streams; designate a separate waste storage area.", pen: "Admin. Code Art. 220.3: Individual — 100–150 AZN; Official — 400–600 AZN; Legal entity — 1000–1500 AZN" },
    { id: 15, q: "Is the personal hygiene, medical examination and health monitoring of staff maintained?", law: "Law of AR — Art. 16.3", cor: "Draw up a medical examination schedule for all staff; document personal hygiene rules; carry out hygiene training.", pen: "Admin. Code Art. 220.3: Individual — 100–150 AZN; Official — 400–600 AZN; Legal entity — 1000–1500 AZN" },
    { id: 16, q: "Is compliance control carried out during reception of raw materials, auxiliary materials and incoming products?", law: "Law of AR — Art. 16.1", cor: "Develop an official incoming inspection procedure; implement a compliance log; evaluate suppliers.", pen: "Admin. Code Art. 220.3: Individual — 100–150 AZN; Official — 400–600 AZN; Legal entity — 1000–1500 AZN" },
    { id: 17, q: "Are requirements for special-purpose, enriched, bio-active and GMO-containing products complied with?", law: "Law of AR — Art. 11, 12, 13, 25", cor: "Review registration documents for special products; obtain required permits for GMO and bio-active products.", pen: "Admin. Code Art. 220.3: Individual — 100–150 AZN; Official — 400–600 AZN; Legal entity — 1000–1500 AZN" },
    { id: 18, q: "Are food safety risks and cross-contamination in production processes effectively managed?", law: "Law of AR — Art. 16.2, 16.4", cor: "Review the HACCP plan; develop dedicated cross-contamination control procedures; document critical control points.", pen: "Admin. Code Art. 220.3: Individual — 100–150 AZN; Official — 400–600 AZN; Legal entity — 1000–1500 AZN" },
    { id: 19, q: "Do product labelling, marking and consumer information comply with legislative requirements?", law: "Law of AR — Art. 17", cor: "Check all product labels; ensure all required information (composition, production date, storage conditions) is present.", pen: "Admin. Code Art. 220.3: Individual — 100–150 AZN; Official — 400–600 AZN; Legal entity — 1000–1500 AZN" },
    { id: 20, q: "Do product storage, transportation and logistics processes meet safety requirements?", law: "Law of AR — Art. 16.3", cor: "Document storage conditions; implement temperature control logs; verify transport vehicle hygiene compliance.", pen: "Admin. Code Art. 220.3: Individual — 100–150 AZN; Official — 400–600 AZN; Legal entity — 1000–1500 AZN" },
    { id: 21, q: "Are staff engaged in relevant food safety and hygiene training?", law: "Law of AR — Art. 16.2", cor: "Conduct regular food safety and hygiene training; maintain attendance records; carry out knowledge assessments.", pen: "Admin. Code Art. 220.3: Individual — 100–150 AZN; Official — 400–600 AZN; Legal entity — 1000–1500 AZN" },
    { id: 22, q: "Do materials in contact with food and packaging comply with legislative requirements?", law: "Law of AR — Art. 17.1, 24.1", cor: "Obtain compliance certificates for all food-contact materials; immediately replace uncertified materials.", pen: "Admin. Code Art. 220.3: Individual — 100–150 AZN; Official — 400–600 AZN; Legal entity — 1000–1500 AZN" },
    { id: 23, q: "Do product advertising, presentation, marking and consumer information comply with legislative requirements?", law: "Law of AR — Art. 8, 17", cor: "Review all advertising materials; eliminate misleading claims; develop a transparent consumer information policy.", pen: "Admin. Code Art. 220.3: Individual — 100–150 AZN; Official — 400–600 AZN; Legal entity — 1000–1500 AZN" },
    { id: 24, q: "Does the establishment operate an effective product traceability, recall and supply chain control system?", law: "Law of AR — Art. 24", cor: "Implement a product traceability system; develop, test and record recall procedures; implement a lot numbering system.", pen: "Admin. Code Art. 220.3: Individual — 100–150 AZN; Official — 400–600 AZN; Legal entity — 1000–1500 AZN" }
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
    if (window.confirm('Are you sure you want to exit the diagnostic? Your answers will be lost.')) {
        document.getElementById('quizOverlay').classList.remove('active');
        document.body.style.overflow = '';
    }
}

function showQuestion(idx) {
    currentQ = idx;
    var q = QUESTIONS[idx];
    document.getElementById('qNumLabel').textContent = 'Question ' + (idx + 1) + ' / ' + TOTAL;
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
    document.getElementById('qStepLabel').textContent = 'Completed';
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
    var lbl = score >= 80 ? 'High Compliance' : score >= 60 ? 'Medium Compliance' : 'Low Compliance';
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
    var rlbl = score >= 80 ? 'High Compliance' : score >= 60 ? 'Medium Compliance' : 'Low Compliance';
    doc.setFillColor(17, 24, 39); doc.rect(0, 0, 210, 36, 'F');
    doc.setTextColor(255, 255, 255); doc.setFontSize(14); doc.setFont('helvetica', 'bold');
    doc.text('ASR Development Consulting Group', 105, 14, { align: 'center' });
    doc.setFontSize(10); doc.setFont('helvetica', 'normal');
    doc.text('Food Safety Diagnostic Report', 105, 24, { align: 'center' });
    doc.setFontSize(8); doc.setTextColor(156, 163, 175);
    doc.text('Date: ' + ds, 196, 32, { align: 'right' });
    doc.setTextColor(40, 40, 40); doc.setFillColor(249, 250, 251);
    doc.roundedRect(14, 42, 182, 40, 3, 3, 'F');
    doc.setFontSize(9); doc.setFont('helvetica', 'bold'); doc.text('Business Information', 20, 52);
    doc.setFont('helvetica', 'normal'); doc.setFontSize(8.5);
    doc.text('Business:  ' + userInfo.objName, 20, 61);
    doc.text('Phone:     ' + userInfo.phone, 20, 69);
    doc.text('Activity:  ' + userInfo.activity, 110, 61);
    doc.text('Email:     ' + userInfo.email, 110, 69);
    doc.text('Product:   ' + userInfo.product, 20, 77);
    doc.setFillColor(col[0], col[1], col[2]);
    doc.roundedRect(14, 90, 52, 30, 3, 3, 'F');
    doc.setTextColor(255, 255, 255); doc.setFontSize(24); doc.setFont('helvetica', 'bold');
    doc.text(score + '%', 40, 109, { align: 'center' });
    doc.setTextColor(40, 40, 40); doc.setFontSize(8.5); doc.setFont('helvetica', 'bold');
    doc.text(rlbl, 40, 126, { align: 'center' });
    doc.setFont('helvetica', 'normal'); doc.setFontSize(9);
    doc.text('Compliant:     ' + correct + ' / ' + TOTAL, 76, 100);
    doc.text('Non-compliant: ' + failed + ' / ' + TOTAL, 76, 109);
    doc.setFontSize(8); doc.setTextColor(107, 114, 128);
    doc.text('Assessment based on the Law of the Republic of Azerbaijan on Food Safety', 76, 118);
    if (failed > 0) {
        var rows = [];
        for (i = 0; i < TOTAL; i++) {
            if (answers[i] === false) {
                rows.push([QUESTIONS[i].id + '. ' + QUESTIONS[i].q, QUESTIONS[i].law, QUESTIONS[i].cor]);
            }
        }
        doc.autoTable({
            startY: 136,
            head: [['Non-compliant question', 'Legal Reference', 'Corrective action']],
            body: rows,
            styles: { fontSize: 8, cellPadding: 3, overflow: 'linebreak', font: 'helvetica' },
            headStyles: { fillColor: [180, 142, 66], textColor: 255, fontStyle: 'bold', fontSize: 8 },
            columnStyles: { 0: { cellWidth: 76 }, 1: { cellWidth: 44 }, 2: { cellWidth: 62 } },
            alternateRowStyles: { fillColor: [250, 250, 250] },
            margin: { left: 14, right: 14 }
        });
    } else {
        doc.setFontSize(11); doc.setTextColor(22, 163, 74); doc.setFont('helvetica', 'bold');
        doc.text('Perfect result! The business fully complies with all food safety requirements.', 105, 148, { align: 'center' });
    }
    var pages = doc.internal.getNumberOfPages();
    for (i = 1; i <= pages; i++) {
        doc.setPage(i); doc.setFontSize(7.5); doc.setTextColor(156, 163, 175); doc.setFont('helvetica', 'normal');
        doc.line(14, 285, 196, 285);
        doc.text('ASR Development Consulting Group  |  office@asrgroup.az  |  +994 50 208 58 38', 105, 290, { align: 'center' });
        doc.text('Page ' + i + '/' + pages, 196, 290, { align: 'right' });
    }
    doc.save('ASR-Diagnostic-' + ds + '.pdf');
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