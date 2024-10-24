<template>
  <div class="pokeLoader">
    <svg class="loader" width="106" height="106" viewBox="0 0 106 106" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="53" cy="53" r="51" fill="white" stroke="#333333" stroke-width="4" />
      <mask id="mask0_12_49" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="106" height="53">
        <rect width="106" height="53" fill="#C4C4C4" />
      </mask>
      <g mask="url(#mask0_12_49)">
        <circle cx="53" cy="53" r="51" fill="#F22539" stroke="#333333" stroke-width="4" />
      </g>
      <path d="M0.392578 53H105.607" stroke="#333333" stroke-width="4" />
      <circle cx="53" cy="52.9998" r="20.8074" fill="white" />
      <circle cx="53" cy="52.9998" r="18.8074" stroke="#333333" stroke-width="4" />
      <path d="M91.731 36.7077C86.9398 25.3318 77.283 16.5081 65.3667 12.8428" stroke="white" stroke-width="4"
        stroke-linecap="round" stroke-linejoin="round" />
      <circle cx="53" cy="53.0004" r="10.3852" stroke="#808080" stroke-width="2" />
    </svg>
  </div>
</template>

<style scoped>

.pokeLoader {
  min-height: 200px;
  display: flex;
  justify-content: center;
  align-items: flex-end;
  margin-bottom: 20px;
  position: relative;
}


.loader {
  animation: fall 0.5s ease-in-out, shake 2s ease-in-out infinite .5s;
}


@keyframes fall {
  0% {
    transform: translateY(-200%);
  }
  60% {
    transform: translateY(0);
  }
  80% {
    transform: translateY(-10%);
  }
  100% {
    transform: translateY(0);
  }
}

@keyframes shake {
  0% {
    transform: rotate(0deg); /* Solo rota, no cambia translate */
  }
  20% {
    transform: rotate(-20deg);
  }
  30% {
    transform: rotate(20deg);
  }
  50% {
    transform: rotate(-10deg);
  }
  60% {
    transform: rotate(10deg);
  }
  100% {
    transform: rotate(0deg);
  }
}

</style>