$(function(){
  
  function buildHTML(message){
    if (message.image){
      var html =
        `<div class="chatMain__messageList__index" data-message-id=${message.id}>
          <div class="chatMain__messageList__index--data">
            <div class="chatMain__messageList__index--data--name">
              ${message.user_name}
            </div>
            <div class="chatMain__messageList__index--data--date">
              ${message.created_at}
            </div>
          </div>
          <div class="chatMain__messageList__index--message">
            ${message.content}
            <img class="chatMain__messageList__index--message--img" src="${message.image}">
          </div>
        </div>`
      return html;
    } else {
      var html =
        `<div class="chatMain__messageList__index" data-message-id=${message.id}>
          <div class="chatMain__messageList__index--data">
            <div class="chatMain__messageList__index--data--name">
              ${message.user_name}
            </div>
            <div class="chatMain__messageList__index--data--date">
              ${message.created_at}
            </div>
          </div>
          <div class="chatMain__messageList__index--message">
            ${message.content}
          </div>
        </div>`
      return html;
    }
  }
  $("#new_message").on("submit",function(e){
    e.preventDefault()
    var formData = new FormData(this);
    var url = $(this).attr('action');
    $.ajax({
      url: url,
      type: 'POST',
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      var html = buildHTML(data);
      $(".chatMain__messageList").append(html);
      $(".chatMain__messageList").animate({scrollTop: $(".chatMain__messageList")[0].scrollHeight});
      $("form")[0].reset();
      $("#form-submit").prop("disabled", false);
    })
    .fail(function(){
      alert("メッセージ送信に失敗しました");
    })
  });
  var reloadMessages = function() {
    var last_message_id = $('.chatMain__messageList__index:last').data("message-id");
    console.log(last_message_id)
    $.ajax({
      url: "api/messages",
      type: "get",
      dataType: "json",
      data: { id: last_message_id }
    })
    .done(function(messages) {
      if (messages.length !== 0){
        var insertHTML = '';
        $.each(messages, function(i, message){
          insertHTML += buildHTML(message)
        });
        $('.chatMain__messageList').append(insertHTML);
        $('.chatMain__messageList').animate({ scrollTop: $('.chatMain__messageList')[0].scrollHeight});
      }
    })
    .fail(function(){
      alert("error");
    });
  };
  if (document.location.href.match(/\/groups\/\d+\/messages/)){
  setInterval(reloadMessages, 7000);
  }
});
