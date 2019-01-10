const mix = require('laravel-mix');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
// const CompressionPlugin = require('compression-webpack-plugin');


mix.js('resources/js/app.js', 'public/js').react('resources/js/render.js', 'public/js')
   .sass('resources/sass/app.scss', 'public/css').browserSync('http://smart.test');

//
// .webpackConfig(webpack => {
//     return {
//         plugins: [
//             new CompressionPlugin({
//                 filename: '[path].gz[query]',
//                 algorithm: 'gzip',
//                 test: /\.js$|\.css$|\.html$|\.svg$/,
//                 threshold: 10240,
//                 minRatio: 0.8
//             }),
//         ],
//     }})

// .webpackConfig({
//     plugins: [
//         new BundleAnalyzerPlugin(),
//     ],
// })
