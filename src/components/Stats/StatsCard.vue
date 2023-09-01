<template>
  <cardSheet :show-footer-line="true" class="card-stats">
    <b-row>

      <b-col>
        <slot>
          <h5 v-if="title" class="card-title text-uppercase text-muted mb-0">{{ title }}</h5>
          <span v-if="subTitle" class="h2 font-weight-bold mb-0">{{ subTitle }}</span>
        </slot>
      </b-col>

      <b-col v-if="$slots.icon || icon" cols="auto">
        <slot name="icon">
          <b-icon :class="[`bg-${type}`, iconClasses]" :icon="iconClasses"
                  class="icon icon-shape text-white rounded-circle shadow">
            <i :class="icon"></i>
          </b-icon>
        </slot>
      </b-col>
    </b-row>

    <p class="mt-3 mb-0 text-sm">
      <slot name="footer">

      </slot>
    </p>
  </cardSheet>
</template>
<script>
import cardSheet from './Card.vue';

export default {
  name: 'stats-card',
  components: {
    cardSheet
  },
  props: {
    type: {
      type: String,
      default: 'primary'
    },
    icon: String,
    title: String,
    subTitle: String,
    iconClasses: [String, Array]
  }
};
</script>
<style></style>
