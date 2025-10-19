import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import DyIcon from '../DyIcon.vue' // Adjust path if necessary

// A simple dummy SVG path for testing
const dummyPath = 'M10 10 H 90 V 90 H 10 L 10 10'

describe('DyIcon.vue', () => {
  it('renders an svg element by default', () => {
    const wrapper = mount(DyIcon, {
      props: { path: dummyPath },
    })
    expect(wrapper.find('svg').exists()).toBe(true)
  })

  it('renders the correct path', () => {
    const wrapper = mount(DyIcon, {
      props: { path: dummyPath },
    })
    expect(wrapper.find('path').attributes('d')).toBe(dummyPath)
  })

  it('applies default size (18) as width and height', () => {
    const wrapper = mount(DyIcon, {
      props: { path: dummyPath },
    })
    const svg = wrapper.find('svg')
    expect(svg.attributes('width')).toBe('18')
    expect(svg.attributes('height')).toBe('18')
    // Check style as well, as it's explicitly set
    expect(svg.element.style.fontSize).toBe('18px')
  })

  it('applies custom size as width and height', () => {
    const customSize = 32
    const wrapper = mount(DyIcon, {
      props: { path: dummyPath, size: customSize },
    })
    const svg = wrapper.find('svg')
    expect(svg.attributes('width')).toBe(String(customSize))
    expect(svg.attributes('height')).toBe(String(customSize))
    expect(svg.element.style.fontSize).toBe(`${customSize}px`)
  })

  it('applies default viewbox', () => {
    const wrapper = mount(DyIcon, {
      props: { path: dummyPath },
    })
    expect(wrapper.find('svg').attributes('viewBox')).toBe('0 0 24 24')
  })

  it('applies custom viewbox', () => {
    const customViewbox = '0 0 48 48'
    const wrapper = mount(DyIcon, {
      props: { path: dummyPath, viewbox: customViewbox },
    })
    expect(wrapper.find('svg').attributes('viewBox')).toBe(customViewbox)
  })

  it('applies rotation via transform style', () => {
    const rotation = 90
    const wrapper = mount(DyIcon, {
      props: { path: dummyPath, rotate: rotation },
    })
    expect(wrapper.find('svg').element.style.transform).toContain(`rotate(${rotation}deg)`)
  })

  it('applies horizontal flip via transform style', () => {
    const wrapper = mount(DyIcon, {
      props: { path: dummyPath, flip: 'horizontal' },
    })
    expect(wrapper.find('svg').element.style.transform).toContain('scaleX(-1)')
    expect(wrapper.find('svg').element.style.transform).toContain('scaleY(1)')
  })

  it('applies vertical flip via transform style', () => {
    const wrapper = mount(DyIcon, {
      props: { path: dummyPath, flip: 'vertical' },
    })
    expect(wrapper.find('svg').element.style.transform).toContain('scaleX(1)')
    expect(wrapper.find('svg').element.style.transform).toContain('scaleY(-1)')
  })

  it('applies no flip by default', () => {
    const wrapper = mount(DyIcon, {
      props: { path: dummyPath },
    })
    const transform = wrapper.find('svg').element.style.transform
    // Default rotate is 0, default flip is none (scaleX(1) scaleY(1))
    expect(transform).toContain('rotate(0deg)')
    expect(transform).toContain('scaleX(1)')
    expect(transform).toContain('scaleY(1)')
  })

  it('applies custom class', () => {
    const customClass = 'my-icon-class'
    const wrapper = mount(DyIcon, {
      props: { path: dummyPath, class: customClass },
    })
    expect(wrapper.find('svg').classes()).toContain(customClass)
  })

  it('does not apply spin animation by default', () => {
    const wrapper = mount(DyIcon, {
      props: { path: dummyPath },
    })
    expect(wrapper.find('svg').classes()).not.toContain('animate-spin')
  })

  it('applies spin animation when spin prop is true', () => {
    const wrapper = mount(DyIcon, {
      props: { path: dummyPath, spin: true },
    })
    expect(wrapper.find('svg').classes()).toContain('animate-spin')
  })
})
