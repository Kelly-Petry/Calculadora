// Gera os cards da Zemora: node render.js [nome-do-card]
const {chromium}=require('playwright');const fs=require('fs');
const cards={
 'bf':{foto:['foto1','foto2'],kick:'',h1:'O brilho que você ama, com <em>oportunidades imperdíveis!</em>',p:'Nossa Black Friday já começou. Aproveite!',
       pos:{feed:{foto1:'55% 26%',foto2:'45% 32%'},stories:{foto1:'55% 50%',foto2:'45% 50%'}}},
 'bf2':{foto:['foto3'],kick:'Não deixe para depois!',style:'overlay',h1:['A Black está','<em>acontecendo!</em>'],h1size:100,p:'Aproveite enquanto a oportunidade está disponível.',
       pos:{feed:{foto3:'50% 60%'},stories:{foto3:'10% 50%'}}},
};
const formats=[['feed','card.html',1350,''],['stories','story.html',1920,'-stories']];
const only=process.argv[2];
(async()=>{const b=await chromium.launch();
for(const [name,c] of Object.entries(cards)){ if(only&&only!==name) continue;
 for(const [fmt,file,h,suf] of formats){
  const p=await b.newPage({viewport:{width:1080,height:h}});
  for(const n of c.foto){
   const many=c.foto.length>1?`-${n}`:'';
   let html;
   if(c.style==='overlay'){
     html=fs.readFileSync('overlay.html','utf8').replace(/{{H}}/g,h).replace('{{FOTO}}',n+'.jpg').replace('{{POS}}',c.pos[fmt][n])
      .replace('{{LOGOTOP}}',fmt==='feed'?56:230).replace('{{LOGOLEFT}}',fmt==='feed'?56:60).replace('{{BOTTOM}}',fmt==='feed'?230:560).replace('{{PSIZE}}',fmt==='feed'?30:32).replace('{{KSIZE}}',fmt==='feed'?26:28).replace('{{H1SIZE}}',c.h1size)
      .replace('{{KICK}}',c.kick?`<div class="kick"><span class="hl">${c.kick}</span></div>\n`:'')
      .replace('{{H1}}',c.h1.join('<br>')).replace('{{P}}',c.p);
   } else html=fs.readFileSync(file,'utf8').replace('FOTO',n+'.jpg').replace('var(--pos)',c.pos[fmt][n])
     .replace('{{KICK}}',c.kick?` <div class="kick">${c.kick}</div>\n`:'').replace('{{SHIFT}}',c.shift??(c.kick?-46:0)).replace('<h1>',c.h1size?`<h1 style="font-size:${c.h1size}px;line-height:1">`:'<h1>')
     .replace('{{H1}}',c.h1).replace('{{P}}',c.p);
   fs.writeFileSync('tmp.html',html);
   await p.goto('file://'+process.cwd()+'/tmp.html');await p.waitForLoadState('networkidle');await p.evaluate(()=>document.fonts.ready);
   await p.screenshot({path:`zemora-${name}${suf}${many}.png`});}
  await p.close();}}
await b.close();fs.unlinkSync('tmp.html');})();
