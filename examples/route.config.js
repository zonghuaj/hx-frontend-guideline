import navConfig from './nav.config';
import navCordovaConfig from './nav.cordova.config';
import langs from './i18n/route';

const LOAD_MAP = {
  'zh-CN': name => {
    return r => require.ensure([], () =>
      r(require(`./pages/zh-CN/${name}.vue`)),
    'zh-CN');
  }
};

const load = function(lang, path) {
  return LOAD_MAP[lang](path);
};

const LOAD_DOCS_MAP = {
  'zh-CN': path => {
    return r => require.ensure([], () =>
      r(require(`./docs/zh-CN${path}.md`)),
    'zh-CN');
  }
};

/** stardard start */
const loadDocs = function(lang, path) {
  return LOAD_DOCS_MAP[lang](path);
};

const registerRoute = (navConfig) => {
  let route = [];
  Object.keys(navConfig).forEach((lang, index) => {
    let navs = navConfig[lang];
    route.push({
      path: `/${ lang }/component`,
      redirect: `/${ lang }/component/installation`,
      component: load(lang, 'component'),
      children: []
    });
    navs.forEach(nav => {
      if (nav.href) return;
      if (nav.groups) {
        nav.groups.forEach(group => {
          group.list.forEach(nav => {
            addRoute(nav, lang, index);
          });
        });
      } else if (nav.children) {
        nav.children.forEach(nav => {
          addRoute(nav, lang, index);
        });
      } else {
        addRoute(nav, lang, index);
      }
    });
  });
  function addRoute(page, lang, index) {
    const component = page.path === '/changelog'
      ? load(lang, 'changelog')
      : loadDocs(lang, page.path);
    let child = {
      path: page.path.slice(1),
      meta: {
        title: page.title || page.name,
        description: page.description,
        lang
      },
      name: 'component-' + lang + (page.title || page.name),
      component: component.default || component
    };

    route[index].children.push(child);
  }

  return route;
};

let route = registerRoute(navConfig);
/** stardard end */

/** cordova start */
const registerCordovaRoute = (navCordovaConfig) => {
  let route = [];
  Object.keys(navCordovaConfig).forEach((lang, index) => {
    let navs = navCordovaConfig[lang];
    route.push({
      path: `/${ lang }/cordova`,
      redirect: `/${ lang }/cordova/jdkinstallation`,
      component: load(lang, 'cordova'),
      children: []
    });
    navs.forEach(nav => {
      if (nav.href) return;
      if (nav.groups) {
        nav.groups.forEach(group => {
          group.list.forEach(nav => {
            addRoute(nav, lang, index);
          });
        });
      } else if (nav.children) {
        nav.children.forEach(nav => {
          addRoute(nav, lang, index);
        });
      } else {
        addRoute(nav, lang, index);
      }
    });
  });
  function addRoute(page, lang, index) {
    const component = page.path === '/changelog'
      ? load(lang, 'changelog')
      : loadDocs(lang, page.path);
    let child = {
      path: page.path.slice(1),
      meta: {
        title: page.title || page.name,
        description: page.description,
        lang
      },
      name: 'component-' + lang + (page.title || page.name),
      component: component.default || component
    };

    route[index].children.push(child);
  }

  return route;
};

route = route.concat(registerCordovaRoute(navCordovaConfig));
/** cordova end */

const generateMiscRoutes = function(lang) {
  let guideRoute = {
    path: `/${ lang }/guide`, // 指南
    redirect: `/${ lang }/guide/design`,
    component: load(lang, 'guide'),
    children: [{
      path: 'design', // 设计原则
      name: 'guide-design' + lang,
      meta: { lang },
      component: load(lang, 'design')
    }, {
      path: 'nav', // 导航
      name: 'guide-nav' + lang,
      meta: { lang },
      component: load(lang, 'nav')
    }, {
      path: 'wechat-android-debug', // 安卓调试(微信)
      name: 'wechat-android-debug' + lang,
      meta: { lang },
      component: load(lang, 'wechat-android-debug')
    }, {
      path: 'wechat-ios-debug', // 苹果调试(微信)
      name: 'wechat-ios-debug' + lang,
      meta: { lang },
      component: load(lang, 'wechat-ios-debug')
    }]
  };

  return [guideRoute];
};

langs.forEach(lang => {
  route = route.concat(generateMiscRoutes(lang.lang));
});

route.push({
  path: '/play',
  name: 'play',
  component: require('./play/index.vue')
});

let userLanguage = localStorage.getItem('ELEMENT_LANGUAGE') || window.navigator.language || 'en-US';
let defaultPath = '/en-US';
if (userLanguage.indexOf('zh-') !== -1) {
  defaultPath = '/zh-CN/component/installation';
} else if (userLanguage.indexOf('es') !== -1) {
  defaultPath = '/es';
} else if (userLanguage.indexOf('fr') !== -1) {
  defaultPath = '/fr-FR';
}

route = route.concat([{
  path: '/',
  redirect: defaultPath
}, {
  path: '*',
  redirect: defaultPath
}]);

export default route;
