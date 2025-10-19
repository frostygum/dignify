<script setup lang="ts">
import { useSQLocal } from "@/hooks/useSQLocal";
import { Textarea } from '@/components/ui/textarea'
import DyButton from '@/components/ui/button/DyButton.vue'
import { ref, onMounted } from 'vue';

const client = useSQLocal();
const { isExecuting, errorMessage, filename } = client;
const sqlQuery = ref("");
const queryResult = ref<any[]>([]);
const queryerrorMessage = ref<string | null>(null);

const scrollContainer = ref(null);
const showShadowLeft = ref(false);
const showShadowRight = ref(false);

// Predefined example queries for testing
const exampleQueries = [
  {
    title: "List all tables",
    query: "SELECT name FROM sqlite_master WHERE type='table' ORDER BY name;"
  },
  {
    title: "Create",
    query: "CREATE TABLE IF NOT EXISTS configs (id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, name TEXT NOT NULL, description TEXT)"
  },
  {
    title: "Select all",
    query: "SELECT * FROM configs"
  },
  {
    title: "Insert",
    query: "INSERT INTO configs (name, description) VALUES ('test', 'lorem ipsum sit dolor amet')",
  },
  {
    title: "Update",
    query: "UPDATE configs SET name = 'updated test!' WHERE id = 1",
  },
  {
    title: "Delete",
    query: "DELETE FROM configs WHERE id = 1",
  },
  {
    title: "Drop Table",
    query: "DROP TABLE IF EXISTS configs",
  }
];

sqlQuery.value = exampleQueries[0].query

async function runQuery() {
  queryerrorMessage.value = null;
  queryResult.value = [];

  try {
    const result = await client.execute(sqlQuery.value);
    queryResult.value = result?.rows || [];
  } catch (err) {
    queryerrorMessage.value = JSON.stringify(err);
  }
}

const handleScroll = () => {
  if (scrollContainer.value) {
    const { scrollLeft, scrollWidth, clientWidth } = scrollContainer.value;

    // Show left shadow if scrolled past the beginning
    showShadowLeft.value = (scrollLeft + 1) > 1;

    // Show right shadow if not at the end of the scrollable content
    showShadowRight.value = (scrollLeft + 1) < (scrollWidth - clientWidth);
  }
};

onMounted(() => {
  // Initial check in case content is already overflowing
  handleScroll();
  // Optional: Add a ResizeObserver to re-evaluate shadows if container or content resizes
  // const resizeObserver = new ResizeObserver(handleScroll);
  // resizeObserver.observe(scrollContainer.value);
  // onUnmounted(() => resizeObserver.disconnect());
});

const renderBoxShadow = () => {
  if (showShadowLeft.value && showShadowRight.value) {
    return 'inset 10px 0 10px -10px rgba(0, 0, 0, 0.6), inset -10px 0 10px -10px rgba(0, 0, 0, 0.6)'
  } else if (showShadowLeft.value) {
    return 'inset 10px 0 10px -10px rgba(0, 0, 0, 0.6)'
  } else if (showShadowRight.value) {
    return 'inset -10px 0 10px -10px rgba(0, 0, 0, 0.6)'
  } else {
    return ''
  }
}
</script>

<template>
  <div class="max-w-7xl mx-auto px-4 py-6">
    <h2 class="text-2xl font-bold">SQLite Playground</h2>

    <span>Source DB: {{ filename }}</span>
    <!-- Example queries -->
    <div class="mt-4">
      <h3 class="text-sm font-medium">Example Queries:</h3>
      <div
        class="mt-2"
        :style="{position: 'relative'}"
      >
        <div
          ref="scrollContainer"
          class="flex gap-2 scroll-container py-1"
          @scroll="handleScroll"
        >
          <dy-button
            v-for="example in exampleQueries"
            :key="example.title"
            @click="sqlQuery = example.query"
          >
            {{ example.title }}
          </dy-button>
        </div>
      
        <div
          class="h-full"
          :style="{
            position: 'absolute',
            top: 0,
            width: '100%',
            pointerEvents: 'none',
            boxShadow: `${renderBoxShadow()}`
          }"
        >
        </div>
      </div>
    </div>

    <!-- Query input -->
    <div class="mt-6">
      <Textarea
        v-model="sqlQuery"
        rows="4"
        :disabled="isExecuting"
      />
      <dy-button
        :disabled="isExecuting"
        class="mt-2 w-full"
        @click="runQuery"
      >
        {{ isExecuting ? "Running..." : "Run Query" }}
      </dy-button>
    </div>

    <!-- errorMessage display -->
    <div
      v-if="errorMessage || queryerrorMessage"
      class="mt-4 p-4 rounded-lg bg-red-50 text-red-600"
    >
      {{ errorMessage || queryerrorMessage }}
    </div>

    <!-- Results table -->
    <div v-if="queryResult.length" class="mt-4">
      <h3 class="text-lg font-semibold">Results:</h3>
      <div class="mt-2 overflow-x-auto">
        <table class="w-full">
          <thead>
            <tr>
              <th
                v-for="column in Object.keys(queryResult[0])"
                :key="column"
                class="px-4 py-2 text-left"
              >
                {{ column }}
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(row, index) in queryResult" :key="index">
              <td
                v-for="column in Object.keys(row)"
                :key="column"
                class="px-4 py-2"
              >
                {{ row[column] }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<style scoped>
  .scroll-container {
    overflow-x: auto; /* Enable horizontal scrolling */
    white-space: nowrap; /* Keep content on a single line */
    position: relative; /* Needed for shadow positioning */
  }
</style>