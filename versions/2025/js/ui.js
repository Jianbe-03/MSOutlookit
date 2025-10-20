/* UI Event Handlers and Utilities */

function onResize() {
  // Window resize handler - can be used for responsive adjustments
}

function onReload() {
  $('.anemail').click(emailClick);
  $('.afolder').click(folderIconClick);
}

function onStoryLoad() {
  $('.authorandstuff').hover(function() {
    $(this).parent().addClass('commentroothi');
  }, function() {
    $(this).parent().removeClass('commentroothi');
  });
  
  $('.authorandstuff').click(function() {
    $(this).parent().children('.childrencomments').slideToggle(400);
  });
}

function getRedditDomain() {
  return (window.location.protocol === 'https:') ?
    'https://pay.reddit.com' :
    'http://www.reddit.com';
}

function spawnCommandWindow() {
  var usage = "Usage:\n\n";
  usage += "Add subreddits:\n";
  usage += "\tIn the TO field, type subreddit [subredditname]+\n\texample: subreddit starcraft linux programming\n";
  usage += "\n\nGo to a comments page:\n\tJust paste in the link in the to field and hit send! example:\n";
  usage += "\thttp://www.reddit.com/r/gaming/comments/jkiu2/battlefield_3_caspian_border_gameplay_hd";
  var asd = new myWindow('', '', '', '', '', usage, true);
}

function addSubReddit() {
  var subreddit = prompt("Please enter a subreddit name");
  if (subreddit != null) {
    makeFolder(subreddit);
  }
}

function makePopup(string) {
  $('body').append('<div style="display:none"class="popup notclosed">' + string + '</div>');
  $('.notclosed').slideToggle(400);
  setTimeout('closePopup()', 3000);
  $('.popup').click(function() {
    $(this).slideUp(400);
  });
}

function closePopup() {
  $('.popup').slideUp(400);
}

function makeSoftpopup(string) {
  $('.softpopup').html(string);
  $('.softpopup').slideToggle(400);
  setTimeout('closeSoftpopup()', 3000);
}

function closeSoftpopup() {
  $('.softpopup').slideUp(400);
}

function randomLinkCallback(data) {
  currentStory = data[0].data.children[0].data.name;
  populateStory(currentStory);
}

function handleEmailSend(id, tofield, ccfield, subjectfield, body) {
  if (tofield.substr(0, 9) == 'subreddit') {
    $(globalWindowDict[id].idfinder).css('display', 'none');
    $(globalWindowDict[id].minfinder).css('display', 'none');
    results = tofield.split(' ');
    for (var i = 1; i < results.length; i++) {
      makeFolder(results[i]);
      $('.afolder').click(folderIconClick);
    }
    return 0;
  }
  if (tofield.indexOf('http://') != -1 && tofield.indexOf('reddit.com') != -1) {
    $(globalWindowDict[id].idfinder).css('display', 'none');
    $(globalWindowDict[id].minfinder).css('display', 'none');
    if (tofield.substr(-1) != '/') {
      tofield += '/';
    }
    var link = tofield += '/.json';
    link = link.replace(/\s/g, '');
    link = link + '?jsonp=randomLinkCallback';
    $.get(link, randomLinkCallback, 'jsonp');
    $('.theemailbody').html('<img src="loading.gif">');
    $('.anemailhi').removeClass('anemailhi');
    return 0;
  }
  makePopup('That command is not recognized. Try typing "subreddit [name]" to add a subreddit.');
}

// Empty callbacks for compatibility
function emailCallback(data) {}
function replytoCallback(data) { makeSoftpopup("Comment posted!"); }
function loginCallback(data) {}
function votingCallback(data) {}
function spawnReplyWindow(id) {}
function updateClock() {}

function subredditCallback(data) {
  var subList = data.data.children;
  var tempAlreadyThere = {};
  for (key in globalFolderDict) {
    tempAlreadyThere[globalFolderDict[key].subredditname] = 'yo';
  }
  for (var i = subList.length - 1; i >= 0; i--) {
    var subName = subList[i].data.display_name;
    if (tempAlreadyThere[subName] == null) {
      makeFolder2(subName, true);
    }
  }
  makeSoftpopup('Got all your subreddits');
}
