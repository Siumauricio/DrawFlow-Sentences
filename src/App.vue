<template>
   <div id="app">
      
      <div class="container" style="height: 1000px; max-width: 100%; max-height: 100%">
         <div class="row">
            <div class="col-md-6 mx-auto" style="width: 200px; text-align: center; padding-right: 0px; padding-left: 0px">
               <ul class="list-group" style="padding-left: 0px; margin-bottom: 10px; margin-top: 10px">
                  <li class="list-group-item list-group-item-action list-group-item-primary" v-for="n in listNodes" :key="n" draggable="true" :data-node="n.item" @dragstart="drag($event)">
                     <div class="node" :style="`background: ${n.color};`">{{ n.name }}</div>
                  </li>

                  <!-- <li class="list-group">
                 <button type="button" class="btn btn-success" @click="toggleModal"></button>
                  </li> -->
                  <li class="list-group">
                     <button v-on:click="generatePythonCode($event)" type="button" class="btn btn-primary"  @click="toggleModal">Generate Python Code</button>
                  </li>
               </ul>
            </div>
            <div class="col-md-6 mx-auto" style="padding-top: 10px; height: 100vh; min-height: 492px; width: 1181px; padding-right: 0px; padding-left: 0px">
               <div class="border" id="drawflow" @drop="drop($event)" @dragover="allowDrop($event)"></div>
            </div>
         </div>
      </div>


       <div>
            <div  ref="modal" class="modal" :class="{show, 'd-block': active}" tabindex="-1"  role="dialog"  >
               <div class="modal-dialog" role="document">
               <div class="modal-content " style="width:900px">
                  <div class="modal-header">
                     <h5 class="modal-title">Program Section</h5>
                     <button
                     type="button"
                     class="close"
                     data-dismiss="modal"
                     aria-label="Close"
                     @click="toggleModal"
                     >
                     <span aria-hidden="true">&times;</span>
                     </button>
                  </div>
                  <div class="modal-body">


                  <code-highlight language="javascript">
                     <code>
                        <p style="color:white;"> {{codeGenerator}} </p>
                     </code>

                     </code-highlight>


                     <!-- <p class="pre-formatted"></p> -->
                <button  type="button" class="btn btn-primary" @click="saveFile">Save Program</button> &nbsp;
                <button  type="button" class="btn btn-primary" >Run Program</button> &nbsp;
                <button  type="button" class="btn btn-primary" @click="getAllFiles">List Programs</button> &nbsp;

                     
                  </div>
               </div>
               </div>
            </div>
            <div v-if="active" class="modal-backdrop fade show"></div>
         </div>



   </div>
</template>


<script>
/*eslint-disable */
import CodeHighlight from "vue-code-highlight/src/CodeHighlight.vue";
import "vue-code-highlight/themes/duotone-sea.css";
import "vue-code-highlight/themes/window.css";
import Swal from 'sweetalert2'
import {h, getCurrentInstance, render, readonly, ref, onMounted, shallowRef} from "vue";
import Drawflow from "drawflow";
import {useStore} from "vuex";
import styleDrawflow from "drawflow/dist/drawflow.min.css"; // eslint-disable-line no-use-before-define
import Number from "./components/Number.vue";
import Operation from "./components/Operation.vue";
import Assignation from "./components/Assignation.vue";
import For from "./components/For.vue";
import If from "./components/If.vue";
import Else from "./components/Else.vue";
import Print from "./components/Print.vue";

