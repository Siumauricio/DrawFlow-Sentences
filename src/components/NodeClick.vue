<template>
  <div class="card-devices" >
     <div class="header">
        <h1> Test </h1>
     </div>
    <div class="body" >
       <span @click="Clicked"> Name :</span>
     </div>
  </div>
</template>

<script>
export default {
  name: 'NodeClick',
  methods: {
    Clicked() {
      alert("hello-drawflow");
    }
  }
}
</script>
<style scoped>
.card-devices {
  border-radius: 5px;
  box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.16), 0 2px 10px 0 rgba(0, 0, 0, 0.12);
}
</style>