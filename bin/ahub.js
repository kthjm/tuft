#!/usr/bin/env node
'use strict'

function _interopDefault(ex) {
  return ex && typeof ex === 'object' && 'default' in ex ? ex['default'] : ex
}

var react = _interopDefault(require('react'))
var atra = _interopDefault(require('atra'))
var reactHtmlParser = _interopDefault(require('react-html-parser'))
var htmlTag = _interopDefault(require('html-tag'))
var url = require('url')
var server = require('react-dom/server')
var fsExtra = require('fs-extra')
var browsersync = _interopDefault(require('browser-sync'))
var path = require('path')
var program = _interopDefault(require('commander'))
var figures = require('figures')
var chalk = require('chalk')
var ahub = _interopDefault(require('..'))

function _interopDefault$1(ex) {
  return ex && typeof ex === 'object' && 'default' in ex ? ex['default'] : ex
}

var React__default = _interopDefault$1(react)
var Atra = _interopDefault$1(atra)
var h2r = _interopDefault$1(reactHtmlParser)
var createTag = _interopDefault$1(htmlTag)

const ogPrefix =
  'og: http://ogp.me/ns# fb: http://ogp.me/ns/fb# article: http://ogp.me/ns/article#'

const Ga = ({ id }) => React__default.createElement('script', null)

var Head = ({ title, og, ga, embed }) =>
  React__default.createElement(
    'head',
    { prefix: !og ? undefined : ogPrefix },
    title && React__default.createElement('title', null, title),
    embed,
    ga && React__default.createElement(Ga, { id: ga })
  )

const icon = '</>'

var ToRoot = () =>
  React__default.createElement(
    'div',
    a('FIXED'),
    React__default.createElement('a', a('HREF'), icon)
  )

const a = Atra({
  FIXED: {
    style: {
      position: 'fixed',
      top: 0,
      right: 0
    }
  },
  HREF: {
    href: '/',
    style: {
      color: 'inherit',
      display: 'block',
      fontSize: '3em',
      lineHeight: 1.2,
      fontWeight: 'bold',
      padding: '6px 12px',
      textDecoration: 'none'
    }
  }
})

var Header = ({ image, title, description }) =>
  React__default.createElement(
    'header',
    a$1('HEADER'),
    image &&
      React__default.createElement(
        'div',
        null,
        React__default.createElement(
          'div',
          a$1('IMAGE', { style: { backgroundImage: `url(${image})` } })
        )
      ),
    title && React__default.createElement('h1', null, title),
    description && React__default.createElement('p', null, description)
  )

const a$1 = Atra({
  HEADER: {
    style: {
      padding: '30px 0px',
      textAlign: 'center'
    }
  },
  IMAGE: {
    style: {
      display: 'inline-block',
      width: 110,
      height: 110,
      borderRadius: 3,
      backgroundImage: undefined,
      backgroundSize: 'contain',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat'
    }
  }
})

const Hidden = ({ type, attributes = {} }) =>
  react.createElement(
    type || 'div',
    Object.assign({}, attributes, {
      style: Object.assign({}, attributes.style, {
        visibility: 'hidden'
      })
    }),
    '.'
  )

const arr2nesty = (array, length) =>
  array.reduce(
    (a, c) =>
      (a[a.length - 1].length === length
        ? a.push([c])
        : a[a.length - 1].push(c)) && a,
    [[]]
  )

var _extends =
  Object.assign ||
  function(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i]

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key]
        }
      }
    }

    return target
  }

const LENGTH = 3
const BLOCK_MARGIN = 4

const Links = ({ links }) =>
  React__default.createElement(
    'div',
    { style: { color: '#b7b7b7' } },
    arr2nesty(links, LENGTH).map((rowLinks, rowLinksIndex) =>
      React__default.createElement(
        'div',
        { key: rowLinksIndex, style: { display: 'flex' } },
        rowLinks.map(({ href, image, title, hub }, linkIndex) =>
          React__default.createElement(
            Link,
            _extends(
              { key: linkIndex },
              { width: (1 / LENGTH) * 100 + '%', margin: BLOCK_MARGIN }
            ),
            React__default.createElement(Title, { title }),
            React__default.createElement(HrefImage, { href, image }),
            React__default.createElement(HrefHub, { href: hub })
          )
        ),
        LENGTH - rowLinks.length > 0 &&
          React__default.createElement(Supple, {
            margin: BLOCK_MARGIN,
            flexLength: LENGTH,
            blankLength: LENGTH - rowLinks.length
          })
      )
    )
  )

