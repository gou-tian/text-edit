(function(window){
	function Editor(opits){
		this.opit = {
			// 按钮元素
			but: opits.but,
			// 编辑区域
			edit: opits.edit,
			// 源代码区域
			code: opits.code,
			// 索引值
			index: opits.index,
			// 事件名
			events: opits.events || 'click'
		};
		this.elemTagName = ['h1','h2','h3','h4',
							'strong','em','del',
							'a','img','ul','ol',
							'hr'];
		this.align = ['left','center','right'];
	}
	Editor.prototype = {
		constructor: Editor,
		on: tian.on,
		off: tian.off,
		getSeat: tian.seat,
		// 初始化
		init: function(){},
		// 内容替换
		replace: function(curVal,tarVal,val){
			if(tarVal === -1) { return false;}
			return curVal.replace(new RegExp(val,'g'));
		},
		// 清空
		empty: function(){
			this.opit.edit.innerHTML = '';
		},
		// 事件执行封装
		extEvent: function(elem,func){
			this.on(elem,this.opit.events,func);
		},
		// 删除事件
		removeEvenet: function(elem,func){
			this.off(elem,this.opit.events,func);
		},
		// 添加按钮事件
		addActionEvent: function(){},
		// 添加标签
		addElementsTab: function(){},
		// 创建标签
		createElementsTab: function(){
			var tab = this.elemTagName;
			var len = tab.length;
			var tabStr = '', img = null, link = null,
				listTab = '', num = 0;

		},
		// 创建图片
		createImageElements: function(imgAttr){
			var opit = {
				src: imgAttr.src,
				alt: imgAttr.alt || 'Photo',
				width: imgAttr.width || '300',
				height: imgAttr.height || '150',
				title: imgAttr.title || 'Photo',
				insert: imgAttr.insert || this
			};
			var img = new Image();
			img.src = opit.src;
			img.alt = opit.alt;
			img.width = opit.width;
			img.height = opit.height;
			img.title = opit.title;
			img.onload = function(){
				insert.appendChild(img);
			};
			img.onerror = function(){
				alert('图片加载失败!请检查图片地址是否正确!');
			};
		},
		// 创建超链接
		createLink: function(src,str){
			var link = '<a href="' + src + '">' + str + '</a>';
			return link;
		},
		// 创建链接写入窗口
		createLinkWindow: function(){
			
		},
		// 获取选中内容
		getContentChoice: function(){
			var start = this.getAxis().start;
			var end = this.getAxis().end;
			return this.opit.edit.value.substring(start,end);
		},
		// 获取坐标
		getAxis: function(){
			var axisStart = this.getSeat.call(this.opit.txtElem).start;
            var axisEnd = this.getSeat.call(this.opit.txtElem).end;
            return {
                start: axisStart,
                end: axisEnd
            };
		},
		// 显示内容源码
		showCode: function(){}
	};

	function id(id){
		return document.getElementById(id);
	}
	function tagName(id,tagName){
		return id.getElementsByTagName(tagName);
	}

	// 功能按钮
	var editBut = tagName(id('J-tian-editor-but'),'li');
}(window));