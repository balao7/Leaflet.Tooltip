L.Tooltip=L.Layer.extend({options:{pane:"popupPane",nonBubblingEvents:["mouseover","mousemove"],position:"left",className:"tooltip",arrowClass:"tooltip-arrow",contentClass:"tooltip-inner",subtextClass:"tooltip-subtext",showClass:"in",noWrap:false,wrapScreen:true,offset:[10,5]},statics:{POSITIONS:{TOP:"top",LEFT:"left",BOTTOM:"bottom",RIGHT:"right"}},initialize:function(t,i){this._container=null;this._arrow=null;this._contentNode=null;this._subtext=null;L.Util.setOptions(this,t);this._source=i},_initLayout:function(){var t=this.options;if(t.noWrap){t.className+=" nowrap"}this._container=L.DomUtil.create("div",t.className+" "+t.position+" "+t.showClass);this._arrow=L.DomUtil.create("div",t.arrowClass,this._container);this._contentNode=L.DomUtil.create("div",t.contentClass,this._container);this._subtext=L.DomUtil.create("div",t.subtextClass,this._container)},onAdd:function(t){this._map=t;this._initLayout();if(this.options.content){this.setContent(this.options.content)}this.getPane().appendChild(this._container);return this},show:function(){L.DomUtil.addClass(this._container,this.options.showClass);return this},hide:function(){L.DomUtil.addClass(this._container,this.options.showClass);return this},onRemove:function(t){L.Util.cancelAnimFrame(this._updateTimer);this.getPane().removeChild(this._container);this._map=null;return this},setContent:function(t){this._contentNode.innerHTML=t;this.updatePosition();return this},setSubtext:function(t){this._subtext.innerHTML=t;this.updatePosition();return this},setLatLng:function(t){this._latlng=t;this.updatePosition();return this},_getOffset:function(t,i){var n=this._container;var o=this.options;var s=n.offsetWidth;var e=n.offsetHeight;var a=L.Tooltip.POSITIONS;if(this.options.wrapScreen){var r=this._map.getSize();t=this._map.layerPointToContainerPoint(t);if(t.x+s/2>r.x){i=a.LEFT}if(t.x-s<0){i=a.RIGHT}if(t.y-e<0){i=a.BOTTOM}if(t.y+e>r.y){i=a.TOP}}this._container.className=o.className+" "+i+" "+o.showClass;var h=o.offset;if(i===a.LEFT){return new L.Point(-s-h[0],-e/2)._floor()}else if(i===a.RIGHT){return new L.Point(0+h[0],-e/2)._floor()}else if(i===a.TOP){return new L.Point(-s/2,-e-h[1])._floor()}else if(i===a.BOTTOM){return new L.Point(-s/2,0+h[1])._floor()}},updatePosition:function(t){if(!this._map){return}this._updateTimer=L.Util.requestAnimFrame(function(){if(!t){t=this._map.latLngToLayerPoint(this._latlng)}L.DomUtil.setPosition(this._container,t.add(this._getOffset(t,this.options.position)))},this)}});L.tooltip=function(t,i){return new L.Tooltip(t,i)};