$(function(){

  function buildHTML(message){
    if (message.image){
      var html =
        `<div class="chatMain__messageList__index">
        <div class="chatMain__messageList__index--name">
          ${message.user_name}
        </div>
        <div class="chatMain__messageList__index--date">
          ${message.created_at}
        </div>
        </div>
        <div class="chatMain__messageList--message">
          ${message.content}
          <img class="chatMain__messageList--message--img" src="${message.image}">
        </div>`
      return html;
    } else {
      var html =
        `<div class="chatMain__messageList__index">
          <div class="chatMain__messageList__index--name">
            ${message.user_name}
          </div>
          <div class="chatMain__messageList__index--date">
            ${message.created_at}
          </div>
        </div>
        <div class="chatMain__messageList--message">
          ${message.content}
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
});