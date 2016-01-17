var gulp = require("gulp");
var sourcemaps = require("gulp-sourcemaps");
var babel = require("gulp-babel");
var concat = require("gulp-concat");
var watch = require('gulp-watch');

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
  watch('src/*', function() {
    gulp.run(["minimize-js", "copy-index"]);
  });
});
