import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import DyButton from './DyButton.vue'
import { dyButtonVariants } from '.' // Import variants for testing class application

describe('DyButton', () => {
  it('renders correctly with default props', () => {
    const wrapper = mount(DyButton)
    expect(wrapper.find('button').exists()).toBe(true)
    // Check default classes (variant: default, size: default)
    expect(wrapper.classes()).toContain(dyButtonVariants({ variant: 'default', size: 'default' }))
  })

  it('renders slot content', () => {
    const slotContent = 'Click Me'
    const wrapper = mount(DyButton, {
      slots: {
        default: slotContent,
      },
    })
    expect(wrapper.text()).toBe(slotContent)
  })

  it('applies variant and size classes correctly', () => {
    const wrapper = mount(DyButton, {
      props: {
        variant: 'destructive',
        size: 'sm',
      },
    })
    expect(wrapper.classes()).toContain(dyButtonVariants({ variant: 'destructive', size: 'sm' }))
    expect(wrapper.classes()).not.toContain(
      dyButtonVariants({ variant: 'default', size: 'default' }),
    )
  })

  it('applies custom class', () => {
    const customClass = 'my-custom-button'
    const wrapper = mount(DyButton, {
      props: {
        class: customClass,
      },
    })
    expect(wrapper.classes()).toContain(customClass)
    // Ensure default variant/size classes are still applied
    expect(wrapper.classes()).toContain(dyButtonVariants({ variant: 'default', size: 'default' }))
  })

  it('calls click handler when clicked', async () => {
    const handleClick = vi.fn()
    const wrapper = mount(DyButton, {
      props: {
        click: handleClick,
      },
    })
    await wrapper.trigger('click')
    expect(handleClick).toHaveBeenCalledTimes(1)
  })

  it('renders as a different element when "as" prop is provided', () => {
    const wrapper = mount(DyButton, {
      props: {
        as: 'a',
      },
      slots: {
        default: 'Link Button',
      },
    })
    expect(wrapper.find('a').exists()).toBe(true)
    expect(wrapper.find('button').exists()).toBe(false)
    expect(wrapper.text()).toBe('Link Button')
    // Check classes are still applied
    expect(wrapper.classes()).toContain(dyButtonVariants({ variant: 'default', size: 'default' }))
  })

  it('renders child component when "asChild" prop is true', () => {
    const ChildComponent = { template: '<div data-testid="child">Child</div>' }
    const wrapper = mount(DyButton, {
      props: {
        asChild: true,
      },
      slots: {
        default: ChildComponent,
      },
    })
    // The button itself shouldn't render, only the child
    expect(wrapper.find('button').exists()).toBe(false)
    expect(wrapper.find('[data-testid="child"]').exists()).toBe(true)
    // Check classes are applied to the child
    expect(wrapper.find('[data-testid="child"]').classes()).toContain(
      dyButtonVariants({ variant: 'default', size: 'default' }),
    )
  })

  it('is disabled when disabled prop is true', () => {
    const wrapper = mount(DyButton, {
      props: {
        disabled: true,
      },
    })
    expect(wrapper.attributes('disabled')).toBeDefined()
    // Check for disabled opacity class (part of the base CVA styles)
    expect(wrapper.classes()).toContain('disabled:opacity-50') // Or check for the actual applied class if different
  })
})
