function popupOpener(container){
	container.querySelectorAll(".snippet").forEach(function(snippet, i){
		snippet.onclick=function(event){
			event.preventDefault();
			var box = container.querySelector(".box");
				box.classList.add("showed");
				box.scrollLeft = i * box.offsetWidth;
			var frames = box.querySelectorAll("article");
			
			box.querySelectorAll("form.slide-bar>input")[i].checked = true;

			XHR.push({
				addressee:"/ajax/content/"+frames[i].dataset.id,
				onsuccess:function(response){
					response = doc.create("template",{},response);
					response.content.querySelectorAll("script").forEach(function(sct){
						var script = document.createElement("script");
						if(sct.src){
							script.src = sct.src;
						}else script.innerHTML = sct.innerHTML;
						sct.parentNode.replaceChild(script, sct);
					});
					frames[i].appendChild(response.content);
					frames[i].dataset.fill = "YES";
				}
			});
		}
	});
}
function frameSpinner(container,delta){
	var delay,
		animate
	container.ontouchmove=function(event){
		event.cancelBubble=true;
		delta['EndX']= event.touches[0].clientX;
		delta['EndY']= event.touches[0].clientY;
	};

	var offset = (container.scrollLeft / container.offsetWidth)>>0;

	container.ontouchend=function(event){
		event.cancelBubble=true;
		delta.x = Math.abs(delta.EndX - delta.StartX);
		delta.y = Math.abs(delta.EndY - delta.StartY);
		clearTimeout(delay);
		delay = setTimeout(function(){
			if((delta.x>delta.y) && (delta.x>50) && (delta.EndX>50)){
				offset = (offset + ((delta.StartX>delta.EndX) ? 1 : -1)) * container.offsetWidth;
				if((offset>=0) && (offset<container.scrollWidth)){
					var i = (offset / container.offsetWidth)>>0,
						frames = container.querySelectorAll("article");
						//frames[i].scrollTop = 0;
						container.querySelectorAll("form.slide-bar>input")[i].checked = true;
					cancelAnimationFrame(animate);
					animate = requestAnimationFrame(function scrollSlide(){
						if(Math.abs(offset - container.scrollLeft) > 16){
							container.scrollLeft += (offset - container.scrollLeft)/8;
							animate = requestAnimationFrame(scrollSlide);
						}else{
							container.scrollLeft = offset;
							if(frames[i].dataset.fill=="NO"){
								XHR.push({
									addressee:"/ajax/content/"+frames[i].dataset.id,
									onsuccess:function(response){
										response = doc.create("template",{},response);
										response.content.querySelectorAll("script").forEach(function(sct){
											var script = document.createElement("script");
											if(sct.src){
												script.src = sct.src;
											}else script.innerHTML = sct.innerHTML;
											sct.parentNode.replaceChild(script, sct);
										});
										frames[i].appendChild(response.content);
										frames[i].dataset.fill = "YES";
									}
								});
							}
						}
					});
				}else container.classList.remove('showed');
			}
		},80);

	}
}
function frameScroll(box){
	var delay,
		animate;
	clearTimeout(delay);
	delay=setTimeout(function(){
		var slide = Math.round(box.scrollLeft / box.offsetWidth),
			offset = slide * box.offsetWidth,
			frames = box.querySelectorAll("article");
		box.querySelectorAll("form.slide-bar>input")[slide].checked = true;
		cancelAnimationFrame(animate);
		animate = requestAnimationFrame(function scrollSlide(){
			if(Math.abs(offset - box.scrollLeft) > 16){
				box.scrollLeft += (offset - box.scrollLeft)/8;
				animate = requestAnimationFrame(scrollSlide);
			}else{
				box.scrollLeft = offset;
				if(frames[slide].dataset.fill=="NO"){
					XHR.push({
						addressee:"/ajax/content/"+frames[slide].dataset.id,
						onsuccess:function(response){
							response = doc.create("template",{},response);
							response.content.querySelectorAll("script").forEach(function(sct){
								var script = document.createElement("script");
								if(sct.src){
									script.src = sct.src;
								}else script.innerHTML = sct.innerHTML;
								sct.parentNode.replaceChild(script, sct);
							});
							frames[slide].appendChild(response.content);
							frames[slide].dataset.fill = "YES";
						}
					});
				}
			}
		});
	},800);
}
function feedSpinner(container, delta){
	var delay;
	container.ontouchmove=function(event){
		delta['EndX']= event.touches[0].clientX;
		delta['EndY']= event.touches[0].clientY;
	};
	container.ontouchend=function(event){
		clearTimeout(delay)
		delay = setTimeout(function(){
			delta.x = Math.abs(delta.EndX - delta.StartX);
			delta.y = Math.abs(delta.EndY - delta.StartY);

			if((delta.x>delta.y) && (delta.x>50) && (delta.EndX>50)){
				if(delta.StartX>delta.EndX){
					container.className = "yesterday";
				}else container.className = "today";
			}
		},60);
	}
}

/* SHARESS *********************************************************************/

var share = {
	facebook:function(){
		FB.ui({
			method	: "share",
			href	: window.location.href,
		}, function(response){ });
	},
	twitter:function(){
		window.open("https://twitter.com/share?url="+location.href+"&text="+doc.querySelector("meta[property='og:title']").content, "", "menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=550,width=500");
	}
}
var send = {
	messenger:function(){
		FB.ui({
			method:"send",
			link:location.href,
			display:"iframe"
		});
	},
	whatsapp:function(){
		window.open("whatsapp://send?text="+location.href, "", "menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=500,width=320");
	}
}