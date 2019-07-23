var gulp = require("gulp");
var sass = require("gulp-sass");
var changed = require("gulp-changed");
var postcss = require("gulp-postcss");
var concat = require("gulp-concat");
var uglify = require("gulp-uglify");
var sourcemaps = require("gulp-sourcemaps");
var autoprefixer = require("autoprefixer");
var del = require("del");

var src = "src/**";
var dist = "docs/";

var uploadable = [src, "!src/css/**", "!src/js/**"];

gulp.task("clean", () => del(["./docs/**", "!./docs"]));

gulp.task("js", () =>
  gulp
    .src(["src/js/**/*.js", "node_modules/skrollr/dist/skrollr.min.js"])
    .pipe(sourcemaps.init())
    .pipe(uglify())
    .pipe(concat("main.js"))
    .pipe(sourcemaps.write("./"))
    .pipe(gulp.dest("docs/js/"))
);

gulp.task("sass", () =>
  gulp
    .src("src/css/main.scss")
    .pipe(sourcemaps.init())
    .pipe(sass({ outputStyle: "compressed" }))
    .pipe(postcss([autoprefixer()]))
    .pipe(sourcemaps.write("./"))
    .pipe(gulp.dest("docs/css/"))
);

gulp.task("upload", () =>
  gulp
    .src(uploadable)
    .pipe(changed(dist))
    .pipe(gulp.dest(dist))
);

gulp.task(
  "default",
  gulp.series("clean", () => {
    gulp.watch(uploadable, gulp.series("upload"));
    gulp.watch(["src/css/**/*.scss"], gulp.series("sass"));
    gulp.watch(["src/js/*.js"], gulp.series("js"));
  })
);
