import { BsClockHistory, BsFileEarmarkRuled } from "react-icons/bs";
import { TbFilePencil } from "react-icons/tb";

export const cabinetRoutes = [
  {
    title: "Налаштування",
    path: "/cabinet/personal-information",
    className: "_profile",
    profile: true,
  },
  {
    title: "Історія замовлень",
    path: "/cabinet/orders",
    icon: <BsClockHistory />,
  },
  {
    title: "Умови роботи",
    path: "/cabinet/conditions",
    icon: <BsFileEarmarkRuled />,
  },
  { title: "Подати заяву", path: "/cabinet/applications", icon: <TbFilePencil /> },
];
