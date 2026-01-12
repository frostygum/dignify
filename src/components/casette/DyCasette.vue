<script setup lang="ts">
import { DyIcon } from '@/components/ui';
import { mdiPlus } from '@mdi/js';

const props = withDefaults(defineProps<{
  image?: string;
  animate?: boolean;
}>(), {
  image: '',
  animate: false
})
</script>

<template>
  <div class="main">
    <div class="card">
      <div class="ups">
        <div class="screw">
          <dy-icon :path="mdiPlus" />
        </div>
        <div class="screw">
          <dy-icon :path="mdiPlus" />
        </div>
      </div>
      <div class="card1">
        <div
          class="parent_middle"
        >
           <div
            class="child_middle middle_content"
            :style="{
              backgroundImage: `url(${props.image})`
            }"
          />
          <div class="child_middle translucent">
            <div class="sticker">
            </div>
          </div>
          <div class="child_middle w-full h-full flex items-center justify-center">
            <div class="yl">
              <div class="roll">
                <div
                  class="s_wheel"
                  :class="{
                    a_wheel: animate
                  }"
                />
                <div class="tape" />
                <div
                  class="e_wheel"
                  :class="{
                    a_wheel: animate
                  }"
                />
              </div>
              <p class="num"></p>
            </div>
          </div>
        </div>
      </div>
      <div class="spacer"></div>
      <div class="downs">
        <div class="screw">
          <dy-icon :path="mdiPlus" />
        </div>
        <div class="middle_down">
          <div class="player">

          </div>
        </div>
        <div class="screw">
          <dy-icon :path="mdiPlus" />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
  .main {
    display: flex;
    justify-items: center;
  }

  .card {
    display: flex;
    flex-direction: column;
    width: 100%;
    max-width: 100%;
    min-width: 310px;
    height: 220px;
    background: black;
    border: 2px solid black;
    border-radius: 8px;
    box-shadow: rgba(0, 0, 0, 0.4) 0px 2px 4px, rgba(0, 0, 0, 0.3) 0px 7px 13px -3px;
  }

  .ups {
    display: flex;
    width: 100%;
    align-self: flex-start;
    justify-content: space-between;
    padding: 5px 5px 0px 5px;
  }

  .card1 {
    width: 100%;
    height: 70%;
    align-self: stretch;
    padding: 5px 20px;
  }

  .spacer {
    width: 100%;
    height: 10%;
    align-self: stretch;
  }

  .parent_middle {
    width: 100%;
    height: 100%;
    overflow: hidden;
    position: relative;
  }

  .child_middle {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 1;
  }

  .middle_content {
    border-radius: 10px;
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
    opacity: 1;
  }

  .translucent {
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: rgb(140, 140, 140, 0.4);
    border-radius: 10px;
  }

  .downs {
    display: flex;
    width: 100%;
    align-self: flex-end;
    justify-content: space-between;
    padding: 0px 5px 5px 5px;
  }

  .middle_down {
    width: 100%;
    height: 30px;
    display: flex;
    justify-content: center;
  }

  .player {
    width: 40%;
    height: 100%;
    background-color: rgba(71, 71, 71, 0.808);
    border-radius: 4px 4px 0 0;
  }

  .screw {
    display: flex;
    color: black;
    fill: black;
    border: 1px solid gray;
    background-color: gray;
    height: 0.75em;
    width: 0.75em;
    border-radius: 50%;
    align-items: center;
    justify-content: center;
  }

  .sticker {
    opacity: 0.5;
    width: 100%;
    height: 26%;
    display: flex;
    justify-content: center;
    background-image: linear-gradient(
      to bottom, 
      #ff0000da 0%, 
      #ff0000da 25%,
      #ddce00 25%,
      #ddce00 50%,
      #00ce89 50%,
      #00ce89 75%,
      #1d6ac2 75%, 
      #1d6ac2 100%
    );
    padding: 5px 0px;
  }

  .yl {
    opacity: 1;
    width: 58%;
    height: 34%;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 4px;
    border-radius: 10px;
    background-color: #171717;
  }

  .roll {
    width: 8em;
    height: 2em;
    border-radius: 15px;
    background-color: #171717;
    display: flex;
  }

  .tape {
    width: 3em;
    height: 1.5em;
    position: relative;
    left: 0.9em;
    top: 0.22rem;
    border-radius: 5px;
    background-color: lightgray;
  }

  .window {
    background-color: white;
    width: auto;
    height: 2em;
  }

  .a_wheel {
    animation: 2s run infinite linear;
  }

  .s_wheel {
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    top: 0.215em;
    left: 0.15em;
    width: 1.55em;
    height: 1.55em;
    border: 2px dashed #fff;
    box-shadow: 0 0 0 4.4px #fff;
    border-radius: 50%;
  }

  .e_wheel {
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    top: 0.215em;
    left: 1.7em;
    width: 1.55em;
    height: 1.55em;
    border: 2px dashed #fff;
    box-shadow: 0 0 0 4.4px #fff;
    border-radius: 50%;
  }

  @keyframes run {
    100% {
      transform: rotate(360deg);
    }
  }
</style>
