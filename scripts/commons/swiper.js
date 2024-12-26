export const initSwiperBanner = () => {
    const swiper_banner = new Swiper("#banner .swiper", {
        loop: true,
        autoplay: {
            delay: 1000,
        },

        slidesPerView: 1,
        spaceBetween: 0,
    });
}