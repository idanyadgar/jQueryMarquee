/*
 * Created by Idan Yadgar, from http://webhub.co.il
 * All Rights Reserved
 * Do NOT remove this
 * Version 1.0
 */
function marquee(marqueeProperties) {
	this.direction = 'right';
	this.delay = 85;
	this.scrollAmount = 6;
	this.behavior = 'scroll';
	this.loops = 0;
	this.createdElements = [];
	this.construct = (function(p) {
		var marquee = this;
		if (typeof p == 'object') {
			var directionValues = ['right','left','up','down'],
			behaviorValues = ['scroll', 'slide', 'alternate'];
			if (p.hasOwnProperty('direction') && $.inArray(p.direction, directionValues))
				marquee.direction = p.direction;
			if (p.hasOwnProperty('delay') && p.delay >= 85)
				marquee.delay = p.delay;
			if (p.hasOwnProperty('scrollAmount') && p.scrollAmount >= 0)
				marquee.scrollAmount = p.scrollAmount;
			if (p.hasOwnProperty('behavior') && $.inArray(p.behavior, behaviorValues))
				marquee.behavior = p.behavior;
			if (p.hasOwnProperty('loops') && p.loops >= 0 && Math.round(p.loops) == p.loops)
				marquee.loops = p.loops;
		}
	})(marqueeProperties);
	this.setProperties = function (properties, toDefault) {
		if (toDefault === true) {
			this.direction = 'right';
			this.delay = 85;
			this.scrollAmount = 6;
			this.behavior = 'scroll';
			this.loops = 0;
		}
		if (typeof properties == 'object') {
			var directionValues = ['right','left','up','down'],
			behaviorValues = ['scroll', 'slide', 'alternate'];
			if (properties.hasOwnProperty('direction') && $.inArray(properties.direction, directionValues))
				this.direction = properties.direction;
			if (properties.hasOwnProperty('delay') && properties.delay >= 85)
				this.delay = properties.delay;
			if (properties.hasOwnProperty('scrollAmount') && properties.scrollAmount >= 0)
				this.scrollAmount = properties.scrollAmount;
			if (properties.hasOwnProperty('behavior') && $.inArray(properties.behavior, behaviorValues))
				this.behavior = properties.behavior;
			if (properties.hasOwnProperty('loops') && properties.loops >= 0 && Math.round(properties.loops) == properties.loops)
				this.loops = properties.loops;
		}
	};
	this.create = function(elements) {
		var marquee = this;
		if (typeof elements == 'object') {
			var property;
			for (property in elements) {
				if (typeof elements[property] == 'object') {
					marquee[property] = {
						elements : $(elements[property]),
						direction : marquee.direction,
						delay : marquee.delay,
						scrollAmount : marquee.scrollAmount,
						behavior : marquee.behavior,
						loops : marquee.loops,
						started : false,
						loopNum : [],
						marqueeInterval : [],
						alternateBack : [],
						slideStop : [],
						scrollRestart : [],
						defaultCss : {},
						construct : function() {
							var o = this;
							this.elements.each(function() {
								var e = $(this), divCss = {}, div2Css = {};
								e.html(
									'<div><div>'+e.html()+'</div></div>'
								);
								divCss = {
									'position' : 'relative',
									'width' : '100%',
									'height' : '100%',
									'overflow' : 'hidden'
								};
								e.children('div').css(divCss);
								e.children('div').children('div').css('display', 'inline-block');
								div2Css.top = e.children('div').children('div').position().top;
								div2Css.bottom =  e.children('div').height()-e.children('div').children('div').height()-div2Css.top;
								div2Css.left = e.children('div').children('div').position().left;
								div2Css.right =  e.children('div').width()-e.children('div').children('div').width()-div2Css.left;
								o.defaultCss = div2Css;
								div2Css.width = e.children('div').children('div').width();
								div2Css.height = e.children('div').children('div').height();
								div2Css.position = 'absolute';
								e.children('div').children('div').css(div2Css);
							});
						},
						setProperties : function (properties, toDefault) {
							if (toDefault === true) {
								this.direction = marquee.direction;
								this.delay = marquee.delay;
								this.scrollAmount = marquee.scrollAmount;
								this.behavior = marquee.behavior;
								this.loops = marquee.loops;
							}
							if (typeof properties == 'object') {
								var directionValues = ['right','left','up','down'],
								behaviorValues = ['scroll', 'slide', 'alternate'];
								if (properties.hasOwnProperty('direction') && $.inArray(properties.direction, directionValues))
									this.direction = properties.direction;
								if (properties.hasOwnProperty('delay') && properties.delay >= 85)
									this.delay = properties.delay;
								if (properties.hasOwnProperty('scrollAmount') && properties.scrollAmount >= 0)
									this.scrollAmount = properties.scrollAmount;
								if (properties.hasOwnProperty('behavior') && $.inArray(properties.behavior, behaviorValues))
									this.behavior = properties.behavior;
								if (properties.hasOwnProperty('loops') && properties.loops >= 0 && Math.round(properties.loops) == properties.loops)
									this.loops = properties.loops;
							}
						},
						start : function() {
							if (this.started) return false;
							var cssDirection = {
								'right' : 'left',
								'left' : 'right',
								'up' : 'bottom',
								'down' : 'top'
							}, cssDirectionO = {
								'right' : 'right',
								'left' : 'left',
								'up' : 'top',
								'down' : 'bottom'
							}, divDirection = {};
							switch (this.behavior) {
								case 'scroll':
									var o = this;
									this.elements.each(function(i) {
										var e = $(this);
										o.scrollRestart[i] = true;
										divDirection[cssDirectionO[o.direction]] = 'auto';
										e.children('div').children('div').css(divDirection);
										o.loopNum[i] = 0;
										o.marqueeInterval[i] = setInterval(function() {
											o.scroll(cssDirection[o.direction], o.scrollAmount, e, i);
										}, o.delay);
									});
									break;
								case 'slide':
									var o = this;
									this.elements.each(function(i) {
										var e = $(this);
										o.slideStop[i] = false;
										divDirection[cssDirectionO[o.direction]] = 'auto';
										e.children('div').children('div').css(divDirection);
										o.marqueeInterval[i] = setInterval(function() {
											o.slide(cssDirection[o.direction], o.scrollAmount, e, i);
										}, o.delay);
									});
									break;
								case 'alternate':
									var o = this;
									this.elements.each(function(i) {
										var e = $(this);
										o.alternateBack[i] = false;
										divDirection[cssDirectionO[o.direction]] = 'auto';
										e.children('div').children('div').css(divDirection);
										o.loopNum[i] = 0;
										o.marqueeInterval[i] = setInterval(function() {
											o.alternate(cssDirection[o.direction], o.scrollAmount, e, i);
										}, o.delay);
									});
									break;
							}
							this.started = true;

						},
						stop : function() {
							jQuery.each(this.marqueeInterval, function(i, val) {
								clearInterval(val);
							});
							this.started = false;
						},
						reset : function () {
							var o = this;
							this.stop();
							this.elements.each(function() {
								$(this).children('div').children('div').css(o.defaultCss);
							});
						},
						restart : function() {
							var cssDirection = {
								'right' : 'left',
								'left' : 'right',
								'up' : 'bottom',
								'down' : 'top'
							}, cssDirectionO = {
								'right' : 'right',
								'left' : 'left',
								'up' : 'top',
								'down' : 'bottom'
							}, divDirection = {}, o = this;
							switch (this.behavior) {
								case 'alternate':
									divDirection[cssDirectionO[o.direction]] = 'auto';
									e.children('div').children('div').css(divDirection);
									break;
								case 'scroll':
									this.elements.each(function() {
										var e = $(this);
										divDirection[cssDirectionO[o.direction]] = 'auto';
										divDirection[cssDirection[o.direction]] = (o.direction == 'right' || o.direction == 'left') ? -e.children('div').children('div').width() : -e.children('div').children('div').height();
										e.children('div').children('div').css(divDirection);
									});
									break;
								case 'slide':
									this.elements.each(function() {
										var e = $(this);
										divDirection[cssDirectionO[o.direction]] = 'auto';
										divDirection[cssDirection[o.direction]] = (o.direction == 'right' || o.direction == 'left') ? -e.children('div').children('div').width() : -e.children('div').children('div').height();
										e.children('div').children('div').css(divDirection);
									});
									break;
							}
							this.start();
						},
						scroll : function(direction, amount, e, i) {
							var eSize = (direction == 'right' || direction == 'left') ? e.children('div').width() : e.children('div').height(),
							e2Size =  (direction == 'right' || direction == 'left') ? e.children('div').children('div').width() : e.children('div').children('div').height(),
							css = {},
							dirValue = e.children('div').children('div').css(direction);
							if (Number(dirValue.substring(0,dirValue.length-2)) == eSize) {
								css[direction] = -e2Size;
								this.scrollRestart[i] = true;
								this.loopNum[i]++;
							}
							else {
								css[direction] = '+='+amount;
								this.scrollRestart[i] = false;
							}
							if (Number(dirValue.substring(0,dirValue.length-2))+amount > eSize && css[direction] == '+='+amount && !this.scrollRestart[i]) {
								css[direction] = eSize;
							}
							if (this.loops > 0 && this.loops == this.loopNum[i])
								clearInterval(this.marqueeInterval[i]);
							else
								e.children('div').children('div').css(css);
						},
						slide : function(direction, amount, e, i) {
							var eSize = (direction == 'right' || direction == 'left') ? e.children('div').width() : e.children('div').height(),
							e2Size =  (direction == 'right' || direction == 'left') ? e.children('div').children('div').width() : e.children('div').children('div').height(),
							css = {},
							dirValue = e.children('div').children('div').css(direction);
							css[direction] = '+='+amount;
							if (Number(dirValue.substring(0,dirValue.length-2))+amount > (eSize-e2Size)) {
								css[direction] = (eSize-e2Size);
								this.slideStop[i] = true;
							}
							e.children('div').children('div').css(css);
							if (this.slideStop[i])
								clearInterval(this.marqueeInterval[i]);
						},
						alternate : function(direction, amount, e, i) {
							var eSize = (direction == 'right' || direction == 'left') ? e.children('div').width() : e.children('div').height(),
							e2Size =  (direction == 'right' || direction == 'left') ? e.children('div').children('div').width() : e.children('div').children('div').height(),
							css = {},
							dirValue = e.children('div').children('div').css(direction);
							if ((Number(dirValue.substring(0,dirValue.length-2)) == (eSize-e2Size) || this.alternateBack[i]) && Number(dirValue.substring(0,dirValue.length-2)) > 0) {
								css[direction] = '-='+amount;
								this.alternateBack[i] = true;
							}
							else {
								css[direction] = '+='+amount;
								if (this.alternateBack[i])
									this.loopNum[i]++;
								this.alternateBack[i] = false;
							}
							if (Number(dirValue.substring(0,dirValue.length-2))+amount > (eSize-e2Size) && css[direction] == '+='+amount && !this.alternateBack[i]) {
								css[direction] = (eSize-e2Size);
							}
							else if (Number(dirValue.substring(0,dirValue.length-2))-amount < 0 && this.alternateBack[i]) {
								css[direction] = 0;
							}
							if (this.loops > 0 && this.loops == this.loopNum[i])
								clearInterval(this.marqueeInterval[i]);
							else
								e.children('div').children('div').css(css);
						}
					};
					marquee[property].construct();
					marquee.createdElements.push(property);
				}
			}
		}
	};
	this.startAll = function() {
		for (var i = 0; i < this.createdElements.length; i++)
			this[this.createdElements[i]].start();
	};
	this.stopAll = function() {
		for (var i = 0; i < this.createdElements.length; i++)
			this[this.createdElements[i]].stop();
	};
	this.resetAll = function() {
		for (var i = 0; i < this.createdElements.length; i++)
			this[this.createdElements[i]].reset();
	};
	this.restartAll = function() {
		for (var i = 0; i < this.createdElements.length; i++)
			this[this.createdElements[i]].restart();
	}
}