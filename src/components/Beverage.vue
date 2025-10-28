<script setup lang="ts">
import Contents from "./Contents.vue";
import Mug from "./Mug.vue";
import Syrup from "./Syrup.vue";
import Base from "./Base.vue";
import Creamer from "./Creamer.vue";
import Hot from "./Hot.vue";
import Cold from "./Cold.vue";
import { computed } from "vue";

type Props = {
  isIced: boolean;
  selectedBaseColor: string;
  selectedCreamerColor: string;
  selectedSyrupColor: string;
};

const props = defineProps<Props>();
const noCreamer = computed(() => props.selectedCreamerColor === "transparent");
const noSyrup = computed(() => props.selectedSyrupColor === "#c6c6c6");
const hasSyrup = computed(() => !noSyrup.value);
const hasCreamer = computed(() => !noCreamer.value);
</script>

<template>
  <Mug>
    <Cold v-if="isIced" />
    <Hot v-else />

    <Contents>
      <template v-if="noCreamer && noSyrup" v-slot:bottom>
        <Base :color="selectedBaseColor" />
      </template>

      <template v-else-if="noSyrup && hasCreamer" v-slot:bottom>
        <Creamer :color="selectedCreamerColor"/>
      
        <Base :color="selectedBaseColor" />
      </template>

      <template v-if="hasSyrup && hasCreamer" v-slot:top>
        <Creamer :color="selectedCreamerColor" />
      </template>
    
      <template v-if="hasSyrup" v-slot:mid>
        <Syrup :color="selectedSyrupColor" />
      </template>

      <template v-if="hasSyrup" v-slot:bottom>
        <Base :color="selectedBaseColor" />
      </template>
    </Contents>
  </Mug>
</template>
