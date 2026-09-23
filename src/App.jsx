import React,{useEffect,useMemo,useState}from"react";
import{ArrowLeft,ArrowRight,Search}from"lucide-react";
import{posts}from"./content";

const cats=["Cadernos","Cartas para minha filha"];
const fmt=(d,l)=>d?new Intl.DateTimeFormat("pt-BR",{day:"2-digit",month:"short",year:"numeric",timeZone:"UTC"}).format(new Date(d.length===7?d+"-01T00:00:00Z":d+"T00:00:00Z")):l;
function go(x){history.pushState({},"",x);dispatchEvent(new PopStateEvent("popstate"));scrollTo(0,0)}
const L=({to,children,className})=><a href={to} className={className} onClick={e=>{e.preventDefault();go(to)}}>{children}</a>;
const byDate=(a,b)=>(b.date||"").localeCompare(a.date||"");

export default function App(){
  const[path,setPath]=useState(location.pathname);
  useEffect(()=>{const f=()=>setPath(location.pathname);addEventListener("popstate",f);return()=>removeEventListener("popstate",f)},[]);
  const m=path.match(/^\/texto\/([^/]+)/),p=m&&posts.find(x=>x.slug===m[1]);
  return p?<Article p={p}/>:<Home/>;
}

function Header(){return <header className="head wrap"><L to="/" className="brand">Writer's Block</L><nav><a href="#cadernos">Cadernos</a><a href="#cartas">Cartas para minha filha</a><a href="#sobre">Sobre</a><a href="#contato">Contato</a></nav></header>}

function Home(){
  const[q,setQ]=useState("");
  const[archiveCat,setArchiveCat]=useState(null);
  const cadernos=useMemo(()=>posts.filter(p=>p.category==="Cadernos").sort(byDate),[]);
  const cartas=useMemo(()=>posts.filter(p=>p.category==="Cartas para minha filha").sort(byDate),[]);
  const archive=useMemo(()=>archiveCat?posts.filter(p=>p.category===archiveCat&&JSON.stringify(p).toLowerCase().includes(q.toLowerCase())).sort(byDate):[],[archiveCat,q]);
  const openArchive=cat=>{setArchiveCat(cat);setQ("");setTimeout(()=>document.querySelector('#acervo')?.scrollIntoView(),0)};
  const closeArchive=()=>{setArchiveCat(null);setQ("");scrollTo(0,0)};
  return <><Header/>
    <section className="hero wrap"><small>BERNARDO CALDEIRA</small><h1>Writer's<br/>Block.</h1><p>Observações sobre vida, memória, trabalho e tudo aquilo que transbordou em algum momento e virou palavras.</p></section>
    {!archiveCat&&<>
      <PreviewSection id="cadernos" eyebrow="ÚLTIMOS CADERNOS" title="Cadernos" description="Anotações de percurso. Ideias, histórias e observações recolhidas ao longo da caminhada." items={cadernos.slice(0,2)} onAll={()=>openArchive("Cadernos")}/>
      <PreviewSection id="cartas" eyebrow="ÚLTIMAS CARTAS" title="Cartas para minha filha" description="Memórias que ela talvez não lembre, pelos olhos do pai." items={cartas.slice(0,2)} onAll={()=>openArchive("Cartas para minha filha")}/>
    </>}
    {archiveCat&&<section id="acervo" className="archive"><div className="wrap"><button className="text-button" onClick={closeArchive}><ArrowLeft size={16}/> Voltar à página inicial</button><div className="tools"><div><small>ACERVO</small><h2>{archiveCat}</h2><p>{archive.length} textos</p></div><label><Search size={16}/><input placeholder="Buscar no acervo" value={q} onChange={e=>setQ(e.target.value)}/></label></div>{archive.map(p=><PostRow key={p.slug} p={p}/>)}</div></section>}
    <section id="sobre" className="about wrap"><small>SOBRE</small><p>Um arquivo autoral de Bernardo Rodrigues Caldeira. Trazendo sempre o combinado de ser atualizado quando houver algo relevante a ser dito.</p></section>
    <section id="contato" className="contact wrap"><small>FALE COM O AUTOR</small><p>Se você chegou até aqui, provavelmente alguma coisa nos textos chamou sua atenção e você se identificou.</p><p>Ideias, histórias e conversas são bem-vindas.</p><a className="contact-link" href="mailto:writersblockbrc@gmail.com">Escreva para o autor.</a></section>
    <Footer/>
  </>;
}

function PreviewSection({id,eyebrow,title,description,items,onAll}){return <section id={id} className="archive preview"><div className="wrap"><div className="section-heading"><div><small>{eyebrow}</small><h2>{title}</h2><p>{description}</p></div><button className="view-all" onClick={onAll}>Ver todos <ArrowRight size={17}/></button></div>{items.map(p=><PostRow key={p.slug} p={p}/>)}</div></section>}

function PostRow({p}){return <article className="row"><div><small>{p.category}</small><p>{fmt(p.date,p.displayDate)}</p></div><div><L to={'/texto/'+p.slug}><h3>{p.title}</h3></L><p>{p.excerpt}</p></div><L to={'/texto/'+p.slug} className="round"><ArrowRight/></L></article>}

function Article({p}){return <><Header/><article className="article wrap"><L to="/" className="back"><ArrowLeft size={16}/> Voltar ao acervo</L><small>{p.category} · {fmt(p.date,p.displayDate)}</small><h1>{p.title}</h1><p className="by">{p.authors}</p><div className="body" dangerouslySetInnerHTML={{__html:p.content}}/><aside><b>Origem</b><p>{p.origins.join(" e ")}</p>{p.sourceUrl&&<a href={p.sourceUrl} target="_blank" rel="noreferrer">Ver publicação original</a>}</aside></article><Footer/></>}
function Footer(){return <footer>Writer's Block · Bernardo Rodrigues Caldeira</footer>}
