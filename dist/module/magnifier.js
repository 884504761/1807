define(["jquery"],function(i){function t(){}return t.prototype.show=function(){var h=i("#Btabs"),c=i("#sm_box"),n=i(".big_box"),g=i("#bigImg"),t=i("#Btabs").width(),s=i("#Btabs").height();console.log(s),i(".big_box img").css("width",2*t),i(".big_box img").css("height",2*s),h.mousemove(function(t){var s=t.clientX-h.offset().left-c.width()/2,i=t.clientY-h.offset().top-c.height()/2;console.log(s);var e=c.height(),o=n.height();c.css("display","block"),n.css("display","block"),s<0&&(s=0),i<0&&(i=0),s>h.width()-c.width()&&(s=h.width()-c.width()),i>h.height()-c.height()&&(i=h.height()-c.height()),c.css("left",s),c.css("top",i),g.css("left",-o/e*s),g.css("top",-o/e*i)}),h.mouseleave(function(){c.css("display","none"),n.css("display","none")})},new t});