<template>
    <div>
        <h4>Number</h4>
        
        <input class="form-control" type="number" v-model="number"  />
    </div>
</template>

<script>

export default {
    name: 'Number',
    data() {
        return {
            numero: 0,
        }
    },
}
</script>

<style>

.number {
    width: 100%;
}

</style>