export default {
   name: "App",
   components:{
      CodeHighlight,
   },
   setup() {
      const listNodes = readonly([
         {
            name: "Number",
            item: "Number",
            input: 0,
            output: 1,
         },
         {
            name: "Add",
            item: "Add",
            input: 2,
            output: 1,
         },
         {
            name: "Sub",
            item: "Sub",
            input: 2,
            output: 1,
         },
         {
            name: "Multiply",
            item: "Multiply",
            input: 2,
            output: 1,
         },
         {
            name: "Divide",
            item: "Divide",
            input: 2,
            output: 1,
         },
         {
            name: "Assignation",
            item: "Assignation",
            input: 1,
            output: 1,
         },
         {
            name: "For",
            item: "For",
            input: 1,
            output: 1,
         },
         {
            name: "If",
            item: "If",
            input: 1,
            output: 1,
         },
         {
            name: "Else",
            item: "Else",
            input: 1,
            output: 1,
         },
         {
            name: "Print",
            item: "Print",
            input: 1,
            output: 1,
         },
      ]);

      const codeGenerator = ref("");
      const active = ref(false);
      const show = ref(false);
      const editor = shallowRef({});
      const dialogVisible = ref(false);
      const dialogData = ref({});
      const internalInstance = getCurrentInstance();
      internalInstance.appContext.app._context.config.globalProperties.$df = editor;
      const Vue = {version: 3, h, render};
      const {state, dispatch} = useStore();

     const toggleModal = () => {
      const body = document.querySelector("body");
      active.value = !active.value;
      active.value
        ? body.classList.add("modal-open")
        : body.classList.remove("modal-open");
      setTimeout(() => (show.value = !show.value), 10);
    }

      const drag = (ev) => {
         if (ev.type === "touchstart") {
            mobile_item_selec = ev.target.closest(".drag-drawflow").getAttribute("data-node");
         } else {
            ev.dataTransfer.setData("node", ev.target.getAttribute("data-node"));
         }
      };

      const drop = (ev) => {
         if (ev.type === "touchend") {
            var parentdrawflow = document.elementFromPoint(mobile_last_move.touches[0].clientX, mobile_last_move.touches[0].clientY).closest("#drawflow");
            if (parentdrawflow != null) {
               addNodeToDrawFlow(mobile_item_selec, mobile_last_move.touches[0].clientX, mobile_last_move.touches[0].clientY);
            }
            mobile_item_selec = "";
         } else {
            ev.preventDefault();
            var data = ev.dataTransfer.getData("node");
            addNodeToDrawFlow(data, ev.clientX, ev.clientY);
         }
      };
      const allowDrop = (ev) => {
         ev.preventDefault();
      };

      const addNodeToDrawFlow = (name, pos_x, pos_y) => {
         pos_x =
            pos_x * (editor.value.precanvas.clientWidth / (editor.value.precanvas.clientWidth * editor.value.zoom)) -
            editor.value.precanvas.getBoundingClientRect().x * (editor.value.precanvas.clientWidth / (editor.value.precanvas.clientWidth * editor.value.zoom));
         pos_y =
            pos_y * (editor.value.precanvas.clientHeight / (editor.value.precanvas.clientHeight * editor.value.zoom)) -
            editor.value.precanvas.getBoundingClientRect().y * (editor.value.precanvas.clientHeight / (editor.value.precanvas.clientHeight * editor.value.zoom));

         const nodeSelected = listNodes.find((ele) => ele.item == name);
         assignDefaultValues(nodeSelected, name, pos_x, pos_y);
      };

      const assignDefaultValues = (nodeSelected, name, pos_x, pos_y) => {
         if (nodeSelected.name == "Add" || nodeSelected.name == "Sub" || nodeSelected.name == "Multiply" || nodeSelected.name == "Divide") {
            editor.value.addNode(name, nodeSelected.input, nodeSelected.output, pos_x, pos_y, name, {Number1: 0, Number2: 0, Result: 0}, name, "vue");
         } else if (nodeSelected.name == "Number") {
            editor.value.addNode(name, nodeSelected.input, nodeSelected.output, pos_x, pos_y, name, {Number: 0}, name, "vue");
         } else if(nodeSelected.name == "For"){
            editor.value.addNode(name, nodeSelected.input, nodeSelected.output, pos_x, pos_y, name, {Start:0,Finish:0}, name, "vue");
         }else if(nodeSelected.name == "If"){
            editor.value.addNode(name, nodeSelected.input, nodeSelected.output, pos_x, pos_y, name, {Expression1:'',Operator:'',Expression2:''}, name, "vue");
         }else if(nodeSelected.name == "Else"){
            editor.value.addNode(name, nodeSelected.input, nodeSelected.output, pos_x, pos_y, name, {}, name, "vue");
         }else if(nodeSelected.name == "Print"){
            editor.value.addNode(name, nodeSelected.input, nodeSelected.output, pos_x, pos_y, name, {}, name, "vue");
         }else if(nodeSelected.name == "Assignation"){
            editor.value.addNode(name, nodeSelected.input, nodeSelected.output, pos_x, pos_y, name, {Value:0,Name:""}, name, "vue");
         }
      };

      const assignValues = (data) => {
         const input = editor.value.getNodeFromId(data.input_id);
         const output = editor.value.getNodeFromId(data.output_id);
         if ((input.class == "Add" || input.class == "Sub" || input.class == "Multiply" || input.class == "Divide") && (output.class == "Add" || output.class == "Sub" || output.class == "Multiply" || output.class == "Divide")) {
            if (data.input_class == "input_1") {
               const result = evaluateExpressions(input.class, parseInt(output.data.Result), parseInt(input.data.Number2));
               const object = {Number1: parseInt(output.data.Result), Number2: parseInt(input.data.Number2), Result: result};
               editor.value.updateNodeDataFromId(data.input_id, object);
               dispatch("setOperationAction", {id: data.input_id, value: object});
            } else if (data.input_class == "input_2") {
               const result = evaluateExpressions(input.class, parseInt(input.data.Number1), parseInt(output.data.Result));
               const object = {Number1: parseInt(input.data.Number1), Number2: parseInt(output.data.Result), Result: result};
               editor.value.updateNodeDataFromId(data.input_id, object);
               dispatch("setOperationAction", {id: data.input_id, value: object});
            }

            //console.log("Operaciones arimeticas validas");
         } else {
           // console.log(data)
           if(output.class == "If" || output.class == "For" || output.class == "Else"){
              return;
           }
            if(input.class == "Assignation" && (output.class == "Add" || output.class == "Sub" || output.class =="Multiply" || output.class == "Divide")){
              editor.value.updateNodeDataFromId(input.id,{Value: output.data.Result, Name: input.data.Name});
            } else if (data.input_class == "input_1" && input.class !="If" && input.class !="For"&& input.class !="Else"&& input.class !="Print") {
               console.log('Entre')
               const result = evaluateExpressions(input.class, parseInt(output.data.Number), parseInt(input.data.Number2));
               const object = {Number1: parseInt(output.data.Number), Number2: parseInt(input.data.Number2), Result: result};
               editor.value.updateNodeDataFromId(data.input_id, object);
               dispatch("setOperationAction", {id: data.input_id, value: object});
            } else if (data.input_class == "input_2" && input.class !="If"&& input.class !="For"&& input.class !="Else"&& input.class !="Print") {
               const result = evaluateExpressions(input.class, parseInt(input.data.Number1), parseInt(output.data.Number));
               const object = {Number1: parseInt(input.data.Number1), Number2: parseInt(output.data.Number), Result: result};
               editor.value.updateNodeDataFromId(data.input_id, object);
               dispatch("setOperationAction", {id: data.input_id, value: object});
            } 
            
         }
      };

      const updateValues = (id) => {
         const input = editor.value.getNodeFromId(id);
         const {
            outputs: {
               output_1: {connections},
            },
         } = input;
         if (connections.length == 1 && input.class == "Number") {
            const {node, output} = connections[0];
            const expression = editor.value.getNodeFromId(node);
         console.log(input)

            console.log(expression)
            if (output == "input_1") {
               const result = evaluateExpressions(expression.class, parseInt(input.data.number), parseInt(expression.data.Number2));
               const object = {Number1: parseInt(input.data.number), Number2: parseInt(expression.data.Number2), Result: result};
               editor.value.updateNodeDataFromId(node, object);
               dispatch("setOperationAction", {id: node, value: object});

               updateNodes(node);
            } else if (output == "input_2") {
               const result = evaluateExpressions(expression.class, parseInt(expression.data.Number1), parseInt(input.data.number));
               const object = {Number1: parseInt(expression.data.Number1), Number2: parseInt(input.data.number), Result: result};
               editor.value.updateNodeDataFromId(node, object);
               dispatch("setOperationAction", {id: node, value: object});
               updateNodes(node);
            }
         }
      };

      const updateNodes = (id) => {
         let actualizar = id;
         while (true) {
            const to = editor.value.getNodeFromId(actualizar);
            const {
               outputs: {
                  output_1: {connections},
               },
            } = to;
            if (connections.length == 1) {
               const {node, output} = connections[0];
               const expression = editor.value.getNodeFromId(node);
                  if(expression.class == "Assignation"){
                   editor.value.updateNodeDataFromId(expression.id,{Value: to.data.Result, Name: expression.data.Name});
                   break;
                  }

               if (output == "input_1") {
                  const result = evaluateExpressions(expression.class, parseInt(to.data.Result), parseInt(expression.data.Number2));
                  const object = {Number1: parseInt(to.data.Result), Number2: parseInt(expression.data.Number2), Result: result};
                  editor.value.updateNodeDataFromId(node, object);
                  dispatch("setOperationAction", {id: node, value: object});
                  actualizar = node;
               } else if (output == "input_2") {
                  const result = evaluateExpressions(expression.class, parseInt(expression.data.Number1), parseInt(to.data.Result));
                  const object = {Number1: parseInt(expression.data.Number1), Number2: parseInt(to.data.Result), Result: result};
                  editor.value.updateNodeDataFromId(node, object);
                  dispatch("setOperationAction", {id: node, value: object});
                  actualizar = node;
               }
            } else {
               break;
            }
         }
      };

      const evaluateExpressions = (expressionType, number1, number2) => {
         number1 = isNaN(number1) ? 0 : number1;
         number2 = isNaN(number2) ? 0 : number2;
         let result = 0;
         if (expressionType == "Add") {
            result = number1 + number2;
         } else if (expressionType == "Sub") {
            result = number1 - number2;
         } else if (expressionType == "Multiply") {
            result = number1 * number2;
         } else if (expressionType == "Divide") {
            result = number1 / number2;
         }
         if (isNaN(result)) {
            result = 0;
         }
         return result;
      };

      onMounted(() => {
         var id = document.getElementById("drawflow");
         editor.value = new Drawflow(id, Vue, internalInstance.appContext.app._context);
         editor.value.start();

         editor.value.on("nodeCreated", (id) => {
            const typeNode = editor.value.getNodeFromId(id).class;
            if (typeNode == "Number") {
               dispatch("setNumberAction", {id: id, value: 0});
            } else if (typeNode == "Add" || typeNode == "Sub" || typeNode == "Multiply" || typeNode == "Divide") {
               dispatch("setOperationAction", {id: id, value: {Number1: 0, Number2: 0, Result: 0}});
            }
         });

         editor.value.on("nodeRemoved", (id) => {
            dispatch("deleteOperationAction", {id: id});
            dispatch("deleteNumberAction", {id: id});
         });

         editor.value.on("nodeDataChanged", (dataNode) => {
            updateValues(dataNode);
         });

         editor.value.on("connectionCreated", (dataNode) => {
            assignValues(dataNode);//Finish
         });

         editor.value.on("connectionRemoved", (dataNode) => {
            //console.log("connectionRemoved");
            removeValues(dataNode);
            
         });

         editor.value.registerNode("Number", <Number />, {}, {});
         editor.value.registerNode("Add", <Operation title="Add" />, {}, {});
         editor.value.registerNode("Sub", <Operation title="Sub" />, {}, {});
         editor.value.registerNode("Multiply", <Operation title="Multiply" />, {}, {});
         editor.value.registerNode("Divide", <Operation title="Divide" />, {}, {});
         editor.value.registerNode("Assignation", <Assignation />, {}, {});
         editor.value.registerNode("For", <For />, {}, {});
         editor.value.registerNode("If", <If />, {}, {});
         editor.value.registerNode("Else", <Else />, {}, {});
         editor.value.registerNode("Print", <Print />, {}, {});
      });

      const removeValues = (data) => {
         const input = editor.value.getNodeFromId(data.input_id);
         if (data.input_class == "input_1") {
            const result = evaluateExpressions(input.class, 0, parseInt(input.data.Number2));
            const object = {Number1: 0, Number2: parseInt(input.data.Number2), Result: result};
            editor.value.updateNodeDataFromId(data.input_id, object);
            dispatch("setOperationAction", {id: data.input_id, value: object});
            updateNodes(data.input_id);
         } else if (data.input_class == "input_2") {
            const result = evaluateExpressions(input.class, parseInt(input.data.Number1), 0);
            const object = {Number1: parseInt(input.data.Number1), Number2: 0, Result: result};
            editor.value.updateNodeDataFromId(data.input_id, object);
            dispatch("setOperationAction", {id: data.input_id, value: object});
            updateNodes(data.input_id);
         }
      };

      const getParentsNodes =(exportdata) =>{
         const dataNodes = exportdata.drawflow.Home.data;
         const array = Object.values(dataNodes);
         const isRoot = ({inputs,name}) => {
               if(name == "Assignation"){
                  if (inputs.input_1.connections.length == 1) {
                     return true;
                  }
               }
               if (inputs.hasOwnProperty('input_1') && (name == "For" || name == "If" )) {
                  if (inputs.input_1.connections.length == 0) {
                     return true;
                  }
               } 
               return false;
         };
         
         return array.filter((node) => isRoot(node,node.class)=== true && node.class !== "Number" && node.class !== "Add" && node.class !== "Sub" && node.class !== "Multiply" && node.class !== "Divide" && node.class !=="Print");
      }
      const codex = (array) =>{
         let code = "";
         let i = 0;
         while(array.length > 0){
            
          const node = array.shift();
          //console.log(node);
            let tabs = "";
            if(node.name == "For"){
                tabs = "\t";
               code += "for i "+ "in" + " range(" + node.data.Start + "," + node.data.Finish + "):\n";
            }else if(node.name == "If"){
               code += "if "+ node.data.Expression1 +" "+  node.data.Operator+" " + node.data.Expression2 + ":\n";
               tabs = "\t";
            }else if(node.name == "Assignation"){
               code += node.data.Name + " = " + node.data.Value + "\n";
               tabs = "";
            }
            if(node.outputs.output_1.connections.length == 1){
               let nodeId = node.outputs.output_1.connections[0].node;
               
              while(true){
                  let nodeActual =  editor.value.getNodeFromId(nodeId);
               if(nodeActual.name == "For"){
                  code += tabs+"for i "+ "in" + " range(" + nodeActual.data.Start + "," + nodeActual.data.Finish + "):\n";
               }else if(nodeActual.name == "If"){
                  code += tabs+"if "+ nodeActual.data.Expression1 +" "+  nodeActual.data.Operator+" " + nodeActual.data.Expression2 + ":\n";
               }else if(nodeActual.name == "Assignation"){
                  code += tabs+nodeActual.data.Name + " = " + nodeActual.data.Value + "\n";
               }else if(nodeActual.name =="Else"){
                  code += tabs+"else"+"\n";
               }else if(nodeActual.name == "Print"){
                 const valor  = editor.value.getNodeFromId(nodeActual.inputs.input_1.connections[0].node); 
                 code += tabs+"print("+valor.data.Name+")"+"\n";
               }
                 if(nodeActual.outputs.output_1.connections.length == 1){
                    //console.log(nodeActual.name)
                        if(nodeActual.name == "For" || nodeActual.name =="If" || nodeActual.name=="Else"){
                           console.log('tab')
                        tabs +="\t";
                        }else{
                           console.log('Tab Reiniciado')
                           tabs += "";
                        }
                        nodeId = nodeActual.outputs.output_1.connections[0].node;
                  }else{
                     break;
                  }
            }
            }
          
            }
            codeGenerator.value = code
         console.log(code);

      }
      const generatePythonCode = (e) => {
         var exportdata = editor.value.export();
         const dataNodes = exportdata.drawflow.Home.data;
         const array = Object.values(dataNodes);

         const parentsArray = getParentsNodes(exportdata);
         const code = codex(parentsArray);
         //console.log(parentsArray);
       
         //const statements = 

        console.log("Datas",exportdata);
      };

      //request to api to get the data with axios
      const  saveFile=async()=>{
           const requestOptions = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ Code: [codeGenerator.value] })
         };
         console.log({ Code: [codeGenerator.value] })
         await fetch("http://localhost:9000/insertCode",requestOptions)
         Swal.fire({
            position: 'center',
            icon: 'success',
            title: "Program Saved",
            showConfirmButton: false,
            timer: 1500,
         });
      }
      const getAllFiles = async()=>{
         const requestOptions = {
            method: "GET",
            headers: { "Content-Type": "application/json" },
         };
         const response = await fetch("http://localhost:9000/getAll",requestOptions);
         const data = await response.json();
         console.log(data.getAll[25].Code[0]);
      }


      return {listNodes, drag, drop, allowDrop, dialogVisible, dialogData, generatePythonCode, internalInstance,toggleModal,active,show,codeGenerator,saveFile,getAllFiles};
   }
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Roboto&display=swap");
#app {
   font-family: "Roboto", sans-serif;
   text-align: center;
   color: #050505;
   font-size: 13px;
   text-align: initial;
   width: 100vw;
   height: 100vh;
   padding: 0px;
   margin: 0px;
   background: #2b2c30;
   background-size: 20px 20px;
   background-image: radial-gradient(#494949 1px, transparent 1px);
}
#drawflow {
   box-sizing: border-box;
   width: 100%;
   height: 95%;

   text-align: initial;
   background: #2b2c30;
   background-size: 20px 20px;
   background-image: radial-gradient(#494949 1px, transparent 1px);
}
.column {
   width: 25px;
   border-right: 1px solid #494949;
}
.column ul {
   padding-inline-start: 0px;
   padding: 10px 10px;
}

ul {
   list-style-type: none;
}
.column li {
   background: transparent;
}
.pre-formatted {
  white-space: pre;
}
.node {
   /* border-radius: 8px;
    border: 2px solid #000000; */
   display: block;
   height: 40px;
   line-height: 40px;
   margin: 10px 0px;
   cursor: move;
   text-align: center;
}

.drawflow .drawflow-node {
   border-radius: 8px;
   background: #181818;
   border: 2px solid #494949;
   color: white;
   min-width: 250px;
}

.drawflow .drawflow-node.selected {
   background: #181818;
   border: 2px solid rgb(241, 241, 241);
}

.drawflow .drawflow-node .drawflow_content_node input,
.drawflow .drawflow-node .drawflow_content_node .el-select,
.drawflow .drawflow-node .drawflow_content_node button {
   width: 100%;
}
</style>
