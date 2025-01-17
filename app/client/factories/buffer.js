/**
 * Buffer Service
 */

module.exports = function(socket, sound) {

  socket.on('buffer:info', function(string) {
    $('#buffer').append('<span style="color:#2976A9;">[i] ' + string + '</span><br>\n');
    $('#buffer').scrollTop($('#buffer').prop('scrollHeight'));
  });

  socket.on('buffer:success', function(string) {
    $('#buffer').append('<span style="color:#4AA937;">[i] ' + string + '</span><br>\n');
    $('#buffer').scrollTop($('#buffer').prop('scrollHeight'));
    sound.connected();
  });

  socket.on('buffer:error', function(error) {
    if (typeof error === 'object') {
      switch (error.code) {
        case 'ENOTFOUND':
          error = 'The server hostname could not be resolved.';
          break;
        case 'ETIMEDOUT':
          error = 'Connection to the server timed out.';
          break;
        case 'ECONNREFUSED':
          error = 'Connection to the server has been refused.';
          break;
        default:
          error = JSON.stringify(error);
          break;
      }
    }
    $('#buffer').append('<span style="color:#D62D18;">[i] Error: ' + error + '</span><br>');
    $('#buffer').scrollTop($('#buffer').prop('scrollHeight'));
  });

  socket.on('bot:message', function(string) {
    $('#buffer').append(string + '<br>');
    $('#buffer').scrollTop($('#buffer').prop('scrollHeight'));
  });

  socket.on('reconnect', function() {
    $('#buffer').append('<span style="color:#4AA937;">&gt; Connected to chat server established</span><br>');
    $('#buffer').scrollTop($('#buffer').prop('scrollHeight'));
  });

  socket.on('disconnect', function() {
    $('#buffer').append('<span style="color:#D62D18;">&gt; Connection to chat server has been lost. Reconnecting...</span><br>');
    $('#buffer').scrollTop($('#buffer').prop('scrollHeight'));
  });

  socket.on('bot:disconnect', function() {
    $('#buffer').append('<span style="color:#D62D18;">&gt; You have been disconnected from the Minecraft server.</span><br>');
    $('#buffer').scrollTop($('#buffer').prop('scrollHeight'));
  });

  // service exposes this
  return {
    append: function(string) {
      $('#buffer').append(string + '<br>\n');
      $('#buffer').scrollTop($('#buffer').prop('scrollHeight'));
    }
  };
};
