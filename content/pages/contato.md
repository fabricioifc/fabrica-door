Title: Contato
Slug: contato
show_header: false
Template: contato

<div class="contact-container">
  <div class="contact-form">
  <h2>Entre em contato</h2>
    <p>Estamos ansiosos para conhecer seu projeto e discutir como podemos ajudar.</p>
    <form id="contact-form">
      <div class="form-group">
        <label for="nome">Nome</label>
        <input type="text" id="nome" name="nome" required>
      </div>
      
      <div class="form-group">
        <label for="email">E-mail</label>
        <input type="email" id="email" name="email" required>
      </div>
      
      <div class="form-group">
        <label for="assunto">Assunto</label>
        <select id="assunto" name="assunto">
          <option value="ideia">Enviar ideias</option>
          <option value="parceria">Propor parceria</option>
          <option value="suporte">Suporte técnico</option>
          <option value="outros">Outros</option>
        </select>
      </div>
      
      <div class="form-group">
        <label for="mensagem">Mensagem</label>
        <textarea id="mensagem" name="mensagem" rows="5" required></textarea>
      </div>
      
      <button type="submit" class="btn-primary">Enviar mensagem</button>
    </form>
  </div>

  <div class="contact-map">
    <h2>Localização</h2>
    <p>Estamos localizados no Instituto Federal Catarinense - Campus Videira. Veja no mapa abaixo:</p>
    <div id="map"></div>
  </div>
</div>
