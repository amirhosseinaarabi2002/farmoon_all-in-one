import MyNavbar from "@/components/MyNavbar";
import CarPlateInput from "@/components/PlateInput";
import CarPlateInputSum from "@/components/PlateInputSum";
import MyAccordion from "@/components/ui/Accordion";
import Content1 from "@/components/ui/Content1";
import Content2 from "@/components/ui/Content2";
import Content3 from "@/components/ui/Content3";
import Describtion from "@/components/ui/Describtion";
import Footer from "@/components/ui/Footer";
import MySwiper from "@/components/ui/Swiper";
import MyTable from "@/components/ui/Table";
import Head from "next/head";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";

const Menu = () => {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("detail");

  const tabs = [
    {
      key: "detail",
      title: "خلافی موتور با جزئیات",
      content: <CarPlateInput />
    },
    {
      key: "sumation", 
      title: "مجموع خلافی موتور",
      content: <CarPlateInputSum />
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
    <div className="bg-gray-50 min-h-screen">
      <Head>
        <link
          rel="shortcut icon"
          href="/images/logo.png"
          type="image/x-icon"
        />
        <title>استعلام خلافی موتور سیکلت با پلاک</title>
        <meta
          name="description"
          content="برای استعلام خلافی موتور سیکلت آنلاین کافی است پلاک موتور سیکلت و سپس کدملی مربوط به مالک را وارد کنید تا خلافی موتور سیکلت را مشاهده و پرداخت کنید."
        />
      </Head>
      
      <MyNavbar />
      
      {/* Custom Tabs */}
      <div className=" pt-4 pb-2">
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
                    transition-all duration-300 ease-in-out font-kalame text-sm font-medium
                    ${activeTab === tab.key 
                      ? 'bg-white text-[#0f766e] shadow-md transform scale-[1.02]' 
                      : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                    }
                  `}
                >
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
      
      {/* <Describtion />
      <Content1 />
      <Content2 />
      <MySwiper />
      <Content3 />
      <MyTable />
      <MyAccordion />
      <Footer /> */}
    </div>
  );
};

export default Menu;