import React, { useEffect, useMemo, useState } from "react";
import { ArrowLeft, ArrowRight, Search, X } from "lucide-react";
import { motion } from "framer-motion";
import { posts } from "./content";

const collections = [
  ["Crônicas", "Histórias do cotidiano, memórias e outras coisas que mereceram ser contadas."],
  ["Reflexões", "Trabalho, tecnologia, comportamento, vida e outros assuntos que transbordaram em forma de escrita."],
  ["Cartas para minha filha", "Memórias que ela talvez não lembre, pelos olhos do pai."],
];
const formatDate=(value,label)=>{
  if(!value) return label || "Blog antigo";
  const [y,m,d]=value.split('-');
  if(!d) return m ? `${m}/${y}` : y;
  return new Intl.DateTimeFormat('pt-BR',{day:'2-digit',month:'short',year:'numeric',timeZone:'UTC'}).format(new Date(`${value}T00:00:00Z`));
};
const hrefFor=(p)=>`/texto/${p.slug}`;
function navigate(path){ history.pushState({},'',path); window.dispatchEvent(new PopStateEvent('popstate')); window.scrollTo(0,0); }
function Link({to,children,className,onClick}){ return <a href={to} className={className} onClick={(e)=>{e.preventDefault();onClick?.();navigate(to)}}>{children}</a> }

export default function App(){
 const [path,setPath]=useState(location.pathname);
 useEffect(()=>{const f=()=>setPath(location.pathname); addEventListener('popstate',f); return()=>removeEventListener('popstate',f)},[]);
 const match=path.match(/^\/texto\/([^/]+)\/?$/);
 const post=match ? posts.find(p=>p.slug===decodeURIComponent(match[1])) : null;
 if(post) return <Article post={post}/>;
 return <Home/>;
}

function Header(){return <header className="site-header container"><Link className="brand" to="/">Writer's Block</Link><nav><Link to="/#textos">Textos</Link><Link to="/#colecoes">Coleções</Link><Link to="/#sobre">Sobre</Link></nav></header>}

function Home(){
 const [query,setQuery]=useState(''); const [category,setCategory]=useState('Todos');
 useEffect(()=>{if(location.hash) setTimeout(()=>document.querySelector(location.hash)?.scrollIntoView(),0)},[]);
 const visible=useMemo(()=>posts.filter(p=>(category==='Todos'||p.category===category)&&`${p.category} ${p.title} ${p.excerpt}`.toLowerCase().includes(query.toLowerCase())),[query,category]);
 return <main><Header/><section className="hero container"><motion.div initial={{opacity:0,y:16}} animate={{opacity:1,y:0}} transition={{duration:.55}}><p className="eyebrow">Bernardo Caldeira</p><h1>Writer's<br/>Block.</h1><p className="tagline">Textos sobre trabalho, vida, memória e tudo aquilo que transbordou e virou palavras.</p></motion.div></section>
 <section id="textos" className="archive-wrap"><div className="container archive"><div className="archive-heading"><div><p className="muted-label">Arquivo</p><h2>{category==='Todos'?'Todos os textos':category}</h2><p className="count">{visible.length} {visible.length===1?'texto':'textos'}</p></div><label className="search"><Search size={16}/><input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Buscar no acervo"/>{query&&<button onClick={()=>setQuery('')} aria-label="Limpar"><X size={15}/></button>}</label></div>
 <div className="filters">{['Todos',...collections.map(c=>c[0])].map(c=><button key={c} className={category===c?'active':''} onClick={()=>setCategory(c)}>{c}</button>)}</div>
 <div className="post-list">{visible.map((p,i)=><motion.article key={p.slug} initial={{opacity:0}} whileInView={{opacity:1}} viewport={{once:true}} transition={{delay:Math.min(i*.025,.25)}} className="post"><div><p className="category">{p.category}</p><p className="date">{formatDate(p.date,p.displayDate)}</p></div><div><Link to={hrefFor(p)}><h3>{p.title}</h3></Link><p>{p.excerpt}</p><p className="origin">{p.origins.join(' · ')}</p></div><Link className="read" to={hrefFor(p)}><ArrowRight size={18}/></Link></motion.article>)}{!visible.length&&<p className="empty">Nenhum texto encontrado.</p>}</div></div></section>
 <section id="colecoes" className="container collections">{collections.map(([t,d])=><button className="collection" key={t} onClick={()=>{setCategory(t);setTimeout(()=>document.querySelector('#textos')?.scrollIntoView(),0)}}><h3>{t}</h3><p>{d}</p><span>Ver coleção <ArrowRight size={16}/></span></button>)}</section>
 <section id="sobre" className="container about"><div><p className="muted-label">Sobre</p><p className="about-text">Um arquivo autoral de Bernardo Rodrigues Caldeira. Atualizações sempre quando houver algo relevante a ser dito.</p></div></section><Footer/></main>
}

function Article({post}){return <main><Header/><article className="article container"><Link className="back" to="/"><ArrowLeft size={17}/> Voltar ao acervo</Link><p className="eyebrow">{post.category} · {formatDate(post.date,post.displayDate)}</p><h1>{post.title}</h1><p className="byline">{post.authors}</p><div className="article-body" dangerouslySetInnerHTML={{__html:post.content}}/><aside className="provenance"><strong>Origem</strong><p>{post.origins.join(' e ')}</p>{post.sourceUrl&&<a href={post.sourceUrl} target="_blank" rel="noopener noreferrer">Ver publicação original</a>}</aside><Link className="back bottom" to="/"><ArrowLeft size={17}/> Voltar ao acervo</Link></article><Footer/></main>}
function Footer(){return <footer>Writer's Block · Bernardo Rodrigues Caldeira</footer>}
