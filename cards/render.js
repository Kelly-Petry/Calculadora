const {chromium}=require('playwright');const fs=require('fs');
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:1080,height:1350}});
const tpl=fs.readFileSync('card.html','utf8');
for(const [n,pos] of [['foto1','55% 26%'],['foto2','45% 32%']]){
 fs.writeFileSync('tmp.html',tpl.replace('FOTO',n+'.jpg').replace('var(--pos)',pos));
 await p.goto('file://'+process.cwd()+'/tmp.html');await p.waitForLoadState('networkidle');await p.evaluate(()=>document.fonts.ready);
 await p.screenshot({path:`zemora-bf-${n}.png`});}
await b.close();fs.unlinkSync('tmp.html');})();
