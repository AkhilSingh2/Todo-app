


<template>
<!-- https://www.positronx.io/create-login-signup-ui-screens-in-vue-js-with-bootstrap/ -->
    <div class="inner-block">
    <div class="vue-tempalte">
        <form @submit.prevent="handleSubmit">
            <h3>Sign In</h3>

            <div class="form-group">
                <label>Email address</label>
                <input type="email" class="form-control form-control-lg" v-model="email" />
            </div>

            <div class="form-group">
                <label>Password</label>
                <input type="password" class="form-control form-control-lg" v-model="password" />
            </div>

            <button type="submit" class="btn btn-dark btn-lg btn-block">Sign In</button>
            <p class="text-left mt-2 mb-4" v-if="userNotFound">Username or Password is incorrect</p>
            <p class="forgot-password text-right mt-2 mb-4">
                <router-link to="/forgot-password">Forgot password ?</router-link>
            </p>

            <div class="social-icons">
                <ul>
                    <li><a href="#"><i class="fa fa-google"></i></a></li>
                    <li><a href="#"><i class="fa fa-facebook"></i></a></li>
                    <li><a href="#"><i class="fa fa-twitter"></i></a></li>
                </ul>
            </div>

        </form>
    </div>
    </div>
</template>

<script>
export default {
  name: "login",
  components: {},
  data() {
    return {
        email: "",
        password: "",
        userNotFound: false
    }
  },
  methods: {
    handleSubmit(e){
                e.preventDefault()
                if (this.password.length > 0) {
                    this.$http.post('http://localhost:3000/login', {
                        email: this.email,
                        password: this.password
                    })
                    .then(response => {
                        let is_admin = response.data.user.is_admin
                        localStorage.setItem('user',JSON.stringify(response.data.user))
                        localStorage.setItem('jwt',response.data.token)

                        if (localStorage.getItem('jwt') != null){
                            // this.$emit('loggedIn')
                            this.$store.commit("login");
                            if(this.$route.params.nextUrl != null){
                                this.$router.push(this.$route.params.nextUrl)
                            }
                            else {
                                if(is_admin== 1){
                                    this.$router.push('admin')
                                }
                                else {
                                    this.$router.push('main-app')
                                }
                            }
                        }
                    })
                    .catch(function (error) {
                        console.error(error.response);
                        this.userNotFound = true;
                    });
                    
                }
            }
    // ...mapActions(["LogIn"]),
    // async submit() {
    //   const User = new FormData();
    //   User.append("username", this.form.username);
    //   User.append("password", this.form.password);
    //   try {
    //       await this.LogIn(User);
    //       this.$router.push("/main-app");
    //       this.showError = false
    //   } catch (error) {
    //     this.showError = true
    //   }
    // },
  },
};
</script>
