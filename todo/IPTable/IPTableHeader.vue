<template>
    <th>
        <slot :name="`header_${name}`" :value="value" :text="text" :class="headerClasses"
            >{{ text }}</slot
        >
    </th>
</template>

<script>
import { toPath } from "lodash";

export default {
    name: "IPTableHeader",
    props: {
        value: {
            type: [String, Array, Number]
        },
        text: {
            type: String
        },
        headerClasses: {
            default: null
        }
    },
    setup(props) {
        let name = toPath(props.value).join("_");
        return { name }
    },
};
</script>

<style></style>
