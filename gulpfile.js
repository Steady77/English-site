const { src, dest, series, watch, parallel } = require('gulp');

const scss = require('gulp-sass')(require('sass'));
const concat = require('gulp-concat');
const browserSync = require('browser-sync').create();
const autoprefixer = require('gulp-autoprefixer');
const uglify = require('gulp-uglify-es').default;
const imagemin = require('gulp-imagemin');
const del = require('del');


function browsersync() {
  browserSync.init({
    server: {
      baseDir: "app/"
    }
  });
}

function deleteDir() {
  return del('dist');
}

function scripts() {
  return src(['app/js/main.js',
              'node_modules/swiper/swiper-bundle.js',
              'node_modules/aos/dist/aos.js'
            ])
    .pipe(concat('main.min.js'))
    .pipe(uglify())
    .pipe(dest('app/js'))
    .pipe(browserSync.stream());
}

function styles() {
  return src('app/scss/style.scss')
    .pipe(scss({ outputStyle: 'compressed' }))
    .pipe(concat('style.min.css'))
    .pipe(autoprefixer({
      grid: true
    }))
    .pipe(dest('app/css'))
    .pipe(browserSync.stream());
}

function images() {
  return src('app/images/**/*')
    .pipe(imagemin([
      imagemin.gifsicle({ interlaced: true }),
      imagemin.mozjpeg({ quality: 75, progressive: true }),
      imagemin.optipng({ optimizationLevel: 5 }),
      imagemin.svgo({
        plugins: [
          { removeViewBox: true },
          { cleanupIDs: false }
        ]
      })
    ]))
    .pipe(dest('dist/images'))
}

function build() {
  return src([
    'app/css/style.min.css',
    'app/fonts/**/*',
    'app/js/main.min.js',
    'app/*.html'
  ], {base: 'app'})
  .pipe(dest('dist'))
}

function watching() {
  watch(['app/scss/**/*.scss'], styles);
  watch(['app/js/**/*.js', '!app/js/main.min.js'], scripts);
  watch('app/*.html').on('change', browserSync.reload);
}

exports.styles = styles;
exports.browsersync = browsersync;
exports.watching = watching;
exports.scripts = scripts;
exports.images = images;
exports.deleteDir = deleteDir;


exports.build = series(deleteDir, images, build);
exports.default = parallel(styles, scripts, browsersync, watching);

