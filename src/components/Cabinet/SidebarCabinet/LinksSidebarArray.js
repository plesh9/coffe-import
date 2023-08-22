import { BsClockHistory, BsFileEarmarkRuled } from "react-icons/bs";
import { TbFilePencil } from "react-icons/tb";
import { BiBriefcase } from "react-icons/bi";


export const LinksSidebarArray = [
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
    title: "Дилерство",
    path: "/cabinet/dealership",
    icon: <BiBriefcase />,
  },
  {
    title: "Умови роботи",
    path: "/cabinet/conditions",
    icon: <BsFileEarmarkRuled />,
  },
  { title: "Подати заяву", path: "/cabinet/applications", icon: <TbFilePencil /> },
];
