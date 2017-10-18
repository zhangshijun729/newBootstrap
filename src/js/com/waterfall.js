
    var $ = require('../lib/jquery.min.js');
    function WaterFall() {
        this.init();
        this.render();
        this.bind();
    }

    WaterFall.prototype = {
        init: function() {
            this.columns = parseInt($('.wrap').width() / $('#pic-ct .item').outerWidth(true));
            this.nodeWidth = $('.item').outerWidth(true);
            this.colSumHeights = new Array(this.columns).fill(0);
            this.perPageCount = 6;
            this.curPage = 1;
            this.timer = null;
        },
        bind: function() {
            var self = this;
            $('#loadMore').click(function() {
                self.render();
            });
        },
        render: function() {
            let self = this;
            this.getData(function(newsList) {
                $.each(newsList, function(idx, news) {
                    let $node = self.createNode(news);
                    $node.find('img').load(function() {  //确保每张图片都加载完
                        $('#pic-ct').append($node);
                        self.waterfallRender($node);
                    })
                })
            });
        },
        waterfallRender: function($node) {
            let minSumHeight = Math.min.apply(null, this.colSumHeights);
            let idx = this.colSumHeights.indexOf(minSumHeight);

            $node.css({
                top: minSumHeight,
                left: idx * this.nodeWidth,
                opacity: 1
            });
            this.colSumHeights[idx] += $node.outerHeight(true);
            $('#pic-ct').height(Math.max.apply(null, this.colSumHeights))
        },
        createNode: function(news) {
            let tpl = '<li class="item">'
            + '<a href="' + news.url + '" class="link">'
            + '<img src="' + news.img_url + '" alt="' + news.name + '">'
            + '</a>'
            + '<h4 class="header">' + news.short_name + '</h4>'
            + '<p class="desp">' + news.short_intro + '</p>'
            + '</li>';
            return $(tpl);
        },
        getData: function(callback) {
            let self = this;
            $.ajax({
                url: 'https://platform.sina.com.cn/slide/album_tech',
                dataType: 'jsonp',
                jsonp: 'jsoncallback',
                data: {
                    app_key: 1271687855,
                    num: this.perPageCount,
                    page: this.curPage
                }
            }).done(function(res) {
                if (res.status.code === '0') {
                    callback(res.data);
                    self.curPage++;
                } else {
                    console.log('get error data');
                }
            }).error(function(err) {
                console.log(err);
            });
        }
    }

module.exports = WaterFall;
