<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<style lang="scss">
@import url('https://fonts.googleapis.com/css?family=Open+Sans|Satisfy|Source+Code+Pro&display=swap');

html, body, #app {
  height: 100%;
}

* {
  font-family: 'Open Sans', sans-serif;
}

pre {
  font-family: 'Source Code Pro', monospace !important;
}

$orange: #fe8e2a;

.form-control:focus {
    border-color: $orange !important;
    box-shadow: 0 0 0 0.2rem rgba($orange, .25) !important;
}

.btn.focus, .btn:focus {
    box-shadow: 0 0 0 0.2rem rgba($orange, .25) !important;
}

.text-cursive {
  font-family: 'Satisfy', cursive;
}

.text-30 {
  font-size: 30px;
}

.btn-link {
  color: $orange !important;
}

.btn-orange {
  background-color: $orange !important;
  color: #fff !important;
}

::-webkit-scrollbar {
    width: 12px;
}

::-webkit-scrollbar:horizontal {
    height: 12px;
}

::-webkit-scrollbar-track {
    box-shadow: none;
    background-color: rgba(#f5f5f5, .5);
    border-radius: 12px;
}

::-webkit-scrollbar-thumb {
    border-radius: 12px;
    background-color: rgba(#ccc, .5);
    &:hover {
        background-color: rgba(#ccc, .9);
    }
}
</style>
