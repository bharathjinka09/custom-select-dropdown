import Select from "./select.js"

const customSelects = document.querySelectorAll("select[data-custom]")

customSelects.forEach(selectElement => {
  new Select(selectElement)
})
