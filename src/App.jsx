import React, { useState } from "react";
import { ArrowRight, Search, X } from "lucide-react";
import { motion } from "framer-motion";

const posts = [
  { category: "Crônicas", title: "(Não) há tempo suficiente", date: "24 dez 2024", excerpt: "Lembranças, memória e a estranha maneira como alguns segundos conseguem carregar anos inteiros." },
  { category: "Reflexões", title: "As coisas nas quais acredito", date: "13 ago 2020", excerpt: "Reflexões sobre trabalho, escolhas e aquilo que permanece quando tiramos o ruído do caminho." },
  { category: "Cartas para minha filha", title: "Uma vida que você ainda não lembra", date: "Coleção", excerpt: "Memórias da infância guardadas pela perspectiva dos olhos do pai." },
];

const collections = [
  ["Crônicas", "Histórias do cotidiano, memórias e outras coisas que mereceram ser contadas."],
  ["Reflexões", "Trabalho, tecnologia, comportamento, vida e outros assuntos que transbordaram em forma de escrita."],
  ["Cartas para minha filha", "Memórias que ela talvez não lembre, pelos olhos do pai."],
];

export default function App() {
  const [query, setQuery] = useState("");
  const visible = posts.filter((post) =>
    `${post.category} ${post.title} ${post.excerpt}`.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <main>
      <header className="site-header container">
        <a className="brand" href="#top">Writer's Block</a>
        <nav aria-label="Navegação principal">
          <a href="#textos">Textos</a><a href="#colecoes">Coleções</a><a href="#sobre">Sobre</a>
        </nav>
      </header>

      <section id="top" className="hero container">
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .55 }}>
          <p className="eyebrow">Bernardo Caldeira</p>
          <h1>Writer's<br />Block.</h1>
          <p className="tagline">Textos sobre trabalho, vida, memória e tudo aquilo que transbordou e virou palavras.</p>
        </motion.div>
      </section>

      <section id="textos" className="archive-wrap">
        <div className="container archive">
          <div className="archive-heading">
            <div><p className="muted-label">Arquivo</p><h2>Textos recentes</h2></div>
            <label className="search">
              <Search size={16} aria-hidden="true" />
              <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Buscar no acervo" aria-label="Buscar no acervo" />
              {query && <button onClick={() => setQuery("")} aria-label="Limpar busca"><X size={15} /></button>}
            </label>
          </div>
          <div className="post-list">
            {visible.map((post, index) => (
              <motion.article key={post.title} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: index * .06 }} className="post">
                <div><p className="category">{post.category}</p><p className="date">{post.date}</p></div>
                <div><h3>{post.title}</h3><p>{post.excerpt}</p></div>
                <button className="read" aria-label={`Ler ${post.title}`}><ArrowRight size={18} /></button>
              </motion.article>
            ))}
            {visible.length === 0 && <p className="empty">Nenhum texto encontrado.</p>}
          </div>
        </div>
      </section>

      <section id="colecoes" className="container collections">
        {collections.map(([title, description]) => (
          <article className="collection" key={title}><h3>{title}</h3><p>{description}</p></article>
        ))}
      </section>

      <section id="sobre" className="container about">
        <div><p className="muted-label">Sobre</p><p className="about-text">Um arquivo autoral de Bernardo Rodrigues Caldeira. Trazendo sempre o combinado de ser atualizado quando houver algo relevante a ser dito.</p></div>
      </section>

      <footer>Writer's Block · Bernardo Caldeira</footer>
    </main>
  );
}
