const gulp = require("gulp");
const concat = require("gulp-concat");
const uglify = require("gulp-uglify");
const babel = require("gulp-babel");

// Caminhos dos arquivos
const paths = {
  index: "src/index.js",
  libs: "src/libs/*.js",
};

// Tarefa para compilar, unificar e minificar os scripts
function scripts() {
  return gulp
    .src([paths.libs, paths.index])
    .pipe(
      babel({
        presets: ["@babel/env"],
      })
    )
    .pipe(concat("bundle.min.js"))
    .pipe(uglify())
    .pipe(gulp.dest("dist"));
}

// Tarefa padrão
exports.default = scripts;
