// app/mag/tools/violation-image/page.js
"use client";
import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "@heroui/react";

export default function ViolationImagePage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [imageUrl, setImageUrl] = useState("");
  
  const imageUrlParam = searchParams.get("imageUrl");

  useEffect(() => {
    if (imageUrlParam) {
      setImageUrl(imageUrlParam);
    } else {
      // If no image URL, redirect back
      router.push("/carViolation");
    }
  }, [imageUrlParam, router]);

  const handleBack = () => {
    router.push("/carViolation");
  };

  if (!imageUrl) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p>در حال بارگذاری...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      <div className="container max-w-4xl mx-auto text-center">
        <h1 className="text-2xl font-KalameBold mb-6">تصویر خلافی</h1>
        <div className="">
          <img 
            src={imageUrl} 
            alt="تصویر خلافی" 
            className="w-full h-auto max-h-[70vh] object-contain"
          />
        </div>
        <Button
          onClick={handleBack}
          className="mt-6 bg-teal-600 text-white font-DanaDemiBold px-6 py-3 rounded-lg"
        >
          بازگشت به لیست خلافی ها
        </Button>
      </div>
    </div>
  );
}