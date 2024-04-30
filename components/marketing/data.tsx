import {
  FaceSmileIcon,
  ChartBarSquareIcon,
  CursorArrowRaysIcon,
  DevicePhoneMobileIcon,
  AdjustmentsHorizontalIcon,
  SunIcon,
} from "@heroicons/react/24/solid";

const benefitOne = {
  title: "8x more engagement",
  desc: "Videos get far more views and engagement than simple photo posts on social media. In fact, social shoppable video generates 1200% more shares than text and image content combined.",
  image: "/images/benefit-one.png",
  bullets: [
    {
      title: "Understand your customers",
      desc: "Learn to sustain and grow your community.",
      icon: <FaceSmileIcon />,
    },
    {
      title: "Improve acquisition",
      desc: "Learn to sustain and grow your acquisition.",
      icon: <ChartBarSquareIcon />,
    },
    {
      title: "Drive customer retention",
      desc: "Learn to sustain and grow your retention.",
      icon: <CursorArrowRaysIcon />,
    },
  ],
};

const benefitTwo = {
  title: "America’s #1 Live Shopping System",
  desc: "A $300B sales funnel in China - Live selling is growing rapidly in the US. CS (CommentSold) powered live-selling shops sold approx. 1 Billion in product last year in the US with top merchants raking in > 50M in sales, so, when done right, live-selling can create explosive growth for consumer retail brands.",
  image: "/images/benefit-two.png",
  bullets: [
    {
      title: "Mobile Responsive",
      desc: "Showcase shoppable videos on website + mobile app",
      icon: <DevicePhoneMobileIcon />,
    },
    {
      title: "Powered by Stream",
      desc: "This platforim is powered by the latest streaming technologies and SDK.",
      icon: <AdjustmentsHorizontalIcon />,
    },
    {
      title: "Dark & Light Mode",
      desc: "Square Edge comes with a zero-config light & dark mode. ",
      icon: <SunIcon />,
    },
  ],
};


export {benefitOne, benefitTwo};
