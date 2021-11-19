<!-- 
<template>
    <div>
        <input  class="form-control" type="number" v-model="result" disabled>
        <span><a>Number 1: {{number1}}</a></span>
        <br/> 
        <span><a>Number 2: {{number2}}</a></span>
    </div>
</template> -->


<script>
/*eslint-disable */

import { onMounted, ref } from '@vue/runtime-core'

export default {
    name:'DrawValues',
    props: {
        title:String,
        number1: Number,
        number2: Number
    },
    render({title,number1,number2}){
        const Number1= ref(number1);
        const Number2= ref(number2);
    //    const [Numbers, setNumbers] = useState({Number1:number1,Number2:number2})
    
       return ( 
       <div>
         <h3>{title}</h3>
            <input  class="form-control" type="number" disabled/>
            <span><a>Number 1: {Number1.value}</a></span>
            <br/> 
            <span><a>Number 2: {Number2.value}</a></span>
      </div>)

    },
}
</script>
