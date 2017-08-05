/**
 * Review by Citron Cyanure on 04/03/2017.
 */

var gulp = require('gulp');
var sass = sass = require('gulp-sass');
var cssnano = require('gulp-cssnano');
var sourcemaps = require('gulp-sourcemaps');
var copy = copy = require('gulp-copy');
var livereload = require('gulp-livereload');
var uglify = require('gulp-uglifyjs');
var minify = require('gulp-minifier');
var plumber = require('gulp-plumber');
var exec = require('child_process').exec;
var rename = require('gulp-rename');

/*
 * './web/components/materialize/js/jquery/*.js',
 './web/components/materialize/js/components/*.js',
 './web/components/materialize/js/date_picker/*.js',
 */
//varaiable javascript
var jsPaths = [
    './web/bundles/*/js/*.js'
];
var jsname= "master.js";
var jsdest = "./web/data/js";

//variable sass
var sassdest ="./web/data/css";
var sasspaths="./web/bundles/*/sass/main.scss";
var sassname ="master.css";

//variable img
var imgdest = "./web/data/img";
var imgpaths ="./web/bundles/*/img/*";

//created by
var user="  Sdanicktakam@yahoo.fr(le Stratège++) ";

//watch
var sasswatch ="./src/*/Resources/public/sass/**/*.scss";
var jswatch = "./src/*/Resources/public/js/**/*.js";

var currentTask = "";

var supportedBrowsers = [
    'last 2 versions',
    'safari >= 8',
    'ie >= 10',
    'ff >= 20',
    'ios 6',
    'android 4'
];

var scriptTask = function()
{
    gulp.src(jsPaths)
        .pipe(minify({
            minify: true,
            collapseWhitespace: true,
            conservativeCollapse: true,
            minifyJS: true,
            minifyCSS: false,
            getKeptComment: function (content, filePath) {
                var m = content.match(/\/\*![\s\S]*?\*\//img);
                return m && m.join('\n') + '\n' || '';
            }
        })).pipe(gulp.dest(jsdest))
        .pipe(livereload());
};

var sassTask = function()
{
    gulp.src(sasspaths)
        .pipe(sourcemaps.init())
        .pipe(plumber())
        .pipe(sass({sourceComments: 'map'}))
        .pipe(rename(sassname))
        .pipe(cssnano({
            autoprefixer: {browsers: supportedBrowsers, add: true}
        }))
        .pipe(minify({
            minify: true,
            collapseWhitespace: true,
            conservativeCollapse: true,
            minifyJS: false,
            minifyCSS: true,
            getKeptComment: function (content, filePath) {
                var m = content.match(/\/\*![\s\S]*?\*\//img);
                return m && m.join('\n') + '\n' || '';
            }
        }))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(sassdest))
        .pipe(livereload());
};

var imageTask = function()
{
    console.log("Image copy's successfull !");
    return gulp.src(imgpaths)
        .pipe(copy(imgdest, {prefix: 5}));
};

var fontsTask = function()
{
    console.log("fonts copy's successfull !");
    return gulp.src(fontspaths)
        .pipe(copy(fontsdest, {prefix: 5}));
};

var uglifyTask = function()
{
    gulp.src(jsPaths)
        .pipe(uglify(jsname, {
            outSourceMap: true
        }))
        .pipe(gulp.dest(jsdest))
        .pipe(livereload());

    console.log('Uglify JS files successfull !' +user);
};

gulp.task('default', function(){
    exec('php bin/console assets:install --symlink', logStdOutAndErr);
});

gulp.task('asset', function ()
{
    exec('php bin/console assets:install --symlink', logStdOutAndErr);
});

gulp.task('update', function ()
{
    exec('php bin/console doctrine:schema:update --dump-sql --force', function(err, stdout, stderr)
    {
        //console.log(stdout + stderr);
        console.log("update as  successfully !!!" +user);
    });
});


gulp.task('create', function ()
{
    exec('php bin/console doctrine:database:create', function(err, stdout, stderr)
    {
        //console.log(stdout + stderr);
        console.log("create database as  successfully !!!" +user);
    });
});

gulp.task('drop', function ()
{
    exec('php bin/console doctrine:database:drop --force', function(err, stdout, stderr)
    {
        //console.log(stdout + stderr);
        console.log("drop database as  successfully !!!" +user);
    });
});

gulp.task('entity', function ()
{
    exec('php bin/console doctrine:generate:entities EntityBundle', function(err, stdout, stderr)
    {
        console.log("generation as  successfully !!!" +user);
    });
});

gulp.task('dev', function ()
{
    exec('php bin/console cache:clear --env=dev', function(err, stdout, stderr)
    {
        //console.log(stdout + stderr);
        console.log("Cache developpement cleared successfully !!!" +user);
    });
});

gulp.task('prod', function ()
{
    exec('php bin/console cache:clear --env=prod', function(err, stdout, stderr)
    {
        //console.log(stdout + stderr);
        console.log("Cache prodution cleared successfully !!!" +user);
    });
});


gulp.task('sass', ['asset'], function ()
{
    currentTask = 'sass';
});

gulp.task('img', ['asset'], function ()
{
    currentTask = 'image';
});

gulp.task('fonts', ['asset'], function ()
{
    currentTask = 'fonts';
});

gulp.task('js', ['asset'], function()
{
    currentTask = 'js';
});

gulp.task('uglify', ['asset'], function()
{
    currentTask = 'uglify';
});

gulp.task('sass_js', ['asset'], function ()
{
    currentTask = 'sass_js';
});

// Without this function exec() will not show any output
var logStdOutAndErr = function (err, stdout, stderr)
{
    //console.log(stdout + stderr);
    console.log("Assets installed !!!" +user);

    if(currentTask == 'sass')
    {
        sassTask();
    }
    else if(currentTask == 'js')
    {
        uglifyTask();
    }
    else if(currentTask == 'fonts')
    {
        return fontsTask();
    }
    else if(currentTask == 'img')
    {
        return imageTask();
    }
    else if(currentTask == 'uglify')
    {
        uglifyTask();
    }
    else if(currentTask == 'sass_js')
    {
        sassTask();
        uglifyTask();
    }
};

gulp.task('watch', function ()
{
    // Starts the server
    livereload.listen();

    gulp.watch(sasswatch, ['asset'])
        .on('change', function(event){
            console.log('File '+event.path+' has been '+event.type +user);

            currentTask = 'sass';
        });

    gulp.watch(jswatch, ['asset'])
        .on('change', function(event){
            console.log('File '+event.path+' has been '+event.type +user);

            currentTask = 'js';
        });
});