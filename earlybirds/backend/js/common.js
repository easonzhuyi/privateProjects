(function($){
    $.fn.iSimulateSelect = function(iSet){
     iSet = $.extend({
      selectBoxCls:'i_selectbox',     //string类型,外围class名
   curSCls:'i_currentselected',    //string类型，默认显示class名
   optionCls:'i_selectoption',     //string类型，下拉列表class名
   selectedCls:'selected',         //string类型，当前选中class名
   width:222,                      //number类型，模拟select的宽度
   height:300,                     //number类型，模拟select的高度
   zindex:20                      //层级顺序
  },iSet||{});
  this.hide();
  return this.each(function(){
      var self = $(this);
   var thisCurVal,thisSelect,cIndex=0;
   var html = '<div class="'+iSet.selectBoxCls+'" style="z-index:'+iSet.zindex+'"><div class="i_arrow"><span class="down_arrow"></span></div><div class="'+iSet.curSCls+'" style="width:'+iSet.width+'px">'+$(self).find('option:selected').text()+'</div><dl class="'+iSet.optionCls+'" style="display:none;width:'+iSet.width+'px">';
   //判断select中是否有optgroup
   //用dt替代optgroup，用dd替代option
   if($(self).find('optgroup').size() > 0){
       $(this).find('optgroup').each(function(){
        html+='<dt>'+$(this).attr('label')+'</dt>';
     $(this).find('option').each(function(){
         if($(this).is(':selected')){
          html+='<dd class="'+iSet.selectedCls+'">'+$(this).text()+'</dd>';
      }else{
          html+='<dd>'+$(this).text()+'</dd>';
         }
     });
    });
   }else{
       $(this).find('option').each(function(){
        if($(this).is(':selected')){
         html+='<dd class="'+iSet.selectedCls+'">'+$(this).text()+'</dd>';
     }else{
         html+='<dd>'+$(this).text()+'</dd>';
     }
    });
   }
   //将模拟的dl插到select后面
   $(self).after(html);
   //当前模拟select外围box元素
   thisBox = $(self).next('.'+iSet.selectBoxCls);
   //当前模拟select初始值元素
   thisCurVal = thisBox.find('.'+iSet.curSCls);
   //当前模拟select列表
   thisSelect=thisBox.find('.'+iSet.optionCls);
   //计算模拟select宽度
   if(iSet.width == 0){
       thisCurVal.width($(self).width())
       thisSelect.width($(self).width())
   }

   //若同意页面还有其他原生select
   /*<thisSelect class="bgi"></thisSelect>frame();*/

   //弹出模拟下拉列表
   thisCurVal.click(function(){
       //alert('test');
       $('.'+iSet.optionCls).hide();
    $('.'+iSet.selectBoxCls).css('zIndex',iSet.zindex);
    $(self).next('.'+iSet.selectBoxCls).css('zIndex',iSet.zindex+1);
    //alert(thisSelect.html());
    thisSelect.show();
   });

   //若模拟select高度超出限定高度，则自动overflow-y：auto
   if(thisSelect.height()>iSet.height){
       thisSelect.height(iSet.height);
   }
   //模拟列表点击事件-赋值-改变y坐标位置
   thisSelect.find('dd').click(function(){
       $(this).addClass(iSet.selectedCls).siblings().removeClass(iSet.selectedCls);
    cIndex = thisSelect.find('dd').index(this);
    thisCurVal.text($(this).text());
    $(self).find('option').removeAttr('selected').eq(cIndex).attr('selected','selected');
    $('.'+iSet.selectBoxCls).css('zindex',iSet.zindex);
    thisSelect.hide();
   })
   //非模拟列表处点击隐藏模拟列表
   $('html,body').click(function(e){
       if(e.target.className.indexOf(iSet.curSCls)==-1){
       thisSelect.hide();
       $('.'+iSet.selectBoxCls).css('zIndex',iSet.zindex);
    }
   });
   //取消模块列表处默认点击事件
   thisSelect.click(function(e){
       e.stopPropagation();
   });
   //alert("a")
  });
 }
  $.fn.showDetail = function($) {
    var that = $(this);
    that.bind("click",function(){
      $(this).parents(".unit").children(".ulAttached").toggle();
    })


  }
})(jQuery);

jQuery.jqtab = function(tabtit,tab_conbox,shijian) {
		$(tab_conbox).find(".none").hide();
		$(tabtit).find(".toc:first").addClass("selected").show();
		$(tab_conbox).find(".none:first").show();

		$(tabtit).find(".toc").bind(shijian,function(){
		  $(this).addClass("selected").siblings(".toc").removeClass("selected");
			var activeindex = $(tabtit).find(".toc").index(this);
			$(tab_conbox).children().eq(activeindex).show().siblings().hide();
			return false;
		});
	};

