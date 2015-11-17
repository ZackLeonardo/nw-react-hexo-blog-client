var gulp = require("gulp");
var babel = require("gulp-babel");

/*
 * MDEditor
 */
// gulp.task("default", function () {
//   return gulp.src("src/components/test.js")
//     .pipe(babel())
//     .pipe(gulp.dest("dist/components"));
// });

// gulp.task('default',['md_format', 'md_mdeditor', 'md_app']);
//
// gulp.task("md_app", function () {
//   return gulp.src("src/components/md/app.js")
//     .pipe(babel())
//     .pipe(gulp.dest("dist/components/md"));
// });
//
// gulp.task("md_mdeditor", function () {
//   return gulp.src("src/components/md/MDEditor.js")
//     .pipe(babel())
//     .pipe(gulp.dest("dist/components/md"));
// });
//
// gulp.task("md_format", function () {
//   return gulp.src("src/components/md/format.js")
//     .pipe(babel())
//     .pipe(gulp.dest("dist/components/md"));
// });

// /*
//  * splitPane
//  */
// gulp.task('default',['splitPane_pane', 'splitPane_resizer', 'splitPane_splitPane', 'splitPane_app']);
//
// gulp.task("splitPane_pane", function () {
//   return gulp.src("src/components/splitPane/Pane.js")
//     .pipe(babel())
//     .pipe(gulp.dest("dist/components/splitPane"));
// });
//
// gulp.task("splitPane_resizer", function () {
//   return gulp.src("src/components/splitPane/Resizer.js")
//     .pipe(babel())
//     .pipe(gulp.dest("dist/components/splitPane"));
// });
//
// gulp.task("splitPane_splitPane", function () {
//   return gulp.src("src/components/splitPane/SplitPane.js")
//     .pipe(babel())
//     .pipe(gulp.dest("dist/components/splitPane"));
// });
//
// gulp.task("splitPane_app", function () {
//   return gulp.src("src/components/splitPane/app.js")
//     .pipe(babel())
//     .pipe(gulp.dest("dist/components/splitPane"));
// });


/*
 * TreeBeard
 */
gulp.task('default',['treeBeard']);

gulp.task("treeBeard", function () {
  return gulp.src("src/components/treeBeard/**/*.js")
    .pipe(babel())
    .pipe(gulp.dest("dist/components/treeBeard"));
});
