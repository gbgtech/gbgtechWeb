var gulp = require("gulp");
var sourcemaps = require("gulp-sourcemaps");
var babel = require("gulp-babel");
var concat = require("gulp-concat");
var watch = require('gulp-watch');
var server = require( 'gulp-develop-server' );

gulp.task("minimize-js", function () {
  return gulp.src("src/frontend/**/*.jsx")
    .pipe(sourcemaps.init())
    .pipe(babel())
    .pipe(concat("all.js"))
    .pipe(sourcemaps.write("."))
    .pipe(gulp.dest("build"));
});

gulp.task("copy-index", function() {
    return gulp.src("src/frontend/index.html")
        .pipe(gulp.dest("build"));
});

gulp.task("default", ["minimize-js", "copy-index"]);


gulp.task('watch', function() {
  gulp.run(["minimize-js", "copy-index"]);
  server.listen( { path: './src/backend/app.js' } );
  watch('src/*', function() {
    gulp.run(["minimize-js", "copy-index"]);
  });
});
