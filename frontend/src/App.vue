<template>
<div id="app" :class="{'hide-menu': !user}">
    <Header 
    :hideUserDropdown="!user" />    
    <Loading v-if="validatingToken" />
    <Content v-else />
    <Footer /> 
</div>    
</template>

<script>
import axios from 'axios';
import { baseApiUrl, userKey } from "@/global"
import {mapState} from "vuex";
import Header from "./components/templates/MyHeader";
import Content from "./components/templates/MyContent";
import Footer from "./components/templates/MyFooter";
import Loading from './components/templates/MyLoading'

export default {
  name: "App",
  components: { Header, Content, Footer, Loading },
  computed: mapState(['user']),
  data: function() {
    return {
      validatingToken: true
    }
  },
  methods: {
    async validateToken() {
			this.validatingToken = true

			const json = localStorage.getItem(userKey)
			const userData = JSON.parse(json)
			this.$store.commit('setUser', null)

			if(!userData) {
				this.validatingToken = false
				this.$router.push({ name: 'auth' })
				return
			}
			const res = await axios.post(`${baseApiUrl}/validate-token`, userData)
      
			if (res.data) {
				this.$store.commit('setUser', userData)				
				
			} else {
				localStorage.removeItem(userKey)
				this.$router.push({ name: 'auth' })
			}

			this.validatingToken = false
		}
  },
  created() {
    this.validateToken()   
  }
};
</script>

<style>
* {
  font-family: "Lato", sans-serif;
}

body {
  margin: 0;
}

#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;

  height: 100vh;
  display: grid;
  grid-template-rows: 40px 1fr 40px;
  grid-template-columns: 300px 1fr;
  grid-template-areas:
    "header header"
    "content content"
    "footer footer";
}

::-webkit-scrollbar {
  max-width: 10px;
}

/* Track */
room-chat::-webkit-scrollbar-track {
  box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.15); 
  border-radius: 5px;
}
 
/* Handle */
::-webkit-scrollbar-thumb {
  background: #949494; 
  border-radius: 5px;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: #444444; 
}

</style>
