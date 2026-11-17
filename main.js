/* PyroLab 3D — local isometric process rendering, guided narration, and clickable process equipment */
(() => {
  'use strict';
  const STAGES = [
    {
        "name": "Feedstock selection",
        "sub": "Dry stream enters the plant",
        "icon": "♻",
        "point": [
            -13,
            -4
        ],
        "zoom": 1.1,
        "title": "First, separate the waste.",
        "lead": "Wet organic waste takes the composting route. Only suitable, prepared dry feedstock should proceed to pyrolysis.",
        "action": "Separate wet and dry streams",
        "desc": "Green-marked organics divert to composting. Selected dry feedstock proceeds along the blue preparation conveyor.",
        "why": "Feed quality controls outputs",
        "because": "Food waste, metals, glass, PVC, batteries and other unsuitable materials can create process and pollution problems.",
        "lesson": "Pyrolysis is not mixed-waste burning",
        "takeaway": "Explain why source segregation and feedstock screening come before any thermal process.",
        "voice": "We start with mixed municipal waste and separate it. Wet organic material goes for composting. Only a suitable dry fraction is screened and prepared for pyrolysis. It is not a process for indiscriminately burning mixed waste."
    },
    {
        "name": "Shredding & pre-treatment",
        "sub": "Clean • size-reduce • dry",
        "icon": "⚙",
        "point": [
            -9,
            -4
        ],
        "zoom": 1.2,
        "title": "Prepare the dry feed.",
        "lead": "A shredder cuts the acceptable material into more uniform pieces before it enters the hopper.",
        "action": "Twin rollers break down pieces",
        "desc": "Watch material move along the belt while two rollers rotate. Screening and drying are represented conceptually.",
        "why": "More consistent thermal behaviour",
        "because": "Size, moisture, composition and contamination affect heat transfer, product quality and process stability.",
        "lesson": "Uniform size ≠ safe feedstock",
        "takeaway": "Hazardous contaminants still need removal; pretreatment does not make unsuitable materials safe.",
        "voice": "The selected dry fraction is shredded and prepared. Removing unsuitable contaminants, controlling moisture, and achieving a more uniform size improve process consistency."
    },
    {
        "name": "Feed hopper",
        "sub": "Metered inlet to sealed reactor",
        "icon": "▥",
        "point": [
            -5,
            -4
        ],
        "zoom": 1.26,
        "title": "The hopper meters material in.",
        "lead": "Prepared feed falls through a hopper and controlled feed section towards the reactor inlet.",
        "action": "Watch the particles drop",
        "desc": "Animated pieces feed through the funnel and screw section. The conceptual seal limits unwanted air ingress.",
        "why": "Air exclusion matters",
        "because": "Oxygen leaking into a hot vessel can shift the process towards combustion and create serious hazards.",
        "lesson": "A controlled inlet is essential",
        "takeaway": "Industrial equipment needs properly engineered sealing and feeding systems.",
        "voice": "The hopper meters prepared dry waste towards the reactor. The feed system must be designed to limit incoming air, because pyrolysis operates without intentional oxygen supply."
    },
    {
        "name": "Pyrolysis reactor",
        "sub": "Heat • oxygen excluded",
        "icon": "♨",
        "point": [
            0,
            -4
        ],
        "zoom": 1.33,
        "title": "The heart of the plant.",
        "lead": "Heat breaks complex organic material into vapours, non-condensable gases and a solid carbonaceous residue.",
        "action": "The reactor glows as it operates",
        "desc": "See the heated horizontal vessel, rotating visual indicators, temperature gauge and hot vapour leaving its outlet.",
        "why": "Thermal decomposition, not incineration",
        "because": "Pyrolysis takes place without intentional oxygen input. Product yields depend on feedstock, time and temperature.",
        "lesson": "Three product streams form",
        "takeaway": "Vapour can be condensed into liquid, permanent gas can be treated, and solid char must be evaluated.",
        "voice": "Inside the sealed reactor, heat decomposes the prepared organic material with oxygen excluded. It generates condensable vapours, non-condensable gas, and solid char. This is pyrolysis, not conventional incineration."
    },
    {
        "name": "Heat exchanger",
        "sub": "Hot vapour starts cooling",
        "icon": "❄",
        "point": [
            5,
            -4
        ],
        "zoom": 1.22,
        "title": "Recover heat from hot vapour.",
        "lead": "The hot process stream enters a heat exchanger, where heat is transferred to a separate cooling or recovery circuit.",
        "action": "Follow the amber vapour stream",
        "desc": "Animated orange flow changes into cooler blue flow as it passes through the finned exchanger.",
        "why": "Cooling makes recovery possible",
        "because": "Vapour temperature must be reduced so condensable fractions can be collected in later equipment.",
        "lesson": "Heat transfer before separation",
        "takeaway": "Link this step to the heat-exchanger concepts studied in Chemical Engineering.",
        "voice": "Hot vapour now flows through a heat exchanger. Heat is transferred out to a separate circuit, lowering vapour temperature and preparing the stream for condensation."
    },
    {
        "name": "Condensation & separation",
        "sub": "Liquid • non-condensable gas",
        "icon": "◌",
        "point": [
            10,
            -4
        ],
        "zoom": 1.17,
        "title": "Two streams emerge after cooling.",
        "lead": "Condensers and separators recover condensable vapours as liquid, while non-condensable gas remains in the gas stream.",
        "action": "Droplets form inside the separator",
        "desc": "Watch blue liquid droplets fall into collection, while green gas pulses leave the upper outlet.",
        "why": "The separation is physical",
        "because": "Cooling changes vapours to liquids where possible; it does not make untreated gas safe to vent.",
        "lesson": "Follow the product branches",
        "takeaway": "The liquid line leads to oil storage; the gas line leads to cleaning and controlled use.",
        "voice": "In the condenser and separation system, condensable components become liquid pyrolysis oil. Other gases do not condense under these conditions and leave through a separate gas-treatment route."
    },
    {
        "name": "Pyrolysis oil & upgrading",
        "sub": "Collection • optional purification",
        "icon": "🛢",
        "point": [
            11,
            4
        ],
        "zoom": 1.1,
        "title": "Collect the liquid oil fraction.",
        "lead": "Recovered liquid enters a collection vessel and may undergo additional separation or upgrading if appropriate.",
        "action": "The golden oil tank fills",
        "desc": "A transparent tank, moving liquid level, and small purification columns illustrate oil collection and upgrading.",
        "why": "Product quality is variable",
        "because": "Pyrolysis oils may be acidic, unstable or contaminated; they are not automatically ready-to-use fuels.",
        "lesson": "Characterize before using",
        "takeaway": "Testing and additional treatment determine appropriate industrial uses.",
        "voice": "The condensable liquid is collected as pyrolysis oil. Depending on feedstock and process conditions, it may need further purification, testing, and upgrading. We cannot assume this raw oil is ready to be used as fuel."
    },
    {
        "name": "Gas treatment & heat loop",
        "sub": "Filter • controlled combustion",
        "icon": "↺",
        "point": [
            3,
            5
        ],
        "zoom": 1.17,
        "title": "A controlled gas-reuse loop.",
        "lead": "Non-condensable gas is treated and, when suitable, may fuel a properly designed burner that supplies reactor heat.",
        "action": "Follow the green return line",
        "desc": "Animated gas pulses pass a cleaning unit and travel towards the burner; an orange heat arrow points back to the vessel.",
        "why": "Energy recovery requires controls",
        "because": "Gas composition and contaminants vary; filtering, combustion controls and emissions management are essential.",
        "lesson": "Conceptual energy integration",
        "takeaway": "The gas loop does not mean the reactor interior receives oxygen. The burner is external.",
        "voice": "Some non-condensable gas can be treated and used in a controlled external burner to supply process heat. The burner is outside the reactor. The reactor itself remains oxygen-limited, and gas treatment and emission controls are critical."
    },
    {
        "name": "Solid char recovery",
        "sub": "Discharge • testing • potential use",
        "icon": "◼",
        "point": [
            -4,
            5
        ],
        "zoom": 1.16,
        "title": "Solid residue is the third output.",
        "lead": "After cooling and safe discharge, carbon-rich char is collected separately from liquid and gas products.",
        "action": "Dark char travels to a covered bin",
        "desc": "Follow dark particles from the reactor discharge route into a collection hopper and sealed storage container.",
        "why": "Char must be tested",
        "because": "Contaminants and leachable substances can make char unsuitable for soil amendment or construction uses.",
        "lesson": "Potential use is not guaranteed",
        "takeaway": "Only tested, compliant char may enter approved end uses; otherwise manage it as a waste.",
        "voice": "The final product stream is solid char. After suitable cooling and safe handling, char is collected and tested. Depending on composition and contamination, it may have a suitable application, or it may need controlled disposal."
    }
];
  const $=id=>document.getElementById(id);
  const canvas=$('scene'), ctx=canvas.getContext('2d',{alpha:false});
  const stageList=$('stageList');
  stageList.innerHTML=STAGES.map((s,i)=>`<button type="button" class="stage-item${i===0?' active':''}" data-step="${i}" aria-pressed="${i===0}"><span class="stage-number">${String(i+1).padStart(2,'0')}</span><span class="stage-copy"><strong>${s.name}</strong><small>${s.sub}</small></span><span class="stage-glyph">${s.icon}</span></button>`).join('');
  const stageButtons=[...stageList.querySelectorAll('.stage-item')];
  const state={step:0,autoplay:false,voice:true,orbit:false,dragging:false,dragged:false,dragX:0,dragY:0,lastX:0,lastY:0,stageStarted:performance.now(),t:0,paused:false,animationRate:1,autoTimer:null,narrationId:0,focusCamera:true};
  const cam={yaw:.66,pitch:.79,zoom:1.05,tx:0,tz:0,ty:0,targetYaw:.66,targetPitch:.79,targetZoom:1.05,targetX:0,targetZ:0};
  const focusPoints=STAGES.map(s=>({x:s.point[0],z:s.point[1]}));
  let W=0,H=0,DPR=1,sceneItems=[],afterShapes=[],hitMarks=[];
  const PALETTE={grass:'#345d51',grass2:'#477766',steel:'#7f9ca4',pale:'#b3ccd3',city:'#45677a',road:'#263a42',yellow:'#ffd06a',green:'#9ee2a6',blue:'#61bfe0',red:'#ec8179',soil:'#9a7963',glass:'#88d8ca'};
  function clamp(v,min,max){return Math.min(max,Math.max(min,v))}
  function mix(a,b,t){return a+(b-a)*t}
  function col(c,m=1){if(!c)return '#fff';c=c.replace('#','');if(c.length===3)c=c.split('').map(q=>q+q).join('');const n=parseInt(c,16);return `rgb(${clamp(Math.round(((n>>16)&255)*m),0,255)},${clamp(Math.round(((n>>8)&255)*m),0,255)},${clamp(Math.round((n&255)*m),0,255)})`}
  function rgba(c,a){c=c.replace('#','');if(c.length===3)c=c.split('').map(q=>q+q).join('');const n=parseInt(c,16);return `rgba(${(n>>16)&255},${(n>>8)&255},${n&255},${a})`}
  function resize(){const r=canvas.getBoundingClientRect();W=r.width;H=r.height;DPR=Math.min(window.devicePixelRatio||1,2);canvas.width=Math.max(1,Math.floor(W*DPR));canvas.height=Math.max(1,Math.floor(H*DPR));ctx.setTransform(DPR,0,0,DPR,0,0)}
  new ResizeObserver(resize).observe(canvas);resize();
  function coords(x,y,z){
    const dx=x-cam.tx,dz=z-cam.tz;
    const a=Math.cos(cam.yaw)*dx-Math.sin(cam.yaw)*dz;
    const b=Math.sin(cam.yaw)*dx+Math.cos(cam.yaw)*dz;
    const scale=Math.min(W/39,H/26.0)*cam.zoom;
    return {x:W*.5+a*scale,y:H*.535+(Math.sin(cam.pitch)*b-Math.cos(cam.pitch)*y)*scale,depth:Math.cos(cam.pitch)*b+Math.sin(cam.pitch)*y,scale};
  }
  function poly(points,color,stroke=null,alpha=1,depthOffset=0){const c=points.map(p=>coords(...p)),depth=c.reduce((s,p)=>s+p.depth,0)/c.length;
    sceneItems.push({depth:depth+depthOffset,render(){ctx.beginPath();ctx.moveTo(c[0].x,c[0].y);for(let i=1;i<c.length;i++)ctx.lineTo(c[i].x,c[i].y);ctx.closePath();ctx.fillStyle=alpha===1?color:rgba(color,alpha);ctx.fill();if(stroke){ctx.strokeStyle=stroke;ctx.lineWidth=.6;ctx.stroke()}}});}
  function box(x,y,z,w,h,d,c,alpha=1,depthOffset=0){const X=x-w/2,U=x+w/2,Y=y,Y2=y+h,Z=z-d/2,V=z+d/2;
    poly([[X,Y,Z],[U,Y,Z],[U,Y,V],[X,Y,V]],col(c,.45),null,alpha,depthOffset);
    poly([[X,Y2,Z],[U,Y2,Z],[U,Y2,V],[X,Y2,V]],col(c,1.08),rgba('#b8eee0',.05),alpha,depthOffset);
    poly([[X,Y,Z],[U,Y,Z],[U,Y2,Z],[X,Y2,Z]],col(c,.77),null,alpha,depthOffset);
    poly([[X,Y,V],[U,Y,V],[U,Y2,V],[X,Y2,V]],col(c,.7),null,alpha,depthOffset);
    poly([[X,Y,Z],[X,Y,V],[X,Y2,V],[X,Y2,Z]],col(c,.60),null,alpha,depthOffset);
    poly([[U,Y,Z],[U,Y,V],[U,Y2,V],[U,Y2,Z]],col(c,.88),null,alpha,depthOffset);
  }
  function cone(x,y,z,r,h,c,sides=9){let apex=[x,y+h,z];let ring=[];for(let i=0;i<sides;i++){const a=i*Math.PI*2/sides;ring.push([x+Math.cos(a)*r,y,z+Math.sin(a)*r])}for(let i=0;i<sides;i++)poly([ring[i],ring[(i+1)%sides],apex],col(c,.77+Math.cos(i)*.12))}
  function cyl(x,y,z,r,h,c,sides=12){const pts=[];for(let j=0;j<sides;j++){const a=j*2*Math.PI/sides;pts.push([x+r*Math.cos(a),y,z+r*Math.sin(a)])}for(let j=0;j<sides;j++){const k=(j+1)%sides;poly([pts[j],pts[k],[pts[k][0],y+h,pts[k][2]],[pts[j][0],y+h,pts[j][2]]],col(c,.67+.19*Math.cos(j*6.283/sides)))}poly(pts.map(p=>[p[0],y+h,p[2]]),col(c,1.13))}
  function groundRect(x,z,w,d,c,y=.02,layer=-4000){poly([[x-w/2,y,z-d/2],[x+w/2,y,z-d/2],[x+w/2,y,z+d/2],[x-w/2,y,z+d/2]],c,null,1,layer)}
  function line3(a,b,c,width=2,alpha=1,depthBias=0){const p=coords(...a),q=coords(...b);afterShapes.push({depth:(p.depth+q.depth)/2+depthBias,render(){ctx.strokeStyle=alpha===1?c:rgba(c,alpha);ctx.lineWidth=width;ctx.lineCap='round';ctx.beginPath();ctx.moveTo(p.x,p.y);ctx.lineTo(q.x,q.y);ctx.stroke()}})}
  function disk3(x,y,z,r,c,alpha=1){const pts=[];for(let i=0;i<20;i++){const t=i*Math.PI/10;pts.push([x+Math.cos(t)*r,y,z+Math.sin(t)*r])}poly(pts,c,null,alpha)}
  function segment(x1,y1,z1,x2,y2,z2,r,c){line3([x1,y1,z1],[x2,y2,z2],c,Math.max(1.3,r*coords(x1,y1,z1).scale*1.1),1,50)}
  function screenText(text,x,y,{font='700 11px "DM Sans", sans-serif',fill='#dae8dd',align='center',bg,px=12,py=7,border}={}){afterShapes.push({depth:1000,render(){ctx.font=font;const tw=ctx.measureText(text).width;const ww=tw+px*2;let left=x-ww/2;if(align==='left')left=x;let top=y-17;if(bg){ctx.fillStyle=bg;roundRect(left,top,ww,27,7);ctx.fill();if(border){ctx.strokeStyle=border;ctx.lineWidth=1;ctx.stroke()}}ctx.textAlign='center';ctx.textBaseline='middle';ctx.fillStyle=fill;ctx.fillText(text,left+ww/2,top+13)}})}
  function roundRect(x,y,w,h,r){const rr=Math.min(r,w/2,h/2);ctx.beginPath();ctx.moveTo(x+rr,y);ctx.arcTo(x+w,y,x+w,y+h,rr);ctx.arcTo(x+w,y+h,x,y+h,rr);ctx.arcTo(x,y+h,x,y,rr);ctx.arcTo(x,y,x+w,y,rr);ctx.closePath()}
  function tree(x,z,h=2.6){cyl(x,0,z,.18,h*.52,'#91735d',8);cone(x,h*.4,z,.95,h*.75,'#4d9771',9);cone(x,h*.73,z,.72,h*.63,'#6ac391',9)}
  function lamp(x,z){cyl(x,0,z,.08,2.2,'#738e93',6);box(x,2.13,z,.6,.15,.35,'#ffedab');const p=coords(x,2.2,z);afterShapes.push({depth:400,render(){let gg=ctx.createRadialGradient(p.x,p.y,1,p.x,p.y,18);gg.addColorStop(0,'#f6ecaf44');gg.addColorStop(1,'#f6ecaf00');ctx.fillStyle=gg;ctx.beginPath();ctx.arc(p.x,p.y,18,0,Math.PI*2);ctx.fill()}})}
  function roof(x,y,z,w,d,c){poly([[x-w/2,y,z-d/2],[x+w/2,y,z-d/2],[x+w/2,y,z+d/2],[x-w/2,y,z+d/2]],c)}
  function windows(x,y,z,w,d,n=3,light=false){const n2=n;for(let i=0;i<n2;i++)box(x-w*.35+i*w*.7/(n2-1||1),y,z+d/2+.012,.37,.5,.04,light?'#dbf49c':'#7fcdd5')}
  function house(x,z,w=2.4,h=2.0,c='#6887a0'){groundRect(x,z,w+1,3.0,'#507164');box(x,0,z,w,h,2.1,c);roof(x,h+.08,z,w+0.4,2.5,'#b4c7cb');windows(x,.8,z,w,2.1,2);box(x,.01,z+1.07,.57,.95,.04,'#5a606b');cyl(x+w*.42,0,z+.7,.15,1.6,'#a4bac6');}
  function bins(x,z){const co=['#5baee4','#80cd78','#ed8978'];co.forEach((c,i)=>{let xx=x+i*1.25;box(xx,0,z,1.02,1.38,1.07,c);box(xx,1.38,z,1.13,.12,1.18,col(c,1.2));box(xx,.42,z+.56,.55,.49,.035,'#e1f9f1');const s=coords(xx,1.94,z);screenText(['DRY','WET','SPECIAL'][i],s.x,s.y-12,{font:'800 8px "DM Sans",sans-serif',bg:'#183038ef',fill:'#d8f5e5',px:7})})}

  // PyroLab is a conceptual isometric model drawn in a local Canvas. No external 3D/JS dependencies.
  function tubeX(x,y,z,L,r,c){
    let n=14;
    for(let j=0;j<n;j++){const a=j/n*Math.PI*2,b=(j+1)/n*Math.PI*2;poly([[x-L/2,y+Math.cos(a)*r,z+Math.sin(a)*r],[x+L/2,y+Math.cos(a)*r,z+Math.sin(a)*r],[x+L/2,y+Math.cos(b)*r,z+Math.sin(b)*r],[x-L/2,y+Math.cos(b)*r,z+Math.sin(b)*r]],col(c,.72+.3*Math.cos((a+b)/2)))}
    let left=[],right=[];for(let j=0;j<n;j++){const a=j/n*Math.PI*2;left.push([x-L/2,y+Math.cos(a)*r,z+Math.sin(a)*r]);right.push([x+L/2,y+Math.cos(a)*r,z+Math.sin(a)*r])}
    poly(left,col(c,.8));poly(right,col(c,1.12));
  }
  function label(str,x,y,z,accent='#eaf3f6'){
    if(W<620){const mobileStage={'SOURCE SORTING':0,'WET → COMPOST':0,'PRE-TREATMENT':1,'FEED HOPPER':2,'OXYGEN-LIMITED REACTOR':3,'HEAT EXCHANGER':4,'CONDENSER / SEPARATOR':5,'PYROLYSIS OIL':6,'OPTIONAL UPGRADING':6,'GAS CLEANING':7,'EXTERNAL HEAT LOOP':7,'CHAR COLLECTION':8,'TEST BEFORE USE':8};if(mobileStage[str]!==state.step)return;}
    const p=coords(x,y,z);screenText(str,p.x,p.y-15,{font:'800 9px "DM Sans",sans-serif',bg:'#102231ea',fill:accent,px:9,border:'#52717e88'});
  }
  function pipe(path,color='#7798a6',r=.18){for(let i=0;i<path.length-1;i++){let a=path[i],b=path[i+1];segment(...a,...b,r,color)}}
  function flow(path,color,t,num=7,speed=.26,size=.12){
    const lengths=[];let total=0;for(let i=1;i<path.length;i++){let a=path[i-1],b=path[i];let d=Math.hypot(b[0]-a[0],b[1]-a[1],b[2]-a[2]);lengths.push(d);total+=d}
    for(let k=0;k<num;k++){
      let v=((t*speed+k/num)%1)*total,segIndex=0;
      while(segIndex<lengths.length-1&&v>lengths[segIndex]){v-=lengths[segIndex];segIndex++}
      let p=path[segIndex],q=path[segIndex+1],u=Math.min(1,v/lengths[segIndex]);
      let x=mix(p[0],q[0],u),y=mix(p[1],q[1],u),z=mix(p[2],q[2],u);
      let pp=coords(x,y,z);afterShapes.push({depth:500,render(){ctx.fillStyle=color;ctx.shadowColor=color;ctx.shadowBlur=13;ctx.beginPath();ctx.arc(pp.x,pp.y,Math.max(2.8,pp.scale*size),0,Math.PI*2);ctx.fill();ctx.shadowBlur=0}});
    }
  }
  function rim(x,y,z,r,color){const pts=[];for(let k=0;k<32;k++){let a=k/32*Math.PI*2;pts.push([x+r*Math.cos(a),y,z+r*Math.sin(a)])}for(let i=0;i<pts.length;i++)line3(pts[i],pts[(i+1)%pts.length],color,1.5,1,60)}
  function flare(x,y,z,t){for(let i=0;i<4;i++){
      const pp=coords(x+Math.sin(t*3.1+i)*.22,y+.3+i*.16+Math.sin(t*4+i)*.12,z);
      afterShapes.push({depth:700,render(){ctx.fillStyle=['#ffd07d','#f6a04e','#ff6e45','#ffe0a0'][i];ctx.shadowBlur=16;ctx.shadowColor='#ff8138';ctx.beginPath();ctx.ellipse(pp.x,pp.y,5-i*.7,10-i*1.3,.19,0,Math.PI*2);ctx.fill();ctx.shadowBlur=0}})
    }}
  function moduleFloor(x,z,w,d,color){groundRect(x,z,w,d,color,.015);for(let i=0;i<4;i++){let xx=x-w/2+.28+i*(w-.56)/3;line3([xx,.035,z-d/2+.12],[xx,.035,z+d/2-.12],'#86abb5',.8,.3,-50)}}
  function segregator(t){
    moduleFloor(-13,-4,3.75,5.2,'#34534b');
    const colours=['#76c984','#70b4e6','#e99c73'];
    for(let i=0;i<3;i++){let z=-5.35+i*1.32;box(-13.5,0,z,.92,1.35,.97,colours[i]);box(-13.5,1.35,z,1.09,.17,1.1,col(colours[i],1.18));box(-13.5,.62,z+.5,.48,.41,.045,'#d6f8f3')}
    for(let i=0;i<5;i++){let z=-5.9+i*.33;box(-11.7,1.0+Math.abs(Math.sin(t*.8+i))*.22,z,.24,.23,.27,'#e4b773')}
    // Optional organic waste goes to compost (NOT pyrolysis).
    moduleFloor(-12.6,3.0,4,3.6,'#416a4f');for(let i=0;i<3;i++){cone(-13.6+i*.95,.08,3.05,.52,.67,'#977b55',9);cone(-13.6+i*.95,.42,3.05,.39,.35,'#b39462',9)}
    pipe([[-13.5,1.6,-3.6],[-13.5,1.8,1.5],[-12.6,.8,2.5]],'#68ba8d',.08);flow([[-13.5,1.6,-3.6],[-13.5,1.8,1.5],[-12.6,.8,2.5]],'#8fe3a5',t,5,.16,.08);
    label('SOURCE SORTING',-13.15,2.42,-4.4);label('WET → COMPOST',-12.5,1.55,3.1,'#adf5b6');
  }
  function shredder(t){
    moduleFloor(-9.6,-4,4.0,4.9,'#405663');
    box(-9.6,0,-4,3.5,1.25,2.5,'#667f89');box(-9.6,1.28,-4,3.6,.18,2.65,'#86aeb5');
    box(-9.6,1.46,-4,2.65,.55,1.6,'#354f60');
    for(let k=0;k<2;k++){let x=-10.2+k*1.2;for(let n=0;n<7;n++){let a=(n/7)*Math.PI*2+(k===0?t:-t)*2.7;let z=-4.12+Math.cos(a)*.44;box(x+Math.sin(a)*.2,1.56+Math.sin(a)*.16,z,.23,.20,.28,k?'#ced8d5':'#f2a36f')}}
    for(let i=0;i<8;i++){let x=-11.2+((t*.65+i*.46)%3.2);box(x,1.96,-3.5+((i%3)-1)*.31,.25,.2,.28,['#e9bc78','#98b6ce','#d08b79'][i%3])}
    cyl(-9.6,2.04,-4,.24,.26,'#e1a875');label('PRE-TREATMENT',-9.5,2.9,-4.55);
  }
  function hopper(t){
    moduleFloor(-5.5,-4,3.9,5.1,'#4c615c');
    box(-5.5,0,-4,2.5,1.1,2,'#5b7e91');
    box(-5.5,1.25,-4,2.9,.23,2.6,'#90a5af');
    // flared trapezoid hopper lip above funnel
    poly([[-7,3.4,-5.25],[-4,3.4,-5.25],[-5,2.0,-4.6],[-6,2.0,-4.6]],'#809ca9');
    poly([[-7,3.4,-2.75],[-4,3.4,-2.75],[-5,2,-3.4],[-6,2,-3.4]],'#668491');
    poly([[-7,3.4,-5.25],[-7,3.4,-2.75],[-6,2,-3.4],[-6,2,-4.6]],'#526d7b');
    poly([[-4,3.4,-5.25],[-4,3.4,-2.75],[-5,2,-3.4],[-5,2,-4.6]],'#5a7885');
    for(let i=0;i<13;i++){let yy=3.32-((t*1.55+i*.21)%1.8);let xx=-5.45+Math.sin(i*13.1)*(.2+Math.max(0,yy-2)*.38);box(xx,yy,-4+(i%3-1)*.18,.14,.13,.15,['#efb87a','#a7c5d2','#e6916b'][i%3])}
    segment(-4.2,1.1,-4,-2.65,1.1,-4,.24,'#c8b6a7');label('FEED HOPPER',-5.5,4.15,-4.4);
  }
  function reactor(t){
    moduleFloor(0,-4,6.2,5.45,'#5b4340');
    for(let x of [-1.6,1.6])box(x,0,-4,1.1,1,1.1,'#5c6a77');
    tubeX(0,2.13,-4,5.5,1.35,'#7c939a');
    // subtle red-hot outer heating jacket, not open fire inside reactor
    tubeX(0,2.13,-4,4.9,1.2,'#85534a');
    for(let x of [-2.05,-.96,.26,1.48,2.04]){
      let a=t*.65+x*1.3;for(let m=0;m<14;m++){let th=m*Math.PI*2/14;let yy=2.13+1.26*Math.cos(th),zz=-4+1.26*Math.sin(th);
        line3([x,yy,zz],[x+.05,yy,zz],m%3===0?'#ffc07c':'#bf7063',m%3===0?3.0:1.5,.75,160)
      }
      if(Math.sin(a)>0.74){const p=coords(x,3.38,-4);afterShapes.push({depth:600,render(){ctx.fillStyle='#ff8d4c';ctx.shadowBlur=16;ctx.shadowColor='#ff8543';ctx.beginPath();ctx.arc(p.x,p.y,3.5,0,Math.PI*2);ctx.fill();ctx.shadowBlur=0}})}
    }
    // service control panel and thermocouple
    box(.5,0,-1.65,.94,1.36,.54,'#9baab6');box(.5,.8,-1.36,.56,.36,.06,'#1d3437');
    for(let j=0;j<3;j++){const p=coords(.29+j*.18,.65,-1.3);afterShapes.push({depth:900,render(){ctx.fillStyle=['#80dba9','#e9c773','#ff8d69'][j];ctx.beginPath();ctx.arc(p.x,p.y,2.8,0,Math.PI*2);ctx.fill()}})}
    pipe([[.0,2.9,-4],[.0,3.95,-4],[1.2,3.95,-4]],'#c9a9a3',.07);
    label('OXYGEN-LIMITED REACTOR',0,4.95,-4.35,'#ffd3ab');
    // External burner, below heated jacket (gas-reuse loop)
    box(.3,0,-1.2,2.2,.72,1.2,'#8b7774');flare(.15,.63,-1.12,t);
  }
  function exchanger(t){
    moduleFloor(5,-4,4.0,4.7,'#355661');tubeX(5.0,2.05,-4,3.2,.78,'#7aafbf');
    for(let i=0;i<13;i++){let x=3.6+i*.24;box(x,1.33,-4, .08,1.45,2.07,'#95bece')}
    for(let i=0;i<3;i++)pipe([[3.5,1.1,-4.98+i*.5],[6.4,1.1,-4.98+i*.5]],'#447f99',.05);
    box(5,0,-4,2.9,.55,1.8,'#557885');label('HEAT EXCHANGER',5,3.7,-4.1,'#c8ebf3');
  }
  function condenser(t){
    moduleFloor(10,-4,5.1,5.4,'#3a5867');
    for(let i=0;i<2;i++){let x=9+i*2.1;cyl(x,.35,-4,.64,2.8,i?'#85acb6':'#5e9bad');cyl(x,3.1,-4,.74,.18,'#b5d5df');
      for(let j=0;j<4;j++)box(x+Math.cos(j*1.57)*.48,1.2+Math.sin(t*2+j)*.16,-3.35,.14,.12,.07,'#b5f0ef')}
    box(10,0,-4,3.9,.65,2.1,'#678994');
    for(let i=0;i<8;i++){const x=10.2+Math.sin(i*9.3)*.29,y=2.7-((t*.7+i*.15)%1.95);let p=coords(x,y,-3.25);afterShapes.push({depth:700,render(){ctx.fillStyle='#83dce3';ctx.beginPath();ctx.arc(p.x,p.y,2.3,0,Math.PI*2);ctx.fill()}})}
    label('CONDENSER / SEPARATOR',10,4.15,-4.35,'#c8edf7');
  }
  function oilAndUpgrading(t){
    moduleFloor(10.8,4.1,7,6.1,'#58543c');
    cyl(9.15,0,4.35,1.18,2.7,'#e1af61');cyl(9.15,2.72,4.35,1.2,.19,'#ffdf92');
    // moving oil level behind sight-glass panel
    box(9.15,.3,5.58,.68,1.55+.22*Math.sin(t*.6),.035,'#ffd16a');
    box(9.15,2.18,5.6,.77,.45,.05,'#d4a15d');
    for(let i=0;i<2;i++){let x=11.6+i*2.1;cyl(x,0,4.1,.6,3.5+(i*.5),'#8c9ea4');cyl(x,3.45+i*.5,4.1,.68,.17,'#bbcad2');for(let j=0;j<3;j++)box(x,.75+j*.7,4.77,.75,.09,.08,'#edc281')}
    box(12.9,0,6.45,1.25,.65,1,'#a38459');box(11.35,0,6.45,1.1,.65,.9,'#7a98a4');
    label('PYROLYSIS OIL',8.9,3.8,4.35,'#ffe3a7');label('OPTIONAL UPGRADING',12.4,5.0,4.15,'#e9e7da');
  }
  function gasAndBurner(t){
    moduleFloor(3.3,5.4,7.4,5.1,'#395d56');
    for(let i=0;i<2;i++){cyl(1.8+i*2.1,0,5.2,.62,2.7,i?'#7cb4ac':'#86c2b2');cyl(1.8+i*2.1,2.66,5.2,.68,.16,'#abddd2');for(let k=0;k<4;k++)box(1.8+i*2.1+.55,1+k*.35,5.2,.12,.08,.48,'#528a8d')}
    box(5.5,0,5.2,1.7,1.65,1.6,'#607d76');box(5.5,1.57,5.2,1.9,.2,1.78,'#a8d7c0');
    for(let i=0;i<4;i++){let x=1.9+i*.9;box(x,3.1+Math.sin(t*2+i)*.04,5.2,.3,.1,.3,'#7ddcc5')}
    label('GAS CLEANING',3.0,3.75,5.2,'#aaf5d2');label('EXTERNAL HEAT LOOP',4.2,2.65,7,'#b4ebcf');
  }
  function charRecovery(t){
    moduleFloor(-4.2,5.2,6.3,5.3,'#494c53');
    // char discharge funnel and closed collection tank
    box(-5.2,0,5.2,2.7,2.1,2.5,'#68707b');box(-5.2,2.15,5.2,2.95,.19,2.8,'#a9a9ae');
    for(let i=0;i<11;i++){let xx=-5.9+(i%3)*.53,zz=5.55+Math.floor(i/3)*.39,yy=2.3+Math.sin(i)*.08;box(xx,yy,zz,.48,.33,.36,'#44434b')}
    box(-2.15,0,5.15,1.25,1.05,1.17,'#888b91');box(-2.15,1.1,5.15,1.35,.14,1.26,'#b6babd');
    for(let i=0;i<9;i++){let x=-6.5+((t*.5+i*.45)%3.3),z=3.85,yy=.74+Math.sin(t+i)*.08;box(x,yy,z,.21,.18,.25,'#5c5150')}
    label('CHAR COLLECTION',-4.15,3.5,5.2,'#d5d3da');label('TEST BEFORE USE',-4,2,7,'#d1cbd1');
  }
  const routes={
    dry:[[-12.1,1.2,-4],[-11.0,1.25,-4],[-8.1,1.25,-4],[-6.5,2.6,-4]],
    feed:[[-5.5,1.9,-4],[-3.9,1.9,-4],[-2.8,2.1,-4]],
    vapour:[[2.72,2.82,-4],[3.3,2.82,-4],[6.3,2.82,-4],[8.7,3.2,-4]],
    oil:[[10,1.25,-4],[10,1.25,-1.7],[9.2,2.2,-1.7],[9.2,2.2,3.2]],
    gas:[[11,3.75,-4],[12.7,4.25,-4],[12.7,4.25,1.6],[5.5,4.25,5.2],[1.85,3.45,5.2]],
    burner:[[1.8,2.35,5.2],[.5,2.35,5.2],[.5,1.15,2.0],[.2,1.15,-1.2]],
    char:[[-.9,1.0,-4],[-.9,.7,-.7],[-4.2,.7,-.7],[-4.2,2.75,3.2]],
    upgraded:[[10.1,1.2,4.35],[11.7,1.2,4.35]]
  };
  function staticPipes(t){
    pipe(routes.dry,'#86b0be',.11);flow(routes.dry,'#e1bc7f',t,10,.12,.11);
    pipe(routes.feed,'#a2b8c4',.12);flow(routes.feed,'#ecc087',t,6,.14,.11);
    pipe(routes.vapour,'#db8d68',.20);flow(routes.vapour,'#ffb377',t,13,.24,.14);
    pipe(routes.oil,'#c59b55',.16);flow(routes.oil,'#ffdc79',t,10,.22,.13);
    pipe(routes.gas,'#4bbaa3',.16);flow(routes.gas,'#81f3cb',t,14,.26,.13);
    pipe(routes.burner,'#429c82',.14);flow(routes.burner,'#6ff6c5',t,13,.22,.13);
    pipe(routes.char,'#76777b',.15);flow(routes.char,'#b5a9aa',t,9,.13,.1);
    pipe(routes.upgraded,'#d7b369',.1);flow(routes.upgraded,'#ffc967',t,6,.19,.10);
  }
  function stageHighlight(t){const s=STAGES[state.step],p=s.point;const radius=1.3+(t*.6%1.0)*1.1;rim(p[0],.14,p[1],radius,'#ffc47b');disk3(p[0],.04,p[1],2.0,'#ffbc83',.09);
    const pp=coords(p[0],3.9,p[1]);afterShapes.push({depth:1200,render(){ctx.fillStyle='#ffc17f';ctx.shadowBlur=15;ctx.shadowColor='#ffad71';ctx.beginPath();ctx.arc(pp.x,pp.y,5.2,0,Math.PI*2);ctx.fill();ctx.shadowBlur=0}})}
  function background(t){ctx.fillStyle='#0c1a25';ctx.fillRect(0,0,W,H);const g=ctx.createRadialGradient(W*.46,H*.53,2,W*.46,H*.53,W*.76);g.addColorStop(0,'#26424a');g.addColorStop(.58,'#152b37');g.addColorStop(1,'#071621');ctx.fillStyle=g;ctx.fillRect(0,0,W,H);
    ctx.strokeStyle='rgba(156,191,198,.045)';ctx.lineWidth=1;for(let i=0;i<W;i+=40){ctx.beginPath();ctx.moveTo(i,0);ctx.lineTo(i,H);ctx.stroke()}for(let j=0;j<H;j+=40){ctx.beginPath();ctx.moveTo(0,j);ctx.lineTo(W,j);ctx.stroke()}
  }
  function world(t){
    box(0,-.7,0,34.3,.64,17.3,'#1f3842',1,-6700);groundRect(0,0,33.9,16.9,'#344e56',-.01);
    groundRect(0,-4,32.9,5.85,'#3e565c',.0);groundRect(0,5,32.9,6,'#344f55',.0);
    for(let i=-15;i<=15;i+=2.5){groundRect(i,-7.3,1.3,.04,'#6a8790',.035);groundRect(i,8.0,1.3,.04,'#607e80',.035)}
    segregator(t);shredder(t);hopper(t);reactor(t);exchanger(t);condenser(t);oilAndUpgrading(t);gasAndBurner(t);charRecovery(t);
    staticPipes(t);stageHighlight(t);
  }
  function draw(t){if(!W||!H)return;background(t);sceneItems=[];afterShapes=[];world(t);
    sceneItems.sort((a,b)=>a.depth-b.depth);for(const v of sceneItems)v.render();afterShapes.sort((a,b)=>a.depth-b.depth);for(const v of afterShapes)v.render();
    hitMarks=STAGES.map((s,i)=>({i,p:coords(s.point[0],.6,s.point[1])}));
  }
  function cameraTick(delta,t){if(!state.dragging){let lerp=Math.min(1,delta*3.0);cam.yaw+=angleDelta(cam.yaw,cam.targetYaw)*lerp;cam.pitch=mix(cam.pitch,cam.targetPitch,lerp);cam.zoom=mix(cam.zoom,cam.targetZoom,lerp);cam.tx=mix(cam.tx,cam.targetX,lerp);cam.tz=mix(cam.tz,cam.targetZ,lerp)}if(state.orbit&&!state.dragging){cam.yaw+=delta*.16;cam.targetYaw=cam.yaw}}
  function angleDelta(a,b){return ((b-a+Math.PI*3)%(Math.PI*2))-Math.PI}
  let last=performance.now();function loop(now){const dt=clamp((now-last)/1000,0,.075);last=now;if(!state.paused)state.t+=dt*state.animationRate;cameraTick(dt,state.t);draw(state.t);requestAnimationFrame(loop)}requestAnimationFrame(loop);
  function focusStep(index,{narrate=true,scrollList=true,resetProgress=true}={}){state.step=(index+STAGES.length)%STAGES.length;const s=STAGES[state.step];
    cam.targetX=s.point[0]*.75;cam.targetZ=s.point[1]*.72;cam.targetZoom=s.zoom*1.3;
    cam.targetYaw=[.60,.66,.73,.69,.65,.70,.66,.79,.74][state.step];cam.targetPitch=[.75,.80,.78,.78,.82,.80,.75,.75,.79][state.step];
    stageButtons.forEach((el,i)=>{el.classList.toggle('active',i===state.step);el.setAttribute('aria-pressed',i===state.step?'true':'false')});if(scrollList)stageButtons[state.step].scrollIntoView({behavior:'smooth',block:'nearest'});
    $('captionNumb').textContent=String(state.step+1).padStart(2,'0')+' / 09';$('captionName').textContent=s.name;
    $('currentStepLabel').textContent=`STAGE ${String(state.step+1).padStart(2,'0')} OF 09`;
    $('progressFill').style.width=`${(state.step+1)/STAGES.length*100}%`;
    $('explainTitle').textContent=s.title;$('explainLead').textContent=s.lead;
    $('actionTitle').textContent=s.action;$('actionDesc').textContent=s.desc;
    $('whyTitle').textContent=s.why;$('whyDesc').textContent=s.because;
    $('lessonTitle').textContent=s.lesson;$('lessonDesc').textContent=s.takeaway;
    $('actionIcon').textContent=s.icon;
    if(narrate&&state.voice)speak(s.voice);
  }
  let recordedNarration=null;
  function stopSpeaking(){
    state.narrationId++;
    try{window.speechSynthesis?.cancel()}catch(e){}
    if(recordedNarration){recordedNarration.pause();recordedNarration.currentTime=0;recordedNarration=null}
  }
  function playRecorded(token){
    const filename=`./stage-${String(state.step+1).padStart(2,'0')}.mp3`;
    recordedNarration=new Audio(filename);recordedNarration.preload='auto';
    recordedNarration.onplay=()=>{if(token===state.narrationId)$('tourStatus').textContent='PLAYING NARRATION'};
    recordedNarration.onended=()=>{if(token===state.narrationId)$('tourStatus').textContent=state.autoplay?'GUIDED TOUR PLAYING':'READY TO EXPLORE'};
    recordedNarration.onerror=()=>{if(token===state.narrationId)$('tourStatus').textContent='AUDIO COULD NOT LOAD — SEE TEXT'};
    recordedNarration.play().catch(()=>{if(token===state.narrationId)$('tourStatus').textContent='CLICK HEAR THIS STAGE FOR AUDIO'});
  }
  function pickVoice(){const voices=window.speechSynthesis?.getVoices?.()||[];return voices.find(v=>v.lang==='en-IN'&&!/compact/i.test(v.name))||voices.find(v=>/^en-(GB|US|AU)/i.test(v.lang)&&/Natural|Google|Microsoft/i.test(v.name))||voices.find(v=>/^en/i.test(v.lang))||null}
  function speak(str){
    stopSpeaking();
    const token=state.narrationId;
    // Prefer a natural-sounding built-in English voice when available. Included
    // MP3 files provide narration when browser speech is missing or fails.
    const available=window.speechSynthesis?.getVoices?.()||[];
    if(!('speechSynthesis' in window)||!('SpeechSynthesisUtterance' in window)||!available.some(v=>/^en/i.test(v.lang))){playRecorded(token);return}
    const utt=new SpeechSynthesisUtterance(str);utt.lang='en-IN';utt.rate=1.04;utt.pitch=1;utt.volume=1;
    const v=pickVoice();if(v)utt.voice=v;
    utt.onstart=()=>{if(token===state.narrationId)$('tourStatus').textContent='VOICE NARRATING…'};
    utt.onend=()=>{if(token===state.narrationId)$('tourStatus').textContent=state.autoplay?'GUIDED TOUR PLAYING':'READY TO EXPLORE'};
    utt.onerror=()=>{if(token===state.narrationId)playRecorded(token)};
    try{window.speechSynthesis.speak(utt)}catch(e){playRecorded(token)}
  }
  function scheduleTour(){clearTimeout(state.autoTimer);if(!state.autoplay)return;state.autoTimer=setTimeout(()=>{if(!state.autoplay)return;if(state.step===STAGES.length-1){stopTour();return}focusStep(state.step+1,{narrate:true});scheduleTour()},16000)}
  function startTour(){stopTour(false);state.autoplay=true;state.voice=state.voice;state.orbit=false;$('tourIcon').textContent='Ⅱ';$('tourLabel').textContent='PAUSE GUIDED TOUR';$('tourStatus').textContent='GUIDED TOUR PLAYING';focusStep(0,{narrate:true});scheduleTour()}
  function stopTour(cancelVoice=true){state.autoplay=false;clearTimeout(state.autoTimer);state.autoTimer=null;if(cancelVoice)stopSpeaking();$('tourIcon').textContent='▶';$('tourLabel').textContent='START GUIDED TOUR';$('tourStatus').textContent='READY TO EXPLORE'}
  $('tourBtn').addEventListener('click',()=>state.autoplay?stopTour():startTour());
  $('voiceBtn').addEventListener('click',()=>{state.voice=!state.voice;$('voiceBtn').classList.toggle('active',state.voice);$('voiceBtn').setAttribute('aria-pressed',String(state.voice));$('voiceIcon').textContent=state.voice?'♫':'♩';$('voiceLabel').textContent=state.voice?'Voice on':'Voice off';if(!state.voice)stopSpeaking();else speak(STAGES[state.step].voice)});
  $('narrateBtn').addEventListener('click',()=>speak(STAGES[state.step].voice));
  $('motionBtn').addEventListener('click',()=>{state.paused=!state.paused;$('motionIcon').textContent=state.paused?'▶':'Ⅱ';$('motionLabel').textContent=state.paused?'Resume motion':'Pause motion';});
  stageButtons.forEach(b=>b.addEventListener('click',()=>{if(state.autoplay)stopTour();focusStep(+b.dataset.step,{narrate:true})}));
  $('resetCameraBtn').addEventListener('click',()=>{cam.targetZoom=1.05;cam.targetX=0;cam.targetZ=0;cam.targetYaw=.66;cam.targetPitch=.79;state.orbit=false;$('orbitBtn').style.color='';showCameraMessage('Overview camera restored')});
  $('orbitBtn').addEventListener('click',()=>{state.orbit=!state.orbit;$('orbitBtn').style.color=state.orbit?'#c8fa8b':'';showCameraMessage(state.orbit?'Auto orbit on':'Auto orbit off')});
  $('fullscreenBtn').addEventListener('click',async()=>{try{const el=$('scene').closest('.stage-window');if(!document.fullscreenElement){await el.requestFullscreen()}else await document.exitFullscreen();setTimeout(resize,160)}catch(e){showCameraMessage('Fullscreen unavailable in this browser')}});
  const modal=$('helpModal');$('helpBtn').addEventListener('click',()=>modal.showModal());
  let msgTimer=null;function showCameraMessage(str){const m=$('cameraNotice');m.textContent=str;m.classList.add('show');clearTimeout(msgTimer);msgTimer=setTimeout(()=>m.classList.remove('show'),1800)}
  function cursor(e){const r=canvas.getBoundingClientRect();return{x:e.clientX-r.left,y:e.clientY-r.top}}
  canvas.addEventListener('pointerdown',e=>{canvas.setPointerCapture(e.pointerId);const p=cursor(e);state.dragging=true;state.dragged=false;state.dragX=p.x;state.dragY=p.y;state.lastX=p.x;state.lastY=p.y});
  canvas.addEventListener('pointermove',e=>{const p=cursor(e);if(state.dragging){const dx=p.x-state.lastX,dy=p.y-state.lastY;if(Math.abs(p.x-state.dragX)>5||Math.abs(p.y-state.dragY)>5)state.dragged=true;cam.yaw+=dx*.009;cam.pitch=clamp(cam.pitch+dy*.005,.28,1.22);cam.targetYaw=cam.yaw;cam.targetPitch=cam.pitch;state.lastX=p.x;state.lastY=p.y;state.orbit=false;$('orbitBtn').style.color=''}else{const nearest=hitMarks.map(o=>({o,d:Math.hypot(p.x-o.p.x,p.y-o.p.y)})).sort((a,b)=>a.d-b.d)[0];const tip=$('hoverTooltip');if(nearest&&nearest.d<35){tip.hidden=false;tip.textContent=STAGES[nearest.o.i].name;tip.style.left=Math.min(W-150,p.x+12)+'px';tip.style.top=Math.max(42,p.y-10)+'px';canvas.style.cursor='pointer'}else{tip.hidden=true;canvas.style.cursor='grab'}}});
  canvas.addEventListener('pointerup',e=>{if(!state.dragging)return;state.dragging=false;const p=cursor(e);if(!state.dragged){const nearest=hitMarks.map(o=>({o,d:Math.hypot(p.x-o.p.x,p.y-o.p.y)})).sort((a,b)=>a.d-b.d)[0];if(nearest&&nearest.d<42){if(state.autoplay)stopTour();focusStep(nearest.o.i,{narrate:true})}}});
  canvas.addEventListener('pointercancel',()=>state.dragging=false);canvas.addEventListener('pointerleave',()=>{$('hoverTooltip').hidden=true});
  canvas.addEventListener('wheel',e=>{e.preventDefault();cam.targetZoom=clamp(cam.targetZoom+(e.deltaY<0?.10:-.10),.58,2.35)},{passive:false});
  let pinchStart=0;canvas.addEventListener('touchstart',e=>{if(e.touches.length===2)pinchStart=Math.hypot(e.touches[0].clientX-e.touches[1].clientX,e.touches[0].clientY-e.touches[1].clientY)},{passive:true});canvas.addEventListener('touchmove',e=>{if(e.touches.length===2&&pinchStart){const d=Math.hypot(e.touches[0].clientX-e.touches[1].clientX,e.touches[0].clientY-e.touches[1].clientY);cam.targetZoom=clamp(cam.targetZoom*d/pinchStart,.58,2.35);pinchStart=d}},{passive:true});
  document.addEventListener('keydown',e=>{if(e.target instanceof HTMLButtonElement)return;if(e.key==='ArrowRight'){if(state.autoplay)stopTour();focusStep(state.step+1,{narrate:false})}else if(e.key==='ArrowLeft'){if(state.autoplay)stopTour();focusStep(state.step-1,{narrate:false})}else if(e.key==='Escape'&&state.autoplay)stopTour()});
  // A deterministic rendering hook enables creation of narrated video snapshots without altering the app's interactivity.
  window.__PYRO_DEMO__={stages:STAGES.length,showStage(i,t=0){stopTour();focusStep(i,{narrate:false,scrollList:false});cam.yaw=cam.targetYaw;cam.pitch=cam.targetPitch;cam.zoom=cam.targetZoom;cam.tx=cam.targetX;cam.tz=cam.targetZ;state.t=t;draw(state.t)},canvas,stopTour};
  focusStep(0,{narrate:false});cam.targetX=0;cam.targetZ=0;cam.targetZoom=1.05;cam.targetYaw=.66;cam.targetPitch=.79;window.addEventListener('load',()=>{resize();setTimeout(()=>showCameraMessage('Drag to rotate • Click any stage'),600)});
})();
