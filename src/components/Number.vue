<template>
    <div>
        <h4>Number</h4>
        <input class="form-control" type="number"  v-model="number" @change="updateNumber" placeholder="Ingresa un Numero" df-number  required/>
    </div>
</template>

<script>
/*eslint-disable */
import { h, getCurrentInstance,nextTick, render, readonly, ref ,onMounted,shallowRef, onBeforeUnmount,onUpdated} from 'vue'

export default {
    name: 'Number',
    data() {
        return {
            number: 0
        }
    },
    props:{
        editor:null
    },
    setup({editor}){
         const el = ref(null);
        const nodeId = ref(0);
        let df = null
        let s = null;
        const dataNode = ref({});
        df = getCurrentInstance().appContext.config.globalProperties.$df.value;

        const updateNumber = (e) =>{
            if(Number.isNaN(parseInt(e.target.value))){
             df.updateNodeDataFromId(nodeId.value, {Number:0});
            }else{
             df.updateNodeDataFromId(nodeId.value, {Number:parseInt(e.target.value)});
            }
        }
         onMounted(() => {
            nodeId.value = df.nodeId;
             setTimeout(() => {
               dataNode.value = df.getNodeFromId(nodeId.value);
            },0);

    //   editor.on('connectionCreated',function connexionCreada(dataNode){
    //    console.log('-----Numero connectionCreated------')
    //    console.log(editor.events.connectionCreated)
    //    editor.removeListener('connectionCreated',connexionCreada)

    //     })
    //  editor.on('connectionRemoved', function connectionRemovedd (dataNode){
         
    //     // console.log(editor.events.connectionRemoved.listeners);
    //     editor.removeListener('connectionRemoved',connectionRemovedd)
    //     // console.log(editor.events.connectionRemoved.listeners);
    //   });


        // console.log(editor.removeListener('connectionCreated',0))
        // await nextTick(()=>{

        //     // if(editor.events.connectionCreated?.listeners.length > 0){
        //     //     editor.events.connectionCreated.listeners.pop();
        //     // }

        // })
        
        });


        return { df,nodeId, dataNode,updateNumber }
    }
}
</script>

<style>
.Number {
    width: 100%;
}
</style>