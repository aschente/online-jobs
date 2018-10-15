<template>
  <div 
    class="alert" 
    :class="'alert-' + type"
    role="alert">
    {{ content }}
  </div>
</template>

<script>
export default {
  props: {
    message: {
      type: String
    },
    alertType: {
      type: String
    }
  },
  data() {
    return {
      content: this.message,
      type: this.alertType
    }
  },
}
</script>
