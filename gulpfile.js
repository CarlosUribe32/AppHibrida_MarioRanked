const {src, dest} = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const rename = require('gulp-rename');
const cleansCSS = require('gulp-clean-css');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify-es').default;

sass.compiler = require('dart-sass');

function js(){
    return src(['./js/index.js','./js/login.js','./js/niveles.js','./js/personajes.js','./js/creditos.js','./js/puntuacion.js', './js/main.js'])
            .pipe(concat("main.min.js"))
            .pipe(uglify())
            .pipe(dest('./js'));
}

function css(){
    return src("./sass/**/*.scss")
            .pipe(sass())
            .pipe(cleansCSS())
            .pipe(rename('main.min.css'))
            .pipe(dest("./css"));
}

function game(){
    return src(['./js/game1.js','./js/game2.js','./js/game3.js'])
            .pipe(uglify())
            .pipe(dest('./dist/js'));
}

exports.css = css;
exports.js = js;
exports.game = game;
exports.default = ()=>{};