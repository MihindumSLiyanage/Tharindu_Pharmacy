import {
  FiUser,
  FiGift,
  FiAlertCircle,
  FiHelpCircle,
  FiTruck,
  FiPhoneCall,
  FiCreditCard,
  FiMail,
  FiMapPin,
} from "react-icons/fi";
import {
  HiOutlineDocumentReport,
  HiOutlineDocumentText,
  HiOutlinePhoneIncoming,
  HiOutlineShieldCheck,
  HiOutlineUserGroup,
} from "react-icons/hi";
import {
  IoBagCheckOutline,
  IoGridOutline,
  IoListOutline,
  IoSettingsOutline,
} from "react-icons/io5";

const pages = [
  {
    title: "User",
    href: "/user/dashboard",
    icon: FiUser,
  },
  {
    title: "Offer",
    href: "/offer",
    icon: FiGift,
  },
  {
    title: "Checkout",
    href: "/checkout",
    icon: IoBagCheckOutline,
  },
  {
    title: "Catalog",
    href: "/catalog",
    icon: IoBagCheckOutline,
  },
  {
    title: "FAQ",
    href: "/faq",
    icon: FiHelpCircle,
  },
  {
    title: "About Us",
    href: "/about-us",
    icon: HiOutlineUserGroup,
  },
  {
    title: "Contact Us",
    href: "/contact-us",
    icon: HiOutlinePhoneIncoming,
  },
  {
    title: "Privacy Policy",
    href: "/privacy-policy",
    icon: HiOutlineShieldCheck,
  },
  {
    title: "Terms & Conditions",
    href: "/terms-and-conditions",
    icon: HiOutlineDocumentText,
  },
];

const userSidebar = [
  {
    title: "Dashboard",
    href: "/user/dashboard",
    icon: IoGridOutline,
  },
  {
    title: "My Orders",
    href: "/user/my-orders",
    icon: IoListOutline,
  },
  {
    title: "My Prescriptions",
    href: "/user/my-prescriptions",
    icon: HiOutlineDocumentReport,
  },
  {
    title: "Update Profile",
    href: "/user/update-profile",
    icon: IoSettingsOutline,
  },
  {
    title: "Change Password",
    href: "/user/change-password",
    icon: HiOutlineDocumentText,
  },
];

const sliderData = [
  {
    id: 1,
    title: "Slider1Title",
    info: "Slider1description",
    image: "/slider/slider-1.jpg",
  },
  {
    id: 2,
    title: "Slider2Title",
    info: "Slider2description",
    image: "/slider/slider-2.jpg",
  },
  {
    id: 3,
    title: "Slider3Title",
    info: "Slider3description",
    image: "/slider/slider-3.jpg",
  },
];

const featurePromo = [
  {
    id: 1,
    title: "featurePromo1-title",
    info: "featurePromo1-info",
    icon: FiTruck,
  },
  {
    id: 2,
    title: "featurePromo2-title",
    info: "featurePromo2-info",
    icon: FiPhoneCall,
  },
  {
    id: 3,
    title: "featurePromo3-title",
    info: "featurePromo3-info",
    icon: FiCreditCard,
  },
  {
    id: 4,
    title: "featurePromo4-title",
    info: "featurePromo4-info",
    icon: FiGift,
  },
];

const contactData = [
  {
    id: 1,
    title: "contact-page-box1-title",
    info: "contact-page-box1-info",
    icon: FiMail,
    contact: "tharindupharmacy71@gmail.com",
    className: "bg-emerald-100",
  },
  {
    id: 2,
    title: "contact-page-box2-title",
    info: "contact-page-box2-info",
    icon: FiPhoneCall,
    contact: "037 - 2256 464",
    className: "bg-yellow-100",
  },
  {
    id: 3,
    title: "contact-page-box3-title",
    info: "contact-page-box3-info",
    icon: FiMapPin,
    contact: "",
    className: "bg-indigo-100",
  },
];

const ctaCardData = [
  {
    id: 1,
    title: "Essential",
    subTitle: "Medicines & Prescriptions",
    image: "/cta/cta-bg-1.jpg",
    url: "/search?category=prescription-medicines",
  },
  {
    id: 2,
    title: "Daily Care",
    subTitle: "Vitamins & Supplements",
    image: "/cta/cta-bg-2.jpg",
    url: "/search?category=vitamins-supplements",
  },
  {
    id: 3,
    title: "Personal",
    subTitle: "Hygiene & First Aid",
    image: "/cta/cta-bg-3.jpg",
    url: "/search?category=hygiene-firstaid",
  },
];

export {
  pages,
  userSidebar,
  sliderData,
  featurePromo,
  contactData,
  ctaCardData,
};
