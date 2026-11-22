const {chromium}=require('playwright');const fs=require('fs');
const f={feed:{H:1350,PADT:44,PADB:48,LOGOW:170,GAP1:26,KS:20,TS:50,GAP2:30,ROWS:'1fr 1.15fr',QS:34,CS:22},
 stories:{H:1920,PADT:230,PADB:290,LOGOW:200,GAP1:30,KS:22,TS:56,GAP2:36,ROWS:'1fr 1.15fr',QS:38,CS:24}};
(async()=>{const b=await chromium.launch();
for(const [k,v] of Object.entries(f)){const p=await b.newPage({viewport:{width:1080,height:v.H}});
 let h=fs.readFileSync('collage.html','utf8');for(const [kk,vv] of Object.entries(v)) h=h.split(`{{${kk}}}`).join(vv);
 fs.writeFileSync('tmp.html',h);await p.goto('file://'+process.cwd()+'/tmp.html');await p.waitForLoadState('networkidle');await p.evaluate(()=>document.fonts.ready);
 await p.screenshot({path:`zemora-bf3${k==='feed'?'':'-stories'}.png`});await p.close();}
await b.close();fs.unlinkSync('tmp.html');})();
