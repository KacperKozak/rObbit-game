(this["webpackJsonpalpha-mechanical"]=this["webpackJsonpalpha-mechanical"]||[]).push([[0],{74:function(e,t,n){e.exports=n(85)},84:function(e,t,n){},85:function(e,t,n){"use strict";n.r(t);var a,o=n(0),c=n.n(o),r=n(23),i=n.n(r),u=n(27),l=n(24),s=n(64),d=n(91),p=n(94),b=n(10),f=n(93),m=n(48),h=n(87),j=n(88),v=n(71),O=n(73),g=n(92),E=n(14),y=n(4),w=n(6),_=n(65),I=n.n(_),C=n(66),q=n(7),x=function(e,t){var n=Object(q.a)(e,2),a=n[0],o=n[1],c=Object(q.a)(t,2);return[a+c[0],o+c[1]]},S=function(e,t){return e.find((function(e){return e.id===t}))},k=function(e,t){return e.filter((function(e){return function(e,t){var n=Object(q.a)(e,2),a=n[0],o=n[1],c=Object(q.a)(t,2),r=c[0],i=c[1];return a===r&&o===i}(e.xy,t)}))},A=function(e){return Array.isArray(e)?e:[e]},P=function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:[];return[].concat(Object(y.a)(e),Object(y.a)(A(t)))},M=[0,-1],B=[1,0],R=[0,1],z=[-1,0];!function(e){e.Player="Player",e.Grass="Grass",e.RockFloor="RockFloor",e.BigRock="BigRock",e.Ice="Ice",e.Button="Button",e.Crossbow="Crossbow",e.Cannon="Cannon",e.Fence="Fence",e.Boom="Boom",e.CrossbowProjectile="CrossbowProjectile",e.RocketProjectile="RocketProjectile"}(a||(a={}));var T,F,N={0:a.Grass,1:a.RockFloor,2:a.Button,3:a.Ice},L=[[1,1,1,1,2,1,1],[1,0,3,3,0,0,1],[1,0,0,1,1,0,1],[1,0,0,1,0,0,1],[1,1,1,1,1,1,1]],H={1:a.Player,2:a.BigRock,3:a.Cannon,4:a.Crossbow,5:a.Fence},D=[[0,0,0,4,0,0,0],[0,1,0,0,0,0,0],[0,3,0,0,0,0,0],[0,2,5,5,0,0,2],[0,0,0,0,0,0,0]],J=n(2),U={button:"".concat("/alpha-mechanical","/sounds/Button_gameplay.mp3"),music:"".concat("/alpha-mechanical","/sounds/elementary1.mp3"),Alert_NO:"".concat("/alpha-mechanical","/sounds/Alert_NO.mp3"),Alert_YES:"".concat("/alpha-mechanical","/sounds/Alert_YES.mp3"),Bazooka:"".concat("/alpha-mechanical","/sounds/Bazooka.mp3"),Crossbow:"".concat("/alpha-mechanical","/sounds/Crossbow.mp3"),Engine_start:"".concat("/alpha-mechanical","/sounds/Engine_start.mp3"),Engine_LOOP_128:"".concat("/alpha-mechanical","/sounds/Engine_LOOP_128.mp3"),Engine_NO_1:"".concat("/alpha-mechanical","/sounds/Engine_NO_1.mp3"),Engine_NO_2:"".concat("/alpha-mechanical","/sounds/Engine_NO_2.mp3"),Engine_stop:"".concat("/alpha-mechanical","/sounds/Engine_stop.mp3"),Equip_1:"".concat("/alpha-mechanical","/sounds/Equip_1.mp3"),Equip_2:"".concat("/alpha-mechanical","/sounds/Equip_2.mp3"),Equip_3:"".concat("/alpha-mechanical","/sounds/Equip_3.mp3"),Equip_4:"".concat("/alpha-mechanical","/sounds/Equip_4.mp3"),Hero_1:"".concat("/alpha-mechanical","/sounds/Hero_1.mp3"),Hero_2:"".concat("/alpha-mechanical","/sounds/Hero_2.mp3"),Jump:"".concat("/alpha-mechanical","/sounds/Jump.mp3")},G=function(e,t){var n=new Audio(U[e]);t&&(n.volume=t),n.play()},Y=function(e){G(["Equip_1","Equip_2","Equip_3","Equip_4"][Math.round(4*Math.random())],e)},V=new Audio(U.Engine_LOOP_128),Q=n(11),W=n(29),X=n(1),K=n(30),Z=function(e){var t=e.url,n=e.instance,a=n.xy,o=n.elevation,r=n.rotation,i=e.castShadow,u=void 0===i||i,l=e.receiveShadow,s=void 0===l||l,d=e.elevationFix,p=void 0===d?0:d,b=Object(K.b)({pos:[a[0],o+p,a[1]],rot:[0,te(r),0]}),f=Object(Q.f)(W.a,"".concat("/alpha-mechanical","/assets/").concat(t)).scene.clone();return u&&(f.children[0].castShadow=!0),s&&(f.children[0].receiveShadow=!0),f.scale.set(.5,.5,.5),c.a.createElement(K.a.primitive,{object:f,position:b.pos,rotation:b.rot})},$=function(e){var t=e.url,n=e.instance,a=n.xy,o=n.elevation,r=n.rotation,i=n.data,u=e.castShadow,l=void 0===u||u,s=e.receiveShadow,d=void 0===s||s,p=Object(K.b)({pos:[a[0],o,a[1]],rot:[0,te(r),0]}),b=Object(Q.f)(W.a,"".concat("/alpha-mechanical","/assets/").concat(t));b.scene.scale.set(.5,.5,.5),l&&(b.scene.children[0].castShadow=!0),d&&(b.scene.children[0].receiveShadow=!0);var f=Object(Q.f)(W.a,"".concat("/alpha-mechanical","/assets/animations/boring.gltf")),m=new X.AnimationMixer(f.scene);f.animations.forEach((function(e){m.clipAction(e,b.scene).play()})),Object(Q.e)((function(){return m.update(.02)}));var h=Object(Q.f)(W.a,"".concat("/alpha-mechanical","/assets/rakietnica_srednia.gltf")).scene.clone(),j=Object(Q.f)(W.a,"".concat("/alpha-mechanical","/assets/kusza.gltf")).scene.clone();return c.a.createElement(K.a.group,{position:p.pos,rotation:p.rot},c.a.createElement("primitive",{object:b.scene},c.a.createElement("primitive",{object:h,visible:"cannon"==i.gun}),c.a.createElement("primitive",{object:j,visible:"crossbow"==i.gun})))},ee=function(e){var t=e.url,n=e.instance,a=n.xy,o=n.elevation,r=n.rotation,i=(n.data,e.castShadow),u=void 0===i||i,l=e.receiveShadow,s=void 0===l||l,d=Object(K.b)({pos:[a[0],o,a[1]],rot:[0,te(r),0]}),p=Object(Q.f)(W.a,"".concat("/alpha-mechanical","/assets/").concat(t)),b=p.scene.clone();u&&(b.children[0].castShadow=!0),s&&(b.children[0].receiveShadow=!0),b.scale.set(.5,.5,.5);var f=new X.AnimationMixer(b);return p.animations.forEach((function(e,t){f.clipAction(e,b.children[t]).play()})),Object(Q.e)((function(){f.update(.03),f.time>.8&&(f.stopAllAction(),b.visible=!1)})),c.a.createElement(K.a.group,{position:d.pos,rotation:d.rot},c.a.createElement("primitive",{object:b}))},te=function(e){return 1===e[0]&&0===e[1]?Math.PI/2:0===e[0]&&-1===e[1]?Math.PI/2*2:-1===e[0]&&0===e[1]?Math.PI/2*3:0},ne=function(e){return function(t){return c.a.createElement("div",Object.assign({style:{width:"100%",height:"100%",backgroundColor:e,fontSize:9}},t))}},ae=(T={},Object(J.a)(T,a.Grass,{name:"Grass",height:0,Component:ne("green"),Component3d:function(e){return c.a.createElement(Z,Object.assign({},e,{url:"grass_002_export_test_1_cube.gltf",castShadow:!1,receiveShadow:!0}))}}),Object(J.a)(T,a.Ice,{name:"Ice",height:0,enter:function(e){var t=e.who,n=e.vector;return[je({targetId:t.id,vector:n})]},Component:ne("lightblue"),Component3d:function(e){return c.a.createElement(Z,Object.assign({},e,{url:"ice_002_export_test_1_cube.gltf",castShadow:!1,receiveShadow:!0}))}}),Object(J.a)(T,a.RockFloor,{name:"Rock floor",height:0,push:function(e){var t=e.force,n=e.self;return t&&t>=50?[Ie(n.id)]:[]},Component:ne("gray"),Component3d:function(e){return c.a.createElement(Z,Object.assign({},e,{url:"rock.gltf",castShadow:!1,receiveShadow:!0}))}}),Object(J.a)(T,a.Button,{name:"Button",height:2,push:function(e){var t=e.state,n=e.self,a=Object(b.sample)(t.objects.filter((function(e){return"player"!==e.id})));return G("button"),a?[Ie(a.id),_e({targetId:n.id,data:{info:Object(b.uniqueId)("Ups!")}})]:[]},Component:ne("blue"),Component3d:function(e){return c.a.createElement(Z,Object.assign({},e,{url:"ground_002_export_test_1_cube.gltf",castShadow:!1,receiveShadow:!0}))}}),T),oe=function(e){return function(t){var n=t.instance,o=t.children;return c.a.createElement("div",{style:{margin:"20%",width:"60%",height:"60%",borderRadius:n.type===a.Player?100:5,backgroundColor:e,color:"black",opacity:.7}},c.a.createElement("pre",{style:{padding:2,fontSize:8}},o))}},ce=(F={},Object(J.a)(F,a.Player,{name:"Player",height:2,Component:oe("white"),Component3d:function(e){return c.a.createElement($,Object.assign({},e,{url:"robot_model.gltf"}))}}),Object(J.a)(F,a.BigRock,{name:"Big rock",height:.5,push:function(e){var t=e.self,n=e.vector;return[je({targetId:t.id,vector:n})]},Component:oe("brown"),Component3d:function(e){return c.a.createElement(Z,Object.assign({},e,{url:"rock1.gltf"}))}}),Object(J.a)(F,a.Fence,{name:"Fence",height:1.5,push:function(e){var t=e.force,n=e.self;return t&&t>=50?[Ie(n.id)]:[]},Component:oe("brown"),Component3d:function(e){return c.a.createElement(Z,Object.assign({},e,{url:"fence.gltf"}))}}),Object(J.a)(F,a.Cannon,{name:"Cannon",height:0,equip:function(e){var t=e.who,n=e.self;return Y(.8),[_e({targetId:t.id,data:{gun:"cannon"}}),Ie(n.id)]},Component:oe("red"),Component3d:function(e){return c.a.createElement(Z,Object.assign({},e,{url:"rakietnica_srednia.gltf",elevationFix:-.8}))}}),Object(J.a)(F,a.Boom,{name:"Boom",height:0,Component:oe("yellow"),Component3d:function(e){return c.a.createElement(ee,Object.assign({},e,{url:"boom.gltf"}))}}),Object(J.a)(F,a.Crossbow,{name:"Crossbow",height:0,equip:function(e){var t=e.who,n=e.self;return Y(.8),[_e({targetId:t.id,data:{gun:"crossbow"}}),Ie(n.id)]},Component:oe("red"),Component3d:function(e){return c.a.createElement(Z,Object.assign({},e,{url:"kusza.gltf",elevationFix:-.8}))}}),Object(J.a)(F,a.RocketProjectile,{name:"RocketProjectile",height:0,projectileLaunch:function(e){var t,n=e.who;return G("Bazooka"),[je({targetId:n.id,vector:(t=n.rotation,t.map((function(e){return-1*e})))},{delay:250})]},projectileHit:function(e){var t=e.self,n=e.what;e.who;return n?(G("Alert_YES"),[Ie(t.id),Ce({instance:{type:a.Boom,id:Object(b.uniqueId)(),xy:t.xy,elevation:t.elevation,rotation:t.rotation,aIndex:0,zIndex:20,data:{}}})]):[Ie(t.id)]},Component:oe("yellow"),Component3d:function(e){return c.a.createElement(Z,Object.assign({},e,{url:"rocket.gltf"}))}}),Object(J.a)(F,a.CrossbowProjectile,{name:"Projectile",height:0,projectileLaunch:function(e){var t=e.who;return G("Crossbow"),[je({targetId:t.id,vector:[0,0]},{delay:250})]},projectileHit:function(e){var t=e.self,n=e.what;e.who;return n&&G("Alert_YES"),[Ie(t.id)]},Component:oe("pink"),Component3d:function(e){return c.a.createElement(Z,Object.assign({},e,{url:"arrow.gltf"}))}}),F),re=Object(w.a)({},ae,{},ce),ie=function(e){var t=re[e];if(!t)throw new Error("[getDefinition] Definition for ".concat(e," not found"));return t},ue=function(e,t){var n=ie(e.type);return e.elevation+n.height>t.elevation},le=function(e){return Math.max.apply(Math,Object(y.a)(e.map((function(e){return ie(e.type).height+e.elevation}))))},se=function(e,t){var n=ie(e.type);return e.elevation+n.height-t.elevation>.5},de={queueStared:!1,queue:[],objects:function(){var e=L.flatMap((function(e,t){return e.map((function(e,n){var a=N[e];return{type:a,xy:[n,t],id:Object(b.uniqueId)(a),elevation:Math.random()/1.5,rotation:Object(b.sample)([M,z,B,R]),zIndex:1,aIndex:100,data:{}}}))})),t=D.flatMap((function(t,n){return t.map((function(t,o){var c,r=H[t];if(r)return{type:r,xy:[o,n],id:r===a.Player?"player":Object(b.uniqueId)(r),elevation:(null===(c=k(e,[o,n])[0])||void 0===c?void 0:c.elevation)||0,rotation:[0,0],zIndex:2,aIndex:10,data:{}}}))})).filter((function(e){return e}));return[].concat(Object(y.a)(t),Object(y.a)(e))}()},pe=I()("GAME"),be=pe("ENQUEUE"),fe=pe("TRY_NEXT_ACTION"),me=pe("NEXT_ACTION"),he=pe("QUEUE_END"),je=pe("MOVE"),ve=pe("ROTATE"),Oe=pe("EQUIP"),ge=pe("PROJECTILE"),Ee=pe("FLY"),ye=pe("FLY_END"),we=pe("UPDATE_OBJECT"),_e=pe("SET_OBJECT_DATA"),Ie=pe("REMOVE"),Ce=pe("TMP_SPAWN"),qe=Object(C.reducerWithInitialState)(de).case(be,(function(e,t){return Object(w.a)({},e,{queue:P(e.queue,t)})})).case(me,(function(e,t){return Object(w.a)({},e,{queueStared:!0,queue:e.queue.filter((function(e){return e!==t}))})})).case(he,(function(e){return Object(w.a)({},e,{queueStared:!1})})).case(je,(function(e,t){var n=function(e,t,n){var a=e.objects,o=[],c=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[];return o.push.apply(o,Object(y.a)(A(e)))},r={objects:a,actions:o},i=S(a,t);if(!i)return console.warn("[move] Target ".concat(t," not found")),r;var u=x(i.xy,n),l=k(a,u).sort((function(e,t){return t.aIndex-e.aIndex}));if(!l.length)return r;var s,d=Object(E.a)(l);try{for(d.s();!(s=d.n()).done;){var p,b=s.value,f=ie(b.type),m={who:i,vector:n,state:e,self:b};if(se(b,i))return c(null===(p=f.push)||void 0===p?void 0:p.call(f,m)),{objects:a,actions:o}}}catch(I){d.e(I)}finally{d.f()}var h,j=Object(E.a)(l);try{for(j.s();!(h=j.n()).done;){var v,O=h.value,g=ie(O.type),_={who:i,vector:n,state:e,self:O};c(null===(v=g.enter)||void 0===v?void 0:v.call(g,_))}}catch(I){j.e(I)}finally{j.f()}return{objects:a=a.map((function(e){return e!==i?e:Object(w.a)({},e,{xy:u,elevation:le(l)})})),actions:o}}(e,t.targetId,t.vector),a=n.actions,o=n.objects;return Object(w.a)({},e,{objects:o,queue:P(e.queue,a)})})).case(ve,(function(e,t){var n=function(e,t,n){var a=e.objects,o=S(a,t);return{objects:a.map((function(e){return e!==o?e:Object(w.a)({},e,{rotation:n})})),actions:[]}}(e,t.targetId,t.rotation),a=n.actions,o=n.objects;return Object(w.a)({},e,{objects:o,queue:P(e.queue,a)})})).case(Oe,(function(e,t){var n=t.targetId,a=xe(e,n),o=a.actions,c=a.objects;return Object(w.a)({},e,{objects:c,queue:P(e.queue,o)})})).case(ge,(function(e,t){var n,a=t.instance,o=t.byId,c=ie(a.type),r=[].concat(Object(y.a)(e.objects),[a]),i={who:S(e.objects,o),vector:a.rotation,state:e,self:a},u=(null===(n=c.projectileLaunch)||void 0===n?void 0:n.call(c,i))||[],l=[Ee({targetId:a.id})].concat(Object(y.a)(u));return Object(w.a)({},e,{objects:r,queue:P(e.queue,l)})})).case(Ee,(function(e,t){var n=function(e,t){var n=e.objects,a=[],o=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[];return a.push.apply(a,Object(y.a)(A(e)))},c={objects:n,actions:a},r=S(n,t);if(!r)return console.warn("[move] Target ".concat(t," not found")),c;for(var i=r.rotation,u=r.xy,l=15;l;){l--,u=x(u,i);var s,d=k(n,u).sort((function(e,t){return t.aIndex-e.aIndex})),p=Object(E.a)(d);try{for(p.s();!(s=p.n()).done;){var b,f=s.value,m=ie(f.type),h={who:r,vector:i,state:e,self:f,force:100};if(ue(f,r))return n=n.map((function(e){return e!==r?e:Object(w.a)({},e,{xy:u})})),o(ye({targetId:t,hitTargetId:f.id})),o(null===(b=m.push)||void 0===b?void 0:b.call(m,h)),{objects:n,actions:a}}}catch(j){p.e(j)}finally{p.f()}}return o(ye({targetId:t})),{objects:n=n.map((function(e){return e!==r?e:Object(w.a)({},e,{xy:u})})),actions:a}}(e,t.targetId),a=n.actions,o=n.objects;return Object(w.a)({},e,{objects:o,queue:P(e.queue,a)})})).case(ye,(function(e,t){var n=t.targetId,a=t.hitTargetId,o=S(e.objects,n),c=a?S(e.objects,a):void 0,r=[];if(o){var i,u=ie(o.type),l={who:null,what:c,vector:o.rotation,state:e,self:o},s=(null===(i=u.projectileHit)||void 0===i?void 0:i.call(u,l))||[];r.push.apply(r,Object(y.a)(s))}return Object(w.a)({},e,{queue:P(e.queue,r)})})).case(_e,(function(e,t){var n=t.targetId,a=t.data,o=Se(e,n,a),c=o.actions,r=o.objects;return Object(w.a)({},e,{objects:r,queue:P(e.queue,c)})})).case(we,(function(e,t){var n=t.targetId,a=t.objectValues;return Object(w.a)({},e,{objects:e.objects.map((function(e){return e.id===n?Object(w.a)({},e,{},a):e}))})})).case(Ie,(function(e,t){return Object(w.a)({},e,{objects:e.objects.filter((function(e){return e.id!==t}))})})).case(Ce,(function(e,t){var n=t.instance;return Object(w.a)({},e,{objects:[].concat(Object(y.a)(e.objects),[n])})})),xe=function(e,t){var n=[],a=S(e.objects,t);if(!a)return{objects:e.objects,actions:[]};var o,c=k(e.objects,a.xy).sort((function(e,t){return t.aIndex-e.aIndex})),r=Object(E.a)(c);try{for(r.s();!(o=r.n()).done;){var i,u=o.value,l=ie(u.type),s={who:a,vector:[0,0],state:e,self:u};n.push.apply(n,Object(y.a)((null===(i=l.equip)||void 0===i?void 0:i.call(l,s))||[]))}}catch(d){r.e(d)}finally{r.f()}return{actions:n,objects:e.objects}},Se=function(e,t,n){var a=e.objects,o=S(a,t);return{objects:a.map((function(e){return e!==o?e:Object(w.a)({},e,{data:Object(w.a)({},e.data,{},n)})})),actions:[]}},ke=Object(p.a)((function(e,t){return e.pipe(Object(h.a)(be.match),Object(h.a)((function(){return!t.value.game.queueStared})),Object(j.a)(fe()))}),(function(e,t){return e.pipe(Object(h.a)(fe.match),Object(v.a)((function(){return Object(b.first)(t.value.game.queue)})),Object(v.a)((function(e){return e?me(e):he()})))}),(function(e,t){return e.pipe(Object(h.a)(me.match),Object(O.a)((function(e){var t,n=(null===(t=e.payload.meta)||void 0===t?void 0:t.delay)||65;return Object(f.a)(Object(m.a)(e.payload),Object(m.a)(fe()).pipe(Object(g.a)(n)))})))}),(function(e,t){return e.pipe(Object(h.a)(Ce.match),Object(g.a)(1e3),Object(v.a)((function(e){return Ie(e.payload.instance.id)})))})),Ae=n(89),Pe=n(90),Me=Object(p.a)((function(e){return e.pipe(Object(h.a)(je.match),Object(h.a)((function(e){return"player"===e.payload.targetId})),Object(Ae.a)((function(){return(e=.1)&&(V.volume=e),void V.play();var e})),Object(Pe.a)())}),(function(e){return e.pipe(Object(h.a)(Oe.match),Object(Ae.a)((function(e){return G("Hero_2",.7)})),Object(Pe.a)())})),Be=Object(d.a)(),Re=Object(s.composeWithDevTools)({name:"App"}),ze=Object(l.combineReducers)({game:qe}),Te=Object(l.createStore)(ze,Re(Object(l.applyMiddleware)(Be)));Be.run(Object(p.a)(Me,ke));var Fe=function(){var e=Object(o.useState)(!1),t=Object(q.a)(e,2),n=t[0],a=t[1],c=Object(u.b)();return{edit:function(e,t){c(we({targetId:e,objectValues:t}))},toggleEditMode:function(){a(!n)},editMode:n}},Ne=function(e,t){Object(o.useEffect)((function(){var n=function(n){n.key===e&&t()};return window.addEventListener("keydown",n),function(){return window.removeEventListener("keydown",n)}}))},Le=function(e){var t=e.objects,n=Object(o.useState)(),a=Object(q.a)(n,2),r=a[0],i=a[1],u=Fe().edit,l=r&&S(t,r),s=function(e){l&&u(l.id,e)};return c.a.createElement("div",{style:{position:"absolute",zIndex:100,top:0,right:0,width:480,opacity:.8}},l&&c.a.createElement(c.a.Fragment,null,c.a.createElement("input",{type:"range",min:-1,max:5,step:.01,value:l.elevation,onChange:function(e){return s({elevation:parseInt(e.target.value,10)})}}),c.a.createElement("select",{value:l.type,onChange:function(e){return s({type:e.target.value})}},Object.keys(re).map((function(e){return c.a.createElement("option",null,e)})))),c.a.createElement("div",{style:{position:"relative"}},t.map((function(e){var t=e.type,n=e.id,a=e.xy,o=(e.rotation,e.elevation,e.zIndex),r=e.data,u=ie(t).Component;return c.a.createElement("div",{key:n,style:{position:"absolute",left:60*a[0],top:60*a[1],width:60,height:60,zIndex:o},onClick:function(){return i(n)}},c.a.createElement(u,{instance:e},t," ",c.a.createElement("br",null),Object(b.isEmpty)(r)?"":JSON.stringify(r,null,1)))}))))},He=function(){return c.a.createElement("group",null,c.a.createElement("ambientLight",{intensity:2}),c.a.createElement("pointLight",{position:[6,7,8],intensity:2.2,color:new X.Color("#3a8dc2"),"shadow-mapSize-Height":"1024","shadow-mapSize-width":"1024","shadow-camera-far":30,"shadow-bias":-.01,castShadow:!0,"shadow-camera-left":-5,"shadow-camera-right":5,"shadow-camera-top":5,"shadow-camera-bottom":-5}),c.a.createElement("pointLight",{position:[1,3,5],intensity:2.2,color:new X.Color("#c86b6f")}))},De=function(){var e=function(){var e=Object(u.c)((function(e){return e.game})),t=Object(u.b)();return Object(w.a)({},e,{move:function(n){if(!e.queueStared){var a=[],o=S(e.objects,"player");if(!o)return console.warn("Player don't exists [".concat("player","]"));Object(b.isEqual)(o.rotation,n)?a.push(je({targetId:"player",vector:n})):a.push(ve({targetId:"player",rotation:n})),t(be(a))}},equip:function(){e.queueStared||t(be(Oe({targetId:"player"})))},fire:function(){if(!e.queueStared){var n,o=S(e.objects,"player"),c=o.id,r=o.xy,i=o.rotation,u=o.elevation,l=o.data;if(null===l||void 0===l?void 0:l.gun)n="cannon"===l.gun?{type:a.RocketProjectile,id:Object(b.uniqueId)(),xy:r,rotation:i,elevation:u+.8,aIndex:100,zIndex:10,data:l}:{type:a.CrossbowProjectile,id:Object(b.uniqueId)(),xy:r,rotation:i,elevation:u+.8,aIndex:100,zIndex:10,data:l},t(be(ge({byId:c,instance:n})));else G("Alert_NO")}}})}(),t=e.objects,n=e.move,r=e.equip,i=e.fire,l=Fe(),s=l.editMode,d=l.toggleEditMode;Ne("e",d);var p=function(){return n(z)},f=function(){return n(M)},m=function(){return n(R)},h=function(){return n(B)};return Ne("ArrowLeft",p),Ne("ArrowUp",f),Ne("ArrowDown",m),Ne("ArrowRight",h),Ne("Enter",r),Ne(" ",i),c.a.createElement(c.a.Fragment,null,s&&c.a.createElement(Le,{objects:t}),c.a.createElement("div",{style:{position:"absolute",zIndex:5,bottom:0,left:0,right:0,textAlign:"center"}},c.a.createElement("button",{onClick:p},"\u2190"),c.a.createElement("button",{onClick:f},"\u2191"),c.a.createElement("button",{onClick:m},"\u2193"),c.a.createElement("button",{onClick:h},"\u2192"),c.a.createElement("button",{onClick:r},"equip"),c.a.createElement("button",{onClick:i},"fire")),c.a.createElement(Q.a,{orthographic:!0,camera:{zoom:100,fov:1075,position:[1,7,7]},onCreated:function(e){e.camera.lookAt(3,1,2),e.gl.shadowMap.type=X.PCFSoftShadowMap,e.gl.shadowMap.enabled=!0}},c.a.createElement(He,null),c.a.createElement(o.Suspense,{fallback:c.a.createElement("mesh",null,c.a.createElement("boxBufferGeometry",{attach:"geometry",args:[.5,.5,.5]}),c.a.createElement("meshStandardMaterial",{attach:"material",color:"red"}))},t.map((function(e){var t=ie(e.type).Component3d;return c.a.createElement(t,{key:e.id,instance:e})})))))},Je=function(){return c.a.createElement(u.a,{store:Te},c.a.createElement(De,null))};n(84);i.a.render(c.a.createElement(Je,null),document.getElementById("root"))}},[[74,1,2]]]);
//# sourceMappingURL=main.389af9f8.chunk.js.map