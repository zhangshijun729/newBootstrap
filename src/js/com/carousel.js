
	var $ = require('../lib/jquery.min.js');

	var Carousel = (function() {
	    function _Carousel($ct) {
	        this.$ct = $ct;
	        this.$preBtn = this.$ct.find('.pre');
	        this.$nextBtn = this.$ct.find('.next');
	        this.$imgCt = this.$ct.find('.img-ct');
	        this.$imgs = this.$ct.find('.img-ct > li');
	        this.imgNum = this.$imgs.size();
	        this.imgWidth = this.$ct.width();
	        this.$bullets = this.$ct.find('.bullet > li');
	        this.curIndex = 0;
	        this.isAnimate = false;

	        this.init();
	        this.bind();
	    }
	    _Carousel.prototype.init = function() {
	        var $firstImg = this.$imgs.first().clone();
	        var $lastImg = this.$imgs.last().clone();

	        this.$imgCt.prepend($lastImg);
	        this.$imgCt.append($firstImg);
	        this.$imgCt.width((this.imgNum+2) * this.imgWidth);
	        this.$imgCt.css({left: -this.imgWidth});
	        this.$imgCt.find('li > img').css('width', this.imgWidth);
	    }
	    
	    _Carousel.prototype.bind = function() {
	        var _this = this;
	        this.$preBtn.click(function() {
	            _this.play(-1);
	        });
	        this.$nextBtn.click(function() {
	            _this.play(1);
	        });

	        this.$bullets.click(function() {
	            var curBullet = $(this).index();
	            _this.play(curBullet - _this.curIndex);
	        });
	    }
	    _Carousel.prototype.play = function(len) {
	        var _this = this;
	        if (this.isAnimate) return;
	        this.isAnimate = true;

	        this.$imgCt.animate({
	            left: '-=' + len*_this.imgWidth
	        }, function() {
	            _this.curIndex += len;
	            if (_this.curIndex < 0) {
	                _this.curIndex = _this.imgNum - 1;
	                _this.$imgCt.css({left: -_this.imgWidth*_this.imgNum});
	            } else if (_this.curIndex > _this.imgNum-1) {
	                _this.curIndex = 0;
	                _this.$imgCt.css({left: -_this.imgWidth});
	            }
	            
	            _this.setBullet(_this.curIndex);
	            _this.isAnimate = false;
	        });
	    }

	    _Carousel.prototype.setBullet = function(curIndex) {
	        this.$bullets.removeClass('active')
	                     .eq(this.curIndex)
	                     .addClass('active');
	    }

	    return {
	        init: function($ct) {
	            $ct.each(function(idx, obj) {
	                new _Carousel($(obj));
	            });
	        }
	    }
	})();

module.exports = Carousel;
