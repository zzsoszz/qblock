(function ($)
{

	
	var  defaultoptions = {
              selector      : this.selector,
			  mode   : "h" , /*h:horizontal  v:vertical  b:both */
			  hvisualsize : 2, 
			  vvisualsize : 1,  
			  actiondivheight:30,
			  actiondivwidth:30
    };
	
	
	$.fn.qblock = function(params)
	{
			var options = $.extend( {}, defaultoptions, params );
			this.each(
				function()
				{
					$(this).data("qblockdata",new Qblock($(this),options ));
				}
			);
			return this;
	};
	
	function Pager(pagesize,itemtotal)
	{
		//当前页
		this.curpage=1;
		//每页多少个元素
		this.pagesize=pagesize;
		//总页数
		this.totalpage=Math.ceil(itemtotal/this.pagesize);
		this.prev=function()
		{
			if(this.isHead())
			{
				return 1;
			}else{
				this.curpage--;
			}
			return this.curpage;
		};
		this.next=function()
		{
			if(this.isEnd())
			{
				return this.curpage;
			}else{
				this.curpage++;
				return this.curpage;
			}
		};
		this.isHead=function()
		{
			if(this.curpage==1)
			{
				return true;
			}else{
				return false;
			}
		};
		this.isEnd=function()
		{
			if(this.curpage==this.totalpage)
			{
				return true;
			}else{
				return false;
			}
		};
		this.moveToHead=function()
		{
			this.curpage=1;
			return this.curpage;
		};
		this.moveToEnd=function()
		{
			this.curpage=this.totalpage;
			return this.curpage;
		};
	}
	;
	
	function Qblock(showtarget, options)
	{
				//qblock初始化
				this.pagerh;
				this.pagerv;
				this.itemwith;
				this.vitemheight;
				this.visualwindow_with;
				this.visualwindow_height;
				
				this.init=function()
				{
					this.itemwith=showtarget.find(".item").first().width();
					this.vitemheight=showtarget.find(".item").first().height();
					this.visualwindow_with=this.itemwith*options.hvisualsize;
					this.visualwindow_height=this.vitemheight*options.vvisualsize;
					this.pagerh=new Pager(options.hvisualsize,showtarget.find(".item").size());
					this.pagerv=new Pager(options.vvisualsize,showtarget.find(".item").size()/options.hvisualsize);
				};
				this.init();
				
				showtarget.addClass("showtarget");
				
				
				var visualwindow=$('<div class="visualwindow">').css({
					"width":this.visualwindow_with+"px",
					"height":this.visualwindow_height+"px",
					"position":"relative",
					"overflow":"hidden"
				});
				
				var componet=$('<div  class="qblock" > ');
				
				
				
				var pass1=true;
				var movedownlink=$('<a href="#" class="btn_prev_vertical"></a>').click(
					function ()
					{
							if(pass1==true)
							{
								pass1=false;
								var e = arguments[0] || window.event;
								var target = e.srcElement ? e.srcElement : e.target;
								
								var compnet=$(target).closest(".qblock");
								var myshowtarget=$(compnet).find(".showtarget");
								var pagerv=myshowtarget.data("qblockdata").pagerv;//Pager
								var vitemheight=myshowtarget.data("qblockdata").vitemheight;
								var page=pagerv.prev();
								page--;
								//console.log((page*pagerv.pagesize*vitemheight));
								$(myshowtarget).animate(
										  {marginTop:-(page*pagerv.pagesize*vitemheight)+"px"}
										  ,100
									      //,"easeOutBounce"
										  ,function () {
												pass1 = true;
										  }
								);
							}
					}
				)
				;
				
				
				var topdiv=$('<div class="topdiv"  style="position:absolute;width:100%;left:0px;" >').css(
					{
						"height":options.actiondivheight+"px",
						"top":"-"+options.actiondivheight+"px",
						"background-color":"transparent"
					}
				);
				var operdiv1=$('<div class="operdiv" style="position:relative;width:100%;height:100%;">');
				operdiv1.append(movedownlink);
				topdiv.append(operdiv1);
				
				var pass2=true;
				var moveuplink=$('<a  href="#" class="btn_next_vertical"></a>').
				click(
					function ()
					{
						if(pass2==true)
						{

							pass2=false;
							var e = arguments[0] || window.event;
							var target = e.srcElement ? e.srcElement : e.target;
							
							var compnet=$(target).closest(".qblock");
							var myshowtarget=$(compnet).find(".showtarget");
							var pagerv=myshowtarget.data("qblockdata").pagerv;//Pager
							var vitemheight=myshowtarget.data("qblockdata").vitemheight;
							var page=pagerv.next();
							page--;
							//console.log((page*pagerv.pagesize*vitemheight));
							$(myshowtarget).animate(
									  {marginTop:-(page*pagerv.pagesize*vitemheight)+"px"}
									  ,100
										//,"easeOutBounce"
									  ,function () {
											pass2 = true;
									  }
							);
							
						}
						return false;
					}
				)
				;
				var bottomdiv=$('<div class="bottomdiv"  style="position:absolute;width:100%;left:0px;" >').css(
					{
						"height":options.actiondivheight+"px",
						"bottom":"-"+options.actiondivheight+"px",
						"background-color":"transparent"
					}
				);
				var operdiv2=$('<div class="operdiv" style="position:relative;width:100%;height:100%;">');
				operdiv2.append(moveuplink);
				bottomdiv.append(operdiv2);
				
				
				var pass3=true;
				var moverightlink=$('<a  href="#" class="btn_prev"></a>').click(
					function ()
					{
						//console.log(pass3);
						if(pass3==true)
						{
							pass3=false;
							var e = arguments[0] || window.event;
							var target = e.srcElement ? e.srcElement : e.target;
							
							var compnet=$(target).closest(".qblock");
							var myshowtarget=$(compnet).find(".showtarget");
							var pagerh=myshowtarget.data("qblockdata").pagerh;//Pager
							var itemwith=myshowtarget.data("qblockdata").itemwith;
							var page=pagerh.prev();
							page--;
							//console.log((page*pagerh.pagesize*itemwith));
							$(myshowtarget).animate(
									  {marginLeft:-(page*pagerh.pagesize*itemwith)+"px"}
									  ,100
										//,"easeOutBounce"
									  ,function () {
											pass3 = true;
									  }
							);
							
						}
						return false;
					}
				);
				var rightdiv=$('<div class="rightdiv"  style="position:absolute;height:100%;top:0px;" >').css(
					{
						"width":options.actiondivwidth+"px",
						"left":"-"+options.actiondivwidth+"px",
						"background-color":"transparent"
					}
				);
				var operdiv3=$('<div class="operdiv" style="position:relative;width:100%;height:100%;">');
				operdiv3.append(moverightlink);
				rightdiv.append(operdiv3);
				
				var pass4=true;
				var moveleftlink=$('<a  href="#" class="btn_next"></a>').click(
					function ()
					{
						//console.log(pass4);
						if(pass4==true)
						{
							pass4=false;
							var e = arguments[0] || window.event;
							var target = e.srcElement ? e.srcElement : e.target;
							var compnet=$(target).closest(".qblock");
							var myshowtarget=$(compnet).find(".showtarget");
							
							var pagerh=myshowtarget.data("qblockdata").pagerh;//Pager
							var itemwith=myshowtarget.data("qblockdata").itemwith;
							var page=pagerh.next();
							page--;
							//console.log((page*pagerh.pagesize*itemwith));
							$(myshowtarget).animate(
									  {marginLeft:-(page*pagerh.pagesize*itemwith)+"px"}
									  ,100
									  //,"easeOutBounce"
									  ,function () {
											pass4 = true;
									  }
							);
						}
						return false;
					}
				);
				var leftdiv=$('<div class="leftdiv"  style="position:absolute;height:100%;top:0px;" >').css(
					{
						"width":options.actiondivwidth+"px",
						"right":"-"+options.actiondivwidth+"px",
						"background-color":"transparent"
					}
				);
				var operdiv4=$('<div class="operdiv" style="position:relative;width:100%;height:100%;">');
				operdiv4.append(moveleftlink);
				leftdiv.append(operdiv4);
				
				
				var actionwindow=$('<div class="actionwindow">');
				
				if(options.mode=="h" || options.mode=="b")
				{
					
					actionwindow.append(rightdiv).append(leftdiv);
				}
				if(options.mode=="v" || options.mode=="b")
				{
					
					actionwindow.append(topdiv).append(bottomdiv);
				}
				
				
				var pass7=true;
				this.startAutoPage=function(showtarget)
				{
						showtarget.everyTime('5s',
							function()
							{
									if(pass7==true)
									{
										pass7=false;
										if(options.mode=='h' || options.mode=='b' )
										{
											var pager=showtarget.data("qblockdata").pagerh;//Pager
											var itemwith=showtarget.data("qblockdata").itemwith;
											var page;
											if(pager.isEnd())
											{
												page=pager.moveToHead();
											}else{
												page=pager.next();
											}
											page--;
											//console.log((page*pager.pagesize*itemwith));
											$(showtarget).animate(
													  {marginLeft:-(page*pager.pagesize*itemwith)+"px"}
													  ,100
													  //,"easeOutBounce"
													  ,function () {
															pass7 = true;
													  }
											);
										}else{
											var pager=showtarget.data("qblockdata").pagerv;//Pager
											var vitemheight=showtarget.data("qblockdata").vitemheight;
											var page;
											if(pager.isEnd())
											{
												page=pager.moveToHead();
											}else{
												page=pager.next();
											}
											page--;
											$(showtarget).animate(
													  {marginLeft:-(page*pager.pagesize*vitemheight)+"px"}
													  ,100
													  //,"easeOutBounce"
													  ,function () {
															pass7 = true;
													  }
											);
										}
									}
							}
						);
				};
				
				
				
				this.stopAutoPage=function(showtarget)
				{
					showtarget.stopTime();
				};
				
				
				componet.mouseout(
							function()
							{
								var e = arguments[0] || window.event;
								var target = e.srcElement ? e.srcElement : e.target;
								var compnet=$(target).closest(".qblock");
								var myshowtarget=$(compnet).find(".showtarget");
								myshowtarget.data("qblockdata").startAutoPage(myshowtarget);
							}
						).mouseover(
							function ()
							{
								var e = arguments[0] || window.event;
								var target = e.srcElement ? e.srcElement : e.target;
								var compnet=$(target).closest(".qblock");
								var myshowtarget=$(compnet).find(".showtarget");
								myshowtarget.data("qblockdata").stopAutoPage(myshowtarget);
							}
				);
				
				this.createNav=function(mode,pager)
				{
					var nav=$('<div>');
					nav.addClass("navigation_"+mode);
					var n_ul=$("<ul>");
					for(var i=1;i<=pager.totalpage;i++)
					{
						n_ul.append($('<li>'+i+'</li>'));
					}
					nav.append(n_ul);
					return nav;
				};
				var navh=this.createNav('h',this.pagerh);
				var navv=this.createNav('v',this.pagerv);
				
				
				componet.css(
					{
						"width":this.visualwindow_with+"px",
						"height":this.visualwindow_height+"px",
						"margin-left":+options.actiondivwidth+"px",
						"margin-right":+options.actiondivwidth+"px",
						"margin-top":+options.actiondivheight+"px",
						"margin-bottom":+options.actiondivheight+"px",
						"position":"relative"
					}
				);
				componet.append(navh);
				componet.append(navv);
				componet.append(visualwindow);
				componet.append(actionwindow);
				
				
				
				showtarget.after(componet);
				showtarget.appendTo(visualwindow);
				this.startAutoPage(showtarget);
				
	}
	
	
}
)(jQuery)