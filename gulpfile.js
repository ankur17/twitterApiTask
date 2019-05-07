
var gulp = require('gulp');
var nodemon = require('gulp-nodemon')
var webpack = require('webpack');
var babel = require('babel-core/register');
var config = require('./webpack.config');

gulp.task('watch', function(done){
    webpack(config).run(onBuild(done));
});

function onBuild(done) {
    return function(err, stats) {
        if (err) {
            console.log('Error', err);
            if (done) {
                done();
            }
        } else {
            Object.keys(stats.compilation.assets).forEach(function(key) {
                console.log('Webpack: output ', key);
            });
            console.log('Webpack: ', 'finished ');
            if (done) {
                done();
            }
        }
    }
}

gulp.task('default', ['watch'], function(done){
    return nodemon({
        script: 'server.js',
    })
        .on('restart', function(){
            console.log('restarted');
        })
})
