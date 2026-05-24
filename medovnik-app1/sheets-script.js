// Google Apps Script — Extensions > Apps Script > paste > Save > Deploy as web app
// ⚠️  След промяна задължително направи НОВА версия при Deploy (не редактирай старата)

var DISCORD_URL  = 'https://discord.gg/ВАШИЯТ_ЛИНК'; // <-- смени с реалния Discord invite
var ADMIN_EMAIL  = 'medovnikbg@gmail.com';

// ─────────────────────────────────────────────────────────────
function doPost(e) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  try {
    var p = e.parameter;

    // Header row on first run
    if (sheet.getLastRow() === 0) {
      var hdr = sheet.getRange(1, 1, 1, 10);
      hdr.setValues([['Код','Дата','Имe','Телефон','Имейл','Продукти','Общо (лв.)','Общо (€)','Бележка','Готово']]);
      hdr.setFontWeight('bold');
      var rule = SpreadsheetApp.newConditionalFormatRule()
        .whenFormulaSatisfied('=$J2=TRUE')
        .setBackground('#b7e1cd')
        .setRanges([sheet.getRange('A2:J1000')])
        .build();
      sheet.setConditionalFormatRules([rule]);
    }

    var orderNum  = sheet.getLastRow();
    var orderCode = 'MED-' + String(orderNum).padStart(4, '0');
    var date      = p.date || new Date().toLocaleString('bg-BG');

    sheet.appendRow([
      orderCode, date, p.name, p.phone, p.email || '',
      p.items, p.total, p.totalEur || '', p.note || '', false,
    ]);
    sheet.getRange(sheet.getLastRow(), 10).insertCheckboxes();

    // Parse detailed items
    var itemsList = [];
    try { itemsList = JSON.parse(p.itemsJson || '[]'); } catch(ex) {}

    var discordUnlocked = p.discordUnlocked === '1';

    // ── Admin notification ──────────────────────────────────
    MailApp.sendEmail({
      to:      ADMIN_EMAIL,
      subject: '🍯 ' + orderCode + ' — ' + p.name,
      body: [
        'Нова предварителна поръчка!\n',
        'Код:      ' + orderCode,
        'Дата:     ' + date,
        'Клиент:   ' + p.name,
        'Телефон:  ' + p.phone,
        'Имейл:    ' + (p.email || '—'),
        'Продукти: ' + p.items,
        'Общо:     ' + (p.totalEur || '?') + ' € / ' + p.total + ' лв.',
        'Бележка:  ' + (p.note || '—'),
        'Discord:  ' + (discordUnlocked ? 'ДА' : 'НЕ'),
      ].join('\n'),
    });

    // ── Customer confirmation email ─────────────────────────
    if (p.email) {
      var itemRows = itemsList.map(function(item) {
        return '<tr>'
          + '<td style="padding:10px 8px;color:#e8d5b0;font-size:14px">' + item.name + '</td>'
          + '<td style="padding:10px 8px;text-align:center;color:#b8a882;font-size:14px">' + item.qty + '</td>'
          + '<td style="padding:10px 8px;text-align:right;color:#f2c84e;font-size:14px;font-weight:bold">'
          + (item.priceEur ? item.priceEur + ' €' : '') + '</td>'
          + '<td style="padding:10px 8px;text-align:right;color:#b8a882;font-size:13px">'
          + (item.priceBgn ? (item.priceBgn * item.qty).toFixed(2) + ' лв.' : '') + '</td>'
          + '</tr>';
      }).join('');

      var discordSection = discordUnlocked
        ? '<div style="background:rgba(88,101,242,0.12);border:1px solid rgba(88,101,242,0.35);'
          + 'border-radius:8px;padding:22px;margin:28px 0;text-align:center">'
          + '<div style="color:#7289da;font-size:16px;margin-bottom:8px">🎉 Отключихте Discord общността!</div>'
          + '<p style="color:#b8a882;font-size:13px;margin:8px 0 14px">'
          + 'Поръчката ви надхвърля 70 лв. — добре дошли в общността на Медовник пивоварите.</p>'
          + '<a href="' + DISCORD_URL + '" style="display:inline-block;background:#5865f2;color:white;'
          + 'padding:11px 28px;border-radius:6px;text-decoration:none;font-size:14px;letter-spacing:1px">'
          + 'Влез в Discord →</a></div>'
        : '<div style="background:rgba(184,98,26,0.1);border:1px solid rgba(242,200,78,0.2);'
          + 'border-radius:6px;padding:16px;margin:20px 0">'
          + '<p style="color:#b8a882;font-size:13px;margin:0;text-align:center">'
          + '💡 Поръчай за над 70 лв. и получи достъп до нашата Discord общност от домашни пивовари.</p>'
          + '</div>';

      var htmlBody = '<!DOCTYPE html><html><head><meta charset="UTF-8"></head><body '
        + 'style="margin:0;padding:0;background:#0c0501;font-family:Georgia,serif;color:#e8d5b0">'
        + '<div style="max-width:580px;margin:0 auto">'

        // Header
        + '<div style="background:#120a03;padding:36px 40px;text-align:center;'
        + 'border-bottom:2px solid #b8621a">'
        + '<div style="font-size:30px;color:#f2c84e;letter-spacing:8px;font-weight:bold">МЕДОВНИК</div>'
        + '<div style="font-size:12px;color:#b8621a;letter-spacing:3px;margin-top:6px">ДОМАШНА МЕДОВИНА</div>'
        + '</div>'

        // Body
        + '<div style="padding:36px 40px;background:#120a03">'
        + '<div style="font-size:19px;color:#f2c84e;margin-bottom:6px">Здравейте, ' + p.name + '!</div>'
        + '<p style="color:#b8a882;font-size:15px;margin:8px 0 24px;line-height:1.6">'
        + 'Получихме вашата предварителна поръчка. Ще се свържем с вас скоро за потвърждение и детайли по доставката.</p>'

        // Order code badge
        + '<div style="display:inline-block;background:rgba(184,98,26,0.2);border:1px solid #b8621a;'
        + 'border-radius:4px;padding:5px 14px;font-size:13px;color:#f2c84e;letter-spacing:3px">'
        + orderCode + '</div>'
        + '<p style="font-size:12px;color:rgba(232,213,176,0.45);margin:8px 0 28px">Дата: ' + date + '</p>'

        // Items table
        + '<div style="font-size:11px;letter-spacing:4px;text-transform:uppercase;color:#b8621a;'
        + 'margin-bottom:10px;border-bottom:1px solid rgba(184,98,26,0.25);padding-bottom:6px">Поръчани продукти</div>'
        + '<table style="width:100%;border-collapse:collapse;margin-bottom:8px">'
        + '<tr><th style="text-align:left;padding:8px;font-size:11px;letter-spacing:2px;color:#b8621a;'
        + 'border-bottom:1px solid rgba(184,98,26,0.2)">Продукт</th>'
        + '<th style="text-align:center;padding:8px;font-size:11px;letter-spacing:2px;color:#b8621a;'
        + 'border-bottom:1px solid rgba(184,98,26,0.2)">Бр.</th>'
        + '<th style="text-align:right;padding:8px;font-size:11px;letter-spacing:2px;color:#b8621a;'
        + 'border-bottom:1px solid rgba(184,98,26,0.2)">€</th>'
        + '<th style="text-align:right;padding:8px;font-size:11px;letter-spacing:2px;color:#b8621a;'
        + 'border-bottom:1px solid rgba(184,98,26,0.2)">лв.</th></tr>'
        + itemRows
        + '<tr><td colspan="2" style="padding:14px 8px 8px;border-top:1px solid rgba(184,98,26,0.4);'
        + 'color:#f2c84e;font-size:15px;font-weight:bold">Общо</td>'
        + '<td style="padding:14px 8px 8px;border-top:1px solid rgba(184,98,26,0.4);text-align:right;'
        + 'color:#f2c84e;font-size:15px;font-weight:bold">' + (p.totalEur || '') + ' €</td>'
        + '<td style="padding:14px 8px 8px;border-top:1px solid rgba(184,98,26,0.4);text-align:right;'
        + 'color:#b8a882;font-size:13px">' + p.total + ' лв.</td></tr>'
        + '</table>'

        // 10% discount notice
        + '<div style="background:rgba(242,200,78,0.07);border:1px solid rgba(242,200,78,0.25);'
        + 'border-radius:6px;padding:14px 18px;margin:20px 0">'
        + '<p style="color:#f2c84e;font-size:14px;margin:0">🎁 '
        + 'Вашата <strong>10% отстъпка</strong> е запазена — ще бъде приложена автоматично при официалния старт на продукта.</p>'
        + '</div>'

        // Discord section
        + discordSection

        + '</div>'

        // Footer
        + '<div style="background:#0c0501;padding:24px 40px;text-align:center;'
        + 'border-top:1px solid rgba(184,98,26,0.2)">'
        + '<p style="font-size:13px;color:rgba(232,213,176,0.5);margin:4px 0">📞 +359 98 877 9092</p>'
        + '<p style="font-size:13px;color:rgba(232,213,176,0.5);margin:4px 0">✉️ medovnikbg@gmail.com</p>'
        + '<p style="font-size:11px;color:rgba(232,213,176,0.25);margin-top:14px">© Медовник · Домашна медовина</p>'
        + '</div>'
        + '</div></body></html>';

      MailApp.sendEmail({
        to:       p.email,
        subject:  '✅ Поръчка ' + orderCode + ' — потвърждение | Медовник',
        body:     'Здравейте ' + p.name + ',\n\nПолучихме вашата поръчка ' + orderCode + '.\n'
                + 'Общо: ' + (p.totalEur || '') + ' € / ' + p.total + ' лв.\n\n'
                + 'Ще се свържем с вас скоро.\n\nМедовник',
        htmlBody: htmlBody,
      });
    }

    return ContentService
      .createTextOutput(JSON.stringify({ ok: true, code: orderCode }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch(err) {
    sheet.appendRow(['ГРЕШКА', err.message]);
    return ContentService
      .createTextOutput(JSON.stringify({ ok: false, error: err.message }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
