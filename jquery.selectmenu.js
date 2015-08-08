/**
 * Created by NQLDY on 2015/7/25.
 */

(function($) {

    $.QjzdSelectMenu = function($selectObjs, opt) {
        if (typeof($selectObjs) !== 'object') {
            $selectObjs = $($selectObjs);
        }
        var options = $.extend({}, $.QjzdSelectMenu.defaults);
        //设置options入参
        var setOptions = function (opt) {
            if (typeof(opt) !== 'object') {
                opt = {};
            }
            options = $.extend(options, opt);
        };
        setOptions(opt);

        $selectObjs.addClass("select");
        $selectObjs.each(function (i, d) {
            var list = '';
            var listval = [];
            $(this).find("option").each(function (j, e) {
                list += '<li data-value=' + $(this).val() + '>' + $(this).text() + '</li>';
                listval.push($(this).val());
            });
            if (!options.refresh && !$(this).next().hasClass("title")) {
                $(this).wrap('\
					<div class="selectmenu">\
					</div>\
				');
                $(this).after('\
					<div class="title">\
						<div class="text"></div>\
						<div class="ico"></div>\
					</div>\
					<ul class="list">' + list + '</ul>\
				');
            } else {
                $(this).parent().find(".list").html(list);
            }
            var thatAll = $('.selectmenu');
            var that = $(this).parent();
            that.css({
                "z-index": 1000 - i,
                "width": parseInt($(this).css("width")) + 2, "margin-right": $(this).css("margin-right")
            });
            that.find(".text").text($(this).find("option:selected").text());
            that.find("li").unbind("click").on("click", function (event) {
                event.stopPropagation();
                that.find(".text").text($(this).text());
                that.find(".select").val(listval[$(this).index()]);
                options.change(listval[$(this).index()]);
                that.find(".ico").removeClass("active");
                that.find(".list").hide();
            });
            that.unbind("click").on("click", function (event) {
                event.stopPropagation();
                thatAll.find(".list").hide();
                switch ($(this).find(".ico").hasClass("active")) {
                    case true:
                        thatAll.find(".ico").removeClass("active");
                        $(this).find(".ico").removeClass("active");
                        that.find(".list").hide();
                        break;
                    case false:
                        thatAll.find(".ico").removeClass("active");
                        $(this).find(".ico").addClass("active");
                        that.find(".list").show();
                        break;
                }
            });
            that.find(".list").unbind("mousewheel").mousewheel(function (event, delta) {
                event.stopPropagation();
            });
            $(document).unbind("click").on("click", function () {
                thatAll.find(".ico").removeClass("active");
                thatAll.find(".list").hide();
            })
        });

        var api = {};
        /**
         * 使用
         * var selectMenu = $.QjzdSelectMenu(.select);
         * selectMenu.val(); //获取当前值， 如果.select有多个元素，取第一个元素
         * selectMenu.val(1); //设置值
         * selectMenu.val($selectOne, 1); 给其中的$selectOne设置值
         * @param $selObj
         * @param value
         * @returns {*}
         */
        api.val = function($selObj, value) {
            if (typeof  ($selObj) === "undefined") {
                return $selectObjs.eq(0).val();
            }
            if (typeof (value) === "undefined") {
                value = $selObj;
                $selObj = $selectObjs;
            } else if (typeof ($selObj) !== "object") {
                $selObj = $($selObj);
            }
            if ($selectObjs.closest($selObj).length > 0) {
                $selObj.parent().find("li[data-value=" + value +"]").trigger("click");
            }
        };
        /**
         * var selectMenu = $.QjzdSelectMenu(.select);
         * selectMenu.text(); //获取当前text， 如果.select有多个元素，取第一个元素
         * selectMenu.text($selectOne); 给其中的$selectOne的text
         * @param $selObj
         * @returns {XMLList|*}
         */
        api.text = function($selObj) {
            if (typeof  ($selObj) === "undefined") {
                $selObj = $selectObjs.eq(0);
            }  else if (typeof ($selObj) !== "object") {
                $selObj = $($selObj);
            }
            if ($selectObjs.closest($selObj).length > 0) {
                return $selObj.find("option:selected").text();
            }
        };
        api.on = function(type, callback) {
            if (type === "change") {
                if (typeof (callback) === "function") {
                    options.change = callback;
                }
            }
        };
        return api;
    };

    //默认参数
    $.QjzdSelectMenu.defaults = {
        refresh: false,
        change: $.noop
    };

    $.fn.selectMenu = function (options, callback) {
        var api;
        if(this && this.length > 0){
            api = $.QjzdSelectMenu(this, options);
            if ($.isFunction(callback)) {
                callback.apply(api);
            }
        }
        return this;
    };

}(jQuery));