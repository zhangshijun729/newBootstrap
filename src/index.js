require('./css/index.css');
var $ = require('./js/lib/jquery.min.js');

var Carousel = require('./js/com/carousel.js');
var GoTop = require('./js/com/gotop.js');
// var WaterFall = require('./js/com/waterfall.js');

Carousel.init($('.carousel'));
new GoTop();
// new WaterFall();