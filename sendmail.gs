function onChangeStatus(e){

  var cell = e.range;
  var status = e.value;
  var sheet = cell.getSheet();
  var column = cell.getColumn();
  var row = cell.getRow();
  var lastRow = sheet.getLastRow();
  var TARGET_SHEET_NAME = "TARGET_SHEET_NAME";
  var sh = SpreadsheetApp.getActiveSpreadsheet();
  
  Logger.log(row);
  
  if(column === 4 && row >= 2 && row <= lastRow && status !== ' ' && sh.getSheetName() === TARGET_SHEET_NAME){
    sendEmail(row);
    Browser.msgBox("更新メールを送信しました。");
  }
}

function sendEmail(row){

  var FIELDS = {
    no: 0,
    name: 3,
  }

  var values = SpreadsheetApp.getActiveSheet().getDataRange().getValues();
  var index = row - 1;
  var myNo = values[index][FIELDS.no];
  var name = values[index][FIELDS.name];

  var mailto = '';
  var mailcc = '';
  var subject　= 'subject';
  var body = '';
      body += getDate() + '、' + myNo + '行目が' + name + '（使用者）に更新されました。' + "\n" ;
      body += 'URL：https://docs.google.com/spreadsheets/d/spreadsheetID;

  GmailApp.sendEmail(mailto, subject, body,{cc: mailcc});
        console.log("\nmailto: " + mailto +
             "title: " + subject + "\n" +
             "body: " + body + "\n"
               );
}

function getDate(){
  var now = new Date();
  var year = now.getFullYear();
  var month = now.getMonth() + 1;
  var day = now.getDate();
  //var min = now.getMinutes();
  //var sec = now.getSeconds();
  return (""+year).slice(0,4) + '年' + ("0"+month).slice(-2) + '月' + ("0"+day).slice(-2) + '日';
    // ("0"+hour).slice(-2)+ ("0"+min).slice(-2) + ("0"+sec).slice(-2);
}
