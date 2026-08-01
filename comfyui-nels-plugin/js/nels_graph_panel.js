import{app as vr}from"../../scripts/app.js";import{api as ou}from"../../scripts/api.js";var Pl,ut,am,lm,dr,Oh,cm,um,ic,Ua,_o,dm,yd,au,lu,Ka={},Za=[],Av=/acit|ex(?:s|g|n|p|$)|rph|grid|ows|mnc|ntw|ine[ch]|zoo|^ord|itera/i,Ll=Array.isArray;function zi(n,e){for(var t in e)n[t]=e[t];return n}function Sd(n){n&&n.parentNode&&n.parentNode.removeChild(n)}function hm(n,e,t){var i,r,s,o={};for(s in e)s=="key"?i=e[s]:s=="ref"?r=e[s]:o[s]=e[s];if(arguments.length>2&&(o.children=arguments.length>3?Pl.call(arguments,2):t),typeof n=="function"&&n.defaultProps!=null)for(s in n.defaultProps)o[s]===void 0&&(o[s]=n.defaultProps[s]);return Fa(n,o,i,r,null)}function Fa(n,e,t,i,r){var s={type:n,props:e,key:t,ref:i,__k:null,__:null,__b:0,__e:null,__c:null,constructor:void 0,__v:r??++am,__i:-1,__u:0};return r==null&&ut.vnode!=null&&ut.vnode(s),s}function yn(n){return n.children}function vo(n,e){this.props=n,this.context=e}function Ds(n,e){if(e==null)return n.__?Ds(n.__,n.__i+1):null;for(var t;e<n.__k.length;e++)if((t=n.__k[e])!=null&&t.__e!=null)return t.__e;return typeof n.type=="function"?Ds(n):null}function Cv(n){if(n.__P&&n.__d){var e=n.__v,t=e.__e,i=[],r=[],s=zi({},e);s.__v=e.__v+1,ut.vnode&&ut.vnode(s),Ed(n.__P,s,e,n.__n,n.__P.namespaceURI,32&e.__u?[t]:null,i,t??Ds(e),!!(32&e.__u),r),s.__v=e.__v,s.__.__k[s.__i]=s,gm(i,s,r),e.__e=e.__=null,s.__e!=t&&fm(s)}}function fm(n){if((n=n.__)!=null&&n.__c!=null)return n.__e=n.__c.base=null,n.__k.some(function(e){if(e!=null&&e.__e!=null)return n.__e=n.__c.base=e.__e}),fm(n)}function kh(n){(!n.__d&&(n.__d=!0)&&dr.push(n)&&!Ja.__r++||Oh!=ut.debounceRendering)&&((Oh=ut.debounceRendering)||cm)(Ja)}function Ja(){try{for(var n,e=1;dr.length;)dr.length>e&&dr.sort(um),n=dr.shift(),e=dr.length,Cv(n)}finally{dr.length=Ja.__r=0}}function pm(n,e,t,i,r,s,o,a,l,c,u){var d,h,f,p,_,g,m,v=i&&i.__k||Za,y=e.length;for(l=Rv(t,e,v,l,y),d=0;d<y;d++)(f=t.__k[d])!=null&&(h=f.__i!=-1&&v[f.__i]||Ka,f.__i=d,g=Ed(n,f,h,r,s,o,a,l,c,u),p=f.__e,f.ref&&h.ref!=f.ref&&(h.ref&&Md(h.ref,null,f),u.push(f.ref,f.__c||p,f)),_==null&&p!=null&&(_=p),(m=!!(4&f.__u))||h.__k===f.__k?(l=mm(f,l,n,m),m&&h.__e&&(h.__e=null)):typeof f.type=="function"&&g!==void 0?l=g:p&&(l=p.nextSibling),f.__u&=-7);return t.__e=_,l}function Rv(n,e,t,i,r){var s,o,a,l,c,u=t.length,d=u,h=0;for(n.__k=new Array(r),s=0;s<r;s++)(o=e[s])!=null&&typeof o!="boolean"&&typeof o!="function"?(typeof o=="string"||typeof o=="number"||typeof o=="bigint"||o.constructor==String?o=n.__k[s]=Fa(null,o,null,null,null):Ll(o)?o=n.__k[s]=Fa(yn,{children:o},null,null,null):o.constructor===void 0&&o.__b>0?o=n.__k[s]=Fa(o.type,o.props,o.key,o.ref?o.ref:null,o.__v):n.__k[s]=o,l=s+h,o.__=n,o.__b=n.__b+1,a=null,(c=o.__i=Pv(o,t,l,d))!=-1&&(d--,(a=t[c])&&(a.__u|=2)),a==null||a.__v==null?(c==-1&&(r>u?h--:r<u&&h++),typeof o.type!="function"&&(o.__u|=4)):c!=l&&(c==l-1?h--:c==l+1?h++:(c>l?h--:h++,o.__u|=4))):n.__k[s]=null;if(d)for(s=0;s<u;s++)(a=t[s])!=null&&(2&a.__u)==0&&(a.__e==i&&(i=Ds(a)),vm(a,a));return i}function mm(n,e,t,i){var r,s;if(typeof n.type=="function"){for(r=n.__k,s=0;r&&s<r.length;s++)r[s]&&(r[s].__=n,e=mm(r[s],e,t,i));return e}n.__e!=e&&(i&&(e&&n.type&&!e.parentNode&&(e=Ds(n)),t.insertBefore(n.__e,e||null)),e=n.__e);do e=e&&e.nextSibling;while(e!=null&&e.nodeType==8);return e}function Pv(n,e,t,i){var r,s,o,a=n.key,l=n.type,c=e[t],u=c!=null&&(2&c.__u)==0;if(c===null&&a==null||u&&a==c.key&&l==c.type)return t;if(i>(u?1:0)){for(r=t-1,s=t+1;r>=0||s<e.length;)if((c=e[o=r>=0?r--:s++])!=null&&(2&c.__u)==0&&a==c.key&&l==c.type)return o}return-1}function Bh(n,e,t){e[0]=="-"?n.setProperty(e,t??""):n[e]=t==null?"":typeof t!="number"||Av.test(e)?t:t+"px"}function Ko(n,e,t,i,r){var s,o;e:if(e=="style")if(typeof t=="string")n.style.cssText=t;else{if(typeof i=="string"&&(n.style.cssText=i=""),i)for(e in i)t&&e in t||Bh(n.style,e,"");if(t)for(e in t)i&&t[e]==i[e]||Bh(n.style,e,t[e])}else if(e[0]=="o"&&e[1]=="n")s=e!=(e=e.replace(dm,"$1")),o=e.toLowerCase(),e=o in n||e=="onFocusOut"||e=="onFocusIn"?o.slice(2):e.slice(2),n.l||(n.l={}),n.l[e+s]=t,t?i?t[_o]=i[_o]:(t[_o]=yd,n.addEventListener(e,s?lu:au,s)):n.removeEventListener(e,s?lu:au,s);else{if(r=="http://www.w3.org/2000/svg")e=e.replace(/xlink(H|:h)/,"h").replace(/sName$/,"s");else if(e!="width"&&e!="height"&&e!="href"&&e!="list"&&e!="form"&&e!="tabIndex"&&e!="download"&&e!="rowSpan"&&e!="colSpan"&&e!="role"&&e!="popover"&&e in n)try{n[e]=t??"";break e}catch{}typeof t=="function"||(t==null||t===!1&&e[4]!="-"?n.removeAttribute(e):n.setAttribute(e,e=="popover"&&t==1?"":t))}}function zh(n){return function(e){if(this.l){var t=this.l[e.type+n];if(e[Ua]==null)e[Ua]=yd++;else if(e[Ua]<t[_o])return;return t(ut.event?ut.event(e):e)}}}function Ed(n,e,t,i,r,s,o,a,l,c){var u,d,h,f,p,_,g,m,v,y,x,M,E,C,b,A=e.type;if(e.constructor!==void 0)return null;128&t.__u&&(l=!!(32&t.__u),s=[a=e.__e=t.__e]),(u=ut.__b)&&u(e);e:if(typeof A=="function")try{if(m=e.props,v=A.prototype&&A.prototype.render,y=(u=A.contextType)&&i[u.__c],x=u?y?y.props.value:u.__:i,t.__c?g=(d=e.__c=t.__c).__=d.__E:(v?e.__c=d=new A(m,x):(e.__c=d=new vo(m,x),d.constructor=A,d.render=Dv),y&&y.sub(d),d.state||(d.state={}),d.__n=i,h=d.__d=!0,d.__h=[],d._sb=[]),v&&d.__s==null&&(d.__s=d.state),v&&A.getDerivedStateFromProps!=null&&(d.__s==d.state&&(d.__s=zi({},d.__s)),zi(d.__s,A.getDerivedStateFromProps(m,d.__s))),f=d.props,p=d.state,d.__v=e,h)v&&A.getDerivedStateFromProps==null&&d.componentWillMount!=null&&d.componentWillMount(),v&&d.componentDidMount!=null&&d.__h.push(d.componentDidMount);else{if(v&&A.getDerivedStateFromProps==null&&m!==f&&d.componentWillReceiveProps!=null&&d.componentWillReceiveProps(m,x),e.__v==t.__v||!d.__e&&d.shouldComponentUpdate!=null&&d.shouldComponentUpdate(m,d.__s,x)===!1){e.__v!=t.__v&&(d.props=m,d.state=d.__s,d.__d=!1),e.__e=t.__e,e.__k=t.__k,e.__k.some(function(L){L&&(L.__=e)}),Za.push.apply(d.__h,d._sb),d._sb=[],d.__h.length&&o.push(d);break e}d.componentWillUpdate!=null&&d.componentWillUpdate(m,d.__s,x),v&&d.componentDidUpdate!=null&&d.__h.push(function(){d.componentDidUpdate(f,p,_)})}if(d.context=x,d.props=m,d.__P=n,d.__e=!1,M=ut.__r,E=0,v)d.state=d.__s,d.__d=!1,M&&M(e),u=d.render(d.props,d.state,d.context),Za.push.apply(d.__h,d._sb),d._sb=[];else do d.__d=!1,M&&M(e),u=d.render(d.props,d.state,d.context),d.state=d.__s;while(d.__d&&++E<25);d.state=d.__s,d.getChildContext!=null&&(i=zi(zi({},i),d.getChildContext())),v&&!h&&d.getSnapshotBeforeUpdate!=null&&(_=d.getSnapshotBeforeUpdate(f,p)),C=u!=null&&u.type===yn&&u.key==null?_m(u.props.children):u,a=pm(n,Ll(C)?C:[C],e,t,i,r,s,o,a,l,c),d.base=e.__e,e.__u&=-161,d.__h.length&&o.push(d),g&&(d.__E=d.__=null)}catch(L){if(e.__v=null,l||s!=null)if(L.then){for(e.__u|=l?160:128;a&&a.nodeType==8&&a.nextSibling;)a=a.nextSibling;s[s.indexOf(a)]=null,e.__e=a}else{for(b=s.length;b--;)Sd(s[b]);cu(e)}else e.__e=t.__e,e.__k=t.__k,L.then||cu(e);ut.__e(L,e,t)}else s==null&&e.__v==t.__v?(e.__k=t.__k,e.__e=t.__e):a=e.__e=Lv(t.__e,e,t,i,r,s,o,l,c);return(u=ut.diffed)&&u(e),128&e.__u?void 0:a}function cu(n){n&&(n.__c&&(n.__c.__e=!0),n.__k&&n.__k.some(cu))}function gm(n,e,t){for(var i=0;i<t.length;i++)Md(t[i],t[++i],t[++i]);ut.__c&&ut.__c(e,n),n.some(function(r){try{n=r.__h,r.__h=[],n.some(function(s){s.call(r)})}catch(s){ut.__e(s,r.__v)}})}function _m(n){return typeof n!="object"||n==null||n.__b>0?n:Ll(n)?n.map(_m):zi({},n)}function Lv(n,e,t,i,r,s,o,a,l){var c,u,d,h,f,p,_,g=t.props||Ka,m=e.props,v=e.type;if(v=="svg"?r="http://www.w3.org/2000/svg":v=="math"?r="http://www.w3.org/1998/Math/MathML":r||(r="http://www.w3.org/1999/xhtml"),s!=null){for(c=0;c<s.length;c++)if((f=s[c])&&"setAttribute"in f==!!v&&(v?f.localName==v:f.nodeType==3)){n=f,s[c]=null;break}}if(n==null){if(v==null)return document.createTextNode(m);n=document.createElementNS(r,v,m.is&&m),a&&(ut.__m&&ut.__m(e,s),a=!1),s=null}if(v==null)g===m||a&&n.data==m||(n.data=m);else{if(s=s&&Pl.call(n.childNodes),!a&&s!=null)for(g={},c=0;c<n.attributes.length;c++)g[(f=n.attributes[c]).name]=f.value;for(c in g)f=g[c],c=="dangerouslySetInnerHTML"?d=f:c=="children"||c in m||c=="value"&&"defaultValue"in m||c=="checked"&&"defaultChecked"in m||Ko(n,c,null,f,r);for(c in m)f=m[c],c=="children"?h=f:c=="dangerouslySetInnerHTML"?u=f:c=="value"?p=f:c=="checked"?_=f:a&&typeof f!="function"||g[c]===f||Ko(n,c,f,g[c],r);if(u)a||d&&(u.__html==d.__html||u.__html==n.innerHTML)||(n.innerHTML=u.__html),e.__k=[];else if(d&&(n.innerHTML=""),pm(e.type=="template"?n.content:n,Ll(h)?h:[h],e,t,i,v=="foreignObject"?"http://www.w3.org/1999/xhtml":r,s,o,s?s[0]:t.__k&&Ds(t,0),a,l),s!=null)for(c=s.length;c--;)Sd(s[c]);a||(c="value",v=="progress"&&p==null?n.removeAttribute("value"):p!=null&&(p!==n[c]||v=="progress"&&!p||v=="option"&&p!=g[c])&&Ko(n,c,p,g[c],r),c="checked",_!=null&&_!=n[c]&&Ko(n,c,_,g[c],r))}return n}function Md(n,e,t){try{if(typeof n=="function"){var i=typeof n.__u=="function";i&&n.__u(),i&&e==null||(n.__u=n(e))}else n.current=e}catch(r){ut.__e(r,t)}}function vm(n,e,t){var i,r;if(ut.unmount&&ut.unmount(n),(i=n.ref)&&(i.current&&i.current!=n.__e||Md(i,null,e)),(i=n.__c)!=null){if(i.componentWillUnmount)try{i.componentWillUnmount()}catch(s){ut.__e(s,e)}i.base=i.__P=null}if(i=n.__k)for(r=0;r<i.length;r++)i[r]&&vm(i[r],e,t||typeof n.type!="function");t||Sd(n.__e),n.__c=n.__=n.__e=void 0}function Dv(n,e,t){return this.constructor(n,t)}function Gh(n,e,t){var i,r,s,o;e==document&&(e=document.documentElement),ut.__&&ut.__(n,e),r=(i=!1)?null:e.__k,s=[],o=[],Ed(e,n=e.__k=hm(yn,null,[n]),r||Ka,Ka,e.namespaceURI,r?null:e.firstChild?Pl.call(e.childNodes):null,s,r?r.__e:e.firstChild,i,o),gm(s,n,o)}Pl=Za.slice,ut={__e:function(n,e,t,i){for(var r,s,o;e=e.__;)if((r=e.__c)&&!r.__)try{if((s=r.constructor)&&s.getDerivedStateFromError!=null&&(r.setState(s.getDerivedStateFromError(n)),o=r.__d),r.componentDidCatch!=null&&(r.componentDidCatch(n,i||{}),o=r.__d),o)return r.__E=r}catch(a){n=a}throw n}},am=0,lm=function(n){return n!=null&&n.constructor===void 0},vo.prototype.setState=function(n,e){var t;t=this.__s!=null&&this.__s!=this.state?this.__s:this.__s=zi({},this.state),typeof n=="function"&&(n=n(zi({},t),this.props)),n&&zi(t,n),n!=null&&this.__v&&(e&&this._sb.push(e),kh(this))},vo.prototype.forceUpdate=function(n){this.__v&&(this.__e=!0,n&&this.__h.push(n),kh(this))},vo.prototype.render=yn,dr=[],cm=typeof Promise=="function"?Promise.prototype.then.bind(Promise.resolve()):setTimeout,um=function(n,e){return n.__v.__b-e.__v.__b},Ja.__r=0,ic=Math.random().toString(8),Ua="__d"+ic,_o="__a"+ic,dm=/(PointerCapture)$|Capture$/i,yd=0,au=zh(!1),lu=zh(!0);function Nv(){if(document.getElementById("nels-graph-panel-style"))return;const n=document.createElement("style");n.id="nels-graph-panel-style",n.textContent=`
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
      content: "> ";
    }
    .nels-selection-help[open] > summary::before {
      content: "v ";
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
    .nels-legend-outside {
      padding: 4px 10px;
      font-size: 10px;
      font-style: italic;
      color: #64849a;
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
  `,document.head.appendChild(n)}var Iv=0;function T(n,e,t,i,r,s){e||(e={});var o,a,l=e;if("ref"in l)for(a in l={},e)a=="ref"?o=e[a]:l[a]=e[a];var c={type:n,props:l,key:t,ref:o,__k:null,__:null,__b:0,__e:null,__c:null,constructor:void 0,__v:--Iv,__i:-1,__u:0,__source:r,__self:s};if(typeof n=="function"&&(o=n.defaultProps))for(a in o)l[a]===void 0&&(l[a]=o[a]);return ut.vnode&&ut.vnode(c),c}var Po,Ot,rc,Hh,Qa=0,xm=[],Ht=ut,Vh=Ht.__b,Wh=Ht.__r,$h=Ht.diffed,Xh=Ht.__c,jh=Ht.unmount,Yh=Ht.__;function wd(n,e){Ht.__h&&Ht.__h(Ot,n,Qa||e),Qa=0;var t=Ot.__H||(Ot.__H={__:[],__h:[]});return n>=t.__.length&&t.__.push({}),t.__[n]}function Uv(n){return Qa=1,Fv(ym,n)}function Fv(n,e,t){var i=wd(Po++,2);if(i.t=n,!i.__c&&(i.__=[ym(void 0,e),function(a){var l=i.__N?i.__N[0]:i.__[0],c=i.t(l,a);l!==c&&(i.__N=[c,i.__[1]],i.__c.setState({}))}],i.__c=Ot,!Ot.__f)){var r=function(a,l,c){if(!i.__c.__H)return!0;var u=i.__c.__H.__.filter(function(h){return h.__c});if(u.every(function(h){return!h.__N}))return!s||s.call(this,a,l,c);var d=i.__c.props!==a;return u.some(function(h){if(h.__N){var f=h.__[0];h.__=h.__N,h.__N=void 0,f!==h.__[0]&&(d=!0)}}),s&&s.call(this,a,l,c)||d};Ot.__f=!0;var s=Ot.shouldComponentUpdate,o=Ot.componentWillUpdate;Ot.componentWillUpdate=function(a,l,c){if(this.__e){var u=s;s=void 0,r(a,l,c),s=u}o&&o.call(this,a,l,c)},Ot.shouldComponentUpdate=r}return i.__N||i.__}function Wr(n,e){var t=wd(Po++,3);!Ht.__s&&bm(t.__H,e)&&(t.__=n,t.u=e,Ot.__H.__h.push(t))}function el(n){return Qa=5,Td(function(){return{current:n}},[])}function Td(n,e){var t=wd(Po++,7);return bm(t.__H,e)&&(t.__=n(),t.__H=e,t.__h=n),t.__}function Ov(){for(var n;n=xm.shift();){var e=n.__H;if(n.__P&&e)try{e.__h.some(Oa),e.__h.some(uu),e.__h=[]}catch(t){e.__h=[],Ht.__e(t,n.__v)}}}Ht.__b=function(n){Ot=null,Vh&&Vh(n)},Ht.__=function(n,e){n&&e.__k&&e.__k.__m&&(n.__m=e.__k.__m),Yh&&Yh(n,e)},Ht.__r=function(n){Wh&&Wh(n),Po=0;var e=(Ot=n.__c).__H;e&&(rc===Ot?(e.__h=[],Ot.__h=[],e.__.some(function(t){t.__N&&(t.__=t.__N),t.u=t.__N=void 0})):(e.__h.some(Oa),e.__h.some(uu),e.__h=[],Po=0)),rc=Ot},Ht.diffed=function(n){$h&&$h(n);var e=n.__c;e&&e.__H&&(e.__H.__h.length&&(xm.push(e)!==1&&Hh===Ht.requestAnimationFrame||((Hh=Ht.requestAnimationFrame)||kv)(Ov)),e.__H.__.some(function(t){t.u&&(t.__H=t.u),t.u=void 0})),rc=Ot=null},Ht.__c=function(n,e){e.some(function(t){try{t.__h.some(Oa),t.__h=t.__h.filter(function(i){return!i.__||uu(i)})}catch(i){e.some(function(r){r.__h&&(r.__h=[])}),e=[],Ht.__e(i,t.__v)}}),Xh&&Xh(n,e)},Ht.unmount=function(n){jh&&jh(n);var e,t=n.__c;t&&t.__H&&(t.__H.__.some(function(i){try{Oa(i)}catch(r){e=r}}),t.__H=void 0,e&&Ht.__e(e,t.__v))};var qh=typeof requestAnimationFrame=="function";function kv(n){var e,t=function(){clearTimeout(i),qh&&cancelAnimationFrame(e),setTimeout(n)},i=setTimeout(t,35);qh&&(e=requestAnimationFrame(t))}function Oa(n){var e=Ot,t=n.__c;typeof t=="function"&&(n.__c=void 0,t()),Ot=e}function uu(n){var e=Ot;n.__c=n.__(),Ot=e}function bm(n,e){return!n||n.length!==e.length||e.some(function(t,i){return t!==n[i]})}function ym(n,e){return typeof e=="function"?e(n):e}var Bv=Symbol.for("preact-signals");function Dl(){if(Wi>1)Wi--;else{var n,e=!1;for((function(){var r=nl;for(nl=void 0;r!==void 0;)r.S.v===r.v&&(r.S.i=r.i),r=r.o})();xo!==void 0;){var t=xo;for(xo=void 0,tl++;t!==void 0;){var i=t.u;if(t.u=void 0,t.f&=-3,!(8&t.f)&&Mm(t))try{t.c()}catch(r){e||(n=r,e=!0)}t=i}}if(tl=0,Wi--,e)throw n}}function zv(n){if(Wi>0)return n();du=++Gv,Wi++;try{return n()}finally{Dl()}}var lt=void 0;function Sm(n){var e=lt;lt=void 0;try{return n()}finally{lt=e}}var xo=void 0,Wi=0,tl=0,Gv=0,du=0,nl=void 0,il=0;function Em(n){if(lt!==void 0){var e=n.n;if(e===void 0||e.t!==lt)return e={i:0,S:n,p:lt.s,n:void 0,t:lt,e:void 0,x:void 0,r:e},lt.s!==void 0&&(lt.s.n=e),lt.s=e,n.n=e,32&lt.f&&n.S(e),e;if(e.i===-1)return e.i=0,e.n!==void 0&&(e.n.p=e.p,e.p!==void 0&&(e.p.n=e.n),e.p=lt.s,e.n=void 0,lt.s.n=e,lt.s=e),e}}function sn(n,e){this.v=n,this.i=0,this.n=void 0,this.t=void 0,this.l=0,this.W=e==null?void 0:e.watched,this.Z=e==null?void 0:e.unwatched,this.name=e==null?void 0:e.name}sn.prototype.brand=Bv;sn.prototype.h=function(){return!0};sn.prototype.S=function(n){var e=this,t=this.t;t!==n&&n.e===void 0&&(n.x=t,this.t=n,t!==void 0?t.e=n:Sm(function(){var i;(i=e.W)==null||i.call(e)}))};sn.prototype.U=function(n){var e=this;if(this.t!==void 0){var t=n.e,i=n.x;t!==void 0&&(t.x=i,n.e=void 0),i!==void 0&&(i.e=t,n.x=void 0),n===this.t&&(this.t=i,i===void 0&&Sm(function(){var r;(r=e.Z)==null||r.call(e)}))}};sn.prototype.subscribe=function(n){var e=this;return Yt(function(){var t=e.value,i=lt;lt=void 0;try{n(t)}finally{lt=i}},{name:"sub"})};sn.prototype.valueOf=function(){return this.value};sn.prototype.toString=function(){return this.value+""};sn.prototype.toJSON=function(){return this.value};sn.prototype.peek=function(){var n=lt;lt=void 0;try{return this.value}finally{lt=n}};Object.defineProperty(sn.prototype,"value",{get:function(){var n=Em(this);return n!==void 0&&(n.i=this.i),this.v},set:function(n){if(n!==this.v){if(tl>100)throw new Error("Cycle detected");(function(t){Wi!==0&&tl===0&&t.l!==du&&(t.l=du,nl={S:t,v:t.v,i:t.i,o:nl})})(this),this.v=n,this.i++,il++,Wi++;try{for(var e=this.t;e!==void 0;e=e.x)e.t.N()}finally{Dl()}}}});function ht(n,e){return new sn(n,e)}function Mm(n){for(var e=n.s;e!==void 0;e=e.n)if(e.S.i!==e.i||!e.S.h()||e.S.i!==e.i)return!0;return!1}function wm(n){for(var e=n.s;e!==void 0;e=e.n){var t=e.S.n;if(t!==void 0&&(e.r=t),e.S.n=e,e.i=-1,e.n===void 0){n.s=e;break}}}function Tm(n){for(var e=n.s,t=void 0;e!==void 0;){var i=e.p;e.i===-1?(e.S.U(e),i!==void 0&&(i.n=e.n),e.n!==void 0&&(e.n.p=i)):t=e,e.S.n=e.r,e.r!==void 0&&(e.r=void 0),e=i}n.s=t}function Zr(n,e){sn.call(this,void 0),this.x=n,this.s=void 0,this.g=il-1,this.f=4,this.W=e==null?void 0:e.watched,this.Z=e==null?void 0:e.unwatched,this.name=e==null?void 0:e.name}Zr.prototype=new sn;Zr.prototype.h=function(){if(this.f&=-3,1&this.f)return!1;if((36&this.f)==32||(this.f&=-5,this.g===il))return!0;if(this.g=il,this.f|=1,this.i>0&&!Mm(this))return this.f&=-2,!0;var n=lt;try{wm(this),lt=this;var e=this.x();(16&this.f||this.v!==e||this.i===0)&&(this.v=e,this.f&=-17,this.i++)}catch(t){this.v=t,this.f|=16,this.i++}return lt=n,Tm(this),this.f&=-2,!0};Zr.prototype.S=function(n){if(this.t===void 0){this.f|=36;for(var e=this.s;e!==void 0;e=e.n)e.S.S(e)}sn.prototype.S.call(this,n)};Zr.prototype.U=function(n){if(this.t!==void 0&&(sn.prototype.U.call(this,n),this.t===void 0)){this.f&=-33;for(var e=this.s;e!==void 0;e=e.n)e.S.U(e)}};Zr.prototype.N=function(){if(!(2&this.f)){this.f|=6;for(var n=this.t;n!==void 0;n=n.x)n.t.N()}};Object.defineProperty(Zr.prototype,"value",{get:function(){if(1&this.f)throw new Error("Cycle detected");var n=Em(this);if(this.h(),n!==void 0&&(n.i=this.i),16&this.f)throw this.v;return this.v}});function _i(n,e){return new Zr(n,e)}function Am(n){var e=n.m;if(n.m=void 0,typeof e=="function"){Wi++;var t=lt;lt=void 0;try{e()}catch(i){throw n.f&=-2,n.f|=8,Ad(n),i}finally{lt=t,Dl()}}}function Ad(n){for(var e=n.s;e!==void 0;e=e.n)e.S.U(e);n.x=void 0,n.s=void 0,Am(n)}function Hv(n){if(lt!==this)throw new Error("Out-of-order effect");Tm(this),lt=n,this.f&=-2,8&this.f&&Ad(this),Dl()}function zs(n,e){this.x=n,this.m=void 0,this.s=void 0,this.u=void 0,this.f=32,this.name=e==null?void 0:e.name}zs.prototype.c=function(){var n=this.S();try{if(8&this.f||this.x===void 0)return;var e=this.x();typeof e=="function"&&(this.m=e)}finally{n()}};zs.prototype.S=function(){if(1&this.f)throw new Error("Cycle detected");this.f|=1,this.f&=-9,Am(this),wm(this),Wi++;var n=lt;return lt=this,Hv.bind(this,n)};zs.prototype.N=function(){2&this.f||(this.f|=2,this.u=xo,xo=this)};zs.prototype.d=function(){this.f|=8,1&this.f||Ad(this)};zs.prototype.dispose=function(){this.d()};function Yt(n,e){var t=new zs(n,e);try{t.c()}catch(r){throw t.d(),r}var i=t.d.bind(t);return i[Symbol.dispose]=i,i}var Cm,Zo,Vv=typeof window<"u"&&!!window.__PREACT_SIGNALS_DEVTOOLS__,Rm=[];Yt(function(){Cm=this.N})();function Gs(n,e){ut[n]=e.bind(null,ut[n]||function(){})}function rl(n){if(Zo){var e=Zo;Zo=void 0,e()}Zo=n&&n.S()}function Pm(n){var e=this,t=n.data,i=$v(t);i.value=t;var r=Td(function(){for(var a=e,l=e.__v;l=l.__;)if(l.__c){l.__c.__$f|=4;break}var c=_i(function(){var f=i.value.value;return f===0?0:f===!0?"":f||""}),u=_i(function(){return!Array.isArray(c.value)&&!lm(c.value)}),d=Yt(function(){if(this.N=Lm,u.value){var f=c.value;a.__v&&a.__v.__e&&a.__v.__e.nodeType===3&&(a.__v.__e.data=f)}}),h=e.__$u.d;return e.__$u.d=function(){d(),h.call(this)},[u,c]},[]),s=r[0],o=r[1];return s.value?o.peek():o.value}Pm.displayName="ReactiveTextNode";Object.defineProperties(sn.prototype,{constructor:{configurable:!0,value:void 0},type:{configurable:!0,value:Pm},props:{configurable:!0,get:function(){var n=this;return{data:{get value(){return n.value}}}}},__b:{configurable:!0,value:1}});Gs("__b",function(n,e){if(typeof e.type=="string"){var t,i=e.props;for(var r in i)if(r!=="children"){var s=i[r];s instanceof sn&&(t||(e.__np=t={}),t[r]=s,i[r]=s.peek())}}n(e)});Gs("__r",function(n,e){if(n(e),e.type!==yn){rl();var t,i=e.__c;i&&(i.__$f&=-2,(t=i.__$u)===void 0&&(i.__$u=t=(function(r,s){var o;return Yt(function(){o=this},{name:s}),o.c=r,o})(function(){var r;Vv&&((r=t.y)==null||r.call(t)),i.__$f|=1,i.setState({})},typeof e.type=="function"?e.type.displayName||e.type.name:""))),rl(t)}});Gs("__e",function(n,e,t,i){rl(),n(e,t,i)});Gs("diffed",function(n,e){rl();var t;if(typeof e.type=="string"&&(t=e.__e)){var i=e.__np,r=e.props;if(i){var s=t.U;if(s)for(var o in s){var a=s[o];a!==void 0&&!(o in i)&&(a.d(),s[o]=void 0)}else s={},t.U=s;for(var l in i){var c=s[l],u=i[l];c===void 0?(c=Wv(t,l,u),s[l]=c):c.o(u,r)}for(var d in i)r[d]=i[d]}}n(e)});function Wv(n,e,t,i){var r=e in n&&n.ownerSVGElement===void 0,s=ht(t),o=t.peek();return{o:function(a,l){s.value=a,o=a.peek()},d:Yt(function(){this.N=Lm;var a=s.value.value;o!==a?(o=void 0,r?n[e]=a:a!=null&&(a!==!1||e[4]==="-")?n.setAttribute(e,a):n.removeAttribute(e)):o=void 0})}}Gs("unmount",function(n,e){if(typeof e.type=="string"){var t=e.__e;if(t){var i=t.U;if(i){t.U=void 0;for(var r in i){var s=i[r];s&&s.d()}}}e.__np=void 0}else{var o=e.__c;if(o){var a=o.__$u;a&&(o.__$u=void 0,a.d())}}n(e)});Gs("__h",function(n,e,t,i){(i<3||i===9)&&(e.__$f|=2),n(e,t,i)});vo.prototype.shouldComponentUpdate=function(n,e){if(this.__R)return!0;var t=this.__$u,i=t&&t.s!==void 0;for(var r in e)return!0;if(this.__f||typeof this.u=="boolean"&&this.u===!0){var s=2&this.__$f;if(!(i||s||4&this.__$f)||1&this.__$f)return!0}else if(!(i||4&this.__$f)||3&this.__$f)return!0;for(var o in n)if(o!=="__source"&&n[o]!==this.props[o])return!0;for(var a in this.props)if(!(a in n))return!0;return!1};function $v(n,e){return Td(function(){return ht(n,e)},[])}var Xv=function(n){queueMicrotask(function(){queueMicrotask(n)})};function jv(){zv(function(){for(var n;n=Rm.shift();)Cm.call(n)})}function Lm(){Rm.push(this)===1&&(ut.requestAnimationFrame||Xv)(jv)}function Yv(n){return Nl("/nels/api/canvas-sessions/sync",{sessions:n})}function qv(n){return Cd(`/nels/api/session/${encodeURIComponent(n)}`)}function Kv(n,e){return Nl(`/nels/api/session/${encodeURIComponent(n)}/ui-state`,e)}function Zv(n){return Nl(`/nels/api/session/${encodeURIComponent(n)}/source-preview`,{})}function Jv(){return Cd("/nels/api/llm/status")}function Qv(){return Nl("/nels/api/llm/unload",{})}async function Cd(n,e){const t=await ou.fetchApi(n,e);if(!t.ok)throw new Error(`${t.status} ${t.statusText}`);return t.json()}function Nl(n,e){return Cd(n,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(e??{})})}const sl=ht([]),Rd=ht("initializing"),yr=ht("graph"),Di=ht(!0),bo=ht(!1),Pd=ht(!1);function kt(n,{priority:e=!1}={}){!e&&Pd.value||(Rd.value=n)}function Kh(){Pd.value=!0}function hu(){Pd.value=!1}function Zh(n){yr.value=n}function Il(n,e=0){const t=Number(n.state_revision??0),i={timestamp:n.timestamp??Date.now(),event_type:n.event_type??"event",node_name:n.node_name??"NELS",message:n.message??n.status??"",status:n.status??"",stale:e>0&&t>0&&t<e},r=sl.value,s=r.length>=300?[...r.slice(r.length-299),i]:[...r,i];sl.value=s}function e0(){sl.value=[]}const Xe=ht({operation:"inspect",neighbor_count:4,alpha_schedule:[0,.25,.5,.75,1],nearest_sample:!1,snap_endpoints:!0,variant_count:5,variation_strength:.3,axis_group_a:[],axis_group_b:[],compute_axis_labels:!1,probe_place_mode:!1,probe_coords:null,probe_cross_coords:null,probe_mode:"2d",probe_text_recon:!1,probe_recon_max_minutes:5,probe_recon_max_iter:10,probe_seed_count:15,probe_noise_count:5,probe_negative_count:5}),Ue=ht(null),vi=ht(!1),Jr=ht(!1),Ni=ht("a");function Ld(n){var t;const e=[];for(const i of(n==null?void 0:n.source_point_ids)??[])e.push(String(i));for(const i of(n==null?void 0:n.neighbors)??[])i.id&&e.push(String(i.id));for(const i of((t=n==null?void 0:n.selection)==null?void 0:t.selected_point_ids)??[])e.push(String(i));return e}const Dm=ht(null);function ka(n){Dm.value=n}const Nm=_i(()=>{var n;return Um((n=Ue.value)==null?void 0:n.axis_b_projection)}),Im=_i(()=>{var n;return Um((n=Ue.value)==null?void 0:n.axis_projection)});function Lt(n){Xe.value={...Xe.value,...n}}function Ul(n){var e;Ue.value=n,vi.value=(((e=n==null?void 0:n.trajectory_overlay)==null?void 0:e.length)??0)>0,Jr.value=!1,Ni.value="a"}function t0(n){vi.value=n}function n0(n){Jr.value=n,n&&(vi.value=!0)}function Um(n){if(!(n!=null&&n.length))return new Map;let e=1/0,t=-1/0;for(const s of n)s.projection_score<e&&(e=s.projection_score),s.projection_score>t&&(t=s.projection_score);const i=Math.max(t-e,1e-8),r=new Map;for(const s of n)r.set(s.id,(s.projection_score-e)/i);return r}const Mt=ht(new Set),Ft=ht(null),Pn=ht(null);function Fm(n){return n.startsWith("__ghost__")||n==="probe"}const Om=_i(()=>new Set(Ld(Ue.value)));function Es(n,e){if(e){const t=new Set(Mt.value);t.has(n)?t.delete(n):t.add(n),Mt.value=t}else Mt.value=new Set([n])}function Dd(){Mt.value=new Set}function i0(n,e){const t=e?n.filter(i=>Fm(i)||e.has(i)):n;Mt.value=new Set(t)}let Gi={cx:0,cy:0,scale:1},Ln={cx:0,cy:0,cz:0,scale:1};function r0(n){const e=n.map(i=>i.coords_2d).filter(i=>Array.isArray(i)&&i.length>=2);Gi=a0(e);const t=n.map(i=>i.coords_3d).filter(i=>Array.isArray(i)&&i.length>=3);Ln=l0(t)}function Lo(n){return!n||n.length<2?null:[(Number(n[0])-Gi.cx)*Gi.scale,-((Number(n[1])-Gi.cy)*Gi.scale)]}function s0(n){return!n||n.length<2?null:[Number(n[0])/Gi.scale+Gi.cx,-(Number(n[1])/Gi.scale)+Gi.cy]}function $r(n){return!n||n.length<3?null:[(Number(n[0])-Ln.cx)*Ln.scale,(Number(n[1])-Ln.cy)*Ln.scale,(Number(n[2])-Ln.cz)*Ln.scale]}function o0(n){return!n||n.length<3?null:[Number(n[0])/Ln.scale+Ln.cx,Number(n[1])/Ln.scale+Ln.cy,Number(n[2])/Ln.scale+Ln.cz]}function a0(n){if(!n.length)return{cx:0,cy:0,scale:1};const e=n.map(l=>Number(l[0])),t=n.map(l=>Number(l[1])),i=Math.min(...e),r=Math.max(...e),s=Math.min(...t),o=Math.max(...t),a=Math.max(r-i,o-s,.001);return{cx:(i+r)/2,cy:(s+o)/2,scale:2/a}}function l0(n){if(!n.length)return{cx:0,cy:0,cz:0,scale:1};const e=n.map(d=>Number(d[0])),t=n.map(d=>Number(d[1])),i=n.map(d=>Number(d[2])),r=Math.min(...e),s=Math.max(...e),o=Math.min(...t),a=Math.max(...t),l=Math.min(...i),c=Math.max(...i),u=Math.max(s-r,a-o,c-l,.001);return{cx:(r+s)/2,cy:(o+a)/2,cz:(l+c)/2,scale:2/u}}const Zi=ht(null),ot=ht(h0()),si=ht("2d");let Jh="",Jo=new Map,Qo=new Map;function Fl(n,e={}){const t=u0(n,e);Zi.value=t,ot.value=km(t)}function Qh(n){si.value=n,ot.value=km(Zi.value)}function c0(n,e,t){if(!e||!t.points.length)return!0;const i=new Set((n.points??[]).map(a=>String(a.id))),r=new Set(t.points.map(a=>String(a.id))),s=i.size===r.size&&[...i].every(a=>r.has(a)),o=JSON.stringify(fu(n))===JSON.stringify(fu(e));return!s||!o}function km(n){const e=Array.isArray(n==null?void 0:n.points)?n.points:[],t=si.value;r0(e);const i=e.map(s=>{if(t==="3d"&&s.coords_3d){const o=$r(s.coords_3d);return o?{...s,view_coords:o}:s}if(t==="2d"&&s.coords_2d){const o=Lo(s.coords_2d);return o?{...s,view_coords:o}:s}return s}),r=new Map(i.map(s=>[String(s.id),s]));return{points:i,byId:r,bounds:d0(i)}}function fu(n){const e=(n==null?void 0:n.source_config)??{};return{dataset_path:e.dataset_path,load_mode:e.load_mode,count:e.count,window_start:e.window_start,random_seed:e.random_seed}}function u0(n,e={}){if(!n)return null;const t=JSON.stringify(fu(n)),i=n.points??[],r=new Set(i.map(l=>String(l.id))),s=t===Jh,o=s&&[...r].every(l=>Jo.has(l)||Qo.has(l));return e.forceCoordinates===!0||!s||!o?(Jh=t,Jo=new Map(i.filter(l=>l.coords_2d).map(l=>[String(l.id),l.coords_2d])),Qo=new Map(i.filter(l=>l.coords_3d).map(l=>[String(l.id),l.coords_3d])),n):o?{...n,points:i.map(l=>{const c=String(l.id);return{...l,...Jo.has(c)?{coords_2d:Jo.get(c)}:{},...Qo.has(c)?{coords_3d:Qo.get(c)}:{}}})}:n}function d0(n){if(!n.length)return{minX:-1,maxX:1,minY:-1,maxY:1};const e=n.map(a=>{var l;return Number(((l=a.view_coords)==null?void 0:l[0])??0)}),t=n.map(a=>{var l;return Number(((l=a.view_coords)==null?void 0:l[1])??0)}),i=Math.min(...e),r=Math.max(...e),s=Math.min(...t),o=Math.max(...t);return{minX:i===r?i-1:i,maxX:i===r?r+1:r,minY:s===o?s-1:s,maxY:s===o?o+1:o}}function h0(){return{points:[],byId:new Map,bounds:{minX:-1,maxX:1,minY:-1,maxY:1}}}function f0(n,e){if(typeof n!="object"||!n)return n;var t=n[Symbol.toPrimitive];if(t!==void 0){var i=t.call(n,e);if(typeof i!="object")return i;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(n)}function yo(n){var e=f0(n,"string");return typeof e=="symbol"?e:e+""}function dn(n,e){if(!(n instanceof e))throw new TypeError("Cannot call a class as a function")}function ef(n,e){for(var t=0;t<e.length;t++){var i=e[t];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(n,yo(i.key),i)}}function hn(n,e,t){return e&&ef(n.prototype,e),t&&ef(n,t),Object.defineProperty(n,"prototype",{writable:!1}),n}function Ns(n){return Ns=Object.setPrototypeOf?Object.getPrototypeOf.bind():function(e){return e.__proto__||Object.getPrototypeOf(e)},Ns(n)}function Bm(){try{var n=!Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],function(){}))}catch{}return(Bm=function(){return!!n})()}function p0(n){if(n===void 0)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return n}function m0(n,e){if(e&&(typeof e=="object"||typeof e=="function"))return e;if(e!==void 0)throw new TypeError("Derived constructors may only return object or undefined");return p0(n)}function Wn(n,e,t){return e=Ns(e),m0(n,Bm()?Reflect.construct(e,t||[],Ns(n).constructor):e.apply(n,t))}function pu(n,e){return pu=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(t,i){return t.__proto__=i,t},pu(n,e)}function $n(n,e){if(typeof e!="function"&&e!==null)throw new TypeError("Super expression must either be null or a function");n.prototype=Object.create(e&&e.prototype,{constructor:{value:n,writable:!0,configurable:!0}}),Object.defineProperty(n,"prototype",{writable:!1}),e&&pu(n,e)}function g0(n){if(Array.isArray(n))return n}function _0(n,e){var t=n==null?null:typeof Symbol<"u"&&n[Symbol.iterator]||n["@@iterator"];if(t!=null){var i,r,s,o,a=[],l=!0,c=!1;try{if(s=(t=t.call(n)).next,e===0){if(Object(t)!==t)return;l=!1}else for(;!(l=(i=s.call(t)).done)&&(a.push(i.value),a.length!==e);l=!0);}catch(u){c=!0,r=u}finally{try{if(!l&&t.return!=null&&(o=t.return(),Object(o)!==o))return}finally{if(c)throw r}}return a}}function mu(n,e){(e==null||e>n.length)&&(e=n.length);for(var t=0,i=Array(e);t<e;t++)i[t]=n[t];return i}function zm(n,e){if(n){if(typeof n=="string")return mu(n,e);var t={}.toString.call(n).slice(8,-1);return t==="Object"&&n.constructor&&(t=n.constructor.name),t==="Map"||t==="Set"?Array.from(n):t==="Arguments"||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t)?mu(n,e):void 0}}function v0(){throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)}function Is(n,e){return g0(n)||_0(n,e)||zm(n,e)||v0()}var sc={black:"#000000",silver:"#C0C0C0",gray:"#808080",grey:"#808080",white:"#FFFFFF",maroon:"#800000",red:"#FF0000",purple:"#800080",fuchsia:"#FF00FF",green:"#008000",lime:"#00FF00",olive:"#808000",yellow:"#FFFF00",navy:"#000080",blue:"#0000FF",teal:"#008080",aqua:"#00FFFF",darkblue:"#00008B",mediumblue:"#0000CD",darkgreen:"#006400",darkcyan:"#008B8B",deepskyblue:"#00BFFF",darkturquoise:"#00CED1",mediumspringgreen:"#00FA9A",springgreen:"#00FF7F",cyan:"#00FFFF",midnightblue:"#191970",dodgerblue:"#1E90FF",lightseagreen:"#20B2AA",forestgreen:"#228B22",seagreen:"#2E8B57",darkslategray:"#2F4F4F",darkslategrey:"#2F4F4F",limegreen:"#32CD32",mediumseagreen:"#3CB371",turquoise:"#40E0D0",royalblue:"#4169E1",steelblue:"#4682B4",darkslateblue:"#483D8B",mediumturquoise:"#48D1CC",indigo:"#4B0082",darkolivegreen:"#556B2F",cadetblue:"#5F9EA0",cornflowerblue:"#6495ED",rebeccapurple:"#663399",mediumaquamarine:"#66CDAA",dimgray:"#696969",dimgrey:"#696969",slateblue:"#6A5ACD",olivedrab:"#6B8E23",slategray:"#708090",slategrey:"#708090",lightslategray:"#778899",lightslategrey:"#778899",mediumslateblue:"#7B68EE",lawngreen:"#7CFC00",chartreuse:"#7FFF00",aquamarine:"#7FFFD4",skyblue:"#87CEEB",lightskyblue:"#87CEFA",blueviolet:"#8A2BE2",darkred:"#8B0000",darkmagenta:"#8B008B",saddlebrown:"#8B4513",darkseagreen:"#8FBC8F",lightgreen:"#90EE90",mediumpurple:"#9370DB",darkviolet:"#9400D3",palegreen:"#98FB98",darkorchid:"#9932CC",yellowgreen:"#9ACD32",sienna:"#A0522D",brown:"#A52A2A",darkgray:"#A9A9A9",darkgrey:"#A9A9A9",lightblue:"#ADD8E6",greenyellow:"#ADFF2F",paleturquoise:"#AFEEEE",lightsteelblue:"#B0C4DE",powderblue:"#B0E0E6",firebrick:"#B22222",darkgoldenrod:"#B8860B",mediumorchid:"#BA55D3",rosybrown:"#BC8F8F",darkkhaki:"#BDB76B",mediumvioletred:"#C71585",indianred:"#CD5C5C",peru:"#CD853F",chocolate:"#D2691E",tan:"#D2B48C",lightgray:"#D3D3D3",lightgrey:"#D3D3D3",thistle:"#D8BFD8",orchid:"#DA70D6",goldenrod:"#DAA520",palevioletred:"#DB7093",crimson:"#DC143C",gainsboro:"#DCDCDC",plum:"#DDA0DD",burlywood:"#DEB887",lightcyan:"#E0FFFF",lavender:"#E6E6FA",darksalmon:"#E9967A",violet:"#EE82EE",palegoldenrod:"#EEE8AA",lightcoral:"#F08080",khaki:"#F0E68C",aliceblue:"#F0F8FF",honeydew:"#F0FFF0",azure:"#F0FFFF",sandybrown:"#F4A460",wheat:"#F5DEB3",beige:"#F5F5DC",whitesmoke:"#F5F5F5",mintcream:"#F5FFFA",ghostwhite:"#F8F8FF",salmon:"#FA8072",antiquewhite:"#FAEBD7",linen:"#FAF0E6",lightgoldenrodyellow:"#FAFAD2",oldlace:"#FDF5E6",magenta:"#FF00FF",deeppink:"#FF1493",orangered:"#FF4500",tomato:"#FF6347",hotpink:"#FF69B4",coral:"#FF7F50",darkorange:"#FF8C00",lightsalmon:"#FFA07A",orange:"#FFA500",lightpink:"#FFB6C1",pink:"#FFC0CB",gold:"#FFD700",peachpuff:"#FFDAB9",navajowhite:"#FFDEAD",moccasin:"#FFE4B5",bisque:"#FFE4C4",mistyrose:"#FFE4E1",blanchedalmond:"#FFEBCD",papayawhip:"#FFEFD5",lavenderblush:"#FFF0F5",seashell:"#FFF5EE",cornsilk:"#FFF8DC",lemonchiffon:"#FFFACD",floralwhite:"#FFFAF0",snow:"#FFFAFA",lightyellow:"#FFFFE0",ivory:"#FFFFF0"},Gm=new Int8Array(4),oc=new Int32Array(Gm.buffer,0,1),x0=new Float32Array(Gm.buffer,0,1),b0=/^\s*rgba?\s*\(/,y0=/^\s*rgba?\s*\(\s*([0-9]*)\s*,\s*([0-9]*)\s*,\s*([0-9]*)(?:\s*,\s*(.*)?)?\)\s*$/;function S0(n){var e=0,t=0,i=0,r=1;if(n[0]==="#")n.length===4?(e=parseInt(n.charAt(1)+n.charAt(1),16),t=parseInt(n.charAt(2)+n.charAt(2),16),i=parseInt(n.charAt(3)+n.charAt(3),16)):(e=parseInt(n.charAt(1)+n.charAt(2),16),t=parseInt(n.charAt(3)+n.charAt(4),16),i=parseInt(n.charAt(5)+n.charAt(6),16)),n.length===9&&(r=parseInt(n.charAt(7)+n.charAt(8),16)/255);else if(b0.test(n)){var s=n.match(y0);s&&(e=+s[1],t=+s[2],i=+s[3],s[4]&&(r=+s[4]))}return{r:e,g:t,b:i,a:r}}var Ms={};for(var ea in sc)Ms[ea]=Hs(sc[ea]),Ms[sc[ea]]=Ms[ea];function Hm(n,e,t,i,r){return oc[0]=i<<24|t<<16|e<<8|n,oc[0]=oc[0]&4278190079,x0[0]}function Hs(n){if(n=n.toLowerCase(),typeof Ms[n]<"u")return Ms[n];var e=S0(n),t=e.r,i=e.g,r=e.b,s=e.a;s=s*255|0;var o=Hm(t,i,r,s);return Ms[n]=o,o}var ac={};function Vm(n){if(typeof ac[n]<"u")return ac[n];var e=(n&16711680)>>>16,t=(n&65280)>>>8,i=n&255,r=255,s=Hm(e,t,i,r);return ac[n]=s,s}function tf(n,e,t,i){return t+(e<<8)+(n<<16)}function nf(n,e,t,i,r,s){var o=Math.floor(t/s*r),a=Math.floor(n.drawingBufferHeight/s-i/s*r),l=new Uint8Array(4);n.bindFramebuffer(n.FRAMEBUFFER,e),n.readPixels(o,a,1,1,n.RGBA,n.UNSIGNED_BYTE,l);var c=Is(l,4),u=c[0],d=c[1],h=c[2],f=c[3];return[u,d,h,f]}function Q(n,e,t){return(e=yo(e))in n?Object.defineProperty(n,e,{value:t,enumerable:!0,configurable:!0,writable:!0}):n[e]=t,n}function rf(n,e){var t=Object.keys(n);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(n);e&&(i=i.filter(function(r){return Object.getOwnPropertyDescriptor(n,r).enumerable})),t.push.apply(t,i)}return t}function Me(n){for(var e=1;e<arguments.length;e++){var t=arguments[e]!=null?arguments[e]:{};e%2?rf(Object(t),!0).forEach(function(i){Q(n,i,t[i])}):Object.getOwnPropertyDescriptors?Object.defineProperties(n,Object.getOwnPropertyDescriptors(t)):rf(Object(t)).forEach(function(i){Object.defineProperty(n,i,Object.getOwnPropertyDescriptor(t,i))})}return n}function E0(n,e){for(;!{}.hasOwnProperty.call(n,e)&&(n=Ns(n))!==null;);return n}function gu(){return gu=typeof Reflect<"u"&&Reflect.get?Reflect.get.bind():function(n,e,t){var i=E0(n,e);if(i){var r=Object.getOwnPropertyDescriptor(i,e);return r.get?r.get.call(arguments.length<3?n:t):r.value}},gu.apply(null,arguments)}function Wm(n,e,t,i){var r=gu(Ns(n.prototype),e,t);return typeof r=="function"?function(s){return r.apply(t,s)}:r}function M0(n){return n.normalized?1:n.size}function lc(n){var e=0;return n.forEach(function(t){return e+=M0(t)}),e}function $m(n,e,t){var i=n==="VERTEX"?e.VERTEX_SHADER:e.FRAGMENT_SHADER,r=e.createShader(i);if(r===null)throw new Error("loadShader: error while creating the shader");e.shaderSource(r,t),e.compileShader(r);var s=e.getShaderParameter(r,e.COMPILE_STATUS);if(!s){var o=e.getShaderInfoLog(r);throw e.deleteShader(r),new Error(`loadShader: error while compiling the shader:
`.concat(o,`
`).concat(t))}return r}function w0(n,e){return $m("VERTEX",n,e)}function T0(n,e){return $m("FRAGMENT",n,e)}function A0(n,e){var t=n.createProgram();if(t===null)throw new Error("loadProgram: error while creating the program.");var i,r;for(i=0,r=e.length;i<r;i++)n.attachShader(t,e[i]);n.linkProgram(t);var s=n.getProgramParameter(t,n.LINK_STATUS);if(!s)throw n.deleteProgram(t),new Error("loadProgram: error while linking the program.");return t}function sf(n){var e=n.gl,t=n.buffer,i=n.program,r=n.vertexShader,s=n.fragmentShader;e.deleteShader(r),e.deleteShader(s),e.deleteProgram(i),e.deleteBuffer(t)}var of=`#define PICKING_MODE
`,C0=Q(Q(Q(Q(Q(Q(Q(Q({},WebGL2RenderingContext.BOOL,1),WebGL2RenderingContext.BYTE,1),WebGL2RenderingContext.UNSIGNED_BYTE,1),WebGL2RenderingContext.SHORT,2),WebGL2RenderingContext.UNSIGNED_SHORT,2),WebGL2RenderingContext.INT,4),WebGL2RenderingContext.UNSIGNED_INT,4),WebGL2RenderingContext.FLOAT,4),Xm=(function(){function n(e,t,i){dn(this,n),Q(this,"array",new Float32Array),Q(this,"constantArray",new Float32Array),Q(this,"capacity",0),Q(this,"verticesCount",0);var r=this.getDefinition();if(this.VERTICES=r.VERTICES,this.VERTEX_SHADER_SOURCE=r.VERTEX_SHADER_SOURCE,this.FRAGMENT_SHADER_SOURCE=r.FRAGMENT_SHADER_SOURCE,this.UNIFORMS=r.UNIFORMS,this.ATTRIBUTES=r.ATTRIBUTES,this.METHOD=r.METHOD,this.CONSTANT_ATTRIBUTES="CONSTANT_ATTRIBUTES"in r?r.CONSTANT_ATTRIBUTES:[],this.CONSTANT_DATA="CONSTANT_DATA"in r?r.CONSTANT_DATA:[],this.isInstanced="CONSTANT_ATTRIBUTES"in r,this.ATTRIBUTES_ITEMS_COUNT=lc(this.ATTRIBUTES),this.STRIDE=this.VERTICES*this.ATTRIBUTES_ITEMS_COUNT,this.renderer=i,this.normalProgram=this.getProgramInfo("normal",e,r.VERTEX_SHADER_SOURCE,r.FRAGMENT_SHADER_SOURCE,null),this.pickProgram=t?this.getProgramInfo("pick",e,of+r.VERTEX_SHADER_SOURCE,of+r.FRAGMENT_SHADER_SOURCE,t):null,this.isInstanced){var s=lc(this.CONSTANT_ATTRIBUTES);if(this.CONSTANT_DATA.length!==this.VERTICES)throw new Error("Program: error while getting constant data (expected ".concat(this.VERTICES," items, received ").concat(this.CONSTANT_DATA.length," instead)"));this.constantArray=new Float32Array(this.CONSTANT_DATA.length*s);for(var o=0;o<this.CONSTANT_DATA.length;o++){var a=this.CONSTANT_DATA[o];if(a.length!==s)throw new Error("Program: error while getting constant data (one vector has ".concat(a.length," items instead of ").concat(s,")"));for(var l=0;l<a.length;l++)this.constantArray[o*s+l]=a[l]}this.STRIDE=this.ATTRIBUTES_ITEMS_COUNT}}return hn(n,[{key:"kill",value:function(){sf(this.normalProgram),this.pickProgram&&(sf(this.pickProgram),this.pickProgram=null)}},{key:"getProgramInfo",value:function(t,i,r,s,o){var a=this.getDefinition(),l=i.createBuffer();if(l===null)throw new Error("Program: error while creating the WebGL buffer.");var c=w0(i,r),u=T0(i,s),d=A0(i,[c,u]),h={};a.UNIFORMS.forEach(function(_){var g=i.getUniformLocation(d,_);g&&(h[_]=g)});var f={};a.ATTRIBUTES.forEach(function(_){f[_.name]=i.getAttribLocation(d,_.name)});var p;if("CONSTANT_ATTRIBUTES"in a&&(a.CONSTANT_ATTRIBUTES.forEach(function(_){f[_.name]=i.getAttribLocation(d,_.name)}),p=i.createBuffer(),p===null))throw new Error("Program: error while creating the WebGL constant buffer.");return{name:t,program:d,gl:i,frameBuffer:o,buffer:l,constantBuffer:p||{},uniformLocations:h,attributeLocations:f,isPicking:t==="pick",vertexShader:c,fragmentShader:u}}},{key:"bindProgram",value:function(t){var i=this,r=0,s=t.gl,o=t.buffer;this.isInstanced?(s.bindBuffer(s.ARRAY_BUFFER,t.constantBuffer),r=0,this.CONSTANT_ATTRIBUTES.forEach(function(a){return r+=i.bindAttribute(a,t,r,!1)}),s.bufferData(s.ARRAY_BUFFER,this.constantArray,s.STATIC_DRAW),s.bindBuffer(s.ARRAY_BUFFER,t.buffer),r=0,this.ATTRIBUTES.forEach(function(a){return r+=i.bindAttribute(a,t,r,!0)}),s.bufferData(s.ARRAY_BUFFER,this.array,s.DYNAMIC_DRAW)):(s.bindBuffer(s.ARRAY_BUFFER,o),r=0,this.ATTRIBUTES.forEach(function(a){return r+=i.bindAttribute(a,t,r)}),s.bufferData(s.ARRAY_BUFFER,this.array,s.DYNAMIC_DRAW)),s.bindBuffer(s.ARRAY_BUFFER,null)}},{key:"unbindProgram",value:function(t){var i=this;this.isInstanced?(this.CONSTANT_ATTRIBUTES.forEach(function(r){return i.unbindAttribute(r,t,!1)}),this.ATTRIBUTES.forEach(function(r){return i.unbindAttribute(r,t,!0)})):this.ATTRIBUTES.forEach(function(r){return i.unbindAttribute(r,t)})}},{key:"bindAttribute",value:function(t,i,r,s){var o=C0[t.type];if(typeof o!="number")throw new Error('Program.bind: yet unsupported attribute type "'.concat(t.type,'"'));var a=i.attributeLocations[t.name],l=i.gl;if(a!==-1){l.enableVertexAttribArray(a);var c=this.isInstanced?(s?this.ATTRIBUTES_ITEMS_COUNT:lc(this.CONSTANT_ATTRIBUTES))*Float32Array.BYTES_PER_ELEMENT:this.ATTRIBUTES_ITEMS_COUNT*Float32Array.BYTES_PER_ELEMENT;if(l.vertexAttribPointer(a,t.size,t.type,t.normalized||!1,c,r),this.isInstanced&&s)if(l instanceof WebGL2RenderingContext)l.vertexAttribDivisor(a,1);else{var u=l.getExtension("ANGLE_instanced_arrays");u&&u.vertexAttribDivisorANGLE(a,1)}}return t.size*o}},{key:"unbindAttribute",value:function(t,i,r){var s=i.attributeLocations[t.name],o=i.gl;if(s!==-1&&(o.disableVertexAttribArray(s),this.isInstanced&&r))if(o instanceof WebGL2RenderingContext)o.vertexAttribDivisor(s,0);else{var a=o.getExtension("ANGLE_instanced_arrays");a&&a.vertexAttribDivisorANGLE(s,0)}}},{key:"reallocate",value:function(t){t!==this.capacity&&(this.capacity=t,this.verticesCount=this.VERTICES*t,this.array=new Float32Array(this.isInstanced?this.capacity*this.ATTRIBUTES_ITEMS_COUNT:this.verticesCount*this.ATTRIBUTES_ITEMS_COUNT))}},{key:"hasNothingToRender",value:function(){return this.verticesCount===0}},{key:"renderProgram",value:function(t,i){var r=i.gl,s=i.program;r.enable(r.BLEND),r.useProgram(s),this.setUniforms(t,i),this.drawWebGL(this.METHOD,i)}},{key:"render",value:function(t){this.hasNothingToRender()||(this.pickProgram&&(this.pickProgram.gl.viewport(0,0,t.width*t.pixelRatio/t.downSizingRatio,t.height*t.pixelRatio/t.downSizingRatio),this.bindProgram(this.pickProgram),this.renderProgram(Me(Me({},t),{},{pixelRatio:t.pixelRatio/t.downSizingRatio}),this.pickProgram),this.unbindProgram(this.pickProgram)),this.normalProgram.gl.viewport(0,0,t.width*t.pixelRatio,t.height*t.pixelRatio),this.bindProgram(this.normalProgram),this.renderProgram(t,this.normalProgram),this.unbindProgram(this.normalProgram))}},{key:"drawWebGL",value:function(t,i){var r=i.gl,s=i.frameBuffer;if(r.bindFramebuffer(r.FRAMEBUFFER,s),!this.isInstanced)r.drawArrays(t,0,this.verticesCount);else if(r instanceof WebGL2RenderingContext)r.drawArraysInstanced(t,0,this.VERTICES,this.capacity);else{var o=r.getExtension("ANGLE_instanced_arrays");o&&o.drawArraysInstancedANGLE(t,0,this.VERTICES,this.capacity)}}}])})(),R0=(function(n){function e(){return dn(this,e),Wn(this,e,arguments)}return $n(e,n),hn(e,[{key:"kill",value:function(){Wm(e,"kill",this)([])}},{key:"process",value:function(i,r,s){var o=r*this.STRIDE;if(s.hidden){for(var a=o+this.STRIDE;o<a;o++)this.array[o]=0;return}return this.processVisibleItem(Vm(i),o,s)}}])})(Xm),Ol=(function(n){function e(){var t;dn(this,e);for(var i=arguments.length,r=new Array(i),s=0;s<i;s++)r[s]=arguments[s];return t=Wn(this,e,[].concat(r)),Q(t,"drawLabel",void 0),t}return $n(e,n),hn(e,[{key:"kill",value:function(){Wm(e,"kill",this)([])}},{key:"process",value:function(i,r,s,o,a){var l=r*this.STRIDE;if(a.hidden||s.hidden||o.hidden){for(var c=l+this.STRIDE;l<c;l++)this.array[l]=0;return}return this.processVisibleItem(Vm(i),l,s,o,a)}}])})(Xm);function P0(n,e){return(function(){function t(i,r,s){dn(this,t),Q(this,"drawLabel",e),this.programs=n.map(function(o){return new o(i,r,s)})}return hn(t,[{key:"reallocate",value:function(r){this.programs.forEach(function(s){return s.reallocate(r)})}},{key:"process",value:function(r,s,o,a,l){this.programs.forEach(function(c){return c.process(r,s,o,a,l)})}},{key:"render",value:function(r){this.programs.forEach(function(s){return s.render(r)})}},{key:"kill",value:function(){this.programs.forEach(function(r){return r.kill()})}}])})()}function L0(n,e,t,i,r){var s=r.edgeLabelSize,o=r.edgeLabelFont,a=r.edgeLabelWeight,l=r.edgeLabelColor.attribute?e[r.edgeLabelColor.attribute]||r.edgeLabelColor.color||"#000":r.edgeLabelColor.color,c=e.label;if(c){n.fillStyle=l,n.font="".concat(a," ").concat(s,"px ").concat(o);var u=t.size,d=i.size,h=t.x,f=t.y,p=i.x,_=i.y,g=(h+p)/2,m=(f+_)/2,v=p-h,y=_-f,x=Math.sqrt(v*v+y*y);if(!(x<u+d)){h+=v*u/x,f+=y*u/x,p-=v*d/x,_-=y*d/x,g=(h+p)/2,m=(f+_)/2,v=p-h,y=_-f,x=Math.sqrt(v*v+y*y);var M=n.measureText(c).width;if(M>x){var E="…";for(c=c+E,M=n.measureText(c).width;M>x&&c.length>1;)c=c.slice(0,-2)+E,M=n.measureText(c).width;if(c.length<4)return}var C;v>0?y>0?C=Math.acos(v/x):C=Math.asin(y/x):y>0?C=Math.acos(v/x)+Math.PI:C=Math.asin(v/x)+Math.PI/2,n.save(),n.translate(g,m),n.rotate(C),n.fillText(c,-M/2,e.size/2+s),n.restore()}}}function jm(n,e,t){if(e.label){var i=t.labelSize,r=t.labelFont,s=t.labelWeight,o=t.labelColor.attribute?e[t.labelColor.attribute]||t.labelColor.color||"#000":t.labelColor.color;n.fillStyle=o,n.font="".concat(s," ").concat(i,"px ").concat(r),n.fillText(e.label,e.x+e.size+3,e.y+i/3)}}function D0(n,e,t){var i=t.labelSize,r=t.labelFont,s=t.labelWeight;n.font="".concat(s," ").concat(i,"px ").concat(r),n.fillStyle="#FFF",n.shadowOffsetX=0,n.shadowOffsetY=0,n.shadowBlur=8,n.shadowColor="#000";var o=2;if(typeof e.label=="string"){var a=n.measureText(e.label).width,l=Math.round(a+5),c=Math.round(i+2*o),u=Math.max(e.size,i/2)+o,d=Math.asin(c/2/u),h=Math.sqrt(Math.abs(Math.pow(u,2)-Math.pow(c/2,2)));n.beginPath(),n.moveTo(e.x+h,e.y+c/2),n.lineTo(e.x+u+l,e.y+c/2),n.lineTo(e.x+u+l,e.y-c/2),n.lineTo(e.x+h,e.y-c/2),n.arc(e.x,e.y,u,d,-d),n.closePath(),n.fill()}else n.beginPath(),n.arc(e.x,e.y,e.size+o,0,Math.PI*2),n.closePath(),n.fill();n.shadowOffsetX=0,n.shadowOffsetY=0,n.shadowBlur=0,jm(n,e,t)}var N0=`
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
`,I0=N0,U0=`
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
`,F0=U0,Ym=WebGLRenderingContext,af=Ym.UNSIGNED_BYTE,cc=Ym.FLOAT,O0=["u_sizeRatio","u_correctionRatio","u_matrix"],kl=(function(n){function e(){return dn(this,e),Wn(this,e,arguments)}return $n(e,n),hn(e,[{key:"getDefinition",value:function(){return{VERTICES:3,VERTEX_SHADER_SOURCE:F0,FRAGMENT_SHADER_SOURCE:I0,METHOD:WebGLRenderingContext.TRIANGLES,UNIFORMS:O0,ATTRIBUTES:[{name:"a_position",size:2,type:cc},{name:"a_size",size:1,type:cc},{name:"a_color",size:4,type:af,normalized:!0},{name:"a_id",size:4,type:af,normalized:!0}],CONSTANT_ATTRIBUTES:[{name:"a_angle",size:1,type:cc}],CONSTANT_DATA:[[e.ANGLE_1],[e.ANGLE_2],[e.ANGLE_3]]}}},{key:"processVisibleItem",value:function(i,r,s){var o=this.array,a=Hs(s.color);o[r++]=s.x,o[r++]=s.y,o[r++]=s.size,o[r++]=a,o[r++]=i}},{key:"setUniforms",value:function(i,r){var s=r.gl,o=r.uniformLocations,a=o.u_sizeRatio,l=o.u_correctionRatio,c=o.u_matrix;s.uniform1f(l,i.correctionRatio),s.uniform1f(a,i.sizeRatio),s.uniformMatrix3fv(c,!1,i.matrix)}}])})(R0);Q(kl,"ANGLE_1",0);Q(kl,"ANGLE_2",2*Math.PI/3);Q(kl,"ANGLE_3",4*Math.PI/3);var k0=`
precision mediump float;

varying vec4 v_color;

void main(void) {
  gl_FragColor = v_color;
}
`,B0=k0,z0=`
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
`,G0=z0,qm=WebGLRenderingContext,lf=qm.UNSIGNED_BYTE,ta=qm.FLOAT,H0=["u_matrix","u_sizeRatio","u_correctionRatio","u_minEdgeThickness","u_lengthToThicknessRatio","u_widenessToThicknessRatio"],Bl={extremity:"target",lengthToThicknessRatio:2.5,widenessToThicknessRatio:2};function Km(n){var e=Me(Me({},Bl),{});return(function(t){function i(){return dn(this,i),Wn(this,i,arguments)}return $n(i,t),hn(i,[{key:"getDefinition",value:function(){return{VERTICES:3,VERTEX_SHADER_SOURCE:G0,FRAGMENT_SHADER_SOURCE:B0,METHOD:WebGLRenderingContext.TRIANGLES,UNIFORMS:H0,ATTRIBUTES:[{name:"a_position",size:2,type:ta},{name:"a_normal",size:2,type:ta},{name:"a_radius",size:1,type:ta},{name:"a_color",size:4,type:lf,normalized:!0},{name:"a_id",size:4,type:lf,normalized:!0}],CONSTANT_ATTRIBUTES:[{name:"a_barycentric",size:3,type:ta}],CONSTANT_DATA:[[1,0,0],[0,1,0],[0,0,1]]}}},{key:"processVisibleItem",value:function(s,o,a,l,c){if(e.extremity==="source"){var u=[l,a];a=u[0],l=u[1]}var d=c.size||1,h=l.size||1,f=a.x,p=a.y,_=l.x,g=l.y,m=Hs(c.color),v=_-f,y=g-p,x=v*v+y*y,M=0,E=0;x&&(x=1/Math.sqrt(x),M=-y*x*d,E=v*x*d);var C=this.array;C[o++]=_,C[o++]=g,C[o++]=-M,C[o++]=-E,C[o++]=h,C[o++]=m,C[o++]=s}},{key:"setUniforms",value:function(s,o){var a=o.gl,l=o.uniformLocations,c=l.u_matrix,u=l.u_sizeRatio,d=l.u_correctionRatio,h=l.u_minEdgeThickness,f=l.u_lengthToThicknessRatio,p=l.u_widenessToThicknessRatio;a.uniformMatrix3fv(c,!1,s.matrix),a.uniform1f(u,s.sizeRatio),a.uniform1f(d,s.correctionRatio),a.uniform1f(h,s.minEdgeThickness),a.uniform1f(f,e.lengthToThicknessRatio),a.uniform1f(p,e.widenessToThicknessRatio)}}])})(Ol)}Km();var V0=`
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
`,Zm=V0,W0=`
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
`,$0=W0,Jm=WebGLRenderingContext,cf=Jm.UNSIGNED_BYTE,Cr=Jm.FLOAT,X0=["u_matrix","u_zoomRatio","u_sizeRatio","u_correctionRatio","u_pixelRatio","u_feather","u_minEdgeThickness","u_lengthToThicknessRatio"],j0={lengthToThicknessRatio:Bl.lengthToThicknessRatio};function Qm(n){var e=Me(Me({},j0),{});return(function(t){function i(){return dn(this,i),Wn(this,i,arguments)}return $n(i,t),hn(i,[{key:"getDefinition",value:function(){return{VERTICES:6,VERTEX_SHADER_SOURCE:$0,FRAGMENT_SHADER_SOURCE:Zm,METHOD:WebGLRenderingContext.TRIANGLES,UNIFORMS:X0,ATTRIBUTES:[{name:"a_positionStart",size:2,type:Cr},{name:"a_positionEnd",size:2,type:Cr},{name:"a_normal",size:2,type:Cr},{name:"a_color",size:4,type:cf,normalized:!0},{name:"a_id",size:4,type:cf,normalized:!0},{name:"a_radius",size:1,type:Cr}],CONSTANT_ATTRIBUTES:[{name:"a_positionCoef",size:1,type:Cr},{name:"a_normalCoef",size:1,type:Cr},{name:"a_radiusCoef",size:1,type:Cr}],CONSTANT_DATA:[[0,1,0],[0,-1,0],[1,1,1],[1,1,1],[0,-1,0],[1,-1,-1]]}}},{key:"processVisibleItem",value:function(s,o,a,l,c){var u=c.size||1,d=a.x,h=a.y,f=l.x,p=l.y,_=Hs(c.color),g=f-d,m=p-h,v=l.size||1,y=g*g+m*m,x=0,M=0;y&&(y=1/Math.sqrt(y),x=-m*y*u,M=g*y*u);var E=this.array;E[o++]=d,E[o++]=h,E[o++]=f,E[o++]=p,E[o++]=x,E[o++]=M,E[o++]=_,E[o++]=s,E[o++]=v}},{key:"setUniforms",value:function(s,o){var a=o.gl,l=o.uniformLocations,c=l.u_matrix,u=l.u_zoomRatio,d=l.u_feather,h=l.u_pixelRatio,f=l.u_correctionRatio,p=l.u_sizeRatio,_=l.u_minEdgeThickness,g=l.u_lengthToThicknessRatio;a.uniformMatrix3fv(c,!1,s.matrix),a.uniform1f(u,s.zoomRatio),a.uniform1f(p,s.sizeRatio),a.uniform1f(f,s.correctionRatio),a.uniform1f(h,s.pixelRatio),a.uniform1f(d,s.antiAliasingFeather),a.uniform1f(_,s.minEdgeThickness),a.uniform1f(g,e.lengthToThicknessRatio)}}])})(Ol)}Qm();function Y0(n){return P0([Qm(),Km()])}var q0=Y0(),K0=q0,Z0=`
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
`,J0=Z0,eg=WebGLRenderingContext,uf=eg.UNSIGNED_BYTE,Ks=eg.FLOAT,Q0=["u_matrix","u_zoomRatio","u_sizeRatio","u_correctionRatio","u_pixelRatio","u_feather","u_minEdgeThickness"],ex=(function(n){function e(){return dn(this,e),Wn(this,e,arguments)}return $n(e,n),hn(e,[{key:"getDefinition",value:function(){return{VERTICES:6,VERTEX_SHADER_SOURCE:J0,FRAGMENT_SHADER_SOURCE:Zm,METHOD:WebGLRenderingContext.TRIANGLES,UNIFORMS:Q0,ATTRIBUTES:[{name:"a_positionStart",size:2,type:Ks},{name:"a_positionEnd",size:2,type:Ks},{name:"a_normal",size:2,type:Ks},{name:"a_color",size:4,type:uf,normalized:!0},{name:"a_id",size:4,type:uf,normalized:!0}],CONSTANT_ATTRIBUTES:[{name:"a_positionCoef",size:1,type:Ks},{name:"a_normalCoef",size:1,type:Ks}],CONSTANT_DATA:[[0,1],[0,-1],[1,1],[1,1],[0,-1],[1,-1]]}}},{key:"processVisibleItem",value:function(i,r,s,o,a){var l=a.size||1,c=s.x,u=s.y,d=o.x,h=o.y,f=Hs(a.color),p=d-c,_=h-u,g=p*p+_*_,m=0,v=0;g&&(g=1/Math.sqrt(g),m=-_*g*l,v=p*g*l);var y=this.array;y[r++]=c,y[r++]=u,y[r++]=d,y[r++]=h,y[r++]=m,y[r++]=v,y[r++]=f,y[r++]=i}},{key:"setUniforms",value:function(i,r){var s=r.gl,o=r.uniformLocations,a=o.u_matrix,l=o.u_zoomRatio,c=o.u_feather,u=o.u_pixelRatio,d=o.u_correctionRatio,h=o.u_sizeRatio,f=o.u_minEdgeThickness;s.uniformMatrix3fv(a,!1,i.matrix),s.uniform1f(l,i.zoomRatio),s.uniform1f(h,i.sizeRatio),s.uniform1f(d,i.correctionRatio),s.uniform1f(u,i.pixelRatio),s.uniform1f(c,i.antiAliasingFeather),s.uniform1f(f,i.minEdgeThickness)}}])})(Ol);function tx(n){return n&&n.__esModule&&Object.prototype.hasOwnProperty.call(n,"default")?n.default:n}var na={exports:{}},df;function nx(){if(df)return na.exports;df=1;var n=typeof Reflect=="object"?Reflect:null,e=n&&typeof n.apply=="function"?n.apply:function(M,E,C){return Function.prototype.apply.call(M,E,C)},t;n&&typeof n.ownKeys=="function"?t=n.ownKeys:Object.getOwnPropertySymbols?t=function(M){return Object.getOwnPropertyNames(M).concat(Object.getOwnPropertySymbols(M))}:t=function(M){return Object.getOwnPropertyNames(M)};function i(x){console&&console.warn&&console.warn(x)}var r=Number.isNaN||function(M){return M!==M};function s(){s.init.call(this)}na.exports=s,na.exports.once=m,s.EventEmitter=s,s.prototype._events=void 0,s.prototype._eventsCount=0,s.prototype._maxListeners=void 0;var o=10;function a(x){if(typeof x!="function")throw new TypeError('The "listener" argument must be of type Function. Received type '+typeof x)}Object.defineProperty(s,"defaultMaxListeners",{enumerable:!0,get:function(){return o},set:function(x){if(typeof x!="number"||x<0||r(x))throw new RangeError('The value of "defaultMaxListeners" is out of range. It must be a non-negative number. Received '+x+".");o=x}}),s.init=function(){(this._events===void 0||this._events===Object.getPrototypeOf(this)._events)&&(this._events=Object.create(null),this._eventsCount=0),this._maxListeners=this._maxListeners||void 0},s.prototype.setMaxListeners=function(M){if(typeof M!="number"||M<0||r(M))throw new RangeError('The value of "n" is out of range. It must be a non-negative number. Received '+M+".");return this._maxListeners=M,this};function l(x){return x._maxListeners===void 0?s.defaultMaxListeners:x._maxListeners}s.prototype.getMaxListeners=function(){return l(this)},s.prototype.emit=function(M){for(var E=[],C=1;C<arguments.length;C++)E.push(arguments[C]);var b=M==="error",A=this._events;if(A!==void 0)b=b&&A.error===void 0;else if(!b)return!1;if(b){var L;if(E.length>0&&(L=E[0]),L instanceof Error)throw L;var P=new Error("Unhandled error."+(L?" ("+L.message+")":""));throw P.context=L,P}var F=A[M];if(F===void 0)return!1;if(typeof F=="function")e(F,this,E);else for(var $=F.length,W=p(F,$),C=0;C<$;++C)e(W[C],this,E);return!0};function c(x,M,E,C){var b,A,L;if(a(E),A=x._events,A===void 0?(A=x._events=Object.create(null),x._eventsCount=0):(A.newListener!==void 0&&(x.emit("newListener",M,E.listener?E.listener:E),A=x._events),L=A[M]),L===void 0)L=A[M]=E,++x._eventsCount;else if(typeof L=="function"?L=A[M]=C?[E,L]:[L,E]:C?L.unshift(E):L.push(E),b=l(x),b>0&&L.length>b&&!L.warned){L.warned=!0;var P=new Error("Possible EventEmitter memory leak detected. "+L.length+" "+String(M)+" listeners added. Use emitter.setMaxListeners() to increase limit");P.name="MaxListenersExceededWarning",P.emitter=x,P.type=M,P.count=L.length,i(P)}return x}s.prototype.addListener=function(M,E){return c(this,M,E,!1)},s.prototype.on=s.prototype.addListener,s.prototype.prependListener=function(M,E){return c(this,M,E,!0)};function u(){if(!this.fired)return this.target.removeListener(this.type,this.wrapFn),this.fired=!0,arguments.length===0?this.listener.call(this.target):this.listener.apply(this.target,arguments)}function d(x,M,E){var C={fired:!1,wrapFn:void 0,target:x,type:M,listener:E},b=u.bind(C);return b.listener=E,C.wrapFn=b,b}s.prototype.once=function(M,E){return a(E),this.on(M,d(this,M,E)),this},s.prototype.prependOnceListener=function(M,E){return a(E),this.prependListener(M,d(this,M,E)),this},s.prototype.removeListener=function(M,E){var C,b,A,L,P;if(a(E),b=this._events,b===void 0)return this;if(C=b[M],C===void 0)return this;if(C===E||C.listener===E)--this._eventsCount===0?this._events=Object.create(null):(delete b[M],b.removeListener&&this.emit("removeListener",M,C.listener||E));else if(typeof C!="function"){for(A=-1,L=C.length-1;L>=0;L--)if(C[L]===E||C[L].listener===E){P=C[L].listener,A=L;break}if(A<0)return this;A===0?C.shift():_(C,A),C.length===1&&(b[M]=C[0]),b.removeListener!==void 0&&this.emit("removeListener",M,P||E)}return this},s.prototype.off=s.prototype.removeListener,s.prototype.removeAllListeners=function(M){var E,C,b;if(C=this._events,C===void 0)return this;if(C.removeListener===void 0)return arguments.length===0?(this._events=Object.create(null),this._eventsCount=0):C[M]!==void 0&&(--this._eventsCount===0?this._events=Object.create(null):delete C[M]),this;if(arguments.length===0){var A=Object.keys(C),L;for(b=0;b<A.length;++b)L=A[b],L!=="removeListener"&&this.removeAllListeners(L);return this.removeAllListeners("removeListener"),this._events=Object.create(null),this._eventsCount=0,this}if(E=C[M],typeof E=="function")this.removeListener(M,E);else if(E!==void 0)for(b=E.length-1;b>=0;b--)this.removeListener(M,E[b]);return this};function h(x,M,E){var C=x._events;if(C===void 0)return[];var b=C[M];return b===void 0?[]:typeof b=="function"?E?[b.listener||b]:[b]:E?g(b):p(b,b.length)}s.prototype.listeners=function(M){return h(this,M,!0)},s.prototype.rawListeners=function(M){return h(this,M,!1)},s.listenerCount=function(x,M){return typeof x.listenerCount=="function"?x.listenerCount(M):f.call(x,M)},s.prototype.listenerCount=f;function f(x){var M=this._events;if(M!==void 0){var E=M[x];if(typeof E=="function")return 1;if(E!==void 0)return E.length}return 0}s.prototype.eventNames=function(){return this._eventsCount>0?t(this._events):[]};function p(x,M){for(var E=new Array(M),C=0;C<M;++C)E[C]=x[C];return E}function _(x,M){for(;M+1<x.length;M++)x[M]=x[M+1];x.pop()}function g(x){for(var M=new Array(x.length),E=0;E<M.length;++E)M[E]=x[E].listener||x[E];return M}function m(x,M){return new Promise(function(E,C){function b(L){x.removeListener(M,A),C(L)}function A(){typeof x.removeListener=="function"&&x.removeListener("error",b),E([].slice.call(arguments))}y(x,M,A,{once:!0}),M!=="error"&&v(x,b,{once:!0})})}function v(x,M,E){typeof x.on=="function"&&y(x,"error",M,E)}function y(x,M,E,C){if(typeof x.on=="function")C.once?x.once(M,E):x.on(M,E);else if(typeof x.addEventListener=="function")x.addEventListener(M,function b(A){C.once&&x.removeEventListener(M,b),E(A)});else throw new TypeError('The "emitter" argument must be of type EventEmitter. Received type '+typeof x)}return na.exports}var tg=nx(),Nd=(function(n){function e(){var t;return dn(this,e),t=Wn(this,e),t.rawEmitter=t,t}return $n(e,n),hn(e)})(tg.EventEmitter),uc,hf;function ix(){return hf||(hf=1,uc=function(e){return e!==null&&typeof e=="object"&&typeof e.addUndirectedEdgeWithKey=="function"&&typeof e.dropNode=="function"&&typeof e.multi=="boolean"}),uc}var rx=ix();const sx=tx(rx);var ox=function(e){return e},ax=function(e){return e*e},lx=function(e){return e*(2-e)},cx=function(e){return(e*=2)<1?.5*e*e:-.5*(--e*(e-2)-1)},ux=function(e){return e*e*e},dx=function(e){return--e*e*e+1},hx=function(e){return(e*=2)<1?.5*e*e*e:.5*((e-=2)*e*e+2)},fx={linear:ox,quadraticIn:ax,quadraticOut:lx,quadraticInOut:cx,cubicIn:ux,cubicOut:dx,cubicInOut:hx},px={easing:"quadraticInOut",duration:150};function Kn(){return Float32Array.of(1,0,0,0,1,0,0,0,1)}function ia(n,e,t){return n[0]=e,n[4]=typeof t=="number"?t:e,n}function ff(n,e){var t=Math.sin(e),i=Math.cos(e);return n[0]=i,n[1]=t,n[3]=-t,n[4]=i,n}function pf(n,e,t){return n[6]=e,n[7]=t,n}function ir(n,e){var t=n[0],i=n[1],r=n[2],s=n[3],o=n[4],a=n[5],l=n[6],c=n[7],u=n[8],d=e[0],h=e[1],f=e[2],p=e[3],_=e[4],g=e[5],m=e[6],v=e[7],y=e[8];return n[0]=d*t+h*s+f*l,n[1]=d*i+h*o+f*c,n[2]=d*r+h*a+f*u,n[3]=p*t+_*s+g*l,n[4]=p*i+_*o+g*c,n[5]=p*r+_*a+g*u,n[6]=m*t+v*s+y*l,n[7]=m*i+v*o+y*c,n[8]=m*r+v*a+y*u,n}function _u(n,e){var t=arguments.length>2&&arguments[2]!==void 0?arguments[2]:1,i=n[0],r=n[1],s=n[3],o=n[4],a=n[6],l=n[7],c=e.x,u=e.y;return{x:c*i+u*s+a*t,y:c*r+u*o+l*t}}function mx(n,e){var t=n.height/n.width,i=e.height/e.width;return t<1&&i>1||t>1&&i<1?1:Math.min(Math.max(i,1/i),Math.max(1/t,t))}function Zs(n,e,t,i,r){var s=n.angle,o=n.ratio,a=n.x,l=n.y,c=e.width,u=e.height,d=Kn(),h=Math.min(c,u)-2*i,f=mx(e,t);return r?(ir(d,pf(Kn(),a,l)),ir(d,ia(Kn(),o)),ir(d,ff(Kn(),s)),ir(d,ia(Kn(),c/h/2/f,u/h/2/f))):(ir(d,ia(Kn(),2*(h/c)*f,2*(h/u)*f)),ir(d,ff(Kn(),-s)),ir(d,ia(Kn(),1/o)),ir(d,pf(Kn(),-a,-l))),d}function gx(n,e,t){var i=_u(n,{x:Math.cos(e.angle),y:Math.sin(e.angle)},0),r=i.x,s=i.y;return 1/Math.sqrt(Math.pow(r,2)+Math.pow(s,2))/t.width}function _x(n){if(!n.order)return{x:[0,1],y:[0,1]};var e=1/0,t=-1/0,i=1/0,r=-1/0;return n.forEachNode(function(s,o){var a=o.x,l=o.y;a<e&&(e=a),a>t&&(t=a),l<i&&(i=l),l>r&&(r=l)}),{x:[e,t],y:[i,r]}}function vx(n){if(!sx(n))throw new Error("Sigma: invalid graph instance.");n.forEachNode(function(e,t){if(!Number.isFinite(t.x)||!Number.isFinite(t.y))throw new Error("Sigma: Coordinates of node ".concat(e," are invalid. A node must have a numeric 'x' and 'y' attribute."))})}function xx(n,e,t){var i=document.createElement(n);if(e)for(var r in e)i.style[r]=e[r];if(t)for(var s in t)i.setAttribute(s,t[s]);return i}function mf(){return typeof window.devicePixelRatio<"u"?window.devicePixelRatio:1}function gf(n,e,t){return t.sort(function(i,r){var s=e(i)||0,o=e(r)||0;return s<o?-1:s>o?1:0})}function _f(n){var e=Is(n.x,2),t=e[0],i=e[1],r=Is(n.y,2),s=r[0],o=r[1],a=Math.max(i-t,o-s),l=(i+t)/2,c=(o+s)/2;(a===0||Math.abs(a)===1/0||isNaN(a))&&(a=1),isNaN(l)&&(l=0),isNaN(c)&&(c=0);var u=function(h){return{x:.5+(h.x-l)/a,y:.5+(h.y-c)/a}};return u.applyTo=function(d){d.x=.5+(d.x-l)/a,d.y=.5+(d.y-c)/a},u.inverse=function(d){return{x:l+a*(d.x-.5),y:c+a*(d.y-.5)}},u.ratio=a,u}function vu(n){"@babel/helpers - typeof";return vu=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(e){return typeof e}:function(e){return e&&typeof Symbol=="function"&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},vu(n)}function vf(n,e){var t=e.size;if(t!==0){var i=n.length;n.length+=t;var r=0;e.forEach(function(s){n[i+r]=s,r++})}}function dc(n){n=n||{};for(var e=0,t=arguments.length<=1?0:arguments.length-1;e<t;e++){var i=e+1<1||arguments.length<=e+1?void 0:arguments[e+1];i&&Object.assign(n,i)}return n}var Id={hideEdgesOnMove:!1,hideLabelsOnMove:!1,renderLabels:!0,renderEdgeLabels:!1,enableEdgeEvents:!1,defaultNodeColor:"#999",defaultNodeType:"circle",defaultEdgeColor:"#ccc",defaultEdgeType:"line",labelFont:"Arial",labelSize:14,labelWeight:"normal",labelColor:{color:"#000"},edgeLabelFont:"Arial",edgeLabelSize:14,edgeLabelWeight:"normal",edgeLabelColor:{attribute:"color"},stagePadding:30,defaultDrawEdgeLabel:L0,defaultDrawNodeLabel:jm,defaultDrawNodeHover:D0,minEdgeThickness:1.7,antiAliasingFeather:1,dragTimeout:100,draggedEventsTolerance:3,inertiaDuration:200,inertiaRatio:3,zoomDuration:250,zoomingRatio:1.7,doubleClickTimeout:300,doubleClickZoomingRatio:2.2,doubleClickZoomingDuration:200,tapMoveTolerance:10,zoomToSizeRatioFunction:Math.sqrt,itemSizesReference:"screen",autoRescale:!0,autoCenter:!0,labelDensity:1,labelGridCellSize:100,labelRenderedSizeThreshold:6,nodeReducer:null,edgeReducer:null,zIndex:!1,minCameraRatio:null,maxCameraRatio:null,enableCameraZooming:!0,enableCameraPanning:!0,enableCameraRotation:!0,cameraPanBoundaries:null,allowInvalidContainer:!1,nodeProgramClasses:{},nodeHoverProgramClasses:{},edgeProgramClasses:{}},bx={circle:kl},yx={arrow:K0,line:ex};function hc(n){if(typeof n.labelDensity!="number"||n.labelDensity<0)throw new Error("Settings: invalid `labelDensity`. Expecting a positive number.");var e=n.minCameraRatio,t=n.maxCameraRatio;if(typeof e=="number"&&typeof t=="number"&&t<e)throw new Error("Settings: invalid camera ratio boundaries. Expecting `maxCameraRatio` to be greater than `minCameraRatio`.")}function Sx(n){var e=dc({},Id,n);return e.nodeProgramClasses=dc({},bx,e.nodeProgramClasses),e.edgeProgramClasses=dc({},yx,e.edgeProgramClasses),e}var ra=1.5,xf=(function(n){function e(){var t;return dn(this,e),t=Wn(this,e),Q(t,"x",.5),Q(t,"y",.5),Q(t,"angle",0),Q(t,"ratio",1),Q(t,"minRatio",null),Q(t,"maxRatio",null),Q(t,"enabledZooming",!0),Q(t,"enabledPanning",!0),Q(t,"enabledRotation",!0),Q(t,"clean",null),Q(t,"nextFrame",null),Q(t,"previousState",null),Q(t,"enabled",!0),t.previousState=t.getState(),t}return $n(e,n),hn(e,[{key:"enable",value:function(){return this.enabled=!0,this}},{key:"disable",value:function(){return this.enabled=!1,this}},{key:"getState",value:function(){return{x:this.x,y:this.y,angle:this.angle,ratio:this.ratio}}},{key:"hasState",value:function(i){return this.x===i.x&&this.y===i.y&&this.ratio===i.ratio&&this.angle===i.angle}},{key:"getPreviousState",value:function(){var i=this.previousState;return i?{x:i.x,y:i.y,angle:i.angle,ratio:i.ratio}:null}},{key:"getBoundedRatio",value:function(i){var r=i;return typeof this.minRatio=="number"&&(r=Math.max(r,this.minRatio)),typeof this.maxRatio=="number"&&(r=Math.min(r,this.maxRatio)),r}},{key:"validateState",value:function(i){var r={};return this.enabledPanning&&typeof i.x=="number"&&(r.x=i.x),this.enabledPanning&&typeof i.y=="number"&&(r.y=i.y),this.enabledZooming&&typeof i.ratio=="number"&&(r.ratio=this.getBoundedRatio(i.ratio)),this.enabledRotation&&typeof i.angle=="number"&&(r.angle=i.angle),this.clean?this.clean(Me(Me({},this.getState()),r)):r}},{key:"isAnimated",value:function(){return!!this.nextFrame}},{key:"setState",value:function(i){if(!this.enabled)return this;this.previousState=this.getState();var r=this.validateState(i);return typeof r.x=="number"&&(this.x=r.x),typeof r.y=="number"&&(this.y=r.y),typeof r.ratio=="number"&&(this.ratio=r.ratio),typeof r.angle=="number"&&(this.angle=r.angle),this.hasState(this.previousState)||this.emit("updated",this.getState()),this}},{key:"updateState",value:function(i){return this.setState(i(this.getState())),this}},{key:"animate",value:function(i){var r=this,s=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},o=arguments.length>2?arguments[2]:void 0;if(!o)return new Promise(function(f){return r.animate(i,s,f)});if(this.enabled){var a=Me(Me({},px),s),l=this.validateState(i),c=typeof a.easing=="function"?a.easing:fx[a.easing],u=Date.now(),d=this.getState(),h=function(){var p=(Date.now()-u)/a.duration;if(p>=1){r.nextFrame=null,r.setState(l),r.animationCallback&&(r.animationCallback.call(null),r.animationCallback=void 0);return}var _=c(p),g={};typeof l.x=="number"&&(g.x=d.x+(l.x-d.x)*_),typeof l.y=="number"&&(g.y=d.y+(l.y-d.y)*_),r.enabledRotation&&typeof l.angle=="number"&&(g.angle=d.angle+(l.angle-d.angle)*_),typeof l.ratio=="number"&&(g.ratio=d.ratio+(l.ratio-d.ratio)*_),r.setState(g),r.nextFrame=requestAnimationFrame(h)};this.nextFrame?(cancelAnimationFrame(this.nextFrame),this.animationCallback&&this.animationCallback.call(null),this.nextFrame=requestAnimationFrame(h)):h(),this.animationCallback=o}}},{key:"animatedZoom",value:function(i){return i?typeof i=="number"?this.animate({ratio:this.ratio/i}):this.animate({ratio:this.ratio/(i.factor||ra)},i):this.animate({ratio:this.ratio/ra})}},{key:"animatedUnzoom",value:function(i){return i?typeof i=="number"?this.animate({ratio:this.ratio*i}):this.animate({ratio:this.ratio*(i.factor||ra)},i):this.animate({ratio:this.ratio*ra})}},{key:"animatedReset",value:function(i){return this.animate({x:.5,y:.5,ratio:1,angle:0},i)}},{key:"copy",value:function(){return e.from(this.getState())}}],[{key:"from",value:function(i){var r=new e;return r.setState(i)}}])})(Nd);function Qn(n,e){var t=e.getBoundingClientRect();return{x:n.clientX-t.left,y:n.clientY-t.top}}function Ri(n,e){var t=Me(Me({},Qn(n,e)),{},{sigmaDefaultPrevented:!1,preventSigmaDefault:function(){t.sigmaDefaultPrevented=!0},original:n});return t}function Js(n){var e="x"in n?n:Me(Me({},n.touches[0]||n.previousTouches[0]),{},{original:n.original,sigmaDefaultPrevented:n.sigmaDefaultPrevented,preventSigmaDefault:function(){n.sigmaDefaultPrevented=!0,e.sigmaDefaultPrevented=!0}});return e}function Ex(n,e){return Me(Me({},Ri(n,e)),{},{delta:ng(n)})}var Mx=2;function Ba(n){for(var e=[],t=0,i=Math.min(n.length,Mx);t<i;t++)e.push(n[t]);return e}function Qs(n,e,t){var i={touches:Ba(n.touches).map(function(r){return Qn(r,t)}),previousTouches:e.map(function(r){return Qn(r,t)}),sigmaDefaultPrevented:!1,preventSigmaDefault:function(){i.sigmaDefaultPrevented=!0},original:n};return i}function ng(n){if(typeof n.deltaY<"u")return n.deltaY*-3/360;if(typeof n.detail<"u")return n.detail/-9;throw new Error("Captor: could not extract delta from event.")}var ig=(function(n){function e(t,i){var r;return dn(this,e),r=Wn(this,e),r.container=t,r.renderer=i,r}return $n(e,n),hn(e)})(Nd),wx=["doubleClickTimeout","doubleClickZoomingDuration","doubleClickZoomingRatio","dragTimeout","draggedEventsTolerance","inertiaDuration","inertiaRatio","zoomDuration","zoomingRatio"],Tx=wx.reduce(function(n,e){return Me(Me({},n),{},Q({},e,Id[e]))},{}),Ax=(function(n){function e(t,i){var r;return dn(this,e),r=Wn(this,e,[t,i]),Q(r,"enabled",!0),Q(r,"draggedEvents",0),Q(r,"downStartTime",null),Q(r,"lastMouseX",null),Q(r,"lastMouseY",null),Q(r,"isMouseDown",!1),Q(r,"isMoving",!1),Q(r,"movingTimeout",null),Q(r,"startCameraState",null),Q(r,"clicks",0),Q(r,"doubleClickTimeout",null),Q(r,"currentWheelDirection",0),Q(r,"settings",Tx),r.handleClick=r.handleClick.bind(r),r.handleRightClick=r.handleRightClick.bind(r),r.handleDown=r.handleDown.bind(r),r.handleUp=r.handleUp.bind(r),r.handleMove=r.handleMove.bind(r),r.handleWheel=r.handleWheel.bind(r),r.handleLeave=r.handleLeave.bind(r),r.handleEnter=r.handleEnter.bind(r),t.addEventListener("click",r.handleClick,{capture:!1}),t.addEventListener("contextmenu",r.handleRightClick,{capture:!1}),t.addEventListener("mousedown",r.handleDown,{capture:!1}),t.addEventListener("wheel",r.handleWheel,{capture:!1}),t.addEventListener("mouseleave",r.handleLeave,{capture:!1}),t.addEventListener("mouseenter",r.handleEnter,{capture:!1}),document.addEventListener("mousemove",r.handleMove,{capture:!1}),document.addEventListener("mouseup",r.handleUp,{capture:!1}),r}return $n(e,n),hn(e,[{key:"kill",value:function(){var i=this.container;i.removeEventListener("click",this.handleClick),i.removeEventListener("contextmenu",this.handleRightClick),i.removeEventListener("mousedown",this.handleDown),i.removeEventListener("wheel",this.handleWheel),i.removeEventListener("mouseleave",this.handleLeave),i.removeEventListener("mouseenter",this.handleEnter),document.removeEventListener("mousemove",this.handleMove),document.removeEventListener("mouseup",this.handleUp)}},{key:"handleClick",value:function(i){var r=this;if(this.enabled){if(this.clicks++,this.clicks===2)return this.clicks=0,typeof this.doubleClickTimeout=="number"&&(clearTimeout(this.doubleClickTimeout),this.doubleClickTimeout=null),this.handleDoubleClick(i);setTimeout(function(){r.clicks=0,r.doubleClickTimeout=null},this.settings.doubleClickTimeout),this.draggedEvents<this.settings.draggedEventsTolerance&&this.emit("click",Ri(i,this.container))}}},{key:"handleRightClick",value:function(i){this.enabled&&this.emit("rightClick",Ri(i,this.container))}},{key:"handleDoubleClick",value:function(i){if(this.enabled){i.preventDefault(),i.stopPropagation();var r=Ri(i,this.container);if(this.emit("doubleClick",r),!r.sigmaDefaultPrevented){var s=this.renderer.getCamera(),o=s.getBoundedRatio(s.getState().ratio/this.settings.doubleClickZoomingRatio);s.animate(this.renderer.getViewportZoomedState(Qn(i,this.container),o),{easing:"quadraticInOut",duration:this.settings.doubleClickZoomingDuration})}}}},{key:"handleDown",value:function(i){if(this.enabled){if(i.button===0){this.startCameraState=this.renderer.getCamera().getState();var r=Qn(i,this.container),s=r.x,o=r.y;this.lastMouseX=s,this.lastMouseY=o,this.draggedEvents=0,this.downStartTime=Date.now(),this.isMouseDown=!0}this.emit("mousedown",Ri(i,this.container))}}},{key:"handleUp",value:function(i){var r=this;if(!(!this.enabled||!this.isMouseDown)){var s=this.renderer.getCamera();this.isMouseDown=!1,typeof this.movingTimeout=="number"&&(clearTimeout(this.movingTimeout),this.movingTimeout=null);var o=Qn(i,this.container),a=o.x,l=o.y,c=s.getState(),u=s.getPreviousState()||{x:0,y:0};this.isMoving?s.animate({x:c.x+this.settings.inertiaRatio*(c.x-u.x),y:c.y+this.settings.inertiaRatio*(c.y-u.y)},{duration:this.settings.inertiaDuration,easing:"quadraticOut"}):(this.lastMouseX!==a||this.lastMouseY!==l)&&s.setState({x:c.x,y:c.y}),this.isMoving=!1,setTimeout(function(){var d=r.draggedEvents>0;r.draggedEvents=0,d&&r.renderer.getSetting("hideEdgesOnMove")&&r.renderer.refresh()},0),this.emit("mouseup",Ri(i,this.container))}}},{key:"handleMove",value:function(i){var r=this;if(this.enabled){var s=Ri(i,this.container);if(this.emit("mousemovebody",s),(i.target===this.container||i.composedPath()[0]===this.container)&&this.emit("mousemove",s),!s.sigmaDefaultPrevented&&this.isMouseDown){this.isMoving=!0,this.draggedEvents++,typeof this.movingTimeout=="number"&&clearTimeout(this.movingTimeout),this.movingTimeout=window.setTimeout(function(){r.movingTimeout=null,r.isMoving=!1},this.settings.dragTimeout);var o=this.renderer.getCamera(),a=Qn(i,this.container),l=a.x,c=a.y,u=this.renderer.viewportToFramedGraph({x:this.lastMouseX,y:this.lastMouseY}),d=this.renderer.viewportToFramedGraph({x:l,y:c}),h=u.x-d.x,f=u.y-d.y,p=o.getState(),_=p.x+h,g=p.y+f;o.setState({x:_,y:g}),this.lastMouseX=l,this.lastMouseY=c,i.preventDefault(),i.stopPropagation()}}}},{key:"handleLeave",value:function(i){this.emit("mouseleave",Ri(i,this.container))}},{key:"handleEnter",value:function(i){this.emit("mouseenter",Ri(i,this.container))}},{key:"handleWheel",value:function(i){var r=this,s=this.renderer.getCamera();if(!(!this.enabled||!s.enabledZooming)){var o=ng(i);if(o){var a=Ex(i,this.container);if(this.emit("wheel",a),a.sigmaDefaultPrevented){i.preventDefault(),i.stopPropagation();return}var l=s.getState().ratio,c=o>0?1/this.settings.zoomingRatio:this.settings.zoomingRatio,u=s.getBoundedRatio(l*c),d=o>0?1:-1,h=Date.now();l!==u&&(i.preventDefault(),i.stopPropagation(),!(this.currentWheelDirection===d&&this.lastWheelTriggerTime&&h-this.lastWheelTriggerTime<this.settings.zoomDuration/5)&&(s.animate(this.renderer.getViewportZoomedState(Qn(i,this.container),u),{easing:"quadraticOut",duration:this.settings.zoomDuration},function(){r.currentWheelDirection=0}),this.currentWheelDirection=d,this.lastWheelTriggerTime=h))}}}},{key:"setSettings",value:function(i){this.settings=i}}])})(ig),Cx=["dragTimeout","inertiaDuration","inertiaRatio","doubleClickTimeout","doubleClickZoomingRatio","doubleClickZoomingDuration","tapMoveTolerance"],Rx=Cx.reduce(function(n,e){return Me(Me({},n),{},Q({},e,Id[e]))},{}),Px=(function(n){function e(t,i){var r;return dn(this,e),r=Wn(this,e,[t,i]),Q(r,"enabled",!0),Q(r,"isMoving",!1),Q(r,"hasMoved",!1),Q(r,"touchMode",0),Q(r,"startTouchesPositions",[]),Q(r,"lastTouches",[]),Q(r,"lastTap",null),Q(r,"settings",Rx),r.handleStart=r.handleStart.bind(r),r.handleLeave=r.handleLeave.bind(r),r.handleMove=r.handleMove.bind(r),t.addEventListener("touchstart",r.handleStart,{capture:!1}),t.addEventListener("touchcancel",r.handleLeave,{capture:!1}),document.addEventListener("touchend",r.handleLeave,{capture:!1,passive:!1}),document.addEventListener("touchmove",r.handleMove,{capture:!1,passive:!1}),r}return $n(e,n),hn(e,[{key:"kill",value:function(){var i=this.container;i.removeEventListener("touchstart",this.handleStart),i.removeEventListener("touchcancel",this.handleLeave),document.removeEventListener("touchend",this.handleLeave),document.removeEventListener("touchmove",this.handleMove)}},{key:"getDimensions",value:function(){return{width:this.container.offsetWidth,height:this.container.offsetHeight}}},{key:"handleStart",value:function(i){var r=this;if(this.enabled){i.preventDefault();var s=Ba(i.touches);if(this.touchMode=s.length,this.startCameraState=this.renderer.getCamera().getState(),this.startTouchesPositions=s.map(function(f){return Qn(f,r.container)}),this.touchMode===2){var o=Is(this.startTouchesPositions,2),a=o[0],l=a.x,c=a.y,u=o[1],d=u.x,h=u.y;this.startTouchesAngle=Math.atan2(h-c,d-l),this.startTouchesDistance=Math.sqrt(Math.pow(d-l,2)+Math.pow(h-c,2))}this.emit("touchdown",Qs(i,this.lastTouches,this.container)),this.lastTouches=s,this.lastTouchesPositions=this.startTouchesPositions}}},{key:"handleLeave",value:function(i){if(!(!this.enabled||!this.startTouchesPositions.length)){switch(i.cancelable&&i.preventDefault(),this.movingTimeout&&(this.isMoving=!1,clearTimeout(this.movingTimeout)),this.touchMode){case 2:if(i.touches.length===1){this.handleStart(i),i.preventDefault();break}case 1:if(this.isMoving){var r=this.renderer.getCamera(),s=r.getState(),o=r.getPreviousState()||{x:0,y:0};r.animate({x:s.x+this.settings.inertiaRatio*(s.x-o.x),y:s.y+this.settings.inertiaRatio*(s.y-o.y)},{duration:this.settings.inertiaDuration,easing:"quadraticOut"})}this.hasMoved=!1,this.isMoving=!1,this.touchMode=0;break}if(this.emit("touchup",Qs(i,this.lastTouches,this.container)),!i.touches.length){var a=Qn(this.lastTouches[0],this.container),l=this.startTouchesPositions[0],c=Math.pow(a.x-l.x,2)+Math.pow(a.y-l.y,2);if(!i.touches.length&&c<Math.pow(this.settings.tapMoveTolerance,2))if(this.lastTap&&Date.now()-this.lastTap.time<this.settings.doubleClickTimeout){var u=Qs(i,this.lastTouches,this.container);if(this.emit("doubletap",u),this.lastTap=null,!u.sigmaDefaultPrevented){var d=this.renderer.getCamera(),h=d.getBoundedRatio(d.getState().ratio/this.settings.doubleClickZoomingRatio);d.animate(this.renderer.getViewportZoomedState(a,h),{easing:"quadraticInOut",duration:this.settings.doubleClickZoomingDuration})}}else{var f=Qs(i,this.lastTouches,this.container);this.emit("tap",f),this.lastTap={time:Date.now(),position:f.touches[0]||f.previousTouches[0]}}}this.lastTouches=Ba(i.touches),this.startTouchesPositions=[]}}},{key:"handleMove",value:function(i){var r=this;if(!(!this.enabled||!this.startTouchesPositions.length)){i.preventDefault();var s=Ba(i.touches),o=s.map(function(de){return Qn(de,r.container)}),a=this.lastTouches;this.lastTouches=s,this.lastTouchesPositions=o;var l=Qs(i,a,this.container);if(this.emit("touchmove",l),!l.sigmaDefaultPrevented&&(this.hasMoved||(this.hasMoved=o.some(function(de,ye){var Fe=r.startTouchesPositions[ye];return Fe&&(de.x!==Fe.x||de.y!==Fe.y)})),!!this.hasMoved)){this.isMoving=!0,this.movingTimeout&&clearTimeout(this.movingTimeout),this.movingTimeout=window.setTimeout(function(){r.isMoving=!1},this.settings.dragTimeout);var c=this.renderer.getCamera(),u=this.startCameraState,d=this.renderer.getSetting("stagePadding");switch(this.touchMode){case 1:{var h=this.renderer.viewportToFramedGraph((this.startTouchesPositions||[])[0]),f=h.x,p=h.y,_=this.renderer.viewportToFramedGraph(o[0]),g=_.x,m=_.y;c.setState({x:u.x+f-g,y:u.y+p-m});break}case 2:{var v={x:.5,y:.5,angle:0,ratio:1},y=o[0],x=y.x,M=y.y,E=o[1],C=E.x,b=E.y,A=Math.atan2(b-M,C-x)-this.startTouchesAngle,L=Math.hypot(b-M,C-x)/this.startTouchesDistance,P=c.getBoundedRatio(u.ratio/L);v.ratio=P,v.angle=u.angle+A;var F=this.getDimensions(),$=this.renderer.viewportToFramedGraph((this.startTouchesPositions||[])[0],{cameraState:u}),W=Math.min(F.width,F.height)-2*d,I=W/F.width,B=W/F.height,H=P/W,Z=x-W/2/I,J=M-W/2/B,ne=[Z*Math.cos(-v.angle)-J*Math.sin(-v.angle),J*Math.cos(-v.angle)+Z*Math.sin(-v.angle)];Z=ne[0],J=ne[1],v.x=$.x-Z*H,v.y=$.y+J*H,c.setState(v);break}}}}}},{key:"setSettings",value:function(i){this.settings=i}}])})(ig);function Lx(n){if(Array.isArray(n))return mu(n)}function Dx(n){if(typeof Symbol<"u"&&n[Symbol.iterator]!=null||n["@@iterator"]!=null)return Array.from(n)}function Nx(){throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)}function bf(n){return Lx(n)||Dx(n)||zm(n)||Nx()}function Ix(n,e){if(n==null)return{};var t={};for(var i in n)if({}.hasOwnProperty.call(n,i)){if(e.indexOf(i)!==-1)continue;t[i]=n[i]}return t}function fc(n,e){if(n==null)return{};var t,i,r=Ix(n,e);if(Object.getOwnPropertySymbols){var s=Object.getOwnPropertySymbols(n);for(i=0;i<s.length;i++)t=s[i],e.indexOf(t)===-1&&{}.propertyIsEnumerable.call(n,t)&&(r[t]=n[t])}return r}var yf=(function(){function n(e,t){dn(this,n),this.key=e,this.size=t}return hn(n,null,[{key:"compare",value:function(t,i){return t.size>i.size?-1:t.size<i.size||t.key>i.key?1:-1}}])})(),Sf=(function(){function n(){dn(this,n),Q(this,"width",0),Q(this,"height",0),Q(this,"cellSize",0),Q(this,"columns",0),Q(this,"rows",0),Q(this,"cells",{})}return hn(n,[{key:"resizeAndClear",value:function(t,i){this.width=t.width,this.height=t.height,this.cellSize=i,this.columns=Math.ceil(t.width/i),this.rows=Math.ceil(t.height/i),this.cells={}}},{key:"getIndex",value:function(t){var i=Math.floor(t.x/this.cellSize),r=Math.floor(t.y/this.cellSize);return r*this.columns+i}},{key:"add",value:function(t,i,r){var s=new yf(t,i),o=this.getIndex(r),a=this.cells[o];a||(a=[],this.cells[o]=a),a.push(s)}},{key:"organize",value:function(){for(var t in this.cells){var i=this.cells[t];i.sort(yf.compare)}}},{key:"getLabelsToDisplay",value:function(t,i){var r=this.cellSize*this.cellSize,s=r/t/t,o=s*i/r,a=Math.ceil(o),l=[];for(var c in this.cells)for(var u=this.cells[c],d=0;d<Math.min(a,u.length);d++)l.push(u[d].key);return l}}])})();function Ux(n){var e=n.graph,t=n.hoveredNode,i=n.highlightedNodes,r=n.displayedNodeLabels,s=[];return e.forEachEdge(function(o,a,l,c){(l===t||c===t||i.has(l)||i.has(c)||r.has(l)&&r.has(c))&&s.push(o)}),s}var Ef=150,Mf=50,Ii=Object.prototype.hasOwnProperty;function Fx(n,e,t){if(!Ii.call(t,"x")||!Ii.call(t,"y"))throw new Error('Sigma: could not find a valid position (x, y) for node "'.concat(e,'". All your nodes must have a number "x" and "y". Maybe your forgot to apply a layout or your "nodeReducer" is not returning the correct data?'));return t.color||(t.color=n.defaultNodeColor),!t.label&&t.label!==""&&(t.label=null),t.label!==void 0&&t.label!==null?t.label=""+t.label:t.label=null,t.size||(t.size=2),Ii.call(t,"hidden")||(t.hidden=!1),Ii.call(t,"highlighted")||(t.highlighted=!1),Ii.call(t,"forceLabel")||(t.forceLabel=!1),(!t.type||t.type==="")&&(t.type=n.defaultNodeType),t.zIndex||(t.zIndex=0),t}function Ox(n,e,t){return t.color||(t.color=n.defaultEdgeColor),t.label||(t.label=""),t.size||(t.size=.5),Ii.call(t,"hidden")||(t.hidden=!1),Ii.call(t,"forceLabel")||(t.forceLabel=!1),(!t.type||t.type==="")&&(t.type=n.defaultEdgeType),t.zIndex||(t.zIndex=0),t}var kx=(function(n){function e(t,i){var r,s=arguments.length>2&&arguments[2]!==void 0?arguments[2]:{};if(dn(this,e),r=Wn(this,e),Q(r,"elements",{}),Q(r,"canvasContexts",{}),Q(r,"webGLContexts",{}),Q(r,"pickingLayers",new Set),Q(r,"textures",{}),Q(r,"frameBuffers",{}),Q(r,"activeListeners",{}),Q(r,"labelGrid",new Sf),Q(r,"nodeDataCache",{}),Q(r,"edgeDataCache",{}),Q(r,"nodeProgramIndex",{}),Q(r,"edgeProgramIndex",{}),Q(r,"nodesWithForcedLabels",new Set),Q(r,"edgesWithForcedLabels",new Set),Q(r,"nodeExtent",{x:[0,1],y:[0,1]}),Q(r,"nodeZExtent",[1/0,-1/0]),Q(r,"edgeZExtent",[1/0,-1/0]),Q(r,"matrix",Kn()),Q(r,"invMatrix",Kn()),Q(r,"correctionRatio",1),Q(r,"customBBox",null),Q(r,"normalizationFunction",_f({x:[0,1],y:[0,1]})),Q(r,"graphToViewportRatio",1),Q(r,"itemIDsIndex",{}),Q(r,"nodeIndices",{}),Q(r,"edgeIndices",{}),Q(r,"width",0),Q(r,"height",0),Q(r,"pixelRatio",mf()),Q(r,"pickingDownSizingRatio",2*r.pixelRatio),Q(r,"displayedNodeLabels",new Set),Q(r,"displayedEdgeLabels",new Set),Q(r,"highlightedNodes",new Set),Q(r,"hoveredNode",null),Q(r,"hoveredEdge",null),Q(r,"renderFrame",null),Q(r,"renderHighlightedNodesFrame",null),Q(r,"needToProcess",!1),Q(r,"checkEdgesEventsFrame",null),Q(r,"nodePrograms",{}),Q(r,"nodeHoverPrograms",{}),Q(r,"edgePrograms",{}),r.settings=Sx(s),hc(r.settings),vx(t),!(i instanceof HTMLElement))throw new Error("Sigma: container should be an html element.");r.graph=t,r.container=i,r.createWebGLContext("edges",{picking:s.enableEdgeEvents}),r.createCanvasContext("edgeLabels"),r.createWebGLContext("nodes",{picking:!0}),r.createCanvasContext("labels"),r.createCanvasContext("hovers"),r.createWebGLContext("hoverNodes"),r.createCanvasContext("mouse",{style:{touchAction:"none",userSelect:"none"}}),r.resize();for(var o in r.settings.nodeProgramClasses)r.registerNodeProgram(o,r.settings.nodeProgramClasses[o],r.settings.nodeHoverProgramClasses[o]);for(var a in r.settings.edgeProgramClasses)r.registerEdgeProgram(a,r.settings.edgeProgramClasses[a]);return r.camera=new xf,r.bindCameraHandlers(),r.mouseCaptor=new Ax(r.elements.mouse,r),r.mouseCaptor.setSettings(r.settings),r.touchCaptor=new Px(r.elements.mouse,r),r.touchCaptor.setSettings(r.settings),r.bindEventHandlers(),r.bindGraphHandlers(),r.handleSettingsUpdate(),r.refresh(),r}return $n(e,n),hn(e,[{key:"registerNodeProgram",value:function(i,r,s){return this.nodePrograms[i]&&this.nodePrograms[i].kill(),this.nodeHoverPrograms[i]&&this.nodeHoverPrograms[i].kill(),this.nodePrograms[i]=new r(this.webGLContexts.nodes,this.frameBuffers.nodes,this),this.nodeHoverPrograms[i]=new(s||r)(this.webGLContexts.hoverNodes,null,this),this}},{key:"registerEdgeProgram",value:function(i,r){return this.edgePrograms[i]&&this.edgePrograms[i].kill(),this.edgePrograms[i]=new r(this.webGLContexts.edges,this.frameBuffers.edges,this),this}},{key:"unregisterNodeProgram",value:function(i){if(this.nodePrograms[i]){var r=this.nodePrograms,s=r[i],o=fc(r,[i].map(yo));s.kill(),this.nodePrograms=o}if(this.nodeHoverPrograms[i]){var a=this.nodeHoverPrograms,l=a[i],c=fc(a,[i].map(yo));l.kill(),this.nodePrograms=c}return this}},{key:"unregisterEdgeProgram",value:function(i){if(this.edgePrograms[i]){var r=this.edgePrograms,s=r[i],o=fc(r,[i].map(yo));s.kill(),this.edgePrograms=o}return this}},{key:"resetWebGLTexture",value:function(i){var r=this.webGLContexts[i],s=this.frameBuffers[i],o=this.textures[i];o&&r.deleteTexture(o);var a=r.createTexture();return r.bindFramebuffer(r.FRAMEBUFFER,s),r.bindTexture(r.TEXTURE_2D,a),r.texImage2D(r.TEXTURE_2D,0,r.RGBA,this.width,this.height,0,r.RGBA,r.UNSIGNED_BYTE,null),r.framebufferTexture2D(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0,r.TEXTURE_2D,a,0),this.textures[i]=a,this}},{key:"bindCameraHandlers",value:function(){var i=this;return this.activeListeners.camera=function(){i.scheduleRender()},this.camera.on("updated",this.activeListeners.camera),this}},{key:"unbindCameraHandlers",value:function(){return this.camera.removeListener("updated",this.activeListeners.camera),this}},{key:"getNodeAtPosition",value:function(i){var r=i.x,s=i.y,o=nf(this.webGLContexts.nodes,this.frameBuffers.nodes,r,s,this.pixelRatio,this.pickingDownSizingRatio),a=tf.apply(void 0,bf(o)),l=this.itemIDsIndex[a];return l&&l.type==="node"?l.id:null}},{key:"bindEventHandlers",value:function(){var i=this;this.activeListeners.handleResize=function(){i.scheduleRefresh()},window.addEventListener("resize",this.activeListeners.handleResize),this.activeListeners.handleMove=function(s){var o=Js(s),a={event:o,preventSigmaDefault:function(){o.preventSigmaDefault()}},l=i.getNodeAtPosition(o);if(l&&i.hoveredNode!==l&&!i.nodeDataCache[l].hidden){i.hoveredNode&&i.emit("leaveNode",Me(Me({},a),{},{node:i.hoveredNode})),i.hoveredNode=l,i.emit("enterNode",Me(Me({},a),{},{node:l})),i.scheduleHighlightedNodesRender();return}if(i.hoveredNode&&i.getNodeAtPosition(o)!==i.hoveredNode){var c=i.hoveredNode;i.hoveredNode=null,i.emit("leaveNode",Me(Me({},a),{},{node:c})),i.scheduleHighlightedNodesRender();return}if(i.settings.enableEdgeEvents){var u=i.hoveredNode?null:i.getEdgeAtPoint(a.event.x,a.event.y);u!==i.hoveredEdge&&(i.hoveredEdge&&i.emit("leaveEdge",Me(Me({},a),{},{edge:i.hoveredEdge})),u&&i.emit("enterEdge",Me(Me({},a),{},{edge:u})),i.hoveredEdge=u)}},this.activeListeners.handleMoveBody=function(s){var o=Js(s);i.emit("moveBody",{event:o,preventSigmaDefault:function(){o.preventSigmaDefault()}})},this.activeListeners.handleLeave=function(s){var o=Js(s),a={event:o,preventSigmaDefault:function(){o.preventSigmaDefault()}};i.hoveredNode&&(i.emit("leaveNode",Me(Me({},a),{},{node:i.hoveredNode})),i.scheduleHighlightedNodesRender()),i.settings.enableEdgeEvents&&i.hoveredEdge&&(i.emit("leaveEdge",Me(Me({},a),{},{edge:i.hoveredEdge})),i.scheduleHighlightedNodesRender()),i.emit("leaveStage",Me({},a))},this.activeListeners.handleEnter=function(s){var o=Js(s),a={event:o,preventSigmaDefault:function(){o.preventSigmaDefault()}};i.emit("enterStage",Me({},a))};var r=function(o){return function(a){var l=Js(a),c={event:l,preventSigmaDefault:function(){l.preventSigmaDefault()}},u=i.getNodeAtPosition(l);if(u)return i.emit("".concat(o,"Node"),Me(Me({},c),{},{node:u}));if(i.settings.enableEdgeEvents){var d=i.getEdgeAtPoint(l.x,l.y);if(d)return i.emit("".concat(o,"Edge"),Me(Me({},c),{},{edge:d}))}return i.emit("".concat(o,"Stage"),c)}};return this.activeListeners.handleClick=r("click"),this.activeListeners.handleRightClick=r("rightClick"),this.activeListeners.handleDoubleClick=r("doubleClick"),this.activeListeners.handleWheel=r("wheel"),this.activeListeners.handleDown=r("down"),this.activeListeners.handleUp=r("up"),this.mouseCaptor.on("mousemove",this.activeListeners.handleMove),this.mouseCaptor.on("mousemovebody",this.activeListeners.handleMoveBody),this.mouseCaptor.on("click",this.activeListeners.handleClick),this.mouseCaptor.on("rightClick",this.activeListeners.handleRightClick),this.mouseCaptor.on("doubleClick",this.activeListeners.handleDoubleClick),this.mouseCaptor.on("wheel",this.activeListeners.handleWheel),this.mouseCaptor.on("mousedown",this.activeListeners.handleDown),this.mouseCaptor.on("mouseup",this.activeListeners.handleUp),this.mouseCaptor.on("mouseleave",this.activeListeners.handleLeave),this.mouseCaptor.on("mouseenter",this.activeListeners.handleEnter),this.touchCaptor.on("touchdown",this.activeListeners.handleDown),this.touchCaptor.on("touchdown",this.activeListeners.handleMove),this.touchCaptor.on("touchup",this.activeListeners.handleUp),this.touchCaptor.on("touchmove",this.activeListeners.handleMove),this.touchCaptor.on("tap",this.activeListeners.handleClick),this.touchCaptor.on("doubletap",this.activeListeners.handleDoubleClick),this.touchCaptor.on("touchmove",this.activeListeners.handleMoveBody),this}},{key:"bindGraphHandlers",value:function(){var i=this,r=this.graph,s=new Set(["x","y","zIndex","type"]);return this.activeListeners.eachNodeAttributesUpdatedGraphUpdate=function(o){var a,l=(a=o.hints)===null||a===void 0?void 0:a.attributes;i.graph.forEachNode(function(u){return i.updateNode(u)});var c=!l||l.some(function(u){return s.has(u)});i.refresh({partialGraph:{nodes:r.nodes()},skipIndexation:!c,schedule:!0})},this.activeListeners.eachEdgeAttributesUpdatedGraphUpdate=function(o){var a,l=(a=o.hints)===null||a===void 0?void 0:a.attributes;i.graph.forEachEdge(function(u){return i.updateEdge(u)});var c=l&&["zIndex","type"].some(function(u){return l==null?void 0:l.includes(u)});i.refresh({partialGraph:{edges:r.edges()},skipIndexation:!c,schedule:!0})},this.activeListeners.addNodeGraphUpdate=function(o){var a=o.key;i.addNode(a),i.refresh({partialGraph:{nodes:[a]},skipIndexation:!1,schedule:!0})},this.activeListeners.updateNodeGraphUpdate=function(o){var a=o.key;i.refresh({partialGraph:{nodes:[a]},skipIndexation:!1,schedule:!0})},this.activeListeners.dropNodeGraphUpdate=function(o){var a=o.key;i.removeNode(a),i.refresh({schedule:!0})},this.activeListeners.addEdgeGraphUpdate=function(o){var a=o.key;i.addEdge(a),i.refresh({partialGraph:{edges:[a]},schedule:!0})},this.activeListeners.updateEdgeGraphUpdate=function(o){var a=o.key;i.refresh({partialGraph:{edges:[a]},skipIndexation:!1,schedule:!0})},this.activeListeners.dropEdgeGraphUpdate=function(o){var a=o.key;i.removeEdge(a),i.refresh({schedule:!0})},this.activeListeners.clearEdgesGraphUpdate=function(){i.clearEdgeState(),i.clearEdgeIndices(),i.refresh({schedule:!0})},this.activeListeners.clearGraphUpdate=function(){i.clearEdgeState(),i.clearNodeState(),i.clearEdgeIndices(),i.clearNodeIndices(),i.refresh({schedule:!0})},r.on("nodeAdded",this.activeListeners.addNodeGraphUpdate),r.on("nodeDropped",this.activeListeners.dropNodeGraphUpdate),r.on("nodeAttributesUpdated",this.activeListeners.updateNodeGraphUpdate),r.on("eachNodeAttributesUpdated",this.activeListeners.eachNodeAttributesUpdatedGraphUpdate),r.on("edgeAdded",this.activeListeners.addEdgeGraphUpdate),r.on("edgeDropped",this.activeListeners.dropEdgeGraphUpdate),r.on("edgeAttributesUpdated",this.activeListeners.updateEdgeGraphUpdate),r.on("eachEdgeAttributesUpdated",this.activeListeners.eachEdgeAttributesUpdatedGraphUpdate),r.on("edgesCleared",this.activeListeners.clearEdgesGraphUpdate),r.on("cleared",this.activeListeners.clearGraphUpdate),this}},{key:"unbindGraphHandlers",value:function(){var i=this.graph;i.removeListener("nodeAdded",this.activeListeners.addNodeGraphUpdate),i.removeListener("nodeDropped",this.activeListeners.dropNodeGraphUpdate),i.removeListener("nodeAttributesUpdated",this.activeListeners.updateNodeGraphUpdate),i.removeListener("eachNodeAttributesUpdated",this.activeListeners.eachNodeAttributesUpdatedGraphUpdate),i.removeListener("edgeAdded",this.activeListeners.addEdgeGraphUpdate),i.removeListener("edgeDropped",this.activeListeners.dropEdgeGraphUpdate),i.removeListener("edgeAttributesUpdated",this.activeListeners.updateEdgeGraphUpdate),i.removeListener("eachEdgeAttributesUpdated",this.activeListeners.eachEdgeAttributesUpdatedGraphUpdate),i.removeListener("edgesCleared",this.activeListeners.clearEdgesGraphUpdate),i.removeListener("cleared",this.activeListeners.clearGraphUpdate)}},{key:"getEdgeAtPoint",value:function(i,r){var s=nf(this.webGLContexts.edges,this.frameBuffers.edges,i,r,this.pixelRatio,this.pickingDownSizingRatio),o=tf.apply(void 0,bf(s)),a=this.itemIDsIndex[o];return a&&a.type==="edge"?a.id:null}},{key:"process",value:function(){var i=this;this.emit("beforeProcess");var r=this.graph,s=this.settings,o=this.getDimensions();if(this.nodeExtent=_x(this.graph),!this.settings.autoRescale){var a=o.width,l=o.height,c=this.nodeExtent,u=c.x,d=c.y;this.nodeExtent={x:[(u[0]+u[1])/2-a/2,(u[0]+u[1])/2+a/2],y:[(d[0]+d[1])/2-l/2,(d[0]+d[1])/2+l/2]}}this.normalizationFunction=_f(this.customBBox||this.nodeExtent);var h=new xf,f=Zs(h.getState(),o,this.getGraphDimensions(),this.getStagePadding());this.labelGrid.resizeAndClear(o,s.labelGridCellSize);for(var p={},_={},g={},m={},v=1,y=r.nodes(),x=0,M=y.length;x<M;x++){var E=y[x],C=this.nodeDataCache[E],b=r.getNodeAttributes(E);C.x=b.x,C.y=b.y,this.normalizationFunction.applyTo(C),typeof C.label=="string"&&!C.hidden&&this.labelGrid.add(E,C.size,this.framedGraphToViewport(C,{matrix:f})),p[C.type]=(p[C.type]||0)+1}this.labelGrid.organize();for(var A in this.nodePrograms){if(!Ii.call(this.nodePrograms,A))throw new Error('Sigma: could not find a suitable program for node type "'.concat(A,'"!'));this.nodePrograms[A].reallocate(p[A]||0),p[A]=0}this.settings.zIndex&&this.nodeZExtent[0]!==this.nodeZExtent[1]&&(y=gf(this.nodeZExtent,function(Ie){return i.nodeDataCache[Ie].zIndex},y));for(var L=0,P=y.length;L<P;L++){var F=y[L];_[F]=v,m[_[F]]={type:"node",id:F},v++;var $=this.nodeDataCache[F];this.addNodeToProgram(F,_[F],p[$.type]++)}for(var W={},I=r.edges(),B=0,H=I.length;B<H;B++){var Z=I[B],J=this.edgeDataCache[Z];W[J.type]=(W[J.type]||0)+1}this.settings.zIndex&&this.edgeZExtent[0]!==this.edgeZExtent[1]&&(I=gf(this.edgeZExtent,function(Ie){return i.edgeDataCache[Ie].zIndex},I));for(var ne in this.edgePrograms){if(!Ii.call(this.edgePrograms,ne))throw new Error('Sigma: could not find a suitable program for edge type "'.concat(ne,'"!'));this.edgePrograms[ne].reallocate(W[ne]||0),W[ne]=0}for(var de=0,ye=I.length;de<ye;de++){var Fe=I[de];g[Fe]=v,m[g[Fe]]={type:"edge",id:Fe},v++;var tt=this.edgeDataCache[Fe];this.addEdgeToProgram(Fe,g[Fe],W[tt.type]++)}return this.itemIDsIndex=m,this.nodeIndices=_,this.edgeIndices=g,this.emit("afterProcess"),this}},{key:"handleSettingsUpdate",value:function(i){var r=this,s=this.settings;if(this.camera.minRatio=s.minCameraRatio,this.camera.maxRatio=s.maxCameraRatio,this.camera.enabledZooming=s.enableCameraZooming,this.camera.enabledPanning=s.enableCameraPanning,this.camera.enabledRotation=s.enableCameraRotation,s.cameraPanBoundaries?this.camera.clean=function(u){return r.cleanCameraState(u,s.cameraPanBoundaries&&vu(s.cameraPanBoundaries)==="object"?s.cameraPanBoundaries:{})}:this.camera.clean=null,this.camera.setState(this.camera.validateState(this.camera.getState())),i){if(i.edgeProgramClasses!==s.edgeProgramClasses){for(var o in s.edgeProgramClasses)s.edgeProgramClasses[o]!==i.edgeProgramClasses[o]&&this.registerEdgeProgram(o,s.edgeProgramClasses[o]);for(var a in i.edgeProgramClasses)s.edgeProgramClasses[a]||this.unregisterEdgeProgram(a)}if(i.nodeProgramClasses!==s.nodeProgramClasses||i.nodeHoverProgramClasses!==s.nodeHoverProgramClasses){for(var l in s.nodeProgramClasses)(s.nodeProgramClasses[l]!==i.nodeProgramClasses[l]||s.nodeHoverProgramClasses[l]!==i.nodeHoverProgramClasses[l])&&this.registerNodeProgram(l,s.nodeProgramClasses[l],s.nodeHoverProgramClasses[l]);for(var c in i.nodeProgramClasses)s.nodeProgramClasses[c]||this.unregisterNodeProgram(c)}}return this.mouseCaptor.setSettings(this.settings),this.touchCaptor.setSettings(this.settings),this}},{key:"cleanCameraState",value:function(i){var r=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},s=r.tolerance,o=s===void 0?0:s,a=r.boundaries,l=Me({},i),c=a||this.nodeExtent,u=Is(c.x,2),d=u[0],h=u[1],f=Is(c.y,2),p=f[0],_=f[1],g=[this.graphToViewport({x:d,y:p},{cameraState:i}),this.graphToViewport({x:h,y:p},{cameraState:i}),this.graphToViewport({x:d,y:_},{cameraState:i}),this.graphToViewport({x:h,y:_},{cameraState:i})],m=1/0,v=-1/0,y=1/0,x=-1/0;g.forEach(function(W){var I=W.x,B=W.y;m=Math.min(m,I),v=Math.max(v,I),y=Math.min(y,B),x=Math.max(x,B)});var M=v-m,E=x-y,C=this.getDimensions(),b=C.width,A=C.height,L=0,P=0;if(M>=b?v<b-o?L=v-(b-o):m>o&&(L=m-o):v>b+o?L=v-(b+o):m<-o&&(L=m+o),E>=A?x<A-o?P=x-(A-o):y>o&&(P=y-o):x>A+o?P=x-(A+o):y<-o&&(P=y+o),L||P){var F=this.viewportToFramedGraph({x:0,y:0},{cameraState:i}),$=this.viewportToFramedGraph({x:L,y:P},{cameraState:i});L=$.x-F.x,P=$.y-F.y,l.x+=L,l.y+=P}return l}},{key:"renderLabels",value:function(){if(!this.settings.renderLabels)return this;var i=this.camera.getState(),r=this.labelGrid.getLabelsToDisplay(i.ratio,this.settings.labelDensity);vf(r,this.nodesWithForcedLabels),this.displayedNodeLabels=new Set;for(var s=this.canvasContexts.labels,o=0,a=r.length;o<a;o++){var l=r[o],c=this.nodeDataCache[l];if(!this.displayedNodeLabels.has(l)&&!c.hidden){var u=this.framedGraphToViewport(c),d=u.x,h=u.y,f=this.scaleSize(c.size);if(!(!c.forceLabel&&f<this.settings.labelRenderedSizeThreshold)&&!(d<-Ef||d>this.width+Ef||h<-Mf||h>this.height+Mf)){this.displayedNodeLabels.add(l);var p=this.settings.defaultDrawNodeLabel,_=this.nodePrograms[c.type],g=(_==null?void 0:_.drawLabel)||p;g(s,Me(Me({key:l},c),{},{size:f,x:d,y:h}),this.settings)}}}return this}},{key:"renderEdgeLabels",value:function(){if(!this.settings.renderEdgeLabels)return this;var i=this.canvasContexts.edgeLabels;i.clearRect(0,0,this.width,this.height);var r=Ux({graph:this.graph,hoveredNode:this.hoveredNode,displayedNodeLabels:this.displayedNodeLabels,highlightedNodes:this.highlightedNodes});vf(r,this.edgesWithForcedLabels);for(var s=new Set,o=0,a=r.length;o<a;o++){var l=r[o],c=this.graph.extremities(l),u=this.nodeDataCache[c[0]],d=this.nodeDataCache[c[1]],h=this.edgeDataCache[l];if(!s.has(l)&&!(h.hidden||u.hidden||d.hidden)){var f=this.settings.defaultDrawEdgeLabel,p=this.edgePrograms[h.type],_=(p==null?void 0:p.drawLabel)||f;_(i,Me(Me({key:l},h),{},{size:this.scaleSize(h.size)}),Me(Me(Me({key:c[0]},u),this.framedGraphToViewport(u)),{},{size:this.scaleSize(u.size)}),Me(Me(Me({key:c[1]},d),this.framedGraphToViewport(d)),{},{size:this.scaleSize(d.size)}),this.settings),s.add(l)}}return this.displayedEdgeLabels=s,this}},{key:"renderHighlightedNodes",value:function(){var i=this,r=this.canvasContexts.hovers;r.clearRect(0,0,this.width,this.height);var s=function(f){var p=i.nodeDataCache[f],_=i.framedGraphToViewport(p),g=_.x,m=_.y,v=i.scaleSize(p.size),y=i.settings.defaultDrawNodeHover,x=i.nodePrograms[p.type],M=(x==null?void 0:x.drawHover)||y;M(r,Me(Me({key:f},p),{},{size:v,x:g,y:m}),i.settings)},o=[];this.hoveredNode&&!this.nodeDataCache[this.hoveredNode].hidden&&o.push(this.hoveredNode),this.highlightedNodes.forEach(function(h){h!==i.hoveredNode&&o.push(h)}),o.forEach(function(h){return s(h)});var a={};o.forEach(function(h){var f=i.nodeDataCache[h].type;a[f]=(a[f]||0)+1});for(var l in this.nodeHoverPrograms)this.nodeHoverPrograms[l].reallocate(a[l]||0),a[l]=0;o.forEach(function(h){var f=i.nodeDataCache[h];i.nodeHoverPrograms[f.type].process(0,a[f.type]++,f)}),this.webGLContexts.hoverNodes.clear(this.webGLContexts.hoverNodes.COLOR_BUFFER_BIT);var c=this.getRenderParams();for(var u in this.nodeHoverPrograms){var d=this.nodeHoverPrograms[u];d.render(c)}}},{key:"scheduleHighlightedNodesRender",value:function(){var i=this;this.renderHighlightedNodesFrame||this.renderFrame||(this.renderHighlightedNodesFrame=requestAnimationFrame(function(){i.renderHighlightedNodesFrame=null,i.renderHighlightedNodes(),i.renderEdgeLabels()}))}},{key:"render",value:function(){var i=this;this.emit("beforeRender");var r=function(){return i.emit("afterRender"),i};if(this.renderFrame&&(cancelAnimationFrame(this.renderFrame),this.renderFrame=null),this.resize(),this.needToProcess&&this.process(),this.needToProcess=!1,this.clear(),this.pickingLayers.forEach(function(g){return i.resetWebGLTexture(g)}),!this.graph.order)return r();var s=this.mouseCaptor,o=this.camera.isAnimated()||s.isMoving||s.draggedEvents||s.currentWheelDirection,a=this.camera.getState(),l=this.getDimensions(),c=this.getGraphDimensions(),u=this.getStagePadding();this.matrix=Zs(a,l,c,u),this.invMatrix=Zs(a,l,c,u,!0),this.correctionRatio=gx(this.matrix,a,l),this.graphToViewportRatio=this.getGraphToViewportRatio();var d=this.getRenderParams();for(var h in this.nodePrograms){var f=this.nodePrograms[h];f.render(d)}if(!this.settings.hideEdgesOnMove||!o)for(var p in this.edgePrograms){var _=this.edgePrograms[p];_.render(d)}return this.settings.hideLabelsOnMove&&o||(this.renderLabels(),this.renderEdgeLabels(),this.renderHighlightedNodes()),r()}},{key:"addNode",value:function(i){var r=Object.assign({},this.graph.getNodeAttributes(i));this.settings.nodeReducer&&(r=this.settings.nodeReducer(i,r));var s=Fx(this.settings,i,r);this.nodeDataCache[i]=s,this.nodesWithForcedLabels.delete(i),s.forceLabel&&!s.hidden&&this.nodesWithForcedLabels.add(i),this.highlightedNodes.delete(i),s.highlighted&&!s.hidden&&this.highlightedNodes.add(i),this.settings.zIndex&&(s.zIndex<this.nodeZExtent[0]&&(this.nodeZExtent[0]=s.zIndex),s.zIndex>this.nodeZExtent[1]&&(this.nodeZExtent[1]=s.zIndex))}},{key:"updateNode",value:function(i){this.addNode(i);var r=this.nodeDataCache[i];this.normalizationFunction.applyTo(r)}},{key:"removeNode",value:function(i){delete this.nodeDataCache[i],delete this.nodeProgramIndex[i],this.highlightedNodes.delete(i),this.hoveredNode===i&&(this.hoveredNode=null),this.nodesWithForcedLabels.delete(i)}},{key:"addEdge",value:function(i){var r=Object.assign({},this.graph.getEdgeAttributes(i));this.settings.edgeReducer&&(r=this.settings.edgeReducer(i,r));var s=Ox(this.settings,i,r);this.edgeDataCache[i]=s,this.edgesWithForcedLabels.delete(i),s.forceLabel&&!s.hidden&&this.edgesWithForcedLabels.add(i),this.settings.zIndex&&(s.zIndex<this.edgeZExtent[0]&&(this.edgeZExtent[0]=s.zIndex),s.zIndex>this.edgeZExtent[1]&&(this.edgeZExtent[1]=s.zIndex))}},{key:"updateEdge",value:function(i){this.addEdge(i)}},{key:"removeEdge",value:function(i){delete this.edgeDataCache[i],delete this.edgeProgramIndex[i],this.hoveredEdge===i&&(this.hoveredEdge=null),this.edgesWithForcedLabels.delete(i)}},{key:"clearNodeIndices",value:function(){this.labelGrid=new Sf,this.nodeExtent={x:[0,1],y:[0,1]},this.nodeDataCache={},this.edgeProgramIndex={},this.nodesWithForcedLabels=new Set,this.nodeZExtent=[1/0,-1/0],this.highlightedNodes=new Set}},{key:"clearEdgeIndices",value:function(){this.edgeDataCache={},this.edgeProgramIndex={},this.edgesWithForcedLabels=new Set,this.edgeZExtent=[1/0,-1/0]}},{key:"clearIndices",value:function(){this.clearEdgeIndices(),this.clearNodeIndices()}},{key:"clearNodeState",value:function(){this.displayedNodeLabels=new Set,this.highlightedNodes=new Set,this.hoveredNode=null}},{key:"clearEdgeState",value:function(){this.displayedEdgeLabels=new Set,this.highlightedNodes=new Set,this.hoveredEdge=null}},{key:"clearState",value:function(){this.clearEdgeState(),this.clearNodeState()}},{key:"addNodeToProgram",value:function(i,r,s){var o=this.nodeDataCache[i],a=this.nodePrograms[o.type];if(!a)throw new Error('Sigma: could not find a suitable program for node type "'.concat(o.type,'"!'));a.process(r,s,o),this.nodeProgramIndex[i]=s}},{key:"addEdgeToProgram",value:function(i,r,s){var o=this.edgeDataCache[i],a=this.edgePrograms[o.type];if(!a)throw new Error('Sigma: could not find a suitable program for edge type "'.concat(o.type,'"!'));var l=this.graph.extremities(i),c=this.nodeDataCache[l[0]],u=this.nodeDataCache[l[1]];a.process(r,s,c,u,o),this.edgeProgramIndex[i]=s}},{key:"getRenderParams",value:function(){return{matrix:this.matrix,invMatrix:this.invMatrix,width:this.width,height:this.height,pixelRatio:this.pixelRatio,zoomRatio:this.camera.ratio,cameraAngle:this.camera.angle,sizeRatio:1/this.scaleSize(),correctionRatio:this.correctionRatio,downSizingRatio:this.pickingDownSizingRatio,minEdgeThickness:this.settings.minEdgeThickness,antiAliasingFeather:this.settings.antiAliasingFeather}}},{key:"getStagePadding",value:function(){var i=this.settings,r=i.stagePadding,s=i.autoRescale;return s&&r||0}},{key:"createLayer",value:function(i,r){var s=arguments.length>2&&arguments[2]!==void 0?arguments[2]:{};if(this.elements[i])throw new Error('Sigma: a layer named "'.concat(i,'" already exists'));var o=xx(r,{position:"absolute"},{class:"sigma-".concat(i)});return s.style&&Object.assign(o.style,s.style),this.elements[i]=o,"beforeLayer"in s&&s.beforeLayer?this.elements[s.beforeLayer].before(o):"afterLayer"in s&&s.afterLayer?this.elements[s.afterLayer].after(o):this.container.appendChild(o),o}},{key:"createCanvas",value:function(i){var r=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{};return this.createLayer(i,"canvas",r)}},{key:"createCanvasContext",value:function(i){var r=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},s=this.createCanvas(i,r),o={preserveDrawingBuffer:!1,antialias:!1};return this.canvasContexts[i]=s.getContext("2d",o),this}},{key:"createWebGLContext",value:function(i){var r=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},s=(r==null?void 0:r.canvas)||this.createCanvas(i,r);r.hidden&&s.remove();var o=Me({preserveDrawingBuffer:!1,antialias:!1},r),a;a=s.getContext("webgl2",o),a||(a=s.getContext("webgl",o)),a||(a=s.getContext("experimental-webgl",o));var l=a;if(this.webGLContexts[i]=l,l.blendFunc(l.ONE,l.ONE_MINUS_SRC_ALPHA),r.picking){this.pickingLayers.add(i);var c=l.createFramebuffer();if(!c)throw new Error("Sigma: cannot create a new frame buffer for layer ".concat(i));this.frameBuffers[i]=c}return l}},{key:"killLayer",value:function(i){var r=this.elements[i];if(!r)throw new Error("Sigma: cannot kill layer ".concat(i,", which does not exist"));if(this.webGLContexts[i]){var s,o=this.webGLContexts[i];(s=o.getExtension("WEBGL_lose_context"))===null||s===void 0||s.loseContext(),delete this.webGLContexts[i]}else this.canvasContexts[i]&&delete this.canvasContexts[i];return r.remove(),delete this.elements[i],this}},{key:"getCamera",value:function(){return this.camera}},{key:"setCamera",value:function(i){this.unbindCameraHandlers(),this.camera=i,this.bindCameraHandlers()}},{key:"getContainer",value:function(){return this.container}},{key:"getGraph",value:function(){return this.graph}},{key:"setGraph",value:function(i){i!==this.graph&&(this.hoveredNode&&!i.hasNode(this.hoveredNode)&&(this.hoveredNode=null),this.hoveredEdge&&!i.hasEdge(this.hoveredEdge)&&(this.hoveredEdge=null),this.unbindGraphHandlers(),this.checkEdgesEventsFrame!==null&&(cancelAnimationFrame(this.checkEdgesEventsFrame),this.checkEdgesEventsFrame=null),this.graph=i,this.bindGraphHandlers(),this.refresh())}},{key:"getMouseCaptor",value:function(){return this.mouseCaptor}},{key:"getTouchCaptor",value:function(){return this.touchCaptor}},{key:"getDimensions",value:function(){return{width:this.width,height:this.height}}},{key:"getGraphDimensions",value:function(){var i=this.customBBox||this.nodeExtent;return{width:i.x[1]-i.x[0]||1,height:i.y[1]-i.y[0]||1}}},{key:"getNodeDisplayData",value:function(i){var r=this.nodeDataCache[i];return r?Object.assign({},r):void 0}},{key:"getEdgeDisplayData",value:function(i){var r=this.edgeDataCache[i];return r?Object.assign({},r):void 0}},{key:"getNodeDisplayedLabels",value:function(){return new Set(this.displayedNodeLabels)}},{key:"getEdgeDisplayedLabels",value:function(){return new Set(this.displayedEdgeLabels)}},{key:"getSettings",value:function(){return Me({},this.settings)}},{key:"getSetting",value:function(i){return this.settings[i]}},{key:"setSetting",value:function(i,r){var s=Me({},this.settings);return this.settings[i]=r,hc(this.settings),this.handleSettingsUpdate(s),this.scheduleRefresh(),this}},{key:"updateSetting",value:function(i,r){return this.setSetting(i,r(this.settings[i])),this}},{key:"setSettings",value:function(i){var r=Me({},this.settings);return this.settings=Me(Me({},this.settings),i),hc(this.settings),this.handleSettingsUpdate(r),this.scheduleRefresh(),this}},{key:"resize",value:function(i){var r=this.width,s=this.height;if(this.width=this.container.offsetWidth,this.height=this.container.offsetHeight,this.pixelRatio=mf(),this.width===0)if(this.settings.allowInvalidContainer)this.width=1;else throw new Error("Sigma: Container has no width. You can set the allowInvalidContainer setting to true to stop seeing this error.");if(this.height===0)if(this.settings.allowInvalidContainer)this.height=1;else throw new Error("Sigma: Container has no height. You can set the allowInvalidContainer setting to true to stop seeing this error.");if(!i&&r===this.width&&s===this.height)return this;for(var o in this.elements){var a=this.elements[o];a.style.width=this.width+"px",a.style.height=this.height+"px"}for(var l in this.canvasContexts)this.elements[l].setAttribute("width",this.width*this.pixelRatio+"px"),this.elements[l].setAttribute("height",this.height*this.pixelRatio+"px"),this.pixelRatio!==1&&this.canvasContexts[l].scale(this.pixelRatio,this.pixelRatio);for(var c in this.webGLContexts){this.elements[c].setAttribute("width",this.width*this.pixelRatio+"px"),this.elements[c].setAttribute("height",this.height*this.pixelRatio+"px");var u=this.webGLContexts[c];if(u.viewport(0,0,this.width*this.pixelRatio,this.height*this.pixelRatio),this.pickingLayers.has(c)){var d=this.textures[c];d&&u.deleteTexture(d)}}return this.emit("resize"),this}},{key:"clear",value:function(){return this.emit("beforeClear"),this.webGLContexts.nodes.bindFramebuffer(WebGLRenderingContext.FRAMEBUFFER,null),this.webGLContexts.nodes.clear(WebGLRenderingContext.COLOR_BUFFER_BIT),this.webGLContexts.edges.bindFramebuffer(WebGLRenderingContext.FRAMEBUFFER,null),this.webGLContexts.edges.clear(WebGLRenderingContext.COLOR_BUFFER_BIT),this.webGLContexts.hoverNodes.clear(WebGLRenderingContext.COLOR_BUFFER_BIT),this.canvasContexts.labels.clearRect(0,0,this.width,this.height),this.canvasContexts.hovers.clearRect(0,0,this.width,this.height),this.canvasContexts.edgeLabels.clearRect(0,0,this.width,this.height),this.emit("afterClear"),this}},{key:"refresh",value:function(i){var r=this,s=(i==null?void 0:i.skipIndexation)!==void 0?i==null?void 0:i.skipIndexation:!1,o=(i==null?void 0:i.schedule)!==void 0?i.schedule:!1,a=!i||!i.partialGraph;if(a)this.clearEdgeIndices(),this.clearNodeIndices(),this.graph.forEachNode(function(x){return r.addNode(x)}),this.graph.forEachEdge(function(x){return r.addEdge(x)});else{for(var l,c,u=((l=i.partialGraph)===null||l===void 0?void 0:l.nodes)||[],d=0,h=(u==null?void 0:u.length)||0;d<h;d++){var f=u[d];if(this.updateNode(f),s){var p=this.nodeProgramIndex[f];if(p===void 0)throw new Error('Sigma: node "'.concat(f,`" can't be repaint`));this.addNodeToProgram(f,this.nodeIndices[f],p)}}for(var _=(i==null||(c=i.partialGraph)===null||c===void 0?void 0:c.edges)||[],g=0,m=_.length;g<m;g++){var v=_[g];if(this.updateEdge(v),s){var y=this.edgeProgramIndex[v];if(y===void 0)throw new Error('Sigma: edge "'.concat(v,`" can't be repaint`));this.addEdgeToProgram(v,this.edgeIndices[v],y)}}}return(a||!s)&&(this.needToProcess=!0),o?this.scheduleRender():this.render(),this}},{key:"scheduleRender",value:function(){var i=this;return this.renderFrame||(this.renderFrame=requestAnimationFrame(function(){i.render()})),this}},{key:"scheduleRefresh",value:function(i){return this.refresh(Me(Me({},i),{},{schedule:!0}))}},{key:"getViewportZoomedState",value:function(i,r){var s=this.camera.getState(),o=s.ratio,a=s.angle,l=s.x,c=s.y,u=this.settings,d=u.minCameraRatio,h=u.maxCameraRatio;typeof h=="number"&&(r=Math.min(r,h)),typeof d=="number"&&(r=Math.max(r,d));var f=r/o,p={x:this.width/2,y:this.height/2},_=this.viewportToFramedGraph(i),g=this.viewportToFramedGraph(p);return{angle:a,x:(_.x-g.x)*(1-f)+l,y:(_.y-g.y)*(1-f)+c,ratio:r}}},{key:"viewRectangle",value:function(){var i=this.viewportToFramedGraph({x:0,y:0}),r=this.viewportToFramedGraph({x:this.width,y:0}),s=this.viewportToFramedGraph({x:0,y:this.height});return{x1:i.x,y1:i.y,x2:r.x,y2:r.y,height:r.y-s.y}}},{key:"framedGraphToViewport",value:function(i){var r=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},s=!!r.cameraState||!!r.viewportDimensions||!!r.graphDimensions,o=r.matrix?r.matrix:s?Zs(r.cameraState||this.camera.getState(),r.viewportDimensions||this.getDimensions(),r.graphDimensions||this.getGraphDimensions(),r.padding||this.getStagePadding()):this.matrix,a=_u(o,i);return{x:(1+a.x)*this.width/2,y:(1-a.y)*this.height/2}}},{key:"viewportToFramedGraph",value:function(i){var r=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},s=!!r.cameraState||!!r.viewportDimensions||!r.graphDimensions,o=r.matrix?r.matrix:s?Zs(r.cameraState||this.camera.getState(),r.viewportDimensions||this.getDimensions(),r.graphDimensions||this.getGraphDimensions(),r.padding||this.getStagePadding(),!0):this.invMatrix,a=_u(o,{x:i.x/this.width*2-1,y:1-i.y/this.height*2});return isNaN(a.x)&&(a.x=0),isNaN(a.y)&&(a.y=0),a}},{key:"viewportToGraph",value:function(i){var r=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{};return this.normalizationFunction.inverse(this.viewportToFramedGraph(i,r))}},{key:"graphToViewport",value:function(i){var r=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{};return this.framedGraphToViewport(this.normalizationFunction(i),r)}},{key:"getGraphToViewportRatio",value:function(){var i={x:0,y:0},r={x:1,y:1},s=Math.sqrt(Math.pow(i.x-r.x,2)+Math.pow(i.y-r.y,2)),o=this.graphToViewport(i),a=this.graphToViewport(r),l=Math.sqrt(Math.pow(o.x-a.x,2)+Math.pow(o.y-a.y,2));return l/s}},{key:"getBBox",value:function(){return this.nodeExtent}},{key:"getCustomBBox",value:function(){return this.customBBox}},{key:"setCustomBBox",value:function(i){return this.customBBox=i,this.scheduleRender(),this}},{key:"kill",value:function(){this.emit("kill"),this.removeAllListeners(),this.unbindCameraHandlers(),window.removeEventListener("resize",this.activeListeners.handleResize),this.mouseCaptor.kill(),this.touchCaptor.kill(),this.unbindGraphHandlers(),this.clearIndices(),this.clearState(),this.nodeDataCache={},this.edgeDataCache={},this.highlightedNodes.clear(),this.renderFrame&&(cancelAnimationFrame(this.renderFrame),this.renderFrame=null),this.renderHighlightedNodesFrame&&(cancelAnimationFrame(this.renderHighlightedNodesFrame),this.renderHighlightedNodesFrame=null);for(var i=this.container;i.firstChild;)i.removeChild(i.firstChild);for(var r in this.nodePrograms)this.nodePrograms[r].kill();for(var s in this.nodeHoverPrograms)this.nodeHoverPrograms[s].kill();for(var o in this.edgePrograms)this.edgePrograms[o].kill();this.nodePrograms={},this.nodeHoverPrograms={},this.edgePrograms={};for(var a in this.elements)this.killLayer(a);this.canvasContexts={},this.webGLContexts={},this.elements={}}},{key:"scaleSize",value:function(){var i=arguments.length>0&&arguments[0]!==void 0?arguments[0]:1,r=arguments.length>1&&arguments[1]!==void 0?arguments[1]:this.camera.ratio;return i/this.settings.zoomToSizeRatioFunction(r)*(this.getSetting("itemSizesReference")==="positions"?r*this.graphToViewportRatio:1)}},{key:"getCanvases",value:function(){var i={};for(var r in this.elements)this.elements[r]instanceof HTMLCanvasElement&&(i[r]=this.elements[r]);return i}}])})(Nd),Bx=kx;function zx(){const n=arguments[0];for(let e=1,t=arguments.length;e<t;e++)if(arguments[e])for(const i in arguments[e])n[i]=arguments[e][i];return n}let qt=zx;typeof Object.assign=="function"&&(qt=Object.assign);function Hn(n,e,t,i){const r=n._nodes.get(e);let s=null;return r&&(i==="mixed"?s=r.out&&r.out[t]||r.undirected&&r.undirected[t]:i==="directed"?s=r.out&&r.out[t]:s=r.undirected&&r.undirected[t]),s}function nn(n){return typeof n=="object"&&n!==null}function rg(n){let e;for(e in n)return!1;return!0}function Nn(n,e,t){Object.defineProperty(n,e,{enumerable:!1,configurable:!1,writable:!0,value:t})}function Xn(n,e,t){const i={enumerable:!0,configurable:!0};typeof t=="function"?i.get=t:(i.value=t,i.writable=!1),Object.defineProperty(n,e,i)}function wf(n){return!(!nn(n)||n.attributes&&!Array.isArray(n.attributes))}function Gx(){let n=Math.floor(Math.random()*256)&255;return()=>n++}function $i(){const n=arguments;let e=null,t=-1;return{[Symbol.iterator](){return this},next(){let i=null;do{if(e===null){if(t++,t>=n.length)return{done:!0};e=n[t][Symbol.iterator]()}if(i=e.next(),i.done){e=null;continue}break}while(!0);return i}}}function Vs(){return{[Symbol.iterator](){return this},next(){return{done:!0}}}}class Ud extends Error{constructor(e){super(),this.name="GraphError",this.message=e}}class ve extends Ud{constructor(e){super(e),this.name="InvalidArgumentsGraphError",typeof Error.captureStackTrace=="function"&&Error.captureStackTrace(this,ve.prototype.constructor)}}class ae extends Ud{constructor(e){super(e),this.name="NotFoundGraphError",typeof Error.captureStackTrace=="function"&&Error.captureStackTrace(this,ae.prototype.constructor)}}class De extends Ud{constructor(e){super(e),this.name="UsageGraphError",typeof Error.captureStackTrace=="function"&&Error.captureStackTrace(this,De.prototype.constructor)}}function sg(n,e){this.key=n,this.attributes=e,this.clear()}sg.prototype.clear=function(){this.inDegree=0,this.outDegree=0,this.undirectedDegree=0,this.undirectedLoops=0,this.directedLoops=0,this.in={},this.out={},this.undirected={}};function og(n,e){this.key=n,this.attributes=e,this.clear()}og.prototype.clear=function(){this.inDegree=0,this.outDegree=0,this.directedLoops=0,this.in={},this.out={}};function ag(n,e){this.key=n,this.attributes=e,this.clear()}ag.prototype.clear=function(){this.undirectedDegree=0,this.undirectedLoops=0,this.undirected={}};function Ws(n,e,t,i,r){this.key=e,this.attributes=r,this.undirected=n,this.source=t,this.target=i}Ws.prototype.attach=function(){let n="out",e="in";this.undirected&&(n=e="undirected");const t=this.source.key,i=this.target.key;this.source[n][i]=this,!(this.undirected&&t===i)&&(this.target[e][t]=this)};Ws.prototype.attachMulti=function(){let n="out",e="in";const t=this.source.key,i=this.target.key;this.undirected&&(n=e="undirected");const r=this.source[n],s=r[i];if(typeof s>"u"){r[i]=this,this.undirected&&t===i||(this.target[e][t]=this);return}s.previous=this,this.next=s,r[i]=this,this.target[e][t]=this};Ws.prototype.detach=function(){const n=this.source.key,e=this.target.key;let t="out",i="in";this.undirected&&(t=i="undirected"),delete this.source[t][e],delete this.target[i][n]};Ws.prototype.detachMulti=function(){const n=this.source.key,e=this.target.key;let t="out",i="in";this.undirected&&(t=i="undirected"),this.previous===void 0?this.next===void 0?(delete this.source[t][e],delete this.target[i][n]):(this.next.previous=void 0,this.source[t][e]=this.next,this.target[i][n]=this.next):(this.previous.next=this.next,this.next!==void 0&&(this.next.previous=this.previous))};const lg=0,cg=1,Hx=2,ug=3;function Ji(n,e,t,i,r,s,o){let a,l,c,u;if(i=""+i,t===lg){if(a=n._nodes.get(i),!a)throw new ae(`Graph.${e}: could not find the "${i}" node in the graph.`);c=r,u=s}else if(t===ug){if(r=""+r,l=n._edges.get(r),!l)throw new ae(`Graph.${e}: could not find the "${r}" edge in the graph.`);const d=l.source.key,h=l.target.key;if(i===d)a=l.target;else if(i===h)a=l.source;else throw new ae(`Graph.${e}: the "${i}" node is not attached to the "${r}" edge (${d}, ${h}).`);c=s,u=o}else{if(l=n._edges.get(i),!l)throw new ae(`Graph.${e}: could not find the "${i}" edge in the graph.`);t===cg?a=l.source:a=l.target,c=r,u=s}return[a,c,u]}function Vx(n,e,t){n.prototype[e]=function(i,r,s){const[o,a]=Ji(this,e,t,i,r,s);return o.attributes[a]}}function Wx(n,e,t){n.prototype[e]=function(i,r){const[s]=Ji(this,e,t,i,r);return s.attributes}}function $x(n,e,t){n.prototype[e]=function(i,r,s){const[o,a]=Ji(this,e,t,i,r,s);return o.attributes.hasOwnProperty(a)}}function Xx(n,e,t){n.prototype[e]=function(i,r,s,o){const[a,l,c]=Ji(this,e,t,i,r,s,o);return a.attributes[l]=c,this.emit("nodeAttributesUpdated",{key:a.key,type:"set",attributes:a.attributes,name:l}),this}}function jx(n,e,t){n.prototype[e]=function(i,r,s,o){const[a,l,c]=Ji(this,e,t,i,r,s,o);if(typeof c!="function")throw new ve(`Graph.${e}: updater should be a function.`);const u=a.attributes,d=c(u[l]);return u[l]=d,this.emit("nodeAttributesUpdated",{key:a.key,type:"set",attributes:a.attributes,name:l}),this}}function Yx(n,e,t){n.prototype[e]=function(i,r,s){const[o,a]=Ji(this,e,t,i,r,s);return delete o.attributes[a],this.emit("nodeAttributesUpdated",{key:o.key,type:"remove",attributes:o.attributes,name:a}),this}}function qx(n,e,t){n.prototype[e]=function(i,r,s){const[o,a]=Ji(this,e,t,i,r,s);if(!nn(a))throw new ve(`Graph.${e}: provided attributes are not a plain object.`);return o.attributes=a,this.emit("nodeAttributesUpdated",{key:o.key,type:"replace",attributes:o.attributes}),this}}function Kx(n,e,t){n.prototype[e]=function(i,r,s){const[o,a]=Ji(this,e,t,i,r,s);if(!nn(a))throw new ve(`Graph.${e}: provided attributes are not a plain object.`);return qt(o.attributes,a),this.emit("nodeAttributesUpdated",{key:o.key,type:"merge",attributes:o.attributes,data:a}),this}}function Zx(n,e,t){n.prototype[e]=function(i,r,s){const[o,a]=Ji(this,e,t,i,r,s);if(typeof a!="function")throw new ve(`Graph.${e}: provided updater is not a function.`);return o.attributes=a(o.attributes),this.emit("nodeAttributesUpdated",{key:o.key,type:"update",attributes:o.attributes}),this}}const Jx=[{name:n=>`get${n}Attribute`,attacher:Vx},{name:n=>`get${n}Attributes`,attacher:Wx},{name:n=>`has${n}Attribute`,attacher:$x},{name:n=>`set${n}Attribute`,attacher:Xx},{name:n=>`update${n}Attribute`,attacher:jx},{name:n=>`remove${n}Attribute`,attacher:Yx},{name:n=>`replace${n}Attributes`,attacher:qx},{name:n=>`merge${n}Attributes`,attacher:Kx},{name:n=>`update${n}Attributes`,attacher:Zx}];function Qx(n){Jx.forEach(function({name:e,attacher:t}){t(n,e("Node"),lg),t(n,e("Source"),cg),t(n,e("Target"),Hx),t(n,e("Opposite"),ug)})}function eb(n,e,t){n.prototype[e]=function(i,r){let s;if(this.type!=="mixed"&&t!=="mixed"&&t!==this.type)throw new De(`Graph.${e}: cannot find this type of edges in your ${this.type} graph.`);if(arguments.length>2){if(this.multi)throw new De(`Graph.${e}: cannot use a {source,target} combo when asking about an edge's attributes in a MultiGraph since we cannot infer the one you want information about.`);const o=""+i,a=""+r;if(r=arguments[2],s=Hn(this,o,a,t),!s)throw new ae(`Graph.${e}: could not find an edge for the given path ("${o}" - "${a}").`)}else{if(t!=="mixed")throw new De(`Graph.${e}: calling this method with only a key (vs. a source and target) does not make sense since an edge with this key could have the other type.`);if(i=""+i,s=this._edges.get(i),!s)throw new ae(`Graph.${e}: could not find the "${i}" edge in the graph.`)}return s.attributes[r]}}function tb(n,e,t){n.prototype[e]=function(i){let r;if(this.type!=="mixed"&&t!=="mixed"&&t!==this.type)throw new De(`Graph.${e}: cannot find this type of edges in your ${this.type} graph.`);if(arguments.length>1){if(this.multi)throw new De(`Graph.${e}: cannot use a {source,target} combo when asking about an edge's attributes in a MultiGraph since we cannot infer the one you want information about.`);const s=""+i,o=""+arguments[1];if(r=Hn(this,s,o,t),!r)throw new ae(`Graph.${e}: could not find an edge for the given path ("${s}" - "${o}").`)}else{if(t!=="mixed")throw new De(`Graph.${e}: calling this method with only a key (vs. a source and target) does not make sense since an edge with this key could have the other type.`);if(i=""+i,r=this._edges.get(i),!r)throw new ae(`Graph.${e}: could not find the "${i}" edge in the graph.`)}return r.attributes}}function nb(n,e,t){n.prototype[e]=function(i,r){let s;if(this.type!=="mixed"&&t!=="mixed"&&t!==this.type)throw new De(`Graph.${e}: cannot find this type of edges in your ${this.type} graph.`);if(arguments.length>2){if(this.multi)throw new De(`Graph.${e}: cannot use a {source,target} combo when asking about an edge's attributes in a MultiGraph since we cannot infer the one you want information about.`);const o=""+i,a=""+r;if(r=arguments[2],s=Hn(this,o,a,t),!s)throw new ae(`Graph.${e}: could not find an edge for the given path ("${o}" - "${a}").`)}else{if(t!=="mixed")throw new De(`Graph.${e}: calling this method with only a key (vs. a source and target) does not make sense since an edge with this key could have the other type.`);if(i=""+i,s=this._edges.get(i),!s)throw new ae(`Graph.${e}: could not find the "${i}" edge in the graph.`)}return s.attributes.hasOwnProperty(r)}}function ib(n,e,t){n.prototype[e]=function(i,r,s){let o;if(this.type!=="mixed"&&t!=="mixed"&&t!==this.type)throw new De(`Graph.${e}: cannot find this type of edges in your ${this.type} graph.`);if(arguments.length>3){if(this.multi)throw new De(`Graph.${e}: cannot use a {source,target} combo when asking about an edge's attributes in a MultiGraph since we cannot infer the one you want information about.`);const a=""+i,l=""+r;if(r=arguments[2],s=arguments[3],o=Hn(this,a,l,t),!o)throw new ae(`Graph.${e}: could not find an edge for the given path ("${a}" - "${l}").`)}else{if(t!=="mixed")throw new De(`Graph.${e}: calling this method with only a key (vs. a source and target) does not make sense since an edge with this key could have the other type.`);if(i=""+i,o=this._edges.get(i),!o)throw new ae(`Graph.${e}: could not find the "${i}" edge in the graph.`)}return o.attributes[r]=s,this.emit("edgeAttributesUpdated",{key:o.key,type:"set",attributes:o.attributes,name:r}),this}}function rb(n,e,t){n.prototype[e]=function(i,r,s){let o;if(this.type!=="mixed"&&t!=="mixed"&&t!==this.type)throw new De(`Graph.${e}: cannot find this type of edges in your ${this.type} graph.`);if(arguments.length>3){if(this.multi)throw new De(`Graph.${e}: cannot use a {source,target} combo when asking about an edge's attributes in a MultiGraph since we cannot infer the one you want information about.`);const a=""+i,l=""+r;if(r=arguments[2],s=arguments[3],o=Hn(this,a,l,t),!o)throw new ae(`Graph.${e}: could not find an edge for the given path ("${a}" - "${l}").`)}else{if(t!=="mixed")throw new De(`Graph.${e}: calling this method with only a key (vs. a source and target) does not make sense since an edge with this key could have the other type.`);if(i=""+i,o=this._edges.get(i),!o)throw new ae(`Graph.${e}: could not find the "${i}" edge in the graph.`)}if(typeof s!="function")throw new ve(`Graph.${e}: updater should be a function.`);return o.attributes[r]=s(o.attributes[r]),this.emit("edgeAttributesUpdated",{key:o.key,type:"set",attributes:o.attributes,name:r}),this}}function sb(n,e,t){n.prototype[e]=function(i,r){let s;if(this.type!=="mixed"&&t!=="mixed"&&t!==this.type)throw new De(`Graph.${e}: cannot find this type of edges in your ${this.type} graph.`);if(arguments.length>2){if(this.multi)throw new De(`Graph.${e}: cannot use a {source,target} combo when asking about an edge's attributes in a MultiGraph since we cannot infer the one you want information about.`);const o=""+i,a=""+r;if(r=arguments[2],s=Hn(this,o,a,t),!s)throw new ae(`Graph.${e}: could not find an edge for the given path ("${o}" - "${a}").`)}else{if(t!=="mixed")throw new De(`Graph.${e}: calling this method with only a key (vs. a source and target) does not make sense since an edge with this key could have the other type.`);if(i=""+i,s=this._edges.get(i),!s)throw new ae(`Graph.${e}: could not find the "${i}" edge in the graph.`)}return delete s.attributes[r],this.emit("edgeAttributesUpdated",{key:s.key,type:"remove",attributes:s.attributes,name:r}),this}}function ob(n,e,t){n.prototype[e]=function(i,r){let s;if(this.type!=="mixed"&&t!=="mixed"&&t!==this.type)throw new De(`Graph.${e}: cannot find this type of edges in your ${this.type} graph.`);if(arguments.length>2){if(this.multi)throw new De(`Graph.${e}: cannot use a {source,target} combo when asking about an edge's attributes in a MultiGraph since we cannot infer the one you want information about.`);const o=""+i,a=""+r;if(r=arguments[2],s=Hn(this,o,a,t),!s)throw new ae(`Graph.${e}: could not find an edge for the given path ("${o}" - "${a}").`)}else{if(t!=="mixed")throw new De(`Graph.${e}: calling this method with only a key (vs. a source and target) does not make sense since an edge with this key could have the other type.`);if(i=""+i,s=this._edges.get(i),!s)throw new ae(`Graph.${e}: could not find the "${i}" edge in the graph.`)}if(!nn(r))throw new ve(`Graph.${e}: provided attributes are not a plain object.`);return s.attributes=r,this.emit("edgeAttributesUpdated",{key:s.key,type:"replace",attributes:s.attributes}),this}}function ab(n,e,t){n.prototype[e]=function(i,r){let s;if(this.type!=="mixed"&&t!=="mixed"&&t!==this.type)throw new De(`Graph.${e}: cannot find this type of edges in your ${this.type} graph.`);if(arguments.length>2){if(this.multi)throw new De(`Graph.${e}: cannot use a {source,target} combo when asking about an edge's attributes in a MultiGraph since we cannot infer the one you want information about.`);const o=""+i,a=""+r;if(r=arguments[2],s=Hn(this,o,a,t),!s)throw new ae(`Graph.${e}: could not find an edge for the given path ("${o}" - "${a}").`)}else{if(t!=="mixed")throw new De(`Graph.${e}: calling this method with only a key (vs. a source and target) does not make sense since an edge with this key could have the other type.`);if(i=""+i,s=this._edges.get(i),!s)throw new ae(`Graph.${e}: could not find the "${i}" edge in the graph.`)}if(!nn(r))throw new ve(`Graph.${e}: provided attributes are not a plain object.`);return qt(s.attributes,r),this.emit("edgeAttributesUpdated",{key:s.key,type:"merge",attributes:s.attributes,data:r}),this}}function lb(n,e,t){n.prototype[e]=function(i,r){let s;if(this.type!=="mixed"&&t!=="mixed"&&t!==this.type)throw new De(`Graph.${e}: cannot find this type of edges in your ${this.type} graph.`);if(arguments.length>2){if(this.multi)throw new De(`Graph.${e}: cannot use a {source,target} combo when asking about an edge's attributes in a MultiGraph since we cannot infer the one you want information about.`);const o=""+i,a=""+r;if(r=arguments[2],s=Hn(this,o,a,t),!s)throw new ae(`Graph.${e}: could not find an edge for the given path ("${o}" - "${a}").`)}else{if(t!=="mixed")throw new De(`Graph.${e}: calling this method with only a key (vs. a source and target) does not make sense since an edge with this key could have the other type.`);if(i=""+i,s=this._edges.get(i),!s)throw new ae(`Graph.${e}: could not find the "${i}" edge in the graph.`)}if(typeof r!="function")throw new ve(`Graph.${e}: provided updater is not a function.`);return s.attributes=r(s.attributes),this.emit("edgeAttributesUpdated",{key:s.key,type:"update",attributes:s.attributes}),this}}const cb=[{name:n=>`get${n}Attribute`,attacher:eb},{name:n=>`get${n}Attributes`,attacher:tb},{name:n=>`has${n}Attribute`,attacher:nb},{name:n=>`set${n}Attribute`,attacher:ib},{name:n=>`update${n}Attribute`,attacher:rb},{name:n=>`remove${n}Attribute`,attacher:sb},{name:n=>`replace${n}Attributes`,attacher:ob},{name:n=>`merge${n}Attributes`,attacher:ab},{name:n=>`update${n}Attributes`,attacher:lb}];function ub(n){cb.forEach(function({name:e,attacher:t}){t(n,e("Edge"),"mixed"),t(n,e("DirectedEdge"),"directed"),t(n,e("UndirectedEdge"),"undirected")})}const db=[{name:"edges",type:"mixed"},{name:"inEdges",type:"directed",direction:"in"},{name:"outEdges",type:"directed",direction:"out"},{name:"inboundEdges",type:"mixed",direction:"in"},{name:"outboundEdges",type:"mixed",direction:"out"},{name:"directedEdges",type:"directed"},{name:"undirectedEdges",type:"undirected"}];function hb(n,e,t,i){let r=!1;for(const s in e){if(s===i)continue;const o=e[s];if(r=t(o.key,o.attributes,o.source.key,o.target.key,o.source.attributes,o.target.attributes,o.undirected),n&&r)return o.key}}function fb(n,e,t,i){let r,s,o,a=!1;for(const l in e)if(l!==i){r=e[l];do{if(s=r.source,o=r.target,a=t(r.key,r.attributes,s.key,o.key,s.attributes,o.attributes,r.undirected),n&&a)return r.key;r=r.next}while(r!==void 0)}}function pc(n,e){const t=Object.keys(n),i=t.length;let r,s=0;return{[Symbol.iterator](){return this},next(){do if(r)r=r.next;else{if(s>=i)return{done:!0};const o=t[s++];if(o===e){r=void 0;continue}r=n[o]}while(!r);return{done:!1,value:{edge:r.key,attributes:r.attributes,source:r.source.key,target:r.target.key,sourceAttributes:r.source.attributes,targetAttributes:r.target.attributes,undirected:r.undirected}}}}}function pb(n,e,t,i){const r=e[t];if(!r)return;const s=r.source,o=r.target;if(i(r.key,r.attributes,s.key,o.key,s.attributes,o.attributes,r.undirected)&&n)return r.key}function mb(n,e,t,i){let r=e[t];if(!r)return;let s=!1;do{if(s=i(r.key,r.attributes,r.source.key,r.target.key,r.source.attributes,r.target.attributes,r.undirected),n&&s)return r.key;r=r.next}while(r!==void 0)}function mc(n,e){let t=n[e];if(t.next!==void 0)return{[Symbol.iterator](){return this},next(){if(!t)return{done:!0};const r={edge:t.key,attributes:t.attributes,source:t.source.key,target:t.target.key,sourceAttributes:t.source.attributes,targetAttributes:t.target.attributes,undirected:t.undirected};return t=t.next,{done:!1,value:r}}};let i=!1;return{[Symbol.iterator](){return this},next(){return i===!0?{done:!0}:(i=!0,{done:!1,value:{edge:t.key,attributes:t.attributes,source:t.source.key,target:t.target.key,sourceAttributes:t.source.attributes,targetAttributes:t.target.attributes,undirected:t.undirected}})}}}function gb(n,e){if(n.size===0)return[];if(e==="mixed"||e===n.type)return Array.from(n._edges.keys());const t=e==="undirected"?n.undirectedSize:n.directedSize,i=new Array(t),r=e==="undirected",s=n._edges.values();let o=0,a,l;for(;a=s.next(),a.done!==!0;)l=a.value,l.undirected===r&&(i[o++]=l.key);return i}function dg(n,e,t,i){if(e.size===0)return;const r=t!=="mixed"&&t!==e.type,s=t==="undirected";let o,a,l=!1;const c=e._edges.values();for(;o=c.next(),o.done!==!0;){if(a=o.value,r&&a.undirected!==s)continue;const{key:u,attributes:d,source:h,target:f}=a;if(l=i(u,d,h.key,f.key,h.attributes,f.attributes,a.undirected),n&&l)return u}}function _b(n,e){if(n.size===0)return Vs();const t=e!=="mixed"&&e!==n.type,i=e==="undirected",r=n._edges.values();return{[Symbol.iterator](){return this},next(){let s,o;for(;;){if(s=r.next(),s.done)return s;if(o=s.value,!(t&&o.undirected!==i))break}return{value:{edge:o.key,attributes:o.attributes,source:o.source.key,target:o.target.key,sourceAttributes:o.source.attributes,targetAttributes:o.target.attributes,undirected:o.undirected},done:!1}}}}function Fd(n,e,t,i,r,s){const o=e?fb:hb;let a;if(t!=="undirected"&&(i!=="out"&&(a=o(n,r.in,s),n&&a)||i!=="in"&&(a=o(n,r.out,s,i?void 0:r.key),n&&a))||t!=="directed"&&(a=o(n,r.undirected,s),n&&a))return a}function vb(n,e,t,i){const r=[];return Fd(!1,n,e,t,i,function(s){r.push(s)}),r}function xb(n,e,t){let i=Vs();return n!=="undirected"&&(e!=="out"&&typeof t.in<"u"&&(i=$i(i,pc(t.in))),e!=="in"&&typeof t.out<"u"&&(i=$i(i,pc(t.out,e?void 0:t.key)))),n!=="directed"&&typeof t.undirected<"u"&&(i=$i(i,pc(t.undirected))),i}function Od(n,e,t,i,r,s,o){const a=t?mb:pb;let l;if(e!=="undirected"&&(typeof r.in<"u"&&i!=="out"&&(l=a(n,r.in,s,o),n&&l)||typeof r.out<"u"&&i!=="in"&&(i||r.key!==s)&&(l=a(n,r.out,s,o),n&&l))||e!=="directed"&&typeof r.undirected<"u"&&(l=a(n,r.undirected,s,o),n&&l))return l}function bb(n,e,t,i,r){const s=[];return Od(!1,n,e,t,i,r,function(o){s.push(o)}),s}function yb(n,e,t,i){let r=Vs();return n!=="undirected"&&(typeof t.in<"u"&&e!=="out"&&i in t.in&&(r=$i(r,mc(t.in,i))),typeof t.out<"u"&&e!=="in"&&i in t.out&&(e||t.key!==i)&&(r=$i(r,mc(t.out,i)))),n!=="directed"&&typeof t.undirected<"u"&&i in t.undirected&&(r=$i(r,mc(t.undirected,i))),r}function Sb(n,e){const{name:t,type:i,direction:r}=e;n.prototype[t]=function(s,o){if(i!=="mixed"&&this.type!=="mixed"&&i!==this.type)return[];if(!arguments.length)return gb(this,i);if(arguments.length===1){s=""+s;const a=this._nodes.get(s);if(typeof a>"u")throw new ae(`Graph.${t}: could not find the "${s}" node in the graph.`);return vb(this.multi,i==="mixed"?this.type:i,r,a)}if(arguments.length===2){s=""+s,o=""+o;const a=this._nodes.get(s);if(!a)throw new ae(`Graph.${t}:  could not find the "${s}" source node in the graph.`);if(!this._nodes.has(o))throw new ae(`Graph.${t}:  could not find the "${o}" target node in the graph.`);return bb(i,this.multi,r,a,o)}throw new ve(`Graph.${t}: too many arguments (expecting 0, 1 or 2 and got ${arguments.length}).`)}}function Eb(n,e){const{name:t,type:i,direction:r}=e,s="forEach"+t[0].toUpperCase()+t.slice(1,-1);n.prototype[s]=function(c,u,d){if(!(i!=="mixed"&&this.type!=="mixed"&&i!==this.type)){if(arguments.length===1)return d=c,dg(!1,this,i,d);if(arguments.length===2){c=""+c,d=u;const h=this._nodes.get(c);if(typeof h>"u")throw new ae(`Graph.${s}: could not find the "${c}" node in the graph.`);return Fd(!1,this.multi,i==="mixed"?this.type:i,r,h,d)}if(arguments.length===3){c=""+c,u=""+u;const h=this._nodes.get(c);if(!h)throw new ae(`Graph.${s}:  could not find the "${c}" source node in the graph.`);if(!this._nodes.has(u))throw new ae(`Graph.${s}:  could not find the "${u}" target node in the graph.`);return Od(!1,i,this.multi,r,h,u,d)}throw new ve(`Graph.${s}: too many arguments (expecting 1, 2 or 3 and got ${arguments.length}).`)}};const o="map"+t[0].toUpperCase()+t.slice(1);n.prototype[o]=function(){const c=Array.prototype.slice.call(arguments),u=c.pop();let d;if(c.length===0){let h=0;i!=="directed"&&(h+=this.undirectedSize),i!=="undirected"&&(h+=this.directedSize),d=new Array(h);let f=0;c.push((p,_,g,m,v,y,x)=>{d[f++]=u(p,_,g,m,v,y,x)})}else d=[],c.push((h,f,p,_,g,m,v)=>{d.push(u(h,f,p,_,g,m,v))});return this[s].apply(this,c),d};const a="filter"+t[0].toUpperCase()+t.slice(1);n.prototype[a]=function(){const c=Array.prototype.slice.call(arguments),u=c.pop(),d=[];return c.push((h,f,p,_,g,m,v)=>{u(h,f,p,_,g,m,v)&&d.push(h)}),this[s].apply(this,c),d};const l="reduce"+t[0].toUpperCase()+t.slice(1);n.prototype[l]=function(){let c=Array.prototype.slice.call(arguments);if(c.length<2||c.length>4)throw new ve(`Graph.${l}: invalid number of arguments (expecting 2, 3 or 4 and got ${c.length}).`);if(typeof c[c.length-1]=="function"&&typeof c[c.length-2]!="function")throw new ve(`Graph.${l}: missing initial value. You must provide it because the callback takes more than one argument and we cannot infer the initial value from the first iteration, as you could with a simple array.`);let u,d;c.length===2?(u=c[0],d=c[1],c=[]):c.length===3?(u=c[1],d=c[2],c=[c[0]]):c.length===4&&(u=c[2],d=c[3],c=[c[0],c[1]]);let h=d;return c.push((f,p,_,g,m,v,y)=>{h=u(h,f,p,_,g,m,v,y)}),this[s].apply(this,c),h}}function Mb(n,e){const{name:t,type:i,direction:r}=e,s="find"+t[0].toUpperCase()+t.slice(1,-1);n.prototype[s]=function(l,c,u){if(i!=="mixed"&&this.type!=="mixed"&&i!==this.type)return!1;if(arguments.length===1)return u=l,dg(!0,this,i,u);if(arguments.length===2){l=""+l,u=c;const d=this._nodes.get(l);if(typeof d>"u")throw new ae(`Graph.${s}: could not find the "${l}" node in the graph.`);return Fd(!0,this.multi,i==="mixed"?this.type:i,r,d,u)}if(arguments.length===3){l=""+l,c=""+c;const d=this._nodes.get(l);if(!d)throw new ae(`Graph.${s}:  could not find the "${l}" source node in the graph.`);if(!this._nodes.has(c))throw new ae(`Graph.${s}:  could not find the "${c}" target node in the graph.`);return Od(!0,i,this.multi,r,d,c,u)}throw new ve(`Graph.${s}: too many arguments (expecting 1, 2 or 3 and got ${arguments.length}).`)};const o="some"+t[0].toUpperCase()+t.slice(1,-1);n.prototype[o]=function(){const l=Array.prototype.slice.call(arguments),c=l.pop();return l.push((d,h,f,p,_,g,m)=>c(d,h,f,p,_,g,m)),!!this[s].apply(this,l)};const a="every"+t[0].toUpperCase()+t.slice(1,-1);n.prototype[a]=function(){const l=Array.prototype.slice.call(arguments),c=l.pop();return l.push((d,h,f,p,_,g,m)=>!c(d,h,f,p,_,g,m)),!this[s].apply(this,l)}}function wb(n,e){const{name:t,type:i,direction:r}=e,s=t.slice(0,-1)+"Entries";n.prototype[s]=function(o,a){if(i!=="mixed"&&this.type!=="mixed"&&i!==this.type)return Vs();if(!arguments.length)return _b(this,i);if(arguments.length===1){o=""+o;const l=this._nodes.get(o);if(!l)throw new ae(`Graph.${s}: could not find the "${o}" node in the graph.`);return xb(i,r,l)}if(arguments.length===2){o=""+o,a=""+a;const l=this._nodes.get(o);if(!l)throw new ae(`Graph.${s}:  could not find the "${o}" source node in the graph.`);if(!this._nodes.has(a))throw new ae(`Graph.${s}:  could not find the "${a}" target node in the graph.`);return yb(i,r,l,a)}throw new ve(`Graph.${s}: too many arguments (expecting 0, 1 or 2 and got ${arguments.length}).`)}}function Tb(n){db.forEach(e=>{Sb(n,e),Eb(n,e),Mb(n,e),wb(n,e)})}const Ab=[{name:"neighbors",type:"mixed"},{name:"inNeighbors",type:"directed",direction:"in"},{name:"outNeighbors",type:"directed",direction:"out"},{name:"inboundNeighbors",type:"mixed",direction:"in"},{name:"outboundNeighbors",type:"mixed",direction:"out"},{name:"directedNeighbors",type:"directed"},{name:"undirectedNeighbors",type:"undirected"}];function zl(){this.A=null,this.B=null}zl.prototype.wrap=function(n){this.A===null?this.A=n:this.B===null&&(this.B=n)};zl.prototype.has=function(n){return this.A!==null&&n in this.A||this.B!==null&&n in this.B};function eo(n,e,t,i,r){for(const s in i){const o=i[s],a=o.source,l=o.target,c=a===t?l:a;if(e&&e.has(c.key))continue;const u=r(c.key,c.attributes);if(n&&u)return c.key}}function kd(n,e,t,i,r){if(e!=="mixed"){if(e==="undirected")return eo(n,null,i,i.undirected,r);if(typeof t=="string")return eo(n,null,i,i[t],r)}const s=new zl;let o;if(e!=="undirected"){if(t!=="out"){if(o=eo(n,null,i,i.in,r),n&&o)return o;s.wrap(i.in)}if(t!=="in"){if(o=eo(n,s,i,i.out,r),n&&o)return o;s.wrap(i.out)}}if(e!=="directed"&&(o=eo(n,s,i,i.undirected,r),n&&o))return o}function Cb(n,e,t){if(n!=="mixed"){if(n==="undirected")return Object.keys(t.undirected);if(typeof e=="string")return Object.keys(t[e])}const i=[];return kd(!1,n,e,t,function(r){i.push(r)}),i}function to(n,e,t){const i=Object.keys(t),r=i.length;let s=0;return{[Symbol.iterator](){return this},next(){let o=null;do{if(s>=r)return n&&n.wrap(t),{done:!0};const a=t[i[s++]],l=a.source,c=a.target;if(o=l===e?c:l,n&&n.has(o.key)){o=null;continue}}while(o===null);return{done:!1,value:{neighbor:o.key,attributes:o.attributes}}}}}function Rb(n,e,t){if(n!=="mixed"){if(n==="undirected")return to(null,t,t.undirected);if(typeof e=="string")return to(null,t,t[e])}let i=Vs();const r=new zl;return n!=="undirected"&&(e!=="out"&&(i=$i(i,to(r,t,t.in))),e!=="in"&&(i=$i(i,to(r,t,t.out)))),n!=="directed"&&(i=$i(i,to(r,t,t.undirected))),i}function Pb(n,e){const{name:t,type:i,direction:r}=e;n.prototype[t]=function(s){if(i!=="mixed"&&this.type!=="mixed"&&i!==this.type)return[];s=""+s;const o=this._nodes.get(s);if(typeof o>"u")throw new ae(`Graph.${t}: could not find the "${s}" node in the graph.`);return Cb(i==="mixed"?this.type:i,r,o)}}function Lb(n,e){const{name:t,type:i,direction:r}=e,s="forEach"+t[0].toUpperCase()+t.slice(1,-1);n.prototype[s]=function(c,u){if(i!=="mixed"&&this.type!=="mixed"&&i!==this.type)return;c=""+c;const d=this._nodes.get(c);if(typeof d>"u")throw new ae(`Graph.${s}: could not find the "${c}" node in the graph.`);kd(!1,i==="mixed"?this.type:i,r,d,u)};const o="map"+t[0].toUpperCase()+t.slice(1);n.prototype[o]=function(c,u){const d=[];return this[s](c,(h,f)=>{d.push(u(h,f))}),d};const a="filter"+t[0].toUpperCase()+t.slice(1);n.prototype[a]=function(c,u){const d=[];return this[s](c,(h,f)=>{u(h,f)&&d.push(h)}),d};const l="reduce"+t[0].toUpperCase()+t.slice(1);n.prototype[l]=function(c,u,d){if(arguments.length<3)throw new ve(`Graph.${l}: missing initial value. You must provide it because the callback takes more than one argument and we cannot infer the initial value from the first iteration, as you could with a simple array.`);let h=d;return this[s](c,(f,p)=>{h=u(h,f,p)}),h}}function Db(n,e){const{name:t,type:i,direction:r}=e,s=t[0].toUpperCase()+t.slice(1,-1),o="find"+s;n.prototype[o]=function(c,u){if(i!=="mixed"&&this.type!=="mixed"&&i!==this.type)return;c=""+c;const d=this._nodes.get(c);if(typeof d>"u")throw new ae(`Graph.${o}: could not find the "${c}" node in the graph.`);return kd(!0,i==="mixed"?this.type:i,r,d,u)};const a="some"+s;n.prototype[a]=function(c,u){return!!this[o](c,u)};const l="every"+s;n.prototype[l]=function(c,u){return!this[o](c,(h,f)=>!u(h,f))}}function Nb(n,e){const{name:t,type:i,direction:r}=e,s=t.slice(0,-1)+"Entries";n.prototype[s]=function(o){if(i!=="mixed"&&this.type!=="mixed"&&i!==this.type)return Vs();o=""+o;const a=this._nodes.get(o);if(typeof a>"u")throw new ae(`Graph.${s}: could not find the "${o}" node in the graph.`);return Rb(i==="mixed"?this.type:i,r,a)}}function Ib(n){Ab.forEach(e=>{Pb(n,e),Lb(n,e),Db(n,e),Nb(n,e)})}function sa(n,e,t,i,r){const s=i._nodes.values(),o=i.type;let a,l,c,u,d,h;for(;a=s.next(),a.done!==!0;){let f=!1;if(l=a.value,o!=="undirected"){u=l.out;for(c in u){d=u[c];do h=d.target,f=!0,r(l.key,h.key,l.attributes,h.attributes,d.key,d.attributes,d.undirected),d=d.next;while(d)}}if(o!=="directed"){u=l.undirected;for(c in u)if(!(e&&l.key>c)){d=u[c];do h=d.target,h.key!==c&&(h=d.source),f=!0,r(l.key,h.key,l.attributes,h.attributes,d.key,d.attributes,d.undirected),d=d.next;while(d)}}t&&!f&&r(l.key,null,l.attributes,null,null,null,null)}}function Ub(n,e){const t={key:n};return rg(e.attributes)||(t.attributes=qt({},e.attributes)),t}function Fb(n,e,t){const i={key:e,source:t.source.key,target:t.target.key};return rg(t.attributes)||(i.attributes=qt({},t.attributes)),n==="mixed"&&t.undirected&&(i.undirected=!0),i}function Ob(n){if(!nn(n))throw new ve('Graph.import: invalid serialized node. A serialized node should be a plain object with at least a "key" property.');if(!("key"in n))throw new ve("Graph.import: serialized node is missing its key.");if("attributes"in n&&(!nn(n.attributes)||n.attributes===null))throw new ve("Graph.import: invalid attributes. Attributes should be a plain object, null or omitted.")}function kb(n){if(!nn(n))throw new ve('Graph.import: invalid serialized edge. A serialized edge should be a plain object with at least a "source" & "target" property.');if(!("source"in n))throw new ve("Graph.import: serialized edge is missing its source.");if(!("target"in n))throw new ve("Graph.import: serialized edge is missing its target.");if("attributes"in n&&(!nn(n.attributes)||n.attributes===null))throw new ve("Graph.import: invalid attributes. Attributes should be a plain object, null or omitted.");if("undirected"in n&&typeof n.undirected!="boolean")throw new ve("Graph.import: invalid undirectedness information. Undirected should be boolean or omitted.")}const Bb=Gx(),zb=new Set(["directed","undirected","mixed"]),Tf=new Set(["domain","_events","_eventsCount","_maxListeners"]),Gb=[{name:n=>`${n}Edge`,generateKey:!0},{name:n=>`${n}DirectedEdge`,generateKey:!0,type:"directed"},{name:n=>`${n}UndirectedEdge`,generateKey:!0,type:"undirected"},{name:n=>`${n}EdgeWithKey`},{name:n=>`${n}DirectedEdgeWithKey`,type:"directed"},{name:n=>`${n}UndirectedEdgeWithKey`,type:"undirected"}],Hb={allowSelfLoops:!0,multi:!1,type:"mixed"};function Vb(n,e,t){if(t&&!nn(t))throw new ve(`Graph.addNode: invalid attributes. Expecting an object but got "${t}"`);if(e=""+e,t=t||{},n._nodes.has(e))throw new De(`Graph.addNode: the "${e}" node already exist in the graph.`);const i=new n.NodeDataClass(e,t);return n._nodes.set(e,i),n.emit("nodeAdded",{key:e,attributes:t}),i}function Af(n,e,t){const i=new n.NodeDataClass(e,t);return n._nodes.set(e,i),n.emit("nodeAdded",{key:e,attributes:t}),i}function hg(n,e,t,i,r,s,o,a){if(!i&&n.type==="undirected")throw new De(`Graph.${e}: you cannot add a directed edge to an undirected graph. Use the #.addEdge or #.addUndirectedEdge instead.`);if(i&&n.type==="directed")throw new De(`Graph.${e}: you cannot add an undirected edge to a directed graph. Use the #.addEdge or #.addDirectedEdge instead.`);if(a&&!nn(a))throw new ve(`Graph.${e}: invalid attributes. Expecting an object but got "${a}"`);if(s=""+s,o=""+o,a=a||{},!n.allowSelfLoops&&s===o)throw new De(`Graph.${e}: source & target are the same ("${s}"), thus creating a loop explicitly forbidden by this graph 'allowSelfLoops' option set to false.`);const l=n._nodes.get(s),c=n._nodes.get(o);if(!l)throw new ae(`Graph.${e}: source node "${s}" not found.`);if(!c)throw new ae(`Graph.${e}: target node "${o}" not found.`);const u={key:null,undirected:i,source:s,target:o,attributes:a};if(t)r=n._edgeKeyGenerator();else if(r=""+r,n._edges.has(r))throw new De(`Graph.${e}: the "${r}" edge already exists in the graph.`);if(!n.multi&&(i?typeof l.undirected[o]<"u":typeof l.out[o]<"u"))throw new De(`Graph.${e}: an edge linking "${s}" to "${o}" already exists. If you really want to add multiple edges linking those nodes, you should create a multi graph by using the 'multi' option.`);const d=new Ws(i,r,l,c,a);n._edges.set(r,d);const h=s===o;return i?(l.undirectedDegree++,c.undirectedDegree++,h&&(l.undirectedLoops++,n._undirectedSelfLoopCount++)):(l.outDegree++,c.inDegree++,h&&(l.directedLoops++,n._directedSelfLoopCount++)),n.multi?d.attachMulti():d.attach(),i?n._undirectedSize++:n._directedSize++,u.key=r,n.emit("edgeAdded",u),r}function Wb(n,e,t,i,r,s,o,a,l){if(!i&&n.type==="undirected")throw new De(`Graph.${e}: you cannot merge/update a directed edge to an undirected graph. Use the #.mergeEdge/#.updateEdge or #.addUndirectedEdge instead.`);if(i&&n.type==="directed")throw new De(`Graph.${e}: you cannot merge/update an undirected edge to a directed graph. Use the #.mergeEdge/#.updateEdge or #.addDirectedEdge instead.`);if(a){if(l){if(typeof a!="function")throw new ve(`Graph.${e}: invalid updater function. Expecting a function but got "${a}"`)}else if(!nn(a))throw new ve(`Graph.${e}: invalid attributes. Expecting an object but got "${a}"`)}s=""+s,o=""+o;let c;if(l&&(c=a,a=void 0),!n.allowSelfLoops&&s===o)throw new De(`Graph.${e}: source & target are the same ("${s}"), thus creating a loop explicitly forbidden by this graph 'allowSelfLoops' option set to false.`);let u=n._nodes.get(s),d=n._nodes.get(o),h,f;if(!t&&(h=n._edges.get(r),h)){if((h.source.key!==s||h.target.key!==o)&&(!i||h.source.key!==o||h.target.key!==s))throw new De(`Graph.${e}: inconsistency detected when attempting to merge the "${r}" edge with "${s}" source & "${o}" target vs. ("${h.source.key}", "${h.target.key}").`);f=h}if(!f&&!n.multi&&u&&(f=i?u.undirected[o]:u.out[o]),f){const v=[f.key,!1,!1,!1];if(l?!c:!a)return v;if(l){const y=f.attributes;f.attributes=c(y),n.emit("edgeAttributesUpdated",{type:"replace",key:f.key,attributes:f.attributes})}else qt(f.attributes,a),n.emit("edgeAttributesUpdated",{type:"merge",key:f.key,attributes:f.attributes,data:a});return v}a=a||{},l&&c&&(a=c(a));const p={key:null,undirected:i,source:s,target:o,attributes:a};if(t)r=n._edgeKeyGenerator();else if(r=""+r,n._edges.has(r))throw new De(`Graph.${e}: the "${r}" edge already exists in the graph.`);let _=!1,g=!1;u||(u=Af(n,s,{}),_=!0,s===o&&(d=u,g=!0)),d||(d=Af(n,o,{}),g=!0),h=new Ws(i,r,u,d,a),n._edges.set(r,h);const m=s===o;return i?(u.undirectedDegree++,d.undirectedDegree++,m&&(u.undirectedLoops++,n._undirectedSelfLoopCount++)):(u.outDegree++,d.inDegree++,m&&(u.directedLoops++,n._directedSelfLoopCount++)),n.multi?h.attachMulti():h.attach(),i?n._undirectedSize++:n._directedSize++,p.key=r,n.emit("edgeAdded",p),[r,!0,_,g]}function is(n,e){n._edges.delete(e.key);const{source:t,target:i,attributes:r}=e,s=e.undirected,o=t===i;s?(t.undirectedDegree--,i.undirectedDegree--,o&&(t.undirectedLoops--,n._undirectedSelfLoopCount--)):(t.outDegree--,i.inDegree--,o&&(t.directedLoops--,n._directedSelfLoopCount--)),n.multi?e.detachMulti():e.detach(),s?n._undirectedSize--:n._directedSize--,n.emit("edgeDropped",{key:e.key,attributes:r,source:t.key,target:i.key,undirected:s})}class xt extends tg.EventEmitter{constructor(e){if(super(),e=qt({},Hb,e),typeof e.multi!="boolean")throw new ve(`Graph.constructor: invalid 'multi' option. Expecting a boolean but got "${e.multi}".`);if(!zb.has(e.type))throw new ve(`Graph.constructor: invalid 'type' option. Should be one of "mixed", "directed" or "undirected" but got "${e.type}".`);if(typeof e.allowSelfLoops!="boolean")throw new ve(`Graph.constructor: invalid 'allowSelfLoops' option. Expecting a boolean but got "${e.allowSelfLoops}".`);const t=e.type==="mixed"?sg:e.type==="directed"?og:ag;Nn(this,"NodeDataClass",t);const i="geid_"+Bb()+"_";let r=0;const s=()=>{let o;do o=i+r++;while(this._edges.has(o));return o};Nn(this,"_attributes",{}),Nn(this,"_nodes",new Map),Nn(this,"_edges",new Map),Nn(this,"_directedSize",0),Nn(this,"_undirectedSize",0),Nn(this,"_directedSelfLoopCount",0),Nn(this,"_undirectedSelfLoopCount",0),Nn(this,"_edgeKeyGenerator",s),Nn(this,"_options",e),Tf.forEach(o=>Nn(this,o,this[o])),Xn(this,"order",()=>this._nodes.size),Xn(this,"size",()=>this._edges.size),Xn(this,"directedSize",()=>this._directedSize),Xn(this,"undirectedSize",()=>this._undirectedSize),Xn(this,"selfLoopCount",()=>this._directedSelfLoopCount+this._undirectedSelfLoopCount),Xn(this,"directedSelfLoopCount",()=>this._directedSelfLoopCount),Xn(this,"undirectedSelfLoopCount",()=>this._undirectedSelfLoopCount),Xn(this,"multi",this._options.multi),Xn(this,"type",this._options.type),Xn(this,"allowSelfLoops",this._options.allowSelfLoops),Xn(this,"implementation",()=>"graphology")}_resetInstanceCounters(){this._directedSize=0,this._undirectedSize=0,this._directedSelfLoopCount=0,this._undirectedSelfLoopCount=0}hasNode(e){return this._nodes.has(""+e)}hasDirectedEdge(e,t){if(this.type==="undirected")return!1;if(arguments.length===1){const i=""+e,r=this._edges.get(i);return!!r&&!r.undirected}else if(arguments.length===2){e=""+e,t=""+t;const i=this._nodes.get(e);return i?i.out.hasOwnProperty(t):!1}throw new ve(`Graph.hasDirectedEdge: invalid arity (${arguments.length}, instead of 1 or 2). You can either ask for an edge id or for the existence of an edge between a source & a target.`)}hasUndirectedEdge(e,t){if(this.type==="directed")return!1;if(arguments.length===1){const i=""+e,r=this._edges.get(i);return!!r&&r.undirected}else if(arguments.length===2){e=""+e,t=""+t;const i=this._nodes.get(e);return i?i.undirected.hasOwnProperty(t):!1}throw new ve(`Graph.hasDirectedEdge: invalid arity (${arguments.length}, instead of 1 or 2). You can either ask for an edge id or for the existence of an edge between a source & a target.`)}hasEdge(e,t){if(arguments.length===1){const i=""+e;return this._edges.has(i)}else if(arguments.length===2){e=""+e,t=""+t;const i=this._nodes.get(e);return i?typeof i.out<"u"&&i.out.hasOwnProperty(t)||typeof i.undirected<"u"&&i.undirected.hasOwnProperty(t):!1}throw new ve(`Graph.hasEdge: invalid arity (${arguments.length}, instead of 1 or 2). You can either ask for an edge id or for the existence of an edge between a source & a target.`)}directedEdge(e,t){if(this.type==="undirected")return;if(e=""+e,t=""+t,this.multi)throw new De("Graph.directedEdge: this method is irrelevant with multigraphs since there might be multiple edges between source & target. See #.directedEdges instead.");const i=this._nodes.get(e);if(!i)throw new ae(`Graph.directedEdge: could not find the "${e}" source node in the graph.`);if(!this._nodes.has(t))throw new ae(`Graph.directedEdge: could not find the "${t}" target node in the graph.`);const r=i.out&&i.out[t]||void 0;if(r)return r.key}undirectedEdge(e,t){if(this.type==="directed")return;if(e=""+e,t=""+t,this.multi)throw new De("Graph.undirectedEdge: this method is irrelevant with multigraphs since there might be multiple edges between source & target. See #.undirectedEdges instead.");const i=this._nodes.get(e);if(!i)throw new ae(`Graph.undirectedEdge: could not find the "${e}" source node in the graph.`);if(!this._nodes.has(t))throw new ae(`Graph.undirectedEdge: could not find the "${t}" target node in the graph.`);const r=i.undirected&&i.undirected[t]||void 0;if(r)return r.key}edge(e,t){if(this.multi)throw new De("Graph.edge: this method is irrelevant with multigraphs since there might be multiple edges between source & target. See #.edges instead.");e=""+e,t=""+t;const i=this._nodes.get(e);if(!i)throw new ae(`Graph.edge: could not find the "${e}" source node in the graph.`);if(!this._nodes.has(t))throw new ae(`Graph.edge: could not find the "${t}" target node in the graph.`);const r=i.out&&i.out[t]||i.undirected&&i.undirected[t]||void 0;if(r)return r.key}areDirectedNeighbors(e,t){e=""+e,t=""+t;const i=this._nodes.get(e);if(!i)throw new ae(`Graph.areDirectedNeighbors: could not find the "${e}" node in the graph.`);return this.type==="undirected"?!1:t in i.in||t in i.out}areOutNeighbors(e,t){e=""+e,t=""+t;const i=this._nodes.get(e);if(!i)throw new ae(`Graph.areOutNeighbors: could not find the "${e}" node in the graph.`);return this.type==="undirected"?!1:t in i.out}areInNeighbors(e,t){e=""+e,t=""+t;const i=this._nodes.get(e);if(!i)throw new ae(`Graph.areInNeighbors: could not find the "${e}" node in the graph.`);return this.type==="undirected"?!1:t in i.in}areUndirectedNeighbors(e,t){e=""+e,t=""+t;const i=this._nodes.get(e);if(!i)throw new ae(`Graph.areUndirectedNeighbors: could not find the "${e}" node in the graph.`);return this.type==="directed"?!1:t in i.undirected}areNeighbors(e,t){e=""+e,t=""+t;const i=this._nodes.get(e);if(!i)throw new ae(`Graph.areNeighbors: could not find the "${e}" node in the graph.`);return this.type!=="undirected"&&(t in i.in||t in i.out)||this.type!=="directed"&&t in i.undirected}areInboundNeighbors(e,t){e=""+e,t=""+t;const i=this._nodes.get(e);if(!i)throw new ae(`Graph.areInboundNeighbors: could not find the "${e}" node in the graph.`);return this.type!=="undirected"&&t in i.in||this.type!=="directed"&&t in i.undirected}areOutboundNeighbors(e,t){e=""+e,t=""+t;const i=this._nodes.get(e);if(!i)throw new ae(`Graph.areOutboundNeighbors: could not find the "${e}" node in the graph.`);return this.type!=="undirected"&&t in i.out||this.type!=="directed"&&t in i.undirected}inDegree(e){e=""+e;const t=this._nodes.get(e);if(!t)throw new ae(`Graph.inDegree: could not find the "${e}" node in the graph.`);return this.type==="undirected"?0:t.inDegree}outDegree(e){e=""+e;const t=this._nodes.get(e);if(!t)throw new ae(`Graph.outDegree: could not find the "${e}" node in the graph.`);return this.type==="undirected"?0:t.outDegree}directedDegree(e){e=""+e;const t=this._nodes.get(e);if(!t)throw new ae(`Graph.directedDegree: could not find the "${e}" node in the graph.`);return this.type==="undirected"?0:t.inDegree+t.outDegree}undirectedDegree(e){e=""+e;const t=this._nodes.get(e);if(!t)throw new ae(`Graph.undirectedDegree: could not find the "${e}" node in the graph.`);return this.type==="directed"?0:t.undirectedDegree}inboundDegree(e){e=""+e;const t=this._nodes.get(e);if(!t)throw new ae(`Graph.inboundDegree: could not find the "${e}" node in the graph.`);let i=0;return this.type!=="directed"&&(i+=t.undirectedDegree),this.type!=="undirected"&&(i+=t.inDegree),i}outboundDegree(e){e=""+e;const t=this._nodes.get(e);if(!t)throw new ae(`Graph.outboundDegree: could not find the "${e}" node in the graph.`);let i=0;return this.type!=="directed"&&(i+=t.undirectedDegree),this.type!=="undirected"&&(i+=t.outDegree),i}degree(e){e=""+e;const t=this._nodes.get(e);if(!t)throw new ae(`Graph.degree: could not find the "${e}" node in the graph.`);let i=0;return this.type!=="directed"&&(i+=t.undirectedDegree),this.type!=="undirected"&&(i+=t.inDegree+t.outDegree),i}inDegreeWithoutSelfLoops(e){e=""+e;const t=this._nodes.get(e);if(!t)throw new ae(`Graph.inDegreeWithoutSelfLoops: could not find the "${e}" node in the graph.`);return this.type==="undirected"?0:t.inDegree-t.directedLoops}outDegreeWithoutSelfLoops(e){e=""+e;const t=this._nodes.get(e);if(!t)throw new ae(`Graph.outDegreeWithoutSelfLoops: could not find the "${e}" node in the graph.`);return this.type==="undirected"?0:t.outDegree-t.directedLoops}directedDegreeWithoutSelfLoops(e){e=""+e;const t=this._nodes.get(e);if(!t)throw new ae(`Graph.directedDegreeWithoutSelfLoops: could not find the "${e}" node in the graph.`);return this.type==="undirected"?0:t.inDegree+t.outDegree-t.directedLoops*2}undirectedDegreeWithoutSelfLoops(e){e=""+e;const t=this._nodes.get(e);if(!t)throw new ae(`Graph.undirectedDegreeWithoutSelfLoops: could not find the "${e}" node in the graph.`);return this.type==="directed"?0:t.undirectedDegree-t.undirectedLoops*2}inboundDegreeWithoutSelfLoops(e){e=""+e;const t=this._nodes.get(e);if(!t)throw new ae(`Graph.inboundDegreeWithoutSelfLoops: could not find the "${e}" node in the graph.`);let i=0,r=0;return this.type!=="directed"&&(i+=t.undirectedDegree,r+=t.undirectedLoops*2),this.type!=="undirected"&&(i+=t.inDegree,r+=t.directedLoops),i-r}outboundDegreeWithoutSelfLoops(e){e=""+e;const t=this._nodes.get(e);if(!t)throw new ae(`Graph.outboundDegreeWithoutSelfLoops: could not find the "${e}" node in the graph.`);let i=0,r=0;return this.type!=="directed"&&(i+=t.undirectedDegree,r+=t.undirectedLoops*2),this.type!=="undirected"&&(i+=t.outDegree,r+=t.directedLoops),i-r}degreeWithoutSelfLoops(e){e=""+e;const t=this._nodes.get(e);if(!t)throw new ae(`Graph.degreeWithoutSelfLoops: could not find the "${e}" node in the graph.`);let i=0,r=0;return this.type!=="directed"&&(i+=t.undirectedDegree,r+=t.undirectedLoops*2),this.type!=="undirected"&&(i+=t.inDegree+t.outDegree,r+=t.directedLoops*2),i-r}source(e){e=""+e;const t=this._edges.get(e);if(!t)throw new ae(`Graph.source: could not find the "${e}" edge in the graph.`);return t.source.key}target(e){e=""+e;const t=this._edges.get(e);if(!t)throw new ae(`Graph.target: could not find the "${e}" edge in the graph.`);return t.target.key}extremities(e){e=""+e;const t=this._edges.get(e);if(!t)throw new ae(`Graph.extremities: could not find the "${e}" edge in the graph.`);return[t.source.key,t.target.key]}opposite(e,t){e=""+e,t=""+t;const i=this._edges.get(t);if(!i)throw new ae(`Graph.opposite: could not find the "${t}" edge in the graph.`);const r=i.source.key,s=i.target.key;if(e===r)return s;if(e===s)return r;throw new ae(`Graph.opposite: the "${e}" node is not attached to the "${t}" edge (${r}, ${s}).`)}hasExtremity(e,t){e=""+e,t=""+t;const i=this._edges.get(e);if(!i)throw new ae(`Graph.hasExtremity: could not find the "${e}" edge in the graph.`);return i.source.key===t||i.target.key===t}isUndirected(e){e=""+e;const t=this._edges.get(e);if(!t)throw new ae(`Graph.isUndirected: could not find the "${e}" edge in the graph.`);return t.undirected}isDirected(e){e=""+e;const t=this._edges.get(e);if(!t)throw new ae(`Graph.isDirected: could not find the "${e}" edge in the graph.`);return!t.undirected}isSelfLoop(e){e=""+e;const t=this._edges.get(e);if(!t)throw new ae(`Graph.isSelfLoop: could not find the "${e}" edge in the graph.`);return t.source===t.target}addNode(e,t){return Vb(this,e,t).key}mergeNode(e,t){if(t&&!nn(t))throw new ve(`Graph.mergeNode: invalid attributes. Expecting an object but got "${t}"`);e=""+e,t=t||{};let i=this._nodes.get(e);return i?(t&&(qt(i.attributes,t),this.emit("nodeAttributesUpdated",{type:"merge",key:e,attributes:i.attributes,data:t})),[e,!1]):(i=new this.NodeDataClass(e,t),this._nodes.set(e,i),this.emit("nodeAdded",{key:e,attributes:t}),[e,!0])}updateNode(e,t){if(t&&typeof t!="function")throw new ve(`Graph.updateNode: invalid updater function. Expecting a function but got "${t}"`);e=""+e;let i=this._nodes.get(e);if(i){if(t){const s=i.attributes;i.attributes=t(s),this.emit("nodeAttributesUpdated",{type:"replace",key:e,attributes:i.attributes})}return[e,!1]}const r=t?t({}):{};return i=new this.NodeDataClass(e,r),this._nodes.set(e,i),this.emit("nodeAdded",{key:e,attributes:r}),[e,!0]}dropNode(e){e=""+e;const t=this._nodes.get(e);if(!t)throw new ae(`Graph.dropNode: could not find the "${e}" node in the graph.`);let i;if(this.type!=="undirected"){for(const r in t.out){i=t.out[r];do is(this,i),i=i.next;while(i)}for(const r in t.in){i=t.in[r];do is(this,i),i=i.next;while(i)}}if(this.type!=="directed")for(const r in t.undirected){i=t.undirected[r];do is(this,i),i=i.next;while(i)}this._nodes.delete(e),this.emit("nodeDropped",{key:e,attributes:t.attributes})}dropEdge(e){let t;if(arguments.length>1){const i=""+arguments[0],r=""+arguments[1];if(t=Hn(this,i,r,this.type),!t)throw new ae(`Graph.dropEdge: could not find the "${i}" -> "${r}" edge in the graph.`)}else if(e=""+e,t=this._edges.get(e),!t)throw new ae(`Graph.dropEdge: could not find the "${e}" edge in the graph.`);return is(this,t),this}dropDirectedEdge(e,t){if(arguments.length<2)throw new De("Graph.dropDirectedEdge: it does not make sense to try and drop a directed edge by key. What if the edge with this key is undirected? Use #.dropEdge for this purpose instead.");if(this.multi)throw new De("Graph.dropDirectedEdge: cannot use a {source,target} combo when dropping an edge in a MultiGraph since we cannot infer the one you want to delete as there could be multiple ones.");e=""+e,t=""+t;const i=Hn(this,e,t,"directed");if(!i)throw new ae(`Graph.dropDirectedEdge: could not find a "${e}" -> "${t}" edge in the graph.`);return is(this,i),this}dropUndirectedEdge(e,t){if(arguments.length<2)throw new De("Graph.dropUndirectedEdge: it does not make sense to drop a directed edge by key. What if the edge with this key is undirected? Use #.dropEdge for this purpose instead.");if(this.multi)throw new De("Graph.dropUndirectedEdge: cannot use a {source,target} combo when dropping an edge in a MultiGraph since we cannot infer the one you want to delete as there could be multiple ones.");const i=Hn(this,e,t,"undirected");if(!i)throw new ae(`Graph.dropUndirectedEdge: could not find a "${e}" -> "${t}" edge in the graph.`);return is(this,i),this}clear(){this._edges.clear(),this._nodes.clear(),this._resetInstanceCounters(),this.emit("cleared")}clearEdges(){const e=this._nodes.values();let t;for(;t=e.next(),t.done!==!0;)t.value.clear();this._edges.clear(),this._resetInstanceCounters(),this.emit("edgesCleared")}getAttribute(e){return this._attributes[e]}getAttributes(){return this._attributes}hasAttribute(e){return this._attributes.hasOwnProperty(e)}setAttribute(e,t){return this._attributes[e]=t,this.emit("attributesUpdated",{type:"set",attributes:this._attributes,name:e}),this}updateAttribute(e,t){if(typeof t!="function")throw new ve("Graph.updateAttribute: updater should be a function.");const i=this._attributes[e];return this._attributes[e]=t(i),this.emit("attributesUpdated",{type:"set",attributes:this._attributes,name:e}),this}removeAttribute(e){return delete this._attributes[e],this.emit("attributesUpdated",{type:"remove",attributes:this._attributes,name:e}),this}replaceAttributes(e){if(!nn(e))throw new ve("Graph.replaceAttributes: provided attributes are not a plain object.");return this._attributes=e,this.emit("attributesUpdated",{type:"replace",attributes:this._attributes}),this}mergeAttributes(e){if(!nn(e))throw new ve("Graph.mergeAttributes: provided attributes are not a plain object.");return qt(this._attributes,e),this.emit("attributesUpdated",{type:"merge",attributes:this._attributes,data:e}),this}updateAttributes(e){if(typeof e!="function")throw new ve("Graph.updateAttributes: provided updater is not a function.");return this._attributes=e(this._attributes),this.emit("attributesUpdated",{type:"update",attributes:this._attributes}),this}updateEachNodeAttributes(e,t){if(typeof e!="function")throw new ve("Graph.updateEachNodeAttributes: expecting an updater function.");if(t&&!wf(t))throw new ve("Graph.updateEachNodeAttributes: invalid hints. Expecting an object having the following shape: {attributes?: [string]}");const i=this._nodes.values();let r,s;for(;r=i.next(),r.done!==!0;)s=r.value,s.attributes=e(s.key,s.attributes);this.emit("eachNodeAttributesUpdated",{hints:t||null})}updateEachEdgeAttributes(e,t){if(typeof e!="function")throw new ve("Graph.updateEachEdgeAttributes: expecting an updater function.");if(t&&!wf(t))throw new ve("Graph.updateEachEdgeAttributes: invalid hints. Expecting an object having the following shape: {attributes?: [string]}");const i=this._edges.values();let r,s,o,a;for(;r=i.next(),r.done!==!0;)s=r.value,o=s.source,a=s.target,s.attributes=e(s.key,s.attributes,o.key,a.key,o.attributes,a.attributes,s.undirected);this.emit("eachEdgeAttributesUpdated",{hints:t||null})}forEachAdjacencyEntry(e){if(typeof e!="function")throw new ve("Graph.forEachAdjacencyEntry: expecting a callback.");sa(!1,!1,!1,this,e)}forEachAdjacencyEntryWithOrphans(e){if(typeof e!="function")throw new ve("Graph.forEachAdjacencyEntryWithOrphans: expecting a callback.");sa(!1,!1,!0,this,e)}forEachAssymetricAdjacencyEntry(e){if(typeof e!="function")throw new ve("Graph.forEachAssymetricAdjacencyEntry: expecting a callback.");sa(!1,!0,!1,this,e)}forEachAssymetricAdjacencyEntryWithOrphans(e){if(typeof e!="function")throw new ve("Graph.forEachAssymetricAdjacencyEntryWithOrphans: expecting a callback.");sa(!1,!0,!0,this,e)}nodes(){return Array.from(this._nodes.keys())}forEachNode(e){if(typeof e!="function")throw new ve("Graph.forEachNode: expecting a callback.");const t=this._nodes.values();let i,r;for(;i=t.next(),i.done!==!0;)r=i.value,e(r.key,r.attributes)}findNode(e){if(typeof e!="function")throw new ve("Graph.findNode: expecting a callback.");const t=this._nodes.values();let i,r;for(;i=t.next(),i.done!==!0;)if(r=i.value,e(r.key,r.attributes))return r.key}mapNodes(e){if(typeof e!="function")throw new ve("Graph.mapNode: expecting a callback.");const t=this._nodes.values();let i,r;const s=new Array(this.order);let o=0;for(;i=t.next(),i.done!==!0;)r=i.value,s[o++]=e(r.key,r.attributes);return s}someNode(e){if(typeof e!="function")throw new ve("Graph.someNode: expecting a callback.");const t=this._nodes.values();let i,r;for(;i=t.next(),i.done!==!0;)if(r=i.value,e(r.key,r.attributes))return!0;return!1}everyNode(e){if(typeof e!="function")throw new ve("Graph.everyNode: expecting a callback.");const t=this._nodes.values();let i,r;for(;i=t.next(),i.done!==!0;)if(r=i.value,!e(r.key,r.attributes))return!1;return!0}filterNodes(e){if(typeof e!="function")throw new ve("Graph.filterNodes: expecting a callback.");const t=this._nodes.values();let i,r;const s=[];for(;i=t.next(),i.done!==!0;)r=i.value,e(r.key,r.attributes)&&s.push(r.key);return s}reduceNodes(e,t){if(typeof e!="function")throw new ve("Graph.reduceNodes: expecting a callback.");if(arguments.length<2)throw new ve("Graph.reduceNodes: missing initial value. You must provide it because the callback takes more than one argument and we cannot infer the initial value from the first iteration, as you could with a simple array.");let i=t;const r=this._nodes.values();let s,o;for(;s=r.next(),s.done!==!0;)o=s.value,i=e(i,o.key,o.attributes);return i}nodeEntries(){const e=this._nodes.values();return{[Symbol.iterator](){return this},next(){const t=e.next();if(t.done)return t;const i=t.value;return{value:{node:i.key,attributes:i.attributes},done:!1}}}}export(){const e=new Array(this._nodes.size);let t=0;this._nodes.forEach((r,s)=>{e[t++]=Ub(s,r)});const i=new Array(this._edges.size);return t=0,this._edges.forEach((r,s)=>{i[t++]=Fb(this.type,s,r)}),{options:{type:this.type,multi:this.multi,allowSelfLoops:this.allowSelfLoops},attributes:this.getAttributes(),nodes:e,edges:i}}import(e,t=!1){if(e instanceof xt)return e.forEachNode((l,c)=>{t?this.mergeNode(l,c):this.addNode(l,c)}),e.forEachEdge((l,c,u,d,h,f,p)=>{t?p?this.mergeUndirectedEdgeWithKey(l,u,d,c):this.mergeDirectedEdgeWithKey(l,u,d,c):p?this.addUndirectedEdgeWithKey(l,u,d,c):this.addDirectedEdgeWithKey(l,u,d,c)}),this;if(!nn(e))throw new ve("Graph.import: invalid argument. Expecting a serialized graph or, alternatively, a Graph instance.");if(e.attributes){if(!nn(e.attributes))throw new ve("Graph.import: invalid attributes. Expecting a plain object.");t?this.mergeAttributes(e.attributes):this.replaceAttributes(e.attributes)}let i,r,s,o,a;if(e.nodes){if(s=e.nodes,!Array.isArray(s))throw new ve("Graph.import: invalid nodes. Expecting an array.");for(i=0,r=s.length;i<r;i++){o=s[i],Ob(o);const{key:l,attributes:c}=o;t?this.mergeNode(l,c):this.addNode(l,c)}}if(e.edges){let l=!1;if(this.type==="undirected"&&(l=!0),s=e.edges,!Array.isArray(s))throw new ve("Graph.import: invalid edges. Expecting an array.");for(i=0,r=s.length;i<r;i++){a=s[i],kb(a);const{source:c,target:u,attributes:d,undirected:h=l}=a;let f;"key"in a?(f=t?h?this.mergeUndirectedEdgeWithKey:this.mergeDirectedEdgeWithKey:h?this.addUndirectedEdgeWithKey:this.addDirectedEdgeWithKey,f.call(this,a.key,c,u,d)):(f=t?h?this.mergeUndirectedEdge:this.mergeDirectedEdge:h?this.addUndirectedEdge:this.addDirectedEdge,f.call(this,c,u,d))}}return this}nullCopy(e){const t=new xt(qt({},this._options,e));return t.replaceAttributes(qt({},this.getAttributes())),t}emptyCopy(e){const t=this.nullCopy(e);return this._nodes.forEach((i,r)=>{const s=qt({},i.attributes);i=new t.NodeDataClass(r,s),t._nodes.set(r,i)}),t}copy(e){if(e=e||{},typeof e.type=="string"&&e.type!==this.type&&e.type!=="mixed")throw new De(`Graph.copy: cannot create an incompatible copy from "${this.type}" type to "${e.type}" because this would mean losing information about the current graph.`);if(typeof e.multi=="boolean"&&e.multi!==this.multi&&e.multi!==!0)throw new De("Graph.copy: cannot create an incompatible copy by downgrading a multi graph to a simple one because this would mean losing information about the current graph.");if(typeof e.allowSelfLoops=="boolean"&&e.allowSelfLoops!==this.allowSelfLoops&&e.allowSelfLoops!==!0)throw new De("Graph.copy: cannot create an incompatible copy from a graph allowing self loops to one that does not because this would mean losing information about the current graph.");const t=this.emptyCopy(e),i=this._edges.values();let r,s;for(;r=i.next(),r.done!==!0;)s=r.value,hg(t,"copy",!1,s.undirected,s.key,s.source.key,s.target.key,qt({},s.attributes));return t}toJSON(){return this.export()}toString(){return"[object Graph]"}inspect(){const e={};this._nodes.forEach((s,o)=>{e[o]=s.attributes});const t={},i={};this._edges.forEach((s,o)=>{const a=s.undirected?"--":"->";let l="",c=s.source.key,u=s.target.key,d;s.undirected&&c>u&&(d=c,c=u,u=d);const h=`(${c})${a}(${u})`;o.startsWith("geid_")?this.multi&&(typeof i[h]>"u"?i[h]=0:i[h]++,l+=`${i[h]}. `):l+=`[${o}]: `,l+=h,t[l]=s.attributes});const r={};for(const s in this)this.hasOwnProperty(s)&&!Tf.has(s)&&typeof this[s]!="function"&&typeof s!="symbol"&&(r[s]=this[s]);return r.attributes=this._attributes,r.nodes=e,r.edges=t,Nn(r,"constructor",this.constructor),r}}typeof Symbol<"u"&&(xt.prototype[Symbol.for("nodejs.util.inspect.custom")]=xt.prototype.inspect);Gb.forEach(n=>{["add","merge","update"].forEach(e=>{const t=n.name(e),i=e==="add"?hg:Wb;n.generateKey?xt.prototype[t]=function(r,s,o){return i(this,t,!0,(n.type||this.type)==="undirected",null,r,s,o,e==="update")}:xt.prototype[t]=function(r,s,o,a){return i(this,t,!1,(n.type||this.type)==="undirected",r,s,o,a,e==="update")}})});Qx(xt);ub(xt);Tb(xt);Ib(xt);class fg extends xt{constructor(e){const t=qt({type:"directed"},e);if("multi"in t&&t.multi!==!1)throw new ve("DirectedGraph.from: inconsistent indication that the graph should be multi in given options!");if(t.type!=="directed")throw new ve('DirectedGraph.from: inconsistent "'+t.type+'" type in given options!');super(t)}}class pg extends xt{constructor(e){const t=qt({type:"undirected"},e);if("multi"in t&&t.multi!==!1)throw new ve("UndirectedGraph.from: inconsistent indication that the graph should be multi in given options!");if(t.type!=="undirected")throw new ve('UndirectedGraph.from: inconsistent "'+t.type+'" type in given options!');super(t)}}class Bd extends xt{constructor(e){const t=qt({multi:!0},e);if("multi"in t&&t.multi!==!0)throw new ve("MultiGraph.from: inconsistent indication that the graph should be simple in given options!");super(t)}}class mg extends xt{constructor(e){const t=qt({type:"directed",multi:!0},e);if("multi"in t&&t.multi!==!0)throw new ve("MultiDirectedGraph.from: inconsistent indication that the graph should be simple in given options!");if(t.type!=="directed")throw new ve('MultiDirectedGraph.from: inconsistent "'+t.type+'" type in given options!');super(t)}}class gg extends xt{constructor(e){const t=qt({type:"undirected",multi:!0},e);if("multi"in t&&t.multi!==!0)throw new ve("MultiUndirectedGraph.from: inconsistent indication that the graph should be simple in given options!");if(t.type!=="undirected")throw new ve('MultiUndirectedGraph.from: inconsistent "'+t.type+'" type in given options!');super(t)}}function $s(n){n.from=function(e,t){const i=qt({},e.options,t),r=new n(i);return r.import(e),r}}$s(xt);$s(fg);$s(pg);$s(Bd);$s(mg);$s(gg);xt.Graph=xt;xt.DirectedGraph=fg;xt.UndirectedGraph=pg;xt.MultiGraph=Bd;xt.MultiDirectedGraph=mg;xt.MultiUndirectedGraph=gg;xt.InvalidArgumentsGraphError=ve;xt.NotFoundGraphError=ae;xt.UsageGraphError=De;function $b(n,e){if(typeof n!="object"||!n)return n;var t=n[Symbol.toPrimitive];if(t!==void 0){var i=t.call(n,e);if(typeof i!="object")return i;throw new TypeError("@@toPrimitive must return a primitive value.")}return(e==="string"?String:Number)(n)}function _g(n){var e=$b(n,"string");return typeof e=="symbol"?e:e+""}function vg(n,e,t){return(e=_g(e))in n?Object.defineProperty(n,e,{value:t,enumerable:!0,configurable:!0,writable:!0}):n[e]=t,n}function Cf(n,e){var t=Object.keys(n);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(n);e&&(i=i.filter(function(r){return Object.getOwnPropertyDescriptor(n,r).enumerable})),t.push.apply(t,i)}return t}function ol(n){for(var e=1;e<arguments.length;e++){var t=arguments[e]!=null?arguments[e]:{};e%2?Cf(Object(t),!0).forEach(function(i){vg(n,i,t[i])}):Object.getOwnPropertyDescriptors?Object.defineProperties(n,Object.getOwnPropertyDescriptors(t)):Cf(Object(t)).forEach(function(i){Object.defineProperty(n,i,Object.getOwnPropertyDescriptor(t,i))})}return n}function Xb(n,e){if(!(n instanceof e))throw new TypeError("Cannot call a class as a function")}function jb(n,e){for(var t=0;t<e.length;t++){var i=e[t];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(n,_g(i.key),i)}}function Yb(n,e,t){return e&&jb(n.prototype,e),Object.defineProperty(n,"prototype",{writable:!1}),n}function al(n){return al=Object.setPrototypeOf?Object.getPrototypeOf.bind():function(e){return e.__proto__||Object.getPrototypeOf(e)},al(n)}function xg(){try{var n=!Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],function(){}))}catch{}return(xg=function(){return!!n})()}function bg(n){if(n===void 0)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return n}function qb(n,e){if(e&&(typeof e=="object"||typeof e=="function"))return e;if(e!==void 0)throw new TypeError("Derived constructors may only return object or undefined");return bg(n)}function Kb(n,e,t){return e=al(e),qb(n,xg()?Reflect.construct(e,t||[],al(n).constructor):e.apply(n,t))}function xu(n,e){return xu=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(t,i){return t.__proto__=i,t},xu(n,e)}function Zb(n,e){if(typeof e!="function"&&e!==null)throw new TypeError("Super expression must either be null or a function");n.prototype=Object.create(e&&e.prototype,{constructor:{value:n,writable:!0,configurable:!0}}),Object.defineProperty(n,"prototype",{writable:!1}),e&&xu(n,e)}function bu(n,e){(e==null||e>n.length)&&(e=n.length);for(var t=0,i=Array(e);t<e;t++)i[t]=n[t];return i}function Jb(n){if(Array.isArray(n))return bu(n)}function Qb(n){if(typeof Symbol<"u"&&n[Symbol.iterator]!=null||n["@@iterator"]!=null)return Array.from(n)}function ey(n,e){if(n){if(typeof n=="string")return bu(n,e);var t={}.toString.call(n).slice(8,-1);return t==="Object"&&n.constructor&&(t=n.constructor.name),t==="Map"||t==="Set"?Array.from(n):t==="Arguments"||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t)?bu(n,e):void 0}}function ty(){throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)}function gc(n){return Jb(n)||Qb(n)||ey(n)||ty()}function yg(n,e,t,i){var r=Math.pow(1-n,2)*e.x+2*(1-n)*n*t.x+Math.pow(n,2)*i.x,s=Math.pow(1-n,2)*e.y+2*(1-n)*n*t.y+Math.pow(n,2)*i.y;return{x:r,y:s}}function ny(n,e,t){for(var i=20,r=0,s=n,o=0;o<i;o++){var a=yg((o+1)/i,n,e,t);r+=Math.sqrt(Math.pow(s.x-a.x,2)+Math.pow(s.y-a.y,2)),s=a}return r}function iy(n){var e=n.curvatureAttribute,t=n.defaultCurvature,i=n.keepLabelUpright,r=i===void 0?!0:i;return function(s,o,a,l,c){var u=c.edgeLabelSize,d=o[e]||t,h=c.edgeLabelFont,f=c.edgeLabelWeight,p=c.edgeLabelColor.attribute?o[c.edgeLabelColor.attribute]||c.edgeLabelColor.color||"#000":c.edgeLabelColor.color,_=o.label;if(_){s.fillStyle=p,s.font="".concat(f," ").concat(u,"px ").concat(h);var g=!r||a.x<l.x,m=g?a.x:l.x,v=g?a.y:l.y,y=g?l.x:a.x,x=g?l.y:a.y,M=(m+y)/2,E=(v+x)/2,C=y-m,b=x-v,A=Math.sqrt(Math.pow(C,2)+Math.pow(b,2)),L=g?1:-1,P=M+b*d*L,F=E-C*d*L,$=o.size*.7+5,W={x:F-v,y:-(P-m)},I=Math.sqrt(Math.pow(W.x,2)+Math.pow(W.y,2)),B={x:x-F,y:-(y-P)},H=Math.sqrt(Math.pow(B.x,2)+Math.pow(B.y,2));m+=$*W.x/I,v+=$*W.y/I,y+=$*B.x/H,x+=$*B.y/H,P+=$*b/A,F-=$*C/A;var Z={x:P,y:F},J={x:m,y:v},ne={x:y,y:x},de=ny(J,Z,ne);if(!(de<a.size+l.size)){var ye=s.measureText(_).width,Fe=de-a.size-l.size;if(ye>Fe){var tt="…";for(_=_+tt,ye=s.measureText(_).width;ye>Fe&&_.length>1;)_=_.slice(0,-2)+tt,ye=s.measureText(_).width;if(_.length<4)return}for(var Ie={},q=0,pe=_.length;q<pe;q++){var ie=_[q];Ie[ie]||(Ie[ie]=s.measureText(ie).width*(1+d*.35))}for(var Ce=.5-ye/de/2,Oe=0,Ne=_.length;Oe<Ne;Oe++){var bt=_[Oe],je=yg(Ce,J,Z,ne),at=2*(1-Ce)*(P-m)+2*Ce*(y-P),gt=2*(1-Ce)*(F-v)+2*Ce*(x-F),Ye=Math.atan2(gt,at);s.save(),s.translate(je.x,je.y),s.rotate(Ye),s.fillText(bt,0,0),s.restore(),Ce+=Ie[bt]/de}}}}}function ry(n){var e=n.arrowHead,t=(e==null?void 0:e.extremity)==="target"||(e==null?void 0:e.extremity)==="both",i=(e==null?void 0:e.extremity)==="source"||(e==null?void 0:e.extremity)==="both",r=`
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
`);return r}function sy(n){var e=n.arrowHead,t=(e==null?void 0:e.extremity)==="target"||(e==null?void 0:e.extremity)==="both",i=(e==null?void 0:e.extremity)==="source"||(e==null?void 0:e.extremity)==="both",r=`
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
`);return r}var Sg=.25,oy={arrowHead:null,curvatureAttribute:"curvature",defaultCurvature:Sg},Eg=WebGLRenderingContext,Rf=Eg.UNSIGNED_BYTE,rr=Eg.FLOAT;function zd(n){var e=ol(ol({},oy),n||{}),t=e,i=t.arrowHead,r=t.curvatureAttribute,s=t.drawLabel,o=(i==null?void 0:i.extremity)==="target"||(i==null?void 0:i.extremity)==="both",a=(i==null?void 0:i.extremity)==="source"||(i==null?void 0:i.extremity)==="both",l=["u_matrix","u_sizeRatio","u_dimensions","u_pixelRatio","u_feather","u_minEdgeThickness"].concat(gc(i?["u_lengthToThicknessRatio","u_widenessToThicknessRatio"]:[]));return(function(c){Zb(u,c);function u(){var d;Xb(this,u);for(var h=arguments.length,f=new Array(h),p=0;p<h;p++)f[p]=arguments[p];return d=Kb(this,u,[].concat(f)),vg(bg(d),"drawLabel",s||iy(e)),d}return Yb(u,[{key:"getDefinition",value:function(){return{VERTICES:6,VERTEX_SHADER_SOURCE:sy(e),FRAGMENT_SHADER_SOURCE:ry(e),METHOD:WebGLRenderingContext.TRIANGLES,UNIFORMS:l,ATTRIBUTES:[{name:"a_source",size:2,type:rr},{name:"a_target",size:2,type:rr}].concat(gc(o?[{name:"a_targetSize",size:1,type:rr}]:[]),gc(a?[{name:"a_sourceSize",size:1,type:rr}]:[]),[{name:"a_thickness",size:1,type:rr},{name:"a_curvature",size:1,type:rr},{name:"a_color",size:4,type:Rf,normalized:!0},{name:"a_id",size:4,type:Rf,normalized:!0}]),CONSTANT_ATTRIBUTES:[{name:"a_current",size:1,type:rr},{name:"a_direction",size:1,type:rr}],CONSTANT_DATA:[[0,1],[0,-1],[1,1],[0,-1],[1,1],[1,-1]]}}},{key:"processVisibleItem",value:function(h,f,p,_,g){var m,v=g.size||1,y=p.x,x=p.y,M=_.x,E=_.y,C=Hs(g.color),b=(m=g[r])!==null&&m!==void 0?m:Sg,A=this.array;A[f++]=y,A[f++]=x,A[f++]=M,A[f++]=E,o&&(A[f++]=_.size),a&&(A[f++]=p.size),A[f++]=v,A[f++]=b,A[f++]=C,A[f++]=h}},{key:"setUniforms",value:function(h,f){var p=f.gl,_=f.uniformLocations,g=_.u_matrix,m=_.u_pixelRatio,v=_.u_feather,y=_.u_sizeRatio,x=_.u_dimensions,M=_.u_minEdgeThickness;if(p.uniformMatrix3fv(g,!1,h.matrix),p.uniform1f(m,h.pixelRatio),p.uniform1f(y,h.sizeRatio),p.uniform1f(v,h.antiAliasingFeather),p.uniform2f(x,h.width*h.pixelRatio,h.height*h.pixelRatio),p.uniform1f(M,h.minEdgeThickness),i){var E=_.u_lengthToThicknessRatio,C=_.u_widenessToThicknessRatio;p.uniform1f(E,i.lengthToThicknessRatio),p.uniform1f(C,i.widenessToThicknessRatio)}}}]),u})(Ol)}var ay=zd();zd({arrowHead:Bl});zd({arrowHead:ol(ol({},Bl),{},{extremity:"both"})});const Pf=[5,9,15],Gd="#3a4a54";function Hd(n,e,t){const i=e/100,r=t/100,s=i*Math.min(r,1-r),o=l=>{const c=(l+n/30)%12;return r-s*Math.max(Math.min(c-3,9-c,1),-1)},a=l=>Math.round(l*255).toString(16).padStart(2,"0");return`#${a(o(0))}${a(o(8))}${a(o(4))}`}function Sr(n){return[parseInt(n.slice(1,3),16)||0,parseInt(n.slice(3,5),16)||0,parseInt(n.slice(5,7),16)||0]}function Do(n,e){const[t,i,r]=Sr(n),s=(o,a)=>Math.round(Pf[a]+(o-Pf[a])*e).toString(16).padStart(2,"0");return`#${s(t,0)}${s(i,1)}${s(r,2)}`}function no(n,e,t){const[i,r,s]=Sr(n),[o,a,l]=Sr(e),c=(u,d)=>Math.round(u+(d-u)*t).toString(16).padStart(2,"0");return`#${c(i,o)}${c(r,a)}${c(s,l)}`}function Mg(n){var t,i;const e=new Map;for(const r of n){const s=(t=r.metadata)==null?void 0:t.cluster_global;if(s==null||(i=r.metadata)!=null&&i.is_noise)continue;const o=String(s),a=e.get(o)??{count:0,sample:null,ids:[]};a.count++,a.ids.push(String(r.id)),!a.sample&&r.label&&(a.sample=r.label),e.set(o,a)}return e}function Qr(n,e=58){const t=Number(n);if(Number.isFinite(t)){const i=(Math.abs(t)*137.508+30)%360;return Hd(i,100,e)}return"#608090"}function wg(n,e=0,t=0,i=58){const r=n.metadata;if(r!=null&&r.is_noise)return Do(Gd,.28);const s=r==null?void 0:r.cluster_global;if(s!=null&&Number.isFinite(Number(s)))return Qr(s,i);const a=(Math.atan2(t,e)*(180/Math.PI)+180)%360;return Hd(a,100,i)}const Tg=1100,ws="#facc15",ly="#7dd3fc",Xs="#fb923c",cy="#2dd4bf",Lf="#3b82f6",Df="#ef4444",uy="#22c55e",dy="#f97316",Ag=[.98,.8,.082],hy=[.49,.827,.988],fy=[.98,.57,.24],Cg=[.231,.51,.965],Rg=[.937,.267,.267],Pg=[.133,.773,.369],Lg=[.976,.451,.086],py=3003583,ll=16486972,Dg=16436245;function Ng(n,e){const t=Math.max(0,Math.min(1,n)),i=(r,s)=>[r[0]+(s[0]-r[0])*t,r[1]+(s[1]-r[1])*t,r[2]+(s[2]-r[2])*t];return e===0?i(Cg,Rg):e===1?i(Pg,Lg):null}function zo(n){let e=2166136261;for(let t=0;t<n.length;t++)e^=n.charCodeAt(t),e=Math.imul(e,16777619);return e>>>0}function Vd(n,e){const t=(n&65535)*(Math.PI*2/65535),i=(n>>>16)*(Math.PI*2/65535),r=Math.sin(e*.6+t)*.035+Math.sin(e*.35+t+1.2)*.02,s=Math.cos(e*.45+i)*.03+Math.cos(e*.25+i+2.1)*.015;return{dx:r,dy:s}}function Gl(n){return[parseInt(n.slice(1,3),16)/255,parseInt(n.slice(3,5),16)/255,parseInt(n.slice(5,7),16)/255]}function Ig(n){return Hd(217,91,Math.round(45+n*20))}function Wd(n,e){const t=Date.now()+Tg;for(const i of n)i&&e.set(i,t)}function Ug(n,e,t){const i=e.selectedIds.has(n),r=e.hoverNodeId===n,s=e.selectedIds.size>0||e.emphasizedIds.size>0||!!e.hoverNodeId,o=s&&e.emphasizedIds.has(n),a=s&&!i&&!r&&!o,l=t.get(n)??0,c=l>Date.now(),u=c?(l-Date.now())/Tg:0;return{selected:i,hover:r,emphasized:o,dim:a,pulsing:c,pulseLife:u}}function my(n,e=12){if(n.length<3)return n.slice();const t=[n[0],...n,n[n.length-1]],i=[],r=n.length-1;for(let s=0;s<r;s++){const o=t[s],a=t[s+1],l=t[s+2],c=t[s+3],u=s===r-1?e+1:e;for(let d=0;d<u;d++){const h=d/e,f=h*h,p=f*h;i.push({x:.5*(2*a.x+(-o.x+l.x)*h+(2*o.x-5*a.x+4*l.x-c.x)*f+(-o.x+3*a.x-3*l.x+c.x)*p),y:.5*(2*a.y+(-o.y+l.y)*h+(2*o.y-5*a.y+4*l.y-c.y)*f+(-o.y+3*a.y-3*l.y+c.y)*p)})}}return i}function Fg(n,e){n.save();for(const[t,i]of e){if(i.length<2)continue;const r=gy(i);if(r.length<2)continue;const s=Qr(t);n.strokeStyle=s,n.lineWidth=2.5,n.globalAlpha=.85,n.setLineDash([]),n.beginPath(),n.moveTo(i[r[0]].x,i[r[0]].y);for(let o=1;o<r.length;o++)n.lineTo(i[r[o]].x,i[r[o]].y);n.closePath(),n.stroke(),n.globalAlpha=.18,n.fillStyle=s,n.fill()}n.restore()}function $d(n,e,t){const i=r=>Math.round(r*255).toString(16).padStart(2,"0");return`#${i(n)}${i(e)}${i(t)}`}function Og(n){const e=n<.5?n*2:1,t=n<.5?n*2:(1-n)*2,i=n<.5?1:(1-n)*2;return[e,t,i]}function kg(n){const e=n<.5?.13333333333333333+.8666666666666667*n*2:1,t=n<.5?197/255+(1-197/255)*n*2:1-(1-115/255)*(n-.5)*2,i=n<.5?94/255+(1-94/255)*n*2:1-(1-22/255)*(n-.5)*2;return[e,t,i]}function Bg(n){var e;return((e=n.source_point_ids)==null?void 0:e.map(String))??[]}function zg(n,e,t){const i=e==="delta_walk";return n===0?(i?t[2]:t[0])??null:n===1&&!i&&t.length>=2?t[1]:null}function Gg(n){const e=Math.max(1,Math.round(n.length*.1));return{sideA:n.slice(-e).map(t=>t.id),sideB:n.slice(0,e).map(t=>t.id)}}function gy(n){if(n.length<3)return n.map((r,s)=>s);let e=0;for(let r=1;r<n.length;r++)(n[r].x<n[e].x||n[r].x===n[e].x&&n[r].y<n[e].y)&&(e=r);const t=[];let i=e;do{t.push(i);let r=(i+1)%n.length;for(let s=0;s<n.length;s++)(n[r].x-n[i].x)*(n[s].y-n[i].y)-(n[r].y-n[i].y)*(n[s].x-n[i].x)<0&&(r=s);i=r}while(i!==e&&t.length<=n.length);return t}const[_y,vy,xy]=Sr(Xs);function by(n,e,t,i,r,s,o=!0,a){var c,u;i.length=0,r.length=0,n.clear();const{points:l}=e;if(l.length){for(const d of l){const h=Number(((c=d.view_coords)==null?void 0:c[0])??0),f=Number(((u=d.view_coords)==null?void 0:u[1])??0);n.addNode(String(d.id),{x:h,y:f,size:4,color:wg(d,h,f),label:d.label??String(d.id)})}Hg(n,t,i,r,s,o,a)}}function Hg(n,e,t,i,r,s=!0,o){for(const l of t)n.hasEdge(l)&&n.dropEdge(l);t.length=0;for(const l of i)n.hasNode(l)&&n.dropNode(l);if(i.length=0,o==null||o.clear(),!e)return;const a=e.operation;if(a==="delta_walk"){const l=(e.source_point_ids??[]).map(String),[c,u]=l;if(c&&u&&n.hasNode(c)&&n.hasNode(u)){const[d,h,f]=Sr(cy),p=n.addEdge(c,u,{color:`rgba(${d},${h},${f},0.85)`,size:2.5,isOverlay:!0,zIndex:2});t.push(p)}}if(r){const l=(e.source_point_ids??[]).map(String);yy(n,e.trajectory_overlay??[],t,i,s,l,o,a,e.consistency_variants)}}function Vg(n,e){const t=Ng(n,e);return t?$d(...t):Xs}function Nf(n,e,t){const[i,r,s]=Sr(Vg(n,e));return`rgba(${i},${r},${s},${t})`}function yy(n,e,t,i,r,s,o,a,l){var h;const c=e.filter(f=>f.coords_2d);if(!c.length)return;const u=a==="consistency_check",d=[];for(const f of c){const p=`__ghost__${f.id}`;if(n.hasNode(p))continue;const _=Lo(f.coords_2d);if(!_)continue;let[g,m]=_;if(r&&!u&&a!=="axis_projection"){const C=zg(f.alpha,a,s);C&&n.hasNode(C)&&(g=n.getNodeAttribute(C,"x"),m=n.getNodeAttribute(C,"y"),o==null||o.set(p,C))}const v=f.source_text_pair,y=u?f.cluster_id!=null?Qr(f.cluster_id):Do(Gd,.28):null,x=u?`rgba(${_y},${vy},${xy},0.5)`:Nf(f.alpha,v,.5),M=u?null:Vg(f.alpha,v),E=u?((h=l==null?void 0:l.find(C=>C.id===f.id))==null?void 0:h.text)??f.label:void 0;n.addNode(p,{x:g,y:m,size:u?4:3.5,color:x,label:u?E??"":`t=${f.alpha.toFixed(2)}`,isGhost:!0,isVariantGhost:u,ghostClusterColor:y,ghostClusterId:f.cluster_id??null,ghostRingColor:M,ghostCoords2d:f.coords_2d,ghostCoords3d:f.coords_3d,ghostAlpha:f.alpha,zIndex:u?2:1}),i.push(p),d.push({key:p,alpha:f.alpha,pair:v})}if(a!=="consistency_check"&&a!=="slerp")for(let f=0;f<d.length-1;f++){const{key:p,alpha:_,pair:g}=d[f],{key:m,alpha:v,pair:y}=d[f+1];if(g===y&&n.hasNode(p)&&n.hasNode(m)){const x=(_+v)/2,M=Nf(x,g,.32),E=a==="lerp"?void 0:"curved",b=n.addEdge(p,m,{...E?{type:E,curvature:.05}:{},color:M,size:1,isOverlay:!0,zIndex:1});t.push(b)}}}const _c=ht(!1),Hi=ht(null),Hr=ht(!1),Sy=_i(()=>{var a,l;const n=ot.value.points,e=((l=(a=Zi.value)==null?void 0:a.source)==null?void 0:l.cluster_labels)??{},t=Mg(n),i=new Map;let r=0;const s=Ue.value;if((s==null?void 0:s.operation)==="consistency_check"){for(const c of s.consistency_variants??[])if(c.cluster_id!=null&&c.cluster_id>=0){const u=String(c.cluster_id);t.has(u)?i.set(u,(i.get(u)??0)+1):r++}}return{entries:[...t.entries()].map(([c,{count:u,sample:d,ids:h}])=>({id:c,name:e[c]??c,color:Qr(c),count:u,variantCount:i.get(c)??0,sample:d,pointIds:h})).sort((c,u)=>Number(c.id)-Number(u.id)),outsideVariantCount:r}});function Ey(){const{entries:n,outsideVariantCount:e}=Sy.value;if(Wr(()=>Yt(()=>{const s=ot.value.points,o=new Set(s.map(c=>String(c.id)));Hi.value!==null&&!s.some(c=>{var u,d;return String((u=c.metadata)==null?void 0:u.cluster_global)===Hi.value&&!((d=c.metadata)!=null&&d.is_noise)})&&(Hi.value=null);const a=Mt.value,l=[...a].filter(c=>Fm(c)||o.has(c));l.length!==a.size&&(Mt.value=new Set(l))}),[]),!n.length)return null;const t=_c.value,i=Hi.value,r=i!==null&&n.some(s=>s.id===i);return T("div",{class:"nels-cluster-overlay",children:[T("div",{class:"nels-cluster-toggle-row",children:[T("button",{class:"nels-cluster-toggle",onClick:()=>{_c.value=!_c.value},children:[T("span",{children:"Clusters"}),T("span",{class:"nels-cluster-toggle-icon",children:t?"+":"-"})]}),T("button",{class:`nels-hull-chip${Hr.value?" active":""}`,title:"Toggle convex hulls around clusters",onClick:s=>{s.stopPropagation(),Hr.value=!Hr.value},children:"Hulls"})]}),!t&&T("div",{class:"nels-legend-list",children:[n.map(s=>T("div",{class:`nels-legend-row${r&&i===s.id?" active":""}`,onClick:()=>My(s),children:[T("span",{class:"nels-legend-dot",style:`background:${s.color}`}),T("div",{class:"nels-legend-info",children:[T("span",{class:"nels-legend-name",children:s.name}),s.sample&&T("span",{class:"nels-legend-sample",children:['"',s.sample,'"']})]}),T("span",{class:"nels-legend-meta",children:[s.count," pts",s.variantCount>0?` +${s.variantCount}v`:""]})]},s.id)),e>0&&T("div",{class:"nels-legend-outside",children:["+",e," variant",e>1?"s":""," in clusters outside the loaded sample"]})]})]})}function My(n){Hi.value===n.id?(Hi.value=null,Mt.value=new Set):(Hi.value=n.id,Mt.value=new Set(n.pointIds))}const[Wg,$g,Xg]=Sr(ws);let en=null,Bt=null,Nr=null,cl={selectedIds:new Set,hoverNodeId:null};function wy(n){Nr=n}function Ty(n,e,t){en=n,Bt=e,cl=t}function Ay(){en=null,Bt=null}function yu(){var i,r;if(!Nr||si.value==="3d"||!en||!Bt)return;const n=Nr.offsetWidth,e=Nr.offsetHeight;Nr.width=n,Nr.height=e;const t=Nr.getContext("2d");if(t){if(t.clearRect(0,0,n,e),Hr.value){const s=new Map;for(const o of ot.value.points){const a=(i=o.metadata)==null?void 0:i.cluster_global;if(a==null||(r=o.metadata)!=null&&r.is_noise)continue;const l=String(o.id);if(!Bt.hasNode(l))continue;const c=Bt.getNodeAttributes(l),u=en.graphToViewport({x:c.x,y:c.y}),d=String(a),h=s.get(d)??[];h.push(u),s.set(d,h)}Fg(t,s)}Py(t),Iy(t,n,e),Ry(t),Cy(t),Ly(t)}}function Cy(n){var i;if(!en||!Bt||((i=Ue.value)==null?void 0:i.operation)!=="slerp")return;const e=[];if(Bt.forEachNode((r,s)=>{if(!s.isGhost||s.isVariantGhost)return;const o=en.graphToViewport({x:s.x,y:s.y});e.push({alpha:s.ghostAlpha,x:o.x,y:o.y})}),e.length<3)return;e.sort((r,s)=>r.alpha-s.alpha);const t=my(e);n.save(),n.strokeStyle=Xs,n.lineWidth=1.5,n.globalAlpha=.78,n.beginPath(),n.moveTo(t[0].x,t[0].y);for(let r=1;r<t.length;r++)n.lineTo(t[r].x,t[r].y);n.stroke(),n.restore()}function Ry(n){if(!en||!Bt)return;const e=performance.now()/1e3,t=.5+.5*Math.sin(e*.7);n.save(),n.setLineDash([]),n.lineWidth=2.5,n.globalAlpha=.55+t*.3,Bt.forEachNode((i,r)=>{if(!r.isGhost||cl.hoverNodeId===i)return;const s=en.graphToViewport({x:r.x,y:r.y});n.strokeStyle=r.ghostRingColor??Xs,n.beginPath(),n.arc(s.x,s.y,8,0,Math.PI*2),n.stroke()}),n.restore()}function Py(n){if(!en||!Bt)return;const e=Ue.value;if((e==null?void 0:e.operation)!=="nearest_neighbor")return;const t=Bg(e);n.save(),n.strokeStyle=`rgba(${Wg},${$g},${Xg},0.78)`,n.lineWidth=2,n.setLineDash([6,4]),n.globalAlpha=1;for(const i of e.neighbors??[]){const r=String(i.id??"");if(!r)continue;const s=i.query_id?[String(i.query_id)]:t;for(const o of s){if(!Bt.hasNode(o)||!Bt.hasNode(r))continue;const a=Bt.getNodeAttributes(o),l=Bt.getNodeAttributes(r),c=en.graphToViewport({x:a.x,y:a.y}),u=en.graphToViewport({x:l.x,y:l.y});n.beginPath(),n.moveTo(c.x,c.y),n.lineTo(u.x,u.y),n.stroke()}}n.setLineDash([]),n.restore()}function Ly(n){var a,l;if(!en)return;const e=Xe.value;if(e.operation!=="latent_probe")return;const t=e.probe_mode==="2d"?e.probe_coords:e.probe_cross_coords,i=Lo(t??void 0);if(!i)return;const r=en.graphToViewport({x:i[0],y:i[1]}),s=cl.selectedIds.has("probe"),o=cl.hoverNodeId==="probe";if(n.save(),n.shadowColor=`rgba(${Wg},${$g},${Xg},0.6)`,n.shadowBlur=s||o?18:12,n.beginPath(),n.arc(r.x,r.y,s||o?11:8,0,Math.PI*2),n.fillStyle=ws,n.fill(),n.restore(),s&&!o){const c=((a=Ue.value)==null?void 0:a.operation)==="latent_probe"?(l=Ue.value)==null?void 0:l.text_reconstruction:void 0;jg(n,r.x,r.y-18,(c==null?void 0:c.text)??"Latent Space Probe",ws)}}function jg(n,e,t,i,r,s=11,o="ui-monospace, monospace"){n.save();const a=i.length>50?i.slice(0,50)+"...":i;n.font=`${s}px ${o}`;const l=n.measureText(a).width,c=8,u=5,d=l+c*2,h=s+u*2,f=e-d/2,p=t-h;n.fillStyle="#0f1a28",n.beginPath(),n.roundRect?n.roundRect(f,p,d,h,4):n.rect(f,p,d,h),n.fill(),n.strokeStyle=r,n.lineWidth=1.5,n.shadowColor=r,n.shadowBlur=8,n.stroke(),n.shadowBlur=0,n.fillStyle="#e8f0f8",n.textAlign="center",n.textBaseline="middle",n.fillText(a,e,p+h/2),n.restore()}function Dy(n,e,t,i,r,s){const o=[];Math.abs(t)>1e-8&&(o.push(-n/t),o.push((r-n)/t)),Math.abs(i)>1e-8&&(o.push(-e/i),o.push((s-e)/i));const a=o.filter(l=>{const c=n+l*t,u=e+l*i;return c>=-1&&c<=r+1&&u>=-1&&u<=s+1});return a.sort((l,c)=>l-c),[a[0]??-1,a[a.length-1]??1]}function If(n){if(!en||!Bt)return null;let e=0,t=0,i=0;for(const r of n){const s=String(r);if(!Bt.hasNode(s))continue;const o=Bt.getNodeAttributes(s),a=en.graphToViewport({x:o.x,y:o.y});e+=a.x,t+=a.y,i++}return i?{x:e/i,y:t/i}:null}function Ny(n){if(!n.length)return[null,null];const{sideA:e,sideB:t}=Gg(n);return[If(e),If(t)]}function Uf(n,e,t,i,r){const[s,o]=Ny(i);if(!s||!o)return;const a=o.x-s.x,l=o.y-s.y,c=Math.sqrt(a*a+l*l);if(c<1)return;const u=a/c,d=l/c,[h,f]=Dy(s.x,s.y,u,d,e,t),p={x:s.x+h*u,y:s.y+h*d},_={x:s.x+f*u,y:s.y+f*d};n.setLineDash([6,4]),n.lineWidth=1.2,n.strokeStyle="rgba(255,255,255,0.22)",n.beginPath(),n.moveTo(p.x,p.y),n.lineTo(_.x,_.y),n.stroke(),n.setLineDash([]);const g=10,m=5;n.strokeStyle=r.lineB,n.lineWidth=1.8,n.beginPath(),n.moveTo(_.x-u*g-d*m,_.y-d*g+u*m),n.lineTo(_.x,_.y),n.lineTo(_.x-u*g+d*m,_.y-d*g-u*m),n.stroke(),n.strokeStyle=r.lineA,n.beginPath(),n.moveTo(p.x+u*g-d*m,p.y+d*g+u*m),n.lineTo(p.x,p.y),n.lineTo(p.x+u*g+d*m,p.y+d*g-u*m),n.stroke()}function Iy(n,e,t){const i=Ue.value;if((i==null?void 0:i.operation)!=="axis_projection")return;const r=i.axis_projection??[];if(!r.length||!en||!Bt)return;n.save(),Uf(n,e,t,r,{lineA:Lf,lineB:Df});const s=i.axis_b_projection;s&&s.length>=2&&Uf(n,e,t,s,{lineA:uy,lineB:dy});const o=(a,l)=>{if(!(!en||!Bt)){n.strokeStyle=l,n.lineWidth=2,n.globalAlpha=.75;for(const c of a){const u=String(c);if(!Bt.hasNode(u))continue;const d=Bt.getNodeAttributes(u),h=en.graphToViewport({x:d.x,y:d.y});n.beginPath(),n.arc(h.x,h.y,7,0,Math.PI*2),n.stroke()}n.globalAlpha=1}};o(i.source_group_a??[],Lf),o(i.source_group_b??[],Df),n.restore()}const[Uy,Fy,Oy]=Sr(Xs);function ky(n){return $d(...Og(n))}function By(n){return $d(...kg(n))}function zy(n,e,t){return function(i,r){var M;if(r.isGhost){const E=n.hoverNodeId===i;if(n.selectedIds.has(i))return{...r,size:(r.size||5)*1.9,color:ws,highlighted:!0,zIndex:6};if(E)return{...r,size:(r.size||3.5)*2.2,color:ws,highlighted:!0,zIndex:5};const b=t(i),A=.5+.5*Math.sin(b);if(r.isVariantGhost){const L=r.ghostClusterColor??Xs,P=Hi.value,F=r.ghostClusterId,$=P!==null&&(F==null||String(F)!==P);return{...r,size:(r.size||4)*(.94+A*.08),color:$?L+"28":no(L,"#ffffff",.02+A*.04)}}return{...r,size:(r.size||3.5)*(.82+A*.18),color:`rgba(${Uy},${Fy},${Oy},0)`}}const s=t(i),o=.5+.5*Math.sin(s),a=.5+.5*Math.sin(s*.72+1.7),{selected:l,hover:c,emphasized:u,dim:d,pulsing:h,pulseLife:f}=Ug(i,n,e);if(Jr.value&&!l&&!c)return{...r,color:Do(r.color||"#607890",.08),size:(r.size||6)*.55,zIndex:0};const p=((M=Ue.value)==null?void 0:M.operation)==="axis_projection",_=Ni.value,g=_==="b"?Nm.value:Im.value,m=_==="b"?By:ky;if(!l&&!c&&!u&&!d&&!h){const E={...r};return p&&g.has(i)?(E.color=m(g.get(i)),E.size=(r.size||6)*(.94+o*.08)):(E.color=no(r.color||"#40a0ff","#ffffff",.02+a*.04),E.size=(r.size||6)*(.94+o*.08)),E}const v={...r},y=r.size||6,x=r.color||"#607890";return l?(v.color=no(ws,"#fff7a8",a*.14),v.size=y*(1.5+o*.04),v.zIndex=3,v.highlighted=!0):c?(v.color=no(x,"#ffffff",.08+a*.08),v.size=y*(1.4+o*.05),v.zIndex=2,v.highlighted=!0):u?(v.color=no(ly,"#dff4ff",a*.16),v.size=y*(1.25+o*.03),v.zIndex=1):d&&(v.color=Do(x,.22+o*.03),v.size=y*(.72+o*.04),v.zIndex=0),h&&(v.size=(v.size||y)*(1+f*.65),v.color=Ig(f),v.zIndex=4),v}}function Gy(n,e,t){const i=e.x,r=e.y,s=e.size||6,o=e.color||"#6080a0",a=e.label;if(n.beginPath(),n.arc(i,r,s+4,0,Math.PI*2),n.strokeStyle=o,n.lineWidth=2,n.globalAlpha=.5,n.shadowColor=o,n.shadowBlur=12,n.stroke(),n.globalAlpha=1,n.shadowBlur=0,!a)return;const l=t.labelSize||11,c=t.labelFont||"ui-monospace, monospace";jg(n,i,r-s-10,a,o,l,c)}let vc=null,za=null,Ga=null;function Hy(n){za=n}function Vy(n){Ga=n}function st(){vc&&clearTimeout(vc),vc=setTimeout(()=>za==null?void 0:za(),120)}function Wy(n){Ft.value=n?`__ghost__${n}`:null;const e=Ga==null?void 0:Ga();e==null||e.highlightGhostStep(n),e==null||e.sigmaRefresh()}const ri=ht(null);let ui=null,ul=null,Xd=null;function $y(){const n=document.createElement("div");n.style.cssText="position:fixed;z-index:9999;background:#0f1a28;color:#e8f0f8;border:1px solid rgba(160,210,255,0.35);border-radius:4px;font:12px ui-monospace,monospace;box-shadow:0 4px 14px rgba(0,0,0,0.55);padding:4px 0;min-width:130px;display:none;";const e=document.createElement("div");return e.textContent="Copy Prompt",e.style.cssText="padding:6px 14px;cursor:pointer;user-select:none;",e.addEventListener("mouseover",()=>{e.style.background="rgba(160,210,255,0.1)"}),e.addEventListener("mouseout",()=>{e.style.background=""}),e.addEventListener("mousedown",t=>{var s;t.stopPropagation();const i=ul?ot.value.byId.get(ul):void 0,r=Xd??((s=i==null?void 0:i.metadata)==null?void 0:s.text)??(i==null?void 0:i.label)??"";r&&navigator.clipboard.writeText(r).catch(()=>{}),xc()}),n.appendChild(e),document.addEventListener("mousedown",t=>{n.style.display!=="none"&&!n.contains(t.target)&&xc()},!0),document.addEventListener("keydown",t=>{t.key==="Escape"&&xc()}),document.body.appendChild(n),n}function xc(){ui&&(ui.style.display="none"),ul=null,Xd=null}function Ts(n,e,t,i){ui||(ui=$y()),ul=t,Xd=i??null,ui.style.display="block",ui.style.left=`${n}px`,ui.style.top=`${e}px`;const r=ui.getBoundingClientRect();r.right>window.innerWidth&&(ui.style.left=`${n-r.width}px`),r.bottom>window.innerHeight&&(ui.style.top=`${e-r.height}px`)}let No=!1,As=null;function Xy(){No=!1,As=null,ri.value=null}function dl(n){const e=Us().getBoundingClientRect();return{x:n.clientX-e.left,y:n.clientY-e.top}}function Yg(n){if(!n.shiftKey||!Us()||Ft.value)return;n.stopPropagation(),n.preventDefault();const e=dl(n);No=!0,As=e,ri.value={x1:e.x,y1:e.y,x2:e.x,y2:e.y}}function qg(n){if(!No||!As||!Us())return;const e=dl(n);ri.value={x1:As.x,y1:As.y,x2:e.x,y2:e.y}}function Kg(n){if(!No)return;No=!1;const e=ri.value;ri.value=null,As=null;const t=fr(),i=Qg();if(!e||!t||!i)return;const r=Math.min(e.x1,e.x2),s=Math.max(e.x1,e.x2),o=Math.min(e.y1,e.y2),a=Math.max(e.y1,e.y2);if(s-r<4&&a-o<4)return;const l=new Set;i.forEachNode(c=>{const u=i.getNodeAttributes(c),d=t.graphToViewport({x:u.x,y:u.y});d.x>=r&&d.x<=s&&d.y>=o&&d.y<=a&&l.add(c)}),Mt.value=l,st()}let vs=null,So=null,Eo=null,Mo=null;function jy(){const n=fr();if(!n)return;n.on("clickNode",({node:l,event:c})=>{const u=(c==null?void 0:c.original)??{},d=u.shiftKey||u.ctrlKey||u.metaKey;Es(l,d),st(),n.refresh()}),n.on("clickStage",l=>{if(!fr())return;const c=Xe.value;if(c.operation==="latent_probe"&&c.probe_place_mode){const u=l.event;if(u){const d=n.viewportToGraph({x:u.x??0,y:u.y??0}),h=s0([d.x,d.y]);if(!h)return;Lt({probe_coords:h,probe_mode:"2d",probe_place_mode:!1}),st()}n.refresh();return}Dd(),st(),n.refresh()}),n.on("enterNode",({node:l})=>{var u,d;Ft.value=l;const c=ot.value.byId.get(l);if(c)Pn.value=c;else{const h=fr(),f=h?h.getGraph().getNodeAttributes(l):null;if(f!=null&&f.isGhost&&f.ghostCoords2d){const p=f.ghostCoords2d,_=Lo(p),g=f.ghostCoords3d,m=g||void 0,v=l.startsWith("__ghost__")?l.slice(9):l,y=f.ghostClusterId,x=(d=(u=Ue.value)==null?void 0:u.consistency_variants)==null?void 0:d.find(E=>E.id===v),M=(x==null?void 0:x.text)??f.label??"";Pn.value={id:v,view_coords:_??m??[0,0],label:M,metadata:{text:M||void 0,...y!=null&&y>=0?{ghost_cluster_id:y}:{}}}}else Pn.value=null}n.refresh()}),n.on("leaveNode",()=>{Ft.value=null,Pn.value=null,n.refresh()});const e=12;function t(){const l=Xe.value;if(l.operation!=="latent_probe")return null;const c=l.probe_mode==="2d"?l.probe_coords:l.probe_cross_coords;return Lo(c??void 0)??null}function i(l,c){const u=fr(),d=t();if(!u||!d)return!1;const h=u.graphToViewport({x:d[0],y:d[1]}),f=l-h.x,p=c-h.y;return Math.sqrt(f*f+p*p)<=e}function r(){Ft.value==="probe"&&(Ft.value=null,Pn.value=null)}function s(l){var p,_;const c=t(),u=Us();if(!c||!u){r();return}const{x:d,y:h}=dl(l);if(!i(d,h)){r();return}if(Ft.value===null||Ft.value==="probe"){const g=((p=Ue.value)==null?void 0:p.operation)==="latent_probe"?(_=Ue.value)==null?void 0:_.text_reconstruction:void 0;Ft.value="probe",Pn.value={id:"probe",view_coords:[c[0],c[1]],label:"Latent probe",metadata:{text:"Latent Space Probe",recon_text:g==null?void 0:g.text,recon_sim:g==null?void 0:g.cosine_sim}}}}const o=Us();vs=o,So=s,o==null||o.addEventListener("mousemove",So),Eo=l=>{if(!t()||Xe.value.probe_place_mode)return;const{x:u,y:d}=dl(l);if(!i(u,d))return;const h=l.shiftKey||l.ctrlKey||l.metaKey;Es("probe",h),st(),n.refresh()},o==null||o.addEventListener("click",Eo),Mo=l=>{var u,d,h,f;const c=Ft.value;if(c){if(l.preventDefault(),c==="probe"){const p=((u=Ue.value)==null?void 0:u.operation)==="latent_probe"?(d=Ue.value)==null?void 0:d.text_reconstruction:void 0;Ts(l.clientX,l.clientY,"probe",(p==null?void 0:p.text)??"Latent Space Probe");return}if(c.startsWith("__ghost__")){const p=fr(),_=p?p.getGraph().getNodeAttributes(c):null;if(!(_!=null&&_.isGhost))return;const g=c.slice(9),m=(f=(h=Ue.value)==null?void 0:h.consistency_variants)==null?void 0:f.find(y=>y.id===g),v=(m==null?void 0:m.text)??_.label??"";v&&Ts(l.clientX,l.clientY,c,v);return}ot.value.byId.has(c)&&Ts(l.clientX,l.clientY,c)}},o==null||o.addEventListener("contextmenu",Mo);let a=null;n.getCamera().on("updated",()=>{a&&clearTimeout(a),a=setTimeout(()=>{a=null,st()},600)})}function Yy(){vs&&(So&&vs.removeEventListener("mousemove",So),Eo&&vs.removeEventListener("click",Eo),Mo&&vs.removeEventListener("contextmenu",Mo)),vs=null,So=null,Eo=null,Mo=null}let ke=null,ct=null,bs=null;const Zg=_i(()=>Xe.value.snap_endpoints),jd=[],Yd=[],Hl=new Map,Vl=new Map,hl=new Map;let hr=null,kr=null,Su=0;const ys=[],io={selectedIds:new Set,emphasizedIds:new Set,hoverNodeId:null};function Jg(n){wy(n)}function fr(){return ke}function Qg(){return ct}function Us(){return bs}function e_(n){if(ke)return;bs=n,n.addEventListener("mousedown",Yg,{capture:!0}),window.addEventListener("mousemove",qg),window.addEventListener("mouseup",Kg),ct=new Bd({multi:!0,allowSelfLoops:!1});const e=zy(io,Vl,tS);ke=new Bx(ct,n,{edgeProgramClasses:{curved:ay},defaultDrawNodeHover:Gy,nodeReducer:e,zIndex:!0,renderEdgeLabels:!1,allowInvalidContainer:!0,defaultNodeColor:"#40a0ff",labelFont:"ui-monospace, SFMono-Regular, Consolas, monospace",labelSize:11,labelColor:{color:"#9aaabb"},labelRenderedSizeThreshold:12,minCameraRatio:.04,maxCameraRatio:20,stagePadding:50}),Ty(ke,ct,io),ys.push(Yt(()=>{const t=ot.value,i=Ue.value,r=vi.value,s=Zg.value;!ke||!ct||(by(ct,t,i,jd,Yd,r,s,Hl),hl.clear(),ct.forEachNode(o=>{hl.set(o,{x:ct.getNodeAttribute(o,"x"),y:ct.getNodeAttribute(o,"y")})}),ke.refresh())})),ys.push(Yt(()=>{io.selectedIds=Mt.value,io.emphasizedIds=Om.value,io.hoverNodeId=Ft.value,ke==null||ke.refresh()})),ys.push(Yt(()=>{yr.value==="graph"&&setTimeout(()=>ke==null?void 0:ke.refresh(),0),yr.value==="graph"&&ot.value.points.length>0&&Di.value?nS():r_()})),ys.push(Yt(()=>{Hr.value,ot.value,Ue.value,si.value,Xe.value,yu()})),ke.on("afterRender",yu)}function t_(){for(const n of ys)n();ys.length=0,hr&&(cancelAnimationFrame(hr),hr=null),r_(),ke==null||ke.removeListener("afterRender",yu),Ay(),ke==null||ke.kill(),ke=null,ct=null,jd.length=0,Yd.length=0,Hl.clear(),Vl.clear(),bs==null||bs.removeEventListener("mousedown",Yg,{capture:!0}),window.removeEventListener("mousemove",qg),window.removeEventListener("mouseup",Kg),Xy(),Yy(),bs=null}function qy(){ke==null||ke.refresh()}function Ky(n){ke==null||ke.refresh()}function Eu(){ke==null||ke.resize(),ke==null||ke.refresh()}function Zy(){var e;const n=(e=ke==null?void 0:ke.getCamera())==null?void 0:e.getState();return{x:(n==null?void 0:n.x)??0,y:(n==null?void 0:n.y)??0,ratio:(n==null?void 0:n.ratio)??1}}function Jy(n){if(!ke||!n)return;const e=n.ratio!=null?Number(n.ratio):1;ke.getCamera().setState({x:Number(n.x??0),y:Number(n.y??0),ratio:Math.max(.01,e)})}function n_(){if(!ke||!ct)return;const n=ct.nodes();if(!n.length){ke.getCamera().animate({x:0,y:0,ratio:1,angle:0},{duration:200});return}let e=1/0,t=-1/0,i=1/0,r=-1/0;for(const a of n){const l=ct.getNodeAttribute(a,"x"),c=ct.getNodeAttribute(a,"y");l<e&&(e=l),l>t&&(t=l),c<i&&(i=c),c>r&&(r=c)}const s=(e+t)/2,o=(i+r)/2;ke.getCamera().animate({x:s,y:o,ratio:1,angle:0},{duration:200})}function Qy(){ct&&Hg(ct,Ue.value,jd,Yd,vi.value,Zg.value,Hl)}function i_(n){Wd(n,Vl),iS()}function eS(n){i_(Ld(n))}function tS(n){return Su/900+zo(n)*7e-4}function nS(){if(kr)return;const n=()=>{if(!ke||!ct||yr.value!=="graph"||!Di.value){kr=null,s_();return}Su=performance.now();const e=Su/1e3;hl.forEach(({x:t,y:i},r)=>{if(ct.hasNode(r)){const{dx:s,dy:o}=Vd(zo(r),e);ct.setNodeAttribute(r,"x",t+s),ct.setNodeAttribute(r,"y",i+o)}}),Hl.forEach((t,i)=>{ct.hasNode(i)&&ct.hasNode(t)&&(ct.setNodeAttribute(i,"x",ct.getNodeAttribute(t,"x")),ct.setNodeAttribute(i,"y",ct.getNodeAttribute(t,"y")))}),ke.refresh(),kr=requestAnimationFrame(n)};kr=requestAnimationFrame(n)}function r_(){kr&&(cancelAnimationFrame(kr),kr=null,s_())}function s_(){ct&&(hl.forEach(({x:n,y:e},t)=>{ct.hasNode(t)&&(ct.setNodeAttribute(t,"x",n),ct.setNodeAttribute(t,"y",e))}),ke==null||ke.refresh())}function iS(){if(hr)return;const n=()=>{if(!ke){hr=null;return}ke.refresh(),[...Vl.values()].some(e=>e>Date.now())?hr=requestAnimationFrame(n):hr=null};hr=requestAnimationFrame(n)}const rS=Object.freeze(Object.defineProperty({__proto__:null,addOverlayEdges:Qy,applySigmaViewport:Jy,destroyRenderer:t_,fitCamera:n_,getCameraState:Zy,getSigma:fr,getSigmaContainer:Us,getSigmaGraph:Qg,highlightGhostStep:Ky,initRenderer:e_,pulseIds:i_,pulseOperationResult:eS,resizeRenderer:Eu,setHullCanvas:Jg,sigmaRefresh:qy},Symbol.toStringTag,{value:"Module"}));/**
 * @license
 * Copyright 2010-2026 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const qd="184",Cs={ROTATE:0,DOLLY:1,PAN:2},Ss={ROTATE:0,PAN:1,DOLLY_PAN:2,DOLLY_ROTATE:3},sS=0,Ff=1,oS=2,Ha=1,aS=2,po=3,Er=0,Sn=1,Ui=2,Xi=0,Rs=1,Of=2,kf=3,Bf=4,lS=5,Ur=100,cS=101,uS=102,dS=103,hS=104,fS=200,pS=201,mS=202,gS=203,Mu=204,wu=205,_S=206,vS=207,xS=208,bS=209,yS=210,SS=211,ES=212,MS=213,wS=214,Tu=0,Au=1,Cu=2,Fs=3,Ru=4,Pu=5,Lu=6,Du=7,o_=0,TS=1,AS=2,mi=0,a_=1,l_=2,c_=3,u_=4,d_=5,h_=6,f_=7,p_=300,Xr=301,Os=302,bc=303,yc=304,Wl=306,Nu=1e3,Vi=1001,Iu=1002,rn=1003,CS=1004,oa=1005,cn=1006,Sc=1007,Br=1008,kn=1009,m_=1010,g_=1011,Io=1012,Kd=1013,xi=1014,fi=1015,qi=1016,Zd=1017,Jd=1018,Uo=1020,__=35902,v_=35899,x_=1021,b_=1022,ni=1023,Ki=1026,zr=1027,y_=1028,Qd=1029,jr=1030,eh=1031,th=1033,Va=33776,Wa=33777,$a=33778,Xa=33779,Uu=35840,Fu=35841,Ou=35842,ku=35843,Bu=36196,zu=37492,Gu=37496,Hu=37488,Vu=37489,fl=37490,Wu=37491,$u=37808,Xu=37809,ju=37810,Yu=37811,qu=37812,Ku=37813,Zu=37814,Ju=37815,Qu=37816,ed=37817,td=37818,nd=37819,id=37820,rd=37821,sd=36492,od=36494,ad=36495,ld=36283,cd=36284,pl=36285,ud=36286,RS=3200,zf=0,PS=1,pr="",Un="srgb",ml="srgb-linear",gl="linear",dt="srgb",rs=7680,Gf=519,LS=512,DS=513,NS=514,nh=515,IS=516,US=517,ih=518,FS=519,Hf=35044,Fi=35048,Vf="300 es",pi=2e3,_l=2001;function OS(n){for(let e=n.length-1;e>=0;--e)if(n[e]>=65535)return!0;return!1}function vl(n){return document.createElementNS("http://www.w3.org/1999/xhtml",n)}function kS(){const n=vl("canvas");return n.style.display="block",n}const Wf={};function $f(...n){const e="THREE."+n.shift();console.log(e,...n)}function S_(n){const e=n[0];if(typeof e=="string"&&e.startsWith("TSL:")){const t=n[1];t&&t.isStackTrace?n[0]+=" "+t.getLocation():n[1]='Stack trace not available. Enable "THREE.Node.captureStackTrace" to capture stack traces.'}return n}function Le(...n){n=S_(n);const e="THREE."+n.shift();{const t=n[0];t&&t.isStackTrace?console.warn(t.getError(e)):console.warn(e,...n)}}function Qe(...n){n=S_(n);const e="THREE."+n.shift();{const t=n[0];t&&t.isStackTrace?console.error(t.getError(e)):console.error(e,...n)}}function dd(...n){const e=n.join(" ");e in Wf||(Wf[e]=!0,Le(...n))}function BS(n,e,t){return new Promise(function(i,r){function s(){switch(n.clientWaitSync(e,n.SYNC_FLUSH_COMMANDS_BIT,0)){case n.WAIT_FAILED:r();break;case n.TIMEOUT_EXPIRED:setTimeout(s,t);break;default:i()}}setTimeout(s,t)})}const zS={[Tu]:Au,[Cu]:Lu,[Ru]:Du,[Fs]:Pu,[Au]:Tu,[Lu]:Cu,[Du]:Ru,[Pu]:Fs};class Tr{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});const i=this._listeners;i[e]===void 0&&(i[e]=[]),i[e].indexOf(t)===-1&&i[e].push(t)}hasEventListener(e,t){const i=this._listeners;return i===void 0?!1:i[e]!==void 0&&i[e].indexOf(t)!==-1}removeEventListener(e,t){const i=this._listeners;if(i===void 0)return;const r=i[e];if(r!==void 0){const s=r.indexOf(t);s!==-1&&r.splice(s,1)}}dispatchEvent(e){const t=this._listeners;if(t===void 0)return;const i=t[e.type];if(i!==void 0){e.target=this;const r=i.slice(0);for(let s=0,o=r.length;s<o;s++)r[s].call(this,e);e.target=null}}}const an=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],ja=Math.PI/180,hd=180/Math.PI;function Go(){const n=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,i=Math.random()*4294967295|0;return(an[n&255]+an[n>>8&255]+an[n>>16&255]+an[n>>24&255]+"-"+an[e&255]+an[e>>8&255]+"-"+an[e>>16&15|64]+an[e>>24&255]+"-"+an[t&63|128]+an[t>>8&255]+"-"+an[t>>16&255]+an[t>>24&255]+an[i&255]+an[i>>8&255]+an[i>>16&255]+an[i>>24&255]).toLowerCase()}function Ke(n,e,t){return Math.max(e,Math.min(t,n))}function GS(n,e){return(n%e+e)%e}function Ec(n,e,t){return(1-t)*n+t*e}function ro(n,e){switch(e.constructor){case Float32Array:return n;case Uint32Array:return n/4294967295;case Uint16Array:return n/65535;case Uint8Array:return n/255;case Int32Array:return Math.max(n/2147483647,-1);case Int16Array:return Math.max(n/32767,-1);case Int8Array:return Math.max(n/127,-1);default:throw new Error("Invalid component type.")}}function _n(n,e){switch(e.constructor){case Float32Array:return n;case Uint32Array:return Math.round(n*4294967295);case Uint16Array:return Math.round(n*65535);case Uint8Array:return Math.round(n*255);case Int32Array:return Math.round(n*2147483647);case Int16Array:return Math.round(n*32767);case Int8Array:return Math.round(n*127);default:throw new Error("Invalid component type.")}}const HS={DEG2RAD:ja},Mh=class Mh{constructor(e=0,t=0){this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){const t=this.x,i=this.y,r=e.elements;return this.x=r[0]*t+r[3]*i+r[6],this.y=r[1]*t+r[4]*i+r[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=Ke(this.x,e.x,t.x),this.y=Ke(this.y,e.y,t.y),this}clampScalar(e,t){return this.x=Ke(this.x,e,t),this.y=Ke(this.y,e,t),this}clampLength(e,t){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Ke(i,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const i=this.dot(e)/t;return Math.acos(Ke(i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,i=this.y-e.y;return t*t+i*i}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){const i=Math.cos(t),r=Math.sin(t),s=this.x-e.x,o=this.y-e.y;return this.x=s*i-o*r+e.x,this.y=s*r+o*i+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}};Mh.prototype.isVector2=!0;let We=Mh;class Mr{constructor(e=0,t=0,i=0,r=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=i,this._w=r}static slerpFlat(e,t,i,r,s,o,a){let l=i[r+0],c=i[r+1],u=i[r+2],d=i[r+3],h=s[o+0],f=s[o+1],p=s[o+2],_=s[o+3];if(d!==_||l!==h||c!==f||u!==p){let g=l*h+c*f+u*p+d*_;g<0&&(h=-h,f=-f,p=-p,_=-_,g=-g);let m=1-a;if(g<.9995){const v=Math.acos(g),y=Math.sin(v);m=Math.sin(m*v)/y,a=Math.sin(a*v)/y,l=l*m+h*a,c=c*m+f*a,u=u*m+p*a,d=d*m+_*a}else{l=l*m+h*a,c=c*m+f*a,u=u*m+p*a,d=d*m+_*a;const v=1/Math.sqrt(l*l+c*c+u*u+d*d);l*=v,c*=v,u*=v,d*=v}}e[t]=l,e[t+1]=c,e[t+2]=u,e[t+3]=d}static multiplyQuaternionsFlat(e,t,i,r,s,o){const a=i[r],l=i[r+1],c=i[r+2],u=i[r+3],d=s[o],h=s[o+1],f=s[o+2],p=s[o+3];return e[t]=a*p+u*d+l*f-c*h,e[t+1]=l*p+u*h+c*d-a*f,e[t+2]=c*p+u*f+a*h-l*d,e[t+3]=u*p-a*d-l*h-c*f,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,i,r){return this._x=e,this._y=t,this._z=i,this._w=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){const i=e._x,r=e._y,s=e._z,o=e._order,a=Math.cos,l=Math.sin,c=a(i/2),u=a(r/2),d=a(s/2),h=l(i/2),f=l(r/2),p=l(s/2);switch(o){case"XYZ":this._x=h*u*d+c*f*p,this._y=c*f*d-h*u*p,this._z=c*u*p+h*f*d,this._w=c*u*d-h*f*p;break;case"YXZ":this._x=h*u*d+c*f*p,this._y=c*f*d-h*u*p,this._z=c*u*p-h*f*d,this._w=c*u*d+h*f*p;break;case"ZXY":this._x=h*u*d-c*f*p,this._y=c*f*d+h*u*p,this._z=c*u*p+h*f*d,this._w=c*u*d-h*f*p;break;case"ZYX":this._x=h*u*d-c*f*p,this._y=c*f*d+h*u*p,this._z=c*u*p-h*f*d,this._w=c*u*d+h*f*p;break;case"YZX":this._x=h*u*d+c*f*p,this._y=c*f*d+h*u*p,this._z=c*u*p-h*f*d,this._w=c*u*d-h*f*p;break;case"XZY":this._x=h*u*d-c*f*p,this._y=c*f*d-h*u*p,this._z=c*u*p+h*f*d,this._w=c*u*d+h*f*p;break;default:Le("Quaternion: .setFromEuler() encountered an unknown order: "+o)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){const i=t/2,r=Math.sin(i);return this._x=e.x*r,this._y=e.y*r,this._z=e.z*r,this._w=Math.cos(i),this._onChangeCallback(),this}setFromRotationMatrix(e){const t=e.elements,i=t[0],r=t[4],s=t[8],o=t[1],a=t[5],l=t[9],c=t[2],u=t[6],d=t[10],h=i+a+d;if(h>0){const f=.5/Math.sqrt(h+1);this._w=.25/f,this._x=(u-l)*f,this._y=(s-c)*f,this._z=(o-r)*f}else if(i>a&&i>d){const f=2*Math.sqrt(1+i-a-d);this._w=(u-l)/f,this._x=.25*f,this._y=(r+o)/f,this._z=(s+c)/f}else if(a>d){const f=2*Math.sqrt(1+a-i-d);this._w=(s-c)/f,this._x=(r+o)/f,this._y=.25*f,this._z=(l+u)/f}else{const f=2*Math.sqrt(1+d-i-a);this._w=(o-r)/f,this._x=(s+c)/f,this._y=(l+u)/f,this._z=.25*f}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let i=e.dot(t)+1;return i<1e-8?(i=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=i):(this._x=0,this._y=-e.z,this._z=e.y,this._w=i)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=i),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(Ke(this.dot(e),-1,1)))}rotateTowards(e,t){const i=this.angleTo(e);if(i===0)return this;const r=Math.min(1,t/i);return this.slerp(e,r),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){const i=e._x,r=e._y,s=e._z,o=e._w,a=t._x,l=t._y,c=t._z,u=t._w;return this._x=i*u+o*a+r*c-s*l,this._y=r*u+o*l+s*a-i*c,this._z=s*u+o*c+i*l-r*a,this._w=o*u-i*a-r*l-s*c,this._onChangeCallback(),this}slerp(e,t){let i=e._x,r=e._y,s=e._z,o=e._w,a=this.dot(e);a<0&&(i=-i,r=-r,s=-s,o=-o,a=-a);let l=1-t;if(a<.9995){const c=Math.acos(a),u=Math.sin(c);l=Math.sin(l*c)/u,t=Math.sin(t*c)/u,this._x=this._x*l+i*t,this._y=this._y*l+r*t,this._z=this._z*l+s*t,this._w=this._w*l+o*t,this._onChangeCallback()}else this._x=this._x*l+i*t,this._y=this._y*l+r*t,this._z=this._z*l+s*t,this._w=this._w*l+o*t,this.normalize();return this}slerpQuaternions(e,t,i){return this.copy(e).slerp(t,i)}random(){const e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),i=Math.random(),r=Math.sqrt(1-i),s=Math.sqrt(i);return this.set(r*Math.sin(e),r*Math.cos(e),s*Math.sin(t),s*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}const wh=class wh{constructor(e=0,t=0,i=0){this.x=e,this.y=t,this.z=i}set(e,t,i){return i===void 0&&(i=this.z),this.x=e,this.y=t,this.z=i,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(Xf.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(Xf.setFromAxisAngle(e,t))}applyMatrix3(e){const t=this.x,i=this.y,r=this.z,s=e.elements;return this.x=s[0]*t+s[3]*i+s[6]*r,this.y=s[1]*t+s[4]*i+s[7]*r,this.z=s[2]*t+s[5]*i+s[8]*r,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){const t=this.x,i=this.y,r=this.z,s=e.elements,o=1/(s[3]*t+s[7]*i+s[11]*r+s[15]);return this.x=(s[0]*t+s[4]*i+s[8]*r+s[12])*o,this.y=(s[1]*t+s[5]*i+s[9]*r+s[13])*o,this.z=(s[2]*t+s[6]*i+s[10]*r+s[14])*o,this}applyQuaternion(e){const t=this.x,i=this.y,r=this.z,s=e.x,o=e.y,a=e.z,l=e.w,c=2*(o*r-a*i),u=2*(a*t-s*r),d=2*(s*i-o*t);return this.x=t+l*c+o*d-a*u,this.y=i+l*u+a*c-s*d,this.z=r+l*d+s*u-o*c,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){const t=this.x,i=this.y,r=this.z,s=e.elements;return this.x=s[0]*t+s[4]*i+s[8]*r,this.y=s[1]*t+s[5]*i+s[9]*r,this.z=s[2]*t+s[6]*i+s[10]*r,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=Ke(this.x,e.x,t.x),this.y=Ke(this.y,e.y,t.y),this.z=Ke(this.z,e.z,t.z),this}clampScalar(e,t){return this.x=Ke(this.x,e,t),this.y=Ke(this.y,e,t),this.z=Ke(this.z,e,t),this}clampLength(e,t){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Ke(i,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this.z=e.z+(t.z-e.z)*i,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){const i=e.x,r=e.y,s=e.z,o=t.x,a=t.y,l=t.z;return this.x=r*l-s*a,this.y=s*o-i*l,this.z=i*a-r*o,this}projectOnVector(e){const t=e.lengthSq();if(t===0)return this.set(0,0,0);const i=e.dot(this)/t;return this.copy(e).multiplyScalar(i)}projectOnPlane(e){return Mc.copy(this).projectOnVector(e),this.sub(Mc)}reflect(e){return this.sub(Mc.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const i=this.dot(e)/t;return Math.acos(Ke(i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,i=this.y-e.y,r=this.z-e.z;return t*t+i*i+r*r}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,i){const r=Math.sin(t)*e;return this.x=r*Math.sin(i),this.y=Math.cos(t)*e,this.z=r*Math.cos(i),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,i){return this.x=e*Math.sin(t),this.y=i,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){const t=this.setFromMatrixColumn(e,0).length(),i=this.setFromMatrixColumn(e,1).length(),r=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=i,this.z=r,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const e=Math.random()*Math.PI*2,t=Math.random()*2-1,i=Math.sqrt(1-t*t);return this.x=i*Math.cos(e),this.y=t,this.z=i*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}};wh.prototype.isVector3=!0;let N=wh;const Mc=new N,Xf=new Mr,Th=class Th{constructor(e,t,i,r,s,o,a,l,c){this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,i,r,s,o,a,l,c)}set(e,t,i,r,s,o,a,l,c){const u=this.elements;return u[0]=e,u[1]=r,u[2]=a,u[3]=t,u[4]=s,u[5]=l,u[6]=i,u[7]=o,u[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){const t=this.elements,i=e.elements;return t[0]=i[0],t[1]=i[1],t[2]=i[2],t[3]=i[3],t[4]=i[4],t[5]=i[5],t[6]=i[6],t[7]=i[7],t[8]=i[8],this}extractBasis(e,t,i){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),i.setFromMatrix3Column(this,2),this}setFromMatrix4(e){const t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const i=e.elements,r=t.elements,s=this.elements,o=i[0],a=i[3],l=i[6],c=i[1],u=i[4],d=i[7],h=i[2],f=i[5],p=i[8],_=r[0],g=r[3],m=r[6],v=r[1],y=r[4],x=r[7],M=r[2],E=r[5],C=r[8];return s[0]=o*_+a*v+l*M,s[3]=o*g+a*y+l*E,s[6]=o*m+a*x+l*C,s[1]=c*_+u*v+d*M,s[4]=c*g+u*y+d*E,s[7]=c*m+u*x+d*C,s[2]=h*_+f*v+p*M,s[5]=h*g+f*y+p*E,s[8]=h*m+f*x+p*C,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){const e=this.elements,t=e[0],i=e[1],r=e[2],s=e[3],o=e[4],a=e[5],l=e[6],c=e[7],u=e[8];return t*o*u-t*a*c-i*s*u+i*a*l+r*s*c-r*o*l}invert(){const e=this.elements,t=e[0],i=e[1],r=e[2],s=e[3],o=e[4],a=e[5],l=e[6],c=e[7],u=e[8],d=u*o-a*c,h=a*l-u*s,f=c*s-o*l,p=t*d+i*h+r*f;if(p===0)return this.set(0,0,0,0,0,0,0,0,0);const _=1/p;return e[0]=d*_,e[1]=(r*c-u*i)*_,e[2]=(a*i-r*o)*_,e[3]=h*_,e[4]=(u*t-r*l)*_,e[5]=(r*s-a*t)*_,e[6]=f*_,e[7]=(i*l-c*t)*_,e[8]=(o*t-i*s)*_,this}transpose(){let e;const t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){const t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,i,r,s,o,a){const l=Math.cos(s),c=Math.sin(s);return this.set(i*l,i*c,-i*(l*o+c*a)+o+e,-r*c,r*l,-r*(-c*o+l*a)+a+t,0,0,1),this}scale(e,t){return this.premultiply(wc.makeScale(e,t)),this}rotate(e){return this.premultiply(wc.makeRotation(-e)),this}translate(e,t){return this.premultiply(wc.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){const t=Math.cos(e),i=Math.sin(e);return this.set(t,-i,0,i,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){const t=this.elements,i=e.elements;for(let r=0;r<9;r++)if(t[r]!==i[r])return!1;return!0}fromArray(e,t=0){for(let i=0;i<9;i++)this.elements[i]=e[i+t];return this}toArray(e=[],t=0){const i=this.elements;return e[t]=i[0],e[t+1]=i[1],e[t+2]=i[2],e[t+3]=i[3],e[t+4]=i[4],e[t+5]=i[5],e[t+6]=i[6],e[t+7]=i[7],e[t+8]=i[8],e}clone(){return new this.constructor().fromArray(this.elements)}};Th.prototype.isMatrix3=!0;let ze=Th;const wc=new ze,jf=new ze().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),Yf=new ze().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function VS(){const n={enabled:!0,workingColorSpace:ml,spaces:{},convert:function(r,s,o){return this.enabled===!1||s===o||!s||!o||(this.spaces[s].transfer===dt&&(r.r=ji(r.r),r.g=ji(r.g),r.b=ji(r.b)),this.spaces[s].primaries!==this.spaces[o].primaries&&(r.applyMatrix3(this.spaces[s].toXYZ),r.applyMatrix3(this.spaces[o].fromXYZ)),this.spaces[o].transfer===dt&&(r.r=Ps(r.r),r.g=Ps(r.g),r.b=Ps(r.b))),r},workingToColorSpace:function(r,s){return this.convert(r,this.workingColorSpace,s)},colorSpaceToWorking:function(r,s){return this.convert(r,s,this.workingColorSpace)},getPrimaries:function(r){return this.spaces[r].primaries},getTransfer:function(r){return r===pr?gl:this.spaces[r].transfer},getToneMappingMode:function(r){return this.spaces[r].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(r,s=this.workingColorSpace){return r.fromArray(this.spaces[s].luminanceCoefficients)},define:function(r){Object.assign(this.spaces,r)},_getMatrix:function(r,s,o){return r.copy(this.spaces[s].toXYZ).multiply(this.spaces[o].fromXYZ)},_getDrawingBufferColorSpace:function(r){return this.spaces[r].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(r=this.workingColorSpace){return this.spaces[r].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(r,s){return dd("ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),n.workingToColorSpace(r,s)},toWorkingColorSpace:function(r,s){return dd("ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),n.colorSpaceToWorking(r,s)}},e=[.64,.33,.3,.6,.15,.06],t=[.2126,.7152,.0722],i=[.3127,.329];return n.define({[ml]:{primaries:e,whitePoint:i,transfer:gl,toXYZ:jf,fromXYZ:Yf,luminanceCoefficients:t,workingColorSpaceConfig:{unpackColorSpace:Un},outputColorSpaceConfig:{drawingBufferColorSpace:Un}},[Un]:{primaries:e,whitePoint:i,transfer:dt,toXYZ:jf,fromXYZ:Yf,luminanceCoefficients:t,outputColorSpaceConfig:{drawingBufferColorSpace:Un}}}),n}const Je=VS();function ji(n){return n<.04045?n*.0773993808:Math.pow(n*.9478672986+.0521327014,2.4)}function Ps(n){return n<.0031308?n*12.92:1.055*Math.pow(n,.41666)-.055}let ss;class WS{static getDataURL(e,t="image/png"){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let i;if(e instanceof HTMLCanvasElement)i=e;else{ss===void 0&&(ss=vl("canvas")),ss.width=e.width,ss.height=e.height;const r=ss.getContext("2d");e instanceof ImageData?r.putImageData(e,0,0):r.drawImage(e,0,0,e.width,e.height),i=ss}return i.toDataURL(t)}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){const t=vl("canvas");t.width=e.width,t.height=e.height;const i=t.getContext("2d");i.drawImage(e,0,0,e.width,e.height);const r=i.getImageData(0,0,e.width,e.height),s=r.data;for(let o=0;o<s.length;o++)s[o]=ji(s[o]/255)*255;return i.putImageData(r,0,0),t}else if(e.data){const t=e.data.slice(0);for(let i=0;i<t.length;i++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[i]=Math.floor(ji(t[i]/255)*255):t[i]=ji(t[i]);return{data:t,width:e.width,height:e.height}}else return Le("ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}}let $S=0;class rh{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:$S++}),this.uuid=Go(),this.data=e,this.dataReady=!0,this.version=0}getSize(e){const t=this.data;return typeof HTMLVideoElement<"u"&&t instanceof HTMLVideoElement?e.set(t.videoWidth,t.videoHeight,0):typeof VideoFrame<"u"&&t instanceof VideoFrame?e.set(t.displayWidth,t.displayHeight,0):t!==null?e.set(t.width,t.height,t.depth||0):e.set(0,0,0),e}set needsUpdate(e){e===!0&&this.version++}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];const i={uuid:this.uuid,url:""},r=this.data;if(r!==null){let s;if(Array.isArray(r)){s=[];for(let o=0,a=r.length;o<a;o++)r[o].isDataTexture?s.push(Tc(r[o].image)):s.push(Tc(r[o]))}else s=Tc(r);i.url=s}return t||(e.images[this.uuid]=i),i}}function Tc(n){return typeof HTMLImageElement<"u"&&n instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&n instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&n instanceof ImageBitmap?WS.getDataURL(n):n.data?{data:Array.from(n.data),width:n.width,height:n.height,type:n.data.constructor.name}:(Le("Texture: Unable to serialize Texture."),{})}let XS=0;const Ac=new N;class un extends Tr{constructor(e=un.DEFAULT_IMAGE,t=un.DEFAULT_MAPPING,i=Vi,r=Vi,s=cn,o=Br,a=ni,l=kn,c=un.DEFAULT_ANISOTROPY,u=pr){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:XS++}),this.uuid=Go(),this.name="",this.source=new rh(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=i,this.wrapT=r,this.magFilter=s,this.minFilter=o,this.anisotropy=c,this.format=a,this.internalFormat=null,this.type=l,this.offset=new We(0,0),this.repeat=new We(1,1),this.center=new We(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new ze,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=u,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(e&&e.depth&&e.depth>1),this.pmremVersion=0,this.normalized=!1}get width(){return this.source.getSize(Ac).x}get height(){return this.source.getSize(Ac).y}get depth(){return this.source.getSize(Ac).z}get image(){return this.source.data}set image(e){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.normalized=e.normalized,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.renderTarget=e.renderTarget,this.isRenderTargetTexture=e.isRenderTargetTexture,this.isArrayTexture=e.isArrayTexture,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}setValues(e){for(const t in e){const i=e[t];if(i===void 0){Le(`Texture.setValues(): parameter '${t}' has value of undefined.`);continue}const r=this[t];if(r===void 0){Le(`Texture.setValues(): property '${t}' does not exist.`);continue}r&&i&&r.isVector2&&i.isVector2||r&&i&&r.isVector3&&i.isVector3||r&&i&&r.isMatrix3&&i.isMatrix3?r.copy(i):this[t]=i}}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];const i={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,normalized:this.normalized,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(i.userData=this.userData),t||(e.textures[this.uuid]=i),i}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==p_)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case Nu:e.x=e.x-Math.floor(e.x);break;case Vi:e.x=e.x<0?0:1;break;case Iu:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case Nu:e.y=e.y-Math.floor(e.y);break;case Vi:e.y=e.y<0?0:1;break;case Iu:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}}un.DEFAULT_IMAGE=null;un.DEFAULT_MAPPING=p_;un.DEFAULT_ANISOTROPY=1;const Ah=class Ah{constructor(e=0,t=0,i=0,r=1){this.x=e,this.y=t,this.z=i,this.w=r}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,i,r){return this.x=e,this.y=t,this.z=i,this.w=r,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){const t=this.x,i=this.y,r=this.z,s=this.w,o=e.elements;return this.x=o[0]*t+o[4]*i+o[8]*r+o[12]*s,this.y=o[1]*t+o[5]*i+o[9]*r+o[13]*s,this.z=o[2]*t+o[6]*i+o[10]*r+o[14]*s,this.w=o[3]*t+o[7]*i+o[11]*r+o[15]*s,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);const t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,i,r,s;const l=e.elements,c=l[0],u=l[4],d=l[8],h=l[1],f=l[5],p=l[9],_=l[2],g=l[6],m=l[10];if(Math.abs(u-h)<.01&&Math.abs(d-_)<.01&&Math.abs(p-g)<.01){if(Math.abs(u+h)<.1&&Math.abs(d+_)<.1&&Math.abs(p+g)<.1&&Math.abs(c+f+m-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;const y=(c+1)/2,x=(f+1)/2,M=(m+1)/2,E=(u+h)/4,C=(d+_)/4,b=(p+g)/4;return y>x&&y>M?y<.01?(i=0,r=.707106781,s=.707106781):(i=Math.sqrt(y),r=E/i,s=C/i):x>M?x<.01?(i=.707106781,r=0,s=.707106781):(r=Math.sqrt(x),i=E/r,s=b/r):M<.01?(i=.707106781,r=.707106781,s=0):(s=Math.sqrt(M),i=C/s,r=b/s),this.set(i,r,s,t),this}let v=Math.sqrt((g-p)*(g-p)+(d-_)*(d-_)+(h-u)*(h-u));return Math.abs(v)<.001&&(v=1),this.x=(g-p)/v,this.y=(d-_)/v,this.z=(h-u)/v,this.w=Math.acos((c+f+m-1)/2),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=Ke(this.x,e.x,t.x),this.y=Ke(this.y,e.y,t.y),this.z=Ke(this.z,e.z,t.z),this.w=Ke(this.w,e.w,t.w),this}clampScalar(e,t){return this.x=Ke(this.x,e,t),this.y=Ke(this.y,e,t),this.z=Ke(this.z,e,t),this.w=Ke(this.w,e,t),this}clampLength(e,t){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Ke(i,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this.z=e.z+(t.z-e.z)*i,this.w=e.w+(t.w-e.w)*i,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}};Ah.prototype.isVector4=!0;let zt=Ah;class jS extends Tr{constructor(e=1,t=1,i={}){super(),i=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:cn,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1},i),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=i.depth,this.scissor=new zt(0,0,e,t),this.scissorTest=!1,this.viewport=new zt(0,0,e,t),this.textures=[];const r={width:e,height:t,depth:i.depth},s=new un(r),o=i.count;for(let a=0;a<o;a++)this.textures[a]=s.clone(),this.textures[a].isRenderTargetTexture=!0,this.textures[a].renderTarget=this;this._setTextureOptions(i),this.depthBuffer=i.depthBuffer,this.stencilBuffer=i.stencilBuffer,this.resolveDepthBuffer=i.resolveDepthBuffer,this.resolveStencilBuffer=i.resolveStencilBuffer,this._depthTexture=null,this.depthTexture=i.depthTexture,this.samples=i.samples,this.multiview=i.multiview}_setTextureOptions(e={}){const t={minFilter:cn,generateMipmaps:!1,flipY:!1,internalFormat:null};e.mapping!==void 0&&(t.mapping=e.mapping),e.wrapS!==void 0&&(t.wrapS=e.wrapS),e.wrapT!==void 0&&(t.wrapT=e.wrapT),e.wrapR!==void 0&&(t.wrapR=e.wrapR),e.magFilter!==void 0&&(t.magFilter=e.magFilter),e.minFilter!==void 0&&(t.minFilter=e.minFilter),e.format!==void 0&&(t.format=e.format),e.type!==void 0&&(t.type=e.type),e.anisotropy!==void 0&&(t.anisotropy=e.anisotropy),e.colorSpace!==void 0&&(t.colorSpace=e.colorSpace),e.flipY!==void 0&&(t.flipY=e.flipY),e.generateMipmaps!==void 0&&(t.generateMipmaps=e.generateMipmaps),e.internalFormat!==void 0&&(t.internalFormat=e.internalFormat);for(let i=0;i<this.textures.length;i++)this.textures[i].setValues(t)}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}set depthTexture(e){this._depthTexture!==null&&(this._depthTexture.renderTarget=null),e!==null&&(e.renderTarget=this),this._depthTexture=e}get depthTexture(){return this._depthTexture}setSize(e,t,i=1){if(this.width!==e||this.height!==t||this.depth!==i){this.width=e,this.height=t,this.depth=i;for(let r=0,s=this.textures.length;r<s;r++)this.textures[r].image.width=e,this.textures[r].image.height=t,this.textures[r].image.depth=i,this.textures[r].isData3DTexture!==!0&&(this.textures[r].isArrayTexture=this.textures[r].image.depth>1);this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let t=0,i=e.textures.length;t<i;t++){this.textures[t]=e.textures[t].clone(),this.textures[t].isRenderTargetTexture=!0,this.textures[t].renderTarget=this;const r=Object.assign({},e.textures[t].image);this.textures[t].source=new rh(r)}return this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this.multiview=e.multiview,this}dispose(){this.dispatchEvent({type:"dispose"})}}class gi extends jS{constructor(e=1,t=1,i={}){super(e,t,i),this.isWebGLRenderTarget=!0}}class E_ extends un{constructor(e=null,t=1,i=1,r=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:i,depth:r},this.magFilter=rn,this.minFilter=rn,this.wrapR=Vi,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}}class YS extends un{constructor(e=null,t=1,i=1,r=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:i,depth:r},this.magFilter=rn,this.minFilter=rn,this.wrapR=Vi,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}const Rl=class Rl{constructor(e,t,i,r,s,o,a,l,c,u,d,h,f,p,_,g){this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,i,r,s,o,a,l,c,u,d,h,f,p,_,g)}set(e,t,i,r,s,o,a,l,c,u,d,h,f,p,_,g){const m=this.elements;return m[0]=e,m[4]=t,m[8]=i,m[12]=r,m[1]=s,m[5]=o,m[9]=a,m[13]=l,m[2]=c,m[6]=u,m[10]=d,m[14]=h,m[3]=f,m[7]=p,m[11]=_,m[15]=g,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new Rl().fromArray(this.elements)}copy(e){const t=this.elements,i=e.elements;return t[0]=i[0],t[1]=i[1],t[2]=i[2],t[3]=i[3],t[4]=i[4],t[5]=i[5],t[6]=i[6],t[7]=i[7],t[8]=i[8],t[9]=i[9],t[10]=i[10],t[11]=i[11],t[12]=i[12],t[13]=i[13],t[14]=i[14],t[15]=i[15],this}copyPosition(e){const t=this.elements,i=e.elements;return t[12]=i[12],t[13]=i[13],t[14]=i[14],this}setFromMatrix3(e){const t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,i){return this.determinant()===0?(e.set(1,0,0),t.set(0,1,0),i.set(0,0,1),this):(e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),i.setFromMatrixColumn(this,2),this)}makeBasis(e,t,i){return this.set(e.x,t.x,i.x,0,e.y,t.y,i.y,0,e.z,t.z,i.z,0,0,0,0,1),this}extractRotation(e){if(e.determinant()===0)return this.identity();const t=this.elements,i=e.elements,r=1/os.setFromMatrixColumn(e,0).length(),s=1/os.setFromMatrixColumn(e,1).length(),o=1/os.setFromMatrixColumn(e,2).length();return t[0]=i[0]*r,t[1]=i[1]*r,t[2]=i[2]*r,t[3]=0,t[4]=i[4]*s,t[5]=i[5]*s,t[6]=i[6]*s,t[7]=0,t[8]=i[8]*o,t[9]=i[9]*o,t[10]=i[10]*o,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){const t=this.elements,i=e.x,r=e.y,s=e.z,o=Math.cos(i),a=Math.sin(i),l=Math.cos(r),c=Math.sin(r),u=Math.cos(s),d=Math.sin(s);if(e.order==="XYZ"){const h=o*u,f=o*d,p=a*u,_=a*d;t[0]=l*u,t[4]=-l*d,t[8]=c,t[1]=f+p*c,t[5]=h-_*c,t[9]=-a*l,t[2]=_-h*c,t[6]=p+f*c,t[10]=o*l}else if(e.order==="YXZ"){const h=l*u,f=l*d,p=c*u,_=c*d;t[0]=h+_*a,t[4]=p*a-f,t[8]=o*c,t[1]=o*d,t[5]=o*u,t[9]=-a,t[2]=f*a-p,t[6]=_+h*a,t[10]=o*l}else if(e.order==="ZXY"){const h=l*u,f=l*d,p=c*u,_=c*d;t[0]=h-_*a,t[4]=-o*d,t[8]=p+f*a,t[1]=f+p*a,t[5]=o*u,t[9]=_-h*a,t[2]=-o*c,t[6]=a,t[10]=o*l}else if(e.order==="ZYX"){const h=o*u,f=o*d,p=a*u,_=a*d;t[0]=l*u,t[4]=p*c-f,t[8]=h*c+_,t[1]=l*d,t[5]=_*c+h,t[9]=f*c-p,t[2]=-c,t[6]=a*l,t[10]=o*l}else if(e.order==="YZX"){const h=o*l,f=o*c,p=a*l,_=a*c;t[0]=l*u,t[4]=_-h*d,t[8]=p*d+f,t[1]=d,t[5]=o*u,t[9]=-a*u,t[2]=-c*u,t[6]=f*d+p,t[10]=h-_*d}else if(e.order==="XZY"){const h=o*l,f=o*c,p=a*l,_=a*c;t[0]=l*u,t[4]=-d,t[8]=c*u,t[1]=h*d+_,t[5]=o*u,t[9]=f*d-p,t[2]=p*d-f,t[6]=a*u,t[10]=_*d+h}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(qS,e,KS)}lookAt(e,t,i){const r=this.elements;return Tn.subVectors(e,t),Tn.lengthSq()===0&&(Tn.z=1),Tn.normalize(),sr.crossVectors(i,Tn),sr.lengthSq()===0&&(Math.abs(i.z)===1?Tn.x+=1e-4:Tn.z+=1e-4,Tn.normalize(),sr.crossVectors(i,Tn)),sr.normalize(),aa.crossVectors(Tn,sr),r[0]=sr.x,r[4]=aa.x,r[8]=Tn.x,r[1]=sr.y,r[5]=aa.y,r[9]=Tn.y,r[2]=sr.z,r[6]=aa.z,r[10]=Tn.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const i=e.elements,r=t.elements,s=this.elements,o=i[0],a=i[4],l=i[8],c=i[12],u=i[1],d=i[5],h=i[9],f=i[13],p=i[2],_=i[6],g=i[10],m=i[14],v=i[3],y=i[7],x=i[11],M=i[15],E=r[0],C=r[4],b=r[8],A=r[12],L=r[1],P=r[5],F=r[9],$=r[13],W=r[2],I=r[6],B=r[10],H=r[14],Z=r[3],J=r[7],ne=r[11],de=r[15];return s[0]=o*E+a*L+l*W+c*Z,s[4]=o*C+a*P+l*I+c*J,s[8]=o*b+a*F+l*B+c*ne,s[12]=o*A+a*$+l*H+c*de,s[1]=u*E+d*L+h*W+f*Z,s[5]=u*C+d*P+h*I+f*J,s[9]=u*b+d*F+h*B+f*ne,s[13]=u*A+d*$+h*H+f*de,s[2]=p*E+_*L+g*W+m*Z,s[6]=p*C+_*P+g*I+m*J,s[10]=p*b+_*F+g*B+m*ne,s[14]=p*A+_*$+g*H+m*de,s[3]=v*E+y*L+x*W+M*Z,s[7]=v*C+y*P+x*I+M*J,s[11]=v*b+y*F+x*B+M*ne,s[15]=v*A+y*$+x*H+M*de,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){const e=this.elements,t=e[0],i=e[4],r=e[8],s=e[12],o=e[1],a=e[5],l=e[9],c=e[13],u=e[2],d=e[6],h=e[10],f=e[14],p=e[3],_=e[7],g=e[11],m=e[15],v=l*f-c*h,y=a*f-c*d,x=a*h-l*d,M=o*f-c*u,E=o*h-l*u,C=o*d-a*u;return t*(_*v-g*y+m*x)-i*(p*v-g*M+m*E)+r*(p*y-_*M+m*C)-s*(p*x-_*E+g*C)}transpose(){const e=this.elements;let t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,i){const r=this.elements;return e.isVector3?(r[12]=e.x,r[13]=e.y,r[14]=e.z):(r[12]=e,r[13]=t,r[14]=i),this}invert(){const e=this.elements,t=e[0],i=e[1],r=e[2],s=e[3],o=e[4],a=e[5],l=e[6],c=e[7],u=e[8],d=e[9],h=e[10],f=e[11],p=e[12],_=e[13],g=e[14],m=e[15],v=t*a-i*o,y=t*l-r*o,x=t*c-s*o,M=i*l-r*a,E=i*c-s*a,C=r*c-s*l,b=u*_-d*p,A=u*g-h*p,L=u*m-f*p,P=d*g-h*_,F=d*m-f*_,$=h*m-f*g,W=v*$-y*F+x*P+M*L-E*A+C*b;if(W===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const I=1/W;return e[0]=(a*$-l*F+c*P)*I,e[1]=(r*F-i*$-s*P)*I,e[2]=(_*C-g*E+m*M)*I,e[3]=(h*E-d*C-f*M)*I,e[4]=(l*L-o*$-c*A)*I,e[5]=(t*$-r*L+s*A)*I,e[6]=(g*x-p*C-m*y)*I,e[7]=(u*C-h*x+f*y)*I,e[8]=(o*F-a*L+c*b)*I,e[9]=(i*L-t*F-s*b)*I,e[10]=(p*E-_*x+m*v)*I,e[11]=(d*x-u*E-f*v)*I,e[12]=(a*A-o*P-l*b)*I,e[13]=(t*P-i*A+r*b)*I,e[14]=(_*y-p*M-g*v)*I,e[15]=(u*M-d*y+h*v)*I,this}scale(e){const t=this.elements,i=e.x,r=e.y,s=e.z;return t[0]*=i,t[4]*=r,t[8]*=s,t[1]*=i,t[5]*=r,t[9]*=s,t[2]*=i,t[6]*=r,t[10]*=s,t[3]*=i,t[7]*=r,t[11]*=s,this}getMaxScaleOnAxis(){const e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],i=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],r=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,i,r))}makeTranslation(e,t,i){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,i,0,0,0,1),this}makeRotationX(e){const t=Math.cos(e),i=Math.sin(e);return this.set(1,0,0,0,0,t,-i,0,0,i,t,0,0,0,0,1),this}makeRotationY(e){const t=Math.cos(e),i=Math.sin(e);return this.set(t,0,i,0,0,1,0,0,-i,0,t,0,0,0,0,1),this}makeRotationZ(e){const t=Math.cos(e),i=Math.sin(e);return this.set(t,-i,0,0,i,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){const i=Math.cos(t),r=Math.sin(t),s=1-i,o=e.x,a=e.y,l=e.z,c=s*o,u=s*a;return this.set(c*o+i,c*a-r*l,c*l+r*a,0,c*a+r*l,u*a+i,u*l-r*o,0,c*l-r*a,u*l+r*o,s*l*l+i,0,0,0,0,1),this}makeScale(e,t,i){return this.set(e,0,0,0,0,t,0,0,0,0,i,0,0,0,0,1),this}makeShear(e,t,i,r,s,o){return this.set(1,i,s,0,e,1,o,0,t,r,1,0,0,0,0,1),this}compose(e,t,i){const r=this.elements,s=t._x,o=t._y,a=t._z,l=t._w,c=s+s,u=o+o,d=a+a,h=s*c,f=s*u,p=s*d,_=o*u,g=o*d,m=a*d,v=l*c,y=l*u,x=l*d,M=i.x,E=i.y,C=i.z;return r[0]=(1-(_+m))*M,r[1]=(f+x)*M,r[2]=(p-y)*M,r[3]=0,r[4]=(f-x)*E,r[5]=(1-(h+m))*E,r[6]=(g+v)*E,r[7]=0,r[8]=(p+y)*C,r[9]=(g-v)*C,r[10]=(1-(h+_))*C,r[11]=0,r[12]=e.x,r[13]=e.y,r[14]=e.z,r[15]=1,this}decompose(e,t,i){const r=this.elements;e.x=r[12],e.y=r[13],e.z=r[14];const s=this.determinant();if(s===0)return i.set(1,1,1),t.identity(),this;let o=os.set(r[0],r[1],r[2]).length();const a=os.set(r[4],r[5],r[6]).length(),l=os.set(r[8],r[9],r[10]).length();s<0&&(o=-o),jn.copy(this);const c=1/o,u=1/a,d=1/l;return jn.elements[0]*=c,jn.elements[1]*=c,jn.elements[2]*=c,jn.elements[4]*=u,jn.elements[5]*=u,jn.elements[6]*=u,jn.elements[8]*=d,jn.elements[9]*=d,jn.elements[10]*=d,t.setFromRotationMatrix(jn),i.x=o,i.y=a,i.z=l,this}makePerspective(e,t,i,r,s,o,a=pi,l=!1){const c=this.elements,u=2*s/(t-e),d=2*s/(i-r),h=(t+e)/(t-e),f=(i+r)/(i-r);let p,_;if(l)p=s/(o-s),_=o*s/(o-s);else if(a===pi)p=-(o+s)/(o-s),_=-2*o*s/(o-s);else if(a===_l)p=-o/(o-s),_=-o*s/(o-s);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+a);return c[0]=u,c[4]=0,c[8]=h,c[12]=0,c[1]=0,c[5]=d,c[9]=f,c[13]=0,c[2]=0,c[6]=0,c[10]=p,c[14]=_,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(e,t,i,r,s,o,a=pi,l=!1){const c=this.elements,u=2/(t-e),d=2/(i-r),h=-(t+e)/(t-e),f=-(i+r)/(i-r);let p,_;if(l)p=1/(o-s),_=o/(o-s);else if(a===pi)p=-2/(o-s),_=-(o+s)/(o-s);else if(a===_l)p=-1/(o-s),_=-s/(o-s);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+a);return c[0]=u,c[4]=0,c[8]=0,c[12]=h,c[1]=0,c[5]=d,c[9]=0,c[13]=f,c[2]=0,c[6]=0,c[10]=p,c[14]=_,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(e){const t=this.elements,i=e.elements;for(let r=0;r<16;r++)if(t[r]!==i[r])return!1;return!0}fromArray(e,t=0){for(let i=0;i<16;i++)this.elements[i]=e[i+t];return this}toArray(e=[],t=0){const i=this.elements;return e[t]=i[0],e[t+1]=i[1],e[t+2]=i[2],e[t+3]=i[3],e[t+4]=i[4],e[t+5]=i[5],e[t+6]=i[6],e[t+7]=i[7],e[t+8]=i[8],e[t+9]=i[9],e[t+10]=i[10],e[t+11]=i[11],e[t+12]=i[12],e[t+13]=i[13],e[t+14]=i[14],e[t+15]=i[15],e}};Rl.prototype.isMatrix4=!0;let Ct=Rl;const os=new N,jn=new Ct,qS=new N(0,0,0),KS=new N(1,1,1),sr=new N,aa=new N,Tn=new N,qf=new Ct,Kf=new Mr;class Yr{constructor(e=0,t=0,i=0,r=Yr.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=i,this._order=r}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,i,r=this._order){return this._x=e,this._y=t,this._z=i,this._order=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,i=!0){const r=e.elements,s=r[0],o=r[4],a=r[8],l=r[1],c=r[5],u=r[9],d=r[2],h=r[6],f=r[10];switch(t){case"XYZ":this._y=Math.asin(Ke(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(-u,f),this._z=Math.atan2(-o,s)):(this._x=Math.atan2(h,c),this._z=0);break;case"YXZ":this._x=Math.asin(-Ke(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(a,f),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-d,s),this._z=0);break;case"ZXY":this._x=Math.asin(Ke(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(-d,f),this._z=Math.atan2(-o,c)):(this._y=0,this._z=Math.atan2(l,s));break;case"ZYX":this._y=Math.asin(-Ke(d,-1,1)),Math.abs(d)<.9999999?(this._x=Math.atan2(h,f),this._z=Math.atan2(l,s)):(this._x=0,this._z=Math.atan2(-o,c));break;case"YZX":this._z=Math.asin(Ke(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-u,c),this._y=Math.atan2(-d,s)):(this._x=0,this._y=Math.atan2(a,f));break;case"XZY":this._z=Math.asin(-Ke(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(h,c),this._y=Math.atan2(a,s)):(this._x=Math.atan2(-u,f),this._y=0);break;default:Le("Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,i===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,i){return qf.makeRotationFromQuaternion(e),this.setFromRotationMatrix(qf,t,i)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return Kf.setFromEuler(this),this.setFromQuaternion(Kf,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}Yr.DEFAULT_ORDER="XYZ";class sh{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}}let ZS=0;const Zf=new N,as=new Mr,Ei=new Ct,la=new N,so=new N,JS=new N,QS=new Mr,Jf=new N(1,0,0),Qf=new N(0,1,0),ep=new N(0,0,1),tp={type:"added"},eE={type:"removed"},ls={type:"childadded",child:null},Cc={type:"childremoved",child:null};class gn extends Tr{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:ZS++}),this.uuid=Go(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=gn.DEFAULT_UP.clone();const e=new N,t=new Yr,i=new Mr,r=new N(1,1,1);function s(){i.setFromEuler(t,!1)}function o(){t.setFromQuaternion(i,void 0,!1)}t._onChange(s),i._onChange(o),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:i},scale:{configurable:!0,enumerable:!0,value:r},modelViewMatrix:{value:new Ct},normalMatrix:{value:new ze}}),this.matrix=new Ct,this.matrixWorld=new Ct,this.matrixAutoUpdate=gn.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=gn.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new sh,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.static=!1,this.userData={},this.pivot=null}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return as.setFromAxisAngle(e,t),this.quaternion.multiply(as),this}rotateOnWorldAxis(e,t){return as.setFromAxisAngle(e,t),this.quaternion.premultiply(as),this}rotateX(e){return this.rotateOnAxis(Jf,e)}rotateY(e){return this.rotateOnAxis(Qf,e)}rotateZ(e){return this.rotateOnAxis(ep,e)}translateOnAxis(e,t){return Zf.copy(e).applyQuaternion(this.quaternion),this.position.add(Zf.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(Jf,e)}translateY(e){return this.translateOnAxis(Qf,e)}translateZ(e){return this.translateOnAxis(ep,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(Ei.copy(this.matrixWorld).invert())}lookAt(e,t,i){e.isVector3?la.copy(e):la.set(e,t,i);const r=this.parent;this.updateWorldMatrix(!0,!1),so.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Ei.lookAt(so,la,this.up):Ei.lookAt(la,so,this.up),this.quaternion.setFromRotationMatrix(Ei),r&&(Ei.extractRotation(r.matrixWorld),as.setFromRotationMatrix(Ei),this.quaternion.premultiply(as.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(Qe("Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(tp),ls.child=e,this.dispatchEvent(ls),ls.child=null):Qe("Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let i=0;i<arguments.length;i++)this.remove(arguments[i]);return this}const t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(eE),Cc.child=e,this.dispatchEvent(Cc),Cc.child=null),this}removeFromParent(){const e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),Ei.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),Ei.multiply(e.parent.matrixWorld)),e.applyMatrix4(Ei),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(tp),ls.child=e,this.dispatchEvent(ls),ls.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let i=0,r=this.children.length;i<r;i++){const o=this.children[i].getObjectByProperty(e,t);if(o!==void 0)return o}}getObjectsByProperty(e,t,i=[]){this[e]===t&&i.push(this);const r=this.children;for(let s=0,o=r.length;s<o;s++)r[s].getObjectsByProperty(e,t,i);return i}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(so,e,JS),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(so,QS,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}traverse(e){e(this);const t=this.children;for(let i=0,r=t.length;i<r;i++)t[i].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);const t=this.children;for(let i=0,r=t.length;i<r;i++)t[i].traverseVisible(e)}traverseAncestors(e){const t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale);const e=this.pivot;if(e!==null){const t=e.x,i=e.y,r=e.z,s=this.matrix.elements;s[12]+=t-s[0]*t-s[4]*i-s[8]*r,s[13]+=i-s[1]*t-s[5]*i-s[9]*r,s[14]+=r-s[2]*t-s[6]*i-s[10]*r}this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);const t=this.children;for(let i=0,r=t.length;i<r;i++)t[i].updateMatrixWorld(e)}updateWorldMatrix(e,t){const i=this.parent;if(e===!0&&i!==null&&i.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),t===!0){const r=this.children;for(let s=0,o=r.length;s<o;s++)r[s].updateWorldMatrix(!1,!0)}}toJSON(e){const t=e===void 0||typeof e=="string",i={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},i.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});const r={};r.uuid=this.uuid,r.type=this.type,this.name!==""&&(r.name=this.name),this.castShadow===!0&&(r.castShadow=!0),this.receiveShadow===!0&&(r.receiveShadow=!0),this.visible===!1&&(r.visible=!1),this.frustumCulled===!1&&(r.frustumCulled=!1),this.renderOrder!==0&&(r.renderOrder=this.renderOrder),this.static!==!1&&(r.static=this.static),Object.keys(this.userData).length>0&&(r.userData=this.userData),r.layers=this.layers.mask,r.matrix=this.matrix.toArray(),r.up=this.up.toArray(),this.pivot!==null&&(r.pivot=this.pivot.toArray()),this.matrixAutoUpdate===!1&&(r.matrixAutoUpdate=!1),this.morphTargetDictionary!==void 0&&(r.morphTargetDictionary=Object.assign({},this.morphTargetDictionary)),this.morphTargetInfluences!==void 0&&(r.morphTargetInfluences=this.morphTargetInfluences.slice()),this.isInstancedMesh&&(r.type="InstancedMesh",r.count=this.count,r.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(r.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(r.type="BatchedMesh",r.perObjectFrustumCulled=this.perObjectFrustumCulled,r.sortObjects=this.sortObjects,r.drawRanges=this._drawRanges,r.reservedRanges=this._reservedRanges,r.geometryInfo=this._geometryInfo.map(a=>({...a,boundingBox:a.boundingBox?a.boundingBox.toJSON():void 0,boundingSphere:a.boundingSphere?a.boundingSphere.toJSON():void 0})),r.instanceInfo=this._instanceInfo.map(a=>({...a})),r.availableInstanceIds=this._availableInstanceIds.slice(),r.availableGeometryIds=this._availableGeometryIds.slice(),r.nextIndexStart=this._nextIndexStart,r.nextVertexStart=this._nextVertexStart,r.geometryCount=this._geometryCount,r.maxInstanceCount=this._maxInstanceCount,r.maxVertexCount=this._maxVertexCount,r.maxIndexCount=this._maxIndexCount,r.geometryInitialized=this._geometryInitialized,r.matricesTexture=this._matricesTexture.toJSON(e),r.indirectTexture=this._indirectTexture.toJSON(e),this._colorsTexture!==null&&(r.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(r.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(r.boundingBox=this.boundingBox.toJSON()));function s(a,l){return a[l.uuid]===void 0&&(a[l.uuid]=l.toJSON(e)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?r.background=this.background.toJSON():this.background.isTexture&&(r.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(r.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){r.geometry=s(e.geometries,this.geometry);const a=this.geometry.parameters;if(a!==void 0&&a.shapes!==void 0){const l=a.shapes;if(Array.isArray(l))for(let c=0,u=l.length;c<u;c++){const d=l[c];s(e.shapes,d)}else s(e.shapes,l)}}if(this.isSkinnedMesh&&(r.bindMode=this.bindMode,r.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(s(e.skeletons,this.skeleton),r.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const a=[];for(let l=0,c=this.material.length;l<c;l++)a.push(s(e.materials,this.material[l]));r.material=a}else r.material=s(e.materials,this.material);if(this.children.length>0){r.children=[];for(let a=0;a<this.children.length;a++)r.children.push(this.children[a].toJSON(e).object)}if(this.animations.length>0){r.animations=[];for(let a=0;a<this.animations.length;a++){const l=this.animations[a];r.animations.push(s(e.animations,l))}}if(t){const a=o(e.geometries),l=o(e.materials),c=o(e.textures),u=o(e.images),d=o(e.shapes),h=o(e.skeletons),f=o(e.animations),p=o(e.nodes);a.length>0&&(i.geometries=a),l.length>0&&(i.materials=l),c.length>0&&(i.textures=c),u.length>0&&(i.images=u),d.length>0&&(i.shapes=d),h.length>0&&(i.skeletons=h),f.length>0&&(i.animations=f),p.length>0&&(i.nodes=p)}return i.object=r,i;function o(a){const l=[];for(const c in a){const u=a[c];delete u.metadata,l.push(u)}return l}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.pivot=e.pivot!==null?e.pivot.clone():null,this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.static=e.static,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let i=0;i<e.children.length;i++){const r=e.children[i];this.add(r.clone())}return this}}gn.DEFAULT_UP=new N(0,1,0);gn.DEFAULT_MATRIX_AUTO_UPDATE=!0;gn.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;class ca extends gn{constructor(){super(),this.isGroup=!0,this.type="Group"}}const tE={type:"move"};class Rc{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new ca,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new ca,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new N,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new N),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new ca,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new N,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new N,this._grip.eventsEnabled=!1),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){const t=this._hand;if(t)for(const i of e.hand.values())this._getHandJoint(t,i)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,i){let r=null,s=null,o=null;const a=this._targetRay,l=this._grip,c=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(c&&e.hand){o=!0;for(const _ of e.hand.values()){const g=t.getJointPose(_,i),m=this._getHandJoint(c,_);g!==null&&(m.matrix.fromArray(g.transform.matrix),m.matrix.decompose(m.position,m.rotation,m.scale),m.matrixWorldNeedsUpdate=!0,m.jointRadius=g.radius),m.visible=g!==null}const u=c.joints["index-finger-tip"],d=c.joints["thumb-tip"],h=u.position.distanceTo(d.position),f=.02,p=.005;c.inputState.pinching&&h>f+p?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!c.inputState.pinching&&h<=f-p&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else l!==null&&e.gripSpace&&(s=t.getPose(e.gripSpace,i),s!==null&&(l.matrix.fromArray(s.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,s.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(s.linearVelocity)):l.hasLinearVelocity=!1,s.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(s.angularVelocity)):l.hasAngularVelocity=!1,l.eventsEnabled&&l.dispatchEvent({type:"gripUpdated",data:e,target:this})));a!==null&&(r=t.getPose(e.targetRaySpace,i),r===null&&s!==null&&(r=s),r!==null&&(a.matrix.fromArray(r.transform.matrix),a.matrix.decompose(a.position,a.rotation,a.scale),a.matrixWorldNeedsUpdate=!0,r.linearVelocity?(a.hasLinearVelocity=!0,a.linearVelocity.copy(r.linearVelocity)):a.hasLinearVelocity=!1,r.angularVelocity?(a.hasAngularVelocity=!0,a.angularVelocity.copy(r.angularVelocity)):a.hasAngularVelocity=!1,this.dispatchEvent(tE)))}return a!==null&&(a.visible=r!==null),l!==null&&(l.visible=s!==null),c!==null&&(c.visible=o!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){const i=new ca;i.matrixAutoUpdate=!1,i.visible=!1,e.joints[t.jointName]=i,e.add(i)}return e.joints[t.jointName]}}const M_={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},or={h:0,s:0,l:0},ua={h:0,s:0,l:0};function Pc(n,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?n+(e-n)*6*t:t<1/2?e:t<2/3?n+(e-n)*6*(2/3-t):n}class it{constructor(e,t,i){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,i)}set(e,t,i){if(t===void 0&&i===void 0){const r=e;r&&r.isColor?this.copy(r):typeof r=="number"?this.setHex(r):typeof r=="string"&&this.setStyle(r)}else this.setRGB(e,t,i);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=Un){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,Je.colorSpaceToWorking(this,t),this}setRGB(e,t,i,r=Je.workingColorSpace){return this.r=e,this.g=t,this.b=i,Je.colorSpaceToWorking(this,r),this}setHSL(e,t,i,r=Je.workingColorSpace){if(e=GS(e,1),t=Ke(t,0,1),i=Ke(i,0,1),t===0)this.r=this.g=this.b=i;else{const s=i<=.5?i*(1+t):i+t-i*t,o=2*i-s;this.r=Pc(o,s,e+1/3),this.g=Pc(o,s,e),this.b=Pc(o,s,e-1/3)}return Je.colorSpaceToWorking(this,r),this}setStyle(e,t=Un){function i(s){s!==void 0&&parseFloat(s)<1&&Le("Color: Alpha component of "+e+" will be ignored.")}let r;if(r=/^(\w+)\(([^\)]*)\)/.exec(e)){let s;const o=r[1],a=r[2];switch(o){case"rgb":case"rgba":if(s=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return i(s[4]),this.setRGB(Math.min(255,parseInt(s[1],10))/255,Math.min(255,parseInt(s[2],10))/255,Math.min(255,parseInt(s[3],10))/255,t);if(s=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return i(s[4]),this.setRGB(Math.min(100,parseInt(s[1],10))/100,Math.min(100,parseInt(s[2],10))/100,Math.min(100,parseInt(s[3],10))/100,t);break;case"hsl":case"hsla":if(s=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return i(s[4]),this.setHSL(parseFloat(s[1])/360,parseFloat(s[2])/100,parseFloat(s[3])/100,t);break;default:Le("Color: Unknown color model "+e)}}else if(r=/^\#([A-Fa-f\d]+)$/.exec(e)){const s=r[1],o=s.length;if(o===3)return this.setRGB(parseInt(s.charAt(0),16)/15,parseInt(s.charAt(1),16)/15,parseInt(s.charAt(2),16)/15,t);if(o===6)return this.setHex(parseInt(s,16),t);Le("Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=Un){const i=M_[e.toLowerCase()];return i!==void 0?this.setHex(i,t):Le("Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=ji(e.r),this.g=ji(e.g),this.b=ji(e.b),this}copyLinearToSRGB(e){return this.r=Ps(e.r),this.g=Ps(e.g),this.b=Ps(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=Un){return Je.workingToColorSpace(ln.copy(this),e),Math.round(Ke(ln.r*255,0,255))*65536+Math.round(Ke(ln.g*255,0,255))*256+Math.round(Ke(ln.b*255,0,255))}getHexString(e=Un){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=Je.workingColorSpace){Je.workingToColorSpace(ln.copy(this),t);const i=ln.r,r=ln.g,s=ln.b,o=Math.max(i,r,s),a=Math.min(i,r,s);let l,c;const u=(a+o)/2;if(a===o)l=0,c=0;else{const d=o-a;switch(c=u<=.5?d/(o+a):d/(2-o-a),o){case i:l=(r-s)/d+(r<s?6:0);break;case r:l=(s-i)/d+2;break;case s:l=(i-r)/d+4;break}l/=6}return e.h=l,e.s=c,e.l=u,e}getRGB(e,t=Je.workingColorSpace){return Je.workingToColorSpace(ln.copy(this),t),e.r=ln.r,e.g=ln.g,e.b=ln.b,e}getStyle(e=Un){Je.workingToColorSpace(ln.copy(this),e);const t=ln.r,i=ln.g,r=ln.b;return e!==Un?`color(${e} ${t.toFixed(3)} ${i.toFixed(3)} ${r.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(i*255)},${Math.round(r*255)})`}offsetHSL(e,t,i){return this.getHSL(or),this.setHSL(or.h+e,or.s+t,or.l+i)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,i){return this.r=e.r+(t.r-e.r)*i,this.g=e.g+(t.g-e.g)*i,this.b=e.b+(t.b-e.b)*i,this}lerpHSL(e,t){this.getHSL(or),e.getHSL(ua);const i=Ec(or.h,ua.h,t),r=Ec(or.s,ua.s,t),s=Ec(or.l,ua.l,t);return this.setHSL(i,r,s),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){const t=this.r,i=this.g,r=this.b,s=e.elements;return this.r=s[0]*t+s[3]*i+s[6]*r,this.g=s[1]*t+s[4]*i+s[7]*r,this.b=s[2]*t+s[5]*i+s[8]*r,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const ln=new it;it.NAMES=M_;class oh{constructor(e,t=25e-5){this.isFogExp2=!0,this.name="",this.color=new it(e),this.density=t}clone(){return new oh(this.color,this.density)}toJSON(){return{type:"FogExp2",name:this.name,color:this.color.getHex(),density:this.density}}}class nE extends gn{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new Yr,this.environmentIntensity=1,this.environmentRotation=new Yr,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){const t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(t.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(t.object.backgroundIntensity=this.backgroundIntensity),t.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(t.object.environmentIntensity=this.environmentIntensity),t.object.environmentRotation=this.environmentRotation.toArray(),t}}const Yn=new N,Mi=new N,Lc=new N,wi=new N,cs=new N,us=new N,np=new N,Dc=new N,Nc=new N,Ic=new N,Uc=new zt,Fc=new zt,Oc=new zt;class ei{constructor(e=new N,t=new N,i=new N){this.a=e,this.b=t,this.c=i}static getNormal(e,t,i,r){r.subVectors(i,t),Yn.subVectors(e,t),r.cross(Yn);const s=r.lengthSq();return s>0?r.multiplyScalar(1/Math.sqrt(s)):r.set(0,0,0)}static getBarycoord(e,t,i,r,s){Yn.subVectors(r,t),Mi.subVectors(i,t),Lc.subVectors(e,t);const o=Yn.dot(Yn),a=Yn.dot(Mi),l=Yn.dot(Lc),c=Mi.dot(Mi),u=Mi.dot(Lc),d=o*c-a*a;if(d===0)return s.set(0,0,0),null;const h=1/d,f=(c*l-a*u)*h,p=(o*u-a*l)*h;return s.set(1-f-p,p,f)}static containsPoint(e,t,i,r){return this.getBarycoord(e,t,i,r,wi)===null?!1:wi.x>=0&&wi.y>=0&&wi.x+wi.y<=1}static getInterpolation(e,t,i,r,s,o,a,l){return this.getBarycoord(e,t,i,r,wi)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(s,wi.x),l.addScaledVector(o,wi.y),l.addScaledVector(a,wi.z),l)}static getInterpolatedAttribute(e,t,i,r,s,o){return Uc.setScalar(0),Fc.setScalar(0),Oc.setScalar(0),Uc.fromBufferAttribute(e,t),Fc.fromBufferAttribute(e,i),Oc.fromBufferAttribute(e,r),o.setScalar(0),o.addScaledVector(Uc,s.x),o.addScaledVector(Fc,s.y),o.addScaledVector(Oc,s.z),o}static isFrontFacing(e,t,i,r){return Yn.subVectors(i,t),Mi.subVectors(e,t),Yn.cross(Mi).dot(r)<0}set(e,t,i){return this.a.copy(e),this.b.copy(t),this.c.copy(i),this}setFromPointsAndIndices(e,t,i,r){return this.a.copy(e[t]),this.b.copy(e[i]),this.c.copy(e[r]),this}setFromAttributeAndIndices(e,t,i,r){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,i),this.c.fromBufferAttribute(e,r),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return Yn.subVectors(this.c,this.b),Mi.subVectors(this.a,this.b),Yn.cross(Mi).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return ei.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return ei.getBarycoord(e,this.a,this.b,this.c,t)}getInterpolation(e,t,i,r,s){return ei.getInterpolation(e,this.a,this.b,this.c,t,i,r,s)}containsPoint(e){return ei.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return ei.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){const i=this.a,r=this.b,s=this.c;let o,a;cs.subVectors(r,i),us.subVectors(s,i),Dc.subVectors(e,i);const l=cs.dot(Dc),c=us.dot(Dc);if(l<=0&&c<=0)return t.copy(i);Nc.subVectors(e,r);const u=cs.dot(Nc),d=us.dot(Nc);if(u>=0&&d<=u)return t.copy(r);const h=l*d-u*c;if(h<=0&&l>=0&&u<=0)return o=l/(l-u),t.copy(i).addScaledVector(cs,o);Ic.subVectors(e,s);const f=cs.dot(Ic),p=us.dot(Ic);if(p>=0&&f<=p)return t.copy(s);const _=f*c-l*p;if(_<=0&&c>=0&&p<=0)return a=c/(c-p),t.copy(i).addScaledVector(us,a);const g=u*p-f*d;if(g<=0&&d-u>=0&&f-p>=0)return np.subVectors(s,r),a=(d-u)/(d-u+(f-p)),t.copy(r).addScaledVector(np,a);const m=1/(g+_+h);return o=_*m,a=h*m,t.copy(i).addScaledVector(cs,o).addScaledVector(us,a)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}}class Ho{constructor(e=new N(1/0,1/0,1/0),t=new N(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,i=e.length;t<i;t+=3)this.expandByPoint(qn.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,i=e.count;t<i;t++)this.expandByPoint(qn.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,i=e.length;t<i;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){const i=qn.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(i),this.max.copy(e).add(i),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);const i=e.geometry;if(i!==void 0){const s=i.getAttribute("position");if(t===!0&&s!==void 0&&e.isInstancedMesh!==!0)for(let o=0,a=s.count;o<a;o++)e.isMesh===!0?e.getVertexPosition(o,qn):qn.fromBufferAttribute(s,o),qn.applyMatrix4(e.matrixWorld),this.expandByPoint(qn);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),da.copy(e.boundingBox)):(i.boundingBox===null&&i.computeBoundingBox(),da.copy(i.boundingBox)),da.applyMatrix4(e.matrixWorld),this.union(da)}const r=e.children;for(let s=0,o=r.length;s<o;s++)this.expandByObject(r[s],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,qn),qn.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,i;return e.normal.x>0?(t=e.normal.x*this.min.x,i=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,i=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,i+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,i+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,i+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,i+=e.normal.z*this.min.z),t<=-e.constant&&i>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(oo),ha.subVectors(this.max,oo),ds.subVectors(e.a,oo),hs.subVectors(e.b,oo),fs.subVectors(e.c,oo),ar.subVectors(hs,ds),lr.subVectors(fs,hs),Rr.subVectors(ds,fs);let t=[0,-ar.z,ar.y,0,-lr.z,lr.y,0,-Rr.z,Rr.y,ar.z,0,-ar.x,lr.z,0,-lr.x,Rr.z,0,-Rr.x,-ar.y,ar.x,0,-lr.y,lr.x,0,-Rr.y,Rr.x,0];return!kc(t,ds,hs,fs,ha)||(t=[1,0,0,0,1,0,0,0,1],!kc(t,ds,hs,fs,ha))?!1:(fa.crossVectors(ar,lr),t=[fa.x,fa.y,fa.z],kc(t,ds,hs,fs,ha))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,qn).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(qn).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(Ti[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),Ti[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),Ti[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),Ti[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),Ti[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),Ti[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),Ti[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),Ti[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(Ti),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(e){return this.min.fromArray(e.min),this.max.fromArray(e.max),this}}const Ti=[new N,new N,new N,new N,new N,new N,new N,new N],qn=new N,da=new Ho,ds=new N,hs=new N,fs=new N,ar=new N,lr=new N,Rr=new N,oo=new N,ha=new N,fa=new N,Pr=new N;function kc(n,e,t,i,r){for(let s=0,o=n.length-3;s<=o;s+=3){Pr.fromArray(n,s);const a=r.x*Math.abs(Pr.x)+r.y*Math.abs(Pr.y)+r.z*Math.abs(Pr.z),l=e.dot(Pr),c=t.dot(Pr),u=i.dot(Pr);if(Math.max(-Math.max(l,c,u),Math.min(l,c,u))>a)return!1}return!0}const Gt=new N,pa=new We;let iE=0;class Vn extends Tr{constructor(e,t,i=!1){if(super(),Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:iE++}),this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=i,this.usage=Hf,this.updateRanges=[],this.gpuType=fi,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,i){e*=this.itemSize,i*=t.itemSize;for(let r=0,s=this.itemSize;r<s;r++)this.array[e+r]=t.array[i+r];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,i=this.count;t<i;t++)pa.fromBufferAttribute(this,t),pa.applyMatrix3(e),this.setXY(t,pa.x,pa.y);else if(this.itemSize===3)for(let t=0,i=this.count;t<i;t++)Gt.fromBufferAttribute(this,t),Gt.applyMatrix3(e),this.setXYZ(t,Gt.x,Gt.y,Gt.z);return this}applyMatrix4(e){for(let t=0,i=this.count;t<i;t++)Gt.fromBufferAttribute(this,t),Gt.applyMatrix4(e),this.setXYZ(t,Gt.x,Gt.y,Gt.z);return this}applyNormalMatrix(e){for(let t=0,i=this.count;t<i;t++)Gt.fromBufferAttribute(this,t),Gt.applyNormalMatrix(e),this.setXYZ(t,Gt.x,Gt.y,Gt.z);return this}transformDirection(e){for(let t=0,i=this.count;t<i;t++)Gt.fromBufferAttribute(this,t),Gt.transformDirection(e),this.setXYZ(t,Gt.x,Gt.y,Gt.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let i=this.array[e*this.itemSize+t];return this.normalized&&(i=ro(i,this.array)),i}setComponent(e,t,i){return this.normalized&&(i=_n(i,this.array)),this.array[e*this.itemSize+t]=i,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=ro(t,this.array)),t}setX(e,t){return this.normalized&&(t=_n(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=ro(t,this.array)),t}setY(e,t){return this.normalized&&(t=_n(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=ro(t,this.array)),t}setZ(e,t){return this.normalized&&(t=_n(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=ro(t,this.array)),t}setW(e,t){return this.normalized&&(t=_n(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,i){return e*=this.itemSize,this.normalized&&(t=_n(t,this.array),i=_n(i,this.array)),this.array[e+0]=t,this.array[e+1]=i,this}setXYZ(e,t,i,r){return e*=this.itemSize,this.normalized&&(t=_n(t,this.array),i=_n(i,this.array),r=_n(r,this.array)),this.array[e+0]=t,this.array[e+1]=i,this.array[e+2]=r,this}setXYZW(e,t,i,r,s){return e*=this.itemSize,this.normalized&&(t=_n(t,this.array),i=_n(i,this.array),r=_n(r,this.array),s=_n(s,this.array)),this.array[e+0]=t,this.array[e+1]=i,this.array[e+2]=r,this.array[e+3]=s,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==Hf&&(e.usage=this.usage),e}dispose(){this.dispatchEvent({type:"dispose"})}}class w_ extends Vn{constructor(e,t,i){super(new Uint16Array(e),t,i)}}class T_ extends Vn{constructor(e,t,i){super(new Uint32Array(e),t,i)}}class Et extends Vn{constructor(e,t,i){super(new Float32Array(e),t,i)}}const rE=new Ho,ao=new N,Bc=new N;class Vo{constructor(e=new N,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){const i=this.center;t!==void 0?i.copy(t):rE.setFromPoints(e).getCenter(i);let r=0;for(let s=0,o=e.length;s<o;s++)r=Math.max(r,i.distanceToSquared(e[s]));return this.radius=Math.sqrt(r),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){const t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){const i=this.center.distanceToSquared(e);return t.copy(e),i>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;ao.subVectors(e,this.center);const t=ao.lengthSq();if(t>this.radius*this.radius){const i=Math.sqrt(t),r=(i-this.radius)*.5;this.center.addScaledVector(ao,r/i),this.radius+=r}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(Bc.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(ao.copy(e.center).add(Bc)),this.expandByPoint(ao.copy(e.center).sub(Bc))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(e){return this.radius=e.radius,this.center.fromArray(e.center),this}}let sE=0;const In=new Ct,zc=new gn,ps=new N,An=new Ho,lo=new Ho,Jt=new N;class At extends Tr{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:sE++}),this.uuid=Go(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.indirectOffset=0,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(OS(e)?T_:w_)(e,1):this.index=e,this}setIndirect(e,t=0){return this.indirect=e,this.indirectOffset=t,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,i=0){this.groups.push({start:e,count:t,materialIndex:i})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){const t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);const i=this.attributes.normal;if(i!==void 0){const s=new ze().getNormalMatrix(e);i.applyNormalMatrix(s),i.needsUpdate=!0}const r=this.attributes.tangent;return r!==void 0&&(r.transformDirection(e),r.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(e){return In.makeRotationFromQuaternion(e),this.applyMatrix4(In),this}rotateX(e){return In.makeRotationX(e),this.applyMatrix4(In),this}rotateY(e){return In.makeRotationY(e),this.applyMatrix4(In),this}rotateZ(e){return In.makeRotationZ(e),this.applyMatrix4(In),this}translate(e,t,i){return In.makeTranslation(e,t,i),this.applyMatrix4(In),this}scale(e,t,i){return In.makeScale(e,t,i),this.applyMatrix4(In),this}lookAt(e){return zc.lookAt(e),zc.updateMatrix(),this.applyMatrix4(zc.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(ps).negate(),this.translate(ps.x,ps.y,ps.z),this}setFromPoints(e){const t=this.getAttribute("position");if(t===void 0){const i=[];for(let r=0,s=e.length;r<s;r++){const o=e[r];i.push(o.x,o.y,o.z||0)}this.setAttribute("position",new Et(i,3))}else{const i=Math.min(e.length,t.count);for(let r=0;r<i;r++){const s=e[r];t.setXYZ(r,s.x,s.y,s.z||0)}e.length>t.count&&Le("BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),t.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Ho);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){Qe("BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new N(-1/0,-1/0,-1/0),new N(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let i=0,r=t.length;i<r;i++){const s=t[i];An.setFromBufferAttribute(s),this.morphTargetsRelative?(Jt.addVectors(this.boundingBox.min,An.min),this.boundingBox.expandByPoint(Jt),Jt.addVectors(this.boundingBox.max,An.max),this.boundingBox.expandByPoint(Jt)):(this.boundingBox.expandByPoint(An.min),this.boundingBox.expandByPoint(An.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&Qe('BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Vo);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){Qe("BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new N,1/0);return}if(e){const i=this.boundingSphere.center;if(An.setFromBufferAttribute(e),t)for(let s=0,o=t.length;s<o;s++){const a=t[s];lo.setFromBufferAttribute(a),this.morphTargetsRelative?(Jt.addVectors(An.min,lo.min),An.expandByPoint(Jt),Jt.addVectors(An.max,lo.max),An.expandByPoint(Jt)):(An.expandByPoint(lo.min),An.expandByPoint(lo.max))}An.getCenter(i);let r=0;for(let s=0,o=e.count;s<o;s++)Jt.fromBufferAttribute(e,s),r=Math.max(r,i.distanceToSquared(Jt));if(t)for(let s=0,o=t.length;s<o;s++){const a=t[s],l=this.morphTargetsRelative;for(let c=0,u=a.count;c<u;c++)Jt.fromBufferAttribute(a,c),l&&(ps.fromBufferAttribute(e,c),Jt.add(ps)),r=Math.max(r,i.distanceToSquared(Jt))}this.boundingSphere.radius=Math.sqrt(r),isNaN(this.boundingSphere.radius)&&Qe('BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){Qe("BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const i=t.position,r=t.normal,s=t.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new Vn(new Float32Array(4*i.count),4));const o=this.getAttribute("tangent"),a=[],l=[];for(let b=0;b<i.count;b++)a[b]=new N,l[b]=new N;const c=new N,u=new N,d=new N,h=new We,f=new We,p=new We,_=new N,g=new N;function m(b,A,L){c.fromBufferAttribute(i,b),u.fromBufferAttribute(i,A),d.fromBufferAttribute(i,L),h.fromBufferAttribute(s,b),f.fromBufferAttribute(s,A),p.fromBufferAttribute(s,L),u.sub(c),d.sub(c),f.sub(h),p.sub(h);const P=1/(f.x*p.y-p.x*f.y);isFinite(P)&&(_.copy(u).multiplyScalar(p.y).addScaledVector(d,-f.y).multiplyScalar(P),g.copy(d).multiplyScalar(f.x).addScaledVector(u,-p.x).multiplyScalar(P),a[b].add(_),a[A].add(_),a[L].add(_),l[b].add(g),l[A].add(g),l[L].add(g))}let v=this.groups;v.length===0&&(v=[{start:0,count:e.count}]);for(let b=0,A=v.length;b<A;++b){const L=v[b],P=L.start,F=L.count;for(let $=P,W=P+F;$<W;$+=3)m(e.getX($+0),e.getX($+1),e.getX($+2))}const y=new N,x=new N,M=new N,E=new N;function C(b){M.fromBufferAttribute(r,b),E.copy(M);const A=a[b];y.copy(A),y.sub(M.multiplyScalar(M.dot(A))).normalize(),x.crossVectors(E,A);const P=x.dot(l[b])<0?-1:1;o.setXYZW(b,y.x,y.y,y.z,P)}for(let b=0,A=v.length;b<A;++b){const L=v[b],P=L.start,F=L.count;for(let $=P,W=P+F;$<W;$+=3)C(e.getX($+0)),C(e.getX($+1)),C(e.getX($+2))}}computeVertexNormals(){const e=this.index,t=this.getAttribute("position");if(t!==void 0){let i=this.getAttribute("normal");if(i===void 0)i=new Vn(new Float32Array(t.count*3),3),this.setAttribute("normal",i);else for(let h=0,f=i.count;h<f;h++)i.setXYZ(h,0,0,0);const r=new N,s=new N,o=new N,a=new N,l=new N,c=new N,u=new N,d=new N;if(e)for(let h=0,f=e.count;h<f;h+=3){const p=e.getX(h+0),_=e.getX(h+1),g=e.getX(h+2);r.fromBufferAttribute(t,p),s.fromBufferAttribute(t,_),o.fromBufferAttribute(t,g),u.subVectors(o,s),d.subVectors(r,s),u.cross(d),a.fromBufferAttribute(i,p),l.fromBufferAttribute(i,_),c.fromBufferAttribute(i,g),a.add(u),l.add(u),c.add(u),i.setXYZ(p,a.x,a.y,a.z),i.setXYZ(_,l.x,l.y,l.z),i.setXYZ(g,c.x,c.y,c.z)}else for(let h=0,f=t.count;h<f;h+=3)r.fromBufferAttribute(t,h+0),s.fromBufferAttribute(t,h+1),o.fromBufferAttribute(t,h+2),u.subVectors(o,s),d.subVectors(r,s),u.cross(d),i.setXYZ(h+0,u.x,u.y,u.z),i.setXYZ(h+1,u.x,u.y,u.z),i.setXYZ(h+2,u.x,u.y,u.z);this.normalizeNormals(),i.needsUpdate=!0}}normalizeNormals(){const e=this.attributes.normal;for(let t=0,i=e.count;t<i;t++)Jt.fromBufferAttribute(e,t),Jt.normalize(),e.setXYZ(t,Jt.x,Jt.y,Jt.z)}toNonIndexed(){function e(a,l){const c=a.array,u=a.itemSize,d=a.normalized,h=new c.constructor(l.length*u);let f=0,p=0;for(let _=0,g=l.length;_<g;_++){a.isInterleavedBufferAttribute?f=l[_]*a.data.stride+a.offset:f=l[_]*u;for(let m=0;m<u;m++)h[p++]=c[f++]}return new Vn(h,u,d)}if(this.index===null)return Le("BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const t=new At,i=this.index.array,r=this.attributes;for(const a in r){const l=r[a],c=e(l,i);t.setAttribute(a,c)}const s=this.morphAttributes;for(const a in s){const l=[],c=s[a];for(let u=0,d=c.length;u<d;u++){const h=c[u],f=e(h,i);l.push(f)}t.morphAttributes[a]=l}t.morphTargetsRelative=this.morphTargetsRelative;const o=this.groups;for(let a=0,l=o.length;a<l;a++){const c=o[a];t.addGroup(c.start,c.count,c.materialIndex)}return t}toJSON(){const e={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0){const l=this.parameters;for(const c in l)l[c]!==void 0&&(e[c]=l[c]);return e}e.data={attributes:{}};const t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});const i=this.attributes;for(const l in i){const c=i[l];e.data.attributes[l]=c.toJSON(e.data)}const r={};let s=!1;for(const l in this.morphAttributes){const c=this.morphAttributes[l],u=[];for(let d=0,h=c.length;d<h;d++){const f=c[d];u.push(f.toJSON(e.data))}u.length>0&&(r[l]=u,s=!0)}s&&(e.data.morphAttributes=r,e.data.morphTargetsRelative=this.morphTargetsRelative);const o=this.groups;o.length>0&&(e.data.groups=JSON.parse(JSON.stringify(o)));const a=this.boundingSphere;return a!==null&&(e.data.boundingSphere=a.toJSON()),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const t={};this.name=e.name;const i=e.index;i!==null&&this.setIndex(i.clone());const r=e.attributes;for(const c in r){const u=r[c];this.setAttribute(c,u.clone(t))}const s=e.morphAttributes;for(const c in s){const u=[],d=s[c];for(let h=0,f=d.length;h<f;h++)u.push(d[h].clone(t));this.morphAttributes[c]=u}this.morphTargetsRelative=e.morphTargetsRelative;const o=e.groups;for(let c=0,u=o.length;c<u;c++){const d=o[c];this.addGroup(d.start,d.count,d.materialIndex)}const a=e.boundingBox;a!==null&&(this.boundingBox=a.clone());const l=e.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}let oE=0;class js extends Tr{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:oE++}),this.uuid=Go(),this.name="",this.type="Material",this.blending=Rs,this.side=Er,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=Mu,this.blendDst=wu,this.blendEquation=Ur,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new it(0,0,0),this.blendAlpha=0,this.depthFunc=Fs,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=Gf,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=rs,this.stencilZFail=rs,this.stencilZPass=rs,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(const t in e){const i=e[t];if(i===void 0){Le(`Material: parameter '${t}' has value of undefined.`);continue}const r=this[t];if(r===void 0){Le(`Material: '${t}' is not a property of THREE.${this.type}.`);continue}r&&r.isColor?r.set(i):r&&r.isVector3&&i&&i.isVector3?r.copy(i):this[t]=i}}toJSON(e){const t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});const i={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.color&&this.color.isColor&&(i.color=this.color.getHex()),this.roughness!==void 0&&(i.roughness=this.roughness),this.metalness!==void 0&&(i.metalness=this.metalness),this.sheen!==void 0&&(i.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(i.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(i.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(i.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(i.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(i.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(i.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(i.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(i.shininess=this.shininess),this.clearcoat!==void 0&&(i.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(i.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(i.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(i.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(i.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,i.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(i.sheenColorMap=this.sheenColorMap.toJSON(e).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(i.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(e).uuid),this.dispersion!==void 0&&(i.dispersion=this.dispersion),this.iridescence!==void 0&&(i.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(i.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(i.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(i.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(i.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(i.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(i.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(i.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(i.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(i.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(i.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(i.lightMap=this.lightMap.toJSON(e).uuid,i.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(i.aoMap=this.aoMap.toJSON(e).uuid,i.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(i.bumpMap=this.bumpMap.toJSON(e).uuid,i.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(i.normalMap=this.normalMap.toJSON(e).uuid,i.normalMapType=this.normalMapType,i.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(i.displacementMap=this.displacementMap.toJSON(e).uuid,i.displacementScale=this.displacementScale,i.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(i.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(i.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(i.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(i.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(i.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(i.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(i.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(i.combine=this.combine)),this.envMapRotation!==void 0&&(i.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(i.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(i.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(i.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(i.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(i.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(i.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(i.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(i.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(i.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(i.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(i.size=this.size),this.shadowSide!==null&&(i.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(i.sizeAttenuation=this.sizeAttenuation),this.blending!==Rs&&(i.blending=this.blending),this.side!==Er&&(i.side=this.side),this.vertexColors===!0&&(i.vertexColors=!0),this.opacity<1&&(i.opacity=this.opacity),this.transparent===!0&&(i.transparent=!0),this.blendSrc!==Mu&&(i.blendSrc=this.blendSrc),this.blendDst!==wu&&(i.blendDst=this.blendDst),this.blendEquation!==Ur&&(i.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(i.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(i.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(i.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(i.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(i.blendAlpha=this.blendAlpha),this.depthFunc!==Fs&&(i.depthFunc=this.depthFunc),this.depthTest===!1&&(i.depthTest=this.depthTest),this.depthWrite===!1&&(i.depthWrite=this.depthWrite),this.colorWrite===!1&&(i.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(i.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==Gf&&(i.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(i.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(i.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==rs&&(i.stencilFail=this.stencilFail),this.stencilZFail!==rs&&(i.stencilZFail=this.stencilZFail),this.stencilZPass!==rs&&(i.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(i.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(i.rotation=this.rotation),this.polygonOffset===!0&&(i.polygonOffset=!0),this.polygonOffsetFactor!==0&&(i.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(i.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(i.linewidth=this.linewidth),this.dashSize!==void 0&&(i.dashSize=this.dashSize),this.gapSize!==void 0&&(i.gapSize=this.gapSize),this.scale!==void 0&&(i.scale=this.scale),this.dithering===!0&&(i.dithering=!0),this.alphaTest>0&&(i.alphaTest=this.alphaTest),this.alphaHash===!0&&(i.alphaHash=!0),this.alphaToCoverage===!0&&(i.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(i.premultipliedAlpha=!0),this.forceSinglePass===!0&&(i.forceSinglePass=!0),this.allowOverride===!1&&(i.allowOverride=!1),this.wireframe===!0&&(i.wireframe=!0),this.wireframeLinewidth>1&&(i.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(i.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(i.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(i.flatShading=!0),this.visible===!1&&(i.visible=!1),this.toneMapped===!1&&(i.toneMapped=!1),this.fog===!1&&(i.fog=!1),Object.keys(this.userData).length>0&&(i.userData=this.userData);function r(s){const o=[];for(const a in s){const l=s[a];delete l.metadata,o.push(l)}return o}if(t){const s=r(e.textures),o=r(e.images);s.length>0&&(i.textures=s),o.length>0&&(i.images=o)}return i}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;const t=e.clippingPlanes;let i=null;if(t!==null){const r=t.length;i=new Array(r);for(let s=0;s!==r;++s)i[s]=t[s].clone()}return this.clippingPlanes=i,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.allowOverride=e.allowOverride,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}}const Ai=new N,Gc=new N,ma=new N,cr=new N,Hc=new N,ga=new N,Vc=new N;class Wo{constructor(e=new N,t=new N(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,Ai)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);const i=t.dot(this.direction);return i<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,i)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){const t=Ai.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(Ai.copy(this.origin).addScaledVector(this.direction,t),Ai.distanceToSquared(e))}distanceSqToSegment(e,t,i,r){Gc.copy(e).add(t).multiplyScalar(.5),ma.copy(t).sub(e).normalize(),cr.copy(this.origin).sub(Gc);const s=e.distanceTo(t)*.5,o=-this.direction.dot(ma),a=cr.dot(this.direction),l=-cr.dot(ma),c=cr.lengthSq(),u=Math.abs(1-o*o);let d,h,f,p;if(u>0)if(d=o*l-a,h=o*a-l,p=s*u,d>=0)if(h>=-p)if(h<=p){const _=1/u;d*=_,h*=_,f=d*(d+o*h+2*a)+h*(o*d+h+2*l)+c}else h=s,d=Math.max(0,-(o*h+a)),f=-d*d+h*(h+2*l)+c;else h=-s,d=Math.max(0,-(o*h+a)),f=-d*d+h*(h+2*l)+c;else h<=-p?(d=Math.max(0,-(-o*s+a)),h=d>0?-s:Math.min(Math.max(-s,-l),s),f=-d*d+h*(h+2*l)+c):h<=p?(d=0,h=Math.min(Math.max(-s,-l),s),f=h*(h+2*l)+c):(d=Math.max(0,-(o*s+a)),h=d>0?s:Math.min(Math.max(-s,-l),s),f=-d*d+h*(h+2*l)+c);else h=o>0?-s:s,d=Math.max(0,-(o*h+a)),f=-d*d+h*(h+2*l)+c;return i&&i.copy(this.origin).addScaledVector(this.direction,d),r&&r.copy(Gc).addScaledVector(ma,h),f}intersectSphere(e,t){Ai.subVectors(e.center,this.origin);const i=Ai.dot(this.direction),r=Ai.dot(Ai)-i*i,s=e.radius*e.radius;if(r>s)return null;const o=Math.sqrt(s-r),a=i-o,l=i+o;return l<0?null:a<0?this.at(l,t):this.at(a,t)}intersectsSphere(e){return e.radius<0?!1:this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){const t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;const i=-(this.origin.dot(e.normal)+e.constant)/t;return i>=0?i:null}intersectPlane(e,t){const i=this.distanceToPlane(e);return i===null?null:this.at(i,t)}intersectsPlane(e){const t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let i,r,s,o,a,l;const c=1/this.direction.x,u=1/this.direction.y,d=1/this.direction.z,h=this.origin;return c>=0?(i=(e.min.x-h.x)*c,r=(e.max.x-h.x)*c):(i=(e.max.x-h.x)*c,r=(e.min.x-h.x)*c),u>=0?(s=(e.min.y-h.y)*u,o=(e.max.y-h.y)*u):(s=(e.max.y-h.y)*u,o=(e.min.y-h.y)*u),i>o||s>r||((s>i||isNaN(i))&&(i=s),(o<r||isNaN(r))&&(r=o),d>=0?(a=(e.min.z-h.z)*d,l=(e.max.z-h.z)*d):(a=(e.max.z-h.z)*d,l=(e.min.z-h.z)*d),i>l||a>r)||((a>i||i!==i)&&(i=a),(l<r||r!==r)&&(r=l),r<0)?null:this.at(i>=0?i:r,t)}intersectsBox(e){return this.intersectBox(e,Ai)!==null}intersectTriangle(e,t,i,r,s){Hc.subVectors(t,e),ga.subVectors(i,e),Vc.crossVectors(Hc,ga);let o=this.direction.dot(Vc),a;if(o>0){if(r)return null;a=1}else if(o<0)a=-1,o=-o;else return null;cr.subVectors(this.origin,e);const l=a*this.direction.dot(ga.crossVectors(cr,ga));if(l<0)return null;const c=a*this.direction.dot(Hc.cross(cr));if(c<0||l+c>o)return null;const u=-a*cr.dot(Vc);return u<0?null:this.at(u/o,s)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class ah extends js{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new it(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Yr,this.combine=o_,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}const ip=new Ct,Lr=new Wo,_a=new Vo,rp=new N,va=new N,xa=new N,ba=new N,Wc=new N,ya=new N,sp=new N,Sa=new N;class bi extends gn{constructor(e=new At,t=new ah){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){const t=this.geometry.morphAttributes,i=Object.keys(t);if(i.length>0){const r=t[i[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,o=r.length;s<o;s++){const a=r[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=s}}}}getVertexPosition(e,t){const i=this.geometry,r=i.attributes.position,s=i.morphAttributes.position,o=i.morphTargetsRelative;t.fromBufferAttribute(r,e);const a=this.morphTargetInfluences;if(s&&a){ya.set(0,0,0);for(let l=0,c=s.length;l<c;l++){const u=a[l],d=s[l];u!==0&&(Wc.fromBufferAttribute(d,e),o?ya.addScaledVector(Wc,u):ya.addScaledVector(Wc.sub(t),u))}t.add(ya)}return t}raycast(e,t){const i=this.geometry,r=this.material,s=this.matrixWorld;r!==void 0&&(i.boundingSphere===null&&i.computeBoundingSphere(),_a.copy(i.boundingSphere),_a.applyMatrix4(s),Lr.copy(e.ray).recast(e.near),!(_a.containsPoint(Lr.origin)===!1&&(Lr.intersectSphere(_a,rp)===null||Lr.origin.distanceToSquared(rp)>(e.far-e.near)**2))&&(ip.copy(s).invert(),Lr.copy(e.ray).applyMatrix4(ip),!(i.boundingBox!==null&&Lr.intersectsBox(i.boundingBox)===!1)&&this._computeIntersections(e,t,Lr)))}_computeIntersections(e,t,i){let r;const s=this.geometry,o=this.material,a=s.index,l=s.attributes.position,c=s.attributes.uv,u=s.attributes.uv1,d=s.attributes.normal,h=s.groups,f=s.drawRange;if(a!==null)if(Array.isArray(o))for(let p=0,_=h.length;p<_;p++){const g=h[p],m=o[g.materialIndex],v=Math.max(g.start,f.start),y=Math.min(a.count,Math.min(g.start+g.count,f.start+f.count));for(let x=v,M=y;x<M;x+=3){const E=a.getX(x),C=a.getX(x+1),b=a.getX(x+2);r=Ea(this,m,e,i,c,u,d,E,C,b),r&&(r.faceIndex=Math.floor(x/3),r.face.materialIndex=g.materialIndex,t.push(r))}}else{const p=Math.max(0,f.start),_=Math.min(a.count,f.start+f.count);for(let g=p,m=_;g<m;g+=3){const v=a.getX(g),y=a.getX(g+1),x=a.getX(g+2);r=Ea(this,o,e,i,c,u,d,v,y,x),r&&(r.faceIndex=Math.floor(g/3),t.push(r))}}else if(l!==void 0)if(Array.isArray(o))for(let p=0,_=h.length;p<_;p++){const g=h[p],m=o[g.materialIndex],v=Math.max(g.start,f.start),y=Math.min(l.count,Math.min(g.start+g.count,f.start+f.count));for(let x=v,M=y;x<M;x+=3){const E=x,C=x+1,b=x+2;r=Ea(this,m,e,i,c,u,d,E,C,b),r&&(r.faceIndex=Math.floor(x/3),r.face.materialIndex=g.materialIndex,t.push(r))}}else{const p=Math.max(0,f.start),_=Math.min(l.count,f.start+f.count);for(let g=p,m=_;g<m;g+=3){const v=g,y=g+1,x=g+2;r=Ea(this,o,e,i,c,u,d,v,y,x),r&&(r.faceIndex=Math.floor(g/3),t.push(r))}}}}function aE(n,e,t,i,r,s,o,a){let l;if(e.side===Sn?l=i.intersectTriangle(o,s,r,!0,a):l=i.intersectTriangle(r,s,o,e.side===Er,a),l===null)return null;Sa.copy(a),Sa.applyMatrix4(n.matrixWorld);const c=t.ray.origin.distanceTo(Sa);return c<t.near||c>t.far?null:{distance:c,point:Sa.clone(),object:n}}function Ea(n,e,t,i,r,s,o,a,l,c){n.getVertexPosition(a,va),n.getVertexPosition(l,xa),n.getVertexPosition(c,ba);const u=aE(n,e,t,i,va,xa,ba,sp);if(u){const d=new N;ei.getBarycoord(sp,va,xa,ba,d),r&&(u.uv=ei.getInterpolatedAttribute(r,a,l,c,d,new We)),s&&(u.uv1=ei.getInterpolatedAttribute(s,a,l,c,d,new We)),o&&(u.normal=ei.getInterpolatedAttribute(o,a,l,c,d,new N),u.normal.dot(i.direction)>0&&u.normal.multiplyScalar(-1));const h={a,b:l,c,normal:new N,materialIndex:0};ei.getNormal(va,xa,ba,h.normal),u.face=h,u.barycoord=d}return u}class lE extends un{constructor(e=null,t=1,i=1,r,s,o,a,l,c=rn,u=rn,d,h){super(null,o,a,l,c,u,r,s,d,h),this.isDataTexture=!0,this.image={data:e,width:t,height:i},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}const $c=new N,cE=new N,uE=new ze;class Pi{constructor(e=new N(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,i,r){return this.normal.set(e,t,i),this.constant=r,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,i){const r=$c.subVectors(i,t).cross(cE.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(r,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){const e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t,i=!0){const r=e.delta($c),s=this.normal.dot(r);if(s===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;const o=-(e.start.dot(this.normal)+this.constant)/s;return i===!0&&(o<0||o>1)?null:t.copy(e.start).addScaledVector(r,o)}intersectsLine(e){const t=this.distanceToPoint(e.start),i=this.distanceToPoint(e.end);return t<0&&i>0||i<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){const i=t||uE.getNormalMatrix(e),r=this.coplanarPoint($c).applyMatrix4(e),s=this.normal.applyMatrix3(i).normalize();return this.constant=-r.dot(s),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}}const Dr=new Vo,dE=new We(.5,.5),Ma=new N;class A_{constructor(e=new Pi,t=new Pi,i=new Pi,r=new Pi,s=new Pi,o=new Pi){this.planes=[e,t,i,r,s,o]}set(e,t,i,r,s,o){const a=this.planes;return a[0].copy(e),a[1].copy(t),a[2].copy(i),a[3].copy(r),a[4].copy(s),a[5].copy(o),this}copy(e){const t=this.planes;for(let i=0;i<6;i++)t[i].copy(e.planes[i]);return this}setFromProjectionMatrix(e,t=pi,i=!1){const r=this.planes,s=e.elements,o=s[0],a=s[1],l=s[2],c=s[3],u=s[4],d=s[5],h=s[6],f=s[7],p=s[8],_=s[9],g=s[10],m=s[11],v=s[12],y=s[13],x=s[14],M=s[15];if(r[0].setComponents(c-o,f-u,m-p,M-v).normalize(),r[1].setComponents(c+o,f+u,m+p,M+v).normalize(),r[2].setComponents(c+a,f+d,m+_,M+y).normalize(),r[3].setComponents(c-a,f-d,m-_,M-y).normalize(),i)r[4].setComponents(l,h,g,x).normalize(),r[5].setComponents(c-l,f-h,m-g,M-x).normalize();else if(r[4].setComponents(c-l,f-h,m-g,M-x).normalize(),t===pi)r[5].setComponents(c+l,f+h,m+g,M+x).normalize();else if(t===_l)r[5].setComponents(l,h,g,x).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),Dr.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{const t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),Dr.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(Dr)}intersectsSprite(e){Dr.center.set(0,0,0);const t=dE.distanceTo(e.center);return Dr.radius=.7071067811865476+t,Dr.applyMatrix4(e.matrixWorld),this.intersectsSphere(Dr)}intersectsSphere(e){const t=this.planes,i=e.center,r=-e.radius;for(let s=0;s<6;s++)if(t[s].distanceToPoint(i)<r)return!1;return!0}intersectsBox(e){const t=this.planes;for(let i=0;i<6;i++){const r=t[i];if(Ma.x=r.normal.x>0?e.max.x:e.min.x,Ma.y=r.normal.y>0?e.max.y:e.min.y,Ma.z=r.normal.z>0?e.max.z:e.min.z,r.distanceToPoint(Ma)<0)return!1}return!0}containsPoint(e){const t=this.planes;for(let i=0;i<6;i++)if(t[i].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}class Yi extends js{constructor(e){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new it(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.linewidth=e.linewidth,this.linecap=e.linecap,this.linejoin=e.linejoin,this.fog=e.fog,this}}const xl=new N,bl=new N,op=new Ct,co=new Wo,wa=new Vo,Xc=new N,ap=new N;class Vr extends gn{constructor(e=new At,t=new Yi){super(),this.isLine=!0,this.type="Line",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}computeLineDistances(){const e=this.geometry;if(e.index===null){const t=e.attributes.position,i=[0];for(let r=1,s=t.count;r<s;r++)xl.fromBufferAttribute(t,r-1),bl.fromBufferAttribute(t,r),i[r]=i[r-1],i[r]+=xl.distanceTo(bl);e.setAttribute("lineDistance",new Et(i,1))}else Le("Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(e,t){const i=this.geometry,r=this.matrixWorld,s=e.params.Line.threshold,o=i.drawRange;if(i.boundingSphere===null&&i.computeBoundingSphere(),wa.copy(i.boundingSphere),wa.applyMatrix4(r),wa.radius+=s,e.ray.intersectsSphere(wa)===!1)return;op.copy(r).invert(),co.copy(e.ray).applyMatrix4(op);const a=s/((this.scale.x+this.scale.y+this.scale.z)/3),l=a*a,c=this.isLineSegments?2:1,u=i.index,h=i.attributes.position;if(u!==null){const f=Math.max(0,o.start),p=Math.min(u.count,o.start+o.count);for(let _=f,g=p-1;_<g;_+=c){const m=u.getX(_),v=u.getX(_+1),y=Ta(this,e,co,l,m,v,_);y&&t.push(y)}if(this.isLineLoop){const _=u.getX(p-1),g=u.getX(f),m=Ta(this,e,co,l,_,g,p-1);m&&t.push(m)}}else{const f=Math.max(0,o.start),p=Math.min(h.count,o.start+o.count);for(let _=f,g=p-1;_<g;_+=c){const m=Ta(this,e,co,l,_,_+1,_);m&&t.push(m)}if(this.isLineLoop){const _=Ta(this,e,co,l,p-1,f,p-1);_&&t.push(_)}}}updateMorphTargets(){const t=this.geometry.morphAttributes,i=Object.keys(t);if(i.length>0){const r=t[i[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,o=r.length;s<o;s++){const a=r[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=s}}}}}function Ta(n,e,t,i,r,s,o){const a=n.geometry.attributes.position;if(xl.fromBufferAttribute(a,r),bl.fromBufferAttribute(a,s),t.distanceSqToSegment(xl,bl,Xc,ap)>i)return;Xc.applyMatrix4(n.matrixWorld);const c=e.ray.origin.distanceTo(Xc);if(!(c<e.near||c>e.far))return{distance:c,point:ap.clone().applyMatrix4(n.matrixWorld),index:o,face:null,faceIndex:null,barycoord:null,object:n}}const lp=new N,cp=new N;class C_ extends Vr{constructor(e,t){super(e,t),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){const e=this.geometry;if(e.index===null){const t=e.attributes.position,i=[];for(let r=0,s=t.count;r<s;r+=2)lp.fromBufferAttribute(t,r),cp.fromBufferAttribute(t,r+1),i[r]=r===0?0:i[r-1],i[r+1]=i[r]+lp.distanceTo(cp);e.setAttribute("lineDistance",new Et(i,1))}else Le("LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}}class yl extends js{constructor(e){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new it(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.size=e.size,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}}const up=new Ct,fd=new Wo,Aa=new Vo,Ca=new N;class pd extends gn{constructor(e=new At,t=new yl){super(),this.isPoints=!0,this.type="Points",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}raycast(e,t){const i=this.geometry,r=this.matrixWorld,s=e.params.Points.threshold,o=i.drawRange;if(i.boundingSphere===null&&i.computeBoundingSphere(),Aa.copy(i.boundingSphere),Aa.applyMatrix4(r),Aa.radius+=s,e.ray.intersectsSphere(Aa)===!1)return;up.copy(r).invert(),fd.copy(e.ray).applyMatrix4(up);const a=s/((this.scale.x+this.scale.y+this.scale.z)/3),l=a*a,c=i.index,d=i.attributes.position;if(c!==null){const h=Math.max(0,o.start),f=Math.min(c.count,o.start+o.count);for(let p=h,_=f;p<_;p++){const g=c.getX(p);Ca.fromBufferAttribute(d,g),dp(Ca,g,l,r,e,t,this)}}else{const h=Math.max(0,o.start),f=Math.min(d.count,o.start+o.count);for(let p=h,_=f;p<_;p++)Ca.fromBufferAttribute(d,p),dp(Ca,p,l,r,e,t,this)}}updateMorphTargets(){const t=this.geometry.morphAttributes,i=Object.keys(t);if(i.length>0){const r=t[i[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,o=r.length;s<o;s++){const a=r[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=s}}}}}function dp(n,e,t,i,r,s,o){const a=fd.distanceSqToPoint(n);if(a<t){const l=new N;fd.closestPointToPoint(n,l),l.applyMatrix4(i);const c=r.ray.origin.distanceTo(l);if(c<r.near||c>r.far)return;s.push({distance:c,distanceToRay:Math.sqrt(a),point:l,index:e,face:null,faceIndex:null,barycoord:null,object:o})}}class R_ extends un{constructor(e=[],t=Xr,i,r,s,o,a,l,c,u){super(e,t,i,r,s,o,a,l,c,u),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}}class lh extends un{constructor(e,t,i,r,s,o,a,l,c){super(e,t,i,r,s,o,a,l,c),this.isCanvasTexture=!0,this.needsUpdate=!0}}class ks extends un{constructor(e,t,i=xi,r,s,o,a=rn,l=rn,c,u=Ki,d=1){if(u!==Ki&&u!==zr)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");const h={width:e,height:t,depth:d};super(h,r,s,o,a,l,u,i,c),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.source=new rh(Object.assign({},e.image)),this.compareFunction=e.compareFunction,this}toJSON(e){const t=super.toJSON(e);return this.compareFunction!==null&&(t.compareFunction=this.compareFunction),t}}class hE extends ks{constructor(e,t=xi,i=Xr,r,s,o=rn,a=rn,l,c=Ki){const u={width:e,height:e,depth:1},d=[u,u,u,u,u,u];super(e,e,t,i,r,s,o,a,l,c),this.image=d,this.isCubeDepthTexture=!0,this.isCubeTexture=!0}get images(){return this.image}set images(e){this.image=e}}class P_ extends un{constructor(e=null){super(),this.sourceTexture=e,this.isExternalTexture=!0}copy(e){return super.copy(e),this.sourceTexture=e.sourceTexture,this}}class $o extends At{constructor(e=1,t=1,i=1,r=1,s=1,o=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:i,widthSegments:r,heightSegments:s,depthSegments:o};const a=this;r=Math.floor(r),s=Math.floor(s),o=Math.floor(o);const l=[],c=[],u=[],d=[];let h=0,f=0;p("z","y","x",-1,-1,i,t,e,o,s,0),p("z","y","x",1,-1,i,t,-e,o,s,1),p("x","z","y",1,1,e,i,t,r,o,2),p("x","z","y",1,-1,e,i,-t,r,o,3),p("x","y","z",1,-1,e,t,i,r,s,4),p("x","y","z",-1,-1,e,t,-i,r,s,5),this.setIndex(l),this.setAttribute("position",new Et(c,3)),this.setAttribute("normal",new Et(u,3)),this.setAttribute("uv",new Et(d,2));function p(_,g,m,v,y,x,M,E,C,b,A){const L=x/C,P=M/b,F=x/2,$=M/2,W=E/2,I=C+1,B=b+1;let H=0,Z=0;const J=new N;for(let ne=0;ne<B;ne++){const de=ne*P-$;for(let ye=0;ye<I;ye++){const Fe=ye*L-F;J[_]=Fe*v,J[g]=de*y,J[m]=W,c.push(J.x,J.y,J.z),J[_]=0,J[g]=0,J[m]=E>0?1:-1,u.push(J.x,J.y,J.z),d.push(ye/C),d.push(1-ne/b),H+=1}}for(let ne=0;ne<b;ne++)for(let de=0;de<C;de++){const ye=h+de+I*ne,Fe=h+de+I*(ne+1),tt=h+(de+1)+I*(ne+1),Ie=h+(de+1)+I*ne;l.push(ye,Fe,Ie),l.push(Fe,tt,Ie),Z+=6}a.addGroup(f,Z,A),f+=Z,h+=H}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new $o(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}}class fE{constructor(){this.type="Curve",this.arcLengthDivisions=200,this.needsUpdate=!1,this.cacheArcLengths=null}getPoint(){Le("Curve: .getPoint() not implemented.")}getPointAt(e,t){const i=this.getUtoTmapping(e);return this.getPoint(i,t)}getPoints(e=5){const t=[];for(let i=0;i<=e;i++)t.push(this.getPoint(i/e));return t}getSpacedPoints(e=5){const t=[];for(let i=0;i<=e;i++)t.push(this.getPointAt(i/e));return t}getLength(){const e=this.getLengths();return e[e.length-1]}getLengths(e=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===e+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;const t=[];let i,r=this.getPoint(0),s=0;t.push(0);for(let o=1;o<=e;o++)i=this.getPoint(o/e),s+=i.distanceTo(r),t.push(s),r=i;return this.cacheArcLengths=t,t}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(e,t=null){const i=this.getLengths();let r=0;const s=i.length;let o;t?o=t:o=e*i[s-1];let a=0,l=s-1,c;for(;a<=l;)if(r=Math.floor(a+(l-a)/2),c=i[r]-o,c<0)a=r+1;else if(c>0)l=r-1;else{l=r;break}if(r=l,i[r]===o)return r/(s-1);const u=i[r],h=i[r+1]-u,f=(o-u)/h;return(r+f)/(s-1)}getTangent(e,t){let r=e-1e-4,s=e+1e-4;r<0&&(r=0),s>1&&(s=1);const o=this.getPoint(r),a=this.getPoint(s),l=t||(o.isVector2?new We:new N);return l.copy(a).sub(o).normalize(),l}getTangentAt(e,t){const i=this.getUtoTmapping(e);return this.getTangent(i,t)}computeFrenetFrames(e,t=!1){const i=new N,r=[],s=[],o=[],a=new N,l=new Ct;for(let f=0;f<=e;f++){const p=f/e;r[f]=this.getTangentAt(p,new N)}s[0]=new N,o[0]=new N;let c=Number.MAX_VALUE;const u=Math.abs(r[0].x),d=Math.abs(r[0].y),h=Math.abs(r[0].z);u<=c&&(c=u,i.set(1,0,0)),d<=c&&(c=d,i.set(0,1,0)),h<=c&&i.set(0,0,1),a.crossVectors(r[0],i).normalize(),s[0].crossVectors(r[0],a),o[0].crossVectors(r[0],s[0]);for(let f=1;f<=e;f++){if(s[f]=s[f-1].clone(),o[f]=o[f-1].clone(),a.crossVectors(r[f-1],r[f]),a.length()>Number.EPSILON){a.normalize();const p=Math.acos(Ke(r[f-1].dot(r[f]),-1,1));s[f].applyMatrix4(l.makeRotationAxis(a,p))}o[f].crossVectors(r[f],s[f])}if(t===!0){let f=Math.acos(Ke(s[0].dot(s[e]),-1,1));f/=e,r[0].dot(a.crossVectors(s[0],s[e]))>0&&(f=-f);for(let p=1;p<=e;p++)s[p].applyMatrix4(l.makeRotationAxis(r[p],f*p)),o[p].crossVectors(r[p],s[p])}return{tangents:r,normals:s,binormals:o}}clone(){return new this.constructor().copy(this)}copy(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}toJSON(){const e={metadata:{version:4.7,type:"Curve",generator:"Curve.toJSON"}};return e.arcLengthDivisions=this.arcLengthDivisions,e.type=this.type,e}fromJSON(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}}function ch(){let n=0,e=0,t=0,i=0;function r(s,o,a,l){n=s,e=a,t=-3*s+3*o-2*a-l,i=2*s-2*o+a+l}return{initCatmullRom:function(s,o,a,l,c){r(o,a,c*(a-s),c*(l-o))},initNonuniformCatmullRom:function(s,o,a,l,c,u,d){let h=(o-s)/c-(a-s)/(c+u)+(a-o)/u,f=(a-o)/u-(l-o)/(u+d)+(l-a)/d;h*=u,f*=u,r(o,a,h,f)},calc:function(s){const o=s*s,a=o*s;return n+e*s+t*o+i*a}}}const hp=new N,fp=new N,jc=new ch,Yc=new ch,qc=new ch;class L_ extends fE{constructor(e=[],t=!1,i="centripetal",r=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=e,this.closed=t,this.curveType=i,this.tension=r}getPoint(e,t=new N){const i=t,r=this.points,s=r.length,o=(s-(this.closed?0:1))*e;let a=Math.floor(o),l=o-a;this.closed?a+=a>0?0:(Math.floor(Math.abs(a)/s)+1)*s:l===0&&a===s-1&&(a=s-2,l=1);let c,u;this.closed||a>0?c=r[(a-1)%s]:(fp.subVectors(r[0],r[1]).add(r[0]),c=fp);const d=r[a%s],h=r[(a+1)%s];if(this.closed||a+2<s?u=r[(a+2)%s]:(hp.subVectors(r[s-1],r[s-2]).add(r[s-1]),u=hp),this.curveType==="centripetal"||this.curveType==="chordal"){const f=this.curveType==="chordal"?.5:.25;let p=Math.pow(c.distanceToSquared(d),f),_=Math.pow(d.distanceToSquared(h),f),g=Math.pow(h.distanceToSquared(u),f);_<1e-4&&(_=1),p<1e-4&&(p=_),g<1e-4&&(g=_),jc.initNonuniformCatmullRom(c.x,d.x,h.x,u.x,p,_,g),Yc.initNonuniformCatmullRom(c.y,d.y,h.y,u.y,p,_,g),qc.initNonuniformCatmullRom(c.z,d.z,h.z,u.z,p,_,g)}else this.curveType==="catmullrom"&&(jc.initCatmullRom(c.x,d.x,h.x,u.x,this.tension),Yc.initCatmullRom(c.y,d.y,h.y,u.y,this.tension),qc.initCatmullRom(c.z,d.z,h.z,u.z,this.tension));return i.set(jc.calc(l),Yc.calc(l),qc.calc(l)),i}copy(e){super.copy(e),this.points=[];for(let t=0,i=e.points.length;t<i;t++){const r=e.points[t];this.points.push(r.clone())}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}toJSON(){const e=super.toJSON();e.points=[];for(let t=0,i=this.points.length;t<i;t++){const r=this.points[t];e.points.push(r.toArray())}return e.closed=this.closed,e.curveType=this.curveType,e.tension=this.tension,e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,i=e.points.length;t<i;t++){const r=e.points[t];this.points.push(new N().fromArray(r))}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}}class $l extends At{constructor(e=1,t=1,i=1,r=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:i,heightSegments:r};const s=e/2,o=t/2,a=Math.floor(i),l=Math.floor(r),c=a+1,u=l+1,d=e/a,h=t/l,f=[],p=[],_=[],g=[];for(let m=0;m<u;m++){const v=m*h-o;for(let y=0;y<c;y++){const x=y*d-s;p.push(x,-v,0),_.push(0,0,1),g.push(y/a),g.push(1-m/l)}}for(let m=0;m<l;m++)for(let v=0;v<a;v++){const y=v+c*m,x=v+c*(m+1),M=v+1+c*(m+1),E=v+1+c*m;f.push(y,x,E),f.push(x,M,E)}this.setIndex(f),this.setAttribute("position",new Et(p,3)),this.setAttribute("normal",new Et(_,3)),this.setAttribute("uv",new Et(g,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new $l(e.width,e.height,e.widthSegments,e.heightSegments)}}class uh extends At{constructor(e=1,t=32,i=16,r=0,s=Math.PI*2,o=0,a=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:e,widthSegments:t,heightSegments:i,phiStart:r,phiLength:s,thetaStart:o,thetaLength:a},t=Math.max(3,Math.floor(t)),i=Math.max(2,Math.floor(i));const l=Math.min(o+a,Math.PI);let c=0;const u=[],d=new N,h=new N,f=[],p=[],_=[],g=[];for(let m=0;m<=i;m++){const v=[],y=m/i;let x=0;m===0&&o===0?x=.5/t:m===i&&l===Math.PI&&(x=-.5/t);for(let M=0;M<=t;M++){const E=M/t;d.x=-e*Math.cos(r+E*s)*Math.sin(o+y*a),d.y=e*Math.cos(o+y*a),d.z=e*Math.sin(r+E*s)*Math.sin(o+y*a),p.push(d.x,d.y,d.z),h.copy(d).normalize(),_.push(h.x,h.y,h.z),g.push(E+x,1-y),v.push(c++)}u.push(v)}for(let m=0;m<i;m++)for(let v=0;v<t;v++){const y=u[m][v+1],x=u[m][v],M=u[m+1][v],E=u[m+1][v+1];(m!==0||o>0)&&f.push(y,x,E),(m!==i-1||l<Math.PI)&&f.push(x,M,E)}this.setIndex(f),this.setAttribute("position",new Et(p,3)),this.setAttribute("normal",new Et(_,3)),this.setAttribute("uv",new Et(g,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new uh(e.radius,e.widthSegments,e.heightSegments,e.phiStart,e.phiLength,e.thetaStart,e.thetaLength)}}function Bs(n){const e={};for(const t in n){e[t]={};for(const i in n[t]){const r=n[t][i];if(pp(r))r.isRenderTargetTexture?(Le("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][i]=null):e[t][i]=r.clone();else if(Array.isArray(r))if(pp(r[0])){const s=[];for(let o=0,a=r.length;o<a;o++)s[o]=r[o].clone();e[t][i]=s}else e[t][i]=r.slice();else e[t][i]=r}}return e}function fn(n){const e={};for(let t=0;t<n.length;t++){const i=Bs(n[t]);for(const r in i)e[r]=i[r]}return e}function pp(n){return n&&(n.isColor||n.isMatrix3||n.isMatrix4||n.isVector2||n.isVector3||n.isVector4||n.isTexture||n.isQuaternion)}function pE(n){const e=[];for(let t=0;t<n.length;t++)e.push(n[t].clone());return e}function D_(n){const e=n.getRenderTarget();return e===null?n.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:Je.workingColorSpace}const mE={clone:Bs,merge:fn};var gE=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,_E=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class yi extends js{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=gE,this.fragmentShader=_E,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=Bs(e.uniforms),this.uniformsGroups=pE(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this.defaultAttributeValues=Object.assign({},e.defaultAttributeValues),this.index0AttributeName=e.index0AttributeName,this.uniformsNeedUpdate=e.uniformsNeedUpdate,this}toJSON(e){const t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(const r in this.uniforms){const o=this.uniforms[r].value;o&&o.isTexture?t.uniforms[r]={type:"t",value:o.toJSON(e).uuid}:o&&o.isColor?t.uniforms[r]={type:"c",value:o.getHex()}:o&&o.isVector2?t.uniforms[r]={type:"v2",value:o.toArray()}:o&&o.isVector3?t.uniforms[r]={type:"v3",value:o.toArray()}:o&&o.isVector4?t.uniforms[r]={type:"v4",value:o.toArray()}:o&&o.isMatrix3?t.uniforms[r]={type:"m3",value:o.toArray()}:o&&o.isMatrix4?t.uniforms[r]={type:"m4",value:o.toArray()}:t.uniforms[r]={value:o}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;const i={};for(const r in this.extensions)this.extensions[r]===!0&&(i[r]=!0);return Object.keys(i).length>0&&(t.extensions=i),t}}class vE extends yi{constructor(e){super(e),this.isRawShaderMaterial=!0,this.type="RawShaderMaterial"}}class xE extends js{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=RS,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}}class bE extends js{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}}class yE extends Yi{constructor(e){super(),this.isLineDashedMaterial=!0,this.type="LineDashedMaterial",this.scale=1,this.dashSize=3,this.gapSize=1,this.setValues(e)}copy(e){return super.copy(e),this.scale=e.scale,this.dashSize=e.dashSize,this.gapSize=e.gapSize,this}}const Ra=new N,Pa=new Mr,li=new N;class N_ extends gn{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new Ct,this.projectionMatrix=new Ct,this.projectionMatrixInverse=new Ct,this.coordinateSystem=pi,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorld.decompose(Ra,Pa,li),li.x===1&&li.y===1&&li.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(Ra,Pa,li.set(1,1,1)).invert()}updateWorldMatrix(e,t){super.updateWorldMatrix(e,t),this.matrixWorld.decompose(Ra,Pa,li),li.x===1&&li.y===1&&li.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(Ra,Pa,li.set(1,1,1)).invert()}clone(){return new this.constructor().copy(this)}}const ur=new N,mp=new We,gp=new We;class Fn extends N_{constructor(e=50,t=1,i=.1,r=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=i,this.far=r,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){const t=.5*this.getFilmHeight()/e;this.fov=hd*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){const e=Math.tan(ja*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return hd*2*Math.atan(Math.tan(ja*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,i){ur.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(ur.x,ur.y).multiplyScalar(-e/ur.z),ur.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),i.set(ur.x,ur.y).multiplyScalar(-e/ur.z)}getViewSize(e,t){return this.getViewBounds(e,mp,gp),t.subVectors(gp,mp)}setViewOffset(e,t,i,r,s,o){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=i,this.view.offsetY=r,this.view.width=s,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=this.near;let t=e*Math.tan(ja*.5*this.fov)/this.zoom,i=2*t,r=this.aspect*i,s=-.5*r;const o=this.view;if(this.view!==null&&this.view.enabled){const l=o.fullWidth,c=o.fullHeight;s+=o.offsetX*r/l,t-=o.offsetY*i/c,r*=o.width/l,i*=o.height/c}const a=this.filmOffset;a!==0&&(s+=e*a/this.getFilmWidth()),this.projectionMatrix.makePerspective(s,s+r,t,t-i,e,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}}class I_ extends N_{constructor(e=-1,t=1,i=1,r=-1,s=.1,o=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=i,this.bottom=r,this.near=s,this.far=o,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,i,r,s,o){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=i,this.view.offsetY=r,this.view.width=s,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),i=(this.right+this.left)/2,r=(this.top+this.bottom)/2;let s=i-e,o=i+e,a=r+t,l=r-t;if(this.view!==null&&this.view.enabled){const c=(this.right-this.left)/this.view.fullWidth/this.zoom,u=(this.top-this.bottom)/this.view.fullHeight/this.zoom;s+=c*this.view.offsetX,o=s+c*this.view.width,a-=u*this.view.offsetY,l=a-u*this.view.height}this.projectionMatrix.makeOrthographic(s,o,a,l,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}}const ms=-90,gs=1;class SE extends gn{constructor(e,t,i){super(),this.type="CubeCamera",this.renderTarget=i,this.coordinateSystem=null,this.activeMipmapLevel=0;const r=new Fn(ms,gs,e,t);r.layers=this.layers,this.add(r);const s=new Fn(ms,gs,e,t);s.layers=this.layers,this.add(s);const o=new Fn(ms,gs,e,t);o.layers=this.layers,this.add(o);const a=new Fn(ms,gs,e,t);a.layers=this.layers,this.add(a);const l=new Fn(ms,gs,e,t);l.layers=this.layers,this.add(l);const c=new Fn(ms,gs,e,t);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){const e=this.coordinateSystem,t=this.children.concat(),[i,r,s,o,a,l]=t;for(const c of t)this.remove(c);if(e===pi)i.up.set(0,1,0),i.lookAt(1,0,0),r.up.set(0,1,0),r.lookAt(-1,0,0),s.up.set(0,0,-1),s.lookAt(0,1,0),o.up.set(0,0,1),o.lookAt(0,-1,0),a.up.set(0,1,0),a.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(e===_l)i.up.set(0,-1,0),i.lookAt(-1,0,0),r.up.set(0,-1,0),r.lookAt(1,0,0),s.up.set(0,0,1),s.lookAt(0,1,0),o.up.set(0,0,-1),o.lookAt(0,-1,0),a.up.set(0,-1,0),a.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(const c of t)this.add(c),c.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();const{renderTarget:i,activeMipmapLevel:r}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());const[s,o,a,l,c,u]=this.children,d=e.getRenderTarget(),h=e.getActiveCubeFace(),f=e.getActiveMipmapLevel(),p=e.xr.enabled;e.xr.enabled=!1;const _=i.texture.generateMipmaps;i.texture.generateMipmaps=!1;let g=!1;e.isWebGLRenderer===!0?g=e.state.buffers.depth.getReversed():g=e.reversedDepthBuffer,e.setRenderTarget(i,0,r),g&&e.autoClear===!1&&e.clearDepth(),e.render(t,s),e.setRenderTarget(i,1,r),g&&e.autoClear===!1&&e.clearDepth(),e.render(t,o),e.setRenderTarget(i,2,r),g&&e.autoClear===!1&&e.clearDepth(),e.render(t,a),e.setRenderTarget(i,3,r),g&&e.autoClear===!1&&e.clearDepth(),e.render(t,l),e.setRenderTarget(i,4,r),g&&e.autoClear===!1&&e.clearDepth(),e.render(t,c),i.texture.generateMipmaps=_,e.setRenderTarget(i,5,r),g&&e.autoClear===!1&&e.clearDepth(),e.render(t,u),e.setRenderTarget(d,h,f),e.xr.enabled=p,i.texture.needsPMREMUpdate=!0}}class EE extends Fn{constructor(e=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=e}}const _p=new Ct;class ME{constructor(e,t,i=0,r=1/0){this.ray=new Wo(e,t),this.near=i,this.far=r,this.camera=null,this.layers=new sh,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(e,t){this.ray.set(e,t)}setFromCamera(e,t){t.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(e.x,e.y,.5).unproject(t).sub(this.ray.origin).normalize(),this.camera=t):t.isOrthographicCamera?(this.ray.origin.set(e.x,e.y,(t.near+t.far)/(t.near-t.far)).unproject(t),this.ray.direction.set(0,0,-1).transformDirection(t.matrixWorld),this.camera=t):Qe("Raycaster: Unsupported camera type: "+t.type)}setFromXRController(e){return _p.identity().extractRotation(e.matrixWorld),this.ray.origin.setFromMatrixPosition(e.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4(_p),this}intersectObject(e,t=!0,i=[]){return md(e,this,i,t),i.sort(vp),i}intersectObjects(e,t=!0,i=[]){for(let r=0,s=e.length;r<s;r++)md(e[r],this,i,t);return i.sort(vp),i}}function vp(n,e){return n.distance-e.distance}function md(n,e,t,i){let r=!0;if(n.layers.test(e.layers)&&n.raycast(e,t)===!1&&(r=!1),r===!0&&i===!0){const s=n.children;for(let o=0,a=s.length;o<a;o++)md(s[o],e,t,!0)}}class xp{constructor(e=1,t=0,i=0){this.radius=e,this.phi=t,this.theta=i}set(e,t,i){return this.radius=e,this.phi=t,this.theta=i,this}copy(e){return this.radius=e.radius,this.phi=e.phi,this.theta=e.theta,this}makeSafe(){return this.phi=Ke(this.phi,1e-6,Math.PI-1e-6),this}setFromVector3(e){return this.setFromCartesianCoords(e.x,e.y,e.z)}setFromCartesianCoords(e,t,i){return this.radius=Math.sqrt(e*e+t*t+i*i),this.radius===0?(this.theta=0,this.phi=0):(this.theta=Math.atan2(e,i),this.phi=Math.acos(Ke(t/this.radius,-1,1))),this}clone(){return new this.constructor().copy(this)}}const Ch=class Ch{constructor(e,t,i,r){this.elements=[1,0,0,1],e!==void 0&&this.set(e,t,i,r)}identity(){return this.set(1,0,0,1),this}fromArray(e,t=0){for(let i=0;i<4;i++)this.elements[i]=e[i+t];return this}set(e,t,i,r){const s=this.elements;return s[0]=e,s[2]=t,s[1]=i,s[3]=r,this}};Ch.prototype.isMatrix2=!0;let bp=Ch;class wE extends C_{constructor(e=10,t=10,i=4473924,r=8947848){i=new it(i),r=new it(r);const s=t/2,o=e/t,a=e/2,l=[],c=[];for(let h=0,f=0,p=-a;h<=t;h++,p+=o){l.push(-a,0,p,a,0,p),l.push(p,0,-a,p,0,a);const _=h===s?i:r;_.toArray(c,f),f+=3,_.toArray(c,f),f+=3,_.toArray(c,f),f+=3,_.toArray(c,f),f+=3}const u=new At;u.setAttribute("position",new Et(l,3)),u.setAttribute("color",new Et(c,3));const d=new Yi({vertexColors:!0,toneMapped:!1});super(u,d),this.type="GridHelper"}dispose(){this.geometry.dispose(),this.material.dispose()}}class TE extends Tr{constructor(e,t=null){super(),this.object=e,this.domElement=t,this.enabled=!0,this.state=-1,this.keys={},this.mouseButtons={LEFT:null,MIDDLE:null,RIGHT:null},this.touches={ONE:null,TWO:null}}connect(e){if(e===void 0){Le("Controls: connect() now requires an element.");return}this.domElement!==null&&this.disconnect(),this.domElement=e}disconnect(){}dispose(){}update(){}}function yp(n,e,t,i){const r=AE(i);switch(t){case x_:return n*e;case y_:return n*e/r.components*r.byteLength;case Qd:return n*e/r.components*r.byteLength;case jr:return n*e*2/r.components*r.byteLength;case eh:return n*e*2/r.components*r.byteLength;case b_:return n*e*3/r.components*r.byteLength;case ni:return n*e*4/r.components*r.byteLength;case th:return n*e*4/r.components*r.byteLength;case Va:case Wa:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*8;case $a:case Xa:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*16;case Fu:case ku:return Math.max(n,16)*Math.max(e,8)/4;case Uu:case Ou:return Math.max(n,8)*Math.max(e,8)/2;case Bu:case zu:case Hu:case Vu:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*8;case Gu:case fl:case Wu:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*16;case $u:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*16;case Xu:return Math.floor((n+4)/5)*Math.floor((e+3)/4)*16;case ju:return Math.floor((n+4)/5)*Math.floor((e+4)/5)*16;case Yu:return Math.floor((n+5)/6)*Math.floor((e+4)/5)*16;case qu:return Math.floor((n+5)/6)*Math.floor((e+5)/6)*16;case Ku:return Math.floor((n+7)/8)*Math.floor((e+4)/5)*16;case Zu:return Math.floor((n+7)/8)*Math.floor((e+5)/6)*16;case Ju:return Math.floor((n+7)/8)*Math.floor((e+7)/8)*16;case Qu:return Math.floor((n+9)/10)*Math.floor((e+4)/5)*16;case ed:return Math.floor((n+9)/10)*Math.floor((e+5)/6)*16;case td:return Math.floor((n+9)/10)*Math.floor((e+7)/8)*16;case nd:return Math.floor((n+9)/10)*Math.floor((e+9)/10)*16;case id:return Math.floor((n+11)/12)*Math.floor((e+9)/10)*16;case rd:return Math.floor((n+11)/12)*Math.floor((e+11)/12)*16;case sd:case od:case ad:return Math.ceil(n/4)*Math.ceil(e/4)*16;case ld:case cd:return Math.ceil(n/4)*Math.ceil(e/4)*8;case pl:case ud:return Math.ceil(n/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${t} format.`)}function AE(n){switch(n){case kn:case m_:return{byteLength:1,components:1};case Io:case g_:case qi:return{byteLength:2,components:1};case Zd:case Jd:return{byteLength:2,components:4};case xi:case Kd:case fi:return{byteLength:4,components:1};case __:case v_:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${n}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:qd}}));typeof window<"u"&&(window.__THREE__?Le("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=qd);/**
 * @license
 * Copyright 2010-2026 Three.js Authors
 * SPDX-License-Identifier: MIT
 */function U_(){let n=null,e=!1,t=null,i=null;function r(s,o){t(s,o),i=n.requestAnimationFrame(r)}return{start:function(){e!==!0&&t!==null&&n!==null&&(i=n.requestAnimationFrame(r),e=!0)},stop:function(){n!==null&&n.cancelAnimationFrame(i),e=!1},setAnimationLoop:function(s){t=s},setContext:function(s){n=s}}}function CE(n){const e=new WeakMap;function t(a,l){const c=a.array,u=a.usage,d=c.byteLength,h=n.createBuffer();n.bindBuffer(l,h),n.bufferData(l,c,u),a.onUploadCallback();let f;if(c instanceof Float32Array)f=n.FLOAT;else if(typeof Float16Array<"u"&&c instanceof Float16Array)f=n.HALF_FLOAT;else if(c instanceof Uint16Array)a.isFloat16BufferAttribute?f=n.HALF_FLOAT:f=n.UNSIGNED_SHORT;else if(c instanceof Int16Array)f=n.SHORT;else if(c instanceof Uint32Array)f=n.UNSIGNED_INT;else if(c instanceof Int32Array)f=n.INT;else if(c instanceof Int8Array)f=n.BYTE;else if(c instanceof Uint8Array)f=n.UNSIGNED_BYTE;else if(c instanceof Uint8ClampedArray)f=n.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+c);return{buffer:h,type:f,bytesPerElement:c.BYTES_PER_ELEMENT,version:a.version,size:d}}function i(a,l,c){const u=l.array,d=l.updateRanges;if(n.bindBuffer(c,a),d.length===0)n.bufferSubData(c,0,u);else{d.sort((f,p)=>f.start-p.start);let h=0;for(let f=1;f<d.length;f++){const p=d[h],_=d[f];_.start<=p.start+p.count+1?p.count=Math.max(p.count,_.start+_.count-p.start):(++h,d[h]=_)}d.length=h+1;for(let f=0,p=d.length;f<p;f++){const _=d[f];n.bufferSubData(c,_.start*u.BYTES_PER_ELEMENT,u,_.start,_.count)}l.clearUpdateRanges()}l.onUploadCallback()}function r(a){return a.isInterleavedBufferAttribute&&(a=a.data),e.get(a)}function s(a){a.isInterleavedBufferAttribute&&(a=a.data);const l=e.get(a);l&&(n.deleteBuffer(l.buffer),e.delete(a))}function o(a,l){if(a.isInterleavedBufferAttribute&&(a=a.data),a.isGLBufferAttribute){const u=e.get(a);(!u||u.version<a.version)&&e.set(a,{buffer:a.buffer,type:a.type,bytesPerElement:a.elementSize,version:a.version});return}const c=e.get(a);if(c===void 0)e.set(a,t(a,l));else if(c.version<a.version){if(c.size!==a.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");i(c.buffer,a,l),c.version=a.version}}return{get:r,remove:s,update:o}}var RE=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,PE=`#ifdef USE_ALPHAHASH
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
#endif`,LE=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,DE=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,NE=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,IE=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,UE=`#ifdef USE_AOMAP
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
#endif`,FE=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,OE=`#ifdef USE_BATCHING
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
#endif`,kE=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,BE=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,zE=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,GE=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,HE=`#ifdef USE_IRIDESCENCE
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
#endif`,VE=`#ifdef USE_BUMPMAP
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
#endif`,WE=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,$E=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,XE=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,jE=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,YE=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#endif`,qE=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#endif`,KE=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec4 vColor;
#endif`,ZE=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
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
#endif`,JE=`#define PI 3.141592653589793
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
} // validated`,QE=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,eM=`vec3 transformedNormal = objectNormal;
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
#endif`,tM=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,nM=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,iM=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,rM=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,sM="gl_FragColor = linearToOutputTexel( gl_FragColor );",oM=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,aM=`#ifdef USE_ENVMAP
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
#endif`,lM=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
#endif`,cM=`#ifdef USE_ENVMAP
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
#endif`,uM=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,dM=`#ifdef USE_ENVMAP
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
#endif`,hM=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,fM=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,pM=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,mM=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,gM=`#ifdef USE_GRADIENTMAP
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
}`,_M=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,vM=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,xM=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,bM=`uniform bool receiveShadow;
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
#include <lightprobes_pars_fragment>`,yM=`#ifdef USE_ENVMAP
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
#endif`,SM=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,EM=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,MM=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,wM=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,TM=`PhysicalMaterial material;
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
#endif`,AM=`uniform sampler2D dfgLUT;
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
}`,CM=`
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
#endif`,RM=`#if defined( RE_IndirectDiffuse )
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
#endif`,PM=`#if defined( RE_IndirectDiffuse )
	#if defined( LAMBERT ) || defined( PHONG )
		irradiance += iblIrradiance;
	#endif
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,LM=`#ifdef USE_LIGHT_PROBES_GRID
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
#endif`,DM=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,NM=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,IM=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,UM=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,FM=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,OM=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,kM=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,BM=`#if defined( USE_POINTS_UV )
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
#endif`,zM=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,GM=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,HM=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,VM=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,WM=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,$M=`#ifdef USE_MORPHTARGETS
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
#endif`,XM=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,jM=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,YM=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,qM=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,KM=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,ZM=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,JM=`#ifdef USE_NORMALMAP
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
#endif`,QM=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,ew=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,tw=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,nw=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,iw=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,rw=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,sw=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,ow=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,aw=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,lw=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,cw=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,uw=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,dw=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,hw=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,fw=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,pw=`float getShadowMask() {
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
}`,mw=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,gw=`#ifdef USE_SKINNING
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
#endif`,_w=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,vw=`#ifdef USE_SKINNING
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
#endif`,xw=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,bw=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,yw=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,Sw=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,Ew=`#ifdef USE_TRANSMISSION
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
#endif`,Mw=`#ifdef USE_TRANSMISSION
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
#endif`,ww=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Tw=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Aw=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Cw=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const Rw=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,Pw=`uniform sampler2D t2D;
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
}`,Lw=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Dw=`#ifdef ENVMAP_TYPE_CUBE
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
}`,Nw=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Iw=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Uw=`#include <common>
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
}`,Fw=`#if DEPTH_PACKING == 3200
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
}`,Ow=`#define DISTANCE
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
}`,kw=`#define DISTANCE
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
}`,Bw=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,zw=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Gw=`uniform float scale;
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
}`,Hw=`uniform vec3 diffuse;
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
}`,Vw=`#include <common>
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
}`,Ww=`uniform vec3 diffuse;
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
}`,$w=`#define LAMBERT
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
}`,Xw=`#define LAMBERT
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
}`,jw=`#define MATCAP
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
}`,Yw=`#define MATCAP
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
}`,qw=`#define NORMAL
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
}`,Kw=`#define NORMAL
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
}`,Zw=`#define PHONG
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
}`,Jw=`#define PHONG
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
}`,Qw=`#define STANDARD
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
}`,eT=`#define STANDARD
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
}`,tT=`#define TOON
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
}`,nT=`#define TOON
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
}`,iT=`uniform float size;
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
}`,rT=`uniform vec3 diffuse;
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
}`,sT=`#include <common>
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
}`,oT=`uniform vec3 color;
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
}`,aT=`uniform float rotation;
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
}`,lT=`uniform vec3 diffuse;
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
}`,$e={alphahash_fragment:RE,alphahash_pars_fragment:PE,alphamap_fragment:LE,alphamap_pars_fragment:DE,alphatest_fragment:NE,alphatest_pars_fragment:IE,aomap_fragment:UE,aomap_pars_fragment:FE,batching_pars_vertex:OE,batching_vertex:kE,begin_vertex:BE,beginnormal_vertex:zE,bsdfs:GE,iridescence_fragment:HE,bumpmap_pars_fragment:VE,clipping_planes_fragment:WE,clipping_planes_pars_fragment:$E,clipping_planes_pars_vertex:XE,clipping_planes_vertex:jE,color_fragment:YE,color_pars_fragment:qE,color_pars_vertex:KE,color_vertex:ZE,common:JE,cube_uv_reflection_fragment:QE,defaultnormal_vertex:eM,displacementmap_pars_vertex:tM,displacementmap_vertex:nM,emissivemap_fragment:iM,emissivemap_pars_fragment:rM,colorspace_fragment:sM,colorspace_pars_fragment:oM,envmap_fragment:aM,envmap_common_pars_fragment:lM,envmap_pars_fragment:cM,envmap_pars_vertex:uM,envmap_physical_pars_fragment:yM,envmap_vertex:dM,fog_vertex:hM,fog_pars_vertex:fM,fog_fragment:pM,fog_pars_fragment:mM,gradientmap_pars_fragment:gM,lightmap_pars_fragment:_M,lights_lambert_fragment:vM,lights_lambert_pars_fragment:xM,lights_pars_begin:bM,lights_toon_fragment:SM,lights_toon_pars_fragment:EM,lights_phong_fragment:MM,lights_phong_pars_fragment:wM,lights_physical_fragment:TM,lights_physical_pars_fragment:AM,lights_fragment_begin:CM,lights_fragment_maps:RM,lights_fragment_end:PM,lightprobes_pars_fragment:LM,logdepthbuf_fragment:DM,logdepthbuf_pars_fragment:NM,logdepthbuf_pars_vertex:IM,logdepthbuf_vertex:UM,map_fragment:FM,map_pars_fragment:OM,map_particle_fragment:kM,map_particle_pars_fragment:BM,metalnessmap_fragment:zM,metalnessmap_pars_fragment:GM,morphinstance_vertex:HM,morphcolor_vertex:VM,morphnormal_vertex:WM,morphtarget_pars_vertex:$M,morphtarget_vertex:XM,normal_fragment_begin:jM,normal_fragment_maps:YM,normal_pars_fragment:qM,normal_pars_vertex:KM,normal_vertex:ZM,normalmap_pars_fragment:JM,clearcoat_normal_fragment_begin:QM,clearcoat_normal_fragment_maps:ew,clearcoat_pars_fragment:tw,iridescence_pars_fragment:nw,opaque_fragment:iw,packing:rw,premultiplied_alpha_fragment:sw,project_vertex:ow,dithering_fragment:aw,dithering_pars_fragment:lw,roughnessmap_fragment:cw,roughnessmap_pars_fragment:uw,shadowmap_pars_fragment:dw,shadowmap_pars_vertex:hw,shadowmap_vertex:fw,shadowmask_pars_fragment:pw,skinbase_vertex:mw,skinning_pars_vertex:gw,skinning_vertex:_w,skinnormal_vertex:vw,specularmap_fragment:xw,specularmap_pars_fragment:bw,tonemapping_fragment:yw,tonemapping_pars_fragment:Sw,transmission_fragment:Ew,transmission_pars_fragment:Mw,uv_pars_fragment:ww,uv_pars_vertex:Tw,uv_vertex:Aw,worldpos_vertex:Cw,background_vert:Rw,background_frag:Pw,backgroundCube_vert:Lw,backgroundCube_frag:Dw,cube_vert:Nw,cube_frag:Iw,depth_vert:Uw,depth_frag:Fw,distance_vert:Ow,distance_frag:kw,equirect_vert:Bw,equirect_frag:zw,linedashed_vert:Gw,linedashed_frag:Hw,meshbasic_vert:Vw,meshbasic_frag:Ww,meshlambert_vert:$w,meshlambert_frag:Xw,meshmatcap_vert:jw,meshmatcap_frag:Yw,meshnormal_vert:qw,meshnormal_frag:Kw,meshphong_vert:Zw,meshphong_frag:Jw,meshphysical_vert:Qw,meshphysical_frag:eT,meshtoon_vert:tT,meshtoon_frag:nT,points_vert:iT,points_frag:rT,shadow_vert:sT,shadow_frag:oT,sprite_vert:aT,sprite_frag:lT},fe={common:{diffuse:{value:new it(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new ze},alphaMap:{value:null},alphaMapTransform:{value:new ze},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new ze}},envmap:{envMap:{value:null},envMapRotation:{value:new ze},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new ze}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new ze}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new ze},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new ze},normalScale:{value:new We(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new ze},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new ze}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new ze}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new ze}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new it(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null},probesSH:{value:null},probesMin:{value:new N},probesMax:{value:new N},probesResolution:{value:new N}},points:{diffuse:{value:new it(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new ze},alphaTest:{value:0},uvTransform:{value:new ze}},sprite:{diffuse:{value:new it(16777215)},opacity:{value:1},center:{value:new We(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new ze},alphaMap:{value:null},alphaMapTransform:{value:new ze},alphaTest:{value:0}}},di={basic:{uniforms:fn([fe.common,fe.specularmap,fe.envmap,fe.aomap,fe.lightmap,fe.fog]),vertexShader:$e.meshbasic_vert,fragmentShader:$e.meshbasic_frag},lambert:{uniforms:fn([fe.common,fe.specularmap,fe.envmap,fe.aomap,fe.lightmap,fe.emissivemap,fe.bumpmap,fe.normalmap,fe.displacementmap,fe.fog,fe.lights,{emissive:{value:new it(0)},envMapIntensity:{value:1}}]),vertexShader:$e.meshlambert_vert,fragmentShader:$e.meshlambert_frag},phong:{uniforms:fn([fe.common,fe.specularmap,fe.envmap,fe.aomap,fe.lightmap,fe.emissivemap,fe.bumpmap,fe.normalmap,fe.displacementmap,fe.fog,fe.lights,{emissive:{value:new it(0)},specular:{value:new it(1118481)},shininess:{value:30},envMapIntensity:{value:1}}]),vertexShader:$e.meshphong_vert,fragmentShader:$e.meshphong_frag},standard:{uniforms:fn([fe.common,fe.envmap,fe.aomap,fe.lightmap,fe.emissivemap,fe.bumpmap,fe.normalmap,fe.displacementmap,fe.roughnessmap,fe.metalnessmap,fe.fog,fe.lights,{emissive:{value:new it(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:$e.meshphysical_vert,fragmentShader:$e.meshphysical_frag},toon:{uniforms:fn([fe.common,fe.aomap,fe.lightmap,fe.emissivemap,fe.bumpmap,fe.normalmap,fe.displacementmap,fe.gradientmap,fe.fog,fe.lights,{emissive:{value:new it(0)}}]),vertexShader:$e.meshtoon_vert,fragmentShader:$e.meshtoon_frag},matcap:{uniforms:fn([fe.common,fe.bumpmap,fe.normalmap,fe.displacementmap,fe.fog,{matcap:{value:null}}]),vertexShader:$e.meshmatcap_vert,fragmentShader:$e.meshmatcap_frag},points:{uniforms:fn([fe.points,fe.fog]),vertexShader:$e.points_vert,fragmentShader:$e.points_frag},dashed:{uniforms:fn([fe.common,fe.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:$e.linedashed_vert,fragmentShader:$e.linedashed_frag},depth:{uniforms:fn([fe.common,fe.displacementmap]),vertexShader:$e.depth_vert,fragmentShader:$e.depth_frag},normal:{uniforms:fn([fe.common,fe.bumpmap,fe.normalmap,fe.displacementmap,{opacity:{value:1}}]),vertexShader:$e.meshnormal_vert,fragmentShader:$e.meshnormal_frag},sprite:{uniforms:fn([fe.sprite,fe.fog]),vertexShader:$e.sprite_vert,fragmentShader:$e.sprite_frag},background:{uniforms:{uvTransform:{value:new ze},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:$e.background_vert,fragmentShader:$e.background_frag},backgroundCube:{uniforms:{envMap:{value:null},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new ze}},vertexShader:$e.backgroundCube_vert,fragmentShader:$e.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:$e.cube_vert,fragmentShader:$e.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:$e.equirect_vert,fragmentShader:$e.equirect_frag},distance:{uniforms:fn([fe.common,fe.displacementmap,{referencePosition:{value:new N},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:$e.distance_vert,fragmentShader:$e.distance_frag},shadow:{uniforms:fn([fe.lights,fe.fog,{color:{value:new it(0)},opacity:{value:1}}]),vertexShader:$e.shadow_vert,fragmentShader:$e.shadow_frag}};di.physical={uniforms:fn([di.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new ze},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new ze},clearcoatNormalScale:{value:new We(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new ze},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new ze},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new ze},sheen:{value:0},sheenColor:{value:new it(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new ze},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new ze},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new ze},transmissionSamplerSize:{value:new We},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new ze},attenuationDistance:{value:0},attenuationColor:{value:new it(0)},specularColor:{value:new it(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new ze},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new ze},anisotropyVector:{value:new We},anisotropyMap:{value:null},anisotropyMapTransform:{value:new ze}}]),vertexShader:$e.meshphysical_vert,fragmentShader:$e.meshphysical_frag};const La={r:0,b:0,g:0},cT=new Ct,F_=new ze;F_.set(-1,0,0,0,1,0,0,0,1);function uT(n,e,t,i,r,s){const o=new it(0);let a=r===!0?0:1,l,c,u=null,d=0,h=null;function f(v){let y=v.isScene===!0?v.background:null;if(y&&y.isTexture){const x=v.backgroundBlurriness>0;y=e.get(y,x)}return y}function p(v){let y=!1;const x=f(v);x===null?g(o,a):x&&x.isColor&&(g(x,1),y=!0);const M=n.xr.getEnvironmentBlendMode();M==="additive"?t.buffers.color.setClear(0,0,0,1,s):M==="alpha-blend"&&t.buffers.color.setClear(0,0,0,0,s),(n.autoClear||y)&&(t.buffers.depth.setTest(!0),t.buffers.depth.setMask(!0),t.buffers.color.setMask(!0),n.clear(n.autoClearColor,n.autoClearDepth,n.autoClearStencil))}function _(v,y){const x=f(y);x&&(x.isCubeTexture||x.mapping===Wl)?(c===void 0&&(c=new bi(new $o(1,1,1),new yi({name:"BackgroundCubeMaterial",uniforms:Bs(di.backgroundCube.uniforms),vertexShader:di.backgroundCube.vertexShader,fragmentShader:di.backgroundCube.fragmentShader,side:Sn,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute("normal"),c.geometry.deleteAttribute("uv"),c.onBeforeRender=function(M,E,C){this.matrixWorld.copyPosition(C.matrixWorld)},Object.defineProperty(c.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),i.update(c)),c.material.uniforms.envMap.value=x,c.material.uniforms.backgroundBlurriness.value=y.backgroundBlurriness,c.material.uniforms.backgroundIntensity.value=y.backgroundIntensity,c.material.uniforms.backgroundRotation.value.setFromMatrix4(cT.makeRotationFromEuler(y.backgroundRotation)).transpose(),x.isCubeTexture&&x.isRenderTargetTexture===!1&&c.material.uniforms.backgroundRotation.value.premultiply(F_),c.material.toneMapped=Je.getTransfer(x.colorSpace)!==dt,(u!==x||d!==x.version||h!==n.toneMapping)&&(c.material.needsUpdate=!0,u=x,d=x.version,h=n.toneMapping),c.layers.enableAll(),v.unshift(c,c.geometry,c.material,0,0,null)):x&&x.isTexture&&(l===void 0&&(l=new bi(new $l(2,2),new yi({name:"BackgroundMaterial",uniforms:Bs(di.background.uniforms),vertexShader:di.background.vertexShader,fragmentShader:di.background.fragmentShader,side:Er,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),l.geometry.deleteAttribute("normal"),Object.defineProperty(l.material,"map",{get:function(){return this.uniforms.t2D.value}}),i.update(l)),l.material.uniforms.t2D.value=x,l.material.uniforms.backgroundIntensity.value=y.backgroundIntensity,l.material.toneMapped=Je.getTransfer(x.colorSpace)!==dt,x.matrixAutoUpdate===!0&&x.updateMatrix(),l.material.uniforms.uvTransform.value.copy(x.matrix),(u!==x||d!==x.version||h!==n.toneMapping)&&(l.material.needsUpdate=!0,u=x,d=x.version,h=n.toneMapping),l.layers.enableAll(),v.unshift(l,l.geometry,l.material,0,0,null))}function g(v,y){v.getRGB(La,D_(n)),t.buffers.color.setClear(La.r,La.g,La.b,y,s)}function m(){c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0),l!==void 0&&(l.geometry.dispose(),l.material.dispose(),l=void 0)}return{getClearColor:function(){return o},setClearColor:function(v,y=1){o.set(v),a=y,g(o,a)},getClearAlpha:function(){return a},setClearAlpha:function(v){a=v,g(o,a)},render:p,addToRenderList:_,dispose:m}}function dT(n,e){const t=n.getParameter(n.MAX_VERTEX_ATTRIBS),i={},r=h(null);let s=r,o=!1;function a(P,F,$,W,I){let B=!1;const H=d(P,W,$,F);s!==H&&(s=H,c(s.object)),B=f(P,W,$,I),B&&p(P,W,$,I),I!==null&&e.update(I,n.ELEMENT_ARRAY_BUFFER),(B||o)&&(o=!1,x(P,F,$,W),I!==null&&n.bindBuffer(n.ELEMENT_ARRAY_BUFFER,e.get(I).buffer))}function l(){return n.createVertexArray()}function c(P){return n.bindVertexArray(P)}function u(P){return n.deleteVertexArray(P)}function d(P,F,$,W){const I=W.wireframe===!0;let B=i[F.id];B===void 0&&(B={},i[F.id]=B);const H=P.isInstancedMesh===!0?P.id:0;let Z=B[H];Z===void 0&&(Z={},B[H]=Z);let J=Z[$.id];J===void 0&&(J={},Z[$.id]=J);let ne=J[I];return ne===void 0&&(ne=h(l()),J[I]=ne),ne}function h(P){const F=[],$=[],W=[];for(let I=0;I<t;I++)F[I]=0,$[I]=0,W[I]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:F,enabledAttributes:$,attributeDivisors:W,object:P,attributes:{},index:null}}function f(P,F,$,W){const I=s.attributes,B=F.attributes;let H=0;const Z=$.getAttributes();for(const J in Z)if(Z[J].location>=0){const de=I[J];let ye=B[J];if(ye===void 0&&(J==="instanceMatrix"&&P.instanceMatrix&&(ye=P.instanceMatrix),J==="instanceColor"&&P.instanceColor&&(ye=P.instanceColor)),de===void 0||de.attribute!==ye||ye&&de.data!==ye.data)return!0;H++}return s.attributesNum!==H||s.index!==W}function p(P,F,$,W){const I={},B=F.attributes;let H=0;const Z=$.getAttributes();for(const J in Z)if(Z[J].location>=0){let de=B[J];de===void 0&&(J==="instanceMatrix"&&P.instanceMatrix&&(de=P.instanceMatrix),J==="instanceColor"&&P.instanceColor&&(de=P.instanceColor));const ye={};ye.attribute=de,de&&de.data&&(ye.data=de.data),I[J]=ye,H++}s.attributes=I,s.attributesNum=H,s.index=W}function _(){const P=s.newAttributes;for(let F=0,$=P.length;F<$;F++)P[F]=0}function g(P){m(P,0)}function m(P,F){const $=s.newAttributes,W=s.enabledAttributes,I=s.attributeDivisors;$[P]=1,W[P]===0&&(n.enableVertexAttribArray(P),W[P]=1),I[P]!==F&&(n.vertexAttribDivisor(P,F),I[P]=F)}function v(){const P=s.newAttributes,F=s.enabledAttributes;for(let $=0,W=F.length;$<W;$++)F[$]!==P[$]&&(n.disableVertexAttribArray($),F[$]=0)}function y(P,F,$,W,I,B,H){H===!0?n.vertexAttribIPointer(P,F,$,I,B):n.vertexAttribPointer(P,F,$,W,I,B)}function x(P,F,$,W){_();const I=W.attributes,B=$.getAttributes(),H=F.defaultAttributeValues;for(const Z in B){const J=B[Z];if(J.location>=0){let ne=I[Z];if(ne===void 0&&(Z==="instanceMatrix"&&P.instanceMatrix&&(ne=P.instanceMatrix),Z==="instanceColor"&&P.instanceColor&&(ne=P.instanceColor)),ne!==void 0){const de=ne.normalized,ye=ne.itemSize,Fe=e.get(ne);if(Fe===void 0)continue;const tt=Fe.buffer,Ie=Fe.type,q=Fe.bytesPerElement,pe=Ie===n.INT||Ie===n.UNSIGNED_INT||ne.gpuType===Kd;if(ne.isInterleavedBufferAttribute){const ie=ne.data,Ce=ie.stride,Oe=ne.offset;if(ie.isInstancedInterleavedBuffer){for(let Ne=0;Ne<J.locationSize;Ne++)m(J.location+Ne,ie.meshPerAttribute);P.isInstancedMesh!==!0&&W._maxInstanceCount===void 0&&(W._maxInstanceCount=ie.meshPerAttribute*ie.count)}else for(let Ne=0;Ne<J.locationSize;Ne++)g(J.location+Ne);n.bindBuffer(n.ARRAY_BUFFER,tt);for(let Ne=0;Ne<J.locationSize;Ne++)y(J.location+Ne,ye/J.locationSize,Ie,de,Ce*q,(Oe+ye/J.locationSize*Ne)*q,pe)}else{if(ne.isInstancedBufferAttribute){for(let ie=0;ie<J.locationSize;ie++)m(J.location+ie,ne.meshPerAttribute);P.isInstancedMesh!==!0&&W._maxInstanceCount===void 0&&(W._maxInstanceCount=ne.meshPerAttribute*ne.count)}else for(let ie=0;ie<J.locationSize;ie++)g(J.location+ie);n.bindBuffer(n.ARRAY_BUFFER,tt);for(let ie=0;ie<J.locationSize;ie++)y(J.location+ie,ye/J.locationSize,Ie,de,ye*q,ye/J.locationSize*ie*q,pe)}}else if(H!==void 0){const de=H[Z];if(de!==void 0)switch(de.length){case 2:n.vertexAttrib2fv(J.location,de);break;case 3:n.vertexAttrib3fv(J.location,de);break;case 4:n.vertexAttrib4fv(J.location,de);break;default:n.vertexAttrib1fv(J.location,de)}}}}v()}function M(){A();for(const P in i){const F=i[P];for(const $ in F){const W=F[$];for(const I in W){const B=W[I];for(const H in B)u(B[H].object),delete B[H];delete W[I]}}delete i[P]}}function E(P){if(i[P.id]===void 0)return;const F=i[P.id];for(const $ in F){const W=F[$];for(const I in W){const B=W[I];for(const H in B)u(B[H].object),delete B[H];delete W[I]}}delete i[P.id]}function C(P){for(const F in i){const $=i[F];for(const W in $){const I=$[W];if(I[P.id]===void 0)continue;const B=I[P.id];for(const H in B)u(B[H].object),delete B[H];delete I[P.id]}}}function b(P){for(const F in i){const $=i[F],W=P.isInstancedMesh===!0?P.id:0,I=$[W];if(I!==void 0){for(const B in I){const H=I[B];for(const Z in H)u(H[Z].object),delete H[Z];delete I[B]}delete $[W],Object.keys($).length===0&&delete i[F]}}}function A(){L(),o=!0,s!==r&&(s=r,c(s.object))}function L(){r.geometry=null,r.program=null,r.wireframe=!1}return{setup:a,reset:A,resetDefaultState:L,dispose:M,releaseStatesOfGeometry:E,releaseStatesOfObject:b,releaseStatesOfProgram:C,initAttributes:_,enableAttribute:g,disableUnusedAttributes:v}}function hT(n,e,t){let i;function r(l){i=l}function s(l,c){n.drawArrays(i,l,c),t.update(c,i,1)}function o(l,c,u){u!==0&&(n.drawArraysInstanced(i,l,c,u),t.update(c,i,u))}function a(l,c,u){if(u===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(i,l,0,c,0,u);let h=0;for(let f=0;f<u;f++)h+=c[f];t.update(h,i,1)}this.setMode=r,this.render=s,this.renderInstances=o,this.renderMultiDraw=a}function fT(n,e,t,i){let r;function s(){if(r!==void 0)return r;if(e.has("EXT_texture_filter_anisotropic")===!0){const C=e.get("EXT_texture_filter_anisotropic");r=n.getParameter(C.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else r=0;return r}function o(C){return!(C!==ni&&i.convert(C)!==n.getParameter(n.IMPLEMENTATION_COLOR_READ_FORMAT))}function a(C){const b=C===qi&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(C!==kn&&i.convert(C)!==n.getParameter(n.IMPLEMENTATION_COLOR_READ_TYPE)&&C!==fi&&!b)}function l(C){if(C==="highp"){if(n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.HIGH_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.HIGH_FLOAT).precision>0)return"highp";C="mediump"}return C==="mediump"&&n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.MEDIUM_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let c=t.precision!==void 0?t.precision:"highp";const u=l(c);u!==c&&(Le("WebGLRenderer:",c,"not supported, using",u,"instead."),c=u);const d=t.logarithmicDepthBuffer===!0,h=t.reversedDepthBuffer===!0&&e.has("EXT_clip_control");t.reversedDepthBuffer===!0&&h===!1&&Le("WebGLRenderer: Unable to use reversed depth buffer due to missing EXT_clip_control extension. Fallback to default depth buffer.");const f=n.getParameter(n.MAX_TEXTURE_IMAGE_UNITS),p=n.getParameter(n.MAX_VERTEX_TEXTURE_IMAGE_UNITS),_=n.getParameter(n.MAX_TEXTURE_SIZE),g=n.getParameter(n.MAX_CUBE_MAP_TEXTURE_SIZE),m=n.getParameter(n.MAX_VERTEX_ATTRIBS),v=n.getParameter(n.MAX_VERTEX_UNIFORM_VECTORS),y=n.getParameter(n.MAX_VARYING_VECTORS),x=n.getParameter(n.MAX_FRAGMENT_UNIFORM_VECTORS),M=n.getParameter(n.MAX_SAMPLES),E=n.getParameter(n.SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:s,getMaxPrecision:l,textureFormatReadable:o,textureTypeReadable:a,precision:c,logarithmicDepthBuffer:d,reversedDepthBuffer:h,maxTextures:f,maxVertexTextures:p,maxTextureSize:_,maxCubemapSize:g,maxAttributes:m,maxVertexUniforms:v,maxVaryings:y,maxFragmentUniforms:x,maxSamples:M,samples:E}}function pT(n){const e=this;let t=null,i=0,r=!1,s=!1;const o=new Pi,a=new ze,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(d,h){const f=d.length!==0||h||i!==0||r;return r=h,i=d.length,f},this.beginShadows=function(){s=!0,u(null)},this.endShadows=function(){s=!1},this.setGlobalState=function(d,h){t=u(d,h,0)},this.setState=function(d,h,f){const p=d.clippingPlanes,_=d.clipIntersection,g=d.clipShadows,m=n.get(d);if(!r||p===null||p.length===0||s&&!g)s?u(null):c();else{const v=s?0:i,y=v*4;let x=m.clippingState||null;l.value=x,x=u(p,h,y,f);for(let M=0;M!==y;++M)x[M]=t[M];m.clippingState=x,this.numIntersection=_?this.numPlanes:0,this.numPlanes+=v}};function c(){l.value!==t&&(l.value=t,l.needsUpdate=i>0),e.numPlanes=i,e.numIntersection=0}function u(d,h,f,p){const _=d!==null?d.length:0;let g=null;if(_!==0){if(g=l.value,p!==!0||g===null){const m=f+_*4,v=h.matrixWorldInverse;a.getNormalMatrix(v),(g===null||g.length<m)&&(g=new Float32Array(m));for(let y=0,x=f;y!==_;++y,x+=4)o.copy(d[y]).applyMatrix4(v,a),o.normal.toArray(g,x),g[x+3]=o.constant}l.value=g,l.needsUpdate=!0}return e.numPlanes=_,e.numIntersection=0,g}}const xr=4,Sp=[.125,.215,.35,.446,.526,.582],Fr=20,mT=256,uo=new I_,Ep=new it;let Kc=null,Zc=0,Jc=0,Qc=!1;const gT=new N;class Mp{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._sizeLods=[],this._sigmas=[],this._lodMeshes=[],this._backgroundBox=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null}fromScene(e,t=0,i=.1,r=100,s={}){const{size:o=256,position:a=gT}=s;Kc=this._renderer.getRenderTarget(),Zc=this._renderer.getActiveCubeFace(),Jc=this._renderer.getActiveMipmapLevel(),Qc=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(o);const l=this._allocateTargets();return l.depthBuffer=!0,this._sceneToCubeUV(e,i,r,l,a),t>0&&this._blur(l,0,0,t),this._applyPMREM(l),this._cleanup(l),l}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Ap(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Tp(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._backgroundBox!==null&&(this._backgroundBox.geometry.dispose(),this._backgroundBox.material.dispose())}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodMeshes.length;e++)this._lodMeshes[e].geometry.dispose()}_cleanup(e){this._renderer.setRenderTarget(Kc,Zc,Jc),this._renderer.xr.enabled=Qc,e.scissorTest=!1,_s(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===Xr||e.mapping===Os?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),Kc=this._renderer.getRenderTarget(),Zc=this._renderer.getActiveCubeFace(),Jc=this._renderer.getActiveMipmapLevel(),Qc=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const i=t||this._allocateTargets();return this._textureToCubeUV(e,i),this._applyPMREM(i),this._cleanup(i),i}_allocateTargets(){const e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,i={magFilter:cn,minFilter:cn,generateMipmaps:!1,type:qi,format:ni,colorSpace:ml,depthBuffer:!1},r=wp(e,t,i);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=wp(e,t,i);const{_lodMax:s}=this;({lodMeshes:this._lodMeshes,sizeLods:this._sizeLods,sigmas:this._sigmas}=_T(s)),this._blurMaterial=xT(s,e,t),this._ggxMaterial=vT(s,e,t)}return r}_compileMaterial(e){const t=new bi(new At,e);this._renderer.compile(t,uo)}_sceneToCubeUV(e,t,i,r,s){const l=new Fn(90,1,t,i),c=[1,-1,1,1,1,1],u=[1,1,1,-1,-1,-1],d=this._renderer,h=d.autoClear,f=d.toneMapping;d.getClearColor(Ep),d.toneMapping=mi,d.autoClear=!1,d.state.buffers.depth.getReversed()&&(d.setRenderTarget(r),d.clearDepth(),d.setRenderTarget(null)),this._backgroundBox===null&&(this._backgroundBox=new bi(new $o,new ah({name:"PMREM.Background",side:Sn,depthWrite:!1,depthTest:!1})));const _=this._backgroundBox,g=_.material;let m=!1;const v=e.background;v?v.isColor&&(g.color.copy(v),e.background=null,m=!0):(g.color.copy(Ep),m=!0);for(let y=0;y<6;y++){const x=y%3;x===0?(l.up.set(0,c[y],0),l.position.set(s.x,s.y,s.z),l.lookAt(s.x+u[y],s.y,s.z)):x===1?(l.up.set(0,0,c[y]),l.position.set(s.x,s.y,s.z),l.lookAt(s.x,s.y+u[y],s.z)):(l.up.set(0,c[y],0),l.position.set(s.x,s.y,s.z),l.lookAt(s.x,s.y,s.z+u[y]));const M=this._cubeSize;_s(r,x*M,y>2?M:0,M,M),d.setRenderTarget(r),m&&d.render(_,l),d.render(e,l)}d.toneMapping=f,d.autoClear=h,e.background=v}_textureToCubeUV(e,t){const i=this._renderer,r=e.mapping===Xr||e.mapping===Os;r?(this._cubemapMaterial===null&&(this._cubemapMaterial=Ap()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Tp());const s=r?this._cubemapMaterial:this._equirectMaterial,o=this._lodMeshes[0];o.material=s;const a=s.uniforms;a.envMap.value=e;const l=this._cubeSize;_s(t,0,0,3*l,2*l),i.setRenderTarget(t),i.render(o,uo)}_applyPMREM(e){const t=this._renderer,i=t.autoClear;t.autoClear=!1;const r=this._lodMeshes.length;for(let s=1;s<r;s++)this._applyGGXFilter(e,s-1,s);t.autoClear=i}_applyGGXFilter(e,t,i){const r=this._renderer,s=this._pingPongRenderTarget,o=this._ggxMaterial,a=this._lodMeshes[i];a.material=o;const l=o.uniforms,c=i/(this._lodMeshes.length-1),u=t/(this._lodMeshes.length-1),d=Math.sqrt(c*c-u*u),h=0+c*1.25,f=d*h,{_lodMax:p}=this,_=this._sizeLods[i],g=3*_*(i>p-xr?i-p+xr:0),m=4*(this._cubeSize-_);l.envMap.value=e.texture,l.roughness.value=f,l.mipInt.value=p-t,_s(s,g,m,3*_,2*_),r.setRenderTarget(s),r.render(a,uo),l.envMap.value=s.texture,l.roughness.value=0,l.mipInt.value=p-i,_s(e,g,m,3*_,2*_),r.setRenderTarget(e),r.render(a,uo)}_blur(e,t,i,r,s){const o=this._pingPongRenderTarget;this._halfBlur(e,o,t,i,r,"latitudinal",s),this._halfBlur(o,e,i,i,r,"longitudinal",s)}_halfBlur(e,t,i,r,s,o,a){const l=this._renderer,c=this._blurMaterial;o!=="latitudinal"&&o!=="longitudinal"&&Qe("blur direction must be either latitudinal or longitudinal!");const u=3,d=this._lodMeshes[r];d.material=c;const h=c.uniforms,f=this._sizeLods[i]-1,p=isFinite(s)?Math.PI/(2*f):2*Math.PI/(2*Fr-1),_=s/p,g=isFinite(s)?1+Math.floor(u*_):Fr;g>Fr&&Le(`sigmaRadians, ${s}, is too large and will clip, as it requested ${g} samples when the maximum is set to ${Fr}`);const m=[];let v=0;for(let C=0;C<Fr;++C){const b=C/_,A=Math.exp(-b*b/2);m.push(A),C===0?v+=A:C<g&&(v+=2*A)}for(let C=0;C<m.length;C++)m[C]=m[C]/v;h.envMap.value=e.texture,h.samples.value=g,h.weights.value=m,h.latitudinal.value=o==="latitudinal",a&&(h.poleAxis.value=a);const{_lodMax:y}=this;h.dTheta.value=p,h.mipInt.value=y-i;const x=this._sizeLods[r],M=3*x*(r>y-xr?r-y+xr:0),E=4*(this._cubeSize-x);_s(t,M,E,3*x,2*x),l.setRenderTarget(t),l.render(d,uo)}}function _T(n){const e=[],t=[],i=[];let r=n;const s=n-xr+1+Sp.length;for(let o=0;o<s;o++){const a=Math.pow(2,r);e.push(a);let l=1/a;o>n-xr?l=Sp[o-n+xr-1]:o===0&&(l=0),t.push(l);const c=1/(a-2),u=-c,d=1+c,h=[u,u,d,u,d,d,u,u,d,d,u,d],f=6,p=6,_=3,g=2,m=1,v=new Float32Array(_*p*f),y=new Float32Array(g*p*f),x=new Float32Array(m*p*f);for(let E=0;E<f;E++){const C=E%3*2/3-1,b=E>2?0:-1,A=[C,b,0,C+2/3,b,0,C+2/3,b+1,0,C,b,0,C+2/3,b+1,0,C,b+1,0];v.set(A,_*p*E),y.set(h,g*p*E);const L=[E,E,E,E,E,E];x.set(L,m*p*E)}const M=new At;M.setAttribute("position",new Vn(v,_)),M.setAttribute("uv",new Vn(y,g)),M.setAttribute("faceIndex",new Vn(x,m)),i.push(new bi(M,null)),r>xr&&r--}return{lodMeshes:i,sizeLods:e,sigmas:t}}function wp(n,e,t){const i=new gi(n,e,t);return i.texture.mapping=Wl,i.texture.name="PMREM.cubeUv",i.scissorTest=!0,i}function _s(n,e,t,i,r){n.viewport.set(e,t,i,r),n.scissor.set(e,t,i,r)}function vT(n,e,t){return new yi({name:"PMREMGGXConvolution",defines:{GGX_SAMPLES:mT,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${n}.0`},uniforms:{envMap:{value:null},roughness:{value:0},mipInt:{value:0}},vertexShader:Xl(),fragmentShader:`

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
		`,blending:Xi,depthTest:!1,depthWrite:!1})}function xT(n,e,t){const i=new Float32Array(Fr),r=new N(0,1,0);return new yi({name:"SphericalGaussianBlur",defines:{n:Fr,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${n}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:i},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:r}},vertexShader:Xl(),fragmentShader:`

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
		`,blending:Xi,depthTest:!1,depthWrite:!1})}function Tp(){return new yi({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:Xl(),fragmentShader:`

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
		`,blending:Xi,depthTest:!1,depthWrite:!1})}function Ap(){return new yi({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Xl(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Xi,depthTest:!1,depthWrite:!1})}function Xl(){return`

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
	`}class O_ extends gi{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;const i={width:e,height:e,depth:1},r=[i,i,i,i,i,i];this.texture=new R_(r),this._setTextureOptions(t),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;const i={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},r=new $o(5,5,5),s=new yi({name:"CubemapFromEquirect",uniforms:Bs(i.uniforms),vertexShader:i.vertexShader,fragmentShader:i.fragmentShader,side:Sn,blending:Xi});s.uniforms.tEquirect.value=t;const o=new bi(r,s),a=t.minFilter;return t.minFilter===Br&&(t.minFilter=cn),new SE(1,10,this).update(e,o),t.minFilter=a,o.geometry.dispose(),o.material.dispose(),this}clear(e,t=!0,i=!0,r=!0){const s=e.getRenderTarget();for(let o=0;o<6;o++)e.setRenderTarget(this,o),e.clear(t,i,r);e.setRenderTarget(s)}}function bT(n){let e=new WeakMap,t=new WeakMap,i=null;function r(h,f=!1){return h==null?null:f?o(h):s(h)}function s(h){if(h&&h.isTexture){const f=h.mapping;if(f===bc||f===yc)if(e.has(h)){const p=e.get(h).texture;return a(p,h.mapping)}else{const p=h.image;if(p&&p.height>0){const _=new O_(p.height);return _.fromEquirectangularTexture(n,h),e.set(h,_),h.addEventListener("dispose",c),a(_.texture,h.mapping)}else return null}}return h}function o(h){if(h&&h.isTexture){const f=h.mapping,p=f===bc||f===yc,_=f===Xr||f===Os;if(p||_){let g=t.get(h);const m=g!==void 0?g.texture.pmremVersion:0;if(h.isRenderTargetTexture&&h.pmremVersion!==m)return i===null&&(i=new Mp(n)),g=p?i.fromEquirectangular(h,g):i.fromCubemap(h,g),g.texture.pmremVersion=h.pmremVersion,t.set(h,g),g.texture;if(g!==void 0)return g.texture;{const v=h.image;return p&&v&&v.height>0||_&&v&&l(v)?(i===null&&(i=new Mp(n)),g=p?i.fromEquirectangular(h):i.fromCubemap(h),g.texture.pmremVersion=h.pmremVersion,t.set(h,g),h.addEventListener("dispose",u),g.texture):null}}}return h}function a(h,f){return f===bc?h.mapping=Xr:f===yc&&(h.mapping=Os),h}function l(h){let f=0;const p=6;for(let _=0;_<p;_++)h[_]!==void 0&&f++;return f===p}function c(h){const f=h.target;f.removeEventListener("dispose",c);const p=e.get(f);p!==void 0&&(e.delete(f),p.dispose())}function u(h){const f=h.target;f.removeEventListener("dispose",u);const p=t.get(f);p!==void 0&&(t.delete(f),p.dispose())}function d(){e=new WeakMap,t=new WeakMap,i!==null&&(i.dispose(),i=null)}return{get:r,dispose:d}}function yT(n){const e={};function t(i){if(e[i]!==void 0)return e[i];const r=n.getExtension(i);return e[i]=r,r}return{has:function(i){return t(i)!==null},init:function(){t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance"),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture"),t("WEBGL_render_shared_exponent")},get:function(i){const r=t(i);return r===null&&dd("WebGLRenderer: "+i+" extension not supported."),r}}}function ST(n,e,t,i){const r={},s=new WeakMap;function o(d){const h=d.target;h.index!==null&&e.remove(h.index);for(const p in h.attributes)e.remove(h.attributes[p]);h.removeEventListener("dispose",o),delete r[h.id];const f=s.get(h);f&&(e.remove(f),s.delete(h)),i.releaseStatesOfGeometry(h),h.isInstancedBufferGeometry===!0&&delete h._maxInstanceCount,t.memory.geometries--}function a(d,h){return r[h.id]===!0||(h.addEventListener("dispose",o),r[h.id]=!0,t.memory.geometries++),h}function l(d){const h=d.attributes;for(const f in h)e.update(h[f],n.ARRAY_BUFFER)}function c(d){const h=[],f=d.index,p=d.attributes.position;let _=0;if(p===void 0)return;if(f!==null){const v=f.array;_=f.version;for(let y=0,x=v.length;y<x;y+=3){const M=v[y+0],E=v[y+1],C=v[y+2];h.push(M,E,E,C,C,M)}}else{const v=p.array;_=p.version;for(let y=0,x=v.length/3-1;y<x;y+=3){const M=y+0,E=y+1,C=y+2;h.push(M,E,E,C,C,M)}}const g=new(p.count>=65535?T_:w_)(h,1);g.version=_;const m=s.get(d);m&&e.remove(m),s.set(d,g)}function u(d){const h=s.get(d);if(h){const f=d.index;f!==null&&h.version<f.version&&c(d)}else c(d);return s.get(d)}return{get:a,update:l,getWireframeAttribute:u}}function ET(n,e,t){let i;function r(d){i=d}let s,o;function a(d){s=d.type,o=d.bytesPerElement}function l(d,h){n.drawElements(i,h,s,d*o),t.update(h,i,1)}function c(d,h,f){f!==0&&(n.drawElementsInstanced(i,h,s,d*o,f),t.update(h,i,f))}function u(d,h,f){if(f===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(i,h,0,s,d,0,f);let _=0;for(let g=0;g<f;g++)_+=h[g];t.update(_,i,1)}this.setMode=r,this.setIndex=a,this.render=l,this.renderInstances=c,this.renderMultiDraw=u}function MT(n){const e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function i(s,o,a){switch(t.calls++,o){case n.TRIANGLES:t.triangles+=a*(s/3);break;case n.LINES:t.lines+=a*(s/2);break;case n.LINE_STRIP:t.lines+=a*(s-1);break;case n.LINE_LOOP:t.lines+=a*s;break;case n.POINTS:t.points+=a*s;break;default:Qe("WebGLInfo: Unknown draw mode:",o);break}}function r(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:r,update:i}}function wT(n,e,t){const i=new WeakMap,r=new zt;function s(o,a,l){const c=o.morphTargetInfluences,u=a.morphAttributes.position||a.morphAttributes.normal||a.morphAttributes.color,d=u!==void 0?u.length:0;let h=i.get(a);if(h===void 0||h.count!==d){let A=function(){C.dispose(),i.delete(a),a.removeEventListener("dispose",A)};h!==void 0&&h.texture.dispose();const f=a.morphAttributes.position!==void 0,p=a.morphAttributes.normal!==void 0,_=a.morphAttributes.color!==void 0,g=a.morphAttributes.position||[],m=a.morphAttributes.normal||[],v=a.morphAttributes.color||[];let y=0;f===!0&&(y=1),p===!0&&(y=2),_===!0&&(y=3);let x=a.attributes.position.count*y,M=1;x>e.maxTextureSize&&(M=Math.ceil(x/e.maxTextureSize),x=e.maxTextureSize);const E=new Float32Array(x*M*4*d),C=new E_(E,x,M,d);C.type=fi,C.needsUpdate=!0;const b=y*4;for(let L=0;L<d;L++){const P=g[L],F=m[L],$=v[L],W=x*M*4*L;for(let I=0;I<P.count;I++){const B=I*b;f===!0&&(r.fromBufferAttribute(P,I),E[W+B+0]=r.x,E[W+B+1]=r.y,E[W+B+2]=r.z,E[W+B+3]=0),p===!0&&(r.fromBufferAttribute(F,I),E[W+B+4]=r.x,E[W+B+5]=r.y,E[W+B+6]=r.z,E[W+B+7]=0),_===!0&&(r.fromBufferAttribute($,I),E[W+B+8]=r.x,E[W+B+9]=r.y,E[W+B+10]=r.z,E[W+B+11]=$.itemSize===4?r.w:1)}}h={count:d,texture:C,size:new We(x,M)},i.set(a,h),a.addEventListener("dispose",A)}if(o.isInstancedMesh===!0&&o.morphTexture!==null)l.getUniforms().setValue(n,"morphTexture",o.morphTexture,t);else{let f=0;for(let _=0;_<c.length;_++)f+=c[_];const p=a.morphTargetsRelative?1:1-f;l.getUniforms().setValue(n,"morphTargetBaseInfluence",p),l.getUniforms().setValue(n,"morphTargetInfluences",c)}l.getUniforms().setValue(n,"morphTargetsTexture",h.texture,t),l.getUniforms().setValue(n,"morphTargetsTextureSize",h.size)}return{update:s}}function TT(n,e,t,i,r){let s=new WeakMap;function o(c){const u=r.render.frame,d=c.geometry,h=e.get(c,d);if(s.get(h)!==u&&(e.update(h),s.set(h,u)),c.isInstancedMesh&&(c.hasEventListener("dispose",l)===!1&&c.addEventListener("dispose",l),s.get(c)!==u&&(t.update(c.instanceMatrix,n.ARRAY_BUFFER),c.instanceColor!==null&&t.update(c.instanceColor,n.ARRAY_BUFFER),s.set(c,u))),c.isSkinnedMesh){const f=c.skeleton;s.get(f)!==u&&(f.update(),s.set(f,u))}return h}function a(){s=new WeakMap}function l(c){const u=c.target;u.removeEventListener("dispose",l),i.releaseStatesOfObject(u),t.remove(u.instanceMatrix),u.instanceColor!==null&&t.remove(u.instanceColor)}return{update:o,dispose:a}}const AT={[a_]:"LINEAR_TONE_MAPPING",[l_]:"REINHARD_TONE_MAPPING",[c_]:"CINEON_TONE_MAPPING",[u_]:"ACES_FILMIC_TONE_MAPPING",[h_]:"AGX_TONE_MAPPING",[f_]:"NEUTRAL_TONE_MAPPING",[d_]:"CUSTOM_TONE_MAPPING"};function CT(n,e,t,i,r){const s=new gi(e,t,{type:n,depthBuffer:i,stencilBuffer:r,depthTexture:i?new ks(e,t):void 0}),o=new gi(e,t,{type:qi,depthBuffer:!1,stencilBuffer:!1}),a=new At;a.setAttribute("position",new Et([-1,3,0,-1,-1,0,3,-1,0],3)),a.setAttribute("uv",new Et([0,2,0,0,2,0],2));const l=new vE({uniforms:{tDiffuse:{value:null}},vertexShader:`
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
			}`,depthTest:!1,depthWrite:!1}),c=new bi(a,l),u=new I_(-1,1,1,-1,0,1);let d=null,h=null,f=!1,p,_=null,g=[],m=!1;this.setSize=function(v,y){s.setSize(v,y),o.setSize(v,y);for(let x=0;x<g.length;x++){const M=g[x];M.setSize&&M.setSize(v,y)}},this.setEffects=function(v){g=v,m=g.length>0&&g[0].isRenderPass===!0;const y=s.width,x=s.height;for(let M=0;M<g.length;M++){const E=g[M];E.setSize&&E.setSize(y,x)}},this.begin=function(v,y){if(f||v.toneMapping===mi&&g.length===0)return!1;if(_=y,y!==null){const x=y.width,M=y.height;(s.width!==x||s.height!==M)&&this.setSize(x,M)}return m===!1&&v.setRenderTarget(s),p=v.toneMapping,v.toneMapping=mi,!0},this.hasRenderPass=function(){return m},this.end=function(v,y){v.toneMapping=p,f=!0;let x=s,M=o;for(let E=0;E<g.length;E++){const C=g[E];if(C.enabled!==!1&&(C.render(v,M,x,y),C.needsSwap!==!1)){const b=x;x=M,M=b}}if(d!==v.outputColorSpace||h!==v.toneMapping){d=v.outputColorSpace,h=v.toneMapping,l.defines={},Je.getTransfer(d)===dt&&(l.defines.SRGB_TRANSFER="");const E=AT[h];E&&(l.defines[E]=""),l.needsUpdate=!0}l.uniforms.tDiffuse.value=x.texture,v.setRenderTarget(_),v.render(c,u),_=null,f=!1},this.isCompositing=function(){return f},this.dispose=function(){s.depthTexture&&s.depthTexture.dispose(),s.dispose(),o.dispose(),a.dispose(),l.dispose()}}const k_=new un,gd=new ks(1,1),B_=new E_,z_=new YS,G_=new R_,Cp=[],Rp=[],Pp=new Float32Array(16),Lp=new Float32Array(9),Dp=new Float32Array(4);function Ys(n,e,t){const i=n[0];if(i<=0||i>0)return n;const r=e*t;let s=Cp[r];if(s===void 0&&(s=new Float32Array(r),Cp[r]=s),e!==0){i.toArray(s,0);for(let o=1,a=0;o!==e;++o)a+=t,n[o].toArray(s,a)}return s}function Kt(n,e){if(n.length!==e.length)return!1;for(let t=0,i=n.length;t<i;t++)if(n[t]!==e[t])return!1;return!0}function Zt(n,e){for(let t=0,i=e.length;t<i;t++)n[t]=e[t]}function jl(n,e){let t=Rp[e];t===void 0&&(t=new Int32Array(e),Rp[e]=t);for(let i=0;i!==e;++i)t[i]=n.allocateTextureUnit();return t}function RT(n,e){const t=this.cache;t[0]!==e&&(n.uniform1f(this.addr,e),t[0]=e)}function PT(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Kt(t,e))return;n.uniform2fv(this.addr,e),Zt(t,e)}}function LT(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(n.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(Kt(t,e))return;n.uniform3fv(this.addr,e),Zt(t,e)}}function DT(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Kt(t,e))return;n.uniform4fv(this.addr,e),Zt(t,e)}}function NT(n,e){const t=this.cache,i=e.elements;if(i===void 0){if(Kt(t,e))return;n.uniformMatrix2fv(this.addr,!1,e),Zt(t,e)}else{if(Kt(t,i))return;Dp.set(i),n.uniformMatrix2fv(this.addr,!1,Dp),Zt(t,i)}}function IT(n,e){const t=this.cache,i=e.elements;if(i===void 0){if(Kt(t,e))return;n.uniformMatrix3fv(this.addr,!1,e),Zt(t,e)}else{if(Kt(t,i))return;Lp.set(i),n.uniformMatrix3fv(this.addr,!1,Lp),Zt(t,i)}}function UT(n,e){const t=this.cache,i=e.elements;if(i===void 0){if(Kt(t,e))return;n.uniformMatrix4fv(this.addr,!1,e),Zt(t,e)}else{if(Kt(t,i))return;Pp.set(i),n.uniformMatrix4fv(this.addr,!1,Pp),Zt(t,i)}}function FT(n,e){const t=this.cache;t[0]!==e&&(n.uniform1i(this.addr,e),t[0]=e)}function OT(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Kt(t,e))return;n.uniform2iv(this.addr,e),Zt(t,e)}}function kT(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Kt(t,e))return;n.uniform3iv(this.addr,e),Zt(t,e)}}function BT(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Kt(t,e))return;n.uniform4iv(this.addr,e),Zt(t,e)}}function zT(n,e){const t=this.cache;t[0]!==e&&(n.uniform1ui(this.addr,e),t[0]=e)}function GT(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Kt(t,e))return;n.uniform2uiv(this.addr,e),Zt(t,e)}}function HT(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Kt(t,e))return;n.uniform3uiv(this.addr,e),Zt(t,e)}}function VT(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Kt(t,e))return;n.uniform4uiv(this.addr,e),Zt(t,e)}}function WT(n,e,t){const i=this.cache,r=t.allocateTextureUnit();i[0]!==r&&(n.uniform1i(this.addr,r),i[0]=r);let s;this.type===n.SAMPLER_2D_SHADOW?(gd.compareFunction=t.isReversedDepthBuffer()?ih:nh,s=gd):s=k_,t.setTexture2D(e||s,r)}function $T(n,e,t){const i=this.cache,r=t.allocateTextureUnit();i[0]!==r&&(n.uniform1i(this.addr,r),i[0]=r),t.setTexture3D(e||z_,r)}function XT(n,e,t){const i=this.cache,r=t.allocateTextureUnit();i[0]!==r&&(n.uniform1i(this.addr,r),i[0]=r),t.setTextureCube(e||G_,r)}function jT(n,e,t){const i=this.cache,r=t.allocateTextureUnit();i[0]!==r&&(n.uniform1i(this.addr,r),i[0]=r),t.setTexture2DArray(e||B_,r)}function YT(n){switch(n){case 5126:return RT;case 35664:return PT;case 35665:return LT;case 35666:return DT;case 35674:return NT;case 35675:return IT;case 35676:return UT;case 5124:case 35670:return FT;case 35667:case 35671:return OT;case 35668:case 35672:return kT;case 35669:case 35673:return BT;case 5125:return zT;case 36294:return GT;case 36295:return HT;case 36296:return VT;case 35678:case 36198:case 36298:case 36306:case 35682:return WT;case 35679:case 36299:case 36307:return $T;case 35680:case 36300:case 36308:case 36293:return XT;case 36289:case 36303:case 36311:case 36292:return jT}}function qT(n,e){n.uniform1fv(this.addr,e)}function KT(n,e){const t=Ys(e,this.size,2);n.uniform2fv(this.addr,t)}function ZT(n,e){const t=Ys(e,this.size,3);n.uniform3fv(this.addr,t)}function JT(n,e){const t=Ys(e,this.size,4);n.uniform4fv(this.addr,t)}function QT(n,e){const t=Ys(e,this.size,4);n.uniformMatrix2fv(this.addr,!1,t)}function eA(n,e){const t=Ys(e,this.size,9);n.uniformMatrix3fv(this.addr,!1,t)}function tA(n,e){const t=Ys(e,this.size,16);n.uniformMatrix4fv(this.addr,!1,t)}function nA(n,e){n.uniform1iv(this.addr,e)}function iA(n,e){n.uniform2iv(this.addr,e)}function rA(n,e){n.uniform3iv(this.addr,e)}function sA(n,e){n.uniform4iv(this.addr,e)}function oA(n,e){n.uniform1uiv(this.addr,e)}function aA(n,e){n.uniform2uiv(this.addr,e)}function lA(n,e){n.uniform3uiv(this.addr,e)}function cA(n,e){n.uniform4uiv(this.addr,e)}function uA(n,e,t){const i=this.cache,r=e.length,s=jl(t,r);Kt(i,s)||(n.uniform1iv(this.addr,s),Zt(i,s));let o;this.type===n.SAMPLER_2D_SHADOW?o=gd:o=k_;for(let a=0;a!==r;++a)t.setTexture2D(e[a]||o,s[a])}function dA(n,e,t){const i=this.cache,r=e.length,s=jl(t,r);Kt(i,s)||(n.uniform1iv(this.addr,s),Zt(i,s));for(let o=0;o!==r;++o)t.setTexture3D(e[o]||z_,s[o])}function hA(n,e,t){const i=this.cache,r=e.length,s=jl(t,r);Kt(i,s)||(n.uniform1iv(this.addr,s),Zt(i,s));for(let o=0;o!==r;++o)t.setTextureCube(e[o]||G_,s[o])}function fA(n,e,t){const i=this.cache,r=e.length,s=jl(t,r);Kt(i,s)||(n.uniform1iv(this.addr,s),Zt(i,s));for(let o=0;o!==r;++o)t.setTexture2DArray(e[o]||B_,s[o])}function pA(n){switch(n){case 5126:return qT;case 35664:return KT;case 35665:return ZT;case 35666:return JT;case 35674:return QT;case 35675:return eA;case 35676:return tA;case 5124:case 35670:return nA;case 35667:case 35671:return iA;case 35668:case 35672:return rA;case 35669:case 35673:return sA;case 5125:return oA;case 36294:return aA;case 36295:return lA;case 36296:return cA;case 35678:case 36198:case 36298:case 36306:case 35682:return uA;case 35679:case 36299:case 36307:return dA;case 35680:case 36300:case 36308:case 36293:return hA;case 36289:case 36303:case 36311:case 36292:return fA}}class mA{constructor(e,t,i){this.id=e,this.addr=i,this.cache=[],this.type=t.type,this.setValue=YT(t.type)}}class gA{constructor(e,t,i){this.id=e,this.addr=i,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=pA(t.type)}}class _A{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,i){const r=this.seq;for(let s=0,o=r.length;s!==o;++s){const a=r[s];a.setValue(e,t[a.id],i)}}}const eu=/(\w+)(\])?(\[|\.)?/g;function Np(n,e){n.seq.push(e),n.map[e.id]=e}function vA(n,e,t){const i=n.name,r=i.length;for(eu.lastIndex=0;;){const s=eu.exec(i),o=eu.lastIndex;let a=s[1];const l=s[2]==="]",c=s[3];if(l&&(a=a|0),c===void 0||c==="["&&o+2===r){Np(t,c===void 0?new mA(a,n,e):new gA(a,n,e));break}else{let d=t.map[a];d===void 0&&(d=new _A(a),Np(t,d)),t=d}}}class Ya{constructor(e,t){this.seq=[],this.map={};const i=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let o=0;o<i;++o){const a=e.getActiveUniform(t,o),l=e.getUniformLocation(t,a.name);vA(a,l,this)}const r=[],s=[];for(const o of this.seq)o.type===e.SAMPLER_2D_SHADOW||o.type===e.SAMPLER_CUBE_SHADOW||o.type===e.SAMPLER_2D_ARRAY_SHADOW?r.push(o):s.push(o);r.length>0&&(this.seq=r.concat(s))}setValue(e,t,i,r){const s=this.map[t];s!==void 0&&s.setValue(e,i,r)}setOptional(e,t,i){const r=t[i];r!==void 0&&this.setValue(e,i,r)}static upload(e,t,i,r){for(let s=0,o=t.length;s!==o;++s){const a=t[s],l=i[a.id];l.needsUpdate!==!1&&a.setValue(e,l.value,r)}}static seqWithValue(e,t){const i=[];for(let r=0,s=e.length;r!==s;++r){const o=e[r];o.id in t&&i.push(o)}return i}}function Ip(n,e,t){const i=n.createShader(e);return n.shaderSource(i,t),n.compileShader(i),i}const xA=37297;let bA=0;function yA(n,e){const t=n.split(`
`),i=[],r=Math.max(e-6,0),s=Math.min(e+6,t.length);for(let o=r;o<s;o++){const a=o+1;i.push(`${a===e?">":" "} ${a}: ${t[o]}`)}return i.join(`
`)}const Up=new ze;function SA(n){Je._getMatrix(Up,Je.workingColorSpace,n);const e=`mat3( ${Up.elements.map(t=>t.toFixed(4))} )`;switch(Je.getTransfer(n)){case gl:return[e,"LinearTransferOETF"];case dt:return[e,"sRGBTransferOETF"];default:return Le("WebGLProgram: Unsupported color space: ",n),[e,"LinearTransferOETF"]}}function Fp(n,e,t){const i=n.getShaderParameter(e,n.COMPILE_STATUS),s=(n.getShaderInfoLog(e)||"").trim();if(i&&s==="")return"";const o=/ERROR: 0:(\d+)/.exec(s);if(o){const a=parseInt(o[1]);return t.toUpperCase()+`

`+s+`

`+yA(n.getShaderSource(e),a)}else return s}function EA(n,e){const t=SA(e);return[`vec4 ${n}( vec4 value ) {`,`	return ${t[1]}( vec4( value.rgb * ${t[0]}, value.a ) );`,"}"].join(`
`)}const MA={[a_]:"Linear",[l_]:"Reinhard",[c_]:"Cineon",[u_]:"ACESFilmic",[h_]:"AgX",[f_]:"Neutral",[d_]:"Custom"};function wA(n,e){const t=MA[e];return t===void 0?(Le("WebGLProgram: Unsupported toneMapping:",e),"vec3 "+n+"( vec3 color ) { return LinearToneMapping( color ); }"):"vec3 "+n+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}const Da=new N;function TA(){Je.getLuminanceCoefficients(Da);const n=Da.x.toFixed(4),e=Da.y.toFixed(4),t=Da.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${n}, ${e}, ${t} );`,"	return dot( weights, rgb );","}"].join(`
`)}function AA(n){return[n.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",n.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(mo).join(`
`)}function CA(n){const e=[];for(const t in n){const i=n[t];i!==!1&&e.push("#define "+t+" "+i)}return e.join(`
`)}function RA(n,e){const t={},i=n.getProgramParameter(e,n.ACTIVE_ATTRIBUTES);for(let r=0;r<i;r++){const s=n.getActiveAttrib(e,r),o=s.name;let a=1;s.type===n.FLOAT_MAT2&&(a=2),s.type===n.FLOAT_MAT3&&(a=3),s.type===n.FLOAT_MAT4&&(a=4),t[o]={type:s.type,location:n.getAttribLocation(e,o),locationSize:a}}return t}function mo(n){return n!==""}function Op(n,e){const t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return n.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function kp(n,e){return n.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}const PA=/^[ \t]*#include +<([\w\d./]+)>/gm;function _d(n){return n.replace(PA,DA)}const LA=new Map;function DA(n,e){let t=$e[e];if(t===void 0){const i=LA.get(e);if(i!==void 0)t=$e[i],Le('WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,i);else throw new Error("Can not resolve #include <"+e+">")}return _d(t)}const NA=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Bp(n){return n.replace(NA,IA)}function IA(n,e,t,i){let r="";for(let s=parseInt(e);s<parseInt(t);s++)r+=i.replace(/\[\s*i\s*\]/g,"[ "+s+" ]").replace(/UNROLLED_LOOP_INDEX/g,s);return r}function zp(n){let e=`precision ${n.precision} float;
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
#define LOW_PRECISION`),e}const UA={[Ha]:"SHADOWMAP_TYPE_PCF",[po]:"SHADOWMAP_TYPE_VSM"};function FA(n){return UA[n.shadowMapType]||"SHADOWMAP_TYPE_BASIC"}const OA={[Xr]:"ENVMAP_TYPE_CUBE",[Os]:"ENVMAP_TYPE_CUBE",[Wl]:"ENVMAP_TYPE_CUBE_UV"};function kA(n){return n.envMap===!1?"ENVMAP_TYPE_CUBE":OA[n.envMapMode]||"ENVMAP_TYPE_CUBE"}const BA={[Os]:"ENVMAP_MODE_REFRACTION"};function zA(n){return n.envMap===!1?"ENVMAP_MODE_REFLECTION":BA[n.envMapMode]||"ENVMAP_MODE_REFLECTION"}const GA={[o_]:"ENVMAP_BLENDING_MULTIPLY",[TS]:"ENVMAP_BLENDING_MIX",[AS]:"ENVMAP_BLENDING_ADD"};function HA(n){return n.envMap===!1?"ENVMAP_BLENDING_NONE":GA[n.combine]||"ENVMAP_BLENDING_NONE"}function VA(n){const e=n.envMapCubeUVHeight;if(e===null)return null;const t=Math.log2(e)-2,i=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),112)),texelHeight:i,maxMip:t}}function WA(n,e,t,i){const r=n.getContext(),s=t.defines;let o=t.vertexShader,a=t.fragmentShader;const l=FA(t),c=kA(t),u=zA(t),d=HA(t),h=VA(t),f=AA(t),p=CA(s),_=r.createProgram();let g,m,v=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(g=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,p].filter(mo).join(`
`),g.length>0&&(g+=`
`),m=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,p].filter(mo).join(`
`),m.length>0&&(m+=`
`)):(g=[zp(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,p,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.batchingColor?"#define USE_BATCHING_COLOR":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+u:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexNormals?"#define HAS_NORMAL":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(mo).join(`
`),m=[zp(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,p,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+c:"",t.envMap?"#define "+u:"",t.envMap?"#define "+d:"",h?"#define CUBEUV_TEXEL_WIDTH "+h.texelWidth:"",h?"#define CUBEUV_TEXEL_HEIGHT "+h.texelHeight:"",h?"#define CUBEUV_MAX_MIP "+h.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.packedNormalMap?"#define USE_PACKED_NORMALMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.dispersion?"#define USE_DISPERSION":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor?"#define USE_COLOR":"",t.vertexAlphas||t.batchingColor?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.numLightProbeGrids>0?"#define USE_LIGHT_PROBES_GRID":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==mi?"#define TONE_MAPPING":"",t.toneMapping!==mi?$e.tonemapping_pars_fragment:"",t.toneMapping!==mi?wA("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",$e.colorspace_pars_fragment,EA("linearToOutputTexel",t.outputColorSpace),TA(),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(mo).join(`
`)),o=_d(o),o=Op(o,t),o=kp(o,t),a=_d(a),a=Op(a,t),a=kp(a,t),o=Bp(o),a=Bp(a),t.isRawShaderMaterial!==!0&&(v=`#version 300 es
`,g=[f,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+g,m=["#define varying in",t.glslVersion===Vf?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===Vf?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+m);const y=v+g+o,x=v+m+a,M=Ip(r,r.VERTEX_SHADER,y),E=Ip(r,r.FRAGMENT_SHADER,x);r.attachShader(_,M),r.attachShader(_,E),t.index0AttributeName!==void 0?r.bindAttribLocation(_,0,t.index0AttributeName):t.morphTargets===!0&&r.bindAttribLocation(_,0,"position"),r.linkProgram(_);function C(P){if(n.debug.checkShaderErrors){const F=r.getProgramInfoLog(_)||"",$=r.getShaderInfoLog(M)||"",W=r.getShaderInfoLog(E)||"",I=F.trim(),B=$.trim(),H=W.trim();let Z=!0,J=!0;if(r.getProgramParameter(_,r.LINK_STATUS)===!1)if(Z=!1,typeof n.debug.onShaderError=="function")n.debug.onShaderError(r,_,M,E);else{const ne=Fp(r,M,"vertex"),de=Fp(r,E,"fragment");Qe("THREE.WebGLProgram: Shader Error "+r.getError()+" - VALIDATE_STATUS "+r.getProgramParameter(_,r.VALIDATE_STATUS)+`

Material Name: `+P.name+`
Material Type: `+P.type+`

Program Info Log: `+I+`
`+ne+`
`+de)}else I!==""?Le("WebGLProgram: Program Info Log:",I):(B===""||H==="")&&(J=!1);J&&(P.diagnostics={runnable:Z,programLog:I,vertexShader:{log:B,prefix:g},fragmentShader:{log:H,prefix:m}})}r.deleteShader(M),r.deleteShader(E),b=new Ya(r,_),A=RA(r,_)}let b;this.getUniforms=function(){return b===void 0&&C(this),b};let A;this.getAttributes=function(){return A===void 0&&C(this),A};let L=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return L===!1&&(L=r.getProgramParameter(_,xA)),L},this.destroy=function(){i.releaseStatesOfProgram(this),r.deleteProgram(_),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=bA++,this.cacheKey=e,this.usedTimes=1,this.program=_,this.vertexShader=M,this.fragmentShader=E,this}let $A=0;class XA{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e){const t=e.vertexShader,i=e.fragmentShader,r=this._getShaderStage(t),s=this._getShaderStage(i),o=this._getShaderCacheForMaterial(e);return o.has(r)===!1&&(o.add(r),r.usedTimes++),o.has(s)===!1&&(o.add(s),s.usedTimes++),this}remove(e){const t=this.materialCache.get(e);for(const i of t)i.usedTimes--,i.usedTimes===0&&this.shaderCache.delete(i.code);return this.materialCache.delete(e),this}getVertexShaderID(e){return this._getShaderStage(e.vertexShader).id}getFragmentShaderID(e){return this._getShaderStage(e.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){const t=this.materialCache;let i=t.get(e);return i===void 0&&(i=new Set,t.set(e,i)),i}_getShaderStage(e){const t=this.shaderCache;let i=t.get(e);return i===void 0&&(i=new jA(e),t.set(e,i)),i}}class jA{constructor(e){this.id=$A++,this.code=e,this.usedTimes=0}}function YA(n){return n===jr||n===fl||n===pl}function qA(n,e,t,i,r,s){const o=new sh,a=new XA,l=new Set,c=[],u=new Map,d=i.logarithmicDepthBuffer;let h=i.precision;const f={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distance",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function p(b){return l.add(b),b===0?"uv":`uv${b}`}function _(b,A,L,P,F,$){const W=P.fog,I=F.geometry,B=b.isMeshStandardMaterial||b.isMeshLambertMaterial||b.isMeshPhongMaterial?P.environment:null,H=b.isMeshStandardMaterial||b.isMeshLambertMaterial&&!b.envMap||b.isMeshPhongMaterial&&!b.envMap,Z=e.get(b.envMap||B,H),J=Z&&Z.mapping===Wl?Z.image.height:null,ne=f[b.type];b.precision!==null&&(h=i.getMaxPrecision(b.precision),h!==b.precision&&Le("WebGLProgram.getParameters:",b.precision,"not supported, using",h,"instead."));const de=I.morphAttributes.position||I.morphAttributes.normal||I.morphAttributes.color,ye=de!==void 0?de.length:0;let Fe=0;I.morphAttributes.position!==void 0&&(Fe=1),I.morphAttributes.normal!==void 0&&(Fe=2),I.morphAttributes.color!==void 0&&(Fe=3);let tt,Ie,q,pe;if(ne){const Ge=di[ne];tt=Ge.vertexShader,Ie=Ge.fragmentShader}else tt=b.vertexShader,Ie=b.fragmentShader,a.update(b),q=a.getVertexShaderID(b),pe=a.getFragmentShaderID(b);const ie=n.getRenderTarget(),Ce=n.state.buffers.depth.getReversed(),Oe=F.isInstancedMesh===!0,Ne=F.isBatchedMesh===!0,bt=!!b.map,je=!!b.matcap,at=!!Z,gt=!!b.aoMap,Ye=!!b.lightMap,$t=!!b.bumpMap,wt=!!b.normalMap,Mn=!!b.displacementMap,U=!!b.emissiveMap,Xt=!!b.metalnessMap,Ze=!!b.roughnessMap,yt=b.anisotropy>0,he=b.clearcoat>0,Rt=b.dispersion>0,R=b.iridescence>0,S=b.sheen>0,k=b.transmission>0,Y=yt&&!!b.anisotropyMap,te=he&&!!b.clearcoatMap,re=he&&!!b.clearcoatNormalMap,ue=he&&!!b.clearcoatRoughnessMap,X=R&&!!b.iridescenceMap,K=R&&!!b.iridescenceThicknessMap,_e=S&&!!b.sheenColorMap,Se=S&&!!b.sheenRoughnessMap,le=!!b.specularMap,se=!!b.specularColorMap,Be=!!b.specularIntensityMap,Ve=k&&!!b.transmissionMap,rt=k&&!!b.thicknessMap,D=!!b.gradientMap,oe=!!b.alphaMap,j=b.alphaTest>0,xe=!!b.alphaHash,ce=!!b.extensions;let ee=mi;b.toneMapped&&(ie===null||ie.isXRRenderTarget===!0)&&(ee=n.toneMapping);const Te={shaderID:ne,shaderType:b.type,shaderName:b.name,vertexShader:tt,fragmentShader:Ie,defines:b.defines,customVertexShaderID:q,customFragmentShaderID:pe,isRawShaderMaterial:b.isRawShaderMaterial===!0,glslVersion:b.glslVersion,precision:h,batching:Ne,batchingColor:Ne&&F._colorsTexture!==null,instancing:Oe,instancingColor:Oe&&F.instanceColor!==null,instancingMorph:Oe&&F.morphTexture!==null,outputColorSpace:ie===null?n.outputColorSpace:ie.isXRRenderTarget===!0?ie.texture.colorSpace:Je.workingColorSpace,alphaToCoverage:!!b.alphaToCoverage,map:bt,matcap:je,envMap:at,envMapMode:at&&Z.mapping,envMapCubeUVHeight:J,aoMap:gt,lightMap:Ye,bumpMap:$t,normalMap:wt,displacementMap:Mn,emissiveMap:U,normalMapObjectSpace:wt&&b.normalMapType===PS,normalMapTangentSpace:wt&&b.normalMapType===zf,packedNormalMap:wt&&b.normalMapType===zf&&YA(b.normalMap.format),metalnessMap:Xt,roughnessMap:Ze,anisotropy:yt,anisotropyMap:Y,clearcoat:he,clearcoatMap:te,clearcoatNormalMap:re,clearcoatRoughnessMap:ue,dispersion:Rt,iridescence:R,iridescenceMap:X,iridescenceThicknessMap:K,sheen:S,sheenColorMap:_e,sheenRoughnessMap:Se,specularMap:le,specularColorMap:se,specularIntensityMap:Be,transmission:k,transmissionMap:Ve,thicknessMap:rt,gradientMap:D,opaque:b.transparent===!1&&b.blending===Rs&&b.alphaToCoverage===!1,alphaMap:oe,alphaTest:j,alphaHash:xe,combine:b.combine,mapUv:bt&&p(b.map.channel),aoMapUv:gt&&p(b.aoMap.channel),lightMapUv:Ye&&p(b.lightMap.channel),bumpMapUv:$t&&p(b.bumpMap.channel),normalMapUv:wt&&p(b.normalMap.channel),displacementMapUv:Mn&&p(b.displacementMap.channel),emissiveMapUv:U&&p(b.emissiveMap.channel),metalnessMapUv:Xt&&p(b.metalnessMap.channel),roughnessMapUv:Ze&&p(b.roughnessMap.channel),anisotropyMapUv:Y&&p(b.anisotropyMap.channel),clearcoatMapUv:te&&p(b.clearcoatMap.channel),clearcoatNormalMapUv:re&&p(b.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:ue&&p(b.clearcoatRoughnessMap.channel),iridescenceMapUv:X&&p(b.iridescenceMap.channel),iridescenceThicknessMapUv:K&&p(b.iridescenceThicknessMap.channel),sheenColorMapUv:_e&&p(b.sheenColorMap.channel),sheenRoughnessMapUv:Se&&p(b.sheenRoughnessMap.channel),specularMapUv:le&&p(b.specularMap.channel),specularColorMapUv:se&&p(b.specularColorMap.channel),specularIntensityMapUv:Be&&p(b.specularIntensityMap.channel),transmissionMapUv:Ve&&p(b.transmissionMap.channel),thicknessMapUv:rt&&p(b.thicknessMap.channel),alphaMapUv:oe&&p(b.alphaMap.channel),vertexTangents:!!I.attributes.tangent&&(wt||yt),vertexNormals:!!I.attributes.normal,vertexColors:b.vertexColors,vertexAlphas:b.vertexColors===!0&&!!I.attributes.color&&I.attributes.color.itemSize===4,pointsUvs:F.isPoints===!0&&!!I.attributes.uv&&(bt||oe),fog:!!W,useFog:b.fog===!0,fogExp2:!!W&&W.isFogExp2,flatShading:b.wireframe===!1&&(b.flatShading===!0||I.attributes.normal===void 0&&wt===!1&&(b.isMeshLambertMaterial||b.isMeshPhongMaterial||b.isMeshStandardMaterial||b.isMeshPhysicalMaterial)),sizeAttenuation:b.sizeAttenuation===!0,logarithmicDepthBuffer:d,reversedDepthBuffer:Ce,skinning:F.isSkinnedMesh===!0,morphTargets:I.morphAttributes.position!==void 0,morphNormals:I.morphAttributes.normal!==void 0,morphColors:I.morphAttributes.color!==void 0,morphTargetsCount:ye,morphTextureStride:Fe,numDirLights:A.directional.length,numPointLights:A.point.length,numSpotLights:A.spot.length,numSpotLightMaps:A.spotLightMap.length,numRectAreaLights:A.rectArea.length,numHemiLights:A.hemi.length,numDirLightShadows:A.directionalShadowMap.length,numPointLightShadows:A.pointShadowMap.length,numSpotLightShadows:A.spotShadowMap.length,numSpotLightShadowsWithMaps:A.numSpotLightShadowsWithMaps,numLightProbes:A.numLightProbes,numLightProbeGrids:$.length,numClippingPlanes:s.numPlanes,numClipIntersection:s.numIntersection,dithering:b.dithering,shadowMapEnabled:n.shadowMap.enabled&&L.length>0,shadowMapType:n.shadowMap.type,toneMapping:ee,decodeVideoTexture:bt&&b.map.isVideoTexture===!0&&Je.getTransfer(b.map.colorSpace)===dt,decodeVideoTextureEmissive:U&&b.emissiveMap.isVideoTexture===!0&&Je.getTransfer(b.emissiveMap.colorSpace)===dt,premultipliedAlpha:b.premultipliedAlpha,doubleSided:b.side===Ui,flipSided:b.side===Sn,useDepthPacking:b.depthPacking>=0,depthPacking:b.depthPacking||0,index0AttributeName:b.index0AttributeName,extensionClipCullDistance:ce&&b.extensions.clipCullDistance===!0&&t.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(ce&&b.extensions.multiDraw===!0||Ne)&&t.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:t.has("KHR_parallel_shader_compile"),customProgramCacheKey:b.customProgramCacheKey()};return Te.vertexUv1s=l.has(1),Te.vertexUv2s=l.has(2),Te.vertexUv3s=l.has(3),l.clear(),Te}function g(b){const A=[];if(b.shaderID?A.push(b.shaderID):(A.push(b.customVertexShaderID),A.push(b.customFragmentShaderID)),b.defines!==void 0)for(const L in b.defines)A.push(L),A.push(b.defines[L]);return b.isRawShaderMaterial===!1&&(m(A,b),v(A,b),A.push(n.outputColorSpace)),A.push(b.customProgramCacheKey),A.join()}function m(b,A){b.push(A.precision),b.push(A.outputColorSpace),b.push(A.envMapMode),b.push(A.envMapCubeUVHeight),b.push(A.mapUv),b.push(A.alphaMapUv),b.push(A.lightMapUv),b.push(A.aoMapUv),b.push(A.bumpMapUv),b.push(A.normalMapUv),b.push(A.displacementMapUv),b.push(A.emissiveMapUv),b.push(A.metalnessMapUv),b.push(A.roughnessMapUv),b.push(A.anisotropyMapUv),b.push(A.clearcoatMapUv),b.push(A.clearcoatNormalMapUv),b.push(A.clearcoatRoughnessMapUv),b.push(A.iridescenceMapUv),b.push(A.iridescenceThicknessMapUv),b.push(A.sheenColorMapUv),b.push(A.sheenRoughnessMapUv),b.push(A.specularMapUv),b.push(A.specularColorMapUv),b.push(A.specularIntensityMapUv),b.push(A.transmissionMapUv),b.push(A.thicknessMapUv),b.push(A.combine),b.push(A.fogExp2),b.push(A.sizeAttenuation),b.push(A.morphTargetsCount),b.push(A.morphAttributeCount),b.push(A.numDirLights),b.push(A.numPointLights),b.push(A.numSpotLights),b.push(A.numSpotLightMaps),b.push(A.numHemiLights),b.push(A.numRectAreaLights),b.push(A.numDirLightShadows),b.push(A.numPointLightShadows),b.push(A.numSpotLightShadows),b.push(A.numSpotLightShadowsWithMaps),b.push(A.numLightProbes),b.push(A.shadowMapType),b.push(A.toneMapping),b.push(A.numClippingPlanes),b.push(A.numClipIntersection),b.push(A.depthPacking)}function v(b,A){o.disableAll(),A.instancing&&o.enable(0),A.instancingColor&&o.enable(1),A.instancingMorph&&o.enable(2),A.matcap&&o.enable(3),A.envMap&&o.enable(4),A.normalMapObjectSpace&&o.enable(5),A.normalMapTangentSpace&&o.enable(6),A.clearcoat&&o.enable(7),A.iridescence&&o.enable(8),A.alphaTest&&o.enable(9),A.vertexColors&&o.enable(10),A.vertexAlphas&&o.enable(11),A.vertexUv1s&&o.enable(12),A.vertexUv2s&&o.enable(13),A.vertexUv3s&&o.enable(14),A.vertexTangents&&o.enable(15),A.anisotropy&&o.enable(16),A.alphaHash&&o.enable(17),A.batching&&o.enable(18),A.dispersion&&o.enable(19),A.batchingColor&&o.enable(20),A.gradientMap&&o.enable(21),A.packedNormalMap&&o.enable(22),A.vertexNormals&&o.enable(23),b.push(o.mask),o.disableAll(),A.fog&&o.enable(0),A.useFog&&o.enable(1),A.flatShading&&o.enable(2),A.logarithmicDepthBuffer&&o.enable(3),A.reversedDepthBuffer&&o.enable(4),A.skinning&&o.enable(5),A.morphTargets&&o.enable(6),A.morphNormals&&o.enable(7),A.morphColors&&o.enable(8),A.premultipliedAlpha&&o.enable(9),A.shadowMapEnabled&&o.enable(10),A.doubleSided&&o.enable(11),A.flipSided&&o.enable(12),A.useDepthPacking&&o.enable(13),A.dithering&&o.enable(14),A.transmission&&o.enable(15),A.sheen&&o.enable(16),A.opaque&&o.enable(17),A.pointsUvs&&o.enable(18),A.decodeVideoTexture&&o.enable(19),A.decodeVideoTextureEmissive&&o.enable(20),A.alphaToCoverage&&o.enable(21),A.numLightProbeGrids>0&&o.enable(22),b.push(o.mask)}function y(b){const A=f[b.type];let L;if(A){const P=di[A];L=mE.clone(P.uniforms)}else L=b.uniforms;return L}function x(b,A){let L=u.get(A);return L!==void 0?++L.usedTimes:(L=new WA(n,A,b,r),c.push(L),u.set(A,L)),L}function M(b){if(--b.usedTimes===0){const A=c.indexOf(b);c[A]=c[c.length-1],c.pop(),u.delete(b.cacheKey),b.destroy()}}function E(b){a.remove(b)}function C(){a.dispose()}return{getParameters:_,getProgramCacheKey:g,getUniforms:y,acquireProgram:x,releaseProgram:M,releaseShaderCache:E,programs:c,dispose:C}}function KA(){let n=new WeakMap;function e(o){return n.has(o)}function t(o){let a=n.get(o);return a===void 0&&(a={},n.set(o,a)),a}function i(o){n.delete(o)}function r(o,a,l){n.get(o)[a]=l}function s(){n=new WeakMap}return{has:e,get:t,remove:i,update:r,dispose:s}}function ZA(n,e){return n.groupOrder!==e.groupOrder?n.groupOrder-e.groupOrder:n.renderOrder!==e.renderOrder?n.renderOrder-e.renderOrder:n.material.id!==e.material.id?n.material.id-e.material.id:n.materialVariant!==e.materialVariant?n.materialVariant-e.materialVariant:n.z!==e.z?n.z-e.z:n.id-e.id}function Gp(n,e){return n.groupOrder!==e.groupOrder?n.groupOrder-e.groupOrder:n.renderOrder!==e.renderOrder?n.renderOrder-e.renderOrder:n.z!==e.z?e.z-n.z:n.id-e.id}function Hp(){const n=[];let e=0;const t=[],i=[],r=[];function s(){e=0,t.length=0,i.length=0,r.length=0}function o(h){let f=0;return h.isInstancedMesh&&(f+=2),h.isSkinnedMesh&&(f+=1),f}function a(h,f,p,_,g,m){let v=n[e];return v===void 0?(v={id:h.id,object:h,geometry:f,material:p,materialVariant:o(h),groupOrder:_,renderOrder:h.renderOrder,z:g,group:m},n[e]=v):(v.id=h.id,v.object=h,v.geometry=f,v.material=p,v.materialVariant=o(h),v.groupOrder=_,v.renderOrder=h.renderOrder,v.z=g,v.group=m),e++,v}function l(h,f,p,_,g,m){const v=a(h,f,p,_,g,m);p.transmission>0?i.push(v):p.transparent===!0?r.push(v):t.push(v)}function c(h,f,p,_,g,m){const v=a(h,f,p,_,g,m);p.transmission>0?i.unshift(v):p.transparent===!0?r.unshift(v):t.unshift(v)}function u(h,f){t.length>1&&t.sort(h||ZA),i.length>1&&i.sort(f||Gp),r.length>1&&r.sort(f||Gp)}function d(){for(let h=e,f=n.length;h<f;h++){const p=n[h];if(p.id===null)break;p.id=null,p.object=null,p.geometry=null,p.material=null,p.group=null}}return{opaque:t,transmissive:i,transparent:r,init:s,push:l,unshift:c,finish:d,sort:u}}function JA(){let n=new WeakMap;function e(i,r){const s=n.get(i);let o;return s===void 0?(o=new Hp,n.set(i,[o])):r>=s.length?(o=new Hp,s.push(o)):o=s[r],o}function t(){n=new WeakMap}return{get:e,dispose:t}}function QA(){const n={};return{get:function(e){if(n[e.id]!==void 0)return n[e.id];let t;switch(e.type){case"DirectionalLight":t={direction:new N,color:new it};break;case"SpotLight":t={position:new N,direction:new N,color:new it,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new N,color:new it,distance:0,decay:0};break;case"HemisphereLight":t={direction:new N,skyColor:new it,groundColor:new it};break;case"RectAreaLight":t={color:new it,position:new N,halfWidth:new N,halfHeight:new N};break}return n[e.id]=t,t}}}function e1(){const n={};return{get:function(e){if(n[e.id]!==void 0)return n[e.id];let t;switch(e.type){case"DirectionalLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new We};break;case"SpotLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new We};break;case"PointLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new We,shadowCameraNear:1,shadowCameraFar:1e3};break}return n[e.id]=t,t}}}let t1=0;function n1(n,e){return(e.castShadow?2:0)-(n.castShadow?2:0)+(e.map?1:0)-(n.map?1:0)}function i1(n){const e=new QA,t=e1(),i={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let c=0;c<9;c++)i.probe.push(new N);const r=new N,s=new Ct,o=new Ct;function a(c){let u=0,d=0,h=0;for(let A=0;A<9;A++)i.probe[A].set(0,0,0);let f=0,p=0,_=0,g=0,m=0,v=0,y=0,x=0,M=0,E=0,C=0;c.sort(n1);for(let A=0,L=c.length;A<L;A++){const P=c[A],F=P.color,$=P.intensity,W=P.distance;let I=null;if(P.shadow&&P.shadow.map&&(P.shadow.map.texture.format===jr?I=P.shadow.map.texture:I=P.shadow.map.depthTexture||P.shadow.map.texture),P.isAmbientLight)u+=F.r*$,d+=F.g*$,h+=F.b*$;else if(P.isLightProbe){for(let B=0;B<9;B++)i.probe[B].addScaledVector(P.sh.coefficients[B],$);C++}else if(P.isDirectionalLight){const B=e.get(P);if(B.color.copy(P.color).multiplyScalar(P.intensity),P.castShadow){const H=P.shadow,Z=t.get(P);Z.shadowIntensity=H.intensity,Z.shadowBias=H.bias,Z.shadowNormalBias=H.normalBias,Z.shadowRadius=H.radius,Z.shadowMapSize=H.mapSize,i.directionalShadow[f]=Z,i.directionalShadowMap[f]=I,i.directionalShadowMatrix[f]=P.shadow.matrix,v++}i.directional[f]=B,f++}else if(P.isSpotLight){const B=e.get(P);B.position.setFromMatrixPosition(P.matrixWorld),B.color.copy(F).multiplyScalar($),B.distance=W,B.coneCos=Math.cos(P.angle),B.penumbraCos=Math.cos(P.angle*(1-P.penumbra)),B.decay=P.decay,i.spot[_]=B;const H=P.shadow;if(P.map&&(i.spotLightMap[M]=P.map,M++,H.updateMatrices(P),P.castShadow&&E++),i.spotLightMatrix[_]=H.matrix,P.castShadow){const Z=t.get(P);Z.shadowIntensity=H.intensity,Z.shadowBias=H.bias,Z.shadowNormalBias=H.normalBias,Z.shadowRadius=H.radius,Z.shadowMapSize=H.mapSize,i.spotShadow[_]=Z,i.spotShadowMap[_]=I,x++}_++}else if(P.isRectAreaLight){const B=e.get(P);B.color.copy(F).multiplyScalar($),B.halfWidth.set(P.width*.5,0,0),B.halfHeight.set(0,P.height*.5,0),i.rectArea[g]=B,g++}else if(P.isPointLight){const B=e.get(P);if(B.color.copy(P.color).multiplyScalar(P.intensity),B.distance=P.distance,B.decay=P.decay,P.castShadow){const H=P.shadow,Z=t.get(P);Z.shadowIntensity=H.intensity,Z.shadowBias=H.bias,Z.shadowNormalBias=H.normalBias,Z.shadowRadius=H.radius,Z.shadowMapSize=H.mapSize,Z.shadowCameraNear=H.camera.near,Z.shadowCameraFar=H.camera.far,i.pointShadow[p]=Z,i.pointShadowMap[p]=I,i.pointShadowMatrix[p]=P.shadow.matrix,y++}i.point[p]=B,p++}else if(P.isHemisphereLight){const B=e.get(P);B.skyColor.copy(P.color).multiplyScalar($),B.groundColor.copy(P.groundColor).multiplyScalar($),i.hemi[m]=B,m++}}g>0&&(n.has("OES_texture_float_linear")===!0?(i.rectAreaLTC1=fe.LTC_FLOAT_1,i.rectAreaLTC2=fe.LTC_FLOAT_2):(i.rectAreaLTC1=fe.LTC_HALF_1,i.rectAreaLTC2=fe.LTC_HALF_2)),i.ambient[0]=u,i.ambient[1]=d,i.ambient[2]=h;const b=i.hash;(b.directionalLength!==f||b.pointLength!==p||b.spotLength!==_||b.rectAreaLength!==g||b.hemiLength!==m||b.numDirectionalShadows!==v||b.numPointShadows!==y||b.numSpotShadows!==x||b.numSpotMaps!==M||b.numLightProbes!==C)&&(i.directional.length=f,i.spot.length=_,i.rectArea.length=g,i.point.length=p,i.hemi.length=m,i.directionalShadow.length=v,i.directionalShadowMap.length=v,i.pointShadow.length=y,i.pointShadowMap.length=y,i.spotShadow.length=x,i.spotShadowMap.length=x,i.directionalShadowMatrix.length=v,i.pointShadowMatrix.length=y,i.spotLightMatrix.length=x+M-E,i.spotLightMap.length=M,i.numSpotLightShadowsWithMaps=E,i.numLightProbes=C,b.directionalLength=f,b.pointLength=p,b.spotLength=_,b.rectAreaLength=g,b.hemiLength=m,b.numDirectionalShadows=v,b.numPointShadows=y,b.numSpotShadows=x,b.numSpotMaps=M,b.numLightProbes=C,i.version=t1++)}function l(c,u){let d=0,h=0,f=0,p=0,_=0;const g=u.matrixWorldInverse;for(let m=0,v=c.length;m<v;m++){const y=c[m];if(y.isDirectionalLight){const x=i.directional[d];x.direction.setFromMatrixPosition(y.matrixWorld),r.setFromMatrixPosition(y.target.matrixWorld),x.direction.sub(r),x.direction.transformDirection(g),d++}else if(y.isSpotLight){const x=i.spot[f];x.position.setFromMatrixPosition(y.matrixWorld),x.position.applyMatrix4(g),x.direction.setFromMatrixPosition(y.matrixWorld),r.setFromMatrixPosition(y.target.matrixWorld),x.direction.sub(r),x.direction.transformDirection(g),f++}else if(y.isRectAreaLight){const x=i.rectArea[p];x.position.setFromMatrixPosition(y.matrixWorld),x.position.applyMatrix4(g),o.identity(),s.copy(y.matrixWorld),s.premultiply(g),o.extractRotation(s),x.halfWidth.set(y.width*.5,0,0),x.halfHeight.set(0,y.height*.5,0),x.halfWidth.applyMatrix4(o),x.halfHeight.applyMatrix4(o),p++}else if(y.isPointLight){const x=i.point[h];x.position.setFromMatrixPosition(y.matrixWorld),x.position.applyMatrix4(g),h++}else if(y.isHemisphereLight){const x=i.hemi[_];x.direction.setFromMatrixPosition(y.matrixWorld),x.direction.transformDirection(g),_++}}}return{setup:a,setupView:l,state:i}}function Vp(n){const e=new i1(n),t=[],i=[],r=[];function s(h){d.camera=h,t.length=0,i.length=0,r.length=0}function o(h){t.push(h)}function a(h){i.push(h)}function l(h){r.push(h)}function c(){e.setup(t)}function u(h){e.setupView(t,h)}const d={lightsArray:t,shadowsArray:i,lightProbeGridArray:r,camera:null,lights:e,transmissionRenderTarget:{},textureUnits:0};return{init:s,state:d,setupLights:c,setupLightsView:u,pushLight:o,pushShadow:a,pushLightProbeGrid:l}}function r1(n){let e=new WeakMap;function t(r,s=0){const o=e.get(r);let a;return o===void 0?(a=new Vp(n),e.set(r,[a])):s>=o.length?(a=new Vp(n),o.push(a)):a=o[s],a}function i(){e=new WeakMap}return{get:t,dispose:i}}const s1=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,o1=`uniform sampler2D shadow_pass;
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
}`,a1=[new N(1,0,0),new N(-1,0,0),new N(0,1,0),new N(0,-1,0),new N(0,0,1),new N(0,0,-1)],l1=[new N(0,-1,0),new N(0,-1,0),new N(0,0,1),new N(0,0,-1),new N(0,-1,0),new N(0,-1,0)],Wp=new Ct,ho=new N,tu=new N;function c1(n,e,t){let i=new A_;const r=new We,s=new We,o=new zt,a=new xE,l=new bE,c={},u=t.maxTextureSize,d={[Er]:Sn,[Sn]:Er,[Ui]:Ui},h=new yi({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new We},radius:{value:4}},vertexShader:s1,fragmentShader:o1}),f=h.clone();f.defines.HORIZONTAL_PASS=1;const p=new At;p.setAttribute("position",new Vn(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const _=new bi(p,h),g=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Ha;let m=this.type;this.render=function(E,C,b){if(g.enabled===!1||g.autoUpdate===!1&&g.needsUpdate===!1||E.length===0)return;this.type===aS&&(Le("WebGLShadowMap: PCFSoftShadowMap has been deprecated. Using PCFShadowMap instead."),this.type=Ha);const A=n.getRenderTarget(),L=n.getActiveCubeFace(),P=n.getActiveMipmapLevel(),F=n.state;F.setBlending(Xi),F.buffers.depth.getReversed()===!0?F.buffers.color.setClear(0,0,0,0):F.buffers.color.setClear(1,1,1,1),F.buffers.depth.setTest(!0),F.setScissorTest(!1);const $=m!==this.type;$&&C.traverse(function(W){W.material&&(Array.isArray(W.material)?W.material.forEach(I=>I.needsUpdate=!0):W.material.needsUpdate=!0)});for(let W=0,I=E.length;W<I;W++){const B=E[W],H=B.shadow;if(H===void 0){Le("WebGLShadowMap:",B,"has no shadow.");continue}if(H.autoUpdate===!1&&H.needsUpdate===!1)continue;r.copy(H.mapSize);const Z=H.getFrameExtents();r.multiply(Z),s.copy(H.mapSize),(r.x>u||r.y>u)&&(r.x>u&&(s.x=Math.floor(u/Z.x),r.x=s.x*Z.x,H.mapSize.x=s.x),r.y>u&&(s.y=Math.floor(u/Z.y),r.y=s.y*Z.y,H.mapSize.y=s.y));const J=n.state.buffers.depth.getReversed();if(H.camera._reversedDepth=J,H.map===null||$===!0){if(H.map!==null&&(H.map.depthTexture!==null&&(H.map.depthTexture.dispose(),H.map.depthTexture=null),H.map.dispose()),this.type===po){if(B.isPointLight){Le("WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.");continue}H.map=new gi(r.x,r.y,{format:jr,type:qi,minFilter:cn,magFilter:cn,generateMipmaps:!1}),H.map.texture.name=B.name+".shadowMap",H.map.depthTexture=new ks(r.x,r.y,fi),H.map.depthTexture.name=B.name+".shadowMapDepth",H.map.depthTexture.format=Ki,H.map.depthTexture.compareFunction=null,H.map.depthTexture.minFilter=rn,H.map.depthTexture.magFilter=rn}else B.isPointLight?(H.map=new O_(r.x),H.map.depthTexture=new hE(r.x,xi)):(H.map=new gi(r.x,r.y),H.map.depthTexture=new ks(r.x,r.y,xi)),H.map.depthTexture.name=B.name+".shadowMap",H.map.depthTexture.format=Ki,this.type===Ha?(H.map.depthTexture.compareFunction=J?ih:nh,H.map.depthTexture.minFilter=cn,H.map.depthTexture.magFilter=cn):(H.map.depthTexture.compareFunction=null,H.map.depthTexture.minFilter=rn,H.map.depthTexture.magFilter=rn);H.camera.updateProjectionMatrix()}const ne=H.map.isWebGLCubeRenderTarget?6:1;for(let de=0;de<ne;de++){if(H.map.isWebGLCubeRenderTarget)n.setRenderTarget(H.map,de),n.clear();else{de===0&&(n.setRenderTarget(H.map),n.clear());const ye=H.getViewport(de);o.set(s.x*ye.x,s.y*ye.y,s.x*ye.z,s.y*ye.w),F.viewport(o)}if(B.isPointLight){const ye=H.camera,Fe=H.matrix,tt=B.distance||ye.far;tt!==ye.far&&(ye.far=tt,ye.updateProjectionMatrix()),ho.setFromMatrixPosition(B.matrixWorld),ye.position.copy(ho),tu.copy(ye.position),tu.add(a1[de]),ye.up.copy(l1[de]),ye.lookAt(tu),ye.updateMatrixWorld(),Fe.makeTranslation(-ho.x,-ho.y,-ho.z),Wp.multiplyMatrices(ye.projectionMatrix,ye.matrixWorldInverse),H._frustum.setFromProjectionMatrix(Wp,ye.coordinateSystem,ye.reversedDepth)}else H.updateMatrices(B);i=H.getFrustum(),x(C,b,H.camera,B,this.type)}H.isPointLightShadow!==!0&&this.type===po&&v(H,b),H.needsUpdate=!1}m=this.type,g.needsUpdate=!1,n.setRenderTarget(A,L,P)};function v(E,C){const b=e.update(_);h.defines.VSM_SAMPLES!==E.blurSamples&&(h.defines.VSM_SAMPLES=E.blurSamples,f.defines.VSM_SAMPLES=E.blurSamples,h.needsUpdate=!0,f.needsUpdate=!0),E.mapPass===null&&(E.mapPass=new gi(r.x,r.y,{format:jr,type:qi})),h.uniforms.shadow_pass.value=E.map.depthTexture,h.uniforms.resolution.value=E.mapSize,h.uniforms.radius.value=E.radius,n.setRenderTarget(E.mapPass),n.clear(),n.renderBufferDirect(C,null,b,h,_,null),f.uniforms.shadow_pass.value=E.mapPass.texture,f.uniforms.resolution.value=E.mapSize,f.uniforms.radius.value=E.radius,n.setRenderTarget(E.map),n.clear(),n.renderBufferDirect(C,null,b,f,_,null)}function y(E,C,b,A){let L=null;const P=b.isPointLight===!0?E.customDistanceMaterial:E.customDepthMaterial;if(P!==void 0)L=P;else if(L=b.isPointLight===!0?l:a,n.localClippingEnabled&&C.clipShadows===!0&&Array.isArray(C.clippingPlanes)&&C.clippingPlanes.length!==0||C.displacementMap&&C.displacementScale!==0||C.alphaMap&&C.alphaTest>0||C.map&&C.alphaTest>0||C.alphaToCoverage===!0){const F=L.uuid,$=C.uuid;let W=c[F];W===void 0&&(W={},c[F]=W);let I=W[$];I===void 0&&(I=L.clone(),W[$]=I,C.addEventListener("dispose",M)),L=I}if(L.visible=C.visible,L.wireframe=C.wireframe,A===po?L.side=C.shadowSide!==null?C.shadowSide:C.side:L.side=C.shadowSide!==null?C.shadowSide:d[C.side],L.alphaMap=C.alphaMap,L.alphaTest=C.alphaToCoverage===!0?.5:C.alphaTest,L.map=C.map,L.clipShadows=C.clipShadows,L.clippingPlanes=C.clippingPlanes,L.clipIntersection=C.clipIntersection,L.displacementMap=C.displacementMap,L.displacementScale=C.displacementScale,L.displacementBias=C.displacementBias,L.wireframeLinewidth=C.wireframeLinewidth,L.linewidth=C.linewidth,b.isPointLight===!0&&L.isMeshDistanceMaterial===!0){const F=n.properties.get(L);F.light=b}return L}function x(E,C,b,A,L){if(E.visible===!1)return;if(E.layers.test(C.layers)&&(E.isMesh||E.isLine||E.isPoints)&&(E.castShadow||E.receiveShadow&&L===po)&&(!E.frustumCulled||i.intersectsObject(E))){E.modelViewMatrix.multiplyMatrices(b.matrixWorldInverse,E.matrixWorld);const $=e.update(E),W=E.material;if(Array.isArray(W)){const I=$.groups;for(let B=0,H=I.length;B<H;B++){const Z=I[B],J=W[Z.materialIndex];if(J&&J.visible){const ne=y(E,J,A,L);E.onBeforeShadow(n,E,C,b,$,ne,Z),n.renderBufferDirect(b,null,$,ne,E,Z),E.onAfterShadow(n,E,C,b,$,ne,Z)}}}else if(W.visible){const I=y(E,W,A,L);E.onBeforeShadow(n,E,C,b,$,I,null),n.renderBufferDirect(b,null,$,I,E,null),E.onAfterShadow(n,E,C,b,$,I,null)}}const F=E.children;for(let $=0,W=F.length;$<W;$++)x(F[$],C,b,A,L)}function M(E){E.target.removeEventListener("dispose",M);for(const b in c){const A=c[b],L=E.target.uuid;L in A&&(A[L].dispose(),delete A[L])}}}function u1(n,e){function t(){let D=!1;const oe=new zt;let j=null;const xe=new zt(0,0,0,0);return{setMask:function(ce){j!==ce&&!D&&(n.colorMask(ce,ce,ce,ce),j=ce)},setLocked:function(ce){D=ce},setClear:function(ce,ee,Te,Ge,Nt){Nt===!0&&(ce*=Ge,ee*=Ge,Te*=Ge),oe.set(ce,ee,Te,Ge),xe.equals(oe)===!1&&(n.clearColor(ce,ee,Te,Ge),xe.copy(oe))},reset:function(){D=!1,j=null,xe.set(-1,0,0,0)}}}function i(){let D=!1,oe=!1,j=null,xe=null,ce=null;return{setReversed:function(ee){if(oe!==ee){const Te=e.get("EXT_clip_control");ee?Te.clipControlEXT(Te.LOWER_LEFT_EXT,Te.ZERO_TO_ONE_EXT):Te.clipControlEXT(Te.LOWER_LEFT_EXT,Te.NEGATIVE_ONE_TO_ONE_EXT),oe=ee;const Ge=ce;ce=null,this.setClear(Ge)}},getReversed:function(){return oe},setTest:function(ee){ee?ie(n.DEPTH_TEST):Ce(n.DEPTH_TEST)},setMask:function(ee){j!==ee&&!D&&(n.depthMask(ee),j=ee)},setFunc:function(ee){if(oe&&(ee=zS[ee]),xe!==ee){switch(ee){case Tu:n.depthFunc(n.NEVER);break;case Au:n.depthFunc(n.ALWAYS);break;case Cu:n.depthFunc(n.LESS);break;case Fs:n.depthFunc(n.LEQUAL);break;case Ru:n.depthFunc(n.EQUAL);break;case Pu:n.depthFunc(n.GEQUAL);break;case Lu:n.depthFunc(n.GREATER);break;case Du:n.depthFunc(n.NOTEQUAL);break;default:n.depthFunc(n.LEQUAL)}xe=ee}},setLocked:function(ee){D=ee},setClear:function(ee){ce!==ee&&(ce=ee,oe&&(ee=1-ee),n.clearDepth(ee))},reset:function(){D=!1,j=null,xe=null,ce=null,oe=!1}}}function r(){let D=!1,oe=null,j=null,xe=null,ce=null,ee=null,Te=null,Ge=null,Nt=null;return{setTest:function(ft){D||(ft?ie(n.STENCIL_TEST):Ce(n.STENCIL_TEST))},setMask:function(ft){oe!==ft&&!D&&(n.stencilMask(ft),oe=ft)},setFunc:function(ft,Si,oi){(j!==ft||xe!==Si||ce!==oi)&&(n.stencilFunc(ft,Si,oi),j=ft,xe=Si,ce=oi)},setOp:function(ft,Si,oi){(ee!==ft||Te!==Si||Ge!==oi)&&(n.stencilOp(ft,Si,oi),ee=ft,Te=Si,Ge=oi)},setLocked:function(ft){D=ft},setClear:function(ft){Nt!==ft&&(n.clearStencil(ft),Nt=ft)},reset:function(){D=!1,oe=null,j=null,xe=null,ce=null,ee=null,Te=null,Ge=null,Nt=null}}}const s=new t,o=new i,a=new r,l=new WeakMap,c=new WeakMap;let u={},d={},h={},f=new WeakMap,p=[],_=null,g=!1,m=null,v=null,y=null,x=null,M=null,E=null,C=null,b=new it(0,0,0),A=0,L=!1,P=null,F=null,$=null,W=null,I=null;const B=n.getParameter(n.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let H=!1,Z=0;const J=n.getParameter(n.VERSION);J.indexOf("WebGL")!==-1?(Z=parseFloat(/^WebGL (\d)/.exec(J)[1]),H=Z>=1):J.indexOf("OpenGL ES")!==-1&&(Z=parseFloat(/^OpenGL ES (\d)/.exec(J)[1]),H=Z>=2);let ne=null,de={};const ye=n.getParameter(n.SCISSOR_BOX),Fe=n.getParameter(n.VIEWPORT),tt=new zt().fromArray(ye),Ie=new zt().fromArray(Fe);function q(D,oe,j,xe){const ce=new Uint8Array(4),ee=n.createTexture();n.bindTexture(D,ee),n.texParameteri(D,n.TEXTURE_MIN_FILTER,n.NEAREST),n.texParameteri(D,n.TEXTURE_MAG_FILTER,n.NEAREST);for(let Te=0;Te<j;Te++)D===n.TEXTURE_3D||D===n.TEXTURE_2D_ARRAY?n.texImage3D(oe,0,n.RGBA,1,1,xe,0,n.RGBA,n.UNSIGNED_BYTE,ce):n.texImage2D(oe+Te,0,n.RGBA,1,1,0,n.RGBA,n.UNSIGNED_BYTE,ce);return ee}const pe={};pe[n.TEXTURE_2D]=q(n.TEXTURE_2D,n.TEXTURE_2D,1),pe[n.TEXTURE_CUBE_MAP]=q(n.TEXTURE_CUBE_MAP,n.TEXTURE_CUBE_MAP_POSITIVE_X,6),pe[n.TEXTURE_2D_ARRAY]=q(n.TEXTURE_2D_ARRAY,n.TEXTURE_2D_ARRAY,1,1),pe[n.TEXTURE_3D]=q(n.TEXTURE_3D,n.TEXTURE_3D,1,1),s.setClear(0,0,0,1),o.setClear(1),a.setClear(0),ie(n.DEPTH_TEST),o.setFunc(Fs),$t(!1),wt(Ff),ie(n.CULL_FACE),gt(Xi);function ie(D){u[D]!==!0&&(n.enable(D),u[D]=!0)}function Ce(D){u[D]!==!1&&(n.disable(D),u[D]=!1)}function Oe(D,oe){return h[D]!==oe?(n.bindFramebuffer(D,oe),h[D]=oe,D===n.DRAW_FRAMEBUFFER&&(h[n.FRAMEBUFFER]=oe),D===n.FRAMEBUFFER&&(h[n.DRAW_FRAMEBUFFER]=oe),!0):!1}function Ne(D,oe){let j=p,xe=!1;if(D){j=f.get(oe),j===void 0&&(j=[],f.set(oe,j));const ce=D.textures;if(j.length!==ce.length||j[0]!==n.COLOR_ATTACHMENT0){for(let ee=0,Te=ce.length;ee<Te;ee++)j[ee]=n.COLOR_ATTACHMENT0+ee;j.length=ce.length,xe=!0}}else j[0]!==n.BACK&&(j[0]=n.BACK,xe=!0);xe&&n.drawBuffers(j)}function bt(D){return _!==D?(n.useProgram(D),_=D,!0):!1}const je={[Ur]:n.FUNC_ADD,[cS]:n.FUNC_SUBTRACT,[uS]:n.FUNC_REVERSE_SUBTRACT};je[dS]=n.MIN,je[hS]=n.MAX;const at={[fS]:n.ZERO,[pS]:n.ONE,[mS]:n.SRC_COLOR,[Mu]:n.SRC_ALPHA,[yS]:n.SRC_ALPHA_SATURATE,[xS]:n.DST_COLOR,[_S]:n.DST_ALPHA,[gS]:n.ONE_MINUS_SRC_COLOR,[wu]:n.ONE_MINUS_SRC_ALPHA,[bS]:n.ONE_MINUS_DST_COLOR,[vS]:n.ONE_MINUS_DST_ALPHA,[SS]:n.CONSTANT_COLOR,[ES]:n.ONE_MINUS_CONSTANT_COLOR,[MS]:n.CONSTANT_ALPHA,[wS]:n.ONE_MINUS_CONSTANT_ALPHA};function gt(D,oe,j,xe,ce,ee,Te,Ge,Nt,ft){if(D===Xi){g===!0&&(Ce(n.BLEND),g=!1);return}if(g===!1&&(ie(n.BLEND),g=!0),D!==lS){if(D!==m||ft!==L){if((v!==Ur||M!==Ur)&&(n.blendEquation(n.FUNC_ADD),v=Ur,M=Ur),ft)switch(D){case Rs:n.blendFuncSeparate(n.ONE,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case Of:n.blendFunc(n.ONE,n.ONE);break;case kf:n.blendFuncSeparate(n.ZERO,n.ONE_MINUS_SRC_COLOR,n.ZERO,n.ONE);break;case Bf:n.blendFuncSeparate(n.DST_COLOR,n.ONE_MINUS_SRC_ALPHA,n.ZERO,n.ONE);break;default:Qe("WebGLState: Invalid blending: ",D);break}else switch(D){case Rs:n.blendFuncSeparate(n.SRC_ALPHA,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case Of:n.blendFuncSeparate(n.SRC_ALPHA,n.ONE,n.ONE,n.ONE);break;case kf:Qe("WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case Bf:Qe("WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:Qe("WebGLState: Invalid blending: ",D);break}y=null,x=null,E=null,C=null,b.set(0,0,0),A=0,m=D,L=ft}return}ce=ce||oe,ee=ee||j,Te=Te||xe,(oe!==v||ce!==M)&&(n.blendEquationSeparate(je[oe],je[ce]),v=oe,M=ce),(j!==y||xe!==x||ee!==E||Te!==C)&&(n.blendFuncSeparate(at[j],at[xe],at[ee],at[Te]),y=j,x=xe,E=ee,C=Te),(Ge.equals(b)===!1||Nt!==A)&&(n.blendColor(Ge.r,Ge.g,Ge.b,Nt),b.copy(Ge),A=Nt),m=D,L=!1}function Ye(D,oe){D.side===Ui?Ce(n.CULL_FACE):ie(n.CULL_FACE);let j=D.side===Sn;oe&&(j=!j),$t(j),D.blending===Rs&&D.transparent===!1?gt(Xi):gt(D.blending,D.blendEquation,D.blendSrc,D.blendDst,D.blendEquationAlpha,D.blendSrcAlpha,D.blendDstAlpha,D.blendColor,D.blendAlpha,D.premultipliedAlpha),o.setFunc(D.depthFunc),o.setTest(D.depthTest),o.setMask(D.depthWrite),s.setMask(D.colorWrite);const xe=D.stencilWrite;a.setTest(xe),xe&&(a.setMask(D.stencilWriteMask),a.setFunc(D.stencilFunc,D.stencilRef,D.stencilFuncMask),a.setOp(D.stencilFail,D.stencilZFail,D.stencilZPass)),U(D.polygonOffset,D.polygonOffsetFactor,D.polygonOffsetUnits),D.alphaToCoverage===!0?ie(n.SAMPLE_ALPHA_TO_COVERAGE):Ce(n.SAMPLE_ALPHA_TO_COVERAGE)}function $t(D){P!==D&&(D?n.frontFace(n.CW):n.frontFace(n.CCW),P=D)}function wt(D){D!==sS?(ie(n.CULL_FACE),D!==F&&(D===Ff?n.cullFace(n.BACK):D===oS?n.cullFace(n.FRONT):n.cullFace(n.FRONT_AND_BACK))):Ce(n.CULL_FACE),F=D}function Mn(D){D!==$&&(H&&n.lineWidth(D),$=D)}function U(D,oe,j){D?(ie(n.POLYGON_OFFSET_FILL),(W!==oe||I!==j)&&(W=oe,I=j,o.getReversed()&&(oe=-oe),n.polygonOffset(oe,j))):Ce(n.POLYGON_OFFSET_FILL)}function Xt(D){D?ie(n.SCISSOR_TEST):Ce(n.SCISSOR_TEST)}function Ze(D){D===void 0&&(D=n.TEXTURE0+B-1),ne!==D&&(n.activeTexture(D),ne=D)}function yt(D,oe,j){j===void 0&&(ne===null?j=n.TEXTURE0+B-1:j=ne);let xe=de[j];xe===void 0&&(xe={type:void 0,texture:void 0},de[j]=xe),(xe.type!==D||xe.texture!==oe)&&(ne!==j&&(n.activeTexture(j),ne=j),n.bindTexture(D,oe||pe[D]),xe.type=D,xe.texture=oe)}function he(){const D=de[ne];D!==void 0&&D.type!==void 0&&(n.bindTexture(D.type,null),D.type=void 0,D.texture=void 0)}function Rt(){try{n.compressedTexImage2D(...arguments)}catch(D){Qe("WebGLState:",D)}}function R(){try{n.compressedTexImage3D(...arguments)}catch(D){Qe("WebGLState:",D)}}function S(){try{n.texSubImage2D(...arguments)}catch(D){Qe("WebGLState:",D)}}function k(){try{n.texSubImage3D(...arguments)}catch(D){Qe("WebGLState:",D)}}function Y(){try{n.compressedTexSubImage2D(...arguments)}catch(D){Qe("WebGLState:",D)}}function te(){try{n.compressedTexSubImage3D(...arguments)}catch(D){Qe("WebGLState:",D)}}function re(){try{n.texStorage2D(...arguments)}catch(D){Qe("WebGLState:",D)}}function ue(){try{n.texStorage3D(...arguments)}catch(D){Qe("WebGLState:",D)}}function X(){try{n.texImage2D(...arguments)}catch(D){Qe("WebGLState:",D)}}function K(){try{n.texImage3D(...arguments)}catch(D){Qe("WebGLState:",D)}}function _e(D){return d[D]!==void 0?d[D]:n.getParameter(D)}function Se(D,oe){d[D]!==oe&&(n.pixelStorei(D,oe),d[D]=oe)}function le(D){tt.equals(D)===!1&&(n.scissor(D.x,D.y,D.z,D.w),tt.copy(D))}function se(D){Ie.equals(D)===!1&&(n.viewport(D.x,D.y,D.z,D.w),Ie.copy(D))}function Be(D,oe){let j=c.get(oe);j===void 0&&(j=new WeakMap,c.set(oe,j));let xe=j.get(D);xe===void 0&&(xe=n.getUniformBlockIndex(oe,D.name),j.set(D,xe))}function Ve(D,oe){const xe=c.get(oe).get(D);l.get(oe)!==xe&&(n.uniformBlockBinding(oe,xe,D.__bindingPointIndex),l.set(oe,xe))}function rt(){n.disable(n.BLEND),n.disable(n.CULL_FACE),n.disable(n.DEPTH_TEST),n.disable(n.POLYGON_OFFSET_FILL),n.disable(n.SCISSOR_TEST),n.disable(n.STENCIL_TEST),n.disable(n.SAMPLE_ALPHA_TO_COVERAGE),n.blendEquation(n.FUNC_ADD),n.blendFunc(n.ONE,n.ZERO),n.blendFuncSeparate(n.ONE,n.ZERO,n.ONE,n.ZERO),n.blendColor(0,0,0,0),n.colorMask(!0,!0,!0,!0),n.clearColor(0,0,0,0),n.depthMask(!0),n.depthFunc(n.LESS),o.setReversed(!1),n.clearDepth(1),n.stencilMask(4294967295),n.stencilFunc(n.ALWAYS,0,4294967295),n.stencilOp(n.KEEP,n.KEEP,n.KEEP),n.clearStencil(0),n.cullFace(n.BACK),n.frontFace(n.CCW),n.polygonOffset(0,0),n.activeTexture(n.TEXTURE0),n.bindFramebuffer(n.FRAMEBUFFER,null),n.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),n.bindFramebuffer(n.READ_FRAMEBUFFER,null),n.useProgram(null),n.lineWidth(1),n.scissor(0,0,n.canvas.width,n.canvas.height),n.viewport(0,0,n.canvas.width,n.canvas.height),n.pixelStorei(n.PACK_ALIGNMENT,4),n.pixelStorei(n.UNPACK_ALIGNMENT,4),n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,!1),n.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),n.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,n.BROWSER_DEFAULT_WEBGL),n.pixelStorei(n.PACK_ROW_LENGTH,0),n.pixelStorei(n.PACK_SKIP_PIXELS,0),n.pixelStorei(n.PACK_SKIP_ROWS,0),n.pixelStorei(n.UNPACK_ROW_LENGTH,0),n.pixelStorei(n.UNPACK_IMAGE_HEIGHT,0),n.pixelStorei(n.UNPACK_SKIP_PIXELS,0),n.pixelStorei(n.UNPACK_SKIP_ROWS,0),n.pixelStorei(n.UNPACK_SKIP_IMAGES,0),u={},d={},ne=null,de={},h={},f=new WeakMap,p=[],_=null,g=!1,m=null,v=null,y=null,x=null,M=null,E=null,C=null,b=new it(0,0,0),A=0,L=!1,P=null,F=null,$=null,W=null,I=null,tt.set(0,0,n.canvas.width,n.canvas.height),Ie.set(0,0,n.canvas.width,n.canvas.height),s.reset(),o.reset(),a.reset()}return{buffers:{color:s,depth:o,stencil:a},enable:ie,disable:Ce,bindFramebuffer:Oe,drawBuffers:Ne,useProgram:bt,setBlending:gt,setMaterial:Ye,setFlipSided:$t,setCullFace:wt,setLineWidth:Mn,setPolygonOffset:U,setScissorTest:Xt,activeTexture:Ze,bindTexture:yt,unbindTexture:he,compressedTexImage2D:Rt,compressedTexImage3D:R,texImage2D:X,texImage3D:K,pixelStorei:Se,getParameter:_e,updateUBOMapping:Be,uniformBlockBinding:Ve,texStorage2D:re,texStorage3D:ue,texSubImage2D:S,texSubImage3D:k,compressedTexSubImage2D:Y,compressedTexSubImage3D:te,scissor:le,viewport:se,reset:rt}}function d1(n,e,t,i,r,s,o){const a=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),c=new We,u=new WeakMap,d=new Set;let h;const f=new WeakMap;let p=!1;try{p=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function _(R,S){return p?new OffscreenCanvas(R,S):vl("canvas")}function g(R,S,k){let Y=1;const te=Rt(R);if((te.width>k||te.height>k)&&(Y=k/Math.max(te.width,te.height)),Y<1)if(typeof HTMLImageElement<"u"&&R instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&R instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&R instanceof ImageBitmap||typeof VideoFrame<"u"&&R instanceof VideoFrame){const re=Math.floor(Y*te.width),ue=Math.floor(Y*te.height);h===void 0&&(h=_(re,ue));const X=S?_(re,ue):h;return X.width=re,X.height=ue,X.getContext("2d").drawImage(R,0,0,re,ue),Le("WebGLRenderer: Texture has been resized from ("+te.width+"x"+te.height+") to ("+re+"x"+ue+")."),X}else return"data"in R&&Le("WebGLRenderer: Image in DataTexture is too big ("+te.width+"x"+te.height+")."),R;return R}function m(R){return R.generateMipmaps}function v(R){n.generateMipmap(R)}function y(R){return R.isWebGLCubeRenderTarget?n.TEXTURE_CUBE_MAP:R.isWebGL3DRenderTarget?n.TEXTURE_3D:R.isWebGLArrayRenderTarget||R.isCompressedArrayTexture?n.TEXTURE_2D_ARRAY:n.TEXTURE_2D}function x(R,S,k,Y,te,re=!1){if(R!==null){if(n[R]!==void 0)return n[R];Le("WebGLRenderer: Attempt to use non-existing WebGL internal format '"+R+"'")}let ue;Y&&(ue=e.get("EXT_texture_norm16"),ue||Le("WebGLRenderer: Unable to use normalized textures without EXT_texture_norm16 extension"));let X=S;if(S===n.RED&&(k===n.FLOAT&&(X=n.R32F),k===n.HALF_FLOAT&&(X=n.R16F),k===n.UNSIGNED_BYTE&&(X=n.R8),k===n.UNSIGNED_SHORT&&ue&&(X=ue.R16_EXT),k===n.SHORT&&ue&&(X=ue.R16_SNORM_EXT)),S===n.RED_INTEGER&&(k===n.UNSIGNED_BYTE&&(X=n.R8UI),k===n.UNSIGNED_SHORT&&(X=n.R16UI),k===n.UNSIGNED_INT&&(X=n.R32UI),k===n.BYTE&&(X=n.R8I),k===n.SHORT&&(X=n.R16I),k===n.INT&&(X=n.R32I)),S===n.RG&&(k===n.FLOAT&&(X=n.RG32F),k===n.HALF_FLOAT&&(X=n.RG16F),k===n.UNSIGNED_BYTE&&(X=n.RG8),k===n.UNSIGNED_SHORT&&ue&&(X=ue.RG16_EXT),k===n.SHORT&&ue&&(X=ue.RG16_SNORM_EXT)),S===n.RG_INTEGER&&(k===n.UNSIGNED_BYTE&&(X=n.RG8UI),k===n.UNSIGNED_SHORT&&(X=n.RG16UI),k===n.UNSIGNED_INT&&(X=n.RG32UI),k===n.BYTE&&(X=n.RG8I),k===n.SHORT&&(X=n.RG16I),k===n.INT&&(X=n.RG32I)),S===n.RGB_INTEGER&&(k===n.UNSIGNED_BYTE&&(X=n.RGB8UI),k===n.UNSIGNED_SHORT&&(X=n.RGB16UI),k===n.UNSIGNED_INT&&(X=n.RGB32UI),k===n.BYTE&&(X=n.RGB8I),k===n.SHORT&&(X=n.RGB16I),k===n.INT&&(X=n.RGB32I)),S===n.RGBA_INTEGER&&(k===n.UNSIGNED_BYTE&&(X=n.RGBA8UI),k===n.UNSIGNED_SHORT&&(X=n.RGBA16UI),k===n.UNSIGNED_INT&&(X=n.RGBA32UI),k===n.BYTE&&(X=n.RGBA8I),k===n.SHORT&&(X=n.RGBA16I),k===n.INT&&(X=n.RGBA32I)),S===n.RGB&&(k===n.UNSIGNED_SHORT&&ue&&(X=ue.RGB16_EXT),k===n.SHORT&&ue&&(X=ue.RGB16_SNORM_EXT),k===n.UNSIGNED_INT_5_9_9_9_REV&&(X=n.RGB9_E5),k===n.UNSIGNED_INT_10F_11F_11F_REV&&(X=n.R11F_G11F_B10F)),S===n.RGBA){const K=re?gl:Je.getTransfer(te);k===n.FLOAT&&(X=n.RGBA32F),k===n.HALF_FLOAT&&(X=n.RGBA16F),k===n.UNSIGNED_BYTE&&(X=K===dt?n.SRGB8_ALPHA8:n.RGBA8),k===n.UNSIGNED_SHORT&&ue&&(X=ue.RGBA16_EXT),k===n.SHORT&&ue&&(X=ue.RGBA16_SNORM_EXT),k===n.UNSIGNED_SHORT_4_4_4_4&&(X=n.RGBA4),k===n.UNSIGNED_SHORT_5_5_5_1&&(X=n.RGB5_A1)}return(X===n.R16F||X===n.R32F||X===n.RG16F||X===n.RG32F||X===n.RGBA16F||X===n.RGBA32F)&&e.get("EXT_color_buffer_float"),X}function M(R,S){let k;return R?S===null||S===xi||S===Uo?k=n.DEPTH24_STENCIL8:S===fi?k=n.DEPTH32F_STENCIL8:S===Io&&(k=n.DEPTH24_STENCIL8,Le("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):S===null||S===xi||S===Uo?k=n.DEPTH_COMPONENT24:S===fi?k=n.DEPTH_COMPONENT32F:S===Io&&(k=n.DEPTH_COMPONENT16),k}function E(R,S){return m(R)===!0||R.isFramebufferTexture&&R.minFilter!==rn&&R.minFilter!==cn?Math.log2(Math.max(S.width,S.height))+1:R.mipmaps!==void 0&&R.mipmaps.length>0?R.mipmaps.length:R.isCompressedTexture&&Array.isArray(R.image)?S.mipmaps.length:1}function C(R){const S=R.target;S.removeEventListener("dispose",C),A(S),S.isVideoTexture&&u.delete(S),S.isHTMLTexture&&d.delete(S)}function b(R){const S=R.target;S.removeEventListener("dispose",b),P(S)}function A(R){const S=i.get(R);if(S.__webglInit===void 0)return;const k=R.source,Y=f.get(k);if(Y){const te=Y[S.__cacheKey];te.usedTimes--,te.usedTimes===0&&L(R),Object.keys(Y).length===0&&f.delete(k)}i.remove(R)}function L(R){const S=i.get(R);n.deleteTexture(S.__webglTexture);const k=R.source,Y=f.get(k);delete Y[S.__cacheKey],o.memory.textures--}function P(R){const S=i.get(R);if(R.depthTexture&&(R.depthTexture.dispose(),i.remove(R.depthTexture)),R.isWebGLCubeRenderTarget)for(let Y=0;Y<6;Y++){if(Array.isArray(S.__webglFramebuffer[Y]))for(let te=0;te<S.__webglFramebuffer[Y].length;te++)n.deleteFramebuffer(S.__webglFramebuffer[Y][te]);else n.deleteFramebuffer(S.__webglFramebuffer[Y]);S.__webglDepthbuffer&&n.deleteRenderbuffer(S.__webglDepthbuffer[Y])}else{if(Array.isArray(S.__webglFramebuffer))for(let Y=0;Y<S.__webglFramebuffer.length;Y++)n.deleteFramebuffer(S.__webglFramebuffer[Y]);else n.deleteFramebuffer(S.__webglFramebuffer);if(S.__webglDepthbuffer&&n.deleteRenderbuffer(S.__webglDepthbuffer),S.__webglMultisampledFramebuffer&&n.deleteFramebuffer(S.__webglMultisampledFramebuffer),S.__webglColorRenderbuffer)for(let Y=0;Y<S.__webglColorRenderbuffer.length;Y++)S.__webglColorRenderbuffer[Y]&&n.deleteRenderbuffer(S.__webglColorRenderbuffer[Y]);S.__webglDepthRenderbuffer&&n.deleteRenderbuffer(S.__webglDepthRenderbuffer)}const k=R.textures;for(let Y=0,te=k.length;Y<te;Y++){const re=i.get(k[Y]);re.__webglTexture&&(n.deleteTexture(re.__webglTexture),o.memory.textures--),i.remove(k[Y])}i.remove(R)}let F=0;function $(){F=0}function W(){return F}function I(R){F=R}function B(){const R=F;return R>=r.maxTextures&&Le("WebGLTextures: Trying to use "+R+" texture units while this GPU supports only "+r.maxTextures),F+=1,R}function H(R){const S=[];return S.push(R.wrapS),S.push(R.wrapT),S.push(R.wrapR||0),S.push(R.magFilter),S.push(R.minFilter),S.push(R.anisotropy),S.push(R.internalFormat),S.push(R.format),S.push(R.type),S.push(R.generateMipmaps),S.push(R.premultiplyAlpha),S.push(R.flipY),S.push(R.unpackAlignment),S.push(R.colorSpace),S.join()}function Z(R,S){const k=i.get(R);if(R.isVideoTexture&&yt(R),R.isRenderTargetTexture===!1&&R.isExternalTexture!==!0&&R.version>0&&k.__version!==R.version){const Y=R.image;if(Y===null)Le("WebGLRenderer: Texture marked for update but no image data found.");else if(Y.complete===!1)Le("WebGLRenderer: Texture marked for update but image is incomplete");else{Ce(k,R,S);return}}else R.isExternalTexture&&(k.__webglTexture=R.sourceTexture?R.sourceTexture:null);t.bindTexture(n.TEXTURE_2D,k.__webglTexture,n.TEXTURE0+S)}function J(R,S){const k=i.get(R);if(R.isRenderTargetTexture===!1&&R.version>0&&k.__version!==R.version){Ce(k,R,S);return}else R.isExternalTexture&&(k.__webglTexture=R.sourceTexture?R.sourceTexture:null);t.bindTexture(n.TEXTURE_2D_ARRAY,k.__webglTexture,n.TEXTURE0+S)}function ne(R,S){const k=i.get(R);if(R.isRenderTargetTexture===!1&&R.version>0&&k.__version!==R.version){Ce(k,R,S);return}t.bindTexture(n.TEXTURE_3D,k.__webglTexture,n.TEXTURE0+S)}function de(R,S){const k=i.get(R);if(R.isCubeDepthTexture!==!0&&R.version>0&&k.__version!==R.version){Oe(k,R,S);return}t.bindTexture(n.TEXTURE_CUBE_MAP,k.__webglTexture,n.TEXTURE0+S)}const ye={[Nu]:n.REPEAT,[Vi]:n.CLAMP_TO_EDGE,[Iu]:n.MIRRORED_REPEAT},Fe={[rn]:n.NEAREST,[CS]:n.NEAREST_MIPMAP_NEAREST,[oa]:n.NEAREST_MIPMAP_LINEAR,[cn]:n.LINEAR,[Sc]:n.LINEAR_MIPMAP_NEAREST,[Br]:n.LINEAR_MIPMAP_LINEAR},tt={[LS]:n.NEVER,[FS]:n.ALWAYS,[DS]:n.LESS,[nh]:n.LEQUAL,[NS]:n.EQUAL,[ih]:n.GEQUAL,[IS]:n.GREATER,[US]:n.NOTEQUAL};function Ie(R,S){if(S.type===fi&&e.has("OES_texture_float_linear")===!1&&(S.magFilter===cn||S.magFilter===Sc||S.magFilter===oa||S.magFilter===Br||S.minFilter===cn||S.minFilter===Sc||S.minFilter===oa||S.minFilter===Br)&&Le("WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),n.texParameteri(R,n.TEXTURE_WRAP_S,ye[S.wrapS]),n.texParameteri(R,n.TEXTURE_WRAP_T,ye[S.wrapT]),(R===n.TEXTURE_3D||R===n.TEXTURE_2D_ARRAY)&&n.texParameteri(R,n.TEXTURE_WRAP_R,ye[S.wrapR]),n.texParameteri(R,n.TEXTURE_MAG_FILTER,Fe[S.magFilter]),n.texParameteri(R,n.TEXTURE_MIN_FILTER,Fe[S.minFilter]),S.compareFunction&&(n.texParameteri(R,n.TEXTURE_COMPARE_MODE,n.COMPARE_REF_TO_TEXTURE),n.texParameteri(R,n.TEXTURE_COMPARE_FUNC,tt[S.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(S.magFilter===rn||S.minFilter!==oa&&S.minFilter!==Br||S.type===fi&&e.has("OES_texture_float_linear")===!1)return;if(S.anisotropy>1||i.get(S).__currentAnisotropy){const k=e.get("EXT_texture_filter_anisotropic");n.texParameterf(R,k.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(S.anisotropy,r.getMaxAnisotropy())),i.get(S).__currentAnisotropy=S.anisotropy}}}function q(R,S){let k=!1;R.__webglInit===void 0&&(R.__webglInit=!0,S.addEventListener("dispose",C));const Y=S.source;let te=f.get(Y);te===void 0&&(te={},f.set(Y,te));const re=H(S);if(re!==R.__cacheKey){te[re]===void 0&&(te[re]={texture:n.createTexture(),usedTimes:0},o.memory.textures++,k=!0),te[re].usedTimes++;const ue=te[R.__cacheKey];ue!==void 0&&(te[R.__cacheKey].usedTimes--,ue.usedTimes===0&&L(S)),R.__cacheKey=re,R.__webglTexture=te[re].texture}return k}function pe(R,S,k){return Math.floor(Math.floor(R/k)/S)}function ie(R,S,k,Y){const re=R.updateRanges;if(re.length===0)t.texSubImage2D(n.TEXTURE_2D,0,0,0,S.width,S.height,k,Y,S.data);else{re.sort((Se,le)=>Se.start-le.start);let ue=0;for(let Se=1;Se<re.length;Se++){const le=re[ue],se=re[Se],Be=le.start+le.count,Ve=pe(se.start,S.width,4),rt=pe(le.start,S.width,4);se.start<=Be+1&&Ve===rt&&pe(se.start+se.count-1,S.width,4)===Ve?le.count=Math.max(le.count,se.start+se.count-le.start):(++ue,re[ue]=se)}re.length=ue+1;const X=t.getParameter(n.UNPACK_ROW_LENGTH),K=t.getParameter(n.UNPACK_SKIP_PIXELS),_e=t.getParameter(n.UNPACK_SKIP_ROWS);t.pixelStorei(n.UNPACK_ROW_LENGTH,S.width);for(let Se=0,le=re.length;Se<le;Se++){const se=re[Se],Be=Math.floor(se.start/4),Ve=Math.ceil(se.count/4),rt=Be%S.width,D=Math.floor(Be/S.width),oe=Ve,j=1;t.pixelStorei(n.UNPACK_SKIP_PIXELS,rt),t.pixelStorei(n.UNPACK_SKIP_ROWS,D),t.texSubImage2D(n.TEXTURE_2D,0,rt,D,oe,j,k,Y,S.data)}R.clearUpdateRanges(),t.pixelStorei(n.UNPACK_ROW_LENGTH,X),t.pixelStorei(n.UNPACK_SKIP_PIXELS,K),t.pixelStorei(n.UNPACK_SKIP_ROWS,_e)}}function Ce(R,S,k){let Y=n.TEXTURE_2D;(S.isDataArrayTexture||S.isCompressedArrayTexture)&&(Y=n.TEXTURE_2D_ARRAY),S.isData3DTexture&&(Y=n.TEXTURE_3D);const te=q(R,S),re=S.source;t.bindTexture(Y,R.__webglTexture,n.TEXTURE0+k);const ue=i.get(re);if(re.version!==ue.__version||te===!0){if(t.activeTexture(n.TEXTURE0+k),(typeof ImageBitmap<"u"&&S.image instanceof ImageBitmap)===!1){const j=Je.getPrimaries(Je.workingColorSpace),xe=S.colorSpace===pr?null:Je.getPrimaries(S.colorSpace),ce=S.colorSpace===pr||j===xe?n.NONE:n.BROWSER_DEFAULT_WEBGL;t.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,S.flipY),t.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,S.premultiplyAlpha),t.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,ce)}t.pixelStorei(n.UNPACK_ALIGNMENT,S.unpackAlignment);let K=g(S.image,!1,r.maxTextureSize);K=he(S,K);const _e=s.convert(S.format,S.colorSpace),Se=s.convert(S.type);let le=x(S.internalFormat,_e,Se,S.normalized,S.colorSpace,S.isVideoTexture);Ie(Y,S);let se;const Be=S.mipmaps,Ve=S.isVideoTexture!==!0,rt=ue.__version===void 0||te===!0,D=re.dataReady,oe=E(S,K);if(S.isDepthTexture)le=M(S.format===zr,S.type),rt&&(Ve?t.texStorage2D(n.TEXTURE_2D,1,le,K.width,K.height):t.texImage2D(n.TEXTURE_2D,0,le,K.width,K.height,0,_e,Se,null));else if(S.isDataTexture)if(Be.length>0){Ve&&rt&&t.texStorage2D(n.TEXTURE_2D,oe,le,Be[0].width,Be[0].height);for(let j=0,xe=Be.length;j<xe;j++)se=Be[j],Ve?D&&t.texSubImage2D(n.TEXTURE_2D,j,0,0,se.width,se.height,_e,Se,se.data):t.texImage2D(n.TEXTURE_2D,j,le,se.width,se.height,0,_e,Se,se.data);S.generateMipmaps=!1}else Ve?(rt&&t.texStorage2D(n.TEXTURE_2D,oe,le,K.width,K.height),D&&ie(S,K,_e,Se)):t.texImage2D(n.TEXTURE_2D,0,le,K.width,K.height,0,_e,Se,K.data);else if(S.isCompressedTexture)if(S.isCompressedArrayTexture){Ve&&rt&&t.texStorage3D(n.TEXTURE_2D_ARRAY,oe,le,Be[0].width,Be[0].height,K.depth);for(let j=0,xe=Be.length;j<xe;j++)if(se=Be[j],S.format!==ni)if(_e!==null)if(Ve){if(D)if(S.layerUpdates.size>0){const ce=yp(se.width,se.height,S.format,S.type);for(const ee of S.layerUpdates){const Te=se.data.subarray(ee*ce/se.data.BYTES_PER_ELEMENT,(ee+1)*ce/se.data.BYTES_PER_ELEMENT);t.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,j,0,0,ee,se.width,se.height,1,_e,Te)}S.clearLayerUpdates()}else t.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,j,0,0,0,se.width,se.height,K.depth,_e,se.data)}else t.compressedTexImage3D(n.TEXTURE_2D_ARRAY,j,le,se.width,se.height,K.depth,0,se.data,0,0);else Le("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else Ve?D&&t.texSubImage3D(n.TEXTURE_2D_ARRAY,j,0,0,0,se.width,se.height,K.depth,_e,Se,se.data):t.texImage3D(n.TEXTURE_2D_ARRAY,j,le,se.width,se.height,K.depth,0,_e,Se,se.data)}else{Ve&&rt&&t.texStorage2D(n.TEXTURE_2D,oe,le,Be[0].width,Be[0].height);for(let j=0,xe=Be.length;j<xe;j++)se=Be[j],S.format!==ni?_e!==null?Ve?D&&t.compressedTexSubImage2D(n.TEXTURE_2D,j,0,0,se.width,se.height,_e,se.data):t.compressedTexImage2D(n.TEXTURE_2D,j,le,se.width,se.height,0,se.data):Le("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Ve?D&&t.texSubImage2D(n.TEXTURE_2D,j,0,0,se.width,se.height,_e,Se,se.data):t.texImage2D(n.TEXTURE_2D,j,le,se.width,se.height,0,_e,Se,se.data)}else if(S.isDataArrayTexture)if(Ve){if(rt&&t.texStorage3D(n.TEXTURE_2D_ARRAY,oe,le,K.width,K.height,K.depth),D)if(S.layerUpdates.size>0){const j=yp(K.width,K.height,S.format,S.type);for(const xe of S.layerUpdates){const ce=K.data.subarray(xe*j/K.data.BYTES_PER_ELEMENT,(xe+1)*j/K.data.BYTES_PER_ELEMENT);t.texSubImage3D(n.TEXTURE_2D_ARRAY,0,0,0,xe,K.width,K.height,1,_e,Se,ce)}S.clearLayerUpdates()}else t.texSubImage3D(n.TEXTURE_2D_ARRAY,0,0,0,0,K.width,K.height,K.depth,_e,Se,K.data)}else t.texImage3D(n.TEXTURE_2D_ARRAY,0,le,K.width,K.height,K.depth,0,_e,Se,K.data);else if(S.isData3DTexture)Ve?(rt&&t.texStorage3D(n.TEXTURE_3D,oe,le,K.width,K.height,K.depth),D&&t.texSubImage3D(n.TEXTURE_3D,0,0,0,0,K.width,K.height,K.depth,_e,Se,K.data)):t.texImage3D(n.TEXTURE_3D,0,le,K.width,K.height,K.depth,0,_e,Se,K.data);else if(S.isFramebufferTexture){if(rt)if(Ve)t.texStorage2D(n.TEXTURE_2D,oe,le,K.width,K.height);else{let j=K.width,xe=K.height;for(let ce=0;ce<oe;ce++)t.texImage2D(n.TEXTURE_2D,ce,le,j,xe,0,_e,Se,null),j>>=1,xe>>=1}}else if(S.isHTMLTexture){if("texElementImage2D"in n){const j=n.canvas;if(j.hasAttribute("layoutsubtree")||j.setAttribute("layoutsubtree","true"),K.parentNode!==j){j.appendChild(K),d.add(S),j.onpaint=Ge=>{const Nt=Ge.changedElements;for(const ft of d)Nt.includes(ft.image)&&(ft.needsUpdate=!0)},j.requestPaint();return}const xe=0,ce=n.RGBA,ee=n.RGBA,Te=n.UNSIGNED_BYTE;n.texElementImage2D(n.TEXTURE_2D,xe,ce,ee,Te,K),n.texParameteri(n.TEXTURE_2D,n.TEXTURE_MIN_FILTER,n.LINEAR),n.texParameteri(n.TEXTURE_2D,n.TEXTURE_WRAP_S,n.CLAMP_TO_EDGE),n.texParameteri(n.TEXTURE_2D,n.TEXTURE_WRAP_T,n.CLAMP_TO_EDGE)}}else if(Be.length>0){if(Ve&&rt){const j=Rt(Be[0]);t.texStorage2D(n.TEXTURE_2D,oe,le,j.width,j.height)}for(let j=0,xe=Be.length;j<xe;j++)se=Be[j],Ve?D&&t.texSubImage2D(n.TEXTURE_2D,j,0,0,_e,Se,se):t.texImage2D(n.TEXTURE_2D,j,le,_e,Se,se);S.generateMipmaps=!1}else if(Ve){if(rt){const j=Rt(K);t.texStorage2D(n.TEXTURE_2D,oe,le,j.width,j.height)}D&&t.texSubImage2D(n.TEXTURE_2D,0,0,0,_e,Se,K)}else t.texImage2D(n.TEXTURE_2D,0,le,_e,Se,K);m(S)&&v(Y),ue.__version=re.version,S.onUpdate&&S.onUpdate(S)}R.__version=S.version}function Oe(R,S,k){if(S.image.length!==6)return;const Y=q(R,S),te=S.source;t.bindTexture(n.TEXTURE_CUBE_MAP,R.__webglTexture,n.TEXTURE0+k);const re=i.get(te);if(te.version!==re.__version||Y===!0){t.activeTexture(n.TEXTURE0+k);const ue=Je.getPrimaries(Je.workingColorSpace),X=S.colorSpace===pr?null:Je.getPrimaries(S.colorSpace),K=S.colorSpace===pr||ue===X?n.NONE:n.BROWSER_DEFAULT_WEBGL;t.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,S.flipY),t.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,S.premultiplyAlpha),t.pixelStorei(n.UNPACK_ALIGNMENT,S.unpackAlignment),t.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,K);const _e=S.isCompressedTexture||S.image[0].isCompressedTexture,Se=S.image[0]&&S.image[0].isDataTexture,le=[];for(let ee=0;ee<6;ee++)!_e&&!Se?le[ee]=g(S.image[ee],!0,r.maxCubemapSize):le[ee]=Se?S.image[ee].image:S.image[ee],le[ee]=he(S,le[ee]);const se=le[0],Be=s.convert(S.format,S.colorSpace),Ve=s.convert(S.type),rt=x(S.internalFormat,Be,Ve,S.normalized,S.colorSpace),D=S.isVideoTexture!==!0,oe=re.__version===void 0||Y===!0,j=te.dataReady;let xe=E(S,se);Ie(n.TEXTURE_CUBE_MAP,S);let ce;if(_e){D&&oe&&t.texStorage2D(n.TEXTURE_CUBE_MAP,xe,rt,se.width,se.height);for(let ee=0;ee<6;ee++){ce=le[ee].mipmaps;for(let Te=0;Te<ce.length;Te++){const Ge=ce[Te];S.format!==ni?Be!==null?D?j&&t.compressedTexSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ee,Te,0,0,Ge.width,Ge.height,Be,Ge.data):t.compressedTexImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ee,Te,rt,Ge.width,Ge.height,0,Ge.data):Le("WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):D?j&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ee,Te,0,0,Ge.width,Ge.height,Be,Ve,Ge.data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ee,Te,rt,Ge.width,Ge.height,0,Be,Ve,Ge.data)}}}else{if(ce=S.mipmaps,D&&oe){ce.length>0&&xe++;const ee=Rt(le[0]);t.texStorage2D(n.TEXTURE_CUBE_MAP,xe,rt,ee.width,ee.height)}for(let ee=0;ee<6;ee++)if(Se){D?j&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ee,0,0,0,le[ee].width,le[ee].height,Be,Ve,le[ee].data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ee,0,rt,le[ee].width,le[ee].height,0,Be,Ve,le[ee].data);for(let Te=0;Te<ce.length;Te++){const Nt=ce[Te].image[ee].image;D?j&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ee,Te+1,0,0,Nt.width,Nt.height,Be,Ve,Nt.data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ee,Te+1,rt,Nt.width,Nt.height,0,Be,Ve,Nt.data)}}else{D?j&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ee,0,0,0,Be,Ve,le[ee]):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ee,0,rt,Be,Ve,le[ee]);for(let Te=0;Te<ce.length;Te++){const Ge=ce[Te];D?j&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ee,Te+1,0,0,Be,Ve,Ge.image[ee]):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ee,Te+1,rt,Be,Ve,Ge.image[ee])}}}m(S)&&v(n.TEXTURE_CUBE_MAP),re.__version=te.version,S.onUpdate&&S.onUpdate(S)}R.__version=S.version}function Ne(R,S,k,Y,te,re){const ue=s.convert(k.format,k.colorSpace),X=s.convert(k.type),K=x(k.internalFormat,ue,X,k.normalized,k.colorSpace),_e=i.get(S),Se=i.get(k);if(Se.__renderTarget=S,!_e.__hasExternalTextures){const le=Math.max(1,S.width>>re),se=Math.max(1,S.height>>re);te===n.TEXTURE_3D||te===n.TEXTURE_2D_ARRAY?t.texImage3D(te,re,K,le,se,S.depth,0,ue,X,null):t.texImage2D(te,re,K,le,se,0,ue,X,null)}t.bindFramebuffer(n.FRAMEBUFFER,R),Ze(S)?a.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,Y,te,Se.__webglTexture,0,Xt(S)):(te===n.TEXTURE_2D||te>=n.TEXTURE_CUBE_MAP_POSITIVE_X&&te<=n.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&n.framebufferTexture2D(n.FRAMEBUFFER,Y,te,Se.__webglTexture,re),t.bindFramebuffer(n.FRAMEBUFFER,null)}function bt(R,S,k){if(n.bindRenderbuffer(n.RENDERBUFFER,R),S.depthBuffer){const Y=S.depthTexture,te=Y&&Y.isDepthTexture?Y.type:null,re=M(S.stencilBuffer,te),ue=S.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT;Ze(S)?a.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,Xt(S),re,S.width,S.height):k?n.renderbufferStorageMultisample(n.RENDERBUFFER,Xt(S),re,S.width,S.height):n.renderbufferStorage(n.RENDERBUFFER,re,S.width,S.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,ue,n.RENDERBUFFER,R)}else{const Y=S.textures;for(let te=0;te<Y.length;te++){const re=Y[te],ue=s.convert(re.format,re.colorSpace),X=s.convert(re.type),K=x(re.internalFormat,ue,X,re.normalized,re.colorSpace);Ze(S)?a.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,Xt(S),K,S.width,S.height):k?n.renderbufferStorageMultisample(n.RENDERBUFFER,Xt(S),K,S.width,S.height):n.renderbufferStorage(n.RENDERBUFFER,K,S.width,S.height)}}n.bindRenderbuffer(n.RENDERBUFFER,null)}function je(R,S,k){const Y=S.isWebGLCubeRenderTarget===!0;if(t.bindFramebuffer(n.FRAMEBUFFER,R),!(S.depthTexture&&S.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");const te=i.get(S.depthTexture);if(te.__renderTarget=S,(!te.__webglTexture||S.depthTexture.image.width!==S.width||S.depthTexture.image.height!==S.height)&&(S.depthTexture.image.width=S.width,S.depthTexture.image.height=S.height,S.depthTexture.needsUpdate=!0),Y){if(te.__webglInit===void 0&&(te.__webglInit=!0,S.depthTexture.addEventListener("dispose",C)),te.__webglTexture===void 0){te.__webglTexture=n.createTexture(),t.bindTexture(n.TEXTURE_CUBE_MAP,te.__webglTexture),Ie(n.TEXTURE_CUBE_MAP,S.depthTexture);const _e=s.convert(S.depthTexture.format),Se=s.convert(S.depthTexture.type);let le;S.depthTexture.format===Ki?le=n.DEPTH_COMPONENT24:S.depthTexture.format===zr&&(le=n.DEPTH24_STENCIL8);for(let se=0;se<6;se++)n.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+se,0,le,S.width,S.height,0,_e,Se,null)}}else Z(S.depthTexture,0);const re=te.__webglTexture,ue=Xt(S),X=Y?n.TEXTURE_CUBE_MAP_POSITIVE_X+k:n.TEXTURE_2D,K=S.depthTexture.format===zr?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT;if(S.depthTexture.format===Ki)Ze(S)?a.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,K,X,re,0,ue):n.framebufferTexture2D(n.FRAMEBUFFER,K,X,re,0);else if(S.depthTexture.format===zr)Ze(S)?a.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,K,X,re,0,ue):n.framebufferTexture2D(n.FRAMEBUFFER,K,X,re,0);else throw new Error("Unknown depthTexture format")}function at(R){const S=i.get(R),k=R.isWebGLCubeRenderTarget===!0;if(S.__boundDepthTexture!==R.depthTexture){const Y=R.depthTexture;if(S.__depthDisposeCallback&&S.__depthDisposeCallback(),Y){const te=()=>{delete S.__boundDepthTexture,delete S.__depthDisposeCallback,Y.removeEventListener("dispose",te)};Y.addEventListener("dispose",te),S.__depthDisposeCallback=te}S.__boundDepthTexture=Y}if(R.depthTexture&&!S.__autoAllocateDepthBuffer)if(k)for(let Y=0;Y<6;Y++)je(S.__webglFramebuffer[Y],R,Y);else{const Y=R.texture.mipmaps;Y&&Y.length>0?je(S.__webglFramebuffer[0],R,0):je(S.__webglFramebuffer,R,0)}else if(k){S.__webglDepthbuffer=[];for(let Y=0;Y<6;Y++)if(t.bindFramebuffer(n.FRAMEBUFFER,S.__webglFramebuffer[Y]),S.__webglDepthbuffer[Y]===void 0)S.__webglDepthbuffer[Y]=n.createRenderbuffer(),bt(S.__webglDepthbuffer[Y],R,!1);else{const te=R.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,re=S.__webglDepthbuffer[Y];n.bindRenderbuffer(n.RENDERBUFFER,re),n.framebufferRenderbuffer(n.FRAMEBUFFER,te,n.RENDERBUFFER,re)}}else{const Y=R.texture.mipmaps;if(Y&&Y.length>0?t.bindFramebuffer(n.FRAMEBUFFER,S.__webglFramebuffer[0]):t.bindFramebuffer(n.FRAMEBUFFER,S.__webglFramebuffer),S.__webglDepthbuffer===void 0)S.__webglDepthbuffer=n.createRenderbuffer(),bt(S.__webglDepthbuffer,R,!1);else{const te=R.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,re=S.__webglDepthbuffer;n.bindRenderbuffer(n.RENDERBUFFER,re),n.framebufferRenderbuffer(n.FRAMEBUFFER,te,n.RENDERBUFFER,re)}}t.bindFramebuffer(n.FRAMEBUFFER,null)}function gt(R,S,k){const Y=i.get(R);S!==void 0&&Ne(Y.__webglFramebuffer,R,R.texture,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,0),k!==void 0&&at(R)}function Ye(R){const S=R.texture,k=i.get(R),Y=i.get(S);R.addEventListener("dispose",b);const te=R.textures,re=R.isWebGLCubeRenderTarget===!0,ue=te.length>1;if(ue||(Y.__webglTexture===void 0&&(Y.__webglTexture=n.createTexture()),Y.__version=S.version,o.memory.textures++),re){k.__webglFramebuffer=[];for(let X=0;X<6;X++)if(S.mipmaps&&S.mipmaps.length>0){k.__webglFramebuffer[X]=[];for(let K=0;K<S.mipmaps.length;K++)k.__webglFramebuffer[X][K]=n.createFramebuffer()}else k.__webglFramebuffer[X]=n.createFramebuffer()}else{if(S.mipmaps&&S.mipmaps.length>0){k.__webglFramebuffer=[];for(let X=0;X<S.mipmaps.length;X++)k.__webglFramebuffer[X]=n.createFramebuffer()}else k.__webglFramebuffer=n.createFramebuffer();if(ue)for(let X=0,K=te.length;X<K;X++){const _e=i.get(te[X]);_e.__webglTexture===void 0&&(_e.__webglTexture=n.createTexture(),o.memory.textures++)}if(R.samples>0&&Ze(R)===!1){k.__webglMultisampledFramebuffer=n.createFramebuffer(),k.__webglColorRenderbuffer=[],t.bindFramebuffer(n.FRAMEBUFFER,k.__webglMultisampledFramebuffer);for(let X=0;X<te.length;X++){const K=te[X];k.__webglColorRenderbuffer[X]=n.createRenderbuffer(),n.bindRenderbuffer(n.RENDERBUFFER,k.__webglColorRenderbuffer[X]);const _e=s.convert(K.format,K.colorSpace),Se=s.convert(K.type),le=x(K.internalFormat,_e,Se,K.normalized,K.colorSpace,R.isXRRenderTarget===!0),se=Xt(R);n.renderbufferStorageMultisample(n.RENDERBUFFER,se,le,R.width,R.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+X,n.RENDERBUFFER,k.__webglColorRenderbuffer[X])}n.bindRenderbuffer(n.RENDERBUFFER,null),R.depthBuffer&&(k.__webglDepthRenderbuffer=n.createRenderbuffer(),bt(k.__webglDepthRenderbuffer,R,!0)),t.bindFramebuffer(n.FRAMEBUFFER,null)}}if(re){t.bindTexture(n.TEXTURE_CUBE_MAP,Y.__webglTexture),Ie(n.TEXTURE_CUBE_MAP,S);for(let X=0;X<6;X++)if(S.mipmaps&&S.mipmaps.length>0)for(let K=0;K<S.mipmaps.length;K++)Ne(k.__webglFramebuffer[X][K],R,S,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+X,K);else Ne(k.__webglFramebuffer[X],R,S,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+X,0);m(S)&&v(n.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(ue){for(let X=0,K=te.length;X<K;X++){const _e=te[X],Se=i.get(_e);let le=n.TEXTURE_2D;(R.isWebGL3DRenderTarget||R.isWebGLArrayRenderTarget)&&(le=R.isWebGL3DRenderTarget?n.TEXTURE_3D:n.TEXTURE_2D_ARRAY),t.bindTexture(le,Se.__webglTexture),Ie(le,_e),Ne(k.__webglFramebuffer,R,_e,n.COLOR_ATTACHMENT0+X,le,0),m(_e)&&v(le)}t.unbindTexture()}else{let X=n.TEXTURE_2D;if((R.isWebGL3DRenderTarget||R.isWebGLArrayRenderTarget)&&(X=R.isWebGL3DRenderTarget?n.TEXTURE_3D:n.TEXTURE_2D_ARRAY),t.bindTexture(X,Y.__webglTexture),Ie(X,S),S.mipmaps&&S.mipmaps.length>0)for(let K=0;K<S.mipmaps.length;K++)Ne(k.__webglFramebuffer[K],R,S,n.COLOR_ATTACHMENT0,X,K);else Ne(k.__webglFramebuffer,R,S,n.COLOR_ATTACHMENT0,X,0);m(S)&&v(X),t.unbindTexture()}R.depthBuffer&&at(R)}function $t(R){const S=R.textures;for(let k=0,Y=S.length;k<Y;k++){const te=S[k];if(m(te)){const re=y(R),ue=i.get(te).__webglTexture;t.bindTexture(re,ue),v(re),t.unbindTexture()}}}const wt=[],Mn=[];function U(R){if(R.samples>0){if(Ze(R)===!1){const S=R.textures,k=R.width,Y=R.height;let te=n.COLOR_BUFFER_BIT;const re=R.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,ue=i.get(R),X=S.length>1;if(X)for(let _e=0;_e<S.length;_e++)t.bindFramebuffer(n.FRAMEBUFFER,ue.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+_e,n.RENDERBUFFER,null),t.bindFramebuffer(n.FRAMEBUFFER,ue.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+_e,n.TEXTURE_2D,null,0);t.bindFramebuffer(n.READ_FRAMEBUFFER,ue.__webglMultisampledFramebuffer);const K=R.texture.mipmaps;K&&K.length>0?t.bindFramebuffer(n.DRAW_FRAMEBUFFER,ue.__webglFramebuffer[0]):t.bindFramebuffer(n.DRAW_FRAMEBUFFER,ue.__webglFramebuffer);for(let _e=0;_e<S.length;_e++){if(R.resolveDepthBuffer&&(R.depthBuffer&&(te|=n.DEPTH_BUFFER_BIT),R.stencilBuffer&&R.resolveStencilBuffer&&(te|=n.STENCIL_BUFFER_BIT)),X){n.framebufferRenderbuffer(n.READ_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.RENDERBUFFER,ue.__webglColorRenderbuffer[_e]);const Se=i.get(S[_e]).__webglTexture;n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,Se,0)}n.blitFramebuffer(0,0,k,Y,0,0,k,Y,te,n.NEAREST),l===!0&&(wt.length=0,Mn.length=0,wt.push(n.COLOR_ATTACHMENT0+_e),R.depthBuffer&&R.resolveDepthBuffer===!1&&(wt.push(re),Mn.push(re),n.invalidateFramebuffer(n.DRAW_FRAMEBUFFER,Mn)),n.invalidateFramebuffer(n.READ_FRAMEBUFFER,wt))}if(t.bindFramebuffer(n.READ_FRAMEBUFFER,null),t.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),X)for(let _e=0;_e<S.length;_e++){t.bindFramebuffer(n.FRAMEBUFFER,ue.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+_e,n.RENDERBUFFER,ue.__webglColorRenderbuffer[_e]);const Se=i.get(S[_e]).__webglTexture;t.bindFramebuffer(n.FRAMEBUFFER,ue.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+_e,n.TEXTURE_2D,Se,0)}t.bindFramebuffer(n.DRAW_FRAMEBUFFER,ue.__webglMultisampledFramebuffer)}else if(R.depthBuffer&&R.resolveDepthBuffer===!1&&l){const S=R.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT;n.invalidateFramebuffer(n.DRAW_FRAMEBUFFER,[S])}}}function Xt(R){return Math.min(r.maxSamples,R.samples)}function Ze(R){const S=i.get(R);return R.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&S.__useRenderToTexture!==!1}function yt(R){const S=o.render.frame;u.get(R)!==S&&(u.set(R,S),R.update())}function he(R,S){const k=R.colorSpace,Y=R.format,te=R.type;return R.isCompressedTexture===!0||R.isVideoTexture===!0||k!==ml&&k!==pr&&(Je.getTransfer(k)===dt?(Y!==ni||te!==kn)&&Le("WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):Qe("WebGLTextures: Unsupported texture color space:",k)),S}function Rt(R){return typeof HTMLImageElement<"u"&&R instanceof HTMLImageElement?(c.width=R.naturalWidth||R.width,c.height=R.naturalHeight||R.height):typeof VideoFrame<"u"&&R instanceof VideoFrame?(c.width=R.displayWidth,c.height=R.displayHeight):(c.width=R.width,c.height=R.height),c}this.allocateTextureUnit=B,this.resetTextureUnits=$,this.getTextureUnits=W,this.setTextureUnits=I,this.setTexture2D=Z,this.setTexture2DArray=J,this.setTexture3D=ne,this.setTextureCube=de,this.rebindTextures=gt,this.setupRenderTarget=Ye,this.updateRenderTargetMipmap=$t,this.updateMultisampleRenderTarget=U,this.setupDepthRenderbuffer=at,this.setupFrameBufferTexture=Ne,this.useMultisampledRTT=Ze,this.isReversedDepthBuffer=function(){return t.buffers.depth.getReversed()}}function h1(n,e){function t(i,r=pr){let s;const o=Je.getTransfer(r);if(i===kn)return n.UNSIGNED_BYTE;if(i===Zd)return n.UNSIGNED_SHORT_4_4_4_4;if(i===Jd)return n.UNSIGNED_SHORT_5_5_5_1;if(i===__)return n.UNSIGNED_INT_5_9_9_9_REV;if(i===v_)return n.UNSIGNED_INT_10F_11F_11F_REV;if(i===m_)return n.BYTE;if(i===g_)return n.SHORT;if(i===Io)return n.UNSIGNED_SHORT;if(i===Kd)return n.INT;if(i===xi)return n.UNSIGNED_INT;if(i===fi)return n.FLOAT;if(i===qi)return n.HALF_FLOAT;if(i===x_)return n.ALPHA;if(i===b_)return n.RGB;if(i===ni)return n.RGBA;if(i===Ki)return n.DEPTH_COMPONENT;if(i===zr)return n.DEPTH_STENCIL;if(i===y_)return n.RED;if(i===Qd)return n.RED_INTEGER;if(i===jr)return n.RG;if(i===eh)return n.RG_INTEGER;if(i===th)return n.RGBA_INTEGER;if(i===Va||i===Wa||i===$a||i===Xa)if(o===dt)if(s=e.get("WEBGL_compressed_texture_s3tc_srgb"),s!==null){if(i===Va)return s.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(i===Wa)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(i===$a)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(i===Xa)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(s=e.get("WEBGL_compressed_texture_s3tc"),s!==null){if(i===Va)return s.COMPRESSED_RGB_S3TC_DXT1_EXT;if(i===Wa)return s.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(i===$a)return s.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(i===Xa)return s.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(i===Uu||i===Fu||i===Ou||i===ku)if(s=e.get("WEBGL_compressed_texture_pvrtc"),s!==null){if(i===Uu)return s.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(i===Fu)return s.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(i===Ou)return s.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(i===ku)return s.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(i===Bu||i===zu||i===Gu||i===Hu||i===Vu||i===fl||i===Wu)if(s=e.get("WEBGL_compressed_texture_etc"),s!==null){if(i===Bu||i===zu)return o===dt?s.COMPRESSED_SRGB8_ETC2:s.COMPRESSED_RGB8_ETC2;if(i===Gu)return o===dt?s.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:s.COMPRESSED_RGBA8_ETC2_EAC;if(i===Hu)return s.COMPRESSED_R11_EAC;if(i===Vu)return s.COMPRESSED_SIGNED_R11_EAC;if(i===fl)return s.COMPRESSED_RG11_EAC;if(i===Wu)return s.COMPRESSED_SIGNED_RG11_EAC}else return null;if(i===$u||i===Xu||i===ju||i===Yu||i===qu||i===Ku||i===Zu||i===Ju||i===Qu||i===ed||i===td||i===nd||i===id||i===rd)if(s=e.get("WEBGL_compressed_texture_astc"),s!==null){if(i===$u)return o===dt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:s.COMPRESSED_RGBA_ASTC_4x4_KHR;if(i===Xu)return o===dt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:s.COMPRESSED_RGBA_ASTC_5x4_KHR;if(i===ju)return o===dt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:s.COMPRESSED_RGBA_ASTC_5x5_KHR;if(i===Yu)return o===dt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:s.COMPRESSED_RGBA_ASTC_6x5_KHR;if(i===qu)return o===dt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:s.COMPRESSED_RGBA_ASTC_6x6_KHR;if(i===Ku)return o===dt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:s.COMPRESSED_RGBA_ASTC_8x5_KHR;if(i===Zu)return o===dt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:s.COMPRESSED_RGBA_ASTC_8x6_KHR;if(i===Ju)return o===dt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:s.COMPRESSED_RGBA_ASTC_8x8_KHR;if(i===Qu)return o===dt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:s.COMPRESSED_RGBA_ASTC_10x5_KHR;if(i===ed)return o===dt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:s.COMPRESSED_RGBA_ASTC_10x6_KHR;if(i===td)return o===dt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:s.COMPRESSED_RGBA_ASTC_10x8_KHR;if(i===nd)return o===dt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:s.COMPRESSED_RGBA_ASTC_10x10_KHR;if(i===id)return o===dt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:s.COMPRESSED_RGBA_ASTC_12x10_KHR;if(i===rd)return o===dt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:s.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(i===sd||i===od||i===ad)if(s=e.get("EXT_texture_compression_bptc"),s!==null){if(i===sd)return o===dt?s.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:s.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(i===od)return s.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(i===ad)return s.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(i===ld||i===cd||i===pl||i===ud)if(s=e.get("EXT_texture_compression_rgtc"),s!==null){if(i===ld)return s.COMPRESSED_RED_RGTC1_EXT;if(i===cd)return s.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(i===pl)return s.COMPRESSED_RED_GREEN_RGTC2_EXT;if(i===ud)return s.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return i===Uo?n.UNSIGNED_INT_24_8:n[i]!==void 0?n[i]:null}return{convert:t}}const f1=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,p1=`
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

}`;class m1{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t){if(this.texture===null){const i=new P_(e.texture);(e.depthNear!==t.depthNear||e.depthFar!==t.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=i}}getMesh(e){if(this.texture!==null&&this.mesh===null){const t=e.cameras[0].viewport,i=new yi({vertexShader:f1,fragmentShader:p1,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new bi(new $l(20,20),i)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class g1 extends Tr{constructor(e,t){super();const i=this;let r=null,s=1,o=null,a="local-floor",l=1,c=null,u=null,d=null,h=null,f=null,p=null;const _=typeof XRWebGLBinding<"u",g=new m1,m={},v=t.getContextAttributes();let y=null,x=null;const M=[],E=[],C=new We;let b=null;const A=new Fn;A.viewport=new zt;const L=new Fn;L.viewport=new zt;const P=[A,L],F=new EE;let $=null,W=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(q){let pe=M[q];return pe===void 0&&(pe=new Rc,M[q]=pe),pe.getTargetRaySpace()},this.getControllerGrip=function(q){let pe=M[q];return pe===void 0&&(pe=new Rc,M[q]=pe),pe.getGripSpace()},this.getHand=function(q){let pe=M[q];return pe===void 0&&(pe=new Rc,M[q]=pe),pe.getHandSpace()};function I(q){const pe=E.indexOf(q.inputSource);if(pe===-1)return;const ie=M[pe];ie!==void 0&&(ie.update(q.inputSource,q.frame,c||o),ie.dispatchEvent({type:q.type,data:q.inputSource}))}function B(){r.removeEventListener("select",I),r.removeEventListener("selectstart",I),r.removeEventListener("selectend",I),r.removeEventListener("squeeze",I),r.removeEventListener("squeezestart",I),r.removeEventListener("squeezeend",I),r.removeEventListener("end",B),r.removeEventListener("inputsourceschange",H);for(let q=0;q<M.length;q++){const pe=E[q];pe!==null&&(E[q]=null,M[q].disconnect(pe))}$=null,W=null,g.reset();for(const q in m)delete m[q];e.setRenderTarget(y),f=null,h=null,d=null,r=null,x=null,Ie.stop(),i.isPresenting=!1,e.setPixelRatio(b),e.setSize(C.width,C.height,!1),i.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(q){s=q,i.isPresenting===!0&&Le("WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(q){a=q,i.isPresenting===!0&&Le("WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||o},this.setReferenceSpace=function(q){c=q},this.getBaseLayer=function(){return h!==null?h:f},this.getBinding=function(){return d===null&&_&&(d=new XRWebGLBinding(r,t)),d},this.getFrame=function(){return p},this.getSession=function(){return r},this.setSession=async function(q){if(r=q,r!==null){if(y=e.getRenderTarget(),r.addEventListener("select",I),r.addEventListener("selectstart",I),r.addEventListener("selectend",I),r.addEventListener("squeeze",I),r.addEventListener("squeezestart",I),r.addEventListener("squeezeend",I),r.addEventListener("end",B),r.addEventListener("inputsourceschange",H),v.xrCompatible!==!0&&await t.makeXRCompatible(),b=e.getPixelRatio(),e.getSize(C),_&&"createProjectionLayer"in XRWebGLBinding.prototype){let ie=null,Ce=null,Oe=null;v.depth&&(Oe=v.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,ie=v.stencil?zr:Ki,Ce=v.stencil?Uo:xi);const Ne={colorFormat:t.RGBA8,depthFormat:Oe,scaleFactor:s};d=this.getBinding(),h=d.createProjectionLayer(Ne),r.updateRenderState({layers:[h]}),e.setPixelRatio(1),e.setSize(h.textureWidth,h.textureHeight,!1),x=new gi(h.textureWidth,h.textureHeight,{format:ni,type:kn,depthTexture:new ks(h.textureWidth,h.textureHeight,Ce,void 0,void 0,void 0,void 0,void 0,void 0,ie),stencilBuffer:v.stencil,colorSpace:e.outputColorSpace,samples:v.antialias?4:0,resolveDepthBuffer:h.ignoreDepthValues===!1,resolveStencilBuffer:h.ignoreDepthValues===!1})}else{const ie={antialias:v.antialias,alpha:!0,depth:v.depth,stencil:v.stencil,framebufferScaleFactor:s};f=new XRWebGLLayer(r,t,ie),r.updateRenderState({baseLayer:f}),e.setPixelRatio(1),e.setSize(f.framebufferWidth,f.framebufferHeight,!1),x=new gi(f.framebufferWidth,f.framebufferHeight,{format:ni,type:kn,colorSpace:e.outputColorSpace,stencilBuffer:v.stencil,resolveDepthBuffer:f.ignoreDepthValues===!1,resolveStencilBuffer:f.ignoreDepthValues===!1})}x.isXRRenderTarget=!0,this.setFoveation(l),c=null,o=await r.requestReferenceSpace(a),Ie.setContext(r),Ie.start(),i.isPresenting=!0,i.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(r!==null)return r.environmentBlendMode},this.getDepthTexture=function(){return g.getDepthTexture()};function H(q){for(let pe=0;pe<q.removed.length;pe++){const ie=q.removed[pe],Ce=E.indexOf(ie);Ce>=0&&(E[Ce]=null,M[Ce].disconnect(ie))}for(let pe=0;pe<q.added.length;pe++){const ie=q.added[pe];let Ce=E.indexOf(ie);if(Ce===-1){for(let Ne=0;Ne<M.length;Ne++)if(Ne>=E.length){E.push(ie),Ce=Ne;break}else if(E[Ne]===null){E[Ne]=ie,Ce=Ne;break}if(Ce===-1)break}const Oe=M[Ce];Oe&&Oe.connect(ie)}}const Z=new N,J=new N;function ne(q,pe,ie){Z.setFromMatrixPosition(pe.matrixWorld),J.setFromMatrixPosition(ie.matrixWorld);const Ce=Z.distanceTo(J),Oe=pe.projectionMatrix.elements,Ne=ie.projectionMatrix.elements,bt=Oe[14]/(Oe[10]-1),je=Oe[14]/(Oe[10]+1),at=(Oe[9]+1)/Oe[5],gt=(Oe[9]-1)/Oe[5],Ye=(Oe[8]-1)/Oe[0],$t=(Ne[8]+1)/Ne[0],wt=bt*Ye,Mn=bt*$t,U=Ce/(-Ye+$t),Xt=U*-Ye;if(pe.matrixWorld.decompose(q.position,q.quaternion,q.scale),q.translateX(Xt),q.translateZ(U),q.matrixWorld.compose(q.position,q.quaternion,q.scale),q.matrixWorldInverse.copy(q.matrixWorld).invert(),Oe[10]===-1)q.projectionMatrix.copy(pe.projectionMatrix),q.projectionMatrixInverse.copy(pe.projectionMatrixInverse);else{const Ze=bt+U,yt=je+U,he=wt-Xt,Rt=Mn+(Ce-Xt),R=at*je/yt*Ze,S=gt*je/yt*Ze;q.projectionMatrix.makePerspective(he,Rt,R,S,Ze,yt),q.projectionMatrixInverse.copy(q.projectionMatrix).invert()}}function de(q,pe){pe===null?q.matrixWorld.copy(q.matrix):q.matrixWorld.multiplyMatrices(pe.matrixWorld,q.matrix),q.matrixWorldInverse.copy(q.matrixWorld).invert()}this.updateCamera=function(q){if(r===null)return;let pe=q.near,ie=q.far;g.texture!==null&&(g.depthNear>0&&(pe=g.depthNear),g.depthFar>0&&(ie=g.depthFar)),F.near=L.near=A.near=pe,F.far=L.far=A.far=ie,($!==F.near||W!==F.far)&&(r.updateRenderState({depthNear:F.near,depthFar:F.far}),$=F.near,W=F.far),F.layers.mask=q.layers.mask|6,A.layers.mask=F.layers.mask&-5,L.layers.mask=F.layers.mask&-3;const Ce=q.parent,Oe=F.cameras;de(F,Ce);for(let Ne=0;Ne<Oe.length;Ne++)de(Oe[Ne],Ce);Oe.length===2?ne(F,A,L):F.projectionMatrix.copy(A.projectionMatrix),ye(q,F,Ce)};function ye(q,pe,ie){ie===null?q.matrix.copy(pe.matrixWorld):(q.matrix.copy(ie.matrixWorld),q.matrix.invert(),q.matrix.multiply(pe.matrixWorld)),q.matrix.decompose(q.position,q.quaternion,q.scale),q.updateMatrixWorld(!0),q.projectionMatrix.copy(pe.projectionMatrix),q.projectionMatrixInverse.copy(pe.projectionMatrixInverse),q.isPerspectiveCamera&&(q.fov=hd*2*Math.atan(1/q.projectionMatrix.elements[5]),q.zoom=1)}this.getCamera=function(){return F},this.getFoveation=function(){if(!(h===null&&f===null))return l},this.setFoveation=function(q){l=q,h!==null&&(h.fixedFoveation=q),f!==null&&f.fixedFoveation!==void 0&&(f.fixedFoveation=q)},this.hasDepthSensing=function(){return g.texture!==null},this.getDepthSensingMesh=function(){return g.getMesh(F)},this.getCameraTexture=function(q){return m[q]};let Fe=null;function tt(q,pe){if(u=pe.getViewerPose(c||o),p=pe,u!==null){const ie=u.views;f!==null&&(e.setRenderTargetFramebuffer(x,f.framebuffer),e.setRenderTarget(x));let Ce=!1;ie.length!==F.cameras.length&&(F.cameras.length=0,Ce=!0);for(let je=0;je<ie.length;je++){const at=ie[je];let gt=null;if(f!==null)gt=f.getViewport(at);else{const $t=d.getViewSubImage(h,at);gt=$t.viewport,je===0&&(e.setRenderTargetTextures(x,$t.colorTexture,$t.depthStencilTexture),e.setRenderTarget(x))}let Ye=P[je];Ye===void 0&&(Ye=new Fn,Ye.layers.enable(je),Ye.viewport=new zt,P[je]=Ye),Ye.matrix.fromArray(at.transform.matrix),Ye.matrix.decompose(Ye.position,Ye.quaternion,Ye.scale),Ye.projectionMatrix.fromArray(at.projectionMatrix),Ye.projectionMatrixInverse.copy(Ye.projectionMatrix).invert(),Ye.viewport.set(gt.x,gt.y,gt.width,gt.height),je===0&&(F.matrix.copy(Ye.matrix),F.matrix.decompose(F.position,F.quaternion,F.scale)),Ce===!0&&F.cameras.push(Ye)}const Oe=r.enabledFeatures;if(Oe&&Oe.includes("depth-sensing")&&r.depthUsage=="gpu-optimized"&&_){d=i.getBinding();const je=d.getDepthInformation(ie[0]);je&&je.isValid&&je.texture&&g.init(je,r.renderState)}if(Oe&&Oe.includes("camera-access")&&_){e.state.unbindTexture(),d=i.getBinding();for(let je=0;je<ie.length;je++){const at=ie[je].camera;if(at){let gt=m[at];gt||(gt=new P_,m[at]=gt);const Ye=d.getCameraImage(at);gt.sourceTexture=Ye}}}}for(let ie=0;ie<M.length;ie++){const Ce=E[ie],Oe=M[ie];Ce!==null&&Oe!==void 0&&Oe.update(Ce,pe,c||o)}Fe&&Fe(q,pe),pe.detectedPlanes&&i.dispatchEvent({type:"planesdetected",data:pe}),p=null}const Ie=new U_;Ie.setAnimationLoop(tt),this.setAnimationLoop=function(q){Fe=q},this.dispose=function(){}}}const _1=new Ct,H_=new ze;H_.set(-1,0,0,0,1,0,0,0,1);function v1(n,e){function t(g,m){g.matrixAutoUpdate===!0&&g.updateMatrix(),m.value.copy(g.matrix)}function i(g,m){m.color.getRGB(g.fogColor.value,D_(n)),m.isFog?(g.fogNear.value=m.near,g.fogFar.value=m.far):m.isFogExp2&&(g.fogDensity.value=m.density)}function r(g,m,v,y,x){m.isNodeMaterial?m.uniformsNeedUpdate=!1:m.isMeshBasicMaterial?s(g,m):m.isMeshLambertMaterial?(s(g,m),m.envMap&&(g.envMapIntensity.value=m.envMapIntensity)):m.isMeshToonMaterial?(s(g,m),d(g,m)):m.isMeshPhongMaterial?(s(g,m),u(g,m),m.envMap&&(g.envMapIntensity.value=m.envMapIntensity)):m.isMeshStandardMaterial?(s(g,m),h(g,m),m.isMeshPhysicalMaterial&&f(g,m,x)):m.isMeshMatcapMaterial?(s(g,m),p(g,m)):m.isMeshDepthMaterial?s(g,m):m.isMeshDistanceMaterial?(s(g,m),_(g,m)):m.isMeshNormalMaterial?s(g,m):m.isLineBasicMaterial?(o(g,m),m.isLineDashedMaterial&&a(g,m)):m.isPointsMaterial?l(g,m,v,y):m.isSpriteMaterial?c(g,m):m.isShadowMaterial?(g.color.value.copy(m.color),g.opacity.value=m.opacity):m.isShaderMaterial&&(m.uniformsNeedUpdate=!1)}function s(g,m){g.opacity.value=m.opacity,m.color&&g.diffuse.value.copy(m.color),m.emissive&&g.emissive.value.copy(m.emissive).multiplyScalar(m.emissiveIntensity),m.map&&(g.map.value=m.map,t(m.map,g.mapTransform)),m.alphaMap&&(g.alphaMap.value=m.alphaMap,t(m.alphaMap,g.alphaMapTransform)),m.bumpMap&&(g.bumpMap.value=m.bumpMap,t(m.bumpMap,g.bumpMapTransform),g.bumpScale.value=m.bumpScale,m.side===Sn&&(g.bumpScale.value*=-1)),m.normalMap&&(g.normalMap.value=m.normalMap,t(m.normalMap,g.normalMapTransform),g.normalScale.value.copy(m.normalScale),m.side===Sn&&g.normalScale.value.negate()),m.displacementMap&&(g.displacementMap.value=m.displacementMap,t(m.displacementMap,g.displacementMapTransform),g.displacementScale.value=m.displacementScale,g.displacementBias.value=m.displacementBias),m.emissiveMap&&(g.emissiveMap.value=m.emissiveMap,t(m.emissiveMap,g.emissiveMapTransform)),m.specularMap&&(g.specularMap.value=m.specularMap,t(m.specularMap,g.specularMapTransform)),m.alphaTest>0&&(g.alphaTest.value=m.alphaTest);const v=e.get(m),y=v.envMap,x=v.envMapRotation;y&&(g.envMap.value=y,g.envMapRotation.value.setFromMatrix4(_1.makeRotationFromEuler(x)).transpose(),y.isCubeTexture&&y.isRenderTargetTexture===!1&&g.envMapRotation.value.premultiply(H_),g.reflectivity.value=m.reflectivity,g.ior.value=m.ior,g.refractionRatio.value=m.refractionRatio),m.lightMap&&(g.lightMap.value=m.lightMap,g.lightMapIntensity.value=m.lightMapIntensity,t(m.lightMap,g.lightMapTransform)),m.aoMap&&(g.aoMap.value=m.aoMap,g.aoMapIntensity.value=m.aoMapIntensity,t(m.aoMap,g.aoMapTransform))}function o(g,m){g.diffuse.value.copy(m.color),g.opacity.value=m.opacity,m.map&&(g.map.value=m.map,t(m.map,g.mapTransform))}function a(g,m){g.dashSize.value=m.dashSize,g.totalSize.value=m.dashSize+m.gapSize,g.scale.value=m.scale}function l(g,m,v,y){g.diffuse.value.copy(m.color),g.opacity.value=m.opacity,g.size.value=m.size*v,g.scale.value=y*.5,m.map&&(g.map.value=m.map,t(m.map,g.uvTransform)),m.alphaMap&&(g.alphaMap.value=m.alphaMap,t(m.alphaMap,g.alphaMapTransform)),m.alphaTest>0&&(g.alphaTest.value=m.alphaTest)}function c(g,m){g.diffuse.value.copy(m.color),g.opacity.value=m.opacity,g.rotation.value=m.rotation,m.map&&(g.map.value=m.map,t(m.map,g.mapTransform)),m.alphaMap&&(g.alphaMap.value=m.alphaMap,t(m.alphaMap,g.alphaMapTransform)),m.alphaTest>0&&(g.alphaTest.value=m.alphaTest)}function u(g,m){g.specular.value.copy(m.specular),g.shininess.value=Math.max(m.shininess,1e-4)}function d(g,m){m.gradientMap&&(g.gradientMap.value=m.gradientMap)}function h(g,m){g.metalness.value=m.metalness,m.metalnessMap&&(g.metalnessMap.value=m.metalnessMap,t(m.metalnessMap,g.metalnessMapTransform)),g.roughness.value=m.roughness,m.roughnessMap&&(g.roughnessMap.value=m.roughnessMap,t(m.roughnessMap,g.roughnessMapTransform)),m.envMap&&(g.envMapIntensity.value=m.envMapIntensity)}function f(g,m,v){g.ior.value=m.ior,m.sheen>0&&(g.sheenColor.value.copy(m.sheenColor).multiplyScalar(m.sheen),g.sheenRoughness.value=m.sheenRoughness,m.sheenColorMap&&(g.sheenColorMap.value=m.sheenColorMap,t(m.sheenColorMap,g.sheenColorMapTransform)),m.sheenRoughnessMap&&(g.sheenRoughnessMap.value=m.sheenRoughnessMap,t(m.sheenRoughnessMap,g.sheenRoughnessMapTransform))),m.clearcoat>0&&(g.clearcoat.value=m.clearcoat,g.clearcoatRoughness.value=m.clearcoatRoughness,m.clearcoatMap&&(g.clearcoatMap.value=m.clearcoatMap,t(m.clearcoatMap,g.clearcoatMapTransform)),m.clearcoatRoughnessMap&&(g.clearcoatRoughnessMap.value=m.clearcoatRoughnessMap,t(m.clearcoatRoughnessMap,g.clearcoatRoughnessMapTransform)),m.clearcoatNormalMap&&(g.clearcoatNormalMap.value=m.clearcoatNormalMap,t(m.clearcoatNormalMap,g.clearcoatNormalMapTransform),g.clearcoatNormalScale.value.copy(m.clearcoatNormalScale),m.side===Sn&&g.clearcoatNormalScale.value.negate())),m.dispersion>0&&(g.dispersion.value=m.dispersion),m.iridescence>0&&(g.iridescence.value=m.iridescence,g.iridescenceIOR.value=m.iridescenceIOR,g.iridescenceThicknessMinimum.value=m.iridescenceThicknessRange[0],g.iridescenceThicknessMaximum.value=m.iridescenceThicknessRange[1],m.iridescenceMap&&(g.iridescenceMap.value=m.iridescenceMap,t(m.iridescenceMap,g.iridescenceMapTransform)),m.iridescenceThicknessMap&&(g.iridescenceThicknessMap.value=m.iridescenceThicknessMap,t(m.iridescenceThicknessMap,g.iridescenceThicknessMapTransform))),m.transmission>0&&(g.transmission.value=m.transmission,g.transmissionSamplerMap.value=v.texture,g.transmissionSamplerSize.value.set(v.width,v.height),m.transmissionMap&&(g.transmissionMap.value=m.transmissionMap,t(m.transmissionMap,g.transmissionMapTransform)),g.thickness.value=m.thickness,m.thicknessMap&&(g.thicknessMap.value=m.thicknessMap,t(m.thicknessMap,g.thicknessMapTransform)),g.attenuationDistance.value=m.attenuationDistance,g.attenuationColor.value.copy(m.attenuationColor)),m.anisotropy>0&&(g.anisotropyVector.value.set(m.anisotropy*Math.cos(m.anisotropyRotation),m.anisotropy*Math.sin(m.anisotropyRotation)),m.anisotropyMap&&(g.anisotropyMap.value=m.anisotropyMap,t(m.anisotropyMap,g.anisotropyMapTransform))),g.specularIntensity.value=m.specularIntensity,g.specularColor.value.copy(m.specularColor),m.specularColorMap&&(g.specularColorMap.value=m.specularColorMap,t(m.specularColorMap,g.specularColorMapTransform)),m.specularIntensityMap&&(g.specularIntensityMap.value=m.specularIntensityMap,t(m.specularIntensityMap,g.specularIntensityMapTransform))}function p(g,m){m.matcap&&(g.matcap.value=m.matcap)}function _(g,m){const v=e.get(m).light;g.referencePosition.value.setFromMatrixPosition(v.matrixWorld),g.nearDistance.value=v.shadow.camera.near,g.farDistance.value=v.shadow.camera.far}return{refreshFogUniforms:i,refreshMaterialUniforms:r}}function x1(n,e,t,i){let r={},s={},o=[];const a=n.getParameter(n.MAX_UNIFORM_BUFFER_BINDINGS);function l(v,y){const x=y.program;i.uniformBlockBinding(v,x)}function c(v,y){let x=r[v.id];x===void 0&&(p(v),x=u(v),r[v.id]=x,v.addEventListener("dispose",g));const M=y.program;i.updateUBOMapping(v,M);const E=e.render.frame;s[v.id]!==E&&(h(v),s[v.id]=E)}function u(v){const y=d();v.__bindingPointIndex=y;const x=n.createBuffer(),M=v.__size,E=v.usage;return n.bindBuffer(n.UNIFORM_BUFFER,x),n.bufferData(n.UNIFORM_BUFFER,M,E),n.bindBuffer(n.UNIFORM_BUFFER,null),n.bindBufferBase(n.UNIFORM_BUFFER,y,x),x}function d(){for(let v=0;v<a;v++)if(o.indexOf(v)===-1)return o.push(v),v;return Qe("WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function h(v){const y=r[v.id],x=v.uniforms,M=v.__cache;n.bindBuffer(n.UNIFORM_BUFFER,y);for(let E=0,C=x.length;E<C;E++){const b=Array.isArray(x[E])?x[E]:[x[E]];for(let A=0,L=b.length;A<L;A++){const P=b[A];if(f(P,E,A,M)===!0){const F=P.__offset,$=Array.isArray(P.value)?P.value:[P.value];let W=0;for(let I=0;I<$.length;I++){const B=$[I],H=_(B);typeof B=="number"||typeof B=="boolean"?(P.__data[0]=B,n.bufferSubData(n.UNIFORM_BUFFER,F+W,P.__data)):B.isMatrix3?(P.__data[0]=B.elements[0],P.__data[1]=B.elements[1],P.__data[2]=B.elements[2],P.__data[3]=0,P.__data[4]=B.elements[3],P.__data[5]=B.elements[4],P.__data[6]=B.elements[5],P.__data[7]=0,P.__data[8]=B.elements[6],P.__data[9]=B.elements[7],P.__data[10]=B.elements[8],P.__data[11]=0):ArrayBuffer.isView(B)?P.__data.set(new B.constructor(B.buffer,B.byteOffset,P.__data.length)):(B.toArray(P.__data,W),W+=H.storage/Float32Array.BYTES_PER_ELEMENT)}n.bufferSubData(n.UNIFORM_BUFFER,F,P.__data)}}}n.bindBuffer(n.UNIFORM_BUFFER,null)}function f(v,y,x,M){const E=v.value,C=y+"_"+x;if(M[C]===void 0)return typeof E=="number"||typeof E=="boolean"?M[C]=E:ArrayBuffer.isView(E)?M[C]=E.slice():M[C]=E.clone(),!0;{const b=M[C];if(typeof E=="number"||typeof E=="boolean"){if(b!==E)return M[C]=E,!0}else{if(ArrayBuffer.isView(E))return!0;if(b.equals(E)===!1)return b.copy(E),!0}}return!1}function p(v){const y=v.uniforms;let x=0;const M=16;for(let C=0,b=y.length;C<b;C++){const A=Array.isArray(y[C])?y[C]:[y[C]];for(let L=0,P=A.length;L<P;L++){const F=A[L],$=Array.isArray(F.value)?F.value:[F.value];for(let W=0,I=$.length;W<I;W++){const B=$[W],H=_(B),Z=x%M,J=Z%H.boundary,ne=Z+J;x+=J,ne!==0&&M-ne<H.storage&&(x+=M-ne),F.__data=new Float32Array(H.storage/Float32Array.BYTES_PER_ELEMENT),F.__offset=x,x+=H.storage}}}const E=x%M;return E>0&&(x+=M-E),v.__size=x,v.__cache={},this}function _(v){const y={boundary:0,storage:0};return typeof v=="number"||typeof v=="boolean"?(y.boundary=4,y.storage=4):v.isVector2?(y.boundary=8,y.storage=8):v.isVector3||v.isColor?(y.boundary=16,y.storage=12):v.isVector4?(y.boundary=16,y.storage=16):v.isMatrix3?(y.boundary=48,y.storage=48):v.isMatrix4?(y.boundary=64,y.storage=64):v.isTexture?Le("WebGLRenderer: Texture samplers can not be part of an uniforms group."):ArrayBuffer.isView(v)?(y.boundary=16,y.storage=v.byteLength):Le("WebGLRenderer: Unsupported uniform value type.",v),y}function g(v){const y=v.target;y.removeEventListener("dispose",g);const x=o.indexOf(y.__bindingPointIndex);o.splice(x,1),n.deleteBuffer(r[y.id]),delete r[y.id],delete s[y.id]}function m(){for(const v in r)n.deleteBuffer(r[v]);o=[],r={},s={}}return{bind:l,update:c,dispose:m}}const b1=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]);let ci=null;function y1(){return ci===null&&(ci=new lE(b1,16,16,jr,qi),ci.name="DFG_LUT",ci.minFilter=cn,ci.magFilter=cn,ci.wrapS=Vi,ci.wrapT=Vi,ci.generateMipmaps=!1,ci.needsUpdate=!0),ci}class S1{constructor(e={}){const{canvas:t=kS(),context:i=null,depth:r=!0,stencil:s=!1,alpha:o=!1,antialias:a=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:u="default",failIfMajorPerformanceCaveat:d=!1,reversedDepthBuffer:h=!1,outputBufferType:f=kn}=e;this.isWebGLRenderer=!0;let p;if(i!==null){if(typeof WebGLRenderingContext<"u"&&i instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");p=i.getContextAttributes().alpha}else p=o;const _=f,g=new Set([th,eh,Qd]),m=new Set([kn,xi,Io,Uo,Zd,Jd]),v=new Uint32Array(4),y=new Int32Array(4),x=new N;let M=null,E=null;const C=[],b=[];let A=null;this.domElement=t,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=mi,this.toneMappingExposure=1,this.transmissionResolutionScale=1;const L=this;let P=!1,F=null;this._outputColorSpace=Un;let $=0,W=0,I=null,B=-1,H=null;const Z=new zt,J=new zt;let ne=null;const de=new it(0);let ye=0,Fe=t.width,tt=t.height,Ie=1,q=null,pe=null;const ie=new zt(0,0,Fe,tt),Ce=new zt(0,0,Fe,tt);let Oe=!1;const Ne=new A_;let bt=!1,je=!1;const at=new Ct,gt=new N,Ye=new zt,$t={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let wt=!1;function Mn(){return I===null?Ie:1}let U=i;function Xt(w,O){return t.getContext(w,O)}try{const w={alpha:!0,depth:r,stencil:s,antialias:a,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:u,failIfMajorPerformanceCaveat:d};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${qd}`),t.addEventListener("webglcontextlost",ee,!1),t.addEventListener("webglcontextrestored",Te,!1),t.addEventListener("webglcontextcreationerror",Ge,!1),U===null){const O="webgl2";if(U=Xt(O,w),U===null)throw Xt(O)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(w){throw Qe("WebGLRenderer: "+w.message),w}let Ze,yt,he,Rt,R,S,k,Y,te,re,ue,X,K,_e,Se,le,se,Be,Ve,rt,D,oe,j;function xe(){Ze=new yT(U),Ze.init(),D=new h1(U,Ze),yt=new fT(U,Ze,e,D),he=new u1(U,Ze),yt.reversedDepthBuffer&&h&&he.buffers.depth.setReversed(!0),Rt=new MT(U),R=new KA,S=new d1(U,Ze,he,R,yt,D,Rt),k=new bT(L),Y=new CE(U),oe=new dT(U,Y),te=new ST(U,Y,Rt,oe),re=new TT(U,te,Y,oe,Rt),Be=new wT(U,yt,S),Se=new pT(R),ue=new qA(L,k,Ze,yt,oe,Se),X=new v1(L,R),K=new JA,_e=new r1(Ze),se=new uT(L,k,he,re,p,l),le=new c1(L,re,yt),j=new x1(U,Rt,yt,he),Ve=new hT(U,Ze,Rt),rt=new ET(U,Ze,Rt),Rt.programs=ue.programs,L.capabilities=yt,L.extensions=Ze,L.properties=R,L.renderLists=K,L.shadowMap=le,L.state=he,L.info=Rt}xe(),_!==kn&&(A=new CT(_,t.width,t.height,r,s));const ce=new g1(L,U);this.xr=ce,this.getContext=function(){return U},this.getContextAttributes=function(){return U.getContextAttributes()},this.forceContextLoss=function(){const w=Ze.get("WEBGL_lose_context");w&&w.loseContext()},this.forceContextRestore=function(){const w=Ze.get("WEBGL_lose_context");w&&w.restoreContext()},this.getPixelRatio=function(){return Ie},this.setPixelRatio=function(w){w!==void 0&&(Ie=w,this.setSize(Fe,tt,!1))},this.getSize=function(w){return w.set(Fe,tt)},this.setSize=function(w,O,V=!0){if(ce.isPresenting){Le("WebGLRenderer: Can't change size while VR device is presenting.");return}Fe=w,tt=O,t.width=Math.floor(w*Ie),t.height=Math.floor(O*Ie),V===!0&&(t.style.width=w+"px",t.style.height=O+"px"),A!==null&&A.setSize(t.width,t.height),this.setViewport(0,0,w,O)},this.getDrawingBufferSize=function(w){return w.set(Fe*Ie,tt*Ie).floor()},this.setDrawingBufferSize=function(w,O,V){Fe=w,tt=O,Ie=V,t.width=Math.floor(w*V),t.height=Math.floor(O*V),this.setViewport(0,0,w,O)},this.setEffects=function(w){if(_===kn){Qe("THREE.WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.");return}if(w){for(let O=0;O<w.length;O++)if(w[O].isOutputPass===!0){Le("THREE.WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.");break}}A.setEffects(w||[])},this.getCurrentViewport=function(w){return w.copy(Z)},this.getViewport=function(w){return w.copy(ie)},this.setViewport=function(w,O,V,z){w.isVector4?ie.set(w.x,w.y,w.z,w.w):ie.set(w,O,V,z),he.viewport(Z.copy(ie).multiplyScalar(Ie).round())},this.getScissor=function(w){return w.copy(Ce)},this.setScissor=function(w,O,V,z){w.isVector4?Ce.set(w.x,w.y,w.z,w.w):Ce.set(w,O,V,z),he.scissor(J.copy(Ce).multiplyScalar(Ie).round())},this.getScissorTest=function(){return Oe},this.setScissorTest=function(w){he.setScissorTest(Oe=w)},this.setOpaqueSort=function(w){q=w},this.setTransparentSort=function(w){pe=w},this.getClearColor=function(w){return w.copy(se.getClearColor())},this.setClearColor=function(){se.setClearColor(...arguments)},this.getClearAlpha=function(){return se.getClearAlpha()},this.setClearAlpha=function(){se.setClearAlpha(...arguments)},this.clear=function(w=!0,O=!0,V=!0){let z=0;if(w){let G=!1;if(I!==null){const ge=I.texture.format;G=g.has(ge)}if(G){const ge=I.texture.type,Ee=m.has(ge),me=se.getClearColor(),we=se.getClearAlpha(),Ae=me.r,He=me.g,qe=me.b;Ee?(v[0]=Ae,v[1]=He,v[2]=qe,v[3]=we,U.clearBufferuiv(U.COLOR,0,v)):(y[0]=Ae,y[1]=He,y[2]=qe,y[3]=we,U.clearBufferiv(U.COLOR,0,y))}else z|=U.COLOR_BUFFER_BIT}O&&(z|=U.DEPTH_BUFFER_BIT,this.state.buffers.depth.setMask(!0)),V&&(z|=U.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),z!==0&&U.clear(z)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.setNodesHandler=function(w){w.setRenderer(this),F=w},this.dispose=function(){t.removeEventListener("webglcontextlost",ee,!1),t.removeEventListener("webglcontextrestored",Te,!1),t.removeEventListener("webglcontextcreationerror",Ge,!1),se.dispose(),K.dispose(),_e.dispose(),R.dispose(),k.dispose(),re.dispose(),oe.dispose(),j.dispose(),ue.dispose(),ce.dispose(),ce.removeEventListener("sessionstart",Rh),ce.removeEventListener("sessionend",Ph),Ar.stop()};function ee(w){w.preventDefault(),$f("WebGLRenderer: Context Lost."),P=!0}function Te(){$f("WebGLRenderer: Context Restored."),P=!1;const w=Rt.autoReset,O=le.enabled,V=le.autoUpdate,z=le.needsUpdate,G=le.type;xe(),Rt.autoReset=w,le.enabled=O,le.autoUpdate=V,le.needsUpdate=z,le.type=G}function Ge(w){Qe("WebGLRenderer: A WebGL context could not be created. Reason: ",w.statusMessage)}function Nt(w){const O=w.target;O.removeEventListener("dispose",Nt),ft(O)}function ft(w){Si(w),R.remove(w)}function Si(w){const O=R.get(w).programs;O!==void 0&&(O.forEach(function(V){ue.releaseProgram(V)}),w.isShaderMaterial&&ue.releaseShaderCache(w))}this.renderBufferDirect=function(w,O,V,z,G,ge){O===null&&(O=$t);const Ee=G.isMesh&&G.matrixWorld.determinant()<0,me=yv(w,O,V,z,G);he.setMaterial(z,Ee);let we=V.index,Ae=1;if(z.wireframe===!0){if(we=te.getWireframeAttribute(V),we===void 0)return;Ae=2}const He=V.drawRange,qe=V.attributes.position;let Re=He.start*Ae,pt=(He.start+He.count)*Ae;ge!==null&&(Re=Math.max(Re,ge.start*Ae),pt=Math.min(pt,(ge.start+ge.count)*Ae)),we!==null?(Re=Math.max(Re,0),pt=Math.min(pt,we.count)):qe!=null&&(Re=Math.max(Re,0),pt=Math.min(pt,qe.count));const It=pt-Re;if(It<0||It===1/0)return;oe.setup(G,z,me,V,we);let Pt,_t=Ve;if(we!==null&&(Pt=Y.get(we),_t=rt,_t.setIndex(Pt)),G.isMesh)z.wireframe===!0?(he.setLineWidth(z.wireframeLinewidth*Mn()),_t.setMode(U.LINES)):_t.setMode(U.TRIANGLES);else if(G.isLine){let on=z.linewidth;on===void 0&&(on=1),he.setLineWidth(on*Mn()),G.isLineSegments?_t.setMode(U.LINES):G.isLineLoop?_t.setMode(U.LINE_LOOP):_t.setMode(U.LINE_STRIP)}else G.isPoints?_t.setMode(U.POINTS):G.isSprite&&_t.setMode(U.TRIANGLES);if(G.isBatchedMesh)if(Ze.get("WEBGL_multi_draw"))_t.renderMultiDraw(G._multiDrawStarts,G._multiDrawCounts,G._multiDrawCount);else{const on=G._multiDrawStarts,be=G._multiDrawCounts,wn=G._multiDrawCount,nt=we?Y.get(we).bytesPerElement:1,Dn=R.get(z).currentProgram.getUniforms();for(let ai=0;ai<wn;ai++)Dn.setValue(U,"_gl_DrawID",ai),_t.render(on[ai]/nt,be[ai])}else if(G.isInstancedMesh)_t.renderInstances(Re,It,G.count);else if(V.isInstancedBufferGeometry){const on=V._maxInstanceCount!==void 0?V._maxInstanceCount:1/0,be=Math.min(V.instanceCount,on);_t.renderInstances(Re,It,be)}else _t.render(Re,It)};function oi(w,O,V){w.transparent===!0&&w.side===Ui&&w.forceSinglePass===!1?(w.side=Sn,w.needsUpdate=!0,qo(w,O,V),w.side=Er,w.needsUpdate=!0,qo(w,O,V),w.side=Ui):qo(w,O,V)}this.compile=function(w,O,V=null){V===null&&(V=w),E=_e.get(V),E.init(O),b.push(E),V.traverseVisible(function(G){G.isLight&&G.layers.test(O.layers)&&(E.pushLight(G),G.castShadow&&E.pushShadow(G))}),w!==V&&w.traverseVisible(function(G){G.isLight&&G.layers.test(O.layers)&&(E.pushLight(G),G.castShadow&&E.pushShadow(G))}),E.setupLights();const z=new Set;return w.traverse(function(G){if(!(G.isMesh||G.isPoints||G.isLine||G.isSprite))return;const ge=G.material;if(ge)if(Array.isArray(ge))for(let Ee=0;Ee<ge.length;Ee++){const me=ge[Ee];oi(me,V,G),z.add(me)}else oi(ge,V,G),z.add(ge)}),E=b.pop(),z},this.compileAsync=function(w,O,V=null){const z=this.compile(w,O,V);return new Promise(G=>{function ge(){if(z.forEach(function(Ee){R.get(Ee).currentProgram.isReady()&&z.delete(Ee)}),z.size===0){G(w);return}setTimeout(ge,10)}Ze.get("KHR_parallel_shader_compile")!==null?ge():setTimeout(ge,10)})};let tc=null;function xv(w){tc&&tc(w)}function Rh(){Ar.stop()}function Ph(){Ar.start()}const Ar=new U_;Ar.setAnimationLoop(xv),typeof self<"u"&&Ar.setContext(self),this.setAnimationLoop=function(w){tc=w,ce.setAnimationLoop(w),w===null?Ar.stop():Ar.start()},ce.addEventListener("sessionstart",Rh),ce.addEventListener("sessionend",Ph),this.render=function(w,O){if(O!==void 0&&O.isCamera!==!0){Qe("WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(P===!0)return;F!==null&&F.renderStart(w,O);const V=ce.enabled===!0&&ce.isPresenting===!0,z=A!==null&&(I===null||V)&&A.begin(L,I);if(w.matrixWorldAutoUpdate===!0&&w.updateMatrixWorld(),O.parent===null&&O.matrixWorldAutoUpdate===!0&&O.updateMatrixWorld(),ce.enabled===!0&&ce.isPresenting===!0&&(A===null||A.isCompositing()===!1)&&(ce.cameraAutoUpdate===!0&&ce.updateCamera(O),O=ce.getCamera()),w.isScene===!0&&w.onBeforeRender(L,w,O,I),E=_e.get(w,b.length),E.init(O),E.state.textureUnits=S.getTextureUnits(),b.push(E),at.multiplyMatrices(O.projectionMatrix,O.matrixWorldInverse),Ne.setFromProjectionMatrix(at,pi,O.reversedDepth),je=this.localClippingEnabled,bt=Se.init(this.clippingPlanes,je),M=K.get(w,C.length),M.init(),C.push(M),ce.enabled===!0&&ce.isPresenting===!0){const Ee=L.xr.getDepthSensingMesh();Ee!==null&&nc(Ee,O,-1/0,L.sortObjects)}nc(w,O,0,L.sortObjects),M.finish(),L.sortObjects===!0&&M.sort(q,pe),wt=ce.enabled===!1||ce.isPresenting===!1||ce.hasDepthSensing()===!1,wt&&se.addToRenderList(M,w),this.info.render.frame++,bt===!0&&Se.beginShadows();const G=E.state.shadowsArray;if(le.render(G,w,O),bt===!0&&Se.endShadows(),this.info.autoReset===!0&&this.info.reset(),(z&&A.hasRenderPass())===!1){const Ee=M.opaque,me=M.transmissive;if(E.setupLights(),O.isArrayCamera){const we=O.cameras;if(me.length>0)for(let Ae=0,He=we.length;Ae<He;Ae++){const qe=we[Ae];Dh(Ee,me,w,qe)}wt&&se.render(w);for(let Ae=0,He=we.length;Ae<He;Ae++){const qe=we[Ae];Lh(M,w,qe,qe.viewport)}}else me.length>0&&Dh(Ee,me,w,O),wt&&se.render(w),Lh(M,w,O)}I!==null&&W===0&&(S.updateMultisampleRenderTarget(I),S.updateRenderTargetMipmap(I)),z&&A.end(L),w.isScene===!0&&w.onAfterRender(L,w,O),oe.resetDefaultState(),B=-1,H=null,b.pop(),b.length>0?(E=b[b.length-1],S.setTextureUnits(E.state.textureUnits),bt===!0&&Se.setGlobalState(L.clippingPlanes,E.state.camera)):E=null,C.pop(),C.length>0?M=C[C.length-1]:M=null,F!==null&&F.renderEnd()};function nc(w,O,V,z){if(w.visible===!1)return;if(w.layers.test(O.layers)){if(w.isGroup)V=w.renderOrder;else if(w.isLOD)w.autoUpdate===!0&&w.update(O);else if(w.isLightProbeGrid)E.pushLightProbeGrid(w);else if(w.isLight)E.pushLight(w),w.castShadow&&E.pushShadow(w);else if(w.isSprite){if(!w.frustumCulled||Ne.intersectsSprite(w)){z&&Ye.setFromMatrixPosition(w.matrixWorld).applyMatrix4(at);const Ee=re.update(w),me=w.material;me.visible&&M.push(w,Ee,me,V,Ye.z,null)}}else if((w.isMesh||w.isLine||w.isPoints)&&(!w.frustumCulled||Ne.intersectsObject(w))){const Ee=re.update(w),me=w.material;if(z&&(w.boundingSphere!==void 0?(w.boundingSphere===null&&w.computeBoundingSphere(),Ye.copy(w.boundingSphere.center)):(Ee.boundingSphere===null&&Ee.computeBoundingSphere(),Ye.copy(Ee.boundingSphere.center)),Ye.applyMatrix4(w.matrixWorld).applyMatrix4(at)),Array.isArray(me)){const we=Ee.groups;for(let Ae=0,He=we.length;Ae<He;Ae++){const qe=we[Ae],Re=me[qe.materialIndex];Re&&Re.visible&&M.push(w,Ee,Re,V,Ye.z,qe)}}else me.visible&&M.push(w,Ee,me,V,Ye.z,null)}}const ge=w.children;for(let Ee=0,me=ge.length;Ee<me;Ee++)nc(ge[Ee],O,V,z)}function Lh(w,O,V,z){const{opaque:G,transmissive:ge,transparent:Ee}=w;E.setupLightsView(V),bt===!0&&Se.setGlobalState(L.clippingPlanes,V),z&&he.viewport(Z.copy(z)),G.length>0&&Yo(G,O,V),ge.length>0&&Yo(ge,O,V),Ee.length>0&&Yo(Ee,O,V),he.buffers.depth.setTest(!0),he.buffers.depth.setMask(!0),he.buffers.color.setMask(!0),he.setPolygonOffset(!1)}function Dh(w,O,V,z){if((V.isScene===!0?V.overrideMaterial:null)!==null)return;if(E.state.transmissionRenderTarget[z.id]===void 0){const Re=Ze.has("EXT_color_buffer_half_float")||Ze.has("EXT_color_buffer_float");E.state.transmissionRenderTarget[z.id]=new gi(1,1,{generateMipmaps:!0,type:Re?qi:kn,minFilter:Br,samples:Math.max(4,yt.samples),stencilBuffer:s,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:Je.workingColorSpace})}const ge=E.state.transmissionRenderTarget[z.id],Ee=z.viewport||Z;ge.setSize(Ee.z*L.transmissionResolutionScale,Ee.w*L.transmissionResolutionScale);const me=L.getRenderTarget(),we=L.getActiveCubeFace(),Ae=L.getActiveMipmapLevel();L.setRenderTarget(ge),L.getClearColor(de),ye=L.getClearAlpha(),ye<1&&L.setClearColor(16777215,.5),L.clear(),wt&&se.render(V);const He=L.toneMapping;L.toneMapping=mi;const qe=z.viewport;if(z.viewport!==void 0&&(z.viewport=void 0),E.setupLightsView(z),bt===!0&&Se.setGlobalState(L.clippingPlanes,z),Yo(w,V,z),S.updateMultisampleRenderTarget(ge),S.updateRenderTargetMipmap(ge),Ze.has("WEBGL_multisampled_render_to_texture")===!1){let Re=!1;for(let pt=0,It=O.length;pt<It;pt++){const Pt=O[pt],{object:_t,geometry:on,material:be,group:wn}=Pt;if(be.side===Ui&&_t.layers.test(z.layers)){const nt=be.side;be.side=Sn,be.needsUpdate=!0,Nh(_t,V,z,on,be,wn),be.side=nt,be.needsUpdate=!0,Re=!0}}Re===!0&&(S.updateMultisampleRenderTarget(ge),S.updateRenderTargetMipmap(ge))}L.setRenderTarget(me,we,Ae),L.setClearColor(de,ye),qe!==void 0&&(z.viewport=qe),L.toneMapping=He}function Yo(w,O,V){const z=O.isScene===!0?O.overrideMaterial:null;for(let G=0,ge=w.length;G<ge;G++){const Ee=w[G],{object:me,geometry:we,group:Ae}=Ee;let He=Ee.material;He.allowOverride===!0&&z!==null&&(He=z),me.layers.test(V.layers)&&Nh(me,O,V,we,He,Ae)}}function Nh(w,O,V,z,G,ge){w.onBeforeRender(L,O,V,z,G,ge),w.modelViewMatrix.multiplyMatrices(V.matrixWorldInverse,w.matrixWorld),w.normalMatrix.getNormalMatrix(w.modelViewMatrix),G.onBeforeRender(L,O,V,z,w,ge),G.transparent===!0&&G.side===Ui&&G.forceSinglePass===!1?(G.side=Sn,G.needsUpdate=!0,L.renderBufferDirect(V,O,z,G,w,ge),G.side=Er,G.needsUpdate=!0,L.renderBufferDirect(V,O,z,G,w,ge),G.side=Ui):L.renderBufferDirect(V,O,z,G,w,ge),w.onAfterRender(L,O,V,z,G,ge)}function qo(w,O,V){O.isScene!==!0&&(O=$t);const z=R.get(w),G=E.state.lights,ge=E.state.shadowsArray,Ee=G.state.version,me=ue.getParameters(w,G.state,ge,O,V,E.state.lightProbeGridArray),we=ue.getProgramCacheKey(me);let Ae=z.programs;z.environment=w.isMeshStandardMaterial||w.isMeshLambertMaterial||w.isMeshPhongMaterial?O.environment:null,z.fog=O.fog;const He=w.isMeshStandardMaterial||w.isMeshLambertMaterial&&!w.envMap||w.isMeshPhongMaterial&&!w.envMap;z.envMap=k.get(w.envMap||z.environment,He),z.envMapRotation=z.environment!==null&&w.envMap===null?O.environmentRotation:w.envMapRotation,Ae===void 0&&(w.addEventListener("dispose",Nt),Ae=new Map,z.programs=Ae);let qe=Ae.get(we);if(qe!==void 0){if(z.currentProgram===qe&&z.lightsStateVersion===Ee)return Uh(w,me),qe}else me.uniforms=ue.getUniforms(w),F!==null&&w.isNodeMaterial&&F.build(w,V,me),w.onBeforeCompile(me,L),qe=ue.acquireProgram(me,we),Ae.set(we,qe),z.uniforms=me.uniforms;const Re=z.uniforms;return(!w.isShaderMaterial&&!w.isRawShaderMaterial||w.clipping===!0)&&(Re.clippingPlanes=Se.uniform),Uh(w,me),z.needsLights=Ev(w),z.lightsStateVersion=Ee,z.needsLights&&(Re.ambientLightColor.value=G.state.ambient,Re.lightProbe.value=G.state.probe,Re.directionalLights.value=G.state.directional,Re.directionalLightShadows.value=G.state.directionalShadow,Re.spotLights.value=G.state.spot,Re.spotLightShadows.value=G.state.spotShadow,Re.rectAreaLights.value=G.state.rectArea,Re.ltc_1.value=G.state.rectAreaLTC1,Re.ltc_2.value=G.state.rectAreaLTC2,Re.pointLights.value=G.state.point,Re.pointLightShadows.value=G.state.pointShadow,Re.hemisphereLights.value=G.state.hemi,Re.directionalShadowMatrix.value=G.state.directionalShadowMatrix,Re.spotLightMatrix.value=G.state.spotLightMatrix,Re.spotLightMap.value=G.state.spotLightMap,Re.pointShadowMatrix.value=G.state.pointShadowMatrix),z.lightProbeGrid=E.state.lightProbeGridArray.length>0,z.currentProgram=qe,z.uniformsList=null,qe}function Ih(w){if(w.uniformsList===null){const O=w.currentProgram.getUniforms();w.uniformsList=Ya.seqWithValue(O.seq,w.uniforms)}return w.uniformsList}function Uh(w,O){const V=R.get(w);V.outputColorSpace=O.outputColorSpace,V.batching=O.batching,V.batchingColor=O.batchingColor,V.instancing=O.instancing,V.instancingColor=O.instancingColor,V.instancingMorph=O.instancingMorph,V.skinning=O.skinning,V.morphTargets=O.morphTargets,V.morphNormals=O.morphNormals,V.morphColors=O.morphColors,V.morphTargetsCount=O.morphTargetsCount,V.numClippingPlanes=O.numClippingPlanes,V.numIntersection=O.numClipIntersection,V.vertexAlphas=O.vertexAlphas,V.vertexTangents=O.vertexTangents,V.toneMapping=O.toneMapping}function bv(w,O){if(w.length===0)return null;if(w.length===1)return w[0].texture!==null?w[0]:null;x.setFromMatrixPosition(O.matrixWorld);for(let V=0,z=w.length;V<z;V++){const G=w[V];if(G.texture!==null&&G.boundingBox.containsPoint(x))return G}return null}function yv(w,O,V,z,G){O.isScene!==!0&&(O=$t),S.resetTextureUnits();const ge=O.fog,Ee=z.isMeshStandardMaterial||z.isMeshLambertMaterial||z.isMeshPhongMaterial?O.environment:null,me=I===null?L.outputColorSpace:I.isXRRenderTarget===!0?I.texture.colorSpace:Je.workingColorSpace,we=z.isMeshStandardMaterial||z.isMeshLambertMaterial&&!z.envMap||z.isMeshPhongMaterial&&!z.envMap,Ae=k.get(z.envMap||Ee,we),He=z.vertexColors===!0&&!!V.attributes.color&&V.attributes.color.itemSize===4,qe=!!V.attributes.tangent&&(!!z.normalMap||z.anisotropy>0),Re=!!V.morphAttributes.position,pt=!!V.morphAttributes.normal,It=!!V.morphAttributes.color;let Pt=mi;z.toneMapped&&(I===null||I.isXRRenderTarget===!0)&&(Pt=L.toneMapping);const _t=V.morphAttributes.position||V.morphAttributes.normal||V.morphAttributes.color,on=_t!==void 0?_t.length:0,be=R.get(z),wn=E.state.lights;if(bt===!0&&(je===!0||w!==H)){const St=w===H&&z.id===B;Se.setState(z,w,St)}let nt=!1;z.version===be.__version?(be.needsLights&&be.lightsStateVersion!==wn.state.version||be.outputColorSpace!==me||G.isBatchedMesh&&be.batching===!1||!G.isBatchedMesh&&be.batching===!0||G.isBatchedMesh&&be.batchingColor===!0&&G.colorTexture===null||G.isBatchedMesh&&be.batchingColor===!1&&G.colorTexture!==null||G.isInstancedMesh&&be.instancing===!1||!G.isInstancedMesh&&be.instancing===!0||G.isSkinnedMesh&&be.skinning===!1||!G.isSkinnedMesh&&be.skinning===!0||G.isInstancedMesh&&be.instancingColor===!0&&G.instanceColor===null||G.isInstancedMesh&&be.instancingColor===!1&&G.instanceColor!==null||G.isInstancedMesh&&be.instancingMorph===!0&&G.morphTexture===null||G.isInstancedMesh&&be.instancingMorph===!1&&G.morphTexture!==null||be.envMap!==Ae||z.fog===!0&&be.fog!==ge||be.numClippingPlanes!==void 0&&(be.numClippingPlanes!==Se.numPlanes||be.numIntersection!==Se.numIntersection)||be.vertexAlphas!==He||be.vertexTangents!==qe||be.morphTargets!==Re||be.morphNormals!==pt||be.morphColors!==It||be.toneMapping!==Pt||be.morphTargetsCount!==on||!!be.lightProbeGrid!=E.state.lightProbeGridArray.length>0)&&(nt=!0):(nt=!0,be.__version=z.version);let Dn=be.currentProgram;nt===!0&&(Dn=qo(z,O,G),F&&z.isNodeMaterial&&F.onUpdateProgram(z,Dn,be));let ai=!1,er=!1,ts=!1;const vt=Dn.getUniforms(),Ut=be.uniforms;if(he.useProgram(Dn.program)&&(ai=!0,er=!0,ts=!0),z.id!==B&&(B=z.id,er=!0),be.needsLights){const St=bv(E.state.lightProbeGridArray,G);be.lightProbeGrid!==St&&(be.lightProbeGrid=St,er=!0)}if(ai||H!==w){he.buffers.depth.getReversed()&&w.reversedDepth!==!0&&(w._reversedDepth=!0,w.updateProjectionMatrix()),vt.setValue(U,"projectionMatrix",w.projectionMatrix),vt.setValue(U,"viewMatrix",w.matrixWorldInverse);const nr=vt.map.cameraPosition;nr!==void 0&&nr.setValue(U,gt.setFromMatrixPosition(w.matrixWorld)),yt.logarithmicDepthBuffer&&vt.setValue(U,"logDepthBufFC",2/(Math.log(w.far+1)/Math.LN2)),(z.isMeshPhongMaterial||z.isMeshToonMaterial||z.isMeshLambertMaterial||z.isMeshBasicMaterial||z.isMeshStandardMaterial||z.isShaderMaterial)&&vt.setValue(U,"isOrthographic",w.isOrthographicCamera===!0),H!==w&&(H=w,er=!0,ts=!0)}if(be.needsLights&&(wn.state.directionalShadowMap.length>0&&vt.setValue(U,"directionalShadowMap",wn.state.directionalShadowMap,S),wn.state.spotShadowMap.length>0&&vt.setValue(U,"spotShadowMap",wn.state.spotShadowMap,S),wn.state.pointShadowMap.length>0&&vt.setValue(U,"pointShadowMap",wn.state.pointShadowMap,S)),G.isSkinnedMesh){vt.setOptional(U,G,"bindMatrix"),vt.setOptional(U,G,"bindMatrixInverse");const St=G.skeleton;St&&(St.boneTexture===null&&St.computeBoneTexture(),vt.setValue(U,"boneTexture",St.boneTexture,S))}G.isBatchedMesh&&(vt.setOptional(U,G,"batchingTexture"),vt.setValue(U,"batchingTexture",G._matricesTexture,S),vt.setOptional(U,G,"batchingIdTexture"),vt.setValue(U,"batchingIdTexture",G._indirectTexture,S),vt.setOptional(U,G,"batchingColorTexture"),G._colorsTexture!==null&&vt.setValue(U,"batchingColorTexture",G._colorsTexture,S));const tr=V.morphAttributes;if((tr.position!==void 0||tr.normal!==void 0||tr.color!==void 0)&&Be.update(G,V,Dn),(er||be.receiveShadow!==G.receiveShadow)&&(be.receiveShadow=G.receiveShadow,vt.setValue(U,"receiveShadow",G.receiveShadow)),(z.isMeshStandardMaterial||z.isMeshLambertMaterial||z.isMeshPhongMaterial)&&z.envMap===null&&O.environment!==null&&(Ut.envMapIntensity.value=O.environmentIntensity),Ut.dfgLUT!==void 0&&(Ut.dfgLUT.value=y1()),er){if(vt.setValue(U,"toneMappingExposure",L.toneMappingExposure),be.needsLights&&Sv(Ut,ts),ge&&z.fog===!0&&X.refreshFogUniforms(Ut,ge),X.refreshMaterialUniforms(Ut,z,Ie,tt,E.state.transmissionRenderTarget[w.id]),be.needsLights&&be.lightProbeGrid){const St=be.lightProbeGrid;Ut.probesSH.value=St.texture,Ut.probesMin.value.copy(St.boundingBox.min),Ut.probesMax.value.copy(St.boundingBox.max),Ut.probesResolution.value.copy(St.resolution)}Ya.upload(U,Ih(be),Ut,S)}if(z.isShaderMaterial&&z.uniformsNeedUpdate===!0&&(Ya.upload(U,Ih(be),Ut,S),z.uniformsNeedUpdate=!1),z.isSpriteMaterial&&vt.setValue(U,"center",G.center),vt.setValue(U,"modelViewMatrix",G.modelViewMatrix),vt.setValue(U,"normalMatrix",G.normalMatrix),vt.setValue(U,"modelMatrix",G.matrixWorld),z.uniformsGroups!==void 0){const St=z.uniformsGroups;for(let nr=0,ns=St.length;nr<ns;nr++){const Fh=St[nr];j.update(Fh,Dn),j.bind(Fh,Dn)}}return Dn}function Sv(w,O){w.ambientLightColor.needsUpdate=O,w.lightProbe.needsUpdate=O,w.directionalLights.needsUpdate=O,w.directionalLightShadows.needsUpdate=O,w.pointLights.needsUpdate=O,w.pointLightShadows.needsUpdate=O,w.spotLights.needsUpdate=O,w.spotLightShadows.needsUpdate=O,w.rectAreaLights.needsUpdate=O,w.hemisphereLights.needsUpdate=O}function Ev(w){return w.isMeshLambertMaterial||w.isMeshToonMaterial||w.isMeshPhongMaterial||w.isMeshStandardMaterial||w.isShadowMaterial||w.isShaderMaterial&&w.lights===!0}this.getActiveCubeFace=function(){return $},this.getActiveMipmapLevel=function(){return W},this.getRenderTarget=function(){return I},this.setRenderTargetTextures=function(w,O,V){const z=R.get(w);z.__autoAllocateDepthBuffer=w.resolveDepthBuffer===!1,z.__autoAllocateDepthBuffer===!1&&(z.__useRenderToTexture=!1),R.get(w.texture).__webglTexture=O,R.get(w.depthTexture).__webglTexture=z.__autoAllocateDepthBuffer?void 0:V,z.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(w,O){const V=R.get(w);V.__webglFramebuffer=O,V.__useDefaultFramebuffer=O===void 0};const Mv=U.createFramebuffer();this.setRenderTarget=function(w,O=0,V=0){I=w,$=O,W=V;let z=null,G=!1,ge=!1;if(w){const me=R.get(w);if(me.__useDefaultFramebuffer!==void 0){he.bindFramebuffer(U.FRAMEBUFFER,me.__webglFramebuffer),Z.copy(w.viewport),J.copy(w.scissor),ne=w.scissorTest,he.viewport(Z),he.scissor(J),he.setScissorTest(ne),B=-1;return}else if(me.__webglFramebuffer===void 0)S.setupRenderTarget(w);else if(me.__hasExternalTextures)S.rebindTextures(w,R.get(w.texture).__webglTexture,R.get(w.depthTexture).__webglTexture);else if(w.depthBuffer){const He=w.depthTexture;if(me.__boundDepthTexture!==He){if(He!==null&&R.has(He)&&(w.width!==He.image.width||w.height!==He.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");S.setupDepthRenderbuffer(w)}}const we=w.texture;(we.isData3DTexture||we.isDataArrayTexture||we.isCompressedArrayTexture)&&(ge=!0);const Ae=R.get(w).__webglFramebuffer;w.isWebGLCubeRenderTarget?(Array.isArray(Ae[O])?z=Ae[O][V]:z=Ae[O],G=!0):w.samples>0&&S.useMultisampledRTT(w)===!1?z=R.get(w).__webglMultisampledFramebuffer:Array.isArray(Ae)?z=Ae[V]:z=Ae,Z.copy(w.viewport),J.copy(w.scissor),ne=w.scissorTest}else Z.copy(ie).multiplyScalar(Ie).floor(),J.copy(Ce).multiplyScalar(Ie).floor(),ne=Oe;if(V!==0&&(z=Mv),he.bindFramebuffer(U.FRAMEBUFFER,z)&&he.drawBuffers(w,z),he.viewport(Z),he.scissor(J),he.setScissorTest(ne),G){const me=R.get(w.texture);U.framebufferTexture2D(U.FRAMEBUFFER,U.COLOR_ATTACHMENT0,U.TEXTURE_CUBE_MAP_POSITIVE_X+O,me.__webglTexture,V)}else if(ge){const me=O;for(let we=0;we<w.textures.length;we++){const Ae=R.get(w.textures[we]);U.framebufferTextureLayer(U.FRAMEBUFFER,U.COLOR_ATTACHMENT0+we,Ae.__webglTexture,V,me)}}else if(w!==null&&V!==0){const me=R.get(w.texture);U.framebufferTexture2D(U.FRAMEBUFFER,U.COLOR_ATTACHMENT0,U.TEXTURE_2D,me.__webglTexture,V)}B=-1},this.readRenderTargetPixels=function(w,O,V,z,G,ge,Ee,me=0){if(!(w&&w.isWebGLRenderTarget)){Qe("WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let we=R.get(w).__webglFramebuffer;if(w.isWebGLCubeRenderTarget&&Ee!==void 0&&(we=we[Ee]),we){he.bindFramebuffer(U.FRAMEBUFFER,we);try{const Ae=w.textures[me],He=Ae.format,qe=Ae.type;if(w.textures.length>1&&U.readBuffer(U.COLOR_ATTACHMENT0+me),!yt.textureFormatReadable(He)){Qe("WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!yt.textureTypeReadable(qe)){Qe("WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}O>=0&&O<=w.width-z&&V>=0&&V<=w.height-G&&U.readPixels(O,V,z,G,D.convert(He),D.convert(qe),ge)}finally{const Ae=I!==null?R.get(I).__webglFramebuffer:null;he.bindFramebuffer(U.FRAMEBUFFER,Ae)}}},this.readRenderTargetPixelsAsync=async function(w,O,V,z,G,ge,Ee,me=0){if(!(w&&w.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let we=R.get(w).__webglFramebuffer;if(w.isWebGLCubeRenderTarget&&Ee!==void 0&&(we=we[Ee]),we)if(O>=0&&O<=w.width-z&&V>=0&&V<=w.height-G){he.bindFramebuffer(U.FRAMEBUFFER,we);const Ae=w.textures[me],He=Ae.format,qe=Ae.type;if(w.textures.length>1&&U.readBuffer(U.COLOR_ATTACHMENT0+me),!yt.textureFormatReadable(He))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!yt.textureTypeReadable(qe))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");const Re=U.createBuffer();U.bindBuffer(U.PIXEL_PACK_BUFFER,Re),U.bufferData(U.PIXEL_PACK_BUFFER,ge.byteLength,U.STREAM_READ),U.readPixels(O,V,z,G,D.convert(He),D.convert(qe),0);const pt=I!==null?R.get(I).__webglFramebuffer:null;he.bindFramebuffer(U.FRAMEBUFFER,pt);const It=U.fenceSync(U.SYNC_GPU_COMMANDS_COMPLETE,0);return U.flush(),await BS(U,It,4),U.bindBuffer(U.PIXEL_PACK_BUFFER,Re),U.getBufferSubData(U.PIXEL_PACK_BUFFER,0,ge),U.deleteBuffer(Re),U.deleteSync(It),ge}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(w,O=null,V=0){const z=Math.pow(2,-V),G=Math.floor(w.image.width*z),ge=Math.floor(w.image.height*z),Ee=O!==null?O.x:0,me=O!==null?O.y:0;S.setTexture2D(w,0),U.copyTexSubImage2D(U.TEXTURE_2D,V,0,0,Ee,me,G,ge),he.unbindTexture()};const wv=U.createFramebuffer(),Tv=U.createFramebuffer();this.copyTextureToTexture=function(w,O,V=null,z=null,G=0,ge=0){let Ee,me,we,Ae,He,qe,Re,pt,It;const Pt=w.isCompressedTexture?w.mipmaps[ge]:w.image;if(V!==null)Ee=V.max.x-V.min.x,me=V.max.y-V.min.y,we=V.isBox3?V.max.z-V.min.z:1,Ae=V.min.x,He=V.min.y,qe=V.isBox3?V.min.z:0;else{const Ut=Math.pow(2,-G);Ee=Math.floor(Pt.width*Ut),me=Math.floor(Pt.height*Ut),w.isDataArrayTexture?we=Pt.depth:w.isData3DTexture?we=Math.floor(Pt.depth*Ut):we=1,Ae=0,He=0,qe=0}z!==null?(Re=z.x,pt=z.y,It=z.z):(Re=0,pt=0,It=0);const _t=D.convert(O.format),on=D.convert(O.type);let be;O.isData3DTexture?(S.setTexture3D(O,0),be=U.TEXTURE_3D):O.isDataArrayTexture||O.isCompressedArrayTexture?(S.setTexture2DArray(O,0),be=U.TEXTURE_2D_ARRAY):(S.setTexture2D(O,0),be=U.TEXTURE_2D),he.activeTexture(U.TEXTURE0),he.pixelStorei(U.UNPACK_FLIP_Y_WEBGL,O.flipY),he.pixelStorei(U.UNPACK_PREMULTIPLY_ALPHA_WEBGL,O.premultiplyAlpha),he.pixelStorei(U.UNPACK_ALIGNMENT,O.unpackAlignment);const wn=he.getParameter(U.UNPACK_ROW_LENGTH),nt=he.getParameter(U.UNPACK_IMAGE_HEIGHT),Dn=he.getParameter(U.UNPACK_SKIP_PIXELS),ai=he.getParameter(U.UNPACK_SKIP_ROWS),er=he.getParameter(U.UNPACK_SKIP_IMAGES);he.pixelStorei(U.UNPACK_ROW_LENGTH,Pt.width),he.pixelStorei(U.UNPACK_IMAGE_HEIGHT,Pt.height),he.pixelStorei(U.UNPACK_SKIP_PIXELS,Ae),he.pixelStorei(U.UNPACK_SKIP_ROWS,He),he.pixelStorei(U.UNPACK_SKIP_IMAGES,qe);const ts=w.isDataArrayTexture||w.isData3DTexture,vt=O.isDataArrayTexture||O.isData3DTexture;if(w.isDepthTexture){const Ut=R.get(w),tr=R.get(O),St=R.get(Ut.__renderTarget),nr=R.get(tr.__renderTarget);he.bindFramebuffer(U.READ_FRAMEBUFFER,St.__webglFramebuffer),he.bindFramebuffer(U.DRAW_FRAMEBUFFER,nr.__webglFramebuffer);for(let ns=0;ns<we;ns++)ts&&(U.framebufferTextureLayer(U.READ_FRAMEBUFFER,U.COLOR_ATTACHMENT0,R.get(w).__webglTexture,G,qe+ns),U.framebufferTextureLayer(U.DRAW_FRAMEBUFFER,U.COLOR_ATTACHMENT0,R.get(O).__webglTexture,ge,It+ns)),U.blitFramebuffer(Ae,He,Ee,me,Re,pt,Ee,me,U.DEPTH_BUFFER_BIT,U.NEAREST);he.bindFramebuffer(U.READ_FRAMEBUFFER,null),he.bindFramebuffer(U.DRAW_FRAMEBUFFER,null)}else if(G!==0||w.isRenderTargetTexture||R.has(w)){const Ut=R.get(w),tr=R.get(O);he.bindFramebuffer(U.READ_FRAMEBUFFER,wv),he.bindFramebuffer(U.DRAW_FRAMEBUFFER,Tv);for(let St=0;St<we;St++)ts?U.framebufferTextureLayer(U.READ_FRAMEBUFFER,U.COLOR_ATTACHMENT0,Ut.__webglTexture,G,qe+St):U.framebufferTexture2D(U.READ_FRAMEBUFFER,U.COLOR_ATTACHMENT0,U.TEXTURE_2D,Ut.__webglTexture,G),vt?U.framebufferTextureLayer(U.DRAW_FRAMEBUFFER,U.COLOR_ATTACHMENT0,tr.__webglTexture,ge,It+St):U.framebufferTexture2D(U.DRAW_FRAMEBUFFER,U.COLOR_ATTACHMENT0,U.TEXTURE_2D,tr.__webglTexture,ge),G!==0?U.blitFramebuffer(Ae,He,Ee,me,Re,pt,Ee,me,U.COLOR_BUFFER_BIT,U.NEAREST):vt?U.copyTexSubImage3D(be,ge,Re,pt,It+St,Ae,He,Ee,me):U.copyTexSubImage2D(be,ge,Re,pt,Ae,He,Ee,me);he.bindFramebuffer(U.READ_FRAMEBUFFER,null),he.bindFramebuffer(U.DRAW_FRAMEBUFFER,null)}else vt?w.isDataTexture||w.isData3DTexture?U.texSubImage3D(be,ge,Re,pt,It,Ee,me,we,_t,on,Pt.data):O.isCompressedArrayTexture?U.compressedTexSubImage3D(be,ge,Re,pt,It,Ee,me,we,_t,Pt.data):U.texSubImage3D(be,ge,Re,pt,It,Ee,me,we,_t,on,Pt):w.isDataTexture?U.texSubImage2D(U.TEXTURE_2D,ge,Re,pt,Ee,me,_t,on,Pt.data):w.isCompressedTexture?U.compressedTexSubImage2D(U.TEXTURE_2D,ge,Re,pt,Pt.width,Pt.height,_t,Pt.data):U.texSubImage2D(U.TEXTURE_2D,ge,Re,pt,Ee,me,_t,on,Pt);he.pixelStorei(U.UNPACK_ROW_LENGTH,wn),he.pixelStorei(U.UNPACK_IMAGE_HEIGHT,nt),he.pixelStorei(U.UNPACK_SKIP_PIXELS,Dn),he.pixelStorei(U.UNPACK_SKIP_ROWS,ai),he.pixelStorei(U.UNPACK_SKIP_IMAGES,er),ge===0&&O.generateMipmaps&&U.generateMipmap(be),he.unbindTexture()},this.initRenderTarget=function(w){R.get(w).__webglFramebuffer===void 0&&S.setupRenderTarget(w)},this.initTexture=function(w){w.isCubeTexture?S.setTextureCube(w,0):w.isData3DTexture?S.setTexture3D(w,0):w.isDataArrayTexture||w.isCompressedArrayTexture?S.setTexture2DArray(w,0):S.setTexture2D(w,0),he.unbindTexture()},this.resetState=function(){$=0,W=0,I=null,he.reset(),oe.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return pi}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;const t=this.getContext();t.drawingBufferColorSpace=Je._getDrawingBufferColorSpace(e),t.unpackColorSpace=Je._getUnpackColorSpace()}}const $p={type:"change"},dh={type:"start"},V_={type:"end"},Na=new Wo,Xp=new Pi,E1=Math.cos(70*HS.DEG2RAD),jt=new N,vn=2*Math.PI,mt={NONE:-1,ROTATE:0,DOLLY:1,PAN:2,TOUCH_ROTATE:3,TOUCH_PAN:4,TOUCH_DOLLY_PAN:5,TOUCH_DOLLY_ROTATE:6},nu=1e-6;class M1 extends TE{constructor(e,t=null){super(e,t),this.state=mt.NONE,this.target=new N,this.cursor=new N,this.minDistance=0,this.maxDistance=1/0,this.minZoom=0,this.maxZoom=1/0,this.minTargetRadius=0,this.maxTargetRadius=1/0,this.minPolarAngle=0,this.maxPolarAngle=Math.PI,this.minAzimuthAngle=-1/0,this.maxAzimuthAngle=1/0,this.enableDamping=!1,this.dampingFactor=.05,this.enableZoom=!0,this.zoomSpeed=1,this.enableRotate=!0,this.rotateSpeed=1,this.keyRotateSpeed=1,this.enablePan=!0,this.panSpeed=1,this.screenSpacePanning=!0,this.keyPanSpeed=7,this.zoomToCursor=!1,this.autoRotate=!1,this.autoRotateSpeed=2,this.keys={LEFT:"ArrowLeft",UP:"ArrowUp",RIGHT:"ArrowRight",BOTTOM:"ArrowDown"},this.mouseButtons={LEFT:Cs.ROTATE,MIDDLE:Cs.DOLLY,RIGHT:Cs.PAN},this.touches={ONE:Ss.ROTATE,TWO:Ss.DOLLY_PAN},this.target0=this.target.clone(),this.position0=this.object.position.clone(),this.zoom0=this.object.zoom,this._cursorStyle="auto",this._domElementKeyEvents=null,this._lastPosition=new N,this._lastQuaternion=new Mr,this._lastTargetPosition=new N,this._quat=new Mr().setFromUnitVectors(e.up,new N(0,1,0)),this._quatInverse=this._quat.clone().invert(),this._spherical=new xp,this._sphericalDelta=new xp,this._scale=1,this._panOffset=new N,this._rotateStart=new We,this._rotateEnd=new We,this._rotateDelta=new We,this._panStart=new We,this._panEnd=new We,this._panDelta=new We,this._dollyStart=new We,this._dollyEnd=new We,this._dollyDelta=new We,this._dollyDirection=new N,this._mouse=new We,this._performCursorZoom=!1,this._pointers=[],this._pointerPositions={},this._controlActive=!1,this._onPointerMove=T1.bind(this),this._onPointerDown=w1.bind(this),this._onPointerUp=A1.bind(this),this._onContextMenu=I1.bind(this),this._onMouseWheel=P1.bind(this),this._onKeyDown=L1.bind(this),this._onTouchStart=D1.bind(this),this._onTouchMove=N1.bind(this),this._onMouseDown=C1.bind(this),this._onMouseMove=R1.bind(this),this._interceptControlDown=U1.bind(this),this._interceptControlUp=F1.bind(this),this.domElement!==null&&this.connect(this.domElement),this.update()}set cursorStyle(e){this._cursorStyle=e,e==="grab"?this.domElement.style.cursor="grab":this.domElement.style.cursor="auto"}get cursorStyle(){return this._cursorStyle}connect(e){super.connect(e),this.domElement.addEventListener("pointerdown",this._onPointerDown),this.domElement.addEventListener("pointercancel",this._onPointerUp),this.domElement.addEventListener("contextmenu",this._onContextMenu),this.domElement.addEventListener("wheel",this._onMouseWheel,{passive:!1}),this.domElement.getRootNode().addEventListener("keydown",this._interceptControlDown,{passive:!0,capture:!0}),this.domElement.style.touchAction="none"}disconnect(){this.domElement.removeEventListener("pointerdown",this._onPointerDown),this.domElement.ownerDocument.removeEventListener("pointermove",this._onPointerMove),this.domElement.ownerDocument.removeEventListener("pointerup",this._onPointerUp),this.domElement.removeEventListener("pointercancel",this._onPointerUp),this.domElement.removeEventListener("wheel",this._onMouseWheel),this.domElement.removeEventListener("contextmenu",this._onContextMenu),this.stopListenToKeyEvents(),this.domElement.getRootNode().removeEventListener("keydown",this._interceptControlDown,{capture:!0}),this.domElement.style.touchAction=""}dispose(){this.disconnect()}getPolarAngle(){return this._spherical.phi}getAzimuthalAngle(){return this._spherical.theta}getDistance(){return this.object.position.distanceTo(this.target)}listenToKeyEvents(e){e.addEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=e}stopListenToKeyEvents(){this._domElementKeyEvents!==null&&(this._domElementKeyEvents.removeEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=null)}saveState(){this.target0.copy(this.target),this.position0.copy(this.object.position),this.zoom0=this.object.zoom}reset(){this.target.copy(this.target0),this.object.position.copy(this.position0),this.object.zoom=this.zoom0,this.object.updateProjectionMatrix(),this.dispatchEvent($p),this.update(),this.state=mt.NONE}pan(e,t){this._pan(e,t),this.update()}dollyIn(e){this._dollyIn(e),this.update()}dollyOut(e){this._dollyOut(e),this.update()}rotateLeft(e){this._rotateLeft(e),this.update()}rotateUp(e){this._rotateUp(e),this.update()}update(e=null){const t=this.object.position;jt.copy(t).sub(this.target),jt.applyQuaternion(this._quat),this._spherical.setFromVector3(jt),this.autoRotate&&this.state===mt.NONE&&this._rotateLeft(this._getAutoRotationAngle(e)),this.enableDamping?(this._spherical.theta+=this._sphericalDelta.theta*this.dampingFactor,this._spherical.phi+=this._sphericalDelta.phi*this.dampingFactor):(this._spherical.theta+=this._sphericalDelta.theta,this._spherical.phi+=this._sphericalDelta.phi);let i=this.minAzimuthAngle,r=this.maxAzimuthAngle;isFinite(i)&&isFinite(r)&&(i<-Math.PI?i+=vn:i>Math.PI&&(i-=vn),r<-Math.PI?r+=vn:r>Math.PI&&(r-=vn),i<=r?this._spherical.theta=Math.max(i,Math.min(r,this._spherical.theta)):this._spherical.theta=this._spherical.theta>(i+r)/2?Math.max(i,this._spherical.theta):Math.min(r,this._spherical.theta)),this._spherical.phi=Math.max(this.minPolarAngle,Math.min(this.maxPolarAngle,this._spherical.phi)),this._spherical.makeSafe(),this.enableDamping===!0?this.target.addScaledVector(this._panOffset,this.dampingFactor):this.target.add(this._panOffset),this.target.sub(this.cursor),this.target.clampLength(this.minTargetRadius,this.maxTargetRadius),this.target.add(this.cursor);let s=!1;if(this.zoomToCursor&&this._performCursorZoom||this.object.isOrthographicCamera)this._spherical.radius=this._clampDistance(this._spherical.radius);else{const o=this._spherical.radius;this._spherical.radius=this._clampDistance(this._spherical.radius*this._scale),s=o!=this._spherical.radius}if(jt.setFromSpherical(this._spherical),jt.applyQuaternion(this._quatInverse),t.copy(this.target).add(jt),this.object.lookAt(this.target),this.enableDamping===!0?(this._sphericalDelta.theta*=1-this.dampingFactor,this._sphericalDelta.phi*=1-this.dampingFactor,this._panOffset.multiplyScalar(1-this.dampingFactor)):(this._sphericalDelta.set(0,0,0),this._panOffset.set(0,0,0)),this.zoomToCursor&&this._performCursorZoom){let o=null;if(this.object.isPerspectiveCamera){const a=jt.length();o=this._clampDistance(a*this._scale);const l=a-o;this.object.position.addScaledVector(this._dollyDirection,l),this.object.updateMatrixWorld(),s=!!l}else if(this.object.isOrthographicCamera){const a=new N(this._mouse.x,this._mouse.y,0);a.unproject(this.object);const l=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),this.object.updateProjectionMatrix(),s=l!==this.object.zoom;const c=new N(this._mouse.x,this._mouse.y,0);c.unproject(this.object),this.object.position.sub(c).add(a),this.object.updateMatrixWorld(),o=jt.length()}else console.warn("WARNING: OrbitControls.js encountered an unknown camera type - zoom to cursor disabled."),this.zoomToCursor=!1;o!==null&&(this.screenSpacePanning?this.target.set(0,0,-1).transformDirection(this.object.matrix).multiplyScalar(o).add(this.object.position):(Na.origin.copy(this.object.position),Na.direction.set(0,0,-1).transformDirection(this.object.matrix),Math.abs(this.object.up.dot(Na.direction))<E1?this.object.lookAt(this.target):(Xp.setFromNormalAndCoplanarPoint(this.object.up,this.target),Na.intersectPlane(Xp,this.target))))}else if(this.object.isOrthographicCamera){const o=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),o!==this.object.zoom&&(this.object.updateProjectionMatrix(),s=!0)}return this._scale=1,this._performCursorZoom=!1,s||this._lastPosition.distanceToSquared(this.object.position)>nu||8*(1-this._lastQuaternion.dot(this.object.quaternion))>nu||this._lastTargetPosition.distanceToSquared(this.target)>nu?(this.dispatchEvent($p),this._lastPosition.copy(this.object.position),this._lastQuaternion.copy(this.object.quaternion),this._lastTargetPosition.copy(this.target),!0):!1}_getAutoRotationAngle(e){return e!==null?vn/60*this.autoRotateSpeed*e:vn/60/60*this.autoRotateSpeed}_getZoomScale(e){const t=Math.abs(e*.01);return Math.pow(.95,this.zoomSpeed*t)}_rotateLeft(e){this._sphericalDelta.theta-=e}_rotateUp(e){this._sphericalDelta.phi-=e}_panLeft(e,t){jt.setFromMatrixColumn(t,0),jt.multiplyScalar(-e),this._panOffset.add(jt)}_panUp(e,t){this.screenSpacePanning===!0?jt.setFromMatrixColumn(t,1):(jt.setFromMatrixColumn(t,0),jt.crossVectors(this.object.up,jt)),jt.multiplyScalar(e),this._panOffset.add(jt)}_pan(e,t){const i=this.domElement;if(this.object.isPerspectiveCamera){const r=this.object.position;jt.copy(r).sub(this.target);let s=jt.length();s*=Math.tan(this.object.fov/2*Math.PI/180),this._panLeft(2*e*s/i.clientHeight,this.object.matrix),this._panUp(2*t*s/i.clientHeight,this.object.matrix)}else this.object.isOrthographicCamera?(this._panLeft(e*(this.object.right-this.object.left)/this.object.zoom/i.clientWidth,this.object.matrix),this._panUp(t*(this.object.top-this.object.bottom)/this.object.zoom/i.clientHeight,this.object.matrix)):(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."),this.enablePan=!1)}_dollyOut(e){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale/=e:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_dollyIn(e){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale*=e:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_updateZoomParameters(e,t){if(!this.zoomToCursor)return;this._performCursorZoom=!0;const i=this.domElement.getBoundingClientRect(),r=e-i.left,s=t-i.top,o=i.width,a=i.height;this._mouse.x=r/o*2-1,this._mouse.y=-(s/a)*2+1,this._dollyDirection.set(this._mouse.x,this._mouse.y,1).unproject(this.object).sub(this.object.position).normalize()}_clampDistance(e){return Math.max(this.minDistance,Math.min(this.maxDistance,e))}_handleMouseDownRotate(e){this._rotateStart.set(e.clientX,e.clientY)}_handleMouseDownDolly(e){this._updateZoomParameters(e.clientX,e.clientX),this._dollyStart.set(e.clientX,e.clientY)}_handleMouseDownPan(e){this._panStart.set(e.clientX,e.clientY)}_handleMouseMoveRotate(e){this._rotateEnd.set(e.clientX,e.clientY),this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);const t=this.domElement;this._rotateLeft(vn*this._rotateDelta.x/t.clientHeight),this._rotateUp(vn*this._rotateDelta.y/t.clientHeight),this._rotateStart.copy(this._rotateEnd),this.update()}_handleMouseMoveDolly(e){this._dollyEnd.set(e.clientX,e.clientY),this._dollyDelta.subVectors(this._dollyEnd,this._dollyStart),this._dollyDelta.y>0?this._dollyOut(this._getZoomScale(this._dollyDelta.y)):this._dollyDelta.y<0&&this._dollyIn(this._getZoomScale(this._dollyDelta.y)),this._dollyStart.copy(this._dollyEnd),this.update()}_handleMouseMovePan(e){this._panEnd.set(e.clientX,e.clientY),this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd),this.update()}_handleMouseWheel(e){this._updateZoomParameters(e.clientX,e.clientY),e.deltaY<0?this._dollyIn(this._getZoomScale(e.deltaY)):e.deltaY>0&&this._dollyOut(this._getZoomScale(e.deltaY)),this.update()}_handleKeyDown(e){let t=!1;switch(e.code){case this.keys.UP:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateUp(vn*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,this.keyPanSpeed),t=!0;break;case this.keys.BOTTOM:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateUp(-vn*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,-this.keyPanSpeed),t=!0;break;case this.keys.LEFT:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateLeft(vn*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(this.keyPanSpeed,0),t=!0;break;case this.keys.RIGHT:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateLeft(-vn*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(-this.keyPanSpeed,0),t=!0;break}t&&(e.preventDefault(),this.update())}_handleTouchStartRotate(e){if(this._pointers.length===1)this._rotateStart.set(e.pageX,e.pageY);else{const t=this._getSecondPointerPosition(e),i=.5*(e.pageX+t.x),r=.5*(e.pageY+t.y);this._rotateStart.set(i,r)}}_handleTouchStartPan(e){if(this._pointers.length===1)this._panStart.set(e.pageX,e.pageY);else{const t=this._getSecondPointerPosition(e),i=.5*(e.pageX+t.x),r=.5*(e.pageY+t.y);this._panStart.set(i,r)}}_handleTouchStartDolly(e){const t=this._getSecondPointerPosition(e),i=e.pageX-t.x,r=e.pageY-t.y,s=Math.sqrt(i*i+r*r);this._dollyStart.set(0,s)}_handleTouchStartDollyPan(e){this.enableZoom&&this._handleTouchStartDolly(e),this.enablePan&&this._handleTouchStartPan(e)}_handleTouchStartDollyRotate(e){this.enableZoom&&this._handleTouchStartDolly(e),this.enableRotate&&this._handleTouchStartRotate(e)}_handleTouchMoveRotate(e){if(this._pointers.length==1)this._rotateEnd.set(e.pageX,e.pageY);else{const i=this._getSecondPointerPosition(e),r=.5*(e.pageX+i.x),s=.5*(e.pageY+i.y);this._rotateEnd.set(r,s)}this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);const t=this.domElement;this._rotateLeft(vn*this._rotateDelta.x/t.clientHeight),this._rotateUp(vn*this._rotateDelta.y/t.clientHeight),this._rotateStart.copy(this._rotateEnd)}_handleTouchMovePan(e){if(this._pointers.length===1)this._panEnd.set(e.pageX,e.pageY);else{const t=this._getSecondPointerPosition(e),i=.5*(e.pageX+t.x),r=.5*(e.pageY+t.y);this._panEnd.set(i,r)}this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd)}_handleTouchMoveDolly(e){const t=this._getSecondPointerPosition(e),i=e.pageX-t.x,r=e.pageY-t.y,s=Math.sqrt(i*i+r*r);this._dollyEnd.set(0,s),this._dollyDelta.set(0,Math.pow(this._dollyEnd.y/this._dollyStart.y,this.zoomSpeed)),this._dollyOut(this._dollyDelta.y),this._dollyStart.copy(this._dollyEnd);const o=(e.pageX+t.x)*.5,a=(e.pageY+t.y)*.5;this._updateZoomParameters(o,a)}_handleTouchMoveDollyPan(e){this.enableZoom&&this._handleTouchMoveDolly(e),this.enablePan&&this._handleTouchMovePan(e)}_handleTouchMoveDollyRotate(e){this.enableZoom&&this._handleTouchMoveDolly(e),this.enableRotate&&this._handleTouchMoveRotate(e)}_addPointer(e){this._pointers.push(e.pointerId)}_removePointer(e){delete this._pointerPositions[e.pointerId];for(let t=0;t<this._pointers.length;t++)if(this._pointers[t]==e.pointerId){this._pointers.splice(t,1);return}}_isTrackingPointer(e){for(let t=0;t<this._pointers.length;t++)if(this._pointers[t]==e.pointerId)return!0;return!1}_trackPointer(e){let t=this._pointerPositions[e.pointerId];t===void 0&&(t=new We,this._pointerPositions[e.pointerId]=t),t.set(e.pageX,e.pageY)}_getSecondPointerPosition(e){const t=e.pointerId===this._pointers[0]?this._pointers[1]:this._pointers[0];return this._pointerPositions[t]}_customWheelEvent(e){const t=e.deltaMode,i={clientX:e.clientX,clientY:e.clientY,deltaY:e.deltaY};switch(t){case 1:i.deltaY*=16;break;case 2:i.deltaY*=100;break}return e.ctrlKey&&!this._controlActive&&(i.deltaY*=10),i}}function w1(n){this.enabled!==!1&&(this._pointers.length===0&&(this.domElement.setPointerCapture(n.pointerId),this.domElement.ownerDocument.addEventListener("pointermove",this._onPointerMove),this.domElement.ownerDocument.addEventListener("pointerup",this._onPointerUp)),!this._isTrackingPointer(n)&&(this._addPointer(n),n.pointerType==="touch"?this._onTouchStart(n):this._onMouseDown(n),this._cursorStyle==="grab"&&(this.domElement.style.cursor="grabbing")))}function T1(n){this.enabled!==!1&&(n.pointerType==="touch"?this._onTouchMove(n):this._onMouseMove(n))}function A1(n){switch(this._removePointer(n),this._pointers.length){case 0:this.domElement.releasePointerCapture(n.pointerId),this.domElement.ownerDocument.removeEventListener("pointermove",this._onPointerMove),this.domElement.ownerDocument.removeEventListener("pointerup",this._onPointerUp),this.dispatchEvent(V_),this.state=mt.NONE,this._cursorStyle==="grab"&&(this.domElement.style.cursor="grab");break;case 1:const e=this._pointers[0],t=this._pointerPositions[e];this._onTouchStart({pointerId:e,pageX:t.x,pageY:t.y});break}}function C1(n){let e;switch(n.button){case 0:e=this.mouseButtons.LEFT;break;case 1:e=this.mouseButtons.MIDDLE;break;case 2:e=this.mouseButtons.RIGHT;break;default:e=-1}switch(e){case Cs.DOLLY:if(this.enableZoom===!1)return;this._handleMouseDownDolly(n),this.state=mt.DOLLY;break;case Cs.ROTATE:if(n.ctrlKey||n.metaKey||n.shiftKey){if(this.enablePan===!1)return;this._handleMouseDownPan(n),this.state=mt.PAN}else{if(this.enableRotate===!1)return;this._handleMouseDownRotate(n),this.state=mt.ROTATE}break;case Cs.PAN:if(n.ctrlKey||n.metaKey||n.shiftKey){if(this.enableRotate===!1)return;this._handleMouseDownRotate(n),this.state=mt.ROTATE}else{if(this.enablePan===!1)return;this._handleMouseDownPan(n),this.state=mt.PAN}break;default:this.state=mt.NONE}this.state!==mt.NONE&&this.dispatchEvent(dh)}function R1(n){switch(this.state){case mt.ROTATE:if(this.enableRotate===!1)return;this._handleMouseMoveRotate(n);break;case mt.DOLLY:if(this.enableZoom===!1)return;this._handleMouseMoveDolly(n);break;case mt.PAN:if(this.enablePan===!1)return;this._handleMouseMovePan(n);break}}function P1(n){this.enabled===!1||this.enableZoom===!1||this.state!==mt.NONE||(n.preventDefault(),this.dispatchEvent(dh),this._handleMouseWheel(this._customWheelEvent(n)),this.dispatchEvent(V_))}function L1(n){this.enabled!==!1&&this._handleKeyDown(n)}function D1(n){switch(this._trackPointer(n),this._pointers.length){case 1:switch(this.touches.ONE){case Ss.ROTATE:if(this.enableRotate===!1)return;this._handleTouchStartRotate(n),this.state=mt.TOUCH_ROTATE;break;case Ss.PAN:if(this.enablePan===!1)return;this._handleTouchStartPan(n),this.state=mt.TOUCH_PAN;break;default:this.state=mt.NONE}break;case 2:switch(this.touches.TWO){case Ss.DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchStartDollyPan(n),this.state=mt.TOUCH_DOLLY_PAN;break;case Ss.DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchStartDollyRotate(n),this.state=mt.TOUCH_DOLLY_ROTATE;break;default:this.state=mt.NONE}break;default:this.state=mt.NONE}this.state!==mt.NONE&&this.dispatchEvent(dh)}function N1(n){switch(this._trackPointer(n),this.state){case mt.TOUCH_ROTATE:if(this.enableRotate===!1)return;this._handleTouchMoveRotate(n),this.update();break;case mt.TOUCH_PAN:if(this.enablePan===!1)return;this._handleTouchMovePan(n),this.update();break;case mt.TOUCH_DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchMoveDollyPan(n),this.update();break;case mt.TOUCH_DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchMoveDollyRotate(n),this.update();break;default:this.state=mt.NONE}}function I1(n){this.enabled!==!1&&n.preventDefault()}function U1(n){n.key==="Control"&&(this._controlActive=!0,this.domElement.getRootNode().addEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}function F1(n){n.key==="Control"&&(this._controlActive=!1,this.domElement.getRootNode().removeEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}function hh(n){const e=document.createElement("canvas");return e.width=n,e.height=n,{canvas:e,ctx:e.getContext("2d")}}function O1(){const{canvas:e,ctx:t}=hh(128),i=128/2,r=t.createRadialGradient(i,i,0,i,i,i);return r.addColorStop(0,"rgba(255,255,255,1)"),r.addColorStop(.65,"rgba(255,255,255,0.97)"),r.addColorStop(1,"rgba(255,255,255,0)"),t.fillStyle=r,t.fillRect(0,0,128,128),new lh(e)}function k1(){const{canvas:e,ctx:t}=hh(128),i=128/2,r=128/2,s=128*.42,o=128*.1;return t.strokeStyle="rgba(255,255,255,0.95)",t.lineWidth=o,t.beginPath(),t.arc(i,r,s,0,Math.PI*2),t.stroke(),new lh(e)}function B1(){const{canvas:e,ctx:t}=hh(128),i=128/2,r=128/2,s=128*.16,o=t.createRadialGradient(i,r,0,i,r,s);o.addColorStop(0,"rgba(255,255,255,1)"),o.addColorStop(.65,"rgba(255,255,255,0.95)"),o.addColorStop(1,"rgba(255,255,255,0)"),t.fillStyle=o,t.beginPath(),t.arc(i,r,s,0,Math.PI*2),t.fill();const a=128*.36,l=128*.13;return t.strokeStyle="rgba(255,255,255,0.95)",t.lineWidth=l,t.beginPath(),t.arc(i,r,a,0,Math.PI*2),t.stroke(),new lh(e)}const W_=O1();function iu(n,e,t){return n+(e-n)*t}function z1(n,e,t,i,r,s){const{selected:o,hover:a,emphasized:l,dim:c,pulsing:u,pulseLife:d}=Ug(e,r,s);if(u)return Gl(Ig(d));if(o)return Ag;if(Jr.value)return[i[n*3]*.1,i[n*3+1]*.1,i[n*3+2]*.1];if(a){const[C,b,A]=[i[n*3],i[n*3+1],i[n*3+2]];return[iu(C,1,.4),iu(b,1,.4),iu(A,1,.4)]}if(l)return hy;if(c)return[i[n*3]*.25,i[n*3+1]*.25,i[n*3+2]*.25];const h=Ni.value,f=h==="b"?Nm.value:Im.value,p=h==="b"?kg:Og,_=f.get(e);if(_!==void 0)return p(_);const g=zo(e),m=((g^g>>>17)&65535)*(Math.PI*2/65535),y=.02+(.5+.5*Math.sin(t*.72+m))*.04,x=i[n*3],M=i[n*3+1],E=i[n*3+2];return[x+(1-x)*y,M+(1-M)*y,E+(1-E)*y]}const G1=_i(()=>Xe.value.snap_endpoints),H1=B1(),V1=W_,W1=k1(),$_=.11,$1=$_*1.7,X1=Gl(Do(Gd,.28)),vd=.75,j1=.6,jp=1;let Bn=null,Oi=null,zn=null,ki=null,mr=-1,Bi=new Float32Array(0),Jn=new Float32Array(0),xd=[],Li=!1;const Sl=new Map;let gr=[],El=null,Cn=null;function Yl(){return Bn}function ql(){return gr}function Y1(){return Li}function q1(n){El=n}function Fo(){const n=es();if(!n)return;X_();const e=Ue.value,t=e==null?void 0:e.trajectory_overlay;if(!vi.value||!(t!=null&&t.length))return;const i=t.filter(p=>p.coords_3d);if(!i.length)return;const r=G1.value,s=((e==null?void 0:e.source_point_ids)??[]).map(String),o=Qi(),a=qs(),l=new Map(o.map((p,_)=>[p,_]));Li=(e==null?void 0:e.operation)==="consistency_check",gr=i,Bi=new Float32Array(i.length*3),Jn=new Float32Array(i.length*3),xd=i.map(p=>p.cluster_id??null);for(let p=0;p<i.length;p++){const _=$r(i[p].coords_3d);if(!_)continue;const[g,m,v]=_;Bi[p*3]=g,Bi[p*3+1]=m,Bi[p*3+2]=v;let y;if(Li&&i[p].cluster_id!=null)y=Gl(Qr(i[p].cluster_id,72));else if(Li)y=X1;else{const x=i[p].source_text_pair;y=Ng(i[p].alpha,x)??fy}if(Jn[p*3]=y[0],Jn[p*3+1]=y[1],Jn[p*3+2]=y[2],r&&(e==null?void 0:e.operation)!=="axis_projection"){const x=zg(i[p].alpha,e==null?void 0:e.operation,s);if(x){const M=l.get(x);M!==void 0&&Sl.set(p,M)}}}const c=Bi.slice();for(const[p,_]of Sl)c[p*3]=a[_*3],c[p*3+1]=a[_*3+1],c[p*3+2]=a[_*3+2];const u=new At,d=new Et(c,3);d.setUsage(Fi),u.setAttribute("position",d);const h=new Et(Jn.slice(),3);if(h.setUsage(Fi),u.setAttribute("color",h),Bn=new pd(u,new yl(Li?{size:$_,sizeAttenuation:!0,vertexColors:!0,map:V1,alphaTest:.08,transparent:!1}:{size:.12,sizeAttenuation:!0,vertexColors:!0,map:H1,alphaTest:.04,transparent:!0,opacity:1})),n.add(Bn),Li){const p=new At,_=new Et(c.slice(),3);_.setUsage(Fi),p.setAttribute("position",_),Oi=new pd(p,new yl({size:$1,sizeAttenuation:!0,map:W1,color:ll,alphaTest:.05,transparent:!0,opacity:.9,depthWrite:!1})),n.add(Oi)}const f=((e==null?void 0:e.operation)==="slerp"||(e==null?void 0:e.operation)==="lerp")&&((e==null?void 0:e.trajectory_overlay)??[]).some(p=>p.coords_3d);if(!Li&&!f){const p=i.findIndex(g=>g.source_text_pair===1),_=(g,m)=>{const v=new At,y=new Et(g,3);y.setUsage(Fi),v.setAttribute("position",y),v.setAttribute("color",new Et(m,3));const x=new Vr(v,new Yi({vertexColors:!0,transparent:!0,opacity:vd}));return n.add(x),x};if(p>0)mr=p,zn=_(c.slice(0,p*3),Jn.slice(0,p*3)),ki=_(c.slice(p*3),Jn.slice(p*3));else if(mr=-1,i.some(m=>m.source_text_pair!==void 0))zn=_(c.slice(),Jn.slice());else{const m=new At,v=new Et(c.slice(),3);v.setUsage(Fi),m.setAttribute("position",v),zn=new Vr(m,new Yi({color:ll,transparent:!0,opacity:j1})),n.add(zn)}}}function X_(){const n=es();Bn&&(n==null||n.remove(Bn),Bn.geometry.dispose(),Bn.material.dispose(),Bn=null),Oi&&(n==null||n.remove(Oi),Oi.geometry.dispose(),Oi.material.dispose(),Oi=null),zn&&(n==null||n.remove(zn),zn.geometry.dispose(),zn.material.dispose(),zn=null),ki&&(n==null||n.remove(ki),ki.geometry.dispose(),ki.material.dispose(),ki=null),mr=-1,Sl.clear(),gr=[],El=null,Cn&&(Cn.remove(),Cn=null)}function K1(n,e,t,i,r){var f,p,_,g,m;if(!Bn)return;const s=Bi.length/3;if(!s)return;if(r&&!Li){const v=.5+.5*Math.sin(i*.7),y=.5+.5*Math.sin(i*.5+1.3),x=Bn.material;x.size=.1+v*.04,x.opacity=.85+y*.15}const o=Bn.geometry.getAttribute("position");for(let v=0;v<s;v++){const y=Sl.get(v);if(y!==void 0)o.setXYZ(v,n[y],e[y],t[y]);else{let x=Bi[v*3],M=Bi[v*3+1],E=Bi[v*3+2];if(r){const C=zo(`ghost-${v}`),{dx:b,dy:A}=Vd(C,i),L=(Math.imul(C,2654435769)>>>0&65535)*(Math.PI*2/65535);x+=b,M+=A,E+=Math.sin(i*.5+L)*.015+Math.sin(i*.3+L+.8)*.01}o.setXYZ(v,x,M,E)}}if(o.needsUpdate=!0,Oi){const v=Oi.geometry.getAttribute("position");for(let y=0;y<s;y++)v.setXYZ(y,o.getX(y),o.getY(y),o.getZ(y));v.needsUpdate=!0}const a=Jr.value;if(zn){const v=mr>=0?mr:s,y=zn.geometry.getAttribute("position");for(let x=0;x<v;x++)y.setXYZ(x,o.getX(x),o.getY(x),o.getZ(x));y.needsUpdate=!0,zn.material.opacity=a?jp:vd}if(ki&&mr>=0){const v=ki.geometry.getAttribute("position");for(let y=mr;y<s;y++)v.setXYZ(y-mr,o.getX(y),o.getY(y),o.getZ(y));v.needsUpdate=!0,ki.material.opacity=a?jp:vd}const l=Bn.geometry.getAttribute("color"),c=Hi.value;let u=-1;for(let v=0;v<s;v++)if(El!==null&&((f=gr[v])==null?void 0:f.id)===El||Mt.value.has(`__ghost__${(p=gr[v])==null?void 0:p.id}`))l.setXYZ(v,...Ag),u=v;else{const x=Jn[v*3],M=Jn[v*3+1],E=Jn[v*3+2],b=c!==null&&(xd[v]==null||String(xd[v])!==c)?.15:1;l.setXYZ(v,x*b,M*b,E*b)}l.needsUpdate=!0;const d=Xo(),h=gh();if(d&&h)if(u>=0){const v=qr(o.getX(u),o.getY(u),o.getZ(u));Cn||(Cn=xh({textColor:"#facc15",borderColor:"rgba(250,204,21,0.6)",shadowColor:"rgba(250,204,21,0.2)",shadowBlur:6,initiallyHidden:!1}),h.appendChild(Cn)),Cn.textContent=Li?((m=(g=(_=Ue.value)==null?void 0:_.consistency_variants)==null?void 0:g.find(y=>y.id===gr[u].id))==null?void 0:m.text)??gr[u].label??"":`t=${gr[u].alpha.toFixed(2)}`,v?(Cn.style.left=`${v.x+8}px`,Cn.style.top=`${v.y-28}px`,Cn.style.display="block"):Cn.style.display="none"}else Cn&&(Cn.style.display="none")}let wo=[],ti=null,To=[],Ao=null,Co=null,fh=0,Ml=null,wl=null;function Kl(){const n=es();if(!n)return;ph();const e=Ue.value;if(!e)return;const t=Qi(),i=qs(),r=e.operation,s=new Map(t.map((o,a)=>[o,a]));if(r==="nearest_neighbor"){const o=Bg(e),a=[],l=[];for(const c of e.neighbors??[]){const u=String(c.id??"");if(!u)continue;const d=c.query_id?[String(c.query_id)]:o;for(const h of d){const f=s.get(h),p=s.get(u);f===void 0||p===void 0||(l.push([f,p]),a.push(i[f*3],i[f*3+1],i[f*3+2],i[p*3],i[p*3+1],i[p*3+2]))}}if(a.length){const c=new At,u=new Et(a,3);u.setUsage(Fi),c.setAttribute("position",u);const d=new yE({color:Dg,dashSize:.035,gapSize:.02,transparent:!0,opacity:.78});ti=new C_(c,d),ti.computeLineDistances(),To=l,n.add(ti)}}if(r==="lerp"&&vi.value){const o=Yp(e,s,i);if(o){const a=new At().setFromPoints(o),l=new Vr(a,new Yi({color:ll,transparent:!0,opacity:.85}));n.add(l),wo.push(l),Ao=l}}if(r==="slerp"&&vi.value){const o=Yp(e,s,i);if(o){const a=new L_(o,!1,"catmullrom",.15).getPoints(Math.max(o.length*12,96)),l=new At().setFromPoints(a),c=new Vr(l,new Yi({color:ll,transparent:!0,opacity:.78}));n.add(c),wo.push(c),Co=c,fh=o.length}}if(r==="delta_walk"){const o=(e.source_point_ids??[]).map(String),[a,l]=o,c=s.get(a),u=l?s.get(l):void 0;if(c!==void 0&&u!==void 0){const d=new N(i[c*3],i[c*3+1],i[c*3+2]),h=new N(i[u*3],i[u*3+1],i[u*3+2]),f=new At().setFromPoints([d,h]);f.getAttribute("position").setUsage(Fi);const p=new Vr(f,new Yi({color:py,transparent:!0,opacity:.78}));n.add(p),wo.push(p),Ml=p,wl=[c,u]}}}function Z1(n,e,t){if(ti&&To.length){const i=ti.geometry.getAttribute("position");for(let r=0;r<To.length;r++){const[s,o]=To[r];i.setXYZ(r*2,n[s],e[s],t[s]),i.setXYZ(r*2+1,n[o],e[o],t[o])}i.needsUpdate=!0,ti.computeLineDistances()}if(Ml&&wl){const[i,r]=wl,s=Ml.geometry.getAttribute("position");s.setXYZ(0,n[i],e[i],t[i]),s.setXYZ(1,n[r],e[r],t[r]),s.needsUpdate=!0}if(Ao||Co){const i=Yl(),s=ql().length;if(i&&s){const o=i.geometry.getAttribute("position"),a=[];for(let l=0;l<s;l++)a.push(new N(o.getX(l),o.getY(l),o.getZ(l)));if(Ao){const l=Ao.geometry.getAttribute("position");for(let c=0;c<s&&c<l.count;c++)l.setXYZ(c,a[c].x,a[c].y,a[c].z);l.needsUpdate=!0}if(Co&&fh===s){const l=new L_(a,!1,"catmullrom",.15).getPoints(Math.max(s*12,96)),c=Co.geometry.getAttribute("position");for(let u=0;u<l.length&&u<c.count;u++)c.setXYZ(u,l[u].x,l[u].y,l[u].z);c.needsUpdate=!0}}}}function ph(){const n=es();ti&&(n==null||n.remove(ti),ti.geometry.dispose(),ti.material.dispose(),ti=null),To=[];for(const e of wo)n==null||n.remove(e),e.geometry.dispose(),e.material.dispose();wo=[],Ao=null,Co=null,fh=0,Ml=null,wl=null}function Yp(n,e,t){const[i,r]=(n.source_point_ids??[]).map(String),s=e.get(i),o=r?e.get(r):void 0,a=(n.trajectory_overlay??[]).filter(c=>c.coords_3d);if(a.length<2)return null;const l=Xe.value.snap_endpoints&&n.operation!=="axis_projection";return a.map(c=>{const u=$r(c.coords_3d);let[d,h,f]=u??[0,0,0];return l&&(c.alpha===0&&s!==void 0?[d,h,f]=[t[s*3],t[s*3+1],t[s*3+2]]:c.alpha===1&&o!==void 0&&([d,h,f]=[t[o*3],t[o*3+1],t[o*3+2]])),new N(d,h,f)})}let Tl=null,Al=null;function j_(){qp(Tl),qp(Al),Tl=null,Al=null}function qp(n){var e;n&&((e=es())==null||e.remove(n.line),n.line.geometry.dispose(),n.line.material.dispose(),n.divA.remove(),n.divB.remove())}function Kp(n){const e=Qi(),t=qs();let i=0,r=0,s=0,o=0;for(const a of n){const l=e.indexOf(String(a));l<0||(i+=t[l*3],r+=t[l*3+1],s+=t[l*3+2],o++)}return o?{x:i/o,y:r/o,z:s/o}:null}function Zp(n,e,t,i,r,s){if(!t.length)return null;const{sideA:o,sideB:a}=Gg(t),l=Kp(o),c=Kp(a);if(!l||!c)return null;const u=c.x-l.x,d=c.y-l.y,h=c.z-l.z,f=Math.sqrt(u*u+d*d+h*h);if(f<1e-6)return null;const p=u/f,_=d/f,g=h/f,m=1.5,v=l.x-p*m,y=l.y-_*m,x=l.z-g*m,M=c.x+p*m,E=c.y+_*m,C=c.z+g*m,b=new N(v,y,x),A=new N(M,E,C),[L,P,F]=s.lineStart,[$,W,I]=s.lineEnd,B=[v,y,x,l.x,l.y,l.z,(l.x+c.x)/2,(l.y+c.y)/2,(l.z+c.z)/2,c.x,c.y,c.z,M,E,C],H=[L,P,F,L,P,F,1,1,1,$,W,I,$,W,I],Z=new At;Z.setAttribute("position",new Et(B,3)),Z.setAttribute("color",new Et(H,3));const J=new Vr(Z,new Yi({vertexColors:!0,transparent:!0,opacity:.92,linewidth:2}));n.add(J);const ne=document.createElement("div");ne.style.cssText=`position:absolute;pointer-events:none;display:none;color:${s.labelStartColor};font:10px ui-monospace,monospace;white-space:nowrap;text-shadow:0 0 4px #000;z-index:8;`,ne.textContent="<- "+i,e.appendChild(ne);const de=document.createElement("div");return de.style.cssText=`position:absolute;pointer-events:none;display:none;color:${s.labelEndColor};font:10px ui-monospace,monospace;white-space:nowrap;text-shadow:0 0 4px #000;z-index:8;`,de.textContent=r+" ->",e.appendChild(de),{line:J,divA:ne,divB:de,worldA:b,worldB:A}}function Y_(){j_();const n=es(),e=Qi(),t=gh(),i=Ue.value;(i==null?void 0:i.operation)!=="axis_projection"||!n||!e.length||!t||(Tl=Zp(n,t,i.axis_projection??[],i.axis_keywords_a??"A-side",i.axis_keywords_b??"B-side",{lineStart:Cg,lineEnd:Rg,labelStartColor:"#60a5fa",labelEndColor:"#f87171"}),Al=Zp(n,t,i.axis_b_projection??[],i.axis_b_keywords_a??"C-side",i.axis_b_keywords_b??"D-side",{lineStart:Pg,lineEnd:Lg,labelStartColor:"#4ade80",labelEndColor:"#fb923c"}))}function J1(){Jp(Tl),Jp(Al)}function Jp(n){if(!n)return;const e=qr(n.worldA.x,n.worldA.y,n.worldA.z);e?(n.divA.style.left=`${e.x+6}px`,n.divA.style.top=`${e.y-8}px`,n.divA.style.display="block"):n.divA.style.display="none";const t=qr(n.worldB.x,n.worldB.y,n.worldB.z);t?(n.divB.style.left=`${t.x-(n.divB.offsetWidth||80)-6}px`,n.divB.style.top=`${t.y-8}px`,n.divB.style.display="block"):n.divB.style.display="none"}const Gn=new ME;Gn.params.Points={threshold:.025};const Qp=new We;function mh(n,e,t){const i=e.domElement.getBoundingClientRect();return Qp.set((n.clientX-i.left)/i.width*2-1,-((n.clientY-i.top)/i.height)*2+1),Gn.setFromCamera(Qp,t),i}let q_=0,K_=0;const em=5;let Oo=!1,Ls=null,ko=!1;function Q1(){Oo=!1,Ls=null,ko=!1,ri.value=null;const n=Jl();n&&(n.enabled=!0)}function Z_(n){q_=n.clientX,K_=n.clientY;const e=jo(),t=Jl();if(n.shiftKey&&e&&t){Oo=!0,ko=!1,t.enabled=!1;const i=e.domElement.getBoundingClientRect(),r=n.clientX-i.left,s=n.clientY-i.top;Ls={x:r,y:s},ri.value={x1:r,y1:s,x2:r,y2:s}}}function J_(n){var l,c,u,d;const e=jo();if(Oo&&Ls&&e){const h=e.domElement.getBoundingClientRect(),f=n.clientX-h.left,p=n.clientY-h.top;ri.value={x1:Ls.x,y1:Ls.y,x2:f,y2:p};return}const t=Xo();if(!e||!t)return;mh(n,e,t);const i=Ql(),r=Qi();if(i&&r.length){const h=Gn.intersectObject(i);if(h.length>0&&h[0].index!==void 0){const f=r[h[0].index];if(Ft.value!==f&&(Ft.value=f,Pn.value=ot.value.byId.get(f)??null,e.domElement.style.cursor="pointer"),Mt.value.has(f)){const p=nv().get(f);p&&(p.style.display="none")}return}}const s=ec();if(s&&Gn.intersectObject(s).length>0){if(Ft.value!=="probe"){Ft.value="probe";const f=((l=Ue.value)==null?void 0:l.operation)==="latent_probe"?(c=Ue.value)==null?void 0:c.text_reconstruction:void 0,p=Xe.value,_=p.probe_mode==="3d"?p.probe_coords:p.probe_cross_coords,g=$r(_??void 0);Pn.value={id:"probe",view_coords:g??[0,0,0],label:"Latent probe",metadata:{text:"Latent Space Probe",recon_text:f==null?void 0:f.text,recon_sim:f==null?void 0:f.cosine_sim}},e.domElement.style.cursor="pointer"}return}const o=Yl(),a=ql();if(o&&a.length){const h=Gn.intersectObject(o);if(h.length>0&&h[0].index!==void 0){const f=a[h[0].index],p=`__ghost__${f.id}`;if(Ft.value!==p){Ft.value=p;const _=Y1(),g=(d=(u=Ue.value)==null?void 0:u.consistency_variants)==null?void 0:d.find(y=>y.id===f.id),m=_?(g==null?void 0:g.text)??f.label??`t=${f.alpha.toFixed(2)}`:`t=${f.alpha.toFixed(2)}`,v=f.cluster_id??null;Pn.value={id:f.id,view_coords:$r(f.coords_3d??void 0)??f.coords_2d??[0,0],label:m,metadata:{text:m,..._&&v!=null&&v>=0?{ghost_cluster_id:v}:{}}},e.domElement.style.cursor="pointer"}return}}Ft.value!==null&&(Ft.value=null,Pn.value=null),e.domElement.style.cursor=""}function Q_(n){if(!Oo)return;Oo=!1;const e=Jl();e&&(e.enabled=!0);const t=ri.value;if(ri.value=null,Ls=null,!t)return;const i=Math.min(t.x1,t.x2),r=Math.max(t.x1,t.x2),s=Math.min(t.y1,t.y2),o=Math.max(t.y1,t.y2);if(r-i<4&&o-s<4)return;ko=!0;const a=Qi(),l=qs(),c=new Set;for(let u=0;u<a.length;u++){const d=qr(l[u*3],l[u*3+1],l[u*3+2]);d&&d.x>=i&&d.x<=r&&d.y>=s&&d.y<=o&&c.add(a[u])}if(c.size>0){const u=n.ctrlKey||n.metaKey?Mt.value:new Set;Mt.value=new Set([...u,...c]),st()}}function ev(n){var c,u,d,h;n.preventDefault();const e=jo(),t=Xo(),i=Ql(),r=Qi();if(!e||!t||!i||!r.length)return;mh(n,e,t);const s=Gn.intersectObject(i);if(s.length>0&&s[0].index!==void 0){Ts(n.clientX,n.clientY,r[s[0].index]);return}const o=Yl(),a=ql();if(o&&a.length){const f=Gn.intersectObject(o);if(f.length>0&&f[0].index!==void 0){const p=a[f[0].index],_=(u=(c=Ue.value)==null?void 0:c.consistency_variants)==null?void 0:u.find(m=>m.id===p.id),g=(_==null?void 0:_.text)??p.label??`t=${p.alpha.toFixed(2)}`;Ts(n.clientX,n.clientY,`__ghost__${p.id}`,g);return}}const l=ec();if(l&&Gn.intersectObject(l).length>0){const p=((d=Ue.value)==null?void 0:d.operation)==="latent_probe"?(h=Ue.value)==null?void 0:h.text_reconstruction:void 0;Ts(n.clientX,n.clientY,"probe",(p==null?void 0:p.text)??"Latent Space Probe")}}function tv(n){if(ko){ko=!1;return}const e=n.clientX-q_,t=n.clientY-K_;if(e*e+t*t>em*em)return;const i=jo(),r=Xo(),s=Ql(),o=Qi();if(!i||!r||!s||!o.length)return;mh(n,i,r);const a=Gn.intersectObject(s);if(a.length>0&&a[0].index!==void 0){const d=n.shiftKey||n.ctrlKey||n.metaKey;Es(o[a[0].index],d),st();return}const l=Yl(),c=ql();if(l&&c.length){const d=Gn.intersectObject(l);if(d.length>0&&d[0].index!==void 0){const h=c[d[0].index],f=n.shiftKey||n.ctrlKey||n.metaKey;Es(`__ghost__${h.id}`,f),st();return}}const u=Xe.value;if(u.operation==="latent_probe"&&!u.probe_place_mode){const d=ec();if(d&&Gn.intersectObject(d).length>0){const f=n.shiftKey||n.ctrlKey||n.metaKey;Es("probe",f),st();return}}if(u.operation==="latent_probe"&&u.probe_place_mode){const d=qs(),h=new N,f=d.length/3;if(f>0){for(let v=0;v<d.length;v+=3)h.x+=d[v],h.y+=d[v+1],h.z+=d[v+2];h.divideScalar(f)}const p=new N;r.getWorldDirection(p);const _=new Pi().setFromNormalAndCoplanarPoint(p,h),g=new N;Gn.ray.intersectPlane(_,g);const m=o0([g.x,g.y,g.z]);if(!m)return;Lt({probe_coords:m,probe_mode:"3d",probe_place_mode:!1}),st()}else Dd(),Ft.value=null,Pn.value=null,st()}let Pe=null,tn=null,Dt=null,Wt=null,Vt=null,On=null,Ir=null,pn=null,br=null,Qt=null,xn=[],Tt=new Float32Array(0),Or=new Float32Array(0);const Zl=new Map,Zn=[],hi={selectedIds:new Set,emphasizedIds:new Set,hoverNodeId:null},_r=new Map;let Rn=null;const Ia=new N,eC=W_,tC=_i(()=>Xe.value.snap_endpoints);function es(){return tn}function Xo(){return Dt}function jo(){return Pe}function Jl(){return Wt}function gh(){return Qt}function Qi(){return xn}function qs(){return Tt}function Ql(){return Vt}function ec(){return pn}function nv(){return _r}function qr(n,e,t){if(!Dt||!Qt||(Ia.set(n,e,t).project(Dt),Ia.z>1))return null;const i=Qt.clientWidth,r=Qt.clientHeight;return{x:(Ia.x+1)/2*i,y:(1-Ia.y)/2*r}}function iv(n){if(Pe)return;Qt=n,window.addEventListener("beforeunload",_h,{once:!0}),Pe=new S1({antialias:!0,preserveDrawingBuffer:!0}),Pe.setPixelRatio(Math.min(window.devicePixelRatio,2)),Pe.setSize(n.clientWidth||600,n.clientHeight||400),Pe.setClearColor(329999,1),n.appendChild(Pe.domElement),tn=new nE,tn.fog=new oh(329999,.18),On=new wE(8,40,2776232,1978448),On.position.y=-1.2;const e=Array.isArray(On.material)?On.material:[On.material];for(const r of e)r.transparent=!0,r.opacity=.7;tn.add(On);const t=n.clientWidth||600,i=n.clientHeight||400;Dt=new Fn(55,t/i,.001,100),Dt.position.set(.6,.5,2.2),Wt=new M1(Dt,Pe.domElement),Wt.enableDamping=!0,Wt.dampingFactor=.08,Wt.addEventListener("end",()=>st()),Pe.domElement.addEventListener("mousedown",Z_),Pe.domElement.addEventListener("mousemove",J_),Pe.domElement.addEventListener("mouseup",Q_),Pe.domElement.addEventListener("click",tv),Pe.domElement.addEventListener("contextmenu",ev),Pe.domElement.addEventListener("webglcontextlost",rv,!1),Pe.domElement.addEventListener("webglcontextrestored",sv,!1),Zn.push(Yt(()=>{cv(ot.value)})),Zn.push(Yt(()=>{const r=Mt.value,s=[...r].filter(o=>!hi.selectedIds.has(o));hi.selectedIds=r,hi.emphasizedIds=Om.value,hi.hoverNodeId=Ft.value,s.length>0&&av(s),mn()})),Zn.push(Yt(()=>{yr.value==="graph"&&ot.value.points.length>0?uv():(vh(),mn())})),Zn.push(Yt(()=>{vi.value,Kl(),Fo(),mn()})),Zn.push(Yt(()=>{Jr.value,mn()})),Zn.push(Yt(()=>{Hr.value,ot.value,mn()})),Zn.push(Yt(()=>{tC.value,Fo(),mn()})),Zn.push(Yt(()=>{Ue.value,Y_(),mn()})),Zn.push(Yt(()=>{const r=Xe.value;if(pn&&(tn==null||tn.remove(pn),pn.geometry.dispose(),pn.material.dispose(),pn=null),r.operation==="latent_probe"&&tn){let s=null;if(r.probe_mode==="3d"&&r.probe_coords&&r.probe_coords.length>=3?s=$r(r.probe_coords):r.probe_mode==="2d"&&r.probe_cross_coords&&r.probe_cross_coords.length>=3&&(s=$r(r.probe_cross_coords)),s){const[o,a,l]=s,c=new uh(.04,12,8);pn=new bi(c,new ah({color:Dg})),pn.position.set(o,a,l),tn.add(pn)}}mn()}))}function rv(n){n.preventDefault(),vh()}function sv(){cv(ot.value),Kl(),Fo(),Y_(),yr.value==="graph"&&ot.value.points.length>0&&uv(),mn()}function _h(){for(const n of Zn)n();if(Zn.length=0,vh(),Pe==null||Pe.domElement.removeEventListener("mousedown",Z_),Pe==null||Pe.domElement.removeEventListener("mousemove",J_),Pe==null||Pe.domElement.removeEventListener("mouseup",Q_),Pe==null||Pe.domElement.removeEventListener("click",tv),Pe==null||Pe.domElement.removeEventListener("contextmenu",ev),Pe==null||Pe.domElement.removeEventListener("webglcontextlost",rv),Pe==null||Pe.domElement.removeEventListener("webglcontextrestored",sv),Q1(),Qt&&(Pe==null?void 0:Pe.domElement.parentNode)===Qt&&Qt.removeChild(Pe.domElement),Wt==null||Wt.dispose(),ph(),X_(),pn&&(pn.geometry.dispose(),pn.material.dispose(),pn=null),Vt&&(Vt.geometry.dispose(),Vt.material.dispose()),On){On.geometry.dispose();const n=Array.isArray(On.material)?On.material:[On.material];for(const e of n)e.dispose();On=null}Pe==null||Pe.forceContextLoss(),Pe==null||Pe.dispose(),Pe=null,tn=null,Dt=null,Wt=null,Vt=null,Qt&&(Qt.style.position=""),Qt=null,xn=[],Tt=new Float32Array(0),Or=new Float32Array(0),Zl.clear(),j_();for(const n of _r.values())n.remove();_r.clear(),Rn&&(Rn.remove(),Rn=null)}function nC(){mn()}function bd(){if(!Pe||!Qt||!Dt)return;const n=Qt.clientWidth||600,e=Qt.clientHeight||400;Pe.setSize(n,e),Dt.aspect=n/e,Dt.updateProjectionMatrix(),mn()}function iC(){return{x:0,y:0,ratio:1}}function rC(n){}function ov(){if(!Wt||!Dt)return;const n=Tt.length/3;if(n===0)Dt.position.set(.6,.5,2.2),Wt.target.set(0,0,0);else{let e=0,t=0,i=0;for(let o=0;o<n;o++)e+=Tt[o*3],t+=Tt[o*3+1],i+=Tt[o*3+2];e/=n,t/=n,i/=n;let r=0;for(let o=0;o<n;o++){const a=Tt[o*3]-e,l=Tt[o*3+1]-t,c=Tt[o*3+2]-i;r=Math.max(r,Math.sqrt(a*a+l*l+c*c))}const s=r/Math.tan(55/2*Math.PI/180)*1.3;Wt.target.set(e,t,i),Dt.position.set(e+s*.28,t+s*.2,i+s)}Dt.lookAt(Wt.target),Wt.update(),mn()}function sC(){Kl(),Fo()}function oC(n){q1(n),mn()}function av(n){Wd(n,Zl)}function aC(n){Wd(Ld(n),Zl)}function lv(n){Ir=n}function cv(n){if(!tn)return;Vt&&(tn.remove(Vt),Vt.geometry.dispose(),Vt.material.dispose(),Vt=null),ph();const e=n.points;if(!e.length){mn();return}xn=e.map(o=>String(o.id)),Tt=new Float32Array(e.length*3),Or=new Float32Array(e.length*3);for(let o=0;o<e.length;o++){const a=e[o],l=Number(a.view_coords[0]??0),c=Number(a.view_coords[1]??0),u=Number(a.view_coords[2]??0);Tt[o*3]=l,Tt[o*3+1]=c,Tt[o*3+2]=u;const[d,h,f]=Gl(wg(a,l,c,72));Or[o*3]=d,Or[o*3+1]=h,Or[o*3+2]=f}const t=new At,i=new Vn(Tt.slice(),3);i.setUsage(Fi),t.setAttribute("position",i);const r=new Vn(Or.slice(),3);r.setUsage(Fi),t.setAttribute("color",r);const s=new yl({size:.11,sizeAttenuation:!0,vertexColors:!0,map:eC,alphaTest:.08,transparent:!1});Vt=new pd(t,s),tn.add(Vt),Kl(),Fo(),mn()}function uv(){if(br)return;const n=()=>{if(!Pe||!tn||!Dt||yr.value!=="graph"){br=null;return}Wt==null||Wt.update(),dv(performance.now()/1e3,Di.value),Pe.render(tn,Dt),hv(),br=requestAnimationFrame(n)};br=requestAnimationFrame(n)}function vh(){br&&(cancelAnimationFrame(br),br=null,lC())}function mn(){br||!Pe||!tn||!Dt||(dv(0,!1),Wt==null||Wt.update(),Pe.render(tn,Dt),hv())}function lC(){if(!Vt||!xn.length)return;const n=Vt.geometry.getAttribute("position");for(let e=0;e<xn.length;e++)n.setXYZ(e,Tt[e*3],Tt[e*3+1],Tt[e*3+2]);n.needsUpdate=!0}function dv(n,e){var a,l,c;if(!Vt||!xn.length)return;const t=Vt.geometry.getAttribute("position"),i=Vt.geometry.getAttribute("color"),r=new Float32Array(xn.length),s=new Float32Array(xn.length),o=new Float32Array(xn.length);for(let u=0;u<xn.length;u++){const d=xn[u];let h=Tt[u*3],f=Tt[u*3+1],p=Tt[u*3+2];if(e){const v=zo(d),{dx:y,dy:x}=Vd(v,n),M=(Math.imul(v,2654435769)>>>0&65535)*(Math.PI*2/65535);h+=y,f+=x,p+=Math.sin(n*.5+M)*.015+Math.sin(n*.3+M+.8)*.01}r[u]=h,s[u]=f,o[u]=p,t.setXYZ(u,h,f,p);const[_,g,m]=z1(u,d,n,Or,hi,Zl);i.setXYZ(u,_,g,m)}if(t.needsUpdate=!0,i.needsUpdate=!0,K1(r,s,o,n,e),Z1(r,s,o),Dt&&Qt){for(const[u,d]of _r)hi.selectedIds.has(u)||(d.remove(),_r.delete(u));for(const u of hi.selectedIds){const d=xn.indexOf(u);if(d<0)continue;if(hi.hoverNodeId===u){const p=_r.get(u);p&&(p.style.display="none");continue}const h=qr(r[d],s[d],o[d]);let f=_r.get(u);f||(f=tm(),Qt.appendChild(f),_r.set(u,f)),h?(f.dataset.id!==u&&(f.textContent=((a=ot.value.byId.get(u))==null?void 0:a.label)??u,f.dataset.id=u),f.style.left=`${h.x+8}px`,f.style.top=`${h.y-28}px`,f.style.display="block"):f.style.display="none"}}if(Dt&&Qt)if(pn&&hi.selectedIds.has("probe")&&hi.hoverNodeId!=="probe"){Rn||(Rn=tm(),Qt.appendChild(Rn));const u=pn.position,d=qr(u.x,u.y,u.z);if(d){const h=((l=Ue.value)==null?void 0:l.operation)==="latent_probe"?(c=Ue.value)==null?void 0:c.text_reconstruction:void 0;Rn.textContent=(h==null?void 0:h.text)??"Latent Space Probe",Rn.style.left=`${d.x+8}px`,Rn.style.top=`${d.y-28}px`,Rn.style.display="block"}else Rn.style.display="none"}else Rn&&(Rn.style.display="none");J1()}function tm(){return xh({textColor:"#facc15",borderColor:"rgba(250,204,21,0.6)",shadowColor:"rgba(250,204,21,0.2)",shadowBlur:6,zIndex:9,truncate:!0})}function xh(n){const e=document.createElement("div"),t=n.initiallyHidden===!1?"":"display:none;",i=n.truncate?"max-width:300px;overflow:hidden;text-overflow:ellipsis;":"";return e.style.cssText=`position:absolute;pointer-events:none;${t}background:#0f1a28;color:${n.textColor??"#e8f0f8"};border:1.5px solid ${n.borderColor};border-radius:4px;padding:3px 8px;font:11px ui-monospace,monospace;white-space:nowrap;${i}box-shadow:0 0 ${n.shadowBlur??8}px ${n.shadowColor};z-index:${n.zIndex??10};`,e}function hv(){var s,o;if(!Ir)return;const n=Ir.getContext("2d");if(!n)return;const e=Ir.offsetWidth,t=Ir.offsetHeight;if(Ir.width=e,Ir.height=t,n.clearRect(0,0,e,t),!Dt||!xn.length)return;const i=new N,r=Vt==null?void 0:Vt.geometry.getAttribute("position");if(Hr.value){const a=ot.value.points,l=new Map;for(const c of a){const u=(s=c.metadata)==null?void 0:s.cluster_global;if(u==null||(o=c.metadata)!=null&&o.is_noise)continue;const d=xn.indexOf(String(c.id));if(d<0)continue;r?i.set(r.getX(d),r.getY(d),r.getZ(d)):i.set(Tt[d*3],Tt[d*3+1],Tt[d*3+2]),i.project(Dt);const h=(i.x+1)/2*e,f=(1-i.y)/2*t,p=String(u),_=l.get(p)??[];_.push({x:h,y:f}),l.set(p,_)}Fg(n,l)}}const cC=Object.freeze(Object.defineProperty({__proto__:null,addOverlayEdges:sC,applySigmaViewport:rC,createLabelDiv:xh,destroyRenderer:_h,fitCamera:ov,getBasePositions:qs,getCamera3D:Xo,getCameraState:iC,getContainer3D:gh,getControls:Jl,getNodeIds:Qi,getPointCloud:Ql,getProbeSphere3D:ec,getScene:es,getSelectedLabelDivs:nv,getThreeRenderer:jo,highlightGhostStep:oC,initRenderer:iv,projectToScreen:qr,pulseIds:av,pulseOperationResult:aC,resizeRenderer:bd,setHullCanvas:lv,sigmaRefresh:nC},Symbol.toStringTag,{value:"Module"})),ii=ht([]),En=ht(""),bh=_i(()=>ii.value.find(n=>n.session_id===En.value)??null);let go=0;Hy(()=>void pC());Vy(Bo);async function fv(n={}){const e=mC(),t=await Yv(e);ii.value=t.sessions??[];const i=En.value;ii.value.length?ii.value.some(r=>r.session_id===i)||(En.value=ii.value[0].session_id):En.value="",n.log!==!1&&Il({event_type:"ui_action",node_name:"NELS Graph Panel",message:`Synced ${e.length} NELS Session node(s)`,status:"completed"})}async function uC(){kt("syncing sessions");try{await fv(),En.value?await pv():(Fl(null),kt("no active sessions"))}catch(n){kt(`session sync error: ${n.message}`)}}async function pv(){var n;if(En.value){kt("loading session");try{const e=await qv(En.value);yh(e);const t=e.graph_snapshot??null;Fl(t),Ul(e.operation_result??null),Sh(e.ui_state??{},{skipViewport:!1}),go=Math.max(0,...(e.events??[]).map(r=>r.sequence??0)),e0();const i=Number(((n=e.ui_state)==null?void 0:n.state_revision)??0);for(const r of e.events??[])Il(r,i);kt(t?"ready":"no snapshot loaded",{priority:!1})}catch(e){kt(`session load error: ${e.message}`)}}}async function dC(){var n,e,t;kt("refreshing");try{await fv({log:!1})}catch(i){kt(`session sync error: ${i.message}`);return}if(!En.value){kt("select a session first");return}kt("refreshing preview");try{const i=await Zv(En.value);i.session&&yh(i.session),Fl(i.graph_snapshot,{forceCoordinates:!0}),Sh(((n=i.session)==null?void 0:n.ui_state)??{},{skipViewport:!1});const r=((t=(e=i.graph_snapshot)==null?void 0:e.points)==null?void 0:t.length)??0;Il({event_type:"ui_action",node_name:"NELS Graph Panel",message:`Refreshed graph preview with ${r} points`,status:"completed"}),kt("preview refreshed")}catch(i){kt(`preview error: ${i.message}`)}}function hC(n){var t,i,r;if(!(n!=null&&n.session_id))return;if(n.session_id!==En.value){uC();return}go=Math.max(go,Number(n.sequence??0));const e=Number(((i=(t=bh.value)==null?void 0:t.ui_state)==null?void 0:i.state_revision)??0);if(Il(n,e),n.event_type==="ui_state_updated"){const s=Number(n.state_revision??0);if(!(e>0&&s>0&&s<e)){const a=n.payload??{};Sh(a,{skipViewport:!0})}}if(n.event_type==="source_snapshot"){const s=n.payload;s&&c0(s,Zi.value,ot.value)&&(Fl(s,{forceCoordinates:!0}),Bo().pulseIds((s.points??[]).map(a=>String(a.id))))}if(n.event_type==="operation_started"){const s=((r=n.payload)==null?void 0:r.operation)??"operation";ka(null),bo.value=!0,Kh(),kt(`running ${s}...`,{priority:!0});return}if(n.event_type==="recon_iteration"){const s=n.payload??{};ka({step:Number(s.step??0),maxStep:Number(s.max_step??0),bestText:String(s.best_text??""),cosine_sim:Number(s.cosine_sim??0)}),Kh(),kt(`reconstructing step ${s.step??"?"}/${s.max_step??"?"}...`,{priority:!0});return}if(n.event_type==="operation_result"){ka(null),bo.value=!1,hu(),kt(`event operation_result #${go}`,{priority:!0});const s=n.payload??null;if(Ul(s),(s==null?void 0:s.operation)==="latent_probe"){const a=s.inverse_project??[],l=Xe.value,c=ot.value;if(a.length>0&&l.probe_coords){const u=l.probe_mode==="2d"?"coords_3d":"coords_2d",d=l.probe_mode==="2d"?3:2,h=new Array(d).fill(0);let f=0;for(const p of a){const _=c.byId.get(String(p.id)),g=_==null?void 0:_[u];if(!g||g.length<d)continue;const m=p.score??1;for(let v=0;v<d;v++)h[v]+=g[v]*m;f+=m}if(f>0){const p=h.map(_=>_/f);Lt({probe_cross_coords:p})}}}const o=Bo();o.addOverlayEdges(),o.pulseOperationResult(s),o.sigmaRefresh();return}if(n.event_type==="operation_failed"){bo.value=!1,hu(),kt(n.message??"operation failed",{priority:!0});return}if(n.event_type==="computing_projection"){kt(n.message??"computing projections...");return}kt(`event ${n.event_type??"event"} #${go}`)}function fC(n){ou.addEventListener("nels.session_event",e=>hC(e.detail??{}),{signal:n}),ou.addEventListener("execution_error",()=>{bo.value=!1,hu(),ka(null),kt("execution error",{priority:!0})},{signal:n})}function Bo(){return si.value==="3d"?cC:rS}async function pC(){var t;if(!En.value)return;const n=Xe.value,e={selected_point_ids:[...Mt.value],operation:n.operation,neighbor_count:Math.max(1,n.neighbor_count),alpha_schedule:n.alpha_schedule,nearest_sample:n.nearest_sample,variant_count:n.variant_count,variation_strength:n.variation_strength,axis_group_a:n.axis_group_a,axis_group_b:n.axis_group_b,compute_axis_labels:n.compute_axis_labels,probe_coords:n.probe_coords??null,probe_mode:n.probe_mode,probe_text_recon:n.probe_text_recon,probe_recon_max_minutes:n.probe_recon_max_minutes,probe_recon_max_iter:n.probe_recon_max_iter,probe_seed_count:n.probe_seed_count,probe_noise_count:n.probe_noise_count,probe_negative_count:n.probe_negative_count,...si.value==="2d"?{viewport:Bo().getCameraState()}:{}};try{const i=await Kv(En.value,e);i.session&&yh(i.session),kt(`state revision ${((t=i.ui_state)==null?void 0:t.state_revision)??"-"}`,{priority:!1})}catch(i){kt(`state sync error: ${i.message}`)}}function yh(n){const e=ii.value.some(t=>t.session_id===n.session_id);ii.value=e?ii.value.map(t=>t.session_id===n.session_id?n:t):[...ii.value,n]}function Sh(n,e){const t=(n.selected_point_ids??[]).map(String),i=ot.value.byId.size>0?new Set(ot.value.byId.keys()):void 0;if(i0(t,i),Lt({operation:String(n.operation??Xe.value.operation),neighbor_count:Number(n.neighbor_count??Xe.value.neighbor_count),alpha_schedule:Array.isArray(n.alpha_schedule)?n.alpha_schedule.map(Number):Xe.value.alpha_schedule,nearest_sample:!!(n.nearest_sample??Xe.value.nearest_sample),variant_count:n.variant_count!=null?Math.max(1,Number(n.variant_count)):Xe.value.variant_count,variation_strength:n.variation_strength!=null?Math.max(.05,Math.min(1,Number(n.variation_strength))):Xe.value.variation_strength,axis_group_a:Array.isArray(n.axis_group_a)?n.axis_group_a.map(String):Xe.value.axis_group_a,axis_group_b:Array.isArray(n.axis_group_b)?n.axis_group_b.map(String):Xe.value.axis_group_b,compute_axis_labels:!!(n.compute_axis_labels??Xe.value.compute_axis_labels),probe_coords:Array.isArray(n.probe_coords)?n.probe_coords.map(Number):n.probe_coords===null?null:Xe.value.probe_coords,probe_mode:n.probe_mode==="3d"||n.probe_mode==="2d"?n.probe_mode:Xe.value.probe_mode,probe_text_recon:!!(n.probe_text_recon??Xe.value.probe_text_recon),probe_recon_max_minutes:n.probe_recon_max_minutes!=null?Math.max(1,Number(n.probe_recon_max_minutes)):Xe.value.probe_recon_max_minutes,probe_recon_max_iter:n.probe_recon_max_iter!=null?Math.max(1,Number(n.probe_recon_max_iter)):Xe.value.probe_recon_max_iter,probe_seed_count:n.probe_seed_count!=null?Math.max(1,Number(n.probe_seed_count)):Xe.value.probe_seed_count,probe_noise_count:n.probe_noise_count!=null?Math.max(1,Number(n.probe_noise_count)):Xe.value.probe_noise_count,probe_negative_count:n.probe_negative_count!=null?Math.max(1,Number(n.probe_negative_count)):Xe.value.probe_negative_count}),!e.skipViewport&&si.value==="2d"){const r=n.viewport;r&&typeof r=="object"&&Bo().applySigmaViewport(r)}}function mC(){var e;return(((e=vr.graph)==null?void 0:e._nodes)??[]).filter(vC).map(t=>({session_node_id:String(t.id),session_label:String(xs(t,"session_label","default")??"default"),source_config:gC(t)}))}function gC(n){const e=_C(n);return mv(e)==="nels_DatasetLoader"?{dataset_path:String(xs(e,"dataset_path","")??""),load_mode:String(xs(e,"load_mode","first_n")??"first_n"),count:Number(xs(e,"count",1e3)??1e3),window_start:Number(xs(e,"window_start",0)??0),random_seed:Number(xs(e,"random_seed",42)??42)}:{}}function _C(n){var s,o,a,l;const e=(o=(s=n==null?void 0:n.inputs)==null?void 0:s.find(c=>c.name==="embedding_set"))==null?void 0:o.link;if(e==null||!((a=vr.graph)!=null&&a.links))return null;const t=vr.graph.links[e]??vr.graph.links[String(e)],i=t==null?void 0:t.origin_id;return(((l=vr.graph)==null?void 0:l._nodes)??[]).find(c=>String(c.id)===String(i))??null}function vC(n){return mv(n)==="nels_Session"||n.title==="NELS Session"}function mv(n){var e;if(n)return n.comfyClass??n.type??((e=n.properties)==null?void 0:e["Node name for S&R"])}function xs(n,e,t){var i,r;return((r=(i=n==null?void 0:n.widgets)==null?void 0:i.find(s=>s.name===e))==null?void 0:r.value)??t}async function xC(){const n=si.value,e=n==="3d"?yC():await bC(),t=SC(),i=RC(e,t,bh.value,Ue.value,n),r=new Date().toISOString().slice(0,19).replace(/:/g,"-");PC(`nels-snapshot-${r}.html`,i)}function bC(){const n=fr();return n&&n.refresh(),new Promise(e=>{requestAnimationFrame(()=>{const t=document.querySelector(".nels-sigma-container");if(!t){e(null);return}const i=Array.from(t.querySelectorAll("canvas"));if(!i.length){e(null);return}const r=i[0],s=r.width||t.clientWidth,o=r.height||t.clientHeight;if(!s||!o){e(null);return}const a=document.createElement("canvas");a.width=s,a.height=o;const l=a.getContext("2d");l.fillStyle="#05090f",l.fillRect(0,0,s,o);const c=i.slice(0,-1);for(const u of c)try{l.drawImage(u,0,0)}catch{}e(a.toDataURL("image/png"))})})}function yC(){const n=document.querySelector(".nels-sigma-container");if(!n)return null;const e=n.querySelector("canvas");if(!e)return null;try{return e.toDataURL("image/png")}catch{return null}}function SC(){var t,i;const n=Mg(ot.value.points),e=((i=(t=Zi.value)==null?void 0:t.source)==null?void 0:i.cluster_labels)??{};return[...n.entries()].map(([r,{count:s,sample:o,ids:a}])=>({cluster_id:r,cluster_name:e[r]??null,color_hex:Qr(r),point_count:s,sample_label:o,point_ids:a})).sort((r,s)=>Number(r.cluster_id)-Number(s.cluster_id))}function et(n){return n.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;")}function bn(n,e){return`<tr><td class="k">${et(n)}</td><td>${et(e)}</td></tr>`}function Kr(n){var e;return((e=ot.value.byId.get(n))==null?void 0:e.label)??n}function EC(n){return n.length?`<h2>Source Points</h2>
<table class="ptable">
<thead><tr><th>ID</th><th>Prompt</th></tr></thead>
<tbody>${n.map(t=>`<tr><td>${et(t)}</td><td>${et(Kr(t))}</td></tr>`).join(`
`)}</tbody></table>`:""}function MC(n){return n.length?`<h2>Source Points</h2>
<table class="ptable">
<thead><tr><th>Role</th><th>ID</th><th>Prompt</th><th></th></tr></thead>
<tbody>${[["A","direction from"],["B","direction to"],["C","walk start"]].map(([i,r],s)=>{const o=n[s];return o?`<tr><td class="num">${i}</td><td>${et(o)}</td><td>${et(Kr(o))}</td><td class="sample">${et(r)}</td></tr>`:""}).filter(Boolean).join(`
`)}</tbody></table>`:""}function nm(n){return n.length?`<h2>Trajectory</h2>
<table class="ptable">
<thead><tr><th>#</th><th>alpha</th><th>nearest prompt</th></tr></thead>
<tbody>${n.map(t=>{const i=(t.nearest_top_k??[]).slice(0,3).map(r=>`${et(r.label)} (${r.distance.toFixed(3)})`).join("<br>");return`<tr><td class="num">${t.index}</td><td class="num">${t.alpha.toFixed(3)}</td><td>${i||"-"}</td></tr>`}).join(`
`)}</tbody></table>`:""}function wC(n){const e=n.neighbors??[];if(!e.length)return"";const t=new Map;for(const r of e){const s=r.query_id??"-";t.has(s)||t.set(s,[]),t.get(s).push(r)}return`<h2>Nearest Neighbors</h2>
${[...t.entries()].map(([r,s])=>{const o=s.filter(l=>!!l.id).map(l=>`<tr><td>${et(l.id)}</td><td>${et(Kr(l.id))}</td><td class="num">${l.score.toFixed(3)}</td></tr>`).join(`
`);return`<p class="meta">Query: ${r!=="-"?`${et(r)} - ${et(Kr(r))}`:"-"}</p>
<table class="ptable">
<thead><tr><th>ID</th><th>Prompt</th><th>score</th></tr></thead>
<tbody>${o}</tbody></table>`}).join(`
`)}`}function TC(n){var c,u,d,h;const e=(c=n.axis_label)==null?void 0:c.split(" to "),t=(u=e==null?void 0:e[0])==null?void 0:u.trim(),i=e&&e.length>=2?e.slice(1).join(" to ").trim():void 0,r=f=>`<tr><td>${et(f.id)}</td><td>${et(f.label)}</td><td class="num">${f.projection_score.toFixed(3)}</td></tr>`,s=(f,p,_)=>{const g=f.slice(0,5),m=f.slice(-5).reverse();return`<table class="ptable">
<thead><tr><th>ID</th><th>Prompt</th><th>score</th></tr></thead>
<tbody>
<tr><td colspan="3" class="sample">${et(p)}</td></tr>
${g.map(r).join(`
`)}
<tr><td colspan="3" class="sample">${et(_)}</td></tr>
${m.map(r).join(`
`)}
</tbody></table>`};let o="";const a=n.source_group_a??[],l=n.source_group_b??[];return(a.length||l.length)&&(o+=`<h2>Axis Groups</h2>
<table>
${a.length?bn("group A",a.map(Kr).join(", ")):""}
${l.length?bn("group B",l.map(Kr).join(", ")):""}
</table>`),(d=n.axis_projection)!=null&&d.length&&(o+=`
<h2>Axis 1${n.axis_label?`: ${et(n.axis_label)}`:""}</h2>
${s(n.axis_projection,i??"top",t??"bottom")}`),(h=n.axis_b_projection)!=null&&h.length&&(o+=`
<h2>Axis 2 (PCA)${n.axis_b_label?`: ${et(n.axis_b_label)}`:""}</h2>
${s(n.axis_b_projection,"top","bottom")}`),o}function AC(n){const e=n.consistency_variants??[];if(!e.length)return"";const t=[];n.consistency_score!=null&&t.push(bn("SC score",n.consistency_score.toFixed(4))),n.mean_intra!=null&&t.push(bn("intra",n.mean_intra.toFixed(4))),n.mean_inter!=null&&t.push(bn("inter",n.mean_inter.toFixed(4)));const i=t.length?`<table>
${t.join(`
`)}
</table>`:"",r=n.seed_point_id?`<p class="meta">Seed: ${et(n.seed_point_id)} - ${et(n.seed_prompt??Kr(n.seed_point_id))}</p>`:"",s=e.map(o=>`<tr><td>${et(o.id)}</td><td>${et(o.text)}</td><td class="num">${o.cosine_sim.toFixed(4)}</td></tr>`).join(`
`);return`<h2>Consistency Check</h2>
${i}
${r}
<table class="ptable">
<thead><tr><th>ID</th><th>Prompt</th><th>cosine sim</th></tr></thead>
<tbody>${s}</tbody></table>`}function CC(n,e){let t="";const i=n.probe_cluster;if(i){const o=i.is_noise?"noise":`${e[String(i.cluster_id)]??i.cluster_id} (strength ${i.membership_strength.toFixed(2)})`;t+=`<h2>Probe</h2>
<table>
${bn("cluster",o)}
</table>`}const r=n.inverse_project??[];if(r.length){const o=r.slice(0,5).map(a=>`<tr><td>${et(a.id)}</td><td>${et(a.label)}</td><td class="num">${a.score.toFixed(3)}</td></tr>`).join(`
`);t+=`
<h2>Nearest Prompts at Probe Position</h2>
<table class="ptable">
<thead><tr><th>ID</th><th>Prompt</th><th>score</th></tr></thead>
<tbody>${o}</tbody></table>`}const s=n.text_reconstruction;if(s){t+=`
<h2>Text Reconstruction</h2>
<table>
${bn("text",s.text)}
${bn("cosine sim",s.cosine_sim.toFixed(4))}
</table>`;const o=s.initial_context;if(o){const a=(l,c)=>c.length?`<p class="meta">${et(l)} (${c.length}): ${c.map(u=>et(u.label)).join(", ")}</p>`:"";t+=a("Seeds",o.seeds)+a("Noise",o.noise)+a("Negatives",o.negatives)}}return t}function RC(n,e,t,i,r){var m,v;const s=new Date().toLocaleString(),o=(t==null?void 0:t.label)??(t==null?void 0:t.session_id)??"-",a=(t==null?void 0:t.source_config)??{},l=ot.value.points.length,c=r==="3d"?"3d_umap":"2d_umap",u=i==null?void 0:i.trajectory,d=!!(i!=null&&i.operation)&&i.operation!=="inspect",h=n?`<img src="${n}" alt="NELS Graph"/>`:"",f=`<h2>Session</h2>
<table>
${bn("session",o)}
${bn("dataset",String(a.dataset_path??"-"))}
${bn("points",String(l))}
${bn("projection",c)}
${bn("view",r.toUpperCase())}
</table>`,p=e.length>0?`<h2>Cluster Legend</h2>
<table class="ctable">
<thead><tr><th>Cluster</th><th>Points</th><th>Example</th><th>Point IDs</th></tr></thead>
<tbody>
${e.map(y=>`<tr><td><span class="dot" style="background:${et(y.color_hex)}"></span> ${et(y.cluster_name?`${y.cluster_name} (${y.cluster_id})`:y.cluster_id)}</td><td class="num">${y.point_count}</td><td class="sample">${y.sample_label?et(y.sample_label):"-"}</td><td class="ids">${et(y.point_ids.join(", "))}</td></tr>`).join(`
`)}
</tbody></table>`:"";let _="";if(d){const y=i.operation,x=((v=(m=Zi.value)==null?void 0:m.source)==null?void 0:v.cluster_labels)??{};let M="";y==="nearest_neighbor"?M=wC(i):y==="lerp"||y==="slerp"?M=EC(i.source_point_ids??[])+nm(u??[]):y==="delta_walk"?M=MC(i.source_point_ids??[])+nm(u??[]):y==="axis_projection"?M=TC(i):y==="consistency_check"?M=AC(i):y==="latent_probe"&&(M=CC(i,x)),_=`
<h2>Operation</h2>
<table>
${bn("operation",y)}
</table>
${M}`}const g=`<div class="viewport-row"><div class="img-col">${h}</div><div class="legend-col">${p}</div></div>`;return`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>NELS Snapshot - ${et(s)}</title>
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      background: #05090f; color: #c8dae8;
      font: 13px/1.6 ui-monospace, SFMono-Regular, Consolas, monospace;
      padding: 28px; max-width: 1100px;
    }
    .viewport-row {
      display: grid;
      grid-template-columns: minmax(320px, 45%) 1fr;
      gap: 28px;
      align-items: start;
      margin-bottom: 4px;
    }
    .img-col { position: sticky; top: 20px; align-self: start; }
    .img-col img { width: 100%; height: auto; object-fit: contain; }
    h1  { font-size: 1.1em; color: #e8f0f8; margin-bottom: 4px; }
    h2  { font-size: .78em; color: #7daacc; text-transform: uppercase; letter-spacing: .1em; margin: 22px 0 7px; }
    p.meta { color: #64849a; font-size: .85em; margin-bottom: 20px; }

    img { display: block; max-width: 100%; border-radius: 4px; border: 1px solid #1a2a3a; }

    table { border-collapse: collapse; width: 100%; max-width: 560px; margin-bottom: 4px; }
    td   { padding: 3px 8px 3px 0; vertical-align: top; color: #9aaabb; }
    td.k { color: #64849a; white-space: nowrap; width: 160px; }

    .dot { display: inline-block; width: 10px; height: 10px; border-radius: 50%; flex-shrink: 0; vertical-align: middle; margin-right: 5px; }

    table.ctable, table.ptable { width: 100%; }
    table.ctable th, table.ptable th {
      text-align: left; color: #64849a; font-weight: normal;
      padding: 4px 12px 4px 0; border-bottom: 1px solid #1a2a3a;
      font-size: .82em; text-transform: uppercase; letter-spacing: .06em; white-space: nowrap;
    }
    table.ctable th:nth-child(2) { text-align: right; width: 1px; }
    table.ctable td, table.ptable td { padding: 4px 12px 4px 0; border-bottom: 1px solid #111d2a; vertical-align: top; word-break: break-word; }
    table.ctable td:first-child, table.ptable td:first-child { white-space: nowrap; }
    table.ctable td.num, table.ptable td.num       { text-align: right; white-space: nowrap; width: 1px; }
    table.ctable td.sample, table.ptable td.sample { width: 30%; color: #8aaabb; font-style: italic; }
    table.ctable td.ids    { font-size: .78em; color: #64849a; line-height: 1.7; }

    @media print {
      body { max-width: none; padding: 12px; }
      .viewport-row { display: block; }
      .img-col { position: static; margin-bottom: 16px; }
      .img-col img { width: 100%; max-width: 100%; }
      h2, table { page-break-inside: avoid; }
      h2 { page-break-after: avoid; }
    }
  </style>
</head>
<body>
  <h1>NELS Graph Snapshot</h1>
  <p class="meta">${et(s)} | ${et(o)} | ${l} points | ${et(r.toUpperCase())}</p>
  ${g}
  ${f}${_}
</body>
</html>`}function PC(n,e){const t=new Blob([e],{type:"text/html;charset=utf-8"}),i=URL.createObjectURL(t),r=document.createElement("a");r.href=i,r.download=n,r.click(),URL.revokeObjectURL(i)}const Eh=ht(!1),Cl=ht(null);let Ro=null;function LC(){var i;Wr(()=>(UC(),()=>{gv()}),[]);const n=si.value==="3d",e=Eh.value,t=((i=Cl.value)==null?void 0:i.split("/").pop())??"LLM";return T("div",{class:"nels-panel-header",children:[T("div",{children:[T("strong",{children:"NELS Graph Panel"}),T("span",{children:Rd.value})]}),T("div",{class:"nels-panel-actions",children:[T("div",{class:"nels-session-ctrl",children:[T("select",{value:En.value,onChange:DC,children:ii.value.length===0?T("option",{value:"",children:"no active sessions"}):ii.value.map(r=>T("option",{value:r.session_id,children:r.label||r.session_id},r.session_id))}),T("button",{class:"nels-icon-btn",onClick:()=>void NC(),title:"Refresh sessions & graph",children:"↺"})]}),T("div",{class:"nels-tab-group",children:[T("button",{class:`nels-tab-btn${n?"":" active"}`,onClick:()=>Qh("2d"),children:"2D"}),T("button",{class:`nels-tab-btn${n?" active":""}`,onClick:()=>Qh("3d"),children:"3D"})]}),T("div",{class:"nels-switch",role:"switch","aria-checked":Di.value,title:"Node positions drift slightly when animated - disable for accurate reading",onClick:()=>{Di.value=!Di.value},children:[T("span",{class:`nels-switch-label${Di.value?" active":""}`,children:"Animate"}),T("div",{class:`nels-switch-track${Di.value?" on":""}`,children:T("div",{class:"nels-switch-thumb"})})]}),T("button",{class:`nels-llm-chip${e?" loaded":""}`,title:e?`${Cl.value??"LLM"} loaded - click to unload and free memory`:"LLM not loaded - loads automatically when needed",onClick:e?()=>void IC():void 0,children:e?`${t} x`:"LLM"}),T("button",{disabled:ot.value.points.length===0,onClick:xC,children:"Export"})]})]})}function DC(n){En.value=n.target.value,pv()}async function NC(){await dC()}async function im(){try{const n=await Jv();Eh.value=n.loaded,Cl.value=n.model_id}catch{}}async function IC(){try{await Qv(),Eh.value=!1,Cl.value=null}catch{}}function UC(){Ro||(im(),Ro=setInterval(()=>void im(),1e4))}function gv(){Ro&&(clearInterval(Ro),Ro=null)}function FC(){var r,s,o,a;const n=bh.value,e=((r=n==null?void 0:n.graph_snapshot)==null?void 0:r.source)??null,t=((s=n==null?void 0:n.ui_state)==null?void 0:s.state_revision)??"-",i=[];return n?(i.push(["session",n.session_id]),i.push(["session node",n.session_node_id??"-"]),e!=null&&e.dataset_name&&i.push(["dataset",e.dataset_name]),e!=null&&e.source_dataset&&i.push(["source",e.source_dataset]),e!=null&&e.encoder&&i.push(["encoder",e.encoder]),e!=null&&e.clip_type&&i.push(["clip type",e.clip_type]),e!=null&&e.embedding_strategy&&i.push(["embedding strategy",e.embedding_strategy]),(o=e==null?void 0:e.embedding_shape)!=null&&o.length&&i.push(["compact shape",e.embedding_shape.join(" x ")]),(a=e==null?void 0:e.full_dim)!=null&&a.length&&i.push(["full shape",e.full_dim.join(" x ")]),(e==null?void 0:e.total_sample_count)!=null&&i.push(["dataset total",String(e.total_sample_count)]),(e==null?void 0:e.loaded_sample_count)!=null&&i.push(["loaded",String(e.loaded_sample_count)]),(e==null?void 0:e.embedding_dim)!=null&&i.push(["dim",String(e.embedding_dim)]),i.push(["points",String(ot.value.points.length)]),i.push(["revision",String(t)]),i.push(["selected",String(Mt.value.size)])):i.push(["Status","No active session"]),T("details",{class:"nels-panel-card",children:[T("summary",{children:"Session"}),T("dl",{children:i.map(([l,c])=>T(yn,{children:[T("dt",{children:l}),T("dd",{children:c})]},l))})]})}const OC={inspect:"Inspect",nearest_neighbor:"Nearest Neighbor",lerp:"Linear Interpolation (LERP)",slerp:"Spherical Interpolation (SLERP)",delta_walk:"Direction Walk",axis_projection:"Semantic Axis Projection",consistency_check:"Semantic Consistency Check",latent_probe:"Latent Space Probe"},ru={inspect:"View details of selected points. No computation.",lerp:"Linearly interpolate between two selected points along the alpha schedule.",slerp:"Spherically interpolate between two points along the embedding hypersphere - preserves norm.",delta_walk:"Select A (direction from), B (direction to), C (walk start) - extracts A->B direction and walks from C. Supports extrapolation (alpha < 0 or > 1).",axis_projection:"Project all dataset points onto the semantic axis A->B. The axis direction is computed from the centroid of Group A vs Group B. Points are colored blue (A-side) to red (B-side).",consistency_check:"Select 1 seed point and run to test if text variants land close together in embedding space. Ghost nodes appear at variant positions. Lower SC score = tighter semantic cluster.",latent_probe:"Click anywhere in the graph to probe that position in latent space. The node finds the nearest real prompts and can optionally reconstruct text via iterative inversion (Vec2Text)."},kC=[["3 Steps",[0,.5,1]],["5 Steps",[0,.25,.5,.75,1]],["10 Steps",[0,.1,.2,.3,.4,.5,.6,.7,.8,.9,1]]],BC=[["Negative",[-2,-1.5,-1,-.5,0]],["Forward",[0,.5,1,1.5,2,2.5,3,3.5,4]],["Full",[-2,-1.5,-1,-.5,0,.5,1,1.5,2,2.5,3,3.5,4]]];function zC(){var f,p,_,g,m,v,y,x;const n=Xe.value,e=Mt.value.size,t=VC(n.operation,e),i=n.operation==="delta_walk",r=i?-2:0,s=i?4:1,o=fo(n.alpha_schedule,r,s),a=i?BC:kC;function l(M){Lt({alpha_schedule:M}),st()}function c(M,E){const C=fo(Xe.peek().alpha_schedule,r,s);C[M]=E,Lt({alpha_schedule:C}),st()}function u(){const M=fo(Xe.peek().alpha_schedule,r,s);M.sort((E,C)=>E-C),Lt({alpha_schedule:M}),st()}function d(M){const E=fo(Xe.peek().alpha_schedule,r,s);E.splice(M,1),Lt({alpha_schedule:E}),st()}function h(){const M=fo(Xe.peek().alpha_schedule,r,s),E=M.length?M[M.length-1]:0,C=parseFloat(Math.min(s,E+.1).toFixed(2));M.push(C),M.sort((b,A)=>b-A),Lt({alpha_schedule:M}),st()}return T("details",{class:"nels-panel-card",open:!0,children:[T("summary",{children:"Operation"}),T("div",{class:"nels-panel-controls",children:[T("div",{class:"nels-panel-row",children:[T("button",{onClick:()=>{Dd(),Ul(null),Lt({axis_group_a:[],axis_group_b:[],probe_coords:null,probe_cross_coords:null,probe_place_mode:!1}),st()},children:"Clear"}),T("button",{onClick:()=>{si.peek()==="3d"?ov():n_(),st()},children:"Fit"})]}),T("label",{class:"nels-op-select-label",children:[T("span",{children:"operation"}),T("select",{value:n.operation,onChange:Gr("operation",String),children:Object.entries(OC).map(([M,E])=>T("option",{value:M,children:E},M))})]}),n.operation==="nearest_neighbor"?T("div",{class:"nels-op-description",children:WC()}):n.operation==="axis_projection"?T("div",{class:"nels-op-description",children:Ni.value==="b"&&((f=Ue.value)!=null&&f.axis_b_projection)?"Orthogonal axis (PCA of residuals). Points are colored green (C-side) to orange (D-side).":ru.axis_projection}):ru[n.operation]?T("div",{class:"nels-op-description",children:ru[n.operation]}):null,i&&e>=3&&(()=>{const M=[...Mt.value],E=ot.value.byId,C=A=>{var L;return((L=E.get(A))==null?void 0:L.label)??A};return T("div",{class:"nels-delta-roles",children:[["A","direction from"],["B","direction to"],["C","walk start"]].map(([A,L],P)=>T("div",{class:"nels-delta-role-row",children:[T("span",{class:"nels-delta-role-badge",children:A}),T("span",{class:"nels-delta-role-label",title:C(M[P]),children:[C(M[P]).slice(0,40),C(M[P]).length>40?"...":""]}),T("span",{class:"nels-delta-role-desc",children:L})]},A))})})(),n.operation==="nearest_neighbor"&&T("label",{children:[T("span",{children:"neighbors"}),T("input",{type:"number",min:1,max:128,step:1,value:n.neighbor_count,onChange:Gr("neighbor_count",Number)})]}),(n.operation==="lerp"||n.operation==="slerp"||n.operation==="delta_walk"||n.operation==="axis_projection")&&T("div",{class:"nels-alpha-section",children:[T("span",{class:"nels-alpha-label",children:"alpha schedule"}),T("span",{class:"nels-alpha-info",children:n.operation==="axis_projection"?"Interpolation steps along each axis. 0 = A/C-side centroid, 1 = B/D-side centroid. Each step produces one image per axis.":"Defines the interpolation steps (0 = start, 1 = end). Each value produces one output point along the operation path."}),n.operation==="slerp"&&((p=Ue.value)==null?void 0:p.fallback_to_lerp)&&T("span",{class:"nels-alpha-info",children:"Anchors were near-collinear or near-zero, so SLERP fell back to linear interpolation for this pair."}),T("div",{class:"nels-alpha-presets",children:[a.map(([M,E])=>T("button",{class:"nels-alpha-preset-btn",onClick:()=>l(E),children:M},M)),T("button",{class:"nels-alpha-preset-btn nels-alpha-sort-btn",onClick:u,children:"Sort up"})]}),T("div",{class:"nels-alpha-list",children:o.map((M,E)=>T("div",{class:"nels-alpha-row",children:[T("span",{class:"nels-alpha-val",children:M.toFixed(2)}),T("input",{type:"range",class:"nels-alpha-slider",style:`--val: ${((M-r)/(s-r)*100).toFixed(1)}%`,min:r,max:s,step:"0.05",value:M,onInput:C=>c(E,parseFloat(C.target.value))}),T("button",{class:"nels-alpha-remove",onClick:()=>d(E),children:"x"})]},E))}),T("button",{class:"nels-alpha-add",onClick:h,children:"+ Add Alpha Value"})]}),(n.operation==="lerp"||n.operation==="slerp"||n.operation==="delta_walk")&&T("label",{children:[T("span",{children:"nearest prompts"}),T("input",{type:"checkbox",checked:n.nearest_sample,onChange:M=>{Lt({nearest_sample:M.target.checked}),st()}})]}),n.operation==="consistency_check"&&T(yn,{children:[T("label",{children:[T("span",{children:"variants (3-20)"}),T("input",{type:"number",min:3,max:20,step:1,value:n.variant_count,onChange:Gr("variant_count",Number)})]}),T("label",{children:[T("span",{children:"variation strength"}),T("div",{class:"nels-strength-row",children:[T("input",{type:"range",class:"nels-alpha-slider",style:`--val: ${(n.variation_strength*100).toFixed(1)}%`,min:"0.05",max:"1",step:"0.05",value:n.variation_strength,onInput:M=>{Lt({variation_strength:parseFloat(M.target.value)}),st()}}),T("span",{class:"nels-alpha-val",children:n.variation_strength.toFixed(2)})]})]}),T("span",{class:"nels-alpha-info",children:"How much each variant differs from the seed. Low (<0.35) = word dropout only (safe, stays in same cluster). High (0.7-1.0) = LLM paraphrase, aggressive rewording."})]}),n.operation==="axis_projection"&&T(yn,{children:[T("div",{class:"nels-axis-groups",children:[T(rm,{label:"A",groupKey:"axis_group_a",otherKey:"axis_group_b"}),T(rm,{label:"B",groupKey:"axis_group_b",otherKey:"axis_group_a"})]}),(n.axis_group_a.length===0||n.axis_group_b.length===0)&&T("div",{class:"nels-sel-hint",children:"Add at least 1 point to each group to run"}),T("label",{children:[T("span",{children:"compute labels"}),T("input",{type:"checkbox",checked:n.compute_axis_labels,onChange:M=>{Lt({compute_axis_labels:M.target.checked}),st()}})]}),T("span",{class:"nels-alpha-info",children:"Names each axis with an LLM, grounded in concept words mined from your own loaded prompts. Adds extra encode + inference time - leave off to skip naming entirely."}),(_=Ue.value)!=null&&_.axis_b_projection?T(yn,{children:[T("div",{class:"nels-axis-mode-toggle",children:[T("button",{class:Ni.value==="a"?"active":"",onClick:()=>{Ni.value="a"},children:"Axis 1"}),T("button",{class:Ni.value==="b"?"active":"",onClick:()=>{Ni.value="b"},children:"Axis 2"})]}),Ue.value.axis_b_variance!=null&&T("span",{class:"nels-alpha-info",children:`Axis 2 explains ${(Ue.value.axis_b_variance*100).toFixed(1)}% of the residual variance left over after Axis 1.`})]}):((g=Ue.value)==null?void 0:g.operation)==="axis_projection"&&T("div",{class:"nels-axis-no-b",children:["No axis 2 available",Ue.value.axis_b_top_residual_variance!=null?` - after subtracting each point's A->B projection (residuals), PCA on those residuals found no strong independent direction: the top component explains only ${(Ue.value.axis_b_top_residual_variance*100).toFixed(1)}% of residual variance (min. 5%). The dataset's semantic structure is mostly one-dimensional along your A->B axis.`:" - no independent orthogonal direction found in the residuals."]}),T("div",{class:"nels-alpha-info",style:"margin-top:4px",children:[`Trajectory: ${o.length} step${o.length!==1?"s":""} x `,(m=Ue.value)!=null&&m.axis_b_projection?"2 axes":"1 axis",` = ${o.length*((v=Ue.value)!=null&&v.axis_b_projection?2:1)} image${o.length*((y=Ue.value)!=null&&y.axis_b_projection?2:1)!==1?"s":""}`,(x=Ue.value)!=null&&x.axis_b_projection?" - Axis 1 then Axis 2":""]})]}),n.operation==="latent_probe"&&T(GC,{cfg:n}),t&&T("div",{class:"nels-sel-hint",children:t}),T("details",{class:"nels-selection-help",children:[T("summary",{children:"Selection controls"}),T("div",{class:"nels-alpha-info",style:"margin-top:4px",children:[T("strong",{children:"click"})," - select one point (clears previous)",T("br",{}),T("strong",{children:"ctrl+click"})," - add / remove a point",T("br",{}),T("strong",{children:"shift+drag"})," - area select (replaces selection)",T("br",{}),T("strong",{children:"click empty space"})," - clear selection"]})]})]})]})}function rm({label:n,groupKey:e,otherKey:t}){const i=Xe.value,r=Mt.value.size,s=i[e];function o(){const l=new Set(Mt.value),c=[...new Set([...s,...Mt.value])],u=i[t].filter(d=>!l.has(d));Lt({[e]:c,[t]:u}),st()}function a(){Lt({[e]:[]}),st()}return T("div",{class:`nels-axis-group nels-axis-group-${n.toLowerCase()}`,children:[T("div",{class:"nels-axis-group-header",children:[T("span",{class:"nels-axis-group-label",children:["Group ",n]}),T("div",{class:"nels-axis-group-actions",children:[T("button",{disabled:r===0,onClick:o,children:"+ Add selected"}),T("button",{class:"nels-axis-group-clear",disabled:s.length===0,onClick:a,children:"Clear"})]})]}),s.length===0?T("span",{class:"nels-axis-group-empty",children:"No points - select and click Add"}):T("span",{class:"nels-axis-group-count",children:[s.length," point",s.length!==1?"s":""]})]})}function GC({cfg:n}){const e=n.probe_coords!=null,t=n.probe_coords;return T(yn,{children:[T("div",{class:"nels-panel-row",style:"gap:6px;flex-wrap:wrap",children:[T("button",{class:`nels-toggle-overlay${n.probe_place_mode?" active":""}`,onClick:()=>{Lt({probe_place_mode:!n.probe_place_mode}),st()},children:n.probe_place_mode?"Placing probe...":"Place probe"}),e&&T("button",{onClick:()=>{Lt({probe_coords:null,probe_cross_coords:null}),Ul(null),st()},children:"Clear probe"})]}),n.probe_place_mode&&T("div",{class:"nels-alpha-info",children:"Click on empty space in the graph to set a probe point. Works in both 2D and 3D view."}),e&&t&&T(HC,{coords:t,mode:n.probe_mode}),!e&&!n.probe_place_mode&&T("div",{class:"nels-sel-hint",children:'No probe set - click "Place probe" then click the canvas'}),T("label",{children:[T("span",{children:"text reconstruction"}),T("input",{type:"checkbox",checked:n.probe_text_recon,onChange:i=>{Lt({probe_text_recon:i.target.checked}),st()}})]}),n.probe_text_recon&&T(yn,{children:[T("div",{class:"nels-alpha-info",children:"Requires CLIP connected to the node. Iteratively inverts the estimated embedding toward a text prompt (Vec2Text approach)."}),T("label",{children:[T("span",{children:"max time"}),T("div",{class:"nels-strength-row",children:[T("input",{type:"range",class:"nels-alpha-slider",style:`--val: ${((n.probe_recon_max_minutes-1)/59*100).toFixed(1)}%`,min:1,max:60,step:1,value:n.probe_recon_max_minutes,onInput:i=>{Lt({probe_recon_max_minutes:parseInt(i.target.value)}),st()}}),T("span",{class:"nels-alpha-val",style:"width:42px",children:[n.probe_recon_max_minutes," min"]})]})]}),T("label",{children:[T("span",{children:"max iterations"}),T("input",{type:"number",min:1,step:1,value:n.probe_recon_max_iter,onChange:Gr("probe_recon_max_iter",Number)})]}),T("label",{children:[T("span",{children:"seed count"}),T("input",{type:"number",min:1,step:1,value:n.probe_seed_count,onChange:Gr("probe_seed_count",Number)})]}),T("label",{children:[T("span",{children:"noise count"}),T("input",{type:"number",min:1,step:1,value:n.probe_noise_count,onChange:Gr("probe_noise_count",Number)})]}),T("label",{children:[T("span",{children:"negative count"}),T("input",{type:"number",min:1,step:1,value:n.probe_negative_count,onChange:Gr("probe_negative_count",Number)})]}),T("div",{class:"nels-alpha-info",children:"Seeds: nearest real prompts fed to the LLM as positives. Noise: random mid-range prompts for diversity. Negatives: most dissimilar prompts to steer away from."})]}),e&&T("div",{class:"nels-sel-hint",style:"color:#22c55e",children:"Probe set - queue the node to run the lookup"})]})}function HC({coords:n,mode:e}){const t=e==="3d"?["x","y","z"]:["x","y"],[i,r]=Uv(t.map((o,a)=>(n[a]??0).toFixed(3)));Wr(()=>{r(t.map((o,a)=>(n[a]??0).toFixed(3)))},[n]);function s(o){const a=o.map(l=>parseFloat(l));a.some(l=>!Number.isFinite(l))||(Lt({probe_coords:a}),st())}return T("div",{class:"nels-probe-coord-editor",children:[T("span",{class:"nels-alpha-label",children:["probe (",e,")"]}),t.map((o,a)=>T("label",{class:"nels-probe-coord-row",children:[T("span",{children:o}),T("input",{type:"number",step:"0.001",value:i[a],onInput:l=>{const c=[...i];c[a]=l.target.value,r(c)},onBlur:()=>s(i),onKeyDown:l=>{l.key==="Enter"&&s(i)}})]},o))]})}function Gr(n,e){return t=>{Lt({[n]:e(t.target.value)}),st()}}function VC(n,e){if(n==="lerp"||n==="slerp"){if(e!==2)return`Select exactly 2 points (${e} selected)`}else if(n==="delta_walk"){if(e!==3)return`Select exactly 3 points: A (direction from), B (direction to), C (walk start) - ${e} selected`}else if(n==="consistency_check"&&e!==1)return`Select exactly 1 seed point (${e} selected)`;return null}function fo(n,e=0,t=1){return n.map(i=>Number(i)).filter(i=>Number.isFinite(i)&&i>=e&&i<=t)}function WC(){var i,r,s,o;const n=(o=(s=(r=(i=Zi.value)==null?void 0:i.source)==null?void 0:r.projection)==null?void 0:s.canonical)==null?void 0:o.umap_params,e=n==null?void 0:n.n_neighbors,t="Find the k closest prompts to your selection in embedding space. Uses FAISS for exact kNN search.";return e==null?t:`${t} Dataset built with UMAP n_neighbors=${e} - setting k higher may return points that appear distant in the layout.`}function $C(n){var i,r;const t=(((r=(i=Zi.value)==null?void 0:i.source)==null?void 0:r.cluster_labels)??{})[String(n)];return t?`${t} (${n})`:String(n)}function XC(){var p,_,g;const n=Ue.value??{},e=n.trajectory,t=n.operation,i=Ni.value==="b"&&!!((p=n.axis_b_projection)!=null&&p.length),r=i?n.axis_b_projection:n.axis_projection,s=i?n.axis_b_label:n.axis_label,o=s?s.split(`
`)[0].slice(0,40):void 0,a=n.inverse_project,l=n.probe_cluster,c=n.text_reconstruction,u=n.consistency_variants,d=(_=n.neighbors)==null?void 0:_.length,h=t==="axis_projection"&&(((g=n.trajectory_overlay)==null?void 0:g.length)??0)>0,f=[["operation",String(t??"-")]];return t==="nearest_neighbor"&&d!=null&&f.push(["neighbors",String(d)]),T("details",{class:"nels-panel-card",open:!0,children:[T("summary",{children:"Result"}),T("dl",{children:f.map(([m,v])=>T(yn,{children:[T("dt",{children:m}),T("dd",{children:v})]},m))}),t==="delta_walk"&&T(eR,{result:n}),e&&e.length>0&&T(YC,{steps:e}),h&&T(qC,{}),r&&r.length>0&&T(KC,{scores:r,axisLabel:o,isB:i}),T(ZC,{}),a&&a.length>0&&T("div",{class:"nels-axis-lane",children:[T("div",{class:"nels-axis-header",children:"Nearest prompts at probe position"}),l&&T("div",{style:"font-size:10px;color:#64849a;margin-bottom:4px",children:[T("span",{style:`display:inline-block;width:8px;height:8px;border-radius:50%;margin-right:4px;background:${Qr(l.cluster_id)}`}),l.is_noise?"cluster: noise":`cluster: ${$C(l.cluster_id)} (strength ${l.membership_strength.toFixed(2)})`]}),a.slice(0,5).map(m=>T("button",{class:"nels-nearest-sample nels-nearest-top",onClick:()=>wr(m.id),children:[m.label.slice(0,60),m.label.length>60?"...":"",T("span",{class:"nels-nearest-dist",children:[" (",m.score.toFixed(3),")"]})]},m.id)),c&&T(yn,{children:[T("div",{class:"nels-cc-metrics",style:"margin-top:6px",children:[T("div",{class:"nels-axis-side-label",children:"Text reconstruction"}),T("button",{class:"nels-nearest-sample nels-nearest-top",style:"margin-top:4px;font-style:italic",title:"Click to select probe position on canvas",onClick:()=>wr("probe"),children:c.text}),T("span",{style:"font-size:10px;color:#64849a",children:["cosine sim: ",c.cosine_sim.toFixed(4)]})]}),c.initial_context&&T(JC,{ctx:c.initial_context})]})]}),u&&u.length>0&&T(QC,{result:n})]})}function jC({topK:n}){if(!(n!=null&&n.length))return T("span",{children:"-"});const e=n.slice(0,3);return T("div",{class:"nels-nearest-stack",children:e.map((t,i)=>T("button",{class:`nels-nearest-sample${i===0?" nels-nearest-top":" nels-nearest-secondary"}`,onClick:()=>wr(t.id),title:t.label,children:[T("span",{class:"nels-nearest-dist",children:["(",t.distance.toFixed(3),")"]})," ",t.label]},t.id))})}function YC({steps:n}){var s;const e=vi.value,t=Xe.value.snap_endpoints,r=((s=Ue.value)==null?void 0:s.operation)==="delta_walk";return T("div",{class:"nels-trajectory-lane",children:[T("div",{class:"nels-trajectory-header",children:[T("span",{children:[n.length," steps"]}),!r&&T("button",{class:`nels-toggle-overlay${t?" active":""}`,onClick:()=>Lt({snap_endpoints:!t}),children:t?"Snap ON":"Snap OFF"}),T("button",{class:`nels-toggle-overlay${e?" active":""}`,onClick:()=>t0(!e),children:e?"Hide on canvas":"Show on canvas"})]}),T("div",{class:"nels-trajectory-scroll",children:T("table",{class:"nels-trajectory-table",children:[T("thead",{children:T("tr",{children:[T("th",{children:"#"}),T("th",{children:"t"}),T("th",{children:"nearest prompt"})]})}),T("tbody",{children:n.map(o=>T("tr",{children:[T("td",{children:o.index}),T("td",{children:T("button",{class:"nels-nearest-sample nels-nearest-top",style:"font-variant-numeric:tabular-nums",title:"Highlight on canvas",onClick:()=>Wy(o.id),children:o.alpha.toFixed(3)})}),T("td",{children:T(jC,{topK:o.nearest_top_k})})]},o.id))})]})})]})}function qC(){const n=Jr.value;return T("div",{class:"nels-trajectory-lane",children:T("div",{class:"nels-trajectory-header",children:[T("span",{children:"axis trajectory"}),T("button",{class:`nels-toggle-overlay${n?" active":""}`,onClick:()=>n0(!n),children:n?"Highlight ON":"Highlight trajectory"})]})})}function KC({scores:n,axisLabel:e,isB:t}){var p;const i=n.slice(0,5),r=n.slice(-5).reverse(),s=Math.max(...n.map(_=>Math.abs(_.projection_score)),1e-8),o=t?"#fb923c":"#ef4444",a=t?"#4ade80":"#3b82f6",l=t?"D-side (top)":"B-side (top)",c=t?"C-side (bottom)":"A-side (bottom)",u=e==null?void 0:e.split(" to "),d=(p=u==null?void 0:u[0])==null?void 0:p.trim(),h=u&&u.length>=2?u.slice(1).join(" to ").trim():void 0,f=t?"Green -> orange shows alignment with the orthogonal PCA axis (residuals of axis 1).":"Blue -> red shows alignment with the A->B direction in embedding space - not screen distance.";return T("div",{class:"nels-axis-lane",children:[T("div",{class:"nels-axis-header",children:[t?"Axis 2 (PCA)":"Axis 1",e?`: ${e}`:""," - ",n.length," points ranked"]}),T("div",{style:"font-size:10px;color:#64849a;padding:4px 0 6px;line-height:1.4",children:f}),T("div",{class:"nels-axis-col",children:[T(sm,{label:l,sideNote:h,color:o,scores:i,maxAbs:s,buttonClass:"nels-nearest-sample nels-nearest-top"}),T(sm,{label:c,sideNote:d,color:a,scores:r,maxAbs:s,buttonClass:"nels-nearest-sample nels-nearest-secondary"})]})]})}function sm({label:n,sideNote:e,color:t,scores:i,maxAbs:r,buttonClass:s}){return T(yn,{children:[T("div",{class:"nels-axis-side-label",style:`color:${t}`,children:[n,e&&T("span",{style:"color:#94a3b8;font-weight:400",children:[" (",e,")"]})]}),i.map(o=>T("button",{class:s,onClick:()=>wr(o.id),children:[T("span",{class:"nels-axis-bar",style:`width:${(Math.abs(o.projection_score)/r*60).toFixed(1)}px;background:${t}`}),o.label.slice(0,50),o.label.length>50?"...":"",T("span",{class:"nels-nearest-dist",children:[" ","(",o.projection_score.toFixed(3),")"]})]},o.id))]})}function ZC(){const n=Dm.value;return n?T("div",{class:"nels-axis-lane nels-recon-live",children:[T("div",{class:"nels-axis-header",children:["Reconstructing... step ",n.step," / ",n.maxStep]}),T("div",{class:"nels-recon-live-score",children:[T("span",{children:"Score"}),T("div",{class:"nels-recon-live-bar",children:T("div",{class:"nels-recon-live-fill",style:`width:${Math.min(n.cosine_sim*100,100).toFixed(1)}%`})}),T("span",{style:"font-variant-numeric:tabular-nums",children:n.cosine_sim.toFixed(4)})]}),T("div",{class:"nels-recon-live-text",children:[n.bestText.slice(0,120),n.bestText.length>120?"...":""]})]}):null}function su({title:n,items:e,color:t}){return e.length?T("details",{class:"nels-ctx-group",children:[T("summary",{children:[n," (",e.length,")"]}),T("div",{class:"nels-axis-col",children:e.map(i=>T("button",{class:"nels-nearest-sample nels-nearest-secondary",onClick:()=>wr(i.id),children:[T("span",{class:"nels-ctx-dot",style:`background:${t}`}),i.label.slice(0,60),i.label.length>60?"...":""]},i.id))})]}):null}function JC({ctx:n}){return T("details",{class:"nels-axis-lane nels-ctx-lane",children:[T("summary",{class:"nels-axis-header nels-ctx-summary",children:"Initial Context"}),T(su,{title:"Seeds",items:n.seeds,color:"#3b82f6"}),T(su,{title:"Noise",items:n.noise,color:"#94a3b8"}),T(su,{title:"Negatives",items:n.negatives,color:"#ef4444"})]})}function QC({result:n}){const e=n.consistency_score,t=n.consistency_variants??[];return T("div",{class:"nels-axis-lane",children:[T("div",{class:"nels-axis-header",children:["Consistency Check - ",t.length," variants"]}),e!=null&&T("div",{class:"nels-cc-metrics",children:[T("span",{children:["SC score: ",T("strong",{children:e.toFixed(4)})]}),T("span",{class:"nels-cc-quality",children:tR(e)}),n.mean_intra!=null&&T("span",{children:["intra: ",n.mean_intra.toFixed(4)]}),n.mean_inter!=null&&T("span",{children:["inter: ",n.mean_inter.toFixed(4)]})]}),T("div",{style:"font-size:10px;color:#64849a;padding:2px 0 6px;line-height:1.5",children:[T("strong",{style:"color:#93a4b8",children:"SC score"})," = intra / inter - lower means tighter cluster. ",T("strong",{style:"color:#93a4b8",children:"Intra"}),": avg cosine distance of variants from seed (low = variants stay close to seed). ",T("strong",{style:"color:#93a4b8",children:"Inter"}),": avg cosine distance of seed from random dataset points (high = seed is specific). SC < 0.2 = tight, 0.2-0.5 = moderate, > 0.5 = loose."]}),T("div",{style:"font-size:10px;color:#64849a;padding:2px 0 6px;line-height:1.5",children:["Variants are clustered against the"," ",T("strong",{style:"color:#93a4b8",children:"full dataset"}),", not just the currently loaded sample - a variant's cluster may have no points in the loaded view, so it won't always appear in the cluster legend."]}),n.seed_prompt&&T("button",{class:"nels-nearest-sample nels-nearest-top nels-cc-seed",onClick:()=>{n.seed_point_id&&wr(n.seed_point_id)},children:["seed: ",n.seed_prompt.slice(0,60),n.seed_prompt.length>60?"...":""]}),T("div",{class:"nels-axis-col",children:t.map(i=>T("button",{class:`nels-nearest-sample nels-nearest-secondary${Mt.value.has(`__ghost__${i.id}`)?" active":""}`,title:i.text,onClick:()=>wr(`__ghost__${i.id}`),children:[T("span",{class:"nels-axis-bar",style:`width:${(i.cosine_sim*60).toFixed(1)}px;background:#22c55e`}),i.text.slice(0,60),i.text.length>60?"...":"",T("span",{class:"nels-nearest-dist",children:[" (",i.cosine_sim.toFixed(3),")"]})]},i.id))})]})}function eR({result:n}){const e=n.source_point_ids??[];if(!e.length)return null;const t=ot.value.byId;return T("div",{class:"nels-axis-lane",children:[T("div",{class:"nels-axis-header",children:"Selected points"}),T("div",{class:"nels-axis-col",children:[["A","(direction from)"],["B","(direction to)"],["C","(walk start)"]].map(([r,s],o)=>{var c;const a=e[o],l=((c=t.get(String(a)))==null?void 0:c.label)??String(a);return T("button",{class:"nels-nearest-sample nels-nearest-top",onClick:()=>wr(String(a)),children:[T("span",{class:"nels-delta-role-badge",style:"margin-right:4px",children:r}),l.slice(0,50),l.length>50?"...":"",T("span",{class:"nels-nearest-dist",style:"color:#64849a",children:[" ",s]})]},a)})})]})}function wr(n){Es(n,!1),st()}function tR(n){return n<.2?"tight":n<.5?"moderate":"loose"}function nR(){const n=el(null),e=sl.value;Wr(()=>{n.current&&(n.current.scrollTop=n.current.scrollHeight)},[e.length]);const t=e.slice(-180);return T("div",{class:"nels-panel-card",style:{height:"100%",display:"flex",flexDirection:"column"},children:[T("h3",{children:"Event Log"}),T("div",{class:"nels-panel-log",ref:n,children:t.map((i,r)=>{const s=new Date(i.timestamp).toLocaleTimeString(),o=i.status==="failed"?" nels-panel-log-status-failed":"";return T("div",{class:`nels-panel-log-line${i.stale?" stale":""}`,children:[T("span",{class:"nels-panel-log-time",children:["[",s,"]"]})," ",T("span",{class:"nels-panel-log-node",children:i.node_name})," ",T("span",{class:`nels-panel-log-type${o}`,children:i.event_type})," ",i.message,i.stale?" [stale]":""]},r)})})]})}let _v={x:0,y:0};function iR(n,e){_v={x:n,y:e}}function rR(){return _v}function sR(n){var c,u,d,h,f;const e=n.metadata??{},t=e.text!=null?String(e.text):null,i=t&&t.length>200?t.slice(0,200)+"...":t,r=((u=(c=Zi.value)==null?void 0:c.source)==null?void 0:u.cluster_labels)??{},s=p=>{const _=r[String(p)];return _?`${_} (${p})`:String(p)},o=[["id",n.id]];i&&o.push(["text",i]),e.ghost_cluster_id!=null&&o.push(["cluster",s(e.ghost_cluster_id)]),e.cluster_global!=null&&(o.push(["cluster",e.is_noise?"noise":s(e.cluster_global)]),o.push(["strength",Number(e.membership_strength??1).toFixed(2)])),o.push(["x",Number(((d=n.view_coords)==null?void 0:d[0])??0).toFixed(3)]),o.push(["y",Number(((h=n.view_coords)==null?void 0:h[1])??0).toFixed(3)]),((f=n.view_coords)==null?void 0:f.length)===3&&o.push(["z",Number(n.view_coords[2]).toFixed(3)]);const a=e.recon_text!=null?String(e.recon_text):null,l=e.recon_sim!=null?Number(e.recon_sim).toFixed(3):null;return{rows:o,reconText:a,reconSim:l}}function oR({containerRef:n,yOffset:e}){const t=el(null),i=Pn.value;if(Wr(()=>{if(!i||!t.current||!n.current)return;const a=t.current,l=n.current,c=()=>{const u=l.getBoundingClientRect(),d=rR();a.style.left=`${d.x-u.left+12}px`,a.style.top=`${d.y-u.top+e}px`};return c(),window.addEventListener("mousemove",c),()=>window.removeEventListener("mousemove",c)}),!i)return null;const{rows:r,reconText:s,reconSim:o}=sR(i);return T("div",{class:"nels-panel-hover",ref:t,children:[r.map(([a,l])=>T("div",{children:[T("strong",{children:String(a)}),": ",String(l)]},a)),s&&T("div",{class:"nels-hover-recon",children:[T("strong",{children:"recon"}),": ",s,o&&T("span",{class:"nels-hover-recon-sim",children:[" (",o,")"]})]})]})}const vv="nels-sidebar-width",aR=360,qa=ht(parseInt(localStorage.getItem(vv)??"")||aR);function lR(){const n=el(null),e=el(null),t=yr.value==="graph",i=si.value==="3d",r=bo.value,s=ot.value.points.length;Wr(()=>{e.current&&(Jg(e.current),lv(e.current))},[]),Wr(()=>{if(!n.current)return;if(!i){e_(n.current),jy(),setTimeout(()=>Eu(),0);const l=new ResizeObserver(()=>Eu());return l.observe(n.current),()=>{l.disconnect(),t_()}}const a=new ResizeObserver(()=>bd());return iv(n.current),setTimeout(()=>bd(),0),a.observe(n.current),()=>{a.disconnect(),_h()}},[i]);function o(a){iR(a.clientX,a.clientY)}return T("div",{class:"nels-panel",children:[r&&T("div",{class:"nels-loading-bar"}),T(LC,{}),T("div",{class:`nels-panel-body${t?"":" hidden"}`,style:`grid-template-columns: 1fr 4px ${qa.value}px`,children:[T("section",{class:"nels-panel-main",children:[T("div",{ref:n,class:"nels-sigma-container",onMouseMove:o}),T("canvas",{ref:e,class:"nels-hull-canvas"}),T(uR,{}),Pn.value&&T(oR,{containerRef:n,yOffset:i?-24:12}),s>0&&T("div",{class:"nels-point-badge",children:[s," points"]}),s>0&&T(Ey,{}),Di.value&&s>0&&T("div",{class:"nels-anim-badge",children:"animate ON - positions not exact"}),s===0&&T("div",{class:"nels-panel-empty",children:r?T("div",{class:"nels-center-loading",children:[T("div",{class:"nels-spinner"}),T("span",{class:"nels-spinner-label",children:Rd.value})]}):T("span",{children:"Add a NELS Dataset Loader - NELS Session, then click Refresh"})}),T(cR,{}),T("button",{class:"nels-view-logs-btn",onClick:()=>Zh("logs"),children:"View Logs"})]}),T("div",{class:"nels-resize-handle",onMouseDown:dR}),T("aside",{class:"nels-panel-side",children:[T(zC,{}),T(XC,{}),T(FC,{})]})]}),T("div",{class:`nels-panel-logs-view${t?" hidden":""}`,children:[T("button",{class:"nels-view-logs-btn",onClick:()=>Zh("graph"),children:"< Graph"}),T(nR,{})]})]})}function cR(){const n=Ue.value;if((n==null?void 0:n.operation)!=="axis_projection"||(n.axis_projection??[]).length<2)return null;const t=n.axis_keywords_a??"A-side",i=n.axis_keywords_b??"B-side",r=n.axis_b_projection,s=r&&r.length>=2?n.axis_b_keywords_a??"C-side":null,o=r&&r.length>=2?n.axis_b_keywords_b??"D-side":null,a=n.axis_label?n.axis_label.split(`
`)[0].slice(0,60):null,l=n.axis_b_label?n.axis_b_label.split(`
`)[0].slice(0,60):null;return T("div",{class:"nels-axis-legend-wrap",children:[T(om,{className:"nels-axis-legend",labelA:t,labelB:i,llmLabel:a}),s&&o&&T(om,{className:"nels-axis-legend-b2",labelA:s,labelB:o,llmLabel:l})]})}function om({className:n,labelA:e,labelB:t,llmLabel:i}){return T("div",{class:n,children:[T("div",{class:"nels-axis-legend-row",children:[T("span",{class:"nels-axis-legend-side nels-axis-legend-a",children:["<- ",e]}),T("div",{class:"nels-axis-legend-bar"}),T("span",{class:"nels-axis-legend-side nels-axis-legend-b",children:[t," ->"]})]}),i&&T("div",{class:"nels-axis-legend-llm",children:["(",i,")"]})]})}function uR(){const n=ri.value;if(!n)return null;const e=Math.min(n.x1,n.x2),t=Math.min(n.y1,n.y2),i=Math.abs(n.x2-n.x1),r=Math.abs(n.y2-n.y1);return T("div",{class:"nels-drag-select-rect",style:`left:${e}px;top:${t}px;width:${i}px;height:${r}px`})}function dR(n){n.preventDefault();const e=n.clientX,t=qa.value,i=n.currentTarget;i.classList.add("dragging");function r(o){const a=Math.max(240,Math.min(600,t-(o.clientX-e)));qa.value=a}function s(){i.classList.remove("dragging"),localStorage.setItem(vv,String(qa.value)),window.removeEventListener("mousemove",r),window.removeEventListener("mouseup",s)}window.addEventListener("mousemove",r),window.addEventListener("mouseup",s)}const hR="nels_PromptEncoder",fR="nels_AddToDataset",pR=[["input_source","Source"],["umap_n_neighbors","UMAP"],["cluster_umap_dims","Cluster"],["runtime_subset_size","Runtime"]],mR=[["input_source","Source"]],gR={[hR]:pR,[fR]:mR};function _R(n,e,t){const i=n.widgets;if(!i)return;const r=i.findIndex(u=>u.name===e);if(r===-1)return;const s=document.createElement("div");s.style.cssText="width:100%;height:24px;display:flex;align-items:center;gap:6px;padding:0 4px;pointer-events:none;box-sizing:border-box;";const o=document.createElement("span");o.textContent=t,o.style.cssText="font-size:9px;font-weight:600;letter-spacing:0.08em;text-transform:uppercase;color:rgba(255,255,255,0.3);white-space:nowrap;flex-shrink:0;";const a=document.createElement("div");a.style.cssText="flex:1;height:1px;background:rgba(255,255,255,0.1);",s.appendChild(o),s.appendChild(a);const l=n.addDOMWidget(`_sep_${e}`,"nels_separator",s,{serialize:!1});l.computedHeight=24;const c=n.widgets.indexOf(l);n.widgets.splice(c,1),n.widgets.splice(r,0,l),n.setSize(n.computeSize())}async function vR(n){const e=gR[n.comfyClass];if(e)for(const[t,i]of e)_R(n,t,i)}const xR="nels_GraphPanelLauncher";let Ci=null;function bR(){var t,i;const n=(t=vr.extensionManager)==null?void 0:t.bottomPanel;if(n!=null&&n.toggleBottomPanelTab){n.toggleBottomPanelTab("nels-graph-panel");return}const e=(i=vr.extensionManager)==null?void 0:i.command;e!=null&&e.execute&&e.execute("Workspace.ToggleBottomPanelTab.nels-graph-panel")}vr.registerExtension({name:"nels.graph.panel",nodeCreated:vR,beforeRegisterNodeDef(n,e){if(e.name===xR){const t=n.prototype.onNodeCreated;n.prototype.onNodeCreated=function(){t==null||t.apply(this,[]),this.addWidget("button","Open NELS Graph Panel","open",()=>bR()),this.size=[260,82]}}},bottomPanelTabs:[{id:"nels-graph-panel",title:"NELS Graph",type:"custom",render(n){Ci==null||Ci(),Ci=null,n.style.width="100%",n.style.height="100%",n.style.minWidth="0",n.style.minHeight="0",n.style.position="relative",n.style.overflow="hidden",Nv(),Gh(hm(lR,null),n);const e=new AbortController;fC(e.signal),Ci=()=>{e.abort(),Gh(null,n)}},destroy(){Ci==null||Ci(),Ci=null,gv()}}]});
