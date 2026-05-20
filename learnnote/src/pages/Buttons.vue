<script>
import Btn from '../components/Button.vue'

export default {
  name: 'Buttons',

  components: {
    Btn,
  },
}
</script>

<template>
  <section class="section">
    <div class="container">
      <h1 class="title">Reusable Btn Component</h1>

      <div class="buttons mb-5">
        <Btn color="primary">Primary</Btn>
        <Btn color="success">Success</Btn>
        <Btn color="danger">Danger</Btn>
        <Btn color="warning">Warning</Btn>
      </div>

      <div class="buttons mb-5">
        <Btn size="small">Small</Btn>
        <Btn size="medium">Medium</Btn>
        <Btn size="large">Large</Btn>
      </div>

      <div class="buttons mb-5">
        <Btn outlined>Outlined</Btn>
        <Btn rounded>Rounded</Btn>
        <Btn loading>Loading</Btn>
        <Btn disabled>Disabled</Btn>
      </div>

      <div class="mb-5">
        <Btn fullwidth color="info">
          Full Width Button
        </Btn>
      </div>
    </div>
  </section>
</template>

