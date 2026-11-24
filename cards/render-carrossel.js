const {chromium}=require('playwright');const fs=require('fs');
const chips=s=>`<div class="chips">${s.split(', ').map(w=>`<span class="hl">${w[0].toUpperCase()+w.slice(1)}</span>`).join('')}</div>`;
const sets={dp:[
 {n:1,foto:'orelha-mix.jpg',pos:'50% 40%',v:'top:470px',ts:104,body:`<h1>Dourado<br>ou prata?</h1><div class="sub"><span>Entenda a mensagem que cada cor comunica</span></div>`},
 {n:2,logo:'logo-zemora-verde.png',foto:'aneis-dourados-mao.jpg',pos:'50% 30%',img:'position:absolute;width:1350px;height:1800px;left:-180px;top:-40px;object-fit:cover',v:'top:190px',ts:130,body:`<h1>DOURADO</h1>`+chips('credibilidade, sofisticação, elegância, nobreza, tradição')},
 {n:3,foto:'aneis-prata.jpg',pos:'50% 35%',v:'top:190px',ts:130,body:`<h1>PRATA</h1>`+chips('modernidade, jovialidade, frescor, autenticidade, inovação')},
 {n:4,logo:'logo-zemora-verde.png',foto:'pulseira1.jpg',pos:'50% 30%',v:'top:190px',ts:130,body:`<h1>MIX</h1>`+chips('personalidade, equilíbrio, modernidade, estilo, ousadia')},
 {n:5,foto:'pulseira2.jpg',pos:'50% 72%',v:'top:200px',ts:84,body:`<h1>Salve e compartilhe<br>com as suas amigas!</h1>`},
],
 ac:[
 {n:1,foto:'ac-capa.jpg',pos:'50% 78%',v:'bottom:90px',ts:80,body:`<h1>Acessórios que você<br>não sabia que precisava</h1><div class="sub"><span>(até agora)</span></div>`},
 {n:2,logo:'logo-zemora-verde.png',foto:'ac-colar.jpg',pos:'50% 50%',v:'top:-999px',ts:0,body:''},
 {n:3,logo:'logo-zemora-verde.png',foto:'ac-aneis-dourados.jpg',pos:'50% 55%',v:'top:-999px',ts:0,body:''},
 {n:4,logo:'logo-zemora-verde.png',foto:'ac-aneis-prata.jpg',pos:'50% 55%',v:'top:-999px',ts:0,body:''},
 {n:5,logo:'logo-zemora-verde.png',foto:'ac-tornozeleira.jpg',pos:'50% 50%',v:'bottom:70px',ts:0,body:`<span class="hl" style="font:600 34px/1 Montserrat;letter-spacing:.2em;padding:26px 44px 26px 50px">ACESSE O LINK DA BIO</span>`},
],
 bf6:[
 {n:1,logo:'logo-zemora-verde.png',foto:'bf6-pescoco.jpg',pos:'50% 35%',v:'top:175px',ts:104,body:`<div class="kick-thin">BLACK FRIDAY ZEMORA</div><h1 class="dark thin">Joias com<br>até <b>30% off</b></h1><div class="sub thin-sub"><span>de 23 a 28/11</span></div>`},
 {n:2,logo:'logo-zemora-verde.png',foto:'bf6-coracao.jpg',pos:'50% 50%',v:'top:-999px',ts:0,body:''},
 {n:3,logo:'logo-zemora-verde.png',foto:'bf6-argolas.jpg',pos:'50% 50%',v:'top:-999px',ts:0,body:''},
 {n:4,logo:'logo-zemora-verde.png',foto:'bf6-arvore.jpg',pos:'50% 50%',img:'filter:blur(30px) brightness(1.02);transform:scale(1.15)',v:'top:-999px',ts:0,body:`<div style="position:fixed;left:0;bottom:0;width:1080px;height:1080px;background:url(bf6-arvore.jpg) center/cover;-webkit-mask-image:linear-gradient(to bottom,transparent 0,#000 160px)"></div>`},
 {n:5,logo:'logo-zemora-verde.png',foto:'bf6-arvore-pescoco.jpg',pos:'50% 100%',v:'bottom:80px',ts:0,body:`<div class="kick-thin" style="color:#0f4a33">GARANTA A SUA</div><div class="thin-chips">`+chips('Shopee, TikTok Shop, Amazon, Mercado Livre')+`</div>`},
 ],
 precos:[
 {n:1,logo:'logo-zemora-verde.png',foto:'ac-aneis-prata.jpg',pos:'50% 55%',v:'top:800px',ts:0,body:`<div class="midbox">Encontre o presente perfeito<br>por menos de <b>R$ 100,00</b></div>`},
 {n:2,logo:'logo-zemora-verde.png',foto:'preco-1.jpg',pos:'50% 45%',v:'bottom:110px',ts:0,body:`<span class="price">R$ 42,90</span>`},
 {n:3,logo:'logo-zemora-verde.png',foto:'preco-2.jpg',pos:'50% 50%',v:'bottom:110px',ts:0,body:`<span class="price">R$ 52,90</span>`},
 {n:4,logo:'logo-zemora-verde.png',foto:'preco-3.jpg',pos:'50% 50%',v:'bottom:110px',ts:0,body:`<span class="price">R$ 75,90</span>`},
 {n:5,foto:'preco-4.jpg',pos:'50% 50%',v:'bottom:110px',ts:0,body:`<span class="price">R$ 45,90</span>`},
 {n:6,foto:'preco-cta.jpg',pos:'50% 50%',v:'bottom:110px',ts:0,body:`<span class="hl" style="font:600 34px/1 Montserrat;letter-spacing:.2em;padding:26px 44px 26px 50px">ACESSE O LINK DA BIO</span>`},
 ],
 final:[
 {n:1,logo:'logo-zemora-verde.png',foto:'bf6-pescoco.jpg',pos:'50% 35%',v:'top:190px',ts:110,body:`<h1 class="dark thin">Black Friday<br><b>Zemora</b></h1><div class="sub thin-sub"><span>de 23 a 28 de novembro</span></div>`},
 ]};
const set=process.argv[3]||'dp';const prefix={dp:'zemora-dourado-prata',ac:'zemora-acessorios',bf6:'zemora-bf-ofertas',precos:'zemora-precos',final:'zemora-bf-final'}[set];const cards=sets[set];
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:1080,height:1350}});
for(const c of cards){ if(process.argv[2]&&process.argv[2]!=='all'&&+process.argv[2]!==c.n) continue;
 const h=fs.readFileSync('carrossel.html','utf8').replace('{{POS}}',c.pos).replace('{{VPOS}}',c.v).replace('{{TS}}',c.ts).replace('{{FOTO}}',c.foto).replace('{{BODY}}',c.body).replace('{{IMGSTYLE}}',c.img||'').replace('{{LOGO}}',c.logo||'logo-zemora-creme.png');
 fs.writeFileSync('tmp.html',h);await p.goto('file://'+process.cwd()+'/tmp.html');await p.waitForLoadState('networkidle');await p.evaluate(()=>document.fonts.ready);
 await p.screenshot({path:`${prefix}-${c.n}.png`});}
await b.close();fs.unlinkSync('tmp.html');})();
