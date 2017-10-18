

    var $ = require('../lib/jquery.min.js');
    function GoTop() {
        this.target = $('<span class="back-top">Top</span>');
        this.createNode();
        this.bindEvent();
    }

    GoTop.prototype = {
        bindEvent : function() {
            var timer = null;
            var that = this;
            $(window).on('scroll', function() {
                if (timer) {
                    clearTimeout(timer);
                }
                timer = setTimeout(function() {
                    if ($(window).scrollTop() > 220) {
                        that.target.fadeIn()
                    } else {
                        that.target.fadeOut()
                    }
                }, 200)
            })

            this.target.on('click', function() {
                $('html,body').animate({scrollTop: 0}, 270)
            });
        },
        createNode : function() {
            this.target.css({
                position: 'fixed',
                right: '30px',
                bottom: '50px',
                padding: '14px',
                border: '1px solid #666', 
                cursor: 'pointer',
                display: 'none',
                borderRadius: '3px',
                backgroundColor: '#fff'
            });
            $('body').append(this.target)
        }
    }
module.exports = GoTop;




