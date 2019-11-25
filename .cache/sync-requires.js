const { hot } = require("react-hot-loader/root")

// prefer default export if available
const preferDefault = m => m && m.default || m


exports.components = {
  "component---src-templates-project-js": hot(preferDefault(require("/Users/graphicdesign/Sites/apps/jd_design-2019/frontend/src/templates/project.js"))),
  "component---src-pages-404-js": hot(preferDefault(require("/Users/graphicdesign/Sites/apps/jd_design-2019/frontend/src/pages/404.js"))),
  "component---src-pages-index-js": hot(preferDefault(require("/Users/graphicdesign/Sites/apps/jd_design-2019/frontend/src/pages/index.js"))),
  "component---src-pages-page-2-js": hot(preferDefault(require("/Users/graphicdesign/Sites/apps/jd_design-2019/frontend/src/pages/page-2.js")))
}

