<template>
    <IPAsyncAutocomplete
        v-bind="$attrs"
        :emptyMessage="`Scrivi per inserire un tag`"
        :chips="true"
        :multiple="true"
        :addOptions="true"
        :searchFunction="searchFunction"
    >
        <template #dropicon>
            <span></span>
        </template>
        <template v-for="(index, name) in $slots" v-slot:[name]="data">
            <slot :name="name" v-bind="data" />
        </template>
    </IPAsyncAutocomplete>
</template>

<script>
import IPAsyncAutocomplete from "./IPAsyncAutocomplete.vue";

export default {
    name: "IPTagAutocomplete",
    components: { IPAsyncAutocomplete },
    methods: {
        searchFunction(){
            return this.$attrs.modelValue
        }
    }
};
</script>

<style></style>
