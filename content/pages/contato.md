Title: Contato
Slug: contato
show_header: false
Template: contato

# Entre em Contato

Estamos ansiosos para conhecer seu projeto e discutir como podemos ajudar.

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

## Localização

Estamos localizados no Instituto Federal Catarinense - Campus Videira. Veja no mapa abaixo:

<div id="map" style="height: 400px; width: 100%; z-index: 0;"></div>