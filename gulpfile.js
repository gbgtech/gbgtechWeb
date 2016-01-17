var gulp = require("gulp");
var sourcemaps = require("gulp-sourcemaps");
var babel = require("gulp-babel");
var concat = require("gulp-concat");



gulp.task("minimize-js", function () {
  return gulp.src("src/**/*.jsx")
    .pipe(sourcemaps.init())
    .pipe(babel())
    .pipe(concat("all.js"))
    .pipe(sourcemaps.write("."))
    .pipe(gulp.dest("build"));
});

gulp.task("copy-index", function() {
    return gulp.src("src/index.html")
        .pipe(gulp.dest("build"));
});

gulp.task("default", ["minimize-js", "copy-index"]);