const Link = (a => ({ width, margin, children }) =>
  React__default.createElement(
    'div',
    a('LINK', {
      style: { width, margin },
      children
    })
  ))(
  Atra({
    LINK: {
      style: {
        borderRadius: 3,
        padding: '5px 20px 10px',
        height: 'auto',
        backgroundColor: '#f7f7f7'
      }
    }
  })
)

const Title = (a => ({ title }) =>
  React__default.createElement(
    'div',
    a('BLOCK'),
    !title
      ? React__default.createElement(Hidden, {
          type: 'span',
          attributes: a('INLINE')
        })
      : React__default.createElement('span', a('INLINE'), title)
  ))(
  Atra({
    BLOCK: {
      style: {
        textAlign: 'center',
        fontSize: '0.85em',
        fontWeight: 100,
        letterSpacing: 1
      }
    },
    INLINE: {
      style: {
        borderBottom: 'solid 1px',
        padding: '0px 4px'
      }
    }
  })
)

const HrefImage = (a => ({ href, image }) =>
  React__default.createElement(
    'a',
    a('HREF', href && { href, target: '_blank' }),
    React__default.createElement(
      'div',
      a('IMAGE', { style: { backgroundImage: `url(${image})` } })
    )
  ))(
  Atra({
    HREF: {
      style: {
        display: 'block',
        maxWidth: 120,
        height: 120,
        margin: '12px auto 10px'
      }
    },
    IMAGE: {
      style: {
        height: '100%',
        backgroundSize: 'contain',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }
    }
  })
)

const HrefHub = (a => ({ href }) =>
  !href
    ? React__default.createElement(Hidden, { type: 'div' })
    : React__default.createElement(
        'div',
        a('WRAP'),
        React__default.createElement('a', a('HREF', { href }), '< hub >')
      ))(
  Atra({
    WRAP: {
      style: {
        textAlign: 'center'
      }
    },
    HREF: {
      style: {
        textDecoration: 'none',
        color: 'inherit',
        fontWeight: 'bold'
      }
    }
  })
)

const Supple = ({ margin, flexLength, blankLength }) =>
  React__default.createElement('div', {
    style: {
      width: `${(1 / flexLength) * 100 * blankLength}%`,
      padding: `20px ${20 * blankLength}px`,
      margin: `0px ${margin * blankLength}px ${margin}px ${margin *
        blankLength}px`
    }
  })

const Body = ({ pathname, background, color, header = {}, links = [] }) =>
  React__default.createElement(
    'body',
    a$2('BODY', { style: { background, color } }),
    pathname !== '/' && React__default.createElement(ToRoot, null),
    React__default.createElement(
      'main',
      a$2('WIDTH'),
      React__default.createElement(Header, header),
      React__default.createElement(Links, { links })
    )
  )

const a$2 = Atra({
  BODY: {
    style: {
      margin: 0,
      fontFamily:
        'Cousine,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Oxygen,Ubuntu,Cantarell,Fira Sans,Droid Sans,Helvetica Neue,sans-serif',
      letterSpacing: 0.44,
      lineHeight: 1.76,
      height: 'auto'
    }
  },
  WIDTH: {
    style: {
      maxWidth: 870,
      padding: '0px 40px',
      margin: '0px auto 80px'
    }
  },
  LINKS: {
    style: {}
  }
})

const Html = ({ pathname, lang, head, body }) =>
  React__default.createElement(
    'html',
    { lang: !lang ? undefined : lang },
    React__default.createElement(Head, head),
    React__default.createElement(Body, _extends({}, body, { pathname }))
  )

const normalizeProps = ({
  inherit,
  lang,
  head,
  body,
  pathname,
  indexJson = {},
  faviconsHtml = ''
}) => ({
  pathname,
  lang: !inherit ? lang : lang || indexJson.lang,
  head: normalizeHead(inherit, indexJson.head, head, faviconsHtml),
  body: normalizeBody(inherit, indexJson.body, body)
})

