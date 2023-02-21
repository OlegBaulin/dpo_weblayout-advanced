const { src, dest, series, watch, parallel } = require('gulp');
const concat = require('gulp-concat');
const htmlMin = require('gulp-htmlmin');
const autoprefixer = require('gulp-autoprefixer');
const cleanCSS = require('gulp-clean-css');
const svgSprite = require('gulp-svg-sprite');
const image = require('gulp-image');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify-es').default;
const notify = require('gulp-notify');
const sourcemaps = require('gulp-sourcemaps');
const del = require('del');
const gulpif = require('gulp-if');
const browserSync = require('browser-sync').create();

const env = process.env.NODE_ENV;

const clean = () => {
  return del(['dist']);
}

const resources = () => {
  return src('src/resources/**')
    .pipe(dest('dist/resources'));
}

const styles = () => {
  return src('src/css/**/*.css')
    .pipe(gulpif(env === 'dev', sourcemaps.init()))
    .pipe(concat('main.css'))
    .pipe(gulpif(env === 'prod', autoprefixer({
      cascade: false,
    })))
    .pipe(gulpif(env === 'prod', cleanCSS({
      level: 2,
    })))
    .pipe(gulpif(env === 'dev', sourcemaps.write()))
    .pipe(dest('dist'))
    .pipe(browserSync.stream());
}

const htmlMinify = () => {
  return src('src/**/*.html')
    .pipe(gulpif(env === 'prod', htmlMin({
      collapseWhitespace: true,
    })))
    .pipe(dest('dist'))
    .pipe(browserSync.stream());
}

const svgSprites = () => {
  return src('src/img/svg/**/*.svg')
    .pipe(svgSprite({
      mode: {
        stack: {
          sprite: '../sprite.svg'
        }
      }
    }))
    .pipe(dest('dist/img'));
}

const scripts = () => {
  return src([
    'src/js/components/**/*.js',
    'src/js/main.js'
  ])
    .pipe(gulpif(env === 'dev', sourcemaps.init()))
    .pipe(gulpif(env === 'prod', babel({
      presets: ['@babel/env']
    })))
    .pipe(concat('app.js'))
    .pipe(gulpif(env === 'prod', uglify({
      toplevel: true,
    }).on('error', notify.onError())))
    .pipe(gulpif(env === 'dev', sourcemaps.write()))
    .pipe(dest('dist'))
    .pipe(browserSync.stream())

}

const images = () => {
  return src([
    'src/img/**/*.jpg',
    'src/img/**/*.png',
    'src/img/**/*.jpeg',
    'src/img/*.svg',
  ])
    .pipe(gulpif(env === 'prod', image()))
    .pipe(dest('dist/img'));
}

const server = () => {
  browserSync.init({
    server: {
      baseDir: 'dist'
    }
  })
}

const watchers = (done) => {
  watch('src/**/*.html', htmlMinify);
  watch('src/css/**/*.css', styles);
  watch('src/img/svg/**/*.svg', svgSprites);
  watch('src/js/**/*.js', scripts);
  watch('src/resources/**', resources);
  done();
}


const build = series(
  clean,
  parallel(resources, htmlMinify, scripts, styles, images, svgSprites)
);

const serve = series(
  build,
  parallel(server, watchers)
);

exports.build = build;
exports.serve = serve;
exports.default = series(clean, resources, htmlMinify, scripts, styles, images, svgSprites, server);
