import React,{useEffect,useState,useCallback} from 'react';
const root='/_cdn/static/';
export default function OriginalArteSobreAsCordas(){
 const [html,setHtml]=useState(''),[route,setRoute]=useState('index'),[error,setError]=useState('');
 const [assets,setAssets]=useState<{css:string,config:string,app:string}|null>(null);
 useEffect(()=>{Promise.all(['cordas-styles.css','cordas-site-config.js','cordas-app.js'].map(async p=>{const r=await fetch(root+p);if(!r.ok)throw Error(p+' HTTP '+r.status);return r.text()})).then(([css,config,app])=>setAssets({css,config,app})).catch(e=>setError(String(e)))},[]);
 useEffect(()=>{if(!assets)return;let active=true;fetch(root+(route==='index'?'cordas-index.html':'cordas-'+route+'-index.html')).then(async r=>{if(!r.ok)throw Error('Página '+route+' HTTP '+r.status);return r.text()}).then(page=>{if(!active)return;let s=page.replace(/<meta[^>]*http-equiv="Content-Security-Policy"[^>]*>/i,'');s=s.replace('<link rel="stylesheet" href="'+root+'cordas-styles.css">','<style>'+assets.css+'</style>');s=s.replace('<script defer src="'+root+'cordas-site-config.js"></script>','<script>'+assets.config+'</script>');s=s.replace('<script defer src="'+root+'cordas-app.js"></script>','');s=s.replace('</body>','<script>'+assets.app+'</script></body>');setHtml(s)}).catch(e=>setError(String(e)));return()=>{active=false}},[route,assets]);

 const onLoad=useCallback((event:React.SyntheticEvent<HTMLIFrameElement>)=>{
  const frame=event.currentTarget,doc=frame.contentDocument;
  if(!doc)return;
  const dialog=doc.querySelector('#search-dialog') as HTMLDialogElement|null;
  const searchButton=doc.querySelector('.search-toggle');
  const searchInput=doc.querySelector('#search-input') as HTMLInputElement|null;
  const results=doc.querySelector('#search-results');
  const status=doc.querySelector('#search-status');
  const form=doc.querySelector('#site-search');
  const normalize=(value:string)=>value.normalize('NFD').split('').filter(c=>c.charCodeAt(0)<768||c.charCodeAt(0)>879).join('').toLowerCase();
  const search=()=>{
   if(!searchInput||!results||!status)return;
   const query=normalize(searchInput.value.trim().slice(0,120));
   const terms=query.split(' ').filter(Boolean);
   const index=doc.defaultView?.schoolConfig?.searchIndex||[];
   const matches=terms.length?index.filter((item:{title:string,description:string})=>terms.every((term:string)=>normalize(item.title+' '+item.description).includes(term))):[];
   results.replaceChildren();
   for(const item of matches){
    const li=doc.createElement('li'),link=doc.createElement('a'),title=doc.createElement('strong'),desc=doc.createElement('span');
    link.href=item.url;title.textContent=item.title;desc.textContent=item.description;
    link.append(title,desc);li.append(link);results.append(li);
   }
   status.textContent=!query?'Digite para encontrar cursos, páginas e outras partes do site.':matches.length?matches.length+' resultado(s) encontrado(s).':'Nenhum resultado encontrado. Experimente outro termo.';
  };
  searchButton?.addEventListener('click',()=>{
   if(dialog&&!dialog.open)dialog.showModal();
   search();searchInput?.focus();
  },true);
  searchInput?.addEventListener('input',search);
  form?.addEventListener('submit',e=>{e.preventDefault();search();results?.querySelector('a')?.focus()},true);
  doc.querySelector('.search-close')?.addEventListener('click',()=>dialog?.close(),true);
  doc.addEventListener('click',e=>{
   const t=e.target as Element|null;
   const a=t?.closest?.('a[href]') as HTMLAnchorElement|null;
   if(!a)return;
   const href=a.getAttribute('href')||'';
   const match=href.startsWith('/_cdn/static/cordas-')&&href.includes('-index.html')?href.slice('/_cdn/static/cordas-'.length).split('-index.html')[0]:null;
   const local=href.startsWith('/')&&!href.startsWith('//')?href.slice(1).split('/')[0].split('#')[0]:null;
   const next=match||local;
   const fragment=href.includes('#')?'#'+href.split('#')[1]:'';
   if(next){
    e.preventDefault();dialog?.close();
    if(route===next){if(fragment.startsWith('#'))doc.getElementById(fragment.slice(1))?.scrollIntoView({behavior:'smooth'});else frame.contentWindow?.scrollTo(0,0)}
    else {setHtml('');setRoute(next)}
   }
  },true);
 },[route]);
 if(error)return <div style={{padding:40}}>Erro ao carregar site original: {error}</div>;
 if(!html)return <div style={{minHeight:'100vh',background:'#f6f0e7',display:'grid',placeItems:'center',fontFamily:'Arial',color:'#4b3227'}}>Carregando Arte Sobre as Cordas…</div>;
 return <iframe key={route} onLoad={onLoad} title="Arte Sobre as Cordas — site original" srcDoc={html} sandbox="allow-scripts allow-same-origin allow-popups allow-popups-to-escape-sandbox allow-forms" style={{position:'fixed',inset:0,width:'100%',height:'100%',border:0,background:'#f6f0e7',zIndex:10}}/>;
}

