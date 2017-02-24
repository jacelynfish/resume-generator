var gulp = require('gulp');
var pug = require('gulp-pug');
var del = require('del');
var cvdata = require('./cvdata.json');
var sass = require('gulp-sass');
var spritesmith = require('gulp.spritesmith');

gulp.task('pug', ['clean:pug'], function(){
    console.log('buiding index.html...');
    return gulp.src('./view/index.pug')
        .pipe(pug({
            locals:cvdata
        }))
        .pipe(gulp.dest('./dist'));
});

gulp.task('style',['clean:style'], function(){
    return gulp.src('./style/style.scss')
        .pipe(sass())
        .pipe(gulp.dest('./dist'));
})

gulp.task('clean:pug',function(){
    console.log("deleting index.html...");
    return del(['./dist/index.html']);
})

gulp.task('clean:style', function(){
    return del(['./dist/style.css']);
})

gulp.task('sprites', function(){
    var sprites = gulp.src('./icon/*.png')
        .pipe(spritesmith({
            padding:20,
            cssName:'sprites.scss',
            imgName:'sprites.png'
        }))
    sprites.img.pipe(gulp.dest('./dist'));
    sprites.css.pipe(gulp.dest('./style'));
    return sprites;
})
gulp.task('default',['pug', 'style'],function(){
    gulp.watch(['./view/index.pug','./cvdata.json'],['pug']);
    gulp.watch('./style/style.scss',['style']);
})