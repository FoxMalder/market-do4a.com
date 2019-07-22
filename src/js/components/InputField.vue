<template>
  <div class="input-field input-field_primary" :class="{active: isActive}">
    <label class="input-field__label"
            :for="'property-' + prop.id">{{prop.required ? prop.name + '*' : prop.name}}</label>
    <input class="input-field__input"
            :value="value"
            @input="$emit('input', $event.target.value)"
            @focus="isActive = true"
            @blur="$event.target.value === '' && (isActive = false)"
            :id="'property-' + prop.id"
            :name="prop.fieldName"
            :type="type"
            :autocomplete="autocomplete"
            :required="prop.required">
  </div>
</template>

<script>
  export default {
    name: "InputField",
    props: ['prop', 'value'],
    data() {
      return {
        isActive: this.value !== '',
        type: null,
        autocomplete: null,
      }
    },
    mounted() {
      
      switch (this.prop.code) {
        case 'EMAIL':
          this.type = 'email';
          this.autocomplete = 'email';
          break;
        case 'FIO':
          this.type = 'text';
          this.autocomplete = 'name';
          break;
        case 'PHONE':
          this.type = 'tel';
          this.autocomplete = 'tel';
          break;
        default:
          this.type = 'text';
          this.autocomplete = 'false';
          break;
      }
    }
  }
</script>
