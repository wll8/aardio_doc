;(function () {
  function install(hook, vm) {
    if(typeof $ === 'undefined') {alert('依赖 zepto/jquery'); return}

    function style () {
      $('head').append('\
        <style>\
          iframe {\
            animation-duration: 1.8s;\
            animation-fill-mode: forwards;\
            animation-iteration-count: infinite;\
            animation-name: placeHolderShimmer;\
            animation-timing-function: linear;\
            background: #f6f7f8;\
            background: linear-gradient(to right, #fafafa 8%, #f4f4f4 38%, #fafafa 54%);\
            background-size: 1000px 640px;\
            position: relative;\
          }\
          @keyframes placeHolderShimmer {\
            0% {\
              background-position: -468px 0;\
            }\
          \
            100% {\
              background-position: 468px 0;\
            }\
          }\
          \
          .code_btn_box {\
            overflow: hidden;\
            display: none;\
            position: absolute;\
            right: 0;\
            top: 0;\
            z-index: 9;\
            padding: 0;\
            white-space: normal;\
            user-select:none;\
          }\
          .code_btn_box .btn {\
            display: inline-block;\
            padding: 0 2px;\
            background-color: #fff;\
            white-space: normal;\
            cursor: pointer;\
            color: #aaa;\
          }\
          .code_btn_box .btn:not(:first-child) {\
            margin-left: 2px;\
          }\
          .code_btn_box .btn.run {\
            display: none;\
          }\
          .code_btn_box .btn.run.show {\
            display: inline-block;\
          }\
          .code_btn_box .btn:hover {\
            background-color: #ddd;\
            color: #333;\
          }\
          pre {\
            position: relative;\
          }\
          pre:hover .code_btn_box{\
            display: block;\
          }\
        </style>\
      ')
    }
    style()

    function copyToClipboard(text) {
      var textArea = document.createElement('textarea');
      textArea.style.position = 'fixed';
      textArea.style.zIndex = '-9';
      textArea.style.top = '-100%';
      textArea.style.left = '-100%';
      textArea.value = text;
      document.body.appendChild(textArea);
      textArea.select();

      try {
        var successful = document.execCommand('copy');
        var msg = successful ? '成功复制到剪贴板' : '该浏览器不支持点击复制到剪贴板';
        console.log(msg);
      } catch (err) {
        console.log('该浏览器不支持点击复制到剪贴板');
      }

      document.body.removeChild(textArea);

    }

    hook.doneEach(function() {
      function run(type, code, node) {
        var act = {
          js () {
            if (typeof RunKit === 'undefined') { eval(code); return }
            if ($(node).find('iframe')[0]) { $(node).find('iframe').remove(); return }

            RunKit.createNotebook({
              'element': node,
              'nodeVersion': '*',
              'source': code,
              'onLoad': function(notebook) {
                var iframe = node.lastElementChild
                iframe.style.cssText = '\
                  height: '+ iframe.style.height +';\
                  width: calc(100% + 200px);\
                  margin: 0px calc(-100px);\
                  border: none;\
                '
                iframe.classList.add('runkit_repl')
                notebook.evaluate()
              }
            })

          },
          javascript () { this.js() },
          htm () { this.html() },
          html () {
            window.open('', '', 'width=800, height=600').document.write(code)
          },
        }
        act[type] ? act[type]() : console.log('没有运行此代码的函数')
      }

      function get_type($node) {
        return $node.attr('class').split('-').reverse()[0]
      }

      $('pre').each( function (index, item) {
        $item = $(item)
        ;(function ($item) {
          var type = get_type($item.find('code'))

          // 要显示 run 按钮的语言类型
          var show_run = [
            'js',
            'javascript',
            'htm',
            'html',
          ]

          // 给代码添加按钮
          $item.append('<div class="code_btn_box"><div class="btn copy">copy</div><div class="btn run">run</div></div>')

          // 给按钮添加事件
          $item.bind('click', function(ev) {
            $target = $(ev.target)
            $this = $(this)
            var code = $this.find('code').text()
            $target.is('.btn.copy') && copyToClipboard(code)
            $target.is('.btn.run') && run(type, code, $this[0])
          })

          // 是否显示运行按钮
          show_run.includes(type) && $item.find('.run').addClass('show')
        })($item)
      })
    })

  }

  if(typeof $docsify !== 'undefined') { // docsify
    $docsify.plugins = [].concat(install, $docsify.plugins)
  } else { // 其他环境
    window.onload = function () { install({ doneEach: function (fn) {fn()} }) }
  }
})();
