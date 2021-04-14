<template>
<div class="inner-block">
    <div class="vue-tempalte">
        <form @submit.prevent="handleSubmit">
            <h3>Sign Up</h3>

            <div class="form-group">
                <label>Full Name</label>
                <input type="text" class="form-control form-control-lg" v-model="name"/>
            </div>

            <div class="form-group">
                <label>Email address</label>
                <input type="email" class="form-control form-control-lg" v-model="email" />
            </div>

            <div class="form-group">
                <label>Password</label>
                <input type="password" class="form-control form-control-lg" v-model="password"/>
            </div>

            <div class="form-group">
                <label>Confirm Password</label>
                <input type="password" class="form-control form-control-lg" v-model="password_confirmation"/>
            </div>

            <button type="submit" class="btn btn-dark btn-lg btn-block">Sign Up</button>

            <label for="password-confirm">Is this an administrator account?</label>
            <div>
                <select v-model="is_admin">
                    <option value=1>Yes</option>
                    <option value=0>No</option>
                </select>
            </div>







            <p class="forgot-password text-right">
                Already registered 
                <router-link :to="{name: 'login'}">sign in?</router-link>
                
            </p>
            <div>
  </div>
        </form>
    </div>
    </div>
</template>

<script>
    export default {
        name:'register',
        props : ["nextUrl"],
        data() {
            return {
                    name: "",
                    email: "",
                    password: "",
                    password_confirmation : "",
                    is_admin : null,
            }
        },
        methods: {
            handleSubmit(e) {
                e.preventDefault()

                if (this.password === this.password_confirmation && this.password.length > 0)
                {
                    let url = "http://localhost:3000/register"
                    if(this.is_admin != null || this.is_admin == 1) url = "http://localhost:3001/register-admin"
                    this.$http.post(url, {
                        name: this.name,
                        email: this.email,
                        password: this.password,
                        is_admin: this.is_admin
                    })
                    .then(response => {
                        localStorage.setItem('user',JSON.stringify(response.data.user))
                        localStorage.setItem('jwt',response.data.token)

                        if (localStorage.getItem('jwt') != null){
                            this.$emit('loggedIn')
                            if(this.$route.params.nextUrl != null){
                                this.$router.push(this.$route.params.nextUrl)
                            }
                            else{
                                this.$router.push('/login')
                            }
                        }
                    })
                    .catch(error => {
                        console.error(error);
                    });
                } else {
                    this.password = ""
                    this.passwordConfirm = ""

                    return alert("Passwords do not match")
                }
            }
    // ...mapActions(["Register"]),
    // async submit() {
    //   try {
    //       console.log("wtf");
    //     await this.Register(this.form);
        
    //     this.$router.push("/login");
    //     this.showError = false
    //   } catch (error) {
    //     this.showError = true
    //   }
    // },
    // register: function () {
    //     let data = {
    //       email: this.form.username,
    //       password: this.form.password,
    //       full_name: this.form.full_name
    //     }
    //     this.$store.dispatch('register', data)
    //    .then(() => this.$router.push('/main-app'))
    //    .catch(err => console.log(err))
    //   }
  },
    }
</script>