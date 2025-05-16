const fs = require("fs");
const path = require("path");

/**
 * express-smart-router
 * @param {import("express").Application} app
 * @param {string} baseDir
 * @param {{
 *   baseRoute?: string;
 *   verbose?: boolean;
 *   match?: RegExp;
 *   middleware?: import("express").RequestHandler[];
 * }} options
 */
function smartRouter(app, baseDir, options = {}) {
  const {
    baseRoute = "",
    verbose = true,
    match = /\.js$/,
    middleware = [],
  } = options;

  function walk(dir, routePrefix = "") {
    const entries = fs.readdirSync(dir);

    entries.forEach((entry) => {
      const fullPath = path.join(dir, entry);
      const stat = fs.statSync(fullPath);

      if (stat.isDirectory()) {
        const newPrefix = path.posix.join(routePrefix, entry);
        walk(fullPath, newPrefix);
      } else if (match.test(entry)) {
        const module = require(fullPath);
        const router =
          typeof module === "function" ? module : module.default || module;

        // ✅ index.js veya index.router.js → routePrefix
        const isIndexFile = entry === "index.js" || entry === "index.router.js";

        let routePath;
        if (isIndexFile) {
          routePath = "/" + routePrefix;
        } else {
          const cleanName = entry.replace(/(\.router)?\.js$/, "");
          routePath = "/" + path.posix.join(routePrefix, cleanName);
        }

        // path temizliği
        routePath =
          path.posix
            .join(baseRoute, routePath)
            .replace(/\/+/g, "/")
            .replace(/\/$/, "") || "/";

        if (Array.isArray(middleware) && middleware.length > 0) {
          app.use(routePath, ...middleware, router);
        } else {
          app.use(routePath, router);
        }

        if (verbose)
          console.log(`✅ Route yüklendi: [${routePath}] → ${fullPath}`);
      }
    });
  }

  walk(baseDir);
}

module.exports = smartRouter;
