var gulp = require("gulp");
var babel = require("gulp-babel");

// gulp.task("default", function () {
//   return gulp.src("src/components/test.js")
//     .pipe(babel())
//     .pipe(gulp.dest("dist/components"));
// });

gulp.task('default',['one', 'two', 'three']);

gulp.task("one", function () {
  return gulp.src("src/components/md/app.js")
    .pipe(babel())
    .pipe(gulp.dest("dist/components/md"));
});

gulp.task("two", function () {
  return gulp.src("src/components/md/MDEditor.js")
    .pipe(babel())
    .pipe(gulp.dest("dist/components/md"));
});

gulp.task("three", function () {
  return gulp.src("src/components/md/format.js")
    .pipe(babel())
    .pipe(gulp.dest("dist/components/md"));
});
