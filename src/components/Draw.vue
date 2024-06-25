<template>
  <canvas id="myCanvas" width="500" height="500"></canvas>
</template>

<script>

import { ref, onMounted } from "@vue/runtime-core";
import 'ts-draw';

export default {
  name: "DrawScene",
  setup() {
    const canvas = ref(null);

    onMounted(() => {
      
        const canvas = document.getElementById( 'myCanvas' )
        const draw = new window.Draw( canvas )
        draw.addElement( "circle", {
            x     : 150,
            y     : 150,
            radius: 50
            } )

draw.render()
    
    });

   
  },
};
</script>