var gulp = require("gulp");
var babel = require("gulp-babel");

gulp.task('default',['fileSelector']);

/*
 * MDEditor
 */
gulp.task("mdeditor", function () {
  return gulp.src("src/components/md/**/*.js")
    .pipe(babel())
    .pipe(gulp.dest("dist/components/md"));
});

/*
 * splitPane
 */
gulp.task("splitPane", function () {
  return gulp.src("src/components/splitPane/**/*.js")
    .pipe(babel())
    .pipe(gulp.dest("dist/components/splitPane"));
});


/*
 * TreeBeard
 */
// gulp.task('default',['treeBeard']);
gulp.task("treeBeard", function () {
  return gulp.src("src/components/treeBeard/**/*.js")
    .pipe(babel())
    .pipe(gulp.dest("dist/components/treeBeard"));
});


/*
 * TreeBeard
 */
// gulp.task('default',['treeBeard']);
gulp.task("fileSelector", function () {
  return gulp.src("src/components/fileSelector/**/*.js")
    .pipe(babel())
    .pipe(gulp.dest("dist/components/fileSelector"));
});
