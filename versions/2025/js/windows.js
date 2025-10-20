/* Window System - For dialogs and popups */

function myWindow(type, state, tofield, ccfield, subjectfield, bodyfield, isLogin) {
  this.type = type;
  this.state = state;
  this.id = String(generateUid());
  this.tofield = tofield;
  this.ccfield = ccfield;
  this.subjectfield = subjectfield;
  this.bodyfield = bodyfield;
  this.idfinder = '#' + String(this.id);
  this.minfinder = '#m' + String(this.id);
  this.isMaxed = false;
  this.oldHeight = null;
  this.oldWidth = null;
  this.oldLeft = null;
  this.oldTop = null;
  globalWindowDict[this.id] = this;
  
  var html = '<div id="%id" class="emailwindow" style="position:absolute;left:100px;top:300px;"><div class="closebuttons"></div><div class="minimize"></div><div class="maximize"></div><div class="windowclose"></div><div class="upperleftemailwindow"></div><div class="emailwindowbanner"></div><div class="emailbuttons"></div><div class="emailbuttonsbanner"></div><div class="emailcomposewindow"><input type="button" value="Send" class="sendbutton"  tabindex="%tabindex5"><div class="emailcomposebuttons"></div><input type="text" rows="1" cols="40" class="afield tofield" tabindex="%tabindex1" value="%tofield"><input type="text" rows="1" cols="19" class="afield ccfield" tabindex="%tabindex2" value="%ccfield"><input type="text" rows="1" cols="19" tabindex="%tabindex3" class="afield subjectfield" value="%subjectfield"><textarea tabindex="%tabindex4" class="emailcomposebody">%bodyfield</textarea></div></div>';
  
  if (isLogin) {
    html = html.replace('type="text" rows="1" cols="19" class="afield ccfield', 'type="password" rows="1" cols="19" class="afield ccfield');
  }
  
  $('.outlookminhi').removeClass('outlookminhi');
  var tempNum = Math.floor(Math.random() * 1000);
  html = html.replace('%tabindex1', tempNum + 1);
  html = html.replace('%tabindex2', tempNum + 2);
  html = html.replace('%tabindex3', tempNum + 3);
  html = html.replace('%tabindex4', tempNum + 4);
  html = html.replace('%tabindex5', tempNum + 5);
  html = html.replace('%id', String(this.id));
  html = html.replace('%bodyfield', bodyfield);
  html = html.replace('%tofield', tofield);
  html = html.replace('%subjectfield', subjectfield);
  html = html.replace('%ccfield', ccfield);
  
  $('body').append(html);
  $(this.idfinder).css({
    'left': spawnEdge,
    'top': spawnEdge
  });
  
  spawnEdge += 50;
  if (spawnEdge > $(window).height() - 200) {
    spawnEdge = 50;
  }
  
  $(this.idfinder).children('.emailcomposewindow').children('.tofield').focus();
  if (tofield.substr(0, 5) == 'reply') {
    $(this.idfinder).children('.emailcomposewindow').children('.emailcomposebody').focus();
  }
  
  var html = '<div id="m%id" class="emailmin emailminhigh"></div>';
  html = html.replace("%id", String(this.id));
  $('.emailminhigh').removeClass('emailminhigh');
  $('.minholder').append(html);
  
  var scopeidfinder = this.idfinder;
  var resizeFunc = function() {
    $(scopeidfinder).children('.emailcomposewindow').height($(scopeidfinder).height() - 152);
    var tempheight = $(scopeidfinder).children('.emailcomposewindow').height();
    var tempwidth = $(scopeidfinder).children('.emailcomposewindow').width();
    $(scopeidfinder).children('.emailcomposewindow').children('.emailcomposebody').height(tempheight - 112);
    $(scopeidfinder).children('.emailcomposewindow').children('.emailcomposebody').width(tempwidth - 34);
    $(scopeidfinder).children('.emailcomposewindow').children('.afield').width(tempwidth - 133);
  }
  
  resizeFunc();
  this.resizeFunc = resizeFunc;
  
  $(this.idfinder).draggable({
    containment: 'window'
  });
  
  $(this.idfinder).resizable({
    minWidth: 300,
    minHeight: 200,
    resize: resizeFunc
  });
  
  // Setup window controls
  $(this.idfinder).children('.sendbutton').click(function() {
    var id = $(this).parent().parent().attr('id');
    var tofield = $(globalWindowDict[id].idfinder).children('.emailcomposewindow').children('.tofield').val();
    var ccfield = $(globalWindowDict[id].idfinder).children('.emailcomposewindow').children('.ccfield').val();
    var subjectfield = $(globalWindowDict[id].idfinder).children('.emailcomposewindow').children('.subjectfield').val();
    var body = $(globalWindowDict[id].idfinder).children('.emailcomposewindow').children('.emailcomposebody').val();
    handleEmailSend(id, tofield, ccfield, subjectfield, body);
  });
  
  $(this.idfinder).children('.windowclose').click(function() {
    var id = $(this).parent().attr('id');
    globalWindowDict[id].close();
  });
  
  this.minimize = function() {
    if ($(this.idfinder).css('display') == 'none') {
      $(this.idfinder).css('display', 'block');
      $('.emailminhigh').removeClass('emailminhigh');
      $(this.minfinder).addClass('emailminhigh');
    } else {
      $(this.idfinder).css('display', 'none');
      $('.emailminhigh').removeClass('emailminhigh');
    }
  }
  
  this.close = function() {
    $(this.idfinder).remove();
    $(this.minfinder).remove();
  }
  
  $(this.minfinder).click(function() {
    var id = $(this).attr('id').replace('m', '');
    globalWindowDict[id].minimize();
  });
}
