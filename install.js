/**
 * Copy js source files to root from installed package, for use relative path with require.
 * require("prefix-pkg-name/relative/path");
 * @version 0.0.4
 */

"use strict";

var fs = require('fs');
var path = require('path');

function isDependencyPackage(cb) {
    fs.exists(__dirname + '/../../node_modules/' + path.basename(__dirname), function(exists) {
        if (exists) {
            cb();
        }
    });
}

/**
 * Clean package root and exclude src/js
 */
function preparePackage() {
    var ignoreFiles = ['package.json', 'README.md', 'LICENSE.md', '.gitignore', '.npmignore', 'index.js', 'index.pcss'];
    var ignoreCopyFiles = [];
    var copyRecursiveSync = function(src, dest) {
        var exists = fs.existsSync(src);
        var stats = exists && fs.statSync(src);
        var isDirectory = exists && stats.isDirectory();
        if (exists && isDirectory) {
            if (!fs.existsSync(dest)) {
                fs.mkdirSync(dest);
            }
            fs.readdirSync(src).forEach(function(filename) {
                copyRecursiveSync(path.join(src, filename),
                    path.join(dest, filename));
            });
        } else {
            if (ignoreCopyFiles.indexOf(path.basename(src)) === -1) {
                fs.linkSync(src, dest);
            }
        }
    };
    var src = path.join(process.cwd(), 'src-pkg');
    if (fs.existsSync(src)) {
        fs.readdirSync(process.cwd()).forEach(function(filename) {
            var curPath = path.join(process.cwd(), filename);
            if (ignoreFiles.indexOf(path.basename(curPath)) === -1 && fs.statSync(curPath).isFile()) {
                fs.unlinkSync(curPath);
            } else if (ignoreFiles.indexOf(path.basename(curPath)) === -1 && fs.statSync(curPath).isDirectory()) {
                deleteFolderRecursive(curPath);
            }
        });
        copyRecursiveSync(src, process.cwd());
    }
}

/**
 * Delete directories recursive.
 */
function deleteFolderRecursive(path) {
    if (fs.existsSync(path)) {
        fs.readdirSync(path).forEach(function(file) {
            var curPath = path + "/" + file;
            if (fs.lstatSync(curPath).isDirectory()) {
                deleteFolderRecursive(curPath);
            } else {
                fs.unlinkSync(curPath);
            }
        });
        fs.rmdirSync(path);
    }
}

isDependencyPackage(preparePackage);
