// Google Apps Script — Extensions > Apps Script > paste > Save

function doPost(e) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  try {
    const p = e.parameter;

    if (sheet.getLastRow() === 0) {
      const header = sheet.getRange(1, 1, 1, 9);
      header.setValues([['Код', 'Дата', 'Имe', 'Телефон', 'Имейл', 'Продукти', 'Общо (лв.)', 'Бележка', 'Готово']]);
      header.setFontWeight('bold');

      // Green row when "Готово" (column I) is ticked
      const rule = SpreadsheetApp.newConditionalFormatRule()
        .whenFormulaSatisfied('=$I2=TRUE')
        .setBackground('#b7e1cd')
        .setRanges([sheet.getRange('A2:I1000')])
        .build();
      sheet.setConditionalFormatRules([rule]);
    }

    const orderNum = sheet.getLastRow(); // header is row 1, so first order = row 2 → num 1
    const orderCode = 'MED-' + String(orderNum).padStart(4, '0');

    sheet.appendRow([
      orderCode,
      p.date,
      p.name,
      p.phone,
      p.email || '',
      p.items,
      p.total,
      p.note  || '',
      false,
    ]);

    sheet.getRange(sheet.getLastRow(), 9).insertCheckboxes();

    MailApp.sendEmail({
      to: 'medovnikbg@gmail.com',
      subject: '🍯 ' + orderCode + ' — ' + p.name,
      body: [
        'Нова предварителна поръчка!\n',
        'Код:      ' + orderCode,
        'Клиент:   ' + p.name,
        'Телефон:  ' + p.phone,
        'Имейл:    ' + (p.email || '—'),
        'Продукти: ' + p.items,
        'Общо:     ' + p.total + ' лв.',
        'Бележка:  ' + (p.note  || '—'),
        'Дата:     ' + p.date,
      ].join('\n'),
    });

    return ContentService
      .createTextOutput(JSON.stringify({ ok: true }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (err) {
    sheet.appendRow(['ГРЕШКА', err.message]);
    return ContentService
      .createTextOutput(JSON.stringify({ ok: false, error: err.message }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
