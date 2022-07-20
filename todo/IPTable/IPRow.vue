<template>
    <tr :class="rowClasses">
        <slot :name="`row`" :class="rowClasses">
            <slot v-bind="$attrs"></slot>
        </slot>
    </tr>
</template>

<script>
export default {
    name: 'IPHeaderRow',
    props: {
        rowClasses: {
            default: null
        }
    }
};
</script>

<style></style>
