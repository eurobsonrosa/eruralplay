<template>
  <div class="content-error">
        <img src="../../assets/404.png" alt="404">
        <h3>Ooooops, a página que você procura</h3>
        <h2>NÃO FOI ENCONTRADA</h2>
    <router-link :to="{ name: 'home' }">
      <span>Voltar para as Salas</span>
    </router-link>
  </div>
</template>

<script>
export default {
  name: "PageNotFound",
};
</script>


<style>

.content-error {
    display: flex;
    flex-direction: column;
    align-items: center;align-items: center;
  justify-content: center;
  height: 100%;

}

.content-error h3, .content-error h2 {
    font-weight: bold;
    color: rgba(0, 134, 22, 0.822)
}


.content-error img {
  width: 250px;
}
</style>