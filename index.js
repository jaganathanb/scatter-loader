var fs = require('fs'),
	path = require('path'),
	assign = require('object-assign'),
	loaderUtils = require('loader-utils'),
	isPathAbsolute = require('path-is-absolute');

module.exports = function (content) {
	var that = this,
		fileParts = path.win32.parse(that.resource),
		ext = ['.ts'].indexOf(fileParts.ext) >= 0 ? '.js' : fileParts.ext,
		outputPath = that.options.output.path || that.context;

	this.cacheable && this.cacheable();
	var config = loaderUtils.getLoaderConfig(that, 'scatterLoader');

	outputPath = config.outputPath || outputPath;

	if (isPathAbsolute.win32(outputPath) && fs.existsSync(outputPath)) {
		fs[config.async ? 'writeFile' : 'writeFileSync'](path.join(config.outputPath || outputPath, fileParts.name + (config.ext || ext)), content, {
			encoding: config.encoding,
			mode: 7
		}, function (err) {
			if (err) throw err;
		});
	} else {
		throw new Error('Scatter Loader: outputPath should be absolute', 30, 'scatter-loader.js');
	}

	return content;
}
