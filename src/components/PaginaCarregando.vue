<template>
    <div class="page-loading">
        <span></span>
        <span></span>
        <span></span>
        <span></span>
    </div>
</template>

<script>
export default {
    name: 'PaginaCarregando',
};
</script>

<style scoped>
.page-loading {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 25vh;
}
.page-loading span {
    display: inline-block;
    width: 1rem;
    height: 1rem;
    border-radius: 10px;
    background: #87f;
    margin: 5px;
    animation: dots 0.4s cubic-bezier(0.6, 0.1, 1, 0.5) infinite alternate;
}
.page-loading span:nth-child(1) {
    animation-delay: 0.1s;
}
.page-loading span:nth-child(2) {
    animation-delay: 0.2s;
}
.page-loading span:nth-child(3) {
    animation-delay: 0.3s;
}
.page-loading span:nth-child(4) {
    animation-delay: 0.4s;
}
@keyframes dots {
    from {
        transform: translate3d(0, 0, 0);
    }
    to {
        transform: translate3d(0, 30px, 0);
    }
}
</style>
