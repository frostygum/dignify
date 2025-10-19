import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import Badge from './Badge.vue'
import { badgeVariants } from '.' // Assuming badgeVariants is exported from index.ts

describe('Badge.vue', () => {
  it('renders slot content', () => {
    const wrapper = mount(Badge, {
      slots: {
        default: 'Test Badge',
      },
    })
    expect(wrapper.text()).toBe('Test Badge')
  })

  it('applies default variant classes when no variant prop is provided', () => {
    const wrapper = mount(Badge)
    const expectedClasses = badgeVariants({ variant: 'default' })
    // Check if all expected classes are present. Order might differ due to twMerge.
    expectedClasses.split(' ').forEach((cls) => {
      if (cls) expect(wrapper.classes()).toContain(cls)
    })
    // More robust check using element's classList
    const elementClasses = wrapper.element.classList
    expectedClasses.split(' ').forEach((cls) => {
      if (cls) expect(elementClasses.contains(cls)).toBe(true)
    })
  })

  const variants = ['secondary', 'destructive', 'outline'] as const

  variants.forEach((variant) => {
    it(`applies correct classes for variant "${variant}"`, () => {
      const wrapper = mount(Badge, {
        props: { variant },
      })
      const expectedClasses = badgeVariants({ variant })
      const elementClasses = wrapper.element.classList
      expectedClasses.split(' ').forEach((cls) => {
        if (cls) expect(elementClasses.contains(cls)).toBe(true)
      })
    })
  })

  it('merges variant classes with custom classes', () => {
    const customClass = 'my-custom-class'
    const variant = 'secondary'
    const wrapper = mount(Badge, {
      props: {
        variant: variant,
        class: customClass,
      },
    })

    const expectedVariantClasses = badgeVariants({ variant })
    const elementClasses = wrapper.element.classList

    // Check for variant classes
    expectedVariantClasses.split(' ').forEach((cls) => {
      if (cls) expect(elementClasses.contains(cls)).toBe(true)
    })

    // Check for custom class
    expect(elementClasses.contains(customClass)).toBe(true)

    // Optional: Check combined classes using cn logic if needed for exact match
    // const expectedCombined = cn(badgeVariants({ variant }), customClass);
    // const actualClasses = Array.from(elementClasses).sort().join(' ');
    // const expectedClassesSorted = expectedCombined.split(' ').sort().join(' ');
    // expect(actualClasses).toBe(expectedClassesSorted); // This might be too brittle due to twMerge specifics
  })
})
