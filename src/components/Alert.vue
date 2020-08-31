<template>
  <v-snackbar
    v-model="options.snackbar"
    :bottom="snackbars.y === 'bottom'"
    :color="options.color"
    :left="snackbars.x === 'left'"
    :multi-line="snackbars.mode === 'multi-line'"
    :right="snackbars.x === 'right'"
    :timeout="snackbars.timeout"
    :top="snackbars.y === 'top'"
    :vertical="snackbars.mode === 'vertical'"
  >
    {{ options.msg }}
    <template v-slot:action="{ attrs }">
        <v-btn
          dark
          text
          v-bind="attrs"
          @click="options.snackbar = false"
        >
          Close
        </v-btn>
      </template>
  </v-snackbar>
</template>

<script>
export default {
    props:['options'],
    data() {
        return {
            snackbars:{
                mode:'',
                timeout:6000,
                x: 'right',
                y:'bottom'
            }
        }
    },
}
</script>

<style>

</style>