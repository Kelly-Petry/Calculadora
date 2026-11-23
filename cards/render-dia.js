const {chromium}=require('playwright');const fs=require('fs');
const f={feed:{H:1350,PADT:70,PADB:60,KS:24,G1:22,BS:190,BL:150,BT:150,BP:22,BPX:34,LW:210,G2:24,SS:44,G3:24,POS:'50% 58%',G4:20,CW:780,RW:210,RT:60},
 stories:{H:1920,PADT:240,PADB:290,KS:26,G1:26,BS:220,BL:150,BT:156,BP:24,BPX:36,LW:220,G2:30,SS:48,G3:40,POS:'50% 58%',G4:30,CW:900,RW:220,RT:60}};
(async()=>{const b=await chromium.launch();
for(const [k,v] of Object.entries(f)){const p=await b.newPage({viewport:{width:1080,height:v.H}});
 let h=fs.readFileSync('dia-oficial.html','utf8');for(const [kk,vv] of Object.entries(v)) h=h.split(`{{${kk}}}`).join(vv);
 fs.writeFileSync('tmp.html',h);await p.goto('file://'+process.cwd()+'/tmp.html');await p.waitForLoadState('networkidle');await p.evaluate(()=>document.fonts.ready);
 await p.screenshot({path:`zemora-bf5${k==='feed'?'':'-stories'}.png`});await p.close();}
await b.close();fs.unlinkSync('tmp.html');})();
