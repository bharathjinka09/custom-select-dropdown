class Select {
  constructor(element) {
    this.element = element
    this.value = element.value
    this.options = getFormattedOptions(element.querySelectorAll("option"))
    this.customElement = document.createElement("div")
    this.labelElement = document.createElement("span")
    this.optionsCustomElement = document.createElement("ul")
    setupCustomElement(this)
    element.style.display = "none"
    element.after(this.customElement)
  }

  get selectedOption() {
    return this.options.find(option => option.selected)
  }

  get selectedOptionIndex() {
    return this.options.indexOf(this.selectedOption)
  }

  selectValue(value) {
    const newSelectedOption = this.options.find(
      option => option.value === value
    )
    const prevSelectedOption = this.selectedOption
    prevSelectedOption.selected = false
    prevSelectedOption.element.selected = false

    newSelectedOption.selected = true
    newSelectedOption.element.selected = true
    this.options.forEach(option => {
      const selected = option.value === value
      option.selected = selected
      option.element.selected = selected
    })
    this.labelElement.innerText = newSelectedOption.label
    for (let option of this.optionsCustomElement.children) {
      if (option.dataset.value === value) {
        option.classList.add("selected")
        option.scrollIntoView({ block: "nearest" })
      } else {
        option.classList.remove("selected")
      }
    }
  }
}

function setupCustomElement(select) {
  select.customElement.classList.add("custom-select-container")
  select.customElement.tabIndex = 0

  select.labelElement.classList.add("custom-select-value")
  select.labelElement.innerText = select.selectedOption.label
  select.customElement.append(select.labelElement)

  select.optionsCustomElement.classList.add("custom-select-options")
  select.options.forEach(option => {
    const optionElement = document.createElement("li")
    optionElement.classList.add("custom-select-option")
    optionElement.classList.toggle("selected", option.selected)
    optionElement.innerText = option.label
    optionElement.dataset.value = option.value
    optionElement.addEventListener("click", () => {
      select.selectValue(option.value)
      select.optionsCustomElement.classList.remove("show")
    })
    select.optionsCustomElement.append(optionElement)
  })
  select.customElement.append(select.optionsCustomElement)

  select.labelElement.addEventListener("click", () => {
    select.optionsCustomElement.classList.toggle("show")
  })

  select.customElement.addEventListener("keydown", e => {
    switch (e.code) {
      case "Space":
        select.optionsCustomElement.classList.toggle("show")
        break
      case "ArrowUp":
        const prevOption = select.options[select.selectedOptionIndex - 1]
        console.log(prevOption, select.selectedOptionIndex)
        if (prevOption) select.selectValue(prevOption.value)
        break
      case "ArrowDown":
        const nextOption = select.options[select.selectedOptionIndex + 1]
        console.log(nextOption, select.selectedOptionIndex)
        if (nextOption) select.selectValue(nextOption.value)
        break
      case "Enter":
      case "Escape":
        select.optionsCustomElement.classList.remove("show")
        break
    }
  })

  select.customElement.addEventListener("blur", () => {
    select.optionsCustomElement.classList.remove("show")
  })
}

function getFormattedOptions(optionElements) {
  return [...optionElements].map(optionElement => {
    return {
      value: optionElement.value,
      label: optionElement.label,
      selected: optionElement.selected,
      element: optionElement,
    }
  })
}
