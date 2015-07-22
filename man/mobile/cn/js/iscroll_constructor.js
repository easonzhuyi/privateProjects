var getLoader;
(function() {

  var firstresult = 0;
  var pagesize = 20;
  var stocktype = 0;

  var myScroll;
  var pullDownEl, pullDownL;
  var pullDownc, pullUpc;
  var pullUpEl, pullUpL;
  var Downcount = 0,
    Upcount = 0;
  var loadingStep = 0; //加载状态0默认，1显示加载状态，2执行加载数据，只有当为0时才能再次加载，这是防止过快拉动刷新

  function pullDownAction() { //下拉事件
    setTimeout(function() {
      var el, li, i;
      //plus.nativeUI.showWaiting();
      console.log('触发了下拉更多');
      pullDownL.innerHTML = '下拉显示更多...';
      initData(stocktype);
      loadingStep = 0;
      //plus.nativeUI.closeWaiting();
    }, 1000); //1秒
  }

  function pullUpAction() { //上拉事件
    setTimeout(function() {
      var el, li, i;
      console.log('触发了上拉刷新事件');
      pullUpL.innerHTML = '上拉显示更多...';
      nextPage(stocktype);
      //myScroll.refresh();
      loadingStep = 0;
    }, 1000);
  }

  getLoader = function() {
    return function loaded(idname) {
      pullDownEl = document.getElementById(idname + '-pullDown');
      pullDownL = document.getElementById(idname + '-pullDownLabel');

      pullDownEl['class'] = pullDownEl.className;
      // pullDownEl.className = '';
      // pullDownEl.style.display = 'NONE';

      pullUpEl = document.getElementById(idname + '-pullUp');
      pullUpL = document.getElementById(idname + '-pullUpLabel');
      pullUpEl['class'] = pullUpEl.className;
      // pullUpEl.style.display = 'NONE';

      myScroll = new IScroll('#' + idname + '-wrapper', {
        probeType: 2, //probeType：1对性能没有影响。在滚动事件被触发时，滚动轴是不是忙着做它的东西。probeType：2总执行滚动，除了势头，反弹过程中的事件。这类似于原生的onscroll事件。probeType：3发出的滚动事件与到的像素精度。注意，滚动被迫requestAnimationFrame（即：useTransition：假）。
        scrollbars: false, //有滚动条
        mouseWheel: true, //允许滑轮滚动
        fadeScrollbars: false, //滚动时显示滚动条，默认影藏，并且是淡出淡入效果
        bounce: true, //边界反弹
        interactiveScrollbars: true, //滚动条可以拖动
        shrinkScrollbars: 'scale', // 当滚动边界之外的滚动条是由少量的收缩。'clip' or 'scale'.
        click: true, // 允许点击事件
        keyBindings: true, //允许使用按键控制
        momentum: true // 允许有惯性滑动
      });

      //滚动时
      myScroll.on('scroll', function() {
        if (loadingStep === 0 && !pullDownEl.className.match('flip') && !pullUpEl.className.match('flip')) {
          if (this.y > 40) {
            //下拉刷新效果
            // pullDownEl.style.display = '';
            // myScroll.refresh();
            pullDownEl.className += ' flip';
            pullDownL.innerHTML = '准备刷新...';
            loadingStep = 1;
            // console.log('up');
          } else if (this.y < (this.maxScrollY - 40)) {
            //上拉刷新效果
            // pullUpEl.style.display = '';
            // myScroll.refresh();
            pullUpEl.className += ' flip';
            pullUpL.innerHTML = '准备刷新...';
            loadingStep = 1;
            // console.log('down');
          }
        }
      });
      //滚动完毕
      myScroll.on('scrollEnd', function() {
        if (loadingStep == 1) {
          if (pullUpEl.className.match('flip')) {
            pullUpEl.className = 'loading_bd';
            pullUpL.innerHTML = 'Loading...';
            loadingStep = 2;
            pullUpAction();
            console.log('end down');
          } else if (pullDownEl.className.match('flip')) {
            pullDownEl.className = 'loading_hd';
            pullDownL.innerHTML = 'Loading...';
            loadingStep = 2;
            pullDownAction();
            // console.log('end up');
          }
        }
      });
      //初始化数据
      initData();
    };
  };

  function initData() {
    firstresult = 0;
    getData('0', stocktype);
    //document.getElementById("dataList").innerHTML ='';
    //refresh
    myScroll.refresh();
  }

  function nextPage() {
    firstresult += pagesize;
    getData('1', stocktype);
    myScroll.refresh();
  }

  function getData(flag) {
    var url = '';

    // JSONP({
    //     url: url,
    //     data: {
    //         firstresult: firstresult,
    //         maxcount: pagesize
    //     },
    //     success: function(data) {
    //
    //         var source = document.getElementById("contact-template").innerHTML;
    //         var template = Handlebars.compile(source);
    //         var wos = {
    //             wos: data.result
    //         };
    //         if (flag == '1') {
    //             document.getElementById("dataList").innerHTML += template(wos);
    //         } else {
    //             document.getElementById("dataList").innerHTML = template(wos);
    //         }
    //
    //     },
    //     error: function(data) {
    //         console.log(objToString(data));
    //     }
    // });
  }
})()
