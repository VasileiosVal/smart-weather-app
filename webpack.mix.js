const mix = require('laravel-mix');

mix.js('resources/js/app.js', 'public/js').react('resources/js/render.js', 'public/js')
   .sass('resources/sass/app.scss', 'public/css').browserSync('http://smart.test');
