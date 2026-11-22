const {chromium}=require('playwright');const fs=require('fs');
const jobs=[['card.html',1350,'zemora-bf',{foto1:'55% 26%',foto2:'45% 32%'}],
            ['story.html',1920,'zemora-bf-stories',{foto1:'55% 50%',foto2:'45% 50%'}]];
(async()=>{const b=await chromium.launch();
for(const [file,h,prefix,pos] of jobs){
 const p=await b.newPage({viewport:{width:1080,height:h}});const tpl=fs.readFileSync(file,'utf8');
 for(const n of ['foto1','foto2']){
  fs.writeFileSync('tmp.html',tpl.replace('FOTO',n+'.jpg').replace('var(--pos)',pos[n]));
  await p.goto('file://'+process.cwd()+'/tmp.html');await p.waitForLoadState('networkidle');await p.evaluate(()=>document.fonts.ready);
  await p.screenshot({path:`${prefix}-${n}.png`});}
 await p.close();}
await b.close();fs.unlinkSync('tmp.html');})();