const normalizeHead = (
  inherit,
  indexHead = {},
  { title, og, ga, tags } = {},
  faviconsHtml
) =>
  !inherit
    ? {
        title,
        og,
        ga,
        embed: h2r(tags2markup(tags) + faviconsHtml)
      }
    : {
        title: title || indexHead.title,
        og: og || indexHead.og,
        ga: ga || indexHead.ga,
        embed: h2r(
          (tags2markup(tags) || tags2markup(indexHead.tags)) + faviconsHtml
        )
      }

const normalizeBody = (
  inherit,
  { background: indexBackground, color: indexColor } = {},
  { background, color, header, links } = {}
) =>
  !inherit
    ? {
        background,
        color,
        header,
        links
      }
    : {
        background: background || indexBackground,
        color: color || indexColor,
        header,
        links
      }

const tags2markup = tags =>
  !Array.isArray(tags)
    ? ''
    : tags
        .filter(Array.isArray)
        .map(arg => createTag(...arg))
        .join('')

const Ahub = (props = {}) =>
  React__default.createElement(Html, normalizeProps(props))

var component = Ahub

const throws = err => {
  throw typeof err === 'string' ? new Error(err) : err
}

const createConfig = (src, dest = '') => ({
  src,
  dest,
  sitemap: {
    hostname: 'https://foo.com'
  },
  favicons: {
    appName: '',
    appDescription: ''
  },
  watch: {},
  ignored: []
})

const createPage = (isIndex, embed) =>
  !isIndex
    ? {
        inherit: true,
        body: bodyUnique(embed)
      }
    : {
        lang: '',
        inherit: false,
        head: {
          title: '',
          og: false,
          ga: '',
          tags: []
        },
        body: Object.assign(
          { background: 'silver', color: '#ffffff' },
          bodyUnique(embed)
        )
      }

const bodyUnique = ({ title, hub1, hub2 } = {}) => ({
  header: {
    image:
      'https://imgplaceholder.com/150x150/f3f3f3/c0c0c0/glyphicon-picture?font-size=90',
    title: title || '{ title }',
    description: '{ description }'
  },
  links: !hub1
    ? [link()]
    : [
        link({ title: 'title' }),
        link({ hub: hub1 }),
        link({ title: 'title', hub: hub2 || hub1 })
      ]
})

const link = ({ title = '', hub = '' } = {}) => ({
  title: title,
  href: 'https://github.com/',
  image: 'https://image.flaticon.com/icons/svg/25/25231.svg',
  hub: hub && url.resolve('/', hub)
})

/*

{
  inherit: boolean,
  lang: '',
  head: {
    title: '',
    og: boolean,
    ga: '',
    tags: [
      ['tag', attribs, 'text']
    ]
  },
  body: {
    background: '',
    color: '',
    header: {
      image: '',
      title: '',
      description: ''
    },
    links: [
      {
        title: '',
        href: '',
        image: '',
        hub: ''
      }
    ]
  }
}

*/

const SRC = '.'
const DEST = '_site'
const CONFIG = '_config.json'

var _extends$1 =
  Object.assign ||
  function(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i]

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key]
        }
      }
    }

    return target
  }

/*  */

const createTemplate = (Html, indexJsonPath) => (
  props,
  pathname,
  faviconsHtml
) =>
  fsExtra
    .readJson(indexJsonPath)
    .then(indexJson =>
      server.renderToStaticMarkup(
        react.createElement(
          Html,
          _extends$1({}, props, { pathname, indexJson, faviconsHtml })
        )
      )
    )

const getConfig = configPath =>
  typeof configPath === 'string'
    ? fsExtra.readJson(configPath)
    : fsExtra
        .readJson(CONFIG)
        .catch(() =>
          fsExtra
            .readJson('package.json')
            .then(userPackageJson => userPackageJson.ahub || {})
        )

const normalizeConfig = ({ src, dest, Html, configPath, isWatch, isProduct }) =>
  Promise.resolve()
    .then(() => getConfig(configPath))
    .then(config => ({
      src: src || config.src || SRC,
      dest: dest || config.dest || DEST,
      sitemap: isProduct ? config.sitemap : undefined,
      favicons: isProduct ? config.favicons || true : undefined,
      watch: isWatch ? config.watch || true : undefined,
      ignored: config.ignored,
      template: undefined
    }))
    .then(config => {
      const indexJsonPath = path.join(config.src, 'index.json')
      return fsExtra
        .pathExists(indexJsonPath)
        .then(
          isExist =>
            !isExist
              ? throws(`[src]/index.json is required`)
              : Object.assign(config, {
                  template: createTemplate(Html, indexJsonPath)
                })
        )
    })

