import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@heroui/react";
import { Car } from "iconsax-react";
import React from "react";

const complaint = () => {
  return (
    <div>
      <div className="flex gap-x-1.5 max-w-screen-lg mx-auto md:mt-10 mt-5">
        <Car size={25} color="#0f766e" variant="Bulk" className="mr-2" />
        <h2 className="md:text-lg font-KalameBold">
          آدرس واحدهای رسیدگی به تخلفات رانندگی تهران بزرگ{" "}
        </h2>
      </div>
      <p className="max-w-screen-lg mx-auto mt-3 font-Kalame text-xs md:text-sm px-4">
        ✅ تهران – بزرگراه شیخ فضل الله نوری – بلوار مرزداران -شهرک آزمایش پلیس
        راهنمایی و رانندگی نیروی انتظامی جمهوری اسلامی ایران
      </p>
      <div className="flex gap-x-1.5 max-w-screen-lg mx-auto mt-6 md:mt-10">
        <Car size={25} color="#0f766e" variant="Bulk" className="mr-2" />
        <h2 className="md:text-lg font-KalameBold">
          آدرس واحدهای رسیدگی به تخلفات رانندگی تهران بزرگ{" "}
        </h2>
      </div>
      <Table
        aria-label="Example static collection table"
        className="max-w-screen-lg mx-auto mt-6 font-Kalame"
      >
        <TableHeader>
          <TableColumn className="text-sm text-teal-700">
            شماره تلفن
          </TableColumn>
          <TableColumn className="text-sm text-teal-700">آدرس پستی</TableColumn>
          <TableColumn className="text-sm text-teal-700">یگان</TableColumn>
        </TableHeader>
        <TableBody>
          <TableRow key="1">
            <TableCell></TableCell>
            <TableCell className="text-xs md:text-sm">
              بزرگراه یادگار امام (ره) – خیابان حبیب الهی – خیابان زنجان شمالی –
              جنب آتش نشانی{" "}
            </TableCell>
            <TableCell className="text-xs md:text-sm">
              اداره اجرائیات فاتب{" "}
            </TableCell>
          </TableRow>
          <TableRow key="2">
            <TableCell className="text-xs md:text-sm">۴۴۵۳۸۸۰۸</TableCell>
            <TableCell className="text-xs md:text-sm">
              تهرانسر ـ انتهای بلوار یاس
            </TableCell>
            <TableCell className="text-xs md:text-sm">منطقه ۲۱ </TableCell>
          </TableRow>
          <TableRow key="3">
            <TableCell></TableCell>
            <TableCell className="text-xs md:text-sm">
              واحد شماره ۳ مستقر در منطقه ۱۲ پلیس راهور تهران بزرگ . آدرس:
              خیابان شوش نرسیده به میدان شوش پشت بوستان بهاران جنب کلانتری ۱۱۲
            </TableCell>
            <TableCell className="text-xs md:text-sm">منطقه ۱۲ </TableCell>
          </TableRow>
          <TableRow key="4">
            <TableCell className="text-xs md:text-sm">۳۳۰۵۷۵۲۸</TableCell>
            <TableCell className="text-xs md:text-sm">
              خیابان نبرد ـ میدان نبرد ـ انتهای خیابان شهید ابراهیم بیدی
            </TableCell>
            <TableCell className="text-xs md:text-sm">منطقه ۱۴ </TableCell>
          </TableRow>
          <TableRow key="5">
            <TableCell></TableCell>
            <TableCell className="text-xs md:text-sm">
              واحد شماره ۵ مستقر در منطقه یک پلیس راهور تهران بزرگ . آدرس:
              بزرگراه ارتش بلوار اوشان نبش میدان اوشان
            </TableCell>
            <TableCell className="text-xs md:text-sm">منطقه ۱ </TableCell>
          </TableRow>
          <TableRow key="6">
            <TableCell className="text-xs md:text-sm">۵۵۴۳۷۱۶۱</TableCell>
            <TableCell className="text-xs md:text-sm">
              بزرگراه نواب ـ تقاطع خیابان محبوب مجاز (ویژه جانبازان ـ ایثارگران
              و خانواده شهداء){" "}
            </TableCell>
            <TableCell className="text-xs md:text-sm">منطقه ۱0 </TableCell>
          </TableRow>
          <TableRow key="7">
            <TableCell className="text-xs md:text-sm">۵۵۹۰۲۱۱۰</TableCell>
            <TableCell className="text-xs md:text-sm">
              شهرری ـ خیابان استخر ـ روبروی فروشگاه شهروند{" "}
            </TableCell>
            <TableCell className="text-xs md:text-sm">منطقه 20 </TableCell>
          </TableRow>
          <TableRow key="8">
            <TableCell className="text-xs md:text-sm">۸۶۰۸۳۲۴۴</TableCell>
            <TableCell className="text-xs md:text-sm">
              بزرگراه حقانی ـ نرسیده به تقاطع جهان کودک ـ مقابل پارک آب و آتش{" "}
            </TableCell>
            <TableCell className="text-xs md:text-sm">منطقه 3 </TableCell>
          </TableRow>
          <TableRow key="9">
            <TableCell className="text-xs md:text-sm">۴۴۷۳۶۸۴۰</TableCell>
            <TableCell className="text-xs md:text-sm">
              همت غرب ـ آزادگان جنوب ـ شهرک گلستان ـ بلوار گلها ـ خیابان یاسمن
              جنوبی{" "}
            </TableCell>
            <TableCell className="text-xs md:text-sm">منطقه 22 </TableCell>
          </TableRow>
          <TableRow key="10">
            <TableCell></TableCell>
            <TableCell className="text-xs md:text-sm">
              واحد رسیدگی دادسرای ناحیه ۳۲. آدرس: خیابان آزادی نبش رودکی پشت
              راهنمایی و رانندگی تهران بزرگ
            </TableCell>
            <TableCell className="text-xs md:text-sm">منطقه ۱ </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
};

export default complaint;
