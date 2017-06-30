//Include required modules
var gulp       = require("gulp"),
    babelify   = require('babelify'),
    browserify = require("browserify"),
    connect    = require("gulp-connect"),
    source     = require("vinyl-source-stream"),
    rename     = require('gulp-rename'),
    glob       = require('glob'),
    es         = require('event-stream');
;

//Default task. This will be run when no task is passed in arguments to gulp
gulp.task("default",["build"]);

//Convert ES6 ode in all js files in js folder and copy to 
//build folder as .bundle.js
gulp.task("build", function(done){
    glob("./js/*.js", function(err, files){
        if(err) done(err);

        var tasks = files.map(function(entry){
            return browserify({entries: [entry]})
            .transform(babelify.configure({
                presets : ["es2015", "react", "stage-0"]
            }))
            .bundle()
            .pipe(source(entry))
            .pipe(rename({
                extname: '.boundle.js'
            }))
            .pipe(gulp.dest('./build'));
        })
        es.merge(tasks).on('end', done);
    })
});

gulp.task('watch', function() {
    gulp.watch('./js/*.js',  './js/*.jsx', ['build']);
});
