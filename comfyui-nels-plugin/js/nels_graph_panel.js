import{app as _r}from"../../scripts/app.js";import{api as tu}from"../../scripts/api.js";var Ml,ct,Jp,Qp,lr,Ph,em,tm,Zl,La,go,nm,md,nu,iu,Xa={},ja=[],Sv=/acit|ex(?:s|g|n|p|$)|rph|grid|ows|mnc|ntw|ine[ch]|zoo|^ord|itera/i,wl=Array.isArray;function Oi(n,e){for(var t in e)n[t]=e[t];return n}function gd(n){n&&n.parentNode&&n.parentNode.removeChild(n)}function im(n,e,t){var i,r,s,o={};for(s in e)s=="key"?i=e[s]:s=="ref"?r=e[s]:o[s]=e[s];if(arguments.length>2&&(o.children=arguments.length>3?Ml.call(arguments,2):t),typeof n=="function"&&n.defaultProps!=null)for(s in n.defaultProps)o[s]===void 0&&(o[s]=n.defaultProps[s]);return Da(n,o,i,r,null)}function Da(n,e,t,i,r){var s={type:n,props:e,key:t,ref:i,__k:null,__:null,__b:0,__e:null,__c:null,constructor:void 0,__v:r??++Jp,__i:-1,__u:0};return r==null&&ct.vnode!=null&&ct.vnode(s),s}function Cn(n){return n.children}function _o(n,e){this.props=n,this.context=e}function Cs(n,e){if(e==null)return n.__?Cs(n.__,n.__i+1):null;for(var t;e<n.__k.length;e++)if((t=n.__k[e])!=null&&t.__e!=null)return t.__e;return typeof n.type=="function"?Cs(n):null}function Ev(n){if(n.__P&&n.__d){var e=n.__v,t=e.__e,i=[],r=[],s=Oi({},e);s.__v=e.__v+1,ct.vnode&&ct.vnode(s),_d(n.__P,s,e,n.__n,n.__P.namespaceURI,32&e.__u?[t]:null,i,t??Cs(e),!!(32&e.__u),r),s.__v=e.__v,s.__.__k[s.__i]=s,am(i,s,r),e.__e=e.__=null,s.__e!=t&&rm(s)}}function rm(n){if((n=n.__)!=null&&n.__c!=null)return n.__e=n.__c.base=null,n.__k.some(function(e){if(e!=null&&e.__e!=null)return n.__e=n.__c.base=e.__e}),rm(n)}function Lh(n){(!n.__d&&(n.__d=!0)&&lr.push(n)&&!Ya.__r++||Ph!=ct.debounceRendering)&&((Ph=ct.debounceRendering)||em)(Ya)}function Ya(){try{for(var n,e=1;lr.length;)lr.length>e&&lr.sort(tm),n=lr.shift(),e=lr.length,Ev(n)}finally{lr.length=Ya.__r=0}}function sm(n,e,t,i,r,s,o,a,l,c,u){var d,h,f,p,_,g,m,v=i&&i.__k||ja,E=e.length;for(l=Mv(t,e,v,l,E),d=0;d<E;d++)(f=t.__k[d])!=null&&(h=f.__i!=-1&&v[f.__i]||Xa,f.__i=d,g=_d(n,f,h,r,s,o,a,l,c,u),p=f.__e,f.ref&&h.ref!=f.ref&&(h.ref&&vd(h.ref,null,f),u.push(f.ref,f.__c||p,f)),_==null&&p!=null&&(_=p),(m=!!(4&f.__u))||h.__k===f.__k?(l=om(f,l,n,m),m&&h.__e&&(h.__e=null)):typeof f.type=="function"&&g!==void 0?l=g:p&&(l=p.nextSibling),f.__u&=-7);return t.__e=_,l}function Mv(n,e,t,i,r){var s,o,a,l,c,u=t.length,d=u,h=0;for(n.__k=new Array(r),s=0;s<r;s++)(o=e[s])!=null&&typeof o!="boolean"&&typeof o!="function"?(typeof o=="string"||typeof o=="number"||typeof o=="bigint"||o.constructor==String?o=n.__k[s]=Da(null,o,null,null,null):wl(o)?o=n.__k[s]=Da(Cn,{children:o},null,null,null):o.constructor===void 0&&o.__b>0?o=n.__k[s]=Da(o.type,o.props,o.key,o.ref?o.ref:null,o.__v):n.__k[s]=o,l=s+h,o.__=n,o.__b=n.__b+1,a=null,(c=o.__i=wv(o,t,l,d))!=-1&&(d--,(a=t[c])&&(a.__u|=2)),a==null||a.__v==null?(c==-1&&(r>u?h--:r<u&&h++),typeof o.type!="function"&&(o.__u|=4)):c!=l&&(c==l-1?h--:c==l+1?h++:(c>l?h--:h++,o.__u|=4))):n.__k[s]=null;if(d)for(s=0;s<u;s++)(a=t[s])!=null&&(2&a.__u)==0&&(a.__e==i&&(i=Cs(a)),cm(a,a));return i}function om(n,e,t,i){var r,s;if(typeof n.type=="function"){for(r=n.__k,s=0;r&&s<r.length;s++)r[s]&&(r[s].__=n,e=om(r[s],e,t,i));return e}n.__e!=e&&(i&&(e&&n.type&&!e.parentNode&&(e=Cs(n)),t.insertBefore(n.__e,e||null)),e=n.__e);do e=e&&e.nextSibling;while(e!=null&&e.nodeType==8);return e}function wv(n,e,t,i){var r,s,o,a=n.key,l=n.type,c=e[t],u=c!=null&&(2&c.__u)==0;if(c===null&&a==null||u&&a==c.key&&l==c.type)return t;if(i>(u?1:0)){for(r=t-1,s=t+1;r>=0||s<e.length;)if((c=e[o=r>=0?r--:s++])!=null&&(2&c.__u)==0&&a==c.key&&l==c.type)return o}return-1}function Dh(n,e,t){e[0]=="-"?n.setProperty(e,t??""):n[e]=t==null?"":typeof t!="number"||Sv.test(e)?t:t+"px"}function Xo(n,e,t,i,r){var s,o;e:if(e=="style")if(typeof t=="string")n.style.cssText=t;else{if(typeof i=="string"&&(n.style.cssText=i=""),i)for(e in i)t&&e in t||Dh(n.style,e,"");if(t)for(e in t)i&&t[e]==i[e]||Dh(n.style,e,t[e])}else if(e[0]=="o"&&e[1]=="n")s=e!=(e=e.replace(nm,"$1")),o=e.toLowerCase(),e=o in n||e=="onFocusOut"||e=="onFocusIn"?o.slice(2):e.slice(2),n.l||(n.l={}),n.l[e+s]=t,t?i?t[go]=i[go]:(t[go]=md,n.addEventListener(e,s?iu:nu,s)):n.removeEventListener(e,s?iu:nu,s);else{if(r=="http://www.w3.org/2000/svg")e=e.replace(/xlink(H|:h)/,"h").replace(/sName$/,"s");else if(e!="width"&&e!="height"&&e!="href"&&e!="list"&&e!="form"&&e!="tabIndex"&&e!="download"&&e!="rowSpan"&&e!="colSpan"&&e!="role"&&e!="popover"&&e in n)try{n[e]=t??"";break e}catch{}typeof t=="function"||(t==null||t===!1&&e[4]!="-"?n.removeAttribute(e):n.setAttribute(e,e=="popover"&&t==1?"":t))}}function Nh(n){return function(e){if(this.l){var t=this.l[e.type+n];if(e[La]==null)e[La]=md++;else if(e[La]<t[go])return;return t(ct.event?ct.event(e):e)}}}function _d(n,e,t,i,r,s,o,a,l,c){var u,d,h,f,p,_,g,m,v,E,x,w,S,C,b,T=e.type;if(e.constructor!==void 0)return null;128&t.__u&&(l=!!(32&t.__u),s=[a=e.__e=t.__e]),(u=ct.__b)&&u(e);e:if(typeof T=="function")try{if(m=e.props,v=T.prototype&&T.prototype.render,E=(u=T.contextType)&&i[u.__c],x=u?E?E.props.value:u.__:i,t.__c?g=(d=e.__c=t.__c).__=d.__E:(v?e.__c=d=new T(m,x):(e.__c=d=new _o(m,x),d.constructor=T,d.render=Av),E&&E.sub(d),d.state||(d.state={}),d.__n=i,h=d.__d=!0,d.__h=[],d._sb=[]),v&&d.__s==null&&(d.__s=d.state),v&&T.getDerivedStateFromProps!=null&&(d.__s==d.state&&(d.__s=Oi({},d.__s)),Oi(d.__s,T.getDerivedStateFromProps(m,d.__s))),f=d.props,p=d.state,d.__v=e,h)v&&T.getDerivedStateFromProps==null&&d.componentWillMount!=null&&d.componentWillMount(),v&&d.componentDidMount!=null&&d.__h.push(d.componentDidMount);else{if(v&&T.getDerivedStateFromProps==null&&m!==f&&d.componentWillReceiveProps!=null&&d.componentWillReceiveProps(m,x),e.__v==t.__v||!d.__e&&d.shouldComponentUpdate!=null&&d.shouldComponentUpdate(m,d.__s,x)===!1){e.__v!=t.__v&&(d.props=m,d.state=d.__s,d.__d=!1),e.__e=t.__e,e.__k=t.__k,e.__k.some(function(L){L&&(L.__=e)}),ja.push.apply(d.__h,d._sb),d._sb=[],d.__h.length&&o.push(d);break e}d.componentWillUpdate!=null&&d.componentWillUpdate(m,d.__s,x),v&&d.componentDidUpdate!=null&&d.__h.push(function(){d.componentDidUpdate(f,p,_)})}if(d.context=x,d.props=m,d.__P=n,d.__e=!1,w=ct.__r,S=0,v)d.state=d.__s,d.__d=!1,w&&w(e),u=d.render(d.props,d.state,d.context),ja.push.apply(d.__h,d._sb),d._sb=[];else do d.__d=!1,w&&w(e),u=d.render(d.props,d.state,d.context),d.state=d.__s;while(d.__d&&++S<25);d.state=d.__s,d.getChildContext!=null&&(i=Oi(Oi({},i),d.getChildContext())),v&&!h&&d.getSnapshotBeforeUpdate!=null&&(_=d.getSnapshotBeforeUpdate(f,p)),C=u!=null&&u.type===Cn&&u.key==null?lm(u.props.children):u,a=sm(n,wl(C)?C:[C],e,t,i,r,s,o,a,l,c),d.base=e.__e,e.__u&=-161,d.__h.length&&o.push(d),g&&(d.__E=d.__=null)}catch(L){if(e.__v=null,l||s!=null)if(L.then){for(e.__u|=l?160:128;a&&a.nodeType==8&&a.nextSibling;)a=a.nextSibling;s[s.indexOf(a)]=null,e.__e=a}else{for(b=s.length;b--;)gd(s[b]);ru(e)}else e.__e=t.__e,e.__k=t.__k,L.then||ru(e);ct.__e(L,e,t)}else s==null&&e.__v==t.__v?(e.__k=t.__k,e.__e=t.__e):a=e.__e=Tv(t.__e,e,t,i,r,s,o,l,c);return(u=ct.diffed)&&u(e),128&e.__u?void 0:a}function ru(n){n&&(n.__c&&(n.__c.__e=!0),n.__k&&n.__k.some(ru))}function am(n,e,t){for(var i=0;i<t.length;i++)vd(t[i],t[++i],t[++i]);ct.__c&&ct.__c(e,n),n.some(function(r){try{n=r.__h,r.__h=[],n.some(function(s){s.call(r)})}catch(s){ct.__e(s,r.__v)}})}function lm(n){return typeof n!="object"||n==null||n.__b>0?n:wl(n)?n.map(lm):Oi({},n)}function Tv(n,e,t,i,r,s,o,a,l){var c,u,d,h,f,p,_,g=t.props||Xa,m=e.props,v=e.type;if(v=="svg"?r="http://www.w3.org/2000/svg":v=="math"?r="http://www.w3.org/1998/Math/MathML":r||(r="http://www.w3.org/1999/xhtml"),s!=null){for(c=0;c<s.length;c++)if((f=s[c])&&"setAttribute"in f==!!v&&(v?f.localName==v:f.nodeType==3)){n=f,s[c]=null;break}}if(n==null){if(v==null)return document.createTextNode(m);n=document.createElementNS(r,v,m.is&&m),a&&(ct.__m&&ct.__m(e,s),a=!1),s=null}if(v==null)g===m||a&&n.data==m||(n.data=m);else{if(s=s&&Ml.call(n.childNodes),!a&&s!=null)for(g={},c=0;c<n.attributes.length;c++)g[(f=n.attributes[c]).name]=f.value;for(c in g)f=g[c],c=="dangerouslySetInnerHTML"?d=f:c=="children"||c in m||c=="value"&&"defaultValue"in m||c=="checked"&&"defaultChecked"in m||Xo(n,c,null,f,r);for(c in m)f=m[c],c=="children"?h=f:c=="dangerouslySetInnerHTML"?u=f:c=="value"?p=f:c=="checked"?_=f:a&&typeof f!="function"||g[c]===f||Xo(n,c,f,g[c],r);if(u)a||d&&(u.__html==d.__html||u.__html==n.innerHTML)||(n.innerHTML=u.__html),e.__k=[];else if(d&&(n.innerHTML=""),sm(e.type=="template"?n.content:n,wl(h)?h:[h],e,t,i,v=="foreignObject"?"http://www.w3.org/1999/xhtml":r,s,o,s?s[0]:t.__k&&Cs(t,0),a,l),s!=null)for(c=s.length;c--;)gd(s[c]);a||(c="value",v=="progress"&&p==null?n.removeAttribute("value"):p!=null&&(p!==n[c]||v=="progress"&&!p||v=="option"&&p!=g[c])&&Xo(n,c,p,g[c],r),c="checked",_!=null&&_!=n[c]&&Xo(n,c,_,g[c],r))}return n}function vd(n,e,t){try{if(typeof n=="function"){var i=typeof n.__u=="function";i&&n.__u(),i&&e==null||(n.__u=n(e))}else n.current=e}catch(r){ct.__e(r,t)}}function cm(n,e,t){var i,r;if(ct.unmount&&ct.unmount(n),(i=n.ref)&&(i.current&&i.current!=n.__e||vd(i,null,e)),(i=n.__c)!=null){if(i.componentWillUnmount)try{i.componentWillUnmount()}catch(s){ct.__e(s,e)}i.base=i.__P=null}if(i=n.__k)for(r=0;r<i.length;r++)i[r]&&cm(i[r],e,t||typeof n.type!="function");t||gd(n.__e),n.__c=n.__=n.__e=void 0}function Av(n,e,t){return this.constructor(n,t)}function Ih(n,e,t){var i,r,s,o;e==document&&(e=document.documentElement),ct.__&&ct.__(n,e),r=(i=!1)?null:e.__k,s=[],o=[],_d(e,n=e.__k=im(Cn,null,[n]),r||Xa,Xa,e.namespaceURI,r?null:e.firstChild?Ml.call(e.childNodes):null,s,r?r.__e:e.firstChild,i,o),am(s,n,o)}Ml=ja.slice,ct={__e:function(n,e,t,i){for(var r,s,o;e=e.__;)if((r=e.__c)&&!r.__)try{if((s=r.constructor)&&s.getDerivedStateFromError!=null&&(r.setState(s.getDerivedStateFromError(n)),o=r.__d),r.componentDidCatch!=null&&(r.componentDidCatch(n,i||{}),o=r.__d),o)return r.__E=r}catch(a){n=a}throw n}},Jp=0,Qp=function(n){return n!=null&&n.constructor===void 0},_o.prototype.setState=function(n,e){var t;t=this.__s!=null&&this.__s!=this.state?this.__s:this.__s=Oi({},this.state),typeof n=="function"&&(n=n(Oi({},t),this.props)),n&&Oi(t,n),n!=null&&this.__v&&(e&&this._sb.push(e),Lh(this))},_o.prototype.forceUpdate=function(n){this.__v&&(this.__e=!0,n&&this.__h.push(n),Lh(this))},_o.prototype.render=Cn,lr=[],em=typeof Promise=="function"?Promise.prototype.then.bind(Promise.resolve()):setTimeout,tm=function(n,e){return n.__v.__b-e.__v.__b},Ya.__r=0,Zl=Math.random().toString(8),La="__d"+Zl,go="__a"+Zl,nm=/(PointerCapture)$|Capture$/i,md=0,nu=Nh(!1),iu=Nh(!0);function Cv(){if(document.getElementById("nels-graph-panel-style"))return;const n=document.createElement("style");n.id="nels-graph-panel-style",n.textContent=`
    .nels-panel {
      position: relative;
      width: 100%;
      height: 100%;
      min-height: 0;
      display: flex;
      flex-direction: column;
      color: #d8dee9;
      background: #05090f;
      font: 12px sans-serif;
      overflow: hidden;
    }
    .nels-panel * { box-sizing: border-box; }
    .nels-panel-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 12px;
      padding: 10px 12px;
      border-bottom: 1px solid #1a2232;
      background: #080d14;
    }
    .nels-panel-header strong { display: block; font-size: 13px; color: #f8fafc; }
    .nels-panel-header span { color: #93a4b8; }
    .nels-panel-actions {
      display: flex;
      align-items: center;
      gap: 8px;
    }
    .nels-panel button,
    .nels-panel select,
    .nels-panel input {
      height: 28px;
      border: 1px solid #1e2d40;
      border-radius: 4px;
      background: #0d1520;
      color: #e6edf3;
      padding: 0 8px;
    }
    .nels-panel button { cursor: pointer; }
    .nels-panel button:hover { background: #162030; }
    .nels-panel select { min-width: 180px; }
    .nels-switch {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      cursor: pointer;
      user-select: none;
    }
    .nels-switch-track {
      position: relative;
      width: 38px;
      height: 20px;
      background: #0d1520;
      border: 1px solid #1e2d40;
      border-radius: 999px;
      flex-shrink: 0;
      transition: background 0.2s, border-color 0.2s;
    }
    .nels-switch-track.on { background: #3b82f6; border-color: #3b82f6; }
    .nels-switch-thumb {
      position: absolute;
      top: 2px;
      left: 2px;
      width: 14px;
      height: 14px;
      background: #fff;
      border-radius: 50%;
      transition: transform 0.2s;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.4);
    }
    .nels-switch-track.on .nels-switch-thumb { transform: translateX(18px); }
    .nels-switch-label { font-size: 11px; color: #8b98a8; transition: color 0.15s; }
    .nels-switch-label.active { color: #e6edf3; }
    .nels-panel-body {
      flex: 1 1 0;
      min-height: 0;
      display: grid;
      grid-template-columns: minmax(420px, 1fr) minmax(320px, 400px);
      overflow: hidden;
    }
    .nels-panel-body.hidden,
    .nels-panel-logs-view.hidden {
      display: none;
    }
    .nels-panel-main {
      position: relative;
      min-height: 0;
      border-right: 1px solid #1a2232;
      background: #05090f;
      background-image:
        linear-gradient(rgba(30, 60, 100, 0.35) 1px, transparent 1px),
        linear-gradient(90deg, rgba(30, 60, 100, 0.35) 1px, transparent 1px);
      background-size: 40px 40px;
    }
    .nels-sigma-container { position: absolute; inset: 0; overflow: hidden; }
    .nels-sigma-container canvas { position: absolute; top: 0; left: 0; }
    .nels-panel-empty {
      position: absolute;
      inset: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #8b98a8;
      pointer-events: none;
      z-index: 1;
    }
    .nels-panel-hover {
      position: absolute;
      z-index: 2;
      max-width: 260px;
      padding: 7px 8px;
      border: 1px solid #1e2d40;
      border-radius: 5px;
      background: rgba(5, 9, 15, 0.97);
      color: #e6edf3;
      box-shadow: 0 12px 32px rgba(0, 0, 0, 0.5);
      pointer-events: none;
      font: 11px ui-monospace, SFMono-Regular, Consolas, monospace;
    }
    .nels-hover-recon { margin-top: 4px; padding-top: 4px; border-top: 1px solid #1e2d40; white-space: normal; word-break: break-word; }
    .nels-hover-recon-sim { color: #64849a; }
    .nels-panel-side {
      height: 100%;
      min-height: 0;
      max-height: 100%;
      padding: 10px 10px 48px;
      background: #070b10;
      display: flex;
      flex-direction: column;
      gap: 10px;
      overflow-y: auto;
      overflow-x: hidden;
      scrollbar-gutter: stable;
    }
    .nels-panel-side .nels-panel-card { flex: 0 0 auto; }
    .nels-panel-logs-view {
      flex: 1;
      min-height: 0;
      padding: 10px;
      background: #070b10;
      position: relative;
    }
    .nels-panel-logs-view .nels-panel-card { height: 100%; display: flex; flex-direction: column; }
    .nels-panel-card {
      min-height: 0;
      border: 1px solid #1a2232;
      border-radius: 6px;
      background: #090e16;
      overflow: visible;
    }
    .nels-panel-card summary {
      list-style: none;
      cursor: pointer;
      margin: 0;
      padding: 8px 10px;
      border-bottom: 1px solid #303946;
      font-size: 12px;
      font-weight: 700;
      color: #f8fafc;
    }
    .nels-panel-card summary::-webkit-details-marker { display: none; }
    .nels-panel-card summary::after {
      content: "collapse";
      float: right;
      color: #93a4b8;
      font-weight: 400;
      font-size: 11px;
    }
    .nels-panel-card:not([open]) summary { border-bottom: 0; }
    .nels-panel-card:not([open]) summary::after { content: "expand"; }
    .nels-panel-card h3 {
      margin: 0;
      padding: 8px 10px;
      border-bottom: 1px solid #303946;
      font-size: 12px;
      color: #f8fafc;
    }
    .nels-panel-card dl {
      display: grid;
      grid-template-columns: 102px 1fr;
      gap: 6px 8px;
      margin: 0;
      padding: 10px;
    }
    .nels-panel-card dt { color: #93a4b8; }
    .nels-panel-card dd { margin: 0; color: #d8dee9; overflow-wrap: anywhere; }
    .nels-panel-controls { display: grid; gap: 8px; padding: 10px; }
    .nels-panel-controls label {
      display: grid;
      grid-template-columns: 80px minmax(0, 1fr);
      align-items: center;
      gap: 8px;
    }
    .nels-panel-controls label span { color: #93a4b8; }
    .nels-panel-controls input,
    .nels-panel-controls select {
      width: 100%;
      min-width: 0;
    }
    .nels-op-select-label {
      background: rgba(59,130,246,0.06);
      border-left: 3px solid #3b82f6;
      border-top: none;
      border-right: none;
      border-bottom: none;
      border-radius: 0 3px 3px 0;
      padding: 5px 6px 5px 8px;
      margin: 0 -10px 0 -10px;
    }
    .nels-op-select-label span { color: #93c5fd !important; font-weight: 600; letter-spacing: 0.03em; }
    .nels-op-select-label select { border-color: rgba(59,130,246,0.35) !important; }
    .nels-axis-mode-toggle {
      display: flex;
      gap: 0;
      border: 1px solid #1e2d40;
      border-radius: 4px;
      overflow: hidden;
    }
    .nels-axis-mode-toggle button {
      flex: 1;
      height: 26px;
      font-size: 11px;
      font-weight: 600;
      letter-spacing: 0.04em;
      border: none;
      border-radius: 0;
      color: #64849a;
      background: transparent;
      cursor: pointer;
      transition: background 0.15s, color 0.15s;
    }
    .nels-axis-mode-toggle button:hover { background: #162030; color: #c0d4e8; }
    .nels-axis-mode-toggle button.active:first-child { background: rgba(59,130,246,0.18); color: #60a5fa; }
    .nels-axis-mode-toggle button.active:last-child  { background: rgba(249,115,22,0.15); color: #fb923c; }
    .nels-axis-mode-toggle button:first-child { border-right: 1px solid #1e2d40; }
    .nels-axis-no-b {
      font-size:10px; color:#fbbf24; line-height:1.4;
      background: rgba(251,191,36,0.08);
      border: 1px solid rgba(251,191,36,0.25);
      border-radius: 4px;
      padding: 6px 8px;
      margin-top: 4px;
    }
    .nels-panel-row { display: flex; gap: 8px; }
    .nels-panel-row button { flex: 1; }
    .nels-panel-log {
      flex: 1;
      overflow: auto;
      padding: 9px 10px;
      font: 11px ui-monospace, SFMono-Regular, Consolas, monospace;
      color: #cbd5e1;
    }
    .nels-panel-log-line { padding: 3px 0 5px; border-bottom: 1px solid rgba(48, 57, 70, 0.5); }
    .nels-panel-log-line.stale { opacity: 0.62; }
    .nels-panel-log-time { color: #8b98a8; }
    .nels-panel-log-node { color: #7dd3fc; }
    .nels-panel-log-type { color: #c084fc; }
    .nels-panel-log-status-failed { color: #fb7185; }
    .nels-center-loading { display: flex; flex-direction: column; align-items: center; gap: 14px; }
    .nels-spinner {
      width: 36px;
      height: 36px;
      border: 3px solid #1a2232;
      border-top-color: #3b82f6;
      border-radius: 50%;
      animation: nels-spin 0.9s linear infinite;
    }
    .nels-spinner-label { color: #93a4b8; font-size: 11px; letter-spacing: 0.03em; }
    @keyframes nels-spin { to { transform: rotate(360deg); } }
    .nels-loading-bar {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      height: 2px;
      z-index: 10;
      overflow: hidden;
      background: #0d1520;
    }
    .nels-loading-bar::after {
      content: "";
      display: block;
      width: 40%;
      height: 100%;
      background: #3b82f6;
      animation: nels-load 1.4s ease-in-out infinite;
    }
    @keyframes nels-load {
      0% { margin-left: -40%; }
      100% { margin-left: 140%; }
    }
    .nels-axis-legend-wrap {
      position: absolute;
      bottom: 8px;
      left: 50%;
      transform: translateX(-50%);
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 4px;
      pointer-events: none;
      z-index: 4;
    }
    .nels-axis-legend-row { display: flex; align-items: center; gap: 8px; }
    .nels-axis-legend-b2 .nels-axis-legend-row { gap: 6px; }
    .nels-axis-legend-llm { font-size: 9px; color: #94a3b8; margin-top: 1px; }
    .nels-axis-legend-b2 {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 3px;
      padding: 3px 8px;
      background: rgba(5,9,15,0.82);
      border: 1px solid rgba(255,255,255,0.08);
      border-radius: 4px;
      backdrop-filter: blur(4px);
      font: 9px ui-monospace, monospace;
      white-space: nowrap;
    }
    .nels-axis-legend-b2 .nels-axis-legend-side { max-width: 240px; overflow: hidden; text-overflow: ellipsis; }
    .nels-axis-legend-b2 .nels-axis-legend-a { color: #4ade80; }
    .nels-axis-legend-b2 .nels-axis-legend-b { color: #fb923c; }
    .nels-axis-legend-b2 .nels-axis-legend-bar {
      flex-shrink: 0;
      width: 40px;
      height: 4px;
      border-radius: 2px;
      background: linear-gradient(to right, #22c55e, #ffffff 50%, #f97316);
      opacity: 0.8;
    }
    .nels-axis-legend {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 3px;
      padding: 4px 10px;
      background: rgba(5,9,15,0.82);
      border: 1px solid rgba(255,255,255,0.1);
      border-radius: 4px;
      backdrop-filter: blur(4px);
      font: 10px ui-monospace, monospace;
      white-space: nowrap;
    }
    .nels-axis-legend-side { max-width: 240px; overflow: hidden; text-overflow: ellipsis; }
    .nels-axis-legend-a { color: #60a5fa; }
    .nels-axis-legend-b { color: #f87171; }
    .nels-axis-legend-bar {
      flex-shrink: 0;
      width: 56px;
      height: 6px;
      border-radius: 3px;
      background: linear-gradient(to right, #3b82f6, #ffffff 50%, #ef4444);
      opacity: 0.85;
    }
    .nels-anim-badge {
      position: absolute;
      bottom: 10px;
      left: 10px;
      z-index: 2;
      padding: 3px 8px;
      font-size: 10px;
      color: #fbbf24;
      background: rgba(251, 191, 36, 0.08);
      border: 1px solid rgba(251, 191, 36, 0.25);
      border-radius: 3px;
      pointer-events: none;
      letter-spacing: 0.04em;
    }
    .nels-selection-help {
      margin-top: 6px;
      border: none;
    }
    .nels-selection-help > summary {
      font-size: 10px;
      color: #4a7090;
      cursor: pointer;
      user-select: none;
      list-style: none;
      padding: 2px 0;
    }
    .nels-selection-help > summary::before {
      content: "▸ ";
    }
    .nels-selection-help[open] > summary::before {
      content: "▾ ";
    }
    .nels-sel-hint {
      padding: 4px 8px;
      font-size: 11px;
      color: #fbbf24;
      background: rgba(251, 191, 36, 0.08);
      border: 1px solid rgba(251, 191, 36, 0.25);
      border-radius: 4px;
    }
    .nels-axis-groups {
      display: flex;
      flex-direction: column;
      gap: 6px;
    }
    .nels-axis-group {
      border-radius: 4px;
      padding: 6px 8px;
      display: flex;
      flex-direction: column;
      gap: 4px;
    }
    .nels-axis-group-a {
      background: rgba(59, 130, 246, 0.08);
      border: 1px solid rgba(59, 130, 246, 0.3);
    }
    .nels-axis-group-b {
      background: rgba(239, 68, 68, 0.08);
      border: 1px solid rgba(239, 68, 68, 0.3);
    }
    .nels-axis-group-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 6px;
    }
    .nels-axis-group-label {
      font-size: 11px;
      font-weight: 600;
      letter-spacing: 0.05em;
      text-transform: uppercase;
    }
    .nels-axis-group-a .nels-axis-group-label { color: #60a5fa; }
    .nels-axis-group-b .nels-axis-group-label { color: #f87171; }
    .nels-axis-group-actions {
      display: flex;
      gap: 4px;
    }
    .nels-axis-group-actions button {
      height: 22px;
      font-size: 11px;
      padding: 0 7px;
    }
    .nels-axis-group-clear {
      background: rgba(255,255,255,0.04) !important;
      color: #8a9ab0 !important;
    }
    .nels-axis-group-clear:hover { background: rgba(255,255,255,0.09) !important; }
    .nels-axis-group-empty {
      font-size: 10px;
      color: #4a5a6a;
      font-style: italic;
    }
    .nels-axis-group-count {
      font-size: 11px;
      color: #8a9ab0;
    }
    .nels-trajectory-lane {
      border-top: 1px solid #1a2232;
      padding: 8px 10px;
      display: flex;
      flex-direction: column;
      gap: 6px;
    }
    .nels-trajectory-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 8px;
      font-size: 11px;
      color: #93a4b8;
    }
    .nels-toggle-overlay {
      height: 24px;
      padding: 0 8px;
      font-size: 11px;
      border: 1px solid #1e2d40;
      border-radius: 4px;
      background: #0d1520;
      color: #93a4b8;
      cursor: pointer;
    }
    .nels-toggle-overlay.active {
      border-color: rgba(251, 146, 60, 0.6);
      color: #fb923c;
      background: rgba(251, 146, 60, 0.08);
    }
    .nels-overlay-warning {
      font-size: 10px;
      color: #fb7185;
      background: rgba(251, 113, 133, 0.08);
      border: 1px solid rgba(251, 113, 133, 0.2);
      border-radius: 3px;
      padding: 3px 6px;
    }
    .nels-trajectory-scroll { max-height: 180px; overflow-y: auto; scrollbar-gutter: stable; }
    .nels-trajectory-table {
      width: 100%;
      border-collapse: collapse;
      font: 11px ui-monospace, SFMono-Regular, Consolas, monospace;
      table-layout: auto;
    }
    .nels-trajectory-table th {
      color: #93a4b8;
      text-align: left;
      padding: 2px 6px;
      font-weight: 400;
      border-bottom: 1px solid #1a2232;
    }
    .nels-trajectory-table th:nth-child(1),
    .nels-trajectory-table td:nth-child(1) { width: 1%; white-space: nowrap; }
    .nels-trajectory-table th:nth-child(2),
    .nels-trajectory-table td:nth-child(2) { width: 1%; white-space: nowrap; }
    .nels-trajectory-table th:nth-child(3),
    .nels-trajectory-table td:nth-child(3) { width: 100%; min-width: 0; }
    .nels-trajectory-table td {
      color: #d8dee9;
      padding: 3px 6px;
      border-bottom: 1px solid rgba(26, 34, 50, 0.5);
      vertical-align: middle;
      max-width: 0;
    }
    .nels-trajectory-table td:nth-child(1),
    .nels-trajectory-table td:nth-child(2) { max-width: none; }
    .nels-trajectory-table tr:last-child td { border-bottom: 0; }
    .nels-nearest-stack { display: flex; flex-direction: column; gap: 2px; min-width: 0; overflow: hidden; }
    .nels-delta-roles { display: flex; flex-direction: column; gap: 4px; margin: 6px 0 2px; }
    .nels-delta-role-row { display: flex; align-items: baseline; gap: 6px; min-width: 0; }
    .nels-delta-role-badge { font-size: 10px; font-weight: 700; color: #2dd4bf; background: rgba(45,212,191,0.12); border-radius: 3px; padding: 1px 5px; flex-shrink: 0; }
    .nels-delta-role-label { font-size: 11px; color: #cbd5e1; flex: 1; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; min-width: 0; }
    .nels-delta-role-desc { font-size: 10px; color: #4a7090; flex-shrink: 0; }
    .nels-nearest-sample {
      all: unset;
      cursor: pointer;
      font: inherit;
      display: block;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .nels-nearest-sample:hover { text-decoration: underline; }
    .nels-nearest-top { color: #7dd3fc; }
    .nels-nearest-secondary { color: #64849a; font-size: 10px; }
    .nels-nearest-dist { color: #93a4b8; }
    @media (max-width: 900px) {
      .nels-panel-body {
        grid-template-columns: 1fr;
        grid-template-rows: minmax(260px, 1fr) 320px;
      }
      .nels-panel-side { min-height: 0; }
      .nels-panel-main { border-right: 0; border-bottom: 1px solid #303946; }
    }
    .nels-panel select { color-scheme: dark; }
    .nels-session-ctrl { display: flex; align-items: center; gap: 4px; }
    .nels-panel .nels-icon-btn { width: 28px; padding: 0; font-size: 15px; }
    .nels-llm-chip {
      height: 24px;
      padding: 0 8px;
      font-size: 11px;
      border-radius: 4px;
      border: 1px solid #1e2d40;
      background: #0d1520;
      color: #4a6480;
      cursor: default;
    }
    .nels-llm-chip.loaded {
      border-color: #166534;
      background: #052e16;
      color: #4ade80;
      cursor: pointer;
    }
    .nels-llm-chip.loaded:hover { background: #14532d; }
    .nels-tab-group {
      display: inline-flex;
      background: #0d1520;
      border: 1px solid #1e2d40;
      border-radius: 6px;
      overflow: hidden;
    }
    .nels-panel .nels-tab-btn {
      border: none;
      background: transparent;
      color: #8b98a8;
      font-size: 12px;
      height: 26px;
      padding: 0 14px;
    }
    .nels-panel .nels-tab-btn.active { background: #1e3a5f; color: #e6edf3; }
    .nels-panel .nels-tab-btn:hover:not(.active) { background: rgba(30, 60, 100, 0.25); }
    .nels-alpha-section {
      display: flex;
      flex-direction: column;
      gap: 6px;
      width: 100%;
    }
    .nels-alpha-label { color: #93a4b8; font-size: 11px; }
    .nels-probe-coord-editor { display: flex; flex-direction: column; gap: 4px; }
    .nels-probe-coord-row { display: flex; align-items: center; gap: 6px; }
    .nels-probe-coord-row span { color: #93a4b8; font-size: 11px; width: 14px; flex-shrink: 0; }
    .nels-probe-coord-row input { flex: 1; font-family: monospace; font-size: 11px; }
    .nels-alpha-presets { display: flex; gap: 4px; flex-wrap: wrap; }
    .nels-panel .nels-alpha-preset-btn { height: 24px; font-size: 11px; color: #93a4b8; }
    .nels-panel .nels-alpha-preset-btn:hover { color: #e6edf3; }
    .nels-panel .nels-alpha-sort-btn { margin-left: auto; color: #fb923c; }
    .nels-panel .nels-alpha-sort-btn:hover { color: #fdba74; }
    .nels-alpha-list { display: flex; flex-direction: column; gap: 4px; }
    .nels-alpha-row { display: flex; align-items: center; gap: 6px; }
    .nels-alpha-val {
      width: 34px;
      font: 11px ui-monospace, SFMono-Regular, Consolas, monospace;
      color: #e6edf3;
      text-align: right;
      flex-shrink: 0;
    }
    .nels-panel .nels-alpha-slider {
      flex: 1;
      min-width: 0;
      height: auto;
      border: none;
      background: transparent;
      padding: 0;
      cursor: pointer;
      -webkit-appearance: none;
      appearance: none;
    }
    .nels-panel .nels-alpha-slider::-webkit-slider-runnable-track {
      height: 3px;
      border-radius: 2px;
      background: linear-gradient(to right, #fb923c var(--val, 0%), #1e2d40 var(--val, 0%));
    }
    .nels-panel .nels-alpha-slider::-webkit-slider-thumb {
      -webkit-appearance: none;
      width: 13px;
      height: 13px;
      border-radius: 50%;
      background: #fb923c;
      border: none;
      margin-top: -5px;
      cursor: pointer;
    }
    .nels-panel .nels-alpha-slider::-moz-range-track {
      height: 3px;
      border-radius: 2px;
      background: linear-gradient(to right, #fb923c var(--val, 0%), #1e2d40 var(--val, 0%));
      border: none;
    }
    .nels-panel .nels-alpha-slider::-moz-range-thumb {
      width: 13px;
      height: 13px;
      border-radius: 50%;
      background: #fb923c;
      border: none;
      cursor: pointer;
    }
    .nels-alpha-info {
      font-size: 10px;
      color: #64849a;
      line-height: 1.5;
    }
    .nels-op-description {
      font-size: 10px;
      color: #64849a;
      line-height: 1.5;
      padding: 2px 0;
    }
    .nels-resize-handle {
      width: 4px;
      cursor: col-resize;
      background: transparent;
      transition: background 0.15s;
      flex-shrink: 0;
      border-right: 1px solid #1a2232;
    }
    .nels-resize-handle:hover,
    .nels-resize-handle.dragging { background: #3b82f6; border-color: #3b82f6; }
    .nels-panel .nels-alpha-remove {
      width: 18px;
      height: 18px;
      padding: 0;
      border: none;
      background: transparent;
      color: #64849a;
      font-size: 14px;
    }
    .nels-panel .nels-alpha-remove:hover { color: #fb7185; background: transparent; }
    .nels-panel .nels-alpha-add {
      height: 24px;
      font-size: 11px;
      border: 1px dashed #1e2d40;
      background: transparent;
      color: #64849a;
      width: 100%;
      padding: 0;
    }
    .nels-panel .nels-alpha-add:hover {
      border-color: #3b82f6;
      color: #7dd3fc;
      background: transparent;
    }
    .nels-point-badge {
      position: absolute;
      top: 10px;
      left: 10px;
      z-index: 2;
      padding: 3px 8px;
      font-size: 10px;
      color: #7dd3fc;
      background: rgba(5, 9, 15, 0.85);
      border: 1px solid #1e2d40;
      border-radius: 3px;
      pointer-events: none;
      font-family: ui-monospace, SFMono-Regular, Consolas, monospace;
      letter-spacing: 0.04em;
    }
    .nels-view-logs-btn {
      position: absolute;
      bottom: 10px;
      right: 10px;
      z-index: 10;
      height: 26px;
      padding: 0 10px;
      font-size: 11px;
      border: 1px solid #1e2d40;
      border-radius: 4px;
      background: rgba(7, 11, 16, 0.9);
      color: #93a4b8;
      cursor: pointer;
    }
    .nels-view-logs-btn:hover { color: #e6edf3; border-color: #3b82f6; }
    .nels-cluster-overlay {
      position: absolute;
      top: 42px;
      left: 10px;
      z-index: 3;
      background: rgba(5, 9, 15, 0.88);
      border: 1px solid #1e2d40;
      border-radius: 6px;
      min-width: 210px;
      max-width: 300px;
      max-height: 360px;
      overflow-y: auto;
      backdrop-filter: blur(4px);
    }
    .nels-cluster-toggle-row {
      position: sticky;
      top: 0;
      z-index: 1;
      display: flex;
      align-items: center;
      background: rgba(5, 9, 15, 0.95);
      border-bottom: 1px solid #1e2d40;
    }
    .nels-cluster-toggle {
      flex: 1;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 5px 10px;
      background: none;
      border: none;
      cursor: pointer;
      color: #7daacc;
      font-size: 10px;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.07em;
      font-family: inherit;
    }
    .nels-cluster-toggle:hover { color: #b0d0e8; }
    .nels-cluster-toggle-icon { font-size: 8px; }
    .nels-hull-chip {
      flex-shrink: 0;
      margin-right: 6px;
      padding: 2px 7px;
      font-size: 10px;
      font-family: inherit;
      background: #0d1520;
      border: 1px solid #1e2d40;
      border-radius: 4px;
      color: #9aaabb;
      cursor: pointer;
      white-space: nowrap;
    }
    .nels-hull-chip:hover { border-color: #3b82f6; color: #b0d0e8; }
    .nels-hull-chip.active {
      background: rgba(59,130,246,0.18);
      border-color: #3b82f6;
      color: #7dd3fc;
    }
    .nels-legend-list { display: flex; flex-direction: column; gap: 1px; padding: 4px 0 6px; }
    .nels-legend-row {
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 4px 10px;
      cursor: pointer;
      border-left: 2px solid transparent;
      transition: background 0.1s;
    }
    .nels-legend-row:hover { background: rgba(255, 255, 255, 0.05); }
    .nels-legend-row.active {
      background: rgba(59, 130, 246, 0.12);
      border-left-color: #3b82f6;
    }
    .nels-legend-dot { width: 10px; height: 10px; border-radius: 50%; flex-shrink: 0; }
    .nels-legend-info {
      flex: 1;
      min-width: 0;
      display: flex;
      flex-direction: column;
      gap: 1px;
      overflow: hidden;
    }
    .nels-legend-name {
      font-size: 11px;
      color: #d8dee9;
      font-weight: 600;
      text-transform: capitalize;
    }
    .nels-legend-sample {
      font-size: 10px;
      color: #64849a;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      font-style: italic;
    }
    .nels-legend-meta {
      font-size: 10px;
      color: #64849a;
      flex-shrink: 0;
      font-family: ui-monospace, SFMono-Regular, Consolas, monospace;
    }

    .nels-hull-canvas {
      position: absolute;
      top: 0; left: 0;
      width: 100%; height: 100%;
      pointer-events: none;
      z-index: 5;
    }
    .nels-drag-select-rect {
      position: absolute;
      border: 1.5px dashed rgba(255,255,255,0.65);
      background: rgba(96,160,255,0.07);
      pointer-events: none;
      box-shadow: inset 0 0 0 1px rgba(96,160,255,0.15);
    }
    .nels-axis-lane {
      border-top: 1px solid #1a2232;
      padding: 8px 10px;
    }
    .nels-axis-header {
      font-size: 10px;
      color: #64849a;
      font-family: ui-monospace, SFMono-Regular, Consolas, monospace;
      margin-bottom: 6px;
      text-transform: uppercase;
      letter-spacing: 0.06em;
    }
    .nels-axis-side-label {
      font-size: 10px;
      font-weight: 600;
      margin-bottom: 3px;
      font-family: ui-monospace, SFMono-Regular, Consolas, monospace;
    }
    .nels-axis-col { display: flex; flex-direction: column; gap: 2px; }
    .nels-axis-bar {
      display: inline-block;
      height: 6px;
      border-radius: 2px;
      margin-right: 4px;
      vertical-align: middle;
      min-width: 2px;
    }
    .nels-cc-metrics {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
      font-size: 10px;
      color: #64849a;
      font-family: ui-monospace, SFMono-Regular, Consolas, monospace;
      margin-bottom: 6px;
    }
    .nels-cc-metrics strong { color: #e2e8f0; }
    .nels-cc-quality {
      padding: 1px 5px;
      border-radius: 3px;
      background: #1a2232;
      color: #22c55e;
      font-size: 9px;
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }
    .nels-cc-seed {
      font-size: 10px;
      color: #64849a;
      font-family: ui-monospace, SFMono-Regular, Consolas, monospace;
      margin-bottom: 4px;
      font-style: italic;
    }
    .nels-strength-row {
      display: flex;
      align-items: center;
      gap: 6px;
      flex: 1;
    }
    .nels-strength-row .nels-alpha-slider { flex: 1; }
    .nels-recon-live {
      border-left: 2px solid #2563eb;
    }
    .nels-recon-live-score {
      display: flex;
      align-items: center;
      gap: 6px;
      padding: 4px 0;
      font-size: 10px;
      color: #93a4b8;
    }
    .nels-recon-live-bar {
      flex: 1;
      height: 4px;
      background: #1a2232;
      border-radius: 2px;
      overflow: hidden;
    }
    .nels-recon-live-fill {
      height: 100%;
      background: #3b82f6;
      border-radius: 2px;
      transition: width 0.3s ease;
    }
    .nels-recon-live-text {
      font-size: 10px;
      color: #e2e8f0;
      font-style: italic;
      padding: 2px 0 4px;
      line-height: 1.4;
    }
    .nels-ctx-lane { margin-top: 6px; }
    .nels-ctx-summary { cursor: pointer; user-select: none; }
    .nels-ctx-group {
      margin: 4px 0 0;
    }
    .nels-ctx-group > summary {
      font-size: 10px;
      color: #64849a;
      cursor: pointer;
      padding: 2px 0;
      user-select: none;
    }
    .nels-ctx-group > summary:hover { color: #93a4b8; }
    .nels-ctx-dot {
      display: inline-block;
      width: 6px;
      height: 6px;
      border-radius: 50%;
      margin-right: 5px;
      flex-shrink: 0;
    }
  `,document.head.appendChild(n)}var Rv=0;function A(n,e,t,i,r,s){e||(e={});var o,a,l=e;if("ref"in l)for(a in l={},e)a=="ref"?o=e[a]:l[a]=e[a];var c={type:n,props:l,key:t,ref:o,__k:null,__:null,__b:0,__e:null,__c:null,constructor:void 0,__v:--Rv,__i:-1,__u:0,__source:r,__self:s};if(typeof n=="function"&&(o=n.defaultProps))for(a in o)l[a]===void 0&&(l[a]=o[a]);return ct.vnode&&ct.vnode(c),c}var Ao,Ft,Jl,Uh,qa=0,um=[],Gt=ct,Fh=Gt.__b,Oh=Gt.__r,kh=Gt.diffed,Bh=Gt.__c,zh=Gt.unmount,Gh=Gt.__;function xd(n,e){Gt.__h&&Gt.__h(Ft,n,qa||e),qa=0;var t=Ft.__H||(Ft.__H={__:[],__h:[]});return n>=t.__.length&&t.__.push({}),t.__[n]}function Pv(n){return qa=1,Lv(hm,n)}function Lv(n,e,t){var i=xd(Ao++,2);if(i.t=n,!i.__c&&(i.__=[hm(void 0,e),function(a){var l=i.__N?i.__N[0]:i.__[0],c=i.t(l,a);l!==c&&(i.__N=[c,i.__[1]],i.__c.setState({}))}],i.__c=Ft,!Ft.__f)){var r=function(a,l,c){if(!i.__c.__H)return!0;var u=i.__c.__H.__.filter(function(h){return h.__c});if(u.every(function(h){return!h.__N}))return!s||s.call(this,a,l,c);var d=i.__c.props!==a;return u.some(function(h){if(h.__N){var f=h.__[0];h.__=h.__N,h.__N=void 0,f!==h.__[0]&&(d=!0)}}),s&&s.call(this,a,l,c)||d};Ft.__f=!0;var s=Ft.shouldComponentUpdate,o=Ft.componentWillUpdate;Ft.componentWillUpdate=function(a,l,c){if(this.__e){var u=s;s=void 0,r(a,l,c),s=u}o&&o.call(this,a,l,c)},Ft.shouldComponentUpdate=r}return i.__N||i.__}function Rs(n,e){var t=xd(Ao++,3);!Gt.__s&&dm(t.__H,e)&&(t.__=n,t.u=e,Ft.__H.__h.push(t))}function Ka(n){return qa=5,bd(function(){return{current:n}},[])}function bd(n,e){var t=xd(Ao++,7);return dm(t.__H,e)&&(t.__=n(),t.__H=e,t.__h=n),t.__}function Dv(){for(var n;n=um.shift();){var e=n.__H;if(n.__P&&e)try{e.__h.some(Na),e.__h.some(su),e.__h=[]}catch(t){e.__h=[],Gt.__e(t,n.__v)}}}Gt.__b=function(n){Ft=null,Fh&&Fh(n)},Gt.__=function(n,e){n&&e.__k&&e.__k.__m&&(n.__m=e.__k.__m),Gh&&Gh(n,e)},Gt.__r=function(n){Oh&&Oh(n),Ao=0;var e=(Ft=n.__c).__H;e&&(Jl===Ft?(e.__h=[],Ft.__h=[],e.__.some(function(t){t.__N&&(t.__=t.__N),t.u=t.__N=void 0})):(e.__h.some(Na),e.__h.some(su),e.__h=[],Ao=0)),Jl=Ft},Gt.diffed=function(n){kh&&kh(n);var e=n.__c;e&&e.__H&&(e.__H.__h.length&&(um.push(e)!==1&&Uh===Gt.requestAnimationFrame||((Uh=Gt.requestAnimationFrame)||Nv)(Dv)),e.__H.__.some(function(t){t.u&&(t.__H=t.u),t.u=void 0})),Jl=Ft=null},Gt.__c=function(n,e){e.some(function(t){try{t.__h.some(Na),t.__h=t.__h.filter(function(i){return!i.__||su(i)})}catch(i){e.some(function(r){r.__h&&(r.__h=[])}),e=[],Gt.__e(i,t.__v)}}),Bh&&Bh(n,e)},Gt.unmount=function(n){zh&&zh(n);var e,t=n.__c;t&&t.__H&&(t.__H.__.some(function(i){try{Na(i)}catch(r){e=r}}),t.__H=void 0,e&&Gt.__e(e,t.__v))};var Hh=typeof requestAnimationFrame=="function";function Nv(n){var e,t=function(){clearTimeout(i),Hh&&cancelAnimationFrame(e),setTimeout(n)},i=setTimeout(t,35);Hh&&(e=requestAnimationFrame(t))}function Na(n){var e=Ft,t=n.__c;typeof t=="function"&&(n.__c=void 0,t()),Ft=e}function su(n){var e=Ft;n.__c=n.__(),Ft=e}function dm(n,e){return!n||n.length!==e.length||e.some(function(t,i){return t!==n[i]})}function hm(n,e){return typeof e=="function"?e(n):e}var Iv=Symbol.for("preact-signals");function Tl(){if(zi>1)zi--;else{var n,e=!1;for((function(){var r=Ja;for(Ja=void 0;r!==void 0;)r.S.v===r.v&&(r.S.i=r.i),r=r.o})();vo!==void 0;){var t=vo;for(vo=void 0,Za++;t!==void 0;){var i=t.u;if(t.u=void 0,t.f&=-3,!(8&t.f)&&mm(t))try{t.c()}catch(r){e||(n=r,e=!0)}t=i}}if(Za=0,zi--,e)throw n}}function Uv(n){if(zi>0)return n();ou=++Fv,zi++;try{return n()}finally{Tl()}}var at=void 0;function fm(n){var e=at;at=void 0;try{return n()}finally{at=e}}var vo=void 0,zi=0,Za=0,Fv=0,ou=0,Ja=void 0,Qa=0;function pm(n){if(at!==void 0){var e=n.n;if(e===void 0||e.t!==at)return e={i:0,S:n,p:at.s,n:void 0,t:at,e:void 0,x:void 0,r:e},at.s!==void 0&&(at.s.n=e),at.s=e,n.n=e,32&at.f&&n.S(e),e;if(e.i===-1)return e.i=0,e.n!==void 0&&(e.n.p=e.p,e.p!==void 0&&(e.p.n=e.n),e.p=at.s,e.n=void 0,at.s.n=e,at.s=e),e}}function rn(n,e){this.v=n,this.i=0,this.n=void 0,this.t=void 0,this.l=0,this.W=e==null?void 0:e.watched,this.Z=e==null?void 0:e.unwatched,this.name=e==null?void 0:e.name}rn.prototype.brand=Iv;rn.prototype.h=function(){return!0};rn.prototype.S=function(n){var e=this,t=this.t;t!==n&&n.e===void 0&&(n.x=t,this.t=n,t!==void 0?t.e=n:fm(function(){var i;(i=e.W)==null||i.call(e)}))};rn.prototype.U=function(n){var e=this;if(this.t!==void 0){var t=n.e,i=n.x;t!==void 0&&(t.x=i,n.e=void 0),i!==void 0&&(i.e=t,n.x=void 0),n===this.t&&(this.t=i,i===void 0&&fm(function(){var r;(r=e.Z)==null||r.call(e)}))}};rn.prototype.subscribe=function(n){var e=this;return jt(function(){var t=e.value,i=at;at=void 0;try{n(t)}finally{at=i}},{name:"sub"})};rn.prototype.valueOf=function(){return this.value};rn.prototype.toString=function(){return this.value+""};rn.prototype.toJSON=function(){return this.value};rn.prototype.peek=function(){var n=at;at=void 0;try{return this.value}finally{at=n}};Object.defineProperty(rn.prototype,"value",{get:function(){var n=pm(this);return n!==void 0&&(n.i=this.i),this.v},set:function(n){if(n!==this.v){if(Za>100)throw new Error("Cycle detected");(function(t){zi!==0&&Za===0&&t.l!==ou&&(t.l=ou,Ja={S:t,v:t.v,i:t.i,o:Ja})})(this),this.v=n,this.i++,Qa++,zi++;try{for(var e=this.t;e!==void 0;e=e.x)e.t.N()}finally{Tl()}}}});function st(n,e){return new rn(n,e)}function mm(n){for(var e=n.s;e!==void 0;e=e.n)if(e.S.i!==e.i||!e.S.h()||e.S.i!==e.i)return!0;return!1}function gm(n){for(var e=n.s;e!==void 0;e=e.n){var t=e.S.n;if(t!==void 0&&(e.r=t),e.S.n=e,e.i=-1,e.n===void 0){n.s=e;break}}}function _m(n){for(var e=n.s,t=void 0;e!==void 0;){var i=e.p;e.i===-1?(e.S.U(e),i!==void 0&&(i.n=e.n),e.n!==void 0&&(e.n.p=i)):t=e,e.S.n=e.r,e.r!==void 0&&(e.r=void 0),e=i}n.s=t}function Yr(n,e){rn.call(this,void 0),this.x=n,this.s=void 0,this.g=Qa-1,this.f=4,this.W=e==null?void 0:e.watched,this.Z=e==null?void 0:e.unwatched,this.name=e==null?void 0:e.name}Yr.prototype=new rn;Yr.prototype.h=function(){if(this.f&=-3,1&this.f)return!1;if((36&this.f)==32||(this.f&=-5,this.g===Qa))return!0;if(this.g=Qa,this.f|=1,this.i>0&&!mm(this))return this.f&=-2,!0;var n=at;try{gm(this),at=this;var e=this.x();(16&this.f||this.v!==e||this.i===0)&&(this.v=e,this.f&=-17,this.i++)}catch(t){this.v=t,this.f|=16,this.i++}return at=n,_m(this),this.f&=-2,!0};Yr.prototype.S=function(n){if(this.t===void 0){this.f|=36;for(var e=this.s;e!==void 0;e=e.n)e.S.S(e)}rn.prototype.S.call(this,n)};Yr.prototype.U=function(n){if(this.t!==void 0&&(rn.prototype.U.call(this,n),this.t===void 0)){this.f&=-33;for(var e=this.s;e!==void 0;e=e.n)e.S.U(e)}};Yr.prototype.N=function(){if(!(2&this.f)){this.f|=6;for(var n=this.t;n!==void 0;n=n.x)n.t.N()}};Object.defineProperty(Yr.prototype,"value",{get:function(){if(1&this.f)throw new Error("Cycle detected");var n=pm(this);if(this.h(),n!==void 0&&(n.i=this.i),16&this.f)throw this.v;return this.v}});function ti(n,e){return new Yr(n,e)}function vm(n){var e=n.m;if(n.m=void 0,typeof e=="function"){zi++;var t=at;at=void 0;try{e()}catch(i){throw n.f&=-2,n.f|=8,yd(n),i}finally{at=t,Tl()}}}function yd(n){for(var e=n.s;e!==void 0;e=e.n)e.S.U(e);n.x=void 0,n.s=void 0,vm(n)}function Ov(n){if(at!==this)throw new Error("Out-of-order effect");_m(this),at=n,this.f&=-2,8&this.f&&yd(this),Tl()}function Os(n,e){this.x=n,this.m=void 0,this.s=void 0,this.u=void 0,this.f=32,this.name=e==null?void 0:e.name}Os.prototype.c=function(){var n=this.S();try{if(8&this.f||this.x===void 0)return;var e=this.x();typeof e=="function"&&(this.m=e)}finally{n()}};Os.prototype.S=function(){if(1&this.f)throw new Error("Cycle detected");this.f|=1,this.f&=-9,vm(this),gm(this),zi++;var n=at;return at=this,Ov.bind(this,n)};Os.prototype.N=function(){2&this.f||(this.f|=2,this.u=vo,vo=this)};Os.prototype.d=function(){this.f|=8,1&this.f||yd(this)};Os.prototype.dispose=function(){this.d()};function jt(n,e){var t=new Os(n,e);try{t.c()}catch(r){throw t.d(),r}var i=t.d.bind(t);return i[Symbol.dispose]=i,i}var xm,jo,kv=typeof window<"u"&&!!window.__PREACT_SIGNALS_DEVTOOLS__,bm=[];jt(function(){xm=this.N})();function ks(n,e){ct[n]=e.bind(null,ct[n]||function(){})}function el(n){if(jo){var e=jo;jo=void 0,e()}jo=n&&n.S()}function ym(n){var e=this,t=n.data,i=zv(t);i.value=t;var r=bd(function(){for(var a=e,l=e.__v;l=l.__;)if(l.__c){l.__c.__$f|=4;break}var c=ti(function(){var f=i.value.value;return f===0?0:f===!0?"":f||""}),u=ti(function(){return!Array.isArray(c.value)&&!Qp(c.value)}),d=jt(function(){if(this.N=Sm,u.value){var f=c.value;a.__v&&a.__v.__e&&a.__v.__e.nodeType===3&&(a.__v.__e.data=f)}}),h=e.__$u.d;return e.__$u.d=function(){d(),h.call(this)},[u,c]},[]),s=r[0],o=r[1];return s.value?o.peek():o.value}ym.displayName="ReactiveTextNode";Object.defineProperties(rn.prototype,{constructor:{configurable:!0,value:void 0},type:{configurable:!0,value:ym},props:{configurable:!0,get:function(){var n=this;return{data:{get value(){return n.value}}}}},__b:{configurable:!0,value:1}});ks("__b",function(n,e){if(typeof e.type=="string"){var t,i=e.props;for(var r in i)if(r!=="children"){var s=i[r];s instanceof rn&&(t||(e.__np=t={}),t[r]=s,i[r]=s.peek())}}n(e)});ks("__r",function(n,e){if(n(e),e.type!==Cn){el();var t,i=e.__c;i&&(i.__$f&=-2,(t=i.__$u)===void 0&&(i.__$u=t=(function(r,s){var o;return jt(function(){o=this},{name:s}),o.c=r,o})(function(){var r;kv&&((r=t.y)==null||r.call(t)),i.__$f|=1,i.setState({})},typeof e.type=="function"?e.type.displayName||e.type.name:""))),el(t)}});ks("__e",function(n,e,t,i){el(),n(e,t,i)});ks("diffed",function(n,e){el();var t;if(typeof e.type=="string"&&(t=e.__e)){var i=e.__np,r=e.props;if(i){var s=t.U;if(s)for(var o in s){var a=s[o];a!==void 0&&!(o in i)&&(a.d(),s[o]=void 0)}else s={},t.U=s;for(var l in i){var c=s[l],u=i[l];c===void 0?(c=Bv(t,l,u),s[l]=c):c.o(u,r)}for(var d in i)r[d]=i[d]}}n(e)});function Bv(n,e,t,i){var r=e in n&&n.ownerSVGElement===void 0,s=st(t),o=t.peek();return{o:function(a,l){s.value=a,o=a.peek()},d:jt(function(){this.N=Sm;var a=s.value.value;o!==a?(o=void 0,r?n[e]=a:a!=null&&(a!==!1||e[4]==="-")?n.setAttribute(e,a):n.removeAttribute(e)):o=void 0})}}ks("unmount",function(n,e){if(typeof e.type=="string"){var t=e.__e;if(t){var i=t.U;if(i){t.U=void 0;for(var r in i){var s=i[r];s&&s.d()}}}e.__np=void 0}else{var o=e.__c;if(o){var a=o.__$u;a&&(o.__$u=void 0,a.d())}}n(e)});ks("__h",function(n,e,t,i){(i<3||i===9)&&(e.__$f|=2),n(e,t,i)});_o.prototype.shouldComponentUpdate=function(n,e){if(this.__R)return!0;var t=this.__$u,i=t&&t.s!==void 0;for(var r in e)return!0;if(this.__f||typeof this.u=="boolean"&&this.u===!0){var s=2&this.__$f;if(!(i||s||4&this.__$f)||1&this.__$f)return!0}else if(!(i||4&this.__$f)||3&this.__$f)return!0;for(var o in n)if(o!=="__source"&&n[o]!==this.props[o])return!0;for(var a in this.props)if(!(a in n))return!0;return!1};function zv(n,e){return bd(function(){return st(n,e)},[])}var Gv=function(n){queueMicrotask(function(){queueMicrotask(n)})};function Hv(){Uv(function(){for(var n;n=bm.shift();)xm.call(n)})}function Sm(){bm.push(this)===1&&(ct.requestAnimationFrame||Gv)(Hv)}function Vv(n){return Al("/nels/api/canvas-sessions/sync",{sessions:n})}function Wv(n){return Sd(`/nels/api/session/${encodeURIComponent(n)}`)}function $v(n,e){return Al(`/nels/api/session/${encodeURIComponent(n)}/ui-state`,e)}function Xv(n){return Al(`/nels/api/session/${encodeURIComponent(n)}/source-preview`,{})}function jv(){return Sd("/nels/api/llm/status")}function Yv(){return Al("/nels/api/llm/unload",{})}async function Sd(n,e){const t=await tu.fetchApi(n,e);if(!t.ok)throw new Error(`${t.status} ${t.statusText}`);return t.json()}function Al(n,e){return Sd(n,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(e??{})})}const tl=st([]),Ed=st("initializing"),br=st("graph"),Li=st(!0),xo=st(!1),Md=st(!1);function Ot(n,{priority:e=!1}={}){!e&&Md.value||(Ed.value=n)}function Vh(){Md.value=!0}function au(){Md.value=!1}function Wh(n){br.value=n}function Cl(n,e=0){const t=Number(n.state_revision??0),i={timestamp:n.timestamp??Date.now(),event_type:n.event_type??"event",node_name:n.node_name??"NELS",message:n.message??n.status??"",status:n.status??"",stale:e>0&&t>0&&t<e},r=tl.value,s=r.length>=300?[...r.slice(r.length-299),i]:[...r,i];tl.value=s}function qv(){tl.value=[]}const qe=st({operation:"inspect",neighbor_count:4,alpha_schedule:[0,.25,.5,.75,1],nearest_sample:!1,snap_endpoints:!0,variant_count:5,variation_strength:.3,axis_group_a:[],axis_group_b:[],probe_place_mode:!1,probe_coords:null,probe_cross_coords:null,probe_mode:"2d",probe_text_recon:!1,probe_recon_max_minutes:5,probe_recon_max_iter:10,probe_seed_count:15,probe_noise_count:5,probe_negative_count:5}),ke=st(null),gi=st(!1),Gi=st(!1),Di=st("a");function wd(n){var t;const e=[];n!=null&&n.source_point_id&&e.push(String(n.source_point_id));for(const i of(n==null?void 0:n.source_point_ids)??[])e.push(String(i));for(const i of(n==null?void 0:n.neighbors)??[])i.id&&e.push(String(i.id));for(const i of((t=n==null?void 0:n.selection)==null?void 0:t.selected_point_ids)??[])e.push(String(i));return e}const Em=st(null);function Ia(n){Em.value=n}const Mm=ti(()=>{var n;return Am((n=ke.value)==null?void 0:n.axis_b_projection)}),wm=ti(()=>{var n;return Am((n=ke.value)==null?void 0:n.axis_projection)});function Ut(n){qe.value={...qe.value,...n}}function Rl(n){var e;ke.value=n,gi.value=(((e=n==null?void 0:n.trajectory_overlay)==null?void 0:e.length)??0)>0,Gi.value=!1,Di.value="a"}function Kv(n){gi.value=n}function Tm(n){Gi.value=n,n&&(gi.value=!0)}function Am(n){if(!(n!=null&&n.length))return new Map;let e=1/0,t=-1/0;for(const s of n)s.projection_score<e&&(e=s.projection_score),s.projection_score>t&&(t=s.projection_score);const i=Math.max(t-e,1e-8),r=new Map;for(const s of n)r.set(s.id,(s.projection_score-e)/i);return r}const Et=st(new Set),wt=st(null),An=st(null);function Cm(n){return n.startsWith("__ghost__")||n==="probe"}const Rm=ti(()=>new Set(wd(ke.value)));function xs(n,e){if(e){const t=new Set(Et.value);t.has(n)?t.delete(n):t.add(n),Et.value=t}else Et.value=new Set([n])}function Td(){Et.value=new Set}function Zv(n,e){const t=e?n.filter(i=>Cm(i)||e.has(i)):n;Et.value=new Set(t)}const Fo=st(null),ut=st(t0()),ii=st("2d");let $h="",Yo=new Map,qo=new Map;function Pl(n,e={}){const t=Qv(n,e);Fo.value=t,ut.value=Pm(t)}function Xh(n){ii.value=n,ut.value=Pm(Fo.value)}function Jv(n,e,t){if(!e||!t.points.length)return!0;const i=new Set((n.points??[]).map(a=>String(a.id))),r=new Set(t.points.map(a=>String(a.id))),s=i.size===r.size&&[...i].every(a=>r.has(a)),o=JSON.stringify(lu(n))===JSON.stringify(lu(e));return!s||!o}function Pm(n){const e=Array.isArray(n==null?void 0:n.points)?n.points:[],t=ii.value,i=e.map(s=>t==="3d"&&s.coords_3d?{...s,view_coords:s.coords_3d}:t==="2d"&&s.coords_2d?{...s,view_coords:s.coords_2d}:s),r=new Map(i.map(s=>[String(s.id),s]));return{points:i,byId:r,bounds:e0(i)}}function lu(n){const e=(n==null?void 0:n.source_config)??{};return{dataset_path:e.dataset_path,load_mode:e.load_mode,count:e.count,window_start:e.window_start,random_seed:e.random_seed}}function Qv(n,e={}){if(!n)return null;const t=JSON.stringify(lu(n)),i=n.points??[],r=new Set(i.map(c=>String(c.id))),s=t===$h,o=s&&[...r].every(c=>Yo.has(c)||qo.has(c)),a=e.acceptCoordinates!==!1,l=e.forceCoordinates===!0||!s;return a&&(l||!o)?($h=t,Yo=new Map(i.filter(c=>c.coords_2d).map(c=>[String(c.id),c.coords_2d])),qo=new Map(i.filter(c=>c.coords_3d).map(c=>[String(c.id),c.coords_3d])),n):o?{...n,points:i.map(c=>{const u=String(c.id);return{...c,...Yo.has(u)?{coords_2d:Yo.get(u)}:{},...qo.has(u)?{coords_3d:qo.get(u)}:{}}})}:n}function e0(n){if(!n.length)return{minX:-1,maxX:1,minY:-1,maxY:1};const e=n.map(a=>{var l;return Number(((l=a.view_coords)==null?void 0:l[0])??0)}),t=n.map(a=>{var l;return Number(((l=a.view_coords)==null?void 0:l[1])??0)}),i=Math.min(...e),r=Math.max(...e),s=Math.min(...t),o=Math.max(...t);return{minX:i===r?i-1:i,maxX:i===r?r+1:r,minY:s===o?s-1:s,maxY:s===o?o+1:o}}function t0(){return{points:[],byId:new Map,bounds:{minX:-1,maxX:1,minY:-1,maxY:1}}}function n0(n,e){if(typeof n!="object"||!n)return n;var t=n[Symbol.toPrimitive];if(t!==void 0){var i=t.call(n,e);if(typeof i!="object")return i;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(n)}function bo(n){var e=n0(n,"string");return typeof e=="symbol"?e:e+""}function dn(n,e){if(!(n instanceof e))throw new TypeError("Cannot call a class as a function")}function jh(n,e){for(var t=0;t<e.length;t++){var i=e[t];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(n,bo(i.key),i)}}function hn(n,e,t){return e&&jh(n.prototype,e),t&&jh(n,t),Object.defineProperty(n,"prototype",{writable:!1}),n}function Ps(n){return Ps=Object.setPrototypeOf?Object.getPrototypeOf.bind():function(e){return e.__proto__||Object.getPrototypeOf(e)},Ps(n)}function Lm(){try{var n=!Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],function(){}))}catch{}return(Lm=function(){return!!n})()}function i0(n){if(n===void 0)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return n}function r0(n,e){if(e&&(typeof e=="object"||typeof e=="function"))return e;if(e!==void 0)throw new TypeError("Derived constructors may only return object or undefined");return i0(n)}function zn(n,e,t){return e=Ps(e),r0(n,Lm()?Reflect.construct(e,t||[],Ps(n).constructor):e.apply(n,t))}function cu(n,e){return cu=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(t,i){return t.__proto__=i,t},cu(n,e)}function Gn(n,e){if(typeof e!="function"&&e!==null)throw new TypeError("Super expression must either be null or a function");n.prototype=Object.create(e&&e.prototype,{constructor:{value:n,writable:!0,configurable:!0}}),Object.defineProperty(n,"prototype",{writable:!1}),e&&cu(n,e)}function s0(n){if(Array.isArray(n))return n}function o0(n,e){var t=n==null?null:typeof Symbol<"u"&&n[Symbol.iterator]||n["@@iterator"];if(t!=null){var i,r,s,o,a=[],l=!0,c=!1;try{if(s=(t=t.call(n)).next,e===0){if(Object(t)!==t)return;l=!1}else for(;!(l=(i=s.call(t)).done)&&(a.push(i.value),a.length!==e);l=!0);}catch(u){c=!0,r=u}finally{try{if(!l&&t.return!=null&&(o=t.return(),Object(o)!==o))return}finally{if(c)throw r}}return a}}function uu(n,e){(e==null||e>n.length)&&(e=n.length);for(var t=0,i=Array(e);t<e;t++)i[t]=n[t];return i}function Dm(n,e){if(n){if(typeof n=="string")return uu(n,e);var t={}.toString.call(n).slice(8,-1);return t==="Object"&&n.constructor&&(t=n.constructor.name),t==="Map"||t==="Set"?Array.from(n):t==="Arguments"||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t)?uu(n,e):void 0}}function a0(){throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)}function Ls(n,e){return s0(n)||o0(n,e)||Dm(n,e)||a0()}var Ql={black:"#000000",silver:"#C0C0C0",gray:"#808080",grey:"#808080",white:"#FFFFFF",maroon:"#800000",red:"#FF0000",purple:"#800080",fuchsia:"#FF00FF",green:"#008000",lime:"#00FF00",olive:"#808000",yellow:"#FFFF00",navy:"#000080",blue:"#0000FF",teal:"#008080",aqua:"#00FFFF",darkblue:"#00008B",mediumblue:"#0000CD",darkgreen:"#006400",darkcyan:"#008B8B",deepskyblue:"#00BFFF",darkturquoise:"#00CED1",mediumspringgreen:"#00FA9A",springgreen:"#00FF7F",cyan:"#00FFFF",midnightblue:"#191970",dodgerblue:"#1E90FF",lightseagreen:"#20B2AA",forestgreen:"#228B22",seagreen:"#2E8B57",darkslategray:"#2F4F4F",darkslategrey:"#2F4F4F",limegreen:"#32CD32",mediumseagreen:"#3CB371",turquoise:"#40E0D0",royalblue:"#4169E1",steelblue:"#4682B4",darkslateblue:"#483D8B",mediumturquoise:"#48D1CC",indigo:"#4B0082",darkolivegreen:"#556B2F",cadetblue:"#5F9EA0",cornflowerblue:"#6495ED",rebeccapurple:"#663399",mediumaquamarine:"#66CDAA",dimgray:"#696969",dimgrey:"#696969",slateblue:"#6A5ACD",olivedrab:"#6B8E23",slategray:"#708090",slategrey:"#708090",lightslategray:"#778899",lightslategrey:"#778899",mediumslateblue:"#7B68EE",lawngreen:"#7CFC00",chartreuse:"#7FFF00",aquamarine:"#7FFFD4",skyblue:"#87CEEB",lightskyblue:"#87CEFA",blueviolet:"#8A2BE2",darkred:"#8B0000",darkmagenta:"#8B008B",saddlebrown:"#8B4513",darkseagreen:"#8FBC8F",lightgreen:"#90EE90",mediumpurple:"#9370DB",darkviolet:"#9400D3",palegreen:"#98FB98",darkorchid:"#9932CC",yellowgreen:"#9ACD32",sienna:"#A0522D",brown:"#A52A2A",darkgray:"#A9A9A9",darkgrey:"#A9A9A9",lightblue:"#ADD8E6",greenyellow:"#ADFF2F",paleturquoise:"#AFEEEE",lightsteelblue:"#B0C4DE",powderblue:"#B0E0E6",firebrick:"#B22222",darkgoldenrod:"#B8860B",mediumorchid:"#BA55D3",rosybrown:"#BC8F8F",darkkhaki:"#BDB76B",mediumvioletred:"#C71585",indianred:"#CD5C5C",peru:"#CD853F",chocolate:"#D2691E",tan:"#D2B48C",lightgray:"#D3D3D3",lightgrey:"#D3D3D3",thistle:"#D8BFD8",orchid:"#DA70D6",goldenrod:"#DAA520",palevioletred:"#DB7093",crimson:"#DC143C",gainsboro:"#DCDCDC",plum:"#DDA0DD",burlywood:"#DEB887",lightcyan:"#E0FFFF",lavender:"#E6E6FA",darksalmon:"#E9967A",violet:"#EE82EE",palegoldenrod:"#EEE8AA",lightcoral:"#F08080",khaki:"#F0E68C",aliceblue:"#F0F8FF",honeydew:"#F0FFF0",azure:"#F0FFFF",sandybrown:"#F4A460",wheat:"#F5DEB3",beige:"#F5F5DC",whitesmoke:"#F5F5F5",mintcream:"#F5FFFA",ghostwhite:"#F8F8FF",salmon:"#FA8072",antiquewhite:"#FAEBD7",linen:"#FAF0E6",lightgoldenrodyellow:"#FAFAD2",oldlace:"#FDF5E6",magenta:"#FF00FF",deeppink:"#FF1493",orangered:"#FF4500",tomato:"#FF6347",hotpink:"#FF69B4",coral:"#FF7F50",darkorange:"#FF8C00",lightsalmon:"#FFA07A",orange:"#FFA500",lightpink:"#FFB6C1",pink:"#FFC0CB",gold:"#FFD700",peachpuff:"#FFDAB9",navajowhite:"#FFDEAD",moccasin:"#FFE4B5",bisque:"#FFE4C4",mistyrose:"#FFE4E1",blanchedalmond:"#FFEBCD",papayawhip:"#FFEFD5",lavenderblush:"#FFF0F5",seashell:"#FFF5EE",cornsilk:"#FFF8DC",lemonchiffon:"#FFFACD",floralwhite:"#FFFAF0",snow:"#FFFAFA",lightyellow:"#FFFFE0",ivory:"#FFFFF0"},Nm=new Int8Array(4),ec=new Int32Array(Nm.buffer,0,1),l0=new Float32Array(Nm.buffer,0,1),c0=/^\s*rgba?\s*\(/,u0=/^\s*rgba?\s*\(\s*([0-9]*)\s*,\s*([0-9]*)\s*,\s*([0-9]*)(?:\s*,\s*(.*)?)?\)\s*$/;function d0(n){var e=0,t=0,i=0,r=1;if(n[0]==="#")n.length===4?(e=parseInt(n.charAt(1)+n.charAt(1),16),t=parseInt(n.charAt(2)+n.charAt(2),16),i=parseInt(n.charAt(3)+n.charAt(3),16)):(e=parseInt(n.charAt(1)+n.charAt(2),16),t=parseInt(n.charAt(3)+n.charAt(4),16),i=parseInt(n.charAt(5)+n.charAt(6),16)),n.length===9&&(r=parseInt(n.charAt(7)+n.charAt(8),16)/255);else if(c0.test(n)){var s=n.match(u0);s&&(e=+s[1],t=+s[2],i=+s[3],s[4]&&(r=+s[4]))}return{r:e,g:t,b:i,a:r}}var bs={};for(var Ko in Ql)bs[Ko]=Bs(Ql[Ko]),bs[Ql[Ko]]=bs[Ko];function Im(n,e,t,i,r){return ec[0]=i<<24|t<<16|e<<8|n,ec[0]=ec[0]&4278190079,l0[0]}function Bs(n){if(n=n.toLowerCase(),typeof bs[n]<"u")return bs[n];var e=d0(n),t=e.r,i=e.g,r=e.b,s=e.a;s=s*255|0;var o=Im(t,i,r,s);return bs[n]=o,o}var tc={};function Um(n){if(typeof tc[n]<"u")return tc[n];var e=(n&16711680)>>>16,t=(n&65280)>>>8,i=n&255,r=255,s=Im(e,t,i,r);return tc[n]=s,s}function Yh(n,e,t,i){return t+(e<<8)+(n<<16)}function qh(n,e,t,i,r,s){var o=Math.floor(t/s*r),a=Math.floor(n.drawingBufferHeight/s-i/s*r),l=new Uint8Array(4);n.bindFramebuffer(n.FRAMEBUFFER,e),n.readPixels(o,a,1,1,n.RGBA,n.UNSIGNED_BYTE,l);var c=Ls(l,4),u=c[0],d=c[1],h=c[2],f=c[3];return[u,d,h,f]}function Q(n,e,t){return(e=bo(e))in n?Object.defineProperty(n,e,{value:t,enumerable:!0,configurable:!0,writable:!0}):n[e]=t,n}function Kh(n,e){var t=Object.keys(n);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(n);e&&(i=i.filter(function(r){return Object.getOwnPropertyDescriptor(n,r).enumerable})),t.push.apply(t,i)}return t}function Me(n){for(var e=1;e<arguments.length;e++){var t=arguments[e]!=null?arguments[e]:{};e%2?Kh(Object(t),!0).forEach(function(i){Q(n,i,t[i])}):Object.getOwnPropertyDescriptors?Object.defineProperties(n,Object.getOwnPropertyDescriptors(t)):Kh(Object(t)).forEach(function(i){Object.defineProperty(n,i,Object.getOwnPropertyDescriptor(t,i))})}return n}function h0(n,e){for(;!{}.hasOwnProperty.call(n,e)&&(n=Ps(n))!==null;);return n}function du(){return du=typeof Reflect<"u"&&Reflect.get?Reflect.get.bind():function(n,e,t){var i=h0(n,e);if(i){var r=Object.getOwnPropertyDescriptor(i,e);return r.get?r.get.call(arguments.length<3?n:t):r.value}},du.apply(null,arguments)}function Fm(n,e,t,i){var r=du(Ps(n.prototype),e,t);return typeof r=="function"?function(s){return r.apply(t,s)}:r}function f0(n){return n.normalized?1:n.size}function nc(n){var e=0;return n.forEach(function(t){return e+=f0(t)}),e}function Om(n,e,t){var i=n==="VERTEX"?e.VERTEX_SHADER:e.FRAGMENT_SHADER,r=e.createShader(i);if(r===null)throw new Error("loadShader: error while creating the shader");e.shaderSource(r,t),e.compileShader(r);var s=e.getShaderParameter(r,e.COMPILE_STATUS);if(!s){var o=e.getShaderInfoLog(r);throw e.deleteShader(r),new Error(`loadShader: error while compiling the shader:
`.concat(o,`
`).concat(t))}return r}function p0(n,e){return Om("VERTEX",n,e)}function m0(n,e){return Om("FRAGMENT",n,e)}function g0(n,e){var t=n.createProgram();if(t===null)throw new Error("loadProgram: error while creating the program.");var i,r;for(i=0,r=e.length;i<r;i++)n.attachShader(t,e[i]);n.linkProgram(t);var s=n.getProgramParameter(t,n.LINK_STATUS);if(!s)throw n.deleteProgram(t),new Error("loadProgram: error while linking the program.");return t}function Zh(n){var e=n.gl,t=n.buffer,i=n.program,r=n.vertexShader,s=n.fragmentShader;e.deleteShader(r),e.deleteShader(s),e.deleteProgram(i),e.deleteBuffer(t)}var Jh=`#define PICKING_MODE
`,_0=Q(Q(Q(Q(Q(Q(Q(Q({},WebGL2RenderingContext.BOOL,1),WebGL2RenderingContext.BYTE,1),WebGL2RenderingContext.UNSIGNED_BYTE,1),WebGL2RenderingContext.SHORT,2),WebGL2RenderingContext.UNSIGNED_SHORT,2),WebGL2RenderingContext.INT,4),WebGL2RenderingContext.UNSIGNED_INT,4),WebGL2RenderingContext.FLOAT,4),km=(function(){function n(e,t,i){dn(this,n),Q(this,"array",new Float32Array),Q(this,"constantArray",new Float32Array),Q(this,"capacity",0),Q(this,"verticesCount",0);var r=this.getDefinition();if(this.VERTICES=r.VERTICES,this.VERTEX_SHADER_SOURCE=r.VERTEX_SHADER_SOURCE,this.FRAGMENT_SHADER_SOURCE=r.FRAGMENT_SHADER_SOURCE,this.UNIFORMS=r.UNIFORMS,this.ATTRIBUTES=r.ATTRIBUTES,this.METHOD=r.METHOD,this.CONSTANT_ATTRIBUTES="CONSTANT_ATTRIBUTES"in r?r.CONSTANT_ATTRIBUTES:[],this.CONSTANT_DATA="CONSTANT_DATA"in r?r.CONSTANT_DATA:[],this.isInstanced="CONSTANT_ATTRIBUTES"in r,this.ATTRIBUTES_ITEMS_COUNT=nc(this.ATTRIBUTES),this.STRIDE=this.VERTICES*this.ATTRIBUTES_ITEMS_COUNT,this.renderer=i,this.normalProgram=this.getProgramInfo("normal",e,r.VERTEX_SHADER_SOURCE,r.FRAGMENT_SHADER_SOURCE,null),this.pickProgram=t?this.getProgramInfo("pick",e,Jh+r.VERTEX_SHADER_SOURCE,Jh+r.FRAGMENT_SHADER_SOURCE,t):null,this.isInstanced){var s=nc(this.CONSTANT_ATTRIBUTES);if(this.CONSTANT_DATA.length!==this.VERTICES)throw new Error("Program: error while getting constant data (expected ".concat(this.VERTICES," items, received ").concat(this.CONSTANT_DATA.length," instead)"));this.constantArray=new Float32Array(this.CONSTANT_DATA.length*s);for(var o=0;o<this.CONSTANT_DATA.length;o++){var a=this.CONSTANT_DATA[o];if(a.length!==s)throw new Error("Program: error while getting constant data (one vector has ".concat(a.length," items instead of ").concat(s,")"));for(var l=0;l<a.length;l++)this.constantArray[o*s+l]=a[l]}this.STRIDE=this.ATTRIBUTES_ITEMS_COUNT}}return hn(n,[{key:"kill",value:function(){Zh(this.normalProgram),this.pickProgram&&(Zh(this.pickProgram),this.pickProgram=null)}},{key:"getProgramInfo",value:function(t,i,r,s,o){var a=this.getDefinition(),l=i.createBuffer();if(l===null)throw new Error("Program: error while creating the WebGL buffer.");var c=p0(i,r),u=m0(i,s),d=g0(i,[c,u]),h={};a.UNIFORMS.forEach(function(_){var g=i.getUniformLocation(d,_);g&&(h[_]=g)});var f={};a.ATTRIBUTES.forEach(function(_){f[_.name]=i.getAttribLocation(d,_.name)});var p;if("CONSTANT_ATTRIBUTES"in a&&(a.CONSTANT_ATTRIBUTES.forEach(function(_){f[_.name]=i.getAttribLocation(d,_.name)}),p=i.createBuffer(),p===null))throw new Error("Program: error while creating the WebGL constant buffer.");return{name:t,program:d,gl:i,frameBuffer:o,buffer:l,constantBuffer:p||{},uniformLocations:h,attributeLocations:f,isPicking:t==="pick",vertexShader:c,fragmentShader:u}}},{key:"bindProgram",value:function(t){var i=this,r=0,s=t.gl,o=t.buffer;this.isInstanced?(s.bindBuffer(s.ARRAY_BUFFER,t.constantBuffer),r=0,this.CONSTANT_ATTRIBUTES.forEach(function(a){return r+=i.bindAttribute(a,t,r,!1)}),s.bufferData(s.ARRAY_BUFFER,this.constantArray,s.STATIC_DRAW),s.bindBuffer(s.ARRAY_BUFFER,t.buffer),r=0,this.ATTRIBUTES.forEach(function(a){return r+=i.bindAttribute(a,t,r,!0)}),s.bufferData(s.ARRAY_BUFFER,this.array,s.DYNAMIC_DRAW)):(s.bindBuffer(s.ARRAY_BUFFER,o),r=0,this.ATTRIBUTES.forEach(function(a){return r+=i.bindAttribute(a,t,r)}),s.bufferData(s.ARRAY_BUFFER,this.array,s.DYNAMIC_DRAW)),s.bindBuffer(s.ARRAY_BUFFER,null)}},{key:"unbindProgram",value:function(t){var i=this;this.isInstanced?(this.CONSTANT_ATTRIBUTES.forEach(function(r){return i.unbindAttribute(r,t,!1)}),this.ATTRIBUTES.forEach(function(r){return i.unbindAttribute(r,t,!0)})):this.ATTRIBUTES.forEach(function(r){return i.unbindAttribute(r,t)})}},{key:"bindAttribute",value:function(t,i,r,s){var o=_0[t.type];if(typeof o!="number")throw new Error('Program.bind: yet unsupported attribute type "'.concat(t.type,'"'));var a=i.attributeLocations[t.name],l=i.gl;if(a!==-1){l.enableVertexAttribArray(a);var c=this.isInstanced?(s?this.ATTRIBUTES_ITEMS_COUNT:nc(this.CONSTANT_ATTRIBUTES))*Float32Array.BYTES_PER_ELEMENT:this.ATTRIBUTES_ITEMS_COUNT*Float32Array.BYTES_PER_ELEMENT;if(l.vertexAttribPointer(a,t.size,t.type,t.normalized||!1,c,r),this.isInstanced&&s)if(l instanceof WebGL2RenderingContext)l.vertexAttribDivisor(a,1);else{var u=l.getExtension("ANGLE_instanced_arrays");u&&u.vertexAttribDivisorANGLE(a,1)}}return t.size*o}},{key:"unbindAttribute",value:function(t,i,r){var s=i.attributeLocations[t.name],o=i.gl;if(s!==-1&&(o.disableVertexAttribArray(s),this.isInstanced&&r))if(o instanceof WebGL2RenderingContext)o.vertexAttribDivisor(s,0);else{var a=o.getExtension("ANGLE_instanced_arrays");a&&a.vertexAttribDivisorANGLE(s,0)}}},{key:"reallocate",value:function(t){t!==this.capacity&&(this.capacity=t,this.verticesCount=this.VERTICES*t,this.array=new Float32Array(this.isInstanced?this.capacity*this.ATTRIBUTES_ITEMS_COUNT:this.verticesCount*this.ATTRIBUTES_ITEMS_COUNT))}},{key:"hasNothingToRender",value:function(){return this.verticesCount===0}},{key:"renderProgram",value:function(t,i){var r=i.gl,s=i.program;r.enable(r.BLEND),r.useProgram(s),this.setUniforms(t,i),this.drawWebGL(this.METHOD,i)}},{key:"render",value:function(t){this.hasNothingToRender()||(this.pickProgram&&(this.pickProgram.gl.viewport(0,0,t.width*t.pixelRatio/t.downSizingRatio,t.height*t.pixelRatio/t.downSizingRatio),this.bindProgram(this.pickProgram),this.renderProgram(Me(Me({},t),{},{pixelRatio:t.pixelRatio/t.downSizingRatio}),this.pickProgram),this.unbindProgram(this.pickProgram)),this.normalProgram.gl.viewport(0,0,t.width*t.pixelRatio,t.height*t.pixelRatio),this.bindProgram(this.normalProgram),this.renderProgram(t,this.normalProgram),this.unbindProgram(this.normalProgram))}},{key:"drawWebGL",value:function(t,i){var r=i.gl,s=i.frameBuffer;if(r.bindFramebuffer(r.FRAMEBUFFER,s),!this.isInstanced)r.drawArrays(t,0,this.verticesCount);else if(r instanceof WebGL2RenderingContext)r.drawArraysInstanced(t,0,this.VERTICES,this.capacity);else{var o=r.getExtension("ANGLE_instanced_arrays");o&&o.drawArraysInstancedANGLE(t,0,this.VERTICES,this.capacity)}}}])})(),v0=(function(n){function e(){return dn(this,e),zn(this,e,arguments)}return Gn(e,n),hn(e,[{key:"kill",value:function(){Fm(e,"kill",this)([])}},{key:"process",value:function(i,r,s){var o=r*this.STRIDE;if(s.hidden){for(var a=o+this.STRIDE;o<a;o++)this.array[o]=0;return}return this.processVisibleItem(Um(i),o,s)}}])})(km),Ll=(function(n){function e(){var t;dn(this,e);for(var i=arguments.length,r=new Array(i),s=0;s<i;s++)r[s]=arguments[s];return t=zn(this,e,[].concat(r)),Q(t,"drawLabel",void 0),t}return Gn(e,n),hn(e,[{key:"kill",value:function(){Fm(e,"kill",this)([])}},{key:"process",value:function(i,r,s,o,a){var l=r*this.STRIDE;if(a.hidden||s.hidden||o.hidden){for(var c=l+this.STRIDE;l<c;l++)this.array[l]=0;return}return this.processVisibleItem(Um(i),l,s,o,a)}}])})(km);function x0(n,e){return(function(){function t(i,r,s){dn(this,t),Q(this,"drawLabel",e),this.programs=n.map(function(o){return new o(i,r,s)})}return hn(t,[{key:"reallocate",value:function(r){this.programs.forEach(function(s){return s.reallocate(r)})}},{key:"process",value:function(r,s,o,a,l){this.programs.forEach(function(c){return c.process(r,s,o,a,l)})}},{key:"render",value:function(r){this.programs.forEach(function(s){return s.render(r)})}},{key:"kill",value:function(){this.programs.forEach(function(r){return r.kill()})}}])})()}function b0(n,e,t,i,r){var s=r.edgeLabelSize,o=r.edgeLabelFont,a=r.edgeLabelWeight,l=r.edgeLabelColor.attribute?e[r.edgeLabelColor.attribute]||r.edgeLabelColor.color||"#000":r.edgeLabelColor.color,c=e.label;if(c){n.fillStyle=l,n.font="".concat(a," ").concat(s,"px ").concat(o);var u=t.size,d=i.size,h=t.x,f=t.y,p=i.x,_=i.y,g=(h+p)/2,m=(f+_)/2,v=p-h,E=_-f,x=Math.sqrt(v*v+E*E);if(!(x<u+d)){h+=v*u/x,f+=E*u/x,p-=v*d/x,_-=E*d/x,g=(h+p)/2,m=(f+_)/2,v=p-h,E=_-f,x=Math.sqrt(v*v+E*E);var w=n.measureText(c).width;if(w>x){var S="…";for(c=c+S,w=n.measureText(c).width;w>x&&c.length>1;)c=c.slice(0,-2)+S,w=n.measureText(c).width;if(c.length<4)return}var C;v>0?E>0?C=Math.acos(v/x):C=Math.asin(E/x):E>0?C=Math.acos(v/x)+Math.PI:C=Math.asin(v/x)+Math.PI/2,n.save(),n.translate(g,m),n.rotate(C),n.fillText(c,-w/2,e.size/2+s),n.restore()}}}function Bm(n,e,t){if(e.label){var i=t.labelSize,r=t.labelFont,s=t.labelWeight,o=t.labelColor.attribute?e[t.labelColor.attribute]||t.labelColor.color||"#000":t.labelColor.color;n.fillStyle=o,n.font="".concat(s," ").concat(i,"px ").concat(r),n.fillText(e.label,e.x+e.size+3,e.y+i/3)}}function y0(n,e,t){var i=t.labelSize,r=t.labelFont,s=t.labelWeight;n.font="".concat(s," ").concat(i,"px ").concat(r),n.fillStyle="#FFF",n.shadowOffsetX=0,n.shadowOffsetY=0,n.shadowBlur=8,n.shadowColor="#000";var o=2;if(typeof e.label=="string"){var a=n.measureText(e.label).width,l=Math.round(a+5),c=Math.round(i+2*o),u=Math.max(e.size,i/2)+o,d=Math.asin(c/2/u),h=Math.sqrt(Math.abs(Math.pow(u,2)-Math.pow(c/2,2)));n.beginPath(),n.moveTo(e.x+h,e.y+c/2),n.lineTo(e.x+u+l,e.y+c/2),n.lineTo(e.x+u+l,e.y-c/2),n.lineTo(e.x+h,e.y-c/2),n.arc(e.x,e.y,u,d,-d),n.closePath(),n.fill()}else n.beginPath(),n.arc(e.x,e.y,e.size+o,0,Math.PI*2),n.closePath(),n.fill();n.shadowOffsetX=0,n.shadowOffsetY=0,n.shadowBlur=0,Bm(n,e,t)}var S0=`
precision highp float;

varying vec4 v_color;
varying vec2 v_diffVector;
varying float v_radius;

uniform float u_correctionRatio;

const vec4 transparent = vec4(0.0, 0.0, 0.0, 0.0);

void main(void) {
  float border = u_correctionRatio * 2.0;
  float dist = length(v_diffVector) - v_radius + border;

  // No antialiasing for picking mode:
  #ifdef PICKING_MODE
  if (dist > border)
    gl_FragColor = transparent;
  else
    gl_FragColor = v_color;

  #else
  float t = 0.0;
  if (dist > border)
    t = 1.0;
  else if (dist > 0.0)
    t = dist / border;

  gl_FragColor = mix(v_color, transparent, t);
  #endif
}
`,E0=S0,M0=`
attribute vec4 a_id;
attribute vec4 a_color;
attribute vec2 a_position;
attribute float a_size;
attribute float a_angle;

uniform mat3 u_matrix;
uniform float u_sizeRatio;
uniform float u_correctionRatio;

varying vec4 v_color;
varying vec2 v_diffVector;
varying float v_radius;
varying float v_border;

const float bias = 255.0 / 254.0;

void main() {
  float size = a_size * u_correctionRatio / u_sizeRatio * 4.0;
  vec2 diffVector = size * vec2(cos(a_angle), sin(a_angle));
  vec2 position = a_position + diffVector;
  gl_Position = vec4(
    (u_matrix * vec3(position, 1)).xy,
    0,
    1
  );

  v_diffVector = diffVector;
  v_radius = size / 2.0;

  #ifdef PICKING_MODE
  // For picking mode, we use the ID as the color:
  v_color = a_id;
  #else
  // For normal mode, we use the color:
  v_color = a_color;
  #endif

  v_color.a *= bias;
}
`,w0=M0,zm=WebGLRenderingContext,Qh=zm.UNSIGNED_BYTE,ic=zm.FLOAT,T0=["u_sizeRatio","u_correctionRatio","u_matrix"],Dl=(function(n){function e(){return dn(this,e),zn(this,e,arguments)}return Gn(e,n),hn(e,[{key:"getDefinition",value:function(){return{VERTICES:3,VERTEX_SHADER_SOURCE:w0,FRAGMENT_SHADER_SOURCE:E0,METHOD:WebGLRenderingContext.TRIANGLES,UNIFORMS:T0,ATTRIBUTES:[{name:"a_position",size:2,type:ic},{name:"a_size",size:1,type:ic},{name:"a_color",size:4,type:Qh,normalized:!0},{name:"a_id",size:4,type:Qh,normalized:!0}],CONSTANT_ATTRIBUTES:[{name:"a_angle",size:1,type:ic}],CONSTANT_DATA:[[e.ANGLE_1],[e.ANGLE_2],[e.ANGLE_3]]}}},{key:"processVisibleItem",value:function(i,r,s){var o=this.array,a=Bs(s.color);o[r++]=s.x,o[r++]=s.y,o[r++]=s.size,o[r++]=a,o[r++]=i}},{key:"setUniforms",value:function(i,r){var s=r.gl,o=r.uniformLocations,a=o.u_sizeRatio,l=o.u_correctionRatio,c=o.u_matrix;s.uniform1f(l,i.correctionRatio),s.uniform1f(a,i.sizeRatio),s.uniformMatrix3fv(c,!1,i.matrix)}}])})(v0);Q(Dl,"ANGLE_1",0);Q(Dl,"ANGLE_2",2*Math.PI/3);Q(Dl,"ANGLE_3",4*Math.PI/3);var A0=`
precision mediump float;

varying vec4 v_color;

void main(void) {
  gl_FragColor = v_color;
}
`,C0=A0,R0=`
attribute vec2 a_position;
attribute vec2 a_normal;
attribute float a_radius;
attribute vec3 a_barycentric;

#ifdef PICKING_MODE
attribute vec4 a_id;
#else
attribute vec4 a_color;
#endif

uniform mat3 u_matrix;
uniform float u_sizeRatio;
uniform float u_correctionRatio;
uniform float u_minEdgeThickness;
uniform float u_lengthToThicknessRatio;
uniform float u_widenessToThicknessRatio;

varying vec4 v_color;

const float bias = 255.0 / 254.0;

void main() {
  float minThickness = u_minEdgeThickness;

  float normalLength = length(a_normal);
  vec2 unitNormal = a_normal / normalLength;

  // These first computations are taken from edge.vert.glsl and
  // edge.clamped.vert.glsl. Please read it to get better comments on what's
  // happening:
  float pixelsThickness = max(normalLength / u_sizeRatio, minThickness);
  float webGLThickness = pixelsThickness * u_correctionRatio;
  float webGLNodeRadius = a_radius * 2.0 * u_correctionRatio / u_sizeRatio;
  float webGLArrowHeadLength = webGLThickness * u_lengthToThicknessRatio * 2.0;
  float webGLArrowHeadThickness = webGLThickness * u_widenessToThicknessRatio;

  float da = a_barycentric.x;
  float db = a_barycentric.y;
  float dc = a_barycentric.z;

  vec2 delta = vec2(
      da * (webGLNodeRadius * unitNormal.y)
    + db * ((webGLNodeRadius + webGLArrowHeadLength) * unitNormal.y + webGLArrowHeadThickness * unitNormal.x)
    + dc * ((webGLNodeRadius + webGLArrowHeadLength) * unitNormal.y - webGLArrowHeadThickness * unitNormal.x),

      da * (-webGLNodeRadius * unitNormal.x)
    + db * (-(webGLNodeRadius + webGLArrowHeadLength) * unitNormal.x + webGLArrowHeadThickness * unitNormal.y)
    + dc * (-(webGLNodeRadius + webGLArrowHeadLength) * unitNormal.x - webGLArrowHeadThickness * unitNormal.y)
  );

  vec2 position = (u_matrix * vec3(a_position + delta, 1)).xy;

  gl_Position = vec4(position, 0, 1);

  #ifdef PICKING_MODE
  // For picking mode, we use the ID as the color:
  v_color = a_id;
  #else
  // For normal mode, we use the color:
  v_color = a_color;
  #endif

  v_color.a *= bias;
}
`,P0=R0,Gm=WebGLRenderingContext,ef=Gm.UNSIGNED_BYTE,Zo=Gm.FLOAT,L0=["u_matrix","u_sizeRatio","u_correctionRatio","u_minEdgeThickness","u_lengthToThicknessRatio","u_widenessToThicknessRatio"],Nl={extremity:"target",lengthToThicknessRatio:2.5,widenessToThicknessRatio:2};function Hm(n){var e=Me(Me({},Nl),{});return(function(t){function i(){return dn(this,i),zn(this,i,arguments)}return Gn(i,t),hn(i,[{key:"getDefinition",value:function(){return{VERTICES:3,VERTEX_SHADER_SOURCE:P0,FRAGMENT_SHADER_SOURCE:C0,METHOD:WebGLRenderingContext.TRIANGLES,UNIFORMS:L0,ATTRIBUTES:[{name:"a_position",size:2,type:Zo},{name:"a_normal",size:2,type:Zo},{name:"a_radius",size:1,type:Zo},{name:"a_color",size:4,type:ef,normalized:!0},{name:"a_id",size:4,type:ef,normalized:!0}],CONSTANT_ATTRIBUTES:[{name:"a_barycentric",size:3,type:Zo}],CONSTANT_DATA:[[1,0,0],[0,1,0],[0,0,1]]}}},{key:"processVisibleItem",value:function(s,o,a,l,c){if(e.extremity==="source"){var u=[l,a];a=u[0],l=u[1]}var d=c.size||1,h=l.size||1,f=a.x,p=a.y,_=l.x,g=l.y,m=Bs(c.color),v=_-f,E=g-p,x=v*v+E*E,w=0,S=0;x&&(x=1/Math.sqrt(x),w=-E*x*d,S=v*x*d);var C=this.array;C[o++]=_,C[o++]=g,C[o++]=-w,C[o++]=-S,C[o++]=h,C[o++]=m,C[o++]=s}},{key:"setUniforms",value:function(s,o){var a=o.gl,l=o.uniformLocations,c=l.u_matrix,u=l.u_sizeRatio,d=l.u_correctionRatio,h=l.u_minEdgeThickness,f=l.u_lengthToThicknessRatio,p=l.u_widenessToThicknessRatio;a.uniformMatrix3fv(c,!1,s.matrix),a.uniform1f(u,s.sizeRatio),a.uniform1f(d,s.correctionRatio),a.uniform1f(h,s.minEdgeThickness),a.uniform1f(f,e.lengthToThicknessRatio),a.uniform1f(p,e.widenessToThicknessRatio)}}])})(Ll)}Hm();var D0=`
precision mediump float;

varying vec4 v_color;
varying vec2 v_normal;
varying float v_thickness;
varying float v_feather;

const vec4 transparent = vec4(0.0, 0.0, 0.0, 0.0);

void main(void) {
  // We only handle antialiasing for normal mode:
  #ifdef PICKING_MODE
  gl_FragColor = v_color;
  #else
  float dist = length(v_normal) * v_thickness;

  float t = smoothstep(
    v_thickness - v_feather,
    v_thickness,
    dist
  );

  gl_FragColor = mix(v_color, transparent, t);
  #endif
}
`,Vm=D0,N0=`
attribute vec4 a_id;
attribute vec4 a_color;
attribute vec2 a_normal;
attribute float a_normalCoef;
attribute vec2 a_positionStart;
attribute vec2 a_positionEnd;
attribute float a_positionCoef;
attribute float a_radius;
attribute float a_radiusCoef;

uniform mat3 u_matrix;
uniform float u_zoomRatio;
uniform float u_sizeRatio;
uniform float u_pixelRatio;
uniform float u_correctionRatio;
uniform float u_minEdgeThickness;
uniform float u_lengthToThicknessRatio;
uniform float u_feather;

varying vec4 v_color;
varying vec2 v_normal;
varying float v_thickness;
varying float v_feather;

const float bias = 255.0 / 254.0;

void main() {
  float minThickness = u_minEdgeThickness;

  float radius = a_radius * a_radiusCoef;
  vec2 normal = a_normal * a_normalCoef;
  vec2 position = a_positionStart * (1.0 - a_positionCoef) + a_positionEnd * a_positionCoef;

  float normalLength = length(normal);
  vec2 unitNormal = normal / normalLength;

  // These first computations are taken from edge.vert.glsl. Please read it to
  // get better comments on what's happening:
  float pixelsThickness = max(normalLength, minThickness * u_sizeRatio);
  float webGLThickness = pixelsThickness * u_correctionRatio / u_sizeRatio;

  // Here, we move the point to leave space for the arrow head:
  float direction = sign(radius);
  float webGLNodeRadius = direction * radius * 2.0 * u_correctionRatio / u_sizeRatio;
  float webGLArrowHeadLength = webGLThickness * u_lengthToThicknessRatio * 2.0;

  vec2 compensationVector = vec2(-direction * unitNormal.y, direction * unitNormal.x) * (webGLNodeRadius + webGLArrowHeadLength);

  // Here is the proper position of the vertex
  gl_Position = vec4((u_matrix * vec3(position + unitNormal * webGLThickness + compensationVector, 1)).xy, 0, 1);

  v_thickness = webGLThickness / u_zoomRatio;

  v_normal = unitNormal;

  v_feather = u_feather * u_correctionRatio / u_zoomRatio / u_pixelRatio * 2.0;

  #ifdef PICKING_MODE
  // For picking mode, we use the ID as the color:
  v_color = a_id;
  #else
  // For normal mode, we use the color:
  v_color = a_color;
  #endif

  v_color.a *= bias;
}
`,I0=N0,Wm=WebGLRenderingContext,tf=Wm.UNSIGNED_BYTE,Ar=Wm.FLOAT,U0=["u_matrix","u_zoomRatio","u_sizeRatio","u_correctionRatio","u_pixelRatio","u_feather","u_minEdgeThickness","u_lengthToThicknessRatio"],F0={lengthToThicknessRatio:Nl.lengthToThicknessRatio};function $m(n){var e=Me(Me({},F0),{});return(function(t){function i(){return dn(this,i),zn(this,i,arguments)}return Gn(i,t),hn(i,[{key:"getDefinition",value:function(){return{VERTICES:6,VERTEX_SHADER_SOURCE:I0,FRAGMENT_SHADER_SOURCE:Vm,METHOD:WebGLRenderingContext.TRIANGLES,UNIFORMS:U0,ATTRIBUTES:[{name:"a_positionStart",size:2,type:Ar},{name:"a_positionEnd",size:2,type:Ar},{name:"a_normal",size:2,type:Ar},{name:"a_color",size:4,type:tf,normalized:!0},{name:"a_id",size:4,type:tf,normalized:!0},{name:"a_radius",size:1,type:Ar}],CONSTANT_ATTRIBUTES:[{name:"a_positionCoef",size:1,type:Ar},{name:"a_normalCoef",size:1,type:Ar},{name:"a_radiusCoef",size:1,type:Ar}],CONSTANT_DATA:[[0,1,0],[0,-1,0],[1,1,1],[1,1,1],[0,-1,0],[1,-1,-1]]}}},{key:"processVisibleItem",value:function(s,o,a,l,c){var u=c.size||1,d=a.x,h=a.y,f=l.x,p=l.y,_=Bs(c.color),g=f-d,m=p-h,v=l.size||1,E=g*g+m*m,x=0,w=0;E&&(E=1/Math.sqrt(E),x=-m*E*u,w=g*E*u);var S=this.array;S[o++]=d,S[o++]=h,S[o++]=f,S[o++]=p,S[o++]=x,S[o++]=w,S[o++]=_,S[o++]=s,S[o++]=v}},{key:"setUniforms",value:function(s,o){var a=o.gl,l=o.uniformLocations,c=l.u_matrix,u=l.u_zoomRatio,d=l.u_feather,h=l.u_pixelRatio,f=l.u_correctionRatio,p=l.u_sizeRatio,_=l.u_minEdgeThickness,g=l.u_lengthToThicknessRatio;a.uniformMatrix3fv(c,!1,s.matrix),a.uniform1f(u,s.zoomRatio),a.uniform1f(p,s.sizeRatio),a.uniform1f(f,s.correctionRatio),a.uniform1f(h,s.pixelRatio),a.uniform1f(d,s.antiAliasingFeather),a.uniform1f(_,s.minEdgeThickness),a.uniform1f(g,e.lengthToThicknessRatio)}}])})(Ll)}$m();function O0(n){return x0([$m(),Hm()])}var k0=O0(),B0=k0,z0=`
attribute vec4 a_id;
attribute vec4 a_color;
attribute vec2 a_normal;
attribute float a_normalCoef;
attribute vec2 a_positionStart;
attribute vec2 a_positionEnd;
attribute float a_positionCoef;

uniform mat3 u_matrix;
uniform float u_sizeRatio;
uniform float u_zoomRatio;
uniform float u_pixelRatio;
uniform float u_correctionRatio;
uniform float u_minEdgeThickness;
uniform float u_feather;

varying vec4 v_color;
varying vec2 v_normal;
varying float v_thickness;
varying float v_feather;

const float bias = 255.0 / 254.0;

void main() {
  float minThickness = u_minEdgeThickness;

  vec2 normal = a_normal * a_normalCoef;
  vec2 position = a_positionStart * (1.0 - a_positionCoef) + a_positionEnd * a_positionCoef;

  float normalLength = length(normal);
  vec2 unitNormal = normal / normalLength;

  // We require edges to be at least "minThickness" pixels thick *on screen*
  // (so we need to compensate the size ratio):
  float pixelsThickness = max(normalLength, minThickness * u_sizeRatio);

  // Then, we need to retrieve the normalized thickness of the edge in the WebGL
  // referential (in a ([0, 1], [0, 1]) space), using our "magic" correction
  // ratio:
  float webGLThickness = pixelsThickness * u_correctionRatio / u_sizeRatio;

  // Here is the proper position of the vertex
  gl_Position = vec4((u_matrix * vec3(position + unitNormal * webGLThickness, 1)).xy, 0, 1);

  // For the fragment shader though, we need a thickness that takes the "magic"
  // correction ratio into account (as in webGLThickness), but so that the
  // antialiasing effect does not depend on the zoom level. So here's yet
  // another thickness version:
  v_thickness = webGLThickness / u_zoomRatio;

  v_normal = unitNormal;

  v_feather = u_feather * u_correctionRatio / u_zoomRatio / u_pixelRatio * 2.0;

  #ifdef PICKING_MODE
  // For picking mode, we use the ID as the color:
  v_color = a_id;
  #else
  // For normal mode, we use the color:
  v_color = a_color;
  #endif

  v_color.a *= bias;
}
`,G0=z0,Xm=WebGLRenderingContext,nf=Xm.UNSIGNED_BYTE,Ys=Xm.FLOAT,H0=["u_matrix","u_zoomRatio","u_sizeRatio","u_correctionRatio","u_pixelRatio","u_feather","u_minEdgeThickness"],V0=(function(n){function e(){return dn(this,e),zn(this,e,arguments)}return Gn(e,n),hn(e,[{key:"getDefinition",value:function(){return{VERTICES:6,VERTEX_SHADER_SOURCE:G0,FRAGMENT_SHADER_SOURCE:Vm,METHOD:WebGLRenderingContext.TRIANGLES,UNIFORMS:H0,ATTRIBUTES:[{name:"a_positionStart",size:2,type:Ys},{name:"a_positionEnd",size:2,type:Ys},{name:"a_normal",size:2,type:Ys},{name:"a_color",size:4,type:nf,normalized:!0},{name:"a_id",size:4,type:nf,normalized:!0}],CONSTANT_ATTRIBUTES:[{name:"a_positionCoef",size:1,type:Ys},{name:"a_normalCoef",size:1,type:Ys}],CONSTANT_DATA:[[0,1],[0,-1],[1,1],[1,1],[0,-1],[1,-1]]}}},{key:"processVisibleItem",value:function(i,r,s,o,a){var l=a.size||1,c=s.x,u=s.y,d=o.x,h=o.y,f=Bs(a.color),p=d-c,_=h-u,g=p*p+_*_,m=0,v=0;g&&(g=1/Math.sqrt(g),m=-_*g*l,v=p*g*l);var E=this.array;E[r++]=c,E[r++]=u,E[r++]=d,E[r++]=h,E[r++]=m,E[r++]=v,E[r++]=f,E[r++]=i}},{key:"setUniforms",value:function(i,r){var s=r.gl,o=r.uniformLocations,a=o.u_matrix,l=o.u_zoomRatio,c=o.u_feather,u=o.u_pixelRatio,d=o.u_correctionRatio,h=o.u_sizeRatio,f=o.u_minEdgeThickness;s.uniformMatrix3fv(a,!1,i.matrix),s.uniform1f(l,i.zoomRatio),s.uniform1f(h,i.sizeRatio),s.uniform1f(d,i.correctionRatio),s.uniform1f(u,i.pixelRatio),s.uniform1f(c,i.antiAliasingFeather),s.uniform1f(f,i.minEdgeThickness)}}])})(Ll);function W0(n){return n&&n.__esModule&&Object.prototype.hasOwnProperty.call(n,"default")?n.default:n}var Jo={exports:{}},rf;function $0(){if(rf)return Jo.exports;rf=1;var n=typeof Reflect=="object"?Reflect:null,e=n&&typeof n.apply=="function"?n.apply:function(w,S,C){return Function.prototype.apply.call(w,S,C)},t;n&&typeof n.ownKeys=="function"?t=n.ownKeys:Object.getOwnPropertySymbols?t=function(w){return Object.getOwnPropertyNames(w).concat(Object.getOwnPropertySymbols(w))}:t=function(w){return Object.getOwnPropertyNames(w)};function i(x){console&&console.warn&&console.warn(x)}var r=Number.isNaN||function(w){return w!==w};function s(){s.init.call(this)}Jo.exports=s,Jo.exports.once=m,s.EventEmitter=s,s.prototype._events=void 0,s.prototype._eventsCount=0,s.prototype._maxListeners=void 0;var o=10;function a(x){if(typeof x!="function")throw new TypeError('The "listener" argument must be of type Function. Received type '+typeof x)}Object.defineProperty(s,"defaultMaxListeners",{enumerable:!0,get:function(){return o},set:function(x){if(typeof x!="number"||x<0||r(x))throw new RangeError('The value of "defaultMaxListeners" is out of range. It must be a non-negative number. Received '+x+".");o=x}}),s.init=function(){(this._events===void 0||this._events===Object.getPrototypeOf(this)._events)&&(this._events=Object.create(null),this._eventsCount=0),this._maxListeners=this._maxListeners||void 0},s.prototype.setMaxListeners=function(w){if(typeof w!="number"||w<0||r(w))throw new RangeError('The value of "n" is out of range. It must be a non-negative number. Received '+w+".");return this._maxListeners=w,this};function l(x){return x._maxListeners===void 0?s.defaultMaxListeners:x._maxListeners}s.prototype.getMaxListeners=function(){return l(this)},s.prototype.emit=function(w){for(var S=[],C=1;C<arguments.length;C++)S.push(arguments[C]);var b=w==="error",T=this._events;if(T!==void 0)b=b&&T.error===void 0;else if(!b)return!1;if(b){var L;if(S.length>0&&(L=S[0]),L instanceof Error)throw L;var P=new Error("Unhandled error."+(L?" ("+L.message+")":""));throw P.context=L,P}var F=T[w];if(F===void 0)return!1;if(typeof F=="function")e(F,this,S);else for(var W=F.length,$=p(F,W),C=0;C<W;++C)e($[C],this,S);return!0};function c(x,w,S,C){var b,T,L;if(a(S),T=x._events,T===void 0?(T=x._events=Object.create(null),x._eventsCount=0):(T.newListener!==void 0&&(x.emit("newListener",w,S.listener?S.listener:S),T=x._events),L=T[w]),L===void 0)L=T[w]=S,++x._eventsCount;else if(typeof L=="function"?L=T[w]=C?[S,L]:[L,S]:C?L.unshift(S):L.push(S),b=l(x),b>0&&L.length>b&&!L.warned){L.warned=!0;var P=new Error("Possible EventEmitter memory leak detected. "+L.length+" "+String(w)+" listeners added. Use emitter.setMaxListeners() to increase limit");P.name="MaxListenersExceededWarning",P.emitter=x,P.type=w,P.count=L.length,i(P)}return x}s.prototype.addListener=function(w,S){return c(this,w,S,!1)},s.prototype.on=s.prototype.addListener,s.prototype.prependListener=function(w,S){return c(this,w,S,!0)};function u(){if(!this.fired)return this.target.removeListener(this.type,this.wrapFn),this.fired=!0,arguments.length===0?this.listener.call(this.target):this.listener.apply(this.target,arguments)}function d(x,w,S){var C={fired:!1,wrapFn:void 0,target:x,type:w,listener:S},b=u.bind(C);return b.listener=S,C.wrapFn=b,b}s.prototype.once=function(w,S){return a(S),this.on(w,d(this,w,S)),this},s.prototype.prependOnceListener=function(w,S){return a(S),this.prependListener(w,d(this,w,S)),this},s.prototype.removeListener=function(w,S){var C,b,T,L,P;if(a(S),b=this._events,b===void 0)return this;if(C=b[w],C===void 0)return this;if(C===S||C.listener===S)--this._eventsCount===0?this._events=Object.create(null):(delete b[w],b.removeListener&&this.emit("removeListener",w,C.listener||S));else if(typeof C!="function"){for(T=-1,L=C.length-1;L>=0;L--)if(C[L]===S||C[L].listener===S){P=C[L].listener,T=L;break}if(T<0)return this;T===0?C.shift():_(C,T),C.length===1&&(b[w]=C[0]),b.removeListener!==void 0&&this.emit("removeListener",w,P||S)}return this},s.prototype.off=s.prototype.removeListener,s.prototype.removeAllListeners=function(w){var S,C,b;if(C=this._events,C===void 0)return this;if(C.removeListener===void 0)return arguments.length===0?(this._events=Object.create(null),this._eventsCount=0):C[w]!==void 0&&(--this._eventsCount===0?this._events=Object.create(null):delete C[w]),this;if(arguments.length===0){var T=Object.keys(C),L;for(b=0;b<T.length;++b)L=T[b],L!=="removeListener"&&this.removeAllListeners(L);return this.removeAllListeners("removeListener"),this._events=Object.create(null),this._eventsCount=0,this}if(S=C[w],typeof S=="function")this.removeListener(w,S);else if(S!==void 0)for(b=S.length-1;b>=0;b--)this.removeListener(w,S[b]);return this};function h(x,w,S){var C=x._events;if(C===void 0)return[];var b=C[w];return b===void 0?[]:typeof b=="function"?S?[b.listener||b]:[b]:S?g(b):p(b,b.length)}s.prototype.listeners=function(w){return h(this,w,!0)},s.prototype.rawListeners=function(w){return h(this,w,!1)},s.listenerCount=function(x,w){return typeof x.listenerCount=="function"?x.listenerCount(w):f.call(x,w)},s.prototype.listenerCount=f;function f(x){var w=this._events;if(w!==void 0){var S=w[x];if(typeof S=="function")return 1;if(S!==void 0)return S.length}return 0}s.prototype.eventNames=function(){return this._eventsCount>0?t(this._events):[]};function p(x,w){for(var S=new Array(w),C=0;C<w;++C)S[C]=x[C];return S}function _(x,w){for(;w+1<x.length;w++)x[w]=x[w+1];x.pop()}function g(x){for(var w=new Array(x.length),S=0;S<w.length;++S)w[S]=x[S].listener||x[S];return w}function m(x,w){return new Promise(function(S,C){function b(L){x.removeListener(w,T),C(L)}function T(){typeof x.removeListener=="function"&&x.removeListener("error",b),S([].slice.call(arguments))}E(x,w,T,{once:!0}),w!=="error"&&v(x,b,{once:!0})})}function v(x,w,S){typeof x.on=="function"&&E(x,"error",w,S)}function E(x,w,S,C){if(typeof x.on=="function")C.once?x.once(w,S):x.on(w,S);else if(typeof x.addEventListener=="function")x.addEventListener(w,function b(T){C.once&&x.removeEventListener(w,b),S(T)});else throw new TypeError('The "emitter" argument must be of type EventEmitter. Received type '+typeof x)}return Jo.exports}var jm=$0(),Ad=(function(n){function e(){var t;return dn(this,e),t=zn(this,e),t.rawEmitter=t,t}return Gn(e,n),hn(e)})(jm.EventEmitter),rc,sf;function X0(){return sf||(sf=1,rc=function(e){return e!==null&&typeof e=="object"&&typeof e.addUndirectedEdgeWithKey=="function"&&typeof e.dropNode=="function"&&typeof e.multi=="boolean"}),rc}var j0=X0();const Y0=W0(j0);var q0=function(e){return e},K0=function(e){return e*e},Z0=function(e){return e*(2-e)},J0=function(e){return(e*=2)<1?.5*e*e:-.5*(--e*(e-2)-1)},Q0=function(e){return e*e*e},ex=function(e){return--e*e*e+1},tx=function(e){return(e*=2)<1?.5*e*e*e:.5*((e-=2)*e*e+2)},nx={linear:q0,quadraticIn:K0,quadraticOut:Z0,quadraticInOut:J0,cubicIn:Q0,cubicOut:ex,cubicInOut:tx},ix={easing:"quadraticInOut",duration:150};function Xn(){return Float32Array.of(1,0,0,0,1,0,0,0,1)}function Qo(n,e,t){return n[0]=e,n[4]=typeof t=="number"?t:e,n}function of(n,e){var t=Math.sin(e),i=Math.cos(e);return n[0]=i,n[1]=t,n[3]=-t,n[4]=i,n}function af(n,e,t){return n[6]=e,n[7]=t,n}function Qi(n,e){var t=n[0],i=n[1],r=n[2],s=n[3],o=n[4],a=n[5],l=n[6],c=n[7],u=n[8],d=e[0],h=e[1],f=e[2],p=e[3],_=e[4],g=e[5],m=e[6],v=e[7],E=e[8];return n[0]=d*t+h*s+f*l,n[1]=d*i+h*o+f*c,n[2]=d*r+h*a+f*u,n[3]=p*t+_*s+g*l,n[4]=p*i+_*o+g*c,n[5]=p*r+_*a+g*u,n[6]=m*t+v*s+E*l,n[7]=m*i+v*o+E*c,n[8]=m*r+v*a+E*u,n}function hu(n,e){var t=arguments.length>2&&arguments[2]!==void 0?arguments[2]:1,i=n[0],r=n[1],s=n[3],o=n[4],a=n[6],l=n[7],c=e.x,u=e.y;return{x:c*i+u*s+a*t,y:c*r+u*o+l*t}}function rx(n,e){var t=n.height/n.width,i=e.height/e.width;return t<1&&i>1||t>1&&i<1?1:Math.min(Math.max(i,1/i),Math.max(1/t,t))}function qs(n,e,t,i,r){var s=n.angle,o=n.ratio,a=n.x,l=n.y,c=e.width,u=e.height,d=Xn(),h=Math.min(c,u)-2*i,f=rx(e,t);return r?(Qi(d,af(Xn(),a,l)),Qi(d,Qo(Xn(),o)),Qi(d,of(Xn(),s)),Qi(d,Qo(Xn(),c/h/2/f,u/h/2/f))):(Qi(d,Qo(Xn(),2*(h/c)*f,2*(h/u)*f)),Qi(d,of(Xn(),-s)),Qi(d,Qo(Xn(),1/o)),Qi(d,af(Xn(),-a,-l))),d}function sx(n,e,t){var i=hu(n,{x:Math.cos(e.angle),y:Math.sin(e.angle)},0),r=i.x,s=i.y;return 1/Math.sqrt(Math.pow(r,2)+Math.pow(s,2))/t.width}function ox(n){if(!n.order)return{x:[0,1],y:[0,1]};var e=1/0,t=-1/0,i=1/0,r=-1/0;return n.forEachNode(function(s,o){var a=o.x,l=o.y;a<e&&(e=a),a>t&&(t=a),l<i&&(i=l),l>r&&(r=l)}),{x:[e,t],y:[i,r]}}function ax(n){if(!Y0(n))throw new Error("Sigma: invalid graph instance.");n.forEachNode(function(e,t){if(!Number.isFinite(t.x)||!Number.isFinite(t.y))throw new Error("Sigma: Coordinates of node ".concat(e," are invalid. A node must have a numeric 'x' and 'y' attribute."))})}function lx(n,e,t){var i=document.createElement(n);if(e)for(var r in e)i.style[r]=e[r];if(t)for(var s in t)i.setAttribute(s,t[s]);return i}function lf(){return typeof window.devicePixelRatio<"u"?window.devicePixelRatio:1}function cf(n,e,t){return t.sort(function(i,r){var s=e(i)||0,o=e(r)||0;return s<o?-1:s>o?1:0})}function uf(n){var e=Ls(n.x,2),t=e[0],i=e[1],r=Ls(n.y,2),s=r[0],o=r[1],a=Math.max(i-t,o-s),l=(i+t)/2,c=(o+s)/2;(a===0||Math.abs(a)===1/0||isNaN(a))&&(a=1),isNaN(l)&&(l=0),isNaN(c)&&(c=0);var u=function(h){return{x:.5+(h.x-l)/a,y:.5+(h.y-c)/a}};return u.applyTo=function(d){d.x=.5+(d.x-l)/a,d.y=.5+(d.y-c)/a},u.inverse=function(d){return{x:l+a*(d.x-.5),y:c+a*(d.y-.5)}},u.ratio=a,u}function fu(n){"@babel/helpers - typeof";return fu=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(e){return typeof e}:function(e){return e&&typeof Symbol=="function"&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},fu(n)}function df(n,e){var t=e.size;if(t!==0){var i=n.length;n.length+=t;var r=0;e.forEach(function(s){n[i+r]=s,r++})}}function sc(n){n=n||{};for(var e=0,t=arguments.length<=1?0:arguments.length-1;e<t;e++){var i=e+1<1||arguments.length<=e+1?void 0:arguments[e+1];i&&Object.assign(n,i)}return n}var Cd={hideEdgesOnMove:!1,hideLabelsOnMove:!1,renderLabels:!0,renderEdgeLabels:!1,enableEdgeEvents:!1,defaultNodeColor:"#999",defaultNodeType:"circle",defaultEdgeColor:"#ccc",defaultEdgeType:"line",labelFont:"Arial",labelSize:14,labelWeight:"normal",labelColor:{color:"#000"},edgeLabelFont:"Arial",edgeLabelSize:14,edgeLabelWeight:"normal",edgeLabelColor:{attribute:"color"},stagePadding:30,defaultDrawEdgeLabel:b0,defaultDrawNodeLabel:Bm,defaultDrawNodeHover:y0,minEdgeThickness:1.7,antiAliasingFeather:1,dragTimeout:100,draggedEventsTolerance:3,inertiaDuration:200,inertiaRatio:3,zoomDuration:250,zoomingRatio:1.7,doubleClickTimeout:300,doubleClickZoomingRatio:2.2,doubleClickZoomingDuration:200,tapMoveTolerance:10,zoomToSizeRatioFunction:Math.sqrt,itemSizesReference:"screen",autoRescale:!0,autoCenter:!0,labelDensity:1,labelGridCellSize:100,labelRenderedSizeThreshold:6,nodeReducer:null,edgeReducer:null,zIndex:!1,minCameraRatio:null,maxCameraRatio:null,enableCameraZooming:!0,enableCameraPanning:!0,enableCameraRotation:!0,cameraPanBoundaries:null,allowInvalidContainer:!1,nodeProgramClasses:{},nodeHoverProgramClasses:{},edgeProgramClasses:{}},cx={circle:Dl},ux={arrow:B0,line:V0};function oc(n){if(typeof n.labelDensity!="number"||n.labelDensity<0)throw new Error("Settings: invalid `labelDensity`. Expecting a positive number.");var e=n.minCameraRatio,t=n.maxCameraRatio;if(typeof e=="number"&&typeof t=="number"&&t<e)throw new Error("Settings: invalid camera ratio boundaries. Expecting `maxCameraRatio` to be greater than `minCameraRatio`.")}function dx(n){var e=sc({},Cd,n);return e.nodeProgramClasses=sc({},cx,e.nodeProgramClasses),e.edgeProgramClasses=sc({},ux,e.edgeProgramClasses),e}var ea=1.5,hf=(function(n){function e(){var t;return dn(this,e),t=zn(this,e),Q(t,"x",.5),Q(t,"y",.5),Q(t,"angle",0),Q(t,"ratio",1),Q(t,"minRatio",null),Q(t,"maxRatio",null),Q(t,"enabledZooming",!0),Q(t,"enabledPanning",!0),Q(t,"enabledRotation",!0),Q(t,"clean",null),Q(t,"nextFrame",null),Q(t,"previousState",null),Q(t,"enabled",!0),t.previousState=t.getState(),t}return Gn(e,n),hn(e,[{key:"enable",value:function(){return this.enabled=!0,this}},{key:"disable",value:function(){return this.enabled=!1,this}},{key:"getState",value:function(){return{x:this.x,y:this.y,angle:this.angle,ratio:this.ratio}}},{key:"hasState",value:function(i){return this.x===i.x&&this.y===i.y&&this.ratio===i.ratio&&this.angle===i.angle}},{key:"getPreviousState",value:function(){var i=this.previousState;return i?{x:i.x,y:i.y,angle:i.angle,ratio:i.ratio}:null}},{key:"getBoundedRatio",value:function(i){var r=i;return typeof this.minRatio=="number"&&(r=Math.max(r,this.minRatio)),typeof this.maxRatio=="number"&&(r=Math.min(r,this.maxRatio)),r}},{key:"validateState",value:function(i){var r={};return this.enabledPanning&&typeof i.x=="number"&&(r.x=i.x),this.enabledPanning&&typeof i.y=="number"&&(r.y=i.y),this.enabledZooming&&typeof i.ratio=="number"&&(r.ratio=this.getBoundedRatio(i.ratio)),this.enabledRotation&&typeof i.angle=="number"&&(r.angle=i.angle),this.clean?this.clean(Me(Me({},this.getState()),r)):r}},{key:"isAnimated",value:function(){return!!this.nextFrame}},{key:"setState",value:function(i){if(!this.enabled)return this;this.previousState=this.getState();var r=this.validateState(i);return typeof r.x=="number"&&(this.x=r.x),typeof r.y=="number"&&(this.y=r.y),typeof r.ratio=="number"&&(this.ratio=r.ratio),typeof r.angle=="number"&&(this.angle=r.angle),this.hasState(this.previousState)||this.emit("updated",this.getState()),this}},{key:"updateState",value:function(i){return this.setState(i(this.getState())),this}},{key:"animate",value:function(i){var r=this,s=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},o=arguments.length>2?arguments[2]:void 0;if(!o)return new Promise(function(f){return r.animate(i,s,f)});if(this.enabled){var a=Me(Me({},ix),s),l=this.validateState(i),c=typeof a.easing=="function"?a.easing:nx[a.easing],u=Date.now(),d=this.getState(),h=function(){var p=(Date.now()-u)/a.duration;if(p>=1){r.nextFrame=null,r.setState(l),r.animationCallback&&(r.animationCallback.call(null),r.animationCallback=void 0);return}var _=c(p),g={};typeof l.x=="number"&&(g.x=d.x+(l.x-d.x)*_),typeof l.y=="number"&&(g.y=d.y+(l.y-d.y)*_),r.enabledRotation&&typeof l.angle=="number"&&(g.angle=d.angle+(l.angle-d.angle)*_),typeof l.ratio=="number"&&(g.ratio=d.ratio+(l.ratio-d.ratio)*_),r.setState(g),r.nextFrame=requestAnimationFrame(h)};this.nextFrame?(cancelAnimationFrame(this.nextFrame),this.animationCallback&&this.animationCallback.call(null),this.nextFrame=requestAnimationFrame(h)):h(),this.animationCallback=o}}},{key:"animatedZoom",value:function(i){return i?typeof i=="number"?this.animate({ratio:this.ratio/i}):this.animate({ratio:this.ratio/(i.factor||ea)},i):this.animate({ratio:this.ratio/ea})}},{key:"animatedUnzoom",value:function(i){return i?typeof i=="number"?this.animate({ratio:this.ratio*i}):this.animate({ratio:this.ratio*(i.factor||ea)},i):this.animate({ratio:this.ratio*ea})}},{key:"animatedReset",value:function(i){return this.animate({x:.5,y:.5,ratio:1,angle:0},i)}},{key:"copy",value:function(){return e.from(this.getState())}}],[{key:"from",value:function(i){var r=new e;return r.setState(i)}}])})(Ad);function qn(n,e){var t=e.getBoundingClientRect();return{x:n.clientX-t.left,y:n.clientY-t.top}}function Ai(n,e){var t=Me(Me({},qn(n,e)),{},{sigmaDefaultPrevented:!1,preventSigmaDefault:function(){t.sigmaDefaultPrevented=!0},original:n});return t}function Ks(n){var e="x"in n?n:Me(Me({},n.touches[0]||n.previousTouches[0]),{},{original:n.original,sigmaDefaultPrevented:n.sigmaDefaultPrevented,preventSigmaDefault:function(){n.sigmaDefaultPrevented=!0,e.sigmaDefaultPrevented=!0}});return e}function hx(n,e){return Me(Me({},Ai(n,e)),{},{delta:Ym(n)})}var fx=2;function Ua(n){for(var e=[],t=0,i=Math.min(n.length,fx);t<i;t++)e.push(n[t]);return e}function Zs(n,e,t){var i={touches:Ua(n.touches).map(function(r){return qn(r,t)}),previousTouches:e.map(function(r){return qn(r,t)}),sigmaDefaultPrevented:!1,preventSigmaDefault:function(){i.sigmaDefaultPrevented=!0},original:n};return i}function Ym(n){if(typeof n.deltaY<"u")return n.deltaY*-3/360;if(typeof n.detail<"u")return n.detail/-9;throw new Error("Captor: could not extract delta from event.")}var qm=(function(n){function e(t,i){var r;return dn(this,e),r=zn(this,e),r.container=t,r.renderer=i,r}return Gn(e,n),hn(e)})(Ad),px=["doubleClickTimeout","doubleClickZoomingDuration","doubleClickZoomingRatio","dragTimeout","draggedEventsTolerance","inertiaDuration","inertiaRatio","zoomDuration","zoomingRatio"],mx=px.reduce(function(n,e){return Me(Me({},n),{},Q({},e,Cd[e]))},{}),gx=(function(n){function e(t,i){var r;return dn(this,e),r=zn(this,e,[t,i]),Q(r,"enabled",!0),Q(r,"draggedEvents",0),Q(r,"downStartTime",null),Q(r,"lastMouseX",null),Q(r,"lastMouseY",null),Q(r,"isMouseDown",!1),Q(r,"isMoving",!1),Q(r,"movingTimeout",null),Q(r,"startCameraState",null),Q(r,"clicks",0),Q(r,"doubleClickTimeout",null),Q(r,"currentWheelDirection",0),Q(r,"settings",mx),r.handleClick=r.handleClick.bind(r),r.handleRightClick=r.handleRightClick.bind(r),r.handleDown=r.handleDown.bind(r),r.handleUp=r.handleUp.bind(r),r.handleMove=r.handleMove.bind(r),r.handleWheel=r.handleWheel.bind(r),r.handleLeave=r.handleLeave.bind(r),r.handleEnter=r.handleEnter.bind(r),t.addEventListener("click",r.handleClick,{capture:!1}),t.addEventListener("contextmenu",r.handleRightClick,{capture:!1}),t.addEventListener("mousedown",r.handleDown,{capture:!1}),t.addEventListener("wheel",r.handleWheel,{capture:!1}),t.addEventListener("mouseleave",r.handleLeave,{capture:!1}),t.addEventListener("mouseenter",r.handleEnter,{capture:!1}),document.addEventListener("mousemove",r.handleMove,{capture:!1}),document.addEventListener("mouseup",r.handleUp,{capture:!1}),r}return Gn(e,n),hn(e,[{key:"kill",value:function(){var i=this.container;i.removeEventListener("click",this.handleClick),i.removeEventListener("contextmenu",this.handleRightClick),i.removeEventListener("mousedown",this.handleDown),i.removeEventListener("wheel",this.handleWheel),i.removeEventListener("mouseleave",this.handleLeave),i.removeEventListener("mouseenter",this.handleEnter),document.removeEventListener("mousemove",this.handleMove),document.removeEventListener("mouseup",this.handleUp)}},{key:"handleClick",value:function(i){var r=this;if(this.enabled){if(this.clicks++,this.clicks===2)return this.clicks=0,typeof this.doubleClickTimeout=="number"&&(clearTimeout(this.doubleClickTimeout),this.doubleClickTimeout=null),this.handleDoubleClick(i);setTimeout(function(){r.clicks=0,r.doubleClickTimeout=null},this.settings.doubleClickTimeout),this.draggedEvents<this.settings.draggedEventsTolerance&&this.emit("click",Ai(i,this.container))}}},{key:"handleRightClick",value:function(i){this.enabled&&this.emit("rightClick",Ai(i,this.container))}},{key:"handleDoubleClick",value:function(i){if(this.enabled){i.preventDefault(),i.stopPropagation();var r=Ai(i,this.container);if(this.emit("doubleClick",r),!r.sigmaDefaultPrevented){var s=this.renderer.getCamera(),o=s.getBoundedRatio(s.getState().ratio/this.settings.doubleClickZoomingRatio);s.animate(this.renderer.getViewportZoomedState(qn(i,this.container),o),{easing:"quadraticInOut",duration:this.settings.doubleClickZoomingDuration})}}}},{key:"handleDown",value:function(i){if(this.enabled){if(i.button===0){this.startCameraState=this.renderer.getCamera().getState();var r=qn(i,this.container),s=r.x,o=r.y;this.lastMouseX=s,this.lastMouseY=o,this.draggedEvents=0,this.downStartTime=Date.now(),this.isMouseDown=!0}this.emit("mousedown",Ai(i,this.container))}}},{key:"handleUp",value:function(i){var r=this;if(!(!this.enabled||!this.isMouseDown)){var s=this.renderer.getCamera();this.isMouseDown=!1,typeof this.movingTimeout=="number"&&(clearTimeout(this.movingTimeout),this.movingTimeout=null);var o=qn(i,this.container),a=o.x,l=o.y,c=s.getState(),u=s.getPreviousState()||{x:0,y:0};this.isMoving?s.animate({x:c.x+this.settings.inertiaRatio*(c.x-u.x),y:c.y+this.settings.inertiaRatio*(c.y-u.y)},{duration:this.settings.inertiaDuration,easing:"quadraticOut"}):(this.lastMouseX!==a||this.lastMouseY!==l)&&s.setState({x:c.x,y:c.y}),this.isMoving=!1,setTimeout(function(){var d=r.draggedEvents>0;r.draggedEvents=0,d&&r.renderer.getSetting("hideEdgesOnMove")&&r.renderer.refresh()},0),this.emit("mouseup",Ai(i,this.container))}}},{key:"handleMove",value:function(i){var r=this;if(this.enabled){var s=Ai(i,this.container);if(this.emit("mousemovebody",s),(i.target===this.container||i.composedPath()[0]===this.container)&&this.emit("mousemove",s),!s.sigmaDefaultPrevented&&this.isMouseDown){this.isMoving=!0,this.draggedEvents++,typeof this.movingTimeout=="number"&&clearTimeout(this.movingTimeout),this.movingTimeout=window.setTimeout(function(){r.movingTimeout=null,r.isMoving=!1},this.settings.dragTimeout);var o=this.renderer.getCamera(),a=qn(i,this.container),l=a.x,c=a.y,u=this.renderer.viewportToFramedGraph({x:this.lastMouseX,y:this.lastMouseY}),d=this.renderer.viewportToFramedGraph({x:l,y:c}),h=u.x-d.x,f=u.y-d.y,p=o.getState(),_=p.x+h,g=p.y+f;o.setState({x:_,y:g}),this.lastMouseX=l,this.lastMouseY=c,i.preventDefault(),i.stopPropagation()}}}},{key:"handleLeave",value:function(i){this.emit("mouseleave",Ai(i,this.container))}},{key:"handleEnter",value:function(i){this.emit("mouseenter",Ai(i,this.container))}},{key:"handleWheel",value:function(i){var r=this,s=this.renderer.getCamera();if(!(!this.enabled||!s.enabledZooming)){var o=Ym(i);if(o){var a=hx(i,this.container);if(this.emit("wheel",a),a.sigmaDefaultPrevented){i.preventDefault(),i.stopPropagation();return}var l=s.getState().ratio,c=o>0?1/this.settings.zoomingRatio:this.settings.zoomingRatio,u=s.getBoundedRatio(l*c),d=o>0?1:-1,h=Date.now();l!==u&&(i.preventDefault(),i.stopPropagation(),!(this.currentWheelDirection===d&&this.lastWheelTriggerTime&&h-this.lastWheelTriggerTime<this.settings.zoomDuration/5)&&(s.animate(this.renderer.getViewportZoomedState(qn(i,this.container),u),{easing:"quadraticOut",duration:this.settings.zoomDuration},function(){r.currentWheelDirection=0}),this.currentWheelDirection=d,this.lastWheelTriggerTime=h))}}}},{key:"setSettings",value:function(i){this.settings=i}}])})(qm),_x=["dragTimeout","inertiaDuration","inertiaRatio","doubleClickTimeout","doubleClickZoomingRatio","doubleClickZoomingDuration","tapMoveTolerance"],vx=_x.reduce(function(n,e){return Me(Me({},n),{},Q({},e,Cd[e]))},{}),xx=(function(n){function e(t,i){var r;return dn(this,e),r=zn(this,e,[t,i]),Q(r,"enabled",!0),Q(r,"isMoving",!1),Q(r,"hasMoved",!1),Q(r,"touchMode",0),Q(r,"startTouchesPositions",[]),Q(r,"lastTouches",[]),Q(r,"lastTap",null),Q(r,"settings",vx),r.handleStart=r.handleStart.bind(r),r.handleLeave=r.handleLeave.bind(r),r.handleMove=r.handleMove.bind(r),t.addEventListener("touchstart",r.handleStart,{capture:!1}),t.addEventListener("touchcancel",r.handleLeave,{capture:!1}),document.addEventListener("touchend",r.handleLeave,{capture:!1,passive:!1}),document.addEventListener("touchmove",r.handleMove,{capture:!1,passive:!1}),r}return Gn(e,n),hn(e,[{key:"kill",value:function(){var i=this.container;i.removeEventListener("touchstart",this.handleStart),i.removeEventListener("touchcancel",this.handleLeave),document.removeEventListener("touchend",this.handleLeave),document.removeEventListener("touchmove",this.handleMove)}},{key:"getDimensions",value:function(){return{width:this.container.offsetWidth,height:this.container.offsetHeight}}},{key:"handleStart",value:function(i){var r=this;if(this.enabled){i.preventDefault();var s=Ua(i.touches);if(this.touchMode=s.length,this.startCameraState=this.renderer.getCamera().getState(),this.startTouchesPositions=s.map(function(f){return qn(f,r.container)}),this.touchMode===2){var o=Ls(this.startTouchesPositions,2),a=o[0],l=a.x,c=a.y,u=o[1],d=u.x,h=u.y;this.startTouchesAngle=Math.atan2(h-c,d-l),this.startTouchesDistance=Math.sqrt(Math.pow(d-l,2)+Math.pow(h-c,2))}this.emit("touchdown",Zs(i,this.lastTouches,this.container)),this.lastTouches=s,this.lastTouchesPositions=this.startTouchesPositions}}},{key:"handleLeave",value:function(i){if(!(!this.enabled||!this.startTouchesPositions.length)){switch(i.cancelable&&i.preventDefault(),this.movingTimeout&&(this.isMoving=!1,clearTimeout(this.movingTimeout)),this.touchMode){case 2:if(i.touches.length===1){this.handleStart(i),i.preventDefault();break}case 1:if(this.isMoving){var r=this.renderer.getCamera(),s=r.getState(),o=r.getPreviousState()||{x:0,y:0};r.animate({x:s.x+this.settings.inertiaRatio*(s.x-o.x),y:s.y+this.settings.inertiaRatio*(s.y-o.y)},{duration:this.settings.inertiaDuration,easing:"quadraticOut"})}this.hasMoved=!1,this.isMoving=!1,this.touchMode=0;break}if(this.emit("touchup",Zs(i,this.lastTouches,this.container)),!i.touches.length){var a=qn(this.lastTouches[0],this.container),l=this.startTouchesPositions[0],c=Math.pow(a.x-l.x,2)+Math.pow(a.y-l.y,2);if(!i.touches.length&&c<Math.pow(this.settings.tapMoveTolerance,2))if(this.lastTap&&Date.now()-this.lastTap.time<this.settings.doubleClickTimeout){var u=Zs(i,this.lastTouches,this.container);if(this.emit("doubletap",u),this.lastTap=null,!u.sigmaDefaultPrevented){var d=this.renderer.getCamera(),h=d.getBoundedRatio(d.getState().ratio/this.settings.doubleClickZoomingRatio);d.animate(this.renderer.getViewportZoomedState(a,h),{easing:"quadraticInOut",duration:this.settings.doubleClickZoomingDuration})}}else{var f=Zs(i,this.lastTouches,this.container);this.emit("tap",f),this.lastTap={time:Date.now(),position:f.touches[0]||f.previousTouches[0]}}}this.lastTouches=Ua(i.touches),this.startTouchesPositions=[]}}},{key:"handleMove",value:function(i){var r=this;if(!(!this.enabled||!this.startTouchesPositions.length)){i.preventDefault();var s=Ua(i.touches),o=s.map(function(de){return qn(de,r.container)}),a=this.lastTouches;this.lastTouches=s,this.lastTouchesPositions=o;var l=Zs(i,a,this.container);if(this.emit("touchmove",l),!l.sigmaDefaultPrevented&&(this.hasMoved||(this.hasMoved=o.some(function(de,ye){var Fe=r.startTouchesPositions[ye];return Fe&&(de.x!==Fe.x||de.y!==Fe.y)})),!!this.hasMoved)){this.isMoving=!0,this.movingTimeout&&clearTimeout(this.movingTimeout),this.movingTimeout=window.setTimeout(function(){r.isMoving=!1},this.settings.dragTimeout);var c=this.renderer.getCamera(),u=this.startCameraState,d=this.renderer.getSetting("stagePadding");switch(this.touchMode){case 1:{var h=this.renderer.viewportToFramedGraph((this.startTouchesPositions||[])[0]),f=h.x,p=h.y,_=this.renderer.viewportToFramedGraph(o[0]),g=_.x,m=_.y;c.setState({x:u.x+f-g,y:u.y+p-m});break}case 2:{var v={x:.5,y:.5,angle:0,ratio:1},E=o[0],x=E.x,w=E.y,S=o[1],C=S.x,b=S.y,T=Math.atan2(b-w,C-x)-this.startTouchesAngle,L=Math.hypot(b-w,C-x)/this.startTouchesDistance,P=c.getBoundedRatio(u.ratio/L);v.ratio=P,v.angle=u.angle+T;var F=this.getDimensions(),W=this.renderer.viewportToFramedGraph((this.startTouchesPositions||[])[0],{cameraState:u}),$=Math.min(F.width,F.height)-2*d,U=$/F.width,B=$/F.height,H=P/$,Z=x-$/2/U,J=w-$/2/B,ne=[Z*Math.cos(-v.angle)-J*Math.sin(-v.angle),J*Math.cos(-v.angle)+Z*Math.sin(-v.angle)];Z=ne[0],J=ne[1],v.x=W.x-Z*H,v.y=W.y+J*H,c.setState(v);break}}}}}},{key:"setSettings",value:function(i){this.settings=i}}])})(qm);function bx(n){if(Array.isArray(n))return uu(n)}function yx(n){if(typeof Symbol<"u"&&n[Symbol.iterator]!=null||n["@@iterator"]!=null)return Array.from(n)}function Sx(){throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)}function ff(n){return bx(n)||yx(n)||Dm(n)||Sx()}function Ex(n,e){if(n==null)return{};var t={};for(var i in n)if({}.hasOwnProperty.call(n,i)){if(e.indexOf(i)!==-1)continue;t[i]=n[i]}return t}function ac(n,e){if(n==null)return{};var t,i,r=Ex(n,e);if(Object.getOwnPropertySymbols){var s=Object.getOwnPropertySymbols(n);for(i=0;i<s.length;i++)t=s[i],e.indexOf(t)===-1&&{}.propertyIsEnumerable.call(n,t)&&(r[t]=n[t])}return r}var pf=(function(){function n(e,t){dn(this,n),this.key=e,this.size=t}return hn(n,null,[{key:"compare",value:function(t,i){return t.size>i.size?-1:t.size<i.size||t.key>i.key?1:-1}}])})(),mf=(function(){function n(){dn(this,n),Q(this,"width",0),Q(this,"height",0),Q(this,"cellSize",0),Q(this,"columns",0),Q(this,"rows",0),Q(this,"cells",{})}return hn(n,[{key:"resizeAndClear",value:function(t,i){this.width=t.width,this.height=t.height,this.cellSize=i,this.columns=Math.ceil(t.width/i),this.rows=Math.ceil(t.height/i),this.cells={}}},{key:"getIndex",value:function(t){var i=Math.floor(t.x/this.cellSize),r=Math.floor(t.y/this.cellSize);return r*this.columns+i}},{key:"add",value:function(t,i,r){var s=new pf(t,i),o=this.getIndex(r),a=this.cells[o];a||(a=[],this.cells[o]=a),a.push(s)}},{key:"organize",value:function(){for(var t in this.cells){var i=this.cells[t];i.sort(pf.compare)}}},{key:"getLabelsToDisplay",value:function(t,i){var r=this.cellSize*this.cellSize,s=r/t/t,o=s*i/r,a=Math.ceil(o),l=[];for(var c in this.cells)for(var u=this.cells[c],d=0;d<Math.min(a,u.length);d++)l.push(u[d].key);return l}}])})();function Mx(n){var e=n.graph,t=n.hoveredNode,i=n.highlightedNodes,r=n.displayedNodeLabels,s=[];return e.forEachEdge(function(o,a,l,c){(l===t||c===t||i.has(l)||i.has(c)||r.has(l)&&r.has(c))&&s.push(o)}),s}var gf=150,_f=50,Ni=Object.prototype.hasOwnProperty;function wx(n,e,t){if(!Ni.call(t,"x")||!Ni.call(t,"y"))throw new Error('Sigma: could not find a valid position (x, y) for node "'.concat(e,'". All your nodes must have a number "x" and "y". Maybe your forgot to apply a layout or your "nodeReducer" is not returning the correct data?'));return t.color||(t.color=n.defaultNodeColor),!t.label&&t.label!==""&&(t.label=null),t.label!==void 0&&t.label!==null?t.label=""+t.label:t.label=null,t.size||(t.size=2),Ni.call(t,"hidden")||(t.hidden=!1),Ni.call(t,"highlighted")||(t.highlighted=!1),Ni.call(t,"forceLabel")||(t.forceLabel=!1),(!t.type||t.type==="")&&(t.type=n.defaultNodeType),t.zIndex||(t.zIndex=0),t}function Tx(n,e,t){return t.color||(t.color=n.defaultEdgeColor),t.label||(t.label=""),t.size||(t.size=.5),Ni.call(t,"hidden")||(t.hidden=!1),Ni.call(t,"forceLabel")||(t.forceLabel=!1),(!t.type||t.type==="")&&(t.type=n.defaultEdgeType),t.zIndex||(t.zIndex=0),t}var Ax=(function(n){function e(t,i){var r,s=arguments.length>2&&arguments[2]!==void 0?arguments[2]:{};if(dn(this,e),r=zn(this,e),Q(r,"elements",{}),Q(r,"canvasContexts",{}),Q(r,"webGLContexts",{}),Q(r,"pickingLayers",new Set),Q(r,"textures",{}),Q(r,"frameBuffers",{}),Q(r,"activeListeners",{}),Q(r,"labelGrid",new mf),Q(r,"nodeDataCache",{}),Q(r,"edgeDataCache",{}),Q(r,"nodeProgramIndex",{}),Q(r,"edgeProgramIndex",{}),Q(r,"nodesWithForcedLabels",new Set),Q(r,"edgesWithForcedLabels",new Set),Q(r,"nodeExtent",{x:[0,1],y:[0,1]}),Q(r,"nodeZExtent",[1/0,-1/0]),Q(r,"edgeZExtent",[1/0,-1/0]),Q(r,"matrix",Xn()),Q(r,"invMatrix",Xn()),Q(r,"correctionRatio",1),Q(r,"customBBox",null),Q(r,"normalizationFunction",uf({x:[0,1],y:[0,1]})),Q(r,"graphToViewportRatio",1),Q(r,"itemIDsIndex",{}),Q(r,"nodeIndices",{}),Q(r,"edgeIndices",{}),Q(r,"width",0),Q(r,"height",0),Q(r,"pixelRatio",lf()),Q(r,"pickingDownSizingRatio",2*r.pixelRatio),Q(r,"displayedNodeLabels",new Set),Q(r,"displayedEdgeLabels",new Set),Q(r,"highlightedNodes",new Set),Q(r,"hoveredNode",null),Q(r,"hoveredEdge",null),Q(r,"renderFrame",null),Q(r,"renderHighlightedNodesFrame",null),Q(r,"needToProcess",!1),Q(r,"checkEdgesEventsFrame",null),Q(r,"nodePrograms",{}),Q(r,"nodeHoverPrograms",{}),Q(r,"edgePrograms",{}),r.settings=dx(s),oc(r.settings),ax(t),!(i instanceof HTMLElement))throw new Error("Sigma: container should be an html element.");r.graph=t,r.container=i,r.createWebGLContext("edges",{picking:s.enableEdgeEvents}),r.createCanvasContext("edgeLabels"),r.createWebGLContext("nodes",{picking:!0}),r.createCanvasContext("labels"),r.createCanvasContext("hovers"),r.createWebGLContext("hoverNodes"),r.createCanvasContext("mouse",{style:{touchAction:"none",userSelect:"none"}}),r.resize();for(var o in r.settings.nodeProgramClasses)r.registerNodeProgram(o,r.settings.nodeProgramClasses[o],r.settings.nodeHoverProgramClasses[o]);for(var a in r.settings.edgeProgramClasses)r.registerEdgeProgram(a,r.settings.edgeProgramClasses[a]);return r.camera=new hf,r.bindCameraHandlers(),r.mouseCaptor=new gx(r.elements.mouse,r),r.mouseCaptor.setSettings(r.settings),r.touchCaptor=new xx(r.elements.mouse,r),r.touchCaptor.setSettings(r.settings),r.bindEventHandlers(),r.bindGraphHandlers(),r.handleSettingsUpdate(),r.refresh(),r}return Gn(e,n),hn(e,[{key:"registerNodeProgram",value:function(i,r,s){return this.nodePrograms[i]&&this.nodePrograms[i].kill(),this.nodeHoverPrograms[i]&&this.nodeHoverPrograms[i].kill(),this.nodePrograms[i]=new r(this.webGLContexts.nodes,this.frameBuffers.nodes,this),this.nodeHoverPrograms[i]=new(s||r)(this.webGLContexts.hoverNodes,null,this),this}},{key:"registerEdgeProgram",value:function(i,r){return this.edgePrograms[i]&&this.edgePrograms[i].kill(),this.edgePrograms[i]=new r(this.webGLContexts.edges,this.frameBuffers.edges,this),this}},{key:"unregisterNodeProgram",value:function(i){if(this.nodePrograms[i]){var r=this.nodePrograms,s=r[i],o=ac(r,[i].map(bo));s.kill(),this.nodePrograms=o}if(this.nodeHoverPrograms[i]){var a=this.nodeHoverPrograms,l=a[i],c=ac(a,[i].map(bo));l.kill(),this.nodePrograms=c}return this}},{key:"unregisterEdgeProgram",value:function(i){if(this.edgePrograms[i]){var r=this.edgePrograms,s=r[i],o=ac(r,[i].map(bo));s.kill(),this.edgePrograms=o}return this}},{key:"resetWebGLTexture",value:function(i){var r=this.webGLContexts[i],s=this.frameBuffers[i],o=this.textures[i];o&&r.deleteTexture(o);var a=r.createTexture();return r.bindFramebuffer(r.FRAMEBUFFER,s),r.bindTexture(r.TEXTURE_2D,a),r.texImage2D(r.TEXTURE_2D,0,r.RGBA,this.width,this.height,0,r.RGBA,r.UNSIGNED_BYTE,null),r.framebufferTexture2D(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0,r.TEXTURE_2D,a,0),this.textures[i]=a,this}},{key:"bindCameraHandlers",value:function(){var i=this;return this.activeListeners.camera=function(){i.scheduleRender()},this.camera.on("updated",this.activeListeners.camera),this}},{key:"unbindCameraHandlers",value:function(){return this.camera.removeListener("updated",this.activeListeners.camera),this}},{key:"getNodeAtPosition",value:function(i){var r=i.x,s=i.y,o=qh(this.webGLContexts.nodes,this.frameBuffers.nodes,r,s,this.pixelRatio,this.pickingDownSizingRatio),a=Yh.apply(void 0,ff(o)),l=this.itemIDsIndex[a];return l&&l.type==="node"?l.id:null}},{key:"bindEventHandlers",value:function(){var i=this;this.activeListeners.handleResize=function(){i.scheduleRefresh()},window.addEventListener("resize",this.activeListeners.handleResize),this.activeListeners.handleMove=function(s){var o=Ks(s),a={event:o,preventSigmaDefault:function(){o.preventSigmaDefault()}},l=i.getNodeAtPosition(o);if(l&&i.hoveredNode!==l&&!i.nodeDataCache[l].hidden){i.hoveredNode&&i.emit("leaveNode",Me(Me({},a),{},{node:i.hoveredNode})),i.hoveredNode=l,i.emit("enterNode",Me(Me({},a),{},{node:l})),i.scheduleHighlightedNodesRender();return}if(i.hoveredNode&&i.getNodeAtPosition(o)!==i.hoveredNode){var c=i.hoveredNode;i.hoveredNode=null,i.emit("leaveNode",Me(Me({},a),{},{node:c})),i.scheduleHighlightedNodesRender();return}if(i.settings.enableEdgeEvents){var u=i.hoveredNode?null:i.getEdgeAtPoint(a.event.x,a.event.y);u!==i.hoveredEdge&&(i.hoveredEdge&&i.emit("leaveEdge",Me(Me({},a),{},{edge:i.hoveredEdge})),u&&i.emit("enterEdge",Me(Me({},a),{},{edge:u})),i.hoveredEdge=u)}},this.activeListeners.handleMoveBody=function(s){var o=Ks(s);i.emit("moveBody",{event:o,preventSigmaDefault:function(){o.preventSigmaDefault()}})},this.activeListeners.handleLeave=function(s){var o=Ks(s),a={event:o,preventSigmaDefault:function(){o.preventSigmaDefault()}};i.hoveredNode&&(i.emit("leaveNode",Me(Me({},a),{},{node:i.hoveredNode})),i.scheduleHighlightedNodesRender()),i.settings.enableEdgeEvents&&i.hoveredEdge&&(i.emit("leaveEdge",Me(Me({},a),{},{edge:i.hoveredEdge})),i.scheduleHighlightedNodesRender()),i.emit("leaveStage",Me({},a))},this.activeListeners.handleEnter=function(s){var o=Ks(s),a={event:o,preventSigmaDefault:function(){o.preventSigmaDefault()}};i.emit("enterStage",Me({},a))};var r=function(o){return function(a){var l=Ks(a),c={event:l,preventSigmaDefault:function(){l.preventSigmaDefault()}},u=i.getNodeAtPosition(l);if(u)return i.emit("".concat(o,"Node"),Me(Me({},c),{},{node:u}));if(i.settings.enableEdgeEvents){var d=i.getEdgeAtPoint(l.x,l.y);if(d)return i.emit("".concat(o,"Edge"),Me(Me({},c),{},{edge:d}))}return i.emit("".concat(o,"Stage"),c)}};return this.activeListeners.handleClick=r("click"),this.activeListeners.handleRightClick=r("rightClick"),this.activeListeners.handleDoubleClick=r("doubleClick"),this.activeListeners.handleWheel=r("wheel"),this.activeListeners.handleDown=r("down"),this.activeListeners.handleUp=r("up"),this.mouseCaptor.on("mousemove",this.activeListeners.handleMove),this.mouseCaptor.on("mousemovebody",this.activeListeners.handleMoveBody),this.mouseCaptor.on("click",this.activeListeners.handleClick),this.mouseCaptor.on("rightClick",this.activeListeners.handleRightClick),this.mouseCaptor.on("doubleClick",this.activeListeners.handleDoubleClick),this.mouseCaptor.on("wheel",this.activeListeners.handleWheel),this.mouseCaptor.on("mousedown",this.activeListeners.handleDown),this.mouseCaptor.on("mouseup",this.activeListeners.handleUp),this.mouseCaptor.on("mouseleave",this.activeListeners.handleLeave),this.mouseCaptor.on("mouseenter",this.activeListeners.handleEnter),this.touchCaptor.on("touchdown",this.activeListeners.handleDown),this.touchCaptor.on("touchdown",this.activeListeners.handleMove),this.touchCaptor.on("touchup",this.activeListeners.handleUp),this.touchCaptor.on("touchmove",this.activeListeners.handleMove),this.touchCaptor.on("tap",this.activeListeners.handleClick),this.touchCaptor.on("doubletap",this.activeListeners.handleDoubleClick),this.touchCaptor.on("touchmove",this.activeListeners.handleMoveBody),this}},{key:"bindGraphHandlers",value:function(){var i=this,r=this.graph,s=new Set(["x","y","zIndex","type"]);return this.activeListeners.eachNodeAttributesUpdatedGraphUpdate=function(o){var a,l=(a=o.hints)===null||a===void 0?void 0:a.attributes;i.graph.forEachNode(function(u){return i.updateNode(u)});var c=!l||l.some(function(u){return s.has(u)});i.refresh({partialGraph:{nodes:r.nodes()},skipIndexation:!c,schedule:!0})},this.activeListeners.eachEdgeAttributesUpdatedGraphUpdate=function(o){var a,l=(a=o.hints)===null||a===void 0?void 0:a.attributes;i.graph.forEachEdge(function(u){return i.updateEdge(u)});var c=l&&["zIndex","type"].some(function(u){return l==null?void 0:l.includes(u)});i.refresh({partialGraph:{edges:r.edges()},skipIndexation:!c,schedule:!0})},this.activeListeners.addNodeGraphUpdate=function(o){var a=o.key;i.addNode(a),i.refresh({partialGraph:{nodes:[a]},skipIndexation:!1,schedule:!0})},this.activeListeners.updateNodeGraphUpdate=function(o){var a=o.key;i.refresh({partialGraph:{nodes:[a]},skipIndexation:!1,schedule:!0})},this.activeListeners.dropNodeGraphUpdate=function(o){var a=o.key;i.removeNode(a),i.refresh({schedule:!0})},this.activeListeners.addEdgeGraphUpdate=function(o){var a=o.key;i.addEdge(a),i.refresh({partialGraph:{edges:[a]},schedule:!0})},this.activeListeners.updateEdgeGraphUpdate=function(o){var a=o.key;i.refresh({partialGraph:{edges:[a]},skipIndexation:!1,schedule:!0})},this.activeListeners.dropEdgeGraphUpdate=function(o){var a=o.key;i.removeEdge(a),i.refresh({schedule:!0})},this.activeListeners.clearEdgesGraphUpdate=function(){i.clearEdgeState(),i.clearEdgeIndices(),i.refresh({schedule:!0})},this.activeListeners.clearGraphUpdate=function(){i.clearEdgeState(),i.clearNodeState(),i.clearEdgeIndices(),i.clearNodeIndices(),i.refresh({schedule:!0})},r.on("nodeAdded",this.activeListeners.addNodeGraphUpdate),r.on("nodeDropped",this.activeListeners.dropNodeGraphUpdate),r.on("nodeAttributesUpdated",this.activeListeners.updateNodeGraphUpdate),r.on("eachNodeAttributesUpdated",this.activeListeners.eachNodeAttributesUpdatedGraphUpdate),r.on("edgeAdded",this.activeListeners.addEdgeGraphUpdate),r.on("edgeDropped",this.activeListeners.dropEdgeGraphUpdate),r.on("edgeAttributesUpdated",this.activeListeners.updateEdgeGraphUpdate),r.on("eachEdgeAttributesUpdated",this.activeListeners.eachEdgeAttributesUpdatedGraphUpdate),r.on("edgesCleared",this.activeListeners.clearEdgesGraphUpdate),r.on("cleared",this.activeListeners.clearGraphUpdate),this}},{key:"unbindGraphHandlers",value:function(){var i=this.graph;i.removeListener("nodeAdded",this.activeListeners.addNodeGraphUpdate),i.removeListener("nodeDropped",this.activeListeners.dropNodeGraphUpdate),i.removeListener("nodeAttributesUpdated",this.activeListeners.updateNodeGraphUpdate),i.removeListener("eachNodeAttributesUpdated",this.activeListeners.eachNodeAttributesUpdatedGraphUpdate),i.removeListener("edgeAdded",this.activeListeners.addEdgeGraphUpdate),i.removeListener("edgeDropped",this.activeListeners.dropEdgeGraphUpdate),i.removeListener("edgeAttributesUpdated",this.activeListeners.updateEdgeGraphUpdate),i.removeListener("eachEdgeAttributesUpdated",this.activeListeners.eachEdgeAttributesUpdatedGraphUpdate),i.removeListener("edgesCleared",this.activeListeners.clearEdgesGraphUpdate),i.removeListener("cleared",this.activeListeners.clearGraphUpdate)}},{key:"getEdgeAtPoint",value:function(i,r){var s=qh(this.webGLContexts.edges,this.frameBuffers.edges,i,r,this.pixelRatio,this.pickingDownSizingRatio),o=Yh.apply(void 0,ff(s)),a=this.itemIDsIndex[o];return a&&a.type==="edge"?a.id:null}},{key:"process",value:function(){var i=this;this.emit("beforeProcess");var r=this.graph,s=this.settings,o=this.getDimensions();if(this.nodeExtent=ox(this.graph),!this.settings.autoRescale){var a=o.width,l=o.height,c=this.nodeExtent,u=c.x,d=c.y;this.nodeExtent={x:[(u[0]+u[1])/2-a/2,(u[0]+u[1])/2+a/2],y:[(d[0]+d[1])/2-l/2,(d[0]+d[1])/2+l/2]}}this.normalizationFunction=uf(this.customBBox||this.nodeExtent);var h=new hf,f=qs(h.getState(),o,this.getGraphDimensions(),this.getStagePadding());this.labelGrid.resizeAndClear(o,s.labelGridCellSize);for(var p={},_={},g={},m={},v=1,E=r.nodes(),x=0,w=E.length;x<w;x++){var S=E[x],C=this.nodeDataCache[S],b=r.getNodeAttributes(S);C.x=b.x,C.y=b.y,this.normalizationFunction.applyTo(C),typeof C.label=="string"&&!C.hidden&&this.labelGrid.add(S,C.size,this.framedGraphToViewport(C,{matrix:f})),p[C.type]=(p[C.type]||0)+1}this.labelGrid.organize();for(var T in this.nodePrograms){if(!Ni.call(this.nodePrograms,T))throw new Error('Sigma: could not find a suitable program for node type "'.concat(T,'"!'));this.nodePrograms[T].reallocate(p[T]||0),p[T]=0}this.settings.zIndex&&this.nodeZExtent[0]!==this.nodeZExtent[1]&&(E=cf(this.nodeZExtent,function(Ie){return i.nodeDataCache[Ie].zIndex},E));for(var L=0,P=E.length;L<P;L++){var F=E[L];_[F]=v,m[_[F]]={type:"node",id:F},v++;var W=this.nodeDataCache[F];this.addNodeToProgram(F,_[F],p[W.type]++)}for(var $={},U=r.edges(),B=0,H=U.length;B<H;B++){var Z=U[B],J=this.edgeDataCache[Z];$[J.type]=($[J.type]||0)+1}this.settings.zIndex&&this.edgeZExtent[0]!==this.edgeZExtent[1]&&(U=cf(this.edgeZExtent,function(Ie){return i.edgeDataCache[Ie].zIndex},U));for(var ne in this.edgePrograms){if(!Ni.call(this.edgePrograms,ne))throw new Error('Sigma: could not find a suitable program for edge type "'.concat(ne,'"!'));this.edgePrograms[ne].reallocate($[ne]||0),$[ne]=0}for(var de=0,ye=U.length;de<ye;de++){var Fe=U[de];g[Fe]=v,m[g[Fe]]={type:"edge",id:Fe},v++;var et=this.edgeDataCache[Fe];this.addEdgeToProgram(Fe,g[Fe],$[et.type]++)}return this.itemIDsIndex=m,this.nodeIndices=_,this.edgeIndices=g,this.emit("afterProcess"),this}},{key:"handleSettingsUpdate",value:function(i){var r=this,s=this.settings;if(this.camera.minRatio=s.minCameraRatio,this.camera.maxRatio=s.maxCameraRatio,this.camera.enabledZooming=s.enableCameraZooming,this.camera.enabledPanning=s.enableCameraPanning,this.camera.enabledRotation=s.enableCameraRotation,s.cameraPanBoundaries?this.camera.clean=function(u){return r.cleanCameraState(u,s.cameraPanBoundaries&&fu(s.cameraPanBoundaries)==="object"?s.cameraPanBoundaries:{})}:this.camera.clean=null,this.camera.setState(this.camera.validateState(this.camera.getState())),i){if(i.edgeProgramClasses!==s.edgeProgramClasses){for(var o in s.edgeProgramClasses)s.edgeProgramClasses[o]!==i.edgeProgramClasses[o]&&this.registerEdgeProgram(o,s.edgeProgramClasses[o]);for(var a in i.edgeProgramClasses)s.edgeProgramClasses[a]||this.unregisterEdgeProgram(a)}if(i.nodeProgramClasses!==s.nodeProgramClasses||i.nodeHoverProgramClasses!==s.nodeHoverProgramClasses){for(var l in s.nodeProgramClasses)(s.nodeProgramClasses[l]!==i.nodeProgramClasses[l]||s.nodeHoverProgramClasses[l]!==i.nodeHoverProgramClasses[l])&&this.registerNodeProgram(l,s.nodeProgramClasses[l],s.nodeHoverProgramClasses[l]);for(var c in i.nodeProgramClasses)s.nodeProgramClasses[c]||this.unregisterNodeProgram(c)}}return this.mouseCaptor.setSettings(this.settings),this.touchCaptor.setSettings(this.settings),this}},{key:"cleanCameraState",value:function(i){var r=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},s=r.tolerance,o=s===void 0?0:s,a=r.boundaries,l=Me({},i),c=a||this.nodeExtent,u=Ls(c.x,2),d=u[0],h=u[1],f=Ls(c.y,2),p=f[0],_=f[1],g=[this.graphToViewport({x:d,y:p},{cameraState:i}),this.graphToViewport({x:h,y:p},{cameraState:i}),this.graphToViewport({x:d,y:_},{cameraState:i}),this.graphToViewport({x:h,y:_},{cameraState:i})],m=1/0,v=-1/0,E=1/0,x=-1/0;g.forEach(function($){var U=$.x,B=$.y;m=Math.min(m,U),v=Math.max(v,U),E=Math.min(E,B),x=Math.max(x,B)});var w=v-m,S=x-E,C=this.getDimensions(),b=C.width,T=C.height,L=0,P=0;if(w>=b?v<b-o?L=v-(b-o):m>o&&(L=m-o):v>b+o?L=v-(b+o):m<-o&&(L=m+o),S>=T?x<T-o?P=x-(T-o):E>o&&(P=E-o):x>T+o?P=x-(T+o):E<-o&&(P=E+o),L||P){var F=this.viewportToFramedGraph({x:0,y:0},{cameraState:i}),W=this.viewportToFramedGraph({x:L,y:P},{cameraState:i});L=W.x-F.x,P=W.y-F.y,l.x+=L,l.y+=P}return l}},{key:"renderLabels",value:function(){if(!this.settings.renderLabels)return this;var i=this.camera.getState(),r=this.labelGrid.getLabelsToDisplay(i.ratio,this.settings.labelDensity);df(r,this.nodesWithForcedLabels),this.displayedNodeLabels=new Set;for(var s=this.canvasContexts.labels,o=0,a=r.length;o<a;o++){var l=r[o],c=this.nodeDataCache[l];if(!this.displayedNodeLabels.has(l)&&!c.hidden){var u=this.framedGraphToViewport(c),d=u.x,h=u.y,f=this.scaleSize(c.size);if(!(!c.forceLabel&&f<this.settings.labelRenderedSizeThreshold)&&!(d<-gf||d>this.width+gf||h<-_f||h>this.height+_f)){this.displayedNodeLabels.add(l);var p=this.settings.defaultDrawNodeLabel,_=this.nodePrograms[c.type],g=(_==null?void 0:_.drawLabel)||p;g(s,Me(Me({key:l},c),{},{size:f,x:d,y:h}),this.settings)}}}return this}},{key:"renderEdgeLabels",value:function(){if(!this.settings.renderEdgeLabels)return this;var i=this.canvasContexts.edgeLabels;i.clearRect(0,0,this.width,this.height);var r=Mx({graph:this.graph,hoveredNode:this.hoveredNode,displayedNodeLabels:this.displayedNodeLabels,highlightedNodes:this.highlightedNodes});df(r,this.edgesWithForcedLabels);for(var s=new Set,o=0,a=r.length;o<a;o++){var l=r[o],c=this.graph.extremities(l),u=this.nodeDataCache[c[0]],d=this.nodeDataCache[c[1]],h=this.edgeDataCache[l];if(!s.has(l)&&!(h.hidden||u.hidden||d.hidden)){var f=this.settings.defaultDrawEdgeLabel,p=this.edgePrograms[h.type],_=(p==null?void 0:p.drawLabel)||f;_(i,Me(Me({key:l},h),{},{size:this.scaleSize(h.size)}),Me(Me(Me({key:c[0]},u),this.framedGraphToViewport(u)),{},{size:this.scaleSize(u.size)}),Me(Me(Me({key:c[1]},d),this.framedGraphToViewport(d)),{},{size:this.scaleSize(d.size)}),this.settings),s.add(l)}}return this.displayedEdgeLabels=s,this}},{key:"renderHighlightedNodes",value:function(){var i=this,r=this.canvasContexts.hovers;r.clearRect(0,0,this.width,this.height);var s=function(f){var p=i.nodeDataCache[f],_=i.framedGraphToViewport(p),g=_.x,m=_.y,v=i.scaleSize(p.size),E=i.settings.defaultDrawNodeHover,x=i.nodePrograms[p.type],w=(x==null?void 0:x.drawHover)||E;w(r,Me(Me({key:f},p),{},{size:v,x:g,y:m}),i.settings)},o=[];this.hoveredNode&&!this.nodeDataCache[this.hoveredNode].hidden&&o.push(this.hoveredNode),this.highlightedNodes.forEach(function(h){h!==i.hoveredNode&&o.push(h)}),o.forEach(function(h){return s(h)});var a={};o.forEach(function(h){var f=i.nodeDataCache[h].type;a[f]=(a[f]||0)+1});for(var l in this.nodeHoverPrograms)this.nodeHoverPrograms[l].reallocate(a[l]||0),a[l]=0;o.forEach(function(h){var f=i.nodeDataCache[h];i.nodeHoverPrograms[f.type].process(0,a[f.type]++,f)}),this.webGLContexts.hoverNodes.clear(this.webGLContexts.hoverNodes.COLOR_BUFFER_BIT);var c=this.getRenderParams();for(var u in this.nodeHoverPrograms){var d=this.nodeHoverPrograms[u];d.render(c)}}},{key:"scheduleHighlightedNodesRender",value:function(){var i=this;this.renderHighlightedNodesFrame||this.renderFrame||(this.renderHighlightedNodesFrame=requestAnimationFrame(function(){i.renderHighlightedNodesFrame=null,i.renderHighlightedNodes(),i.renderEdgeLabels()}))}},{key:"render",value:function(){var i=this;this.emit("beforeRender");var r=function(){return i.emit("afterRender"),i};if(this.renderFrame&&(cancelAnimationFrame(this.renderFrame),this.renderFrame=null),this.resize(),this.needToProcess&&this.process(),this.needToProcess=!1,this.clear(),this.pickingLayers.forEach(function(g){return i.resetWebGLTexture(g)}),!this.graph.order)return r();var s=this.mouseCaptor,o=this.camera.isAnimated()||s.isMoving||s.draggedEvents||s.currentWheelDirection,a=this.camera.getState(),l=this.getDimensions(),c=this.getGraphDimensions(),u=this.getStagePadding();this.matrix=qs(a,l,c,u),this.invMatrix=qs(a,l,c,u,!0),this.correctionRatio=sx(this.matrix,a,l),this.graphToViewportRatio=this.getGraphToViewportRatio();var d=this.getRenderParams();for(var h in this.nodePrograms){var f=this.nodePrograms[h];f.render(d)}if(!this.settings.hideEdgesOnMove||!o)for(var p in this.edgePrograms){var _=this.edgePrograms[p];_.render(d)}return this.settings.hideLabelsOnMove&&o||(this.renderLabels(),this.renderEdgeLabels(),this.renderHighlightedNodes()),r()}},{key:"addNode",value:function(i){var r=Object.assign({},this.graph.getNodeAttributes(i));this.settings.nodeReducer&&(r=this.settings.nodeReducer(i,r));var s=wx(this.settings,i,r);this.nodeDataCache[i]=s,this.nodesWithForcedLabels.delete(i),s.forceLabel&&!s.hidden&&this.nodesWithForcedLabels.add(i),this.highlightedNodes.delete(i),s.highlighted&&!s.hidden&&this.highlightedNodes.add(i),this.settings.zIndex&&(s.zIndex<this.nodeZExtent[0]&&(this.nodeZExtent[0]=s.zIndex),s.zIndex>this.nodeZExtent[1]&&(this.nodeZExtent[1]=s.zIndex))}},{key:"updateNode",value:function(i){this.addNode(i);var r=this.nodeDataCache[i];this.normalizationFunction.applyTo(r)}},{key:"removeNode",value:function(i){delete this.nodeDataCache[i],delete this.nodeProgramIndex[i],this.highlightedNodes.delete(i),this.hoveredNode===i&&(this.hoveredNode=null),this.nodesWithForcedLabels.delete(i)}},{key:"addEdge",value:function(i){var r=Object.assign({},this.graph.getEdgeAttributes(i));this.settings.edgeReducer&&(r=this.settings.edgeReducer(i,r));var s=Tx(this.settings,i,r);this.edgeDataCache[i]=s,this.edgesWithForcedLabels.delete(i),s.forceLabel&&!s.hidden&&this.edgesWithForcedLabels.add(i),this.settings.zIndex&&(s.zIndex<this.edgeZExtent[0]&&(this.edgeZExtent[0]=s.zIndex),s.zIndex>this.edgeZExtent[1]&&(this.edgeZExtent[1]=s.zIndex))}},{key:"updateEdge",value:function(i){this.addEdge(i)}},{key:"removeEdge",value:function(i){delete this.edgeDataCache[i],delete this.edgeProgramIndex[i],this.hoveredEdge===i&&(this.hoveredEdge=null),this.edgesWithForcedLabels.delete(i)}},{key:"clearNodeIndices",value:function(){this.labelGrid=new mf,this.nodeExtent={x:[0,1],y:[0,1]},this.nodeDataCache={},this.edgeProgramIndex={},this.nodesWithForcedLabels=new Set,this.nodeZExtent=[1/0,-1/0],this.highlightedNodes=new Set}},{key:"clearEdgeIndices",value:function(){this.edgeDataCache={},this.edgeProgramIndex={},this.edgesWithForcedLabels=new Set,this.edgeZExtent=[1/0,-1/0]}},{key:"clearIndices",value:function(){this.clearEdgeIndices(),this.clearNodeIndices()}},{key:"clearNodeState",value:function(){this.displayedNodeLabels=new Set,this.highlightedNodes=new Set,this.hoveredNode=null}},{key:"clearEdgeState",value:function(){this.displayedEdgeLabels=new Set,this.highlightedNodes=new Set,this.hoveredEdge=null}},{key:"clearState",value:function(){this.clearEdgeState(),this.clearNodeState()}},{key:"addNodeToProgram",value:function(i,r,s){var o=this.nodeDataCache[i],a=this.nodePrograms[o.type];if(!a)throw new Error('Sigma: could not find a suitable program for node type "'.concat(o.type,'"!'));a.process(r,s,o),this.nodeProgramIndex[i]=s}},{key:"addEdgeToProgram",value:function(i,r,s){var o=this.edgeDataCache[i],a=this.edgePrograms[o.type];if(!a)throw new Error('Sigma: could not find a suitable program for edge type "'.concat(o.type,'"!'));var l=this.graph.extremities(i),c=this.nodeDataCache[l[0]],u=this.nodeDataCache[l[1]];a.process(r,s,c,u,o),this.edgeProgramIndex[i]=s}},{key:"getRenderParams",value:function(){return{matrix:this.matrix,invMatrix:this.invMatrix,width:this.width,height:this.height,pixelRatio:this.pixelRatio,zoomRatio:this.camera.ratio,cameraAngle:this.camera.angle,sizeRatio:1/this.scaleSize(),correctionRatio:this.correctionRatio,downSizingRatio:this.pickingDownSizingRatio,minEdgeThickness:this.settings.minEdgeThickness,antiAliasingFeather:this.settings.antiAliasingFeather}}},{key:"getStagePadding",value:function(){var i=this.settings,r=i.stagePadding,s=i.autoRescale;return s&&r||0}},{key:"createLayer",value:function(i,r){var s=arguments.length>2&&arguments[2]!==void 0?arguments[2]:{};if(this.elements[i])throw new Error('Sigma: a layer named "'.concat(i,'" already exists'));var o=lx(r,{position:"absolute"},{class:"sigma-".concat(i)});return s.style&&Object.assign(o.style,s.style),this.elements[i]=o,"beforeLayer"in s&&s.beforeLayer?this.elements[s.beforeLayer].before(o):"afterLayer"in s&&s.afterLayer?this.elements[s.afterLayer].after(o):this.container.appendChild(o),o}},{key:"createCanvas",value:function(i){var r=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{};return this.createLayer(i,"canvas",r)}},{key:"createCanvasContext",value:function(i){var r=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},s=this.createCanvas(i,r),o={preserveDrawingBuffer:!1,antialias:!1};return this.canvasContexts[i]=s.getContext("2d",o),this}},{key:"createWebGLContext",value:function(i){var r=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},s=(r==null?void 0:r.canvas)||this.createCanvas(i,r);r.hidden&&s.remove();var o=Me({preserveDrawingBuffer:!1,antialias:!1},r),a;a=s.getContext("webgl2",o),a||(a=s.getContext("webgl",o)),a||(a=s.getContext("experimental-webgl",o));var l=a;if(this.webGLContexts[i]=l,l.blendFunc(l.ONE,l.ONE_MINUS_SRC_ALPHA),r.picking){this.pickingLayers.add(i);var c=l.createFramebuffer();if(!c)throw new Error("Sigma: cannot create a new frame buffer for layer ".concat(i));this.frameBuffers[i]=c}return l}},{key:"killLayer",value:function(i){var r=this.elements[i];if(!r)throw new Error("Sigma: cannot kill layer ".concat(i,", which does not exist"));if(this.webGLContexts[i]){var s,o=this.webGLContexts[i];(s=o.getExtension("WEBGL_lose_context"))===null||s===void 0||s.loseContext(),delete this.webGLContexts[i]}else this.canvasContexts[i]&&delete this.canvasContexts[i];return r.remove(),delete this.elements[i],this}},{key:"getCamera",value:function(){return this.camera}},{key:"setCamera",value:function(i){this.unbindCameraHandlers(),this.camera=i,this.bindCameraHandlers()}},{key:"getContainer",value:function(){return this.container}},{key:"getGraph",value:function(){return this.graph}},{key:"setGraph",value:function(i){i!==this.graph&&(this.hoveredNode&&!i.hasNode(this.hoveredNode)&&(this.hoveredNode=null),this.hoveredEdge&&!i.hasEdge(this.hoveredEdge)&&(this.hoveredEdge=null),this.unbindGraphHandlers(),this.checkEdgesEventsFrame!==null&&(cancelAnimationFrame(this.checkEdgesEventsFrame),this.checkEdgesEventsFrame=null),this.graph=i,this.bindGraphHandlers(),this.refresh())}},{key:"getMouseCaptor",value:function(){return this.mouseCaptor}},{key:"getTouchCaptor",value:function(){return this.touchCaptor}},{key:"getDimensions",value:function(){return{width:this.width,height:this.height}}},{key:"getGraphDimensions",value:function(){var i=this.customBBox||this.nodeExtent;return{width:i.x[1]-i.x[0]||1,height:i.y[1]-i.y[0]||1}}},{key:"getNodeDisplayData",value:function(i){var r=this.nodeDataCache[i];return r?Object.assign({},r):void 0}},{key:"getEdgeDisplayData",value:function(i){var r=this.edgeDataCache[i];return r?Object.assign({},r):void 0}},{key:"getNodeDisplayedLabels",value:function(){return new Set(this.displayedNodeLabels)}},{key:"getEdgeDisplayedLabels",value:function(){return new Set(this.displayedEdgeLabels)}},{key:"getSettings",value:function(){return Me({},this.settings)}},{key:"getSetting",value:function(i){return this.settings[i]}},{key:"setSetting",value:function(i,r){var s=Me({},this.settings);return this.settings[i]=r,oc(this.settings),this.handleSettingsUpdate(s),this.scheduleRefresh(),this}},{key:"updateSetting",value:function(i,r){return this.setSetting(i,r(this.settings[i])),this}},{key:"setSettings",value:function(i){var r=Me({},this.settings);return this.settings=Me(Me({},this.settings),i),oc(this.settings),this.handleSettingsUpdate(r),this.scheduleRefresh(),this}},{key:"resize",value:function(i){var r=this.width,s=this.height;if(this.width=this.container.offsetWidth,this.height=this.container.offsetHeight,this.pixelRatio=lf(),this.width===0)if(this.settings.allowInvalidContainer)this.width=1;else throw new Error("Sigma: Container has no width. You can set the allowInvalidContainer setting to true to stop seeing this error.");if(this.height===0)if(this.settings.allowInvalidContainer)this.height=1;else throw new Error("Sigma: Container has no height. You can set the allowInvalidContainer setting to true to stop seeing this error.");if(!i&&r===this.width&&s===this.height)return this;for(var o in this.elements){var a=this.elements[o];a.style.width=this.width+"px",a.style.height=this.height+"px"}for(var l in this.canvasContexts)this.elements[l].setAttribute("width",this.width*this.pixelRatio+"px"),this.elements[l].setAttribute("height",this.height*this.pixelRatio+"px"),this.pixelRatio!==1&&this.canvasContexts[l].scale(this.pixelRatio,this.pixelRatio);for(var c in this.webGLContexts){this.elements[c].setAttribute("width",this.width*this.pixelRatio+"px"),this.elements[c].setAttribute("height",this.height*this.pixelRatio+"px");var u=this.webGLContexts[c];if(u.viewport(0,0,this.width*this.pixelRatio,this.height*this.pixelRatio),this.pickingLayers.has(c)){var d=this.textures[c];d&&u.deleteTexture(d)}}return this.emit("resize"),this}},{key:"clear",value:function(){return this.emit("beforeClear"),this.webGLContexts.nodes.bindFramebuffer(WebGLRenderingContext.FRAMEBUFFER,null),this.webGLContexts.nodes.clear(WebGLRenderingContext.COLOR_BUFFER_BIT),this.webGLContexts.edges.bindFramebuffer(WebGLRenderingContext.FRAMEBUFFER,null),this.webGLContexts.edges.clear(WebGLRenderingContext.COLOR_BUFFER_BIT),this.webGLContexts.hoverNodes.clear(WebGLRenderingContext.COLOR_BUFFER_BIT),this.canvasContexts.labels.clearRect(0,0,this.width,this.height),this.canvasContexts.hovers.clearRect(0,0,this.width,this.height),this.canvasContexts.edgeLabels.clearRect(0,0,this.width,this.height),this.emit("afterClear"),this}},{key:"refresh",value:function(i){var r=this,s=(i==null?void 0:i.skipIndexation)!==void 0?i==null?void 0:i.skipIndexation:!1,o=(i==null?void 0:i.schedule)!==void 0?i.schedule:!1,a=!i||!i.partialGraph;if(a)this.clearEdgeIndices(),this.clearNodeIndices(),this.graph.forEachNode(function(x){return r.addNode(x)}),this.graph.forEachEdge(function(x){return r.addEdge(x)});else{for(var l,c,u=((l=i.partialGraph)===null||l===void 0?void 0:l.nodes)||[],d=0,h=(u==null?void 0:u.length)||0;d<h;d++){var f=u[d];if(this.updateNode(f),s){var p=this.nodeProgramIndex[f];if(p===void 0)throw new Error('Sigma: node "'.concat(f,`" can't be repaint`));this.addNodeToProgram(f,this.nodeIndices[f],p)}}for(var _=(i==null||(c=i.partialGraph)===null||c===void 0?void 0:c.edges)||[],g=0,m=_.length;g<m;g++){var v=_[g];if(this.updateEdge(v),s){var E=this.edgeProgramIndex[v];if(E===void 0)throw new Error('Sigma: edge "'.concat(v,`" can't be repaint`));this.addEdgeToProgram(v,this.edgeIndices[v],E)}}}return(a||!s)&&(this.needToProcess=!0),o?this.scheduleRender():this.render(),this}},{key:"scheduleRender",value:function(){var i=this;return this.renderFrame||(this.renderFrame=requestAnimationFrame(function(){i.render()})),this}},{key:"scheduleRefresh",value:function(i){return this.refresh(Me(Me({},i),{},{schedule:!0}))}},{key:"getViewportZoomedState",value:function(i,r){var s=this.camera.getState(),o=s.ratio,a=s.angle,l=s.x,c=s.y,u=this.settings,d=u.minCameraRatio,h=u.maxCameraRatio;typeof h=="number"&&(r=Math.min(r,h)),typeof d=="number"&&(r=Math.max(r,d));var f=r/o,p={x:this.width/2,y:this.height/2},_=this.viewportToFramedGraph(i),g=this.viewportToFramedGraph(p);return{angle:a,x:(_.x-g.x)*(1-f)+l,y:(_.y-g.y)*(1-f)+c,ratio:r}}},{key:"viewRectangle",value:function(){var i=this.viewportToFramedGraph({x:0,y:0}),r=this.viewportToFramedGraph({x:this.width,y:0}),s=this.viewportToFramedGraph({x:0,y:this.height});return{x1:i.x,y1:i.y,x2:r.x,y2:r.y,height:r.y-s.y}}},{key:"framedGraphToViewport",value:function(i){var r=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},s=!!r.cameraState||!!r.viewportDimensions||!!r.graphDimensions,o=r.matrix?r.matrix:s?qs(r.cameraState||this.camera.getState(),r.viewportDimensions||this.getDimensions(),r.graphDimensions||this.getGraphDimensions(),r.padding||this.getStagePadding()):this.matrix,a=hu(o,i);return{x:(1+a.x)*this.width/2,y:(1-a.y)*this.height/2}}},{key:"viewportToFramedGraph",value:function(i){var r=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},s=!!r.cameraState||!!r.viewportDimensions||!r.graphDimensions,o=r.matrix?r.matrix:s?qs(r.cameraState||this.camera.getState(),r.viewportDimensions||this.getDimensions(),r.graphDimensions||this.getGraphDimensions(),r.padding||this.getStagePadding(),!0):this.invMatrix,a=hu(o,{x:i.x/this.width*2-1,y:1-i.y/this.height*2});return isNaN(a.x)&&(a.x=0),isNaN(a.y)&&(a.y=0),a}},{key:"viewportToGraph",value:function(i){var r=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{};return this.normalizationFunction.inverse(this.viewportToFramedGraph(i,r))}},{key:"graphToViewport",value:function(i){var r=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{};return this.framedGraphToViewport(this.normalizationFunction(i),r)}},{key:"getGraphToViewportRatio",value:function(){var i={x:0,y:0},r={x:1,y:1},s=Math.sqrt(Math.pow(i.x-r.x,2)+Math.pow(i.y-r.y,2)),o=this.graphToViewport(i),a=this.graphToViewport(r),l=Math.sqrt(Math.pow(o.x-a.x,2)+Math.pow(o.y-a.y,2));return l/s}},{key:"getBBox",value:function(){return this.nodeExtent}},{key:"getCustomBBox",value:function(){return this.customBBox}},{key:"setCustomBBox",value:function(i){return this.customBBox=i,this.scheduleRender(),this}},{key:"kill",value:function(){this.emit("kill"),this.removeAllListeners(),this.unbindCameraHandlers(),window.removeEventListener("resize",this.activeListeners.handleResize),this.mouseCaptor.kill(),this.touchCaptor.kill(),this.unbindGraphHandlers(),this.clearIndices(),this.clearState(),this.nodeDataCache={},this.edgeDataCache={},this.highlightedNodes.clear(),this.renderFrame&&(cancelAnimationFrame(this.renderFrame),this.renderFrame=null),this.renderHighlightedNodesFrame&&(cancelAnimationFrame(this.renderHighlightedNodesFrame),this.renderHighlightedNodesFrame=null);for(var i=this.container;i.firstChild;)i.removeChild(i.firstChild);for(var r in this.nodePrograms)this.nodePrograms[r].kill();for(var s in this.nodeHoverPrograms)this.nodeHoverPrograms[s].kill();for(var o in this.edgePrograms)this.edgePrograms[o].kill();this.nodePrograms={},this.nodeHoverPrograms={},this.edgePrograms={};for(var a in this.elements)this.killLayer(a);this.canvasContexts={},this.webGLContexts={},this.elements={}}},{key:"scaleSize",value:function(){var i=arguments.length>0&&arguments[0]!==void 0?arguments[0]:1,r=arguments.length>1&&arguments[1]!==void 0?arguments[1]:this.camera.ratio;return i/this.settings.zoomToSizeRatioFunction(r)*(this.getSetting("itemSizesReference")==="positions"?r*this.graphToViewportRatio:1)}},{key:"getCanvases",value:function(){var i={};for(var r in this.elements)this.elements[r]instanceof HTMLCanvasElement&&(i[r]=this.elements[r]);return i}}])})(Ad),Cx=Ax;function Rx(){const n=arguments[0];for(let e=1,t=arguments.length;e<t;e++)if(arguments[e])for(const i in arguments[e])n[i]=arguments[e][i];return n}let Yt=Rx;typeof Object.assign=="function"&&(Yt=Object.assign);function kn(n,e,t,i){const r=n._nodes.get(e);let s=null;return r&&(i==="mixed"?s=r.out&&r.out[t]||r.undirected&&r.undirected[t]:i==="directed"?s=r.out&&r.out[t]:s=r.undirected&&r.undirected[t]),s}function tn(n){return typeof n=="object"&&n!==null}function Km(n){let e;for(e in n)return!1;return!0}function Pn(n,e,t){Object.defineProperty(n,e,{enumerable:!1,configurable:!1,writable:!0,value:t})}function Hn(n,e,t){const i={enumerable:!0,configurable:!0};typeof t=="function"?i.get=t:(i.value=t,i.writable=!1),Object.defineProperty(n,e,i)}function vf(n){return!(!tn(n)||n.attributes&&!Array.isArray(n.attributes))}function Px(){let n=Math.floor(Math.random()*256)&255;return()=>n++}function Hi(){const n=arguments;let e=null,t=-1;return{[Symbol.iterator](){return this},next(){let i=null;do{if(e===null){if(t++,t>=n.length)return{done:!0};e=n[t][Symbol.iterator]()}if(i=e.next(),i.done){e=null;continue}break}while(!0);return i}}}function zs(){return{[Symbol.iterator](){return this},next(){return{done:!0}}}}class Rd extends Error{constructor(e){super(),this.name="GraphError",this.message=e}}class ve extends Rd{constructor(e){super(e),this.name="InvalidArgumentsGraphError",typeof Error.captureStackTrace=="function"&&Error.captureStackTrace(this,ve.prototype.constructor)}}class ae extends Rd{constructor(e){super(e),this.name="NotFoundGraphError",typeof Error.captureStackTrace=="function"&&Error.captureStackTrace(this,ae.prototype.constructor)}}class De extends Rd{constructor(e){super(e),this.name="UsageGraphError",typeof Error.captureStackTrace=="function"&&Error.captureStackTrace(this,De.prototype.constructor)}}function Zm(n,e){this.key=n,this.attributes=e,this.clear()}Zm.prototype.clear=function(){this.inDegree=0,this.outDegree=0,this.undirectedDegree=0,this.undirectedLoops=0,this.directedLoops=0,this.in={},this.out={},this.undirected={}};function Jm(n,e){this.key=n,this.attributes=e,this.clear()}Jm.prototype.clear=function(){this.inDegree=0,this.outDegree=0,this.directedLoops=0,this.in={},this.out={}};function Qm(n,e){this.key=n,this.attributes=e,this.clear()}Qm.prototype.clear=function(){this.undirectedDegree=0,this.undirectedLoops=0,this.undirected={}};function Gs(n,e,t,i,r){this.key=e,this.attributes=r,this.undirected=n,this.source=t,this.target=i}Gs.prototype.attach=function(){let n="out",e="in";this.undirected&&(n=e="undirected");const t=this.source.key,i=this.target.key;this.source[n][i]=this,!(this.undirected&&t===i)&&(this.target[e][t]=this)};Gs.prototype.attachMulti=function(){let n="out",e="in";const t=this.source.key,i=this.target.key;this.undirected&&(n=e="undirected");const r=this.source[n],s=r[i];if(typeof s>"u"){r[i]=this,this.undirected&&t===i||(this.target[e][t]=this);return}s.previous=this,this.next=s,r[i]=this,this.target[e][t]=this};Gs.prototype.detach=function(){const n=this.source.key,e=this.target.key;let t="out",i="in";this.undirected&&(t=i="undirected"),delete this.source[t][e],delete this.target[i][n]};Gs.prototype.detachMulti=function(){const n=this.source.key,e=this.target.key;let t="out",i="in";this.undirected&&(t=i="undirected"),this.previous===void 0?this.next===void 0?(delete this.source[t][e],delete this.target[i][n]):(this.next.previous=void 0,this.source[t][e]=this.next,this.target[i][n]=this.next):(this.previous.next=this.next,this.next!==void 0&&(this.next.previous=this.previous))};const eg=0,tg=1,Lx=2,ng=3;function Yi(n,e,t,i,r,s,o){let a,l,c,u;if(i=""+i,t===eg){if(a=n._nodes.get(i),!a)throw new ae(`Graph.${e}: could not find the "${i}" node in the graph.`);c=r,u=s}else if(t===ng){if(r=""+r,l=n._edges.get(r),!l)throw new ae(`Graph.${e}: could not find the "${r}" edge in the graph.`);const d=l.source.key,h=l.target.key;if(i===d)a=l.target;else if(i===h)a=l.source;else throw new ae(`Graph.${e}: the "${i}" node is not attached to the "${r}" edge (${d}, ${h}).`);c=s,u=o}else{if(l=n._edges.get(i),!l)throw new ae(`Graph.${e}: could not find the "${i}" edge in the graph.`);t===tg?a=l.source:a=l.target,c=r,u=s}return[a,c,u]}function Dx(n,e,t){n.prototype[e]=function(i,r,s){const[o,a]=Yi(this,e,t,i,r,s);return o.attributes[a]}}function Nx(n,e,t){n.prototype[e]=function(i,r){const[s]=Yi(this,e,t,i,r);return s.attributes}}function Ix(n,e,t){n.prototype[e]=function(i,r,s){const[o,a]=Yi(this,e,t,i,r,s);return o.attributes.hasOwnProperty(a)}}function Ux(n,e,t){n.prototype[e]=function(i,r,s,o){const[a,l,c]=Yi(this,e,t,i,r,s,o);return a.attributes[l]=c,this.emit("nodeAttributesUpdated",{key:a.key,type:"set",attributes:a.attributes,name:l}),this}}function Fx(n,e,t){n.prototype[e]=function(i,r,s,o){const[a,l,c]=Yi(this,e,t,i,r,s,o);if(typeof c!="function")throw new ve(`Graph.${e}: updater should be a function.`);const u=a.attributes,d=c(u[l]);return u[l]=d,this.emit("nodeAttributesUpdated",{key:a.key,type:"set",attributes:a.attributes,name:l}),this}}function Ox(n,e,t){n.prototype[e]=function(i,r,s){const[o,a]=Yi(this,e,t,i,r,s);return delete o.attributes[a],this.emit("nodeAttributesUpdated",{key:o.key,type:"remove",attributes:o.attributes,name:a}),this}}function kx(n,e,t){n.prototype[e]=function(i,r,s){const[o,a]=Yi(this,e,t,i,r,s);if(!tn(a))throw new ve(`Graph.${e}: provided attributes are not a plain object.`);return o.attributes=a,this.emit("nodeAttributesUpdated",{key:o.key,type:"replace",attributes:o.attributes}),this}}function Bx(n,e,t){n.prototype[e]=function(i,r,s){const[o,a]=Yi(this,e,t,i,r,s);if(!tn(a))throw new ve(`Graph.${e}: provided attributes are not a plain object.`);return Yt(o.attributes,a),this.emit("nodeAttributesUpdated",{key:o.key,type:"merge",attributes:o.attributes,data:a}),this}}function zx(n,e,t){n.prototype[e]=function(i,r,s){const[o,a]=Yi(this,e,t,i,r,s);if(typeof a!="function")throw new ve(`Graph.${e}: provided updater is not a function.`);return o.attributes=a(o.attributes),this.emit("nodeAttributesUpdated",{key:o.key,type:"update",attributes:o.attributes}),this}}const Gx=[{name:n=>`get${n}Attribute`,attacher:Dx},{name:n=>`get${n}Attributes`,attacher:Nx},{name:n=>`has${n}Attribute`,attacher:Ix},{name:n=>`set${n}Attribute`,attacher:Ux},{name:n=>`update${n}Attribute`,attacher:Fx},{name:n=>`remove${n}Attribute`,attacher:Ox},{name:n=>`replace${n}Attributes`,attacher:kx},{name:n=>`merge${n}Attributes`,attacher:Bx},{name:n=>`update${n}Attributes`,attacher:zx}];function Hx(n){Gx.forEach(function({name:e,attacher:t}){t(n,e("Node"),eg),t(n,e("Source"),tg),t(n,e("Target"),Lx),t(n,e("Opposite"),ng)})}function Vx(n,e,t){n.prototype[e]=function(i,r){let s;if(this.type!=="mixed"&&t!=="mixed"&&t!==this.type)throw new De(`Graph.${e}: cannot find this type of edges in your ${this.type} graph.`);if(arguments.length>2){if(this.multi)throw new De(`Graph.${e}: cannot use a {source,target} combo when asking about an edge's attributes in a MultiGraph since we cannot infer the one you want information about.`);const o=""+i,a=""+r;if(r=arguments[2],s=kn(this,o,a,t),!s)throw new ae(`Graph.${e}: could not find an edge for the given path ("${o}" - "${a}").`)}else{if(t!=="mixed")throw new De(`Graph.${e}: calling this method with only a key (vs. a source and target) does not make sense since an edge with this key could have the other type.`);if(i=""+i,s=this._edges.get(i),!s)throw new ae(`Graph.${e}: could not find the "${i}" edge in the graph.`)}return s.attributes[r]}}function Wx(n,e,t){n.prototype[e]=function(i){let r;if(this.type!=="mixed"&&t!=="mixed"&&t!==this.type)throw new De(`Graph.${e}: cannot find this type of edges in your ${this.type} graph.`);if(arguments.length>1){if(this.multi)throw new De(`Graph.${e}: cannot use a {source,target} combo when asking about an edge's attributes in a MultiGraph since we cannot infer the one you want information about.`);const s=""+i,o=""+arguments[1];if(r=kn(this,s,o,t),!r)throw new ae(`Graph.${e}: could not find an edge for the given path ("${s}" - "${o}").`)}else{if(t!=="mixed")throw new De(`Graph.${e}: calling this method with only a key (vs. a source and target) does not make sense since an edge with this key could have the other type.`);if(i=""+i,r=this._edges.get(i),!r)throw new ae(`Graph.${e}: could not find the "${i}" edge in the graph.`)}return r.attributes}}function $x(n,e,t){n.prototype[e]=function(i,r){let s;if(this.type!=="mixed"&&t!=="mixed"&&t!==this.type)throw new De(`Graph.${e}: cannot find this type of edges in your ${this.type} graph.`);if(arguments.length>2){if(this.multi)throw new De(`Graph.${e}: cannot use a {source,target} combo when asking about an edge's attributes in a MultiGraph since we cannot infer the one you want information about.`);const o=""+i,a=""+r;if(r=arguments[2],s=kn(this,o,a,t),!s)throw new ae(`Graph.${e}: could not find an edge for the given path ("${o}" - "${a}").`)}else{if(t!=="mixed")throw new De(`Graph.${e}: calling this method with only a key (vs. a source and target) does not make sense since an edge with this key could have the other type.`);if(i=""+i,s=this._edges.get(i),!s)throw new ae(`Graph.${e}: could not find the "${i}" edge in the graph.`)}return s.attributes.hasOwnProperty(r)}}function Xx(n,e,t){n.prototype[e]=function(i,r,s){let o;if(this.type!=="mixed"&&t!=="mixed"&&t!==this.type)throw new De(`Graph.${e}: cannot find this type of edges in your ${this.type} graph.`);if(arguments.length>3){if(this.multi)throw new De(`Graph.${e}: cannot use a {source,target} combo when asking about an edge's attributes in a MultiGraph since we cannot infer the one you want information about.`);const a=""+i,l=""+r;if(r=arguments[2],s=arguments[3],o=kn(this,a,l,t),!o)throw new ae(`Graph.${e}: could not find an edge for the given path ("${a}" - "${l}").`)}else{if(t!=="mixed")throw new De(`Graph.${e}: calling this method with only a key (vs. a source and target) does not make sense since an edge with this key could have the other type.`);if(i=""+i,o=this._edges.get(i),!o)throw new ae(`Graph.${e}: could not find the "${i}" edge in the graph.`)}return o.attributes[r]=s,this.emit("edgeAttributesUpdated",{key:o.key,type:"set",attributes:o.attributes,name:r}),this}}function jx(n,e,t){n.prototype[e]=function(i,r,s){let o;if(this.type!=="mixed"&&t!=="mixed"&&t!==this.type)throw new De(`Graph.${e}: cannot find this type of edges in your ${this.type} graph.`);if(arguments.length>3){if(this.multi)throw new De(`Graph.${e}: cannot use a {source,target} combo when asking about an edge's attributes in a MultiGraph since we cannot infer the one you want information about.`);const a=""+i,l=""+r;if(r=arguments[2],s=arguments[3],o=kn(this,a,l,t),!o)throw new ae(`Graph.${e}: could not find an edge for the given path ("${a}" - "${l}").`)}else{if(t!=="mixed")throw new De(`Graph.${e}: calling this method with only a key (vs. a source and target) does not make sense since an edge with this key could have the other type.`);if(i=""+i,o=this._edges.get(i),!o)throw new ae(`Graph.${e}: could not find the "${i}" edge in the graph.`)}if(typeof s!="function")throw new ve(`Graph.${e}: updater should be a function.`);return o.attributes[r]=s(o.attributes[r]),this.emit("edgeAttributesUpdated",{key:o.key,type:"set",attributes:o.attributes,name:r}),this}}function Yx(n,e,t){n.prototype[e]=function(i,r){let s;if(this.type!=="mixed"&&t!=="mixed"&&t!==this.type)throw new De(`Graph.${e}: cannot find this type of edges in your ${this.type} graph.`);if(arguments.length>2){if(this.multi)throw new De(`Graph.${e}: cannot use a {source,target} combo when asking about an edge's attributes in a MultiGraph since we cannot infer the one you want information about.`);const o=""+i,a=""+r;if(r=arguments[2],s=kn(this,o,a,t),!s)throw new ae(`Graph.${e}: could not find an edge for the given path ("${o}" - "${a}").`)}else{if(t!=="mixed")throw new De(`Graph.${e}: calling this method with only a key (vs. a source and target) does not make sense since an edge with this key could have the other type.`);if(i=""+i,s=this._edges.get(i),!s)throw new ae(`Graph.${e}: could not find the "${i}" edge in the graph.`)}return delete s.attributes[r],this.emit("edgeAttributesUpdated",{key:s.key,type:"remove",attributes:s.attributes,name:r}),this}}function qx(n,e,t){n.prototype[e]=function(i,r){let s;if(this.type!=="mixed"&&t!=="mixed"&&t!==this.type)throw new De(`Graph.${e}: cannot find this type of edges in your ${this.type} graph.`);if(arguments.length>2){if(this.multi)throw new De(`Graph.${e}: cannot use a {source,target} combo when asking about an edge's attributes in a MultiGraph since we cannot infer the one you want information about.`);const o=""+i,a=""+r;if(r=arguments[2],s=kn(this,o,a,t),!s)throw new ae(`Graph.${e}: could not find an edge for the given path ("${o}" - "${a}").`)}else{if(t!=="mixed")throw new De(`Graph.${e}: calling this method with only a key (vs. a source and target) does not make sense since an edge with this key could have the other type.`);if(i=""+i,s=this._edges.get(i),!s)throw new ae(`Graph.${e}: could not find the "${i}" edge in the graph.`)}if(!tn(r))throw new ve(`Graph.${e}: provided attributes are not a plain object.`);return s.attributes=r,this.emit("edgeAttributesUpdated",{key:s.key,type:"replace",attributes:s.attributes}),this}}function Kx(n,e,t){n.prototype[e]=function(i,r){let s;if(this.type!=="mixed"&&t!=="mixed"&&t!==this.type)throw new De(`Graph.${e}: cannot find this type of edges in your ${this.type} graph.`);if(arguments.length>2){if(this.multi)throw new De(`Graph.${e}: cannot use a {source,target} combo when asking about an edge's attributes in a MultiGraph since we cannot infer the one you want information about.`);const o=""+i,a=""+r;if(r=arguments[2],s=kn(this,o,a,t),!s)throw new ae(`Graph.${e}: could not find an edge for the given path ("${o}" - "${a}").`)}else{if(t!=="mixed")throw new De(`Graph.${e}: calling this method with only a key (vs. a source and target) does not make sense since an edge with this key could have the other type.`);if(i=""+i,s=this._edges.get(i),!s)throw new ae(`Graph.${e}: could not find the "${i}" edge in the graph.`)}if(!tn(r))throw new ve(`Graph.${e}: provided attributes are not a plain object.`);return Yt(s.attributes,r),this.emit("edgeAttributesUpdated",{key:s.key,type:"merge",attributes:s.attributes,data:r}),this}}function Zx(n,e,t){n.prototype[e]=function(i,r){let s;if(this.type!=="mixed"&&t!=="mixed"&&t!==this.type)throw new De(`Graph.${e}: cannot find this type of edges in your ${this.type} graph.`);if(arguments.length>2){if(this.multi)throw new De(`Graph.${e}: cannot use a {source,target} combo when asking about an edge's attributes in a MultiGraph since we cannot infer the one you want information about.`);const o=""+i,a=""+r;if(r=arguments[2],s=kn(this,o,a,t),!s)throw new ae(`Graph.${e}: could not find an edge for the given path ("${o}" - "${a}").`)}else{if(t!=="mixed")throw new De(`Graph.${e}: calling this method with only a key (vs. a source and target) does not make sense since an edge with this key could have the other type.`);if(i=""+i,s=this._edges.get(i),!s)throw new ae(`Graph.${e}: could not find the "${i}" edge in the graph.`)}if(typeof r!="function")throw new ve(`Graph.${e}: provided updater is not a function.`);return s.attributes=r(s.attributes),this.emit("edgeAttributesUpdated",{key:s.key,type:"update",attributes:s.attributes}),this}}const Jx=[{name:n=>`get${n}Attribute`,attacher:Vx},{name:n=>`get${n}Attributes`,attacher:Wx},{name:n=>`has${n}Attribute`,attacher:$x},{name:n=>`set${n}Attribute`,attacher:Xx},{name:n=>`update${n}Attribute`,attacher:jx},{name:n=>`remove${n}Attribute`,attacher:Yx},{name:n=>`replace${n}Attributes`,attacher:qx},{name:n=>`merge${n}Attributes`,attacher:Kx},{name:n=>`update${n}Attributes`,attacher:Zx}];function Qx(n){Jx.forEach(function({name:e,attacher:t}){t(n,e("Edge"),"mixed"),t(n,e("DirectedEdge"),"directed"),t(n,e("UndirectedEdge"),"undirected")})}const eb=[{name:"edges",type:"mixed"},{name:"inEdges",type:"directed",direction:"in"},{name:"outEdges",type:"directed",direction:"out"},{name:"inboundEdges",type:"mixed",direction:"in"},{name:"outboundEdges",type:"mixed",direction:"out"},{name:"directedEdges",type:"directed"},{name:"undirectedEdges",type:"undirected"}];function tb(n,e,t,i){let r=!1;for(const s in e){if(s===i)continue;const o=e[s];if(r=t(o.key,o.attributes,o.source.key,o.target.key,o.source.attributes,o.target.attributes,o.undirected),n&&r)return o.key}}function nb(n,e,t,i){let r,s,o,a=!1;for(const l in e)if(l!==i){r=e[l];do{if(s=r.source,o=r.target,a=t(r.key,r.attributes,s.key,o.key,s.attributes,o.attributes,r.undirected),n&&a)return r.key;r=r.next}while(r!==void 0)}}function lc(n,e){const t=Object.keys(n),i=t.length;let r,s=0;return{[Symbol.iterator](){return this},next(){do if(r)r=r.next;else{if(s>=i)return{done:!0};const o=t[s++];if(o===e){r=void 0;continue}r=n[o]}while(!r);return{done:!1,value:{edge:r.key,attributes:r.attributes,source:r.source.key,target:r.target.key,sourceAttributes:r.source.attributes,targetAttributes:r.target.attributes,undirected:r.undirected}}}}}function ib(n,e,t,i){const r=e[t];if(!r)return;const s=r.source,o=r.target;if(i(r.key,r.attributes,s.key,o.key,s.attributes,o.attributes,r.undirected)&&n)return r.key}function rb(n,e,t,i){let r=e[t];if(!r)return;let s=!1;do{if(s=i(r.key,r.attributes,r.source.key,r.target.key,r.source.attributes,r.target.attributes,r.undirected),n&&s)return r.key;r=r.next}while(r!==void 0)}function cc(n,e){let t=n[e];if(t.next!==void 0)return{[Symbol.iterator](){return this},next(){if(!t)return{done:!0};const r={edge:t.key,attributes:t.attributes,source:t.source.key,target:t.target.key,sourceAttributes:t.source.attributes,targetAttributes:t.target.attributes,undirected:t.undirected};return t=t.next,{done:!1,value:r}}};let i=!1;return{[Symbol.iterator](){return this},next(){return i===!0?{done:!0}:(i=!0,{done:!1,value:{edge:t.key,attributes:t.attributes,source:t.source.key,target:t.target.key,sourceAttributes:t.source.attributes,targetAttributes:t.target.attributes,undirected:t.undirected}})}}}function sb(n,e){if(n.size===0)return[];if(e==="mixed"||e===n.type)return Array.from(n._edges.keys());const t=e==="undirected"?n.undirectedSize:n.directedSize,i=new Array(t),r=e==="undirected",s=n._edges.values();let o=0,a,l;for(;a=s.next(),a.done!==!0;)l=a.value,l.undirected===r&&(i[o++]=l.key);return i}function ig(n,e,t,i){if(e.size===0)return;const r=t!=="mixed"&&t!==e.type,s=t==="undirected";let o,a,l=!1;const c=e._edges.values();for(;o=c.next(),o.done!==!0;){if(a=o.value,r&&a.undirected!==s)continue;const{key:u,attributes:d,source:h,target:f}=a;if(l=i(u,d,h.key,f.key,h.attributes,f.attributes,a.undirected),n&&l)return u}}function ob(n,e){if(n.size===0)return zs();const t=e!=="mixed"&&e!==n.type,i=e==="undirected",r=n._edges.values();return{[Symbol.iterator](){return this},next(){let s,o;for(;;){if(s=r.next(),s.done)return s;if(o=s.value,!(t&&o.undirected!==i))break}return{value:{edge:o.key,attributes:o.attributes,source:o.source.key,target:o.target.key,sourceAttributes:o.source.attributes,targetAttributes:o.target.attributes,undirected:o.undirected},done:!1}}}}function Pd(n,e,t,i,r,s){const o=e?nb:tb;let a;if(t!=="undirected"&&(i!=="out"&&(a=o(n,r.in,s),n&&a)||i!=="in"&&(a=o(n,r.out,s,i?void 0:r.key),n&&a))||t!=="directed"&&(a=o(n,r.undirected,s),n&&a))return a}function ab(n,e,t,i){const r=[];return Pd(!1,n,e,t,i,function(s){r.push(s)}),r}function lb(n,e,t){let i=zs();return n!=="undirected"&&(e!=="out"&&typeof t.in<"u"&&(i=Hi(i,lc(t.in))),e!=="in"&&typeof t.out<"u"&&(i=Hi(i,lc(t.out,e?void 0:t.key)))),n!=="directed"&&typeof t.undirected<"u"&&(i=Hi(i,lc(t.undirected))),i}function Ld(n,e,t,i,r,s,o){const a=t?rb:ib;let l;if(e!=="undirected"&&(typeof r.in<"u"&&i!=="out"&&(l=a(n,r.in,s,o),n&&l)||typeof r.out<"u"&&i!=="in"&&(i||r.key!==s)&&(l=a(n,r.out,s,o),n&&l))||e!=="directed"&&typeof r.undirected<"u"&&(l=a(n,r.undirected,s,o),n&&l))return l}function cb(n,e,t,i,r){const s=[];return Ld(!1,n,e,t,i,r,function(o){s.push(o)}),s}function ub(n,e,t,i){let r=zs();return n!=="undirected"&&(typeof t.in<"u"&&e!=="out"&&i in t.in&&(r=Hi(r,cc(t.in,i))),typeof t.out<"u"&&e!=="in"&&i in t.out&&(e||t.key!==i)&&(r=Hi(r,cc(t.out,i)))),n!=="directed"&&typeof t.undirected<"u"&&i in t.undirected&&(r=Hi(r,cc(t.undirected,i))),r}function db(n,e){const{name:t,type:i,direction:r}=e;n.prototype[t]=function(s,o){if(i!=="mixed"&&this.type!=="mixed"&&i!==this.type)return[];if(!arguments.length)return sb(this,i);if(arguments.length===1){s=""+s;const a=this._nodes.get(s);if(typeof a>"u")throw new ae(`Graph.${t}: could not find the "${s}" node in the graph.`);return ab(this.multi,i==="mixed"?this.type:i,r,a)}if(arguments.length===2){s=""+s,o=""+o;const a=this._nodes.get(s);if(!a)throw new ae(`Graph.${t}:  could not find the "${s}" source node in the graph.`);if(!this._nodes.has(o))throw new ae(`Graph.${t}:  could not find the "${o}" target node in the graph.`);return cb(i,this.multi,r,a,o)}throw new ve(`Graph.${t}: too many arguments (expecting 0, 1 or 2 and got ${arguments.length}).`)}}function hb(n,e){const{name:t,type:i,direction:r}=e,s="forEach"+t[0].toUpperCase()+t.slice(1,-1);n.prototype[s]=function(c,u,d){if(!(i!=="mixed"&&this.type!=="mixed"&&i!==this.type)){if(arguments.length===1)return d=c,ig(!1,this,i,d);if(arguments.length===2){c=""+c,d=u;const h=this._nodes.get(c);if(typeof h>"u")throw new ae(`Graph.${s}: could not find the "${c}" node in the graph.`);return Pd(!1,this.multi,i==="mixed"?this.type:i,r,h,d)}if(arguments.length===3){c=""+c,u=""+u;const h=this._nodes.get(c);if(!h)throw new ae(`Graph.${s}:  could not find the "${c}" source node in the graph.`);if(!this._nodes.has(u))throw new ae(`Graph.${s}:  could not find the "${u}" target node in the graph.`);return Ld(!1,i,this.multi,r,h,u,d)}throw new ve(`Graph.${s}: too many arguments (expecting 1, 2 or 3 and got ${arguments.length}).`)}};const o="map"+t[0].toUpperCase()+t.slice(1);n.prototype[o]=function(){const c=Array.prototype.slice.call(arguments),u=c.pop();let d;if(c.length===0){let h=0;i!=="directed"&&(h+=this.undirectedSize),i!=="undirected"&&(h+=this.directedSize),d=new Array(h);let f=0;c.push((p,_,g,m,v,E,x)=>{d[f++]=u(p,_,g,m,v,E,x)})}else d=[],c.push((h,f,p,_,g,m,v)=>{d.push(u(h,f,p,_,g,m,v))});return this[s].apply(this,c),d};const a="filter"+t[0].toUpperCase()+t.slice(1);n.prototype[a]=function(){const c=Array.prototype.slice.call(arguments),u=c.pop(),d=[];return c.push((h,f,p,_,g,m,v)=>{u(h,f,p,_,g,m,v)&&d.push(h)}),this[s].apply(this,c),d};const l="reduce"+t[0].toUpperCase()+t.slice(1);n.prototype[l]=function(){let c=Array.prototype.slice.call(arguments);if(c.length<2||c.length>4)throw new ve(`Graph.${l}: invalid number of arguments (expecting 2, 3 or 4 and got ${c.length}).`);if(typeof c[c.length-1]=="function"&&typeof c[c.length-2]!="function")throw new ve(`Graph.${l}: missing initial value. You must provide it because the callback takes more than one argument and we cannot infer the initial value from the first iteration, as you could with a simple array.`);let u,d;c.length===2?(u=c[0],d=c[1],c=[]):c.length===3?(u=c[1],d=c[2],c=[c[0]]):c.length===4&&(u=c[2],d=c[3],c=[c[0],c[1]]);let h=d;return c.push((f,p,_,g,m,v,E)=>{h=u(h,f,p,_,g,m,v,E)}),this[s].apply(this,c),h}}function fb(n,e){const{name:t,type:i,direction:r}=e,s="find"+t[0].toUpperCase()+t.slice(1,-1);n.prototype[s]=function(l,c,u){if(i!=="mixed"&&this.type!=="mixed"&&i!==this.type)return!1;if(arguments.length===1)return u=l,ig(!0,this,i,u);if(arguments.length===2){l=""+l,u=c;const d=this._nodes.get(l);if(typeof d>"u")throw new ae(`Graph.${s}: could not find the "${l}" node in the graph.`);return Pd(!0,this.multi,i==="mixed"?this.type:i,r,d,u)}if(arguments.length===3){l=""+l,c=""+c;const d=this._nodes.get(l);if(!d)throw new ae(`Graph.${s}:  could not find the "${l}" source node in the graph.`);if(!this._nodes.has(c))throw new ae(`Graph.${s}:  could not find the "${c}" target node in the graph.`);return Ld(!0,i,this.multi,r,d,c,u)}throw new ve(`Graph.${s}: too many arguments (expecting 1, 2 or 3 and got ${arguments.length}).`)};const o="some"+t[0].toUpperCase()+t.slice(1,-1);n.prototype[o]=function(){const l=Array.prototype.slice.call(arguments),c=l.pop();return l.push((d,h,f,p,_,g,m)=>c(d,h,f,p,_,g,m)),!!this[s].apply(this,l)};const a="every"+t[0].toUpperCase()+t.slice(1,-1);n.prototype[a]=function(){const l=Array.prototype.slice.call(arguments),c=l.pop();return l.push((d,h,f,p,_,g,m)=>!c(d,h,f,p,_,g,m)),!this[s].apply(this,l)}}function pb(n,e){const{name:t,type:i,direction:r}=e,s=t.slice(0,-1)+"Entries";n.prototype[s]=function(o,a){if(i!=="mixed"&&this.type!=="mixed"&&i!==this.type)return zs();if(!arguments.length)return ob(this,i);if(arguments.length===1){o=""+o;const l=this._nodes.get(o);if(!l)throw new ae(`Graph.${s}: could not find the "${o}" node in the graph.`);return lb(i,r,l)}if(arguments.length===2){o=""+o,a=""+a;const l=this._nodes.get(o);if(!l)throw new ae(`Graph.${s}:  could not find the "${o}" source node in the graph.`);if(!this._nodes.has(a))throw new ae(`Graph.${s}:  could not find the "${a}" target node in the graph.`);return ub(i,r,l,a)}throw new ve(`Graph.${s}: too many arguments (expecting 0, 1 or 2 and got ${arguments.length}).`)}}function mb(n){eb.forEach(e=>{db(n,e),hb(n,e),fb(n,e),pb(n,e)})}const gb=[{name:"neighbors",type:"mixed"},{name:"inNeighbors",type:"directed",direction:"in"},{name:"outNeighbors",type:"directed",direction:"out"},{name:"inboundNeighbors",type:"mixed",direction:"in"},{name:"outboundNeighbors",type:"mixed",direction:"out"},{name:"directedNeighbors",type:"directed"},{name:"undirectedNeighbors",type:"undirected"}];function Il(){this.A=null,this.B=null}Il.prototype.wrap=function(n){this.A===null?this.A=n:this.B===null&&(this.B=n)};Il.prototype.has=function(n){return this.A!==null&&n in this.A||this.B!==null&&n in this.B};function Js(n,e,t,i,r){for(const s in i){const o=i[s],a=o.source,l=o.target,c=a===t?l:a;if(e&&e.has(c.key))continue;const u=r(c.key,c.attributes);if(n&&u)return c.key}}function Dd(n,e,t,i,r){if(e!=="mixed"){if(e==="undirected")return Js(n,null,i,i.undirected,r);if(typeof t=="string")return Js(n,null,i,i[t],r)}const s=new Il;let o;if(e!=="undirected"){if(t!=="out"){if(o=Js(n,null,i,i.in,r),n&&o)return o;s.wrap(i.in)}if(t!=="in"){if(o=Js(n,s,i,i.out,r),n&&o)return o;s.wrap(i.out)}}if(e!=="directed"&&(o=Js(n,s,i,i.undirected,r),n&&o))return o}function _b(n,e,t){if(n!=="mixed"){if(n==="undirected")return Object.keys(t.undirected);if(typeof e=="string")return Object.keys(t[e])}const i=[];return Dd(!1,n,e,t,function(r){i.push(r)}),i}function Qs(n,e,t){const i=Object.keys(t),r=i.length;let s=0;return{[Symbol.iterator](){return this},next(){let o=null;do{if(s>=r)return n&&n.wrap(t),{done:!0};const a=t[i[s++]],l=a.source,c=a.target;if(o=l===e?c:l,n&&n.has(o.key)){o=null;continue}}while(o===null);return{done:!1,value:{neighbor:o.key,attributes:o.attributes}}}}}function vb(n,e,t){if(n!=="mixed"){if(n==="undirected")return Qs(null,t,t.undirected);if(typeof e=="string")return Qs(null,t,t[e])}let i=zs();const r=new Il;return n!=="undirected"&&(e!=="out"&&(i=Hi(i,Qs(r,t,t.in))),e!=="in"&&(i=Hi(i,Qs(r,t,t.out)))),n!=="directed"&&(i=Hi(i,Qs(r,t,t.undirected))),i}function xb(n,e){const{name:t,type:i,direction:r}=e;n.prototype[t]=function(s){if(i!=="mixed"&&this.type!=="mixed"&&i!==this.type)return[];s=""+s;const o=this._nodes.get(s);if(typeof o>"u")throw new ae(`Graph.${t}: could not find the "${s}" node in the graph.`);return _b(i==="mixed"?this.type:i,r,o)}}function bb(n,e){const{name:t,type:i,direction:r}=e,s="forEach"+t[0].toUpperCase()+t.slice(1,-1);n.prototype[s]=function(c,u){if(i!=="mixed"&&this.type!=="mixed"&&i!==this.type)return;c=""+c;const d=this._nodes.get(c);if(typeof d>"u")throw new ae(`Graph.${s}: could not find the "${c}" node in the graph.`);Dd(!1,i==="mixed"?this.type:i,r,d,u)};const o="map"+t[0].toUpperCase()+t.slice(1);n.prototype[o]=function(c,u){const d=[];return this[s](c,(h,f)=>{d.push(u(h,f))}),d};const a="filter"+t[0].toUpperCase()+t.slice(1);n.prototype[a]=function(c,u){const d=[];return this[s](c,(h,f)=>{u(h,f)&&d.push(h)}),d};const l="reduce"+t[0].toUpperCase()+t.slice(1);n.prototype[l]=function(c,u,d){if(arguments.length<3)throw new ve(`Graph.${l}: missing initial value. You must provide it because the callback takes more than one argument and we cannot infer the initial value from the first iteration, as you could with a simple array.`);let h=d;return this[s](c,(f,p)=>{h=u(h,f,p)}),h}}function yb(n,e){const{name:t,type:i,direction:r}=e,s=t[0].toUpperCase()+t.slice(1,-1),o="find"+s;n.prototype[o]=function(c,u){if(i!=="mixed"&&this.type!=="mixed"&&i!==this.type)return;c=""+c;const d=this._nodes.get(c);if(typeof d>"u")throw new ae(`Graph.${o}: could not find the "${c}" node in the graph.`);return Dd(!0,i==="mixed"?this.type:i,r,d,u)};const a="some"+s;n.prototype[a]=function(c,u){return!!this[o](c,u)};const l="every"+s;n.prototype[l]=function(c,u){return!this[o](c,(h,f)=>!u(h,f))}}function Sb(n,e){const{name:t,type:i,direction:r}=e,s=t.slice(0,-1)+"Entries";n.prototype[s]=function(o){if(i!=="mixed"&&this.type!=="mixed"&&i!==this.type)return zs();o=""+o;const a=this._nodes.get(o);if(typeof a>"u")throw new ae(`Graph.${s}: could not find the "${o}" node in the graph.`);return vb(i==="mixed"?this.type:i,r,a)}}function Eb(n){gb.forEach(e=>{xb(n,e),bb(n,e),yb(n,e),Sb(n,e)})}function ta(n,e,t,i,r){const s=i._nodes.values(),o=i.type;let a,l,c,u,d,h;for(;a=s.next(),a.done!==!0;){let f=!1;if(l=a.value,o!=="undirected"){u=l.out;for(c in u){d=u[c];do h=d.target,f=!0,r(l.key,h.key,l.attributes,h.attributes,d.key,d.attributes,d.undirected),d=d.next;while(d)}}if(o!=="directed"){u=l.undirected;for(c in u)if(!(e&&l.key>c)){d=u[c];do h=d.target,h.key!==c&&(h=d.source),f=!0,r(l.key,h.key,l.attributes,h.attributes,d.key,d.attributes,d.undirected),d=d.next;while(d)}}t&&!f&&r(l.key,null,l.attributes,null,null,null,null)}}function Mb(n,e){const t={key:n};return Km(e.attributes)||(t.attributes=Yt({},e.attributes)),t}function wb(n,e,t){const i={key:e,source:t.source.key,target:t.target.key};return Km(t.attributes)||(i.attributes=Yt({},t.attributes)),n==="mixed"&&t.undirected&&(i.undirected=!0),i}function Tb(n){if(!tn(n))throw new ve('Graph.import: invalid serialized node. A serialized node should be a plain object with at least a "key" property.');if(!("key"in n))throw new ve("Graph.import: serialized node is missing its key.");if("attributes"in n&&(!tn(n.attributes)||n.attributes===null))throw new ve("Graph.import: invalid attributes. Attributes should be a plain object, null or omitted.")}function Ab(n){if(!tn(n))throw new ve('Graph.import: invalid serialized edge. A serialized edge should be a plain object with at least a "source" & "target" property.');if(!("source"in n))throw new ve("Graph.import: serialized edge is missing its source.");if(!("target"in n))throw new ve("Graph.import: serialized edge is missing its target.");if("attributes"in n&&(!tn(n.attributes)||n.attributes===null))throw new ve("Graph.import: invalid attributes. Attributes should be a plain object, null or omitted.");if("undirected"in n&&typeof n.undirected!="boolean")throw new ve("Graph.import: invalid undirectedness information. Undirected should be boolean or omitted.")}const Cb=Px(),Rb=new Set(["directed","undirected","mixed"]),xf=new Set(["domain","_events","_eventsCount","_maxListeners"]),Pb=[{name:n=>`${n}Edge`,generateKey:!0},{name:n=>`${n}DirectedEdge`,generateKey:!0,type:"directed"},{name:n=>`${n}UndirectedEdge`,generateKey:!0,type:"undirected"},{name:n=>`${n}EdgeWithKey`},{name:n=>`${n}DirectedEdgeWithKey`,type:"directed"},{name:n=>`${n}UndirectedEdgeWithKey`,type:"undirected"}],Lb={allowSelfLoops:!0,multi:!1,type:"mixed"};function Db(n,e,t){if(t&&!tn(t))throw new ve(`Graph.addNode: invalid attributes. Expecting an object but got "${t}"`);if(e=""+e,t=t||{},n._nodes.has(e))throw new De(`Graph.addNode: the "${e}" node already exist in the graph.`);const i=new n.NodeDataClass(e,t);return n._nodes.set(e,i),n.emit("nodeAdded",{key:e,attributes:t}),i}function bf(n,e,t){const i=new n.NodeDataClass(e,t);return n._nodes.set(e,i),n.emit("nodeAdded",{key:e,attributes:t}),i}function rg(n,e,t,i,r,s,o,a){if(!i&&n.type==="undirected")throw new De(`Graph.${e}: you cannot add a directed edge to an undirected graph. Use the #.addEdge or #.addUndirectedEdge instead.`);if(i&&n.type==="directed")throw new De(`Graph.${e}: you cannot add an undirected edge to a directed graph. Use the #.addEdge or #.addDirectedEdge instead.`);if(a&&!tn(a))throw new ve(`Graph.${e}: invalid attributes. Expecting an object but got "${a}"`);if(s=""+s,o=""+o,a=a||{},!n.allowSelfLoops&&s===o)throw new De(`Graph.${e}: source & target are the same ("${s}"), thus creating a loop explicitly forbidden by this graph 'allowSelfLoops' option set to false.`);const l=n._nodes.get(s),c=n._nodes.get(o);if(!l)throw new ae(`Graph.${e}: source node "${s}" not found.`);if(!c)throw new ae(`Graph.${e}: target node "${o}" not found.`);const u={key:null,undirected:i,source:s,target:o,attributes:a};if(t)r=n._edgeKeyGenerator();else if(r=""+r,n._edges.has(r))throw new De(`Graph.${e}: the "${r}" edge already exists in the graph.`);if(!n.multi&&(i?typeof l.undirected[o]<"u":typeof l.out[o]<"u"))throw new De(`Graph.${e}: an edge linking "${s}" to "${o}" already exists. If you really want to add multiple edges linking those nodes, you should create a multi graph by using the 'multi' option.`);const d=new Gs(i,r,l,c,a);n._edges.set(r,d);const h=s===o;return i?(l.undirectedDegree++,c.undirectedDegree++,h&&(l.undirectedLoops++,n._undirectedSelfLoopCount++)):(l.outDegree++,c.inDegree++,h&&(l.directedLoops++,n._directedSelfLoopCount++)),n.multi?d.attachMulti():d.attach(),i?n._undirectedSize++:n._directedSize++,u.key=r,n.emit("edgeAdded",u),r}function Nb(n,e,t,i,r,s,o,a,l){if(!i&&n.type==="undirected")throw new De(`Graph.${e}: you cannot merge/update a directed edge to an undirected graph. Use the #.mergeEdge/#.updateEdge or #.addUndirectedEdge instead.`);if(i&&n.type==="directed")throw new De(`Graph.${e}: you cannot merge/update an undirected edge to a directed graph. Use the #.mergeEdge/#.updateEdge or #.addDirectedEdge instead.`);if(a){if(l){if(typeof a!="function")throw new ve(`Graph.${e}: invalid updater function. Expecting a function but got "${a}"`)}else if(!tn(a))throw new ve(`Graph.${e}: invalid attributes. Expecting an object but got "${a}"`)}s=""+s,o=""+o;let c;if(l&&(c=a,a=void 0),!n.allowSelfLoops&&s===o)throw new De(`Graph.${e}: source & target are the same ("${s}"), thus creating a loop explicitly forbidden by this graph 'allowSelfLoops' option set to false.`);let u=n._nodes.get(s),d=n._nodes.get(o),h,f;if(!t&&(h=n._edges.get(r),h)){if((h.source.key!==s||h.target.key!==o)&&(!i||h.source.key!==o||h.target.key!==s))throw new De(`Graph.${e}: inconsistency detected when attempting to merge the "${r}" edge with "${s}" source & "${o}" target vs. ("${h.source.key}", "${h.target.key}").`);f=h}if(!f&&!n.multi&&u&&(f=i?u.undirected[o]:u.out[o]),f){const v=[f.key,!1,!1,!1];if(l?!c:!a)return v;if(l){const E=f.attributes;f.attributes=c(E),n.emit("edgeAttributesUpdated",{type:"replace",key:f.key,attributes:f.attributes})}else Yt(f.attributes,a),n.emit("edgeAttributesUpdated",{type:"merge",key:f.key,attributes:f.attributes,data:a});return v}a=a||{},l&&c&&(a=c(a));const p={key:null,undirected:i,source:s,target:o,attributes:a};if(t)r=n._edgeKeyGenerator();else if(r=""+r,n._edges.has(r))throw new De(`Graph.${e}: the "${r}" edge already exists in the graph.`);let _=!1,g=!1;u||(u=bf(n,s,{}),_=!0,s===o&&(d=u,g=!0)),d||(d=bf(n,o,{}),g=!0),h=new Gs(i,r,u,d,a),n._edges.set(r,h);const m=s===o;return i?(u.undirectedDegree++,d.undirectedDegree++,m&&(u.undirectedLoops++,n._undirectedSelfLoopCount++)):(u.outDegree++,d.inDegree++,m&&(u.directedLoops++,n._directedSelfLoopCount++)),n.multi?h.attachMulti():h.attach(),i?n._undirectedSize++:n._directedSize++,p.key=r,n.emit("edgeAdded",p),[r,!0,_,g]}function Jr(n,e){n._edges.delete(e.key);const{source:t,target:i,attributes:r}=e,s=e.undirected,o=t===i;s?(t.undirectedDegree--,i.undirectedDegree--,o&&(t.undirectedLoops--,n._undirectedSelfLoopCount--)):(t.outDegree--,i.inDegree--,o&&(t.directedLoops--,n._directedSelfLoopCount--)),n.multi?e.detachMulti():e.detach(),s?n._undirectedSize--:n._directedSize--,n.emit("edgeDropped",{key:e.key,attributes:r,source:t.key,target:i.key,undirected:s})}class vt extends jm.EventEmitter{constructor(e){if(super(),e=Yt({},Lb,e),typeof e.multi!="boolean")throw new ve(`Graph.constructor: invalid 'multi' option. Expecting a boolean but got "${e.multi}".`);if(!Rb.has(e.type))throw new ve(`Graph.constructor: invalid 'type' option. Should be one of "mixed", "directed" or "undirected" but got "${e.type}".`);if(typeof e.allowSelfLoops!="boolean")throw new ve(`Graph.constructor: invalid 'allowSelfLoops' option. Expecting a boolean but got "${e.allowSelfLoops}".`);const t=e.type==="mixed"?Zm:e.type==="directed"?Jm:Qm;Pn(this,"NodeDataClass",t);const i="geid_"+Cb()+"_";let r=0;const s=()=>{let o;do o=i+r++;while(this._edges.has(o));return o};Pn(this,"_attributes",{}),Pn(this,"_nodes",new Map),Pn(this,"_edges",new Map),Pn(this,"_directedSize",0),Pn(this,"_undirectedSize",0),Pn(this,"_directedSelfLoopCount",0),Pn(this,"_undirectedSelfLoopCount",0),Pn(this,"_edgeKeyGenerator",s),Pn(this,"_options",e),xf.forEach(o=>Pn(this,o,this[o])),Hn(this,"order",()=>this._nodes.size),Hn(this,"size",()=>this._edges.size),Hn(this,"directedSize",()=>this._directedSize),Hn(this,"undirectedSize",()=>this._undirectedSize),Hn(this,"selfLoopCount",()=>this._directedSelfLoopCount+this._undirectedSelfLoopCount),Hn(this,"directedSelfLoopCount",()=>this._directedSelfLoopCount),Hn(this,"undirectedSelfLoopCount",()=>this._undirectedSelfLoopCount),Hn(this,"multi",this._options.multi),Hn(this,"type",this._options.type),Hn(this,"allowSelfLoops",this._options.allowSelfLoops),Hn(this,"implementation",()=>"graphology")}_resetInstanceCounters(){this._directedSize=0,this._undirectedSize=0,this._directedSelfLoopCount=0,this._undirectedSelfLoopCount=0}hasNode(e){return this._nodes.has(""+e)}hasDirectedEdge(e,t){if(this.type==="undirected")return!1;if(arguments.length===1){const i=""+e,r=this._edges.get(i);return!!r&&!r.undirected}else if(arguments.length===2){e=""+e,t=""+t;const i=this._nodes.get(e);return i?i.out.hasOwnProperty(t):!1}throw new ve(`Graph.hasDirectedEdge: invalid arity (${arguments.length}, instead of 1 or 2). You can either ask for an edge id or for the existence of an edge between a source & a target.`)}hasUndirectedEdge(e,t){if(this.type==="directed")return!1;if(arguments.length===1){const i=""+e,r=this._edges.get(i);return!!r&&r.undirected}else if(arguments.length===2){e=""+e,t=""+t;const i=this._nodes.get(e);return i?i.undirected.hasOwnProperty(t):!1}throw new ve(`Graph.hasDirectedEdge: invalid arity (${arguments.length}, instead of 1 or 2). You can either ask for an edge id or for the existence of an edge between a source & a target.`)}hasEdge(e,t){if(arguments.length===1){const i=""+e;return this._edges.has(i)}else if(arguments.length===2){e=""+e,t=""+t;const i=this._nodes.get(e);return i?typeof i.out<"u"&&i.out.hasOwnProperty(t)||typeof i.undirected<"u"&&i.undirected.hasOwnProperty(t):!1}throw new ve(`Graph.hasEdge: invalid arity (${arguments.length}, instead of 1 or 2). You can either ask for an edge id or for the existence of an edge between a source & a target.`)}directedEdge(e,t){if(this.type==="undirected")return;if(e=""+e,t=""+t,this.multi)throw new De("Graph.directedEdge: this method is irrelevant with multigraphs since there might be multiple edges between source & target. See #.directedEdges instead.");const i=this._nodes.get(e);if(!i)throw new ae(`Graph.directedEdge: could not find the "${e}" source node in the graph.`);if(!this._nodes.has(t))throw new ae(`Graph.directedEdge: could not find the "${t}" target node in the graph.`);const r=i.out&&i.out[t]||void 0;if(r)return r.key}undirectedEdge(e,t){if(this.type==="directed")return;if(e=""+e,t=""+t,this.multi)throw new De("Graph.undirectedEdge: this method is irrelevant with multigraphs since there might be multiple edges between source & target. See #.undirectedEdges instead.");const i=this._nodes.get(e);if(!i)throw new ae(`Graph.undirectedEdge: could not find the "${e}" source node in the graph.`);if(!this._nodes.has(t))throw new ae(`Graph.undirectedEdge: could not find the "${t}" target node in the graph.`);const r=i.undirected&&i.undirected[t]||void 0;if(r)return r.key}edge(e,t){if(this.multi)throw new De("Graph.edge: this method is irrelevant with multigraphs since there might be multiple edges between source & target. See #.edges instead.");e=""+e,t=""+t;const i=this._nodes.get(e);if(!i)throw new ae(`Graph.edge: could not find the "${e}" source node in the graph.`);if(!this._nodes.has(t))throw new ae(`Graph.edge: could not find the "${t}" target node in the graph.`);const r=i.out&&i.out[t]||i.undirected&&i.undirected[t]||void 0;if(r)return r.key}areDirectedNeighbors(e,t){e=""+e,t=""+t;const i=this._nodes.get(e);if(!i)throw new ae(`Graph.areDirectedNeighbors: could not find the "${e}" node in the graph.`);return this.type==="undirected"?!1:t in i.in||t in i.out}areOutNeighbors(e,t){e=""+e,t=""+t;const i=this._nodes.get(e);if(!i)throw new ae(`Graph.areOutNeighbors: could not find the "${e}" node in the graph.`);return this.type==="undirected"?!1:t in i.out}areInNeighbors(e,t){e=""+e,t=""+t;const i=this._nodes.get(e);if(!i)throw new ae(`Graph.areInNeighbors: could not find the "${e}" node in the graph.`);return this.type==="undirected"?!1:t in i.in}areUndirectedNeighbors(e,t){e=""+e,t=""+t;const i=this._nodes.get(e);if(!i)throw new ae(`Graph.areUndirectedNeighbors: could not find the "${e}" node in the graph.`);return this.type==="directed"?!1:t in i.undirected}areNeighbors(e,t){e=""+e,t=""+t;const i=this._nodes.get(e);if(!i)throw new ae(`Graph.areNeighbors: could not find the "${e}" node in the graph.`);return this.type!=="undirected"&&(t in i.in||t in i.out)||this.type!=="directed"&&t in i.undirected}areInboundNeighbors(e,t){e=""+e,t=""+t;const i=this._nodes.get(e);if(!i)throw new ae(`Graph.areInboundNeighbors: could not find the "${e}" node in the graph.`);return this.type!=="undirected"&&t in i.in||this.type!=="directed"&&t in i.undirected}areOutboundNeighbors(e,t){e=""+e,t=""+t;const i=this._nodes.get(e);if(!i)throw new ae(`Graph.areOutboundNeighbors: could not find the "${e}" node in the graph.`);return this.type!=="undirected"&&t in i.out||this.type!=="directed"&&t in i.undirected}inDegree(e){e=""+e;const t=this._nodes.get(e);if(!t)throw new ae(`Graph.inDegree: could not find the "${e}" node in the graph.`);return this.type==="undirected"?0:t.inDegree}outDegree(e){e=""+e;const t=this._nodes.get(e);if(!t)throw new ae(`Graph.outDegree: could not find the "${e}" node in the graph.`);return this.type==="undirected"?0:t.outDegree}directedDegree(e){e=""+e;const t=this._nodes.get(e);if(!t)throw new ae(`Graph.directedDegree: could not find the "${e}" node in the graph.`);return this.type==="undirected"?0:t.inDegree+t.outDegree}undirectedDegree(e){e=""+e;const t=this._nodes.get(e);if(!t)throw new ae(`Graph.undirectedDegree: could not find the "${e}" node in the graph.`);return this.type==="directed"?0:t.undirectedDegree}inboundDegree(e){e=""+e;const t=this._nodes.get(e);if(!t)throw new ae(`Graph.inboundDegree: could not find the "${e}" node in the graph.`);let i=0;return this.type!=="directed"&&(i+=t.undirectedDegree),this.type!=="undirected"&&(i+=t.inDegree),i}outboundDegree(e){e=""+e;const t=this._nodes.get(e);if(!t)throw new ae(`Graph.outboundDegree: could not find the "${e}" node in the graph.`);let i=0;return this.type!=="directed"&&(i+=t.undirectedDegree),this.type!=="undirected"&&(i+=t.outDegree),i}degree(e){e=""+e;const t=this._nodes.get(e);if(!t)throw new ae(`Graph.degree: could not find the "${e}" node in the graph.`);let i=0;return this.type!=="directed"&&(i+=t.undirectedDegree),this.type!=="undirected"&&(i+=t.inDegree+t.outDegree),i}inDegreeWithoutSelfLoops(e){e=""+e;const t=this._nodes.get(e);if(!t)throw new ae(`Graph.inDegreeWithoutSelfLoops: could not find the "${e}" node in the graph.`);return this.type==="undirected"?0:t.inDegree-t.directedLoops}outDegreeWithoutSelfLoops(e){e=""+e;const t=this._nodes.get(e);if(!t)throw new ae(`Graph.outDegreeWithoutSelfLoops: could not find the "${e}" node in the graph.`);return this.type==="undirected"?0:t.outDegree-t.directedLoops}directedDegreeWithoutSelfLoops(e){e=""+e;const t=this._nodes.get(e);if(!t)throw new ae(`Graph.directedDegreeWithoutSelfLoops: could not find the "${e}" node in the graph.`);return this.type==="undirected"?0:t.inDegree+t.outDegree-t.directedLoops*2}undirectedDegreeWithoutSelfLoops(e){e=""+e;const t=this._nodes.get(e);if(!t)throw new ae(`Graph.undirectedDegreeWithoutSelfLoops: could not find the "${e}" node in the graph.`);return this.type==="directed"?0:t.undirectedDegree-t.undirectedLoops*2}inboundDegreeWithoutSelfLoops(e){e=""+e;const t=this._nodes.get(e);if(!t)throw new ae(`Graph.inboundDegreeWithoutSelfLoops: could not find the "${e}" node in the graph.`);let i=0,r=0;return this.type!=="directed"&&(i+=t.undirectedDegree,r+=t.undirectedLoops*2),this.type!=="undirected"&&(i+=t.inDegree,r+=t.directedLoops),i-r}outboundDegreeWithoutSelfLoops(e){e=""+e;const t=this._nodes.get(e);if(!t)throw new ae(`Graph.outboundDegreeWithoutSelfLoops: could not find the "${e}" node in the graph.`);let i=0,r=0;return this.type!=="directed"&&(i+=t.undirectedDegree,r+=t.undirectedLoops*2),this.type!=="undirected"&&(i+=t.outDegree,r+=t.directedLoops),i-r}degreeWithoutSelfLoops(e){e=""+e;const t=this._nodes.get(e);if(!t)throw new ae(`Graph.degreeWithoutSelfLoops: could not find the "${e}" node in the graph.`);let i=0,r=0;return this.type!=="directed"&&(i+=t.undirectedDegree,r+=t.undirectedLoops*2),this.type!=="undirected"&&(i+=t.inDegree+t.outDegree,r+=t.directedLoops*2),i-r}source(e){e=""+e;const t=this._edges.get(e);if(!t)throw new ae(`Graph.source: could not find the "${e}" edge in the graph.`);return t.source.key}target(e){e=""+e;const t=this._edges.get(e);if(!t)throw new ae(`Graph.target: could not find the "${e}" edge in the graph.`);return t.target.key}extremities(e){e=""+e;const t=this._edges.get(e);if(!t)throw new ae(`Graph.extremities: could not find the "${e}" edge in the graph.`);return[t.source.key,t.target.key]}opposite(e,t){e=""+e,t=""+t;const i=this._edges.get(t);if(!i)throw new ae(`Graph.opposite: could not find the "${t}" edge in the graph.`);const r=i.source.key,s=i.target.key;if(e===r)return s;if(e===s)return r;throw new ae(`Graph.opposite: the "${e}" node is not attached to the "${t}" edge (${r}, ${s}).`)}hasExtremity(e,t){e=""+e,t=""+t;const i=this._edges.get(e);if(!i)throw new ae(`Graph.hasExtremity: could not find the "${e}" edge in the graph.`);return i.source.key===t||i.target.key===t}isUndirected(e){e=""+e;const t=this._edges.get(e);if(!t)throw new ae(`Graph.isUndirected: could not find the "${e}" edge in the graph.`);return t.undirected}isDirected(e){e=""+e;const t=this._edges.get(e);if(!t)throw new ae(`Graph.isDirected: could not find the "${e}" edge in the graph.`);return!t.undirected}isSelfLoop(e){e=""+e;const t=this._edges.get(e);if(!t)throw new ae(`Graph.isSelfLoop: could not find the "${e}" edge in the graph.`);return t.source===t.target}addNode(e,t){return Db(this,e,t).key}mergeNode(e,t){if(t&&!tn(t))throw new ve(`Graph.mergeNode: invalid attributes. Expecting an object but got "${t}"`);e=""+e,t=t||{};let i=this._nodes.get(e);return i?(t&&(Yt(i.attributes,t),this.emit("nodeAttributesUpdated",{type:"merge",key:e,attributes:i.attributes,data:t})),[e,!1]):(i=new this.NodeDataClass(e,t),this._nodes.set(e,i),this.emit("nodeAdded",{key:e,attributes:t}),[e,!0])}updateNode(e,t){if(t&&typeof t!="function")throw new ve(`Graph.updateNode: invalid updater function. Expecting a function but got "${t}"`);e=""+e;let i=this._nodes.get(e);if(i){if(t){const s=i.attributes;i.attributes=t(s),this.emit("nodeAttributesUpdated",{type:"replace",key:e,attributes:i.attributes})}return[e,!1]}const r=t?t({}):{};return i=new this.NodeDataClass(e,r),this._nodes.set(e,i),this.emit("nodeAdded",{key:e,attributes:r}),[e,!0]}dropNode(e){e=""+e;const t=this._nodes.get(e);if(!t)throw new ae(`Graph.dropNode: could not find the "${e}" node in the graph.`);let i;if(this.type!=="undirected"){for(const r in t.out){i=t.out[r];do Jr(this,i),i=i.next;while(i)}for(const r in t.in){i=t.in[r];do Jr(this,i),i=i.next;while(i)}}if(this.type!=="directed")for(const r in t.undirected){i=t.undirected[r];do Jr(this,i),i=i.next;while(i)}this._nodes.delete(e),this.emit("nodeDropped",{key:e,attributes:t.attributes})}dropEdge(e){let t;if(arguments.length>1){const i=""+arguments[0],r=""+arguments[1];if(t=kn(this,i,r,this.type),!t)throw new ae(`Graph.dropEdge: could not find the "${i}" -> "${r}" edge in the graph.`)}else if(e=""+e,t=this._edges.get(e),!t)throw new ae(`Graph.dropEdge: could not find the "${e}" edge in the graph.`);return Jr(this,t),this}dropDirectedEdge(e,t){if(arguments.length<2)throw new De("Graph.dropDirectedEdge: it does not make sense to try and drop a directed edge by key. What if the edge with this key is undirected? Use #.dropEdge for this purpose instead.");if(this.multi)throw new De("Graph.dropDirectedEdge: cannot use a {source,target} combo when dropping an edge in a MultiGraph since we cannot infer the one you want to delete as there could be multiple ones.");e=""+e,t=""+t;const i=kn(this,e,t,"directed");if(!i)throw new ae(`Graph.dropDirectedEdge: could not find a "${e}" -> "${t}" edge in the graph.`);return Jr(this,i),this}dropUndirectedEdge(e,t){if(arguments.length<2)throw new De("Graph.dropUndirectedEdge: it does not make sense to drop a directed edge by key. What if the edge with this key is undirected? Use #.dropEdge for this purpose instead.");if(this.multi)throw new De("Graph.dropUndirectedEdge: cannot use a {source,target} combo when dropping an edge in a MultiGraph since we cannot infer the one you want to delete as there could be multiple ones.");const i=kn(this,e,t,"undirected");if(!i)throw new ae(`Graph.dropUndirectedEdge: could not find a "${e}" -> "${t}" edge in the graph.`);return Jr(this,i),this}clear(){this._edges.clear(),this._nodes.clear(),this._resetInstanceCounters(),this.emit("cleared")}clearEdges(){const e=this._nodes.values();let t;for(;t=e.next(),t.done!==!0;)t.value.clear();this._edges.clear(),this._resetInstanceCounters(),this.emit("edgesCleared")}getAttribute(e){return this._attributes[e]}getAttributes(){return this._attributes}hasAttribute(e){return this._attributes.hasOwnProperty(e)}setAttribute(e,t){return this._attributes[e]=t,this.emit("attributesUpdated",{type:"set",attributes:this._attributes,name:e}),this}updateAttribute(e,t){if(typeof t!="function")throw new ve("Graph.updateAttribute: updater should be a function.");const i=this._attributes[e];return this._attributes[e]=t(i),this.emit("attributesUpdated",{type:"set",attributes:this._attributes,name:e}),this}removeAttribute(e){return delete this._attributes[e],this.emit("attributesUpdated",{type:"remove",attributes:this._attributes,name:e}),this}replaceAttributes(e){if(!tn(e))throw new ve("Graph.replaceAttributes: provided attributes are not a plain object.");return this._attributes=e,this.emit("attributesUpdated",{type:"replace",attributes:this._attributes}),this}mergeAttributes(e){if(!tn(e))throw new ve("Graph.mergeAttributes: provided attributes are not a plain object.");return Yt(this._attributes,e),this.emit("attributesUpdated",{type:"merge",attributes:this._attributes,data:e}),this}updateAttributes(e){if(typeof e!="function")throw new ve("Graph.updateAttributes: provided updater is not a function.");return this._attributes=e(this._attributes),this.emit("attributesUpdated",{type:"update",attributes:this._attributes}),this}updateEachNodeAttributes(e,t){if(typeof e!="function")throw new ve("Graph.updateEachNodeAttributes: expecting an updater function.");if(t&&!vf(t))throw new ve("Graph.updateEachNodeAttributes: invalid hints. Expecting an object having the following shape: {attributes?: [string]}");const i=this._nodes.values();let r,s;for(;r=i.next(),r.done!==!0;)s=r.value,s.attributes=e(s.key,s.attributes);this.emit("eachNodeAttributesUpdated",{hints:t||null})}updateEachEdgeAttributes(e,t){if(typeof e!="function")throw new ve("Graph.updateEachEdgeAttributes: expecting an updater function.");if(t&&!vf(t))throw new ve("Graph.updateEachEdgeAttributes: invalid hints. Expecting an object having the following shape: {attributes?: [string]}");const i=this._edges.values();let r,s,o,a;for(;r=i.next(),r.done!==!0;)s=r.value,o=s.source,a=s.target,s.attributes=e(s.key,s.attributes,o.key,a.key,o.attributes,a.attributes,s.undirected);this.emit("eachEdgeAttributesUpdated",{hints:t||null})}forEachAdjacencyEntry(e){if(typeof e!="function")throw new ve("Graph.forEachAdjacencyEntry: expecting a callback.");ta(!1,!1,!1,this,e)}forEachAdjacencyEntryWithOrphans(e){if(typeof e!="function")throw new ve("Graph.forEachAdjacencyEntryWithOrphans: expecting a callback.");ta(!1,!1,!0,this,e)}forEachAssymetricAdjacencyEntry(e){if(typeof e!="function")throw new ve("Graph.forEachAssymetricAdjacencyEntry: expecting a callback.");ta(!1,!0,!1,this,e)}forEachAssymetricAdjacencyEntryWithOrphans(e){if(typeof e!="function")throw new ve("Graph.forEachAssymetricAdjacencyEntryWithOrphans: expecting a callback.");ta(!1,!0,!0,this,e)}nodes(){return Array.from(this._nodes.keys())}forEachNode(e){if(typeof e!="function")throw new ve("Graph.forEachNode: expecting a callback.");const t=this._nodes.values();let i,r;for(;i=t.next(),i.done!==!0;)r=i.value,e(r.key,r.attributes)}findNode(e){if(typeof e!="function")throw new ve("Graph.findNode: expecting a callback.");const t=this._nodes.values();let i,r;for(;i=t.next(),i.done!==!0;)if(r=i.value,e(r.key,r.attributes))return r.key}mapNodes(e){if(typeof e!="function")throw new ve("Graph.mapNode: expecting a callback.");const t=this._nodes.values();let i,r;const s=new Array(this.order);let o=0;for(;i=t.next(),i.done!==!0;)r=i.value,s[o++]=e(r.key,r.attributes);return s}someNode(e){if(typeof e!="function")throw new ve("Graph.someNode: expecting a callback.");const t=this._nodes.values();let i,r;for(;i=t.next(),i.done!==!0;)if(r=i.value,e(r.key,r.attributes))return!0;return!1}everyNode(e){if(typeof e!="function")throw new ve("Graph.everyNode: expecting a callback.");const t=this._nodes.values();let i,r;for(;i=t.next(),i.done!==!0;)if(r=i.value,!e(r.key,r.attributes))return!1;return!0}filterNodes(e){if(typeof e!="function")throw new ve("Graph.filterNodes: expecting a callback.");const t=this._nodes.values();let i,r;const s=[];for(;i=t.next(),i.done!==!0;)r=i.value,e(r.key,r.attributes)&&s.push(r.key);return s}reduceNodes(e,t){if(typeof e!="function")throw new ve("Graph.reduceNodes: expecting a callback.");if(arguments.length<2)throw new ve("Graph.reduceNodes: missing initial value. You must provide it because the callback takes more than one argument and we cannot infer the initial value from the first iteration, as you could with a simple array.");let i=t;const r=this._nodes.values();let s,o;for(;s=r.next(),s.done!==!0;)o=s.value,i=e(i,o.key,o.attributes);return i}nodeEntries(){const e=this._nodes.values();return{[Symbol.iterator](){return this},next(){const t=e.next();if(t.done)return t;const i=t.value;return{value:{node:i.key,attributes:i.attributes},done:!1}}}}export(){const e=new Array(this._nodes.size);let t=0;this._nodes.forEach((r,s)=>{e[t++]=Mb(s,r)});const i=new Array(this._edges.size);return t=0,this._edges.forEach((r,s)=>{i[t++]=wb(this.type,s,r)}),{options:{type:this.type,multi:this.multi,allowSelfLoops:this.allowSelfLoops},attributes:this.getAttributes(),nodes:e,edges:i}}import(e,t=!1){if(e instanceof vt)return e.forEachNode((l,c)=>{t?this.mergeNode(l,c):this.addNode(l,c)}),e.forEachEdge((l,c,u,d,h,f,p)=>{t?p?this.mergeUndirectedEdgeWithKey(l,u,d,c):this.mergeDirectedEdgeWithKey(l,u,d,c):p?this.addUndirectedEdgeWithKey(l,u,d,c):this.addDirectedEdgeWithKey(l,u,d,c)}),this;if(!tn(e))throw new ve("Graph.import: invalid argument. Expecting a serialized graph or, alternatively, a Graph instance.");if(e.attributes){if(!tn(e.attributes))throw new ve("Graph.import: invalid attributes. Expecting a plain object.");t?this.mergeAttributes(e.attributes):this.replaceAttributes(e.attributes)}let i,r,s,o,a;if(e.nodes){if(s=e.nodes,!Array.isArray(s))throw new ve("Graph.import: invalid nodes. Expecting an array.");for(i=0,r=s.length;i<r;i++){o=s[i],Tb(o);const{key:l,attributes:c}=o;t?this.mergeNode(l,c):this.addNode(l,c)}}if(e.edges){let l=!1;if(this.type==="undirected"&&(l=!0),s=e.edges,!Array.isArray(s))throw new ve("Graph.import: invalid edges. Expecting an array.");for(i=0,r=s.length;i<r;i++){a=s[i],Ab(a);const{source:c,target:u,attributes:d,undirected:h=l}=a;let f;"key"in a?(f=t?h?this.mergeUndirectedEdgeWithKey:this.mergeDirectedEdgeWithKey:h?this.addUndirectedEdgeWithKey:this.addDirectedEdgeWithKey,f.call(this,a.key,c,u,d)):(f=t?h?this.mergeUndirectedEdge:this.mergeDirectedEdge:h?this.addUndirectedEdge:this.addDirectedEdge,f.call(this,c,u,d))}}return this}nullCopy(e){const t=new vt(Yt({},this._options,e));return t.replaceAttributes(Yt({},this.getAttributes())),t}emptyCopy(e){const t=this.nullCopy(e);return this._nodes.forEach((i,r)=>{const s=Yt({},i.attributes);i=new t.NodeDataClass(r,s),t._nodes.set(r,i)}),t}copy(e){if(e=e||{},typeof e.type=="string"&&e.type!==this.type&&e.type!=="mixed")throw new De(`Graph.copy: cannot create an incompatible copy from "${this.type}" type to "${e.type}" because this would mean losing information about the current graph.`);if(typeof e.multi=="boolean"&&e.multi!==this.multi&&e.multi!==!0)throw new De("Graph.copy: cannot create an incompatible copy by downgrading a multi graph to a simple one because this would mean losing information about the current graph.");if(typeof e.allowSelfLoops=="boolean"&&e.allowSelfLoops!==this.allowSelfLoops&&e.allowSelfLoops!==!0)throw new De("Graph.copy: cannot create an incompatible copy from a graph allowing self loops to one that does not because this would mean losing information about the current graph.");const t=this.emptyCopy(e),i=this._edges.values();let r,s;for(;r=i.next(),r.done!==!0;)s=r.value,rg(t,"copy",!1,s.undirected,s.key,s.source.key,s.target.key,Yt({},s.attributes));return t}toJSON(){return this.export()}toString(){return"[object Graph]"}inspect(){const e={};this._nodes.forEach((s,o)=>{e[o]=s.attributes});const t={},i={};this._edges.forEach((s,o)=>{const a=s.undirected?"--":"->";let l="",c=s.source.key,u=s.target.key,d;s.undirected&&c>u&&(d=c,c=u,u=d);const h=`(${c})${a}(${u})`;o.startsWith("geid_")?this.multi&&(typeof i[h]>"u"?i[h]=0:i[h]++,l+=`${i[h]}. `):l+=`[${o}]: `,l+=h,t[l]=s.attributes});const r={};for(const s in this)this.hasOwnProperty(s)&&!xf.has(s)&&typeof this[s]!="function"&&typeof s!="symbol"&&(r[s]=this[s]);return r.attributes=this._attributes,r.nodes=e,r.edges=t,Pn(r,"constructor",this.constructor),r}}typeof Symbol<"u"&&(vt.prototype[Symbol.for("nodejs.util.inspect.custom")]=vt.prototype.inspect);Pb.forEach(n=>{["add","merge","update"].forEach(e=>{const t=n.name(e),i=e==="add"?rg:Nb;n.generateKey?vt.prototype[t]=function(r,s,o){return i(this,t,!0,(n.type||this.type)==="undirected",null,r,s,o,e==="update")}:vt.prototype[t]=function(r,s,o,a){return i(this,t,!1,(n.type||this.type)==="undirected",r,s,o,a,e==="update")}})});Hx(vt);Qx(vt);mb(vt);Eb(vt);class sg extends vt{constructor(e){const t=Yt({type:"directed"},e);if("multi"in t&&t.multi!==!1)throw new ve("DirectedGraph.from: inconsistent indication that the graph should be multi in given options!");if(t.type!=="directed")throw new ve('DirectedGraph.from: inconsistent "'+t.type+'" type in given options!');super(t)}}class og extends vt{constructor(e){const t=Yt({type:"undirected"},e);if("multi"in t&&t.multi!==!1)throw new ve("UndirectedGraph.from: inconsistent indication that the graph should be multi in given options!");if(t.type!=="undirected")throw new ve('UndirectedGraph.from: inconsistent "'+t.type+'" type in given options!');super(t)}}class Nd extends vt{constructor(e){const t=Yt({multi:!0},e);if("multi"in t&&t.multi!==!0)throw new ve("MultiGraph.from: inconsistent indication that the graph should be simple in given options!");super(t)}}class ag extends vt{constructor(e){const t=Yt({type:"directed",multi:!0},e);if("multi"in t&&t.multi!==!0)throw new ve("MultiDirectedGraph.from: inconsistent indication that the graph should be simple in given options!");if(t.type!=="directed")throw new ve('MultiDirectedGraph.from: inconsistent "'+t.type+'" type in given options!');super(t)}}class lg extends vt{constructor(e){const t=Yt({type:"undirected",multi:!0},e);if("multi"in t&&t.multi!==!0)throw new ve("MultiUndirectedGraph.from: inconsistent indication that the graph should be simple in given options!");if(t.type!=="undirected")throw new ve('MultiUndirectedGraph.from: inconsistent "'+t.type+'" type in given options!');super(t)}}function Hs(n){n.from=function(e,t){const i=Yt({},e.options,t),r=new n(i);return r.import(e),r}}Hs(vt);Hs(sg);Hs(og);Hs(Nd);Hs(ag);Hs(lg);vt.Graph=vt;vt.DirectedGraph=sg;vt.UndirectedGraph=og;vt.MultiGraph=Nd;vt.MultiDirectedGraph=ag;vt.MultiUndirectedGraph=lg;vt.InvalidArgumentsGraphError=ve;vt.NotFoundGraphError=ae;vt.UsageGraphError=De;function Ib(n,e){if(typeof n!="object"||!n)return n;var t=n[Symbol.toPrimitive];if(t!==void 0){var i=t.call(n,e);if(typeof i!="object")return i;throw new TypeError("@@toPrimitive must return a primitive value.")}return(e==="string"?String:Number)(n)}function cg(n){var e=Ib(n,"string");return typeof e=="symbol"?e:e+""}function ug(n,e,t){return(e=cg(e))in n?Object.defineProperty(n,e,{value:t,enumerable:!0,configurable:!0,writable:!0}):n[e]=t,n}function yf(n,e){var t=Object.keys(n);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(n);e&&(i=i.filter(function(r){return Object.getOwnPropertyDescriptor(n,r).enumerable})),t.push.apply(t,i)}return t}function nl(n){for(var e=1;e<arguments.length;e++){var t=arguments[e]!=null?arguments[e]:{};e%2?yf(Object(t),!0).forEach(function(i){ug(n,i,t[i])}):Object.getOwnPropertyDescriptors?Object.defineProperties(n,Object.getOwnPropertyDescriptors(t)):yf(Object(t)).forEach(function(i){Object.defineProperty(n,i,Object.getOwnPropertyDescriptor(t,i))})}return n}function Ub(n,e){if(!(n instanceof e))throw new TypeError("Cannot call a class as a function")}function Fb(n,e){for(var t=0;t<e.length;t++){var i=e[t];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(n,cg(i.key),i)}}function Ob(n,e,t){return e&&Fb(n.prototype,e),Object.defineProperty(n,"prototype",{writable:!1}),n}function il(n){return il=Object.setPrototypeOf?Object.getPrototypeOf.bind():function(e){return e.__proto__||Object.getPrototypeOf(e)},il(n)}function dg(){try{var n=!Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],function(){}))}catch{}return(dg=function(){return!!n})()}function hg(n){if(n===void 0)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return n}function kb(n,e){if(e&&(typeof e=="object"||typeof e=="function"))return e;if(e!==void 0)throw new TypeError("Derived constructors may only return object or undefined");return hg(n)}function Bb(n,e,t){return e=il(e),kb(n,dg()?Reflect.construct(e,t||[],il(n).constructor):e.apply(n,t))}function pu(n,e){return pu=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(t,i){return t.__proto__=i,t},pu(n,e)}function zb(n,e){if(typeof e!="function"&&e!==null)throw new TypeError("Super expression must either be null or a function");n.prototype=Object.create(e&&e.prototype,{constructor:{value:n,writable:!0,configurable:!0}}),Object.defineProperty(n,"prototype",{writable:!1}),e&&pu(n,e)}function mu(n,e){(e==null||e>n.length)&&(e=n.length);for(var t=0,i=Array(e);t<e;t++)i[t]=n[t];return i}function Gb(n){if(Array.isArray(n))return mu(n)}function Hb(n){if(typeof Symbol<"u"&&n[Symbol.iterator]!=null||n["@@iterator"]!=null)return Array.from(n)}function Vb(n,e){if(n){if(typeof n=="string")return mu(n,e);var t={}.toString.call(n).slice(8,-1);return t==="Object"&&n.constructor&&(t=n.constructor.name),t==="Map"||t==="Set"?Array.from(n):t==="Arguments"||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t)?mu(n,e):void 0}}function Wb(){throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)}function uc(n){return Gb(n)||Hb(n)||Vb(n)||Wb()}function fg(n,e,t,i){var r=Math.pow(1-n,2)*e.x+2*(1-n)*n*t.x+Math.pow(n,2)*i.x,s=Math.pow(1-n,2)*e.y+2*(1-n)*n*t.y+Math.pow(n,2)*i.y;return{x:r,y:s}}function $b(n,e,t){for(var i=20,r=0,s=n,o=0;o<i;o++){var a=fg((o+1)/i,n,e,t);r+=Math.sqrt(Math.pow(s.x-a.x,2)+Math.pow(s.y-a.y,2)),s=a}return r}function Xb(n){var e=n.curvatureAttribute,t=n.defaultCurvature,i=n.keepLabelUpright,r=i===void 0?!0:i;return function(s,o,a,l,c){var u=c.edgeLabelSize,d=o[e]||t,h=c.edgeLabelFont,f=c.edgeLabelWeight,p=c.edgeLabelColor.attribute?o[c.edgeLabelColor.attribute]||c.edgeLabelColor.color||"#000":c.edgeLabelColor.color,_=o.label;if(_){s.fillStyle=p,s.font="".concat(f," ").concat(u,"px ").concat(h);var g=!r||a.x<l.x,m=g?a.x:l.x,v=g?a.y:l.y,E=g?l.x:a.x,x=g?l.y:a.y,w=(m+E)/2,S=(v+x)/2,C=E-m,b=x-v,T=Math.sqrt(Math.pow(C,2)+Math.pow(b,2)),L=g?1:-1,P=w+b*d*L,F=S-C*d*L,W=o.size*.7+5,$={x:F-v,y:-(P-m)},U=Math.sqrt(Math.pow($.x,2)+Math.pow($.y,2)),B={x:x-F,y:-(E-P)},H=Math.sqrt(Math.pow(B.x,2)+Math.pow(B.y,2));m+=W*$.x/U,v+=W*$.y/U,E+=W*B.x/H,x+=W*B.y/H,P+=W*b/T,F-=W*C/T;var Z={x:P,y:F},J={x:m,y:v},ne={x:E,y:x},de=$b(J,Z,ne);if(!(de<a.size+l.size)){var ye=s.measureText(_).width,Fe=de-a.size-l.size;if(ye>Fe){var et="…";for(_=_+et,ye=s.measureText(_).width;ye>Fe&&_.length>1;)_=_.slice(0,-2)+et,ye=s.measureText(_).width;if(_.length<4)return}for(var Ie={},q=0,pe=_.length;q<pe;q++){var ie=_[q];Ie[ie]||(Ie[ie]=s.measureText(ie).width*(1+d*.35))}for(var Ce=.5-ye/de/2,Oe=0,Ne=_.length;Oe<Ne;Oe++){var xt=_[Oe],Xe=fg(Ce,J,Z,ne),ot=2*(1-Ce)*(P-m)+2*Ce*(E-P),mt=2*(1-Ce)*(F-v)+2*Ce*(x-F),je=Math.atan2(mt,ot);s.save(),s.translate(Xe.x,Xe.y),s.rotate(je),s.fillText(xt,0,0),s.restore(),Ce+=Ie[xt]/de}}}}}function jb(n){var e=n.arrowHead,t=(e==null?void 0:e.extremity)==="target"||(e==null?void 0:e.extremity)==="both",i=(e==null?void 0:e.extremity)==="source"||(e==null?void 0:e.extremity)==="both",r=`
precision highp float;

varying vec4 v_color;
varying float v_thickness;
varying float v_feather;
varying vec2 v_cpA;
varying vec2 v_cpB;
varying vec2 v_cpC;
`.concat(t?`
varying float v_targetSize;
varying vec2 v_targetPoint;`:"",`
`).concat(i?`
varying float v_sourceSize;
varying vec2 v_sourcePoint;`:"",`
`).concat(e?`
uniform float u_lengthToThicknessRatio;
uniform float u_widenessToThicknessRatio;`:"",`

float det(vec2 a, vec2 b) {
  return a.x * b.y - b.x * a.y;
}

vec2 getDistanceVector(vec2 b0, vec2 b1, vec2 b2) {
  float a = det(b0, b2), b = 2.0 * det(b1, b0), d = 2.0 * det(b2, b1);
  float f = b * d - a * a;
  vec2 d21 = b2 - b1, d10 = b1 - b0, d20 = b2 - b0;
  vec2 gf = 2.0 * (b * d21 + d * d10 + a * d20);
  gf = vec2(gf.y, -gf.x);
  vec2 pp = -f * gf / dot(gf, gf);
  vec2 d0p = b0 - pp;
  float ap = det(d0p, d20), bp = 2.0 * det(d10, d0p);
  float t = clamp((ap + bp) / (2.0 * a + b + d), 0.0, 1.0);
  return mix(mix(b0, b1, t), mix(b1, b2, t), t);
}

float distToQuadraticBezierCurve(vec2 p, vec2 b0, vec2 b1, vec2 b2) {
  return length(getDistanceVector(b0 - p, b1 - p, b2 - p));
}

const vec4 transparent = vec4(0.0, 0.0, 0.0, 0.0);

void main(void) {
  float dist = distToQuadraticBezierCurve(gl_FragCoord.xy, v_cpA, v_cpB, v_cpC);
  float thickness = v_thickness;
`).concat(t?`
  float distToTarget = length(gl_FragCoord.xy - v_targetPoint);
  float targetArrowLength = v_targetSize + thickness * u_lengthToThicknessRatio;
  if (distToTarget < targetArrowLength) {
    thickness = (distToTarget - v_targetSize) / (targetArrowLength - v_targetSize) * u_widenessToThicknessRatio * thickness;
  }`:"",`
`).concat(i?`
  float distToSource = length(gl_FragCoord.xy - v_sourcePoint);
  float sourceArrowLength = v_sourceSize + thickness * u_lengthToThicknessRatio;
  if (distToSource < sourceArrowLength) {
    thickness = (distToSource - v_sourceSize) / (sourceArrowLength - v_sourceSize) * u_widenessToThicknessRatio * thickness;
  }`:"",`

  float halfThickness = thickness / 2.0;
  if (dist < halfThickness) {
    #ifdef PICKING_MODE
    gl_FragColor = v_color;
    #else
    float t = smoothstep(
      halfThickness - v_feather,
      halfThickness,
      dist
    );

    gl_FragColor = mix(v_color, transparent, t);
    #endif
  } else {
    gl_FragColor = transparent;
  }
}
`);return r}function Yb(n){var e=n.arrowHead,t=(e==null?void 0:e.extremity)==="target"||(e==null?void 0:e.extremity)==="both",i=(e==null?void 0:e.extremity)==="source"||(e==null?void 0:e.extremity)==="both",r=`
attribute vec4 a_id;
attribute vec4 a_color;
attribute float a_direction;
attribute float a_thickness;
attribute vec2 a_source;
attribute vec2 a_target;
attribute float a_current;
attribute float a_curvature;
`.concat(t?`attribute float a_targetSize;
`:"",`
`).concat(i?`attribute float a_sourceSize;
`:"",`

uniform mat3 u_matrix;
uniform float u_sizeRatio;
uniform float u_pixelRatio;
uniform vec2 u_dimensions;
uniform float u_minEdgeThickness;
uniform float u_feather;

varying vec4 v_color;
varying float v_thickness;
varying float v_feather;
varying vec2 v_cpA;
varying vec2 v_cpB;
varying vec2 v_cpC;
`).concat(t?`
varying float v_targetSize;
varying vec2 v_targetPoint;`:"",`
`).concat(i?`
varying float v_sourceSize;
varying vec2 v_sourcePoint;`:"",`
`).concat(e?`
uniform float u_widenessToThicknessRatio;`:"",`

const float bias = 255.0 / 254.0;
const float epsilon = 0.7;

vec2 clipspaceToViewport(vec2 pos, vec2 dimensions) {
  return vec2(
    (pos.x + 1.0) * dimensions.x / 2.0,
    (pos.y + 1.0) * dimensions.y / 2.0
  );
}

vec2 viewportToClipspace(vec2 pos, vec2 dimensions) {
  return vec2(
    pos.x / dimensions.x * 2.0 - 1.0,
    pos.y / dimensions.y * 2.0 - 1.0
  );
}

void main() {
  float minThickness = u_minEdgeThickness;

  // Selecting the correct position
  // Branchless "position = a_source if a_current == 1.0 else a_target"
  vec2 position = a_source * max(0.0, a_current) + a_target * max(0.0, 1.0 - a_current);
  position = (u_matrix * vec3(position, 1)).xy;

  vec2 source = (u_matrix * vec3(a_source, 1)).xy;
  vec2 target = (u_matrix * vec3(a_target, 1)).xy;

  vec2 viewportPosition = clipspaceToViewport(position, u_dimensions);
  vec2 viewportSource = clipspaceToViewport(source, u_dimensions);
  vec2 viewportTarget = clipspaceToViewport(target, u_dimensions);

  vec2 delta = viewportTarget.xy - viewportSource.xy;
  float len = length(delta);
  vec2 normal = vec2(-delta.y, delta.x) * a_direction;
  vec2 unitNormal = normal / len;
  float boundingBoxThickness = len * a_curvature;

  float curveThickness = max(minThickness, a_thickness / u_sizeRatio);
  v_thickness = curveThickness * u_pixelRatio;
  v_feather = u_feather;

  v_cpA = viewportSource;
  v_cpB = 0.5 * (viewportSource + viewportTarget) + unitNormal * a_direction * boundingBoxThickness;
  v_cpC = viewportTarget;

  vec2 viewportOffsetPosition = (
    viewportPosition +
    unitNormal * (boundingBoxThickness / 2.0 + sign(boundingBoxThickness) * (`).concat(e?"curveThickness * u_widenessToThicknessRatio":"curveThickness",` + epsilon)) *
    max(0.0, a_direction) // NOTE: cutting the bounding box in half to avoid overdraw
  );

  position = viewportToClipspace(viewportOffsetPosition, u_dimensions);
  gl_Position = vec4(position, 0, 1);
    
`).concat(t?`
  v_targetSize = a_targetSize * u_pixelRatio / u_sizeRatio;
  v_targetPoint = viewportTarget;
`:"",`
`).concat(i?`
  v_sourceSize = a_sourceSize * u_pixelRatio / u_sizeRatio;
  v_sourcePoint = viewportSource;
`:"",`

  #ifdef PICKING_MODE
  // For picking mode, we use the ID as the color:
  v_color = a_id;
  #else
  // For normal mode, we use the color:
  v_color = a_color;
  #endif

  v_color.a *= bias;
}
`);return r}var pg=.25,qb={arrowHead:null,curvatureAttribute:"curvature",defaultCurvature:pg},mg=WebGLRenderingContext,Sf=mg.UNSIGNED_BYTE,er=mg.FLOAT;function Id(n){var e=nl(nl({},qb),n||{}),t=e,i=t.arrowHead,r=t.curvatureAttribute,s=t.drawLabel,o=(i==null?void 0:i.extremity)==="target"||(i==null?void 0:i.extremity)==="both",a=(i==null?void 0:i.extremity)==="source"||(i==null?void 0:i.extremity)==="both",l=["u_matrix","u_sizeRatio","u_dimensions","u_pixelRatio","u_feather","u_minEdgeThickness"].concat(uc(i?["u_lengthToThicknessRatio","u_widenessToThicknessRatio"]:[]));return(function(c){zb(u,c);function u(){var d;Ub(this,u);for(var h=arguments.length,f=new Array(h),p=0;p<h;p++)f[p]=arguments[p];return d=Bb(this,u,[].concat(f)),ug(hg(d),"drawLabel",s||Xb(e)),d}return Ob(u,[{key:"getDefinition",value:function(){return{VERTICES:6,VERTEX_SHADER_SOURCE:Yb(e),FRAGMENT_SHADER_SOURCE:jb(e),METHOD:WebGLRenderingContext.TRIANGLES,UNIFORMS:l,ATTRIBUTES:[{name:"a_source",size:2,type:er},{name:"a_target",size:2,type:er}].concat(uc(o?[{name:"a_targetSize",size:1,type:er}]:[]),uc(a?[{name:"a_sourceSize",size:1,type:er}]:[]),[{name:"a_thickness",size:1,type:er},{name:"a_curvature",size:1,type:er},{name:"a_color",size:4,type:Sf,normalized:!0},{name:"a_id",size:4,type:Sf,normalized:!0}]),CONSTANT_ATTRIBUTES:[{name:"a_current",size:1,type:er},{name:"a_direction",size:1,type:er}],CONSTANT_DATA:[[0,1],[0,-1],[1,1],[0,-1],[1,1],[1,-1]]}}},{key:"processVisibleItem",value:function(h,f,p,_,g){var m,v=g.size||1,E=p.x,x=p.y,w=_.x,S=_.y,C=Bs(g.color),b=(m=g[r])!==null&&m!==void 0?m:pg,T=this.array;T[f++]=E,T[f++]=x,T[f++]=w,T[f++]=S,o&&(T[f++]=_.size),a&&(T[f++]=p.size),T[f++]=v,T[f++]=b,T[f++]=C,T[f++]=h}},{key:"setUniforms",value:function(h,f){var p=f.gl,_=f.uniformLocations,g=_.u_matrix,m=_.u_pixelRatio,v=_.u_feather,E=_.u_sizeRatio,x=_.u_dimensions,w=_.u_minEdgeThickness;if(p.uniformMatrix3fv(g,!1,h.matrix),p.uniform1f(m,h.pixelRatio),p.uniform1f(E,h.sizeRatio),p.uniform1f(v,h.antiAliasingFeather),p.uniform2f(x,h.width*h.pixelRatio,h.height*h.pixelRatio),p.uniform1f(w,h.minEdgeThickness),i){var S=_.u_lengthToThicknessRatio,C=_.u_widenessToThicknessRatio;p.uniform1f(S,i.lengthToThicknessRatio),p.uniform1f(C,i.widenessToThicknessRatio)}}}]),u})(Ll)}var Kb=Id();Id({arrowHead:Nl});Id({arrowHead:nl(nl({},Nl),{},{extremity:"both"})});const Ef=[5,9,15],Ud="#3a4a54";function Ul(n,e,t){const i=e/100,r=t/100,s=i*Math.min(r,1-r),o=l=>{const c=(l+n/30)%12;return r-s*Math.max(Math.min(c-3,9-c,1),-1)},a=l=>Math.round(l*255).toString(16).padStart(2,"0");return`#${a(o(0))}${a(o(8))}${a(o(4))}`}function yr(n){return[parseInt(n.slice(1,3),16)||0,parseInt(n.slice(3,5),16)||0,parseInt(n.slice(5,7),16)||0]}function Co(n,e){const[t,i,r]=yr(n),s=(o,a)=>Math.round(Ef[a]+(o-Ef[a])*e).toString(16).padStart(2,"0");return`#${s(t,0)}${s(i,1)}${s(r,2)}`}function eo(n,e,t){const[i,r,s]=yr(n),[o,a,l]=yr(e),c=(u,d)=>Math.round(u+(d-u)*t).toString(16).padStart(2,"0");return`#${c(i,o)}${c(r,a)}${c(s,l)}`}function gg(n){var t,i;const e=new Map;for(const r of n){const s=(t=r.metadata)==null?void 0:t.cluster_global;if(s==null||(i=r.metadata)!=null&&i.is_noise)continue;const o=String(s),a=e.get(o)??{count:0,sample:null,ids:[]};a.count++,a.ids.push(String(r.id)),!a.sample&&r.label&&(a.sample=r.label),e.set(o,a)}return e}function Vs(n,e=58){const t=Number(n);if(Number.isFinite(t)){const i=(Math.abs(t)*137.508+30)%360;return Ul(i,100,e)}return"#608090"}function _g(n,e=0,t=0,i=58){const r=n==null?void 0:n.metadata;if(r!=null&&r.is_noise)return Co(Ud,.28);const s=r==null?void 0:r.cluster_global;if(s!=null&&Number.isFinite(Number(s)))return Vs(s,i);const a=(Math.atan2(t,e)*(180/Math.PI)+180)%360;return Ul(a,100,i)}const vg=1100,ys="#facc15",Zb="#7dd3fc",Ws="#fb923c",Jb="#2dd4bf",Mf="#3b82f6",wf="#ef4444",Qb="#22c55e",ey="#f97316",xg=[.98,.8,.082],ty=[.49,.827,.988],ny=[.98,.57,.24],bg=[.231,.51,.965],yg=[.937,.267,.267],Sg=[.133,.773,.369],Eg=[.976,.451,.086],iy=3003583,rl=16486972,Mg=16436245;function wg(n,e){const t=Math.max(0,Math.min(1,n)),i=(r,s)=>[r[0]+(s[0]-r[0])*t,r[1]+(s[1]-r[1])*t,r[2]+(s[2]-r[2])*t];return e===0?i(bg,yg):e===1?i(Sg,Eg):null}function Fl(n){let e=2166136261;for(let t=0;t<n.length;t++)e^=n.charCodeAt(t),e=Math.imul(e,16777619);return e>>>0}function Tg(n,e){const t=(n&65535)*(Math.PI*2/65535),i=(n>>>16)*(Math.PI*2/65535),r=Math.sin(e*.6+t)*.035+Math.sin(e*.35+t+1.2)*.02,s=Math.cos(e*.45+i)*.03+Math.cos(e*.25+i+2.1)*.015;return{dx:r,dy:s}}function Ol(n){return[parseInt(n.slice(1,3),16)/255,parseInt(n.slice(3,5),16)/255,parseInt(n.slice(5,7),16)/255]}function Fd(n,e){const t=Date.now()+vg;for(const i of n)i&&e.set(i,t)}function Ag(n,e,t){const i=e.selectedIds.has(n),r=e.hoverNodeId===n,s=e.selectedIds.size>0||e.emphasizedIds.size>0||!!e.hoverNodeId,o=s&&e.emphasizedIds.has(n),a=s&&!i&&!r&&!o,l=t.get(n)??0,c=l>Date.now(),u=c?(l-Date.now())/vg:0;return{selected:i,hover:r,emphasized:o,dim:a,pulsing:c,pulseLife:u}}function ms(n,e,t){const i=t?n.slice(0,e):n.slice(-e),r=new Map;for(const s of i){const o=s.label.toLowerCase().split(/[\s,.\-_()\[\]\/\\]+/).filter(a=>a.length>3&&!sy.has(a));for(const a of o)r.set(a,(r.get(a)??0)+1)}return r.size?[...r.entries()].sort((s,o)=>o[1]-s[1]).slice(0,3).map(([s])=>s).join(" · "):t?"B-side":"A-side"}function ry(n,e=12){if(n.length<3)return n.slice();const t=[n[0],...n,n[n.length-1]],i=[],r=n.length-1;for(let s=0;s<r;s++){const o=t[s],a=t[s+1],l=t[s+2],c=t[s+3],u=s===r-1?e+1:e;for(let d=0;d<u;d++){const h=d/e,f=h*h,p=f*h;i.push({x:.5*(2*a.x+(-o.x+l.x)*h+(2*o.x-5*a.x+4*l.x-c.x)*f+(-o.x+3*a.x-3*l.x+c.x)*p),y:.5*(2*a.y+(-o.y+l.y)*h+(2*o.y-5*a.y+4*l.y-c.y)*f+(-o.y+3*a.y-3*l.y+c.y)*p)})}}return i}function Cg(n,e){n.save();for(const[t,i]of e){if(i.length<2)continue;const r=oy(i);if(r.length<2)continue;const s=Vs(t);n.strokeStyle=s,n.lineWidth=2.5,n.globalAlpha=.85,n.setLineDash([]),n.beginPath(),n.moveTo(i[r[0]].x,i[r[0]].y);for(let o=1;o<r.length;o++)n.lineTo(i[r[o]].x,i[r[o]].y);n.closePath(),n.stroke(),n.globalAlpha=.18,n.fillStyle=s,n.fill()}n.restore()}function Od(n,e,t){const i=r=>Math.round(r*255).toString(16).padStart(2,"0");return`#${i(n)}${i(e)}${i(t)}`}function Rg(n){const e=n<.5?n*2:1,t=n<.5?n*2:(1-n)*2,i=n<.5?1:(1-n)*2;return[e,t,i]}function Pg(n){const e=n<.5?.13333333333333333+.8666666666666667*n*2:1,t=n<.5?197/255+(1-197/255)*n*2:1-(1-115/255)*(n-.5)*2,i=n<.5?94/255+(1-94/255)*n*2:1-(1-22/255)*(n-.5)*2;return[e,t,i]}function Lg(n){var e;return((e=n.source_point_ids)==null?void 0:e.map(String))??(n.source_point_id?[String(n.source_point_id)]:[])}function Dg(n){const e=Math.max(1,Math.round(n.length*.1));return{sideA:n.slice(-e).map(t=>t.id),sideB:n.slice(0,e).map(t=>t.id)}}const sy=new Set(["a","an","the","of","in","on","at","to","for","with","by","from","and","or","but","is","are","was","were","very","some","two","one","this","that","its","into","out","up","about","over","more","also","art","style","image","photo","render","detailed","realistic","full","high","quality","beautiful","amazing","best","digital","concept"]);function oy(n){if(n.length<3)return n.map((r,s)=>s);let e=0;for(let r=1;r<n.length;r++)(n[r].x<n[e].x||n[r].x===n[e].x&&n[r].y<n[e].y)&&(e=r);const t=[];let i=e;do{t.push(i);let r=(i+1)%n.length;for(let s=0;s<n.length;s++)(n[r].x-n[i].x)*(n[s].y-n[i].y)-(n[r].y-n[i].y)*(n[s].x-n[i].x)<0&&(r=s);i=r}while(i!==e&&t.length<=n.length);return t}const[ay,ly,cy]=yr(Ws);let Ng=n=>n,Ig=n=>-n;function uy(n,e){return[Ng(n),Ig(e)]}function dy(n,e,t,i,r,s,o=!0,a){var d,h,f,p;i.length=0,r.length=0,n.clear();const{points:l}=e;if(!l.length)return;const{normX:c,normY:u}=hy(l);Ng=c,Ig=u;for(const _ of l)n.addNode(String(_.id),{x:c(Number(((d=_.view_coords)==null?void 0:d[0])??0)),y:u(Number(((h=_.view_coords)==null?void 0:h[1])??0)),size:4,color:_g(_,c(Number(((f=_.view_coords)==null?void 0:f[0])??0)),u(Number(((p=_.view_coords)==null?void 0:p[1])??0))),label:_.label??String(_.id)});Ug(n,t,i,r,s,o,a)}function Ug(n,e,t,i,r,s=!0,o){for(const l of t)n.hasEdge(l)&&n.dropEdge(l);t.length=0;for(const l of i)n.hasNode(l)&&n.dropNode(l);if(i.length=0,o==null||o.clear(),!e)return;const a=e.operation;if(a==="delta_walk"){const l=(e.source_point_ids??[]).map(String),[c,u]=l;if(c&&u&&n.hasNode(c)&&n.hasNode(u)){const[d,h,f]=yr(Jb),p=n.addEdge(c,u,{color:`rgba(${d},${h},${f},0.85)`,size:2.5,isOverlay:!0,zIndex:2});t.push(p)}}if(r){const l=(e.source_point_ids??[]).map(String);fy(n,e.trajectory_overlay??[],t,i,s,l,o,a,e.consistency_variants)}}function hy(n){const e=n.map(d=>{var h;return Number(((h=d.view_coords)==null?void 0:h[0])??0)}),t=n.map(d=>{var h;return Number(((h=d.view_coords)==null?void 0:h[1])??0)}),i=Math.min(...e),r=Math.max(...e),s=Math.min(...t),o=Math.max(...t),a=(i+r)/2,l=(s+o)/2,u=2/Math.max(r-i,o-s,.001);return{normX:d=>(d-a)*u,normY:d=>-((d-l)*u)}}function Fg(n,e){const t=wg(n,e);return t?Od(...t):Ws}function Tf(n,e,t){const[i,r,s]=yr(Fg(n,e));return`rgba(${i},${r},${s},${t})`}function fy(n,e,t,i,r,s,o,a,l){var h;const c=e.filter(f=>f.coords_2d);if(!c.length)return;const u=a==="consistency_check",d=[];for(const f of c){const p=`__ghost__${f.id}`;if(n.hasNode(p))continue;let _=f.coords_2d[0],g=-f.coords_2d[1];if(r&&!u){const S=f.alpha;let C=null;S===0?C=a==="delta_walk"?s[2]:s[0]??null:S===1&&a!=="delta_walk"&&s.length>=2&&(C=s[1]),C&&n.hasNode(C)&&(_=n.getNodeAttribute(C,"x"),g=n.getNodeAttribute(C,"y"),o==null||o.set(p,C))}const m=f.source_text_pair,v=u?f.cluster_id!=null?Vs(f.cluster_id):Co(Ud,.28):null,E=u?`rgba(${ay},${ly},${cy},0.5)`:Tf(f.alpha,m,.5),x=u?null:Fg(f.alpha,m),w=u?((h=l==null?void 0:l.find(S=>S.id===f.id))==null?void 0:h.text)??f.label:void 0;n.addNode(p,{x:_,y:g,size:u?4:3.5,color:E,label:u?w??"":`t=${f.alpha.toFixed(2)}`,isGhost:!0,isVariantGhost:u,ghostClusterColor:v,ghostClusterId:f.cluster_id??null,ghostRingColor:x,ghostCoords2d:f.coords_2d,ghostCoords3d:f.coords_3d,ghostAlpha:f.alpha,zIndex:u?2:1}),i.push(p),d.push({key:p,alpha:f.alpha,pair:m})}if(a!=="consistency_check"&&a!=="slerp")for(let f=0;f<d.length-1;f++){const{key:p,alpha:_,pair:g}=d[f],{key:m,alpha:v,pair:E}=d[f+1];if(g===E&&n.hasNode(p)&&n.hasNode(m)){const x=(_+v)/2,w=Tf(x,g,.32),S=a==="lerp"?void 0:"curved",b=n.addEdge(p,m,{...S?{type:S,curvature:.05}:{},color:w,size:1,isOverlay:!0,zIndex:1});t.push(b)}}}const dc=st(!1),ki=st(null),Hr=st(!1),py=ti(()=>{var s,o;const n=ut.value.points,e=((o=(s=Fo.value)==null?void 0:s.source)==null?void 0:o.cluster_labels)??{},t=gg(n),i=new Map,r=ke.value;if((r==null?void 0:r.operation)==="consistency_check"){for(const a of r.consistency_variants??[])if(a.cluster_id!=null&&a.cluster_id>=0){const l=String(a.cluster_id);i.set(l,(i.get(l)??0)+1)}}return[...t.entries()].map(([a,{count:l,sample:c,ids:u}])=>({id:a,name:e[a]??a,color:Vs(a),count:l,variantCount:i.get(a)??0,sample:c,pointIds:u})).sort((a,l)=>Number(a.id)-Number(l.id))});function my(){const n=py.value;if(Rs(()=>jt(()=>{const r=ut.value.points,s=new Set(r.map(l=>String(l.id)));ki.value!==null&&!r.some(l=>{var c,u;return String((c=l.metadata)==null?void 0:c.cluster_global)===ki.value&&!((u=l.metadata)!=null&&u.is_noise)})&&(ki.value=null);const o=Et.value,a=[...o].filter(l=>Cm(l)||s.has(l));a.length!==o.size&&(Et.value=new Set(a))}),[]),!n.length)return null;const e=dc.value,t=ki.value,i=t!==null&&n.some(r=>r.id===t);return A("div",{class:"nels-cluster-overlay",children:[A("div",{class:"nels-cluster-toggle-row",children:[A("button",{class:"nels-cluster-toggle",onClick:()=>{dc.value=!dc.value},children:[A("span",{children:"Clusters"}),A("span",{class:"nels-cluster-toggle-icon",children:e?"▶":"▼"})]}),A("button",{class:`nels-hull-chip${Hr.value?" active":""}`,title:"Toggle convex hulls around clusters",onClick:r=>{r.stopPropagation(),Hr.value=!Hr.value},children:"⬡ Hulls"})]}),!e&&A("div",{class:"nels-legend-list",children:n.map(r=>A("div",{class:`nels-legend-row${i&&t===r.id?" active":""}`,onClick:()=>gy(r),children:[A("span",{class:"nels-legend-dot",style:`background:${r.color}`}),A("div",{class:"nels-legend-info",children:[A("span",{class:"nels-legend-name",children:r.name}),r.sample&&A("span",{class:"nels-legend-sample",children:['"',r.sample,'"']})]}),A("span",{class:"nels-legend-meta",children:[r.count," pts",r.variantCount>0?` +${r.variantCount}v`:""]})]},r.id))})]})}function gy(n){ki.value===n.id?(ki.value=null,Et.value=new Set):(ki.value=n.id,Et.value=new Set(n.pointIds))}const[Og,kg,Bg]=yr(ys);let Qt=null,kt=null,Dr=null,sl={selectedIds:new Set,hoverNodeId:null};function _y(n){Dr=n}function vy(n,e,t){Qt=n,kt=e,sl=t}function xy(){Qt=null,kt=null}function gu(){var i,r;if(!Dr||ii.value==="3d"||!Qt||!kt)return;const n=Dr.offsetWidth,e=Dr.offsetHeight;Dr.width=n,Dr.height=e;const t=Dr.getContext("2d");if(t){if(t.clearRect(0,0,n,e),Hr.value){const s=new Map;for(const o of ut.value.points){const a=(i=o.metadata)==null?void 0:i.cluster_global;if(a==null||(r=o.metadata)!=null&&r.is_noise)continue;const l=String(o.id);if(!kt.hasNode(l))continue;const c=kt.getNodeAttributes(l),u=Qt.graphToViewport({x:c.x,y:c.y}),d=String(a),h=s.get(d)??[];h.push(u),s.set(d,h)}Cg(t,s)}Sy(t),Ty(t,n,e),yy(t),by(t),Ey(t)}}function by(n){var i;if(!Qt||!kt||((i=ke.value)==null?void 0:i.operation)!=="slerp")return;const e=[];if(kt.forEachNode((r,s)=>{if(!s.isGhost||s.isVariantGhost)return;const o=Qt.graphToViewport({x:s.x,y:s.y});e.push({alpha:s.ghostAlpha,x:o.x,y:o.y})}),e.length<3)return;e.sort((r,s)=>r.alpha-s.alpha);const t=ry(e);n.save(),n.strokeStyle=Ws,n.lineWidth=1.5,n.globalAlpha=.78,n.beginPath(),n.moveTo(t[0].x,t[0].y);for(let r=1;r<t.length;r++)n.lineTo(t[r].x,t[r].y);n.stroke(),n.restore()}function yy(n){if(!Qt||!kt)return;const e=performance.now()/1e3,t=.5+.5*Math.sin(e*.7);n.save(),n.setLineDash([]),n.lineWidth=2.5,n.globalAlpha=.55+t*.3,kt.forEachNode((i,r)=>{if(!r.isGhost||sl.hoverNodeId===i)return;const s=Qt.graphToViewport({x:r.x,y:r.y});n.strokeStyle=r.ghostRingColor??Ws,n.beginPath(),n.arc(s.x,s.y,8,0,Math.PI*2),n.stroke()}),n.restore()}function Sy(n){if(!Qt||!kt)return;const e=ke.value;if((e==null?void 0:e.operation)!=="nearest_neighbor")return;const t=Lg(e);n.save(),n.strokeStyle=`rgba(${Og},${kg},${Bg},0.78)`,n.lineWidth=2,n.setLineDash([6,4]),n.globalAlpha=1;for(const i of e.neighbors??[]){const r=String(i.id??"");if(!r)continue;const s=i.query_id?[String(i.query_id)]:t;for(const o of s){if(!kt.hasNode(o)||!kt.hasNode(r))continue;const a=kt.getNodeAttributes(o),l=kt.getNodeAttributes(r),c=Qt.graphToViewport({x:a.x,y:a.y}),u=Qt.graphToViewport({x:l.x,y:l.y});n.beginPath(),n.moveTo(c.x,c.y),n.lineTo(u.x,u.y),n.stroke()}}n.setLineDash([]),n.restore()}function Ey(n){var o,a;if(!Qt)return;const e=qe.value;if(e.operation!=="latent_probe")return;const t=e.probe_mode==="2d"?e.probe_coords:e.probe_cross_coords;if(!t||t.length<2)return;const i=Qt.graphToViewport({x:t[0],y:t[1]}),r=sl.selectedIds.has("probe"),s=sl.hoverNodeId==="probe";if(n.save(),n.shadowColor=`rgba(${Og},${kg},${Bg},0.6)`,n.shadowBlur=r||s?18:12,n.beginPath(),n.arc(i.x,i.y,r||s?11:8,0,Math.PI*2),n.fillStyle=ys,n.fill(),n.restore(),r&&!s){const l=((o=ke.value)==null?void 0:o.operation)==="latent_probe"?(a=ke.value)==null?void 0:a.text_reconstruction:void 0;zg(n,i.x,i.y-18,(l==null?void 0:l.text)??"Latent Space Probe",ys)}}function zg(n,e,t,i,r,s=11,o="ui-monospace, monospace"){n.save();const a=i.length>50?i.slice(0,50)+"…":i;n.font=`${s}px ${o}`;const l=n.measureText(a).width,c=8,u=5,d=l+c*2,h=s+u*2,f=e-d/2,p=t-h;n.fillStyle="#0f1a28",n.beginPath(),n.roundRect?n.roundRect(f,p,d,h,4):n.rect(f,p,d,h),n.fill(),n.strokeStyle=r,n.lineWidth=1.5,n.shadowColor=r,n.shadowBlur=8,n.stroke(),n.shadowBlur=0,n.fillStyle="#e8f0f8",n.textAlign="center",n.textBaseline="middle",n.fillText(a,e,p+h/2),n.restore()}function My(n,e,t,i,r,s){const o=[];Math.abs(t)>1e-8&&(o.push(-n/t),o.push((r-n)/t)),Math.abs(i)>1e-8&&(o.push(-e/i),o.push((s-e)/i));const a=o.filter(l=>{const c=n+l*t,u=e+l*i;return c>=-1&&c<=r+1&&u>=-1&&u<=s+1});return a.sort((l,c)=>l-c),[a[0]??-1,a[a.length-1]??1]}function Af(n){if(!Qt||!kt)return null;let e=0,t=0,i=0;for(const r of n){const s=String(r);if(!kt.hasNode(s))continue;const o=kt.getNodeAttributes(s),a=Qt.graphToViewport({x:o.x,y:o.y});e+=a.x,t+=a.y,i++}return i?{x:e/i,y:t/i}:null}function wy(n){if(!n.length)return[null,null];const{sideA:e,sideB:t}=Dg(n);return[Af(e),Af(t)]}function Cf(n,e,t,i,r){const[s,o]=wy(i);if(!s||!o)return;const a=o.x-s.x,l=o.y-s.y,c=Math.sqrt(a*a+l*l);if(c<1)return;const u=a/c,d=l/c,[h,f]=My(s.x,s.y,u,d,e,t),p={x:s.x+h*u,y:s.y+h*d},_={x:s.x+f*u,y:s.y+f*d};n.setLineDash([6,4]),n.lineWidth=1.2,n.strokeStyle="rgba(255,255,255,0.22)",n.beginPath(),n.moveTo(p.x,p.y),n.lineTo(_.x,_.y),n.stroke(),n.setLineDash([]);const g=10,m=5;n.strokeStyle=r.lineB,n.lineWidth=1.8,n.beginPath(),n.moveTo(_.x-u*g-d*m,_.y-d*g+u*m),n.lineTo(_.x,_.y),n.lineTo(_.x-u*g+d*m,_.y-d*g-u*m),n.stroke(),n.strokeStyle=r.lineA,n.beginPath(),n.moveTo(p.x+u*g-d*m,p.y+d*g+u*m),n.lineTo(p.x,p.y),n.lineTo(p.x+u*g+d*m,p.y+d*g-u*m),n.stroke()}function Ty(n,e,t){const i=ke.value;if((i==null?void 0:i.operation)!=="axis_projection")return;const r=i.axis_projection??[];if(!r.length||!Qt||!kt)return;n.save(),Cf(n,e,t,r,{lineA:Mf,lineB:wf});const s=i.axis_b_projection;s&&s.length>=2&&Cf(n,e,t,s,{lineA:Qb,lineB:ey});const o=(a,l)=>{if(!(!Qt||!kt)){n.strokeStyle=l,n.lineWidth=2,n.globalAlpha=.75;for(const c of a){const u=String(c);if(!kt.hasNode(u))continue;const d=kt.getNodeAttributes(u),h=Qt.graphToViewport({x:d.x,y:d.y});n.beginPath(),n.arc(h.x,h.y,7,0,Math.PI*2),n.stroke()}n.globalAlpha=1}};o(i.source_group_a??[],Mf),o(i.source_group_b??[],wf),n.restore()}const[Ay,Cy,Ry]=yr(Ws);function Py(n){return Od(...Rg(n))}function Ly(n){return Od(...Pg(n))}function Dy(n,e,t){return function(i,r){var w;if(r.isGhost){const S=n.hoverNodeId===i;if(n.selectedIds.has(i))return{...r,size:(r.size||5)*1.9,color:ys,highlighted:!0,zIndex:6};if(S)return{...r,size:(r.size||3.5)*2.2,color:ys,highlighted:!0,zIndex:5};const b=t(i),T=.5+.5*Math.sin(b);if(r.isVariantGhost){const L=r.ghostClusterColor??Ws,P=ki.value,F=r.ghostClusterId,W=P!==null&&(F==null||String(F)!==P);return{...r,size:(r.size||4)*(.94+T*.08),color:W?L+"28":eo(L,"#ffffff",.02+T*.04)}}return{...r,size:(r.size||3.5)*(.82+T*.18),color:`rgba(${Ay},${Cy},${Ry},0)`}}const s=t(i),o=.5+.5*Math.sin(s),a=.5+.5*Math.sin(s*.72+1.7),{selected:l,hover:c,emphasized:u,dim:d,pulsing:h,pulseLife:f}=Ag(i,n,e);if(Gi.value&&!l&&!c)return{...r,color:Co(r.color||"#607890",.08),size:(r.size||6)*.55,zIndex:0};const p=((w=ke.value)==null?void 0:w.operation)==="axis_projection",_=Di.value,g=_==="b"?Mm.value:wm.value,m=_==="b"?Ly:Py;if(!l&&!c&&!u&&!d&&!h){const S={...r};return p&&g.has(i)?(S.color=m(g.get(i)),S.size=(r.size||6)*(.94+o*.08)):(S.color=eo(r.color||"#40a0ff","#ffffff",.02+a*.04),S.size=(r.size||6)*(.94+o*.08)),S}const v={...r},E=r.size||6,x=r.color||"#607890";return l?(v.color=eo(ys,"#fff7a8",a*.14),v.size=E*(1.5+o*.04),v.zIndex=3,v.highlighted=!0):c?(v.color=eo(x,"#ffffff",.08+a*.08),v.size=E*(1.4+o*.05),v.zIndex=2,v.highlighted=!0):u?(v.color=eo(Zb,"#dff4ff",a*.16),v.size=E*(1.25+o*.03),v.zIndex=1):d&&(v.color=Co(x,.22+o*.03),v.size=E*(.72+o*.04),v.zIndex=0),h&&(v.size=(v.size||E)*(1+f*.65),v.color=Ul(217,91,Math.round(45+f*20)),v.zIndex=4),v}}function Ny(n,e,t){const i=e.x,r=e.y,s=e.size||6,o=e.color||"#6080a0",a=e.label;if(n.beginPath(),n.arc(i,r,s+4,0,Math.PI*2),n.strokeStyle=o,n.lineWidth=2,n.globalAlpha=.5,n.shadowColor=o,n.shadowBlur=12,n.stroke(),n.globalAlpha=1,n.shadowBlur=0,!a)return;const l=t.labelSize||11,c=t.labelFont||"ui-monospace, monospace";zg(n,i,r-s-10,a,o,l,c)}let hc=null,Fa=null,Oa=null;function Iy(n){Fa=n}function Uy(n){Oa=n}function rt(){hc&&clearTimeout(hc),hc=setTimeout(()=>Fa==null?void 0:Fa(),120)}function Fy(n){wt.value=n?`__ghost__${n}`:null;const e=Oa==null?void 0:Oa();e==null||e.highlightGhostStep(n),e==null||e.sigmaRefresh()}const ni=st(null);let li=null,ol=null,kd=null;function Oy(){const n=document.createElement("div");n.style.cssText="position:fixed;z-index:9999;background:#0f1a28;color:#e8f0f8;border:1px solid rgba(160,210,255,0.35);border-radius:4px;font:12px ui-monospace,monospace;box-shadow:0 4px 14px rgba(0,0,0,0.55);padding:4px 0;min-width:130px;display:none;";const e=document.createElement("div");return e.textContent="Copy Prompt",e.style.cssText="padding:6px 14px;cursor:pointer;user-select:none;",e.addEventListener("mouseover",()=>{e.style.background="rgba(160,210,255,0.1)"}),e.addEventListener("mouseout",()=>{e.style.background=""}),e.addEventListener("mousedown",t=>{var s;t.stopPropagation();const i=ol?ut.value.byId.get(ol):void 0,r=kd??((s=i==null?void 0:i.metadata)==null?void 0:s.text)??(i==null?void 0:i.label)??"";r&&navigator.clipboard.writeText(r).catch(()=>{}),fc()}),n.appendChild(e),document.addEventListener("mousedown",t=>{n.style.display!=="none"&&!n.contains(t.target)&&fc()},!0),document.addEventListener("keydown",t=>{t.key==="Escape"&&fc()}),document.body.appendChild(n),n}function fc(){li&&(li.style.display="none"),ol=null,kd=null}function Ss(n,e,t,i){li||(li=Oy()),ol=t,kd=i??null,li.style.display="block",li.style.left=`${n}px`,li.style.top=`${e}px`;const r=li.getBoundingClientRect();r.right>window.innerWidth&&(li.style.left=`${n-r.width}px`),r.bottom>window.innerHeight&&(li.style.top=`${e-r.height}px`)}let Ro=!1,Es=null;function ky(){Ro=!1,Es=null,ni.value=null}function al(n){const e=Ds().getBoundingClientRect();return{x:n.clientX-e.left,y:n.clientY-e.top}}function Gg(n){if(!n.shiftKey||!Ds()||wt.value)return;n.stopPropagation(),n.preventDefault();const e=al(n);Ro=!0,Es=e,ni.value={x1:e.x,y1:e.y,x2:e.x,y2:e.y}}function Hg(n){if(!Ro||!Es||!Ds())return;const e=al(n);ni.value={x1:Es.x,y1:Es.y,x2:e.x,y2:e.y}}function Vg(n){if(!Ro)return;Ro=!1;const e=ni.value;ni.value=null,Es=null;const t=ur(),i=Xg();if(!e||!t||!i)return;const r=Math.min(e.x1,e.x2),s=Math.max(e.x1,e.x2),o=Math.min(e.y1,e.y2),a=Math.max(e.y1,e.y2);if(s-r<4&&a-o<4)return;const l=new Set;i.forEachNode(c=>{const u=i.getNodeAttributes(c),d=t.graphToViewport({x:u.x,y:u.y});d.x>=r&&d.x<=s&&d.y>=o&&d.y<=a&&l.add(c)}),Et.value=l,rt()}let fs=null,yo=null,So=null,Eo=null;function By(){const n=ur();if(!n)return;n.on("clickNode",({node:l,event:c})=>{const u=(c==null?void 0:c.original)??{},d=u.shiftKey||u.ctrlKey||u.metaKey;xs(l,d),rt(),n.refresh()}),n.on("clickStage",l=>{if(!ur())return;const c=qe.value;if(c.operation==="latent_probe"&&c.probe_place_mode){const u=l.event;if(u){const d=n.viewportToGraph({x:u.x??0,y:u.y??0});Ut({probe_coords:[d.x,d.y],probe_mode:"2d",probe_place_mode:!1}),rt()}n.refresh();return}Td(),rt(),n.refresh()}),n.on("enterNode",({node:l})=>{var u,d;wt.value=l;const c=ut.value.byId.get(l);if(c)An.value=c;else{const h=ur(),f=h?h.getGraph().getNodeAttributes(l):null;if(f!=null&&f.isGhost&&f.ghostCoords2d){const p=f.ghostCoords2d,_=f.ghostCoords3d,g=l.startsWith("__ghost__")?l.slice(9):l,m=f.ghostClusterId,v=(d=(u=ke.value)==null?void 0:u.consistency_variants)==null?void 0:d.find(x=>x.id===g),E=(v==null?void 0:v.text)??f.label??"";An.value={id:g,view_coords:_??p,label:E,metadata:{text:E||void 0,...m!=null&&m>=0?{ghost_cluster_id:m}:{}}}}else An.value=null}n.refresh()}),n.on("leaveNode",()=>{wt.value=null,An.value=null,n.refresh()});const e=12;function t(){const l=qe.value;if(l.operation!=="latent_probe")return null;const c=l.probe_mode==="2d"?l.probe_coords:l.probe_cross_coords;return c&&c.length>=2?c:null}function i(l,c){const u=ur(),d=t();if(!u||!d)return!1;const h=u.graphToViewport({x:d[0],y:d[1]}),f=l-h.x,p=c-h.y;return Math.sqrt(f*f+p*p)<=e}function r(){wt.value==="probe"&&(wt.value=null,An.value=null)}function s(l){var p,_;const c=t(),u=Ds();if(!c||!u){r();return}const{x:d,y:h}=al(l);if(!i(d,h)){r();return}if(wt.value===null||wt.value==="probe"){const g=((p=ke.value)==null?void 0:p.operation)==="latent_probe"?(_=ke.value)==null?void 0:_.text_reconstruction:void 0;wt.value="probe",An.value={id:"probe",view_coords:[c[0],c[1]],label:"Latent probe",metadata:{text:"Latent Space Probe",recon_text:g==null?void 0:g.text,recon_sim:g==null?void 0:g.cosine_sim}}}}const o=Ds();fs=o,yo=s,o==null||o.addEventListener("mousemove",yo),So=l=>{if(!t()||qe.value.probe_place_mode)return;const{x:u,y:d}=al(l);if(!i(u,d))return;const h=l.shiftKey||l.ctrlKey||l.metaKey;xs("probe",h),rt(),n.refresh()},o==null||o.addEventListener("click",So),Eo=l=>{var u,d,h,f;const c=wt.value;if(c){if(l.preventDefault(),c==="probe"){const p=((u=ke.value)==null?void 0:u.operation)==="latent_probe"?(d=ke.value)==null?void 0:d.text_reconstruction:void 0;Ss(l.clientX,l.clientY,"probe",(p==null?void 0:p.text)??"Latent Space Probe");return}if(c.startsWith("__ghost__")){const p=ur(),_=p?p.getGraph().getNodeAttributes(c):null;if(!(_!=null&&_.isGhost))return;const g=c.slice(9),m=(f=(h=ke.value)==null?void 0:h.consistency_variants)==null?void 0:f.find(E=>E.id===g),v=(m==null?void 0:m.text)??_.label??"";v&&Ss(l.clientX,l.clientY,c,v);return}ut.value.byId.has(c)&&Ss(l.clientX,l.clientY,c)}},o==null||o.addEventListener("contextmenu",Eo);let a=null;n.getCamera().on("updated",()=>{a&&clearTimeout(a),a=setTimeout(()=>{a=null,rt()},600)})}function zy(){fs&&(yo&&fs.removeEventListener("mousemove",yo),So&&fs.removeEventListener("click",So),Eo&&fs.removeEventListener("contextmenu",Eo)),fs=null,yo=null,So=null,Eo=null}let Ue=null,lt=null,gs=null;const Wg=ti(()=>qe.value.snap_endpoints),Bd=[],zd=[],kl=new Map,Bl=new Map,ll=new Map;let cr=null,Or=null,_u=0;const _s=[],to={selectedIds:new Set,emphasizedIds:new Set,hoverNodeId:null};function $g(n){_y(n)}function ur(){return Ue}function Xg(){return lt}function Ds(){return gs}function jg(n){if(Ue)return;gs=n,n.addEventListener("mousedown",Gg,{capture:!0}),window.addEventListener("mousemove",Hg),window.addEventListener("mouseup",Vg),lt=new Nd({multi:!0,allowSelfLoops:!1});const e=Dy(to,Bl,jy);Ue=new Cx(lt,n,{edgeProgramClasses:{curved:Kb},defaultDrawNodeHover:Ny,nodeReducer:e,zIndex:!0,renderEdgeLabels:!1,allowInvalidContainer:!0,defaultNodeColor:"#40a0ff",labelFont:"ui-monospace, SFMono-Regular, Consolas, monospace",labelSize:11,labelColor:{color:"#9aaabb"},labelRenderedSizeThreshold:12,minCameraRatio:.04,maxCameraRatio:20,stagePadding:50}),vy(Ue,lt,to),_s.push(jt(()=>{const t=ut.value,i=ke.value,r=gi.value,s=Wg.value;!Ue||!lt||(dy(lt,t,i,Bd,zd,r,s,kl),ll.clear(),lt.forEachNode(o=>{ll.set(o,{x:lt.getNodeAttribute(o,"x"),y:lt.getNodeAttribute(o,"y")})}),Ue.refresh())})),_s.push(jt(()=>{to.selectedIds=Et.value,to.emphasizedIds=Rm.value,to.hoverNodeId=wt.value,Ue==null||Ue.refresh()})),_s.push(jt(()=>{br.value==="graph"&&setTimeout(()=>Ue==null?void 0:Ue.refresh(),0),br.value==="graph"&&ut.value.points.length>0&&Li.value?Yy():Zg()})),_s.push(jt(()=>{Hr.value,ut.value,ke.value,ii.value,qe.value,gu()})),Ue.on("afterRender",gu)}function Yg(){for(const n of _s)n();_s.length=0,cr&&(cancelAnimationFrame(cr),cr=null),Zg(),Ue==null||Ue.removeListener("afterRender",gu),xy(),Ue==null||Ue.kill(),Ue=null,lt=null,Bd.length=0,zd.length=0,kl.clear(),Bl.clear(),gs==null||gs.removeEventListener("mousedown",Gg,{capture:!0}),window.removeEventListener("mousemove",Hg),window.removeEventListener("mouseup",Vg),ky(),zy(),gs=null}function Gy(){Ue==null||Ue.refresh()}function Hy(n){Ue==null||Ue.refresh()}function vu(){var n;(n=Ue==null?void 0:Ue.resize)==null||n.call(Ue),Ue==null||Ue.refresh()}function Vy(){var e;const n=(e=Ue==null?void 0:Ue.getCamera())==null?void 0:e.getState();return{x:(n==null?void 0:n.x)??0,y:(n==null?void 0:n.y)??0,ratio:(n==null?void 0:n.ratio)??1}}function Wy(n){if(!Ue||!n)return;const e=n.ratio!=null?Number(n.ratio):1;Ue.getCamera().setState({x:Number(n.x??0),y:Number(n.y??0),ratio:Math.max(.01,e)})}function qg(){if(!Ue||!lt)return;const n=lt.nodes();if(!n.length){Ue.getCamera().animate({x:0,y:0,ratio:1,angle:0},{duration:200});return}let e=1/0,t=-1/0,i=1/0,r=-1/0;for(const a of n){const l=lt.getNodeAttribute(a,"x"),c=lt.getNodeAttribute(a,"y");l<e&&(e=l),l>t&&(t=l),c<i&&(i=c),c>r&&(r=c)}const s=(e+t)/2,o=(i+r)/2;Ue.getCamera().animate({x:s,y:o,ratio:1,angle:0},{duration:200})}function $y(){lt&&Ug(lt,ke.value,Bd,zd,gi.value,Wg.value,kl)}function Kg(n){Fd(n,Bl),qy()}function Xy(n){Kg(wd(n))}function jy(n){return _u/900+Fl(n)*7e-4}function Yy(){if(Or)return;const n=()=>{if(!Ue||!lt||br.value!=="graph"||!Li.value){Or=null,Jg();return}_u=performance.now();const e=_u/1e3;ll.forEach(({x:t,y:i},r)=>{if(lt.hasNode(r)){const{dx:s,dy:o}=Tg(Fl(r),e);lt.setNodeAttribute(r,"x",t+s),lt.setNodeAttribute(r,"y",i+o)}}),kl.forEach((t,i)=>{lt.hasNode(i)&&lt.hasNode(t)&&(lt.setNodeAttribute(i,"x",lt.getNodeAttribute(t,"x")),lt.setNodeAttribute(i,"y",lt.getNodeAttribute(t,"y")))}),Ue.refresh(),Or=requestAnimationFrame(n)};Or=requestAnimationFrame(n)}function Zg(){Or&&(cancelAnimationFrame(Or),Or=null,Jg())}function Jg(){lt&&(ll.forEach(({x:n,y:e},t)=>{lt.hasNode(t)&&(lt.setNodeAttribute(t,"x",n),lt.setNodeAttribute(t,"y",e))}),Ue==null||Ue.refresh())}function qy(){if(cr)return;const n=()=>{if(!Ue){cr=null;return}Ue.refresh(),[...Bl.values()].some(e=>e>Date.now())?cr=requestAnimationFrame(n):cr=null};cr=requestAnimationFrame(n)}const Ky=Object.freeze(Object.defineProperty({__proto__:null,addOverlayEdges:$y,applySigmaViewport:Wy,destroyRenderer:Yg,fitCamera:qg,getCameraState:Vy,getSigma:ur,getSigmaContainer:Ds,getSigmaGraph:Xg,highlightGhostStep:Hy,initRenderer:jg,pulseIds:Kg,pulseOperationResult:Xy,resizeRenderer:vu,setHullCanvas:$g,sigmaRefresh:Gy},Symbol.toStringTag,{value:"Module"}));/**
 * @license
 * Copyright 2010-2026 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const Gd="184",Ms={ROTATE:0,DOLLY:1,PAN:2},vs={ROTATE:0,PAN:1,DOLLY_PAN:2,DOLLY_ROTATE:3},Zy=0,Rf=1,Jy=2,ka=1,Qy=2,fo=3,Sr=0,bn=1,Ii=2,Vi=0,ws=1,Pf=2,Lf=3,Df=4,eS=5,Ir=100,tS=101,nS=102,iS=103,rS=104,sS=200,oS=201,aS=202,lS=203,xu=204,bu=205,cS=206,uS=207,dS=208,hS=209,fS=210,pS=211,mS=212,gS=213,_S=214,yu=0,Su=1,Eu=2,Ns=3,Mu=4,wu=5,Tu=6,Au=7,Qg=0,vS=1,xS=2,pi=0,e_=1,t_=2,n_=3,i_=4,r_=5,s_=6,o_=7,a_=300,Vr=301,Is=302,pc=303,mc=304,zl=306,Cu=1e3,Bi=1001,Ru=1002,nn=1003,bS=1004,na=1005,ln=1006,gc=1007,kr=1008,Un=1009,l_=1010,c_=1011,Po=1012,Hd=1013,_i=1014,hi=1015,$i=1016,Vd=1017,Wd=1018,Lo=1020,u_=35902,d_=35899,h_=1021,f_=1022,Qn=1023,Xi=1026,Br=1027,p_=1028,$d=1029,Wr=1030,Xd=1031,jd=1033,Ba=33776,za=33777,Ga=33778,Ha=33779,Pu=35840,Lu=35841,Du=35842,Nu=35843,Iu=36196,Uu=37492,Fu=37496,Ou=37488,ku=37489,cl=37490,Bu=37491,zu=37808,Gu=37809,Hu=37810,Vu=37811,Wu=37812,$u=37813,Xu=37814,ju=37815,Yu=37816,qu=37817,Ku=37818,Zu=37819,Ju=37820,Qu=37821,ed=36492,td=36494,nd=36495,id=36283,rd=36284,ul=36285,sd=36286,yS=3200,Nf=0,SS=1,dr="",Dn="srgb",dl="srgb-linear",hl="linear",dt="srgb",Qr=7680,If=519,ES=512,MS=513,wS=514,Yd=515,TS=516,AS=517,qd=518,CS=519,Uf=35044,hr=35048,Ff="300 es",fi=2e3,fl=2001;function RS(n){for(let e=n.length-1;e>=0;--e)if(n[e]>=65535)return!0;return!1}function pl(n){return document.createElementNS("http://www.w3.org/1999/xhtml",n)}function PS(){const n=pl("canvas");return n.style.display="block",n}const Of={};function kf(...n){const e="THREE."+n.shift();console.log(e,...n)}function m_(n){const e=n[0];if(typeof e=="string"&&e.startsWith("TSL:")){const t=n[1];t&&t.isStackTrace?n[0]+=" "+t.getLocation():n[1]='Stack trace not available. Enable "THREE.Node.captureStackTrace" to capture stack traces.'}return n}function Le(...n){n=m_(n);const e="THREE."+n.shift();{const t=n[0];t&&t.isStackTrace?console.warn(t.getError(e)):console.warn(e,...n)}}function Qe(...n){n=m_(n);const e="THREE."+n.shift();{const t=n[0];t&&t.isStackTrace?console.error(t.getError(e)):console.error(e,...n)}}function od(...n){const e=n.join(" ");e in Of||(Of[e]=!0,Le(...n))}function LS(n,e,t){return new Promise(function(i,r){function s(){switch(n.clientWaitSync(e,n.SYNC_FLUSH_COMMANDS_BIT,0)){case n.WAIT_FAILED:r();break;case n.TIMEOUT_EXPIRED:setTimeout(s,t);break;default:i()}}setTimeout(s,t)})}const DS={[yu]:Su,[Eu]:Tu,[Mu]:Au,[Ns]:wu,[Su]:yu,[Tu]:Eu,[Au]:Mu,[wu]:Ns};class wr{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});const i=this._listeners;i[e]===void 0&&(i[e]=[]),i[e].indexOf(t)===-1&&i[e].push(t)}hasEventListener(e,t){const i=this._listeners;return i===void 0?!1:i[e]!==void 0&&i[e].indexOf(t)!==-1}removeEventListener(e,t){const i=this._listeners;if(i===void 0)return;const r=i[e];if(r!==void 0){const s=r.indexOf(t);s!==-1&&r.splice(s,1)}}dispatchEvent(e){const t=this._listeners;if(t===void 0)return;const i=t[e.type];if(i!==void 0){e.target=this;const r=i.slice(0);for(let s=0,o=r.length;s<o;s++)r[s].call(this,e);e.target=null}}}const on=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],Va=Math.PI/180,ad=180/Math.PI;function Oo(){const n=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,i=Math.random()*4294967295|0;return(on[n&255]+on[n>>8&255]+on[n>>16&255]+on[n>>24&255]+"-"+on[e&255]+on[e>>8&255]+"-"+on[e>>16&15|64]+on[e>>24&255]+"-"+on[t&63|128]+on[t>>8&255]+"-"+on[t>>16&255]+on[t>>24&255]+on[i&255]+on[i>>8&255]+on[i>>16&255]+on[i>>24&255]).toLowerCase()}function Ke(n,e,t){return Math.max(e,Math.min(t,n))}function NS(n,e){return(n%e+e)%e}function _c(n,e,t){return(1-t)*n+t*e}function no(n,e){switch(e.constructor){case Float32Array:return n;case Uint32Array:return n/4294967295;case Uint16Array:return n/65535;case Uint8Array:return n/255;case Int32Array:return Math.max(n/2147483647,-1);case Int16Array:return Math.max(n/32767,-1);case Int8Array:return Math.max(n/127,-1);default:throw new Error("Invalid component type.")}}function _n(n,e){switch(e.constructor){case Float32Array:return n;case Uint32Array:return Math.round(n*4294967295);case Uint16Array:return Math.round(n*65535);case Uint8Array:return Math.round(n*255);case Int32Array:return Math.round(n*2147483647);case Int16Array:return Math.round(n*32767);case Int8Array:return Math.round(n*127);default:throw new Error("Invalid component type.")}}const IS={DEG2RAD:Va},_h=class _h{constructor(e=0,t=0){this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){const t=this.x,i=this.y,r=e.elements;return this.x=r[0]*t+r[3]*i+r[6],this.y=r[1]*t+r[4]*i+r[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=Ke(this.x,e.x,t.x),this.y=Ke(this.y,e.y,t.y),this}clampScalar(e,t){return this.x=Ke(this.x,e,t),this.y=Ke(this.y,e,t),this}clampLength(e,t){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Ke(i,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const i=this.dot(e)/t;return Math.acos(Ke(i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,i=this.y-e.y;return t*t+i*i}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){const i=Math.cos(t),r=Math.sin(t),s=this.x-e.x,o=this.y-e.y;return this.x=s*i-o*r+e.x,this.y=s*r+o*i+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}};_h.prototype.isVector2=!0;let We=_h;class Er{constructor(e=0,t=0,i=0,r=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=i,this._w=r}static slerpFlat(e,t,i,r,s,o,a){let l=i[r+0],c=i[r+1],u=i[r+2],d=i[r+3],h=s[o+0],f=s[o+1],p=s[o+2],_=s[o+3];if(d!==_||l!==h||c!==f||u!==p){let g=l*h+c*f+u*p+d*_;g<0&&(h=-h,f=-f,p=-p,_=-_,g=-g);let m=1-a;if(g<.9995){const v=Math.acos(g),E=Math.sin(v);m=Math.sin(m*v)/E,a=Math.sin(a*v)/E,l=l*m+h*a,c=c*m+f*a,u=u*m+p*a,d=d*m+_*a}else{l=l*m+h*a,c=c*m+f*a,u=u*m+p*a,d=d*m+_*a;const v=1/Math.sqrt(l*l+c*c+u*u+d*d);l*=v,c*=v,u*=v,d*=v}}e[t]=l,e[t+1]=c,e[t+2]=u,e[t+3]=d}static multiplyQuaternionsFlat(e,t,i,r,s,o){const a=i[r],l=i[r+1],c=i[r+2],u=i[r+3],d=s[o],h=s[o+1],f=s[o+2],p=s[o+3];return e[t]=a*p+u*d+l*f-c*h,e[t+1]=l*p+u*h+c*d-a*f,e[t+2]=c*p+u*f+a*h-l*d,e[t+3]=u*p-a*d-l*h-c*f,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,i,r){return this._x=e,this._y=t,this._z=i,this._w=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){const i=e._x,r=e._y,s=e._z,o=e._order,a=Math.cos,l=Math.sin,c=a(i/2),u=a(r/2),d=a(s/2),h=l(i/2),f=l(r/2),p=l(s/2);switch(o){case"XYZ":this._x=h*u*d+c*f*p,this._y=c*f*d-h*u*p,this._z=c*u*p+h*f*d,this._w=c*u*d-h*f*p;break;case"YXZ":this._x=h*u*d+c*f*p,this._y=c*f*d-h*u*p,this._z=c*u*p-h*f*d,this._w=c*u*d+h*f*p;break;case"ZXY":this._x=h*u*d-c*f*p,this._y=c*f*d+h*u*p,this._z=c*u*p+h*f*d,this._w=c*u*d-h*f*p;break;case"ZYX":this._x=h*u*d-c*f*p,this._y=c*f*d+h*u*p,this._z=c*u*p-h*f*d,this._w=c*u*d+h*f*p;break;case"YZX":this._x=h*u*d+c*f*p,this._y=c*f*d+h*u*p,this._z=c*u*p-h*f*d,this._w=c*u*d-h*f*p;break;case"XZY":this._x=h*u*d-c*f*p,this._y=c*f*d-h*u*p,this._z=c*u*p+h*f*d,this._w=c*u*d+h*f*p;break;default:Le("Quaternion: .setFromEuler() encountered an unknown order: "+o)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){const i=t/2,r=Math.sin(i);return this._x=e.x*r,this._y=e.y*r,this._z=e.z*r,this._w=Math.cos(i),this._onChangeCallback(),this}setFromRotationMatrix(e){const t=e.elements,i=t[0],r=t[4],s=t[8],o=t[1],a=t[5],l=t[9],c=t[2],u=t[6],d=t[10],h=i+a+d;if(h>0){const f=.5/Math.sqrt(h+1);this._w=.25/f,this._x=(u-l)*f,this._y=(s-c)*f,this._z=(o-r)*f}else if(i>a&&i>d){const f=2*Math.sqrt(1+i-a-d);this._w=(u-l)/f,this._x=.25*f,this._y=(r+o)/f,this._z=(s+c)/f}else if(a>d){const f=2*Math.sqrt(1+a-i-d);this._w=(s-c)/f,this._x=(r+o)/f,this._y=.25*f,this._z=(l+u)/f}else{const f=2*Math.sqrt(1+d-i-a);this._w=(o-r)/f,this._x=(s+c)/f,this._y=(l+u)/f,this._z=.25*f}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let i=e.dot(t)+1;return i<1e-8?(i=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=i):(this._x=0,this._y=-e.z,this._z=e.y,this._w=i)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=i),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(Ke(this.dot(e),-1,1)))}rotateTowards(e,t){const i=this.angleTo(e);if(i===0)return this;const r=Math.min(1,t/i);return this.slerp(e,r),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){const i=e._x,r=e._y,s=e._z,o=e._w,a=t._x,l=t._y,c=t._z,u=t._w;return this._x=i*u+o*a+r*c-s*l,this._y=r*u+o*l+s*a-i*c,this._z=s*u+o*c+i*l-r*a,this._w=o*u-i*a-r*l-s*c,this._onChangeCallback(),this}slerp(e,t){let i=e._x,r=e._y,s=e._z,o=e._w,a=this.dot(e);a<0&&(i=-i,r=-r,s=-s,o=-o,a=-a);let l=1-t;if(a<.9995){const c=Math.acos(a),u=Math.sin(c);l=Math.sin(l*c)/u,t=Math.sin(t*c)/u,this._x=this._x*l+i*t,this._y=this._y*l+r*t,this._z=this._z*l+s*t,this._w=this._w*l+o*t,this._onChangeCallback()}else this._x=this._x*l+i*t,this._y=this._y*l+r*t,this._z=this._z*l+s*t,this._w=this._w*l+o*t,this.normalize();return this}slerpQuaternions(e,t,i){return this.copy(e).slerp(t,i)}random(){const e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),i=Math.random(),r=Math.sqrt(1-i),s=Math.sqrt(i);return this.set(r*Math.sin(e),r*Math.cos(e),s*Math.sin(t),s*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}const vh=class vh{constructor(e=0,t=0,i=0){this.x=e,this.y=t,this.z=i}set(e,t,i){return i===void 0&&(i=this.z),this.x=e,this.y=t,this.z=i,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(Bf.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(Bf.setFromAxisAngle(e,t))}applyMatrix3(e){const t=this.x,i=this.y,r=this.z,s=e.elements;return this.x=s[0]*t+s[3]*i+s[6]*r,this.y=s[1]*t+s[4]*i+s[7]*r,this.z=s[2]*t+s[5]*i+s[8]*r,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){const t=this.x,i=this.y,r=this.z,s=e.elements,o=1/(s[3]*t+s[7]*i+s[11]*r+s[15]);return this.x=(s[0]*t+s[4]*i+s[8]*r+s[12])*o,this.y=(s[1]*t+s[5]*i+s[9]*r+s[13])*o,this.z=(s[2]*t+s[6]*i+s[10]*r+s[14])*o,this}applyQuaternion(e){const t=this.x,i=this.y,r=this.z,s=e.x,o=e.y,a=e.z,l=e.w,c=2*(o*r-a*i),u=2*(a*t-s*r),d=2*(s*i-o*t);return this.x=t+l*c+o*d-a*u,this.y=i+l*u+a*c-s*d,this.z=r+l*d+s*u-o*c,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){const t=this.x,i=this.y,r=this.z,s=e.elements;return this.x=s[0]*t+s[4]*i+s[8]*r,this.y=s[1]*t+s[5]*i+s[9]*r,this.z=s[2]*t+s[6]*i+s[10]*r,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=Ke(this.x,e.x,t.x),this.y=Ke(this.y,e.y,t.y),this.z=Ke(this.z,e.z,t.z),this}clampScalar(e,t){return this.x=Ke(this.x,e,t),this.y=Ke(this.y,e,t),this.z=Ke(this.z,e,t),this}clampLength(e,t){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Ke(i,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this.z=e.z+(t.z-e.z)*i,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){const i=e.x,r=e.y,s=e.z,o=t.x,a=t.y,l=t.z;return this.x=r*l-s*a,this.y=s*o-i*l,this.z=i*a-r*o,this}projectOnVector(e){const t=e.lengthSq();if(t===0)return this.set(0,0,0);const i=e.dot(this)/t;return this.copy(e).multiplyScalar(i)}projectOnPlane(e){return vc.copy(this).projectOnVector(e),this.sub(vc)}reflect(e){return this.sub(vc.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const i=this.dot(e)/t;return Math.acos(Ke(i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,i=this.y-e.y,r=this.z-e.z;return t*t+i*i+r*r}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,i){const r=Math.sin(t)*e;return this.x=r*Math.sin(i),this.y=Math.cos(t)*e,this.z=r*Math.cos(i),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,i){return this.x=e*Math.sin(t),this.y=i,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){const t=this.setFromMatrixColumn(e,0).length(),i=this.setFromMatrixColumn(e,1).length(),r=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=i,this.z=r,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const e=Math.random()*Math.PI*2,t=Math.random()*2-1,i=Math.sqrt(1-t*t);return this.x=i*Math.cos(e),this.y=t,this.z=i*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}};vh.prototype.isVector3=!0;let N=vh;const vc=new N,Bf=new Er,xh=class xh{constructor(e,t,i,r,s,o,a,l,c){this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,i,r,s,o,a,l,c)}set(e,t,i,r,s,o,a,l,c){const u=this.elements;return u[0]=e,u[1]=r,u[2]=a,u[3]=t,u[4]=s,u[5]=l,u[6]=i,u[7]=o,u[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){const t=this.elements,i=e.elements;return t[0]=i[0],t[1]=i[1],t[2]=i[2],t[3]=i[3],t[4]=i[4],t[5]=i[5],t[6]=i[6],t[7]=i[7],t[8]=i[8],this}extractBasis(e,t,i){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),i.setFromMatrix3Column(this,2),this}setFromMatrix4(e){const t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const i=e.elements,r=t.elements,s=this.elements,o=i[0],a=i[3],l=i[6],c=i[1],u=i[4],d=i[7],h=i[2],f=i[5],p=i[8],_=r[0],g=r[3],m=r[6],v=r[1],E=r[4],x=r[7],w=r[2],S=r[5],C=r[8];return s[0]=o*_+a*v+l*w,s[3]=o*g+a*E+l*S,s[6]=o*m+a*x+l*C,s[1]=c*_+u*v+d*w,s[4]=c*g+u*E+d*S,s[7]=c*m+u*x+d*C,s[2]=h*_+f*v+p*w,s[5]=h*g+f*E+p*S,s[8]=h*m+f*x+p*C,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){const e=this.elements,t=e[0],i=e[1],r=e[2],s=e[3],o=e[4],a=e[5],l=e[6],c=e[7],u=e[8];return t*o*u-t*a*c-i*s*u+i*a*l+r*s*c-r*o*l}invert(){const e=this.elements,t=e[0],i=e[1],r=e[2],s=e[3],o=e[4],a=e[5],l=e[6],c=e[7],u=e[8],d=u*o-a*c,h=a*l-u*s,f=c*s-o*l,p=t*d+i*h+r*f;if(p===0)return this.set(0,0,0,0,0,0,0,0,0);const _=1/p;return e[0]=d*_,e[1]=(r*c-u*i)*_,e[2]=(a*i-r*o)*_,e[3]=h*_,e[4]=(u*t-r*l)*_,e[5]=(r*s-a*t)*_,e[6]=f*_,e[7]=(i*l-c*t)*_,e[8]=(o*t-i*s)*_,this}transpose(){let e;const t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){const t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,i,r,s,o,a){const l=Math.cos(s),c=Math.sin(s);return this.set(i*l,i*c,-i*(l*o+c*a)+o+e,-r*c,r*l,-r*(-c*o+l*a)+a+t,0,0,1),this}scale(e,t){return this.premultiply(xc.makeScale(e,t)),this}rotate(e){return this.premultiply(xc.makeRotation(-e)),this}translate(e,t){return this.premultiply(xc.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){const t=Math.cos(e),i=Math.sin(e);return this.set(t,-i,0,i,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){const t=this.elements,i=e.elements;for(let r=0;r<9;r++)if(t[r]!==i[r])return!1;return!0}fromArray(e,t=0){for(let i=0;i<9;i++)this.elements[i]=e[i+t];return this}toArray(e=[],t=0){const i=this.elements;return e[t]=i[0],e[t+1]=i[1],e[t+2]=i[2],e[t+3]=i[3],e[t+4]=i[4],e[t+5]=i[5],e[t+6]=i[6],e[t+7]=i[7],e[t+8]=i[8],e}clone(){return new this.constructor().fromArray(this.elements)}};xh.prototype.isMatrix3=!0;let ze=xh;const xc=new ze,zf=new ze().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),Gf=new ze().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function US(){const n={enabled:!0,workingColorSpace:dl,spaces:{},convert:function(r,s,o){return this.enabled===!1||s===o||!s||!o||(this.spaces[s].transfer===dt&&(r.r=Wi(r.r),r.g=Wi(r.g),r.b=Wi(r.b)),this.spaces[s].primaries!==this.spaces[o].primaries&&(r.applyMatrix3(this.spaces[s].toXYZ),r.applyMatrix3(this.spaces[o].fromXYZ)),this.spaces[o].transfer===dt&&(r.r=Ts(r.r),r.g=Ts(r.g),r.b=Ts(r.b))),r},workingToColorSpace:function(r,s){return this.convert(r,this.workingColorSpace,s)},colorSpaceToWorking:function(r,s){return this.convert(r,s,this.workingColorSpace)},getPrimaries:function(r){return this.spaces[r].primaries},getTransfer:function(r){return r===dr?hl:this.spaces[r].transfer},getToneMappingMode:function(r){return this.spaces[r].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(r,s=this.workingColorSpace){return r.fromArray(this.spaces[s].luminanceCoefficients)},define:function(r){Object.assign(this.spaces,r)},_getMatrix:function(r,s,o){return r.copy(this.spaces[s].toXYZ).multiply(this.spaces[o].fromXYZ)},_getDrawingBufferColorSpace:function(r){return this.spaces[r].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(r=this.workingColorSpace){return this.spaces[r].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(r,s){return od("ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),n.workingToColorSpace(r,s)},toWorkingColorSpace:function(r,s){return od("ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),n.colorSpaceToWorking(r,s)}},e=[.64,.33,.3,.6,.15,.06],t=[.2126,.7152,.0722],i=[.3127,.329];return n.define({[dl]:{primaries:e,whitePoint:i,transfer:hl,toXYZ:zf,fromXYZ:Gf,luminanceCoefficients:t,workingColorSpaceConfig:{unpackColorSpace:Dn},outputColorSpaceConfig:{drawingBufferColorSpace:Dn}},[Dn]:{primaries:e,whitePoint:i,transfer:dt,toXYZ:zf,fromXYZ:Gf,luminanceCoefficients:t,outputColorSpaceConfig:{drawingBufferColorSpace:Dn}}}),n}const Je=US();function Wi(n){return n<.04045?n*.0773993808:Math.pow(n*.9478672986+.0521327014,2.4)}function Ts(n){return n<.0031308?n*12.92:1.055*Math.pow(n,.41666)-.055}let es;class FS{static getDataURL(e,t="image/png"){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let i;if(e instanceof HTMLCanvasElement)i=e;else{es===void 0&&(es=pl("canvas")),es.width=e.width,es.height=e.height;const r=es.getContext("2d");e instanceof ImageData?r.putImageData(e,0,0):r.drawImage(e,0,0,e.width,e.height),i=es}return i.toDataURL(t)}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){const t=pl("canvas");t.width=e.width,t.height=e.height;const i=t.getContext("2d");i.drawImage(e,0,0,e.width,e.height);const r=i.getImageData(0,0,e.width,e.height),s=r.data;for(let o=0;o<s.length;o++)s[o]=Wi(s[o]/255)*255;return i.putImageData(r,0,0),t}else if(e.data){const t=e.data.slice(0);for(let i=0;i<t.length;i++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[i]=Math.floor(Wi(t[i]/255)*255):t[i]=Wi(t[i]);return{data:t,width:e.width,height:e.height}}else return Le("ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}}let OS=0;class Kd{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:OS++}),this.uuid=Oo(),this.data=e,this.dataReady=!0,this.version=0}getSize(e){const t=this.data;return typeof HTMLVideoElement<"u"&&t instanceof HTMLVideoElement?e.set(t.videoWidth,t.videoHeight,0):typeof VideoFrame<"u"&&t instanceof VideoFrame?e.set(t.displayWidth,t.displayHeight,0):t!==null?e.set(t.width,t.height,t.depth||0):e.set(0,0,0),e}set needsUpdate(e){e===!0&&this.version++}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];const i={uuid:this.uuid,url:""},r=this.data;if(r!==null){let s;if(Array.isArray(r)){s=[];for(let o=0,a=r.length;o<a;o++)r[o].isDataTexture?s.push(bc(r[o].image)):s.push(bc(r[o]))}else s=bc(r);i.url=s}return t||(e.images[this.uuid]=i),i}}function bc(n){return typeof HTMLImageElement<"u"&&n instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&n instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&n instanceof ImageBitmap?FS.getDataURL(n):n.data?{data:Array.from(n.data),width:n.width,height:n.height,type:n.data.constructor.name}:(Le("Texture: Unable to serialize Texture."),{})}let kS=0;const yc=new N;class cn extends wr{constructor(e=cn.DEFAULT_IMAGE,t=cn.DEFAULT_MAPPING,i=Bi,r=Bi,s=ln,o=kr,a=Qn,l=Un,c=cn.DEFAULT_ANISOTROPY,u=dr){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:kS++}),this.uuid=Oo(),this.name="",this.source=new Kd(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=i,this.wrapT=r,this.magFilter=s,this.minFilter=o,this.anisotropy=c,this.format=a,this.internalFormat=null,this.type=l,this.offset=new We(0,0),this.repeat=new We(1,1),this.center=new We(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new ze,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=u,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(e&&e.depth&&e.depth>1),this.pmremVersion=0,this.normalized=!1}get width(){return this.source.getSize(yc).x}get height(){return this.source.getSize(yc).y}get depth(){return this.source.getSize(yc).z}get image(){return this.source.data}set image(e){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.normalized=e.normalized,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.renderTarget=e.renderTarget,this.isRenderTargetTexture=e.isRenderTargetTexture,this.isArrayTexture=e.isArrayTexture,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}setValues(e){for(const t in e){const i=e[t];if(i===void 0){Le(`Texture.setValues(): parameter '${t}' has value of undefined.`);continue}const r=this[t];if(r===void 0){Le(`Texture.setValues(): property '${t}' does not exist.`);continue}r&&i&&r.isVector2&&i.isVector2||r&&i&&r.isVector3&&i.isVector3||r&&i&&r.isMatrix3&&i.isMatrix3?r.copy(i):this[t]=i}}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];const i={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,normalized:this.normalized,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(i.userData=this.userData),t||(e.textures[this.uuid]=i),i}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==a_)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case Cu:e.x=e.x-Math.floor(e.x);break;case Bi:e.x=e.x<0?0:1;break;case Ru:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case Cu:e.y=e.y-Math.floor(e.y);break;case Bi:e.y=e.y<0?0:1;break;case Ru:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}}cn.DEFAULT_IMAGE=null;cn.DEFAULT_MAPPING=a_;cn.DEFAULT_ANISOTROPY=1;const bh=class bh{constructor(e=0,t=0,i=0,r=1){this.x=e,this.y=t,this.z=i,this.w=r}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,i,r){return this.x=e,this.y=t,this.z=i,this.w=r,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){const t=this.x,i=this.y,r=this.z,s=this.w,o=e.elements;return this.x=o[0]*t+o[4]*i+o[8]*r+o[12]*s,this.y=o[1]*t+o[5]*i+o[9]*r+o[13]*s,this.z=o[2]*t+o[6]*i+o[10]*r+o[14]*s,this.w=o[3]*t+o[7]*i+o[11]*r+o[15]*s,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);const t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,i,r,s;const l=e.elements,c=l[0],u=l[4],d=l[8],h=l[1],f=l[5],p=l[9],_=l[2],g=l[6],m=l[10];if(Math.abs(u-h)<.01&&Math.abs(d-_)<.01&&Math.abs(p-g)<.01){if(Math.abs(u+h)<.1&&Math.abs(d+_)<.1&&Math.abs(p+g)<.1&&Math.abs(c+f+m-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;const E=(c+1)/2,x=(f+1)/2,w=(m+1)/2,S=(u+h)/4,C=(d+_)/4,b=(p+g)/4;return E>x&&E>w?E<.01?(i=0,r=.707106781,s=.707106781):(i=Math.sqrt(E),r=S/i,s=C/i):x>w?x<.01?(i=.707106781,r=0,s=.707106781):(r=Math.sqrt(x),i=S/r,s=b/r):w<.01?(i=.707106781,r=.707106781,s=0):(s=Math.sqrt(w),i=C/s,r=b/s),this.set(i,r,s,t),this}let v=Math.sqrt((g-p)*(g-p)+(d-_)*(d-_)+(h-u)*(h-u));return Math.abs(v)<.001&&(v=1),this.x=(g-p)/v,this.y=(d-_)/v,this.z=(h-u)/v,this.w=Math.acos((c+f+m-1)/2),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=Ke(this.x,e.x,t.x),this.y=Ke(this.y,e.y,t.y),this.z=Ke(this.z,e.z,t.z),this.w=Ke(this.w,e.w,t.w),this}clampScalar(e,t){return this.x=Ke(this.x,e,t),this.y=Ke(this.y,e,t),this.z=Ke(this.z,e,t),this.w=Ke(this.w,e,t),this}clampLength(e,t){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Ke(i,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this.z=e.z+(t.z-e.z)*i,this.w=e.w+(t.w-e.w)*i,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}};bh.prototype.isVector4=!0;let Bt=bh;class BS extends wr{constructor(e=1,t=1,i={}){super(),i=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:ln,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1},i),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=i.depth,this.scissor=new Bt(0,0,e,t),this.scissorTest=!1,this.viewport=new Bt(0,0,e,t),this.textures=[];const r={width:e,height:t,depth:i.depth},s=new cn(r),o=i.count;for(let a=0;a<o;a++)this.textures[a]=s.clone(),this.textures[a].isRenderTargetTexture=!0,this.textures[a].renderTarget=this;this._setTextureOptions(i),this.depthBuffer=i.depthBuffer,this.stencilBuffer=i.stencilBuffer,this.resolveDepthBuffer=i.resolveDepthBuffer,this.resolveStencilBuffer=i.resolveStencilBuffer,this._depthTexture=null,this.depthTexture=i.depthTexture,this.samples=i.samples,this.multiview=i.multiview}_setTextureOptions(e={}){const t={minFilter:ln,generateMipmaps:!1,flipY:!1,internalFormat:null};e.mapping!==void 0&&(t.mapping=e.mapping),e.wrapS!==void 0&&(t.wrapS=e.wrapS),e.wrapT!==void 0&&(t.wrapT=e.wrapT),e.wrapR!==void 0&&(t.wrapR=e.wrapR),e.magFilter!==void 0&&(t.magFilter=e.magFilter),e.minFilter!==void 0&&(t.minFilter=e.minFilter),e.format!==void 0&&(t.format=e.format),e.type!==void 0&&(t.type=e.type),e.anisotropy!==void 0&&(t.anisotropy=e.anisotropy),e.colorSpace!==void 0&&(t.colorSpace=e.colorSpace),e.flipY!==void 0&&(t.flipY=e.flipY),e.generateMipmaps!==void 0&&(t.generateMipmaps=e.generateMipmaps),e.internalFormat!==void 0&&(t.internalFormat=e.internalFormat);for(let i=0;i<this.textures.length;i++)this.textures[i].setValues(t)}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}set depthTexture(e){this._depthTexture!==null&&(this._depthTexture.renderTarget=null),e!==null&&(e.renderTarget=this),this._depthTexture=e}get depthTexture(){return this._depthTexture}setSize(e,t,i=1){if(this.width!==e||this.height!==t||this.depth!==i){this.width=e,this.height=t,this.depth=i;for(let r=0,s=this.textures.length;r<s;r++)this.textures[r].image.width=e,this.textures[r].image.height=t,this.textures[r].image.depth=i,this.textures[r].isData3DTexture!==!0&&(this.textures[r].isArrayTexture=this.textures[r].image.depth>1);this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let t=0,i=e.textures.length;t<i;t++){this.textures[t]=e.textures[t].clone(),this.textures[t].isRenderTargetTexture=!0,this.textures[t].renderTarget=this;const r=Object.assign({},e.textures[t].image);this.textures[t].source=new Kd(r)}return this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this.multiview=e.multiview,this}dispose(){this.dispatchEvent({type:"dispose"})}}class mi extends BS{constructor(e=1,t=1,i={}){super(e,t,i),this.isWebGLRenderTarget=!0}}class g_ extends cn{constructor(e=null,t=1,i=1,r=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:i,depth:r},this.magFilter=nn,this.minFilter=nn,this.wrapR=Bi,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}}class zS extends cn{constructor(e=null,t=1,i=1,r=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:i,depth:r},this.magFilter=nn,this.minFilter=nn,this.wrapR=Bi,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}const El=class El{constructor(e,t,i,r,s,o,a,l,c,u,d,h,f,p,_,g){this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,i,r,s,o,a,l,c,u,d,h,f,p,_,g)}set(e,t,i,r,s,o,a,l,c,u,d,h,f,p,_,g){const m=this.elements;return m[0]=e,m[4]=t,m[8]=i,m[12]=r,m[1]=s,m[5]=o,m[9]=a,m[13]=l,m[2]=c,m[6]=u,m[10]=d,m[14]=h,m[3]=f,m[7]=p,m[11]=_,m[15]=g,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new El().fromArray(this.elements)}copy(e){const t=this.elements,i=e.elements;return t[0]=i[0],t[1]=i[1],t[2]=i[2],t[3]=i[3],t[4]=i[4],t[5]=i[5],t[6]=i[6],t[7]=i[7],t[8]=i[8],t[9]=i[9],t[10]=i[10],t[11]=i[11],t[12]=i[12],t[13]=i[13],t[14]=i[14],t[15]=i[15],this}copyPosition(e){const t=this.elements,i=e.elements;return t[12]=i[12],t[13]=i[13],t[14]=i[14],this}setFromMatrix3(e){const t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,i){return this.determinant()===0?(e.set(1,0,0),t.set(0,1,0),i.set(0,0,1),this):(e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),i.setFromMatrixColumn(this,2),this)}makeBasis(e,t,i){return this.set(e.x,t.x,i.x,0,e.y,t.y,i.y,0,e.z,t.z,i.z,0,0,0,0,1),this}extractRotation(e){if(e.determinant()===0)return this.identity();const t=this.elements,i=e.elements,r=1/ts.setFromMatrixColumn(e,0).length(),s=1/ts.setFromMatrixColumn(e,1).length(),o=1/ts.setFromMatrixColumn(e,2).length();return t[0]=i[0]*r,t[1]=i[1]*r,t[2]=i[2]*r,t[3]=0,t[4]=i[4]*s,t[5]=i[5]*s,t[6]=i[6]*s,t[7]=0,t[8]=i[8]*o,t[9]=i[9]*o,t[10]=i[10]*o,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){const t=this.elements,i=e.x,r=e.y,s=e.z,o=Math.cos(i),a=Math.sin(i),l=Math.cos(r),c=Math.sin(r),u=Math.cos(s),d=Math.sin(s);if(e.order==="XYZ"){const h=o*u,f=o*d,p=a*u,_=a*d;t[0]=l*u,t[4]=-l*d,t[8]=c,t[1]=f+p*c,t[5]=h-_*c,t[9]=-a*l,t[2]=_-h*c,t[6]=p+f*c,t[10]=o*l}else if(e.order==="YXZ"){const h=l*u,f=l*d,p=c*u,_=c*d;t[0]=h+_*a,t[4]=p*a-f,t[8]=o*c,t[1]=o*d,t[5]=o*u,t[9]=-a,t[2]=f*a-p,t[6]=_+h*a,t[10]=o*l}else if(e.order==="ZXY"){const h=l*u,f=l*d,p=c*u,_=c*d;t[0]=h-_*a,t[4]=-o*d,t[8]=p+f*a,t[1]=f+p*a,t[5]=o*u,t[9]=_-h*a,t[2]=-o*c,t[6]=a,t[10]=o*l}else if(e.order==="ZYX"){const h=o*u,f=o*d,p=a*u,_=a*d;t[0]=l*u,t[4]=p*c-f,t[8]=h*c+_,t[1]=l*d,t[5]=_*c+h,t[9]=f*c-p,t[2]=-c,t[6]=a*l,t[10]=o*l}else if(e.order==="YZX"){const h=o*l,f=o*c,p=a*l,_=a*c;t[0]=l*u,t[4]=_-h*d,t[8]=p*d+f,t[1]=d,t[5]=o*u,t[9]=-a*u,t[2]=-c*u,t[6]=f*d+p,t[10]=h-_*d}else if(e.order==="XZY"){const h=o*l,f=o*c,p=a*l,_=a*c;t[0]=l*u,t[4]=-d,t[8]=c*u,t[1]=h*d+_,t[5]=o*u,t[9]=f*d-p,t[2]=p*d-f,t[6]=a*u,t[10]=_*d+h}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(GS,e,HS)}lookAt(e,t,i){const r=this.elements;return En.subVectors(e,t),En.lengthSq()===0&&(En.z=1),En.normalize(),tr.crossVectors(i,En),tr.lengthSq()===0&&(Math.abs(i.z)===1?En.x+=1e-4:En.z+=1e-4,En.normalize(),tr.crossVectors(i,En)),tr.normalize(),ia.crossVectors(En,tr),r[0]=tr.x,r[4]=ia.x,r[8]=En.x,r[1]=tr.y,r[5]=ia.y,r[9]=En.y,r[2]=tr.z,r[6]=ia.z,r[10]=En.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const i=e.elements,r=t.elements,s=this.elements,o=i[0],a=i[4],l=i[8],c=i[12],u=i[1],d=i[5],h=i[9],f=i[13],p=i[2],_=i[6],g=i[10],m=i[14],v=i[3],E=i[7],x=i[11],w=i[15],S=r[0],C=r[4],b=r[8],T=r[12],L=r[1],P=r[5],F=r[9],W=r[13],$=r[2],U=r[6],B=r[10],H=r[14],Z=r[3],J=r[7],ne=r[11],de=r[15];return s[0]=o*S+a*L+l*$+c*Z,s[4]=o*C+a*P+l*U+c*J,s[8]=o*b+a*F+l*B+c*ne,s[12]=o*T+a*W+l*H+c*de,s[1]=u*S+d*L+h*$+f*Z,s[5]=u*C+d*P+h*U+f*J,s[9]=u*b+d*F+h*B+f*ne,s[13]=u*T+d*W+h*H+f*de,s[2]=p*S+_*L+g*$+m*Z,s[6]=p*C+_*P+g*U+m*J,s[10]=p*b+_*F+g*B+m*ne,s[14]=p*T+_*W+g*H+m*de,s[3]=v*S+E*L+x*$+w*Z,s[7]=v*C+E*P+x*U+w*J,s[11]=v*b+E*F+x*B+w*ne,s[15]=v*T+E*W+x*H+w*de,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){const e=this.elements,t=e[0],i=e[4],r=e[8],s=e[12],o=e[1],a=e[5],l=e[9],c=e[13],u=e[2],d=e[6],h=e[10],f=e[14],p=e[3],_=e[7],g=e[11],m=e[15],v=l*f-c*h,E=a*f-c*d,x=a*h-l*d,w=o*f-c*u,S=o*h-l*u,C=o*d-a*u;return t*(_*v-g*E+m*x)-i*(p*v-g*w+m*S)+r*(p*E-_*w+m*C)-s*(p*x-_*S+g*C)}transpose(){const e=this.elements;let t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,i){const r=this.elements;return e.isVector3?(r[12]=e.x,r[13]=e.y,r[14]=e.z):(r[12]=e,r[13]=t,r[14]=i),this}invert(){const e=this.elements,t=e[0],i=e[1],r=e[2],s=e[3],o=e[4],a=e[5],l=e[6],c=e[7],u=e[8],d=e[9],h=e[10],f=e[11],p=e[12],_=e[13],g=e[14],m=e[15],v=t*a-i*o,E=t*l-r*o,x=t*c-s*o,w=i*l-r*a,S=i*c-s*a,C=r*c-s*l,b=u*_-d*p,T=u*g-h*p,L=u*m-f*p,P=d*g-h*_,F=d*m-f*_,W=h*m-f*g,$=v*W-E*F+x*P+w*L-S*T+C*b;if($===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const U=1/$;return e[0]=(a*W-l*F+c*P)*U,e[1]=(r*F-i*W-s*P)*U,e[2]=(_*C-g*S+m*w)*U,e[3]=(h*S-d*C-f*w)*U,e[4]=(l*L-o*W-c*T)*U,e[5]=(t*W-r*L+s*T)*U,e[6]=(g*x-p*C-m*E)*U,e[7]=(u*C-h*x+f*E)*U,e[8]=(o*F-a*L+c*b)*U,e[9]=(i*L-t*F-s*b)*U,e[10]=(p*S-_*x+m*v)*U,e[11]=(d*x-u*S-f*v)*U,e[12]=(a*T-o*P-l*b)*U,e[13]=(t*P-i*T+r*b)*U,e[14]=(_*E-p*w-g*v)*U,e[15]=(u*w-d*E+h*v)*U,this}scale(e){const t=this.elements,i=e.x,r=e.y,s=e.z;return t[0]*=i,t[4]*=r,t[8]*=s,t[1]*=i,t[5]*=r,t[9]*=s,t[2]*=i,t[6]*=r,t[10]*=s,t[3]*=i,t[7]*=r,t[11]*=s,this}getMaxScaleOnAxis(){const e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],i=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],r=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,i,r))}makeTranslation(e,t,i){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,i,0,0,0,1),this}makeRotationX(e){const t=Math.cos(e),i=Math.sin(e);return this.set(1,0,0,0,0,t,-i,0,0,i,t,0,0,0,0,1),this}makeRotationY(e){const t=Math.cos(e),i=Math.sin(e);return this.set(t,0,i,0,0,1,0,0,-i,0,t,0,0,0,0,1),this}makeRotationZ(e){const t=Math.cos(e),i=Math.sin(e);return this.set(t,-i,0,0,i,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){const i=Math.cos(t),r=Math.sin(t),s=1-i,o=e.x,a=e.y,l=e.z,c=s*o,u=s*a;return this.set(c*o+i,c*a-r*l,c*l+r*a,0,c*a+r*l,u*a+i,u*l-r*o,0,c*l-r*a,u*l+r*o,s*l*l+i,0,0,0,0,1),this}makeScale(e,t,i){return this.set(e,0,0,0,0,t,0,0,0,0,i,0,0,0,0,1),this}makeShear(e,t,i,r,s,o){return this.set(1,i,s,0,e,1,o,0,t,r,1,0,0,0,0,1),this}compose(e,t,i){const r=this.elements,s=t._x,o=t._y,a=t._z,l=t._w,c=s+s,u=o+o,d=a+a,h=s*c,f=s*u,p=s*d,_=o*u,g=o*d,m=a*d,v=l*c,E=l*u,x=l*d,w=i.x,S=i.y,C=i.z;return r[0]=(1-(_+m))*w,r[1]=(f+x)*w,r[2]=(p-E)*w,r[3]=0,r[4]=(f-x)*S,r[5]=(1-(h+m))*S,r[6]=(g+v)*S,r[7]=0,r[8]=(p+E)*C,r[9]=(g-v)*C,r[10]=(1-(h+_))*C,r[11]=0,r[12]=e.x,r[13]=e.y,r[14]=e.z,r[15]=1,this}decompose(e,t,i){const r=this.elements;e.x=r[12],e.y=r[13],e.z=r[14];const s=this.determinant();if(s===0)return i.set(1,1,1),t.identity(),this;let o=ts.set(r[0],r[1],r[2]).length();const a=ts.set(r[4],r[5],r[6]).length(),l=ts.set(r[8],r[9],r[10]).length();s<0&&(o=-o),Vn.copy(this);const c=1/o,u=1/a,d=1/l;return Vn.elements[0]*=c,Vn.elements[1]*=c,Vn.elements[2]*=c,Vn.elements[4]*=u,Vn.elements[5]*=u,Vn.elements[6]*=u,Vn.elements[8]*=d,Vn.elements[9]*=d,Vn.elements[10]*=d,t.setFromRotationMatrix(Vn),i.x=o,i.y=a,i.z=l,this}makePerspective(e,t,i,r,s,o,a=fi,l=!1){const c=this.elements,u=2*s/(t-e),d=2*s/(i-r),h=(t+e)/(t-e),f=(i+r)/(i-r);let p,_;if(l)p=s/(o-s),_=o*s/(o-s);else if(a===fi)p=-(o+s)/(o-s),_=-2*o*s/(o-s);else if(a===fl)p=-o/(o-s),_=-o*s/(o-s);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+a);return c[0]=u,c[4]=0,c[8]=h,c[12]=0,c[1]=0,c[5]=d,c[9]=f,c[13]=0,c[2]=0,c[6]=0,c[10]=p,c[14]=_,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(e,t,i,r,s,o,a=fi,l=!1){const c=this.elements,u=2/(t-e),d=2/(i-r),h=-(t+e)/(t-e),f=-(i+r)/(i-r);let p,_;if(l)p=1/(o-s),_=o/(o-s);else if(a===fi)p=-2/(o-s),_=-(o+s)/(o-s);else if(a===fl)p=-1/(o-s),_=-s/(o-s);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+a);return c[0]=u,c[4]=0,c[8]=0,c[12]=h,c[1]=0,c[5]=d,c[9]=0,c[13]=f,c[2]=0,c[6]=0,c[10]=p,c[14]=_,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(e){const t=this.elements,i=e.elements;for(let r=0;r<16;r++)if(t[r]!==i[r])return!1;return!0}fromArray(e,t=0){for(let i=0;i<16;i++)this.elements[i]=e[i+t];return this}toArray(e=[],t=0){const i=this.elements;return e[t]=i[0],e[t+1]=i[1],e[t+2]=i[2],e[t+3]=i[3],e[t+4]=i[4],e[t+5]=i[5],e[t+6]=i[6],e[t+7]=i[7],e[t+8]=i[8],e[t+9]=i[9],e[t+10]=i[10],e[t+11]=i[11],e[t+12]=i[12],e[t+13]=i[13],e[t+14]=i[14],e[t+15]=i[15],e}};El.prototype.isMatrix4=!0;let Ct=El;const ts=new N,Vn=new Ct,GS=new N(0,0,0),HS=new N(1,1,1),tr=new N,ia=new N,En=new N,Hf=new Ct,Vf=new Er;class $r{constructor(e=0,t=0,i=0,r=$r.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=i,this._order=r}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,i,r=this._order){return this._x=e,this._y=t,this._z=i,this._order=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,i=!0){const r=e.elements,s=r[0],o=r[4],a=r[8],l=r[1],c=r[5],u=r[9],d=r[2],h=r[6],f=r[10];switch(t){case"XYZ":this._y=Math.asin(Ke(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(-u,f),this._z=Math.atan2(-o,s)):(this._x=Math.atan2(h,c),this._z=0);break;case"YXZ":this._x=Math.asin(-Ke(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(a,f),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-d,s),this._z=0);break;case"ZXY":this._x=Math.asin(Ke(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(-d,f),this._z=Math.atan2(-o,c)):(this._y=0,this._z=Math.atan2(l,s));break;case"ZYX":this._y=Math.asin(-Ke(d,-1,1)),Math.abs(d)<.9999999?(this._x=Math.atan2(h,f),this._z=Math.atan2(l,s)):(this._x=0,this._z=Math.atan2(-o,c));break;case"YZX":this._z=Math.asin(Ke(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-u,c),this._y=Math.atan2(-d,s)):(this._x=0,this._y=Math.atan2(a,f));break;case"XZY":this._z=Math.asin(-Ke(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(h,c),this._y=Math.atan2(a,s)):(this._x=Math.atan2(-u,f),this._y=0);break;default:Le("Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,i===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,i){return Hf.makeRotationFromQuaternion(e),this.setFromRotationMatrix(Hf,t,i)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return Vf.setFromEuler(this),this.setFromQuaternion(Vf,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}$r.DEFAULT_ORDER="XYZ";class Zd{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}}let VS=0;const Wf=new N,ns=new Er,yi=new Ct,ra=new N,io=new N,WS=new N,$S=new Er,$f=new N(1,0,0),Xf=new N(0,1,0),jf=new N(0,0,1),Yf={type:"added"},XS={type:"removed"},is={type:"childadded",child:null},Sc={type:"childremoved",child:null};class gn extends wr{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:VS++}),this.uuid=Oo(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=gn.DEFAULT_UP.clone();const e=new N,t=new $r,i=new Er,r=new N(1,1,1);function s(){i.setFromEuler(t,!1)}function o(){t.setFromQuaternion(i,void 0,!1)}t._onChange(s),i._onChange(o),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:i},scale:{configurable:!0,enumerable:!0,value:r},modelViewMatrix:{value:new Ct},normalMatrix:{value:new ze}}),this.matrix=new Ct,this.matrixWorld=new Ct,this.matrixAutoUpdate=gn.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=gn.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Zd,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.static=!1,this.userData={},this.pivot=null}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return ns.setFromAxisAngle(e,t),this.quaternion.multiply(ns),this}rotateOnWorldAxis(e,t){return ns.setFromAxisAngle(e,t),this.quaternion.premultiply(ns),this}rotateX(e){return this.rotateOnAxis($f,e)}rotateY(e){return this.rotateOnAxis(Xf,e)}rotateZ(e){return this.rotateOnAxis(jf,e)}translateOnAxis(e,t){return Wf.copy(e).applyQuaternion(this.quaternion),this.position.add(Wf.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis($f,e)}translateY(e){return this.translateOnAxis(Xf,e)}translateZ(e){return this.translateOnAxis(jf,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(yi.copy(this.matrixWorld).invert())}lookAt(e,t,i){e.isVector3?ra.copy(e):ra.set(e,t,i);const r=this.parent;this.updateWorldMatrix(!0,!1),io.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?yi.lookAt(io,ra,this.up):yi.lookAt(ra,io,this.up),this.quaternion.setFromRotationMatrix(yi),r&&(yi.extractRotation(r.matrixWorld),ns.setFromRotationMatrix(yi),this.quaternion.premultiply(ns.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(Qe("Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(Yf),is.child=e,this.dispatchEvent(is),is.child=null):Qe("Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let i=0;i<arguments.length;i++)this.remove(arguments[i]);return this}const t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(XS),Sc.child=e,this.dispatchEvent(Sc),Sc.child=null),this}removeFromParent(){const e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),yi.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),yi.multiply(e.parent.matrixWorld)),e.applyMatrix4(yi),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(Yf),is.child=e,this.dispatchEvent(is),is.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let i=0,r=this.children.length;i<r;i++){const o=this.children[i].getObjectByProperty(e,t);if(o!==void 0)return o}}getObjectsByProperty(e,t,i=[]){this[e]===t&&i.push(this);const r=this.children;for(let s=0,o=r.length;s<o;s++)r[s].getObjectsByProperty(e,t,i);return i}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(io,e,WS),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(io,$S,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}traverse(e){e(this);const t=this.children;for(let i=0,r=t.length;i<r;i++)t[i].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);const t=this.children;for(let i=0,r=t.length;i<r;i++)t[i].traverseVisible(e)}traverseAncestors(e){const t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale);const e=this.pivot;if(e!==null){const t=e.x,i=e.y,r=e.z,s=this.matrix.elements;s[12]+=t-s[0]*t-s[4]*i-s[8]*r,s[13]+=i-s[1]*t-s[5]*i-s[9]*r,s[14]+=r-s[2]*t-s[6]*i-s[10]*r}this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);const t=this.children;for(let i=0,r=t.length;i<r;i++)t[i].updateMatrixWorld(e)}updateWorldMatrix(e,t){const i=this.parent;if(e===!0&&i!==null&&i.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),t===!0){const r=this.children;for(let s=0,o=r.length;s<o;s++)r[s].updateWorldMatrix(!1,!0)}}toJSON(e){const t=e===void 0||typeof e=="string",i={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},i.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});const r={};r.uuid=this.uuid,r.type=this.type,this.name!==""&&(r.name=this.name),this.castShadow===!0&&(r.castShadow=!0),this.receiveShadow===!0&&(r.receiveShadow=!0),this.visible===!1&&(r.visible=!1),this.frustumCulled===!1&&(r.frustumCulled=!1),this.renderOrder!==0&&(r.renderOrder=this.renderOrder),this.static!==!1&&(r.static=this.static),Object.keys(this.userData).length>0&&(r.userData=this.userData),r.layers=this.layers.mask,r.matrix=this.matrix.toArray(),r.up=this.up.toArray(),this.pivot!==null&&(r.pivot=this.pivot.toArray()),this.matrixAutoUpdate===!1&&(r.matrixAutoUpdate=!1),this.morphTargetDictionary!==void 0&&(r.morphTargetDictionary=Object.assign({},this.morphTargetDictionary)),this.morphTargetInfluences!==void 0&&(r.morphTargetInfluences=this.morphTargetInfluences.slice()),this.isInstancedMesh&&(r.type="InstancedMesh",r.count=this.count,r.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(r.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(r.type="BatchedMesh",r.perObjectFrustumCulled=this.perObjectFrustumCulled,r.sortObjects=this.sortObjects,r.drawRanges=this._drawRanges,r.reservedRanges=this._reservedRanges,r.geometryInfo=this._geometryInfo.map(a=>({...a,boundingBox:a.boundingBox?a.boundingBox.toJSON():void 0,boundingSphere:a.boundingSphere?a.boundingSphere.toJSON():void 0})),r.instanceInfo=this._instanceInfo.map(a=>({...a})),r.availableInstanceIds=this._availableInstanceIds.slice(),r.availableGeometryIds=this._availableGeometryIds.slice(),r.nextIndexStart=this._nextIndexStart,r.nextVertexStart=this._nextVertexStart,r.geometryCount=this._geometryCount,r.maxInstanceCount=this._maxInstanceCount,r.maxVertexCount=this._maxVertexCount,r.maxIndexCount=this._maxIndexCount,r.geometryInitialized=this._geometryInitialized,r.matricesTexture=this._matricesTexture.toJSON(e),r.indirectTexture=this._indirectTexture.toJSON(e),this._colorsTexture!==null&&(r.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(r.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(r.boundingBox=this.boundingBox.toJSON()));function s(a,l){return a[l.uuid]===void 0&&(a[l.uuid]=l.toJSON(e)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?r.background=this.background.toJSON():this.background.isTexture&&(r.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(r.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){r.geometry=s(e.geometries,this.geometry);const a=this.geometry.parameters;if(a!==void 0&&a.shapes!==void 0){const l=a.shapes;if(Array.isArray(l))for(let c=0,u=l.length;c<u;c++){const d=l[c];s(e.shapes,d)}else s(e.shapes,l)}}if(this.isSkinnedMesh&&(r.bindMode=this.bindMode,r.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(s(e.skeletons,this.skeleton),r.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const a=[];for(let l=0,c=this.material.length;l<c;l++)a.push(s(e.materials,this.material[l]));r.material=a}else r.material=s(e.materials,this.material);if(this.children.length>0){r.children=[];for(let a=0;a<this.children.length;a++)r.children.push(this.children[a].toJSON(e).object)}if(this.animations.length>0){r.animations=[];for(let a=0;a<this.animations.length;a++){const l=this.animations[a];r.animations.push(s(e.animations,l))}}if(t){const a=o(e.geometries),l=o(e.materials),c=o(e.textures),u=o(e.images),d=o(e.shapes),h=o(e.skeletons),f=o(e.animations),p=o(e.nodes);a.length>0&&(i.geometries=a),l.length>0&&(i.materials=l),c.length>0&&(i.textures=c),u.length>0&&(i.images=u),d.length>0&&(i.shapes=d),h.length>0&&(i.skeletons=h),f.length>0&&(i.animations=f),p.length>0&&(i.nodes=p)}return i.object=r,i;function o(a){const l=[];for(const c in a){const u=a[c];delete u.metadata,l.push(u)}return l}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.pivot=e.pivot!==null?e.pivot.clone():null,this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.static=e.static,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let i=0;i<e.children.length;i++){const r=e.children[i];this.add(r.clone())}return this}}gn.DEFAULT_UP=new N(0,1,0);gn.DEFAULT_MATRIX_AUTO_UPDATE=!0;gn.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;class sa extends gn{constructor(){super(),this.isGroup=!0,this.type="Group"}}const jS={type:"move"};class Ec{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new sa,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new sa,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new N,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new N),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new sa,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new N,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new N,this._grip.eventsEnabled=!1),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){const t=this._hand;if(t)for(const i of e.hand.values())this._getHandJoint(t,i)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,i){let r=null,s=null,o=null;const a=this._targetRay,l=this._grip,c=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(c&&e.hand){o=!0;for(const _ of e.hand.values()){const g=t.getJointPose(_,i),m=this._getHandJoint(c,_);g!==null&&(m.matrix.fromArray(g.transform.matrix),m.matrix.decompose(m.position,m.rotation,m.scale),m.matrixWorldNeedsUpdate=!0,m.jointRadius=g.radius),m.visible=g!==null}const u=c.joints["index-finger-tip"],d=c.joints["thumb-tip"],h=u.position.distanceTo(d.position),f=.02,p=.005;c.inputState.pinching&&h>f+p?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!c.inputState.pinching&&h<=f-p&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else l!==null&&e.gripSpace&&(s=t.getPose(e.gripSpace,i),s!==null&&(l.matrix.fromArray(s.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,s.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(s.linearVelocity)):l.hasLinearVelocity=!1,s.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(s.angularVelocity)):l.hasAngularVelocity=!1,l.eventsEnabled&&l.dispatchEvent({type:"gripUpdated",data:e,target:this})));a!==null&&(r=t.getPose(e.targetRaySpace,i),r===null&&s!==null&&(r=s),r!==null&&(a.matrix.fromArray(r.transform.matrix),a.matrix.decompose(a.position,a.rotation,a.scale),a.matrixWorldNeedsUpdate=!0,r.linearVelocity?(a.hasLinearVelocity=!0,a.linearVelocity.copy(r.linearVelocity)):a.hasLinearVelocity=!1,r.angularVelocity?(a.hasAngularVelocity=!0,a.angularVelocity.copy(r.angularVelocity)):a.hasAngularVelocity=!1,this.dispatchEvent(jS)))}return a!==null&&(a.visible=r!==null),l!==null&&(l.visible=s!==null),c!==null&&(c.visible=o!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){const i=new sa;i.matrixAutoUpdate=!1,i.visible=!1,e.joints[t.jointName]=i,e.add(i)}return e.joints[t.jointName]}}const __={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},nr={h:0,s:0,l:0},oa={h:0,s:0,l:0};function Mc(n,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?n+(e-n)*6*t:t<1/2?e:t<2/3?n+(e-n)*6*(2/3-t):n}class nt{constructor(e,t,i){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,i)}set(e,t,i){if(t===void 0&&i===void 0){const r=e;r&&r.isColor?this.copy(r):typeof r=="number"?this.setHex(r):typeof r=="string"&&this.setStyle(r)}else this.setRGB(e,t,i);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=Dn){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,Je.colorSpaceToWorking(this,t),this}setRGB(e,t,i,r=Je.workingColorSpace){return this.r=e,this.g=t,this.b=i,Je.colorSpaceToWorking(this,r),this}setHSL(e,t,i,r=Je.workingColorSpace){if(e=NS(e,1),t=Ke(t,0,1),i=Ke(i,0,1),t===0)this.r=this.g=this.b=i;else{const s=i<=.5?i*(1+t):i+t-i*t,o=2*i-s;this.r=Mc(o,s,e+1/3),this.g=Mc(o,s,e),this.b=Mc(o,s,e-1/3)}return Je.colorSpaceToWorking(this,r),this}setStyle(e,t=Dn){function i(s){s!==void 0&&parseFloat(s)<1&&Le("Color: Alpha component of "+e+" will be ignored.")}let r;if(r=/^(\w+)\(([^\)]*)\)/.exec(e)){let s;const o=r[1],a=r[2];switch(o){case"rgb":case"rgba":if(s=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return i(s[4]),this.setRGB(Math.min(255,parseInt(s[1],10))/255,Math.min(255,parseInt(s[2],10))/255,Math.min(255,parseInt(s[3],10))/255,t);if(s=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return i(s[4]),this.setRGB(Math.min(100,parseInt(s[1],10))/100,Math.min(100,parseInt(s[2],10))/100,Math.min(100,parseInt(s[3],10))/100,t);break;case"hsl":case"hsla":if(s=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return i(s[4]),this.setHSL(parseFloat(s[1])/360,parseFloat(s[2])/100,parseFloat(s[3])/100,t);break;default:Le("Color: Unknown color model "+e)}}else if(r=/^\#([A-Fa-f\d]+)$/.exec(e)){const s=r[1],o=s.length;if(o===3)return this.setRGB(parseInt(s.charAt(0),16)/15,parseInt(s.charAt(1),16)/15,parseInt(s.charAt(2),16)/15,t);if(o===6)return this.setHex(parseInt(s,16),t);Le("Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=Dn){const i=__[e.toLowerCase()];return i!==void 0?this.setHex(i,t):Le("Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=Wi(e.r),this.g=Wi(e.g),this.b=Wi(e.b),this}copyLinearToSRGB(e){return this.r=Ts(e.r),this.g=Ts(e.g),this.b=Ts(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=Dn){return Je.workingToColorSpace(an.copy(this),e),Math.round(Ke(an.r*255,0,255))*65536+Math.round(Ke(an.g*255,0,255))*256+Math.round(Ke(an.b*255,0,255))}getHexString(e=Dn){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=Je.workingColorSpace){Je.workingToColorSpace(an.copy(this),t);const i=an.r,r=an.g,s=an.b,o=Math.max(i,r,s),a=Math.min(i,r,s);let l,c;const u=(a+o)/2;if(a===o)l=0,c=0;else{const d=o-a;switch(c=u<=.5?d/(o+a):d/(2-o-a),o){case i:l=(r-s)/d+(r<s?6:0);break;case r:l=(s-i)/d+2;break;case s:l=(i-r)/d+4;break}l/=6}return e.h=l,e.s=c,e.l=u,e}getRGB(e,t=Je.workingColorSpace){return Je.workingToColorSpace(an.copy(this),t),e.r=an.r,e.g=an.g,e.b=an.b,e}getStyle(e=Dn){Je.workingToColorSpace(an.copy(this),e);const t=an.r,i=an.g,r=an.b;return e!==Dn?`color(${e} ${t.toFixed(3)} ${i.toFixed(3)} ${r.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(i*255)},${Math.round(r*255)})`}offsetHSL(e,t,i){return this.getHSL(nr),this.setHSL(nr.h+e,nr.s+t,nr.l+i)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,i){return this.r=e.r+(t.r-e.r)*i,this.g=e.g+(t.g-e.g)*i,this.b=e.b+(t.b-e.b)*i,this}lerpHSL(e,t){this.getHSL(nr),e.getHSL(oa);const i=_c(nr.h,oa.h,t),r=_c(nr.s,oa.s,t),s=_c(nr.l,oa.l,t);return this.setHSL(i,r,s),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){const t=this.r,i=this.g,r=this.b,s=e.elements;return this.r=s[0]*t+s[3]*i+s[6]*r,this.g=s[1]*t+s[4]*i+s[7]*r,this.b=s[2]*t+s[5]*i+s[8]*r,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const an=new nt;nt.NAMES=__;class Jd{constructor(e,t=25e-5){this.isFogExp2=!0,this.name="",this.color=new nt(e),this.density=t}clone(){return new Jd(this.color,this.density)}toJSON(){return{type:"FogExp2",name:this.name,color:this.color.getHex(),density:this.density}}}class YS extends gn{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new $r,this.environmentIntensity=1,this.environmentRotation=new $r,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){const t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(t.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(t.object.backgroundIntensity=this.backgroundIntensity),t.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(t.object.environmentIntensity=this.environmentIntensity),t.object.environmentRotation=this.environmentRotation.toArray(),t}}const Wn=new N,Si=new N,wc=new N,Ei=new N,rs=new N,ss=new N,qf=new N,Tc=new N,Ac=new N,Cc=new N,Rc=new Bt,Pc=new Bt,Lc=new Bt;class Kn{constructor(e=new N,t=new N,i=new N){this.a=e,this.b=t,this.c=i}static getNormal(e,t,i,r){r.subVectors(i,t),Wn.subVectors(e,t),r.cross(Wn);const s=r.lengthSq();return s>0?r.multiplyScalar(1/Math.sqrt(s)):r.set(0,0,0)}static getBarycoord(e,t,i,r,s){Wn.subVectors(r,t),Si.subVectors(i,t),wc.subVectors(e,t);const o=Wn.dot(Wn),a=Wn.dot(Si),l=Wn.dot(wc),c=Si.dot(Si),u=Si.dot(wc),d=o*c-a*a;if(d===0)return s.set(0,0,0),null;const h=1/d,f=(c*l-a*u)*h,p=(o*u-a*l)*h;return s.set(1-f-p,p,f)}static containsPoint(e,t,i,r){return this.getBarycoord(e,t,i,r,Ei)===null?!1:Ei.x>=0&&Ei.y>=0&&Ei.x+Ei.y<=1}static getInterpolation(e,t,i,r,s,o,a,l){return this.getBarycoord(e,t,i,r,Ei)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(s,Ei.x),l.addScaledVector(o,Ei.y),l.addScaledVector(a,Ei.z),l)}static getInterpolatedAttribute(e,t,i,r,s,o){return Rc.setScalar(0),Pc.setScalar(0),Lc.setScalar(0),Rc.fromBufferAttribute(e,t),Pc.fromBufferAttribute(e,i),Lc.fromBufferAttribute(e,r),o.setScalar(0),o.addScaledVector(Rc,s.x),o.addScaledVector(Pc,s.y),o.addScaledVector(Lc,s.z),o}static isFrontFacing(e,t,i,r){return Wn.subVectors(i,t),Si.subVectors(e,t),Wn.cross(Si).dot(r)<0}set(e,t,i){return this.a.copy(e),this.b.copy(t),this.c.copy(i),this}setFromPointsAndIndices(e,t,i,r){return this.a.copy(e[t]),this.b.copy(e[i]),this.c.copy(e[r]),this}setFromAttributeAndIndices(e,t,i,r){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,i),this.c.fromBufferAttribute(e,r),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return Wn.subVectors(this.c,this.b),Si.subVectors(this.a,this.b),Wn.cross(Si).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return Kn.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return Kn.getBarycoord(e,this.a,this.b,this.c,t)}getInterpolation(e,t,i,r,s){return Kn.getInterpolation(e,this.a,this.b,this.c,t,i,r,s)}containsPoint(e){return Kn.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return Kn.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){const i=this.a,r=this.b,s=this.c;let o,a;rs.subVectors(r,i),ss.subVectors(s,i),Tc.subVectors(e,i);const l=rs.dot(Tc),c=ss.dot(Tc);if(l<=0&&c<=0)return t.copy(i);Ac.subVectors(e,r);const u=rs.dot(Ac),d=ss.dot(Ac);if(u>=0&&d<=u)return t.copy(r);const h=l*d-u*c;if(h<=0&&l>=0&&u<=0)return o=l/(l-u),t.copy(i).addScaledVector(rs,o);Cc.subVectors(e,s);const f=rs.dot(Cc),p=ss.dot(Cc);if(p>=0&&f<=p)return t.copy(s);const _=f*c-l*p;if(_<=0&&c>=0&&p<=0)return a=c/(c-p),t.copy(i).addScaledVector(ss,a);const g=u*p-f*d;if(g<=0&&d-u>=0&&f-p>=0)return qf.subVectors(s,r),a=(d-u)/(d-u+(f-p)),t.copy(r).addScaledVector(qf,a);const m=1/(g+_+h);return o=_*m,a=h*m,t.copy(i).addScaledVector(rs,o).addScaledVector(ss,a)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}}class ko{constructor(e=new N(1/0,1/0,1/0),t=new N(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,i=e.length;t<i;t+=3)this.expandByPoint($n.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,i=e.count;t<i;t++)this.expandByPoint($n.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,i=e.length;t<i;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){const i=$n.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(i),this.max.copy(e).add(i),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);const i=e.geometry;if(i!==void 0){const s=i.getAttribute("position");if(t===!0&&s!==void 0&&e.isInstancedMesh!==!0)for(let o=0,a=s.count;o<a;o++)e.isMesh===!0?e.getVertexPosition(o,$n):$n.fromBufferAttribute(s,o),$n.applyMatrix4(e.matrixWorld),this.expandByPoint($n);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),aa.copy(e.boundingBox)):(i.boundingBox===null&&i.computeBoundingBox(),aa.copy(i.boundingBox)),aa.applyMatrix4(e.matrixWorld),this.union(aa)}const r=e.children;for(let s=0,o=r.length;s<o;s++)this.expandByObject(r[s],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,$n),$n.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,i;return e.normal.x>0?(t=e.normal.x*this.min.x,i=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,i=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,i+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,i+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,i+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,i+=e.normal.z*this.min.z),t<=-e.constant&&i>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(ro),la.subVectors(this.max,ro),os.subVectors(e.a,ro),as.subVectors(e.b,ro),ls.subVectors(e.c,ro),ir.subVectors(as,os),rr.subVectors(ls,as),Cr.subVectors(os,ls);let t=[0,-ir.z,ir.y,0,-rr.z,rr.y,0,-Cr.z,Cr.y,ir.z,0,-ir.x,rr.z,0,-rr.x,Cr.z,0,-Cr.x,-ir.y,ir.x,0,-rr.y,rr.x,0,-Cr.y,Cr.x,0];return!Dc(t,os,as,ls,la)||(t=[1,0,0,0,1,0,0,0,1],!Dc(t,os,as,ls,la))?!1:(ca.crossVectors(ir,rr),t=[ca.x,ca.y,ca.z],Dc(t,os,as,ls,la))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,$n).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize($n).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(Mi[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),Mi[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),Mi[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),Mi[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),Mi[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),Mi[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),Mi[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),Mi[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(Mi),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(e){return this.min.fromArray(e.min),this.max.fromArray(e.max),this}}const Mi=[new N,new N,new N,new N,new N,new N,new N,new N],$n=new N,aa=new ko,os=new N,as=new N,ls=new N,ir=new N,rr=new N,Cr=new N,ro=new N,la=new N,ca=new N,Rr=new N;function Dc(n,e,t,i,r){for(let s=0,o=n.length-3;s<=o;s+=3){Rr.fromArray(n,s);const a=r.x*Math.abs(Rr.x)+r.y*Math.abs(Rr.y)+r.z*Math.abs(Rr.z),l=e.dot(Rr),c=t.dot(Rr),u=i.dot(Rr);if(Math.max(-Math.max(l,c,u),Math.min(l,c,u))>a)return!1}return!0}const zt=new N,ua=new We;let qS=0;class Bn extends wr{constructor(e,t,i=!1){if(super(),Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:qS++}),this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=i,this.usage=Uf,this.updateRanges=[],this.gpuType=hi,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,i){e*=this.itemSize,i*=t.itemSize;for(let r=0,s=this.itemSize;r<s;r++)this.array[e+r]=t.array[i+r];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,i=this.count;t<i;t++)ua.fromBufferAttribute(this,t),ua.applyMatrix3(e),this.setXY(t,ua.x,ua.y);else if(this.itemSize===3)for(let t=0,i=this.count;t<i;t++)zt.fromBufferAttribute(this,t),zt.applyMatrix3(e),this.setXYZ(t,zt.x,zt.y,zt.z);return this}applyMatrix4(e){for(let t=0,i=this.count;t<i;t++)zt.fromBufferAttribute(this,t),zt.applyMatrix4(e),this.setXYZ(t,zt.x,zt.y,zt.z);return this}applyNormalMatrix(e){for(let t=0,i=this.count;t<i;t++)zt.fromBufferAttribute(this,t),zt.applyNormalMatrix(e),this.setXYZ(t,zt.x,zt.y,zt.z);return this}transformDirection(e){for(let t=0,i=this.count;t<i;t++)zt.fromBufferAttribute(this,t),zt.transformDirection(e),this.setXYZ(t,zt.x,zt.y,zt.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let i=this.array[e*this.itemSize+t];return this.normalized&&(i=no(i,this.array)),i}setComponent(e,t,i){return this.normalized&&(i=_n(i,this.array)),this.array[e*this.itemSize+t]=i,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=no(t,this.array)),t}setX(e,t){return this.normalized&&(t=_n(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=no(t,this.array)),t}setY(e,t){return this.normalized&&(t=_n(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=no(t,this.array)),t}setZ(e,t){return this.normalized&&(t=_n(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=no(t,this.array)),t}setW(e,t){return this.normalized&&(t=_n(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,i){return e*=this.itemSize,this.normalized&&(t=_n(t,this.array),i=_n(i,this.array)),this.array[e+0]=t,this.array[e+1]=i,this}setXYZ(e,t,i,r){return e*=this.itemSize,this.normalized&&(t=_n(t,this.array),i=_n(i,this.array),r=_n(r,this.array)),this.array[e+0]=t,this.array[e+1]=i,this.array[e+2]=r,this}setXYZW(e,t,i,r,s){return e*=this.itemSize,this.normalized&&(t=_n(t,this.array),i=_n(i,this.array),r=_n(r,this.array),s=_n(s,this.array)),this.array[e+0]=t,this.array[e+1]=i,this.array[e+2]=r,this.array[e+3]=s,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==Uf&&(e.usage=this.usage),e}dispose(){this.dispatchEvent({type:"dispose"})}}class v_ extends Bn{constructor(e,t,i){super(new Uint16Array(e),t,i)}}class x_ extends Bn{constructor(e,t,i){super(new Uint32Array(e),t,i)}}class St extends Bn{constructor(e,t,i){super(new Float32Array(e),t,i)}}const KS=new ko,so=new N,Nc=new N;class Bo{constructor(e=new N,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){const i=this.center;t!==void 0?i.copy(t):KS.setFromPoints(e).getCenter(i);let r=0;for(let s=0,o=e.length;s<o;s++)r=Math.max(r,i.distanceToSquared(e[s]));return this.radius=Math.sqrt(r),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){const t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){const i=this.center.distanceToSquared(e);return t.copy(e),i>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;so.subVectors(e,this.center);const t=so.lengthSq();if(t>this.radius*this.radius){const i=Math.sqrt(t),r=(i-this.radius)*.5;this.center.addScaledVector(so,r/i),this.radius+=r}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(Nc.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(so.copy(e.center).add(Nc)),this.expandByPoint(so.copy(e.center).sub(Nc))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(e){return this.radius=e.radius,this.center.fromArray(e.center),this}}let ZS=0;const Ln=new Ct,Ic=new gn,cs=new N,Mn=new ko,oo=new ko,Zt=new N;class At extends wr{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:ZS++}),this.uuid=Oo(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.indirectOffset=0,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(RS(e)?x_:v_)(e,1):this.index=e,this}setIndirect(e,t=0){return this.indirect=e,this.indirectOffset=t,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,i=0){this.groups.push({start:e,count:t,materialIndex:i})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){const t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);const i=this.attributes.normal;if(i!==void 0){const s=new ze().getNormalMatrix(e);i.applyNormalMatrix(s),i.needsUpdate=!0}const r=this.attributes.tangent;return r!==void 0&&(r.transformDirection(e),r.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(e){return Ln.makeRotationFromQuaternion(e),this.applyMatrix4(Ln),this}rotateX(e){return Ln.makeRotationX(e),this.applyMatrix4(Ln),this}rotateY(e){return Ln.makeRotationY(e),this.applyMatrix4(Ln),this}rotateZ(e){return Ln.makeRotationZ(e),this.applyMatrix4(Ln),this}translate(e,t,i){return Ln.makeTranslation(e,t,i),this.applyMatrix4(Ln),this}scale(e,t,i){return Ln.makeScale(e,t,i),this.applyMatrix4(Ln),this}lookAt(e){return Ic.lookAt(e),Ic.updateMatrix(),this.applyMatrix4(Ic.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(cs).negate(),this.translate(cs.x,cs.y,cs.z),this}setFromPoints(e){const t=this.getAttribute("position");if(t===void 0){const i=[];for(let r=0,s=e.length;r<s;r++){const o=e[r];i.push(o.x,o.y,o.z||0)}this.setAttribute("position",new St(i,3))}else{const i=Math.min(e.length,t.count);for(let r=0;r<i;r++){const s=e[r];t.setXYZ(r,s.x,s.y,s.z||0)}e.length>t.count&&Le("BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),t.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new ko);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){Qe("BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new N(-1/0,-1/0,-1/0),new N(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let i=0,r=t.length;i<r;i++){const s=t[i];Mn.setFromBufferAttribute(s),this.morphTargetsRelative?(Zt.addVectors(this.boundingBox.min,Mn.min),this.boundingBox.expandByPoint(Zt),Zt.addVectors(this.boundingBox.max,Mn.max),this.boundingBox.expandByPoint(Zt)):(this.boundingBox.expandByPoint(Mn.min),this.boundingBox.expandByPoint(Mn.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&Qe('BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Bo);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){Qe("BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new N,1/0);return}if(e){const i=this.boundingSphere.center;if(Mn.setFromBufferAttribute(e),t)for(let s=0,o=t.length;s<o;s++){const a=t[s];oo.setFromBufferAttribute(a),this.morphTargetsRelative?(Zt.addVectors(Mn.min,oo.min),Mn.expandByPoint(Zt),Zt.addVectors(Mn.max,oo.max),Mn.expandByPoint(Zt)):(Mn.expandByPoint(oo.min),Mn.expandByPoint(oo.max))}Mn.getCenter(i);let r=0;for(let s=0,o=e.count;s<o;s++)Zt.fromBufferAttribute(e,s),r=Math.max(r,i.distanceToSquared(Zt));if(t)for(let s=0,o=t.length;s<o;s++){const a=t[s],l=this.morphTargetsRelative;for(let c=0,u=a.count;c<u;c++)Zt.fromBufferAttribute(a,c),l&&(cs.fromBufferAttribute(e,c),Zt.add(cs)),r=Math.max(r,i.distanceToSquared(Zt))}this.boundingSphere.radius=Math.sqrt(r),isNaN(this.boundingSphere.radius)&&Qe('BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){Qe("BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const i=t.position,r=t.normal,s=t.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new Bn(new Float32Array(4*i.count),4));const o=this.getAttribute("tangent"),a=[],l=[];for(let b=0;b<i.count;b++)a[b]=new N,l[b]=new N;const c=new N,u=new N,d=new N,h=new We,f=new We,p=new We,_=new N,g=new N;function m(b,T,L){c.fromBufferAttribute(i,b),u.fromBufferAttribute(i,T),d.fromBufferAttribute(i,L),h.fromBufferAttribute(s,b),f.fromBufferAttribute(s,T),p.fromBufferAttribute(s,L),u.sub(c),d.sub(c),f.sub(h),p.sub(h);const P=1/(f.x*p.y-p.x*f.y);isFinite(P)&&(_.copy(u).multiplyScalar(p.y).addScaledVector(d,-f.y).multiplyScalar(P),g.copy(d).multiplyScalar(f.x).addScaledVector(u,-p.x).multiplyScalar(P),a[b].add(_),a[T].add(_),a[L].add(_),l[b].add(g),l[T].add(g),l[L].add(g))}let v=this.groups;v.length===0&&(v=[{start:0,count:e.count}]);for(let b=0,T=v.length;b<T;++b){const L=v[b],P=L.start,F=L.count;for(let W=P,$=P+F;W<$;W+=3)m(e.getX(W+0),e.getX(W+1),e.getX(W+2))}const E=new N,x=new N,w=new N,S=new N;function C(b){w.fromBufferAttribute(r,b),S.copy(w);const T=a[b];E.copy(T),E.sub(w.multiplyScalar(w.dot(T))).normalize(),x.crossVectors(S,T);const P=x.dot(l[b])<0?-1:1;o.setXYZW(b,E.x,E.y,E.z,P)}for(let b=0,T=v.length;b<T;++b){const L=v[b],P=L.start,F=L.count;for(let W=P,$=P+F;W<$;W+=3)C(e.getX(W+0)),C(e.getX(W+1)),C(e.getX(W+2))}}computeVertexNormals(){const e=this.index,t=this.getAttribute("position");if(t!==void 0){let i=this.getAttribute("normal");if(i===void 0)i=new Bn(new Float32Array(t.count*3),3),this.setAttribute("normal",i);else for(let h=0,f=i.count;h<f;h++)i.setXYZ(h,0,0,0);const r=new N,s=new N,o=new N,a=new N,l=new N,c=new N,u=new N,d=new N;if(e)for(let h=0,f=e.count;h<f;h+=3){const p=e.getX(h+0),_=e.getX(h+1),g=e.getX(h+2);r.fromBufferAttribute(t,p),s.fromBufferAttribute(t,_),o.fromBufferAttribute(t,g),u.subVectors(o,s),d.subVectors(r,s),u.cross(d),a.fromBufferAttribute(i,p),l.fromBufferAttribute(i,_),c.fromBufferAttribute(i,g),a.add(u),l.add(u),c.add(u),i.setXYZ(p,a.x,a.y,a.z),i.setXYZ(_,l.x,l.y,l.z),i.setXYZ(g,c.x,c.y,c.z)}else for(let h=0,f=t.count;h<f;h+=3)r.fromBufferAttribute(t,h+0),s.fromBufferAttribute(t,h+1),o.fromBufferAttribute(t,h+2),u.subVectors(o,s),d.subVectors(r,s),u.cross(d),i.setXYZ(h+0,u.x,u.y,u.z),i.setXYZ(h+1,u.x,u.y,u.z),i.setXYZ(h+2,u.x,u.y,u.z);this.normalizeNormals(),i.needsUpdate=!0}}normalizeNormals(){const e=this.attributes.normal;for(let t=0,i=e.count;t<i;t++)Zt.fromBufferAttribute(e,t),Zt.normalize(),e.setXYZ(t,Zt.x,Zt.y,Zt.z)}toNonIndexed(){function e(a,l){const c=a.array,u=a.itemSize,d=a.normalized,h=new c.constructor(l.length*u);let f=0,p=0;for(let _=0,g=l.length;_<g;_++){a.isInterleavedBufferAttribute?f=l[_]*a.data.stride+a.offset:f=l[_]*u;for(let m=0;m<u;m++)h[p++]=c[f++]}return new Bn(h,u,d)}if(this.index===null)return Le("BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const t=new At,i=this.index.array,r=this.attributes;for(const a in r){const l=r[a],c=e(l,i);t.setAttribute(a,c)}const s=this.morphAttributes;for(const a in s){const l=[],c=s[a];for(let u=0,d=c.length;u<d;u++){const h=c[u],f=e(h,i);l.push(f)}t.morphAttributes[a]=l}t.morphTargetsRelative=this.morphTargetsRelative;const o=this.groups;for(let a=0,l=o.length;a<l;a++){const c=o[a];t.addGroup(c.start,c.count,c.materialIndex)}return t}toJSON(){const e={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0){const l=this.parameters;for(const c in l)l[c]!==void 0&&(e[c]=l[c]);return e}e.data={attributes:{}};const t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});const i=this.attributes;for(const l in i){const c=i[l];e.data.attributes[l]=c.toJSON(e.data)}const r={};let s=!1;for(const l in this.morphAttributes){const c=this.morphAttributes[l],u=[];for(let d=0,h=c.length;d<h;d++){const f=c[d];u.push(f.toJSON(e.data))}u.length>0&&(r[l]=u,s=!0)}s&&(e.data.morphAttributes=r,e.data.morphTargetsRelative=this.morphTargetsRelative);const o=this.groups;o.length>0&&(e.data.groups=JSON.parse(JSON.stringify(o)));const a=this.boundingSphere;return a!==null&&(e.data.boundingSphere=a.toJSON()),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const t={};this.name=e.name;const i=e.index;i!==null&&this.setIndex(i.clone());const r=e.attributes;for(const c in r){const u=r[c];this.setAttribute(c,u.clone(t))}const s=e.morphAttributes;for(const c in s){const u=[],d=s[c];for(let h=0,f=d.length;h<f;h++)u.push(d[h].clone(t));this.morphAttributes[c]=u}this.morphTargetsRelative=e.morphTargetsRelative;const o=e.groups;for(let c=0,u=o.length;c<u;c++){const d=o[c];this.addGroup(d.start,d.count,d.materialIndex)}const a=e.boundingBox;a!==null&&(this.boundingBox=a.clone());const l=e.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}let JS=0;class $s extends wr{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:JS++}),this.uuid=Oo(),this.name="",this.type="Material",this.blending=ws,this.side=Sr,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=xu,this.blendDst=bu,this.blendEquation=Ir,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new nt(0,0,0),this.blendAlpha=0,this.depthFunc=Ns,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=If,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Qr,this.stencilZFail=Qr,this.stencilZPass=Qr,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(const t in e){const i=e[t];if(i===void 0){Le(`Material: parameter '${t}' has value of undefined.`);continue}const r=this[t];if(r===void 0){Le(`Material: '${t}' is not a property of THREE.${this.type}.`);continue}r&&r.isColor?r.set(i):r&&r.isVector3&&i&&i.isVector3?r.copy(i):this[t]=i}}toJSON(e){const t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});const i={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.color&&this.color.isColor&&(i.color=this.color.getHex()),this.roughness!==void 0&&(i.roughness=this.roughness),this.metalness!==void 0&&(i.metalness=this.metalness),this.sheen!==void 0&&(i.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(i.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(i.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(i.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(i.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(i.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(i.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(i.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(i.shininess=this.shininess),this.clearcoat!==void 0&&(i.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(i.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(i.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(i.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(i.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,i.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(i.sheenColorMap=this.sheenColorMap.toJSON(e).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(i.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(e).uuid),this.dispersion!==void 0&&(i.dispersion=this.dispersion),this.iridescence!==void 0&&(i.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(i.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(i.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(i.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(i.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(i.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(i.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(i.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(i.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(i.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(i.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(i.lightMap=this.lightMap.toJSON(e).uuid,i.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(i.aoMap=this.aoMap.toJSON(e).uuid,i.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(i.bumpMap=this.bumpMap.toJSON(e).uuid,i.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(i.normalMap=this.normalMap.toJSON(e).uuid,i.normalMapType=this.normalMapType,i.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(i.displacementMap=this.displacementMap.toJSON(e).uuid,i.displacementScale=this.displacementScale,i.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(i.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(i.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(i.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(i.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(i.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(i.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(i.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(i.combine=this.combine)),this.envMapRotation!==void 0&&(i.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(i.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(i.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(i.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(i.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(i.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(i.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(i.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(i.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(i.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(i.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(i.size=this.size),this.shadowSide!==null&&(i.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(i.sizeAttenuation=this.sizeAttenuation),this.blending!==ws&&(i.blending=this.blending),this.side!==Sr&&(i.side=this.side),this.vertexColors===!0&&(i.vertexColors=!0),this.opacity<1&&(i.opacity=this.opacity),this.transparent===!0&&(i.transparent=!0),this.blendSrc!==xu&&(i.blendSrc=this.blendSrc),this.blendDst!==bu&&(i.blendDst=this.blendDst),this.blendEquation!==Ir&&(i.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(i.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(i.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(i.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(i.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(i.blendAlpha=this.blendAlpha),this.depthFunc!==Ns&&(i.depthFunc=this.depthFunc),this.depthTest===!1&&(i.depthTest=this.depthTest),this.depthWrite===!1&&(i.depthWrite=this.depthWrite),this.colorWrite===!1&&(i.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(i.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==If&&(i.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(i.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(i.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==Qr&&(i.stencilFail=this.stencilFail),this.stencilZFail!==Qr&&(i.stencilZFail=this.stencilZFail),this.stencilZPass!==Qr&&(i.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(i.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(i.rotation=this.rotation),this.polygonOffset===!0&&(i.polygonOffset=!0),this.polygonOffsetFactor!==0&&(i.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(i.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(i.linewidth=this.linewidth),this.dashSize!==void 0&&(i.dashSize=this.dashSize),this.gapSize!==void 0&&(i.gapSize=this.gapSize),this.scale!==void 0&&(i.scale=this.scale),this.dithering===!0&&(i.dithering=!0),this.alphaTest>0&&(i.alphaTest=this.alphaTest),this.alphaHash===!0&&(i.alphaHash=!0),this.alphaToCoverage===!0&&(i.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(i.premultipliedAlpha=!0),this.forceSinglePass===!0&&(i.forceSinglePass=!0),this.allowOverride===!1&&(i.allowOverride=!1),this.wireframe===!0&&(i.wireframe=!0),this.wireframeLinewidth>1&&(i.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(i.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(i.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(i.flatShading=!0),this.visible===!1&&(i.visible=!1),this.toneMapped===!1&&(i.toneMapped=!1),this.fog===!1&&(i.fog=!1),Object.keys(this.userData).length>0&&(i.userData=this.userData);function r(s){const o=[];for(const a in s){const l=s[a];delete l.metadata,o.push(l)}return o}if(t){const s=r(e.textures),o=r(e.images);s.length>0&&(i.textures=s),o.length>0&&(i.images=o)}return i}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;const t=e.clippingPlanes;let i=null;if(t!==null){const r=t.length;i=new Array(r);for(let s=0;s!==r;++s)i[s]=t[s].clone()}return this.clippingPlanes=i,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.allowOverride=e.allowOverride,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}}const wi=new N,Uc=new N,da=new N,sr=new N,Fc=new N,ha=new N,Oc=new N;class zo{constructor(e=new N,t=new N(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,wi)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);const i=t.dot(this.direction);return i<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,i)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){const t=wi.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(wi.copy(this.origin).addScaledVector(this.direction,t),wi.distanceToSquared(e))}distanceSqToSegment(e,t,i,r){Uc.copy(e).add(t).multiplyScalar(.5),da.copy(t).sub(e).normalize(),sr.copy(this.origin).sub(Uc);const s=e.distanceTo(t)*.5,o=-this.direction.dot(da),a=sr.dot(this.direction),l=-sr.dot(da),c=sr.lengthSq(),u=Math.abs(1-o*o);let d,h,f,p;if(u>0)if(d=o*l-a,h=o*a-l,p=s*u,d>=0)if(h>=-p)if(h<=p){const _=1/u;d*=_,h*=_,f=d*(d+o*h+2*a)+h*(o*d+h+2*l)+c}else h=s,d=Math.max(0,-(o*h+a)),f=-d*d+h*(h+2*l)+c;else h=-s,d=Math.max(0,-(o*h+a)),f=-d*d+h*(h+2*l)+c;else h<=-p?(d=Math.max(0,-(-o*s+a)),h=d>0?-s:Math.min(Math.max(-s,-l),s),f=-d*d+h*(h+2*l)+c):h<=p?(d=0,h=Math.min(Math.max(-s,-l),s),f=h*(h+2*l)+c):(d=Math.max(0,-(o*s+a)),h=d>0?s:Math.min(Math.max(-s,-l),s),f=-d*d+h*(h+2*l)+c);else h=o>0?-s:s,d=Math.max(0,-(o*h+a)),f=-d*d+h*(h+2*l)+c;return i&&i.copy(this.origin).addScaledVector(this.direction,d),r&&r.copy(Uc).addScaledVector(da,h),f}intersectSphere(e,t){wi.subVectors(e.center,this.origin);const i=wi.dot(this.direction),r=wi.dot(wi)-i*i,s=e.radius*e.radius;if(r>s)return null;const o=Math.sqrt(s-r),a=i-o,l=i+o;return l<0?null:a<0?this.at(l,t):this.at(a,t)}intersectsSphere(e){return e.radius<0?!1:this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){const t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;const i=-(this.origin.dot(e.normal)+e.constant)/t;return i>=0?i:null}intersectPlane(e,t){const i=this.distanceToPlane(e);return i===null?null:this.at(i,t)}intersectsPlane(e){const t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let i,r,s,o,a,l;const c=1/this.direction.x,u=1/this.direction.y,d=1/this.direction.z,h=this.origin;return c>=0?(i=(e.min.x-h.x)*c,r=(e.max.x-h.x)*c):(i=(e.max.x-h.x)*c,r=(e.min.x-h.x)*c),u>=0?(s=(e.min.y-h.y)*u,o=(e.max.y-h.y)*u):(s=(e.max.y-h.y)*u,o=(e.min.y-h.y)*u),i>o||s>r||((s>i||isNaN(i))&&(i=s),(o<r||isNaN(r))&&(r=o),d>=0?(a=(e.min.z-h.z)*d,l=(e.max.z-h.z)*d):(a=(e.max.z-h.z)*d,l=(e.min.z-h.z)*d),i>l||a>r)||((a>i||i!==i)&&(i=a),(l<r||r!==r)&&(r=l),r<0)?null:this.at(i>=0?i:r,t)}intersectsBox(e){return this.intersectBox(e,wi)!==null}intersectTriangle(e,t,i,r,s){Fc.subVectors(t,e),ha.subVectors(i,e),Oc.crossVectors(Fc,ha);let o=this.direction.dot(Oc),a;if(o>0){if(r)return null;a=1}else if(o<0)a=-1,o=-o;else return null;sr.subVectors(this.origin,e);const l=a*this.direction.dot(ha.crossVectors(sr,ha));if(l<0)return null;const c=a*this.direction.dot(Fc.cross(sr));if(c<0||l+c>o)return null;const u=-a*sr.dot(Oc);return u<0?null:this.at(u/o,s)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class Qd extends $s{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new nt(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new $r,this.combine=Qg,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}const Kf=new Ct,Pr=new zo,fa=new Bo,Zf=new N,pa=new N,ma=new N,ga=new N,kc=new N,_a=new N,Jf=new N,va=new N;class vi extends gn{constructor(e=new At,t=new Qd){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){const t=this.geometry.morphAttributes,i=Object.keys(t);if(i.length>0){const r=t[i[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,o=r.length;s<o;s++){const a=r[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=s}}}}getVertexPosition(e,t){const i=this.geometry,r=i.attributes.position,s=i.morphAttributes.position,o=i.morphTargetsRelative;t.fromBufferAttribute(r,e);const a=this.morphTargetInfluences;if(s&&a){_a.set(0,0,0);for(let l=0,c=s.length;l<c;l++){const u=a[l],d=s[l];u!==0&&(kc.fromBufferAttribute(d,e),o?_a.addScaledVector(kc,u):_a.addScaledVector(kc.sub(t),u))}t.add(_a)}return t}raycast(e,t){const i=this.geometry,r=this.material,s=this.matrixWorld;r!==void 0&&(i.boundingSphere===null&&i.computeBoundingSphere(),fa.copy(i.boundingSphere),fa.applyMatrix4(s),Pr.copy(e.ray).recast(e.near),!(fa.containsPoint(Pr.origin)===!1&&(Pr.intersectSphere(fa,Zf)===null||Pr.origin.distanceToSquared(Zf)>(e.far-e.near)**2))&&(Kf.copy(s).invert(),Pr.copy(e.ray).applyMatrix4(Kf),!(i.boundingBox!==null&&Pr.intersectsBox(i.boundingBox)===!1)&&this._computeIntersections(e,t,Pr)))}_computeIntersections(e,t,i){let r;const s=this.geometry,o=this.material,a=s.index,l=s.attributes.position,c=s.attributes.uv,u=s.attributes.uv1,d=s.attributes.normal,h=s.groups,f=s.drawRange;if(a!==null)if(Array.isArray(o))for(let p=0,_=h.length;p<_;p++){const g=h[p],m=o[g.materialIndex],v=Math.max(g.start,f.start),E=Math.min(a.count,Math.min(g.start+g.count,f.start+f.count));for(let x=v,w=E;x<w;x+=3){const S=a.getX(x),C=a.getX(x+1),b=a.getX(x+2);r=xa(this,m,e,i,c,u,d,S,C,b),r&&(r.faceIndex=Math.floor(x/3),r.face.materialIndex=g.materialIndex,t.push(r))}}else{const p=Math.max(0,f.start),_=Math.min(a.count,f.start+f.count);for(let g=p,m=_;g<m;g+=3){const v=a.getX(g),E=a.getX(g+1),x=a.getX(g+2);r=xa(this,o,e,i,c,u,d,v,E,x),r&&(r.faceIndex=Math.floor(g/3),t.push(r))}}else if(l!==void 0)if(Array.isArray(o))for(let p=0,_=h.length;p<_;p++){const g=h[p],m=o[g.materialIndex],v=Math.max(g.start,f.start),E=Math.min(l.count,Math.min(g.start+g.count,f.start+f.count));for(let x=v,w=E;x<w;x+=3){const S=x,C=x+1,b=x+2;r=xa(this,m,e,i,c,u,d,S,C,b),r&&(r.faceIndex=Math.floor(x/3),r.face.materialIndex=g.materialIndex,t.push(r))}}else{const p=Math.max(0,f.start),_=Math.min(l.count,f.start+f.count);for(let g=p,m=_;g<m;g+=3){const v=g,E=g+1,x=g+2;r=xa(this,o,e,i,c,u,d,v,E,x),r&&(r.faceIndex=Math.floor(g/3),t.push(r))}}}}function QS(n,e,t,i,r,s,o,a){let l;if(e.side===bn?l=i.intersectTriangle(o,s,r,!0,a):l=i.intersectTriangle(r,s,o,e.side===Sr,a),l===null)return null;va.copy(a),va.applyMatrix4(n.matrixWorld);const c=t.ray.origin.distanceTo(va);return c<t.near||c>t.far?null:{distance:c,point:va.clone(),object:n}}function xa(n,e,t,i,r,s,o,a,l,c){n.getVertexPosition(a,pa),n.getVertexPosition(l,ma),n.getVertexPosition(c,ga);const u=QS(n,e,t,i,pa,ma,ga,Jf);if(u){const d=new N;Kn.getBarycoord(Jf,pa,ma,ga,d),r&&(u.uv=Kn.getInterpolatedAttribute(r,a,l,c,d,new We)),s&&(u.uv1=Kn.getInterpolatedAttribute(s,a,l,c,d,new We)),o&&(u.normal=Kn.getInterpolatedAttribute(o,a,l,c,d,new N),u.normal.dot(i.direction)>0&&u.normal.multiplyScalar(-1));const h={a,b:l,c,normal:new N,materialIndex:0};Kn.getNormal(pa,ma,ga,h.normal),u.face=h,u.barycoord=d}return u}class eE extends cn{constructor(e=null,t=1,i=1,r,s,o,a,l,c=nn,u=nn,d,h){super(null,o,a,l,c,u,r,s,d,h),this.isDataTexture=!0,this.image={data:e,width:t,height:i},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}const Bc=new N,tE=new N,nE=new ze;class Ci{constructor(e=new N(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,i,r){return this.normal.set(e,t,i),this.constant=r,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,i){const r=Bc.subVectors(i,t).cross(tE.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(r,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){const e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t,i=!0){const r=e.delta(Bc),s=this.normal.dot(r);if(s===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;const o=-(e.start.dot(this.normal)+this.constant)/s;return i===!0&&(o<0||o>1)?null:t.copy(e.start).addScaledVector(r,o)}intersectsLine(e){const t=this.distanceToPoint(e.start),i=this.distanceToPoint(e.end);return t<0&&i>0||i<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){const i=t||nE.getNormalMatrix(e),r=this.coplanarPoint(Bc).applyMatrix4(e),s=this.normal.applyMatrix3(i).normalize();return this.constant=-r.dot(s),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}}const Lr=new Bo,iE=new We(.5,.5),ba=new N;class b_{constructor(e=new Ci,t=new Ci,i=new Ci,r=new Ci,s=new Ci,o=new Ci){this.planes=[e,t,i,r,s,o]}set(e,t,i,r,s,o){const a=this.planes;return a[0].copy(e),a[1].copy(t),a[2].copy(i),a[3].copy(r),a[4].copy(s),a[5].copy(o),this}copy(e){const t=this.planes;for(let i=0;i<6;i++)t[i].copy(e.planes[i]);return this}setFromProjectionMatrix(e,t=fi,i=!1){const r=this.planes,s=e.elements,o=s[0],a=s[1],l=s[2],c=s[3],u=s[4],d=s[5],h=s[6],f=s[7],p=s[8],_=s[9],g=s[10],m=s[11],v=s[12],E=s[13],x=s[14],w=s[15];if(r[0].setComponents(c-o,f-u,m-p,w-v).normalize(),r[1].setComponents(c+o,f+u,m+p,w+v).normalize(),r[2].setComponents(c+a,f+d,m+_,w+E).normalize(),r[3].setComponents(c-a,f-d,m-_,w-E).normalize(),i)r[4].setComponents(l,h,g,x).normalize(),r[5].setComponents(c-l,f-h,m-g,w-x).normalize();else if(r[4].setComponents(c-l,f-h,m-g,w-x).normalize(),t===fi)r[5].setComponents(c+l,f+h,m+g,w+x).normalize();else if(t===fl)r[5].setComponents(l,h,g,x).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),Lr.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{const t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),Lr.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(Lr)}intersectsSprite(e){Lr.center.set(0,0,0);const t=iE.distanceTo(e.center);return Lr.radius=.7071067811865476+t,Lr.applyMatrix4(e.matrixWorld),this.intersectsSphere(Lr)}intersectsSphere(e){const t=this.planes,i=e.center,r=-e.radius;for(let s=0;s<6;s++)if(t[s].distanceToPoint(i)<r)return!1;return!0}intersectsBox(e){const t=this.planes;for(let i=0;i<6;i++){const r=t[i];if(ba.x=r.normal.x>0?e.max.x:e.min.x,ba.y=r.normal.y>0?e.max.y:e.min.y,ba.z=r.normal.z>0?e.max.z:e.min.z,r.distanceToPoint(ba)<0)return!1}return!0}containsPoint(e){const t=this.planes;for(let i=0;i<6;i++)if(t[i].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}class ji extends $s{constructor(e){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new nt(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.linewidth=e.linewidth,this.linecap=e.linecap,this.linejoin=e.linejoin,this.fog=e.fog,this}}const ml=new N,gl=new N,Qf=new Ct,ao=new zo,ya=new Bo,zc=new N,ep=new N;class Xr extends gn{constructor(e=new At,t=new ji){super(),this.isLine=!0,this.type="Line",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}computeLineDistances(){const e=this.geometry;if(e.index===null){const t=e.attributes.position,i=[0];for(let r=1,s=t.count;r<s;r++)ml.fromBufferAttribute(t,r-1),gl.fromBufferAttribute(t,r),i[r]=i[r-1],i[r]+=ml.distanceTo(gl);e.setAttribute("lineDistance",new St(i,1))}else Le("Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(e,t){const i=this.geometry,r=this.matrixWorld,s=e.params.Line.threshold,o=i.drawRange;if(i.boundingSphere===null&&i.computeBoundingSphere(),ya.copy(i.boundingSphere),ya.applyMatrix4(r),ya.radius+=s,e.ray.intersectsSphere(ya)===!1)return;Qf.copy(r).invert(),ao.copy(e.ray).applyMatrix4(Qf);const a=s/((this.scale.x+this.scale.y+this.scale.z)/3),l=a*a,c=this.isLineSegments?2:1,u=i.index,h=i.attributes.position;if(u!==null){const f=Math.max(0,o.start),p=Math.min(u.count,o.start+o.count);for(let _=f,g=p-1;_<g;_+=c){const m=u.getX(_),v=u.getX(_+1),E=Sa(this,e,ao,l,m,v,_);E&&t.push(E)}if(this.isLineLoop){const _=u.getX(p-1),g=u.getX(f),m=Sa(this,e,ao,l,_,g,p-1);m&&t.push(m)}}else{const f=Math.max(0,o.start),p=Math.min(h.count,o.start+o.count);for(let _=f,g=p-1;_<g;_+=c){const m=Sa(this,e,ao,l,_,_+1,_);m&&t.push(m)}if(this.isLineLoop){const _=Sa(this,e,ao,l,p-1,f,p-1);_&&t.push(_)}}}updateMorphTargets(){const t=this.geometry.morphAttributes,i=Object.keys(t);if(i.length>0){const r=t[i[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,o=r.length;s<o;s++){const a=r[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=s}}}}}function Sa(n,e,t,i,r,s,o){const a=n.geometry.attributes.position;if(ml.fromBufferAttribute(a,r),gl.fromBufferAttribute(a,s),t.distanceSqToSegment(ml,gl,zc,ep)>i)return;zc.applyMatrix4(n.matrixWorld);const c=e.ray.origin.distanceTo(zc);if(!(c<e.near||c>e.far))return{distance:c,point:ep.clone().applyMatrix4(n.matrixWorld),index:o,face:null,faceIndex:null,barycoord:null,object:n}}const tp=new N,np=new N;class y_ extends Xr{constructor(e,t){super(e,t),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){const e=this.geometry;if(e.index===null){const t=e.attributes.position,i=[];for(let r=0,s=t.count;r<s;r+=2)tp.fromBufferAttribute(t,r),np.fromBufferAttribute(t,r+1),i[r]=r===0?0:i[r-1],i[r+1]=i[r]+tp.distanceTo(np);e.setAttribute("lineDistance",new St(i,1))}else Le("LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}}class _l extends $s{constructor(e){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new nt(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.size=e.size,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}}const ip=new Ct,ld=new zo,Ea=new Bo,Ma=new N;class cd extends gn{constructor(e=new At,t=new _l){super(),this.isPoints=!0,this.type="Points",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}raycast(e,t){const i=this.geometry,r=this.matrixWorld,s=e.params.Points.threshold,o=i.drawRange;if(i.boundingSphere===null&&i.computeBoundingSphere(),Ea.copy(i.boundingSphere),Ea.applyMatrix4(r),Ea.radius+=s,e.ray.intersectsSphere(Ea)===!1)return;ip.copy(r).invert(),ld.copy(e.ray).applyMatrix4(ip);const a=s/((this.scale.x+this.scale.y+this.scale.z)/3),l=a*a,c=i.index,d=i.attributes.position;if(c!==null){const h=Math.max(0,o.start),f=Math.min(c.count,o.start+o.count);for(let p=h,_=f;p<_;p++){const g=c.getX(p);Ma.fromBufferAttribute(d,g),rp(Ma,g,l,r,e,t,this)}}else{const h=Math.max(0,o.start),f=Math.min(d.count,o.start+o.count);for(let p=h,_=f;p<_;p++)Ma.fromBufferAttribute(d,p),rp(Ma,p,l,r,e,t,this)}}updateMorphTargets(){const t=this.geometry.morphAttributes,i=Object.keys(t);if(i.length>0){const r=t[i[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,o=r.length;s<o;s++){const a=r[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=s}}}}}function rp(n,e,t,i,r,s,o){const a=ld.distanceSqToPoint(n);if(a<t){const l=new N;ld.closestPointToPoint(n,l),l.applyMatrix4(i);const c=r.ray.origin.distanceTo(l);if(c<r.near||c>r.far)return;s.push({distance:c,distanceToRay:Math.sqrt(a),point:l,index:e,face:null,faceIndex:null,barycoord:null,object:o})}}class S_ extends cn{constructor(e=[],t=Vr,i,r,s,o,a,l,c,u){super(e,t,i,r,s,o,a,l,c,u),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}}class eh extends cn{constructor(e,t,i,r,s,o,a,l,c){super(e,t,i,r,s,o,a,l,c),this.isCanvasTexture=!0,this.needsUpdate=!0}}class Us extends cn{constructor(e,t,i=_i,r,s,o,a=nn,l=nn,c,u=Xi,d=1){if(u!==Xi&&u!==Br)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");const h={width:e,height:t,depth:d};super(h,r,s,o,a,l,u,i,c),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.source=new Kd(Object.assign({},e.image)),this.compareFunction=e.compareFunction,this}toJSON(e){const t=super.toJSON(e);return this.compareFunction!==null&&(t.compareFunction=this.compareFunction),t}}class rE extends Us{constructor(e,t=_i,i=Vr,r,s,o=nn,a=nn,l,c=Xi){const u={width:e,height:e,depth:1},d=[u,u,u,u,u,u];super(e,e,t,i,r,s,o,a,l,c),this.image=d,this.isCubeDepthTexture=!0,this.isCubeTexture=!0}get images(){return this.image}set images(e){this.image=e}}class E_ extends cn{constructor(e=null){super(),this.sourceTexture=e,this.isExternalTexture=!0}copy(e){return super.copy(e),this.sourceTexture=e.sourceTexture,this}}class Go extends At{constructor(e=1,t=1,i=1,r=1,s=1,o=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:i,widthSegments:r,heightSegments:s,depthSegments:o};const a=this;r=Math.floor(r),s=Math.floor(s),o=Math.floor(o);const l=[],c=[],u=[],d=[];let h=0,f=0;p("z","y","x",-1,-1,i,t,e,o,s,0),p("z","y","x",1,-1,i,t,-e,o,s,1),p("x","z","y",1,1,e,i,t,r,o,2),p("x","z","y",1,-1,e,i,-t,r,o,3),p("x","y","z",1,-1,e,t,i,r,s,4),p("x","y","z",-1,-1,e,t,-i,r,s,5),this.setIndex(l),this.setAttribute("position",new St(c,3)),this.setAttribute("normal",new St(u,3)),this.setAttribute("uv",new St(d,2));function p(_,g,m,v,E,x,w,S,C,b,T){const L=x/C,P=w/b,F=x/2,W=w/2,$=S/2,U=C+1,B=b+1;let H=0,Z=0;const J=new N;for(let ne=0;ne<B;ne++){const de=ne*P-W;for(let ye=0;ye<U;ye++){const Fe=ye*L-F;J[_]=Fe*v,J[g]=de*E,J[m]=$,c.push(J.x,J.y,J.z),J[_]=0,J[g]=0,J[m]=S>0?1:-1,u.push(J.x,J.y,J.z),d.push(ye/C),d.push(1-ne/b),H+=1}}for(let ne=0;ne<b;ne++)for(let de=0;de<C;de++){const ye=h+de+U*ne,Fe=h+de+U*(ne+1),et=h+(de+1)+U*(ne+1),Ie=h+(de+1)+U*ne;l.push(ye,Fe,Ie),l.push(Fe,et,Ie),Z+=6}a.addGroup(f,Z,T),f+=Z,h+=H}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Go(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}}class M_{constructor(){this.type="Curve",this.arcLengthDivisions=200,this.needsUpdate=!1,this.cacheArcLengths=null}getPoint(){Le("Curve: .getPoint() not implemented.")}getPointAt(e,t){const i=this.getUtoTmapping(e);return this.getPoint(i,t)}getPoints(e=5){const t=[];for(let i=0;i<=e;i++)t.push(this.getPoint(i/e));return t}getSpacedPoints(e=5){const t=[];for(let i=0;i<=e;i++)t.push(this.getPointAt(i/e));return t}getLength(){const e=this.getLengths();return e[e.length-1]}getLengths(e=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===e+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;const t=[];let i,r=this.getPoint(0),s=0;t.push(0);for(let o=1;o<=e;o++)i=this.getPoint(o/e),s+=i.distanceTo(r),t.push(s),r=i;return this.cacheArcLengths=t,t}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(e,t=null){const i=this.getLengths();let r=0;const s=i.length;let o;t?o=t:o=e*i[s-1];let a=0,l=s-1,c;for(;a<=l;)if(r=Math.floor(a+(l-a)/2),c=i[r]-o,c<0)a=r+1;else if(c>0)l=r-1;else{l=r;break}if(r=l,i[r]===o)return r/(s-1);const u=i[r],h=i[r+1]-u,f=(o-u)/h;return(r+f)/(s-1)}getTangent(e,t){let r=e-1e-4,s=e+1e-4;r<0&&(r=0),s>1&&(s=1);const o=this.getPoint(r),a=this.getPoint(s),l=t||(o.isVector2?new We:new N);return l.copy(a).sub(o).normalize(),l}getTangentAt(e,t){const i=this.getUtoTmapping(e);return this.getTangent(i,t)}computeFrenetFrames(e,t=!1){const i=new N,r=[],s=[],o=[],a=new N,l=new Ct;for(let f=0;f<=e;f++){const p=f/e;r[f]=this.getTangentAt(p,new N)}s[0]=new N,o[0]=new N;let c=Number.MAX_VALUE;const u=Math.abs(r[0].x),d=Math.abs(r[0].y),h=Math.abs(r[0].z);u<=c&&(c=u,i.set(1,0,0)),d<=c&&(c=d,i.set(0,1,0)),h<=c&&i.set(0,0,1),a.crossVectors(r[0],i).normalize(),s[0].crossVectors(r[0],a),o[0].crossVectors(r[0],s[0]);for(let f=1;f<=e;f++){if(s[f]=s[f-1].clone(),o[f]=o[f-1].clone(),a.crossVectors(r[f-1],r[f]),a.length()>Number.EPSILON){a.normalize();const p=Math.acos(Ke(r[f-1].dot(r[f]),-1,1));s[f].applyMatrix4(l.makeRotationAxis(a,p))}o[f].crossVectors(r[f],s[f])}if(t===!0){let f=Math.acos(Ke(s[0].dot(s[e]),-1,1));f/=e,r[0].dot(a.crossVectors(s[0],s[e]))>0&&(f=-f);for(let p=1;p<=e;p++)s[p].applyMatrix4(l.makeRotationAxis(r[p],f*p)),o[p].crossVectors(r[p],s[p])}return{tangents:r,normals:s,binormals:o}}clone(){return new this.constructor().copy(this)}copy(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}toJSON(){const e={metadata:{version:4.7,type:"Curve",generator:"Curve.toJSON"}};return e.arcLengthDivisions=this.arcLengthDivisions,e.type=this.type,e}fromJSON(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}}function th(){let n=0,e=0,t=0,i=0;function r(s,o,a,l){n=s,e=a,t=-3*s+3*o-2*a-l,i=2*s-2*o+a+l}return{initCatmullRom:function(s,o,a,l,c){r(o,a,c*(a-s),c*(l-o))},initNonuniformCatmullRom:function(s,o,a,l,c,u,d){let h=(o-s)/c-(a-s)/(c+u)+(a-o)/u,f=(a-o)/u-(l-o)/(u+d)+(l-a)/d;h*=u,f*=u,r(o,a,h,f)},calc:function(s){const o=s*s,a=o*s;return n+e*s+t*o+i*a}}}const sp=new N,op=new N,Gc=new th,Hc=new th,Vc=new th;class sE extends M_{constructor(e=[],t=!1,i="centripetal",r=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=e,this.closed=t,this.curveType=i,this.tension=r}getPoint(e,t=new N){const i=t,r=this.points,s=r.length,o=(s-(this.closed?0:1))*e;let a=Math.floor(o),l=o-a;this.closed?a+=a>0?0:(Math.floor(Math.abs(a)/s)+1)*s:l===0&&a===s-1&&(a=s-2,l=1);let c,u;this.closed||a>0?c=r[(a-1)%s]:(op.subVectors(r[0],r[1]).add(r[0]),c=op);const d=r[a%s],h=r[(a+1)%s];if(this.closed||a+2<s?u=r[(a+2)%s]:(sp.subVectors(r[s-1],r[s-2]).add(r[s-1]),u=sp),this.curveType==="centripetal"||this.curveType==="chordal"){const f=this.curveType==="chordal"?.5:.25;let p=Math.pow(c.distanceToSquared(d),f),_=Math.pow(d.distanceToSquared(h),f),g=Math.pow(h.distanceToSquared(u),f);_<1e-4&&(_=1),p<1e-4&&(p=_),g<1e-4&&(g=_),Gc.initNonuniformCatmullRom(c.x,d.x,h.x,u.x,p,_,g),Hc.initNonuniformCatmullRom(c.y,d.y,h.y,u.y,p,_,g),Vc.initNonuniformCatmullRom(c.z,d.z,h.z,u.z,p,_,g)}else this.curveType==="catmullrom"&&(Gc.initCatmullRom(c.x,d.x,h.x,u.x,this.tension),Hc.initCatmullRom(c.y,d.y,h.y,u.y,this.tension),Vc.initCatmullRom(c.z,d.z,h.z,u.z,this.tension));return i.set(Gc.calc(l),Hc.calc(l),Vc.calc(l)),i}copy(e){super.copy(e),this.points=[];for(let t=0,i=e.points.length;t<i;t++){const r=e.points[t];this.points.push(r.clone())}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}toJSON(){const e=super.toJSON();e.points=[];for(let t=0,i=this.points.length;t<i;t++){const r=this.points[t];e.points.push(r.toArray())}return e.closed=this.closed,e.curveType=this.curveType,e.tension=this.tension,e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,i=e.points.length;t<i;t++){const r=e.points[t];this.points.push(new N().fromArray(r))}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}}function oE(n,e){const t=1-n;return t*t*e}function aE(n,e){return 2*(1-n)*n*e}function lE(n,e){return n*n*e}function Wc(n,e,t,i){return oE(n,e)+aE(n,t)+lE(n,i)}class cE extends M_{constructor(e=new N,t=new N,i=new N){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=e,this.v1=t,this.v2=i}getPoint(e,t=new N){const i=t,r=this.v0,s=this.v1,o=this.v2;return i.set(Wc(e,r.x,s.x,o.x),Wc(e,r.y,s.y,o.y),Wc(e,r.z,s.z,o.z)),i}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class Gl extends At{constructor(e=1,t=1,i=1,r=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:i,heightSegments:r};const s=e/2,o=t/2,a=Math.floor(i),l=Math.floor(r),c=a+1,u=l+1,d=e/a,h=t/l,f=[],p=[],_=[],g=[];for(let m=0;m<u;m++){const v=m*h-o;for(let E=0;E<c;E++){const x=E*d-s;p.push(x,-v,0),_.push(0,0,1),g.push(E/a),g.push(1-m/l)}}for(let m=0;m<l;m++)for(let v=0;v<a;v++){const E=v+c*m,x=v+c*(m+1),w=v+1+c*(m+1),S=v+1+c*m;f.push(E,x,S),f.push(x,w,S)}this.setIndex(f),this.setAttribute("position",new St(p,3)),this.setAttribute("normal",new St(_,3)),this.setAttribute("uv",new St(g,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Gl(e.width,e.height,e.widthSegments,e.heightSegments)}}class nh extends At{constructor(e=1,t=32,i=16,r=0,s=Math.PI*2,o=0,a=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:e,widthSegments:t,heightSegments:i,phiStart:r,phiLength:s,thetaStart:o,thetaLength:a},t=Math.max(3,Math.floor(t)),i=Math.max(2,Math.floor(i));const l=Math.min(o+a,Math.PI);let c=0;const u=[],d=new N,h=new N,f=[],p=[],_=[],g=[];for(let m=0;m<=i;m++){const v=[],E=m/i;let x=0;m===0&&o===0?x=.5/t:m===i&&l===Math.PI&&(x=-.5/t);for(let w=0;w<=t;w++){const S=w/t;d.x=-e*Math.cos(r+S*s)*Math.sin(o+E*a),d.y=e*Math.cos(o+E*a),d.z=e*Math.sin(r+S*s)*Math.sin(o+E*a),p.push(d.x,d.y,d.z),h.copy(d).normalize(),_.push(h.x,h.y,h.z),g.push(S+x,1-E),v.push(c++)}u.push(v)}for(let m=0;m<i;m++)for(let v=0;v<t;v++){const E=u[m][v+1],x=u[m][v],w=u[m+1][v],S=u[m+1][v+1];(m!==0||o>0)&&f.push(E,x,S),(m!==i-1||l<Math.PI)&&f.push(x,w,S)}this.setIndex(f),this.setAttribute("position",new St(p,3)),this.setAttribute("normal",new St(_,3)),this.setAttribute("uv",new St(g,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new nh(e.radius,e.widthSegments,e.heightSegments,e.phiStart,e.phiLength,e.thetaStart,e.thetaLength)}}function Fs(n){const e={};for(const t in n){e[t]={};for(const i in n[t]){const r=n[t][i];if(ap(r))r.isRenderTargetTexture?(Le("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][i]=null):e[t][i]=r.clone();else if(Array.isArray(r))if(ap(r[0])){const s=[];for(let o=0,a=r.length;o<a;o++)s[o]=r[o].clone();e[t][i]=s}else e[t][i]=r.slice();else e[t][i]=r}}return e}function fn(n){const e={};for(let t=0;t<n.length;t++){const i=Fs(n[t]);for(const r in i)e[r]=i[r]}return e}function ap(n){return n&&(n.isColor||n.isMatrix3||n.isMatrix4||n.isVector2||n.isVector3||n.isVector4||n.isTexture||n.isQuaternion)}function uE(n){const e=[];for(let t=0;t<n.length;t++)e.push(n[t].clone());return e}function w_(n){const e=n.getRenderTarget();return e===null?n.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:Je.workingColorSpace}const dE={clone:Fs,merge:fn};var hE=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,fE=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class xi extends $s{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=hE,this.fragmentShader=fE,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=Fs(e.uniforms),this.uniformsGroups=uE(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this.defaultAttributeValues=Object.assign({},e.defaultAttributeValues),this.index0AttributeName=e.index0AttributeName,this.uniformsNeedUpdate=e.uniformsNeedUpdate,this}toJSON(e){const t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(const r in this.uniforms){const o=this.uniforms[r].value;o&&o.isTexture?t.uniforms[r]={type:"t",value:o.toJSON(e).uuid}:o&&o.isColor?t.uniforms[r]={type:"c",value:o.getHex()}:o&&o.isVector2?t.uniforms[r]={type:"v2",value:o.toArray()}:o&&o.isVector3?t.uniforms[r]={type:"v3",value:o.toArray()}:o&&o.isVector4?t.uniforms[r]={type:"v4",value:o.toArray()}:o&&o.isMatrix3?t.uniforms[r]={type:"m3",value:o.toArray()}:o&&o.isMatrix4?t.uniforms[r]={type:"m4",value:o.toArray()}:t.uniforms[r]={value:o}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;const i={};for(const r in this.extensions)this.extensions[r]===!0&&(i[r]=!0);return Object.keys(i).length>0&&(t.extensions=i),t}}class pE extends xi{constructor(e){super(e),this.isRawShaderMaterial=!0,this.type="RawShaderMaterial"}}class mE extends $s{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=yS,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}}class gE extends $s{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}}class _E extends ji{constructor(e){super(),this.isLineDashedMaterial=!0,this.type="LineDashedMaterial",this.scale=1,this.dashSize=3,this.gapSize=1,this.setValues(e)}copy(e){return super.copy(e),this.scale=e.scale,this.dashSize=e.dashSize,this.gapSize=e.gapSize,this}}const wa=new N,Ta=new Er,oi=new N;class T_ extends gn{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new Ct,this.projectionMatrix=new Ct,this.projectionMatrixInverse=new Ct,this.coordinateSystem=fi,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorld.decompose(wa,Ta,oi),oi.x===1&&oi.y===1&&oi.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(wa,Ta,oi.set(1,1,1)).invert()}updateWorldMatrix(e,t){super.updateWorldMatrix(e,t),this.matrixWorld.decompose(wa,Ta,oi),oi.x===1&&oi.y===1&&oi.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(wa,Ta,oi.set(1,1,1)).invert()}clone(){return new this.constructor().copy(this)}}const or=new N,lp=new We,cp=new We;class Nn extends T_{constructor(e=50,t=1,i=.1,r=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=i,this.far=r,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){const t=.5*this.getFilmHeight()/e;this.fov=ad*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){const e=Math.tan(Va*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return ad*2*Math.atan(Math.tan(Va*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,i){or.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(or.x,or.y).multiplyScalar(-e/or.z),or.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),i.set(or.x,or.y).multiplyScalar(-e/or.z)}getViewSize(e,t){return this.getViewBounds(e,lp,cp),t.subVectors(cp,lp)}setViewOffset(e,t,i,r,s,o){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=i,this.view.offsetY=r,this.view.width=s,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=this.near;let t=e*Math.tan(Va*.5*this.fov)/this.zoom,i=2*t,r=this.aspect*i,s=-.5*r;const o=this.view;if(this.view!==null&&this.view.enabled){const l=o.fullWidth,c=o.fullHeight;s+=o.offsetX*r/l,t-=o.offsetY*i/c,r*=o.width/l,i*=o.height/c}const a=this.filmOffset;a!==0&&(s+=e*a/this.getFilmWidth()),this.projectionMatrix.makePerspective(s,s+r,t,t-i,e,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}}class A_ extends T_{constructor(e=-1,t=1,i=1,r=-1,s=.1,o=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=i,this.bottom=r,this.near=s,this.far=o,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,i,r,s,o){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=i,this.view.offsetY=r,this.view.width=s,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),i=(this.right+this.left)/2,r=(this.top+this.bottom)/2;let s=i-e,o=i+e,a=r+t,l=r-t;if(this.view!==null&&this.view.enabled){const c=(this.right-this.left)/this.view.fullWidth/this.zoom,u=(this.top-this.bottom)/this.view.fullHeight/this.zoom;s+=c*this.view.offsetX,o=s+c*this.view.width,a-=u*this.view.offsetY,l=a-u*this.view.height}this.projectionMatrix.makeOrthographic(s,o,a,l,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}}const us=-90,ds=1;class vE extends gn{constructor(e,t,i){super(),this.type="CubeCamera",this.renderTarget=i,this.coordinateSystem=null,this.activeMipmapLevel=0;const r=new Nn(us,ds,e,t);r.layers=this.layers,this.add(r);const s=new Nn(us,ds,e,t);s.layers=this.layers,this.add(s);const o=new Nn(us,ds,e,t);o.layers=this.layers,this.add(o);const a=new Nn(us,ds,e,t);a.layers=this.layers,this.add(a);const l=new Nn(us,ds,e,t);l.layers=this.layers,this.add(l);const c=new Nn(us,ds,e,t);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){const e=this.coordinateSystem,t=this.children.concat(),[i,r,s,o,a,l]=t;for(const c of t)this.remove(c);if(e===fi)i.up.set(0,1,0),i.lookAt(1,0,0),r.up.set(0,1,0),r.lookAt(-1,0,0),s.up.set(0,0,-1),s.lookAt(0,1,0),o.up.set(0,0,1),o.lookAt(0,-1,0),a.up.set(0,1,0),a.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(e===fl)i.up.set(0,-1,0),i.lookAt(-1,0,0),r.up.set(0,-1,0),r.lookAt(1,0,0),s.up.set(0,0,1),s.lookAt(0,1,0),o.up.set(0,0,-1),o.lookAt(0,-1,0),a.up.set(0,-1,0),a.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(const c of t)this.add(c),c.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();const{renderTarget:i,activeMipmapLevel:r}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());const[s,o,a,l,c,u]=this.children,d=e.getRenderTarget(),h=e.getActiveCubeFace(),f=e.getActiveMipmapLevel(),p=e.xr.enabled;e.xr.enabled=!1;const _=i.texture.generateMipmaps;i.texture.generateMipmaps=!1;let g=!1;e.isWebGLRenderer===!0?g=e.state.buffers.depth.getReversed():g=e.reversedDepthBuffer,e.setRenderTarget(i,0,r),g&&e.autoClear===!1&&e.clearDepth(),e.render(t,s),e.setRenderTarget(i,1,r),g&&e.autoClear===!1&&e.clearDepth(),e.render(t,o),e.setRenderTarget(i,2,r),g&&e.autoClear===!1&&e.clearDepth(),e.render(t,a),e.setRenderTarget(i,3,r),g&&e.autoClear===!1&&e.clearDepth(),e.render(t,l),e.setRenderTarget(i,4,r),g&&e.autoClear===!1&&e.clearDepth(),e.render(t,c),i.texture.generateMipmaps=_,e.setRenderTarget(i,5,r),g&&e.autoClear===!1&&e.clearDepth(),e.render(t,u),e.setRenderTarget(d,h,f),e.xr.enabled=p,i.texture.needsPMREMUpdate=!0}}class xE extends Nn{constructor(e=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=e}}const up=new Ct;class bE{constructor(e,t,i=0,r=1/0){this.ray=new zo(e,t),this.near=i,this.far=r,this.camera=null,this.layers=new Zd,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(e,t){this.ray.set(e,t)}setFromCamera(e,t){t.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(e.x,e.y,.5).unproject(t).sub(this.ray.origin).normalize(),this.camera=t):t.isOrthographicCamera?(this.ray.origin.set(e.x,e.y,(t.near+t.far)/(t.near-t.far)).unproject(t),this.ray.direction.set(0,0,-1).transformDirection(t.matrixWorld),this.camera=t):Qe("Raycaster: Unsupported camera type: "+t.type)}setFromXRController(e){return up.identity().extractRotation(e.matrixWorld),this.ray.origin.setFromMatrixPosition(e.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4(up),this}intersectObject(e,t=!0,i=[]){return ud(e,this,i,t),i.sort(dp),i}intersectObjects(e,t=!0,i=[]){for(let r=0,s=e.length;r<s;r++)ud(e[r],this,i,t);return i.sort(dp),i}}function dp(n,e){return n.distance-e.distance}function ud(n,e,t,i){let r=!0;if(n.layers.test(e.layers)&&n.raycast(e,t)===!1&&(r=!1),r===!0&&i===!0){const s=n.children;for(let o=0,a=s.length;o<a;o++)ud(s[o],e,t,!0)}}class hp{constructor(e=1,t=0,i=0){this.radius=e,this.phi=t,this.theta=i}set(e,t,i){return this.radius=e,this.phi=t,this.theta=i,this}copy(e){return this.radius=e.radius,this.phi=e.phi,this.theta=e.theta,this}makeSafe(){return this.phi=Ke(this.phi,1e-6,Math.PI-1e-6),this}setFromVector3(e){return this.setFromCartesianCoords(e.x,e.y,e.z)}setFromCartesianCoords(e,t,i){return this.radius=Math.sqrt(e*e+t*t+i*i),this.radius===0?(this.theta=0,this.phi=0):(this.theta=Math.atan2(e,i),this.phi=Math.acos(Ke(t/this.radius,-1,1))),this}clone(){return new this.constructor().copy(this)}}const yh=class yh{constructor(e,t,i,r){this.elements=[1,0,0,1],e!==void 0&&this.set(e,t,i,r)}identity(){return this.set(1,0,0,1),this}fromArray(e,t=0){for(let i=0;i<4;i++)this.elements[i]=e[i+t];return this}set(e,t,i,r){const s=this.elements;return s[0]=e,s[2]=t,s[1]=i,s[3]=r,this}};yh.prototype.isMatrix2=!0;let fp=yh;class yE extends y_{constructor(e=10,t=10,i=4473924,r=8947848){i=new nt(i),r=new nt(r);const s=t/2,o=e/t,a=e/2,l=[],c=[];for(let h=0,f=0,p=-a;h<=t;h++,p+=o){l.push(-a,0,p,a,0,p),l.push(p,0,-a,p,0,a);const _=h===s?i:r;_.toArray(c,f),f+=3,_.toArray(c,f),f+=3,_.toArray(c,f),f+=3,_.toArray(c,f),f+=3}const u=new At;u.setAttribute("position",new St(l,3)),u.setAttribute("color",new St(c,3));const d=new ji({vertexColors:!0,toneMapped:!1});super(u,d),this.type="GridHelper"}dispose(){this.geometry.dispose(),this.material.dispose()}}class SE extends wr{constructor(e,t=null){super(),this.object=e,this.domElement=t,this.enabled=!0,this.state=-1,this.keys={},this.mouseButtons={LEFT:null,MIDDLE:null,RIGHT:null},this.touches={ONE:null,TWO:null}}connect(e){if(e===void 0){Le("Controls: connect() now requires an element.");return}this.domElement!==null&&this.disconnect(),this.domElement=e}disconnect(){}dispose(){}update(){}}function pp(n,e,t,i){const r=EE(i);switch(t){case h_:return n*e;case p_:return n*e/r.components*r.byteLength;case $d:return n*e/r.components*r.byteLength;case Wr:return n*e*2/r.components*r.byteLength;case Xd:return n*e*2/r.components*r.byteLength;case f_:return n*e*3/r.components*r.byteLength;case Qn:return n*e*4/r.components*r.byteLength;case jd:return n*e*4/r.components*r.byteLength;case Ba:case za:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*8;case Ga:case Ha:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*16;case Lu:case Nu:return Math.max(n,16)*Math.max(e,8)/4;case Pu:case Du:return Math.max(n,8)*Math.max(e,8)/2;case Iu:case Uu:case Ou:case ku:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*8;case Fu:case cl:case Bu:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*16;case zu:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*16;case Gu:return Math.floor((n+4)/5)*Math.floor((e+3)/4)*16;case Hu:return Math.floor((n+4)/5)*Math.floor((e+4)/5)*16;case Vu:return Math.floor((n+5)/6)*Math.floor((e+4)/5)*16;case Wu:return Math.floor((n+5)/6)*Math.floor((e+5)/6)*16;case $u:return Math.floor((n+7)/8)*Math.floor((e+4)/5)*16;case Xu:return Math.floor((n+7)/8)*Math.floor((e+5)/6)*16;case ju:return Math.floor((n+7)/8)*Math.floor((e+7)/8)*16;case Yu:return Math.floor((n+9)/10)*Math.floor((e+4)/5)*16;case qu:return Math.floor((n+9)/10)*Math.floor((e+5)/6)*16;case Ku:return Math.floor((n+9)/10)*Math.floor((e+7)/8)*16;case Zu:return Math.floor((n+9)/10)*Math.floor((e+9)/10)*16;case Ju:return Math.floor((n+11)/12)*Math.floor((e+9)/10)*16;case Qu:return Math.floor((n+11)/12)*Math.floor((e+11)/12)*16;case ed:case td:case nd:return Math.ceil(n/4)*Math.ceil(e/4)*16;case id:case rd:return Math.ceil(n/4)*Math.ceil(e/4)*8;case ul:case sd:return Math.ceil(n/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${t} format.`)}function EE(n){switch(n){case Un:case l_:return{byteLength:1,components:1};case Po:case c_:case $i:return{byteLength:2,components:1};case Vd:case Wd:return{byteLength:2,components:4};case _i:case Hd:case hi:return{byteLength:4,components:1};case u_:case d_:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${n}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:Gd}}));typeof window<"u"&&(window.__THREE__?Le("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=Gd);/**
 * @license
 * Copyright 2010-2026 Three.js Authors
 * SPDX-License-Identifier: MIT
 */function C_(){let n=null,e=!1,t=null,i=null;function r(s,o){t(s,o),i=n.requestAnimationFrame(r)}return{start:function(){e!==!0&&t!==null&&n!==null&&(i=n.requestAnimationFrame(r),e=!0)},stop:function(){n!==null&&n.cancelAnimationFrame(i),e=!1},setAnimationLoop:function(s){t=s},setContext:function(s){n=s}}}function ME(n){const e=new WeakMap;function t(a,l){const c=a.array,u=a.usage,d=c.byteLength,h=n.createBuffer();n.bindBuffer(l,h),n.bufferData(l,c,u),a.onUploadCallback();let f;if(c instanceof Float32Array)f=n.FLOAT;else if(typeof Float16Array<"u"&&c instanceof Float16Array)f=n.HALF_FLOAT;else if(c instanceof Uint16Array)a.isFloat16BufferAttribute?f=n.HALF_FLOAT:f=n.UNSIGNED_SHORT;else if(c instanceof Int16Array)f=n.SHORT;else if(c instanceof Uint32Array)f=n.UNSIGNED_INT;else if(c instanceof Int32Array)f=n.INT;else if(c instanceof Int8Array)f=n.BYTE;else if(c instanceof Uint8Array)f=n.UNSIGNED_BYTE;else if(c instanceof Uint8ClampedArray)f=n.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+c);return{buffer:h,type:f,bytesPerElement:c.BYTES_PER_ELEMENT,version:a.version,size:d}}function i(a,l,c){const u=l.array,d=l.updateRanges;if(n.bindBuffer(c,a),d.length===0)n.bufferSubData(c,0,u);else{d.sort((f,p)=>f.start-p.start);let h=0;for(let f=1;f<d.length;f++){const p=d[h],_=d[f];_.start<=p.start+p.count+1?p.count=Math.max(p.count,_.start+_.count-p.start):(++h,d[h]=_)}d.length=h+1;for(let f=0,p=d.length;f<p;f++){const _=d[f];n.bufferSubData(c,_.start*u.BYTES_PER_ELEMENT,u,_.start,_.count)}l.clearUpdateRanges()}l.onUploadCallback()}function r(a){return a.isInterleavedBufferAttribute&&(a=a.data),e.get(a)}function s(a){a.isInterleavedBufferAttribute&&(a=a.data);const l=e.get(a);l&&(n.deleteBuffer(l.buffer),e.delete(a))}function o(a,l){if(a.isInterleavedBufferAttribute&&(a=a.data),a.isGLBufferAttribute){const u=e.get(a);(!u||u.version<a.version)&&e.set(a,{buffer:a.buffer,type:a.type,bytesPerElement:a.elementSize,version:a.version});return}const c=e.get(a);if(c===void 0)e.set(a,t(a,l));else if(c.version<a.version){if(c.size!==a.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");i(c.buffer,a,l),c.version=a.version}}return{get:r,remove:s,update:o}}var wE=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,TE=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,AE=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,CE=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,RE=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,PE=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,LE=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,DE=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,NE=`#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec4 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 );
	}
#endif`,IE=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,UE=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,FE=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,OE=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,kE=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,BE=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,zE=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,GE=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,HE=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,VE=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,WE=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#endif`,$E=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#endif`,XE=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec4 vColor;
#endif`,jE=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec4( 1.0 );
#endif
#ifdef USE_COLOR_ALPHA
	vColor *= color;
#elif defined( USE_COLOR )
	vColor.rgb *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.rgb *= instanceColor.rgb;
#endif
#ifdef USE_BATCHING_COLOR
	vColor *= getBatchingColor( getIndirectIndex( gl_DrawID ) );
#endif`,YE=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
vec3 inverseTransformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,qE=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,KE=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
	#ifdef FLIP_SIDED
		transformedTangent = - transformedTangent;
	#endif
#endif`,ZE=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,JE=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,QE=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,eM=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,tM="gl_FragColor = linearToOutputTexel( gl_FragColor );",nM=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,iM=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * reflectVec );
		#ifdef ENVMAP_BLENDING_MULTIPLY
			outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_MIX )
			outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_ADD )
			outgoingLight += envColor.xyz * specularStrength * reflectivity;
		#endif
	#endif
#endif`,rM=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
#endif`,sM=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,oM=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,aM=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,lM=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,cM=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,uM=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,dM=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,hM=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,fM=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,pM=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,mM=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,gM=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif
#include <lightprobes_pars_fragment>`,_M=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, pow4( roughness ) ) );
			reflectVec = inverseTransformDirection( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
#endif`,vM=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,xM=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,bM=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,yM=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,SM=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.diffuseContribution = diffuseColor.rgb * ( 1.0 - metalnessFactor );
material.metalness = metalnessFactor;
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor;
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = vec3( 0.04 );
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.0001, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,EM=`uniform sampler2D dfgLUT;
struct PhysicalMaterial {
	vec3 diffuseColor;
	vec3 diffuseContribution;
	vec3 specularColor;
	vec3 specularColorBlended;
	float roughness;
	float metalness;
	float specularF90;
	float dispersion;
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0;
		vec3 iridescenceFresnelDielectric;
		vec3 iridescenceFresnelMetallic;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		return 0.5 / max( gv + gl, EPSILON );
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColorBlended;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transpose( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float rInv = 1.0 / ( roughness + 0.1 );
	float a = -1.9362 + 1.0678 * roughness + 0.4573 * r2 - 0.8469 * rInv;
	float b = -0.6014 + 0.5538 * roughness - 0.4670 * r2 - 0.1255 * rInv;
	float DG = exp( a * dotNV + b );
	return saturate( DG );
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 fab = texture2D( dfgLUT, vec2( roughness, dotNV ) ).rg;
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 fab = texture2D( dfgLUT, vec2( roughness, dotNV ) ).rg;
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
vec3 BRDF_GGX_Multiscatter( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 singleScatter = BRDF_GGX( lightDir, viewDir, normal, material );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 dfgV = texture2D( dfgLUT, vec2( material.roughness, dotNV ) ).rg;
	vec2 dfgL = texture2D( dfgLUT, vec2( material.roughness, dotNL ) ).rg;
	vec3 FssEss_V = material.specularColorBlended * dfgV.x + material.specularF90 * dfgV.y;
	vec3 FssEss_L = material.specularColorBlended * dfgL.x + material.specularF90 * dfgL.y;
	float Ess_V = dfgV.x + dfgV.y;
	float Ess_L = dfgL.x + dfgL.y;
	float Ems_V = 1.0 - Ess_V;
	float Ems_L = 1.0 - Ess_L;
	vec3 Favg = material.specularColorBlended + ( 1.0 - material.specularColorBlended ) * 0.047619;
	vec3 Fms = FssEss_V * FssEss_L * Favg / ( 1.0 - Ems_V * Ems_L * Favg + EPSILON );
	float compensationFactor = Ems_V * Ems_L;
	vec3 multiScatter = Fms * compensationFactor;
	return singleScatter + multiScatter;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColorBlended * t2.x + ( material.specularF90 - material.specularColorBlended ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseContribution * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
		#ifdef USE_CLEARCOAT
			vec3 Ncc = geometryClearcoatNormal;
			vec2 uvClearcoat = LTC_Uv( Ncc, viewDir, material.clearcoatRoughness );
			vec4 t1Clearcoat = texture2D( ltc_1, uvClearcoat );
			vec4 t2Clearcoat = texture2D( ltc_2, uvClearcoat );
			mat3 mInvClearcoat = mat3(
				vec3( t1Clearcoat.x, 0, t1Clearcoat.y ),
				vec3(             0, 1,             0 ),
				vec3( t1Clearcoat.z, 0, t1Clearcoat.w )
			);
			vec3 fresnelClearcoat = material.clearcoatF0 * t2Clearcoat.x + ( material.clearcoatF90 - material.clearcoatF0 ) * t2Clearcoat.y;
			clearcoatSpecularDirect += lightColor * fresnelClearcoat * LTC_Evaluate( Ncc, viewDir, position, mInvClearcoat, rectCoords );
		#endif
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
 
 		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
 
 		float sheenAlbedoV = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
 		float sheenAlbedoL = IBLSheenBRDF( geometryNormal, directLight.direction, material.sheenRoughness );
 
 		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * max( sheenAlbedoV, sheenAlbedoL );
 
 		irradiance *= sheenEnergyComp;
 
 	#endif
	reflectedLight.directSpecular += irradiance * BRDF_GGX_Multiscatter( directLight.direction, geometryViewDir, geometryNormal, material );
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseContribution );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 diffuse = irradiance * BRDF_Lambert( material.diffuseContribution );
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		diffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectDiffuse += diffuse;
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness ) * RECIPROCAL_PI;
 	#endif
	vec3 singleScatteringDielectric = vec3( 0.0 );
	vec3 multiScatteringDielectric = vec3( 0.0 );
	vec3 singleScatteringMetallic = vec3( 0.0 );
	vec3 multiScatteringMetallic = vec3( 0.0 );
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnelDielectric, material.roughness, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.diffuseColor, material.specularF90, material.iridescence, material.iridescenceFresnelMetallic, material.roughness, singleScatteringMetallic, multiScatteringMetallic );
	#else
		computeMultiscattering( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.roughness, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscattering( geometryNormal, geometryViewDir, material.diffuseColor, material.specularF90, material.roughness, singleScatteringMetallic, multiScatteringMetallic );
	#endif
	vec3 singleScattering = mix( singleScatteringDielectric, singleScatteringMetallic, material.metalness );
	vec3 multiScattering = mix( multiScatteringDielectric, multiScatteringMetallic, material.metalness );
	vec3 totalScatteringDielectric = singleScatteringDielectric + multiScatteringDielectric;
	vec3 diffuse = material.diffuseContribution * ( 1.0 - totalScatteringDielectric );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	vec3 indirectSpecular = radiance * singleScattering;
	indirectSpecular += multiScattering * cosineWeightedIrradiance;
	vec3 indirectDiffuse = diffuse * cosineWeightedIrradiance;
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		indirectSpecular *= sheenEnergyComp;
		indirectDiffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectSpecular += indirectSpecular;
	reflectedLight.indirectDiffuse += indirectDiffuse;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,MM=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		material.iridescenceFresnelDielectric = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		material.iridescenceFresnelMetallic = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.diffuseColor );
		material.iridescenceFresnel = mix( material.iridescenceFresnelDielectric, material.iridescenceFresnelMetallic, material.metalness );
		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );
	}
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS ) && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
	#ifdef USE_LIGHT_PROBES_GRID
		vec3 probeWorldPos = ( ( vec4( geometryPosition, 1.0 ) - viewMatrix[ 3 ] ) * viewMatrix ).xyz;
		vec3 probeWorldNormal = inverseTransformDirection( geometryNormal, viewMatrix );
		irradiance += getLightProbeGridIrradiance( probeWorldPos, probeWorldNormal );
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,wM=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( ENVMAP_TYPE_CUBE_UV )
		#if defined( STANDARD ) || defined( LAMBERT ) || defined( PHONG )
			iblIrradiance += getIBLIrradiance( geometryNormal );
		#endif
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		radiance += getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		radiance += getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,TM=`#if defined( RE_IndirectDiffuse )
	#if defined( LAMBERT ) || defined( PHONG )
		irradiance += iblIrradiance;
	#endif
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,AM=`#ifdef USE_LIGHT_PROBES_GRID
uniform highp sampler3D probesSH;
uniform vec3 probesMin;
uniform vec3 probesMax;
uniform vec3 probesResolution;
vec3 getLightProbeGridIrradiance( vec3 worldPos, vec3 worldNormal ) {
	vec3 res = probesResolution;
	vec3 gridRange = probesMax - probesMin;
	vec3 resMinusOne = res - 1.0;
	vec3 probeSpacing = gridRange / resMinusOne;
	vec3 samplePos = worldPos + worldNormal * probeSpacing * 0.5;
	vec3 uvw = clamp( ( samplePos - probesMin ) / gridRange, 0.0, 1.0 );
	uvw = uvw * resMinusOne / res + 0.5 / res;
	float nz          = res.z;
	float paddedSlices = nz + 2.0;
	float atlasDepth  = 7.0 * paddedSlices;
	float uvZBase     = uvw.z * nz + 1.0;
	vec4 s0 = texture( probesSH, vec3( uvw.xy, ( uvZBase                       ) / atlasDepth ) );
	vec4 s1 = texture( probesSH, vec3( uvw.xy, ( uvZBase +       paddedSlices   ) / atlasDepth ) );
	vec4 s2 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 2.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s3 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 3.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s4 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 4.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s5 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 5.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s6 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 6.0 * paddedSlices   ) / atlasDepth ) );
	vec3 c0 = s0.xyz;
	vec3 c1 = vec3( s0.w, s1.xy );
	vec3 c2 = vec3( s1.zw, s2.x );
	vec3 c3 = s2.yzw;
	vec3 c4 = s3.xyz;
	vec3 c5 = vec3( s3.w, s4.xy );
	vec3 c6 = vec3( s4.zw, s5.x );
	vec3 c7 = s5.yzw;
	vec3 c8 = s6.xyz;
	float x = worldNormal.x, y = worldNormal.y, z = worldNormal.z;
	vec3 result = c0 * 0.886227;
	result += c1 * 2.0 * 0.511664 * y;
	result += c2 * 2.0 * 0.511664 * z;
	result += c3 * 2.0 * 0.511664 * x;
	result += c4 * 2.0 * 0.429043 * x * y;
	result += c5 * 2.0 * 0.429043 * y * z;
	result += c6 * ( 0.743125 * z * z - 0.247708 );
	result += c7 * 2.0 * 0.429043 * x * z;
	result += c8 * 0.429043 * ( x * x - y * y );
	return max( result, vec3( 0.0 ) );
}
#endif`,CM=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,RM=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,PM=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,LM=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,DM=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,NM=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,IM=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,UM=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,FM=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,OM=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,kM=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,BM=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,zM=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,GM=`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,HM=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,VM=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,WM=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#if defined( USE_PACKED_NORMALMAP )
		mapN = vec3( mapN.xy, sqrt( saturate( 1.0 - dot( mapN.xy, mapN.xy ) ) ) );
	#endif
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,$M=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,XM=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,jM=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,YM=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,qM=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,KM=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,ZM=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,JM=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,QM=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,ew=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	#ifdef USE_REVERSED_DEPTH_BUFFER
	
		return depth * ( far - near ) - far;
	#else
		return depth * ( near - far ) - near;
	#endif
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	
	#ifdef USE_REVERSED_DEPTH_BUFFER
		return ( near * far ) / ( ( near - far ) * depth - near );
	#else
		return ( near * far ) / ( ( far - near ) * depth - far );
	#endif
}`,tw=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,nw=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,iw=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,rw=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,sw=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,ow=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,aw=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#else
			uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#endif
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#else
			uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#endif
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform samplerCubeShadow pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#elif defined( SHADOWMAP_TYPE_BASIC )
			uniform samplerCube pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#endif
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float interleavedGradientNoise( vec2 position ) {
			return fract( 52.9829189 * fract( dot( position, vec2( 0.06711056, 0.00583715 ) ) ) );
		}
		vec2 vogelDiskSample( int sampleIndex, int samplesCount, float phi ) {
			const float goldenAngle = 2.399963229728653;
			float r = sqrt( ( float( sampleIndex ) + 0.5 ) / float( samplesCount ) );
			float theta = float( sampleIndex ) * goldenAngle + phi;
			return vec2( cos( theta ), sin( theta ) ) * r;
		}
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float getShadow( sampler2DShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			shadowCoord.z += shadowBias;
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
				float radius = shadowRadius * texelSize.x;
				float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
				shadow = (
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 0, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 1, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 2, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 3, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 4, 5, phi ) * radius, shadowCoord.z ) )
				) * 0.2;
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#elif defined( SHADOWMAP_TYPE_VSM )
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 distribution = texture2D( shadowMap, shadowCoord.xy ).rg;
				float mean = distribution.x;
				float variance = distribution.y * distribution.y;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					float hard_shadow = step( mean, shadowCoord.z );
				#else
					float hard_shadow = step( shadowCoord.z, mean );
				#endif
				
				if ( hard_shadow == 1.0 ) {
					shadow = 1.0;
				} else {
					variance = max( variance, 0.0000001 );
					float d = shadowCoord.z - mean;
					float p_max = variance / ( variance + d * d );
					p_max = clamp( ( p_max - 0.3 ) / 0.65, 0.0, 1.0 );
					shadow = max( hard_shadow, p_max );
				}
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#else
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				float depth = texture2D( shadowMap, shadowCoord.xy ).r;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					shadow = step( depth, shadowCoord.z );
				#else
					shadow = step( shadowCoord.z, depth );
				#endif
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	#if defined( SHADOWMAP_TYPE_PCF )
	float getPointShadow( samplerCubeShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 bd3D = normalize( lightToPosition );
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			#ifdef USE_REVERSED_DEPTH_BUFFER
				float dp = ( shadowCameraNear * ( shadowCameraFar - viewSpaceZ ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
				dp -= shadowBias;
			#else
				float dp = ( shadowCameraFar * ( viewSpaceZ - shadowCameraNear ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
				dp += shadowBias;
			#endif
			float texelSize = shadowRadius / shadowMapSize.x;
			vec3 absDir = abs( bd3D );
			vec3 tangent = absDir.x > absDir.z ? vec3( 0.0, 1.0, 0.0 ) : vec3( 1.0, 0.0, 0.0 );
			tangent = normalize( cross( bd3D, tangent ) );
			vec3 bitangent = cross( bd3D, tangent );
			float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
			vec2 sample0 = vogelDiskSample( 0, 5, phi );
			vec2 sample1 = vogelDiskSample( 1, 5, phi );
			vec2 sample2 = vogelDiskSample( 2, 5, phi );
			vec2 sample3 = vogelDiskSample( 3, 5, phi );
			vec2 sample4 = vogelDiskSample( 4, 5, phi );
			shadow = (
				texture( shadowMap, vec4( bd3D + ( tangent * sample0.x + bitangent * sample0.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample1.x + bitangent * sample1.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample2.x + bitangent * sample2.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample3.x + bitangent * sample3.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample4.x + bitangent * sample4.y ) * texelSize, dp ) )
			) * 0.2;
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#elif defined( SHADOWMAP_TYPE_BASIC )
	float getPointShadow( samplerCube shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			float dp = ( shadowCameraFar * ( viewSpaceZ - shadowCameraNear ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			float depth = textureCube( shadowMap, bd3D ).r;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				depth = 1.0 - depth;
			#endif
			shadow = step( dp, depth );
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#endif
	#endif
#endif`,lw=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,cw=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	#ifdef HAS_NORMAL
		vec3 shadowWorldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
	#else
		vec3 shadowWorldNormal = vec3( 0.0 );
	#endif
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,uw=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0 && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,dw=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,hw=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,fw=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,pw=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,mw=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,gw=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,_w=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,vw=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,xw=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = inverseTransformDirection( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseContribution, material.specularColorBlended, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,bw=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		#else
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,yw=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,Sw=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,Ew=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,Mw=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const ww=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,Tw=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Aw=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Cw=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vWorldDirection );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Rw=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Pw=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Lw=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,Dw=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	#ifdef USE_REVERSED_DEPTH_BUFFER
		float fragCoordZ = vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ];
	#else
		float fragCoordZ = 0.5 * vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ] + 0.5;
	#endif
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,Nw=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,Iw=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main () {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = vec4( dist, 0.0, 0.0, 1.0 );
}`,Uw=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,Fw=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Ow=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,kw=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,Bw=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,zw=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Gw=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Hw=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Vw=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,Ww=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,$w=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,Xw=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( normalize( normal ) * 0.5 + 0.5, diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,jw=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Yw=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,qw=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,Kw=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
 
		outgoingLight = outgoingLight + sheenSpecularDirect + sheenSpecularIndirect;
 
 	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Zw=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Jw=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Qw=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,eT=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,tT=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,nT=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,iT=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,rT=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,$e={alphahash_fragment:wE,alphahash_pars_fragment:TE,alphamap_fragment:AE,alphamap_pars_fragment:CE,alphatest_fragment:RE,alphatest_pars_fragment:PE,aomap_fragment:LE,aomap_pars_fragment:DE,batching_pars_vertex:NE,batching_vertex:IE,begin_vertex:UE,beginnormal_vertex:FE,bsdfs:OE,iridescence_fragment:kE,bumpmap_pars_fragment:BE,clipping_planes_fragment:zE,clipping_planes_pars_fragment:GE,clipping_planes_pars_vertex:HE,clipping_planes_vertex:VE,color_fragment:WE,color_pars_fragment:$E,color_pars_vertex:XE,color_vertex:jE,common:YE,cube_uv_reflection_fragment:qE,defaultnormal_vertex:KE,displacementmap_pars_vertex:ZE,displacementmap_vertex:JE,emissivemap_fragment:QE,emissivemap_pars_fragment:eM,colorspace_fragment:tM,colorspace_pars_fragment:nM,envmap_fragment:iM,envmap_common_pars_fragment:rM,envmap_pars_fragment:sM,envmap_pars_vertex:oM,envmap_physical_pars_fragment:_M,envmap_vertex:aM,fog_vertex:lM,fog_pars_vertex:cM,fog_fragment:uM,fog_pars_fragment:dM,gradientmap_pars_fragment:hM,lightmap_pars_fragment:fM,lights_lambert_fragment:pM,lights_lambert_pars_fragment:mM,lights_pars_begin:gM,lights_toon_fragment:vM,lights_toon_pars_fragment:xM,lights_phong_fragment:bM,lights_phong_pars_fragment:yM,lights_physical_fragment:SM,lights_physical_pars_fragment:EM,lights_fragment_begin:MM,lights_fragment_maps:wM,lights_fragment_end:TM,lightprobes_pars_fragment:AM,logdepthbuf_fragment:CM,logdepthbuf_pars_fragment:RM,logdepthbuf_pars_vertex:PM,logdepthbuf_vertex:LM,map_fragment:DM,map_pars_fragment:NM,map_particle_fragment:IM,map_particle_pars_fragment:UM,metalnessmap_fragment:FM,metalnessmap_pars_fragment:OM,morphinstance_vertex:kM,morphcolor_vertex:BM,morphnormal_vertex:zM,morphtarget_pars_vertex:GM,morphtarget_vertex:HM,normal_fragment_begin:VM,normal_fragment_maps:WM,normal_pars_fragment:$M,normal_pars_vertex:XM,normal_vertex:jM,normalmap_pars_fragment:YM,clearcoat_normal_fragment_begin:qM,clearcoat_normal_fragment_maps:KM,clearcoat_pars_fragment:ZM,iridescence_pars_fragment:JM,opaque_fragment:QM,packing:ew,premultiplied_alpha_fragment:tw,project_vertex:nw,dithering_fragment:iw,dithering_pars_fragment:rw,roughnessmap_fragment:sw,roughnessmap_pars_fragment:ow,shadowmap_pars_fragment:aw,shadowmap_pars_vertex:lw,shadowmap_vertex:cw,shadowmask_pars_fragment:uw,skinbase_vertex:dw,skinning_pars_vertex:hw,skinning_vertex:fw,skinnormal_vertex:pw,specularmap_fragment:mw,specularmap_pars_fragment:gw,tonemapping_fragment:_w,tonemapping_pars_fragment:vw,transmission_fragment:xw,transmission_pars_fragment:bw,uv_pars_fragment:yw,uv_pars_vertex:Sw,uv_vertex:Ew,worldpos_vertex:Mw,background_vert:ww,background_frag:Tw,backgroundCube_vert:Aw,backgroundCube_frag:Cw,cube_vert:Rw,cube_frag:Pw,depth_vert:Lw,depth_frag:Dw,distance_vert:Nw,distance_frag:Iw,equirect_vert:Uw,equirect_frag:Fw,linedashed_vert:Ow,linedashed_frag:kw,meshbasic_vert:Bw,meshbasic_frag:zw,meshlambert_vert:Gw,meshlambert_frag:Hw,meshmatcap_vert:Vw,meshmatcap_frag:Ww,meshnormal_vert:$w,meshnormal_frag:Xw,meshphong_vert:jw,meshphong_frag:Yw,meshphysical_vert:qw,meshphysical_frag:Kw,meshtoon_vert:Zw,meshtoon_frag:Jw,points_vert:Qw,points_frag:eT,shadow_vert:tT,shadow_frag:nT,sprite_vert:iT,sprite_frag:rT},fe={common:{diffuse:{value:new nt(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new ze},alphaMap:{value:null},alphaMapTransform:{value:new ze},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new ze}},envmap:{envMap:{value:null},envMapRotation:{value:new ze},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new ze}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new ze}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new ze},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new ze},normalScale:{value:new We(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new ze},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new ze}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new ze}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new ze}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new nt(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null},probesSH:{value:null},probesMin:{value:new N},probesMax:{value:new N},probesResolution:{value:new N}},points:{diffuse:{value:new nt(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new ze},alphaTest:{value:0},uvTransform:{value:new ze}},sprite:{diffuse:{value:new nt(16777215)},opacity:{value:1},center:{value:new We(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new ze},alphaMap:{value:null},alphaMapTransform:{value:new ze},alphaTest:{value:0}}},ui={basic:{uniforms:fn([fe.common,fe.specularmap,fe.envmap,fe.aomap,fe.lightmap,fe.fog]),vertexShader:$e.meshbasic_vert,fragmentShader:$e.meshbasic_frag},lambert:{uniforms:fn([fe.common,fe.specularmap,fe.envmap,fe.aomap,fe.lightmap,fe.emissivemap,fe.bumpmap,fe.normalmap,fe.displacementmap,fe.fog,fe.lights,{emissive:{value:new nt(0)},envMapIntensity:{value:1}}]),vertexShader:$e.meshlambert_vert,fragmentShader:$e.meshlambert_frag},phong:{uniforms:fn([fe.common,fe.specularmap,fe.envmap,fe.aomap,fe.lightmap,fe.emissivemap,fe.bumpmap,fe.normalmap,fe.displacementmap,fe.fog,fe.lights,{emissive:{value:new nt(0)},specular:{value:new nt(1118481)},shininess:{value:30},envMapIntensity:{value:1}}]),vertexShader:$e.meshphong_vert,fragmentShader:$e.meshphong_frag},standard:{uniforms:fn([fe.common,fe.envmap,fe.aomap,fe.lightmap,fe.emissivemap,fe.bumpmap,fe.normalmap,fe.displacementmap,fe.roughnessmap,fe.metalnessmap,fe.fog,fe.lights,{emissive:{value:new nt(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:$e.meshphysical_vert,fragmentShader:$e.meshphysical_frag},toon:{uniforms:fn([fe.common,fe.aomap,fe.lightmap,fe.emissivemap,fe.bumpmap,fe.normalmap,fe.displacementmap,fe.gradientmap,fe.fog,fe.lights,{emissive:{value:new nt(0)}}]),vertexShader:$e.meshtoon_vert,fragmentShader:$e.meshtoon_frag},matcap:{uniforms:fn([fe.common,fe.bumpmap,fe.normalmap,fe.displacementmap,fe.fog,{matcap:{value:null}}]),vertexShader:$e.meshmatcap_vert,fragmentShader:$e.meshmatcap_frag},points:{uniforms:fn([fe.points,fe.fog]),vertexShader:$e.points_vert,fragmentShader:$e.points_frag},dashed:{uniforms:fn([fe.common,fe.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:$e.linedashed_vert,fragmentShader:$e.linedashed_frag},depth:{uniforms:fn([fe.common,fe.displacementmap]),vertexShader:$e.depth_vert,fragmentShader:$e.depth_frag},normal:{uniforms:fn([fe.common,fe.bumpmap,fe.normalmap,fe.displacementmap,{opacity:{value:1}}]),vertexShader:$e.meshnormal_vert,fragmentShader:$e.meshnormal_frag},sprite:{uniforms:fn([fe.sprite,fe.fog]),vertexShader:$e.sprite_vert,fragmentShader:$e.sprite_frag},background:{uniforms:{uvTransform:{value:new ze},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:$e.background_vert,fragmentShader:$e.background_frag},backgroundCube:{uniforms:{envMap:{value:null},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new ze}},vertexShader:$e.backgroundCube_vert,fragmentShader:$e.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:$e.cube_vert,fragmentShader:$e.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:$e.equirect_vert,fragmentShader:$e.equirect_frag},distance:{uniforms:fn([fe.common,fe.displacementmap,{referencePosition:{value:new N},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:$e.distance_vert,fragmentShader:$e.distance_frag},shadow:{uniforms:fn([fe.lights,fe.fog,{color:{value:new nt(0)},opacity:{value:1}}]),vertexShader:$e.shadow_vert,fragmentShader:$e.shadow_frag}};ui.physical={uniforms:fn([ui.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new ze},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new ze},clearcoatNormalScale:{value:new We(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new ze},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new ze},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new ze},sheen:{value:0},sheenColor:{value:new nt(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new ze},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new ze},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new ze},transmissionSamplerSize:{value:new We},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new ze},attenuationDistance:{value:0},attenuationColor:{value:new nt(0)},specularColor:{value:new nt(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new ze},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new ze},anisotropyVector:{value:new We},anisotropyMap:{value:null},anisotropyMapTransform:{value:new ze}}]),vertexShader:$e.meshphysical_vert,fragmentShader:$e.meshphysical_frag};const Aa={r:0,b:0,g:0},sT=new Ct,R_=new ze;R_.set(-1,0,0,0,1,0,0,0,1);function oT(n,e,t,i,r,s){const o=new nt(0);let a=r===!0?0:1,l,c,u=null,d=0,h=null;function f(v){let E=v.isScene===!0?v.background:null;if(E&&E.isTexture){const x=v.backgroundBlurriness>0;E=e.get(E,x)}return E}function p(v){let E=!1;const x=f(v);x===null?g(o,a):x&&x.isColor&&(g(x,1),E=!0);const w=n.xr.getEnvironmentBlendMode();w==="additive"?t.buffers.color.setClear(0,0,0,1,s):w==="alpha-blend"&&t.buffers.color.setClear(0,0,0,0,s),(n.autoClear||E)&&(t.buffers.depth.setTest(!0),t.buffers.depth.setMask(!0),t.buffers.color.setMask(!0),n.clear(n.autoClearColor,n.autoClearDepth,n.autoClearStencil))}function _(v,E){const x=f(E);x&&(x.isCubeTexture||x.mapping===zl)?(c===void 0&&(c=new vi(new Go(1,1,1),new xi({name:"BackgroundCubeMaterial",uniforms:Fs(ui.backgroundCube.uniforms),vertexShader:ui.backgroundCube.vertexShader,fragmentShader:ui.backgroundCube.fragmentShader,side:bn,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute("normal"),c.geometry.deleteAttribute("uv"),c.onBeforeRender=function(w,S,C){this.matrixWorld.copyPosition(C.matrixWorld)},Object.defineProperty(c.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),i.update(c)),c.material.uniforms.envMap.value=x,c.material.uniforms.backgroundBlurriness.value=E.backgroundBlurriness,c.material.uniforms.backgroundIntensity.value=E.backgroundIntensity,c.material.uniforms.backgroundRotation.value.setFromMatrix4(sT.makeRotationFromEuler(E.backgroundRotation)).transpose(),x.isCubeTexture&&x.isRenderTargetTexture===!1&&c.material.uniforms.backgroundRotation.value.premultiply(R_),c.material.toneMapped=Je.getTransfer(x.colorSpace)!==dt,(u!==x||d!==x.version||h!==n.toneMapping)&&(c.material.needsUpdate=!0,u=x,d=x.version,h=n.toneMapping),c.layers.enableAll(),v.unshift(c,c.geometry,c.material,0,0,null)):x&&x.isTexture&&(l===void 0&&(l=new vi(new Gl(2,2),new xi({name:"BackgroundMaterial",uniforms:Fs(ui.background.uniforms),vertexShader:ui.background.vertexShader,fragmentShader:ui.background.fragmentShader,side:Sr,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),l.geometry.deleteAttribute("normal"),Object.defineProperty(l.material,"map",{get:function(){return this.uniforms.t2D.value}}),i.update(l)),l.material.uniforms.t2D.value=x,l.material.uniforms.backgroundIntensity.value=E.backgroundIntensity,l.material.toneMapped=Je.getTransfer(x.colorSpace)!==dt,x.matrixAutoUpdate===!0&&x.updateMatrix(),l.material.uniforms.uvTransform.value.copy(x.matrix),(u!==x||d!==x.version||h!==n.toneMapping)&&(l.material.needsUpdate=!0,u=x,d=x.version,h=n.toneMapping),l.layers.enableAll(),v.unshift(l,l.geometry,l.material,0,0,null))}function g(v,E){v.getRGB(Aa,w_(n)),t.buffers.color.setClear(Aa.r,Aa.g,Aa.b,E,s)}function m(){c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0),l!==void 0&&(l.geometry.dispose(),l.material.dispose(),l=void 0)}return{getClearColor:function(){return o},setClearColor:function(v,E=1){o.set(v),a=E,g(o,a)},getClearAlpha:function(){return a},setClearAlpha:function(v){a=v,g(o,a)},render:p,addToRenderList:_,dispose:m}}function aT(n,e){const t=n.getParameter(n.MAX_VERTEX_ATTRIBS),i={},r=h(null);let s=r,o=!1;function a(P,F,W,$,U){let B=!1;const H=d(P,$,W,F);s!==H&&(s=H,c(s.object)),B=f(P,$,W,U),B&&p(P,$,W,U),U!==null&&e.update(U,n.ELEMENT_ARRAY_BUFFER),(B||o)&&(o=!1,x(P,F,W,$),U!==null&&n.bindBuffer(n.ELEMENT_ARRAY_BUFFER,e.get(U).buffer))}function l(){return n.createVertexArray()}function c(P){return n.bindVertexArray(P)}function u(P){return n.deleteVertexArray(P)}function d(P,F,W,$){const U=$.wireframe===!0;let B=i[F.id];B===void 0&&(B={},i[F.id]=B);const H=P.isInstancedMesh===!0?P.id:0;let Z=B[H];Z===void 0&&(Z={},B[H]=Z);let J=Z[W.id];J===void 0&&(J={},Z[W.id]=J);let ne=J[U];return ne===void 0&&(ne=h(l()),J[U]=ne),ne}function h(P){const F=[],W=[],$=[];for(let U=0;U<t;U++)F[U]=0,W[U]=0,$[U]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:F,enabledAttributes:W,attributeDivisors:$,object:P,attributes:{},index:null}}function f(P,F,W,$){const U=s.attributes,B=F.attributes;let H=0;const Z=W.getAttributes();for(const J in Z)if(Z[J].location>=0){const de=U[J];let ye=B[J];if(ye===void 0&&(J==="instanceMatrix"&&P.instanceMatrix&&(ye=P.instanceMatrix),J==="instanceColor"&&P.instanceColor&&(ye=P.instanceColor)),de===void 0||de.attribute!==ye||ye&&de.data!==ye.data)return!0;H++}return s.attributesNum!==H||s.index!==$}function p(P,F,W,$){const U={},B=F.attributes;let H=0;const Z=W.getAttributes();for(const J in Z)if(Z[J].location>=0){let de=B[J];de===void 0&&(J==="instanceMatrix"&&P.instanceMatrix&&(de=P.instanceMatrix),J==="instanceColor"&&P.instanceColor&&(de=P.instanceColor));const ye={};ye.attribute=de,de&&de.data&&(ye.data=de.data),U[J]=ye,H++}s.attributes=U,s.attributesNum=H,s.index=$}function _(){const P=s.newAttributes;for(let F=0,W=P.length;F<W;F++)P[F]=0}function g(P){m(P,0)}function m(P,F){const W=s.newAttributes,$=s.enabledAttributes,U=s.attributeDivisors;W[P]=1,$[P]===0&&(n.enableVertexAttribArray(P),$[P]=1),U[P]!==F&&(n.vertexAttribDivisor(P,F),U[P]=F)}function v(){const P=s.newAttributes,F=s.enabledAttributes;for(let W=0,$=F.length;W<$;W++)F[W]!==P[W]&&(n.disableVertexAttribArray(W),F[W]=0)}function E(P,F,W,$,U,B,H){H===!0?n.vertexAttribIPointer(P,F,W,U,B):n.vertexAttribPointer(P,F,W,$,U,B)}function x(P,F,W,$){_();const U=$.attributes,B=W.getAttributes(),H=F.defaultAttributeValues;for(const Z in B){const J=B[Z];if(J.location>=0){let ne=U[Z];if(ne===void 0&&(Z==="instanceMatrix"&&P.instanceMatrix&&(ne=P.instanceMatrix),Z==="instanceColor"&&P.instanceColor&&(ne=P.instanceColor)),ne!==void 0){const de=ne.normalized,ye=ne.itemSize,Fe=e.get(ne);if(Fe===void 0)continue;const et=Fe.buffer,Ie=Fe.type,q=Fe.bytesPerElement,pe=Ie===n.INT||Ie===n.UNSIGNED_INT||ne.gpuType===Hd;if(ne.isInterleavedBufferAttribute){const ie=ne.data,Ce=ie.stride,Oe=ne.offset;if(ie.isInstancedInterleavedBuffer){for(let Ne=0;Ne<J.locationSize;Ne++)m(J.location+Ne,ie.meshPerAttribute);P.isInstancedMesh!==!0&&$._maxInstanceCount===void 0&&($._maxInstanceCount=ie.meshPerAttribute*ie.count)}else for(let Ne=0;Ne<J.locationSize;Ne++)g(J.location+Ne);n.bindBuffer(n.ARRAY_BUFFER,et);for(let Ne=0;Ne<J.locationSize;Ne++)E(J.location+Ne,ye/J.locationSize,Ie,de,Ce*q,(Oe+ye/J.locationSize*Ne)*q,pe)}else{if(ne.isInstancedBufferAttribute){for(let ie=0;ie<J.locationSize;ie++)m(J.location+ie,ne.meshPerAttribute);P.isInstancedMesh!==!0&&$._maxInstanceCount===void 0&&($._maxInstanceCount=ne.meshPerAttribute*ne.count)}else for(let ie=0;ie<J.locationSize;ie++)g(J.location+ie);n.bindBuffer(n.ARRAY_BUFFER,et);for(let ie=0;ie<J.locationSize;ie++)E(J.location+ie,ye/J.locationSize,Ie,de,ye*q,ye/J.locationSize*ie*q,pe)}}else if(H!==void 0){const de=H[Z];if(de!==void 0)switch(de.length){case 2:n.vertexAttrib2fv(J.location,de);break;case 3:n.vertexAttrib3fv(J.location,de);break;case 4:n.vertexAttrib4fv(J.location,de);break;default:n.vertexAttrib1fv(J.location,de)}}}}v()}function w(){T();for(const P in i){const F=i[P];for(const W in F){const $=F[W];for(const U in $){const B=$[U];for(const H in B)u(B[H].object),delete B[H];delete $[U]}}delete i[P]}}function S(P){if(i[P.id]===void 0)return;const F=i[P.id];for(const W in F){const $=F[W];for(const U in $){const B=$[U];for(const H in B)u(B[H].object),delete B[H];delete $[U]}}delete i[P.id]}function C(P){for(const F in i){const W=i[F];for(const $ in W){const U=W[$];if(U[P.id]===void 0)continue;const B=U[P.id];for(const H in B)u(B[H].object),delete B[H];delete U[P.id]}}}function b(P){for(const F in i){const W=i[F],$=P.isInstancedMesh===!0?P.id:0,U=W[$];if(U!==void 0){for(const B in U){const H=U[B];for(const Z in H)u(H[Z].object),delete H[Z];delete U[B]}delete W[$],Object.keys(W).length===0&&delete i[F]}}}function T(){L(),o=!0,s!==r&&(s=r,c(s.object))}function L(){r.geometry=null,r.program=null,r.wireframe=!1}return{setup:a,reset:T,resetDefaultState:L,dispose:w,releaseStatesOfGeometry:S,releaseStatesOfObject:b,releaseStatesOfProgram:C,initAttributes:_,enableAttribute:g,disableUnusedAttributes:v}}function lT(n,e,t){let i;function r(l){i=l}function s(l,c){n.drawArrays(i,l,c),t.update(c,i,1)}function o(l,c,u){u!==0&&(n.drawArraysInstanced(i,l,c,u),t.update(c,i,u))}function a(l,c,u){if(u===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(i,l,0,c,0,u);let h=0;for(let f=0;f<u;f++)h+=c[f];t.update(h,i,1)}this.setMode=r,this.render=s,this.renderInstances=o,this.renderMultiDraw=a}function cT(n,e,t,i){let r;function s(){if(r!==void 0)return r;if(e.has("EXT_texture_filter_anisotropic")===!0){const C=e.get("EXT_texture_filter_anisotropic");r=n.getParameter(C.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else r=0;return r}function o(C){return!(C!==Qn&&i.convert(C)!==n.getParameter(n.IMPLEMENTATION_COLOR_READ_FORMAT))}function a(C){const b=C===$i&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(C!==Un&&i.convert(C)!==n.getParameter(n.IMPLEMENTATION_COLOR_READ_TYPE)&&C!==hi&&!b)}function l(C){if(C==="highp"){if(n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.HIGH_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.HIGH_FLOAT).precision>0)return"highp";C="mediump"}return C==="mediump"&&n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.MEDIUM_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let c=t.precision!==void 0?t.precision:"highp";const u=l(c);u!==c&&(Le("WebGLRenderer:",c,"not supported, using",u,"instead."),c=u);const d=t.logarithmicDepthBuffer===!0,h=t.reversedDepthBuffer===!0&&e.has("EXT_clip_control");t.reversedDepthBuffer===!0&&h===!1&&Le("WebGLRenderer: Unable to use reversed depth buffer due to missing EXT_clip_control extension. Fallback to default depth buffer.");const f=n.getParameter(n.MAX_TEXTURE_IMAGE_UNITS),p=n.getParameter(n.MAX_VERTEX_TEXTURE_IMAGE_UNITS),_=n.getParameter(n.MAX_TEXTURE_SIZE),g=n.getParameter(n.MAX_CUBE_MAP_TEXTURE_SIZE),m=n.getParameter(n.MAX_VERTEX_ATTRIBS),v=n.getParameter(n.MAX_VERTEX_UNIFORM_VECTORS),E=n.getParameter(n.MAX_VARYING_VECTORS),x=n.getParameter(n.MAX_FRAGMENT_UNIFORM_VECTORS),w=n.getParameter(n.MAX_SAMPLES),S=n.getParameter(n.SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:s,getMaxPrecision:l,textureFormatReadable:o,textureTypeReadable:a,precision:c,logarithmicDepthBuffer:d,reversedDepthBuffer:h,maxTextures:f,maxVertexTextures:p,maxTextureSize:_,maxCubemapSize:g,maxAttributes:m,maxVertexUniforms:v,maxVaryings:E,maxFragmentUniforms:x,maxSamples:w,samples:S}}function uT(n){const e=this;let t=null,i=0,r=!1,s=!1;const o=new Ci,a=new ze,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(d,h){const f=d.length!==0||h||i!==0||r;return r=h,i=d.length,f},this.beginShadows=function(){s=!0,u(null)},this.endShadows=function(){s=!1},this.setGlobalState=function(d,h){t=u(d,h,0)},this.setState=function(d,h,f){const p=d.clippingPlanes,_=d.clipIntersection,g=d.clipShadows,m=n.get(d);if(!r||p===null||p.length===0||s&&!g)s?u(null):c();else{const v=s?0:i,E=v*4;let x=m.clippingState||null;l.value=x,x=u(p,h,E,f);for(let w=0;w!==E;++w)x[w]=t[w];m.clippingState=x,this.numIntersection=_?this.numPlanes:0,this.numPlanes+=v}};function c(){l.value!==t&&(l.value=t,l.needsUpdate=i>0),e.numPlanes=i,e.numIntersection=0}function u(d,h,f,p){const _=d!==null?d.length:0;let g=null;if(_!==0){if(g=l.value,p!==!0||g===null){const m=f+_*4,v=h.matrixWorldInverse;a.getNormalMatrix(v),(g===null||g.length<m)&&(g=new Float32Array(m));for(let E=0,x=f;E!==_;++E,x+=4)o.copy(d[E]).applyMatrix4(v,a),o.normal.toArray(g,x),g[x+3]=o.constant}l.value=g,l.needsUpdate=!0}return e.numPlanes=_,e.numIntersection=0,g}}const vr=4,mp=[.125,.215,.35,.446,.526,.582],Ur=20,dT=256,lo=new A_,gp=new nt;let $c=null,Xc=0,jc=0,Yc=!1;const hT=new N;class _p{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._sizeLods=[],this._sigmas=[],this._lodMeshes=[],this._backgroundBox=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null}fromScene(e,t=0,i=.1,r=100,s={}){const{size:o=256,position:a=hT}=s;$c=this._renderer.getRenderTarget(),Xc=this._renderer.getActiveCubeFace(),jc=this._renderer.getActiveMipmapLevel(),Yc=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(o);const l=this._allocateTargets();return l.depthBuffer=!0,this._sceneToCubeUV(e,i,r,l,a),t>0&&this._blur(l,0,0,t),this._applyPMREM(l),this._cleanup(l),l}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=bp(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=xp(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._backgroundBox!==null&&(this._backgroundBox.geometry.dispose(),this._backgroundBox.material.dispose())}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodMeshes.length;e++)this._lodMeshes[e].geometry.dispose()}_cleanup(e){this._renderer.setRenderTarget($c,Xc,jc),this._renderer.xr.enabled=Yc,e.scissorTest=!1,hs(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===Vr||e.mapping===Is?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),$c=this._renderer.getRenderTarget(),Xc=this._renderer.getActiveCubeFace(),jc=this._renderer.getActiveMipmapLevel(),Yc=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const i=t||this._allocateTargets();return this._textureToCubeUV(e,i),this._applyPMREM(i),this._cleanup(i),i}_allocateTargets(){const e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,i={magFilter:ln,minFilter:ln,generateMipmaps:!1,type:$i,format:Qn,colorSpace:dl,depthBuffer:!1},r=vp(e,t,i);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=vp(e,t,i);const{_lodMax:s}=this;({lodMeshes:this._lodMeshes,sizeLods:this._sizeLods,sigmas:this._sigmas}=fT(s)),this._blurMaterial=mT(s,e,t),this._ggxMaterial=pT(s,e,t)}return r}_compileMaterial(e){const t=new vi(new At,e);this._renderer.compile(t,lo)}_sceneToCubeUV(e,t,i,r,s){const l=new Nn(90,1,t,i),c=[1,-1,1,1,1,1],u=[1,1,1,-1,-1,-1],d=this._renderer,h=d.autoClear,f=d.toneMapping;d.getClearColor(gp),d.toneMapping=pi,d.autoClear=!1,d.state.buffers.depth.getReversed()&&(d.setRenderTarget(r),d.clearDepth(),d.setRenderTarget(null)),this._backgroundBox===null&&(this._backgroundBox=new vi(new Go,new Qd({name:"PMREM.Background",side:bn,depthWrite:!1,depthTest:!1})));const _=this._backgroundBox,g=_.material;let m=!1;const v=e.background;v?v.isColor&&(g.color.copy(v),e.background=null,m=!0):(g.color.copy(gp),m=!0);for(let E=0;E<6;E++){const x=E%3;x===0?(l.up.set(0,c[E],0),l.position.set(s.x,s.y,s.z),l.lookAt(s.x+u[E],s.y,s.z)):x===1?(l.up.set(0,0,c[E]),l.position.set(s.x,s.y,s.z),l.lookAt(s.x,s.y+u[E],s.z)):(l.up.set(0,c[E],0),l.position.set(s.x,s.y,s.z),l.lookAt(s.x,s.y,s.z+u[E]));const w=this._cubeSize;hs(r,x*w,E>2?w:0,w,w),d.setRenderTarget(r),m&&d.render(_,l),d.render(e,l)}d.toneMapping=f,d.autoClear=h,e.background=v}_textureToCubeUV(e,t){const i=this._renderer,r=e.mapping===Vr||e.mapping===Is;r?(this._cubemapMaterial===null&&(this._cubemapMaterial=bp()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=xp());const s=r?this._cubemapMaterial:this._equirectMaterial,o=this._lodMeshes[0];o.material=s;const a=s.uniforms;a.envMap.value=e;const l=this._cubeSize;hs(t,0,0,3*l,2*l),i.setRenderTarget(t),i.render(o,lo)}_applyPMREM(e){const t=this._renderer,i=t.autoClear;t.autoClear=!1;const r=this._lodMeshes.length;for(let s=1;s<r;s++)this._applyGGXFilter(e,s-1,s);t.autoClear=i}_applyGGXFilter(e,t,i){const r=this._renderer,s=this._pingPongRenderTarget,o=this._ggxMaterial,a=this._lodMeshes[i];a.material=o;const l=o.uniforms,c=i/(this._lodMeshes.length-1),u=t/(this._lodMeshes.length-1),d=Math.sqrt(c*c-u*u),h=0+c*1.25,f=d*h,{_lodMax:p}=this,_=this._sizeLods[i],g=3*_*(i>p-vr?i-p+vr:0),m=4*(this._cubeSize-_);l.envMap.value=e.texture,l.roughness.value=f,l.mipInt.value=p-t,hs(s,g,m,3*_,2*_),r.setRenderTarget(s),r.render(a,lo),l.envMap.value=s.texture,l.roughness.value=0,l.mipInt.value=p-i,hs(e,g,m,3*_,2*_),r.setRenderTarget(e),r.render(a,lo)}_blur(e,t,i,r,s){const o=this._pingPongRenderTarget;this._halfBlur(e,o,t,i,r,"latitudinal",s),this._halfBlur(o,e,i,i,r,"longitudinal",s)}_halfBlur(e,t,i,r,s,o,a){const l=this._renderer,c=this._blurMaterial;o!=="latitudinal"&&o!=="longitudinal"&&Qe("blur direction must be either latitudinal or longitudinal!");const u=3,d=this._lodMeshes[r];d.material=c;const h=c.uniforms,f=this._sizeLods[i]-1,p=isFinite(s)?Math.PI/(2*f):2*Math.PI/(2*Ur-1),_=s/p,g=isFinite(s)?1+Math.floor(u*_):Ur;g>Ur&&Le(`sigmaRadians, ${s}, is too large and will clip, as it requested ${g} samples when the maximum is set to ${Ur}`);const m=[];let v=0;for(let C=0;C<Ur;++C){const b=C/_,T=Math.exp(-b*b/2);m.push(T),C===0?v+=T:C<g&&(v+=2*T)}for(let C=0;C<m.length;C++)m[C]=m[C]/v;h.envMap.value=e.texture,h.samples.value=g,h.weights.value=m,h.latitudinal.value=o==="latitudinal",a&&(h.poleAxis.value=a);const{_lodMax:E}=this;h.dTheta.value=p,h.mipInt.value=E-i;const x=this._sizeLods[r],w=3*x*(r>E-vr?r-E+vr:0),S=4*(this._cubeSize-x);hs(t,w,S,3*x,2*x),l.setRenderTarget(t),l.render(d,lo)}}function fT(n){const e=[],t=[],i=[];let r=n;const s=n-vr+1+mp.length;for(let o=0;o<s;o++){const a=Math.pow(2,r);e.push(a);let l=1/a;o>n-vr?l=mp[o-n+vr-1]:o===0&&(l=0),t.push(l);const c=1/(a-2),u=-c,d=1+c,h=[u,u,d,u,d,d,u,u,d,d,u,d],f=6,p=6,_=3,g=2,m=1,v=new Float32Array(_*p*f),E=new Float32Array(g*p*f),x=new Float32Array(m*p*f);for(let S=0;S<f;S++){const C=S%3*2/3-1,b=S>2?0:-1,T=[C,b,0,C+2/3,b,0,C+2/3,b+1,0,C,b,0,C+2/3,b+1,0,C,b+1,0];v.set(T,_*p*S),E.set(h,g*p*S);const L=[S,S,S,S,S,S];x.set(L,m*p*S)}const w=new At;w.setAttribute("position",new Bn(v,_)),w.setAttribute("uv",new Bn(E,g)),w.setAttribute("faceIndex",new Bn(x,m)),i.push(new vi(w,null)),r>vr&&r--}return{lodMeshes:i,sizeLods:e,sigmas:t}}function vp(n,e,t){const i=new mi(n,e,t);return i.texture.mapping=zl,i.texture.name="PMREM.cubeUv",i.scissorTest=!0,i}function hs(n,e,t,i,r){n.viewport.set(e,t,i,r),n.scissor.set(e,t,i,r)}function pT(n,e,t){return new xi({name:"PMREMGGXConvolution",defines:{GGX_SAMPLES:dT,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${n}.0`},uniforms:{envMap:{value:null},roughness:{value:0},mipInt:{value:0}},vertexShader:Hl(),fragmentShader:`

			precision highp float;
			precision highp int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform float roughness;
			uniform float mipInt;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			#define PI 3.14159265359

			// Van der Corput radical inverse
			float radicalInverse_VdC(uint bits) {
				bits = (bits << 16u) | (bits >> 16u);
				bits = ((bits & 0x55555555u) << 1u) | ((bits & 0xAAAAAAAAu) >> 1u);
				bits = ((bits & 0x33333333u) << 2u) | ((bits & 0xCCCCCCCCu) >> 2u);
				bits = ((bits & 0x0F0F0F0Fu) << 4u) | ((bits & 0xF0F0F0F0u) >> 4u);
				bits = ((bits & 0x00FF00FFu) << 8u) | ((bits & 0xFF00FF00u) >> 8u);
				return float(bits) * 2.3283064365386963e-10; // / 0x100000000
			}

			// Hammersley sequence
			vec2 hammersley(uint i, uint N) {
				return vec2(float(i) / float(N), radicalInverse_VdC(i));
			}

			// GGX VNDF importance sampling (Eric Heitz 2018)
			// "Sampling the GGX Distribution of Visible Normals"
			// https://jcgt.org/published/0007/04/01/
			vec3 importanceSampleGGX_VNDF(vec2 Xi, vec3 V, float roughness) {
				float alpha = roughness * roughness;

				// Section 4.1: Orthonormal basis
				vec3 T1 = vec3(1.0, 0.0, 0.0);
				vec3 T2 = cross(V, T1);

				// Section 4.2: Parameterization of projected area
				float r = sqrt(Xi.x);
				float phi = 2.0 * PI * Xi.y;
				float t1 = r * cos(phi);
				float t2 = r * sin(phi);
				float s = 0.5 * (1.0 + V.z);
				t2 = (1.0 - s) * sqrt(1.0 - t1 * t1) + s * t2;

				// Section 4.3: Reprojection onto hemisphere
				vec3 Nh = t1 * T1 + t2 * T2 + sqrt(max(0.0, 1.0 - t1 * t1 - t2 * t2)) * V;

				// Section 3.4: Transform back to ellipsoid configuration
				return normalize(vec3(alpha * Nh.x, alpha * Nh.y, max(0.0, Nh.z)));
			}

			void main() {
				vec3 N = normalize(vOutputDirection);
				vec3 V = N; // Assume view direction equals normal for pre-filtering

				vec3 prefilteredColor = vec3(0.0);
				float totalWeight = 0.0;

				// For very low roughness, just sample the environment directly
				if (roughness < 0.001) {
					gl_FragColor = vec4(bilinearCubeUV(envMap, N, mipInt), 1.0);
					return;
				}

				// Tangent space basis for VNDF sampling
				vec3 up = abs(N.z) < 0.999 ? vec3(0.0, 0.0, 1.0) : vec3(1.0, 0.0, 0.0);
				vec3 tangent = normalize(cross(up, N));
				vec3 bitangent = cross(N, tangent);

				for(uint i = 0u; i < uint(GGX_SAMPLES); i++) {
					vec2 Xi = hammersley(i, uint(GGX_SAMPLES));

					// For PMREM, V = N, so in tangent space V is always (0, 0, 1)
					vec3 H_tangent = importanceSampleGGX_VNDF(Xi, vec3(0.0, 0.0, 1.0), roughness);

					// Transform H back to world space
					vec3 H = normalize(tangent * H_tangent.x + bitangent * H_tangent.y + N * H_tangent.z);
					vec3 L = normalize(2.0 * dot(V, H) * H - V);

					float NdotL = max(dot(N, L), 0.0);

					if(NdotL > 0.0) {
						// Sample environment at fixed mip level
						// VNDF importance sampling handles the distribution filtering
						vec3 sampleColor = bilinearCubeUV(envMap, L, mipInt);

						// Weight by NdotL for the split-sum approximation
						// VNDF PDF naturally accounts for the visible microfacet distribution
						prefilteredColor += sampleColor * NdotL;
						totalWeight += NdotL;
					}
				}

				if (totalWeight > 0.0) {
					prefilteredColor = prefilteredColor / totalWeight;
				}

				gl_FragColor = vec4(prefilteredColor, 1.0);
			}
		`,blending:Vi,depthTest:!1,depthWrite:!1})}function mT(n,e,t){const i=new Float32Array(Ur),r=new N(0,1,0);return new xi({name:"SphericalGaussianBlur",defines:{n:Ur,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${n}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:i},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:r}},vertexShader:Hl(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

			}
		`,blending:Vi,depthTest:!1,depthWrite:!1})}function xp(){return new xi({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:Hl(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:Vi,depthTest:!1,depthWrite:!1})}function bp(){return new xi({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Hl(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Vi,depthTest:!1,depthWrite:!1})}function Hl(){return`

		precision mediump float;
		precision mediump int;

		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`}class P_ extends mi{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;const i={width:e,height:e,depth:1},r=[i,i,i,i,i,i];this.texture=new S_(r),this._setTextureOptions(t),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;const i={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},r=new Go(5,5,5),s=new xi({name:"CubemapFromEquirect",uniforms:Fs(i.uniforms),vertexShader:i.vertexShader,fragmentShader:i.fragmentShader,side:bn,blending:Vi});s.uniforms.tEquirect.value=t;const o=new vi(r,s),a=t.minFilter;return t.minFilter===kr&&(t.minFilter=ln),new vE(1,10,this).update(e,o),t.minFilter=a,o.geometry.dispose(),o.material.dispose(),this}clear(e,t=!0,i=!0,r=!0){const s=e.getRenderTarget();for(let o=0;o<6;o++)e.setRenderTarget(this,o),e.clear(t,i,r);e.setRenderTarget(s)}}function gT(n){let e=new WeakMap,t=new WeakMap,i=null;function r(h,f=!1){return h==null?null:f?o(h):s(h)}function s(h){if(h&&h.isTexture){const f=h.mapping;if(f===pc||f===mc)if(e.has(h)){const p=e.get(h).texture;return a(p,h.mapping)}else{const p=h.image;if(p&&p.height>0){const _=new P_(p.height);return _.fromEquirectangularTexture(n,h),e.set(h,_),h.addEventListener("dispose",c),a(_.texture,h.mapping)}else return null}}return h}function o(h){if(h&&h.isTexture){const f=h.mapping,p=f===pc||f===mc,_=f===Vr||f===Is;if(p||_){let g=t.get(h);const m=g!==void 0?g.texture.pmremVersion:0;if(h.isRenderTargetTexture&&h.pmremVersion!==m)return i===null&&(i=new _p(n)),g=p?i.fromEquirectangular(h,g):i.fromCubemap(h,g),g.texture.pmremVersion=h.pmremVersion,t.set(h,g),g.texture;if(g!==void 0)return g.texture;{const v=h.image;return p&&v&&v.height>0||_&&v&&l(v)?(i===null&&(i=new _p(n)),g=p?i.fromEquirectangular(h):i.fromCubemap(h),g.texture.pmremVersion=h.pmremVersion,t.set(h,g),h.addEventListener("dispose",u),g.texture):null}}}return h}function a(h,f){return f===pc?h.mapping=Vr:f===mc&&(h.mapping=Is),h}function l(h){let f=0;const p=6;for(let _=0;_<p;_++)h[_]!==void 0&&f++;return f===p}function c(h){const f=h.target;f.removeEventListener("dispose",c);const p=e.get(f);p!==void 0&&(e.delete(f),p.dispose())}function u(h){const f=h.target;f.removeEventListener("dispose",u);const p=t.get(f);p!==void 0&&(t.delete(f),p.dispose())}function d(){e=new WeakMap,t=new WeakMap,i!==null&&(i.dispose(),i=null)}return{get:r,dispose:d}}function _T(n){const e={};function t(i){if(e[i]!==void 0)return e[i];const r=n.getExtension(i);return e[i]=r,r}return{has:function(i){return t(i)!==null},init:function(){t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance"),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture"),t("WEBGL_render_shared_exponent")},get:function(i){const r=t(i);return r===null&&od("WebGLRenderer: "+i+" extension not supported."),r}}}function vT(n,e,t,i){const r={},s=new WeakMap;function o(d){const h=d.target;h.index!==null&&e.remove(h.index);for(const p in h.attributes)e.remove(h.attributes[p]);h.removeEventListener("dispose",o),delete r[h.id];const f=s.get(h);f&&(e.remove(f),s.delete(h)),i.releaseStatesOfGeometry(h),h.isInstancedBufferGeometry===!0&&delete h._maxInstanceCount,t.memory.geometries--}function a(d,h){return r[h.id]===!0||(h.addEventListener("dispose",o),r[h.id]=!0,t.memory.geometries++),h}function l(d){const h=d.attributes;for(const f in h)e.update(h[f],n.ARRAY_BUFFER)}function c(d){const h=[],f=d.index,p=d.attributes.position;let _=0;if(p===void 0)return;if(f!==null){const v=f.array;_=f.version;for(let E=0,x=v.length;E<x;E+=3){const w=v[E+0],S=v[E+1],C=v[E+2];h.push(w,S,S,C,C,w)}}else{const v=p.array;_=p.version;for(let E=0,x=v.length/3-1;E<x;E+=3){const w=E+0,S=E+1,C=E+2;h.push(w,S,S,C,C,w)}}const g=new(p.count>=65535?x_:v_)(h,1);g.version=_;const m=s.get(d);m&&e.remove(m),s.set(d,g)}function u(d){const h=s.get(d);if(h){const f=d.index;f!==null&&h.version<f.version&&c(d)}else c(d);return s.get(d)}return{get:a,update:l,getWireframeAttribute:u}}function xT(n,e,t){let i;function r(d){i=d}let s,o;function a(d){s=d.type,o=d.bytesPerElement}function l(d,h){n.drawElements(i,h,s,d*o),t.update(h,i,1)}function c(d,h,f){f!==0&&(n.drawElementsInstanced(i,h,s,d*o,f),t.update(h,i,f))}function u(d,h,f){if(f===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(i,h,0,s,d,0,f);let _=0;for(let g=0;g<f;g++)_+=h[g];t.update(_,i,1)}this.setMode=r,this.setIndex=a,this.render=l,this.renderInstances=c,this.renderMultiDraw=u}function bT(n){const e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function i(s,o,a){switch(t.calls++,o){case n.TRIANGLES:t.triangles+=a*(s/3);break;case n.LINES:t.lines+=a*(s/2);break;case n.LINE_STRIP:t.lines+=a*(s-1);break;case n.LINE_LOOP:t.lines+=a*s;break;case n.POINTS:t.points+=a*s;break;default:Qe("WebGLInfo: Unknown draw mode:",o);break}}function r(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:r,update:i}}function yT(n,e,t){const i=new WeakMap,r=new Bt;function s(o,a,l){const c=o.morphTargetInfluences,u=a.morphAttributes.position||a.morphAttributes.normal||a.morphAttributes.color,d=u!==void 0?u.length:0;let h=i.get(a);if(h===void 0||h.count!==d){let T=function(){C.dispose(),i.delete(a),a.removeEventListener("dispose",T)};h!==void 0&&h.texture.dispose();const f=a.morphAttributes.position!==void 0,p=a.morphAttributes.normal!==void 0,_=a.morphAttributes.color!==void 0,g=a.morphAttributes.position||[],m=a.morphAttributes.normal||[],v=a.morphAttributes.color||[];let E=0;f===!0&&(E=1),p===!0&&(E=2),_===!0&&(E=3);let x=a.attributes.position.count*E,w=1;x>e.maxTextureSize&&(w=Math.ceil(x/e.maxTextureSize),x=e.maxTextureSize);const S=new Float32Array(x*w*4*d),C=new g_(S,x,w,d);C.type=hi,C.needsUpdate=!0;const b=E*4;for(let L=0;L<d;L++){const P=g[L],F=m[L],W=v[L],$=x*w*4*L;for(let U=0;U<P.count;U++){const B=U*b;f===!0&&(r.fromBufferAttribute(P,U),S[$+B+0]=r.x,S[$+B+1]=r.y,S[$+B+2]=r.z,S[$+B+3]=0),p===!0&&(r.fromBufferAttribute(F,U),S[$+B+4]=r.x,S[$+B+5]=r.y,S[$+B+6]=r.z,S[$+B+7]=0),_===!0&&(r.fromBufferAttribute(W,U),S[$+B+8]=r.x,S[$+B+9]=r.y,S[$+B+10]=r.z,S[$+B+11]=W.itemSize===4?r.w:1)}}h={count:d,texture:C,size:new We(x,w)},i.set(a,h),a.addEventListener("dispose",T)}if(o.isInstancedMesh===!0&&o.morphTexture!==null)l.getUniforms().setValue(n,"morphTexture",o.morphTexture,t);else{let f=0;for(let _=0;_<c.length;_++)f+=c[_];const p=a.morphTargetsRelative?1:1-f;l.getUniforms().setValue(n,"morphTargetBaseInfluence",p),l.getUniforms().setValue(n,"morphTargetInfluences",c)}l.getUniforms().setValue(n,"morphTargetsTexture",h.texture,t),l.getUniforms().setValue(n,"morphTargetsTextureSize",h.size)}return{update:s}}function ST(n,e,t,i,r){let s=new WeakMap;function o(c){const u=r.render.frame,d=c.geometry,h=e.get(c,d);if(s.get(h)!==u&&(e.update(h),s.set(h,u)),c.isInstancedMesh&&(c.hasEventListener("dispose",l)===!1&&c.addEventListener("dispose",l),s.get(c)!==u&&(t.update(c.instanceMatrix,n.ARRAY_BUFFER),c.instanceColor!==null&&t.update(c.instanceColor,n.ARRAY_BUFFER),s.set(c,u))),c.isSkinnedMesh){const f=c.skeleton;s.get(f)!==u&&(f.update(),s.set(f,u))}return h}function a(){s=new WeakMap}function l(c){const u=c.target;u.removeEventListener("dispose",l),i.releaseStatesOfObject(u),t.remove(u.instanceMatrix),u.instanceColor!==null&&t.remove(u.instanceColor)}return{update:o,dispose:a}}const ET={[e_]:"LINEAR_TONE_MAPPING",[t_]:"REINHARD_TONE_MAPPING",[n_]:"CINEON_TONE_MAPPING",[i_]:"ACES_FILMIC_TONE_MAPPING",[s_]:"AGX_TONE_MAPPING",[o_]:"NEUTRAL_TONE_MAPPING",[r_]:"CUSTOM_TONE_MAPPING"};function MT(n,e,t,i,r){const s=new mi(e,t,{type:n,depthBuffer:i,stencilBuffer:r,depthTexture:i?new Us(e,t):void 0}),o=new mi(e,t,{type:$i,depthBuffer:!1,stencilBuffer:!1}),a=new At;a.setAttribute("position",new St([-1,3,0,-1,-1,0,3,-1,0],3)),a.setAttribute("uv",new St([0,2,0,0,2,0],2));const l=new pE({uniforms:{tDiffuse:{value:null}},vertexShader:`
			precision highp float;

			uniform mat4 modelViewMatrix;
			uniform mat4 projectionMatrix;

			attribute vec3 position;
			attribute vec2 uv;

			varying vec2 vUv;

			void main() {
				vUv = uv;
				gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
			}`,fragmentShader:`
			precision highp float;

			uniform sampler2D tDiffuse;

			varying vec2 vUv;

			#include <tonemapping_pars_fragment>
			#include <colorspace_pars_fragment>

			void main() {
				gl_FragColor = texture2D( tDiffuse, vUv );

				#ifdef LINEAR_TONE_MAPPING
					gl_FragColor.rgb = LinearToneMapping( gl_FragColor.rgb );
				#elif defined( REINHARD_TONE_MAPPING )
					gl_FragColor.rgb = ReinhardToneMapping( gl_FragColor.rgb );
				#elif defined( CINEON_TONE_MAPPING )
					gl_FragColor.rgb = CineonToneMapping( gl_FragColor.rgb );
				#elif defined( ACES_FILMIC_TONE_MAPPING )
					gl_FragColor.rgb = ACESFilmicToneMapping( gl_FragColor.rgb );
				#elif defined( AGX_TONE_MAPPING )
					gl_FragColor.rgb = AgXToneMapping( gl_FragColor.rgb );
				#elif defined( NEUTRAL_TONE_MAPPING )
					gl_FragColor.rgb = NeutralToneMapping( gl_FragColor.rgb );
				#elif defined( CUSTOM_TONE_MAPPING )
					gl_FragColor.rgb = CustomToneMapping( gl_FragColor.rgb );
				#endif

				#ifdef SRGB_TRANSFER
					gl_FragColor = sRGBTransferOETF( gl_FragColor );
				#endif
			}`,depthTest:!1,depthWrite:!1}),c=new vi(a,l),u=new A_(-1,1,1,-1,0,1);let d=null,h=null,f=!1,p,_=null,g=[],m=!1;this.setSize=function(v,E){s.setSize(v,E),o.setSize(v,E);for(let x=0;x<g.length;x++){const w=g[x];w.setSize&&w.setSize(v,E)}},this.setEffects=function(v){g=v,m=g.length>0&&g[0].isRenderPass===!0;const E=s.width,x=s.height;for(let w=0;w<g.length;w++){const S=g[w];S.setSize&&S.setSize(E,x)}},this.begin=function(v,E){if(f||v.toneMapping===pi&&g.length===0)return!1;if(_=E,E!==null){const x=E.width,w=E.height;(s.width!==x||s.height!==w)&&this.setSize(x,w)}return m===!1&&v.setRenderTarget(s),p=v.toneMapping,v.toneMapping=pi,!0},this.hasRenderPass=function(){return m},this.end=function(v,E){v.toneMapping=p,f=!0;let x=s,w=o;for(let S=0;S<g.length;S++){const C=g[S];if(C.enabled!==!1&&(C.render(v,w,x,E),C.needsSwap!==!1)){const b=x;x=w,w=b}}if(d!==v.outputColorSpace||h!==v.toneMapping){d=v.outputColorSpace,h=v.toneMapping,l.defines={},Je.getTransfer(d)===dt&&(l.defines.SRGB_TRANSFER="");const S=ET[h];S&&(l.defines[S]=""),l.needsUpdate=!0}l.uniforms.tDiffuse.value=x.texture,v.setRenderTarget(_),v.render(c,u),_=null,f=!1},this.isCompositing=function(){return f},this.dispose=function(){s.depthTexture&&s.depthTexture.dispose(),s.dispose(),o.dispose(),a.dispose(),l.dispose()}}const L_=new cn,dd=new Us(1,1),D_=new g_,N_=new zS,I_=new S_,yp=[],Sp=[],Ep=new Float32Array(16),Mp=new Float32Array(9),wp=new Float32Array(4);function Xs(n,e,t){const i=n[0];if(i<=0||i>0)return n;const r=e*t;let s=yp[r];if(s===void 0&&(s=new Float32Array(r),yp[r]=s),e!==0){i.toArray(s,0);for(let o=1,a=0;o!==e;++o)a+=t,n[o].toArray(s,a)}return s}function qt(n,e){if(n.length!==e.length)return!1;for(let t=0,i=n.length;t<i;t++)if(n[t]!==e[t])return!1;return!0}function Kt(n,e){for(let t=0,i=e.length;t<i;t++)n[t]=e[t]}function Vl(n,e){let t=Sp[e];t===void 0&&(t=new Int32Array(e),Sp[e]=t);for(let i=0;i!==e;++i)t[i]=n.allocateTextureUnit();return t}function wT(n,e){const t=this.cache;t[0]!==e&&(n.uniform1f(this.addr,e),t[0]=e)}function TT(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(qt(t,e))return;n.uniform2fv(this.addr,e),Kt(t,e)}}function AT(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(n.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(qt(t,e))return;n.uniform3fv(this.addr,e),Kt(t,e)}}function CT(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(qt(t,e))return;n.uniform4fv(this.addr,e),Kt(t,e)}}function RT(n,e){const t=this.cache,i=e.elements;if(i===void 0){if(qt(t,e))return;n.uniformMatrix2fv(this.addr,!1,e),Kt(t,e)}else{if(qt(t,i))return;wp.set(i),n.uniformMatrix2fv(this.addr,!1,wp),Kt(t,i)}}function PT(n,e){const t=this.cache,i=e.elements;if(i===void 0){if(qt(t,e))return;n.uniformMatrix3fv(this.addr,!1,e),Kt(t,e)}else{if(qt(t,i))return;Mp.set(i),n.uniformMatrix3fv(this.addr,!1,Mp),Kt(t,i)}}function LT(n,e){const t=this.cache,i=e.elements;if(i===void 0){if(qt(t,e))return;n.uniformMatrix4fv(this.addr,!1,e),Kt(t,e)}else{if(qt(t,i))return;Ep.set(i),n.uniformMatrix4fv(this.addr,!1,Ep),Kt(t,i)}}function DT(n,e){const t=this.cache;t[0]!==e&&(n.uniform1i(this.addr,e),t[0]=e)}function NT(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(qt(t,e))return;n.uniform2iv(this.addr,e),Kt(t,e)}}function IT(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(qt(t,e))return;n.uniform3iv(this.addr,e),Kt(t,e)}}function UT(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(qt(t,e))return;n.uniform4iv(this.addr,e),Kt(t,e)}}function FT(n,e){const t=this.cache;t[0]!==e&&(n.uniform1ui(this.addr,e),t[0]=e)}function OT(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(qt(t,e))return;n.uniform2uiv(this.addr,e),Kt(t,e)}}function kT(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(qt(t,e))return;n.uniform3uiv(this.addr,e),Kt(t,e)}}function BT(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(qt(t,e))return;n.uniform4uiv(this.addr,e),Kt(t,e)}}function zT(n,e,t){const i=this.cache,r=t.allocateTextureUnit();i[0]!==r&&(n.uniform1i(this.addr,r),i[0]=r);let s;this.type===n.SAMPLER_2D_SHADOW?(dd.compareFunction=t.isReversedDepthBuffer()?qd:Yd,s=dd):s=L_,t.setTexture2D(e||s,r)}function GT(n,e,t){const i=this.cache,r=t.allocateTextureUnit();i[0]!==r&&(n.uniform1i(this.addr,r),i[0]=r),t.setTexture3D(e||N_,r)}function HT(n,e,t){const i=this.cache,r=t.allocateTextureUnit();i[0]!==r&&(n.uniform1i(this.addr,r),i[0]=r),t.setTextureCube(e||I_,r)}function VT(n,e,t){const i=this.cache,r=t.allocateTextureUnit();i[0]!==r&&(n.uniform1i(this.addr,r),i[0]=r),t.setTexture2DArray(e||D_,r)}function WT(n){switch(n){case 5126:return wT;case 35664:return TT;case 35665:return AT;case 35666:return CT;case 35674:return RT;case 35675:return PT;case 35676:return LT;case 5124:case 35670:return DT;case 35667:case 35671:return NT;case 35668:case 35672:return IT;case 35669:case 35673:return UT;case 5125:return FT;case 36294:return OT;case 36295:return kT;case 36296:return BT;case 35678:case 36198:case 36298:case 36306:case 35682:return zT;case 35679:case 36299:case 36307:return GT;case 35680:case 36300:case 36308:case 36293:return HT;case 36289:case 36303:case 36311:case 36292:return VT}}function $T(n,e){n.uniform1fv(this.addr,e)}function XT(n,e){const t=Xs(e,this.size,2);n.uniform2fv(this.addr,t)}function jT(n,e){const t=Xs(e,this.size,3);n.uniform3fv(this.addr,t)}function YT(n,e){const t=Xs(e,this.size,4);n.uniform4fv(this.addr,t)}function qT(n,e){const t=Xs(e,this.size,4);n.uniformMatrix2fv(this.addr,!1,t)}function KT(n,e){const t=Xs(e,this.size,9);n.uniformMatrix3fv(this.addr,!1,t)}function ZT(n,e){const t=Xs(e,this.size,16);n.uniformMatrix4fv(this.addr,!1,t)}function JT(n,e){n.uniform1iv(this.addr,e)}function QT(n,e){n.uniform2iv(this.addr,e)}function eA(n,e){n.uniform3iv(this.addr,e)}function tA(n,e){n.uniform4iv(this.addr,e)}function nA(n,e){n.uniform1uiv(this.addr,e)}function iA(n,e){n.uniform2uiv(this.addr,e)}function rA(n,e){n.uniform3uiv(this.addr,e)}function sA(n,e){n.uniform4uiv(this.addr,e)}function oA(n,e,t){const i=this.cache,r=e.length,s=Vl(t,r);qt(i,s)||(n.uniform1iv(this.addr,s),Kt(i,s));let o;this.type===n.SAMPLER_2D_SHADOW?o=dd:o=L_;for(let a=0;a!==r;++a)t.setTexture2D(e[a]||o,s[a])}function aA(n,e,t){const i=this.cache,r=e.length,s=Vl(t,r);qt(i,s)||(n.uniform1iv(this.addr,s),Kt(i,s));for(let o=0;o!==r;++o)t.setTexture3D(e[o]||N_,s[o])}function lA(n,e,t){const i=this.cache,r=e.length,s=Vl(t,r);qt(i,s)||(n.uniform1iv(this.addr,s),Kt(i,s));for(let o=0;o!==r;++o)t.setTextureCube(e[o]||I_,s[o])}function cA(n,e,t){const i=this.cache,r=e.length,s=Vl(t,r);qt(i,s)||(n.uniform1iv(this.addr,s),Kt(i,s));for(let o=0;o!==r;++o)t.setTexture2DArray(e[o]||D_,s[o])}function uA(n){switch(n){case 5126:return $T;case 35664:return XT;case 35665:return jT;case 35666:return YT;case 35674:return qT;case 35675:return KT;case 35676:return ZT;case 5124:case 35670:return JT;case 35667:case 35671:return QT;case 35668:case 35672:return eA;case 35669:case 35673:return tA;case 5125:return nA;case 36294:return iA;case 36295:return rA;case 36296:return sA;case 35678:case 36198:case 36298:case 36306:case 35682:return oA;case 35679:case 36299:case 36307:return aA;case 35680:case 36300:case 36308:case 36293:return lA;case 36289:case 36303:case 36311:case 36292:return cA}}class dA{constructor(e,t,i){this.id=e,this.addr=i,this.cache=[],this.type=t.type,this.setValue=WT(t.type)}}class hA{constructor(e,t,i){this.id=e,this.addr=i,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=uA(t.type)}}class fA{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,i){const r=this.seq;for(let s=0,o=r.length;s!==o;++s){const a=r[s];a.setValue(e,t[a.id],i)}}}const qc=/(\w+)(\])?(\[|\.)?/g;function Tp(n,e){n.seq.push(e),n.map[e.id]=e}function pA(n,e,t){const i=n.name,r=i.length;for(qc.lastIndex=0;;){const s=qc.exec(i),o=qc.lastIndex;let a=s[1];const l=s[2]==="]",c=s[3];if(l&&(a=a|0),c===void 0||c==="["&&o+2===r){Tp(t,c===void 0?new dA(a,n,e):new hA(a,n,e));break}else{let d=t.map[a];d===void 0&&(d=new fA(a),Tp(t,d)),t=d}}}class Wa{constructor(e,t){this.seq=[],this.map={};const i=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let o=0;o<i;++o){const a=e.getActiveUniform(t,o),l=e.getUniformLocation(t,a.name);pA(a,l,this)}const r=[],s=[];for(const o of this.seq)o.type===e.SAMPLER_2D_SHADOW||o.type===e.SAMPLER_CUBE_SHADOW||o.type===e.SAMPLER_2D_ARRAY_SHADOW?r.push(o):s.push(o);r.length>0&&(this.seq=r.concat(s))}setValue(e,t,i,r){const s=this.map[t];s!==void 0&&s.setValue(e,i,r)}setOptional(e,t,i){const r=t[i];r!==void 0&&this.setValue(e,i,r)}static upload(e,t,i,r){for(let s=0,o=t.length;s!==o;++s){const a=t[s],l=i[a.id];l.needsUpdate!==!1&&a.setValue(e,l.value,r)}}static seqWithValue(e,t){const i=[];for(let r=0,s=e.length;r!==s;++r){const o=e[r];o.id in t&&i.push(o)}return i}}function Ap(n,e,t){const i=n.createShader(e);return n.shaderSource(i,t),n.compileShader(i),i}const mA=37297;let gA=0;function _A(n,e){const t=n.split(`
`),i=[],r=Math.max(e-6,0),s=Math.min(e+6,t.length);for(let o=r;o<s;o++){const a=o+1;i.push(`${a===e?">":" "} ${a}: ${t[o]}`)}return i.join(`
`)}const Cp=new ze;function vA(n){Je._getMatrix(Cp,Je.workingColorSpace,n);const e=`mat3( ${Cp.elements.map(t=>t.toFixed(4))} )`;switch(Je.getTransfer(n)){case hl:return[e,"LinearTransferOETF"];case dt:return[e,"sRGBTransferOETF"];default:return Le("WebGLProgram: Unsupported color space: ",n),[e,"LinearTransferOETF"]}}function Rp(n,e,t){const i=n.getShaderParameter(e,n.COMPILE_STATUS),s=(n.getShaderInfoLog(e)||"").trim();if(i&&s==="")return"";const o=/ERROR: 0:(\d+)/.exec(s);if(o){const a=parseInt(o[1]);return t.toUpperCase()+`

`+s+`

`+_A(n.getShaderSource(e),a)}else return s}function xA(n,e){const t=vA(e);return[`vec4 ${n}( vec4 value ) {`,`	return ${t[1]}( vec4( value.rgb * ${t[0]}, value.a ) );`,"}"].join(`
`)}const bA={[e_]:"Linear",[t_]:"Reinhard",[n_]:"Cineon",[i_]:"ACESFilmic",[s_]:"AgX",[o_]:"Neutral",[r_]:"Custom"};function yA(n,e){const t=bA[e];return t===void 0?(Le("WebGLProgram: Unsupported toneMapping:",e),"vec3 "+n+"( vec3 color ) { return LinearToneMapping( color ); }"):"vec3 "+n+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}const Ca=new N;function SA(){Je.getLuminanceCoefficients(Ca);const n=Ca.x.toFixed(4),e=Ca.y.toFixed(4),t=Ca.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${n}, ${e}, ${t} );`,"	return dot( weights, rgb );","}"].join(`
`)}function EA(n){return[n.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",n.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(po).join(`
`)}function MA(n){const e=[];for(const t in n){const i=n[t];i!==!1&&e.push("#define "+t+" "+i)}return e.join(`
`)}function wA(n,e){const t={},i=n.getProgramParameter(e,n.ACTIVE_ATTRIBUTES);for(let r=0;r<i;r++){const s=n.getActiveAttrib(e,r),o=s.name;let a=1;s.type===n.FLOAT_MAT2&&(a=2),s.type===n.FLOAT_MAT3&&(a=3),s.type===n.FLOAT_MAT4&&(a=4),t[o]={type:s.type,location:n.getAttribLocation(e,o),locationSize:a}}return t}function po(n){return n!==""}function Pp(n,e){const t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return n.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function Lp(n,e){return n.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}const TA=/^[ \t]*#include +<([\w\d./]+)>/gm;function hd(n){return n.replace(TA,CA)}const AA=new Map;function CA(n,e){let t=$e[e];if(t===void 0){const i=AA.get(e);if(i!==void 0)t=$e[i],Le('WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,i);else throw new Error("Can not resolve #include <"+e+">")}return hd(t)}const RA=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Dp(n){return n.replace(RA,PA)}function PA(n,e,t,i){let r="";for(let s=parseInt(e);s<parseInt(t);s++)r+=i.replace(/\[\s*i\s*\]/g,"[ "+s+" ]").replace(/UNROLLED_LOOP_INDEX/g,s);return r}function Np(n){let e=`precision ${n.precision} float;
	precision ${n.precision} int;
	precision ${n.precision} sampler2D;
	precision ${n.precision} samplerCube;
	precision ${n.precision} sampler3D;
	precision ${n.precision} sampler2DArray;
	precision ${n.precision} sampler2DShadow;
	precision ${n.precision} samplerCubeShadow;
	precision ${n.precision} sampler2DArrayShadow;
	precision ${n.precision} isampler2D;
	precision ${n.precision} isampler3D;
	precision ${n.precision} isamplerCube;
	precision ${n.precision} isampler2DArray;
	precision ${n.precision} usampler2D;
	precision ${n.precision} usampler3D;
	precision ${n.precision} usamplerCube;
	precision ${n.precision} usampler2DArray;
	`;return n.precision==="highp"?e+=`
#define HIGH_PRECISION`:n.precision==="mediump"?e+=`
#define MEDIUM_PRECISION`:n.precision==="lowp"&&(e+=`
#define LOW_PRECISION`),e}const LA={[ka]:"SHADOWMAP_TYPE_PCF",[fo]:"SHADOWMAP_TYPE_VSM"};function DA(n){return LA[n.shadowMapType]||"SHADOWMAP_TYPE_BASIC"}const NA={[Vr]:"ENVMAP_TYPE_CUBE",[Is]:"ENVMAP_TYPE_CUBE",[zl]:"ENVMAP_TYPE_CUBE_UV"};function IA(n){return n.envMap===!1?"ENVMAP_TYPE_CUBE":NA[n.envMapMode]||"ENVMAP_TYPE_CUBE"}const UA={[Is]:"ENVMAP_MODE_REFRACTION"};function FA(n){return n.envMap===!1?"ENVMAP_MODE_REFLECTION":UA[n.envMapMode]||"ENVMAP_MODE_REFLECTION"}const OA={[Qg]:"ENVMAP_BLENDING_MULTIPLY",[vS]:"ENVMAP_BLENDING_MIX",[xS]:"ENVMAP_BLENDING_ADD"};function kA(n){return n.envMap===!1?"ENVMAP_BLENDING_NONE":OA[n.combine]||"ENVMAP_BLENDING_NONE"}function BA(n){const e=n.envMapCubeUVHeight;if(e===null)return null;const t=Math.log2(e)-2,i=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),112)),texelHeight:i,maxMip:t}}function zA(n,e,t,i){const r=n.getContext(),s=t.defines;let o=t.vertexShader,a=t.fragmentShader;const l=DA(t),c=IA(t),u=FA(t),d=kA(t),h=BA(t),f=EA(t),p=MA(s),_=r.createProgram();let g,m,v=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(g=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,p].filter(po).join(`
`),g.length>0&&(g+=`
`),m=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,p].filter(po).join(`
`),m.length>0&&(m+=`
`)):(g=[Np(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,p,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.batchingColor?"#define USE_BATCHING_COLOR":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+u:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexNormals?"#define HAS_NORMAL":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(po).join(`
`),m=[Np(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,p,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+c:"",t.envMap?"#define "+u:"",t.envMap?"#define "+d:"",h?"#define CUBEUV_TEXEL_WIDTH "+h.texelWidth:"",h?"#define CUBEUV_TEXEL_HEIGHT "+h.texelHeight:"",h?"#define CUBEUV_MAX_MIP "+h.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.packedNormalMap?"#define USE_PACKED_NORMALMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.dispersion?"#define USE_DISPERSION":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor?"#define USE_COLOR":"",t.vertexAlphas||t.batchingColor?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.numLightProbeGrids>0?"#define USE_LIGHT_PROBES_GRID":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==pi?"#define TONE_MAPPING":"",t.toneMapping!==pi?$e.tonemapping_pars_fragment:"",t.toneMapping!==pi?yA("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",$e.colorspace_pars_fragment,xA("linearToOutputTexel",t.outputColorSpace),SA(),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(po).join(`
`)),o=hd(o),o=Pp(o,t),o=Lp(o,t),a=hd(a),a=Pp(a,t),a=Lp(a,t),o=Dp(o),a=Dp(a),t.isRawShaderMaterial!==!0&&(v=`#version 300 es
`,g=[f,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+g,m=["#define varying in",t.glslVersion===Ff?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===Ff?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+m);const E=v+g+o,x=v+m+a,w=Ap(r,r.VERTEX_SHADER,E),S=Ap(r,r.FRAGMENT_SHADER,x);r.attachShader(_,w),r.attachShader(_,S),t.index0AttributeName!==void 0?r.bindAttribLocation(_,0,t.index0AttributeName):t.morphTargets===!0&&r.bindAttribLocation(_,0,"position"),r.linkProgram(_);function C(P){if(n.debug.checkShaderErrors){const F=r.getProgramInfoLog(_)||"",W=r.getShaderInfoLog(w)||"",$=r.getShaderInfoLog(S)||"",U=F.trim(),B=W.trim(),H=$.trim();let Z=!0,J=!0;if(r.getProgramParameter(_,r.LINK_STATUS)===!1)if(Z=!1,typeof n.debug.onShaderError=="function")n.debug.onShaderError(r,_,w,S);else{const ne=Rp(r,w,"vertex"),de=Rp(r,S,"fragment");Qe("THREE.WebGLProgram: Shader Error "+r.getError()+" - VALIDATE_STATUS "+r.getProgramParameter(_,r.VALIDATE_STATUS)+`

Material Name: `+P.name+`
Material Type: `+P.type+`

Program Info Log: `+U+`
`+ne+`
`+de)}else U!==""?Le("WebGLProgram: Program Info Log:",U):(B===""||H==="")&&(J=!1);J&&(P.diagnostics={runnable:Z,programLog:U,vertexShader:{log:B,prefix:g},fragmentShader:{log:H,prefix:m}})}r.deleteShader(w),r.deleteShader(S),b=new Wa(r,_),T=wA(r,_)}let b;this.getUniforms=function(){return b===void 0&&C(this),b};let T;this.getAttributes=function(){return T===void 0&&C(this),T};let L=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return L===!1&&(L=r.getProgramParameter(_,mA)),L},this.destroy=function(){i.releaseStatesOfProgram(this),r.deleteProgram(_),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=gA++,this.cacheKey=e,this.usedTimes=1,this.program=_,this.vertexShader=w,this.fragmentShader=S,this}let GA=0;class HA{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e){const t=e.vertexShader,i=e.fragmentShader,r=this._getShaderStage(t),s=this._getShaderStage(i),o=this._getShaderCacheForMaterial(e);return o.has(r)===!1&&(o.add(r),r.usedTimes++),o.has(s)===!1&&(o.add(s),s.usedTimes++),this}remove(e){const t=this.materialCache.get(e);for(const i of t)i.usedTimes--,i.usedTimes===0&&this.shaderCache.delete(i.code);return this.materialCache.delete(e),this}getVertexShaderID(e){return this._getShaderStage(e.vertexShader).id}getFragmentShaderID(e){return this._getShaderStage(e.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){const t=this.materialCache;let i=t.get(e);return i===void 0&&(i=new Set,t.set(e,i)),i}_getShaderStage(e){const t=this.shaderCache;let i=t.get(e);return i===void 0&&(i=new VA(e),t.set(e,i)),i}}class VA{constructor(e){this.id=GA++,this.code=e,this.usedTimes=0}}function WA(n){return n===Wr||n===cl||n===ul}function $A(n,e,t,i,r,s){const o=new Zd,a=new HA,l=new Set,c=[],u=new Map,d=i.logarithmicDepthBuffer;let h=i.precision;const f={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distance",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function p(b){return l.add(b),b===0?"uv":`uv${b}`}function _(b,T,L,P,F,W){const $=P.fog,U=F.geometry,B=b.isMeshStandardMaterial||b.isMeshLambertMaterial||b.isMeshPhongMaterial?P.environment:null,H=b.isMeshStandardMaterial||b.isMeshLambertMaterial&&!b.envMap||b.isMeshPhongMaterial&&!b.envMap,Z=e.get(b.envMap||B,H),J=Z&&Z.mapping===zl?Z.image.height:null,ne=f[b.type];b.precision!==null&&(h=i.getMaxPrecision(b.precision),h!==b.precision&&Le("WebGLProgram.getParameters:",b.precision,"not supported, using",h,"instead."));const de=U.morphAttributes.position||U.morphAttributes.normal||U.morphAttributes.color,ye=de!==void 0?de.length:0;let Fe=0;U.morphAttributes.position!==void 0&&(Fe=1),U.morphAttributes.normal!==void 0&&(Fe=2),U.morphAttributes.color!==void 0&&(Fe=3);let et,Ie,q,pe;if(ne){const Ge=ui[ne];et=Ge.vertexShader,Ie=Ge.fragmentShader}else et=b.vertexShader,Ie=b.fragmentShader,a.update(b),q=a.getVertexShaderID(b),pe=a.getFragmentShaderID(b);const ie=n.getRenderTarget(),Ce=n.state.buffers.depth.getReversed(),Oe=F.isInstancedMesh===!0,Ne=F.isBatchedMesh===!0,xt=!!b.map,Xe=!!b.matcap,ot=!!Z,mt=!!b.aoMap,je=!!b.lightMap,Wt=!!b.bumpMap,Mt=!!b.normalMap,yn=!!b.displacementMap,I=!!b.emissiveMap,$t=!!b.metalnessMap,Ze=!!b.roughnessMap,bt=b.anisotropy>0,he=b.clearcoat>0,Rt=b.dispersion>0,R=b.iridescence>0,y=b.sheen>0,k=b.transmission>0,Y=bt&&!!b.anisotropyMap,te=he&&!!b.clearcoatMap,re=he&&!!b.clearcoatNormalMap,ue=he&&!!b.clearcoatRoughnessMap,X=R&&!!b.iridescenceMap,K=R&&!!b.iridescenceThicknessMap,_e=y&&!!b.sheenColorMap,Se=y&&!!b.sheenRoughnessMap,le=!!b.specularMap,se=!!b.specularColorMap,Be=!!b.specularIntensityMap,Ve=k&&!!b.transmissionMap,it=k&&!!b.thicknessMap,D=!!b.gradientMap,oe=!!b.alphaMap,j=b.alphaTest>0,xe=!!b.alphaHash,ce=!!b.extensions;let ee=pi;b.toneMapped&&(ie===null||ie.isXRRenderTarget===!0)&&(ee=n.toneMapping);const Te={shaderID:ne,shaderType:b.type,shaderName:b.name,vertexShader:et,fragmentShader:Ie,defines:b.defines,customVertexShaderID:q,customFragmentShaderID:pe,isRawShaderMaterial:b.isRawShaderMaterial===!0,glslVersion:b.glslVersion,precision:h,batching:Ne,batchingColor:Ne&&F._colorsTexture!==null,instancing:Oe,instancingColor:Oe&&F.instanceColor!==null,instancingMorph:Oe&&F.morphTexture!==null,outputColorSpace:ie===null?n.outputColorSpace:ie.isXRRenderTarget===!0?ie.texture.colorSpace:Je.workingColorSpace,alphaToCoverage:!!b.alphaToCoverage,map:xt,matcap:Xe,envMap:ot,envMapMode:ot&&Z.mapping,envMapCubeUVHeight:J,aoMap:mt,lightMap:je,bumpMap:Wt,normalMap:Mt,displacementMap:yn,emissiveMap:I,normalMapObjectSpace:Mt&&b.normalMapType===SS,normalMapTangentSpace:Mt&&b.normalMapType===Nf,packedNormalMap:Mt&&b.normalMapType===Nf&&WA(b.normalMap.format),metalnessMap:$t,roughnessMap:Ze,anisotropy:bt,anisotropyMap:Y,clearcoat:he,clearcoatMap:te,clearcoatNormalMap:re,clearcoatRoughnessMap:ue,dispersion:Rt,iridescence:R,iridescenceMap:X,iridescenceThicknessMap:K,sheen:y,sheenColorMap:_e,sheenRoughnessMap:Se,specularMap:le,specularColorMap:se,specularIntensityMap:Be,transmission:k,transmissionMap:Ve,thicknessMap:it,gradientMap:D,opaque:b.transparent===!1&&b.blending===ws&&b.alphaToCoverage===!1,alphaMap:oe,alphaTest:j,alphaHash:xe,combine:b.combine,mapUv:xt&&p(b.map.channel),aoMapUv:mt&&p(b.aoMap.channel),lightMapUv:je&&p(b.lightMap.channel),bumpMapUv:Wt&&p(b.bumpMap.channel),normalMapUv:Mt&&p(b.normalMap.channel),displacementMapUv:yn&&p(b.displacementMap.channel),emissiveMapUv:I&&p(b.emissiveMap.channel),metalnessMapUv:$t&&p(b.metalnessMap.channel),roughnessMapUv:Ze&&p(b.roughnessMap.channel),anisotropyMapUv:Y&&p(b.anisotropyMap.channel),clearcoatMapUv:te&&p(b.clearcoatMap.channel),clearcoatNormalMapUv:re&&p(b.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:ue&&p(b.clearcoatRoughnessMap.channel),iridescenceMapUv:X&&p(b.iridescenceMap.channel),iridescenceThicknessMapUv:K&&p(b.iridescenceThicknessMap.channel),sheenColorMapUv:_e&&p(b.sheenColorMap.channel),sheenRoughnessMapUv:Se&&p(b.sheenRoughnessMap.channel),specularMapUv:le&&p(b.specularMap.channel),specularColorMapUv:se&&p(b.specularColorMap.channel),specularIntensityMapUv:Be&&p(b.specularIntensityMap.channel),transmissionMapUv:Ve&&p(b.transmissionMap.channel),thicknessMapUv:it&&p(b.thicknessMap.channel),alphaMapUv:oe&&p(b.alphaMap.channel),vertexTangents:!!U.attributes.tangent&&(Mt||bt),vertexNormals:!!U.attributes.normal,vertexColors:b.vertexColors,vertexAlphas:b.vertexColors===!0&&!!U.attributes.color&&U.attributes.color.itemSize===4,pointsUvs:F.isPoints===!0&&!!U.attributes.uv&&(xt||oe),fog:!!$,useFog:b.fog===!0,fogExp2:!!$&&$.isFogExp2,flatShading:b.wireframe===!1&&(b.flatShading===!0||U.attributes.normal===void 0&&Mt===!1&&(b.isMeshLambertMaterial||b.isMeshPhongMaterial||b.isMeshStandardMaterial||b.isMeshPhysicalMaterial)),sizeAttenuation:b.sizeAttenuation===!0,logarithmicDepthBuffer:d,reversedDepthBuffer:Ce,skinning:F.isSkinnedMesh===!0,morphTargets:U.morphAttributes.position!==void 0,morphNormals:U.morphAttributes.normal!==void 0,morphColors:U.morphAttributes.color!==void 0,morphTargetsCount:ye,morphTextureStride:Fe,numDirLights:T.directional.length,numPointLights:T.point.length,numSpotLights:T.spot.length,numSpotLightMaps:T.spotLightMap.length,numRectAreaLights:T.rectArea.length,numHemiLights:T.hemi.length,numDirLightShadows:T.directionalShadowMap.length,numPointLightShadows:T.pointShadowMap.length,numSpotLightShadows:T.spotShadowMap.length,numSpotLightShadowsWithMaps:T.numSpotLightShadowsWithMaps,numLightProbes:T.numLightProbes,numLightProbeGrids:W.length,numClippingPlanes:s.numPlanes,numClipIntersection:s.numIntersection,dithering:b.dithering,shadowMapEnabled:n.shadowMap.enabled&&L.length>0,shadowMapType:n.shadowMap.type,toneMapping:ee,decodeVideoTexture:xt&&b.map.isVideoTexture===!0&&Je.getTransfer(b.map.colorSpace)===dt,decodeVideoTextureEmissive:I&&b.emissiveMap.isVideoTexture===!0&&Je.getTransfer(b.emissiveMap.colorSpace)===dt,premultipliedAlpha:b.premultipliedAlpha,doubleSided:b.side===Ii,flipSided:b.side===bn,useDepthPacking:b.depthPacking>=0,depthPacking:b.depthPacking||0,index0AttributeName:b.index0AttributeName,extensionClipCullDistance:ce&&b.extensions.clipCullDistance===!0&&t.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(ce&&b.extensions.multiDraw===!0||Ne)&&t.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:t.has("KHR_parallel_shader_compile"),customProgramCacheKey:b.customProgramCacheKey()};return Te.vertexUv1s=l.has(1),Te.vertexUv2s=l.has(2),Te.vertexUv3s=l.has(3),l.clear(),Te}function g(b){const T=[];if(b.shaderID?T.push(b.shaderID):(T.push(b.customVertexShaderID),T.push(b.customFragmentShaderID)),b.defines!==void 0)for(const L in b.defines)T.push(L),T.push(b.defines[L]);return b.isRawShaderMaterial===!1&&(m(T,b),v(T,b),T.push(n.outputColorSpace)),T.push(b.customProgramCacheKey),T.join()}function m(b,T){b.push(T.precision),b.push(T.outputColorSpace),b.push(T.envMapMode),b.push(T.envMapCubeUVHeight),b.push(T.mapUv),b.push(T.alphaMapUv),b.push(T.lightMapUv),b.push(T.aoMapUv),b.push(T.bumpMapUv),b.push(T.normalMapUv),b.push(T.displacementMapUv),b.push(T.emissiveMapUv),b.push(T.metalnessMapUv),b.push(T.roughnessMapUv),b.push(T.anisotropyMapUv),b.push(T.clearcoatMapUv),b.push(T.clearcoatNormalMapUv),b.push(T.clearcoatRoughnessMapUv),b.push(T.iridescenceMapUv),b.push(T.iridescenceThicknessMapUv),b.push(T.sheenColorMapUv),b.push(T.sheenRoughnessMapUv),b.push(T.specularMapUv),b.push(T.specularColorMapUv),b.push(T.specularIntensityMapUv),b.push(T.transmissionMapUv),b.push(T.thicknessMapUv),b.push(T.combine),b.push(T.fogExp2),b.push(T.sizeAttenuation),b.push(T.morphTargetsCount),b.push(T.morphAttributeCount),b.push(T.numDirLights),b.push(T.numPointLights),b.push(T.numSpotLights),b.push(T.numSpotLightMaps),b.push(T.numHemiLights),b.push(T.numRectAreaLights),b.push(T.numDirLightShadows),b.push(T.numPointLightShadows),b.push(T.numSpotLightShadows),b.push(T.numSpotLightShadowsWithMaps),b.push(T.numLightProbes),b.push(T.shadowMapType),b.push(T.toneMapping),b.push(T.numClippingPlanes),b.push(T.numClipIntersection),b.push(T.depthPacking)}function v(b,T){o.disableAll(),T.instancing&&o.enable(0),T.instancingColor&&o.enable(1),T.instancingMorph&&o.enable(2),T.matcap&&o.enable(3),T.envMap&&o.enable(4),T.normalMapObjectSpace&&o.enable(5),T.normalMapTangentSpace&&o.enable(6),T.clearcoat&&o.enable(7),T.iridescence&&o.enable(8),T.alphaTest&&o.enable(9),T.vertexColors&&o.enable(10),T.vertexAlphas&&o.enable(11),T.vertexUv1s&&o.enable(12),T.vertexUv2s&&o.enable(13),T.vertexUv3s&&o.enable(14),T.vertexTangents&&o.enable(15),T.anisotropy&&o.enable(16),T.alphaHash&&o.enable(17),T.batching&&o.enable(18),T.dispersion&&o.enable(19),T.batchingColor&&o.enable(20),T.gradientMap&&o.enable(21),T.packedNormalMap&&o.enable(22),T.vertexNormals&&o.enable(23),b.push(o.mask),o.disableAll(),T.fog&&o.enable(0),T.useFog&&o.enable(1),T.flatShading&&o.enable(2),T.logarithmicDepthBuffer&&o.enable(3),T.reversedDepthBuffer&&o.enable(4),T.skinning&&o.enable(5),T.morphTargets&&o.enable(6),T.morphNormals&&o.enable(7),T.morphColors&&o.enable(8),T.premultipliedAlpha&&o.enable(9),T.shadowMapEnabled&&o.enable(10),T.doubleSided&&o.enable(11),T.flipSided&&o.enable(12),T.useDepthPacking&&o.enable(13),T.dithering&&o.enable(14),T.transmission&&o.enable(15),T.sheen&&o.enable(16),T.opaque&&o.enable(17),T.pointsUvs&&o.enable(18),T.decodeVideoTexture&&o.enable(19),T.decodeVideoTextureEmissive&&o.enable(20),T.alphaToCoverage&&o.enable(21),T.numLightProbeGrids>0&&o.enable(22),b.push(o.mask)}function E(b){const T=f[b.type];let L;if(T){const P=ui[T];L=dE.clone(P.uniforms)}else L=b.uniforms;return L}function x(b,T){let L=u.get(T);return L!==void 0?++L.usedTimes:(L=new zA(n,T,b,r),c.push(L),u.set(T,L)),L}function w(b){if(--b.usedTimes===0){const T=c.indexOf(b);c[T]=c[c.length-1],c.pop(),u.delete(b.cacheKey),b.destroy()}}function S(b){a.remove(b)}function C(){a.dispose()}return{getParameters:_,getProgramCacheKey:g,getUniforms:E,acquireProgram:x,releaseProgram:w,releaseShaderCache:S,programs:c,dispose:C}}function XA(){let n=new WeakMap;function e(o){return n.has(o)}function t(o){let a=n.get(o);return a===void 0&&(a={},n.set(o,a)),a}function i(o){n.delete(o)}function r(o,a,l){n.get(o)[a]=l}function s(){n=new WeakMap}return{has:e,get:t,remove:i,update:r,dispose:s}}function jA(n,e){return n.groupOrder!==e.groupOrder?n.groupOrder-e.groupOrder:n.renderOrder!==e.renderOrder?n.renderOrder-e.renderOrder:n.material.id!==e.material.id?n.material.id-e.material.id:n.materialVariant!==e.materialVariant?n.materialVariant-e.materialVariant:n.z!==e.z?n.z-e.z:n.id-e.id}function Ip(n,e){return n.groupOrder!==e.groupOrder?n.groupOrder-e.groupOrder:n.renderOrder!==e.renderOrder?n.renderOrder-e.renderOrder:n.z!==e.z?e.z-n.z:n.id-e.id}function Up(){const n=[];let e=0;const t=[],i=[],r=[];function s(){e=0,t.length=0,i.length=0,r.length=0}function o(h){let f=0;return h.isInstancedMesh&&(f+=2),h.isSkinnedMesh&&(f+=1),f}function a(h,f,p,_,g,m){let v=n[e];return v===void 0?(v={id:h.id,object:h,geometry:f,material:p,materialVariant:o(h),groupOrder:_,renderOrder:h.renderOrder,z:g,group:m},n[e]=v):(v.id=h.id,v.object=h,v.geometry=f,v.material=p,v.materialVariant=o(h),v.groupOrder=_,v.renderOrder=h.renderOrder,v.z=g,v.group=m),e++,v}function l(h,f,p,_,g,m){const v=a(h,f,p,_,g,m);p.transmission>0?i.push(v):p.transparent===!0?r.push(v):t.push(v)}function c(h,f,p,_,g,m){const v=a(h,f,p,_,g,m);p.transmission>0?i.unshift(v):p.transparent===!0?r.unshift(v):t.unshift(v)}function u(h,f){t.length>1&&t.sort(h||jA),i.length>1&&i.sort(f||Ip),r.length>1&&r.sort(f||Ip)}function d(){for(let h=e,f=n.length;h<f;h++){const p=n[h];if(p.id===null)break;p.id=null,p.object=null,p.geometry=null,p.material=null,p.group=null}}return{opaque:t,transmissive:i,transparent:r,init:s,push:l,unshift:c,finish:d,sort:u}}function YA(){let n=new WeakMap;function e(i,r){const s=n.get(i);let o;return s===void 0?(o=new Up,n.set(i,[o])):r>=s.length?(o=new Up,s.push(o)):o=s[r],o}function t(){n=new WeakMap}return{get:e,dispose:t}}function qA(){const n={};return{get:function(e){if(n[e.id]!==void 0)return n[e.id];let t;switch(e.type){case"DirectionalLight":t={direction:new N,color:new nt};break;case"SpotLight":t={position:new N,direction:new N,color:new nt,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new N,color:new nt,distance:0,decay:0};break;case"HemisphereLight":t={direction:new N,skyColor:new nt,groundColor:new nt};break;case"RectAreaLight":t={color:new nt,position:new N,halfWidth:new N,halfHeight:new N};break}return n[e.id]=t,t}}}function KA(){const n={};return{get:function(e){if(n[e.id]!==void 0)return n[e.id];let t;switch(e.type){case"DirectionalLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new We};break;case"SpotLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new We};break;case"PointLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new We,shadowCameraNear:1,shadowCameraFar:1e3};break}return n[e.id]=t,t}}}let ZA=0;function JA(n,e){return(e.castShadow?2:0)-(n.castShadow?2:0)+(e.map?1:0)-(n.map?1:0)}function QA(n){const e=new qA,t=KA(),i={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let c=0;c<9;c++)i.probe.push(new N);const r=new N,s=new Ct,o=new Ct;function a(c){let u=0,d=0,h=0;for(let T=0;T<9;T++)i.probe[T].set(0,0,0);let f=0,p=0,_=0,g=0,m=0,v=0,E=0,x=0,w=0,S=0,C=0;c.sort(JA);for(let T=0,L=c.length;T<L;T++){const P=c[T],F=P.color,W=P.intensity,$=P.distance;let U=null;if(P.shadow&&P.shadow.map&&(P.shadow.map.texture.format===Wr?U=P.shadow.map.texture:U=P.shadow.map.depthTexture||P.shadow.map.texture),P.isAmbientLight)u+=F.r*W,d+=F.g*W,h+=F.b*W;else if(P.isLightProbe){for(let B=0;B<9;B++)i.probe[B].addScaledVector(P.sh.coefficients[B],W);C++}else if(P.isDirectionalLight){const B=e.get(P);if(B.color.copy(P.color).multiplyScalar(P.intensity),P.castShadow){const H=P.shadow,Z=t.get(P);Z.shadowIntensity=H.intensity,Z.shadowBias=H.bias,Z.shadowNormalBias=H.normalBias,Z.shadowRadius=H.radius,Z.shadowMapSize=H.mapSize,i.directionalShadow[f]=Z,i.directionalShadowMap[f]=U,i.directionalShadowMatrix[f]=P.shadow.matrix,v++}i.directional[f]=B,f++}else if(P.isSpotLight){const B=e.get(P);B.position.setFromMatrixPosition(P.matrixWorld),B.color.copy(F).multiplyScalar(W),B.distance=$,B.coneCos=Math.cos(P.angle),B.penumbraCos=Math.cos(P.angle*(1-P.penumbra)),B.decay=P.decay,i.spot[_]=B;const H=P.shadow;if(P.map&&(i.spotLightMap[w]=P.map,w++,H.updateMatrices(P),P.castShadow&&S++),i.spotLightMatrix[_]=H.matrix,P.castShadow){const Z=t.get(P);Z.shadowIntensity=H.intensity,Z.shadowBias=H.bias,Z.shadowNormalBias=H.normalBias,Z.shadowRadius=H.radius,Z.shadowMapSize=H.mapSize,i.spotShadow[_]=Z,i.spotShadowMap[_]=U,x++}_++}else if(P.isRectAreaLight){const B=e.get(P);B.color.copy(F).multiplyScalar(W),B.halfWidth.set(P.width*.5,0,0),B.halfHeight.set(0,P.height*.5,0),i.rectArea[g]=B,g++}else if(P.isPointLight){const B=e.get(P);if(B.color.copy(P.color).multiplyScalar(P.intensity),B.distance=P.distance,B.decay=P.decay,P.castShadow){const H=P.shadow,Z=t.get(P);Z.shadowIntensity=H.intensity,Z.shadowBias=H.bias,Z.shadowNormalBias=H.normalBias,Z.shadowRadius=H.radius,Z.shadowMapSize=H.mapSize,Z.shadowCameraNear=H.camera.near,Z.shadowCameraFar=H.camera.far,i.pointShadow[p]=Z,i.pointShadowMap[p]=U,i.pointShadowMatrix[p]=P.shadow.matrix,E++}i.point[p]=B,p++}else if(P.isHemisphereLight){const B=e.get(P);B.skyColor.copy(P.color).multiplyScalar(W),B.groundColor.copy(P.groundColor).multiplyScalar(W),i.hemi[m]=B,m++}}g>0&&(n.has("OES_texture_float_linear")===!0?(i.rectAreaLTC1=fe.LTC_FLOAT_1,i.rectAreaLTC2=fe.LTC_FLOAT_2):(i.rectAreaLTC1=fe.LTC_HALF_1,i.rectAreaLTC2=fe.LTC_HALF_2)),i.ambient[0]=u,i.ambient[1]=d,i.ambient[2]=h;const b=i.hash;(b.directionalLength!==f||b.pointLength!==p||b.spotLength!==_||b.rectAreaLength!==g||b.hemiLength!==m||b.numDirectionalShadows!==v||b.numPointShadows!==E||b.numSpotShadows!==x||b.numSpotMaps!==w||b.numLightProbes!==C)&&(i.directional.length=f,i.spot.length=_,i.rectArea.length=g,i.point.length=p,i.hemi.length=m,i.directionalShadow.length=v,i.directionalShadowMap.length=v,i.pointShadow.length=E,i.pointShadowMap.length=E,i.spotShadow.length=x,i.spotShadowMap.length=x,i.directionalShadowMatrix.length=v,i.pointShadowMatrix.length=E,i.spotLightMatrix.length=x+w-S,i.spotLightMap.length=w,i.numSpotLightShadowsWithMaps=S,i.numLightProbes=C,b.directionalLength=f,b.pointLength=p,b.spotLength=_,b.rectAreaLength=g,b.hemiLength=m,b.numDirectionalShadows=v,b.numPointShadows=E,b.numSpotShadows=x,b.numSpotMaps=w,b.numLightProbes=C,i.version=ZA++)}function l(c,u){let d=0,h=0,f=0,p=0,_=0;const g=u.matrixWorldInverse;for(let m=0,v=c.length;m<v;m++){const E=c[m];if(E.isDirectionalLight){const x=i.directional[d];x.direction.setFromMatrixPosition(E.matrixWorld),r.setFromMatrixPosition(E.target.matrixWorld),x.direction.sub(r),x.direction.transformDirection(g),d++}else if(E.isSpotLight){const x=i.spot[f];x.position.setFromMatrixPosition(E.matrixWorld),x.position.applyMatrix4(g),x.direction.setFromMatrixPosition(E.matrixWorld),r.setFromMatrixPosition(E.target.matrixWorld),x.direction.sub(r),x.direction.transformDirection(g),f++}else if(E.isRectAreaLight){const x=i.rectArea[p];x.position.setFromMatrixPosition(E.matrixWorld),x.position.applyMatrix4(g),o.identity(),s.copy(E.matrixWorld),s.premultiply(g),o.extractRotation(s),x.halfWidth.set(E.width*.5,0,0),x.halfHeight.set(0,E.height*.5,0),x.halfWidth.applyMatrix4(o),x.halfHeight.applyMatrix4(o),p++}else if(E.isPointLight){const x=i.point[h];x.position.setFromMatrixPosition(E.matrixWorld),x.position.applyMatrix4(g),h++}else if(E.isHemisphereLight){const x=i.hemi[_];x.direction.setFromMatrixPosition(E.matrixWorld),x.direction.transformDirection(g),_++}}}return{setup:a,setupView:l,state:i}}function Fp(n){const e=new QA(n),t=[],i=[],r=[];function s(h){d.camera=h,t.length=0,i.length=0,r.length=0}function o(h){t.push(h)}function a(h){i.push(h)}function l(h){r.push(h)}function c(){e.setup(t)}function u(h){e.setupView(t,h)}const d={lightsArray:t,shadowsArray:i,lightProbeGridArray:r,camera:null,lights:e,transmissionRenderTarget:{},textureUnits:0};return{init:s,state:d,setupLights:c,setupLightsView:u,pushLight:o,pushShadow:a,pushLightProbeGrid:l}}function e1(n){let e=new WeakMap;function t(r,s=0){const o=e.get(r);let a;return o===void 0?(a=new Fp(n),e.set(r,[a])):s>=o.length?(a=new Fp(n),o.push(a)):a=o[s],a}function i(){e=new WeakMap}return{get:t,dispose:i}}const t1=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,n1=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ).rg;
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ).r;
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( max( 0.0, squared_mean - mean * mean ) );
	gl_FragColor = vec4( mean, std_dev, 0.0, 1.0 );
}`,i1=[new N(1,0,0),new N(-1,0,0),new N(0,1,0),new N(0,-1,0),new N(0,0,1),new N(0,0,-1)],r1=[new N(0,-1,0),new N(0,-1,0),new N(0,0,1),new N(0,0,-1),new N(0,-1,0),new N(0,-1,0)],Op=new Ct,co=new N,Kc=new N;function s1(n,e,t){let i=new b_;const r=new We,s=new We,o=new Bt,a=new mE,l=new gE,c={},u=t.maxTextureSize,d={[Sr]:bn,[bn]:Sr,[Ii]:Ii},h=new xi({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new We},radius:{value:4}},vertexShader:t1,fragmentShader:n1}),f=h.clone();f.defines.HORIZONTAL_PASS=1;const p=new At;p.setAttribute("position",new Bn(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const _=new vi(p,h),g=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=ka;let m=this.type;this.render=function(S,C,b){if(g.enabled===!1||g.autoUpdate===!1&&g.needsUpdate===!1||S.length===0)return;this.type===Qy&&(Le("WebGLShadowMap: PCFSoftShadowMap has been deprecated. Using PCFShadowMap instead."),this.type=ka);const T=n.getRenderTarget(),L=n.getActiveCubeFace(),P=n.getActiveMipmapLevel(),F=n.state;F.setBlending(Vi),F.buffers.depth.getReversed()===!0?F.buffers.color.setClear(0,0,0,0):F.buffers.color.setClear(1,1,1,1),F.buffers.depth.setTest(!0),F.setScissorTest(!1);const W=m!==this.type;W&&C.traverse(function($){$.material&&(Array.isArray($.material)?$.material.forEach(U=>U.needsUpdate=!0):$.material.needsUpdate=!0)});for(let $=0,U=S.length;$<U;$++){const B=S[$],H=B.shadow;if(H===void 0){Le("WebGLShadowMap:",B,"has no shadow.");continue}if(H.autoUpdate===!1&&H.needsUpdate===!1)continue;r.copy(H.mapSize);const Z=H.getFrameExtents();r.multiply(Z),s.copy(H.mapSize),(r.x>u||r.y>u)&&(r.x>u&&(s.x=Math.floor(u/Z.x),r.x=s.x*Z.x,H.mapSize.x=s.x),r.y>u&&(s.y=Math.floor(u/Z.y),r.y=s.y*Z.y,H.mapSize.y=s.y));const J=n.state.buffers.depth.getReversed();if(H.camera._reversedDepth=J,H.map===null||W===!0){if(H.map!==null&&(H.map.depthTexture!==null&&(H.map.depthTexture.dispose(),H.map.depthTexture=null),H.map.dispose()),this.type===fo){if(B.isPointLight){Le("WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.");continue}H.map=new mi(r.x,r.y,{format:Wr,type:$i,minFilter:ln,magFilter:ln,generateMipmaps:!1}),H.map.texture.name=B.name+".shadowMap",H.map.depthTexture=new Us(r.x,r.y,hi),H.map.depthTexture.name=B.name+".shadowMapDepth",H.map.depthTexture.format=Xi,H.map.depthTexture.compareFunction=null,H.map.depthTexture.minFilter=nn,H.map.depthTexture.magFilter=nn}else B.isPointLight?(H.map=new P_(r.x),H.map.depthTexture=new rE(r.x,_i)):(H.map=new mi(r.x,r.y),H.map.depthTexture=new Us(r.x,r.y,_i)),H.map.depthTexture.name=B.name+".shadowMap",H.map.depthTexture.format=Xi,this.type===ka?(H.map.depthTexture.compareFunction=J?qd:Yd,H.map.depthTexture.minFilter=ln,H.map.depthTexture.magFilter=ln):(H.map.depthTexture.compareFunction=null,H.map.depthTexture.minFilter=nn,H.map.depthTexture.magFilter=nn);H.camera.updateProjectionMatrix()}const ne=H.map.isWebGLCubeRenderTarget?6:1;for(let de=0;de<ne;de++){if(H.map.isWebGLCubeRenderTarget)n.setRenderTarget(H.map,de),n.clear();else{de===0&&(n.setRenderTarget(H.map),n.clear());const ye=H.getViewport(de);o.set(s.x*ye.x,s.y*ye.y,s.x*ye.z,s.y*ye.w),F.viewport(o)}if(B.isPointLight){const ye=H.camera,Fe=H.matrix,et=B.distance||ye.far;et!==ye.far&&(ye.far=et,ye.updateProjectionMatrix()),co.setFromMatrixPosition(B.matrixWorld),ye.position.copy(co),Kc.copy(ye.position),Kc.add(i1[de]),ye.up.copy(r1[de]),ye.lookAt(Kc),ye.updateMatrixWorld(),Fe.makeTranslation(-co.x,-co.y,-co.z),Op.multiplyMatrices(ye.projectionMatrix,ye.matrixWorldInverse),H._frustum.setFromProjectionMatrix(Op,ye.coordinateSystem,ye.reversedDepth)}else H.updateMatrices(B);i=H.getFrustum(),x(C,b,H.camera,B,this.type)}H.isPointLightShadow!==!0&&this.type===fo&&v(H,b),H.needsUpdate=!1}m=this.type,g.needsUpdate=!1,n.setRenderTarget(T,L,P)};function v(S,C){const b=e.update(_);h.defines.VSM_SAMPLES!==S.blurSamples&&(h.defines.VSM_SAMPLES=S.blurSamples,f.defines.VSM_SAMPLES=S.blurSamples,h.needsUpdate=!0,f.needsUpdate=!0),S.mapPass===null&&(S.mapPass=new mi(r.x,r.y,{format:Wr,type:$i})),h.uniforms.shadow_pass.value=S.map.depthTexture,h.uniforms.resolution.value=S.mapSize,h.uniforms.radius.value=S.radius,n.setRenderTarget(S.mapPass),n.clear(),n.renderBufferDirect(C,null,b,h,_,null),f.uniforms.shadow_pass.value=S.mapPass.texture,f.uniforms.resolution.value=S.mapSize,f.uniforms.radius.value=S.radius,n.setRenderTarget(S.map),n.clear(),n.renderBufferDirect(C,null,b,f,_,null)}function E(S,C,b,T){let L=null;const P=b.isPointLight===!0?S.customDistanceMaterial:S.customDepthMaterial;if(P!==void 0)L=P;else if(L=b.isPointLight===!0?l:a,n.localClippingEnabled&&C.clipShadows===!0&&Array.isArray(C.clippingPlanes)&&C.clippingPlanes.length!==0||C.displacementMap&&C.displacementScale!==0||C.alphaMap&&C.alphaTest>0||C.map&&C.alphaTest>0||C.alphaToCoverage===!0){const F=L.uuid,W=C.uuid;let $=c[F];$===void 0&&($={},c[F]=$);let U=$[W];U===void 0&&(U=L.clone(),$[W]=U,C.addEventListener("dispose",w)),L=U}if(L.visible=C.visible,L.wireframe=C.wireframe,T===fo?L.side=C.shadowSide!==null?C.shadowSide:C.side:L.side=C.shadowSide!==null?C.shadowSide:d[C.side],L.alphaMap=C.alphaMap,L.alphaTest=C.alphaToCoverage===!0?.5:C.alphaTest,L.map=C.map,L.clipShadows=C.clipShadows,L.clippingPlanes=C.clippingPlanes,L.clipIntersection=C.clipIntersection,L.displacementMap=C.displacementMap,L.displacementScale=C.displacementScale,L.displacementBias=C.displacementBias,L.wireframeLinewidth=C.wireframeLinewidth,L.linewidth=C.linewidth,b.isPointLight===!0&&L.isMeshDistanceMaterial===!0){const F=n.properties.get(L);F.light=b}return L}function x(S,C,b,T,L){if(S.visible===!1)return;if(S.layers.test(C.layers)&&(S.isMesh||S.isLine||S.isPoints)&&(S.castShadow||S.receiveShadow&&L===fo)&&(!S.frustumCulled||i.intersectsObject(S))){S.modelViewMatrix.multiplyMatrices(b.matrixWorldInverse,S.matrixWorld);const W=e.update(S),$=S.material;if(Array.isArray($)){const U=W.groups;for(let B=0,H=U.length;B<H;B++){const Z=U[B],J=$[Z.materialIndex];if(J&&J.visible){const ne=E(S,J,T,L);S.onBeforeShadow(n,S,C,b,W,ne,Z),n.renderBufferDirect(b,null,W,ne,S,Z),S.onAfterShadow(n,S,C,b,W,ne,Z)}}}else if($.visible){const U=E(S,$,T,L);S.onBeforeShadow(n,S,C,b,W,U,null),n.renderBufferDirect(b,null,W,U,S,null),S.onAfterShadow(n,S,C,b,W,U,null)}}const F=S.children;for(let W=0,$=F.length;W<$;W++)x(F[W],C,b,T,L)}function w(S){S.target.removeEventListener("dispose",w);for(const b in c){const T=c[b],L=S.target.uuid;L in T&&(T[L].dispose(),delete T[L])}}}function o1(n,e){function t(){let D=!1;const oe=new Bt;let j=null;const xe=new Bt(0,0,0,0);return{setMask:function(ce){j!==ce&&!D&&(n.colorMask(ce,ce,ce,ce),j=ce)},setLocked:function(ce){D=ce},setClear:function(ce,ee,Te,Ge,Dt){Dt===!0&&(ce*=Ge,ee*=Ge,Te*=Ge),oe.set(ce,ee,Te,Ge),xe.equals(oe)===!1&&(n.clearColor(ce,ee,Te,Ge),xe.copy(oe))},reset:function(){D=!1,j=null,xe.set(-1,0,0,0)}}}function i(){let D=!1,oe=!1,j=null,xe=null,ce=null;return{setReversed:function(ee){if(oe!==ee){const Te=e.get("EXT_clip_control");ee?Te.clipControlEXT(Te.LOWER_LEFT_EXT,Te.ZERO_TO_ONE_EXT):Te.clipControlEXT(Te.LOWER_LEFT_EXT,Te.NEGATIVE_ONE_TO_ONE_EXT),oe=ee;const Ge=ce;ce=null,this.setClear(Ge)}},getReversed:function(){return oe},setTest:function(ee){ee?ie(n.DEPTH_TEST):Ce(n.DEPTH_TEST)},setMask:function(ee){j!==ee&&!D&&(n.depthMask(ee),j=ee)},setFunc:function(ee){if(oe&&(ee=DS[ee]),xe!==ee){switch(ee){case yu:n.depthFunc(n.NEVER);break;case Su:n.depthFunc(n.ALWAYS);break;case Eu:n.depthFunc(n.LESS);break;case Ns:n.depthFunc(n.LEQUAL);break;case Mu:n.depthFunc(n.EQUAL);break;case wu:n.depthFunc(n.GEQUAL);break;case Tu:n.depthFunc(n.GREATER);break;case Au:n.depthFunc(n.NOTEQUAL);break;default:n.depthFunc(n.LEQUAL)}xe=ee}},setLocked:function(ee){D=ee},setClear:function(ee){ce!==ee&&(ce=ee,oe&&(ee=1-ee),n.clearDepth(ee))},reset:function(){D=!1,j=null,xe=null,ce=null,oe=!1}}}function r(){let D=!1,oe=null,j=null,xe=null,ce=null,ee=null,Te=null,Ge=null,Dt=null;return{setTest:function(ht){D||(ht?ie(n.STENCIL_TEST):Ce(n.STENCIL_TEST))},setMask:function(ht){oe!==ht&&!D&&(n.stencilMask(ht),oe=ht)},setFunc:function(ht,bi,ri){(j!==ht||xe!==bi||ce!==ri)&&(n.stencilFunc(ht,bi,ri),j=ht,xe=bi,ce=ri)},setOp:function(ht,bi,ri){(ee!==ht||Te!==bi||Ge!==ri)&&(n.stencilOp(ht,bi,ri),ee=ht,Te=bi,Ge=ri)},setLocked:function(ht){D=ht},setClear:function(ht){Dt!==ht&&(n.clearStencil(ht),Dt=ht)},reset:function(){D=!1,oe=null,j=null,xe=null,ce=null,ee=null,Te=null,Ge=null,Dt=null}}}const s=new t,o=new i,a=new r,l=new WeakMap,c=new WeakMap;let u={},d={},h={},f=new WeakMap,p=[],_=null,g=!1,m=null,v=null,E=null,x=null,w=null,S=null,C=null,b=new nt(0,0,0),T=0,L=!1,P=null,F=null,W=null,$=null,U=null;const B=n.getParameter(n.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let H=!1,Z=0;const J=n.getParameter(n.VERSION);J.indexOf("WebGL")!==-1?(Z=parseFloat(/^WebGL (\d)/.exec(J)[1]),H=Z>=1):J.indexOf("OpenGL ES")!==-1&&(Z=parseFloat(/^OpenGL ES (\d)/.exec(J)[1]),H=Z>=2);let ne=null,de={};const ye=n.getParameter(n.SCISSOR_BOX),Fe=n.getParameter(n.VIEWPORT),et=new Bt().fromArray(ye),Ie=new Bt().fromArray(Fe);function q(D,oe,j,xe){const ce=new Uint8Array(4),ee=n.createTexture();n.bindTexture(D,ee),n.texParameteri(D,n.TEXTURE_MIN_FILTER,n.NEAREST),n.texParameteri(D,n.TEXTURE_MAG_FILTER,n.NEAREST);for(let Te=0;Te<j;Te++)D===n.TEXTURE_3D||D===n.TEXTURE_2D_ARRAY?n.texImage3D(oe,0,n.RGBA,1,1,xe,0,n.RGBA,n.UNSIGNED_BYTE,ce):n.texImage2D(oe+Te,0,n.RGBA,1,1,0,n.RGBA,n.UNSIGNED_BYTE,ce);return ee}const pe={};pe[n.TEXTURE_2D]=q(n.TEXTURE_2D,n.TEXTURE_2D,1),pe[n.TEXTURE_CUBE_MAP]=q(n.TEXTURE_CUBE_MAP,n.TEXTURE_CUBE_MAP_POSITIVE_X,6),pe[n.TEXTURE_2D_ARRAY]=q(n.TEXTURE_2D_ARRAY,n.TEXTURE_2D_ARRAY,1,1),pe[n.TEXTURE_3D]=q(n.TEXTURE_3D,n.TEXTURE_3D,1,1),s.setClear(0,0,0,1),o.setClear(1),a.setClear(0),ie(n.DEPTH_TEST),o.setFunc(Ns),Wt(!1),Mt(Rf),ie(n.CULL_FACE),mt(Vi);function ie(D){u[D]!==!0&&(n.enable(D),u[D]=!0)}function Ce(D){u[D]!==!1&&(n.disable(D),u[D]=!1)}function Oe(D,oe){return h[D]!==oe?(n.bindFramebuffer(D,oe),h[D]=oe,D===n.DRAW_FRAMEBUFFER&&(h[n.FRAMEBUFFER]=oe),D===n.FRAMEBUFFER&&(h[n.DRAW_FRAMEBUFFER]=oe),!0):!1}function Ne(D,oe){let j=p,xe=!1;if(D){j=f.get(oe),j===void 0&&(j=[],f.set(oe,j));const ce=D.textures;if(j.length!==ce.length||j[0]!==n.COLOR_ATTACHMENT0){for(let ee=0,Te=ce.length;ee<Te;ee++)j[ee]=n.COLOR_ATTACHMENT0+ee;j.length=ce.length,xe=!0}}else j[0]!==n.BACK&&(j[0]=n.BACK,xe=!0);xe&&n.drawBuffers(j)}function xt(D){return _!==D?(n.useProgram(D),_=D,!0):!1}const Xe={[Ir]:n.FUNC_ADD,[tS]:n.FUNC_SUBTRACT,[nS]:n.FUNC_REVERSE_SUBTRACT};Xe[iS]=n.MIN,Xe[rS]=n.MAX;const ot={[sS]:n.ZERO,[oS]:n.ONE,[aS]:n.SRC_COLOR,[xu]:n.SRC_ALPHA,[fS]:n.SRC_ALPHA_SATURATE,[dS]:n.DST_COLOR,[cS]:n.DST_ALPHA,[lS]:n.ONE_MINUS_SRC_COLOR,[bu]:n.ONE_MINUS_SRC_ALPHA,[hS]:n.ONE_MINUS_DST_COLOR,[uS]:n.ONE_MINUS_DST_ALPHA,[pS]:n.CONSTANT_COLOR,[mS]:n.ONE_MINUS_CONSTANT_COLOR,[gS]:n.CONSTANT_ALPHA,[_S]:n.ONE_MINUS_CONSTANT_ALPHA};function mt(D,oe,j,xe,ce,ee,Te,Ge,Dt,ht){if(D===Vi){g===!0&&(Ce(n.BLEND),g=!1);return}if(g===!1&&(ie(n.BLEND),g=!0),D!==eS){if(D!==m||ht!==L){if((v!==Ir||w!==Ir)&&(n.blendEquation(n.FUNC_ADD),v=Ir,w=Ir),ht)switch(D){case ws:n.blendFuncSeparate(n.ONE,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case Pf:n.blendFunc(n.ONE,n.ONE);break;case Lf:n.blendFuncSeparate(n.ZERO,n.ONE_MINUS_SRC_COLOR,n.ZERO,n.ONE);break;case Df:n.blendFuncSeparate(n.DST_COLOR,n.ONE_MINUS_SRC_ALPHA,n.ZERO,n.ONE);break;default:Qe("WebGLState: Invalid blending: ",D);break}else switch(D){case ws:n.blendFuncSeparate(n.SRC_ALPHA,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case Pf:n.blendFuncSeparate(n.SRC_ALPHA,n.ONE,n.ONE,n.ONE);break;case Lf:Qe("WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case Df:Qe("WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:Qe("WebGLState: Invalid blending: ",D);break}E=null,x=null,S=null,C=null,b.set(0,0,0),T=0,m=D,L=ht}return}ce=ce||oe,ee=ee||j,Te=Te||xe,(oe!==v||ce!==w)&&(n.blendEquationSeparate(Xe[oe],Xe[ce]),v=oe,w=ce),(j!==E||xe!==x||ee!==S||Te!==C)&&(n.blendFuncSeparate(ot[j],ot[xe],ot[ee],ot[Te]),E=j,x=xe,S=ee,C=Te),(Ge.equals(b)===!1||Dt!==T)&&(n.blendColor(Ge.r,Ge.g,Ge.b,Dt),b.copy(Ge),T=Dt),m=D,L=!1}function je(D,oe){D.side===Ii?Ce(n.CULL_FACE):ie(n.CULL_FACE);let j=D.side===bn;oe&&(j=!j),Wt(j),D.blending===ws&&D.transparent===!1?mt(Vi):mt(D.blending,D.blendEquation,D.blendSrc,D.blendDst,D.blendEquationAlpha,D.blendSrcAlpha,D.blendDstAlpha,D.blendColor,D.blendAlpha,D.premultipliedAlpha),o.setFunc(D.depthFunc),o.setTest(D.depthTest),o.setMask(D.depthWrite),s.setMask(D.colorWrite);const xe=D.stencilWrite;a.setTest(xe),xe&&(a.setMask(D.stencilWriteMask),a.setFunc(D.stencilFunc,D.stencilRef,D.stencilFuncMask),a.setOp(D.stencilFail,D.stencilZFail,D.stencilZPass)),I(D.polygonOffset,D.polygonOffsetFactor,D.polygonOffsetUnits),D.alphaToCoverage===!0?ie(n.SAMPLE_ALPHA_TO_COVERAGE):Ce(n.SAMPLE_ALPHA_TO_COVERAGE)}function Wt(D){P!==D&&(D?n.frontFace(n.CW):n.frontFace(n.CCW),P=D)}function Mt(D){D!==Zy?(ie(n.CULL_FACE),D!==F&&(D===Rf?n.cullFace(n.BACK):D===Jy?n.cullFace(n.FRONT):n.cullFace(n.FRONT_AND_BACK))):Ce(n.CULL_FACE),F=D}function yn(D){D!==W&&(H&&n.lineWidth(D),W=D)}function I(D,oe,j){D?(ie(n.POLYGON_OFFSET_FILL),($!==oe||U!==j)&&($=oe,U=j,o.getReversed()&&(oe=-oe),n.polygonOffset(oe,j))):Ce(n.POLYGON_OFFSET_FILL)}function $t(D){D?ie(n.SCISSOR_TEST):Ce(n.SCISSOR_TEST)}function Ze(D){D===void 0&&(D=n.TEXTURE0+B-1),ne!==D&&(n.activeTexture(D),ne=D)}function bt(D,oe,j){j===void 0&&(ne===null?j=n.TEXTURE0+B-1:j=ne);let xe=de[j];xe===void 0&&(xe={type:void 0,texture:void 0},de[j]=xe),(xe.type!==D||xe.texture!==oe)&&(ne!==j&&(n.activeTexture(j),ne=j),n.bindTexture(D,oe||pe[D]),xe.type=D,xe.texture=oe)}function he(){const D=de[ne];D!==void 0&&D.type!==void 0&&(n.bindTexture(D.type,null),D.type=void 0,D.texture=void 0)}function Rt(){try{n.compressedTexImage2D(...arguments)}catch(D){Qe("WebGLState:",D)}}function R(){try{n.compressedTexImage3D(...arguments)}catch(D){Qe("WebGLState:",D)}}function y(){try{n.texSubImage2D(...arguments)}catch(D){Qe("WebGLState:",D)}}function k(){try{n.texSubImage3D(...arguments)}catch(D){Qe("WebGLState:",D)}}function Y(){try{n.compressedTexSubImage2D(...arguments)}catch(D){Qe("WebGLState:",D)}}function te(){try{n.compressedTexSubImage3D(...arguments)}catch(D){Qe("WebGLState:",D)}}function re(){try{n.texStorage2D(...arguments)}catch(D){Qe("WebGLState:",D)}}function ue(){try{n.texStorage3D(...arguments)}catch(D){Qe("WebGLState:",D)}}function X(){try{n.texImage2D(...arguments)}catch(D){Qe("WebGLState:",D)}}function K(){try{n.texImage3D(...arguments)}catch(D){Qe("WebGLState:",D)}}function _e(D){return d[D]!==void 0?d[D]:n.getParameter(D)}function Se(D,oe){d[D]!==oe&&(n.pixelStorei(D,oe),d[D]=oe)}function le(D){et.equals(D)===!1&&(n.scissor(D.x,D.y,D.z,D.w),et.copy(D))}function se(D){Ie.equals(D)===!1&&(n.viewport(D.x,D.y,D.z,D.w),Ie.copy(D))}function Be(D,oe){let j=c.get(oe);j===void 0&&(j=new WeakMap,c.set(oe,j));let xe=j.get(D);xe===void 0&&(xe=n.getUniformBlockIndex(oe,D.name),j.set(D,xe))}function Ve(D,oe){const xe=c.get(oe).get(D);l.get(oe)!==xe&&(n.uniformBlockBinding(oe,xe,D.__bindingPointIndex),l.set(oe,xe))}function it(){n.disable(n.BLEND),n.disable(n.CULL_FACE),n.disable(n.DEPTH_TEST),n.disable(n.POLYGON_OFFSET_FILL),n.disable(n.SCISSOR_TEST),n.disable(n.STENCIL_TEST),n.disable(n.SAMPLE_ALPHA_TO_COVERAGE),n.blendEquation(n.FUNC_ADD),n.blendFunc(n.ONE,n.ZERO),n.blendFuncSeparate(n.ONE,n.ZERO,n.ONE,n.ZERO),n.blendColor(0,0,0,0),n.colorMask(!0,!0,!0,!0),n.clearColor(0,0,0,0),n.depthMask(!0),n.depthFunc(n.LESS),o.setReversed(!1),n.clearDepth(1),n.stencilMask(4294967295),n.stencilFunc(n.ALWAYS,0,4294967295),n.stencilOp(n.KEEP,n.KEEP,n.KEEP),n.clearStencil(0),n.cullFace(n.BACK),n.frontFace(n.CCW),n.polygonOffset(0,0),n.activeTexture(n.TEXTURE0),n.bindFramebuffer(n.FRAMEBUFFER,null),n.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),n.bindFramebuffer(n.READ_FRAMEBUFFER,null),n.useProgram(null),n.lineWidth(1),n.scissor(0,0,n.canvas.width,n.canvas.height),n.viewport(0,0,n.canvas.width,n.canvas.height),n.pixelStorei(n.PACK_ALIGNMENT,4),n.pixelStorei(n.UNPACK_ALIGNMENT,4),n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,!1),n.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),n.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,n.BROWSER_DEFAULT_WEBGL),n.pixelStorei(n.PACK_ROW_LENGTH,0),n.pixelStorei(n.PACK_SKIP_PIXELS,0),n.pixelStorei(n.PACK_SKIP_ROWS,0),n.pixelStorei(n.UNPACK_ROW_LENGTH,0),n.pixelStorei(n.UNPACK_IMAGE_HEIGHT,0),n.pixelStorei(n.UNPACK_SKIP_PIXELS,0),n.pixelStorei(n.UNPACK_SKIP_ROWS,0),n.pixelStorei(n.UNPACK_SKIP_IMAGES,0),u={},d={},ne=null,de={},h={},f=new WeakMap,p=[],_=null,g=!1,m=null,v=null,E=null,x=null,w=null,S=null,C=null,b=new nt(0,0,0),T=0,L=!1,P=null,F=null,W=null,$=null,U=null,et.set(0,0,n.canvas.width,n.canvas.height),Ie.set(0,0,n.canvas.width,n.canvas.height),s.reset(),o.reset(),a.reset()}return{buffers:{color:s,depth:o,stencil:a},enable:ie,disable:Ce,bindFramebuffer:Oe,drawBuffers:Ne,useProgram:xt,setBlending:mt,setMaterial:je,setFlipSided:Wt,setCullFace:Mt,setLineWidth:yn,setPolygonOffset:I,setScissorTest:$t,activeTexture:Ze,bindTexture:bt,unbindTexture:he,compressedTexImage2D:Rt,compressedTexImage3D:R,texImage2D:X,texImage3D:K,pixelStorei:Se,getParameter:_e,updateUBOMapping:Be,uniformBlockBinding:Ve,texStorage2D:re,texStorage3D:ue,texSubImage2D:y,texSubImage3D:k,compressedTexSubImage2D:Y,compressedTexSubImage3D:te,scissor:le,viewport:se,reset:it}}function a1(n,e,t,i,r,s,o){const a=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),c=new We,u=new WeakMap,d=new Set;let h;const f=new WeakMap;let p=!1;try{p=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function _(R,y){return p?new OffscreenCanvas(R,y):pl("canvas")}function g(R,y,k){let Y=1;const te=Rt(R);if((te.width>k||te.height>k)&&(Y=k/Math.max(te.width,te.height)),Y<1)if(typeof HTMLImageElement<"u"&&R instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&R instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&R instanceof ImageBitmap||typeof VideoFrame<"u"&&R instanceof VideoFrame){const re=Math.floor(Y*te.width),ue=Math.floor(Y*te.height);h===void 0&&(h=_(re,ue));const X=y?_(re,ue):h;return X.width=re,X.height=ue,X.getContext("2d").drawImage(R,0,0,re,ue),Le("WebGLRenderer: Texture has been resized from ("+te.width+"x"+te.height+") to ("+re+"x"+ue+")."),X}else return"data"in R&&Le("WebGLRenderer: Image in DataTexture is too big ("+te.width+"x"+te.height+")."),R;return R}function m(R){return R.generateMipmaps}function v(R){n.generateMipmap(R)}function E(R){return R.isWebGLCubeRenderTarget?n.TEXTURE_CUBE_MAP:R.isWebGL3DRenderTarget?n.TEXTURE_3D:R.isWebGLArrayRenderTarget||R.isCompressedArrayTexture?n.TEXTURE_2D_ARRAY:n.TEXTURE_2D}function x(R,y,k,Y,te,re=!1){if(R!==null){if(n[R]!==void 0)return n[R];Le("WebGLRenderer: Attempt to use non-existing WebGL internal format '"+R+"'")}let ue;Y&&(ue=e.get("EXT_texture_norm16"),ue||Le("WebGLRenderer: Unable to use normalized textures without EXT_texture_norm16 extension"));let X=y;if(y===n.RED&&(k===n.FLOAT&&(X=n.R32F),k===n.HALF_FLOAT&&(X=n.R16F),k===n.UNSIGNED_BYTE&&(X=n.R8),k===n.UNSIGNED_SHORT&&ue&&(X=ue.R16_EXT),k===n.SHORT&&ue&&(X=ue.R16_SNORM_EXT)),y===n.RED_INTEGER&&(k===n.UNSIGNED_BYTE&&(X=n.R8UI),k===n.UNSIGNED_SHORT&&(X=n.R16UI),k===n.UNSIGNED_INT&&(X=n.R32UI),k===n.BYTE&&(X=n.R8I),k===n.SHORT&&(X=n.R16I),k===n.INT&&(X=n.R32I)),y===n.RG&&(k===n.FLOAT&&(X=n.RG32F),k===n.HALF_FLOAT&&(X=n.RG16F),k===n.UNSIGNED_BYTE&&(X=n.RG8),k===n.UNSIGNED_SHORT&&ue&&(X=ue.RG16_EXT),k===n.SHORT&&ue&&(X=ue.RG16_SNORM_EXT)),y===n.RG_INTEGER&&(k===n.UNSIGNED_BYTE&&(X=n.RG8UI),k===n.UNSIGNED_SHORT&&(X=n.RG16UI),k===n.UNSIGNED_INT&&(X=n.RG32UI),k===n.BYTE&&(X=n.RG8I),k===n.SHORT&&(X=n.RG16I),k===n.INT&&(X=n.RG32I)),y===n.RGB_INTEGER&&(k===n.UNSIGNED_BYTE&&(X=n.RGB8UI),k===n.UNSIGNED_SHORT&&(X=n.RGB16UI),k===n.UNSIGNED_INT&&(X=n.RGB32UI),k===n.BYTE&&(X=n.RGB8I),k===n.SHORT&&(X=n.RGB16I),k===n.INT&&(X=n.RGB32I)),y===n.RGBA_INTEGER&&(k===n.UNSIGNED_BYTE&&(X=n.RGBA8UI),k===n.UNSIGNED_SHORT&&(X=n.RGBA16UI),k===n.UNSIGNED_INT&&(X=n.RGBA32UI),k===n.BYTE&&(X=n.RGBA8I),k===n.SHORT&&(X=n.RGBA16I),k===n.INT&&(X=n.RGBA32I)),y===n.RGB&&(k===n.UNSIGNED_SHORT&&ue&&(X=ue.RGB16_EXT),k===n.SHORT&&ue&&(X=ue.RGB16_SNORM_EXT),k===n.UNSIGNED_INT_5_9_9_9_REV&&(X=n.RGB9_E5),k===n.UNSIGNED_INT_10F_11F_11F_REV&&(X=n.R11F_G11F_B10F)),y===n.RGBA){const K=re?hl:Je.getTransfer(te);k===n.FLOAT&&(X=n.RGBA32F),k===n.HALF_FLOAT&&(X=n.RGBA16F),k===n.UNSIGNED_BYTE&&(X=K===dt?n.SRGB8_ALPHA8:n.RGBA8),k===n.UNSIGNED_SHORT&&ue&&(X=ue.RGBA16_EXT),k===n.SHORT&&ue&&(X=ue.RGBA16_SNORM_EXT),k===n.UNSIGNED_SHORT_4_4_4_4&&(X=n.RGBA4),k===n.UNSIGNED_SHORT_5_5_5_1&&(X=n.RGB5_A1)}return(X===n.R16F||X===n.R32F||X===n.RG16F||X===n.RG32F||X===n.RGBA16F||X===n.RGBA32F)&&e.get("EXT_color_buffer_float"),X}function w(R,y){let k;return R?y===null||y===_i||y===Lo?k=n.DEPTH24_STENCIL8:y===hi?k=n.DEPTH32F_STENCIL8:y===Po&&(k=n.DEPTH24_STENCIL8,Le("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):y===null||y===_i||y===Lo?k=n.DEPTH_COMPONENT24:y===hi?k=n.DEPTH_COMPONENT32F:y===Po&&(k=n.DEPTH_COMPONENT16),k}function S(R,y){return m(R)===!0||R.isFramebufferTexture&&R.minFilter!==nn&&R.minFilter!==ln?Math.log2(Math.max(y.width,y.height))+1:R.mipmaps!==void 0&&R.mipmaps.length>0?R.mipmaps.length:R.isCompressedTexture&&Array.isArray(R.image)?y.mipmaps.length:1}function C(R){const y=R.target;y.removeEventListener("dispose",C),T(y),y.isVideoTexture&&u.delete(y),y.isHTMLTexture&&d.delete(y)}function b(R){const y=R.target;y.removeEventListener("dispose",b),P(y)}function T(R){const y=i.get(R);if(y.__webglInit===void 0)return;const k=R.source,Y=f.get(k);if(Y){const te=Y[y.__cacheKey];te.usedTimes--,te.usedTimes===0&&L(R),Object.keys(Y).length===0&&f.delete(k)}i.remove(R)}function L(R){const y=i.get(R);n.deleteTexture(y.__webglTexture);const k=R.source,Y=f.get(k);delete Y[y.__cacheKey],o.memory.textures--}function P(R){const y=i.get(R);if(R.depthTexture&&(R.depthTexture.dispose(),i.remove(R.depthTexture)),R.isWebGLCubeRenderTarget)for(let Y=0;Y<6;Y++){if(Array.isArray(y.__webglFramebuffer[Y]))for(let te=0;te<y.__webglFramebuffer[Y].length;te++)n.deleteFramebuffer(y.__webglFramebuffer[Y][te]);else n.deleteFramebuffer(y.__webglFramebuffer[Y]);y.__webglDepthbuffer&&n.deleteRenderbuffer(y.__webglDepthbuffer[Y])}else{if(Array.isArray(y.__webglFramebuffer))for(let Y=0;Y<y.__webglFramebuffer.length;Y++)n.deleteFramebuffer(y.__webglFramebuffer[Y]);else n.deleteFramebuffer(y.__webglFramebuffer);if(y.__webglDepthbuffer&&n.deleteRenderbuffer(y.__webglDepthbuffer),y.__webglMultisampledFramebuffer&&n.deleteFramebuffer(y.__webglMultisampledFramebuffer),y.__webglColorRenderbuffer)for(let Y=0;Y<y.__webglColorRenderbuffer.length;Y++)y.__webglColorRenderbuffer[Y]&&n.deleteRenderbuffer(y.__webglColorRenderbuffer[Y]);y.__webglDepthRenderbuffer&&n.deleteRenderbuffer(y.__webglDepthRenderbuffer)}const k=R.textures;for(let Y=0,te=k.length;Y<te;Y++){const re=i.get(k[Y]);re.__webglTexture&&(n.deleteTexture(re.__webglTexture),o.memory.textures--),i.remove(k[Y])}i.remove(R)}let F=0;function W(){F=0}function $(){return F}function U(R){F=R}function B(){const R=F;return R>=r.maxTextures&&Le("WebGLTextures: Trying to use "+R+" texture units while this GPU supports only "+r.maxTextures),F+=1,R}function H(R){const y=[];return y.push(R.wrapS),y.push(R.wrapT),y.push(R.wrapR||0),y.push(R.magFilter),y.push(R.minFilter),y.push(R.anisotropy),y.push(R.internalFormat),y.push(R.format),y.push(R.type),y.push(R.generateMipmaps),y.push(R.premultiplyAlpha),y.push(R.flipY),y.push(R.unpackAlignment),y.push(R.colorSpace),y.join()}function Z(R,y){const k=i.get(R);if(R.isVideoTexture&&bt(R),R.isRenderTargetTexture===!1&&R.isExternalTexture!==!0&&R.version>0&&k.__version!==R.version){const Y=R.image;if(Y===null)Le("WebGLRenderer: Texture marked for update but no image data found.");else if(Y.complete===!1)Le("WebGLRenderer: Texture marked for update but image is incomplete");else{Ce(k,R,y);return}}else R.isExternalTexture&&(k.__webglTexture=R.sourceTexture?R.sourceTexture:null);t.bindTexture(n.TEXTURE_2D,k.__webglTexture,n.TEXTURE0+y)}function J(R,y){const k=i.get(R);if(R.isRenderTargetTexture===!1&&R.version>0&&k.__version!==R.version){Ce(k,R,y);return}else R.isExternalTexture&&(k.__webglTexture=R.sourceTexture?R.sourceTexture:null);t.bindTexture(n.TEXTURE_2D_ARRAY,k.__webglTexture,n.TEXTURE0+y)}function ne(R,y){const k=i.get(R);if(R.isRenderTargetTexture===!1&&R.version>0&&k.__version!==R.version){Ce(k,R,y);return}t.bindTexture(n.TEXTURE_3D,k.__webglTexture,n.TEXTURE0+y)}function de(R,y){const k=i.get(R);if(R.isCubeDepthTexture!==!0&&R.version>0&&k.__version!==R.version){Oe(k,R,y);return}t.bindTexture(n.TEXTURE_CUBE_MAP,k.__webglTexture,n.TEXTURE0+y)}const ye={[Cu]:n.REPEAT,[Bi]:n.CLAMP_TO_EDGE,[Ru]:n.MIRRORED_REPEAT},Fe={[nn]:n.NEAREST,[bS]:n.NEAREST_MIPMAP_NEAREST,[na]:n.NEAREST_MIPMAP_LINEAR,[ln]:n.LINEAR,[gc]:n.LINEAR_MIPMAP_NEAREST,[kr]:n.LINEAR_MIPMAP_LINEAR},et={[ES]:n.NEVER,[CS]:n.ALWAYS,[MS]:n.LESS,[Yd]:n.LEQUAL,[wS]:n.EQUAL,[qd]:n.GEQUAL,[TS]:n.GREATER,[AS]:n.NOTEQUAL};function Ie(R,y){if(y.type===hi&&e.has("OES_texture_float_linear")===!1&&(y.magFilter===ln||y.magFilter===gc||y.magFilter===na||y.magFilter===kr||y.minFilter===ln||y.minFilter===gc||y.minFilter===na||y.minFilter===kr)&&Le("WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),n.texParameteri(R,n.TEXTURE_WRAP_S,ye[y.wrapS]),n.texParameteri(R,n.TEXTURE_WRAP_T,ye[y.wrapT]),(R===n.TEXTURE_3D||R===n.TEXTURE_2D_ARRAY)&&n.texParameteri(R,n.TEXTURE_WRAP_R,ye[y.wrapR]),n.texParameteri(R,n.TEXTURE_MAG_FILTER,Fe[y.magFilter]),n.texParameteri(R,n.TEXTURE_MIN_FILTER,Fe[y.minFilter]),y.compareFunction&&(n.texParameteri(R,n.TEXTURE_COMPARE_MODE,n.COMPARE_REF_TO_TEXTURE),n.texParameteri(R,n.TEXTURE_COMPARE_FUNC,et[y.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(y.magFilter===nn||y.minFilter!==na&&y.minFilter!==kr||y.type===hi&&e.has("OES_texture_float_linear")===!1)return;if(y.anisotropy>1||i.get(y).__currentAnisotropy){const k=e.get("EXT_texture_filter_anisotropic");n.texParameterf(R,k.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(y.anisotropy,r.getMaxAnisotropy())),i.get(y).__currentAnisotropy=y.anisotropy}}}function q(R,y){let k=!1;R.__webglInit===void 0&&(R.__webglInit=!0,y.addEventListener("dispose",C));const Y=y.source;let te=f.get(Y);te===void 0&&(te={},f.set(Y,te));const re=H(y);if(re!==R.__cacheKey){te[re]===void 0&&(te[re]={texture:n.createTexture(),usedTimes:0},o.memory.textures++,k=!0),te[re].usedTimes++;const ue=te[R.__cacheKey];ue!==void 0&&(te[R.__cacheKey].usedTimes--,ue.usedTimes===0&&L(y)),R.__cacheKey=re,R.__webglTexture=te[re].texture}return k}function pe(R,y,k){return Math.floor(Math.floor(R/k)/y)}function ie(R,y,k,Y){const re=R.updateRanges;if(re.length===0)t.texSubImage2D(n.TEXTURE_2D,0,0,0,y.width,y.height,k,Y,y.data);else{re.sort((Se,le)=>Se.start-le.start);let ue=0;for(let Se=1;Se<re.length;Se++){const le=re[ue],se=re[Se],Be=le.start+le.count,Ve=pe(se.start,y.width,4),it=pe(le.start,y.width,4);se.start<=Be+1&&Ve===it&&pe(se.start+se.count-1,y.width,4)===Ve?le.count=Math.max(le.count,se.start+se.count-le.start):(++ue,re[ue]=se)}re.length=ue+1;const X=t.getParameter(n.UNPACK_ROW_LENGTH),K=t.getParameter(n.UNPACK_SKIP_PIXELS),_e=t.getParameter(n.UNPACK_SKIP_ROWS);t.pixelStorei(n.UNPACK_ROW_LENGTH,y.width);for(let Se=0,le=re.length;Se<le;Se++){const se=re[Se],Be=Math.floor(se.start/4),Ve=Math.ceil(se.count/4),it=Be%y.width,D=Math.floor(Be/y.width),oe=Ve,j=1;t.pixelStorei(n.UNPACK_SKIP_PIXELS,it),t.pixelStorei(n.UNPACK_SKIP_ROWS,D),t.texSubImage2D(n.TEXTURE_2D,0,it,D,oe,j,k,Y,y.data)}R.clearUpdateRanges(),t.pixelStorei(n.UNPACK_ROW_LENGTH,X),t.pixelStorei(n.UNPACK_SKIP_PIXELS,K),t.pixelStorei(n.UNPACK_SKIP_ROWS,_e)}}function Ce(R,y,k){let Y=n.TEXTURE_2D;(y.isDataArrayTexture||y.isCompressedArrayTexture)&&(Y=n.TEXTURE_2D_ARRAY),y.isData3DTexture&&(Y=n.TEXTURE_3D);const te=q(R,y),re=y.source;t.bindTexture(Y,R.__webglTexture,n.TEXTURE0+k);const ue=i.get(re);if(re.version!==ue.__version||te===!0){if(t.activeTexture(n.TEXTURE0+k),(typeof ImageBitmap<"u"&&y.image instanceof ImageBitmap)===!1){const j=Je.getPrimaries(Je.workingColorSpace),xe=y.colorSpace===dr?null:Je.getPrimaries(y.colorSpace),ce=y.colorSpace===dr||j===xe?n.NONE:n.BROWSER_DEFAULT_WEBGL;t.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,y.flipY),t.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,y.premultiplyAlpha),t.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,ce)}t.pixelStorei(n.UNPACK_ALIGNMENT,y.unpackAlignment);let K=g(y.image,!1,r.maxTextureSize);K=he(y,K);const _e=s.convert(y.format,y.colorSpace),Se=s.convert(y.type);let le=x(y.internalFormat,_e,Se,y.normalized,y.colorSpace,y.isVideoTexture);Ie(Y,y);let se;const Be=y.mipmaps,Ve=y.isVideoTexture!==!0,it=ue.__version===void 0||te===!0,D=re.dataReady,oe=S(y,K);if(y.isDepthTexture)le=w(y.format===Br,y.type),it&&(Ve?t.texStorage2D(n.TEXTURE_2D,1,le,K.width,K.height):t.texImage2D(n.TEXTURE_2D,0,le,K.width,K.height,0,_e,Se,null));else if(y.isDataTexture)if(Be.length>0){Ve&&it&&t.texStorage2D(n.TEXTURE_2D,oe,le,Be[0].width,Be[0].height);for(let j=0,xe=Be.length;j<xe;j++)se=Be[j],Ve?D&&t.texSubImage2D(n.TEXTURE_2D,j,0,0,se.width,se.height,_e,Se,se.data):t.texImage2D(n.TEXTURE_2D,j,le,se.width,se.height,0,_e,Se,se.data);y.generateMipmaps=!1}else Ve?(it&&t.texStorage2D(n.TEXTURE_2D,oe,le,K.width,K.height),D&&ie(y,K,_e,Se)):t.texImage2D(n.TEXTURE_2D,0,le,K.width,K.height,0,_e,Se,K.data);else if(y.isCompressedTexture)if(y.isCompressedArrayTexture){Ve&&it&&t.texStorage3D(n.TEXTURE_2D_ARRAY,oe,le,Be[0].width,Be[0].height,K.depth);for(let j=0,xe=Be.length;j<xe;j++)if(se=Be[j],y.format!==Qn)if(_e!==null)if(Ve){if(D)if(y.layerUpdates.size>0){const ce=pp(se.width,se.height,y.format,y.type);for(const ee of y.layerUpdates){const Te=se.data.subarray(ee*ce/se.data.BYTES_PER_ELEMENT,(ee+1)*ce/se.data.BYTES_PER_ELEMENT);t.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,j,0,0,ee,se.width,se.height,1,_e,Te)}y.clearLayerUpdates()}else t.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,j,0,0,0,se.width,se.height,K.depth,_e,se.data)}else t.compressedTexImage3D(n.TEXTURE_2D_ARRAY,j,le,se.width,se.height,K.depth,0,se.data,0,0);else Le("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else Ve?D&&t.texSubImage3D(n.TEXTURE_2D_ARRAY,j,0,0,0,se.width,se.height,K.depth,_e,Se,se.data):t.texImage3D(n.TEXTURE_2D_ARRAY,j,le,se.width,se.height,K.depth,0,_e,Se,se.data)}else{Ve&&it&&t.texStorage2D(n.TEXTURE_2D,oe,le,Be[0].width,Be[0].height);for(let j=0,xe=Be.length;j<xe;j++)se=Be[j],y.format!==Qn?_e!==null?Ve?D&&t.compressedTexSubImage2D(n.TEXTURE_2D,j,0,0,se.width,se.height,_e,se.data):t.compressedTexImage2D(n.TEXTURE_2D,j,le,se.width,se.height,0,se.data):Le("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Ve?D&&t.texSubImage2D(n.TEXTURE_2D,j,0,0,se.width,se.height,_e,Se,se.data):t.texImage2D(n.TEXTURE_2D,j,le,se.width,se.height,0,_e,Se,se.data)}else if(y.isDataArrayTexture)if(Ve){if(it&&t.texStorage3D(n.TEXTURE_2D_ARRAY,oe,le,K.width,K.height,K.depth),D)if(y.layerUpdates.size>0){const j=pp(K.width,K.height,y.format,y.type);for(const xe of y.layerUpdates){const ce=K.data.subarray(xe*j/K.data.BYTES_PER_ELEMENT,(xe+1)*j/K.data.BYTES_PER_ELEMENT);t.texSubImage3D(n.TEXTURE_2D_ARRAY,0,0,0,xe,K.width,K.height,1,_e,Se,ce)}y.clearLayerUpdates()}else t.texSubImage3D(n.TEXTURE_2D_ARRAY,0,0,0,0,K.width,K.height,K.depth,_e,Se,K.data)}else t.texImage3D(n.TEXTURE_2D_ARRAY,0,le,K.width,K.height,K.depth,0,_e,Se,K.data);else if(y.isData3DTexture)Ve?(it&&t.texStorage3D(n.TEXTURE_3D,oe,le,K.width,K.height,K.depth),D&&t.texSubImage3D(n.TEXTURE_3D,0,0,0,0,K.width,K.height,K.depth,_e,Se,K.data)):t.texImage3D(n.TEXTURE_3D,0,le,K.width,K.height,K.depth,0,_e,Se,K.data);else if(y.isFramebufferTexture){if(it)if(Ve)t.texStorage2D(n.TEXTURE_2D,oe,le,K.width,K.height);else{let j=K.width,xe=K.height;for(let ce=0;ce<oe;ce++)t.texImage2D(n.TEXTURE_2D,ce,le,j,xe,0,_e,Se,null),j>>=1,xe>>=1}}else if(y.isHTMLTexture){if("texElementImage2D"in n){const j=n.canvas;if(j.hasAttribute("layoutsubtree")||j.setAttribute("layoutsubtree","true"),K.parentNode!==j){j.appendChild(K),d.add(y),j.onpaint=Ge=>{const Dt=Ge.changedElements;for(const ht of d)Dt.includes(ht.image)&&(ht.needsUpdate=!0)},j.requestPaint();return}const xe=0,ce=n.RGBA,ee=n.RGBA,Te=n.UNSIGNED_BYTE;n.texElementImage2D(n.TEXTURE_2D,xe,ce,ee,Te,K),n.texParameteri(n.TEXTURE_2D,n.TEXTURE_MIN_FILTER,n.LINEAR),n.texParameteri(n.TEXTURE_2D,n.TEXTURE_WRAP_S,n.CLAMP_TO_EDGE),n.texParameteri(n.TEXTURE_2D,n.TEXTURE_WRAP_T,n.CLAMP_TO_EDGE)}}else if(Be.length>0){if(Ve&&it){const j=Rt(Be[0]);t.texStorage2D(n.TEXTURE_2D,oe,le,j.width,j.height)}for(let j=0,xe=Be.length;j<xe;j++)se=Be[j],Ve?D&&t.texSubImage2D(n.TEXTURE_2D,j,0,0,_e,Se,se):t.texImage2D(n.TEXTURE_2D,j,le,_e,Se,se);y.generateMipmaps=!1}else if(Ve){if(it){const j=Rt(K);t.texStorage2D(n.TEXTURE_2D,oe,le,j.width,j.height)}D&&t.texSubImage2D(n.TEXTURE_2D,0,0,0,_e,Se,K)}else t.texImage2D(n.TEXTURE_2D,0,le,_e,Se,K);m(y)&&v(Y),ue.__version=re.version,y.onUpdate&&y.onUpdate(y)}R.__version=y.version}function Oe(R,y,k){if(y.image.length!==6)return;const Y=q(R,y),te=y.source;t.bindTexture(n.TEXTURE_CUBE_MAP,R.__webglTexture,n.TEXTURE0+k);const re=i.get(te);if(te.version!==re.__version||Y===!0){t.activeTexture(n.TEXTURE0+k);const ue=Je.getPrimaries(Je.workingColorSpace),X=y.colorSpace===dr?null:Je.getPrimaries(y.colorSpace),K=y.colorSpace===dr||ue===X?n.NONE:n.BROWSER_DEFAULT_WEBGL;t.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,y.flipY),t.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,y.premultiplyAlpha),t.pixelStorei(n.UNPACK_ALIGNMENT,y.unpackAlignment),t.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,K);const _e=y.isCompressedTexture||y.image[0].isCompressedTexture,Se=y.image[0]&&y.image[0].isDataTexture,le=[];for(let ee=0;ee<6;ee++)!_e&&!Se?le[ee]=g(y.image[ee],!0,r.maxCubemapSize):le[ee]=Se?y.image[ee].image:y.image[ee],le[ee]=he(y,le[ee]);const se=le[0],Be=s.convert(y.format,y.colorSpace),Ve=s.convert(y.type),it=x(y.internalFormat,Be,Ve,y.normalized,y.colorSpace),D=y.isVideoTexture!==!0,oe=re.__version===void 0||Y===!0,j=te.dataReady;let xe=S(y,se);Ie(n.TEXTURE_CUBE_MAP,y);let ce;if(_e){D&&oe&&t.texStorage2D(n.TEXTURE_CUBE_MAP,xe,it,se.width,se.height);for(let ee=0;ee<6;ee++){ce=le[ee].mipmaps;for(let Te=0;Te<ce.length;Te++){const Ge=ce[Te];y.format!==Qn?Be!==null?D?j&&t.compressedTexSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ee,Te,0,0,Ge.width,Ge.height,Be,Ge.data):t.compressedTexImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ee,Te,it,Ge.width,Ge.height,0,Ge.data):Le("WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):D?j&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ee,Te,0,0,Ge.width,Ge.height,Be,Ve,Ge.data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ee,Te,it,Ge.width,Ge.height,0,Be,Ve,Ge.data)}}}else{if(ce=y.mipmaps,D&&oe){ce.length>0&&xe++;const ee=Rt(le[0]);t.texStorage2D(n.TEXTURE_CUBE_MAP,xe,it,ee.width,ee.height)}for(let ee=0;ee<6;ee++)if(Se){D?j&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ee,0,0,0,le[ee].width,le[ee].height,Be,Ve,le[ee].data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ee,0,it,le[ee].width,le[ee].height,0,Be,Ve,le[ee].data);for(let Te=0;Te<ce.length;Te++){const Dt=ce[Te].image[ee].image;D?j&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ee,Te+1,0,0,Dt.width,Dt.height,Be,Ve,Dt.data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ee,Te+1,it,Dt.width,Dt.height,0,Be,Ve,Dt.data)}}else{D?j&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ee,0,0,0,Be,Ve,le[ee]):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ee,0,it,Be,Ve,le[ee]);for(let Te=0;Te<ce.length;Te++){const Ge=ce[Te];D?j&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ee,Te+1,0,0,Be,Ve,Ge.image[ee]):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ee,Te+1,it,Be,Ve,Ge.image[ee])}}}m(y)&&v(n.TEXTURE_CUBE_MAP),re.__version=te.version,y.onUpdate&&y.onUpdate(y)}R.__version=y.version}function Ne(R,y,k,Y,te,re){const ue=s.convert(k.format,k.colorSpace),X=s.convert(k.type),K=x(k.internalFormat,ue,X,k.normalized,k.colorSpace),_e=i.get(y),Se=i.get(k);if(Se.__renderTarget=y,!_e.__hasExternalTextures){const le=Math.max(1,y.width>>re),se=Math.max(1,y.height>>re);te===n.TEXTURE_3D||te===n.TEXTURE_2D_ARRAY?t.texImage3D(te,re,K,le,se,y.depth,0,ue,X,null):t.texImage2D(te,re,K,le,se,0,ue,X,null)}t.bindFramebuffer(n.FRAMEBUFFER,R),Ze(y)?a.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,Y,te,Se.__webglTexture,0,$t(y)):(te===n.TEXTURE_2D||te>=n.TEXTURE_CUBE_MAP_POSITIVE_X&&te<=n.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&n.framebufferTexture2D(n.FRAMEBUFFER,Y,te,Se.__webglTexture,re),t.bindFramebuffer(n.FRAMEBUFFER,null)}function xt(R,y,k){if(n.bindRenderbuffer(n.RENDERBUFFER,R),y.depthBuffer){const Y=y.depthTexture,te=Y&&Y.isDepthTexture?Y.type:null,re=w(y.stencilBuffer,te),ue=y.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT;Ze(y)?a.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,$t(y),re,y.width,y.height):k?n.renderbufferStorageMultisample(n.RENDERBUFFER,$t(y),re,y.width,y.height):n.renderbufferStorage(n.RENDERBUFFER,re,y.width,y.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,ue,n.RENDERBUFFER,R)}else{const Y=y.textures;for(let te=0;te<Y.length;te++){const re=Y[te],ue=s.convert(re.format,re.colorSpace),X=s.convert(re.type),K=x(re.internalFormat,ue,X,re.normalized,re.colorSpace);Ze(y)?a.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,$t(y),K,y.width,y.height):k?n.renderbufferStorageMultisample(n.RENDERBUFFER,$t(y),K,y.width,y.height):n.renderbufferStorage(n.RENDERBUFFER,K,y.width,y.height)}}n.bindRenderbuffer(n.RENDERBUFFER,null)}function Xe(R,y,k){const Y=y.isWebGLCubeRenderTarget===!0;if(t.bindFramebuffer(n.FRAMEBUFFER,R),!(y.depthTexture&&y.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");const te=i.get(y.depthTexture);if(te.__renderTarget=y,(!te.__webglTexture||y.depthTexture.image.width!==y.width||y.depthTexture.image.height!==y.height)&&(y.depthTexture.image.width=y.width,y.depthTexture.image.height=y.height,y.depthTexture.needsUpdate=!0),Y){if(te.__webglInit===void 0&&(te.__webglInit=!0,y.depthTexture.addEventListener("dispose",C)),te.__webglTexture===void 0){te.__webglTexture=n.createTexture(),t.bindTexture(n.TEXTURE_CUBE_MAP,te.__webglTexture),Ie(n.TEXTURE_CUBE_MAP,y.depthTexture);const _e=s.convert(y.depthTexture.format),Se=s.convert(y.depthTexture.type);let le;y.depthTexture.format===Xi?le=n.DEPTH_COMPONENT24:y.depthTexture.format===Br&&(le=n.DEPTH24_STENCIL8);for(let se=0;se<6;se++)n.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+se,0,le,y.width,y.height,0,_e,Se,null)}}else Z(y.depthTexture,0);const re=te.__webglTexture,ue=$t(y),X=Y?n.TEXTURE_CUBE_MAP_POSITIVE_X+k:n.TEXTURE_2D,K=y.depthTexture.format===Br?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT;if(y.depthTexture.format===Xi)Ze(y)?a.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,K,X,re,0,ue):n.framebufferTexture2D(n.FRAMEBUFFER,K,X,re,0);else if(y.depthTexture.format===Br)Ze(y)?a.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,K,X,re,0,ue):n.framebufferTexture2D(n.FRAMEBUFFER,K,X,re,0);else throw new Error("Unknown depthTexture format")}function ot(R){const y=i.get(R),k=R.isWebGLCubeRenderTarget===!0;if(y.__boundDepthTexture!==R.depthTexture){const Y=R.depthTexture;if(y.__depthDisposeCallback&&y.__depthDisposeCallback(),Y){const te=()=>{delete y.__boundDepthTexture,delete y.__depthDisposeCallback,Y.removeEventListener("dispose",te)};Y.addEventListener("dispose",te),y.__depthDisposeCallback=te}y.__boundDepthTexture=Y}if(R.depthTexture&&!y.__autoAllocateDepthBuffer)if(k)for(let Y=0;Y<6;Y++)Xe(y.__webglFramebuffer[Y],R,Y);else{const Y=R.texture.mipmaps;Y&&Y.length>0?Xe(y.__webglFramebuffer[0],R,0):Xe(y.__webglFramebuffer,R,0)}else if(k){y.__webglDepthbuffer=[];for(let Y=0;Y<6;Y++)if(t.bindFramebuffer(n.FRAMEBUFFER,y.__webglFramebuffer[Y]),y.__webglDepthbuffer[Y]===void 0)y.__webglDepthbuffer[Y]=n.createRenderbuffer(),xt(y.__webglDepthbuffer[Y],R,!1);else{const te=R.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,re=y.__webglDepthbuffer[Y];n.bindRenderbuffer(n.RENDERBUFFER,re),n.framebufferRenderbuffer(n.FRAMEBUFFER,te,n.RENDERBUFFER,re)}}else{const Y=R.texture.mipmaps;if(Y&&Y.length>0?t.bindFramebuffer(n.FRAMEBUFFER,y.__webglFramebuffer[0]):t.bindFramebuffer(n.FRAMEBUFFER,y.__webglFramebuffer),y.__webglDepthbuffer===void 0)y.__webglDepthbuffer=n.createRenderbuffer(),xt(y.__webglDepthbuffer,R,!1);else{const te=R.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,re=y.__webglDepthbuffer;n.bindRenderbuffer(n.RENDERBUFFER,re),n.framebufferRenderbuffer(n.FRAMEBUFFER,te,n.RENDERBUFFER,re)}}t.bindFramebuffer(n.FRAMEBUFFER,null)}function mt(R,y,k){const Y=i.get(R);y!==void 0&&Ne(Y.__webglFramebuffer,R,R.texture,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,0),k!==void 0&&ot(R)}function je(R){const y=R.texture,k=i.get(R),Y=i.get(y);R.addEventListener("dispose",b);const te=R.textures,re=R.isWebGLCubeRenderTarget===!0,ue=te.length>1;if(ue||(Y.__webglTexture===void 0&&(Y.__webglTexture=n.createTexture()),Y.__version=y.version,o.memory.textures++),re){k.__webglFramebuffer=[];for(let X=0;X<6;X++)if(y.mipmaps&&y.mipmaps.length>0){k.__webglFramebuffer[X]=[];for(let K=0;K<y.mipmaps.length;K++)k.__webglFramebuffer[X][K]=n.createFramebuffer()}else k.__webglFramebuffer[X]=n.createFramebuffer()}else{if(y.mipmaps&&y.mipmaps.length>0){k.__webglFramebuffer=[];for(let X=0;X<y.mipmaps.length;X++)k.__webglFramebuffer[X]=n.createFramebuffer()}else k.__webglFramebuffer=n.createFramebuffer();if(ue)for(let X=0,K=te.length;X<K;X++){const _e=i.get(te[X]);_e.__webglTexture===void 0&&(_e.__webglTexture=n.createTexture(),o.memory.textures++)}if(R.samples>0&&Ze(R)===!1){k.__webglMultisampledFramebuffer=n.createFramebuffer(),k.__webglColorRenderbuffer=[],t.bindFramebuffer(n.FRAMEBUFFER,k.__webglMultisampledFramebuffer);for(let X=0;X<te.length;X++){const K=te[X];k.__webglColorRenderbuffer[X]=n.createRenderbuffer(),n.bindRenderbuffer(n.RENDERBUFFER,k.__webglColorRenderbuffer[X]);const _e=s.convert(K.format,K.colorSpace),Se=s.convert(K.type),le=x(K.internalFormat,_e,Se,K.normalized,K.colorSpace,R.isXRRenderTarget===!0),se=$t(R);n.renderbufferStorageMultisample(n.RENDERBUFFER,se,le,R.width,R.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+X,n.RENDERBUFFER,k.__webglColorRenderbuffer[X])}n.bindRenderbuffer(n.RENDERBUFFER,null),R.depthBuffer&&(k.__webglDepthRenderbuffer=n.createRenderbuffer(),xt(k.__webglDepthRenderbuffer,R,!0)),t.bindFramebuffer(n.FRAMEBUFFER,null)}}if(re){t.bindTexture(n.TEXTURE_CUBE_MAP,Y.__webglTexture),Ie(n.TEXTURE_CUBE_MAP,y);for(let X=0;X<6;X++)if(y.mipmaps&&y.mipmaps.length>0)for(let K=0;K<y.mipmaps.length;K++)Ne(k.__webglFramebuffer[X][K],R,y,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+X,K);else Ne(k.__webglFramebuffer[X],R,y,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+X,0);m(y)&&v(n.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(ue){for(let X=0,K=te.length;X<K;X++){const _e=te[X],Se=i.get(_e);let le=n.TEXTURE_2D;(R.isWebGL3DRenderTarget||R.isWebGLArrayRenderTarget)&&(le=R.isWebGL3DRenderTarget?n.TEXTURE_3D:n.TEXTURE_2D_ARRAY),t.bindTexture(le,Se.__webglTexture),Ie(le,_e),Ne(k.__webglFramebuffer,R,_e,n.COLOR_ATTACHMENT0+X,le,0),m(_e)&&v(le)}t.unbindTexture()}else{let X=n.TEXTURE_2D;if((R.isWebGL3DRenderTarget||R.isWebGLArrayRenderTarget)&&(X=R.isWebGL3DRenderTarget?n.TEXTURE_3D:n.TEXTURE_2D_ARRAY),t.bindTexture(X,Y.__webglTexture),Ie(X,y),y.mipmaps&&y.mipmaps.length>0)for(let K=0;K<y.mipmaps.length;K++)Ne(k.__webglFramebuffer[K],R,y,n.COLOR_ATTACHMENT0,X,K);else Ne(k.__webglFramebuffer,R,y,n.COLOR_ATTACHMENT0,X,0);m(y)&&v(X),t.unbindTexture()}R.depthBuffer&&ot(R)}function Wt(R){const y=R.textures;for(let k=0,Y=y.length;k<Y;k++){const te=y[k];if(m(te)){const re=E(R),ue=i.get(te).__webglTexture;t.bindTexture(re,ue),v(re),t.unbindTexture()}}}const Mt=[],yn=[];function I(R){if(R.samples>0){if(Ze(R)===!1){const y=R.textures,k=R.width,Y=R.height;let te=n.COLOR_BUFFER_BIT;const re=R.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,ue=i.get(R),X=y.length>1;if(X)for(let _e=0;_e<y.length;_e++)t.bindFramebuffer(n.FRAMEBUFFER,ue.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+_e,n.RENDERBUFFER,null),t.bindFramebuffer(n.FRAMEBUFFER,ue.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+_e,n.TEXTURE_2D,null,0);t.bindFramebuffer(n.READ_FRAMEBUFFER,ue.__webglMultisampledFramebuffer);const K=R.texture.mipmaps;K&&K.length>0?t.bindFramebuffer(n.DRAW_FRAMEBUFFER,ue.__webglFramebuffer[0]):t.bindFramebuffer(n.DRAW_FRAMEBUFFER,ue.__webglFramebuffer);for(let _e=0;_e<y.length;_e++){if(R.resolveDepthBuffer&&(R.depthBuffer&&(te|=n.DEPTH_BUFFER_BIT),R.stencilBuffer&&R.resolveStencilBuffer&&(te|=n.STENCIL_BUFFER_BIT)),X){n.framebufferRenderbuffer(n.READ_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.RENDERBUFFER,ue.__webglColorRenderbuffer[_e]);const Se=i.get(y[_e]).__webglTexture;n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,Se,0)}n.blitFramebuffer(0,0,k,Y,0,0,k,Y,te,n.NEAREST),l===!0&&(Mt.length=0,yn.length=0,Mt.push(n.COLOR_ATTACHMENT0+_e),R.depthBuffer&&R.resolveDepthBuffer===!1&&(Mt.push(re),yn.push(re),n.invalidateFramebuffer(n.DRAW_FRAMEBUFFER,yn)),n.invalidateFramebuffer(n.READ_FRAMEBUFFER,Mt))}if(t.bindFramebuffer(n.READ_FRAMEBUFFER,null),t.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),X)for(let _e=0;_e<y.length;_e++){t.bindFramebuffer(n.FRAMEBUFFER,ue.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+_e,n.RENDERBUFFER,ue.__webglColorRenderbuffer[_e]);const Se=i.get(y[_e]).__webglTexture;t.bindFramebuffer(n.FRAMEBUFFER,ue.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+_e,n.TEXTURE_2D,Se,0)}t.bindFramebuffer(n.DRAW_FRAMEBUFFER,ue.__webglMultisampledFramebuffer)}else if(R.depthBuffer&&R.resolveDepthBuffer===!1&&l){const y=R.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT;n.invalidateFramebuffer(n.DRAW_FRAMEBUFFER,[y])}}}function $t(R){return Math.min(r.maxSamples,R.samples)}function Ze(R){const y=i.get(R);return R.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&y.__useRenderToTexture!==!1}function bt(R){const y=o.render.frame;u.get(R)!==y&&(u.set(R,y),R.update())}function he(R,y){const k=R.colorSpace,Y=R.format,te=R.type;return R.isCompressedTexture===!0||R.isVideoTexture===!0||k!==dl&&k!==dr&&(Je.getTransfer(k)===dt?(Y!==Qn||te!==Un)&&Le("WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):Qe("WebGLTextures: Unsupported texture color space:",k)),y}function Rt(R){return typeof HTMLImageElement<"u"&&R instanceof HTMLImageElement?(c.width=R.naturalWidth||R.width,c.height=R.naturalHeight||R.height):typeof VideoFrame<"u"&&R instanceof VideoFrame?(c.width=R.displayWidth,c.height=R.displayHeight):(c.width=R.width,c.height=R.height),c}this.allocateTextureUnit=B,this.resetTextureUnits=W,this.getTextureUnits=$,this.setTextureUnits=U,this.setTexture2D=Z,this.setTexture2DArray=J,this.setTexture3D=ne,this.setTextureCube=de,this.rebindTextures=mt,this.setupRenderTarget=je,this.updateRenderTargetMipmap=Wt,this.updateMultisampleRenderTarget=I,this.setupDepthRenderbuffer=ot,this.setupFrameBufferTexture=Ne,this.useMultisampledRTT=Ze,this.isReversedDepthBuffer=function(){return t.buffers.depth.getReversed()}}function l1(n,e){function t(i,r=dr){let s;const o=Je.getTransfer(r);if(i===Un)return n.UNSIGNED_BYTE;if(i===Vd)return n.UNSIGNED_SHORT_4_4_4_4;if(i===Wd)return n.UNSIGNED_SHORT_5_5_5_1;if(i===u_)return n.UNSIGNED_INT_5_9_9_9_REV;if(i===d_)return n.UNSIGNED_INT_10F_11F_11F_REV;if(i===l_)return n.BYTE;if(i===c_)return n.SHORT;if(i===Po)return n.UNSIGNED_SHORT;if(i===Hd)return n.INT;if(i===_i)return n.UNSIGNED_INT;if(i===hi)return n.FLOAT;if(i===$i)return n.HALF_FLOAT;if(i===h_)return n.ALPHA;if(i===f_)return n.RGB;if(i===Qn)return n.RGBA;if(i===Xi)return n.DEPTH_COMPONENT;if(i===Br)return n.DEPTH_STENCIL;if(i===p_)return n.RED;if(i===$d)return n.RED_INTEGER;if(i===Wr)return n.RG;if(i===Xd)return n.RG_INTEGER;if(i===jd)return n.RGBA_INTEGER;if(i===Ba||i===za||i===Ga||i===Ha)if(o===dt)if(s=e.get("WEBGL_compressed_texture_s3tc_srgb"),s!==null){if(i===Ba)return s.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(i===za)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(i===Ga)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(i===Ha)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(s=e.get("WEBGL_compressed_texture_s3tc"),s!==null){if(i===Ba)return s.COMPRESSED_RGB_S3TC_DXT1_EXT;if(i===za)return s.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(i===Ga)return s.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(i===Ha)return s.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(i===Pu||i===Lu||i===Du||i===Nu)if(s=e.get("WEBGL_compressed_texture_pvrtc"),s!==null){if(i===Pu)return s.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(i===Lu)return s.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(i===Du)return s.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(i===Nu)return s.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(i===Iu||i===Uu||i===Fu||i===Ou||i===ku||i===cl||i===Bu)if(s=e.get("WEBGL_compressed_texture_etc"),s!==null){if(i===Iu||i===Uu)return o===dt?s.COMPRESSED_SRGB8_ETC2:s.COMPRESSED_RGB8_ETC2;if(i===Fu)return o===dt?s.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:s.COMPRESSED_RGBA8_ETC2_EAC;if(i===Ou)return s.COMPRESSED_R11_EAC;if(i===ku)return s.COMPRESSED_SIGNED_R11_EAC;if(i===cl)return s.COMPRESSED_RG11_EAC;if(i===Bu)return s.COMPRESSED_SIGNED_RG11_EAC}else return null;if(i===zu||i===Gu||i===Hu||i===Vu||i===Wu||i===$u||i===Xu||i===ju||i===Yu||i===qu||i===Ku||i===Zu||i===Ju||i===Qu)if(s=e.get("WEBGL_compressed_texture_astc"),s!==null){if(i===zu)return o===dt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:s.COMPRESSED_RGBA_ASTC_4x4_KHR;if(i===Gu)return o===dt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:s.COMPRESSED_RGBA_ASTC_5x4_KHR;if(i===Hu)return o===dt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:s.COMPRESSED_RGBA_ASTC_5x5_KHR;if(i===Vu)return o===dt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:s.COMPRESSED_RGBA_ASTC_6x5_KHR;if(i===Wu)return o===dt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:s.COMPRESSED_RGBA_ASTC_6x6_KHR;if(i===$u)return o===dt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:s.COMPRESSED_RGBA_ASTC_8x5_KHR;if(i===Xu)return o===dt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:s.COMPRESSED_RGBA_ASTC_8x6_KHR;if(i===ju)return o===dt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:s.COMPRESSED_RGBA_ASTC_8x8_KHR;if(i===Yu)return o===dt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:s.COMPRESSED_RGBA_ASTC_10x5_KHR;if(i===qu)return o===dt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:s.COMPRESSED_RGBA_ASTC_10x6_KHR;if(i===Ku)return o===dt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:s.COMPRESSED_RGBA_ASTC_10x8_KHR;if(i===Zu)return o===dt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:s.COMPRESSED_RGBA_ASTC_10x10_KHR;if(i===Ju)return o===dt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:s.COMPRESSED_RGBA_ASTC_12x10_KHR;if(i===Qu)return o===dt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:s.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(i===ed||i===td||i===nd)if(s=e.get("EXT_texture_compression_bptc"),s!==null){if(i===ed)return o===dt?s.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:s.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(i===td)return s.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(i===nd)return s.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(i===id||i===rd||i===ul||i===sd)if(s=e.get("EXT_texture_compression_rgtc"),s!==null){if(i===id)return s.COMPRESSED_RED_RGTC1_EXT;if(i===rd)return s.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(i===ul)return s.COMPRESSED_RED_GREEN_RGTC2_EXT;if(i===sd)return s.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return i===Lo?n.UNSIGNED_INT_24_8:n[i]!==void 0?n[i]:null}return{convert:t}}const c1=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,u1=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`;class d1{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t){if(this.texture===null){const i=new E_(e.texture);(e.depthNear!==t.depthNear||e.depthFar!==t.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=i}}getMesh(e){if(this.texture!==null&&this.mesh===null){const t=e.cameras[0].viewport,i=new xi({vertexShader:c1,fragmentShader:u1,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new vi(new Gl(20,20),i)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class h1 extends wr{constructor(e,t){super();const i=this;let r=null,s=1,o=null,a="local-floor",l=1,c=null,u=null,d=null,h=null,f=null,p=null;const _=typeof XRWebGLBinding<"u",g=new d1,m={},v=t.getContextAttributes();let E=null,x=null;const w=[],S=[],C=new We;let b=null;const T=new Nn;T.viewport=new Bt;const L=new Nn;L.viewport=new Bt;const P=[T,L],F=new xE;let W=null,$=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(q){let pe=w[q];return pe===void 0&&(pe=new Ec,w[q]=pe),pe.getTargetRaySpace()},this.getControllerGrip=function(q){let pe=w[q];return pe===void 0&&(pe=new Ec,w[q]=pe),pe.getGripSpace()},this.getHand=function(q){let pe=w[q];return pe===void 0&&(pe=new Ec,w[q]=pe),pe.getHandSpace()};function U(q){const pe=S.indexOf(q.inputSource);if(pe===-1)return;const ie=w[pe];ie!==void 0&&(ie.update(q.inputSource,q.frame,c||o),ie.dispatchEvent({type:q.type,data:q.inputSource}))}function B(){r.removeEventListener("select",U),r.removeEventListener("selectstart",U),r.removeEventListener("selectend",U),r.removeEventListener("squeeze",U),r.removeEventListener("squeezestart",U),r.removeEventListener("squeezeend",U),r.removeEventListener("end",B),r.removeEventListener("inputsourceschange",H);for(let q=0;q<w.length;q++){const pe=S[q];pe!==null&&(S[q]=null,w[q].disconnect(pe))}W=null,$=null,g.reset();for(const q in m)delete m[q];e.setRenderTarget(E),f=null,h=null,d=null,r=null,x=null,Ie.stop(),i.isPresenting=!1,e.setPixelRatio(b),e.setSize(C.width,C.height,!1),i.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(q){s=q,i.isPresenting===!0&&Le("WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(q){a=q,i.isPresenting===!0&&Le("WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||o},this.setReferenceSpace=function(q){c=q},this.getBaseLayer=function(){return h!==null?h:f},this.getBinding=function(){return d===null&&_&&(d=new XRWebGLBinding(r,t)),d},this.getFrame=function(){return p},this.getSession=function(){return r},this.setSession=async function(q){if(r=q,r!==null){if(E=e.getRenderTarget(),r.addEventListener("select",U),r.addEventListener("selectstart",U),r.addEventListener("selectend",U),r.addEventListener("squeeze",U),r.addEventListener("squeezestart",U),r.addEventListener("squeezeend",U),r.addEventListener("end",B),r.addEventListener("inputsourceschange",H),v.xrCompatible!==!0&&await t.makeXRCompatible(),b=e.getPixelRatio(),e.getSize(C),_&&"createProjectionLayer"in XRWebGLBinding.prototype){let ie=null,Ce=null,Oe=null;v.depth&&(Oe=v.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,ie=v.stencil?Br:Xi,Ce=v.stencil?Lo:_i);const Ne={colorFormat:t.RGBA8,depthFormat:Oe,scaleFactor:s};d=this.getBinding(),h=d.createProjectionLayer(Ne),r.updateRenderState({layers:[h]}),e.setPixelRatio(1),e.setSize(h.textureWidth,h.textureHeight,!1),x=new mi(h.textureWidth,h.textureHeight,{format:Qn,type:Un,depthTexture:new Us(h.textureWidth,h.textureHeight,Ce,void 0,void 0,void 0,void 0,void 0,void 0,ie),stencilBuffer:v.stencil,colorSpace:e.outputColorSpace,samples:v.antialias?4:0,resolveDepthBuffer:h.ignoreDepthValues===!1,resolveStencilBuffer:h.ignoreDepthValues===!1})}else{const ie={antialias:v.antialias,alpha:!0,depth:v.depth,stencil:v.stencil,framebufferScaleFactor:s};f=new XRWebGLLayer(r,t,ie),r.updateRenderState({baseLayer:f}),e.setPixelRatio(1),e.setSize(f.framebufferWidth,f.framebufferHeight,!1),x=new mi(f.framebufferWidth,f.framebufferHeight,{format:Qn,type:Un,colorSpace:e.outputColorSpace,stencilBuffer:v.stencil,resolveDepthBuffer:f.ignoreDepthValues===!1,resolveStencilBuffer:f.ignoreDepthValues===!1})}x.isXRRenderTarget=!0,this.setFoveation(l),c=null,o=await r.requestReferenceSpace(a),Ie.setContext(r),Ie.start(),i.isPresenting=!0,i.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(r!==null)return r.environmentBlendMode},this.getDepthTexture=function(){return g.getDepthTexture()};function H(q){for(let pe=0;pe<q.removed.length;pe++){const ie=q.removed[pe],Ce=S.indexOf(ie);Ce>=0&&(S[Ce]=null,w[Ce].disconnect(ie))}for(let pe=0;pe<q.added.length;pe++){const ie=q.added[pe];let Ce=S.indexOf(ie);if(Ce===-1){for(let Ne=0;Ne<w.length;Ne++)if(Ne>=S.length){S.push(ie),Ce=Ne;break}else if(S[Ne]===null){S[Ne]=ie,Ce=Ne;break}if(Ce===-1)break}const Oe=w[Ce];Oe&&Oe.connect(ie)}}const Z=new N,J=new N;function ne(q,pe,ie){Z.setFromMatrixPosition(pe.matrixWorld),J.setFromMatrixPosition(ie.matrixWorld);const Ce=Z.distanceTo(J),Oe=pe.projectionMatrix.elements,Ne=ie.projectionMatrix.elements,xt=Oe[14]/(Oe[10]-1),Xe=Oe[14]/(Oe[10]+1),ot=(Oe[9]+1)/Oe[5],mt=(Oe[9]-1)/Oe[5],je=(Oe[8]-1)/Oe[0],Wt=(Ne[8]+1)/Ne[0],Mt=xt*je,yn=xt*Wt,I=Ce/(-je+Wt),$t=I*-je;if(pe.matrixWorld.decompose(q.position,q.quaternion,q.scale),q.translateX($t),q.translateZ(I),q.matrixWorld.compose(q.position,q.quaternion,q.scale),q.matrixWorldInverse.copy(q.matrixWorld).invert(),Oe[10]===-1)q.projectionMatrix.copy(pe.projectionMatrix),q.projectionMatrixInverse.copy(pe.projectionMatrixInverse);else{const Ze=xt+I,bt=Xe+I,he=Mt-$t,Rt=yn+(Ce-$t),R=ot*Xe/bt*Ze,y=mt*Xe/bt*Ze;q.projectionMatrix.makePerspective(he,Rt,R,y,Ze,bt),q.projectionMatrixInverse.copy(q.projectionMatrix).invert()}}function de(q,pe){pe===null?q.matrixWorld.copy(q.matrix):q.matrixWorld.multiplyMatrices(pe.matrixWorld,q.matrix),q.matrixWorldInverse.copy(q.matrixWorld).invert()}this.updateCamera=function(q){if(r===null)return;let pe=q.near,ie=q.far;g.texture!==null&&(g.depthNear>0&&(pe=g.depthNear),g.depthFar>0&&(ie=g.depthFar)),F.near=L.near=T.near=pe,F.far=L.far=T.far=ie,(W!==F.near||$!==F.far)&&(r.updateRenderState({depthNear:F.near,depthFar:F.far}),W=F.near,$=F.far),F.layers.mask=q.layers.mask|6,T.layers.mask=F.layers.mask&-5,L.layers.mask=F.layers.mask&-3;const Ce=q.parent,Oe=F.cameras;de(F,Ce);for(let Ne=0;Ne<Oe.length;Ne++)de(Oe[Ne],Ce);Oe.length===2?ne(F,T,L):F.projectionMatrix.copy(T.projectionMatrix),ye(q,F,Ce)};function ye(q,pe,ie){ie===null?q.matrix.copy(pe.matrixWorld):(q.matrix.copy(ie.matrixWorld),q.matrix.invert(),q.matrix.multiply(pe.matrixWorld)),q.matrix.decompose(q.position,q.quaternion,q.scale),q.updateMatrixWorld(!0),q.projectionMatrix.copy(pe.projectionMatrix),q.projectionMatrixInverse.copy(pe.projectionMatrixInverse),q.isPerspectiveCamera&&(q.fov=ad*2*Math.atan(1/q.projectionMatrix.elements[5]),q.zoom=1)}this.getCamera=function(){return F},this.getFoveation=function(){if(!(h===null&&f===null))return l},this.setFoveation=function(q){l=q,h!==null&&(h.fixedFoveation=q),f!==null&&f.fixedFoveation!==void 0&&(f.fixedFoveation=q)},this.hasDepthSensing=function(){return g.texture!==null},this.getDepthSensingMesh=function(){return g.getMesh(F)},this.getCameraTexture=function(q){return m[q]};let Fe=null;function et(q,pe){if(u=pe.getViewerPose(c||o),p=pe,u!==null){const ie=u.views;f!==null&&(e.setRenderTargetFramebuffer(x,f.framebuffer),e.setRenderTarget(x));let Ce=!1;ie.length!==F.cameras.length&&(F.cameras.length=0,Ce=!0);for(let Xe=0;Xe<ie.length;Xe++){const ot=ie[Xe];let mt=null;if(f!==null)mt=f.getViewport(ot);else{const Wt=d.getViewSubImage(h,ot);mt=Wt.viewport,Xe===0&&(e.setRenderTargetTextures(x,Wt.colorTexture,Wt.depthStencilTexture),e.setRenderTarget(x))}let je=P[Xe];je===void 0&&(je=new Nn,je.layers.enable(Xe),je.viewport=new Bt,P[Xe]=je),je.matrix.fromArray(ot.transform.matrix),je.matrix.decompose(je.position,je.quaternion,je.scale),je.projectionMatrix.fromArray(ot.projectionMatrix),je.projectionMatrixInverse.copy(je.projectionMatrix).invert(),je.viewport.set(mt.x,mt.y,mt.width,mt.height),Xe===0&&(F.matrix.copy(je.matrix),F.matrix.decompose(F.position,F.quaternion,F.scale)),Ce===!0&&F.cameras.push(je)}const Oe=r.enabledFeatures;if(Oe&&Oe.includes("depth-sensing")&&r.depthUsage=="gpu-optimized"&&_){d=i.getBinding();const Xe=d.getDepthInformation(ie[0]);Xe&&Xe.isValid&&Xe.texture&&g.init(Xe,r.renderState)}if(Oe&&Oe.includes("camera-access")&&_){e.state.unbindTexture(),d=i.getBinding();for(let Xe=0;Xe<ie.length;Xe++){const ot=ie[Xe].camera;if(ot){let mt=m[ot];mt||(mt=new E_,m[ot]=mt);const je=d.getCameraImage(ot);mt.sourceTexture=je}}}}for(let ie=0;ie<w.length;ie++){const Ce=S[ie],Oe=w[ie];Ce!==null&&Oe!==void 0&&Oe.update(Ce,pe,c||o)}Fe&&Fe(q,pe),pe.detectedPlanes&&i.dispatchEvent({type:"planesdetected",data:pe}),p=null}const Ie=new C_;Ie.setAnimationLoop(et),this.setAnimationLoop=function(q){Fe=q},this.dispose=function(){}}}const f1=new Ct,U_=new ze;U_.set(-1,0,0,0,1,0,0,0,1);function p1(n,e){function t(g,m){g.matrixAutoUpdate===!0&&g.updateMatrix(),m.value.copy(g.matrix)}function i(g,m){m.color.getRGB(g.fogColor.value,w_(n)),m.isFog?(g.fogNear.value=m.near,g.fogFar.value=m.far):m.isFogExp2&&(g.fogDensity.value=m.density)}function r(g,m,v,E,x){m.isNodeMaterial?m.uniformsNeedUpdate=!1:m.isMeshBasicMaterial?s(g,m):m.isMeshLambertMaterial?(s(g,m),m.envMap&&(g.envMapIntensity.value=m.envMapIntensity)):m.isMeshToonMaterial?(s(g,m),d(g,m)):m.isMeshPhongMaterial?(s(g,m),u(g,m),m.envMap&&(g.envMapIntensity.value=m.envMapIntensity)):m.isMeshStandardMaterial?(s(g,m),h(g,m),m.isMeshPhysicalMaterial&&f(g,m,x)):m.isMeshMatcapMaterial?(s(g,m),p(g,m)):m.isMeshDepthMaterial?s(g,m):m.isMeshDistanceMaterial?(s(g,m),_(g,m)):m.isMeshNormalMaterial?s(g,m):m.isLineBasicMaterial?(o(g,m),m.isLineDashedMaterial&&a(g,m)):m.isPointsMaterial?l(g,m,v,E):m.isSpriteMaterial?c(g,m):m.isShadowMaterial?(g.color.value.copy(m.color),g.opacity.value=m.opacity):m.isShaderMaterial&&(m.uniformsNeedUpdate=!1)}function s(g,m){g.opacity.value=m.opacity,m.color&&g.diffuse.value.copy(m.color),m.emissive&&g.emissive.value.copy(m.emissive).multiplyScalar(m.emissiveIntensity),m.map&&(g.map.value=m.map,t(m.map,g.mapTransform)),m.alphaMap&&(g.alphaMap.value=m.alphaMap,t(m.alphaMap,g.alphaMapTransform)),m.bumpMap&&(g.bumpMap.value=m.bumpMap,t(m.bumpMap,g.bumpMapTransform),g.bumpScale.value=m.bumpScale,m.side===bn&&(g.bumpScale.value*=-1)),m.normalMap&&(g.normalMap.value=m.normalMap,t(m.normalMap,g.normalMapTransform),g.normalScale.value.copy(m.normalScale),m.side===bn&&g.normalScale.value.negate()),m.displacementMap&&(g.displacementMap.value=m.displacementMap,t(m.displacementMap,g.displacementMapTransform),g.displacementScale.value=m.displacementScale,g.displacementBias.value=m.displacementBias),m.emissiveMap&&(g.emissiveMap.value=m.emissiveMap,t(m.emissiveMap,g.emissiveMapTransform)),m.specularMap&&(g.specularMap.value=m.specularMap,t(m.specularMap,g.specularMapTransform)),m.alphaTest>0&&(g.alphaTest.value=m.alphaTest);const v=e.get(m),E=v.envMap,x=v.envMapRotation;E&&(g.envMap.value=E,g.envMapRotation.value.setFromMatrix4(f1.makeRotationFromEuler(x)).transpose(),E.isCubeTexture&&E.isRenderTargetTexture===!1&&g.envMapRotation.value.premultiply(U_),g.reflectivity.value=m.reflectivity,g.ior.value=m.ior,g.refractionRatio.value=m.refractionRatio),m.lightMap&&(g.lightMap.value=m.lightMap,g.lightMapIntensity.value=m.lightMapIntensity,t(m.lightMap,g.lightMapTransform)),m.aoMap&&(g.aoMap.value=m.aoMap,g.aoMapIntensity.value=m.aoMapIntensity,t(m.aoMap,g.aoMapTransform))}function o(g,m){g.diffuse.value.copy(m.color),g.opacity.value=m.opacity,m.map&&(g.map.value=m.map,t(m.map,g.mapTransform))}function a(g,m){g.dashSize.value=m.dashSize,g.totalSize.value=m.dashSize+m.gapSize,g.scale.value=m.scale}function l(g,m,v,E){g.diffuse.value.copy(m.color),g.opacity.value=m.opacity,g.size.value=m.size*v,g.scale.value=E*.5,m.map&&(g.map.value=m.map,t(m.map,g.uvTransform)),m.alphaMap&&(g.alphaMap.value=m.alphaMap,t(m.alphaMap,g.alphaMapTransform)),m.alphaTest>0&&(g.alphaTest.value=m.alphaTest)}function c(g,m){g.diffuse.value.copy(m.color),g.opacity.value=m.opacity,g.rotation.value=m.rotation,m.map&&(g.map.value=m.map,t(m.map,g.mapTransform)),m.alphaMap&&(g.alphaMap.value=m.alphaMap,t(m.alphaMap,g.alphaMapTransform)),m.alphaTest>0&&(g.alphaTest.value=m.alphaTest)}function u(g,m){g.specular.value.copy(m.specular),g.shininess.value=Math.max(m.shininess,1e-4)}function d(g,m){m.gradientMap&&(g.gradientMap.value=m.gradientMap)}function h(g,m){g.metalness.value=m.metalness,m.metalnessMap&&(g.metalnessMap.value=m.metalnessMap,t(m.metalnessMap,g.metalnessMapTransform)),g.roughness.value=m.roughness,m.roughnessMap&&(g.roughnessMap.value=m.roughnessMap,t(m.roughnessMap,g.roughnessMapTransform)),m.envMap&&(g.envMapIntensity.value=m.envMapIntensity)}function f(g,m,v){g.ior.value=m.ior,m.sheen>0&&(g.sheenColor.value.copy(m.sheenColor).multiplyScalar(m.sheen),g.sheenRoughness.value=m.sheenRoughness,m.sheenColorMap&&(g.sheenColorMap.value=m.sheenColorMap,t(m.sheenColorMap,g.sheenColorMapTransform)),m.sheenRoughnessMap&&(g.sheenRoughnessMap.value=m.sheenRoughnessMap,t(m.sheenRoughnessMap,g.sheenRoughnessMapTransform))),m.clearcoat>0&&(g.clearcoat.value=m.clearcoat,g.clearcoatRoughness.value=m.clearcoatRoughness,m.clearcoatMap&&(g.clearcoatMap.value=m.clearcoatMap,t(m.clearcoatMap,g.clearcoatMapTransform)),m.clearcoatRoughnessMap&&(g.clearcoatRoughnessMap.value=m.clearcoatRoughnessMap,t(m.clearcoatRoughnessMap,g.clearcoatRoughnessMapTransform)),m.clearcoatNormalMap&&(g.clearcoatNormalMap.value=m.clearcoatNormalMap,t(m.clearcoatNormalMap,g.clearcoatNormalMapTransform),g.clearcoatNormalScale.value.copy(m.clearcoatNormalScale),m.side===bn&&g.clearcoatNormalScale.value.negate())),m.dispersion>0&&(g.dispersion.value=m.dispersion),m.iridescence>0&&(g.iridescence.value=m.iridescence,g.iridescenceIOR.value=m.iridescenceIOR,g.iridescenceThicknessMinimum.value=m.iridescenceThicknessRange[0],g.iridescenceThicknessMaximum.value=m.iridescenceThicknessRange[1],m.iridescenceMap&&(g.iridescenceMap.value=m.iridescenceMap,t(m.iridescenceMap,g.iridescenceMapTransform)),m.iridescenceThicknessMap&&(g.iridescenceThicknessMap.value=m.iridescenceThicknessMap,t(m.iridescenceThicknessMap,g.iridescenceThicknessMapTransform))),m.transmission>0&&(g.transmission.value=m.transmission,g.transmissionSamplerMap.value=v.texture,g.transmissionSamplerSize.value.set(v.width,v.height),m.transmissionMap&&(g.transmissionMap.value=m.transmissionMap,t(m.transmissionMap,g.transmissionMapTransform)),g.thickness.value=m.thickness,m.thicknessMap&&(g.thicknessMap.value=m.thicknessMap,t(m.thicknessMap,g.thicknessMapTransform)),g.attenuationDistance.value=m.attenuationDistance,g.attenuationColor.value.copy(m.attenuationColor)),m.anisotropy>0&&(g.anisotropyVector.value.set(m.anisotropy*Math.cos(m.anisotropyRotation),m.anisotropy*Math.sin(m.anisotropyRotation)),m.anisotropyMap&&(g.anisotropyMap.value=m.anisotropyMap,t(m.anisotropyMap,g.anisotropyMapTransform))),g.specularIntensity.value=m.specularIntensity,g.specularColor.value.copy(m.specularColor),m.specularColorMap&&(g.specularColorMap.value=m.specularColorMap,t(m.specularColorMap,g.specularColorMapTransform)),m.specularIntensityMap&&(g.specularIntensityMap.value=m.specularIntensityMap,t(m.specularIntensityMap,g.specularIntensityMapTransform))}function p(g,m){m.matcap&&(g.matcap.value=m.matcap)}function _(g,m){const v=e.get(m).light;g.referencePosition.value.setFromMatrixPosition(v.matrixWorld),g.nearDistance.value=v.shadow.camera.near,g.farDistance.value=v.shadow.camera.far}return{refreshFogUniforms:i,refreshMaterialUniforms:r}}function m1(n,e,t,i){let r={},s={},o=[];const a=n.getParameter(n.MAX_UNIFORM_BUFFER_BINDINGS);function l(v,E){const x=E.program;i.uniformBlockBinding(v,x)}function c(v,E){let x=r[v.id];x===void 0&&(p(v),x=u(v),r[v.id]=x,v.addEventListener("dispose",g));const w=E.program;i.updateUBOMapping(v,w);const S=e.render.frame;s[v.id]!==S&&(h(v),s[v.id]=S)}function u(v){const E=d();v.__bindingPointIndex=E;const x=n.createBuffer(),w=v.__size,S=v.usage;return n.bindBuffer(n.UNIFORM_BUFFER,x),n.bufferData(n.UNIFORM_BUFFER,w,S),n.bindBuffer(n.UNIFORM_BUFFER,null),n.bindBufferBase(n.UNIFORM_BUFFER,E,x),x}function d(){for(let v=0;v<a;v++)if(o.indexOf(v)===-1)return o.push(v),v;return Qe("WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function h(v){const E=r[v.id],x=v.uniforms,w=v.__cache;n.bindBuffer(n.UNIFORM_BUFFER,E);for(let S=0,C=x.length;S<C;S++){const b=Array.isArray(x[S])?x[S]:[x[S]];for(let T=0,L=b.length;T<L;T++){const P=b[T];if(f(P,S,T,w)===!0){const F=P.__offset,W=Array.isArray(P.value)?P.value:[P.value];let $=0;for(let U=0;U<W.length;U++){const B=W[U],H=_(B);typeof B=="number"||typeof B=="boolean"?(P.__data[0]=B,n.bufferSubData(n.UNIFORM_BUFFER,F+$,P.__data)):B.isMatrix3?(P.__data[0]=B.elements[0],P.__data[1]=B.elements[1],P.__data[2]=B.elements[2],P.__data[3]=0,P.__data[4]=B.elements[3],P.__data[5]=B.elements[4],P.__data[6]=B.elements[5],P.__data[7]=0,P.__data[8]=B.elements[6],P.__data[9]=B.elements[7],P.__data[10]=B.elements[8],P.__data[11]=0):ArrayBuffer.isView(B)?P.__data.set(new B.constructor(B.buffer,B.byteOffset,P.__data.length)):(B.toArray(P.__data,$),$+=H.storage/Float32Array.BYTES_PER_ELEMENT)}n.bufferSubData(n.UNIFORM_BUFFER,F,P.__data)}}}n.bindBuffer(n.UNIFORM_BUFFER,null)}function f(v,E,x,w){const S=v.value,C=E+"_"+x;if(w[C]===void 0)return typeof S=="number"||typeof S=="boolean"?w[C]=S:ArrayBuffer.isView(S)?w[C]=S.slice():w[C]=S.clone(),!0;{const b=w[C];if(typeof S=="number"||typeof S=="boolean"){if(b!==S)return w[C]=S,!0}else{if(ArrayBuffer.isView(S))return!0;if(b.equals(S)===!1)return b.copy(S),!0}}return!1}function p(v){const E=v.uniforms;let x=0;const w=16;for(let C=0,b=E.length;C<b;C++){const T=Array.isArray(E[C])?E[C]:[E[C]];for(let L=0,P=T.length;L<P;L++){const F=T[L],W=Array.isArray(F.value)?F.value:[F.value];for(let $=0,U=W.length;$<U;$++){const B=W[$],H=_(B),Z=x%w,J=Z%H.boundary,ne=Z+J;x+=J,ne!==0&&w-ne<H.storage&&(x+=w-ne),F.__data=new Float32Array(H.storage/Float32Array.BYTES_PER_ELEMENT),F.__offset=x,x+=H.storage}}}const S=x%w;return S>0&&(x+=w-S),v.__size=x,v.__cache={},this}function _(v){const E={boundary:0,storage:0};return typeof v=="number"||typeof v=="boolean"?(E.boundary=4,E.storage=4):v.isVector2?(E.boundary=8,E.storage=8):v.isVector3||v.isColor?(E.boundary=16,E.storage=12):v.isVector4?(E.boundary=16,E.storage=16):v.isMatrix3?(E.boundary=48,E.storage=48):v.isMatrix4?(E.boundary=64,E.storage=64):v.isTexture?Le("WebGLRenderer: Texture samplers can not be part of an uniforms group."):ArrayBuffer.isView(v)?(E.boundary=16,E.storage=v.byteLength):Le("WebGLRenderer: Unsupported uniform value type.",v),E}function g(v){const E=v.target;E.removeEventListener("dispose",g);const x=o.indexOf(E.__bindingPointIndex);o.splice(x,1),n.deleteBuffer(r[E.id]),delete r[E.id],delete s[E.id]}function m(){for(const v in r)n.deleteBuffer(r[v]);o=[],r={},s={}}return{bind:l,update:c,dispose:m}}const g1=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]);let ai=null;function _1(){return ai===null&&(ai=new eE(g1,16,16,Wr,$i),ai.name="DFG_LUT",ai.minFilter=ln,ai.magFilter=ln,ai.wrapS=Bi,ai.wrapT=Bi,ai.generateMipmaps=!1,ai.needsUpdate=!0),ai}class v1{constructor(e={}){const{canvas:t=PS(),context:i=null,depth:r=!0,stencil:s=!1,alpha:o=!1,antialias:a=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:u="default",failIfMajorPerformanceCaveat:d=!1,reversedDepthBuffer:h=!1,outputBufferType:f=Un}=e;this.isWebGLRenderer=!0;let p;if(i!==null){if(typeof WebGLRenderingContext<"u"&&i instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");p=i.getContextAttributes().alpha}else p=o;const _=f,g=new Set([jd,Xd,$d]),m=new Set([Un,_i,Po,Lo,Vd,Wd]),v=new Uint32Array(4),E=new Int32Array(4),x=new N;let w=null,S=null;const C=[],b=[];let T=null;this.domElement=t,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=pi,this.toneMappingExposure=1,this.transmissionResolutionScale=1;const L=this;let P=!1,F=null;this._outputColorSpace=Dn;let W=0,$=0,U=null,B=-1,H=null;const Z=new Bt,J=new Bt;let ne=null;const de=new nt(0);let ye=0,Fe=t.width,et=t.height,Ie=1,q=null,pe=null;const ie=new Bt(0,0,Fe,et),Ce=new Bt(0,0,Fe,et);let Oe=!1;const Ne=new b_;let xt=!1,Xe=!1;const ot=new Ct,mt=new N,je=new Bt,Wt={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let Mt=!1;function yn(){return U===null?Ie:1}let I=i;function $t(M,O){return t.getContext(M,O)}try{const M={alpha:!0,depth:r,stencil:s,antialias:a,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:u,failIfMajorPerformanceCaveat:d};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${Gd}`),t.addEventListener("webglcontextlost",ee,!1),t.addEventListener("webglcontextrestored",Te,!1),t.addEventListener("webglcontextcreationerror",Ge,!1),I===null){const O="webgl2";if(I=$t(O,M),I===null)throw $t(O)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(M){throw Qe("WebGLRenderer: "+M.message),M}let Ze,bt,he,Rt,R,y,k,Y,te,re,ue,X,K,_e,Se,le,se,Be,Ve,it,D,oe,j;function xe(){Ze=new _T(I),Ze.init(),D=new l1(I,Ze),bt=new cT(I,Ze,e,D),he=new o1(I,Ze),bt.reversedDepthBuffer&&h&&he.buffers.depth.setReversed(!0),Rt=new bT(I),R=new XA,y=new a1(I,Ze,he,R,bt,D,Rt),k=new gT(L),Y=new ME(I),oe=new aT(I,Y),te=new vT(I,Y,Rt,oe),re=new ST(I,te,Y,oe,Rt),Be=new yT(I,bt,y),Se=new uT(R),ue=new $A(L,k,Ze,bt,oe,Se),X=new p1(L,R),K=new YA,_e=new e1(Ze),se=new oT(L,k,he,re,p,l),le=new s1(L,re,bt),j=new m1(I,Rt,bt,he),Ve=new lT(I,Ze,Rt),it=new xT(I,Ze,Rt),Rt.programs=ue.programs,L.capabilities=bt,L.extensions=Ze,L.properties=R,L.renderLists=K,L.shadowMap=le,L.state=he,L.info=Rt}xe(),_!==Un&&(T=new MT(_,t.width,t.height,r,s));const ce=new h1(L,I);this.xr=ce,this.getContext=function(){return I},this.getContextAttributes=function(){return I.getContextAttributes()},this.forceContextLoss=function(){const M=Ze.get("WEBGL_lose_context");M&&M.loseContext()},this.forceContextRestore=function(){const M=Ze.get("WEBGL_lose_context");M&&M.restoreContext()},this.getPixelRatio=function(){return Ie},this.setPixelRatio=function(M){M!==void 0&&(Ie=M,this.setSize(Fe,et,!1))},this.getSize=function(M){return M.set(Fe,et)},this.setSize=function(M,O,V=!0){if(ce.isPresenting){Le("WebGLRenderer: Can't change size while VR device is presenting.");return}Fe=M,et=O,t.width=Math.floor(M*Ie),t.height=Math.floor(O*Ie),V===!0&&(t.style.width=M+"px",t.style.height=O+"px"),T!==null&&T.setSize(t.width,t.height),this.setViewport(0,0,M,O)},this.getDrawingBufferSize=function(M){return M.set(Fe*Ie,et*Ie).floor()},this.setDrawingBufferSize=function(M,O,V){Fe=M,et=O,Ie=V,t.width=Math.floor(M*V),t.height=Math.floor(O*V),this.setViewport(0,0,M,O)},this.setEffects=function(M){if(_===Un){Qe("THREE.WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.");return}if(M){for(let O=0;O<M.length;O++)if(M[O].isOutputPass===!0){Le("THREE.WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.");break}}T.setEffects(M||[])},this.getCurrentViewport=function(M){return M.copy(Z)},this.getViewport=function(M){return M.copy(ie)},this.setViewport=function(M,O,V,z){M.isVector4?ie.set(M.x,M.y,M.z,M.w):ie.set(M,O,V,z),he.viewport(Z.copy(ie).multiplyScalar(Ie).round())},this.getScissor=function(M){return M.copy(Ce)},this.setScissor=function(M,O,V,z){M.isVector4?Ce.set(M.x,M.y,M.z,M.w):Ce.set(M,O,V,z),he.scissor(J.copy(Ce).multiplyScalar(Ie).round())},this.getScissorTest=function(){return Oe},this.setScissorTest=function(M){he.setScissorTest(Oe=M)},this.setOpaqueSort=function(M){q=M},this.setTransparentSort=function(M){pe=M},this.getClearColor=function(M){return M.copy(se.getClearColor())},this.setClearColor=function(){se.setClearColor(...arguments)},this.getClearAlpha=function(){return se.getClearAlpha()},this.setClearAlpha=function(){se.setClearAlpha(...arguments)},this.clear=function(M=!0,O=!0,V=!0){let z=0;if(M){let G=!1;if(U!==null){const ge=U.texture.format;G=g.has(ge)}if(G){const ge=U.texture.type,Ee=m.has(ge),me=se.getClearColor(),we=se.getClearAlpha(),Ae=me.r,He=me.g,Ye=me.b;Ee?(v[0]=Ae,v[1]=He,v[2]=Ye,v[3]=we,I.clearBufferuiv(I.COLOR,0,v)):(E[0]=Ae,E[1]=He,E[2]=Ye,E[3]=we,I.clearBufferiv(I.COLOR,0,E))}else z|=I.COLOR_BUFFER_BIT}O&&(z|=I.DEPTH_BUFFER_BIT,this.state.buffers.depth.setMask(!0)),V&&(z|=I.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),z!==0&&I.clear(z)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.setNodesHandler=function(M){M.setRenderer(this),F=M},this.dispose=function(){t.removeEventListener("webglcontextlost",ee,!1),t.removeEventListener("webglcontextrestored",Te,!1),t.removeEventListener("webglcontextcreationerror",Ge,!1),se.dispose(),K.dispose(),_e.dispose(),R.dispose(),k.dispose(),re.dispose(),oe.dispose(),j.dispose(),ue.dispose(),ce.dispose(),ce.removeEventListener("sessionstart",Sh),ce.removeEventListener("sessionend",Eh),Tr.stop()};function ee(M){M.preventDefault(),kf("WebGLRenderer: Context Lost."),P=!0}function Te(){kf("WebGLRenderer: Context Restored."),P=!1;const M=Rt.autoReset,O=le.enabled,V=le.autoUpdate,z=le.needsUpdate,G=le.type;xe(),Rt.autoReset=M,le.enabled=O,le.autoUpdate=V,le.needsUpdate=z,le.type=G}function Ge(M){Qe("WebGLRenderer: A WebGL context could not be created. Reason: ",M.statusMessage)}function Dt(M){const O=M.target;O.removeEventListener("dispose",Dt),ht(O)}function ht(M){bi(M),R.remove(M)}function bi(M){const O=R.get(M).programs;O!==void 0&&(O.forEach(function(V){ue.releaseProgram(V)}),M.isShaderMaterial&&ue.releaseShaderCache(M))}this.renderBufferDirect=function(M,O,V,z,G,ge){O===null&&(O=Wt);const Ee=G.isMesh&&G.matrixWorld.determinant()<0,me=gv(M,O,V,z,G);he.setMaterial(z,Ee);let we=V.index,Ae=1;if(z.wireframe===!0){if(we=te.getWireframeAttribute(V),we===void 0)return;Ae=2}const He=V.drawRange,Ye=V.attributes.position;let Re=He.start*Ae,ft=(He.start+He.count)*Ae;ge!==null&&(Re=Math.max(Re,ge.start*Ae),ft=Math.min(ft,(ge.start+ge.count)*Ae)),we!==null?(Re=Math.max(Re,0),ft=Math.min(ft,we.count)):Ye!=null&&(Re=Math.max(Re,0),ft=Math.min(ft,Ye.count));const Nt=ft-Re;if(Nt<0||Nt===1/0)return;oe.setup(G,z,me,V,we);let Pt,gt=Ve;if(we!==null&&(Pt=Y.get(we),gt=it,gt.setIndex(Pt)),G.isMesh)z.wireframe===!0?(he.setLineWidth(z.wireframeLinewidth*yn()),gt.setMode(I.LINES)):gt.setMode(I.TRIANGLES);else if(G.isLine){let sn=z.linewidth;sn===void 0&&(sn=1),he.setLineWidth(sn*yn()),G.isLineSegments?gt.setMode(I.LINES):G.isLineLoop?gt.setMode(I.LINE_LOOP):gt.setMode(I.LINE_STRIP)}else G.isPoints?gt.setMode(I.POINTS):G.isSprite&&gt.setMode(I.TRIANGLES);if(G.isBatchedMesh)if(Ze.get("WEBGL_multi_draw"))gt.renderMultiDraw(G._multiDrawStarts,G._multiDrawCounts,G._multiDrawCount);else{const sn=G._multiDrawStarts,be=G._multiDrawCounts,Sn=G._multiDrawCount,tt=we?Y.get(we).bytesPerElement:1,Rn=R.get(z).currentProgram.getUniforms();for(let si=0;si<Sn;si++)Rn.setValue(I,"_gl_DrawID",si),gt.render(sn[si]/tt,be[si])}else if(G.isInstancedMesh)gt.renderInstances(Re,Nt,G.count);else if(V.isInstancedBufferGeometry){const sn=V._maxInstanceCount!==void 0?V._maxInstanceCount:1/0,be=Math.min(V.instanceCount,sn);gt.renderInstances(Re,Nt,be)}else gt.render(Re,Nt)};function ri(M,O,V){M.transparent===!0&&M.side===Ii&&M.forceSinglePass===!1?(M.side=bn,M.needsUpdate=!0,$o(M,O,V),M.side=Sr,M.needsUpdate=!0,$o(M,O,V),M.side=Ii):$o(M,O,V)}this.compile=function(M,O,V=null){V===null&&(V=M),S=_e.get(V),S.init(O),b.push(S),V.traverseVisible(function(G){G.isLight&&G.layers.test(O.layers)&&(S.pushLight(G),G.castShadow&&S.pushShadow(G))}),M!==V&&M.traverseVisible(function(G){G.isLight&&G.layers.test(O.layers)&&(S.pushLight(G),G.castShadow&&S.pushShadow(G))}),S.setupLights();const z=new Set;return M.traverse(function(G){if(!(G.isMesh||G.isPoints||G.isLine||G.isSprite))return;const ge=G.material;if(ge)if(Array.isArray(ge))for(let Ee=0;Ee<ge.length;Ee++){const me=ge[Ee];ri(me,V,G),z.add(me)}else ri(ge,V,G),z.add(ge)}),S=b.pop(),z},this.compileAsync=function(M,O,V=null){const z=this.compile(M,O,V);return new Promise(G=>{function ge(){if(z.forEach(function(Ee){R.get(Ee).currentProgram.isReady()&&z.delete(Ee)}),z.size===0){G(M);return}setTimeout(ge,10)}Ze.get("KHR_parallel_shader_compile")!==null?ge():setTimeout(ge,10)})};let ql=null;function pv(M){ql&&ql(M)}function Sh(){Tr.stop()}function Eh(){Tr.start()}const Tr=new C_;Tr.setAnimationLoop(pv),typeof self<"u"&&Tr.setContext(self),this.setAnimationLoop=function(M){ql=M,ce.setAnimationLoop(M),M===null?Tr.stop():Tr.start()},ce.addEventListener("sessionstart",Sh),ce.addEventListener("sessionend",Eh),this.render=function(M,O){if(O!==void 0&&O.isCamera!==!0){Qe("WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(P===!0)return;F!==null&&F.renderStart(M,O);const V=ce.enabled===!0&&ce.isPresenting===!0,z=T!==null&&(U===null||V)&&T.begin(L,U);if(M.matrixWorldAutoUpdate===!0&&M.updateMatrixWorld(),O.parent===null&&O.matrixWorldAutoUpdate===!0&&O.updateMatrixWorld(),ce.enabled===!0&&ce.isPresenting===!0&&(T===null||T.isCompositing()===!1)&&(ce.cameraAutoUpdate===!0&&ce.updateCamera(O),O=ce.getCamera()),M.isScene===!0&&M.onBeforeRender(L,M,O,U),S=_e.get(M,b.length),S.init(O),S.state.textureUnits=y.getTextureUnits(),b.push(S),ot.multiplyMatrices(O.projectionMatrix,O.matrixWorldInverse),Ne.setFromProjectionMatrix(ot,fi,O.reversedDepth),Xe=this.localClippingEnabled,xt=Se.init(this.clippingPlanes,Xe),w=K.get(M,C.length),w.init(),C.push(w),ce.enabled===!0&&ce.isPresenting===!0){const Ee=L.xr.getDepthSensingMesh();Ee!==null&&Kl(Ee,O,-1/0,L.sortObjects)}Kl(M,O,0,L.sortObjects),w.finish(),L.sortObjects===!0&&w.sort(q,pe),Mt=ce.enabled===!1||ce.isPresenting===!1||ce.hasDepthSensing()===!1,Mt&&se.addToRenderList(w,M),this.info.render.frame++,xt===!0&&Se.beginShadows();const G=S.state.shadowsArray;if(le.render(G,M,O),xt===!0&&Se.endShadows(),this.info.autoReset===!0&&this.info.reset(),(z&&T.hasRenderPass())===!1){const Ee=w.opaque,me=w.transmissive;if(S.setupLights(),O.isArrayCamera){const we=O.cameras;if(me.length>0)for(let Ae=0,He=we.length;Ae<He;Ae++){const Ye=we[Ae];wh(Ee,me,M,Ye)}Mt&&se.render(M);for(let Ae=0,He=we.length;Ae<He;Ae++){const Ye=we[Ae];Mh(w,M,Ye,Ye.viewport)}}else me.length>0&&wh(Ee,me,M,O),Mt&&se.render(M),Mh(w,M,O)}U!==null&&$===0&&(y.updateMultisampleRenderTarget(U),y.updateRenderTargetMipmap(U)),z&&T.end(L),M.isScene===!0&&M.onAfterRender(L,M,O),oe.resetDefaultState(),B=-1,H=null,b.pop(),b.length>0?(S=b[b.length-1],y.setTextureUnits(S.state.textureUnits),xt===!0&&Se.setGlobalState(L.clippingPlanes,S.state.camera)):S=null,C.pop(),C.length>0?w=C[C.length-1]:w=null,F!==null&&F.renderEnd()};function Kl(M,O,V,z){if(M.visible===!1)return;if(M.layers.test(O.layers)){if(M.isGroup)V=M.renderOrder;else if(M.isLOD)M.autoUpdate===!0&&M.update(O);else if(M.isLightProbeGrid)S.pushLightProbeGrid(M);else if(M.isLight)S.pushLight(M),M.castShadow&&S.pushShadow(M);else if(M.isSprite){if(!M.frustumCulled||Ne.intersectsSprite(M)){z&&je.setFromMatrixPosition(M.matrixWorld).applyMatrix4(ot);const Ee=re.update(M),me=M.material;me.visible&&w.push(M,Ee,me,V,je.z,null)}}else if((M.isMesh||M.isLine||M.isPoints)&&(!M.frustumCulled||Ne.intersectsObject(M))){const Ee=re.update(M),me=M.material;if(z&&(M.boundingSphere!==void 0?(M.boundingSphere===null&&M.computeBoundingSphere(),je.copy(M.boundingSphere.center)):(Ee.boundingSphere===null&&Ee.computeBoundingSphere(),je.copy(Ee.boundingSphere.center)),je.applyMatrix4(M.matrixWorld).applyMatrix4(ot)),Array.isArray(me)){const we=Ee.groups;for(let Ae=0,He=we.length;Ae<He;Ae++){const Ye=we[Ae],Re=me[Ye.materialIndex];Re&&Re.visible&&w.push(M,Ee,Re,V,je.z,Ye)}}else me.visible&&w.push(M,Ee,me,V,je.z,null)}}const ge=M.children;for(let Ee=0,me=ge.length;Ee<me;Ee++)Kl(ge[Ee],O,V,z)}function Mh(M,O,V,z){const{opaque:G,transmissive:ge,transparent:Ee}=M;S.setupLightsView(V),xt===!0&&Se.setGlobalState(L.clippingPlanes,V),z&&he.viewport(Z.copy(z)),G.length>0&&Wo(G,O,V),ge.length>0&&Wo(ge,O,V),Ee.length>0&&Wo(Ee,O,V),he.buffers.depth.setTest(!0),he.buffers.depth.setMask(!0),he.buffers.color.setMask(!0),he.setPolygonOffset(!1)}function wh(M,O,V,z){if((V.isScene===!0?V.overrideMaterial:null)!==null)return;if(S.state.transmissionRenderTarget[z.id]===void 0){const Re=Ze.has("EXT_color_buffer_half_float")||Ze.has("EXT_color_buffer_float");S.state.transmissionRenderTarget[z.id]=new mi(1,1,{generateMipmaps:!0,type:Re?$i:Un,minFilter:kr,samples:Math.max(4,bt.samples),stencilBuffer:s,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:Je.workingColorSpace})}const ge=S.state.transmissionRenderTarget[z.id],Ee=z.viewport||Z;ge.setSize(Ee.z*L.transmissionResolutionScale,Ee.w*L.transmissionResolutionScale);const me=L.getRenderTarget(),we=L.getActiveCubeFace(),Ae=L.getActiveMipmapLevel();L.setRenderTarget(ge),L.getClearColor(de),ye=L.getClearAlpha(),ye<1&&L.setClearColor(16777215,.5),L.clear(),Mt&&se.render(V);const He=L.toneMapping;L.toneMapping=pi;const Ye=z.viewport;if(z.viewport!==void 0&&(z.viewport=void 0),S.setupLightsView(z),xt===!0&&Se.setGlobalState(L.clippingPlanes,z),Wo(M,V,z),y.updateMultisampleRenderTarget(ge),y.updateRenderTargetMipmap(ge),Ze.has("WEBGL_multisampled_render_to_texture")===!1){let Re=!1;for(let ft=0,Nt=O.length;ft<Nt;ft++){const Pt=O[ft],{object:gt,geometry:sn,material:be,group:Sn}=Pt;if(be.side===Ii&&gt.layers.test(z.layers)){const tt=be.side;be.side=bn,be.needsUpdate=!0,Th(gt,V,z,sn,be,Sn),be.side=tt,be.needsUpdate=!0,Re=!0}}Re===!0&&(y.updateMultisampleRenderTarget(ge),y.updateRenderTargetMipmap(ge))}L.setRenderTarget(me,we,Ae),L.setClearColor(de,ye),Ye!==void 0&&(z.viewport=Ye),L.toneMapping=He}function Wo(M,O,V){const z=O.isScene===!0?O.overrideMaterial:null;for(let G=0,ge=M.length;G<ge;G++){const Ee=M[G],{object:me,geometry:we,group:Ae}=Ee;let He=Ee.material;He.allowOverride===!0&&z!==null&&(He=z),me.layers.test(V.layers)&&Th(me,O,V,we,He,Ae)}}function Th(M,O,V,z,G,ge){M.onBeforeRender(L,O,V,z,G,ge),M.modelViewMatrix.multiplyMatrices(V.matrixWorldInverse,M.matrixWorld),M.normalMatrix.getNormalMatrix(M.modelViewMatrix),G.onBeforeRender(L,O,V,z,M,ge),G.transparent===!0&&G.side===Ii&&G.forceSinglePass===!1?(G.side=bn,G.needsUpdate=!0,L.renderBufferDirect(V,O,z,G,M,ge),G.side=Sr,G.needsUpdate=!0,L.renderBufferDirect(V,O,z,G,M,ge),G.side=Ii):L.renderBufferDirect(V,O,z,G,M,ge),M.onAfterRender(L,O,V,z,G,ge)}function $o(M,O,V){O.isScene!==!0&&(O=Wt);const z=R.get(M),G=S.state.lights,ge=S.state.shadowsArray,Ee=G.state.version,me=ue.getParameters(M,G.state,ge,O,V,S.state.lightProbeGridArray),we=ue.getProgramCacheKey(me);let Ae=z.programs;z.environment=M.isMeshStandardMaterial||M.isMeshLambertMaterial||M.isMeshPhongMaterial?O.environment:null,z.fog=O.fog;const He=M.isMeshStandardMaterial||M.isMeshLambertMaterial&&!M.envMap||M.isMeshPhongMaterial&&!M.envMap;z.envMap=k.get(M.envMap||z.environment,He),z.envMapRotation=z.environment!==null&&M.envMap===null?O.environmentRotation:M.envMapRotation,Ae===void 0&&(M.addEventListener("dispose",Dt),Ae=new Map,z.programs=Ae);let Ye=Ae.get(we);if(Ye!==void 0){if(z.currentProgram===Ye&&z.lightsStateVersion===Ee)return Ch(M,me),Ye}else me.uniforms=ue.getUniforms(M),F!==null&&M.isNodeMaterial&&F.build(M,V,me),M.onBeforeCompile(me,L),Ye=ue.acquireProgram(me,we),Ae.set(we,Ye),z.uniforms=me.uniforms;const Re=z.uniforms;return(!M.isShaderMaterial&&!M.isRawShaderMaterial||M.clipping===!0)&&(Re.clippingPlanes=Se.uniform),Ch(M,me),z.needsLights=vv(M),z.lightsStateVersion=Ee,z.needsLights&&(Re.ambientLightColor.value=G.state.ambient,Re.lightProbe.value=G.state.probe,Re.directionalLights.value=G.state.directional,Re.directionalLightShadows.value=G.state.directionalShadow,Re.spotLights.value=G.state.spot,Re.spotLightShadows.value=G.state.spotShadow,Re.rectAreaLights.value=G.state.rectArea,Re.ltc_1.value=G.state.rectAreaLTC1,Re.ltc_2.value=G.state.rectAreaLTC2,Re.pointLights.value=G.state.point,Re.pointLightShadows.value=G.state.pointShadow,Re.hemisphereLights.value=G.state.hemi,Re.directionalShadowMatrix.value=G.state.directionalShadowMatrix,Re.spotLightMatrix.value=G.state.spotLightMatrix,Re.spotLightMap.value=G.state.spotLightMap,Re.pointShadowMatrix.value=G.state.pointShadowMatrix),z.lightProbeGrid=S.state.lightProbeGridArray.length>0,z.currentProgram=Ye,z.uniformsList=null,Ye}function Ah(M){if(M.uniformsList===null){const O=M.currentProgram.getUniforms();M.uniformsList=Wa.seqWithValue(O.seq,M.uniforms)}return M.uniformsList}function Ch(M,O){const V=R.get(M);V.outputColorSpace=O.outputColorSpace,V.batching=O.batching,V.batchingColor=O.batchingColor,V.instancing=O.instancing,V.instancingColor=O.instancingColor,V.instancingMorph=O.instancingMorph,V.skinning=O.skinning,V.morphTargets=O.morphTargets,V.morphNormals=O.morphNormals,V.morphColors=O.morphColors,V.morphTargetsCount=O.morphTargetsCount,V.numClippingPlanes=O.numClippingPlanes,V.numIntersection=O.numClipIntersection,V.vertexAlphas=O.vertexAlphas,V.vertexTangents=O.vertexTangents,V.toneMapping=O.toneMapping}function mv(M,O){if(M.length===0)return null;if(M.length===1)return M[0].texture!==null?M[0]:null;x.setFromMatrixPosition(O.matrixWorld);for(let V=0,z=M.length;V<z;V++){const G=M[V];if(G.texture!==null&&G.boundingBox.containsPoint(x))return G}return null}function gv(M,O,V,z,G){O.isScene!==!0&&(O=Wt),y.resetTextureUnits();const ge=O.fog,Ee=z.isMeshStandardMaterial||z.isMeshLambertMaterial||z.isMeshPhongMaterial?O.environment:null,me=U===null?L.outputColorSpace:U.isXRRenderTarget===!0?U.texture.colorSpace:Je.workingColorSpace,we=z.isMeshStandardMaterial||z.isMeshLambertMaterial&&!z.envMap||z.isMeshPhongMaterial&&!z.envMap,Ae=k.get(z.envMap||Ee,we),He=z.vertexColors===!0&&!!V.attributes.color&&V.attributes.color.itemSize===4,Ye=!!V.attributes.tangent&&(!!z.normalMap||z.anisotropy>0),Re=!!V.morphAttributes.position,ft=!!V.morphAttributes.normal,Nt=!!V.morphAttributes.color;let Pt=pi;z.toneMapped&&(U===null||U.isXRRenderTarget===!0)&&(Pt=L.toneMapping);const gt=V.morphAttributes.position||V.morphAttributes.normal||V.morphAttributes.color,sn=gt!==void 0?gt.length:0,be=R.get(z),Sn=S.state.lights;if(xt===!0&&(Xe===!0||M!==H)){const yt=M===H&&z.id===B;Se.setState(z,M,yt)}let tt=!1;z.version===be.__version?(be.needsLights&&be.lightsStateVersion!==Sn.state.version||be.outputColorSpace!==me||G.isBatchedMesh&&be.batching===!1||!G.isBatchedMesh&&be.batching===!0||G.isBatchedMesh&&be.batchingColor===!0&&G.colorTexture===null||G.isBatchedMesh&&be.batchingColor===!1&&G.colorTexture!==null||G.isInstancedMesh&&be.instancing===!1||!G.isInstancedMesh&&be.instancing===!0||G.isSkinnedMesh&&be.skinning===!1||!G.isSkinnedMesh&&be.skinning===!0||G.isInstancedMesh&&be.instancingColor===!0&&G.instanceColor===null||G.isInstancedMesh&&be.instancingColor===!1&&G.instanceColor!==null||G.isInstancedMesh&&be.instancingMorph===!0&&G.morphTexture===null||G.isInstancedMesh&&be.instancingMorph===!1&&G.morphTexture!==null||be.envMap!==Ae||z.fog===!0&&be.fog!==ge||be.numClippingPlanes!==void 0&&(be.numClippingPlanes!==Se.numPlanes||be.numIntersection!==Se.numIntersection)||be.vertexAlphas!==He||be.vertexTangents!==Ye||be.morphTargets!==Re||be.morphNormals!==ft||be.morphColors!==Nt||be.toneMapping!==Pt||be.morphTargetsCount!==sn||!!be.lightProbeGrid!=S.state.lightProbeGridArray.length>0)&&(tt=!0):(tt=!0,be.__version=z.version);let Rn=be.currentProgram;tt===!0&&(Rn=$o(z,O,G),F&&z.isNodeMaterial&&F.onUpdateProgram(z,Rn,be));let si=!1,Ki=!1,Kr=!1;const _t=Rn.getUniforms(),It=be.uniforms;if(he.useProgram(Rn.program)&&(si=!0,Ki=!0,Kr=!0),z.id!==B&&(B=z.id,Ki=!0),be.needsLights){const yt=mv(S.state.lightProbeGridArray,G);be.lightProbeGrid!==yt&&(be.lightProbeGrid=yt,Ki=!0)}if(si||H!==M){he.buffers.depth.getReversed()&&M.reversedDepth!==!0&&(M._reversedDepth=!0,M.updateProjectionMatrix()),_t.setValue(I,"projectionMatrix",M.projectionMatrix),_t.setValue(I,"viewMatrix",M.matrixWorldInverse);const Ji=_t.map.cameraPosition;Ji!==void 0&&Ji.setValue(I,mt.setFromMatrixPosition(M.matrixWorld)),bt.logarithmicDepthBuffer&&_t.setValue(I,"logDepthBufFC",2/(Math.log(M.far+1)/Math.LN2)),(z.isMeshPhongMaterial||z.isMeshToonMaterial||z.isMeshLambertMaterial||z.isMeshBasicMaterial||z.isMeshStandardMaterial||z.isShaderMaterial)&&_t.setValue(I,"isOrthographic",M.isOrthographicCamera===!0),H!==M&&(H=M,Ki=!0,Kr=!0)}if(be.needsLights&&(Sn.state.directionalShadowMap.length>0&&_t.setValue(I,"directionalShadowMap",Sn.state.directionalShadowMap,y),Sn.state.spotShadowMap.length>0&&_t.setValue(I,"spotShadowMap",Sn.state.spotShadowMap,y),Sn.state.pointShadowMap.length>0&&_t.setValue(I,"pointShadowMap",Sn.state.pointShadowMap,y)),G.isSkinnedMesh){_t.setOptional(I,G,"bindMatrix"),_t.setOptional(I,G,"bindMatrixInverse");const yt=G.skeleton;yt&&(yt.boneTexture===null&&yt.computeBoneTexture(),_t.setValue(I,"boneTexture",yt.boneTexture,y))}G.isBatchedMesh&&(_t.setOptional(I,G,"batchingTexture"),_t.setValue(I,"batchingTexture",G._matricesTexture,y),_t.setOptional(I,G,"batchingIdTexture"),_t.setValue(I,"batchingIdTexture",G._indirectTexture,y),_t.setOptional(I,G,"batchingColorTexture"),G._colorsTexture!==null&&_t.setValue(I,"batchingColorTexture",G._colorsTexture,y));const Zi=V.morphAttributes;if((Zi.position!==void 0||Zi.normal!==void 0||Zi.color!==void 0)&&Be.update(G,V,Rn),(Ki||be.receiveShadow!==G.receiveShadow)&&(be.receiveShadow=G.receiveShadow,_t.setValue(I,"receiveShadow",G.receiveShadow)),(z.isMeshStandardMaterial||z.isMeshLambertMaterial||z.isMeshPhongMaterial)&&z.envMap===null&&O.environment!==null&&(It.envMapIntensity.value=O.environmentIntensity),It.dfgLUT!==void 0&&(It.dfgLUT.value=_1()),Ki){if(_t.setValue(I,"toneMappingExposure",L.toneMappingExposure),be.needsLights&&_v(It,Kr),ge&&z.fog===!0&&X.refreshFogUniforms(It,ge),X.refreshMaterialUniforms(It,z,Ie,et,S.state.transmissionRenderTarget[M.id]),be.needsLights&&be.lightProbeGrid){const yt=be.lightProbeGrid;It.probesSH.value=yt.texture,It.probesMin.value.copy(yt.boundingBox.min),It.probesMax.value.copy(yt.boundingBox.max),It.probesResolution.value.copy(yt.resolution)}Wa.upload(I,Ah(be),It,y)}if(z.isShaderMaterial&&z.uniformsNeedUpdate===!0&&(Wa.upload(I,Ah(be),It,y),z.uniformsNeedUpdate=!1),z.isSpriteMaterial&&_t.setValue(I,"center",G.center),_t.setValue(I,"modelViewMatrix",G.modelViewMatrix),_t.setValue(I,"normalMatrix",G.normalMatrix),_t.setValue(I,"modelMatrix",G.matrixWorld),z.uniformsGroups!==void 0){const yt=z.uniformsGroups;for(let Ji=0,Zr=yt.length;Ji<Zr;Ji++){const Rh=yt[Ji];j.update(Rh,Rn),j.bind(Rh,Rn)}}return Rn}function _v(M,O){M.ambientLightColor.needsUpdate=O,M.lightProbe.needsUpdate=O,M.directionalLights.needsUpdate=O,M.directionalLightShadows.needsUpdate=O,M.pointLights.needsUpdate=O,M.pointLightShadows.needsUpdate=O,M.spotLights.needsUpdate=O,M.spotLightShadows.needsUpdate=O,M.rectAreaLights.needsUpdate=O,M.hemisphereLights.needsUpdate=O}function vv(M){return M.isMeshLambertMaterial||M.isMeshToonMaterial||M.isMeshPhongMaterial||M.isMeshStandardMaterial||M.isShadowMaterial||M.isShaderMaterial&&M.lights===!0}this.getActiveCubeFace=function(){return W},this.getActiveMipmapLevel=function(){return $},this.getRenderTarget=function(){return U},this.setRenderTargetTextures=function(M,O,V){const z=R.get(M);z.__autoAllocateDepthBuffer=M.resolveDepthBuffer===!1,z.__autoAllocateDepthBuffer===!1&&(z.__useRenderToTexture=!1),R.get(M.texture).__webglTexture=O,R.get(M.depthTexture).__webglTexture=z.__autoAllocateDepthBuffer?void 0:V,z.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(M,O){const V=R.get(M);V.__webglFramebuffer=O,V.__useDefaultFramebuffer=O===void 0};const xv=I.createFramebuffer();this.setRenderTarget=function(M,O=0,V=0){U=M,W=O,$=V;let z=null,G=!1,ge=!1;if(M){const me=R.get(M);if(me.__useDefaultFramebuffer!==void 0){he.bindFramebuffer(I.FRAMEBUFFER,me.__webglFramebuffer),Z.copy(M.viewport),J.copy(M.scissor),ne=M.scissorTest,he.viewport(Z),he.scissor(J),he.setScissorTest(ne),B=-1;return}else if(me.__webglFramebuffer===void 0)y.setupRenderTarget(M);else if(me.__hasExternalTextures)y.rebindTextures(M,R.get(M.texture).__webglTexture,R.get(M.depthTexture).__webglTexture);else if(M.depthBuffer){const He=M.depthTexture;if(me.__boundDepthTexture!==He){if(He!==null&&R.has(He)&&(M.width!==He.image.width||M.height!==He.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");y.setupDepthRenderbuffer(M)}}const we=M.texture;(we.isData3DTexture||we.isDataArrayTexture||we.isCompressedArrayTexture)&&(ge=!0);const Ae=R.get(M).__webglFramebuffer;M.isWebGLCubeRenderTarget?(Array.isArray(Ae[O])?z=Ae[O][V]:z=Ae[O],G=!0):M.samples>0&&y.useMultisampledRTT(M)===!1?z=R.get(M).__webglMultisampledFramebuffer:Array.isArray(Ae)?z=Ae[V]:z=Ae,Z.copy(M.viewport),J.copy(M.scissor),ne=M.scissorTest}else Z.copy(ie).multiplyScalar(Ie).floor(),J.copy(Ce).multiplyScalar(Ie).floor(),ne=Oe;if(V!==0&&(z=xv),he.bindFramebuffer(I.FRAMEBUFFER,z)&&he.drawBuffers(M,z),he.viewport(Z),he.scissor(J),he.setScissorTest(ne),G){const me=R.get(M.texture);I.framebufferTexture2D(I.FRAMEBUFFER,I.COLOR_ATTACHMENT0,I.TEXTURE_CUBE_MAP_POSITIVE_X+O,me.__webglTexture,V)}else if(ge){const me=O;for(let we=0;we<M.textures.length;we++){const Ae=R.get(M.textures[we]);I.framebufferTextureLayer(I.FRAMEBUFFER,I.COLOR_ATTACHMENT0+we,Ae.__webglTexture,V,me)}}else if(M!==null&&V!==0){const me=R.get(M.texture);I.framebufferTexture2D(I.FRAMEBUFFER,I.COLOR_ATTACHMENT0,I.TEXTURE_2D,me.__webglTexture,V)}B=-1},this.readRenderTargetPixels=function(M,O,V,z,G,ge,Ee,me=0){if(!(M&&M.isWebGLRenderTarget)){Qe("WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let we=R.get(M).__webglFramebuffer;if(M.isWebGLCubeRenderTarget&&Ee!==void 0&&(we=we[Ee]),we){he.bindFramebuffer(I.FRAMEBUFFER,we);try{const Ae=M.textures[me],He=Ae.format,Ye=Ae.type;if(M.textures.length>1&&I.readBuffer(I.COLOR_ATTACHMENT0+me),!bt.textureFormatReadable(He)){Qe("WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!bt.textureTypeReadable(Ye)){Qe("WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}O>=0&&O<=M.width-z&&V>=0&&V<=M.height-G&&I.readPixels(O,V,z,G,D.convert(He),D.convert(Ye),ge)}finally{const Ae=U!==null?R.get(U).__webglFramebuffer:null;he.bindFramebuffer(I.FRAMEBUFFER,Ae)}}},this.readRenderTargetPixelsAsync=async function(M,O,V,z,G,ge,Ee,me=0){if(!(M&&M.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let we=R.get(M).__webglFramebuffer;if(M.isWebGLCubeRenderTarget&&Ee!==void 0&&(we=we[Ee]),we)if(O>=0&&O<=M.width-z&&V>=0&&V<=M.height-G){he.bindFramebuffer(I.FRAMEBUFFER,we);const Ae=M.textures[me],He=Ae.format,Ye=Ae.type;if(M.textures.length>1&&I.readBuffer(I.COLOR_ATTACHMENT0+me),!bt.textureFormatReadable(He))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!bt.textureTypeReadable(Ye))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");const Re=I.createBuffer();I.bindBuffer(I.PIXEL_PACK_BUFFER,Re),I.bufferData(I.PIXEL_PACK_BUFFER,ge.byteLength,I.STREAM_READ),I.readPixels(O,V,z,G,D.convert(He),D.convert(Ye),0);const ft=U!==null?R.get(U).__webglFramebuffer:null;he.bindFramebuffer(I.FRAMEBUFFER,ft);const Nt=I.fenceSync(I.SYNC_GPU_COMMANDS_COMPLETE,0);return I.flush(),await LS(I,Nt,4),I.bindBuffer(I.PIXEL_PACK_BUFFER,Re),I.getBufferSubData(I.PIXEL_PACK_BUFFER,0,ge),I.deleteBuffer(Re),I.deleteSync(Nt),ge}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(M,O=null,V=0){const z=Math.pow(2,-V),G=Math.floor(M.image.width*z),ge=Math.floor(M.image.height*z),Ee=O!==null?O.x:0,me=O!==null?O.y:0;y.setTexture2D(M,0),I.copyTexSubImage2D(I.TEXTURE_2D,V,0,0,Ee,me,G,ge),he.unbindTexture()};const bv=I.createFramebuffer(),yv=I.createFramebuffer();this.copyTextureToTexture=function(M,O,V=null,z=null,G=0,ge=0){let Ee,me,we,Ae,He,Ye,Re,ft,Nt;const Pt=M.isCompressedTexture?M.mipmaps[ge]:M.image;if(V!==null)Ee=V.max.x-V.min.x,me=V.max.y-V.min.y,we=V.isBox3?V.max.z-V.min.z:1,Ae=V.min.x,He=V.min.y,Ye=V.isBox3?V.min.z:0;else{const It=Math.pow(2,-G);Ee=Math.floor(Pt.width*It),me=Math.floor(Pt.height*It),M.isDataArrayTexture?we=Pt.depth:M.isData3DTexture?we=Math.floor(Pt.depth*It):we=1,Ae=0,He=0,Ye=0}z!==null?(Re=z.x,ft=z.y,Nt=z.z):(Re=0,ft=0,Nt=0);const gt=D.convert(O.format),sn=D.convert(O.type);let be;O.isData3DTexture?(y.setTexture3D(O,0),be=I.TEXTURE_3D):O.isDataArrayTexture||O.isCompressedArrayTexture?(y.setTexture2DArray(O,0),be=I.TEXTURE_2D_ARRAY):(y.setTexture2D(O,0),be=I.TEXTURE_2D),he.activeTexture(I.TEXTURE0),he.pixelStorei(I.UNPACK_FLIP_Y_WEBGL,O.flipY),he.pixelStorei(I.UNPACK_PREMULTIPLY_ALPHA_WEBGL,O.premultiplyAlpha),he.pixelStorei(I.UNPACK_ALIGNMENT,O.unpackAlignment);const Sn=he.getParameter(I.UNPACK_ROW_LENGTH),tt=he.getParameter(I.UNPACK_IMAGE_HEIGHT),Rn=he.getParameter(I.UNPACK_SKIP_PIXELS),si=he.getParameter(I.UNPACK_SKIP_ROWS),Ki=he.getParameter(I.UNPACK_SKIP_IMAGES);he.pixelStorei(I.UNPACK_ROW_LENGTH,Pt.width),he.pixelStorei(I.UNPACK_IMAGE_HEIGHT,Pt.height),he.pixelStorei(I.UNPACK_SKIP_PIXELS,Ae),he.pixelStorei(I.UNPACK_SKIP_ROWS,He),he.pixelStorei(I.UNPACK_SKIP_IMAGES,Ye);const Kr=M.isDataArrayTexture||M.isData3DTexture,_t=O.isDataArrayTexture||O.isData3DTexture;if(M.isDepthTexture){const It=R.get(M),Zi=R.get(O),yt=R.get(It.__renderTarget),Ji=R.get(Zi.__renderTarget);he.bindFramebuffer(I.READ_FRAMEBUFFER,yt.__webglFramebuffer),he.bindFramebuffer(I.DRAW_FRAMEBUFFER,Ji.__webglFramebuffer);for(let Zr=0;Zr<we;Zr++)Kr&&(I.framebufferTextureLayer(I.READ_FRAMEBUFFER,I.COLOR_ATTACHMENT0,R.get(M).__webglTexture,G,Ye+Zr),I.framebufferTextureLayer(I.DRAW_FRAMEBUFFER,I.COLOR_ATTACHMENT0,R.get(O).__webglTexture,ge,Nt+Zr)),I.blitFramebuffer(Ae,He,Ee,me,Re,ft,Ee,me,I.DEPTH_BUFFER_BIT,I.NEAREST);he.bindFramebuffer(I.READ_FRAMEBUFFER,null),he.bindFramebuffer(I.DRAW_FRAMEBUFFER,null)}else if(G!==0||M.isRenderTargetTexture||R.has(M)){const It=R.get(M),Zi=R.get(O);he.bindFramebuffer(I.READ_FRAMEBUFFER,bv),he.bindFramebuffer(I.DRAW_FRAMEBUFFER,yv);for(let yt=0;yt<we;yt++)Kr?I.framebufferTextureLayer(I.READ_FRAMEBUFFER,I.COLOR_ATTACHMENT0,It.__webglTexture,G,Ye+yt):I.framebufferTexture2D(I.READ_FRAMEBUFFER,I.COLOR_ATTACHMENT0,I.TEXTURE_2D,It.__webglTexture,G),_t?I.framebufferTextureLayer(I.DRAW_FRAMEBUFFER,I.COLOR_ATTACHMENT0,Zi.__webglTexture,ge,Nt+yt):I.framebufferTexture2D(I.DRAW_FRAMEBUFFER,I.COLOR_ATTACHMENT0,I.TEXTURE_2D,Zi.__webglTexture,ge),G!==0?I.blitFramebuffer(Ae,He,Ee,me,Re,ft,Ee,me,I.COLOR_BUFFER_BIT,I.NEAREST):_t?I.copyTexSubImage3D(be,ge,Re,ft,Nt+yt,Ae,He,Ee,me):I.copyTexSubImage2D(be,ge,Re,ft,Ae,He,Ee,me);he.bindFramebuffer(I.READ_FRAMEBUFFER,null),he.bindFramebuffer(I.DRAW_FRAMEBUFFER,null)}else _t?M.isDataTexture||M.isData3DTexture?I.texSubImage3D(be,ge,Re,ft,Nt,Ee,me,we,gt,sn,Pt.data):O.isCompressedArrayTexture?I.compressedTexSubImage3D(be,ge,Re,ft,Nt,Ee,me,we,gt,Pt.data):I.texSubImage3D(be,ge,Re,ft,Nt,Ee,me,we,gt,sn,Pt):M.isDataTexture?I.texSubImage2D(I.TEXTURE_2D,ge,Re,ft,Ee,me,gt,sn,Pt.data):M.isCompressedTexture?I.compressedTexSubImage2D(I.TEXTURE_2D,ge,Re,ft,Pt.width,Pt.height,gt,Pt.data):I.texSubImage2D(I.TEXTURE_2D,ge,Re,ft,Ee,me,gt,sn,Pt);he.pixelStorei(I.UNPACK_ROW_LENGTH,Sn),he.pixelStorei(I.UNPACK_IMAGE_HEIGHT,tt),he.pixelStorei(I.UNPACK_SKIP_PIXELS,Rn),he.pixelStorei(I.UNPACK_SKIP_ROWS,si),he.pixelStorei(I.UNPACK_SKIP_IMAGES,Ki),ge===0&&O.generateMipmaps&&I.generateMipmap(be),he.unbindTexture()},this.initRenderTarget=function(M){R.get(M).__webglFramebuffer===void 0&&y.setupRenderTarget(M)},this.initTexture=function(M){M.isCubeTexture?y.setTextureCube(M,0):M.isData3DTexture?y.setTexture3D(M,0):M.isDataArrayTexture||M.isCompressedArrayTexture?y.setTexture2DArray(M,0):y.setTexture2D(M,0),he.unbindTexture()},this.resetState=function(){W=0,$=0,U=null,he.reset(),oe.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return fi}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;const t=this.getContext();t.drawingBufferColorSpace=Je._getDrawingBufferColorSpace(e),t.unpackColorSpace=Je._getUnpackColorSpace()}}const kp={type:"change"},ih={type:"start"},F_={type:"end"},Ra=new zo,Bp=new Ci,x1=Math.cos(70*IS.DEG2RAD),Xt=new N,vn=2*Math.PI,pt={NONE:-1,ROTATE:0,DOLLY:1,PAN:2,TOUCH_ROTATE:3,TOUCH_PAN:4,TOUCH_DOLLY_PAN:5,TOUCH_DOLLY_ROTATE:6},Zc=1e-6;class b1 extends SE{constructor(e,t=null){super(e,t),this.state=pt.NONE,this.target=new N,this.cursor=new N,this.minDistance=0,this.maxDistance=1/0,this.minZoom=0,this.maxZoom=1/0,this.minTargetRadius=0,this.maxTargetRadius=1/0,this.minPolarAngle=0,this.maxPolarAngle=Math.PI,this.minAzimuthAngle=-1/0,this.maxAzimuthAngle=1/0,this.enableDamping=!1,this.dampingFactor=.05,this.enableZoom=!0,this.zoomSpeed=1,this.enableRotate=!0,this.rotateSpeed=1,this.keyRotateSpeed=1,this.enablePan=!0,this.panSpeed=1,this.screenSpacePanning=!0,this.keyPanSpeed=7,this.zoomToCursor=!1,this.autoRotate=!1,this.autoRotateSpeed=2,this.keys={LEFT:"ArrowLeft",UP:"ArrowUp",RIGHT:"ArrowRight",BOTTOM:"ArrowDown"},this.mouseButtons={LEFT:Ms.ROTATE,MIDDLE:Ms.DOLLY,RIGHT:Ms.PAN},this.touches={ONE:vs.ROTATE,TWO:vs.DOLLY_PAN},this.target0=this.target.clone(),this.position0=this.object.position.clone(),this.zoom0=this.object.zoom,this._cursorStyle="auto",this._domElementKeyEvents=null,this._lastPosition=new N,this._lastQuaternion=new Er,this._lastTargetPosition=new N,this._quat=new Er().setFromUnitVectors(e.up,new N(0,1,0)),this._quatInverse=this._quat.clone().invert(),this._spherical=new hp,this._sphericalDelta=new hp,this._scale=1,this._panOffset=new N,this._rotateStart=new We,this._rotateEnd=new We,this._rotateDelta=new We,this._panStart=new We,this._panEnd=new We,this._panDelta=new We,this._dollyStart=new We,this._dollyEnd=new We,this._dollyDelta=new We,this._dollyDirection=new N,this._mouse=new We,this._performCursorZoom=!1,this._pointers=[],this._pointerPositions={},this._controlActive=!1,this._onPointerMove=S1.bind(this),this._onPointerDown=y1.bind(this),this._onPointerUp=E1.bind(this),this._onContextMenu=P1.bind(this),this._onMouseWheel=T1.bind(this),this._onKeyDown=A1.bind(this),this._onTouchStart=C1.bind(this),this._onTouchMove=R1.bind(this),this._onMouseDown=M1.bind(this),this._onMouseMove=w1.bind(this),this._interceptControlDown=L1.bind(this),this._interceptControlUp=D1.bind(this),this.domElement!==null&&this.connect(this.domElement),this.update()}set cursorStyle(e){this._cursorStyle=e,e==="grab"?this.domElement.style.cursor="grab":this.domElement.style.cursor="auto"}get cursorStyle(){return this._cursorStyle}connect(e){super.connect(e),this.domElement.addEventListener("pointerdown",this._onPointerDown),this.domElement.addEventListener("pointercancel",this._onPointerUp),this.domElement.addEventListener("contextmenu",this._onContextMenu),this.domElement.addEventListener("wheel",this._onMouseWheel,{passive:!1}),this.domElement.getRootNode().addEventListener("keydown",this._interceptControlDown,{passive:!0,capture:!0}),this.domElement.style.touchAction="none"}disconnect(){this.domElement.removeEventListener("pointerdown",this._onPointerDown),this.domElement.ownerDocument.removeEventListener("pointermove",this._onPointerMove),this.domElement.ownerDocument.removeEventListener("pointerup",this._onPointerUp),this.domElement.removeEventListener("pointercancel",this._onPointerUp),this.domElement.removeEventListener("wheel",this._onMouseWheel),this.domElement.removeEventListener("contextmenu",this._onContextMenu),this.stopListenToKeyEvents(),this.domElement.getRootNode().removeEventListener("keydown",this._interceptControlDown,{capture:!0}),this.domElement.style.touchAction=""}dispose(){this.disconnect()}getPolarAngle(){return this._spherical.phi}getAzimuthalAngle(){return this._spherical.theta}getDistance(){return this.object.position.distanceTo(this.target)}listenToKeyEvents(e){e.addEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=e}stopListenToKeyEvents(){this._domElementKeyEvents!==null&&(this._domElementKeyEvents.removeEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=null)}saveState(){this.target0.copy(this.target),this.position0.copy(this.object.position),this.zoom0=this.object.zoom}reset(){this.target.copy(this.target0),this.object.position.copy(this.position0),this.object.zoom=this.zoom0,this.object.updateProjectionMatrix(),this.dispatchEvent(kp),this.update(),this.state=pt.NONE}pan(e,t){this._pan(e,t),this.update()}dollyIn(e){this._dollyIn(e),this.update()}dollyOut(e){this._dollyOut(e),this.update()}rotateLeft(e){this._rotateLeft(e),this.update()}rotateUp(e){this._rotateUp(e),this.update()}update(e=null){const t=this.object.position;Xt.copy(t).sub(this.target),Xt.applyQuaternion(this._quat),this._spherical.setFromVector3(Xt),this.autoRotate&&this.state===pt.NONE&&this._rotateLeft(this._getAutoRotationAngle(e)),this.enableDamping?(this._spherical.theta+=this._sphericalDelta.theta*this.dampingFactor,this._spherical.phi+=this._sphericalDelta.phi*this.dampingFactor):(this._spherical.theta+=this._sphericalDelta.theta,this._spherical.phi+=this._sphericalDelta.phi);let i=this.minAzimuthAngle,r=this.maxAzimuthAngle;isFinite(i)&&isFinite(r)&&(i<-Math.PI?i+=vn:i>Math.PI&&(i-=vn),r<-Math.PI?r+=vn:r>Math.PI&&(r-=vn),i<=r?this._spherical.theta=Math.max(i,Math.min(r,this._spherical.theta)):this._spherical.theta=this._spherical.theta>(i+r)/2?Math.max(i,this._spherical.theta):Math.min(r,this._spherical.theta)),this._spherical.phi=Math.max(this.minPolarAngle,Math.min(this.maxPolarAngle,this._spherical.phi)),this._spherical.makeSafe(),this.enableDamping===!0?this.target.addScaledVector(this._panOffset,this.dampingFactor):this.target.add(this._panOffset),this.target.sub(this.cursor),this.target.clampLength(this.minTargetRadius,this.maxTargetRadius),this.target.add(this.cursor);let s=!1;if(this.zoomToCursor&&this._performCursorZoom||this.object.isOrthographicCamera)this._spherical.radius=this._clampDistance(this._spherical.radius);else{const o=this._spherical.radius;this._spherical.radius=this._clampDistance(this._spherical.radius*this._scale),s=o!=this._spherical.radius}if(Xt.setFromSpherical(this._spherical),Xt.applyQuaternion(this._quatInverse),t.copy(this.target).add(Xt),this.object.lookAt(this.target),this.enableDamping===!0?(this._sphericalDelta.theta*=1-this.dampingFactor,this._sphericalDelta.phi*=1-this.dampingFactor,this._panOffset.multiplyScalar(1-this.dampingFactor)):(this._sphericalDelta.set(0,0,0),this._panOffset.set(0,0,0)),this.zoomToCursor&&this._performCursorZoom){let o=null;if(this.object.isPerspectiveCamera){const a=Xt.length();o=this._clampDistance(a*this._scale);const l=a-o;this.object.position.addScaledVector(this._dollyDirection,l),this.object.updateMatrixWorld(),s=!!l}else if(this.object.isOrthographicCamera){const a=new N(this._mouse.x,this._mouse.y,0);a.unproject(this.object);const l=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),this.object.updateProjectionMatrix(),s=l!==this.object.zoom;const c=new N(this._mouse.x,this._mouse.y,0);c.unproject(this.object),this.object.position.sub(c).add(a),this.object.updateMatrixWorld(),o=Xt.length()}else console.warn("WARNING: OrbitControls.js encountered an unknown camera type - zoom to cursor disabled."),this.zoomToCursor=!1;o!==null&&(this.screenSpacePanning?this.target.set(0,0,-1).transformDirection(this.object.matrix).multiplyScalar(o).add(this.object.position):(Ra.origin.copy(this.object.position),Ra.direction.set(0,0,-1).transformDirection(this.object.matrix),Math.abs(this.object.up.dot(Ra.direction))<x1?this.object.lookAt(this.target):(Bp.setFromNormalAndCoplanarPoint(this.object.up,this.target),Ra.intersectPlane(Bp,this.target))))}else if(this.object.isOrthographicCamera){const o=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),o!==this.object.zoom&&(this.object.updateProjectionMatrix(),s=!0)}return this._scale=1,this._performCursorZoom=!1,s||this._lastPosition.distanceToSquared(this.object.position)>Zc||8*(1-this._lastQuaternion.dot(this.object.quaternion))>Zc||this._lastTargetPosition.distanceToSquared(this.target)>Zc?(this.dispatchEvent(kp),this._lastPosition.copy(this.object.position),this._lastQuaternion.copy(this.object.quaternion),this._lastTargetPosition.copy(this.target),!0):!1}_getAutoRotationAngle(e){return e!==null?vn/60*this.autoRotateSpeed*e:vn/60/60*this.autoRotateSpeed}_getZoomScale(e){const t=Math.abs(e*.01);return Math.pow(.95,this.zoomSpeed*t)}_rotateLeft(e){this._sphericalDelta.theta-=e}_rotateUp(e){this._sphericalDelta.phi-=e}_panLeft(e,t){Xt.setFromMatrixColumn(t,0),Xt.multiplyScalar(-e),this._panOffset.add(Xt)}_panUp(e,t){this.screenSpacePanning===!0?Xt.setFromMatrixColumn(t,1):(Xt.setFromMatrixColumn(t,0),Xt.crossVectors(this.object.up,Xt)),Xt.multiplyScalar(e),this._panOffset.add(Xt)}_pan(e,t){const i=this.domElement;if(this.object.isPerspectiveCamera){const r=this.object.position;Xt.copy(r).sub(this.target);let s=Xt.length();s*=Math.tan(this.object.fov/2*Math.PI/180),this._panLeft(2*e*s/i.clientHeight,this.object.matrix),this._panUp(2*t*s/i.clientHeight,this.object.matrix)}else this.object.isOrthographicCamera?(this._panLeft(e*(this.object.right-this.object.left)/this.object.zoom/i.clientWidth,this.object.matrix),this._panUp(t*(this.object.top-this.object.bottom)/this.object.zoom/i.clientHeight,this.object.matrix)):(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."),this.enablePan=!1)}_dollyOut(e){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale/=e:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_dollyIn(e){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale*=e:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_updateZoomParameters(e,t){if(!this.zoomToCursor)return;this._performCursorZoom=!0;const i=this.domElement.getBoundingClientRect(),r=e-i.left,s=t-i.top,o=i.width,a=i.height;this._mouse.x=r/o*2-1,this._mouse.y=-(s/a)*2+1,this._dollyDirection.set(this._mouse.x,this._mouse.y,1).unproject(this.object).sub(this.object.position).normalize()}_clampDistance(e){return Math.max(this.minDistance,Math.min(this.maxDistance,e))}_handleMouseDownRotate(e){this._rotateStart.set(e.clientX,e.clientY)}_handleMouseDownDolly(e){this._updateZoomParameters(e.clientX,e.clientX),this._dollyStart.set(e.clientX,e.clientY)}_handleMouseDownPan(e){this._panStart.set(e.clientX,e.clientY)}_handleMouseMoveRotate(e){this._rotateEnd.set(e.clientX,e.clientY),this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);const t=this.domElement;this._rotateLeft(vn*this._rotateDelta.x/t.clientHeight),this._rotateUp(vn*this._rotateDelta.y/t.clientHeight),this._rotateStart.copy(this._rotateEnd),this.update()}_handleMouseMoveDolly(e){this._dollyEnd.set(e.clientX,e.clientY),this._dollyDelta.subVectors(this._dollyEnd,this._dollyStart),this._dollyDelta.y>0?this._dollyOut(this._getZoomScale(this._dollyDelta.y)):this._dollyDelta.y<0&&this._dollyIn(this._getZoomScale(this._dollyDelta.y)),this._dollyStart.copy(this._dollyEnd),this.update()}_handleMouseMovePan(e){this._panEnd.set(e.clientX,e.clientY),this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd),this.update()}_handleMouseWheel(e){this._updateZoomParameters(e.clientX,e.clientY),e.deltaY<0?this._dollyIn(this._getZoomScale(e.deltaY)):e.deltaY>0&&this._dollyOut(this._getZoomScale(e.deltaY)),this.update()}_handleKeyDown(e){let t=!1;switch(e.code){case this.keys.UP:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateUp(vn*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,this.keyPanSpeed),t=!0;break;case this.keys.BOTTOM:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateUp(-vn*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,-this.keyPanSpeed),t=!0;break;case this.keys.LEFT:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateLeft(vn*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(this.keyPanSpeed,0),t=!0;break;case this.keys.RIGHT:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateLeft(-vn*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(-this.keyPanSpeed,0),t=!0;break}t&&(e.preventDefault(),this.update())}_handleTouchStartRotate(e){if(this._pointers.length===1)this._rotateStart.set(e.pageX,e.pageY);else{const t=this._getSecondPointerPosition(e),i=.5*(e.pageX+t.x),r=.5*(e.pageY+t.y);this._rotateStart.set(i,r)}}_handleTouchStartPan(e){if(this._pointers.length===1)this._panStart.set(e.pageX,e.pageY);else{const t=this._getSecondPointerPosition(e),i=.5*(e.pageX+t.x),r=.5*(e.pageY+t.y);this._panStart.set(i,r)}}_handleTouchStartDolly(e){const t=this._getSecondPointerPosition(e),i=e.pageX-t.x,r=e.pageY-t.y,s=Math.sqrt(i*i+r*r);this._dollyStart.set(0,s)}_handleTouchStartDollyPan(e){this.enableZoom&&this._handleTouchStartDolly(e),this.enablePan&&this._handleTouchStartPan(e)}_handleTouchStartDollyRotate(e){this.enableZoom&&this._handleTouchStartDolly(e),this.enableRotate&&this._handleTouchStartRotate(e)}_handleTouchMoveRotate(e){if(this._pointers.length==1)this._rotateEnd.set(e.pageX,e.pageY);else{const i=this._getSecondPointerPosition(e),r=.5*(e.pageX+i.x),s=.5*(e.pageY+i.y);this._rotateEnd.set(r,s)}this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);const t=this.domElement;this._rotateLeft(vn*this._rotateDelta.x/t.clientHeight),this._rotateUp(vn*this._rotateDelta.y/t.clientHeight),this._rotateStart.copy(this._rotateEnd)}_handleTouchMovePan(e){if(this._pointers.length===1)this._panEnd.set(e.pageX,e.pageY);else{const t=this._getSecondPointerPosition(e),i=.5*(e.pageX+t.x),r=.5*(e.pageY+t.y);this._panEnd.set(i,r)}this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd)}_handleTouchMoveDolly(e){const t=this._getSecondPointerPosition(e),i=e.pageX-t.x,r=e.pageY-t.y,s=Math.sqrt(i*i+r*r);this._dollyEnd.set(0,s),this._dollyDelta.set(0,Math.pow(this._dollyEnd.y/this._dollyStart.y,this.zoomSpeed)),this._dollyOut(this._dollyDelta.y),this._dollyStart.copy(this._dollyEnd);const o=(e.pageX+t.x)*.5,a=(e.pageY+t.y)*.5;this._updateZoomParameters(o,a)}_handleTouchMoveDollyPan(e){this.enableZoom&&this._handleTouchMoveDolly(e),this.enablePan&&this._handleTouchMovePan(e)}_handleTouchMoveDollyRotate(e){this.enableZoom&&this._handleTouchMoveDolly(e),this.enableRotate&&this._handleTouchMoveRotate(e)}_addPointer(e){this._pointers.push(e.pointerId)}_removePointer(e){delete this._pointerPositions[e.pointerId];for(let t=0;t<this._pointers.length;t++)if(this._pointers[t]==e.pointerId){this._pointers.splice(t,1);return}}_isTrackingPointer(e){for(let t=0;t<this._pointers.length;t++)if(this._pointers[t]==e.pointerId)return!0;return!1}_trackPointer(e){let t=this._pointerPositions[e.pointerId];t===void 0&&(t=new We,this._pointerPositions[e.pointerId]=t),t.set(e.pageX,e.pageY)}_getSecondPointerPosition(e){const t=e.pointerId===this._pointers[0]?this._pointers[1]:this._pointers[0];return this._pointerPositions[t]}_customWheelEvent(e){const t=e.deltaMode,i={clientX:e.clientX,clientY:e.clientY,deltaY:e.deltaY};switch(t){case 1:i.deltaY*=16;break;case 2:i.deltaY*=100;break}return e.ctrlKey&&!this._controlActive&&(i.deltaY*=10),i}}function y1(n){this.enabled!==!1&&(this._pointers.length===0&&(this.domElement.setPointerCapture(n.pointerId),this.domElement.ownerDocument.addEventListener("pointermove",this._onPointerMove),this.domElement.ownerDocument.addEventListener("pointerup",this._onPointerUp)),!this._isTrackingPointer(n)&&(this._addPointer(n),n.pointerType==="touch"?this._onTouchStart(n):this._onMouseDown(n),this._cursorStyle==="grab"&&(this.domElement.style.cursor="grabbing")))}function S1(n){this.enabled!==!1&&(n.pointerType==="touch"?this._onTouchMove(n):this._onMouseMove(n))}function E1(n){switch(this._removePointer(n),this._pointers.length){case 0:this.domElement.releasePointerCapture(n.pointerId),this.domElement.ownerDocument.removeEventListener("pointermove",this._onPointerMove),this.domElement.ownerDocument.removeEventListener("pointerup",this._onPointerUp),this.dispatchEvent(F_),this.state=pt.NONE,this._cursorStyle==="grab"&&(this.domElement.style.cursor="grab");break;case 1:const e=this._pointers[0],t=this._pointerPositions[e];this._onTouchStart({pointerId:e,pageX:t.x,pageY:t.y});break}}function M1(n){let e;switch(n.button){case 0:e=this.mouseButtons.LEFT;break;case 1:e=this.mouseButtons.MIDDLE;break;case 2:e=this.mouseButtons.RIGHT;break;default:e=-1}switch(e){case Ms.DOLLY:if(this.enableZoom===!1)return;this._handleMouseDownDolly(n),this.state=pt.DOLLY;break;case Ms.ROTATE:if(n.ctrlKey||n.metaKey||n.shiftKey){if(this.enablePan===!1)return;this._handleMouseDownPan(n),this.state=pt.PAN}else{if(this.enableRotate===!1)return;this._handleMouseDownRotate(n),this.state=pt.ROTATE}break;case Ms.PAN:if(n.ctrlKey||n.metaKey||n.shiftKey){if(this.enableRotate===!1)return;this._handleMouseDownRotate(n),this.state=pt.ROTATE}else{if(this.enablePan===!1)return;this._handleMouseDownPan(n),this.state=pt.PAN}break;default:this.state=pt.NONE}this.state!==pt.NONE&&this.dispatchEvent(ih)}function w1(n){switch(this.state){case pt.ROTATE:if(this.enableRotate===!1)return;this._handleMouseMoveRotate(n);break;case pt.DOLLY:if(this.enableZoom===!1)return;this._handleMouseMoveDolly(n);break;case pt.PAN:if(this.enablePan===!1)return;this._handleMouseMovePan(n);break}}function T1(n){this.enabled===!1||this.enableZoom===!1||this.state!==pt.NONE||(n.preventDefault(),this.dispatchEvent(ih),this._handleMouseWheel(this._customWheelEvent(n)),this.dispatchEvent(F_))}function A1(n){this.enabled!==!1&&this._handleKeyDown(n)}function C1(n){switch(this._trackPointer(n),this._pointers.length){case 1:switch(this.touches.ONE){case vs.ROTATE:if(this.enableRotate===!1)return;this._handleTouchStartRotate(n),this.state=pt.TOUCH_ROTATE;break;case vs.PAN:if(this.enablePan===!1)return;this._handleTouchStartPan(n),this.state=pt.TOUCH_PAN;break;default:this.state=pt.NONE}break;case 2:switch(this.touches.TWO){case vs.DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchStartDollyPan(n),this.state=pt.TOUCH_DOLLY_PAN;break;case vs.DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchStartDollyRotate(n),this.state=pt.TOUCH_DOLLY_ROTATE;break;default:this.state=pt.NONE}break;default:this.state=pt.NONE}this.state!==pt.NONE&&this.dispatchEvent(ih)}function R1(n){switch(this._trackPointer(n),this.state){case pt.TOUCH_ROTATE:if(this.enableRotate===!1)return;this._handleTouchMoveRotate(n),this.update();break;case pt.TOUCH_PAN:if(this.enablePan===!1)return;this._handleTouchMovePan(n),this.update();break;case pt.TOUCH_DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchMoveDollyPan(n),this.update();break;case pt.TOUCH_DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchMoveDollyRotate(n),this.update();break;default:this.state=pt.NONE}}function P1(n){this.enabled!==!1&&n.preventDefault()}function L1(n){n.key==="Control"&&(this._controlActive=!0,this.domElement.getRootNode().addEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}function D1(n){n.key==="Control"&&(this._controlActive=!1,this.domElement.getRootNode().removeEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}function rh(n){const e=document.createElement("canvas");return e.width=n,e.height=n,{canvas:e,ctx:e.getContext("2d")}}function N1(){const{canvas:e,ctx:t}=rh(128),i=128/2,r=t.createRadialGradient(i,i,0,i,i,i);return r.addColorStop(0,"rgba(255,255,255,1)"),r.addColorStop(.65,"rgba(255,255,255,0.97)"),r.addColorStop(1,"rgba(255,255,255,0)"),t.fillStyle=r,t.fillRect(0,0,128,128),new eh(e)}function I1(){const{canvas:e,ctx:t}=rh(128),i=128/2,r=128/2,s=128*.42,o=128*.1;return t.strokeStyle="rgba(255,255,255,0.95)",t.lineWidth=o,t.beginPath(),t.arc(i,r,s,0,Math.PI*2),t.stroke(),new eh(e)}function U1(){const{canvas:e,ctx:t}=rh(128),i=128/2,r=128/2,s=128*.16,o=t.createRadialGradient(i,r,0,i,r,s);o.addColorStop(0,"rgba(255,255,255,1)"),o.addColorStop(.65,"rgba(255,255,255,0.95)"),o.addColorStop(1,"rgba(255,255,255,0)"),t.fillStyle=o,t.beginPath(),t.arc(i,r,s,0,Math.PI*2),t.fill();const a=128*.36,l=128*.13;return t.strokeStyle="rgba(255,255,255,0.95)",t.lineWidth=l,t.beginPath(),t.arc(i,r,a,0,Math.PI*2),t.stroke(),new eh(e)}const O_=N1();function Jc(n,e,t){return n+(e-n)*t}function F1(n,e,t,i,r,s){const{selected:o,hover:a,emphasized:l,dim:c,pulsing:u,pulseLife:d}=Ag(e,r,s);if(u)return Ol(Ul(217,91,Math.round(45+d*20)));if(o)return xg;if(Gi.value)return[i[n*3]*.1,i[n*3+1]*.1,i[n*3+2]*.1];if(a){const[C,b,T]=[i[n*3],i[n*3+1],i[n*3+2]];return[Jc(C,1,.4),Jc(b,1,.4),Jc(T,1,.4)]}if(l)return ty;if(c)return[i[n*3]*.25,i[n*3+1]*.25,i[n*3+2]*.25];const h=Di.value,f=h==="b"?Mm.value:wm.value,p=h==="b"?Pg:Rg,_=f.get(e);if(_!==void 0)return p(_);const g=Fl(e),m=((g^g>>>17)&65535)*(Math.PI*2/65535),E=.02+(.5+.5*Math.sin(t*.72+m))*.04,x=i[n*3],w=i[n*3+1],S=i[n*3+2];return[x+(1-x)*E,w+(1-w)*E,S+(1-S)*E]}let Mo=[],Zn=null,wo=[];function Wl(){const n=qr();if(!n)return;sh();const e=ke.value;if(!e)return;const t=qi(),i=js(),r=e.operation,s=new Map(t.map((o,a)=>[o,a]));if(r==="nearest_neighbor"){const o=Lg(e),a=[],l=[];for(const c of e.neighbors??[]){const u=String(c.id??"");if(!u)continue;const d=c.query_id?[String(c.query_id)]:o;for(const h of d){const f=s.get(h),p=s.get(u);f===void 0||p===void 0||(l.push([f,p]),a.push(i[f*3],i[f*3+1],i[f*3+2],i[p*3],i[p*3+1],i[p*3+2]))}}if(a.length){const c=new At,u=new St(a,3);u.setUsage(hr),c.setAttribute("position",u);const d=new _E({color:Mg,dashSize:.035,gapSize:.02,transparent:!0,opacity:.78});Zn=new y_(c,d),Zn.computeLineDistances(),wo=l,n.add(Zn)}}if(r==="lerp"&&gi.value){const o=zp(e,s,i);if(o){const a=new At().setFromPoints(o),l=new Xr(a,new ji({color:rl,transparent:!0,opacity:.85}));n.add(l),Mo.push(l)}}if(r==="slerp"&&gi.value){const o=zp(e,s,i);if(o){const a=new sE(o,!1,"catmullrom",.15).getPoints(Math.max(o.length*12,96)),l=new At().setFromPoints(a),c=new Xr(l,new ji({color:rl,transparent:!0,opacity:.78}));n.add(c),Mo.push(c)}}if(r==="delta_walk"){const o=(e.source_point_ids??[]).map(String),[a,l]=o,c=s.get(a),u=l?s.get(l):void 0;if(c!==void 0&&u!==void 0){const d=new N(i[c*3],i[c*3+1],i[c*3+2]),h=new N(i[u*3],i[u*3+1],i[u*3+2]),f=k1(d,h,.15,iy,.78);n.add(f),Mo.push(f)}}}function O1(n,e,t){if(Zn&&wo.length){const i=Zn.geometry.getAttribute("position");for(let r=0;r<wo.length;r++){const[s,o]=wo[r];i.setXYZ(r*2,n[s],e[s],t[s]),i.setXYZ(r*2+1,n[o],e[o],t[o])}i.needsUpdate=!0,Zn.computeLineDistances()}}function sh(){const n=qr();Zn&&(n==null||n.remove(Zn),Zn.geometry.dispose(),Zn.material.dispose(),Zn=null),wo=[];for(const e of Mo)n==null||n.remove(e),e.geometry.dispose(),e.material.dispose();Mo=[]}function zp(n,e,t){const[i,r]=(n.source_point_ids??[]).map(String),s=e.get(i),o=r?e.get(r):void 0,a=(n.trajectory_overlay??[]).filter(c=>c.coords_3d);if(a.length<2)return null;const l=qe.value.snap_endpoints;return a.map(c=>{let[u,d,h]=c.coords_3d;return l&&(c.alpha===0&&s!==void 0?[u,d,h]=[t[s*3],t[s*3+1],t[s*3+2]]:c.alpha===1&&o!==void 0&&([u,d,h]=[t[o*3],t[o*3+1],t[o*3+2]])),new N(u,d,h)})}function k1(n,e,t,i,r){const s=e.clone().sub(n),o=s.length(),a=n.clone().add(e).multiplyScalar(.5),l=s.clone().normalize(),c=new N(0,1,0);let u=new N().crossVectors(l,c).normalize();u.length()<.01&&(u=new N().crossVectors(l,new N(1,0,0)).normalize());const d=a.clone().addScaledVector(u,o*t),h=new cE(n,d,e).getPoints(24),f=new At().setFromPoints(h);return new Xr(f,new ji({color:i,transparent:!0,opacity:r}))}let vl=null,xl=null;function k_(){Gp(vl),Gp(xl),vl=null,xl=null}function Gp(n){var e;n&&((e=qr())==null||e.remove(n.line),n.line.geometry.dispose(),n.line.material.dispose(),n.divA.remove(),n.divB.remove())}function Hp(n){const e=qi(),t=js();let i=0,r=0,s=0,o=0;for(const a of n){const l=e.indexOf(String(a));l<0||(i+=t[l*3],r+=t[l*3+1],s+=t[l*3+2],o++)}return o?{x:i/o,y:r/o,z:s/o}:null}function Vp(n,e,t,i){if(!t.length)return null;const{sideA:r,sideB:s}=Dg(t),o=Hp(r),a=Hp(s);if(!o||!a)return null;const l=a.x-o.x,c=a.y-o.y,u=a.z-o.z,d=Math.sqrt(l*l+c*c+u*u);if(d<1e-6)return null;const h=l/d,f=c/d,p=u/d,_=1.5,g=o.x-h*_,m=o.y-f*_,v=o.z-p*_,E=a.x+h*_,x=a.y+f*_,w=a.z+p*_,S=new N(g,m,v),C=new N(E,x,w),[b,T,L]=i.lineStart,[P,F,W]=i.lineEnd,$=[g,m,v,o.x,o.y,o.z,(o.x+a.x)/2,(o.y+a.y)/2,(o.z+a.z)/2,a.x,a.y,a.z,E,x,w],U=[b,T,L,b,T,L,1,1,1,P,F,W,P,F,W],B=new At;B.setAttribute("position",new St($,3)),B.setAttribute("color",new St(U,3));const H=new Xr(B,new ji({vertexColors:!0,transparent:!0,opacity:.92,linewidth:2}));n.add(H);const Z=ms(t,8,!1),J=ms(t,8,!0),ne=document.createElement("div");ne.style.cssText=`position:absolute;pointer-events:none;display:none;color:${i.labelStartColor};font:10px ui-monospace,monospace;white-space:nowrap;text-shadow:0 0 4px #000;z-index:8;`,ne.textContent="← "+Z,e.appendChild(ne);const de=document.createElement("div");return de.style.cssText=`position:absolute;pointer-events:none;display:none;color:${i.labelEndColor};font:10px ui-monospace,monospace;white-space:nowrap;text-shadow:0 0 4px #000;z-index:8;`,de.textContent=J+" ->",e.appendChild(de),{line:H,divA:ne,divB:de,worldA:S,worldB:C}}function B_(){k_();const n=qr(),e=qi(),t=ch(),i=ke.value;(i==null?void 0:i.operation)!=="axis_projection"||!n||!e.length||!t||(vl=Vp(n,t,i.axis_projection??[],{lineStart:bg,lineEnd:yg,labelStartColor:"#60a5fa",labelEndColor:"#f87171"}),xl=Vp(n,t,i.axis_b_projection??[],{lineStart:Sg,lineEnd:Eg,labelStartColor:"#4ade80",labelEndColor:"#fb923c"}))}function B1(){Wp(vl),Wp(xl)}function Wp(n){if(!n)return;const e=jr(n.worldA.x,n.worldA.y,n.worldA.z);e?(n.divA.style.left=`${e.x+6}px`,n.divA.style.top=`${e.y-8}px`,n.divA.style.display="block"):n.divA.style.display="none";const t=jr(n.worldB.x,n.worldB.y,n.worldB.z);t?(n.divB.style.left=`${t.x-(n.divB.offsetWidth||80)-6}px`,n.divB.style.top=`${t.y-8}px`,n.divB.style.display="block"):n.divB.style.display="none"}const z1=ti(()=>qe.value.snap_endpoints),G1=U1(),H1=O_,V1=I1(),z_=.11,W1=z_*1.7,$1=Ol(Co(Ud,.28));let Fn=null,Ui=null,Jn=null,fr=null,pr=-1,Fi=new Float32Array(0),Yn=new Float32Array(0),fd=[],Ri=!1;const bl=new Map;let mr=[],yl=null,wn=null;function oh(){return Fn}function ah(){return mr}function X1(){return Ri}function j1(n){yl=n}function Do(){const n=qr();if(!n)return;G_();const e=ke.value,t=e==null?void 0:e.trajectory_overlay;if(!gi.value||!(t!=null&&t.length))return;const i=t.filter(p=>p.coords_3d);if(!i.length)return;const r=z1.value,s=((e==null?void 0:e.source_point_ids)??[]).map(String),o=qi(),a=js(),l=new Map(o.map((p,_)=>[p,_]));Ri=(e==null?void 0:e.operation)==="consistency_check",mr=i,Fi=new Float32Array(i.length*3),Yn=new Float32Array(i.length*3),fd=i.map(p=>p.cluster_id??null);for(let p=0;p<i.length;p++){const[_,g,m]=i[p].coords_3d;Fi[p*3]=_,Fi[p*3+1]=g,Fi[p*3+2]=m;let v;if(Ri&&i[p].cluster_id!=null)v=Ol(Vs(i[p].cluster_id,72));else if(Ri)v=$1;else{const E=i[p].source_text_pair;v=wg(i[p].alpha,E)??ny}if(Yn[p*3]=v[0],Yn[p*3+1]=v[1],Yn[p*3+2]=v[2],r){const E=i[p].alpha;let x=null;const w=(e==null?void 0:e.operation)==="delta_walk";if(E===0?x=w?s[2]:s[0]??null:E===1&&!w&&s.length>=2&&(x=s[1]),x){const S=l.get(x);S!==void 0&&bl.set(p,S)}}}const c=Fi.slice();for(const[p,_]of bl)c[p*3]=a[_*3],c[p*3+1]=a[_*3+1],c[p*3+2]=a[_*3+2];const u=new At,d=new St(c,3);d.setUsage(hr),u.setAttribute("position",d);const h=new St(Yn.slice(),3);if(h.setUsage(hr),u.setAttribute("color",h),Fn=new cd(u,new _l(Ri?{size:z_,sizeAttenuation:!0,vertexColors:!0,map:H1,alphaTest:.08,transparent:!1}:{size:.12,sizeAttenuation:!0,vertexColors:!0,map:G1,alphaTest:.04,transparent:!0,opacity:.85})),n.add(Fn),Ri){const p=new At,_=new St(c.slice(),3);_.setUsage(hr),p.setAttribute("position",_),Ui=new cd(p,new _l({size:W1,sizeAttenuation:!0,map:V1,color:rl,alphaTest:.05,transparent:!0,opacity:.9,depthWrite:!1})),n.add(Ui)}const f=((e==null?void 0:e.operation)==="slerp"||(e==null?void 0:e.operation)==="lerp")&&((e==null?void 0:e.trajectory_overlay)??[]).some(p=>p.coords_3d);if(!Ri&&!f){const p=i.findIndex(g=>g.source_text_pair===1),_=(g,m)=>{const v=new At,E=new St(g,3);E.setUsage(hr),v.setAttribute("position",E),v.setAttribute("color",new St(m,3));const x=new Xr(v,new ji({vertexColors:!0,transparent:!0,opacity:.5}));return n.add(x),x};if(p>0)pr=p,Jn=_(c.slice(0,p*3),Yn.slice(0,p*3)),fr=_(c.slice(p*3),Yn.slice(p*3));else if(pr=-1,i.some(m=>m.source_text_pair!==void 0))Jn=_(c.slice(),Yn.slice());else{const m=new At,v=new St(c.slice(),3);v.setUsage(hr),m.setAttribute("position",v),Jn=new Xr(m,new ji({color:rl,transparent:!0,opacity:.35})),n.add(Jn)}}}function G_(){const n=qr();Fn&&(n==null||n.remove(Fn),Fn.geometry.dispose(),Fn.material.dispose(),Fn=null),Ui&&(n==null||n.remove(Ui),Ui.geometry.dispose(),Ui.material.dispose(),Ui=null),Jn&&(n==null||n.remove(Jn),Jn.geometry.dispose(),Jn.material.dispose(),Jn=null),fr&&(n==null||n.remove(fr),fr.geometry.dispose(),fr.material.dispose(),fr=null),pr=-1,bl.clear(),mr=[],yl=null,wn&&(wn.remove(),wn=null)}function Y1(n,e,t,i,r){var h,f,p,_,g;if(!Fn)return;const s=Fi.length/3;if(!s)return;if(r&&!Ri){const m=.5+.5*Math.sin(i*.7),v=.5+.5*Math.sin(i*.5+1.3),E=Fn.material;E.size=.1+m*.04,E.opacity=.7+v*.25}const o=Fn.geometry.getAttribute("position");for(let m=0;m<s;m++){const v=bl.get(m);v!==void 0?o.setXYZ(m,n[v],e[v],t[v]):o.setXYZ(m,Fi[m*3],Fi[m*3+1],Fi[m*3+2])}if(o.needsUpdate=!0,Ui){const m=Ui.geometry.getAttribute("position");for(let v=0;v<s;v++)m.setXYZ(v,o.getX(v),o.getY(v),o.getZ(v));m.needsUpdate=!0}if(Jn){const m=pr>=0?pr:s,v=Jn.geometry.getAttribute("position");for(let E=0;E<m;E++)v.setXYZ(E,o.getX(E),o.getY(E),o.getZ(E));v.needsUpdate=!0}if(fr&&pr>=0){const m=fr.geometry.getAttribute("position");for(let v=pr;v<s;v++)m.setXYZ(v-pr,o.getX(v),o.getY(v),o.getZ(v));m.needsUpdate=!0}const a=Fn.geometry.getAttribute("color"),l=ki.value;let c=-1;for(let m=0;m<s;m++)if(yl!==null&&((h=mr[m])==null?void 0:h.id)===yl||Et.value.has(`__ghost__${(f=mr[m])==null?void 0:f.id}`))a.setXYZ(m,...xg),c=m;else{const E=Yn[m*3],x=Yn[m*3+1],w=Yn[m*3+2],C=l!==null&&(fd[m]==null||String(fd[m])!==l)?.15:1;a.setXYZ(m,E*C,x*C,w*C)}a.needsUpdate=!0;const u=Ho(),d=ch();if(u&&d)if(c>=0){const m=jr(o.getX(c),o.getY(c),o.getZ(c));wn||(wn=hh({textColor:"#facc15",borderColor:"rgba(250,204,21,0.6)",shadowColor:"rgba(250,204,21,0.2)",shadowBlur:6,initiallyHidden:!1}),d.appendChild(wn)),wn.textContent=Ri?((g=(_=(p=ke.value)==null?void 0:p.consistency_variants)==null?void 0:_.find(v=>v.id===mr[c].id))==null?void 0:g.text)??mr[c].label??"":`t=${mr[c].alpha.toFixed(2)}`,m?(wn.style.left=`${m.x+8}px`,wn.style.top=`${m.y-28}px`,wn.style.display="block"):wn.style.display="none"}else wn&&(wn.style.display="none")}const On=new bE;On.params.Points={threshold:.025};const $p=new We;function lh(n,e,t){const i=e.domElement.getBoundingClientRect();return $p.set((n.clientX-i.left)/i.width*2-1,-((n.clientY-i.top)/i.height)*2+1),On.setFromCamera($p,t),i}let H_=0,V_=0;const Xp=5;let No=!1,As=null,Io=!1;function q1(){No=!1,As=null,Io=!1,ni.value=null;const n=Xl();n&&(n.enabled=!0)}function W_(n){H_=n.clientX,V_=n.clientY;const e=Vo(),t=Xl();if(n.shiftKey&&e&&t){No=!0,Io=!1,t.enabled=!1;const i=e.domElement.getBoundingClientRect(),r=n.clientX-i.left,s=n.clientY-i.top;As={x:r,y:s},ni.value={x1:r,y1:s,x2:r,y2:s}}}function $_(n){var l,c,u,d;const e=Vo();if(No&&As&&e){const h=e.domElement.getBoundingClientRect(),f=n.clientX-h.left,p=n.clientY-h.top;ni.value={x1:As.x,y1:As.y,x2:f,y2:p};return}const t=Ho();if(!e||!t)return;lh(n,e,t);const i=jl(),r=qi();if(i&&r.length){const h=On.intersectObject(i);if(h.length>0&&h[0].index!==void 0){const f=r[h[0].index];if(wt.value!==f&&(wt.value=f,An.value=ut.value.byId.get(f)??null,e.domElement.style.cursor="pointer"),Et.value.has(f)){const p=q_().get(f);p&&(p.style.display="none")}return}}const s=Yl();if(s&&On.intersectObject(s).length>0){if(wt.value!=="probe"){wt.value="probe";const f=((l=ke.value)==null?void 0:l.operation)==="latent_probe"?(c=ke.value)==null?void 0:c.text_reconstruction:void 0,p=qe.value,_=p.probe_mode==="3d"?p.probe_coords:p.probe_cross_coords;An.value={id:"probe",view_coords:(_==null?void 0:_.length)===3?[_[0],_[1],_[2]]:(_==null?void 0:_.length)===2?[_[0],_[1]]:[0,0],label:"Latent probe",metadata:{text:"Latent Space Probe",recon_text:f==null?void 0:f.text,recon_sim:f==null?void 0:f.cosine_sim}},e.domElement.style.cursor="pointer"}return}const o=oh(),a=ah();if(o&&a.length){const h=On.intersectObject(o);if(h.length>0&&h[0].index!==void 0){const f=a[h[0].index],p=`__ghost__${f.id}`;if(wt.value!==p){wt.value=p;const _=X1(),g=(d=(u=ke.value)==null?void 0:u.consistency_variants)==null?void 0:d.find(E=>E.id===f.id),m=_?(g==null?void 0:g.text)??f.label??`t=${f.alpha.toFixed(2)}`:`t=${f.alpha.toFixed(2)}`,v=f.cluster_id??null;An.value={id:f.id,view_coords:f.coords_3d??f.coords_2d??[0,0],label:m,metadata:{text:m,..._&&v!=null&&v>=0?{ghost_cluster_id:v}:{}}},e.domElement.style.cursor="pointer"}return}}wt.value!==null&&wt.value!=="probe"?(wt.value=null,An.value=null,e.domElement.style.cursor=""):wt.value===null&&(e.domElement.style.cursor="")}function X_(n){if(!No)return;No=!1;const e=Xl();e&&(e.enabled=!0);const t=ni.value;if(ni.value=null,As=null,!t)return;const i=Math.min(t.x1,t.x2),r=Math.max(t.x1,t.x2),s=Math.min(t.y1,t.y2),o=Math.max(t.y1,t.y2);if(r-i<4&&o-s<4)return;Io=!0;const a=qi(),l=js(),c=new Set;for(let u=0;u<a.length;u++){const d=jr(l[u*3],l[u*3+1],l[u*3+2]);d&&d.x>=i&&d.x<=r&&d.y>=s&&d.y<=o&&c.add(a[u])}if(c.size>0){const u=n.ctrlKey||n.metaKey?Et.value:new Set;Et.value=new Set([...u,...c]),rt()}}function j_(n){var c,u,d,h;n.preventDefault();const e=Vo(),t=Ho(),i=jl(),r=qi();if(!e||!t||!i||!r.length)return;lh(n,e,t);const s=On.intersectObject(i);if(s.length>0&&s[0].index!==void 0){Ss(n.clientX,n.clientY,r[s[0].index]);return}const o=oh(),a=ah();if(o&&a.length){const f=On.intersectObject(o);if(f.length>0&&f[0].index!==void 0){const p=a[f[0].index],_=(u=(c=ke.value)==null?void 0:c.consistency_variants)==null?void 0:u.find(m=>m.id===p.id),g=(_==null?void 0:_.text)??p.label??`t=${p.alpha.toFixed(2)}`;Ss(n.clientX,n.clientY,`__ghost__${p.id}`,g);return}}const l=Yl();if(l&&On.intersectObject(l).length>0){const p=((d=ke.value)==null?void 0:d.operation)==="latent_probe"?(h=ke.value)==null?void 0:h.text_reconstruction:void 0;Ss(n.clientX,n.clientY,"probe",(p==null?void 0:p.text)??"Latent Space Probe")}}function Y_(n){if(Io){Io=!1;return}const e=n.clientX-H_,t=n.clientY-V_;if(e*e+t*t>Xp*Xp)return;const i=Vo(),r=Ho(),s=jl(),o=qi();if(!i||!r||!s||!o.length)return;lh(n,i,r);const a=On.intersectObject(s);if(a.length>0&&a[0].index!==void 0){const d=n.shiftKey||n.ctrlKey||n.metaKey;xs(o[a[0].index],d),rt();return}const l=oh(),c=ah();if(l&&c.length){const d=On.intersectObject(l);if(d.length>0&&d[0].index!==void 0){const h=c[d[0].index],f=n.shiftKey||n.ctrlKey||n.metaKey;xs(`__ghost__${h.id}`,f),rt();return}}const u=qe.value;if(u.operation==="latent_probe"&&!u.probe_place_mode){const d=Yl();if(d&&On.intersectObject(d).length>0){const f=n.shiftKey||n.ctrlKey||n.metaKey;xs("probe",f),rt();return}}if(u.operation==="latent_probe"&&u.probe_place_mode){const d=js(),h=new N,f=d.length/3;if(f>0){for(let m=0;m<d.length;m+=3)h.x+=d[m],h.y+=d[m+1],h.z+=d[m+2];h.divideScalar(f)}const p=new N;r.getWorldDirection(p);const _=new Ci().setFromNormalAndCoplanarPoint(p,h),g=new N;On.ray.intersectPlane(_,g),Ut({probe_coords:[g.x,g.y,g.z],probe_mode:"3d",probe_place_mode:!1}),rt()}else Td(),wt.value=null,An.value=null,rt()}let Pe=null,en=null,Lt=null,Vt=null,Ht=null,In=null,Nr=null,pn=null,xr=null,Jt=null,xn=[],Tt=new Float32Array(0),Fr=new Float32Array(0),uo={min:-1,max:1},Pi={x:0,y:0,z:0},zr=1;const $l=new Map,jn=[],di={selectedIds:new Set,emphasizedIds:new Set,hoverNodeId:null},gr=new Map;let Tn=null;const Pa=new N,K1=O_,Z1=ti(()=>qe.value.snap_endpoints);function qr(){return en}function Ho(){return Lt}function Vo(){return Pe}function Xl(){return Vt}function ch(){return Jt}function qi(){return xn}function js(){return Tt}function jl(){return Ht}function Yl(){return pn}function q_(){return gr}function jr(n,e,t){if(!Lt||!Jt||(Pa.set(n,e,t).project(Lt),Pa.z>1))return null;const i=Jt.clientWidth,r=Jt.clientHeight;return{x:(Pa.x+1)/2*i,y:(1-Pa.y)/2*r}}function K_(n){if(Pe)return;Jt=n,window.addEventListener("beforeunload",uh,{once:!0}),Pe=new v1({antialias:!0,preserveDrawingBuffer:!0}),Pe.setPixelRatio(Math.min(window.devicePixelRatio,2)),Pe.setSize(n.clientWidth||600,n.clientHeight||400),Pe.setClearColor(329999,1),n.appendChild(Pe.domElement),en=new YS,en.fog=new Jd(329999,.18),In=new yE(8,40,2776232,1978448),In.position.y=-1.2;const e=Array.isArray(In.material)?In.material:[In.material];for(const r of e)r.transparent=!0,r.opacity=.7;en.add(In);const t=n.clientWidth||600,i=n.clientHeight||400;Lt=new Nn(55,t/i,.001,100),Lt.position.set(.6,.5,2.2),Vt=new b1(Lt,Pe.domElement),Vt.enableDamping=!0,Vt.dampingFactor=.08,Vt.addEventListener("end",()=>rt()),Pe.domElement.addEventListener("mousedown",W_),Pe.domElement.addEventListener("mousemove",$_),Pe.domElement.addEventListener("mouseup",X_),Pe.domElement.addEventListener("click",Y_),Pe.domElement.addEventListener("contextmenu",j_),Pe.domElement.addEventListener("webglcontextlost",Z_,!1),Pe.domElement.addEventListener("webglcontextrestored",J_,!1),jn.push(jt(()=>{nv(ut.value)})),jn.push(jt(()=>{const r=Et.value,s=[...r].filter(o=>!di.selectedIds.has(o));di.selectedIds=r,di.emphasizedIds=Rm.value,di.hoverNodeId=wt.value,s.length>0&&ev(s),mn()})),jn.push(jt(()=>{br.value==="graph"&&ut.value.points.length>0?iv():(dh(),mn())})),jn.push(jt(()=>{gi.value,Wl(),Do(),mn()})),jn.push(jt(()=>{Gi.value,mn()})),jn.push(jt(()=>{Hr.value,ut.value,mn()})),jn.push(jt(()=>{Z1.value,Do(),mn()})),jn.push(jt(()=>{ke.value,B_(),mn()})),jn.push(jt(()=>{const r=qe.value;if(pn&&(en==null||en.remove(pn),pn.geometry.dispose(),pn.material.dispose(),pn=null),r.operation==="latent_probe"&&en){let s=null,o=null,a=null;if(r.probe_mode==="3d"&&r.probe_coords&&r.probe_coords.length>=3)[s,o,a]=r.probe_coords;else if(r.probe_mode==="2d"&&r.probe_cross_coords&&r.probe_cross_coords.length>=3){const[l,c,u]=r.probe_cross_coords;s=(l-Pi.x)/zr*2,o=(c-Pi.y)/zr*2,a=(u-Pi.z)/zr*2}if(s!==null){const l=new nh(.04,12,8);pn=new vi(l,new Qd({color:Mg})),pn.position.set(s,o,a),en.add(pn)}}mn()}))}function Z_(n){n.preventDefault(),dh()}function J_(){nv(ut.value),Wl(),Do(),B_(),br.value==="graph"&&ut.value.points.length>0&&iv(),mn()}function uh(){for(const n of jn)n();if(jn.length=0,dh(),Pe==null||Pe.domElement.removeEventListener("mousedown",W_),Pe==null||Pe.domElement.removeEventListener("mousemove",$_),Pe==null||Pe.domElement.removeEventListener("mouseup",X_),Pe==null||Pe.domElement.removeEventListener("click",Y_),Pe==null||Pe.domElement.removeEventListener("contextmenu",j_),Pe==null||Pe.domElement.removeEventListener("webglcontextlost",Z_),Pe==null||Pe.domElement.removeEventListener("webglcontextrestored",J_),q1(),Jt&&(Pe==null?void 0:Pe.domElement.parentNode)===Jt&&Jt.removeChild(Pe.domElement),Vt==null||Vt.dispose(),sh(),G_(),pn&&(pn.geometry.dispose(),pn.material.dispose(),pn=null),Ht&&(Ht.geometry.dispose(),Ht.material.dispose()),In){In.geometry.dispose();const n=Array.isArray(In.material)?In.material:[In.material];for(const e of n)e.dispose();In=null}Pe==null||Pe.forceContextLoss(),Pe==null||Pe.dispose(),Pe=null,en=null,Lt=null,Vt=null,Ht=null,Jt&&(Jt.style.position=""),Jt=null,xn=[],Tt=new Float32Array(0),Fr=new Float32Array(0),$l.clear(),k_();for(const n of gr.values())n.remove();gr.clear(),Tn&&(Tn.remove(),Tn=null)}function J1(){mn()}function pd(){if(!Pe||!Jt||!Lt)return;const n=Jt.clientWidth||600,e=Jt.clientHeight||400;Pe.setSize(n,e),Lt.aspect=n/e,Lt.updateProjectionMatrix(),mn()}function Q1(){return{x:0,y:0,ratio:1}}function eC(n){}function Q_(){if(!Vt||!Lt)return;const n=Tt.length/3;if(n===0)Lt.position.set(.6,.5,2.2),Vt.target.set(0,0,0);else{let e=0,t=0,i=0;for(let o=0;o<n;o++)e+=Tt[o*3],t+=Tt[o*3+1],i+=Tt[o*3+2];e/=n,t/=n,i/=n;let r=0;for(let o=0;o<n;o++){const a=Tt[o*3]-e,l=Tt[o*3+1]-t,c=Tt[o*3+2]-i;r=Math.max(r,Math.sqrt(a*a+l*l+c*c))}const s=r/Math.tan(55/2*Math.PI/180)*1.3;Vt.target.set(e,t,i),Lt.position.set(e+s*.28,t+s*.2,i+s)}Lt.lookAt(Vt.target),Vt.update(),mn()}function tC(){Wl(),Do()}function nC(n){j1(n),mn()}function ev(n){Fd(n,$l)}function iC(n){Fd(wd(n),$l)}function tv(n){Nr=n}function nv(n){if(!en)return;Ht&&(en.remove(Ht),Ht.geometry.dispose(),Ht.material.dispose(),Ht=null),sh();const e=n.points;if(!e.length){mn();return}const t=n.bounds,i=e.map(u=>Number(u.view_coords[2]??0)),r=Math.min(...i),s=Math.max(...i);uo={min:r===s?r-1:r,max:r===s?s+1:s},xn=e.map(u=>String(u.id)),Tt=new Float32Array(e.length*3),Fr=new Float32Array(e.length*3),Pi.x=(t.minX+t.maxX)/2,Pi.y=(t.minY+t.maxY)/2,Pi.z=(uo.min+uo.max)/2,zr=Math.max(t.maxX-t.minX,t.maxY-t.minY,uo.max-uo.min,.001);for(let u=0;u<e.length;u++){const d=e[u],h=(Number(d.view_coords[0])-Pi.x)/zr*2,f=(Number(d.view_coords[1])-Pi.y)/zr*2,p=(Number(d.view_coords[2]??0)-Pi.z)/zr*2;Tt[u*3]=h,Tt[u*3+1]=f,Tt[u*3+2]=p;const[_,g,m]=Ol(_g(d,h,f,72));Fr[u*3]=_,Fr[u*3+1]=g,Fr[u*3+2]=m}const o=new At,a=new Bn(Tt.slice(),3);a.setUsage(hr),o.setAttribute("position",a);const l=new Bn(Fr.slice(),3);l.setUsage(hr),o.setAttribute("color",l);const c=new _l({size:.11,sizeAttenuation:!0,vertexColors:!0,map:K1,alphaTest:.08,transparent:!1});Ht=new cd(o,c),en.add(Ht),Wl(),Do(),mn()}function iv(){if(xr)return;const n=()=>{if(!Pe||!en||!Lt||br.value!=="graph"){xr=null;return}Vt==null||Vt.update(),rv(performance.now()/1e3,Li.value),Pe.render(en,Lt),sv(),xr=requestAnimationFrame(n)};xr=requestAnimationFrame(n)}function dh(){xr&&(cancelAnimationFrame(xr),xr=null,rC())}function mn(){xr||!Pe||!en||!Lt||(rv(0,!1),Vt==null||Vt.update(),Pe.render(en,Lt),sv())}function rC(){if(!Ht||!xn.length)return;const n=Ht.geometry.getAttribute("position");for(let e=0;e<xn.length;e++)n.setXYZ(e,Tt[e*3],Tt[e*3+1],Tt[e*3+2]);n.needsUpdate=!0}function rv(n,e){var a,l,c;if(!Ht||!xn.length)return;const t=Ht.geometry.getAttribute("position"),i=Ht.geometry.getAttribute("color"),r=new Float32Array(xn.length),s=new Float32Array(xn.length),o=new Float32Array(xn.length);for(let u=0;u<xn.length;u++){const d=xn[u];let h=Tt[u*3],f=Tt[u*3+1],p=Tt[u*3+2];if(e){const v=Fl(d),{dx:E,dy:x}=Tg(v,n),w=(Math.imul(v,2654435769)>>>0&65535)*(Math.PI*2/65535);h+=E,f+=x,p+=Math.sin(n*.5+w)*.015+Math.sin(n*.3+w+.8)*.01}r[u]=h,s[u]=f,o[u]=p,t.setXYZ(u,h,f,p);const[_,g,m]=F1(u,d,n,Fr,di,$l);i.setXYZ(u,_,g,m)}if(t.needsUpdate=!0,i.needsUpdate=!0,O1(r,s,o),Y1(r,s,o,n,e),Lt&&Jt){for(const[u,d]of gr)di.selectedIds.has(u)||(d.remove(),gr.delete(u));for(const u of di.selectedIds){const d=xn.indexOf(u);if(d<0)continue;if(di.hoverNodeId===u){const p=gr.get(u);p&&(p.style.display="none");continue}const h=jr(r[d],s[d],o[d]);let f=gr.get(u);f||(f=jp(),Jt.appendChild(f),gr.set(u,f)),h?(f.dataset.id!==u&&(f.textContent=((a=ut.value.byId.get(u))==null?void 0:a.label)??u,f.dataset.id=u),f.style.left=`${h.x+8}px`,f.style.top=`${h.y-28}px`,f.style.display="block"):f.style.display="none"}}if(Lt&&Jt)if(pn&&di.selectedIds.has("probe")&&di.hoverNodeId!=="probe"){Tn||(Tn=jp(),Jt.appendChild(Tn));const u=pn.position,d=jr(u.x,u.y,u.z);if(d){const h=((l=ke.value)==null?void 0:l.operation)==="latent_probe"?(c=ke.value)==null?void 0:c.text_reconstruction:void 0;Tn.textContent=(h==null?void 0:h.text)??"Latent Space Probe",Tn.style.left=`${d.x+8}px`,Tn.style.top=`${d.y-28}px`,Tn.style.display="block"}else Tn.style.display="none"}else Tn&&(Tn.style.display="none");B1()}function jp(){return hh({textColor:"#facc15",borderColor:"rgba(250,204,21,0.6)",shadowColor:"rgba(250,204,21,0.2)",shadowBlur:6,zIndex:9,truncate:!0})}function hh(n){const e=document.createElement("div"),t=n.initiallyHidden===!1?"":"display:none;",i=n.truncate?"max-width:300px;overflow:hidden;text-overflow:ellipsis;":"";return e.style.cssText=`position:absolute;pointer-events:none;${t}background:#0f1a28;color:${n.textColor??"#e8f0f8"};border:1.5px solid ${n.borderColor};border-radius:4px;padding:3px 8px;font:11px ui-monospace,monospace;white-space:nowrap;${i}box-shadow:0 0 ${n.shadowBlur??8}px ${n.shadowColor};z-index:${n.zIndex??10};`,e}function sv(){var s,o;if(!Nr)return;const n=Nr.getContext("2d");if(!n)return;const e=Nr.offsetWidth,t=Nr.offsetHeight;if(Nr.width=e,Nr.height=t,n.clearRect(0,0,e,t),!Lt||!xn.length)return;const i=new N,r=Ht==null?void 0:Ht.geometry.getAttribute("position");if(Hr.value){const a=ut.value.points,l=new Map;for(const c of a){const u=(s=c.metadata)==null?void 0:s.cluster_global;if(u==null||(o=c.metadata)!=null&&o.is_noise)continue;const d=xn.indexOf(String(c.id));if(d<0)continue;r?i.set(r.getX(d),r.getY(d),r.getZ(d)):i.set(Tt[d*3],Tt[d*3+1],Tt[d*3+2]),i.project(Lt);const h=(i.x+1)/2*e,f=(1-i.y)/2*t,p=String(u),_=l.get(p)??[];_.push({x:h,y:f}),l.set(p,_)}Cg(n,l)}}const sC=Object.freeze(Object.defineProperty({__proto__:null,addOverlayEdges:tC,applySigmaViewport:eC,createLabelDiv:hh,destroyRenderer:uh,fitCamera:Q_,getBasePositions:js,getCamera3D:Ho,getCameraState:Q1,getContainer3D:ch,getControls:Xl,getNodeIds:qi,getPointCloud:jl,getProbeSphere3D:Yl,getScene:qr,getSelectedLabelDivs:q_,getThreeRenderer:Vo,highlightGhostStep:nC,initRenderer:K_,projectToScreen:jr,pulseIds:ev,pulseOperationResult:iC,resizeRenderer:pd,setHullCanvas:tv,sigmaRefresh:J1},Symbol.toStringTag,{value:"Module"})),ei=st([]),un=st(""),fh=ti(()=>ei.value.find(n=>n.session_id===un.value)??null),ov=st(null),av=st(""),oC=ti(()=>av.value===un.value?ov.value:null);let mo=0;Iy(()=>void uC());Uy(Uo);async function lv(n={}){const e=dC(),t=await Vv(e);ei.value=t.sessions??[];const i=un.value;ei.value.length?ei.value.some(r=>r.session_id===i)||(un.value=ei.value[0].session_id):un.value="",n.log!==!1&&Cl({event_type:"ui_action",node_name:"NELS Graph Panel",message:`Synced ${e.length} NELS Session node(s)`,status:"completed"})}async function cv(){Ot("syncing sessions");try{await lv(),un.value?await uv():(Pl(null,{acceptCoordinates:!0}),Ot("no active sessions"))}catch(n){Ot(`session sync error: ${n.message}`)}}async function uv(){var n;if(un.value){Ot("loading session");try{const e=await Wv(un.value);ph(e);const t=e.graph_snapshot??null;Pl(t,{acceptCoordinates:!0}),Rl(e.operation_result??null),mh(e.ui_state??{},{skipViewport:!1}),mo=Math.max(0,...(e.events??[]).map(r=>r.sequence??0)),qv();const i=Number(((n=e.ui_state)==null?void 0:n.state_revision)??0);for(const r of e.events??[])Cl(r,i);Ot(t?"ready":"no snapshot loaded",{priority:!1})}catch(e){Ot(`session load error: ${e.message}`)}}}async function aC(){var n,e,t;Ot("refreshing");try{await lv({log:!1})}catch(i){Ot(`session sync error: ${i.message}`);return}if(!un.value){Ot("select a session first");return}Ot("refreshing preview");try{const i=await Xv(un.value);i.session&&ph(i.session),ov.value=i.embedding_meta??null,av.value=un.value,Pl(i.graph_snapshot,{acceptCoordinates:!0,forceCoordinates:!0}),mh(((n=i.session)==null?void 0:n.ui_state)??{},{skipViewport:!1});const r=((t=(e=i.graph_snapshot)==null?void 0:e.points)==null?void 0:t.length)??0;Cl({event_type:"ui_action",node_name:"NELS Graph Panel",message:`Refreshed graph preview with ${r} points`,status:"completed"}),Ot("preview refreshed")}catch(i){Ot(`preview error: ${i.message}`)}}function lC(n){var t,i,r;if(!(n!=null&&n.session_id))return;if(n.session_id!==un.value){cv();return}mo=Math.max(mo,Number(n.sequence??0));const e=Number(((i=(t=fh.value)==null?void 0:t.ui_state)==null?void 0:i.state_revision)??0);if(Cl(n,e),n.event_type==="ui_state_updated"){const s=Number(n.state_revision??0);if(!(e>0&&s>0&&s<e)){const a=n.payload??{};mh(a,{skipViewport:!0})}}if(n.event_type==="source_snapshot"){const s=n.payload;s&&Jv(s,Fo.value,ut.value)&&(Pl(s,{acceptCoordinates:!0,forceCoordinates:!0}),Uo().pulseIds((s.points??[]).map(a=>String(a.id))))}if(n.event_type==="operation_started"){const s=((r=n.payload)==null?void 0:r.operation)??"operation";Ia(null),xo.value=!0,Vh(),Ot(`running ${s}…`,{priority:!0});return}if(n.event_type==="recon_iteration"){const s=n.payload??{};Ia({step:Number(s.step??0),maxStep:Number(s.max_step??0),bestText:String(s.best_text??""),cosine_sim:Number(s.cosine_sim??0)}),Vh(),Ot(`reconstructing step ${s.step??"?"}/${s.max_step??"?"}…`,{priority:!0});return}if(n.event_type==="operation_result"){Ia(null),xo.value=!1,au(),Ot(`event operation_result #${mo}`,{priority:!0});const s=n.payload??null;if(Rl(s),(s==null?void 0:s.operation)==="latent_probe"){const a=s.inverse_project??[],l=qe.value,c=ut.value;if(a.length>0&&l.probe_coords){const u=l.probe_mode==="2d"?"coords_3d":"coords_2d",d=l.probe_mode==="2d"?3:2,h=new Array(d).fill(0);let f=0;for(const p of a){const _=c.byId.get(String(p.id)),g=(_==null?void 0:_[u])??(_==null?void 0:_.view_coords);if(!g||g.length<d)continue;const m=p.score??1;for(let v=0;v<d;v++)h[v]+=g[v]*m;f+=m}if(f>0){let p=h.map(_=>_/f);if(l.probe_mode==="3d"&&p.length>=2){const[_,g]=uy(p[0],p[1]);p=[_,g]}Ut({probe_cross_coords:p})}}}const o=Uo();o.addOverlayEdges(),o.pulseOperationResult(s),o.sigmaRefresh();return}if(n.event_type==="operation_failed"){xo.value=!1,au(),Ot(n.message??"operation failed",{priority:!0});return}if(n.event_type==="computing_projection"){Ot(n.message??"computing projections...");return}Ot(`event ${n.event_type??"event"} #${mo}`)}function cC(n){tu.addEventListener("nels.session_event",e=>lC(e.detail??{}),{signal:n}),tu.addEventListener("execution_error",()=>{xo.value=!1,au(),Ia(null),Ot("execution error",{priority:!0})},{signal:n})}function Uo(){return ii.value==="3d"?sC:Ky}async function uC(){var t;if(!un.value)return;const n=qe.value,e={selected_point_ids:[...Et.value],operation:n.operation,neighbor_count:Math.max(1,n.neighbor_count),alpha_schedule:n.alpha_schedule,nearest_sample:n.nearest_sample,variant_count:n.variant_count,variation_strength:n.variation_strength,axis_group_a:n.axis_group_a,axis_group_b:n.axis_group_b,probe_coords:n.probe_coords??null,probe_mode:n.probe_mode,probe_text_recon:n.probe_text_recon,probe_recon_max_minutes:n.probe_recon_max_minutes,probe_recon_max_iter:n.probe_recon_max_iter,probe_seed_count:n.probe_seed_count,probe_noise_count:n.probe_noise_count,probe_negative_count:n.probe_negative_count,...ii.value==="2d"?{viewport:Uo().getCameraState()}:{}};try{const i=await $v(un.value,e);i.session&&ph(i.session),Ot(`state revision ${((t=i.ui_state)==null?void 0:t.state_revision)??"-"}`,{priority:!1})}catch(i){Ot(`state sync error: ${i.message}`)}}function ph(n){const e=ei.value.some(t=>t.session_id===n.session_id);ei.value=e?ei.value.map(t=>t.session_id===n.session_id?n:t):[...ei.value,n]}function mh(n,e){const t=(n.selected_point_ids??[]).map(String),i=ut.value.byId.size>0?new Set(ut.value.byId.keys()):void 0;if(Zv(t,i),Ut({operation:String(n.operation??qe.value.operation),neighbor_count:Number(n.neighbor_count??qe.value.neighbor_count),alpha_schedule:Array.isArray(n.alpha_schedule)?n.alpha_schedule.map(Number):qe.value.alpha_schedule,nearest_sample:!!(n.nearest_sample??qe.value.nearest_sample),variant_count:n.variant_count!=null?Math.max(1,Number(n.variant_count)):qe.value.variant_count,variation_strength:n.variation_strength!=null?Math.max(0,Math.min(1,Number(n.variation_strength))):qe.value.variation_strength,axis_group_a:Array.isArray(n.axis_group_a)?n.axis_group_a.map(String):qe.value.axis_group_a,axis_group_b:Array.isArray(n.axis_group_b)?n.axis_group_b.map(String):qe.value.axis_group_b,probe_coords:Array.isArray(n.probe_coords)?n.probe_coords.map(Number):n.probe_coords===null?null:qe.value.probe_coords,probe_mode:n.probe_mode==="3d"||n.probe_mode==="2d"?n.probe_mode:qe.value.probe_mode,probe_text_recon:!!(n.probe_text_recon??qe.value.probe_text_recon),probe_recon_max_minutes:n.probe_recon_max_minutes!=null?Math.max(1,Number(n.probe_recon_max_minutes)):qe.value.probe_recon_max_minutes,probe_recon_max_iter:n.probe_recon_max_iter!=null?Math.max(1,Number(n.probe_recon_max_iter)):qe.value.probe_recon_max_iter,probe_seed_count:n.probe_seed_count!=null?Math.max(1,Number(n.probe_seed_count)):qe.value.probe_seed_count,probe_noise_count:n.probe_noise_count!=null?Math.max(0,Number(n.probe_noise_count)):qe.value.probe_noise_count,probe_negative_count:n.probe_negative_count!=null?Math.max(0,Number(n.probe_negative_count)):qe.value.probe_negative_count}),!e.skipViewport&&ii.value==="2d"){const r=n.viewport;r&&typeof r=="object"&&Uo().applySigmaViewport(r)}}function dC(){var e;return(((e=_r.graph)==null?void 0:e._nodes)??[]).filter(pC).map(t=>({session_node_id:String(t.id),session_label:String(ps(t,"session_label","default")??"default"),source_config:hC(t)}))}function hC(n){const e=fC(n);return dv(e)==="nels_DatasetLoader"?{dataset_path:String(ps(e,"dataset_path","")??""),load_mode:String(ps(e,"load_mode","first_n")??"first_n"),count:Number(ps(e,"count",1e3)??1e3),window_start:Number(ps(e,"window_start",0)??0),random_seed:Number(ps(e,"random_seed",42)??42)}:{}}function fC(n){var s,o,a,l;const e=(o=(s=n==null?void 0:n.inputs)==null?void 0:s.find(c=>c.name==="embedding_set"))==null?void 0:o.link;if(e==null||!((a=_r.graph)!=null&&a.links))return null;const t=_r.graph.links[e]??_r.graph.links[String(e)],i=t==null?void 0:t.origin_id;return(((l=_r.graph)==null?void 0:l._nodes)??[]).find(c=>String(c.id)===String(i))??null}function pC(n){return dv(n)==="nels_Session"||n.title==="NELS Session"}function dv(n){var e;if(n)return n.comfyClass??n.type??((e=n.properties)==null?void 0:e["Node name for S&R"])}function ps(n,e,t){var i,r;return((r=(i=n==null?void 0:n.widgets)==null?void 0:i.find(s=>s.name===e))==null?void 0:r.value)??t}async function mC(){const n=ii.value,e=n==="3d"?_C():await gC(),t=vC(),i=xC(e,t,fh.value,ke.value,n),r=new Date().toISOString().slice(0,19).replace(/:/g,"-");bC(`nels-snapshot-${r}.html`,i)}function gC(){const n=ur();return n&&n.refresh(),new Promise(e=>{requestAnimationFrame(()=>{const t=document.querySelector(".nels-sigma-container");if(!t){e(null);return}const i=Array.from(t.querySelectorAll("canvas"));if(!i.length){e(null);return}const r=i[0],s=r.width||t.clientWidth,o=r.height||t.clientHeight;if(!s||!o){e(null);return}const a=document.createElement("canvas");a.width=s,a.height=o;const l=a.getContext("2d");l.fillStyle="#05090f",l.fillRect(0,0,s,o);const c=i.slice(0,-1);for(const u of c)try{l.drawImage(u,0,0)}catch{}e(a.toDataURL("image/png"))})})}function _C(){const n=document.querySelector(".nels-sigma-container");if(!n)return null;const e=n.querySelector("canvas");if(!e)return null;try{return e.toDataURL("image/png")}catch{return null}}function vC(){return[...gg(ut.value.points).entries()].map(([e,{count:t,sample:i,ids:r}])=>({cluster_id:e,color_hex:Vs(e),point_count:t,sample_label:i,point_ids:r})).sort((e,t)=>Number(e.cluster_id)-Number(t.cluster_id))}function ci(n){return n.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;")}function ar(n,e){return`<tr><td class="k">${ci(n)}</td><td>${ci(e)}</td></tr>`}function xC(n,e,t,i,r){var v;const s=new Date().toLocaleString(),o=(t==null?void 0:t.label)??(t==null?void 0:t.session_id)??"—",a=(t==null?void 0:t.source_config)??{},l=ut.value.points.length,c=r==="3d"?"3d_umap":"2d_umap",u=i==null?void 0:i.trajectory,d=!!(i!=null&&i.operation)&&i.operation!=="inspect",h=n?`<img src="${n}" alt="NELS Graph"/>`:"",f=`<h2>Session</h2>
<table>
${ar("session",o)}
${ar("dataset",String(a.dataset_path??"—"))}
${ar("points",String(l))}
${ar("projection",c)}
${ar("view",r.toUpperCase())}
</table>`,p=e.length>0?`<h2>Cluster Legend</h2>
<table class="ctable">
<thead><tr><th>Cluster</th><th>Points</th><th>Example</th><th>Point IDs</th></tr></thead>
<tbody>
${e.map(E=>`<tr><td><span class="dot" style="background:${ci(E.color_hex)}"></span> ${ci(E.cluster_id)}</td><td class="num">${E.point_count}</td><td class="sample">${E.sample_label?ci(E.sample_label):"—"}</td><td class="ids">${ci(E.point_ids.join(", "))}</td></tr>`).join(`
`)}
</tbody></table>`:"";let _="";if(d){const E=[ar("operation",i.operation)];(v=i.source_point_ids)!=null&&v.length&&E.push(ar("source points",i.source_point_ids.join(", "))),u!=null&&u.length&&E.push(ar("steps",String(u.length))),_=`
<h2>Operation</h2>
<table>
${E.join(`
`)}
</table>`}let g="";if(u!=null&&u.length){const E=u.map(x=>{var w,S;return{alpha:x.alpha,dist:(S=(w=x.nearest_top_k)==null?void 0:w[0])==null?void 0:S.distance}}).filter(x=>x.dist!==void 0);E.length>0&&(g=`
<h2>Nearest Dataset Distance per Step</h2>
<ul class="dist">
${E.map(w=>`<li>α=${w.alpha.toFixed(3)} → ${w.dist.toFixed(4)}</li>`).join(`
`)}
</ul>`)}const m=`<div class="viewport-row">${h}<div>${p}</div></div>`;return`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>NELS Snapshot — ${ci(s)}</title>
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      background: #05090f; color: #c8dae8;
      font: 13px/1.6 ui-monospace, SFMono-Regular, Consolas, monospace;
      padding: 28px; max-width: 1100px;
    }
    .viewport-row {
      display: grid;
      grid-template-columns: auto 1fr;
      gap: 28px;
      align-items: start;
      margin-bottom: 4px;
    }
    .viewport-row img { max-width: 640px; }
    h1  { font-size: 1.1em; color: #e8f0f8; margin-bottom: 4px; }
    h2  { font-size: .78em; color: #7daacc; text-transform: uppercase; letter-spacing: .1em; margin: 22px 0 7px; }
    p.meta { color: #64849a; font-size: .85em; margin-bottom: 20px; }

    img { display: block; max-width: 100%; border-radius: 4px; border: 1px solid #1a2a3a; }

    table { border-collapse: collapse; width: 100%; max-width: 560px; margin-bottom: 4px; }
    td   { padding: 3px 8px 3px 0; vertical-align: top; color: #9aaabb; }
    td.k { color: #64849a; white-space: nowrap; width: 160px; }

    .dot { display: inline-block; width: 10px; height: 10px; border-radius: 50%; flex-shrink: 0; vertical-align: middle; margin-right: 5px; }

    table.ctable { width: 100%; }
    table.ctable th {
      text-align: left; color: #64849a; font-weight: normal;
      padding: 4px 12px 4px 0; border-bottom: 1px solid #1a2a3a;
      font-size: .82em; text-transform: uppercase; letter-spacing: .06em; white-space: nowrap;
    }
    table.ctable th:nth-child(2) { text-align: right; width: 1px; }
    table.ctable td { padding: 4px 12px 4px 0; border-bottom: 1px solid #111d2a; vertical-align: top; word-break: break-word; }
    table.ctable td:first-child { white-space: nowrap; }
    table.ctable td.num    { text-align: right; white-space: nowrap; width: 1px; }
    table.ctable td.sample { width: 30%; color: #8aaabb; font-style: italic; }
    table.ctable td.ids    { font-size: .78em; color: #64849a; line-height: 1.7; }

    ul.dist    { list-style: none; padding: 0; columns: 3; column-gap: 20px; max-width: 560px; }
    ul.dist li { color: #9aaabb; font-size: .82em; padding: 1px 0; }
  </style>
</head>
<body>
  <h1>NELS Graph Snapshot</h1>
  <p class="meta">${ci(s)} · ${ci(o)} · ${l} points · ${ci(r.toUpperCase())}</p>
  ${m}
  ${f}${_}${g}
</body>
</html>`}function bC(n,e){const t=new Blob([e],{type:"text/html;charset=utf-8"}),i=URL.createObjectURL(t),r=document.createElement("a");r.href=i,r.download=n,r.click(),URL.revokeObjectURL(i)}const gh=st(!1),Sl=st(null);let To=null;function yC(){var i;wC();const n=ii.value==="3d",e=gh.value,t=((i=Sl.value)==null?void 0:i.split("/").pop())??"LLM";return A("div",{class:"nels-panel-header",children:[A("div",{children:[A("strong",{children:"NELS Graph Panel"}),A("span",{children:Ed.value})]}),A("div",{class:"nels-panel-actions",children:[A("div",{class:"nels-session-ctrl",children:[A("select",{value:un.value,onChange:SC,children:ei.value.length===0?A("option",{value:"",children:"no active sessions"}):ei.value.map(r=>A("option",{value:r.session_id,children:r.label||r.session_id},r.session_id))}),A("button",{class:"nels-icon-btn",onClick:()=>void EC(),title:"Refresh sessions & graph",children:"↺"})]}),A("div",{class:"nels-tab-group",children:[A("button",{class:`nels-tab-btn${n?"":" active"}`,onClick:()=>Xh("2d"),children:"2D"}),A("button",{class:`nels-tab-btn${n?" active":""}`,onClick:()=>Xh("3d"),children:"3D"})]}),A("div",{class:"nels-switch",role:"switch","aria-checked":Li.value,title:"Node positions drift slightly when animated — disable for accurate reading",onClick:()=>{Li.value=!Li.value},children:[A("span",{class:`nels-switch-label${Li.value?" active":""}`,children:"Animate"}),A("div",{class:`nels-switch-track${Li.value?" on":""}`,children:A("div",{class:"nels-switch-thumb"})})]}),A("button",{class:`nels-llm-chip${e?" loaded":""}`,title:e?`${Sl.value??"LLM"} loaded — click to unload and free memory`:"LLM not loaded — loads automatically when needed",onClick:e?()=>void MC():void 0,children:e?`${t} ✕`:"LLM"}),A("button",{disabled:ut.value.points.length===0,onClick:mC,children:"Export"})]})]})}function SC(n){un.value=n.target.value,uv()}async function EC(){await cv(),aC()}async function Yp(){try{const n=await jv();gh.value=n.loaded,Sl.value=n.model_id}catch{}}async function MC(){try{await Yv(),gh.value=!1,Sl.value=null}catch{}}function wC(){To||(Yp(),To=setInterval(()=>void Yp(),1e4))}function TC(){To&&(clearInterval(To),To=null)}function AC(){var r;const n=fh.value,e=oC.value,t=((r=n==null?void 0:n.ui_state)==null?void 0:r.state_revision)??"-",i=[];return n?(i.push(["session",n.session_id]),i.push(["session node",n.session_node_id??"-"]),e!=null&&e.dataset_name&&i.push(["dataset",e.dataset_name]),e!=null&&e.source_dataset&&i.push(["source",e.source_dataset]),e!=null&&e.encoder&&i.push(["encoder",e.encoder]),(e==null?void 0:e.sample_count)!=null&&i.push(["samples",String(e.sample_count)]),(e==null?void 0:e.embedding_dim)!=null&&i.push(["dim",String(e.embedding_dim)]),i.push(["points",String(ut.value.points.length)]),i.push(["revision",String(t)]),i.push(["selected",String(Et.value.size)])):i.push(["Status","No active session"]),A("details",{class:"nels-panel-card",children:[A("summary",{children:"Session"}),A("dl",{children:i.map(([s,o])=>A(Cn,{children:[A("dt",{children:s}),A("dd",{children:o})]},s))})]})}const CC={inspect:"Inspect",nearest_neighbor:"Nearest Neighbor",lerp:"Linear Interpolation (LERP)",slerp:"Spherical Interpolation (SLERP)",delta_walk:"Direction Walk",axis_projection:"Semantic Axis Projection",consistency_check:"Semantic Consistency Check",latent_probe:"Latent Space Probe"},Qc={inspect:"View details of selected points. No computation.",lerp:"Linearly interpolate between two selected points along the alpha schedule.",slerp:"Spherically interpolate between two points along the embedding hypersphere — preserves norm.",delta_walk:"Select A (direction from), B (direction to), C (walk start) — extracts A→B direction and walks from C. Supports extrapolation (alpha < 0 or > 1).",axis_projection:"Project all dataset points onto the semantic axis A→B. The axis direction is computed from the centroid of Group A vs Group B. Points are colored blue (A-side) to red (B-side).",consistency_check:"Select 1 seed point and run to test if text variants land close together in embedding space. Ghost nodes appear at variant positions. Lower SC score = tighter semantic cluster.",latent_probe:"Click anywhere in the graph to probe that position in latent space. The node finds the nearest real prompts and can optionally reconstruct text via iterative inversion (Vec2Text)."},RC=[["3 Steps",[0,.5,1]],["5 Steps",[0,.25,.5,.75,1]],["10 Steps",[0,.1,.2,.3,.4,.5,.6,.7,.8,.9,1]]],PC=[["Negative",[-2,-1.5,-1,-.5,0]],["Forward",[0,.5,1,1.5,2,2.5,3,3.5,4]],["Full",[-2,-1.5,-1,-.5,0,.5,1,1.5,2,2.5,3,3.5,4]]];function LC(){var f,p,_,g,m,v,E;const n=qe.value,e=Et.value.size,t=IC(n.operation,e),i=n.operation==="delta_walk",r=i?-2:0,s=i?4:1,o=ho(n.alpha_schedule,r,s),a=i?PC:RC;function l(x){Ut({alpha_schedule:x}),rt()}function c(x,w){const S=ho(qe.peek().alpha_schedule,r,s);S[x]=w,Ut({alpha_schedule:S}),rt()}function u(){const x=ho(qe.peek().alpha_schedule,r,s);x.sort((w,S)=>w-S),Ut({alpha_schedule:x}),rt()}function d(x){const w=ho(qe.peek().alpha_schedule,r,s);w.splice(x,1),Ut({alpha_schedule:w}),rt()}function h(){const x=ho(qe.peek().alpha_schedule,r,s),w=x.length?x[x.length-1]:0,S=parseFloat(Math.min(s,w+.1).toFixed(2));x.push(S),x.sort((C,b)=>C-b),Ut({alpha_schedule:x}),rt()}return A("details",{class:"nels-panel-card",open:!0,children:[A("summary",{children:"Operation"}),A("div",{class:"nels-panel-controls",children:[A("div",{class:"nels-panel-row",children:[A("button",{onClick:()=>{Td(),Rl(null),Ut({axis_group_a:[],axis_group_b:[],probe_coords:null,probe_cross_coords:null,probe_place_mode:!1}),rt()},children:"Clear"}),A("button",{onClick:()=>{ii.peek()==="3d"?Q_():qg(),rt()},children:"Fit"})]}),A("label",{class:"nels-op-select-label",children:[A("span",{children:"operation"}),A("select",{value:n.operation,onChange:Gr("operation",String),children:Object.entries(CC).map(([x,w])=>A("option",{value:x,children:w},x))})]}),n.operation==="nearest_neighbor"?A("div",{class:"nels-op-description",children:UC()}):n.operation==="axis_projection"?A("div",{class:"nels-op-description",children:Di.value==="b"&&((f=ke.value)!=null&&f.axis_b_projection)?"Orthogonal axis (PCA of residuals). Points are colored green (C-side) to orange (D-side).":Qc.axis_projection}):Qc[n.operation]?A("div",{class:"nels-op-description",children:Qc[n.operation]}):null,i&&e>=3&&(()=>{const x=[...Et.value],w=ut.value.byId,S=b=>{var T;return((T=w.get(b))==null?void 0:T.label)??b};return A("div",{class:"nels-delta-roles",children:[["A","direction from"],["B","direction to"],["C","walk start"]].map(([b,T],L)=>A("div",{class:"nels-delta-role-row",children:[A("span",{class:"nels-delta-role-badge",children:b}),A("span",{class:"nels-delta-role-label",title:S(x[L]),children:[S(x[L]).slice(0,40),S(x[L]).length>40?"…":""]}),A("span",{class:"nels-delta-role-desc",children:T})]},b))})})(),n.operation==="nearest_neighbor"&&A("label",{children:[A("span",{children:"neighbors"}),A("input",{type:"number",min:1,max:128,step:1,value:n.neighbor_count,onChange:Gr("neighbor_count",Number)})]}),(n.operation==="lerp"||n.operation==="slerp"||n.operation==="delta_walk"||n.operation==="axis_projection")&&A("div",{class:"nels-alpha-section",children:[A("span",{class:"nels-alpha-label",children:"alpha schedule"}),A("span",{class:"nels-alpha-info",children:n.operation==="axis_projection"?"Interpolation steps along each axis. 0 = A/C-side centroid, 1 = B/D-side centroid. Each step produces one image per axis.":"Defines the interpolation steps (0 = start, 1 = end). Each value produces one output point along the operation path."}),A("div",{class:"nels-alpha-presets",children:[a.map(([x,w])=>A("button",{class:"nels-alpha-preset-btn",onClick:()=>l(w),children:x},x)),A("button",{class:"nels-alpha-preset-btn nels-alpha-sort-btn",onClick:u,children:"Sort ↑"})]}),A("div",{class:"nels-alpha-list",children:o.map((x,w)=>A("div",{class:"nels-alpha-row",children:[A("span",{class:"nels-alpha-val",children:x.toFixed(2)}),A("input",{type:"range",class:"nels-alpha-slider",style:`--val: ${((x-r)/(s-r)*100).toFixed(1)}%`,min:r,max:s,step:"0.05",value:x,onInput:S=>c(w,parseFloat(S.target.value))}),A("button",{class:"nels-alpha-remove",onClick:()=>d(w),children:"×"})]},w))}),A("button",{class:"nels-alpha-add",onClick:h,children:"+ Add Alpha Value"})]}),(n.operation==="lerp"||n.operation==="slerp"||n.operation==="delta_walk")&&A("label",{children:[A("span",{children:"nearest prompts"}),A("input",{type:"checkbox",checked:n.nearest_sample,onChange:x=>{Ut({nearest_sample:x.target.checked}),rt()}})]}),n.operation==="consistency_check"&&A(Cn,{children:[A("label",{children:[A("span",{children:"variants (3–20)"}),A("input",{type:"number",min:3,max:20,step:1,value:n.variant_count,onChange:Gr("variant_count",Number)})]}),A("label",{children:[A("span",{children:"variation strength"}),A("div",{class:"nels-strength-row",children:[A("input",{type:"range",class:"nels-alpha-slider",style:`--val: ${(n.variation_strength*100).toFixed(1)}%`,min:"0",max:"1",step:"0.05",value:n.variation_strength,onInput:x=>{Ut({variation_strength:parseFloat(x.target.value)}),rt()}}),A("span",{class:"nels-alpha-val",children:n.variation_strength.toFixed(2)})]})]}),A("span",{class:"nels-alpha-info",children:"How much each variant differs from the seed. Low (<0.35) = word dropout only (safe, stays in same cluster). High (0.7–1.0) = LLM paraphrase, aggressive rewording."})]}),n.operation==="axis_projection"&&A(Cn,{children:[A("div",{class:"nels-axis-groups",children:[A(qp,{label:"A",groupKey:"axis_group_a",otherKey:"axis_group_b"}),A(qp,{label:"B",groupKey:"axis_group_b",otherKey:"axis_group_a"})]}),(n.axis_group_a.length===0||n.axis_group_b.length===0)&&A("div",{class:"nels-sel-hint",children:"Add at least 1 point to each group to run"}),(p=ke.value)!=null&&p.axis_b_projection?A("div",{class:"nels-axis-mode-toggle",children:[A("button",{class:Di.value==="a"?"active":"",onClick:()=>{Di.value="a"},children:"Axis 1"}),A("button",{class:Di.value==="b"?"active":"",onClick:()=>{Di.value="b"},children:"Axis 2"})]}):((_=ke.value)==null?void 0:_.operation)==="axis_projection"&&A("div",{class:"nels-axis-no-b",children:["No axis 2 available",ke.value.axis_b_variance!=null?` — after subtracting each point's A→B projection (residuals), PCA on those residuals found no strong independent direction: the top component explains only ${(ke.value.axis_b_variance*100).toFixed(1)}% of residual variance (min. 10%). The dataset's semantic structure is mostly one-dimensional along your A→B axis.`:" — no independent orthogonal direction found in the residuals."]}),A("div",{class:"nels-alpha-info",style:"margin-top:4px",children:[`Trajectory: ${o.length} step${o.length!==1?"s":""} × `,(g=ke.value)!=null&&g.axis_b_projection?"2 axes":"1 axis",` = ${o.length*((m=ke.value)!=null&&m.axis_b_projection?2:1)} image${o.length*((v=ke.value)!=null&&v.axis_b_projection?2:1)!==1?"s":""}`,(E=ke.value)!=null&&E.axis_b_projection?" — Axis 1 then Axis 2":""]})]}),n.operation==="latent_probe"&&A(DC,{cfg:n}),t&&A("div",{class:"nels-sel-hint",children:t}),A("details",{class:"nels-selection-help",children:[A("summary",{children:"Selection controls"}),A("div",{class:"nels-alpha-info",style:"margin-top:4px",children:[A("strong",{children:"click"})," — select one point (clears previous)",A("br",{}),A("strong",{children:"ctrl+click"})," — add / remove a point",A("br",{}),A("strong",{children:"shift+drag"})," — area select (replaces selection)",A("br",{}),A("strong",{children:"click empty space"})," — clear selection"]})]})]})]})}function qp({label:n,groupKey:e,otherKey:t}){const i=qe.value,r=Et.value.size,s=i[e];function o(){const l=new Set(Et.value),c=[...new Set([...s,...Et.value])],u=i[t].filter(d=>!l.has(d));Ut({[e]:c,[t]:u}),rt()}function a(){Ut({[e]:[]}),rt()}return A("div",{class:`nels-axis-group nels-axis-group-${n.toLowerCase()}`,children:[A("div",{class:"nels-axis-group-header",children:[A("span",{class:"nels-axis-group-label",children:["Group ",n]}),A("div",{class:"nels-axis-group-actions",children:[A("button",{disabled:r===0,onClick:o,children:"+ Add selected"}),A("button",{class:"nels-axis-group-clear",disabled:s.length===0,onClick:a,children:"Clear"})]})]}),s.length===0?A("span",{class:"nels-axis-group-empty",children:"No points — select and click Add"}):A("span",{class:"nels-axis-group-count",children:[s.length," point",s.length!==1?"s":""]})]})}function DC({cfg:n}){const e=n.probe_coords!=null,t=n.probe_coords;return A(Cn,{children:[A("div",{class:"nels-panel-row",style:"gap:6px;flex-wrap:wrap",children:[A("button",{class:`nels-toggle-overlay${n.probe_place_mode?" active":""}`,onClick:()=>{Ut({probe_place_mode:!n.probe_place_mode}),rt()},children:n.probe_place_mode?"Placing probe…":"Place probe"}),e&&A("button",{onClick:()=>{Ut({probe_coords:null,probe_cross_coords:null}),Rl(null),rt()},children:"Clear probe"})]}),n.probe_place_mode&&A("div",{class:"nels-alpha-info",children:"Click on empty space in the graph to set a probe point. Works in both 2D and 3D view."}),e&&t&&A(NC,{coords:t,mode:n.probe_mode}),!e&&!n.probe_place_mode&&A("div",{class:"nels-sel-hint",children:'No probe set — click "Place probe" then click the canvas'}),A("label",{children:[A("span",{children:"text reconstruction"}),A("input",{type:"checkbox",checked:n.probe_text_recon,onChange:i=>{Ut({probe_text_recon:i.target.checked}),rt()}})]}),n.probe_text_recon&&A(Cn,{children:[A("div",{class:"nels-alpha-info",children:"Requires CLIP connected to the node. Iteratively inverts the estimated embedding toward a text prompt (Vec2Text approach)."}),A("label",{children:[A("span",{children:"max time"}),A("div",{class:"nels-strength-row",children:[A("input",{type:"range",class:"nels-alpha-slider",style:`--val: ${((n.probe_recon_max_minutes-1)/59*100).toFixed(1)}%`,min:1,max:60,step:1,value:n.probe_recon_max_minutes,onInput:i=>{Ut({probe_recon_max_minutes:parseInt(i.target.value)}),rt()}}),A("span",{class:"nels-alpha-val",style:"width:42px",children:[n.probe_recon_max_minutes," min"]})]})]}),A("label",{children:[A("span",{children:"max iterations"}),A("input",{type:"number",min:1,step:1,value:n.probe_recon_max_iter,onChange:Gr("probe_recon_max_iter",Number)})]}),A("label",{children:[A("span",{children:"seed count"}),A("input",{type:"number",min:1,step:1,value:n.probe_seed_count,onChange:Gr("probe_seed_count",Number)})]}),A("label",{children:[A("span",{children:"noise count"}),A("input",{type:"number",min:0,step:1,value:n.probe_noise_count,onChange:Gr("probe_noise_count",Number)})]}),A("label",{children:[A("span",{children:"negative count"}),A("input",{type:"number",min:0,step:1,value:n.probe_negative_count,onChange:Gr("probe_negative_count",Number)})]}),A("div",{class:"nels-alpha-info",children:"Seeds: nearest real prompts fed to the LLM as positives. Noise: random mid-range prompts for diversity. Negatives: most dissimilar prompts to steer away from."})]}),e&&A("div",{class:"nels-sel-hint",style:"color:#22c55e",children:"Probe set — queue the node to run the lookup"})]})}function NC({coords:n,mode:e}){const t=e==="3d"?["x","y","z"]:["x","y"],[i,r]=Pv(t.map((o,a)=>(n[a]??0).toFixed(3)));Rs(()=>{r(t.map((o,a)=>(n[a]??0).toFixed(3)))},[n]);function s(o){const a=o.map(l=>parseFloat(l));a.some(l=>!Number.isFinite(l))||(Ut({probe_coords:a}),rt())}return A("div",{class:"nels-probe-coord-editor",children:[A("span",{class:"nels-alpha-label",children:["probe (",e,")"]}),t.map((o,a)=>A("label",{class:"nels-probe-coord-row",children:[A("span",{children:o}),A("input",{type:"number",step:"0.001",value:i[a],onInput:l=>{const c=[...i];c[a]=l.target.value,r(c)},onBlur:()=>s(i),onKeyDown:l=>{l.key==="Enter"&&s(i)}})]},o))]})}function Gr(n,e){return t=>{Ut({[n]:e(t.target.value)}),rt()}}function IC(n,e){if(n==="lerp"||n==="slerp"){if(e!==2)return`Select exactly 2 points (${e} selected)`}else if(n==="delta_walk"){if(e!==3)return`Select exactly 3 points: A (direction from), B (direction to), C (walk start) — ${e} selected`}else if(n==="consistency_check"&&e!==1)return`Select exactly 1 seed point (${e} selected)`;return null}function ho(n,e=0,t=1){return n.map(i=>Number(i)).filter(i=>Number.isFinite(i)&&i>=e&&i<=t)}function UC(){var i,r;const n=(r=(i=Fo.value)==null?void 0:i.source)==null?void 0:r.umap_params,e=n==null?void 0:n.n_neighbors,t="Find the k closest prompts to your selection in embedding space. Uses FAISS for exact kNN search.";return e==null?t:`${t} Dataset built with UMAP n_neighbors=${e} — setting k higher may return points that appear distant in the layout.`}function FC(){var f,p,_;const n=ke.value??{},e=n.trajectory,t=n.trajectory_overlay_warning,i=n.operation,r=Di.value==="b"&&!!((f=n.axis_b_projection)!=null&&f.length),s=r?n.axis_b_projection:n.axis_projection,o=r?n.axis_b_label:n.axis_label,a=o?o.split(`
`)[0].slice(0,40):void 0,l=n.inverse_project,c=n.text_reconstruction,u=n.consistency_variants,d=(p=n.neighbors)==null?void 0:p.length,h=[["operation",String(i??"-")]];return i==="nearest_neighbor"&&d!=null&&h.push(["neighbors",String(d)]),A("details",{class:"nels-panel-card",open:!0,children:[A("summary",{children:"Result"}),A("dl",{children:h.map(([g,m])=>A(Cn,{children:[A("dt",{children:g}),A("dd",{children:m})]},g))}),i==="delta_walk"&&A(VC,{result:n}),e&&e.length>0&&A(kC,{steps:e,warning:t}),i==="axis_projection"&&(((_=n.trajectory_overlay)==null?void 0:_.length)??0)>0&&A("div",{class:"nels-trajectory-lane",children:A("div",{class:"nels-trajectory-header",children:[A("span",{children:"Axis trajectory"}),A("button",{class:`nels-toggle-overlay${Gi.value?" active":""}`,onClick:()=>Tm(!Gi.value),children:Gi.value?"Highlight ON":"Highlight trajectory"})]})}),s&&s.length>0&&A(BC,{scores:s,axisLabel:a,isB:r}),A(zC,{}),l&&l.length>0&&A("div",{class:"nels-axis-lane",children:[A("div",{class:"nels-axis-header",children:"Nearest prompts at probe position"}),l.slice(0,5).map(g=>A("button",{class:"nels-nearest-sample nels-nearest-top",onClick:()=>Mr(g.id),children:[g.label.slice(0,60),g.label.length>60?"…":"",A("span",{class:"nels-nearest-dist",children:[" (",g.score.toFixed(3),")"]})]},g.id)),c&&A(Cn,{children:[A("div",{class:"nels-cc-metrics",style:"margin-top:6px",children:[A("div",{class:"nels-axis-side-label",children:"Text reconstruction"}),A("button",{class:"nels-nearest-sample nels-nearest-top",style:"margin-top:4px;font-style:italic",title:"Click to select probe position on canvas",onClick:()=>Mr("probe"),children:c.text}),A("span",{style:"font-size:10px;color:#64849a",children:["cosine sim: ",c.cosine_sim.toFixed(4)]})]}),c.initial_context&&A(GC,{ctx:c.initial_context})]})]}),u&&u.length>0&&A(HC,{result:n})]})}function OC({topK:n}){if(!(n!=null&&n.length))return A("span",{children:"—"});const e=n.slice(0,3);return A("div",{class:"nels-nearest-stack",children:e.map((t,i)=>A("button",{class:`nels-nearest-sample${i===0?" nels-nearest-top":" nels-nearest-secondary"}`,onClick:()=>Mr(t.id),title:t.label,children:[A("span",{class:"nels-nearest-dist",children:["(",t.distance.toFixed(3),")"]})," ",t.label]},t.id))})}function kC({steps:n,warning:e}){var l;const t=gi.value,i=Gi.value,r=qe.value.snap_endpoints,s=(l=ke.value)==null?void 0:l.operation,o=s==="delta_walk",a=s==="axis_projection";return A("div",{class:"nels-trajectory-lane",children:[A("div",{class:"nels-trajectory-header",children:[A("span",{children:[n.length," steps"]}),!o&&!a&&A("button",{class:`nels-toggle-overlay${r?" active":""}`,onClick:()=>Ut({snap_endpoints:!r}),children:r?"Snap ON":"Snap OFF"}),a?A("button",{class:`nels-toggle-overlay${i?" active":""}`,onClick:()=>Tm(!i),children:i?"Highlight ON":"Highlight trajectory"}):A("button",{class:`nels-toggle-overlay${t?" active":""}`,onClick:()=>Kv(!t),children:t?"Hide on canvas":"Show on canvas"})]}),e&&A("div",{class:"nels-overlay-warning",children:e}),A("div",{class:"nels-trajectory-scroll",children:A("table",{class:"nels-trajectory-table",children:[A("thead",{children:A("tr",{children:[A("th",{children:"#"}),A("th",{children:"t"}),A("th",{children:"nearest prompt"})]})}),A("tbody",{children:n.map(c=>A("tr",{children:[A("td",{children:c.index}),A("td",{children:A("button",{class:"nels-nearest-sample nels-nearest-top",style:"font-variant-numeric:tabular-nums",title:"Highlight on canvas",onClick:()=>Fy(c.id),children:c.alpha.toFixed(3)})}),A("td",{children:A(OC,{topK:c.nearest_top_k})})]},c.id))})]})})]})}function BC({scores:n,axisLabel:e,isB:t}){var p;const i=n.slice(0,5),r=n.slice(-5).reverse(),s=Math.max(...n.map(_=>Math.abs(_.projection_score)),1e-8),o=t?"#fb923c":"#ef4444",a=t?"#4ade80":"#3b82f6",l=t?"D-side (top)":"B-side (top)",c=t?"C-side (bottom)":"A-side (bottom)",u=e==null?void 0:e.split(" to "),d=(p=u==null?void 0:u[0])==null?void 0:p.trim(),h=u&&u.length>=2?u.slice(1).join(" to ").trim():void 0,f=t?"Green -> orange shows alignment with the orthogonal PCA axis (residuals of axis 1).":"Blue -> red shows alignment with the A->B direction in embedding space — not screen distance.";return A("div",{class:"nels-axis-lane",children:[A("div",{class:"nels-axis-header",children:[t?"Axis 2 (PCA)":"Axis 1",e?`: ${e}`:""," — ",n.length," points ranked"]}),A("div",{style:"font-size:10px;color:#64849a;padding:4px 0 6px;line-height:1.4",children:f}),A("div",{class:"nels-axis-col",children:[A(Kp,{label:l,sideNote:h,color:o,scores:i,maxAbs:s,buttonClass:"nels-nearest-sample nels-nearest-top"}),A(Kp,{label:c,sideNote:d,color:a,scores:r,maxAbs:s,buttonClass:"nels-nearest-sample nels-nearest-secondary"})]})]})}function Kp({label:n,sideNote:e,color:t,scores:i,maxAbs:r,buttonClass:s}){return A(Cn,{children:[A("div",{class:"nels-axis-side-label",style:`color:${t}`,children:[n,e&&A("span",{style:"color:#94a3b8;font-weight:400",children:[" (",e,")"]})]}),i.map(o=>A("button",{class:s,onClick:()=>Mr(o.id),children:[A("span",{class:"nels-axis-bar",style:`width:${(Math.abs(o.projection_score)/r*60).toFixed(1)}px;background:${t}`}),o.label.slice(0,50),o.label.length>50?"…":"",A("span",{class:"nels-nearest-dist",children:[" ","(",o.projection_score.toFixed(3),")"]})]},o.id))]})}function zC(){const n=Em.value;return n?A("div",{class:"nels-axis-lane nels-recon-live",children:[A("div",{class:"nels-axis-header",children:["Reconstructing… step ",n.step," / ",n.maxStep]}),A("div",{class:"nels-recon-live-score",children:[A("span",{children:"Score"}),A("div",{class:"nels-recon-live-bar",children:A("div",{class:"nels-recon-live-fill",style:`width:${Math.min(n.cosine_sim*100,100).toFixed(1)}%`})}),A("span",{style:"font-variant-numeric:tabular-nums",children:n.cosine_sim.toFixed(4)})]}),A("div",{class:"nels-recon-live-text",children:[n.bestText.slice(0,120),n.bestText.length>120?"…":""]})]}):null}function eu({title:n,items:e,color:t}){return e.length?A("details",{class:"nels-ctx-group",children:[A("summary",{children:[n," (",e.length,")"]}),A("div",{class:"nels-axis-col",children:e.map(i=>A("button",{class:"nels-nearest-sample nels-nearest-secondary",onClick:()=>Mr(i.id),children:[A("span",{class:"nels-ctx-dot",style:`background:${t}`}),i.label.slice(0,60),i.label.length>60?"…":""]},i.id))})]}):null}function GC({ctx:n}){return A("details",{class:"nels-axis-lane nels-ctx-lane",children:[A("summary",{class:"nels-axis-header nels-ctx-summary",children:"Initial Context"}),A(eu,{title:"Seeds",items:n.seeds,color:"#3b82f6"}),A(eu,{title:"Noise",items:n.noise,color:"#94a3b8"}),A(eu,{title:"Negatives",items:n.negatives,color:"#ef4444"})]})}function HC({result:n}){const e=n.consistency_score,t=n.consistency_variants??[];return A("div",{class:"nels-axis-lane",children:[A("div",{class:"nels-axis-header",children:["Consistency Check — ",t.length," variants"]}),e!=null&&A("div",{class:"nels-cc-metrics",children:[A("span",{children:["SC score: ",A("strong",{children:e.toFixed(4)})]}),A("span",{class:"nels-cc-quality",children:WC(e)}),n.mean_intra!=null&&A("span",{children:["intra: ",n.mean_intra.toFixed(4)]}),n.mean_inter!=null&&A("span",{children:["inter: ",n.mean_inter.toFixed(4)]})]}),A("div",{style:"font-size:10px;color:#64849a;padding:2px 0 6px;line-height:1.5",children:[A("strong",{style:"color:#93a4b8",children:"SC score"})," = intra / inter — lower means tighter cluster. ",A("strong",{style:"color:#93a4b8",children:"Intra"}),": avg cosine distance of variants from seed (low = variants stay close to seed). ",A("strong",{style:"color:#93a4b8",children:"Inter"}),": avg cosine distance of seed from random dataset points (high = seed is specific). SC < 0.2 = tight, 0.2–0.5 = moderate, > 0.5 = loose."]}),n.seed_prompt&&A("button",{class:"nels-nearest-sample nels-nearest-top nels-cc-seed",onClick:()=>{n.seed_point_id&&Mr(n.seed_point_id)},children:["seed: ",n.seed_prompt.slice(0,60),n.seed_prompt.length>60?"…":""]}),A("div",{class:"nels-axis-col",children:t.map(i=>A("button",{class:`nels-nearest-sample nels-nearest-secondary${Et.value.has(`__ghost__${i.id}`)?" active":""}`,title:i.text,onClick:()=>Mr(`__ghost__${i.id}`),children:[A("span",{class:"nels-axis-bar",style:`width:${(i.cosine_sim*60).toFixed(1)}px;background:#22c55e`}),i.text.slice(0,60),i.text.length>60?"…":"",A("span",{class:"nels-nearest-dist",children:[" (",i.cosine_sim.toFixed(3),")"]})]},i.id))})]})}function VC({result:n}){const e=n.source_point_ids??[];if(!e.length)return null;const t=ut.value.byId;return A("div",{class:"nels-axis-lane",children:[A("div",{class:"nels-axis-header",children:"Selected points"}),A("div",{class:"nels-axis-col",children:[["A","(direction from)"],["B","(direction to)"],["C","(walk start)"]].map(([r,s],o)=>{var c;const a=e[o],l=((c=t.get(String(a)))==null?void 0:c.label)??String(a);return A("button",{class:"nels-nearest-sample nels-nearest-top",onClick:()=>Mr(String(a)),children:[A("span",{class:"nels-delta-role-badge",style:"margin-right:4px",children:r}),l.slice(0,50),l.length>50?"…":"",A("span",{class:"nels-nearest-dist",style:"color:#64849a",children:[" ",s]})]},a)})})]})}function Mr(n){xs(n,!1),rt()}function WC(n){return n<.2?"tight":n<.5?"moderate":"loose"}function $C(){const n=Ka(null),e=tl.value;Rs(()=>{n.current&&(n.current.scrollTop=n.current.scrollHeight)},[e.length]);const t=e.slice(-180);return A("div",{class:"nels-panel-card",style:{height:"100%",display:"flex",flexDirection:"column"},children:[A("h3",{children:"Event Log"}),A("div",{class:"nels-panel-log",ref:n,children:t.map((i,r)=>{const s=new Date(i.timestamp).toLocaleTimeString(),o=i.status==="failed"?" nels-panel-log-status-failed":"";return A("div",{class:`nels-panel-log-line${i.stale?" stale":""}`,children:[A("span",{class:"nels-panel-log-time",children:["[",s,"]"]})," ",A("span",{class:"nels-panel-log-node",children:i.node_name})," ",A("span",{class:`nels-panel-log-type${o}`,children:i.event_type})," ",i.message,i.stale?" [stale]":""]},r)})})]})}let hv={x:0,y:0};function XC(n,e){hv={x:n,y:e}}function jC(){return hv}function YC(n){var a,l,c;const e=n.metadata??{},t=e.text!=null?String(e.text):null,i=t&&t.length>200?t.slice(0,200)+"…":t,r=[["id",n.id]];i&&r.push(["text",i]),e.ghost_cluster_id!=null&&r.push(["cluster",`#${e.ghost_cluster_id}`]),e.cluster_global!=null&&(r.push(["cluster",e.is_noise?"noise":String(e.cluster_global)]),r.push(["strength",Number(e.membership_strength??1).toFixed(2)])),r.push(["x",Number(((a=n.view_coords)==null?void 0:a[0])??0).toFixed(3)]),r.push(["y",Number(((l=n.view_coords)==null?void 0:l[1])??0).toFixed(3)]),((c=n.view_coords)==null?void 0:c.length)===3&&r.push(["z",Number(n.view_coords[2]).toFixed(3)]);const s=e.recon_text!=null?String(e.recon_text):null,o=e.recon_sim!=null?Number(e.recon_sim).toFixed(3):null;return{rows:r,reconText:s,reconSim:o}}function qC({containerRef:n,yOffset:e}){const t=Ka(null),i=An.value;if(Rs(()=>{if(!i||!t.current||!n.current)return;const a=t.current,l=n.current,c=()=>{const u=l.getBoundingClientRect(),d=jC();a.style.left=`${d.x-u.left+12}px`,a.style.top=`${d.y-u.top+e}px`};return c(),window.addEventListener("mousemove",c),()=>window.removeEventListener("mousemove",c)}),!i)return null;const{rows:r,reconText:s,reconSim:o}=YC(i);return A("div",{class:"nels-panel-hover",ref:t,children:[r.map(([a,l])=>A("div",{children:[A("strong",{children:String(a)}),": ",String(l)]},a)),s&&A("div",{class:"nels-hover-recon",children:[A("strong",{children:"recon"}),": ",s,o&&A("span",{class:"nels-hover-recon-sim",children:[" (",o,")"]})]})]})}const fv="nels-sidebar-width",KC=360,$a=st(parseInt(localStorage.getItem(fv)??"")||KC);function ZC(){const n=Ka(null),e=Ka(null),t=br.value==="graph",i=ii.value==="3d",r=xo.value,s=ut.value.points.length;Rs(()=>{e.current&&($g(e.current),tv(e.current))},[]),Rs(()=>{if(!n.current)return;if(!i){jg(n.current),By(),setTimeout(()=>vu(),0);const l=new ResizeObserver(()=>vu());return l.observe(n.current),()=>{l.disconnect(),Yg()}}const a=new ResizeObserver(()=>pd());return K_(n.current),setTimeout(()=>pd(),0),a.observe(n.current),()=>{a.disconnect(),uh()}},[i]);function o(a){XC(a.clientX,a.clientY)}return A("div",{class:"nels-panel",children:[r&&A("div",{class:"nels-loading-bar"}),A(yC,{}),A("div",{class:`nels-panel-body${t?"":" hidden"}`,style:`grid-template-columns: 1fr 4px ${$a.value}px`,children:[A("section",{class:"nels-panel-main",children:[A("div",{ref:n,class:"nels-sigma-container",onMouseMove:o}),A("canvas",{ref:e,class:"nels-hull-canvas"}),A(QC,{}),An.value&&A(qC,{containerRef:n,yOffset:i?-24:12}),s>0&&A("div",{class:"nels-point-badge",children:[s," points"]}),s>0&&A(my,{}),Li.value&&s>0&&A("div",{class:"nels-anim-badge",children:"animate ON · positions not exact"}),s===0&&A("div",{class:"nels-panel-empty",children:r?A("div",{class:"nels-center-loading",children:[A("div",{class:"nels-spinner"}),A("span",{class:"nels-spinner-label",children:Ed.value})]}):A("span",{children:"Add a NELS Dataset Loader - NELS Session, then click Refresh"})}),A(JC,{}),A("button",{class:"nels-view-logs-btn",onClick:()=>Wh("logs"),children:"View Logs"})]}),A("div",{class:"nels-resize-handle",onMouseDown:eR}),A("aside",{class:"nels-panel-side",children:[A(LC,{}),A(FC,{}),A(AC,{})]})]}),A("div",{class:`nels-panel-logs-view${t?" hidden":""}`,children:[A("button",{class:"nels-view-logs-btn",onClick:()=>Wh("graph"),children:"← Graph"}),A($C,{})]})]})}function JC(){const n=ke.value;if((n==null?void 0:n.operation)!=="axis_projection")return null;const e=n.axis_projection??[];if(e.length<2)return null;const t=ms(e,8,!1),i=ms(e,8,!0),r=n.axis_b_projection,s=r&&r.length>=2?ms(r,8,!1):null,o=r&&r.length>=2?ms(r,8,!0):null,a=n.axis_label?n.axis_label.split(`
`)[0].slice(0,60):null,l=n.axis_b_label?n.axis_b_label.split(`
`)[0].slice(0,60):null;return A("div",{class:"nels-axis-legend-wrap",children:[A(Zp,{className:"nels-axis-legend",labelA:t,labelB:i,llmLabel:a}),s&&o&&A(Zp,{className:"nels-axis-legend-b2",labelA:s,labelB:o,llmLabel:l})]})}function Zp({className:n,labelA:e,labelB:t,llmLabel:i}){return A("div",{class:n,children:[A("div",{class:"nels-axis-legend-row",children:[A("span",{class:"nels-axis-legend-side nels-axis-legend-a",children:["← ",e]}),A("div",{class:"nels-axis-legend-bar"}),A("span",{class:"nels-axis-legend-side nels-axis-legend-b",children:[t," →"]})]}),i&&A("div",{class:"nels-axis-legend-llm",children:["(",i,")"]})]})}function QC(){const n=ni.value;if(!n)return null;const e=Math.min(n.x1,n.x2),t=Math.min(n.y1,n.y2),i=Math.abs(n.x2-n.x1),r=Math.abs(n.y2-n.y1);return A("div",{class:"nels-drag-select-rect",style:`left:${e}px;top:${t}px;width:${i}px;height:${r}px`})}function eR(n){n.preventDefault();const e=n.clientX,t=$a.value,i=n.currentTarget;i.classList.add("dragging");function r(o){const a=Math.max(240,Math.min(600,t-(o.clientX-e)));$a.value=a}function s(){i.classList.remove("dragging"),localStorage.setItem(fv,String($a.value)),window.removeEventListener("mousemove",r),window.removeEventListener("mouseup",s)}window.addEventListener("mousemove",r),window.addEventListener("mouseup",s)}const tR="nels_GraphPanelLauncher";let Ti=null;function nR(){var r,s;const n=(r=_r.extensionManager)==null?void 0:r.bottomPanel;if(n!=null&&n.toggleBottomPanelTab){n.toggleBottomPanelTab("nels-graph-panel");return}const e=(s=_r.extensionManager)==null?void 0:s.command;if(e!=null&&e.execute){e.execute("Workspace.ToggleBottomPanelTab.nels-graph-panel");return}const i=[...document.querySelectorAll("button, [role='tab'], .p-tab, .tab")].find(o=>{const a=(o.textContent??"").trim().toLowerCase();return a==="nels graph"||a==="nels graph panel"});i==null||i.click()}_r.registerExtension({name:"nels.graph.panel",beforeRegisterNodeDef(n,e){if(e.name===tR){const t=n.prototype.onNodeCreated;n.prototype.onNodeCreated=function(){t==null||t.apply(this,[]),this.addWidget("button","Open NELS Graph Panel","open",()=>nR()),this.size=[260,82]}}},bottomPanelTabs:[{id:"nels-graph-panel",title:"NELS Graph",type:"custom",render(n){Ti==null||Ti(),Ti=null,n.style.width="100%",n.style.height="100%",n.style.minWidth="0",n.style.minHeight="0",n.style.position="relative",n.style.overflow="hidden",Cv(),Ih(im(ZC,null),n);const e=new AbortController;cC(e.signal),Ti=()=>{e.abort(),Ih(null,n)}},destroy(){Ti==null||Ti(),Ti=null,TC()}}]});
