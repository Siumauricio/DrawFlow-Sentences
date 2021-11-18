<template>
    <div>
        <h3>{{title}}</h3>
        
          
    </div>
</template>
<script>
/*eslint-disable */

import { getCurrentInstance, ref ,onMounted, isRef,unref,nextTick } from 'vue'
import { defineComponent } from 'vue'
import DrawValuesVue from './DrawValues.vue';
export default {
  components: {
    DrawValuesVue,
  },
    props:{
     title:String,
     editor:Object
    },
     setup({editor,title}){
         
        // let df = null
        // let draw = <DrawValues number1={0} number2={0}/>
      //  df = getCurrentInstance().appContext.config.globalProperties.$df.value;

        const assignValues = (data) =>{
              const input = editor.getNodeFromId(data.input_id);
              const output = editor.getNodeFromId(data.output_id);
              if(data.input_class == 'input_1'){
                editor.updateNodeDataFromId(data.input_id,{Number1:parseInt(output.data.Number), Number2:input.data.Number2});
                return <DrawValues number1={parseInt(output.data.Number)} number2={input.data.Number2}/>
                //number1.value = output.data.Number;
              } 
              else if(data.input_class == 'input_2'){
                editor.updateNodeDataFromId(data.input_id,{Number1:input.data.Number1, Number2:parseInt( output.data.Number)});
                 return <DrawValues number1={parseInt(input.data.Number1)} number2={parseInt( output.data.Number)}/>
                //number2.value = output.data.Number;
               } 



              //  evaluateExpressions(input.class);
        } 
        const updateValues = (id) =>{
            // const input = editor.getNodeFromId(id);
            // const {outputs:{output_1:{connections}}} = input;
            //  if(connections.length == 1){
            //     const {node,output} = connections[0];
            //     const expression = editor.getNodeFromId(node);
            //     console.log(expression);
            //     if(output == 'input_1'){
            //         editor.updateNodeDataFromId(node,{Number1:parseInt(input.data.Number1),Number2:expression.data.Number2});
            //         number1.value = parseInt(input.data.number);
            //     }else if(output == 'input_2'){
            //         editor.updateNodeDataFromId(node,{Number1:expression.data.Number1,Number2:parseInt(input.data.number)});
            //         number2.value = parseInt(input.data.number);
            //     }
            //     evaluateExpressions(expression.class);
            //  }
        }

        const removeValues=(data)=>{
            // const input = editor.getNodeFromId(data.input_id);
            //   if(data.input_class == 'input_1'){
            //         editor.updateNodeDataFromId(data.input_id,{Number1:0,Number2:input.data.Number2});
            //         number1.value = 0;
            //   } 
            //   else if(data.input_class == 'input_2'){
            //         editor.updateNodeDataFromId(data.input_id,{Number1:input.data.Number1,Number2:0});
            //        number2.value = 0;
            //    } 
            //     evaluateExpressions(input.class);
        }

        const evaluateExpressions= (expressionType) =>{
            // number1.value = Number.isNaN(number1.value) ? 0 : number1.value;
            // number2.value = Number.isNaN(number2.value) ? 0 : number2.value;
            //   if(expressionType == 'Add'){
            //       result.value = number1.value + number2.value;
            //   }else if(expressionType == 'Sub'){
            //        result.value = number1.value - number2.value;
            //   }else if(expressionType == 'Multiply'){
            //         result.value = number1.value * number2.value;
            //   } else if (expressionType == 'Divide'){
            //         result.value = number1.value / number2.value;
            //   }
        }

        onMounted( () => {
              //nodeId.value = df.nodeId;
                // console.log(df)


        editor.on('nodeCreated',(dataNode)=>{
           draw = <DrawValues number1={0} number2={0}/>
           console.log(draw)
          })




          //  editor.off('connectionCreated',(dataNode)=>{
          //  console.log(dataNode)
          // })

          //  editor.on('nodeDataChanged',(dataNode)=>{
          //   updateValues(dataNode);
          // })

          // editor.on('connectionRemoved',(data)=>{
          //      removeValues(data);
          // })
          

        });

        
        //  editor.on('connectionCreated',(dataNode)=>{
        //    draw = assignValues(dataNode);
        //     //const drawNode = assignValues(dataNode);
        //     console.log(draw)
        //   })

        //            editor.on('connectionCreated',(dataNode)=>{
           
        //    console.log('---------------------')
        //    console.log(events.events)
        //     assignValues(dataNode);
        //   console.log('---------------------')

        //   })

             


        //  editor.on('nodeDataChanged',(dataNode)=>{
        //     updateValues(dataNode);
        //    })

           
        //   editor.on('connectionRemoved',(data)=>{
        //        removeValues(data);
        //   })

        return { result,cnodes,actualNode,number1,number2,draw }
      
    },watch:{
      title:function(){
        
        console.log('Hola')
      }
    }
}
</script>


<style scoped>

</style>