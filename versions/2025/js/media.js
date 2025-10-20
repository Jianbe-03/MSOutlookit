/* Media Handling - Images, YouTube, etc. */

function isImgur(externallink) {
  if (externallink.indexOf('imgur.com') != -1) {
    return isActuallyImgur(externallink);
  }
  if (externallink.indexOf('i.imgur.com') != -1) {
    return isActuallyImgur(externallink);
  }
  return false;
}

function isActuallyImgur(externallink) {
  if (externallink.indexOf('.gif') == -1 && externallink.indexOf('.jpg') == -1 && externallink.indexOf('.png') == -1) {
    return false;
  }
  return true;
}

function isYoutube(externallink) {
  if (externallink.indexOf('youtube.com') != -1 || externallink.indexOf('youtu.be') != -1) {
    return true;
  }
  return false;
}

function makeImgurExpando(externallink, title) {
  var finder = String(Math.floor(Math.random() * 1000000));
  var rhtml = '<div class="expando" id="' + finder + '"><a class="hoverexpando">[pic]</a></div>';
  var html = '<div class="lynxexpando" ><img class="normal" src="' + externallink + '"></div>';
  rhtml += html;
  setTimeout('$(\'#' + finder + '\').children(\'.hoverexpando\').click(expandoClick);', 500);
  setTimeout('$(\'#' + finder + '\').children(\'.lynxexpando\').children(\'img.normal\').resizable({aspectRatio:true});', 500);
  return rhtml;
}

function makeYoutubeExpando(externallink, title) {
  var finder = String(Math.floor(Math.random() * 1000000));
  var rhtml = '<div class="expando" id="' + finder + '"><a class="hoverexpando">[youtube]</a></div>';
  var vidid = '';
  if (externallink.indexOf('v=') != -1) {
    vidid = externallink.substring(externallink.indexOf('v=') + 2, externallink.indexOf('v=') + 13);
  } else if (externallink.indexOf('youtu.be/') != -1) {
    vidid = externallink.substring(externallink.indexOf('youtu.be/') + 9, externallink.indexOf('youtu.be/') + 20);
  }
  var html = '<div class="lynxexpando" ><iframe width="560" height="345" src="http://www.youtube.com/embed/' + vidid + '" frameborder="0" allowfullscreen></iframe></div>';
  rhtml += html;
  setTimeout('$(\'#' + finder + '\').children(\'.hoverexpando\').click(expandoClick);', 500);
  return rhtml;
}

function expandoClick() {
  if ($(this).parent().children('.lynxexpando').css('display') != 'none') {
    $(this).parent().children('.lynxexpando').slideToggle(400);
  } else {
    $(this).parent().children('.lynxexpando').slideToggle(400);
  }
}

function getLynxdump(externallink, title) {
  var finder = String(Math.floor(Math.random() * 1000000));
  var rhtml = '<div class="expando" id="' + finder + '"><a class="hoverexpando">[text dump]</a></div>';
  var html = '<div class="lynxexpando" ><div class="textdump"><img src="loading.gif"></div></div>';
  rhtml += html;
  setTimeout('$(\'#' + finder + '\').children(\'.hoverexpando\').click(lynxexpandoClick);', 500);
  return rhtml;
}

function lynxexpandoClick() {
  if ($(this).parent().children('.lynxexpando').css('display') != 'none') {
    $(this).parent().children('.lynxexpando').slideToggle(400);
  } else {
    var link = 'http://viewtext.org/article?url=' + externallink + '&jsonp=textdumpBack';
    $(this).parent().children('.lynxexpando').slideToggle(400);
  }
}

function textdumpBack(data) {
  $('.textdump').html(data.content);
}
