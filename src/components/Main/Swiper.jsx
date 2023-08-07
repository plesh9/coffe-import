import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper";
import swiper_1 from "../../images/swiper-1.webp"

function MainSwiper() {
  return (
    <Swiper
      modules={[Navigation, Pagination, Autoplay]}
      navigation
      speed={1000}
      spaceBetween={-1}
      slidesPerView={1}
      autoplay={{
        delay: 3000,
        disableOnInteraction: false,
      }}
      loop={true}
    >
      <SwiperSlide>
        <div className="swiper__img"><img src={swiper_1} alt="banner"/></div>
        <div className="swiper__action">
          <h2 className="swiper__title">Кофемашина</h2>
          <p className="swiper__sale">Акція -35%</p>
          <p className="swiper__text">Встигни купити дешевше!</p>
          <a href="#" className="swiper__btn btn__buy">Дізнатись детальніше</a>
        </div>
      </SwiperSlide>
      <SwiperSlide>
        <div className="swiper__img"><img src={swiper_1} alt="banner"/></div>
        <div className="swiper__action">
          <h2 className="swiper__title">Кофемашина</h2>
          <p className="swiper__sale">Акція -35%</p>
          <p className="swiper__text">Встигни купити дешевше!</p>
          <a href="#" className="swiper__btn btn__buy">Дізнатись детальніше</a>
        </div>
      </SwiperSlide>
      <SwiperSlide>
        <div className="swiper__img"><img src={swiper_1} alt="banner"/></div>
        <div className="swiper__action">
          <h2 className="swiper__title">Кофемашина</h2>
          <p className="swiper__sale">Акція -35%</p>
          <p className="swiper__text">Встигни купити дешевше!</p>
          <a href="#" className="swiper__btn btn__buy">Дізнатись детальніше</a>
        </div>
      </SwiperSlide>
    </Swiper>
  );
}
export default MainSwiper;
