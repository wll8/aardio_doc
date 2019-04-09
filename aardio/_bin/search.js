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
            var find_str = new RegExp(query,'i');
            if(find_str.test(result)) {
              var res = result.match(find_str)
              var nearby = ''
              if(res.index > 9) {
                nearby = result.slice(res.index - 9, res.index + res[0].length + 10)
              } else {
                nearby = result.slice(0, res.index + res[0].length + 10)
              }
              nearby = nearby.replace(/\n/g, '↵')
              query_res.push({
                content: nearby.replace(res[0], ("<em class=\"search-keyword\">" + res[0] + "</em>")),
                title: decodeURI(path),
                url: '#' + path,
              })
            }
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
        html += "<div class=\"matching-post\">\n<a href=\"" + (post.url) + "\">\n<h2>" + (post.title) + "</h2>\n<p>" + (post.content) + "</p>\n</a>\n</div>";
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
      Docsify.dom.on(
        $search,
        'click',
        function (e) { return e.target.tagName !== 'A' && e.stopPropagation(); }
      );
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
      var code = "\n.sidebar {\n  padding-top: 0;\n}\n\n.search {\n  margin-bottom: 20px;\n  padding: 6px;\n  border-bottom: 1px solid #eee;\n}\n\n.search .input-wrap {\n  display: flex;\n  align-items: center;\n}\n\n.search .results-panel {\n  display: none;\n}\n\n.search .results-panel.show {\n  display: block;\n}\n\n.search input {\n  outline: none;\n  border: none;\n  width: 100%;\n  padding: 0 7px;\n  line-height: 36px;\n  font-size: 14px;\n}\n\n.search input::-webkit-search-decoration,\n.search input::-webkit-search-cancel-button,\n.search input {\n  -webkit-appearance: none;\n  -moz-appearance: none;\n  appearance: none;\n}\n.search .clear-button {\n  width: 36px;\n  text-align: right;\n  display: none;\n}\n\n.search .clear-button.show {\n  display: block;\n}\n\n.search .clear-button svg {\n  transform: scale(.5);\n}\n\n.search h2 {\n  font-size: 17px;\n  margin: 10px 0;\n}\n\n.search a {\n  text-decoration: none;\n  color: inherit;\n}\n\n.search .matching-post {\n  border-bottom: 1px solid #eee;\n}\n\n.search .matching-post:last-child {\n  border-bottom: 0;\n}\n\n.search p {\n  font-size: 14px;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  display: -webkit-box;\n  -webkit-line-clamp: 2;\n  -webkit-box-orient: vertical;\n}\n\n.search p.empty {\n  text-align: center;\n}\n\n.app-name.hide, .sidebar-nav.hide {\n  display: none;\n}";

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
