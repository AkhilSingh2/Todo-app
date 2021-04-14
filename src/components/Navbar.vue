<template>

    <nav class="navbar navbar-expand navbar-light shadow bg-white rounded justify-content-between flex-nowrap flex-row fixed-top">
      <div class="container">
          <div class="navbar-header">
        <a class="navbar-brand"><router-link to="/main-app" class="nav-link pr-3">
           Task Tracker
        </router-link></a>
        </div>
        <ul class="nav navbar-nav flex-row float-right flex-nowrap">
            <span v-if="loggedIn">
                <li class="nav-item">
            <a class="btn btn-outline-primary" @click="logout">Logout</a>
          </li>
            </span>
            <div v-else class="flex-nowrap float-right flex-row navbar-nav">
          <li class="nav-item">
            <router-link class="nav-link pr-3" to="/login">Sign in</router-link>
          </li>
          <li class="nav-item">
            <router-link class="btn btn-outline-primary" to="/register">Sign up</router-link>
          </li>
            </div>
        </ul>
      </div>
    </nav>
 

</template>
<script>
export default {
    name:'Navbar',
    data() {
      return{
        // loggedIn : this.$store.getters.isLoggedIn,
        loggedIn: false,

      }
        
    },
    // computed:{
    //   loggedIn() { 
    //     return this.$store.getters.isLoggedIn
    //       },
        
    // },
    methods: {
    //   async logout (){
    //     await this.$store.dispatch('LogOut')
    //     this.$router.push('/login')
    //   }
    logout: function () {
        this.$store.dispatch('logout')
        .then(() => {
          this.$router.push('/login')
        })
      }
    },
    created(){
        if(localStorage.getItem("jwt")){
          this.loggedIn= true;
        }
      
    }
}
</script>
<style>

</style>