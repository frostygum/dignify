<script setup lang="ts">
  
import { DyIcon } from '@/components/ui';
import { mdiPlus } from '@mdi/js';

</script>

<style scoped>
  .card {
    display: flex;
    flex-direction: column;
    width: 360px;
    height: 240px;
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

  .middle_content {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 10px;
    background-color: #FFFDD0;
    background-image: radial-gradient(#bdb748 1px, transparent 1px);
    background-size: 15px 15px; 
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
    width: 100%;
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
    width: 58%;
    display: flex;
    justify-content: center;
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
    animation: 2s run infinite linear;
  }

  .window {
    background-color: white;
    width: auto;
    height: 2em;
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
    animation: 2s run infinite linear;
  }

  @keyframes run {
    100% {
      transform: rotate(360deg);
    }
  }
</style>

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
        <div class="middle_content">
          <div class="sticker">
            <div class="yl">
              <div class="roll">
                <div class="s_wheel"></div>
                <div class="tape"></div>
                <div class="e_wheel"></div>
              </div>
              <!-- <p class="num"></p> -->
            </div>
          </div>
          <!-- <div class="or">
            <p class="time"></p>
          </div> -->
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