const build = (ahub$$1, verbose, options) =>
  normalizeConfig(options).then(
    ({ src, dest, sitemap, template, watch, favicons, ignored }) =>
      fsExtra
        .remove(dest)
        .then(() =>
          ahub$$1(src, dest, template, {
            sitemap,
            watch,
            favicons,
            ignored,
            verbose
          })
        )
  )

const serve = (ahub$$1, verbose, options) =>
  normalizeConfig(options).then(
    ({ src, dest, sitemap, template, watch, favicons, ignored }) =>
      fsExtra
        .remove(dest)
        .then(() =>
          ahub$$1(src, dest, template, {
            sitemap,
            watch,
            favicons,
            ignored,
            verbose
          })
        )
        .then(watcher =>
          browsersync
            .create()
            .init({ server: dest, watch: true, notify: false })
        )
  )

const create = (path$$1, isIndex) => {
  path$$1 = path.extname(path$$1) !== '.json' ? `${path$$1}.json` : path$$1
  return fsExtra.outputFile(
    path.normalize(path$$1),
    jtringify(createPage(isIndex, { title: filename(path$$1) }))
  )
}

const init = (src, dest) =>
  Promise.all(
    [
      [CONFIG, jtringify(createConfig(src, dest))],
      [
        path.join(src, 'index.json'),
        jtringify(
          createPage(true, {
            title: 'index.json',
            hub1: 'page1',
            hub2: 'page2'
          })
        )
      ],
      [
        path.join(src, 'page1.json'),
        jtringify(createPage(false, { title: 'page1.json', hub1: 'page2' }))
      ],
      [
        path.join(src, 'page2.json'),
        jtringify(createPage(false, { title: 'page2.json', hub1: 'page1' }))
      ]
    ].map(arg => fsExtra.outputFile(...arg))
  )

const jtringify = obj => JSON.stringify(obj, null, '\t')

const filename = path$$1 => {
  const splited = path.normalize(path$$1).split(path.sep)
  return splited[splited.length - 1]
}

const FAIL_PRE = chalk.red(figures.cross)

const errorHandler = err => {
  console.error(FAIL_PRE, err)
  process.exit(1)
}

program
  .on('--help', () =>
    console.log(`

  https://github.com/kthjm/ahub/blob/master/README.md

`)
  )
  .version(require('../package.json').version, '-v, --version')

program
  .command('init <src> [dest]')
  .usage(`<src> [dest]`)
  .on('--help', () => console.log(``))
  .action((src, dest) => init(src, dest).catch(errorHandler))

program
  .command('create <page...>')
  .usage(`<page...> [options]`)
  .option('-i, --index', '')
  .on('--help', () => console.log(``))
  .action((paths, { index: isIndex }) =>
    Promise.all(
      paths
        .map(page => (page.includes(',') ? page.split(',') : [page]))
        .reduce((a, c) => a.concat(c), [])
        .map(page => create(page, isIndex))
    ).catch(errorHandler)
  )

program
  .command('serve [src] [dest]')
  .usage(`[src: '${SRC}'] [dest: '${DEST}'] [options]`)
  .option(
    `-c, --config <jsonfile>`,
    `default: '${CONFIG}' || packagejson['ahub']`
  )
  .option('-q, --quiet', 'without log')
  .on('--help', () => console.log(``))
  .action((src, dest, { config, quiet }) =>
    serve(ahub, !quiet, {
      src,
      dest,
      Html: component,
      configPath: config,
      isWatch: true
    }).catch(errorHandler)
  )

program
  .command('build [src] [dest]')
  .usage(`[src: '${SRC}'] [dest: '${DEST}'] [options]`)
  .option(
    `-c, --config <jsonfile>`,
    `default: '${CONFIG}' || packagejson['ahub']`
  )
  .option('-q, --quiet', 'without log')
  .on('--help', () => console.log(``))
  .action((src, dest, { config, quiet }) =>
    build(ahub, !quiet, {
      src,
      dest,
      Html: component,
      configPath: config,
      isProduct: true
    }).catch(errorHandler)
  )

program.parse(process.argv)

program.args.length === 0 && program.help()
