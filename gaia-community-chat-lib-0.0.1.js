(()=>{"use strict";class e{static pull(e,...t){for(const s of t){const t=e.indexOf(s);-1!==t&&e.splice(t,1)}}static insert(e,t,s){e.splice(t,0,s)}static random(e,t){return Math.floor(Math.random()*(t-e+1)+e)}static repeat(e,t){for(let s=0;s<e&&!1!==t(s);s+=1);}static repeatResult(e,t){const s=[];for(let n=0;n<e;n+=1)s.push(t(n));return s}static async repeatResultAsync(e,t){const s=[];for(let n=0;n<e;n+=1)s.push(await t(n));return s}static toTitleCase(e){return e.replace(/(^\w|\s\w)(\S*)/g,((e,t,s)=>t.toUpperCase()+s.toLowerCase()))}static shortenAddress(e){return`${e.substring(0,6)}...${e.substring(38)}`}static numberWithCommas(e,t){if(void 0===t||+ +e>Number.MAX_SAFE_INTEGER){const t=e.split(".");return t[0]=t[0].replace(/\B(?=(\d{3})+(?!\d))/g,","),"0"===t[1]?t[0]:t.join(".")}const s=String(+(+e).toFixed(t)).split(".");return s[0]=s[0].replace(/\B(?=(\d{3})+(?!\d))/g,","),s.join(".")}static shuffle(e){let t=e.length;for(;0!==t;){const s=Math.floor(Math.random()*t);t-=1,[e[t],e[s]]=[e[s],e[t]]}return e}}class t{eventMap={};deleted=!1;on(e,t){void 0===this.eventMap[e]&&(this.eventMap[e]=[]),this.eventMap[e].push(t)}toss(e,t,s){this.on(e,(async(...n)=>await t.fireEvent(void 0===s?e:s,...n)))}off(t,s){void 0!==this.eventMap?.[t]&&(e.pull(this.eventMap[t],s),0===this.eventMap[t].length&&delete this.eventMap[t])}async fireEvent(e,...t){const s=[],n=[];if(void 0!==this.eventMap[e])for(const i of this.eventMap[e]){const e=i(...t);e instanceof Promise?n.push(e):s.push(e)}return s.concat(await Promise.all(n))}delete(){this.fireEvent("delete"),this.eventMap=void 0,this.deleted=!0}}new class{notEmpty(e){return"string"==typeof e&&""!==e.trim()}integerString(e){const t=String(e);return!0===this.notEmpty(t)&&null!==t.match(/^(?:-?(?:0|[1-9][0-9]*))$/)}url(e){const t=String(e);return!0===this.notEmpty(t)&&t.length<=2083&&null!==t.match(/^(?:(?:ht|f)tp(?:s?)\:\/\/|~\/|\/)?(?:\w+:\w+@)?((?:(?:[-a-z\u0080-\uffff\d{1-3}]+\.)+(?:[a-z\u0080-\uffff]+))|((\b25[0-5]\b|\b[2][0-4][0-9]\b|\b[0-1]?[0-9]?[0-9]\b)(\.(\b25[0-5]\b|\b[2][0-4][0-9]\b|\b[0-1]?[0-9]?[0-9]\b)){3}))(?::[\d]{1,5})?(?:(?:(?:\/(?:[-\u0000-\uffff~!$+|.,=]|%[a-f\d]{2})+)+|\/)+|\?|#)?(?:(?:\?(?:[-\u0000-\uffff~!$+|.,*:]|%[a-f\d{2}])+=?(?:[-\u0000-\uffff~!$+|.,*:=]|%[a-f\d]{2})*)(?:&(?:[-\u0000-\uffff~!$+|.,*:]|%[a-f\d{2}])+=?(?:[-\u0000-\uffff~!$+|.,*:=]|%[a-f\d]{2})*)*)*(?:#(?:[-\u0000-\uffff~!$ |\/.,*:;=]|%[a-f\d]{2})*)?$/i)}},new class{match(e,t,s){const n=t.split("/");for(const[t,i]of e.entries()){const r=n[t];if(void 0===r)return!1;if("**"===r)return!0;if(""!==i&&"{"===r[0]&&"}"===r[r.length-1])void 0!==s&&(s[r.substring(1,r.length-1)]=i);else if("*"!==r&&r!==i)return!1;if(t===e.length-1&&t<n.length-1&&""!==n[n.length-1])return!1}return!0}parse(e,t,s){const n=e.split("/");return this.match(n,t,s)}};class s extends t{url;webSocket;sendKey=0;connected=!1;constructor(e){super(),this.url=e,this.reconnect()}reconnect(){this.webSocket=new WebSocket(this.url),this.webSocket.onopen=()=>{this.connected=!0,this.fireEvent("connect")},this.webSocket.onmessage=async e=>{const t=JSON.parse(e.data,((e,t)=>{if(!0===Array.isArray(t))for(const[e,s]of t.entries())null===s&&(t[e]=void 0);return t}));try{const e=await this.fireEvent(t.method,...t.params);if(void 0!==t.__send_key)if(0===e.length)console.error("메소드를 찾을 수 없음",t),this._send({method:`__error_${t.__send_key}`,params:["메소드를 찾을 수 없음"]});else for(const s of e)this._send({method:`__callback_${t.__send_key}`,params:[s]})}catch(e){void 0!==t.__send_key?this._send({method:`__error_${t.__send_key}`,params:[e.toString()]}):console.error(e)}},this.webSocket.onclose=()=>{this.connected=!1,this.fireEvent("disconnect")}}disconnect(){this.webSocket.close()}_send(e){this.webSocket.send(JSON.stringify(e))}async send(e,...t){this._send({method:e,params:t,__send_key:this.sendKey});const s=`__callback_${this.sendKey}`,n=`__error_${this.sendKey}`;return this.sendKey+=1,new Promise(((i,r)=>{this.on(s,i),this.on(n,(s=>{console.error(`${e}(${t.join(", ")}) ${s}`),r(new Error(s))}))}))}}const n=new class extends t{client;get connected(){return this.client.connected}connect(){this.client=new s("wss://backend.gaiaprotocol.com?key=community-chat"),this.client.on("connect",(()=>{console.log("connected to gaia protocol server."),this.fireEvent("connect")})),this.client.on("disconnect",(()=>{console.log("disconnected from gaia protocol server."),this.fireEvent("disconnect"),setTimeout((()=>{this.client.reconnect()}),1e3)})),this.client.on("realtime/message",((e,t,s,n)=>this.fireEvent(`${e}/message`,t,s,n))),this.client.on("realtime/users",(async e=>this.fireEvent(`${e}/users`,await this.loadUsers(e))))}async enter(e,t){return await this.client.send("community/chat/enter-room",e,t)}async loadUsers(e){return await this.client.send("community/chat/users",e)}async loadUser(e,t){return await this.client.send("community/chat/user",e,t)}async sendMessage(e,t){await this.client.send(`realtime/${e}/message`,t)}};window.GaiaCommunityChat=n})();