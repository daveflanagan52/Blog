const path = require('path');
const fs = require('fs');
const globAll = require('glob-all');
const loaderUtils = require('loader-utils');
const yaml = require('js-yaml');

//https://github.com/jpillora/node-glob-all#usage
function findAll(globs, cwd) {
  const globArray = Array.isArray(globs) ? globs : [globs];
  return globAll.sync(globArray, {cwd, realpath: true});
}

module.exports = function() {
  this.cacheable && this.cacheable();
  const options = loaderUtils.getOptions(this) || {};

  if (!options.include) {
    options.include = ['**/*.json', '**/*.yml', '**/*.yaml'];
  }

  if (!options.overrides) options.overrides = [];
  const appLocalesDir = path.dirname(this.resource);
  // this is the absolute path to the index.js in the top level locales dir
  if (!fs.existsSync(appLocalesDir)) {
    throw new Error(
      'Directory does not exist: ' +
        appLocalesDir +
        ' for resource: ' +
        this.resource
    );
  }
  let appResBundle = {};
  if (options.debug) {
    console.info(
      'Bundling locales from ' +
        appLocalesDir +
        ' (ordered least specific to most):'
    );
  }

  // needs to be ordered in least specialized to most e.g. lib locale -> app locale
  const moduleLocalesDirs = options.overrides.map(override => {
    if (path.isAbsolute(override)) {
      return override;
    } else {
      return path.join(appLocalesDir, override);
    }
  });
  moduleLocalesDirs.push(appLocalesDir);
  moduleLocalesDirs.forEach(localesDir => {
    const langFiles = findAll(options.include, localesDir);
    for (let j = 0; j < langFiles.length; j++) {
      const fullPath = langFiles[j];
      this.addDependency(fullPath);
      if (options.debug) {
        console.info('\t' + fullPath);
      }
      const fileContent = fs.readFileSync(fullPath);
      const extname = path.extname(fullPath);
      const lang = path.basename(fullPath).replace(extname, '');
      let parsedContent;
      if (extname === '.yaml' || extname === '.yml') {
        parsedContent = yaml.safeLoad(fileContent);
      } else {
        parsedContent = JSON.parse(fileContent);
      }
      appResBundle = {...appResBundle, [lang]: parsedContent};
    }
  });
  const bundle = JSON.stringify(appResBundle);
  if (options.debug) {
    console.info('Final locales bundle: \n' + bundle);
  }
  return 'module.exports = ' + bundle;
};
