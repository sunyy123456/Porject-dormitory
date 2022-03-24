<template>
  <div class="dashboard-container">
    <div class="dashboard-text">Welcome to</div>
    <div class="dashboard-text">宿舍管理系统</div>
  </div>
</template>

<script>

export default {
  name: 'Dashboard',
}
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
    width: 100%;
    height: 500px;
    background: url(~@/assets/bg3.jpeg);
  }
  &-text {
    font-size: 30px;
    color: #fff;
    line-height: 46px;
  }
}
</style>
