import "./team.css";

interface MembroEquipe {
  nome: string;
  cargo: string;
  imagem: string;
}

const membros: MembroEquipe[] = [
  { nome: "Daniel José de Assumpção", cargo: "Educador Social", imagem: "/images/daniel_jose.webp" },
  { nome: "Leonardo Tomé", cargo: "Coordenador de Projetos Educacionais", imagem: "/images/leonardo_tomé.webp" },
  { nome: "Alex Batista", cargo: "Facilitador Cultural", imagem: "/images/alex_batista.webp" },
  { nome: "Ciclana Carvalho",  cargo: "Psicopedagoga", imagem: "/images/mulher.webp" },
  { nome: "Fulano da Silva",cargo: "Gestor de Comunidade e Parcerias", imagem: "/images/homem.webp" },
];

const Team = () => {
  return (
    <section className="equipe-container" id="equipe">
      <h2 className="equipe-title">Equipe</h2>
      <div className="equipe-grid">
        {membros.map((membro, index) => (
          <div key={index} className="equipe-item">
            <img src={membro.imagem} alt={membro.nome} />
            <h3>{membro.nome}</h3>
            <p className="cargo">{membro.cargo}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Team;
