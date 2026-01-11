import { ref, onMounted, onUnmounted } from 'vue';

export const useWindowSize = () => {
  const width = ref(window.innerWidth);
  const height = ref(window.innerHeight);

  const handleResize = () => {
    width.value = window.innerWidth;
    height.value = window.innerHeight;
  }

  onMounted(() => {
    // Add the event listener when the component is mounted
    window.addEventListener('resize', handleResize);
  });

  onUnmounted(() => {
    // Clean up the event listener when the component is unmounted
    window.removeEventListener('resize', handleResize);
  });

  return { width, height };
}