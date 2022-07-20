<template>
    <div
        class="collapsible-container transition-all"
        :aria-expanded="!!open"
        :style="{ maxHeight: `${maxHeight}px` }"
        :class="{ '!max-h-0 overflow-hidden': !open, invisible: !visible }"
    >
        <div class="collapsible-content" ref="content">
            <slot></slot>
        </div>
    </div>
</template>

<script>
import { wait } from '../../utils/functions';

export default {
    name: 'IPCollapsible',
    props: {
        modelValue: {
            type: Boolean
        },
        // When content will not expand we can be more precise
        contentWillExpand: {
            type: Boolean
        },
        initialMaxHeight: {
            type: Number,
            default: 1000
        }
    },
    data(){
        return {
            open: !!this.modelValue,
            visible: !!this.modelValue,
            maxHeight: this.initialMaxHeight
        }
    },
    mounted(){
        if(!this.contentWillExpand) {
            this.maxHeight = this.$refs.content.clientHeight
        }
    },
    methods: {
        async toggle(){
            this.open = !this.open;
            this.onChange()
            await this.adjustAccessibility()
        },
        async show(){
            this.open = true
            this.onChange()
            await this.adjustAccessibility()
        },
        async close(){
            this.open = false;
            this.onChange()
            await this.adjustAccessibility()
        },
        async onChange(){
            this.$emit('update:modelValue', this.open)
        },
        async adjustAccessibility(){
            if(this.open) {
                this.visible = true;
            } else {
                await wait(150);
                this.visible = this.open;
            }
        }
    },
    watch: {
        async modelValue(value) {
            this.open = !!this.modelValue;
            await this.adjustAccessibility();
        },
        '$store.state.ui.breakpoint'(){
            this.maxHeight = this.$refs.content.clientHeight
        }
    }
}
</script>

<style></style>
