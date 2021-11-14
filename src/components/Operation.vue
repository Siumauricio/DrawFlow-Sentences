<template>
    <div>
        <h3>{{title}}</h3>
        <input class="form-control" type="number" v-model="result" />
        <span><a>Number 1</a></span>
        <br/>
        <span><a>Number 2</a></span>
    </div>
</template>
<script>
import { defineComponent } from 'vue'
export default defineComponent({
    props: ['title'],
})
</script>


<style scoped>

</style>