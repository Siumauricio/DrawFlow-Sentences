
<template>
    <container>
        <!-- <input  class="form-control" type="number" v-model="result" disabled> -->
        <span><a>Number 1: {{number1}}</a></span>
        <br/> 
        <span><a>Number 2: {{number2}}</a></span>
    </container>
</template>


<script>
/*eslint-disable */

import { onMounted, ref } from '@vue/runtime-core'

export default {
    name:'DrawValues',
     props:{
     number1:Number,
     number2:Number
    },
    setup({number1,number2}) {

        onMounted(()=>{


        })

    },
    

}
</script>
