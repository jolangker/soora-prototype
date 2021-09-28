<template>
  <div
    class="
      h-screen
      w-2/3
      bg-intro bg-cover bg-no-repeat
      relative
      overflow-hidden
    "
  >
    <div class="absolute inset-0 bg-black bg-opacity-60">
      <div class="text-white">
        <div
          v-for="(slide, index) in slides"
          :key="slide"
          class="w-full relative"
        >
          <transition name="slide">
            <div
              v-show="index === visibleIndex"
              class="absolute h-screen flex flex-col justify-center px-20"
            >
              <h2 class="text-5xl">{{ slide.header }}</h2>
              <p class="mt-5 font-semibold opacity-70">
                {{ slide.body }}
              </p>
            </div>
          </transition>
        </div>
        <div class="absolute bottom-10 w-full flex space-x-1 justify-center">
          <button
            v-for="(slide, index) in slides"
            :key="index"
            @click="changeSlide(index)"
            class="h-2 w-8 rounded-full bg-gray-400"
            :class="{ 'bg-azure': index === visibleIndex }"
          ></button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, ref } from "@vue/reactivity";
export default {
  setup() {
    const slides = [
      {
        header: "Welcome to our SOORA",
        body: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliaseveniet eum vitae animi, quas maxime amet vel.",
      },
      {
        header: "Lorem ipsum dolor sir amet consecture",
        body: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliaseveniet eum vitae animi, quas maxime amet vel. Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliaseveniet eum vitae animi, quas maxime amet vel.",
      },
      {
        header: "Lorem ipsum dolor",
        body: "Lorem ipsum dolor sit amet consectetur adipisicing elit",
      },
    ];
    const visibleIndex = ref(0);

    setInterval(() => {
      if (visibleIndex.value >= slides.length - 1)
        return (visibleIndex.value = 0);
      visibleIndex.value++;
    }, 15000);

    const changeSlide = (index) => {
      visibleIndex.value = index;
    };

    return {
      slides,
      visibleIndex,
      changeSlide,
    };
  },
};
</script>

<style>
.slide-enter-active {
  animation: slideInLeft 0.5s ease-in-out;
}
.slide-leave-active {
  animation: slideOutLeft 0.5s ease-in-out;
}

@keyframes slideInLeft {
  from {
    transform: translateX(100%);
  }
  to {
    transform: translateX(0);
  }
}

@keyframes slideOutLeft {
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(-100%);
  }
}
</style>
