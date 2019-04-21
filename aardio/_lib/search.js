;(function () {

  var install = function (hook, vm) {
    vm = vm
    window.$vm = vm

    var load_file = function () {
      var paths = getAllPaths(vm.router)
      paths.push('/')
      paths.forEach(function (path, index) {
        Docsify
          .get(vm.router.getFile(path), false)
          .then(function (result) {});
      });
    }

    function getAllPaths(router) {
      var paths = [];

      Docsify.dom.findAll('.sidebar-nav a:not(.section-link):not([data-nosearch])').forEach(function (node) {
        var href = node.href;
        var originHref = node.getAttribute('href');
        var path = router.parse(href).path;

        if (
          path &&
          paths.indexOf(path) === -1 &&
          !Docsify.util.isAbsolutePath(originHref)
        ) {
          paths.push(path);
        }
      });

      return paths
    }

    function search(query) {
      var query_res = []
      var paths = getAllPaths(vm.router)
      paths.push('/')
      paths.forEach(function (path, index) {
        Docsify
          .get(vm.router.getFile(path), false)
          .then(function (result) {

            let list = []
            let re = /[\r\n](#{1,6}.*)[\r\n]/
            let find = (str) => {
              let res = str.match(re)
              if(res) {
                list.push(res)
                str = str.slice(res.index + 1)
                find(str)
              } else {
                let one_title = str.match(/^\s*#(.*)/)
                one_title && list.unshift(one_title)
              }
            }

            find(result)

            var find_str = new RegExp(query,'i');
            list.forEach(item => {
              // 在 md 文件中能找到所查询的内容
              let result = item.input.slice(item.index)
              var res = result.match(find_str)
              if(!res) {return}
              var nearby = ''
              var find_ref = res[0]
              var find_title = item[1]
              var title_id_match = ($(marked(find_title)).find('a').attr('href') || '').match(/\?id=(.*)$/)
              // var title_id = title_id_match && title_id_match[1] || ''
              var title_id = title_id_match && title_id_match[1] || ''
              if(res.index > 9) { // 所查找的内容在文件中的下标
                // 截取查找到的内容的前9后字符到后10个字符
                nearby = result.slice(res.index - 9, res.index + find_ref.length + 10)
              } else {
                nearby = result.slice(0, res.index + find_ref.length + 10)
              }
              nearby = nearby.replace(/\n/g, '↵')
              query_res.push({
                find_ref,
                content: nearby.replace(find_str, `<em class=\"search-keyword\">${find_ref}</em>`), // 添加关键字高亮标记
                title: `<span class="title">${find_title.replace(/^#{1,6}/, '')}</span> <span data-title_id="${title_id}" class="file">=> ${decodeURI(path).split('/').pop()}</span>`,
                url: `#${path}`,
              })
            })
          });
      });

      return query_res
    }

    function doSearch(value) {
      var $search = Docsify.dom.find('div.search');
      var $panel = Docsify.dom.find($search, '.results-panel');
      var $clearBtn = Docsify.dom.find($search, '.clear-button');
      var $sidebarNav = Docsify.dom.find('.sidebar-nav');
      var $appName = Docsify.dom.find('.app-name');

      if (!value) {
        $panel.classList.remove('show');
        $clearBtn.classList.remove('show');
        $panel.innerHTML = '';

        if (options.hideOtherSidebarContent) {
          $sidebarNav.classList.remove('hide');
          $appName.classList.remove('hide');
        }
        return
      }
      var matchs = search(value);

      var html = '';
      matchs.forEach(function (post) {
        html += "<div class=\"matching-post\">\n<div data-href=\"" + (post.url) + "\">\n<h2>" + (post.title) + "</h2>\n<p>" + (post.content) + "</p>\n</div>\n</div>";
      });

      $panel.classList.add('show');
      $clearBtn.classList.add('show');
      $panel.innerHTML = html || ("<p class=\"empty\">" + options.noData + "</p>");
      if (options.hideOtherSidebarContent) {
        $sidebarNav.classList.add('hide');
        $appName.classList.add('hide');
      }
    }

    function bindEvents() {
      var $search = Docsify.dom.find('div.search');
      var $input = Docsify.dom.find($search, 'input');
      var $inputWrap = Docsify.dom.find($search, '.input-wrap');

      var timeId;
      // Prevent to Fold sidebar
      $(document).on('click', '.search .matching-post', function(ev) {
        let title = $(ev.currentTarget).find('.title').text().trim()
        let link = $(ev.currentTarget).find('[data-href]').data('href')
        let title_id = $(ev.currentTarget).find('[data-title_id]').data('title_id')
        link = `${link}?id=${title}`
        console.log('event', {
          link,
          title,
          title_id,
        })
        location = link
      })
      // Docsify.dom.on(
      //   $search,
      //   'click',
      //   function (e) { return e.target.tagName !== 'A' && e.stopPropagation(); }
      // );
      Docsify.dom.on($input, 'input', function (e) {
        clearTimeout(timeId);
        timeId = setTimeout(function (_) { return doSearch(e.target.value); }, 100);
      });
      Docsify.dom.on($input, 'focus', function (e) {
        load_file()
      });
      Docsify.dom.on($inputWrap, 'click', function (e) {
        // Click input outside
        if (e.target.tagName !== 'INPUT') {
          $input.value = '';
          doSearch();
        }
      });
    }

    function tpl(defaultValue) {
      if ( defaultValue === void 0 ) defaultValue = '';

      var html =
        "<div class=\"input-wrap\">\n      <input placeholder=\"" + options.placeholder + "\" type=\"search\" value=\"" + defaultValue + "\" />\n      <div class=\"clear-button\">\n        <svg width=\"26\" height=\"24\">\n          <circle cx=\"12\" cy=\"12\" r=\"11\" fill=\"#ccc\" />\n          <path stroke=\"white\" stroke-width=\"2\" d=\"M8.25,8.25,15.75,15.75\" />\n          <path stroke=\"white\" stroke-width=\"2\"d=\"M8.25,15.75,15.75,8.25\" />\n        </svg>\n      </div>\n    </div>\n    <div class=\"results-panel\"></div>\n    </div>";
      var el = Docsify.dom.create('div', html);
      var aside = Docsify.dom.find('aside');

      Docsify.dom.toggleClass(el, 'search');
      Docsify.dom.before(aside, el);
    }

    function style() {
      var code = `
        .sidebar {
          padding-top: 0;
        }

        .search {
          margin-bottom: 20px;
          padding: 6px;
          border-bottom: 1px solid #eee;
        }

        .search .file{
          font-size: 12px;
          color: #666;
        }

        .search .input-wrap {
          display: flex;
          align-items: center;
        }

        .search .results-panel {
          display: none;
        }

        .search .results-panel.show {
          display: block;
        }

        .search input {
          outline: none;
          border: none;
          width: 100%;
          padding: 0 7px;
          line-height: 36px;
          font-size: 14px;
        }

        .search input,
        .search input::-webkit-search-cancel-button,
        .search input::-webkit-search-decoration {
          -webkit-appearance: none;
          -moz-appearance: none;
          appearance: none;
        }

        .search .clear-button {
          width: 36px;
          text-align: right;
          display: none;
        }

        .search .clear-button.show {
          display: block;
        }

        .search .clear-button svg {
          transform: scale(.5);
        }

        .search h2 {
          font-size: 17px;
          margin: 10px 0;
        }

        .search a {
          text-decoration: none;
          color: inherit;
        }

        .search .matching-post {
          border-bottom: 1px solid #eee;
          cursor: pointer;
        }

        .search .matching-post:last-child {
          border-bottom: 0;
        }

        .search p {
          font-size: 14px;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
        }

        .search p.empty {
          text-align: center;
        }

        .app-name.hide,
        .sidebar-nav.hide {
          display: none;
        }

      `;

      Docsify.dom.style(code);
    }

    function init() {
      var keywords = vm.router.parse().query.s;

      style();
      tpl(keywords);
      bindEvents();
      keywords && setTimeout(function (_) { return doSearch(keywords); }, 500);
    }
    var CONFIG = {
      placeholder: 'Type to search',
      noData: 'No Results!',
      hideOtherSidebarContent: false
    };

    var options = {};

    hook.mounted(function (_) {
      options = vm.config.search || CONFIG
      init();
    });
    hook.doneEach(function (_) {
      load_file()
    });
  }

  $docsify.plugins = [].concat(install, $docsify.plugins);

})();
