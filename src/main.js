// 設定値
var API_URL = 'https://api.chatwork.com/v2'
var API_KEY = ''

/**
 * Messageを送る
 * @param {*} roomId 
 * @param {*} message 
 * @param {*} additionalOptions 
 */
function sendMessage (roomId, message, additionalOptions) {
  const METHOD = 'POST'
  const PATH = '/rooms/' + roomId + '/messages'
  var options = {
    'payload': { 'body': message }
  }

  // 追加オプションがあれば入れる
  if ('self_unread' in additionalOptions) {
    options.payload.self_unread = additionalOptions.self_unread
  }

  var result = send_(METHOD, PATH, options)
  Logger.log(JSON.parse(result.getContentText()))
}

/**
 * APIを叩く 共通処理
 * @param {*} method 
 * @param {*} path 
 * @param {*} methodOptions 
 */
function send_ (method, path, methodOptions) {
  var options = {
    'method': method,
    'headers': { 'X-ChatWorkToken': API_KEY }
  }

  // 追加オプションがあれば入れる
  if ('payload' in methodOptions) {
    options.payload = methodOptions.payload
  }

  // APIKeyの確認
  if (API_KEY == '') {
    throw new Error('API_KEY is not set')
  }

  return UrlFetchApp.fetch(API_URL + path, options)
}

// ----------

/**
 * API Keyをセット
 * @param {*} apiKey 
 */
function setApiKey (apiKey) {
  API_KEY = apiKey
}
