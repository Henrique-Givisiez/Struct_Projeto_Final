import "./our-work.css";

const OurWork = () => {
  return (
    <section className="nosso-trabalho-container" id="nosso-trabalho">
      <h2 className="nosso-trabalho-title">Nosso Trabalho</h2>
      <div className="nosso-trabalho-content">
        <div className="trabalho-item">
          <img src="/images/foto-aulas.png" alt="Aulas ao ar livre" />
          <h3>Aulas</h3>
          <p>
            Uma escola inovadora que transforma qualquer lugar em sala de aula! Com aulas ao ar livre, em espaços culturais e comunitários, nosso propósito é romper com o modelo tradicional e tornar o aprendizado mais dinâmico, inclusivo e conectado ao mundo real.
          </p>
        </div>
        <div className="trabalho-item">
          <img src="/images/foto-nicolandia.jpg" alt="Passeios educativos" />
          <h3>Passeios</h3>
          <p>
            Descubra Brasília de forma única! Nossos passeios educativos levam os alunos a explorar a beleza e a riqueza cultural da cidade, transformando cada visita em uma oportunidade de aprendizado e conexão com a nossa história e arquitetura.
          </p>
        </div>
        <div className="trabalho-item">
          <img src="/images/foto-bazar.png" alt="Projetos solidários" />
          <h3>Projetos</h3>
          <p>
            Transformando criatividade em oportunidade! Realizamos projetos como bazares e eventos solidários para arrecadar fundos que sustentam nossas iniciativas educacionais. Cada contribuição ajuda a construir um futuro melhor para nossas crianças e jovens.
          </p>
        </div>
      </div>
    </section>
  );
};

export default OurWork;
