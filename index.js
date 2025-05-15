const fs = require("fs");
const path = require("path");

/**
 * Auto-load Express route files recursively
 *
 * @param {Express.Application} app - Express app instance
 * @param {string} routesDir - Absolute path to the routes folder
 * @param {object} options
 * @param {RegExp} [options.match] - Regex to match filenames (e.g. /\.router\.js$/)
 */
function loadRoutes(app, routesDir, options = {}) {
  const { match = /\.js$/ } = options; // Varsayılan: tüm .js dosyaları

  function walk(dir, routePrefix = "") {
    const entries = fs.readdirSync(dir);

    entries.forEach((entry) => {
      const fullPath = path.join(dir, entry);
      const stat = fs.statSync(fullPath);

      if (stat.isDirectory()) {
        walk(fullPath, path.join(routePrefix, entry));
      } else if (match.test(entry)) {
        const router = require(fullPath);
        const routeName = path.basename(entry, ".js");

        let routePath = path
          .join(routePrefix, routeName)
          .replace(/\\/g, "/")
          .replace(/\/index$/i, "/") // index.js → kök
          .replace(/\/+/g, "/");

        app.use(routePath, router);
        console.log(`✅ Loaded route: ${routePath}`);
      }
    });
  }

  walk(routesDir);
}

module.exports = loadRoutes;
