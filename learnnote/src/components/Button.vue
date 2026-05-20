<template>
  <button
    class="button"
    :class="buttonClasses"
    :disabled="disabled || loading"
    @click="$emit('click', $event)"
  >
    <slot />
  </button>
</template>

<script>
export default {
  name: 'Button',

  emits: ['click'],

  props: {
    color: {
      type: String,
      default: 'primary',
      validator(value) {
        return [
          'primary',
          'link',
          'info',
          'success',
          'warning',
          'danger',
          'white',
          'light',
          'dark',
          'black',
          'text',
          'ghost',
        ].includes(value)
      },
    },

    size: {
      type: String,
      default: 'normal',
      validator(value) {
        return ['small', 'normal', 'medium', 'large'].includes(value)
      },
    },

    fullwidth: {
      type: Boolean,
      default: false,
    },

    outlined: {
      type: Boolean,
      default: false,
    },

    loading: {
      type: Boolean,
      default: false,
    },

    rounded: {
      type: Boolean,
      default: false,
    },

    disabled: {
      type: Boolean,
      default: false,
    },
  },

  computed: {
    buttonClasses() {
      return [
        this.color ? `is-${this.color}` : '',
        this.size !== 'normal' ? `is-${this.size}` : '',
        {
          'is-fullwidth': this.fullwidth,
          'is-outlined': this.outlined,
          'is-loading': this.loading,
          'is-rounded': this.rounded,
        },
      ]
    },
  },
}
</script>