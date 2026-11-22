const {chromium}=require('playwright');const fs=require('fs');
const f={feed:{H:1350,PADT:46,PADB:56,LOGOW:180,G1:34,KS:22,BS:196,G2:14,G3:20,SS:30,G4:44,R:260,POS:'50% 62%',RW:220,RT:40},
 stories:{H:1920,PADT:220,PADB:280,LOGOW:200,G1:40,KS:24,BS:220,G2:18,G3:24,SS:32,G4:56,R:300,POS:'30% 60%',RW:230,RT:40}};
(async()=>{const b=await chromium.launch();
for(const [k,v] of Object.entries(f)){const p=await b.newPage({viewport:{width:1080,height:v.H}});
 let h=fs.readFileSync('dia-oficial.html','utf8');for(const [kk,vv] of Object.entries(v)) h=h.split(`{{${kk}}}`).join(vv);
 fs.writeFileSync('tmp.html',h);await p.goto('file://'+process.cwd()+'/tmp.html');await p.waitForLoadState('networkidle');await p.evaluate(()=>document.fonts.ready);
 await p.screenshot({path:`zemora-bf5${k==='feed'?'':'-stories'}.png`});await p.close();}
await b.close();fs.unlinkSync('tmp.html');})();
