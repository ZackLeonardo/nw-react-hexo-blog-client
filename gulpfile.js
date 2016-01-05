var gulp = require("gulp");
var babel = require("gulp-babel");

// gulp.task('default',['mdeditor', 'folderSelector', 'splitPane', 'treeBeard']);
gulp.task('default',["treeBeard"]);

/*
 * hexo config
 */
gulp.task("rightClick", function () {
  return gulp.src("src/components/backServer/rightClick.js")
    .pipe(babel())
    .pipe(gulp.dest("dist/components/backServer"));
});


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
 * fileSelector
 */
// gulp.task('default',['treeBeard']);
gulp.task("fileSelector", function () {
  return gulp.src("src/components/fileSelector/**/*.js")
    .pipe(babel())
    .pipe(gulp.dest("dist/components/fileSelector"));
});


/*
 * folderSelector
 */
// gulp.task('default',['treeBeard']);
gulp.task("folderSelector", function () {
  return gulp.src("src/components/nwFileDialog/**/*.js")
    .pipe(babel())
    .pipe(gulp.dest("dist/components/nwFileDialog"));
});

/*
 * progressUI
 */
gulp.task("progressUI", function () {
  return gulp.src("src/components/progressUI/**/*.js")
    .pipe(babel())
    .pipe(gulp.dest("dist/components/progressUI"));
});

/*
 * hexo config
 */
gulp.task("hexoConfig", function () {
  return gulp.src("src/components/forms/**/*.js")
    .pipe(babel())
    .pipe(gulp.dest("dist/components/forms"));
});
