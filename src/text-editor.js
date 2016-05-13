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
			// 链接
			link: opits.link,
			// 图片地址
			imgLink: opits.imgLink,
			// 拖拽
			drag: opits.drag || false,
			// 事件名
			events: opits.events || 'click'
		};
		this.elemTagName = ['strong','em','u','del','img','left',
												'center','right','ul','ol','hr'];
		this.align = ['left','center','right'];
	}

	Editor.prototype = {
		constructor: Editor,
		extEvent: tian.on,
		removeEvenet: tian.off,
		getSeat: tian.seat,
		// 初始化
		init: function(){
			var that = this;
			for(var i = 0; i < this.opit.index; i++){
				this.opit.but[i].index = i;
				this.on(this.opit.but[i],function(){
					that.addActionEvent.call(that,this.index);
				});
			}
		},
		// 内容替换
		replace: function(str,tarVal,val){
			return str.replace(new RegExp(tarVal,'g'),val);
		},
		// 清空
		empty: function(){
			this.opit.edit.innerHTML = '';
		},
		// 事件执行封装
		on: function(elem,func){
			this.extEvent(elem,this.opit.events,func);
		},
		// 删除事件
		off: function(elem,func){
			this.removeEvenet(elem,this.opit.events,func);
		},
		// 添加按钮事件
		addActionEvent: function(index){
			this.addElementsTab.call(this,index);
		},
		// 添加标签
		addElementsTab: function(index){
			this.createElementsTab(index);
		},
		// 创建标签
		createElementsTab: function(index){
			var tab = this.elemTagName;
			var len = tab.length;
			var str = '<'+ tab[index-3] +'>' +
						this.getContentChoice() +
					  '</'+ tab[index-3] +'>';

				if(index < 3 || index > 7 && index < 11 || index >13){
					switch (index) {
						case 0:
							this.codeShow();
							break;
						case 1:
							// statements_1
							break;
						case 2:
							// statements_1
							break;
						case 8:
							// statements_1
							break;
						case 9:
							// statements_1
							break;
						case 10:
							// statements_1
							break;
						case 14:
							// statements_1
							break;
						case 15:
							// statements_1
							break;
					}
				}else {
					switch (tab[index-3]) {
						case 'img':
							var src = prompt('请输入图片地址');
							if(src){
								this.createImageElements.call(this,{
									src: src
								});
							}else {
								return false;
							}
							break;
						case 'a':
							console.log(tab[index-3],'a');
							console.log(str);
							break;
						default:
							this.opit.edit.innerHTML = this.replace(
									this.opit.edit.innerHTML,
									this.getContentChoice(),
									str
								);
							break;
					}
				}
		},
		// 创建图片
		createImageElements: function(imgAttr){
			var opit = {
				src: imgAttr.src,
				alt: imgAttr.alt || 'Photo',
				width: imgAttr.width || '200',
				height: imgAttr.height || '150',
				title: imgAttr.title || 'Photo',
				insert: imgAttr.insert || this.opit.edit
			};
			var start = this.getAxis().start;
			var end = this.getAxis().end;
			var that = this;
			var img = new Image();
			img.src = opit.src;
			img.alt = opit.alt;
			img.width = opit.width;
			img.height = opit.height;
			img.title = opit.title;
			img.onload = function(){
				opit.insert.appendChild(img);
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
		// 获取选中内容
		getContentChoice: function(){
			var start = this.getAxis().start;
			var end = this.getAxis().end;
			if (this.opit.edit.innerHTML) {
				return this.opit.edit.innerHTML.substring(start,end);
			} else {
				return this.opit.edit.value.substring(start,end);
			}
		},
		// 获取坐标
		getAxis: function(){
			var axisStart = this.getSeat.call(this.opit.edit).start;
            var axisEnd = this.getSeat.call(this.opit.edit).end;
            return {
                start: axisStart,
                end: axisEnd
            };
		},
		// 源码显示/隐藏
		codeShow: function(){
			if (this.opit.code.parentNode.style.display === 'none' ||
			  this.opit.code.parentNode.style.display === '') {
				this.opit.code.parentNode.style.display = 'block';
				this.opit.code.value = this.opit.edit.innerHTML;
				this.opit.edit.style.display = 'none';
			} else {
				this.opit.edit.innerHTML = this.opit.code.value;
				this.opit.code.parentNode.style.display = 'none';
				this.opit.edit.style.display = 'block';
			}
		}
	};
	function id(idName){
		return document.getElementById(idName);
	}
	function tagName(id,tagName){
		return id.getElementsByTagName(tagName);
	}
	function edit(opis){
		return new Editor(opis);
	}

	// 功能按钮
	var editBut = tagName(id('J-tian-edit-but'),'li');
	// 内容编辑区
	var editArea = id('J-tian-edit-area');
	// 源代码展示
	var editCode = id('J-tian-edit-code');
	// 拖拽区域
	var editDrag = id('J-tian-edit-drag');
	// 超链接
	var editLink = id('J-tian-edit-link');
	// 图片链接
	var editImg = id('J-tian-edit-img');

	var divStr = '虽然历史上大部分的初创公司都被西方国家所统治，' +
        '但是从近五年激增的趋势来看，金融科技公司的足迹' +
        '已经遍布全球，股东也来自各个国家，尤其是硅谷。' +
        '如今，亚洲的市场动态和人口多元化创造了一套完全' +
        '不同于美国金融科技企业所面临的机会和挑战，尤其' +
        '是在面向消费者的服务中。';

	editArea.innerHTML = divStr;
	edit({
		but: editBut,
		edit: editArea,
		code: editCode,
		link: editLink,
		imgLink: editImg,
		index: editBut.length,
	}).init();
}(window));