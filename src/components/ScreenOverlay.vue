<template>
    <div class="screen-overlay absolute top-0 left-0 w-full h-full grid place-items-center bg-black bg-opacity-80 text-white text-center text-xl"
        :style="{ zIndex: 1 }">
        <slot></slot>
    </div>
</template>
