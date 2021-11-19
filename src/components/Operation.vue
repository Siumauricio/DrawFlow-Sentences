<script>
/*eslint-disable */
import {getCurrentInstance, ref, onMounted, isRef, unref, nextTick, reactive, computed} from "vue";
import {defineComponent} from "vue";
import DrawValuesVue from "./DrawValues.vue";
export default {
   components: {
      DrawValuesVue,
   },
   props: {
      title: String,
      editor: Object,
      num1: Number,
      num2: Number,
   },
   unix() {
      console.log("Call function");
   },
   setup({editor, title, num1, num2}) {
      const number1 = ref(num1);
      const number2 = ref(num2);
      const result = ref(0);

      const assignValues = (data) => {
         //  const input = editor.getNodeFromId(data.input_id);
         //  const output = editor.getNodeFromId(data.output_id);
         //  // console.log(input)
         //  if (data.input_class == "input_1") {
         //     editor.updateNodeDataFromId(data.input_id, {Number1: parseInt(output.data.Number), Number2: input.data.Number2});
         //     number1.value = output.data.Number;
         //  } else if (data.input_class == "input_2") {
         //     editor.updateNodeDataFromId(data.input_id, {Number1: input.data.Number1, Number2: parseInt(output.data.Number)});
         //     number2.value = output.data.Number;
         //  }
         //  evaluateExpressions(input.class);
      };
      // const updateValues = (id) => {
      //    const input = editor.getNodeFromId(id);
      //    const {
      //       outputs: {
      //          output_1: {connections},
      //       },
      //    } = input;
      //    if (connections.length == 1) {
      //       const {node, output} = connections[0];
      //       const expression = editor.getNodeFromId(node);
      //       if (output == "input_1") {
      //          editor.updateNodeDataFromId(node, {Number1: parseInt(input.data.Number1), Number2: expression.data.Number2});
      //          number1.value = parseInt(input.data.number);
      //       } else if (output == "input_2") {
      //          editor.updateNodeDataFromId(node, {Number1: expression.data.Number1, Number2: parseInt(input.data.number)});
      //          number2.value = parseInt(input.data.number);
      //       }
      //       evaluateExpressions(expression.class);
      //    }
      // }
      // const removeValues = (data) => {
      //    const input = editor.getNodeFromId(data.input_id);
      //    if (data.input_class == "input_1") {
      //       editor.updateNodeDataFromId(data.input_id, {Number1: 0, Number2: input.data.Number2});
      //       number1.value = 0;
      //    } else if (data.input_class == "input_2") {
      //       editor.updateNodeDataFromId(data.input_id, {Number1: input.data.Number1, Number2: 0});
      //       number2.value = 0;
      //    }
      //    evaluateExpressions(input.class);
      // };
      // const evaluateExpressions = (expressionType) => {
      //    number1.value = Number.isNaN(number1.value) ? 0 : number1.value;
      //    number2.value = Number.isNaN(number2.value) ? 0 : number2.value;
      //    if (expressionType == "Add") {
      //       result.value = number1.value + number2.value;
      //    } else if (expressionType == "Sub") {
      //       result.value = number1.value - number2.value;
      //    } else if (expressionType == "Multiply") {
      //       result.value = number1.value * number2.value;
      //    } else if (expressionType == "Divide") {
      //       result.value = number1.value / number2.value;
      //    }
      // };

      onMounted(() => {
         // console.log('Eventos',editor.events);
         // console.log(df.removeListener('connectionCreated', assignValues));
         // console.log(df.removeListener('connectionRemoved', removeValues));
         // console.log(df.removeListener('nodeDataChanged', updateValues));
         // await nextTick();
         //vale parece que no tiene este evento el que lo creo
         // df.on('connectionRemoved', removeValues);
         // df.on('nodeDataChanged', updateValues);
         // console.log(editor)
         // console.log(editor.evCache)
         // editor.on('connectionCreated', assignValues);
         // editor.on('connectionRemoved', removeValues);
         // editor.on('nodeDataChanged', updateValues);
         // });
      });
      // });
      return {number1, number2, result};
   },
};

//        function makeid(length) {
//     var result           = '';
//     var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
//     var charactersLength = characters.length;
//     for ( var i = 0; i < length; i++ ) {
//       result += characters.charAt(Math.floor(Math.random() *
//  charactersLength));
//    }
//    return result;
// }
</script>

<style scoped></style>
