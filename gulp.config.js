/**
 * Created by vagrant on 9/12/16.
 */

module.exports = function() {
    var clientApp = './app/';
    var config = {
        css: './app/styles/main.css',
        temp: './.tmp/',
        css_drop: './app/styles/',

        // all js to vet
        alljs: [
            './app/app.js',
            './app/components/**/*.js',
            './app/services/**/*.js',
            './app/specs/**/*.js'
        ],
        client: clientApp,
        index: clientApp + 'index.html',
        js: [
            clientApp + 'scripts/*.js',
            clientApp + 'app.js',
            clientApp + '**/*.module.js',
            clientApp + '**/*.js',
            '!' + clientApp + '**/*.spec.js',
            '!' + clientApp + 'bower_components/**/*.js',
            '!' + clientApp + 'coverage/**/*.js'
        ],

        scss: './app/styles/scss/*.scss',

        /**
         * Bower and NPM locations
         */
        bower: {
            json: require('./bower.json'),
            directory: clientApp + 'bower_components/',
            ignorePath: '../..'
        }
    };

    config.getWiredepDefaultOptions = function () {
        var options = {
            bowerJson: config.bower.json,
            directory: config.bower.directory,
            ignorePath: config.bower.ignorePath
        };

        return options;
    };

    return config;
};