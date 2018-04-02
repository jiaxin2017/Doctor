(function(a){var b=true;a.flexslider=function(d,o){var l=a(d);if(typeof o.rtl=="undefined"&&a("html").attr("dir")=="rtl"){o.rtl=true}l.vars=a.extend({},a.flexslider.defaults,o);var h=l.vars.namespace,e=window.navigator&&window.navigator.msPointerEnabled&&window.MSGesture,j=(("ontouchstart" in window)||e||window.DocumentTouch&&document instanceof DocumentTouch)&&l.vars.touch,c="click touchend MSPointerUp keyup",n="",q,i=l.vars.direction==="vertical",k=l.vars.reverse,p=(l.vars.itemWidth>0),g=l.vars.animation==="fade",m=l.vars.asNavFor!=="",f={};a.data(d,"flexslider",l);f={init:function(){l.animating=false;l.currentSlide=parseInt((l.vars.startAt?l.vars.startAt:0),10);if(isNaN(l.currentSlide)){l.currentSlide=0}l.animatingTo=l.currentSlide;l.atEnd=(l.currentSlide===0||l.currentSlide===l.last);l.containerSelector=l.vars.selector.substr(0,l.vars.selector.search(" "));l.slides=a(l.vars.selector,l);l.container=a(l.containerSelector,l);l.count=l.slides.length;l.syncExists=a(l.vars.sync).length>0;if(l.vars.animation==="slide"){l.vars.animation="swing"}l.prop=(i)?"top":(l.vars.rtl?"marginRight":"marginLeft");l.args={};l.manualPause=false;l.stopped=false;l.started=false;l.startTimeout=null;l.transitions=!l.vars.video&&!g&&l.vars.useCSS&&(function(){var t=document.createElement("div"),s=["perspectiveProperty","WebkitPerspective","MozPerspective","OPerspective","msPerspective"];for(var r in s){if(t.style[s[r]]!==undefined){l.pfx=s[r].replace("Perspective","").toLowerCase();l.prop="-"+l.pfx+"-transform";return true}}return false}());l.ensureAnimationEnd="";if(l.vars.controlsContainer!==""){l.controlsContainer=a(l.vars.controlsContainer).length>0&&a(l.vars.controlsContainer)}if(l.vars.manualControls!==""){l.manualControls=a(l.vars.manualControls).length>0&&a(l.vars.manualControls)}if(l.vars.customDirectionNav!==""){l.customDirectionNav=a(l.vars.customDirectionNav).length===2&&a(l.vars.customDirectionNav)}if(l.vars.randomize){l.slides.sort(function(){return(Math.round(Math.random())-0.5)});l.container.empty().append(l.slides)}l.doMath();l.setup("init");if(l.vars.controlNav){f.controlNav.setup()}if(l.vars.directionNav){f.directionNav.setup()}if(l.vars.keyboard&&(a(l.containerSelector).length===1||l.vars.multipleKeyboard)){a(document).bind("keyup",function(r){var s=r.keyCode;if(!l.animating&&(s===39||s===37)){var t=(l.vars.rtl?((s===37)?l.getTarget("next"):(s===39)?l.getTarget("prev"):false):((s===39)?l.getTarget("next"):(s===37)?l.getTarget("prev"):false));l.flexAnimate(t,l.vars.pauseOnAction)}})}if(l.vars.mousewheel){l.bind("mousewheel",function(s,v,r,t){s.preventDefault();var u=(v<0)?l.getTarget("next"):l.getTarget("prev");l.flexAnimate(u,l.vars.pauseOnAction)})}if(l.vars.pausePlay){f.pausePlay.setup()}if(l.vars.slideshow&&l.vars.pauseInvisible){f.pauseInvisible.init()}if(l.vars.slideshow){if(l.vars.pauseOnHover){l.hover(function(){if(!l.manualPlay&&!l.manualPause){l.pause()}},function(){if(!l.manualPause&&!l.manualPlay&&!l.stopped){l.play()}})}if(!l.vars.pauseInvisible||!f.pauseInvisible.isHidden()){(l.vars.initDelay>0)?l.startTimeout=setTimeout(l.play,l.vars.initDelay):l.play()}}if(m){f.asNav.setup()}if(j&&l.vars.touch){f.touch()}if(!g||(g&&l.vars.smoothHeight)){a(window).bind("resize orientationchange focus",f.resize)}l.find("img").attr("draggable","false");setTimeout(function(){l.vars.start(l)},200)},asNav:{setup:function(){l.asNav=true;l.animatingTo=Math.floor(l.currentSlide/l.move);l.currentItem=l.currentSlide;l.slides.removeClass(h+"active-slide").eq(l.currentItem).addClass(h+"active-slide");if(!e){l.slides.on(c,function(s){s.preventDefault();var r=a(this),u=r.index();var t;if(l.vars.rtl){t=-1*(r.offset().right-a(l).scrollLeft())}else{t=r.offset().left-a(l).scrollLeft()}if(t<=0&&r.hasClass(h+"active-slide")){l.flexAnimate(l.getTarget("prev"),true)}else{if(!a(l.vars.asNavFor).data("flexslider").animating&&!r.hasClass(h+"active-slide")){l.direction=(l.currentItem<u)?"next":"prev";l.flexAnimate(u,l.vars.pauseOnAction,false,true,true)}}})}else{d._slider=l;l.slides.each(function(){var r=this;r._gesture=new MSGesture();r._gesture.target=r;r.addEventListener("MSPointerDown",function(s){s.preventDefault();if(s.currentTarget._gesture){s.currentTarget._gesture.addPointer(s.pointerId)}},false);r.addEventListener("MSGestureTap",function(t){t.preventDefault();var s=a(this),u=s.index();if(!a(l.vars.asNavFor).data("flexslider").animating&&!s.hasClass("active")){l.direction=(l.currentItem<u)?"next":"prev";l.flexAnimate(u,l.vars.pauseOnAction,false,true,true)}})})}}},controlNav:{setup:function(){if(!l.manualControls){f.controlNav.setupPaging()}else{f.controlNav.setupManual()}},setupPaging:function(){var u=(l.vars.controlNav==="thumbnails")?"control-thumbs":"control-paging",s=1,w,r;l.controlNavScaffold=a('<ol class="'+h+"control-nav "+h+u+'"></ol>');if(l.pagingCount>1){for(var t=0;t<l.pagingCount;t++){r=l.slides.eq(t);if(undefined===r.attr("data-thumb-alt")){r.attr("data-thumb-alt","")}var v=(""!==r.attr("data-thumb-alt"))?v=' alt="'+r.attr("data-thumb-alt")+'"':"";w=(l.vars.controlNav==="thumbnails")?'<img src="'+r.attr("data-thumb")+'"'+v+"/>":'<a href="#">'+s+"</a>";if("thumbnails"===l.vars.controlNav&&true===l.vars.thumbCaptions){var x=r.attr("data-thumbcaption");if(""!==x&&undefined!==x){w+='<span class="'+h+'caption">'+x+"</span>"}}l.controlNavScaffold.append("<li>"+w+"</li>");s++}}(l.controlsContainer)?a(l.controlsContainer).append(l.controlNavScaffold):l.append(l.controlNavScaffold);f.controlNav.set();f.controlNav.active();l.controlNavScaffold.delegate("a, img",c,function(y){y.preventDefault();if(n===""||n===y.type){var z=a(this),A=l.controlNav.index(z);if(!z.hasClass(h+"active")){l.direction=(A>l.currentSlide)?"next":"prev";l.flexAnimate(A,l.vars.pauseOnAction)}}if(n===""){n=y.type}f.setToClearWatchedEvent()})},setupManual:function(){l.controlNav=l.manualControls;f.controlNav.active();l.controlNav.bind(c,function(r){r.preventDefault();if(n===""||n===r.type){var s=a(this),t=l.controlNav.index(s);if(!s.hasClass(h+"active")){(t>l.currentSlide)?l.direction="next":l.direction="prev";l.flexAnimate(t,l.vars.pauseOnAction)}}if(n===""){n=r.type}f.setToClearWatchedEvent()})},set:function(){var r=(l.vars.controlNav==="thumbnails")?"img":"a";l.controlNav=a("."+h+"control-nav li "+r,(l.controlsContainer)?l.controlsContainer:l)},active:function(){l.controlNav.removeClass(h+"active").eq(l.animatingTo).addClass(h+"active")},update:function(r,s){if(l.pagingCount>1&&r==="add"){l.controlNavScaffold.append(a('<li><a href="#">'+l.count+"</a></li>"))}else{if(l.pagingCount===1){l.controlNavScaffold.find("li").remove()}else{l.controlNav.eq(s).closest("li").remove()}}f.controlNav.set();(l.pagingCount>1&&l.pagingCount!==l.controlNav.length)?l.update(s,r):f.controlNav.active()}},directionNav:{setup:function(){var r=a('<ul class="'+h+'direction-nav"><li class="'+h+'nav-prev"><a class="'+h+'prev" href="#">'+l.vars.prevText+'</a></li><li class="'+h+'nav-next"><a class="'+h+'next" href="#">'+l.vars.nextText+"</a></li></ul>");if(l.customDirectionNav){l.directionNav=l.customDirectionNav}else{if(l.controlsContainer){a(l.controlsContainer).append(r);l.directionNav=a("."+h+"direction-nav li a",l.controlsContainer)}else{l.append(r);l.directionNav=a("."+h+"direction-nav li a",l)}}f.directionNav.update();l.directionNav.bind(c,function(s){s.preventDefault();var t;if(n===""||n===s.type){t=(a(this).hasClass(h+"next"))?l.getTarget("next"):l.getTarget("prev");l.flexAnimate(t,l.vars.pauseOnAction)}if(n===""){n=s.type}f.setToClearWatchedEvent()})},update:function(){var r=h+"disabled";if(l.pagingCount===1){l.directionNav.addClass(r).attr("tabindex","-1")}else{if(!l.vars.animationLoop){if(l.animatingTo===0){l.directionNav.removeClass(r).filter("."+h+"prev").addClass(r).attr("tabindex","-1")}else{if(l.animatingTo===l.last){l.directionNav.removeClass(r).filter("."+h+"next").addClass(r).attr("tabindex","-1")}else{l.directionNav.removeClass(r).removeAttr("tabindex")}}}else{l.directionNav.removeClass(r).removeAttr("tabindex")}}}},pausePlay:{setup:function(){var r=a('<div class="'+h+'pauseplay"><a href="#"></a></div>');if(l.controlsContainer){l.controlsContainer.append(r);l.pausePlay=a("."+h+"pauseplay a",l.controlsContainer)}else{l.append(r);l.pausePlay=a("."+h+"pauseplay a",l)}f.pausePlay.update((l.vars.slideshow)?h+"pause":h+"play");l.pausePlay.bind(c,function(s){s.preventDefault();if(n===""||n===s.type){if(a(this).hasClass(h+"pause")){l.manualPause=true;l.manualPlay=false;l.pause()}else{l.manualPause=false;l.manualPlay=true;l.play()}}if(n===""){n=s.type}f.setToClearWatchedEvent()})},update:function(r){(r==="play")?l.pausePlay.removeClass(h+"pause").addClass(h+"play").html(l.vars.playText):l.pausePlay.removeClass(h+"play").addClass(h+"pause").html(l.vars.pauseText)}},touch:function(){var u,v,x,t,G,s,B,r,F,D=false,z=0,A=0,y=0;if(!e){B=function(H){if(l.animating){H.preventDefault()}else{if((window.navigator.msPointerEnabled)||H.touches.length===1){l.pause();t=(i)?l.h:l.w;s=Number(new Date());z=H.touches[0].pageX;A=H.touches[0].pageY;x=(p&&k&&l.animatingTo===l.last)?0:(p&&k)?l.limit-(((l.itemW+l.vars.itemMargin)*l.move)*l.animatingTo):(p&&l.currentSlide===l.last)?l.limit:(p)?((l.itemW+l.vars.itemMargin)*l.move)*l.currentSlide:(k)?(l.last-l.currentSlide+l.cloneOffset)*t:(l.currentSlide+l.cloneOffset)*t;u=(i)?A:z;v=(i)?z:A;d.addEventListener("touchmove",r,false);d.addEventListener("touchend",F,false)}}};r=function(H){z=H.touches[0].pageX;A=H.touches[0].pageY;G=(i)?u-A:(l.vars.rtl?-1:1)*(u-z);D=(i)?(Math.abs(G)<Math.abs(z-v)):(Math.abs(G)<Math.abs(A-v));var I=500;if(!D||Number(new Date())-s>I){H.preventDefault();if(!g&&l.transitions){if(!l.vars.animationLoop){G=G/((l.currentSlide===0&&G<0||l.currentSlide===l.last&&G>0)?(Math.abs(G)/t+2):1)}l.setProps(x+G,"setTouch")}}};F=function(I){d.removeEventListener("touchmove",r,false);if(l.animatingTo===l.currentSlide&&!D&&!(G===null)){var H=(k)?-G:G,J=(H>0)?l.getTarget("next"):l.getTarget("prev");if(l.canAdvance(J)&&(Number(new Date())-s<550&&Math.abs(H)>50||Math.abs(H)>t/2)){l.flexAnimate(J,l.vars.pauseOnAction)}else{if(!g){l.flexAnimate(l.currentSlide,l.vars.pauseOnAction,true)}}}d.removeEventListener("touchend",F,false);u=null;v=null;G=null;x=null};d.addEventListener("touchstart",B,false)}else{d.style.msTouchAction="none";d._gesture=new MSGesture();d._gesture.target=d;d.addEventListener("MSPointerDown",E,false);d._slider=l;d.addEventListener("MSGestureChange",C,false);d.addEventListener("MSGestureEnd",w,false);function E(H){H.stopPropagation();if(l.animating){H.preventDefault()}else{l.pause();d._gesture.addPointer(H.pointerId);y=0;t=(i)?l.h:l.w;s=Number(new Date());x=(p&&k&&l.animatingTo===l.last)?0:(p&&k)?l.limit-(((l.itemW+l.vars.itemMargin)*l.move)*l.animatingTo):(p&&l.currentSlide===l.last)?l.limit:(p)?((l.itemW+l.vars.itemMargin)*l.move)*l.currentSlide:(k)?(l.last-l.currentSlide+l.cloneOffset)*t:(l.currentSlide+l.cloneOffset)*t}}function C(K){K.stopPropagation();var H=K.target._slider;if(!H){return}var I=-K.translationX,J=-K.translationY;y=y+((i)?J:I);G=(H.vars.rtl?-1:1)*y;D=(i)?(Math.abs(y)<Math.abs(-I)):(Math.abs(y)<Math.abs(-J));if(K.detail===K.MSGESTURE_FLAG_INERTIA){setImmediate(function(){d._gesture.stop()});return}if(!D||Number(new Date())-s>500){K.preventDefault();if(!g&&H.transitions){if(!H.vars.animationLoop){G=y/((H.currentSlide===0&&y<0||H.currentSlide===H.last&&y>0)?(Math.abs(y)/t+2):1)}H.setProps(x+G,"setTouch")}}}function w(J){J.stopPropagation();var H=J.target._slider;if(!H){return}if(H.animatingTo===H.currentSlide&&!D&&!(G===null)){var I=(k)?-G:G,K=(I>0)?H.getTarget("next"):H.getTarget("prev");if(H.canAdvance(K)&&(Number(new Date())-s<550&&Math.abs(I)>50||Math.abs(I)>t/2)){H.flexAnimate(K,H.vars.pauseOnAction)}else{if(!g){H.flexAnimate(H.currentSlide,H.vars.pauseOnAction,true)}}}u=null;v=null;G=null;x=null;y=0}}},resize:function(){if(!l.animating&&l.is(":visible")){if(!p){l.doMath()}if(g){f.smoothHeight()}else{if(p){l.slides.width(l.computedW);l.update(l.pagingCount);l.setProps()}else{if(i){l.viewport.height(l.h);l.setProps(l.h,"setTotal")}else{if(l.vars.smoothHeight){f.smoothHeight()}l.newSlides.width(l.computedW);l.setProps(l.computedW,"setTotal")}}}}},smoothHeight:function(r){if(!i||g){var s=(g)?l:l.viewport;(r)?s.animate({height:l.slides.eq(l.animatingTo).innerHeight()},r):s.innerHeight(l.slides.eq(l.animatingTo).innerHeight())}},sync:function(r){var t=a(l.vars.sync).data("flexslider"),s=l.animatingTo;switch(r){case"animate":t.flexAnimate(s,l.vars.pauseOnAction,false,true);break;case"play":if(!t.playing&&!t.asNav){t.play()}break;case"pause":t.pause();break}},uniqueID:function(r){r.filter("[id]").add(r.find("[id]")).each(function(){var s=a(this);s.attr("id",s.attr("id")+"_clone")});return r},pauseInvisible:{visProp:null,init:function(){var r=f.pauseInvisible.getHiddenProp();if(r){var s=r.replace(/[H|h]idden/,"")+"visibilitychange";document.addEventListener(s,function(){if(f.pauseInvisible.isHidden()){if(l.startTimeout){clearTimeout(l.startTimeout)}else{l.pause()}}else{if(l.started){l.play()}else{if(l.vars.initDelay>0){setTimeout(l.play,l.vars.initDelay)}else{l.play()}}}})}},isHidden:function(){var r=f.pauseInvisible.getHiddenProp();if(!r){return false}return document[r]},getHiddenProp:function(){var r=["webkit","moz","ms","o"];if("hidden" in document){return"hidden"}for(var s=0;s<r.length;s++){if((r[s]+"Hidden") in document){return r[s]+"Hidden"}}return null}},setToClearWatchedEvent:function(){clearTimeout(q);q=setTimeout(function(){n=""},3000)}};l.flexAnimate=function(s,A,r,x,v){if(!l.vars.animationLoop&&s!==l.currentSlide){l.direction=(s>l.currentSlide)?"next":"prev"}if(m&&l.pagingCount===1){l.direction=(l.currentItem<s)?"next":"prev"}if(!l.animating&&(l.canAdvance(s,v)||r)&&l.is(":visible")){if(m&&x){var y=a(l.vars.asNavFor).data("flexslider");l.atEnd=s===0||s===l.count-1;y.flexAnimate(s,true,false,true,v);l.direction=(l.currentItem<s)?"next":"prev";y.direction=l.direction;if(Math.ceil((s+1)/l.visible)-1!==l.currentSlide&&s!==0){l.currentItem=s;l.slides.removeClass(h+"active-slide").eq(s).addClass(h+"active-slide");s=Math.floor(s/l.visible)}else{l.currentItem=s;l.slides.removeClass(h+"active-slide").eq(s).addClass(h+"active-slide");return false}}l.animating=true;l.animatingTo=s;if(A){l.pause()}l.vars.before(l);if(l.syncExists&&!v){f.sync("animate")}if(l.vars.controlNav){f.controlNav.active()}if(!p){l.slides.removeClass(h+"active-slide").eq(s).addClass(h+"active-slide")}l.atEnd=s===0||s===l.last;if(l.vars.directionNav){f.directionNav.update()}if(s===l.last){l.vars.end(l);if(!l.vars.animationLoop){l.pause()}}if(!g){var t=(i)?l.slides.filter(":first").height():l.computedW,u,w,z;if(p){u=l.vars.itemMargin;z=((l.itemW+u)*l.move)*l.animatingTo;w=(z>l.limit&&l.visible!==1)?l.limit:z}else{if(l.currentSlide===0&&s===l.count-1&&l.vars.animationLoop&&l.direction!=="next"){w=(k)?(l.count+l.cloneOffset)*t:0}else{if(l.currentSlide===l.last&&s===0&&l.vars.animationLoop&&l.direction!=="prev"){w=(k)?0:(l.count+1)*t}else{w=(k)?((l.count-1)-s+l.cloneOffset)*t:(s+l.cloneOffset)*t}}}l.setProps(w,"",l.vars.animationSpeed);if(l.transitions){if(!l.vars.animationLoop||!l.atEnd){l.animating=false;l.currentSlide=l.animatingTo}l.container.unbind("webkitTransitionEnd transitionend");l.container.bind("webkitTransitionEnd transitionend",function(){clearTimeout(l.ensureAnimationEnd);l.wrapup(t)});clearTimeout(l.ensureAnimationEnd);l.ensureAnimationEnd=setTimeout(function(){l.wrapup(t)},l.vars.animationSpeed+100)}else{l.container.animate(l.args,l.vars.animationSpeed,l.vars.easing,function(){l.wrapup(t)})}}else{if(!j){l.slides.eq(l.currentSlide).css({zIndex:1}).animate({opacity:0},l.vars.animationSpeed,l.vars.easing);l.slides.eq(s).css({zIndex:2}).animate({opacity:1},l.vars.animationSpeed,l.vars.easing,l.wrapup)}else{l.slides.eq(l.currentSlide).css({opacity:0,zIndex:1});l.slides.eq(s).css({opacity:1,zIndex:2});l.wrapup(t)}}if(l.vars.smoothHeight){f.smoothHeight(l.vars.animationSpeed)}}};l.wrapup=function(r){if(!g&&!p){if(l.currentSlide===0&&l.animatingTo===l.last&&l.vars.animationLoop){l.setProps(r,"jumpEnd")}else{if(l.currentSlide===l.last&&l.animatingTo===0&&l.vars.animationLoop){l.setProps(r,"jumpStart")}}}l.animating=false;l.currentSlide=l.animatingTo;l.vars.after(l)};l.animateSlides=function(){if(!l.animating&&b){l.flexAnimate(l.getTarget("next"))}};l.pause=function(){clearInterval(l.animatedSlides);l.animatedSlides=null;l.playing=false;if(l.vars.pausePlay){f.pausePlay.update("play")}if(l.syncExists){f.sync("pause")}};l.play=function(){if(l.playing){clearInterval(l.animatedSlides)}l.animatedSlides=l.animatedSlides||setInterval(l.animateSlides,l.vars.slideshowSpeed);l.started=l.playing=true;if(l.vars.pausePlay){f.pausePlay.update("pause")}if(l.syncExists){f.sync("play")}};l.stop=function(){l.pause();l.stopped=true};l.canAdvance=function(t,r){var s=(m)?l.pagingCount-1:l.last;return(r)?true:(m&&l.currentItem===l.count-1&&t===0&&l.direction==="prev")?true:(m&&l.currentItem===0&&t===l.pagingCount-1&&l.direction!=="next")?false:(t===l.currentSlide&&!m)?false:(l.vars.animationLoop)?true:(l.atEnd&&l.currentSlide===0&&t===s&&l.direction!=="next")?false:(l.atEnd&&l.currentSlide===s&&t===0&&l.direction==="next")?false:true};l.getTarget=function(r){l.direction=r;if(r==="next"){return(l.currentSlide===l.last)?0:l.currentSlide+1}else{return(l.currentSlide===0)?l.last:l.currentSlide-1}};l.setProps=function(u,r,s){var t=(function(){var w=(u)?u:((l.itemW+l.vars.itemMargin)*l.move)*l.animatingTo,v=(function(){if(p){return(r==="setTouch")?u:(k&&l.animatingTo===l.last)?0:(k)?l.limit-(((l.itemW+l.vars.itemMargin)*l.move)*l.animatingTo):(l.animatingTo===l.last)?l.limit:w}else{switch(r){case"setTotal":return(k)?((l.count-1)-l.currentSlide+l.cloneOffset)*u:(l.currentSlide+l.cloneOffset)*u;case"setTouch":return(k)?u:u;case"jumpEnd":return(k)?u:l.count*u;case"jumpStart":return(k)?l.count*u:u;default:return u}}}());return(v*((l.vars.rtl)?1:-1))+"px"}());if(l.transitions){t=(i)?"translate3d(0,"+t+",0)":"translate3d("+((l.vars.rtl?-1:1)*parseInt(t)+"px")+",0,0)";s=(s!==undefined)?(s/1000)+"s":"0s";l.container.css("-"+l.pfx+"-transition-duration",s);l.container.css("transition-duration",s)}l.args[l.prop]=t;if(l.transitions||s===undefined){l.container.css(l.args)}l.container.css("transform",t)};l.setup=function(s){if(!g){var t,r;if(s==="init"){l.viewport=a('<div class="'+h+'viewport"></div>').css({overflow:"hidden",position:"relative"}).appendTo(l).append(l.container);l.cloneCount=0;l.cloneOffset=0;if(k){r=a.makeArray(l.slides).reverse();l.slides=a(r);l.container.empty().append(l.slides)}}if(l.vars.animationLoop&&!p){l.cloneCount=2;l.cloneOffset=1;if(s!=="init"){l.container.find(".clone").remove()}l.container.append(f.uniqueID(l.slides.first().clone().addClass("clone")).attr("aria-hidden","true")).prepend(f.uniqueID(l.slides.last().clone().addClass("clone")).attr("aria-hidden","true"))}l.newSlides=a(l.vars.selector,l);t=(k)?l.count-1-l.currentSlide+l.cloneOffset:l.currentSlide+l.cloneOffset;if(i&&!p){l.container.height((l.count+l.cloneCount)*200+"%").css("position","absolute").width("100%");setTimeout(function(){l.newSlides.css({display:"block"});l.doMath();l.viewport.height(l.h);l.setProps(t*l.h,"init")},(s==="init")?100:0)}else{l.container.width((l.count+l.cloneCount)*200+"%");l.setProps(t*l.computedW,"init");setTimeout(function(){l.doMath();if(l.vars.rtl){l.newSlides.css({width:l.computedW,marginRight:l.computedM,"float":"left",display:"block"})}else{l.newSlides.css({width:l.computedW,marginRight:l.computedM,"float":"left",display:"block"})}if(l.vars.smoothHeight){f.smoothHeight()}},(s==="init")?100:0)}}else{if(l.vars.rtl){l.slides.css({width:"100%","float":"right",marginLeft:"-100%",position:"relative"})}else{l.slides.css({width:"100%","float":"left",marginRight:"-100%",position:"relative"})}if(s==="init"){if(!j){if(l.vars.fadeFirstSlide==false){l.slides.css({opacity:0,display:"block",zIndex:1}).eq(l.currentSlide).css({zIndex:2}).css({opacity:1})}else{l.slides.css({opacity:0,display:"block",zIndex:1}).eq(l.currentSlide).css({zIndex:2}).animate({opacity:1},l.vars.animationSpeed,l.vars.easing)}}else{l.slides.css({opacity:0,display:"block",webkitTransition:"opacity "+l.vars.animationSpeed/1000+"s ease",zIndex:1}).eq(l.currentSlide).css({opacity:1,zIndex:2})}}if(l.vars.smoothHeight){f.smoothHeight()}}if(!p){l.slides.removeClass(h+"active-slide").eq(l.currentSlide).addClass(h+"active-slide")}l.vars.init(l)};l.doMath=function(){var r=l.slides.first(),t=l.vars.itemMargin,u=l.vars.minItems,s=l.vars.maxItems;l.w=(l.viewport===undefined)?l.width():l.viewport.width();l.h=r.height();l.boxPadding=r.outerWidth()-r.width();if(p){l.itemT=l.vars.itemWidth+t;l.itemM=t;l.minW=(u)?u*l.itemT:l.w;l.maxW=(s)?(s*l.itemT)-t:l.w;l.itemW=(l.minW>l.w)?(l.w-(t*(u-1)))/u:(l.maxW<l.w)?(l.w-(t*(s-1)))/s:(l.vars.itemWidth>l.w)?l.w:l.vars.itemWidth;l.visible=Math.floor(l.w/(l.itemW));l.move=(l.vars.move>0&&l.vars.move<l.visible)?l.vars.move:l.visible;l.pagingCount=Math.ceil(((l.count-l.visible)/l.move)+1);l.last=l.pagingCount-1;l.limit=(l.pagingCount===1)?0:(l.vars.itemWidth>l.w)?(l.itemW*(l.count-1))+(t*(l.count-1)):((l.itemW+t)*l.count)-l.w-t}else{l.itemW=l.w;l.itemM=t;l.pagingCount=l.count;l.last=l.count-1}l.computedW=l.itemW-l.boxPadding;l.computedM=l.itemM};l.update=function(s,r){l.doMath();if(!p){if(s<l.currentSlide){l.currentSlide+=1}else{if(s<=l.currentSlide&&s!==0){l.currentSlide-=1}}l.animatingTo=l.currentSlide}if(l.vars.controlNav&&!l.manualControls){if((r==="add"&&!p)||l.pagingCount>l.controlNav.length){f.controlNav.update("add")}else{if((r==="remove"&&!p)||l.pagingCount<l.controlNav.length){if(p&&l.currentSlide>l.last){l.currentSlide-=1;l.animatingTo-=1}f.controlNav.update("remove",l.last)}}}if(l.vars.directionNav){f.directionNav.update()}};l.addSlide=function(r,t){var s=a(r);l.count+=1;l.last=l.count-1;if(i&&k){(t!==undefined)?l.slides.eq(l.count-t).after(s):l.container.prepend(s)}else{(t!==undefined)?l.slides.eq(t).before(s):l.container.append(s)}l.update(t,"add");l.slides=a(l.vars.selector+":not(.clone)",l);l.setup();l.vars.added(l)};l.removeSlide=function(r){var s=(isNaN(r))?l.slides.index(a(r)):r;l.count-=1;l.last=l.count-1;if(isNaN(r)){a(r,l.slides).remove()}else{(i&&k)?l.slides.eq(l.last).remove():l.slides.eq(r).remove()}l.doMath();l.update(s,"remove");l.slides=a(l.vars.selector+":not(.clone)",l);l.setup();l.vars.removed(l)};f.init()};a(window).blur(function(c){b=false}).focus(function(c){b=true});a.flexslider.defaults={namespace:"flex-",selector:".slides > li",animation:"fade",easing:"swing",direction:"horizontal",reverse:false,animationLoop:true,smoothHeight:false,startAt:0,slideshow:true,slideshowSpeed:7000,animationSpeed:600,initDelay:0,randomize:false,fadeFirstSlide:true,thumbCaptions:false,pauseOnAction:true,pauseOnHover:false,pauseInvisible:true,useCSS:true,touch:true,video:false,controlNav:true,directionNav:true,prevText:"Previous",nextText:"Next",keyboard:true,multipleKeyboard:false,mousewheel:false,pausePlay:false,pauseText:"Pause",playText:"Play",controlsContainer:"",manualControls:"",customDirectionNav:"",sync:"",asNavFor:"",itemWidth:0,itemMargin:0,minItems:1,maxItems:0,move:0,allowOneSlide:true,start:function(){},before:function(){},after:function(){},end:function(){},added:function(){},removed:function(){},init:function(){},rtl:false};a.fn.flexslider=function(c){if(c===undefined){c={}}if(typeof c==="object"){return this.each(function(){var g=a(this),e=(c.selector)?c.selector:".slides > li",f=g.find(e);if((f.length===1&&c.allowOneSlide===false)||f.length===0){f.fadeIn(400);if(c.start){c.start(g)}}else{if(g.data("flexslider")===undefined){new a.flexslider(this,c)}}})}else{var d=a(this).data("flexslider");switch(c){case"play":d.play();break;case"pause":d.pause();break;case"stop":d.stop();break;case"next":d.flexAnimate(d.getTarget("next"),true);break;case"prev":case"previous":d.flexAnimate(d.getTarget("prev"),true);break;default:if(typeof c==="number"){d.flexAnimate(c,true)}}}}})(jQuery);