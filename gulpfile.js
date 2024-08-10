const gulp = require("gulp");
const babel = require("gulp-babel");
const ts = require("gulp-typescript");
const concat = require("gulp-concat");
const uglify = require("gulp-uglify");
const tsProject = ts.createProject("tsconfig.json");

// Tarefa para processar TypeScript e JavaScript
function scripts() {
  return gulp
    .src(["src/**/*.ts", "src/**/*.js"]) // Inclui TS e JS
    .pipe(tsProject()) // Compila TypeScript
    .pipe(
      babel({
        // Transpila JavaScript para ES5
        presets: ["@babel/preset-env"],
        plugins: ["@babel/plugin-transform-modules-umd"], // Para suporte a módulos no navegador
      })
    )
    .pipe(concat("bundle.min.js")) // Concatena todos os arquivos
    .pipe(uglify()) // Minifica o código final
    .pipe(gulp.dest("dist")); // Salva na pasta dist
}

exports.default = gulp.series(scripts);
