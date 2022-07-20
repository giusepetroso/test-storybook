<template>
  <div class="bb-bredcrumbs-container">
    <template v-for="(b, i) in breadcrumbs" :key="i">
      <div class="bb-bredcrumbs-item">
        <template v-if="i < breadcrumbs.length - 1 && !noLinks">
          <a v-if="b.href" :href="b.href" class="bb-bredcrumbs-link">
            {{ b.label }}
          </a>
          <div v-else class="bb-bredcrumbs-no-link">
            {{ b.label }}
          </div>
        </template>
        <template v-else>
          <div
            class="font-bold"
            :class="{
              'bb-bredcrumbs-last-item': !noLinks,
            }"
          >
            {{ b.label }}
          </div>
        </template>

        <template v-if="i < breadcrumbs.length - 1">
          <ChevronRightIcon class="bb-bredcrumbs-chevron" />
        </template>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import { ChevronRightIcon } from "@heroicons/vue/solid";

interface Breadcrumb {
  href?: string;
  label: string;
}

interface Props {
  breadcrumbs: Breadcrumb[];
  noLinks: boolean;
}
defineProps<Props>();
</script>
