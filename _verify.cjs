const https = require('https');
const base = 'https://openskill-galaxy.github.io/module-digital-logic/data/';
const files = ['courses','lessons','knowledge-points','questions','exams','cases','routes','glossary','faqs'];
let done = 0;
for (const f of files) {
  https.get(base+f+'.json', res => {
    let d=''; res.on('data',c=>d+=c); res.on('end',()=>{
      try { console.log(f+': '+JSON.parse(d).length); } catch(e){ console.log(f+': parse err'); }
      if(++done===files.length) console.log('\nAll verified');
    });
  });
}
