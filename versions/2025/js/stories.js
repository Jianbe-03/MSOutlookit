/* Story/Post Management */

function myStory(parentJson, folder, addToDom) {
  var rootJson = parentJson.data;
  this.rootJson = rootJson;
  this.folder = folder;
  
  // Microsoft Outlook message item template
  var previewHTML = `
    <div id="%id" class="message-item anemail unread">
      <div class="message-avatar">%randomInitial</div>
      <div class="message-content">
        <div class="message-header">
          <div class="message-sender">%randomname</div>
          <div class="message-time">%timeago</div>
        </div>
        <div class="message-subject">%title</div>
        <div class="message-preview">r/%subreddit • %num_comments comments • %score points</div>
      </div>
    </div>
  `;
  
  var name = getRandomName();
  var author = rootJson.author;
  this.id = rootJson.name;
  var num_comments = rootJson.num_comments;
  var score = rootJson.score;
  this.url = rootJson.url;
  this.title = rootJson.title;
  
  // Calculate time ago
  var created = rootJson.created_utc;
  var now = Math.floor(Date.now() / 1000);
  var diff = now - created;
  var timeago = '';
  if (diff < 60) timeago = 'Just now';
  else if (diff < 3600) timeago = Math.floor(diff / 60) + 'm';
  else if (diff < 86400) timeago = Math.floor(diff / 3600) + 'h';
  else if (diff < 604800) timeago = Math.floor(diff / 86400) + 'd';
  else timeago = Math.floor(diff / 604800) + 'w';
  
  if (rootJson.over_18) {
    if (!alwaysHideNSFW || true) {
      this.title = this.title + ' <span style="color:#d13438;font-weight:600;">NSFW</span>';
    }
  }
  
  var initials = name.split(' ').map(function(s){return s[0]}).slice(0,2).join('').toUpperCase();
  
  previewHTML = previewHTML.replace('%author', author);
  previewHTML = previewHTML.replace('%randomname', name);
  previewHTML = previewHTML.replace('%randomInitial', initials);
  previewHTML = previewHTML.replace('%score', score);
  previewHTML = previewHTML.replace('%title', this.title);
  previewHTML = previewHTML.replace('%subreddit', rootJson.subreddit);
  previewHTML = previewHTML.replace('%domain', rootJson.domain);
  previewHTML = previewHTML.replace('%id', this.id);
  previewHTML = previewHTML.replace('%num_comments', num_comments);
  previewHTML = previewHTML.replace('%timeago', timeago);
  
  this.previewHTML = previewHTML;
  this.bodyHTML = '';
  folder.emailDict[this.id] = this;
  globalStoryDict[this.id] = this;
  if (addToDom) {
    $('#previewarea').append(previewHTML);
  }
  this.addToArea = function() {
    $('#previewarea').append(this.previewHTML);
  }
}

function emailClick() {
  if (currentStory != null) {
    globalScrollDict[currentStory] = $('.theemailbody').scrollTop();
  }
  var id = $(this).attr('id');
  if (!populateStory(id)) {
    $('.theemailbody').html(current_folder.emailDict[id].bodyHTML);
    if (globalScrollDict[currentStory] != null) {
      $('.theemailbody').scrollTop(globalScrollDict[currentStory]);
    } else {
      $('.theemailbody').scrollTop(0);
    }
  }
  
  // Update selection styling for Outlook interface
  $('.anemailhi').removeClass('anemailhi');
  $('.selected').removeClass('selected');
  $(this).addClass('anemailhi selected');
  $(this).removeClass('emailunread unread');
  onStoryLoad();
}

function populateStory(id) {
  var story = globalStoryDict[id];
  currentStory = id;
  if (story == null) {
    return 0;
  }
  if (story.bodyHTML.length > 1) {
    return 0;
  }
  $('.theemailbody').html('<img src="loading.gif">');
  var storyName = id.substr(3);
  var link = getRedditDomain() + '/comments/' + storyName + '.json';
  link = link + '?jsonp=commentsCallback';
  $.get(link, commentsCallback, 'jsonp');
  return true;
}
