var gulp = require("gulp");
var babel = require("gulp-babel");

// gulp.task("default", function () {
//   return gulp.src("src/components/test.js")
//     .pipe(babel())
//     .pipe(gulp.dest("dist/components"));
// });

gulp.task('default',['one', 'two', 'three']);

gulp.task("one", function () {
  return gulp.src("src/components/app.js")
    .pipe(babel())
    .pipe(gulp.dest("dist/components"));
});

gulp.task("two", function () {
  return gulp.src("src/components/MDEditor.js")
    .pipe(babel())
    .pipe(gulp.dest("dist/components"));
});

gulp.task("three", function () {
  return gulp.src("src/components/format.js")
    .pipe(babel())
    .pipe(gulp.dest("dist/components"));
});
