var fs = require('fs'),
	path = require('path'),
	assign = require('object-assign'),
	loaderUtils = require('loader-utils'),
    isPathAbsolute = require('path-is-absolute');

module.exports = function(content) {
	var that = this,
		fileParts = path.win32.parse(that.resource),
		ext = ['.ts'].indexOf(fileParts.ext) >= 0 ? '.js' : fileParts.ext,
		outputPath = that.options.output.path || that.context;

	this.cacheable && this.cacheable();
	var config = loaderUtils.getLoaderConfig(that, 'scatterLoader');

	if (!isPathAbsolute.win32(config.outputPath || outputPath)) {
		throw new Error('Scatter Loader: outputPath should be absolute', 30, 'scatter-loader.js');
	}

    fs[config.async ? 'writeFile' : 'writeFileSync'](path.join(config.outputPath || outputPath, fileParts.name + (config.ext || ext)), content, config.encoding || 'utf8', function(err) {
		if (err) throw err;
	});

	return content;
}
