<template>
  <div class="bb-table" :class="{ compact }">
    <div class="table-container">
      <table>
        <thead>
          <tr>
            <th
              class="check"
              v-if="selectable && (selection || selectableSingle)"
            >
              <BbCheckbox
                v-if="!selectableSingle"
                :checked="collection.length == checkedItems.length"
                @input="toggleCheckAll"
              />
            </th>
            <th
              v-for="(column, cIndex) in columns"
              :key="cIndex"
              :class="{ ...getCellAlignment(column.align) }"
            >
              {{ column.label }}
            </th>
            <th v-if="filteredActions.length"></th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(item, index) in collection"
            :key="item.id ?? `idx-${index}`"
          >
            <td
              class="check"
              v-if="selectable && (selection || selectableSingle)"
            >
              <BbRadio
                v-if="selectableSingle"
                name="bb-table-radio"
                :disabled="
                  selectableCondition ? !selectableCondition(item) : false
                "
                :checked="itemIsChecked(item)"
                @input="(e: any) => checkItem(e, item)"
              />
              <BbCheckbox
                v-else
                :disabled="
                  selectableCondition ? !selectableCondition(item) : false
                "
                :checked="itemIsChecked(item)"
                @input="(e: any) => checkItem(e, item)"
              />
            </td>
            <td
              v-for="(column, cIndex) in columns"
              :key="cIndex"
              :class="{
                ...getCellAlignment(column.align),
                ...getClasses(column.classes, item),
              }"
            >
              <template v-if="'key' in column">
                <span
                  :title="
                    getFormattedData(getData(item, column.key), column.format)
                  "
                >
                  {{
                    getFormattedData(getData(item, column.key), column.format)
                  }}
                </span>
              </template>
              <template v-else-if="'computed' in column">
                {{ column.computed ? column.computed(item) : null }}
              </template>
              <slot
                v-else-if="'slot'"
                :name="column.slot"
                :item="item"
                :index="index"
                :column="column"
                :column-index="cIndex"
              >
              </slot>
            </td>
            <td v-if="filteredActions.length">
              <div class="actions">
                <template v-for="action in filteredActions" :key="action">
                  <button
                    v-if="action.condition ? action.condition(item) : false"
                    :class="action.name"
                    @click="
                      $emit('action', {
                        action: action.name,
                        item,
                      })
                    "
                  >
                    <LoginIcon v-if="action.name == 'go'" class="rotate-180" />
                    <LoginIcon v-if="action.name == 'restore'" />
                    <EyeIcon v-if="action.name == 'view'" />
                    <PencilIcon v-if="action.name == 'edit'" />
                    <UserIcon v-if="action.name == 'impersonate'" />
                    <TrashIcon v-if="action.name == 'delete'" />
                  </button>
                </template>
              </div>
            </td>
          </tr>
        </tbody>
      </table>

      <div v-if="!collection.length" class="empty">
        <h2 class="title-md text-bb-gray-500">
          {{ noItemsText ?? "No items" }}
        </h2>
      </div>
    </div>

    <div v-if="links && links.length > 3" class="links">
      <Link
        v-for="(link, i) in links"
        :key="i"
        :class="{ active: link.active }"
        :href="link.url"
        preserve-state
        preserve-scroll
      >
        <ChevronDoubleLeftIcon v-if="i == 0" class="h-3 w-3" />
        <ChevronDoubleRightIcon
          v-else-if="i == links.length - 1"
          class="h-3 w-3"
        />
        <span v-else>{{ link.label }}</span>
      </Link>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watch } from "vue";
import BbCheckbox from "@/components/standalone/BbCheckbox.vue";
import BbRadio from "@/components/standalone/BbRadio.vue";
import {
  EyeIcon,
  PencilIcon,
  TrashIcon,
  UserIcon,
  ChevronDoubleLeftIcon,
  ChevronDoubleRightIcon,
} from "@heroicons/vue/solid";
import { LoginIcon } from "@heroicons/vue/outline";
import {
  getCellAlignment,
  getClasses,
  getData,
  getFormattedData,
} from "@/utilities/tableUtilities";
import type {
  ColumnSchema,
  LinkSchema,
  ActionSchema,
} from "@/utilities/tableUtilities";

interface Props {
  collection: any[];
  columns: ColumnSchema[];
  links?: LinkSchema[];
  actions?: ActionSchema[];
  noItemsText?: string;
  compact?: boolean;
  selectable?: boolean;
  selectableSingle?: boolean;
  selectableCondition?: (item: any) => boolean;
  selection?: any[] | any;
}
const props = defineProps<Props>();
const emit = defineEmits(["update:selection", "action"]);

const filteredActions = computed(() => {
  const fa: ActionSchema[] = [];
  if (!props.actions) return fa;
  for (let i = 0; i < props.actions.length; i++) {
    const action = props.actions[i];
    if (typeof action === "object") {
      if (!("name" in action) || !("condition" in action)) continue;
      fa.push(action);
    } else {
      fa.push({ name: action, condition: () => true });
    }
  }
  return fa;
});

// selection
const checkedItems = ref<any>(props.selection);

watch(checkedItems, () => {
  emit("update:selection", checkedItems.value);
});

function toggleCheckAll(event: any) {
  checkedItems.value = [];
  if (event.target.checked) {
    if (props.selectableCondition) {
      return (checkedItems.value = props.collection.filter((item) => {
        return props.selectableCondition
          ? props.selectableCondition(item)
          : false;
      }));
    }
    checkedItems.value = [...props.collection];
  }
}

function itemIsChecked(item: any) {
  if (props.selectableSingle) return checkedItems.value == item;
  return checkedItems.value?.includes(item);
}

function checkItem(event: any, item: any) {
  if (props.selectableSingle) {
    if (event.target.checked) return (checkedItems.value = item);
    return (checkedItems.value = null);
  }
  if (event.target.checked) return checkedItems.value.push(item);
  const index = checkedItems.value.findIndex((i: any) => i === item);
  if (index > -1) checkedItems.value.splice(index, 1);
}
</script>
