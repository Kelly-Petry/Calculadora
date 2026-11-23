const {chromium}=require('playwright');const fs=require('fs');
const chips=s=>`<div class="chips">${s.split(', ').map(w=>`<span class="hl">${w[0].toUpperCase()+w.slice(1)}</span>`).join('')}</div>`;
const cards=[
 {n:1,foto:'orelha-mix.jpg',pos:'50% 40%',v:'top:470px',ts:104,body:`<h1>Dourado<br>ou prata?</h1><div class="sub"><span>Entenda a mensagem que cada cor comunica</span></div>`},
 {n:2,logo:'logo-zemora-verde.png',foto:'aneis-dourados-mao.jpg',pos:'50% 30%',img:'position:absolute;width:1350px;height:1800px;left:-180px;top:-40px;object-fit:cover',v:'top:190px',ts:130,body:`<h1>DOURADO</h1>`+chips('credibilidade, sofisticação, elegância, nobreza, tradição')},
 {n:3,foto:'aneis-prata.jpg',pos:'50% 35%',v:'top:190px',ts:130,body:`<h1>PRATA</h1>`+chips('modernidade, jovialidade, frescor, autenticidade, inovação')},
 {n:4,logo:'logo-zemora-verde.png',foto:'pulseira1.jpg',pos:'50% 30%',v:'top:190px',ts:130,body:`<h1>MIX</h1>`+chips('personalidade, equilíbrio, modernidade, estilo, ousadia')},
 {n:5,foto:'pulseira2.jpg',pos:'50% 72%',v:'top:200px',ts:84,body:`<h1>Salve e compartilhe<br>com as suas amigas!</h1>`},
];
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:1080,height:1350}});
for(const c of cards){ if(process.argv[2]&&+process.argv[2]!==c.n) continue;
 const h=fs.readFileSync('carrossel.html','utf8').replace('{{POS}}',c.pos).replace('{{VPOS}}',c.v).replace('{{TS}}',c.ts).replace('{{FOTO}}',c.foto).replace('{{BODY}}',c.body).replace('{{IMGSTYLE}}',c.img||'').replace('{{LOGO}}',c.logo||'logo-zemora-creme.png');
 fs.writeFileSync('tmp.html',h);await p.goto('file://'+process.cwd()+'/tmp.html');await p.waitForLoadState('networkidle');await p.evaluate(()=>document.fonts.ready);
 await p.screenshot({path:`zemora-dourado-prata-${c.n}.png`});}
await b.close();fs.unlinkSync('tmp.html');})();
