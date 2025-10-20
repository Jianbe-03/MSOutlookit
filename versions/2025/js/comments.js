/* Comments Management */

function commentsCallback(storyJSON) {
  mainJSON = storyJSON[0].data.children[0].data;
  var theStoryID = mainJSON.name;
  var story = globalStoryDict[theStoryID];
  
  if (isImgur(mainJSON.url)) {
    var expando = makeImgurExpando(mainJSON.url, mainJSON.title);
    story.bodyHTML += expando;
  } else {
    story.bodyHTML += '<a href="' + mainJSON.url + '">' + mainJSON.title + '</a><br/>';
    if (mainJSON.selftext_html) {
      story.bodyHTML += mainJSON.selftext_html;
    }
  }
  
  if (mainJSON.isSelf) {
    if (mainJSON.selftext_html != null) {
      story.bodyHTML += mainJSON.selftext_html;
    }
  }
  
  story.bodyHTML = unEncode(story.bodyHTML);
  story.bodyHTML += '<div class="storycommentline"></div>';
  
  var commentsRoot = storyJSON[1].data.children;
  var commentsHTML = '';
  for (var i = 0; i < commentsRoot.length; i++) {
    if (commentsRoot[i].kind == 'more') {
      continue;
    }
    var commentJSON = commentsRoot[i].data;
    var author = commentJSON.author;
    var body_html = unEncode(commentJSON.body_html);
    var score = commentJSON.ups - commentJSON.downs;
    var id = commentJSON.name;
    commentsHTML += makeCommentHeader(score, author, body_html, id);
    commentsHTML += '<div class="childrencomments child0">';
    try {
      commentsHTML += getChildComments(commentJSON.replies.data.children, 1);
    } catch (err) {}
    commentsHTML += '</div></div>';
  }
  
  story.bodyHTML += commentsHTML;
  if (currentStory == theStoryID) {
    $('.theemailbody').html(story.bodyHTML);
    onStoryLoad();
  }
}

function makeCommentHeader(score, author, body_html, id) {
  var commentsHTML = '';
  commentsHTML += '<div id="' + id + '" class="commentroot">';
  commentsHTML += '<div class="authorandstuff showhover">';
  commentsHTML += '<span class="score">' + score + '</span> <span class="commentauthor">' + author + '</span>';
  commentsHTML += '</div>';
  commentsHTML += '<div class="commentbody">' + body_html + '</div>';
  return commentsHTML;
}

function getChildComments(jsonroot, level) {
  if (jsonroot == null) {
    return '';
  }
  var myhtml = '';
  for (var i = 0; i < jsonroot.length; i++) {
    if (jsonroot[i].kind == 'more') {
      continue;
    }
    var commentJSON = jsonroot[i].data;
    var author = commentJSON.author;
    var body_html = unEncode(commentJSON.body_html);
    var score = commentJSON.ups - commentJSON.downs;
    var id = commentJSON.name;
    myhtml += makeCommentHeader(score, author, body_html, id);
    myhtml += '<div class="childrencomments child' + level + '">';
    try {
      myhtml += getChildComments(commentJSON.replies.data.children, level + 1);
    } catch (err) {}
    myhtml += '</div></div>';
  }
  return myhtml;
}

function unEncode(text) {
  var txt = document.createElement("textarea");
  txt.innerHTML = text;
  return txt.value;
}
