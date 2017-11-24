<template>
  <div class="login">
    <ul class="login-ul">
      <li>
        <el-input v-model="account" placeholder="enter"></el-input>
      </li>
      <li>
        <el-input v-model="password" placeholder="enter" type="password"></el-input>
      </li>
      <li>
        <el-button type="primary">submit</el-button>
      </li>
    </ul>

  </div>
</template>

<script>
  export default {
    data(){
      return {
        account: '',
        password: ''
      }
    }
  }
</script>

<style>
  .login-ul li{
    margin-bottom: 30px;
  }
  .login{
    width: 400px;
    margin: 10% auto;
  }
</style>
