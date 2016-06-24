(function ($)
{
	$.fn.qblock=function(options)
	{
		var settings = $.extend({
			  selector      : this.selector,
			  mode   : "b" ,
			  hvisualsize : 1, //横向视窗展示的元素个数
			  vvisualsize : 1,  //纵向视窗展示的元素个数
			  actiondivheight:"50px",
			  actiondivwidth:"50px"
			  /*h:horizontal  v:vertical  b:both */
		}, options);
		
		$(this).each(
			function ()
			{
				
				var showtarget=$(this);
				
				

				
				var itemwith=showtarget.find(".item").first().width();
				var vitemheight=showtarget.find(".item").first().height();
				var visualwindow_with=itemwith*settings.hvisualsize;
				var visualwindow_height=vitemheight*settings.vvisualsize;
				var visualwindow=$('<div class="visualwindow">').css({
					"width":visualwindow_with+"px",
					"height":visualwindow_height+"px",
					"position":"relative",
					"overflow":"hidden"
				});
				
				//分页数据
				var componet=$('<div  class="qblock" > ').css(
					{
						"width":visualwindow_with+"px",
						"height":visualwindow_height+"px",
						"position":"relative"
					}
				);
				
				var pagesize=settings.hvisualsize;
				var pagetotal=Math.ceil(showtarget.find(".item").size()/pagesize);
				var vpagesize=settings.vvisualsize;
				var vpagetotal=Math.ceil(showtarget.find(".item").size()/vpagesize/pagesize);//加上pagesize是为了横向可以排多个
				componet.data("itemwith",itemwith);
				componet.data("vitemheight",vitemheight);
				componet.data("pagesize",pagesize);//每页多少个-横向
				componet.data("vpagesize",vpagesize);//每页多少个-纵向
				componet.data("pagetotal",pagetotal);//总页数-横向
				componet.data("vpagetotal",vpagetotal);//总页数-纵向
				componet.data("curpage",1);//当前页-横向
				componet.data("vcurpage",1);//当前页-纵向
				
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
								
								var itemwith=compnet.data("itemwith");
								var vitemheight=compnet.data("vitemheight");
								var pagesize=compnet.data("pagesize");
								var vpagesize=compnet.data("vpagesize");
								var pagetotal=compnet.data("pagetotal");
								var vpagetotal=compnet.data("vpagetotal");
								var curpage=compnet.data("curpage");
								var vcurpage=compnet.data("vcurpage");
								
								if(1<vcurpage && vcurpage<=vpagetotal)
								{
									$(myshowtarget).animate(
										  {marginTop:( parseInt(myshowtarget.css("margin-top"),10)+ (vitemheight*vpagesize) )+"px"}
										  ,function () {
												pass1 = true;
										  }
									);
									vcurpage--;
									compnet.data("vcurpage",vcurpage);//当前页-纵向
								}
								else{
									pass1 = true;
								}
							}
							return false;
					}
				)
				;
				
				
				var topdiv=$('<div class="topdiv"  style="position:absolute;width:100%;left:0px;" >').css(
					{
						"height":settings.actiondivheight,
						"top":"-"+settings.actiondivheight,
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
							
							var itemwith=compnet.data("itemwith");
							var vitemheight=compnet.data("vitemheight");
							var pagesize=compnet.data("pagesize");
							var vpagesize=compnet.data("vpagesize");
							var pagetotal=compnet.data("pagetotal");
							var vpagetotal=compnet.data("vpagetotal");
							var curpage=compnet.data("curpage");
							var vcurpage=compnet.data("vcurpage");
							//console.log(( parseInt(myshowtarget.css("margin-top"),10)-(vitemheight*vpagesize) )+"px"  );
							if(1<=vcurpage && vcurpage<vpagetotal)
							{
							//	myshowtarget.css("margin-top", ); 
								$(myshowtarget).animate(
								  {marginTop:( parseInt(myshowtarget.css("margin-top"),10)-(vitemheight*vpagesize) )+"px" }
								  ,function () {
										pass2 = true;
								  }
								);
								vcurpage++;
								compnet.data("vcurpage",vcurpage);//当前页-纵向
							}else{
								pass2 = true;
							}
						}
						return false;
					}
				)
				;
				var bottomdiv=$('<div class="bottomdiv"  style="position:absolute;width:100%;left:0px;" >').css(
					{
						"height":settings.actiondivheight,
						"bottom":"-"+settings.actiondivheight,
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
							
							var itemwith=compnet.data("itemwith");
							var vitemheight=compnet.data("vitemheight");
							var pagesize=compnet.data("pagesize");
							var vpagesize=compnet.data("vpagesize");
							var pagetotal=compnet.data("pagetotal");
							var vpagetotal=compnet.data("vpagetotal");
							var curpage=compnet.data("curpage");
							var vcurpage=compnet.data("vcurpage");
							//console.log(curpage);
							if(1<curpage && curpage<=pagetotal)
							{

								$(myshowtarget).animate(
								  {marginLeft:( parseInt(myshowtarget.css("margin-left"),10)+ (itemwith*pagesize) )+"px"  }
								  ,function () {
										pass3 = true;
								  }
								);
								
								curpage--;
								compnet.data("curpage",curpage);//当前页
							}else{
								pass3 = true;
							}
						}
						return false;
					}
				);
				var rightdiv=$('<div class="rightdiv"  style="position:absolute;height:100%;top:0px;" >').css(
					{
						"width":settings.actiondivwidth,
						"left":"-"+settings.actiondivwidth,
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
							
							var itemwith=compnet.data("itemwith");
							var vitemheight=compnet.data("vitemheight");
							var pagesize=compnet.data("pagesize");
							var vpagesize=compnet.data("vpagesize");
							var pagetotal=compnet.data("pagetotal");
							var vpagetotal=compnet.data("vpagetotal");
							var curpage=compnet.data("curpage");
							var vcurpage=compnet.data("vcurpage");
							//console.log(curpage);
							if(1<=curpage && curpage<pagetotal)
							{
								
								$(myshowtarget).animate(
								  {marginLeft:( parseInt(myshowtarget.css("margin-left"),10)- (itemwith*pagesize) )+"px"  }
								  ,function () {
										pass4 = true;
								  }
								);
								
								curpage++;
								compnet.data("curpage",curpage);//当前页
							}else{
									pass4 = true;
							}
						}
						
						return false;
					}
				);
				var leftdiv=$('<div class="leftdiv"  style="position:absolute;height:100%;top:0px;" >').css(
					{
						"width":settings.actiondivwidth,
						"right":"-"+settings.actiondivwidth,
						"background-color":"transparent"
					}
				);
				var operdiv4=$('<div class="operdiv" style="position:relative;width:100%;height:100%;">');
				operdiv4.append(moveleftlink);
				leftdiv.append(operdiv4);
				
				
				var actionwindow=$('<div class="actionwindow">');
				
				if(settings.mode=="h" || settings.mode=="b")
				{
					
					actionwindow.append(rightdiv).append(leftdiv);
				}
				if(settings.mode=="v" || settings.mode=="b")
				{
					
					actionwindow.append(topdiv).append(bottomdiv);
				}
				
				
				componet.append(visualwindow);
				componet.append(actionwindow);
				
				showtarget.after(componet);
				showtarget.appendTo(visualwindow);
			}
		);
	}
}
)(jQuery)