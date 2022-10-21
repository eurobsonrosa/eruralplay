<template>
  <footer class="footer">
    <span>Copyright <strong><a href="https://www.linkedin.com/in/robsonrosajr/">Robson Rosa</a></strong> © 2022 </span>    
  </footer>
</template>

<script>
export default {

}
</script>

<style>
    .footer {
        grid-area: footer;
        background-color: #DDD;
        color: #333;

        display: flex;
        align-items: center;
        justify-content: center;
        padding-right: 10px;
    }

    .footer a:hover{
      text-decoration: none
    }
</style>