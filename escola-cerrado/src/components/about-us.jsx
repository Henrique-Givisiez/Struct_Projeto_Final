import "./about-us.css";

const AboutUs = () => {
    return (
        <section className="quem-somos-container" id="quem-somos">
        <div className="quem-somos-content">
          <h2 className="quem-somos-title">Quem Somos</h2>
          <p>
            Desde 2020, a Escola do Cerrado transforma a vida de crianças e adolescentes em situação de vulnerabilidade social, oferecendo reforço escolar, atividades inclusivas, desenvolvimento de habilidades socioafetivas, oficinas, passeios educativos e momentos de lazer.
          </p>
          <p>
            Nosso propósito é romper ciclos de pobreza e violência por meio da educação, restaurando a autoestima, despertando novos sonhos e formando agentes de mudança.
          </p>
          <p>
            Acreditamos na força da colaboração para construir um futuro melhor. Junte-se a nós nessa missão transformadora através da educação!
          </p>
        </div>
        <div className="quem-somos-image">
          <img src="/images/foto-grupo.jpg" alt="Grupo de crianças e adolescentes da Escola do Cerrado" />
        </div>
      </section>
    );
  };
  
  export default AboutUs;
  