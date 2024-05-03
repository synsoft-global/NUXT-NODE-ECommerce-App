import dashboardIcon from "~/assets/img/icon/Dashboard.svg";
import dashboardActiveIcon from "~/assets/img/icon/Dashboard-active.svg";
import reportsIcon from "~/assets/img/icon/Reports.svg";
import reportsActiveIcon from "~/assets/img/icon/Reports-active.svg";
import productIcon from "~/assets/img/icon/Product.svg";
import productActiveIcon from "~/assets/img/icon/Product-active.svg";
import ordersIcon from "~/assets/img/icon/Orders_Leftside.svg";
import ordersActiveIcon from "~/assets/img/icon/Orders_Leftside-active.svg";
import statisticsIcon from "~/assets/img/icon/Statistics.svg";
import statisticsActiveIcon from "~/assets/img/icon/Statistics-active.svg";
import settingsIcon from "~/assets/img/icon/Settings_Leftside.svg";
import settingsActiveIcon from "~/assets/img/icon/Settings_Leftside-active.svg";
import othersIcon from "~/assets/img/icon/Others_Leftside.svg";
import othersActiveIcon from "~/assets/img/icon/Others_Leftside-active.svg";

export const menuItems = [
  {
    id: 1,
    label: "menu.dashboard",
    src: dashboardIcon,
    srcActive: dashboardActiveIcon,
    role: ["user"],
    to: "/",
  },
  {
    id: 2,
    label: "menu.products",
    src: productIcon,
    srcActive: productActiveIcon,
    role: ["user"],
    to: "/products",
  },
  {
    id: 3,
    label: "menu.Orders",
    src: ordersIcon,
    srcActive: ordersActiveIcon,
    role: ["user"],
    to: "/orders",
  },
  {
    id: 4,
    label: "menu.reports",
    src: reportsIcon,
    srcActive: reportsActiveIcon,
    role: ["user"],
    to: "/reports",
  },

  {
    id: 5,
    label: "menu.Statistics",
    src: statisticsIcon,
    srcActive: statisticsActiveIcon,
    role: ["user"],
    to: "/statistics",
  },
  {
    id: 6,
    label: "menu.settings",
    src: settingsIcon,
    srcActive: settingsActiveIcon,
    role: ["user"],
    isMenuCollapsed: false,
    path: "settings",
    subItems: [
      {
        id: 701,
        label: "menu.accountSettings",
        to: "/settings/account",
      },
      {
        id: 702,
        label: "menu.notifications",
        to: "/settings/notifications",
      },
      {
        id: 147,
        label: "menu.balance",
        to: "/settings/balance",
      },
    ],
  },
  {
    id: 8,
    label: "menu.others",
    src: othersIcon,
    srcActive: othersActiveIcon,
    role: ["user"],
    isMenuCollapsed: false,
    path: "others",
    subItems: [
      {
        id: 801,
        label: "menu.payments",
        to: "/others/payments",
      },
      {
        id: 802,
        label: "menu.productReports",
        to: "/others/product-reports",
      },
      {
        id: 805,
        label: "menu.transactions",
        to: "/others/transactions",
      },
    ],
  },
];
