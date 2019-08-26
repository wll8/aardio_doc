; (function () {
  function install(hook, vm) {
    if (typeof $ === 'undefined') { alert('依赖 zepto/jquery'); return }

    var STATE_DEFAULT = 0;
    var STATE_STRING = 1;
    var STATE_CHARACTER = 2;
    var STATE_KEYWORD = 3;
    var STATE_COMMENTBLOCK = 4;
    var STATE_COMMENTLINE = 5;

    var keywordList = [
      'begin',
      'end',
      'false',
      'true',
      'if',
      'else',
      'elseif',
      'class',
      'function',
      'return',
      'while',
      'do',
      'namespace',
      'select',
      'case',
      'catch',
      'try',
      'for',
      'in',
      'this',
      'global',
      'self',
      'owner',
      'var',
      'def',
      'null',
      'and',
      'not',
      'or',
      'break',
      'continue',
      'import',
      'with',
      'ctor',
      'try',
      'catch',
      'eval',
      'import', 'type',
      'assert',
      'assertf',
      'error',
      'rget',
      'loadcode',
      'dumpcode',
      'collectgarbage',
      'call',
      'tostring',
      'topointer',
      'tonumber',
      'sleep',
      'execute',
      'setlocale',
      'setprivilege',
      'null'
    ];

    function attachEvent(obj, event, handler) {
      if (obj.attachEvent) {
        return obj.attachEvent('on' + event, handler);
      } else if (obj.addEventListener) {
        return obj.addEventListener(event, handler, false);
      }
      return false;
    }


    function styleContent(str, length, initState) {
      this.str = str;
      this.result = [];
      this.currentPos = -1;
      this.length = length;
      this.coloredLength = 0;
      this.ch = 0;
      this.state = initState || STATE_DEFAULT;
      this.read();
    }

    styleContent.prototype = {
      more: function () {
        return this.currentPos < this.length;
      },

      read: function () {
        if (this.more()) {
          this.currentPos++;
          this.lastCh = this.ch;
          this.ch = this.str.substr(this.currentPos, 1);
        } else {
          return false;
        }
      },

      readBack: function () {
        if (this.currentPos > 0) {
          this.currentPos -= 2;
          this.read();
        } else {
          return false;
        }
      },

      colorTo: function (posEnd, state) {
        this.state = state;
        var text = this.str.substring(this.coloredLength, posEnd + 1);
        // text = text.split('\t').join('&nbsp;&nbsp;&nbsp;&nbsp;').split(' ').join('&nbsp;');
        // text = text.split('<').join('&lt;').split('>').join('&gt;');
        // text = text.split('\r\n').join('<br />').split('\n').join('<br />').split('\r').join('<br />');
        this.result.push({
          text: text,
          state: state
        });
        this.coloredLength = posEnd + 1;
      },

      writeResult: function () {
        var node = document.createElement('div');
        for (var k in this.result) {
          var className;
          switch (this.result[k].state) {
            case STATE_STRING:
              className = 'aau_string';
              break;
            case STATE_CHARACTER:
              className = 'aau_character';
              break;
            case STATE_KEYWORD:
              className = 'aau_keyword';
              break;
            case STATE_COMMENTBLOCK:
              className = 'aau_commentblock';
              break;
            case STATE_COMMENTLINE:
              className = 'aau_commentline';
              break;
            default:
              className = 'aau_default';
          }
          var span = document.createElement('span');
          span.className = className;
          span.innerHTML = this.result[k].text;
          node.appendChild(span);
        }
        return node.innerHTML;
      }
    }

    function inArray(arr, ele) {
      for (var k in arr) {
        if (arr[k] == ele) {
          return k;
        }
      }
      return -1;
    }

    function highlightCode(code) {
      // 从源代码中拆分出关键字等信息
      var sc = new styleContent(code, code.length);
      for (; sc.more(); sc.read()) {
        switch (sc.state) {
          case STATE_DEFAULT:
            if (sc.ch == '"') {
              sc.colorTo(sc.currentPos - 1, STATE_DEFAULT);
              sc.state = STATE_STRING;
            } else if (sc.ch == "'") {
              sc.colorTo(sc.currentPos - 1, STATE_DEFAULT);
              sc.state = STATE_CHARACTER;
            } else if (/[a-zA-Z_]/im.test(sc.ch) && (!sc.lastCh || /[\s;\(\)\{\},]/im.test(sc.lastCh))) {
              sc.colorTo(sc.currentPos - 1, STATE_DEFAULT);
              var word = '';
              while (/[a-zA-Z0-9_]/im.test(sc.ch)) {
                word += sc.ch;
                if (sc.more()) {
                  sc.read();
                } else {
                  break;
                }
              }
              if (/[\s;\(\)\{\},]/im.test(sc.ch) && inArray(keywordList, word) != -1) {
                sc.colorTo(sc.currentPos - 1, STATE_KEYWORD);
                sc.state = STATE_DEFAULT;
              }
              sc.readBack();
            } else if (sc.ch == '*' && sc.lastCh == '/') {
              sc.colorTo(sc.currentPos - 2, STATE_DEFAULT);
              sc.state = STATE_COMMENTBLOCK;
              sc.asteriskCount = 0;
              while (sc.ch == '*' && sc.more()) {
                sc.asteriskCount++;
                sc.read();
              }
              sc.readBack();
              sc.asteriskInputed = 0;
            } else if (sc.ch == '/' && sc.lastCh == '/') {
              sc.colorTo(sc.currentPos - 2, STATE_DEFAULT);
              sc.state = STATE_COMMENTLINE;
            }
            break;
          case STATE_STRING:
            if (sc.ch == '"') {
              sc.colorTo(sc.currentPos, STATE_STRING);
              sc.state = STATE_DEFAULT;
            }
            break;
          case STATE_CHARACTER:
            if (sc.ch == "'" && sc.lastCh != '\\') {
              sc.colorTo(sc.currentPos, STATE_CHARACTER);
              sc.state = STATE_DEFAULT;
            }
            break;
          case STATE_COMMENTBLOCK:
            if (sc.ch == '*') {
              sc.asteriskInputed++;
            } else if (sc.ch == '/') {
              if (sc.asteriskInputed == sc.asteriskCount) {
                sc.colorTo(sc.currentPos, STATE_COMMENTBLOCK);
                sc.state = STATE_DEFAULT;
              }
            } else {
              sc.asteriskInputed = 0;
            }
            break;
          case STATE_COMMENTLINE:
            if (sc.ch == '\n') {
              sc.colorTo(sc.currentPos, STATE_COMMENTLINE);
              sc.state = STATE_DEFAULT;
            }
            break;
        }
      }
      sc.colorTo(sc.length - 1, sc.state);

      return sc.writeResult();
    }

    function style() {
      // 配置代码的样式
      $('head').append('\
        <style type="text/css">\
          /* 字符串样式 */\
          .lang-aau .aau_string,\
          .lang-aau .aau_character {\
            color: #800;\
          }\
          /* 关键字样式 */\
          .lang-aau .aau_keyword {\
            color: #008;\
          }\
          /* 段注释、行注释样式 */\
          .lang-aau .aau_commentblock,\
          .lang-aau .aau_commentline {\
            color: #080;\
          }\
        </style>\
      ')
    }
    style()

    hook.doneEach(function () {
      $('code.lang-aau').each(function (index, item) {
        $(item).html(highlightCode(item.innerHTML))
      })
    })

  }

  if (typeof $docsify !== 'undefined') { // docsify
    $docsify.plugins = [].concat(install, $docsify.plugins)
  } else { // 其他环境
    window.onload = function () { install({ doneEach: function (fn) { fn() } }) }
  }
})();
