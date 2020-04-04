(this["webpackJsonpalpha-mechanical"]=this["webpackJsonpalpha-mechanical"]||[]).push([[0],{74:function(e,t,n){e.exports=n(85)},84:function(e,t,n){},85:function(e,t,n){"use strict";n.r(t);var a,o=n(0),c=n.n(o),r=n(23),i=n.n(r),u=n(27),l=n(24),s=n(64),d=n(91),p=n(94),b=n(10),f=n(93),m=n(48),h=n(87),j=n(88),v=n(71),O=n(73),g=n(92),y=n(14),E=n(4),w=n(6),_=n(65),I=n.n(_),C=n(66),q=n(8),x=function(e,t){var n=Object(q.a)(e,2),a=n[0],o=n[1],c=Object(q.a)(t,2);return[a+c[0],o+c[1]]},S=function(e,t){return e.find((function(e){return e.id===t}))},k=function(e,t){return e.filter((function(e){return function(e,t){var n=Object(q.a)(e,2),a=n[0],o=n[1],c=Object(q.a)(t,2),r=c[0],i=c[1];return a===r&&o===i}(e.xy,t)}))},A=function(e){return Array.isArray(e)?e:[e]},P=function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:[];return[].concat(Object(E.a)(e),Object(E.a)(A(t)))},B=[0,-1],M=[1,0],T=[0,1],z=[-1,0];!function(e){e.Player="Player",e.Grass="Grass",e.RockFloor="RockFloor",e.BigRock="BigRock",e.Ice="Ice",e.Button="Button",e.Crossbow="Crossbow",e.Cannon="Cannon",e.Boom="Boom",e.Projectile="Projectile"}(a||(a={}));var R,N,L={0:a.Grass,1:a.RockFloor,2:a.Button,3:a.Ice},F=[[1,1,1,1,2,1,1],[1,0,3,3,0,0,1],[1,0,0,1,1,0,1],[1,0,0,1,0,0,1],[1,1,1,1,1,1,1]],H={1:a.Player,2:a.BigRock,3:a.Cannon,4:a.Crossbow},J=[[0,0,0,4,0,0,0],[0,1,0,0,0,0,0],[0,3,0,0,0,0,0],[0,2,0,0,0,0,2],[0,0,0,0,0,0,0]],U=n(2),D={button:"".concat("/alpha-mechanical","/sounds/Button_gameplay.mp3"),music:"".concat("/alpha-mechanical","/sounds/elementary1.mp3"),Alert_NO:"".concat("/alpha-mechanical","/sounds/Alert_NO.mp3"),Alert_YES:"".concat("/alpha-mechanical","/sounds/Alert_YES.mp3"),Bazooka:"".concat("/alpha-mechanical","/sounds/Bazooka.mp3"),Crossbow:"".concat("/alpha-mechanical","/sounds/Crossbow.mp3"),Engine_start:"".concat("/alpha-mechanical","/sounds/Engine_start.mp3"),Engine_LOOP_128:"".concat("/alpha-mechanical","/sounds/Engine_LOOP_128.mp3"),Engine_NO_1:"".concat("/alpha-mechanical","/sounds/Engine_NO_1.mp3"),Engine_NO_2:"".concat("/alpha-mechanical","/sounds/Engine_NO_2.mp3"),Engine_stop:"".concat("/alpha-mechanical","/sounds/Engine_stop.mp3"),Equip_1:"".concat("/alpha-mechanical","/sounds/Equip_1.mp3"),Equip_2:"".concat("/alpha-mechanical","/sounds/Equip_2.mp3"),Equip_3:"".concat("/alpha-mechanical","/sounds/Equip_3.mp3"),Equip_4:"".concat("/alpha-mechanical","/sounds/Equip_4.mp3"),Hero_1:"".concat("/alpha-mechanical","/sounds/Hero_1.mp3"),Hero_2:"".concat("/alpha-mechanical","/sounds/Hero_2.mp3"),Jump:"".concat("/alpha-mechanical","/sounds/Jump.mp3")},G=function(e,t){var n=new Audio(D[e]);t&&(n.volume=t),n.play()},Y=function(e){G(["Equip_1","Equip_2","Equip_3","Equip_4"][Math.round(4*Math.random())],e)},V=new Audio(D.Engine_LOOP_128),Q=n(11),W=n(29),X=n(1),K=n(30),Z=function(e){var t=e.url,n=e.instance,a=n.xy,o=n.elevation,r=n.rotation,i=e.castShadow,u=void 0===i||i,l=e.receiveShadow,s=void 0===l||l,d=e.elevationFix,p=void 0===d?0:d,b=Object(K.b)({pos:[a[0],o+p,a[1]],rot:[0,te(r),0]}),f=Object(Q.f)(W.a,"".concat("/alpha-mechanical","/assets/").concat(t)).scene.clone();return u&&(f.children[0].castShadow=!0),s&&(f.children[0].receiveShadow=!0),f.scale.set(.5,.5,.5),c.a.createElement(K.a.primitive,{object:f,position:b.pos,rotation:b.rot})},$=function(e){var t=e.url,n=e.instance,a=n.xy,o=n.elevation,r=n.rotation,i=n.data,u=e.castShadow,l=void 0===u||u,s=e.receiveShadow,d=void 0===s||s,p=Object(K.b)({pos:[a[0],o,a[1]],rot:[0,te(r),0]}),b=Object(Q.f)(W.a,"".concat("/alpha-mechanical","/assets/").concat(t));b.scene.scale.set(.5,.5,.5),l&&(b.scene.children[0].castShadow=!0),d&&(b.scene.children[0].receiveShadow=!0);var f=Object(Q.f)(W.a,"".concat("/alpha-mechanical","/assets/animations/boring.gltf")),m=new X.AnimationMixer(f.scene);f.animations.forEach((function(e){m.clipAction(e,b.scene).play()})),Object(Q.e)((function(){return m.update(.02)}));var h=Object(Q.f)(W.a,"".concat("/alpha-mechanical","/assets/rakietnica_srednia.gltf")).scene.clone(),j=Object(Q.f)(W.a,"".concat("/alpha-mechanical","/assets/kusza.gltf")).scene.clone();return c.a.createElement(K.a.group,{position:p.pos,rotation:p.rot},c.a.createElement("primitive",{object:b.scene},c.a.createElement("primitive",{object:h,visible:"cannon"==i.gun}),c.a.createElement("primitive",{object:j,visible:"crossbow"==i.gun})))},ee=function(e){var t=e.url,n=e.instance,a=n.xy,o=n.elevation,r=n.rotation,i=(n.data,e.castShadow),u=void 0===i||i,l=e.receiveShadow,s=void 0===l||l,d=Object(K.b)({pos:[a[0],o,a[1]],rot:[0,te(r),0]}),p=Object(Q.f)(W.a,"".concat("/alpha-mechanical","/assets/").concat(t)),b=p.scene.clone();u&&(b.children[0].castShadow=!0),s&&(b.children[0].receiveShadow=!0),b.scale.set(.3,.3,.3);var f=new X.AnimationMixer(b);return p.animations.forEach((function(e,t){f.clipAction(e,b.children[t]).play()})),Object(Q.e)((function(){f.update(.03),console.log(f.time),f.time>.8&&(f.stopAllAction(),b.visible=!1)})),c.a.createElement(K.a.group,{position:d.pos,rotation:d.rot},c.a.createElement("primitive",{object:b}))},te=function(e){return 1===e[0]&&0===e[1]?Math.PI/2:0===e[0]&&-1===e[1]?Math.PI/2*2:-1===e[0]&&0===e[1]?Math.PI/2*3:0},ne=function(e){return function(t){return c.a.createElement("div",Object.assign({style:{width:"100%",height:"100%",backgroundColor:e,fontSize:9}},t))}},ae=(R={},Object(U.a)(R,a.Grass,{name:"Grass",height:0,Component:ne("green"),Component3d:function(e){return c.a.createElement(Z,Object.assign({},e,{url:"grass_002_export_test_1_cube.gltf",castShadow:!1,receiveShadow:!0}))}}),Object(U.a)(R,a.Ice,{name:"Ice",height:0,enter:function(e){var t=e.who,n=e.vector;return[je({targetId:t.id,vector:n})]},Component:ne("lightblue"),Component3d:function(e){return c.a.createElement(Z,Object.assign({},e,{url:"ice_002_export_test_1_cube.gltf",castShadow:!1,receiveShadow:!0}))}}),Object(U.a)(R,a.RockFloor,{name:"Rock floor",height:0,push:function(e){var t=e.force,n=e.self;return t&&t>=50?[Ie(n.id)]:[]},Component:ne("gray"),Component3d:function(e){return c.a.createElement(Z,Object.assign({},e,{url:"rock.gltf",castShadow:!1,receiveShadow:!0}))}}),Object(U.a)(R,a.Button,{name:"Button",height:2,push:function(e){var t=e.state,n=e.self,a=Object(b.sample)(t.objects.filter((function(e){return"player"!==e.id})));return G("button"),a?[Ie(a.id),_e({targetId:n.id,data:{info:Object(b.uniqueId)("Ups!")}})]:[]},Component:ne("blue"),Component3d:function(e){return c.a.createElement(Z,Object.assign({},e,{url:"ground_002_export_test_1_cube.gltf",castShadow:!1,receiveShadow:!0}))}}),R),oe=function(e){return function(t){var n=t.instance,o=t.children;return c.a.createElement("div",{style:{margin:"20%",width:"60%",height:"60%",borderRadius:n.type===a.Player?100:5,backgroundColor:e,color:"black",opacity:.7}},c.a.createElement("pre",{style:{padding:2,fontSize:8}},o))}},ce=(N={},Object(U.a)(N,a.Player,{name:"Player",height:2,Component:oe("white"),Component3d:function(e){return c.a.createElement($,Object.assign({},e,{url:"robot_model.gltf"}))}}),Object(U.a)(N,a.BigRock,{name:"Big rock",height:.5,push:function(e){var t=e.self,n=e.vector;return[je({targetId:t.id,vector:n})]},Component:oe("brown"),Component3d:function(e){return c.a.createElement(Z,Object.assign({},e,{url:"rock1.gltf"}))}}),Object(U.a)(N,a.Cannon,{name:"Cannon",height:0,equip:function(e){var t=e.who,n=e.self;return Y(.8),[_e({targetId:t.id,data:{gun:"cannon"}}),Ie(n.id)]},Component:oe("red"),Component3d:function(e){return c.a.createElement(Z,Object.assign({},e,{url:"rakietnica_srednia.gltf",elevationFix:-.8}))}}),Object(U.a)(N,a.Boom,{name:"Boom",height:0,Component:oe("yellow"),Component3d:function(e){return c.a.createElement(ee,Object.assign({},e,{url:"boom.gltf"}))}}),Object(U.a)(N,a.Crossbow,{name:"Crossbow",height:0,equip:function(e){var t=e.who,n=e.self;return Y(.8),[_e({targetId:t.id,data:{gun:"crossbow"}}),Ie(n.id)]},Component:oe("red"),Component3d:function(e){return c.a.createElement(Z,Object.assign({},e,{url:"kusza.gltf",elevationFix:-.8}))}}),Object(U.a)(N,a.Projectile,{name:"Projectile",height:0,projectileLaunch:function(e){var t,n,a=e.who,o="cannon"===(null===(t=a.data)||void 0===t?void 0:t.gun);return G(o?"Bazooka":"Crossbow"),[je({targetId:a.id,vector:o?(n=a.rotation,n.map((function(e){return-1*e}))):[0,0]},{delay:250})]},projectileHit:function(e){var t=e.self;return G("Alert_YES"),[Ie(t.id),Ce({instance:{type:a.Boom,id:Object(b.uniqueId)(),xy:t.xy,elevation:t.elevation,rotation:t.rotation,aIndex:0,zIndex:20,data:{}}})]},Component:oe("yellow"),Component3d:function(e){return c.a.createElement(Z,Object.assign({},e,{url:"rocket.gltf"}))}}),N),re=Object(w.a)({},ae,{},ce),ie=function(e){var t=re[e];if(!t)throw new Error("[getDefinition] Definition for ".concat(e," not found"));return t},ue=function(e,t){var n=ie(e.type);return e.elevation+n.height>t.elevation},le=function(e){return Math.max.apply(Math,Object(E.a)(e.map((function(e){return ie(e.type).height+e.elevation}))))},se=function(e,t){var n=ie(e.type);return e.elevation+n.height-t.elevation>.5},de={queueStared:!1,queue:[],objects:function(){var e=F.flatMap((function(e,t){return e.map((function(e,n){var a=L[e];return{type:a,xy:[n,t],id:Object(b.uniqueId)(a),elevation:Math.random()/1.5,rotation:Object(b.sample)([B,z,M,T]),zIndex:1,aIndex:100,data:{}}}))})),t=J.flatMap((function(t,n){return t.map((function(t,o){var c,r=H[t];if(r)return{type:r,xy:[o,n],id:r===a.Player?"player":Object(b.uniqueId)(r),elevation:(null===(c=k(e,[o,n])[0])||void 0===c?void 0:c.elevation)||0,rotation:[0,0],zIndex:2,aIndex:10,data:{}}}))})).filter((function(e){return e}));return[].concat(Object(E.a)(t),Object(E.a)(e))}()},pe=I()("GAME"),be=pe("ENQUEUE"),fe=pe("TRY_NEXT_ACTION"),me=pe("NEXT_ACTION"),he=pe("QUEUE_END"),je=pe("MOVE"),ve=pe("ROTATE"),Oe=pe("EQUIP"),ge=pe("PROJECTILE"),ye=pe("FLY"),Ee=pe("HIT"),we=pe("UPDATE_OBJECT"),_e=pe("SET_OBJECT_DATA"),Ie=pe("REMOVE"),Ce=pe("TMP_SPAWN"),qe=Object(C.reducerWithInitialState)(de).case(be,(function(e,t){return Object(w.a)({},e,{queue:P(e.queue,t)})})).case(me,(function(e,t){return Object(w.a)({},e,{queueStared:!0,queue:e.queue.filter((function(e){return e!==t}))})})).case(he,(function(e){return Object(w.a)({},e,{queueStared:!1})})).case(je,(function(e,t){var n=function(e,t,n){var a=e.objects,o=[],c=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[];return o.push.apply(o,Object(E.a)(A(e)))},r={objects:a,actions:o},i=S(a,t);if(!i)return console.warn("[move] Target ".concat(t," not found")),r;var u=x(i.xy,n),l=k(a,u).sort((function(e,t){return t.aIndex-e.aIndex}));if(!l.length)return r;var s,d=Object(y.a)(l);try{for(d.s();!(s=d.n()).done;){var p,b=s.value,f=ie(b.type),m={who:i,vector:n,state:e,self:b};if(se(b,i))return c(null===(p=f.push)||void 0===p?void 0:p.call(f,m)),{objects:a,actions:o}}}catch(I){d.e(I)}finally{d.f()}var h,j=Object(y.a)(l);try{for(j.s();!(h=j.n()).done;){var v,O=h.value,g=ie(O.type),_={who:i,vector:n,state:e,self:O};c(null===(v=g.enter)||void 0===v?void 0:v.call(g,_))}}catch(I){j.e(I)}finally{j.f()}return{objects:a=a.map((function(e){return e!==i?e:Object(w.a)({},e,{xy:u,elevation:le(l)})})),actions:o}}(e,t.targetId,t.vector),a=n.actions,o=n.objects;return Object(w.a)({},e,{objects:o,queue:P(e.queue,a)})})).case(ve,(function(e,t){var n=function(e,t,n){var a=e.objects,o=S(a,t);return{objects:a.map((function(e){return e!==o?e:Object(w.a)({},e,{rotation:n})})),actions:[]}}(e,t.targetId,t.rotation),a=n.actions,o=n.objects;return Object(w.a)({},e,{objects:o,queue:P(e.queue,a)})})).case(Oe,(function(e,t){var n=t.targetId,a=xe(e,n),o=a.actions,c=a.objects;return Object(w.a)({},e,{objects:c,queue:P(e.queue,o)})})).case(ge,(function(e,t){var n,o=t.xy,c=t.vector,r=t.elevation,i=t.byId,u=a.Projectile,l=ie(u),s={type:u,id:Object(b.uniqueId)(u),xy:o,rotation:c,elevation:r+.8,aIndex:100,zIndex:10,data:{}},d=[].concat(Object(E.a)(e.objects),[s]),p=[ye({targetId:s.id})],f={who:S(e.objects,i),vector:s.rotation,state:e,self:s},m=(null===(n=l.projectileLaunch)||void 0===n?void 0:n.call(l,f))||[];return p.push.apply(p,Object(E.a)(m)),Object(w.a)({},e,{objects:d,queue:P(e.queue,p)})})).case(ye,(function(e,t){var n=function(e,t){var n=e.objects,a=[],o=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[];return a.push.apply(a,Object(E.a)(A(e)))},c={objects:n,actions:a},r=S(n,t);if(!r)return console.warn("[move] Target ".concat(t," not found")),c;for(var i=r.rotation,u=r.xy,l=15;l;){l--,u=x(u,i);var s,d=k(n,u).sort((function(e,t){return t.aIndex-e.aIndex})),p=Object(y.a)(d);try{for(p.s();!(s=p.n()).done;){var b,f=s.value,m=ie(f.type),h={who:r,vector:i,state:e,self:f,force:100};if(ue(f,r))return n=n.map((function(e){return e!==r?e:Object(w.a)({},e,{xy:u})})),o(Ee({targetId:t,hitTargetId:f.id})),o(null===(b=m.push)||void 0===b?void 0:b.call(m,h)),{objects:n,actions:a}}}catch(j){p.e(j)}finally{p.f()}}return o(Ee({targetId:t})),{objects:n=n.map((function(e){return e!==r?e:Object(w.a)({},e,{xy:u})})),actions:a}}(e,t.targetId),a=n.actions,o=n.objects;return Object(w.a)({},e,{objects:o,queue:P(e.queue,a)})})).case(Ee,(function(e,t){var n=t.targetId,a=(t.hitTargetId,S(e.objects,n)),o=[];if(a){var c,r=ie(a.type),i={who:a,vector:a.rotation,state:e,self:a},u=(null===(c=r.projectileHit)||void 0===c?void 0:c.call(r,i))||[];o.push.apply(o,Object(E.a)(u))}return Object(w.a)({},e,{queue:P(e.queue,o)})})).case(_e,(function(e,t){var n=t.targetId,a=t.data,o=Se(e,n,a),c=o.actions,r=o.objects;return Object(w.a)({},e,{objects:r,queue:P(e.queue,c)})})).case(we,(function(e,t){var n=t.targetId,a=t.objectValues;return Object(w.a)({},e,{objects:e.objects.map((function(e){return e.id===n?Object(w.a)({},e,{},a):e}))})})).case(Ie,(function(e,t){return Object(w.a)({},e,{objects:e.objects.filter((function(e){return e.id!==t}))})})).case(Ce,(function(e,t){var n=t.instance;return Object(w.a)({},e,{objects:[].concat(Object(E.a)(e.objects),[n])})})),xe=function(e,t){var n=[],a=S(e.objects,t);if(!a)return{objects:e.objects,actions:[]};var o,c=k(e.objects,a.xy).sort((function(e,t){return t.aIndex-e.aIndex})),r=Object(y.a)(c);try{for(r.s();!(o=r.n()).done;){var i,u=o.value,l=ie(u.type),s={who:a,vector:[0,0],state:e,self:u};n.push.apply(n,Object(E.a)((null===(i=l.equip)||void 0===i?void 0:i.call(l,s))||[]))}}catch(d){r.e(d)}finally{r.f()}return{actions:n,objects:e.objects}},Se=function(e,t,n){var a=e.objects,o=S(a,t);return{objects:a.map((function(e){return e!==o?e:Object(w.a)({},e,{data:Object(w.a)({},e.data,{},n)})})),actions:[]}},ke=Object(p.a)((function(e,t){return e.pipe(Object(h.a)(be.match),Object(h.a)((function(){return!t.value.game.queueStared})),Object(j.a)(fe()))}),(function(e,t){return e.pipe(Object(h.a)(fe.match),Object(v.a)((function(){return Object(b.first)(t.value.game.queue)})),Object(v.a)((function(e){return e?me(e):he()})))}),(function(e,t){return e.pipe(Object(h.a)(me.match),Object(O.a)((function(e){var t,n=(null===(t=e.payload.meta)||void 0===t?void 0:t.delay)||65;return Object(f.a)(Object(m.a)(e.payload),Object(m.a)(fe()).pipe(Object(g.a)(n)))})))}),(function(e,t){return e.pipe(Object(h.a)(Ce.match),Object(g.a)(1e3),Object(v.a)((function(e){return Ie(e.payload.instance.id)})))})),Ae=n(89),Pe=n(90),Be=Object(p.a)((function(e){return e.pipe(Object(h.a)(je.match),Object(h.a)((function(e){return"player"===e.payload.targetId})),Object(Ae.a)((function(){return(e=.1)&&(V.volume=e),void V.play();var e})),Object(Pe.a)())}),(function(e){return e.pipe(Object(h.a)(Oe.match),Object(Ae.a)((function(e){return G("Hero_2",.7)})),Object(Pe.a)())})),Me=Object(d.a)(),Te=Object(s.composeWithDevTools)({name:"App"}),ze=Object(l.combineReducers)({game:qe}),Re=Object(l.createStore)(ze,Te(Object(l.applyMiddleware)(Me)));Me.run(Object(p.a)(Be,ke));var Ne=function(e,t){Object(o.useEffect)((function(){var n=function(n){n.key===e&&t()};return window.addEventListener("keydown",n),function(){return window.removeEventListener("keydown",n)}}))},Le=function(e){var t=e.objects,n=Object(o.useState)(),a=Object(q.a)(n,2),r=a[0],i=a[1],l=function(){var e=Object(u.b)();return{edit:function(t,n){e(we({targetId:t,objectValues:n}))}}}().edit,s=r&&S(t,r),d=function(e){s&&l(s.id,e)};return c.a.createElement("div",{style:{position:"absolute",zIndex:100,top:0,right:0,width:480,opacity:.8}},s&&c.a.createElement(c.a.Fragment,null,c.a.createElement("input",{type:"range",min:-1,max:5,step:.01,value:s.elevation,onChange:function(e){return d({elevation:parseInt(e.target.value,10)})}}),c.a.createElement("select",{value:s.type,onChange:function(e){return d({type:e.target.value})}},Object.keys(re).map((function(e){return c.a.createElement("option",null,e)})))),c.a.createElement("div",{style:{position:"relative"}},t.map((function(e){var t=e.type,n=e.id,a=e.xy,o=(e.rotation,e.elevation,e.zIndex),r=e.data,u=ie(t).Component;return c.a.createElement("div",{key:n,style:{position:"absolute",left:60*a[0],top:60*a[1],width:60,height:60,zIndex:o},onClick:function(){return i(n)}},c.a.createElement(u,{instance:e},t," ",c.a.createElement("br",null),Object(b.isEmpty)(r)?"":JSON.stringify(r,null,1)))}))))},Fe=function(){return c.a.createElement("group",null,c.a.createElement("ambientLight",{intensity:2}),c.a.createElement("pointLight",{position:[6,7,8],intensity:2.2,color:new X.Color("#3a8dc2"),"shadow-mapSize-Height":"1024","shadow-mapSize-width":"1024","shadow-camera-far":30,"shadow-bias":-.01,castShadow:!0,"shadow-camera-left":-5,"shadow-camera-right":5,"shadow-camera-top":5,"shadow-camera-bottom":-5}),c.a.createElement("pointLight",{position:[1,3,5],intensity:2.2,color:new X.Color("#c86b6f")}))},He=function(){var e=function(){var e=Object(u.c)((function(e){return e.game})),t=Object(u.b)();return Object(w.a)({},e,{move:function(n){if(!e.queueStared){var a=[],o=S(e.objects,"player");if(!o)return console.warn("Player don't exists [".concat("player","]"));Object(b.isEqual)(o.rotation,n)?a.push(je({targetId:"player",vector:n})):a.push(ve({targetId:"player",rotation:n})),t(be(a))}},equip:function(){e.queueStared||t(be(Oe({targetId:"player"})))},fire:function(){if(!e.queueStared){var n=S(e.objects,"player"),a=n.id,o=n.xy,c=n.rotation,r=n.elevation,i=n.data;(null===i||void 0===i?void 0:i.gun)?t(be(ge({byId:a,xy:o,vector:c,elevation:r}))):G("Alert_NO")}}})}(),t=e.objects,n=e.move,a=e.equip,r=e.fire,i=function(){return n(z)},l=function(){return n(B)},s=function(){return n(T)},d=function(){return n(M)};return Ne("ArrowLeft",i),Ne("ArrowUp",l),Ne("ArrowDown",s),Ne("ArrowRight",d),Ne("Enter",a),Ne(" ",r),c.a.createElement(c.a.Fragment,null,c.a.createElement(Le,{objects:t}),c.a.createElement("div",{style:{position:"absolute",zIndex:5,bottom:0,left:0,right:0,textAlign:"center"}},c.a.createElement("button",{onClick:i},"\u2190"),c.a.createElement("button",{onClick:l},"\u2191"),c.a.createElement("button",{onClick:s},"\u2193"),c.a.createElement("button",{onClick:d},"\u2192"),c.a.createElement("button",{onClick:a},"equip"),c.a.createElement("button",{onClick:r},"fire")),c.a.createElement(Q.a,{orthographic:!0,camera:{zoom:100,fov:1075,position:[1,7,7]},onCreated:function(e){e.camera.lookAt(3,1,2),e.gl.shadowMap.type=X.PCFSoftShadowMap,e.gl.shadowMap.enabled=!0}},c.a.createElement(Fe,null),c.a.createElement(o.Suspense,{fallback:c.a.createElement("mesh",null,c.a.createElement("boxBufferGeometry",{attach:"geometry",args:[.5,.5,.5]}),c.a.createElement("meshStandardMaterial",{attach:"material",color:"red"}))},t.map((function(e){var t=ie(e.type).Component3d;return c.a.createElement(t,{key:e.id,instance:e})})))))},Je=function(){return c.a.createElement(u.a,{store:Re},c.a.createElement(He,null))};n(84);i.a.render(c.a.createElement(Je,null),document.getElementById("root"))}},[[74,1,2]]]);
//# sourceMappingURL=main.b309e802.chunk.js.map