const fs=require('fs'),d='public/data';
const courses=JSON.parse(fs.readFileSync(d+'/courses.json','utf8'));
const lessons=JSON.parse(fs.readFileSync(d+'/lessons.json','utf8'));
const byCourse={};
lessons.forEach(l=>{byCourse[l.courseId]=(byCourse[l.courseId]||0)+1});
for(const c of courses){
  const lc=byCourse[c.id]||0;
  const ref=c.lessons?c.lessons.length:0;
  if(lc===0||ref===0) console.log(`EMPTY: ${c.id} "${c.title}" lessons_ref=${ref} lessons_actual=${lc}`);
  else console.log(`OK:    ${c.id} "${c.title}" lessons_ref=${ref} lessons_actual=${lc}`);
}
console.log('\nTotal lessons:',lessons.length);
console.log('Max lesson id:',lessons.reduce((m,l)=>l.id>m?l.id:m,''));
