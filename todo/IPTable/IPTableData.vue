<template>
    <td :class="dataClasses">
        <slot
            :formatter="formatter"
            :item="item"
            :placeholder="placeholder"
            :value="value"
            :text="text"
            :name="name"
            :content="content"
            :class="dataClasses"
            >{{ content }}</slot
        >
    </td>
</template>

<script>
import { useContentGetter } from "../../../composable/useContentGetter";
export default {
    name: "IPTableData",
    props: {
        formatter: {
            type: Function,
        },
        item: {
            default: null,
        },
        placeholder: {
            default: null,
        },
        value: {
            type: [String, Array, Number],
        },
        text: {
            type: String,
        },
        dataClasses: {
            default: null,
        },
    },
    setup(props) {
        const { content, name } = useContentGetter(props);
        return { content, name };
    },
};
</script>

<style></style>
