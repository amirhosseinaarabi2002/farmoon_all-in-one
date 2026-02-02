import MyNavbar from "@/components/MyNavbar";
import CarPlateInput from "@/components/car/PlateInput";
import MyAccordion from "@/components/ui/Accordion";
import Content1 from "@/components/ui/Content1";
import Content2 from "@/components/ui/Content2";
import Content3 from "@/components/ui/Content3";
import Describtion from "@/components/ui/Describtion";
import MySwiper from "@/components/ui/Swiper";
import MyTable from "@/components/ui/Table";
import Head from "next/head";
import Footer from "../components/ui/Footer";
import CarPlateInputSum from "@/components/car/PlateInputSum";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";

export default function Home() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("detail");

  const tabs = [
    {
      key: "detail",
      title: "خلافی خودرو با جزئیات",
      content: <CarPlateInput />,
    },
    {
      key: "sumation", 
      title: "مجموع خلافی خودرو",
      content: <CarPlateInputSum />,
    }
  ];

  // Handle URL parameters to set active tab
  useEffect(() => {
    if (router.isReady) {
      const { tab } = router.query;
      if (tab === 'sumation') {
        setActiveTab('sumation');
      } else {
        setActiveTab('detail');
      }
    }
  }, [router.isReady, router.query]);

  // Update URL when tab changes
  const handleTabChange = (tabKey) => {
    setActiveTab(tabKey);
    const newQuery = tabKey === 'detail' ? {} : { tab: tabKey };
    router.replace(
      {
        pathname: router.pathname,
        query: newQuery,
      },
      undefined,
      { shallow: true }
    );
  };

  return (
    <>
      <Head>
        <link
          rel="shortcut icon"
          href="/images/logo.png"
          type="image/x-icon"
        />
        <title>استعلام خلافی خودرو آنلاین با پلاک و کدملی</title>
        <meta
          name="description"
          content="استعلام خلافی خودرو با کدملی و پلاک به صورت آنلاین و با گوشی موبایل به راحتی از طریق فرمون انجام می شود. برای مشاهده خلافی خودرو یا موتور سیکلت از برنامه فرمون استفاده کنید."
        />
      </Head>
      <div>
        <MyNavbar />
        
        {/* Custom Tabs Container */}
        <div className="min-h-screen pt-4 pb-2">
          {/* Tabs Header */}
          <div className="container mx-auto px-4">
            <div className="bg-white rounded-xl shadow-sm p-1.5 max-w-lg mx-auto">
              <div className="flex rounded-lg bg-gray-100 p-1">
                {tabs.map((tab) => (
                  <button
                    key={tab.key}
                    onClick={() => handleTabChange(tab.key)}
                    className={`
                      flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-md 
                      transition-all duration-300 ease-in-out font-Kalame text-sm font-medium
                      ${activeTab === tab.key 
                        ? 'bg-white text-[#0f766e] shadow-md transform scale-[1.02]' 
                        : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                      }
                    `}
                  >
                    {tab.icon && <span className="text-lg">{tab.icon}</span>}
                    <span>{tab.title}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
          
          {/* Tab Content */}
          <div className="container mx-auto px-4 mt-6">
            <div className="animate-fade-in">
              {tabs.find(tab => tab.key === activeTab)?.content}
            </div>
          </div>
        </div>
      </div>
      
      {/* Add custom CSS for fade animation */}
      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 0.3s ease-in-out;
        }
      `}</style>
      
      <Describtion />
      <Content1 />
      <Content2 />
      <MySwiper />
      <Content3 />
      <MyTable />
      <MyAccordion />
      <Footer />
    </>
  );
}