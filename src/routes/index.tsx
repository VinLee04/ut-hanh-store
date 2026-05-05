import { motion, useMotionValueEvent, useScroll } from 'framer-motion'
import { createFileRoute, Link } from '@tanstack/react-router'
import { useRef, useState } from "react";
import { cn } from "#/lib/utils.ts";
import { Separator } from "#/components/ui/separator.tsx";
import { CalendarCheck2, Clock, Facebook, MapPin } from "lucide-react";
import MenuSectionPC from "#/components/menu-pc.tsx";
import TextDisplayWrapper from "#/components/text-display-wrapper.tsx";
import MenuSectionMB from "#/components/menu-mobile.tsx";
import { TextLoop } from "#/components/ui/text-loop";
import { Highlighter } from "#/components/ui/highlighter.tsx";

export const Route = createFileRoute('/')({ component: Home })

export const SHOP_INFO = {
  name: "Quán nước Út Hạnh",
  address: "Ấp 7, xã Phú Long, huyện Bình Đại - Bến Tre",
  address_detail: "Hiện tại quán chỉ bán mang đi và chưa nhận ship tận nơi. Hướng từ trường Lê Quý Đôn xuống Bình Đại, chạy qua trường 1 xíu sẽ thấy quán nằm phía bên trái ",
  phone: "098 663 5029",
  hours: "08:00 - 22:00",
  fanpage: "https://facebook.com/tenquan",
  placeId: "ChIJQ3C0LQBVdTERNCM2XBbduFo",
};

const API_KEY = import.meta.env.VITE_GOOGLE_MAPS_KEY;

function Home() {
  const [visible, setVisible] = useState(false);

  const [mode, setMode] = useState<"place" | "directions">("place");
  const [mapHovered, setMapHovered] = useState(false);
  const handleDirections = () => {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        setUserLocation(`${latitude},${longitude}`);
        setMode("directions");
      },
      () => {
        window.open(googleMapsUrl, "_blank");
      }
    );
  };
  const [userLocation, setUserLocation] = useState<string | null>(null);

  const fullPageRef = useRef<HTMLDivElement | null>(null);
  const introduceRef = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({ target: fullPageRef });

  useMotionValueEvent(scrollYProgress, 'change', (value) => {
    setVisible(value > 0.2);
  });

  const placeUrl =
    `https://www.google.com/maps/embed/v1/place` +
    `?key=${API_KEY}` +
    `&q=place_id:${SHOP_INFO.placeId}` +
    `&zoom=17` +
    `&language=vi`;

  const directionsUrl =
    `https://www.google.com/maps/embed/v1/directions` +
    `?key=${API_KEY}` +
    `&origin=${userLocation}` +
    `&destination=place_id:${SHOP_INFO.placeId}` +
    `&language=vi`;

  const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(SHOP_INFO.name)}&query_place_id=${SHOP_INFO.placeId}`;
  return (
    <div ref={fullPageRef} className="bg-[#faf7f2] font-sans">

      {/* HEADER */}
      <motion.header layout className="fixed top-0 inset-x-0 z-50">
        <div className={cn(
          'h-13 px-4 md:px-10 mx-auto w-full max-w-full backdrop-blur-sm bg-[#faf7f2]/60 border-b border-[#b4a078]/20 transition-all duration-500 ease-in-out flex items-center justify-between',
          { 'translate-y-3 max-w-7xl shadow-sm rounded-xl border border-[#b4a078]/20': visible }
        )}>
          <Link from={Route.fullPath} to='.' hashScrollIntoView={{ behavior: 'smooth' }} hash='hero'
                className="italic text-[15px] text-[#5c4a2a] tracking-wide">
            <span className='font-bold'>Út <span className='text-[#8a6a30]'>Hạnh</span></span>
            <span className='hidden md:inline'>
              {' '}- {' '}
              <TextLoop
                className='overflow-y-clip'
                transition={{ type: 'spring', stiffness: 400, damping: 70, mass: 7 }}
                variants={{
                  initial: { y: 20, rotateX: 90, opacity: 0, filter: 'blur(4px)' },
                  animate: { y: 0, rotateX: 0, opacity: 1, filter: 'blur(0px)' },
                  exit: { y: -20, rotateX: -90, opacity: 0, filter: 'blur(4px)' },
                }}
              >
                <span>Nước giải khát</span>
                {/*<span>Đồ ăn vặt</span>*/}
                <span>Gấu bông</span>
              </TextLoop>
            </span>
          </Link>
          <div className="flex gap-x-5 items-center text-[13.5px] text-[#8a7a60]">
            <a
              href={`tel:${SHOP_INFO.phone.replace(/\s/g, '')}`}
              className="font-medium text-[#5c4a2a]"
            >
              {SHOP_INFO.phone}
            </a>
            <Separator orientation="vertical" className="hidden md:block h-5! w-px! bg-[#8c7850]/30!"/>
            <Link from={Route.fullPath} hashScrollIntoView={{ behavior: 'smooth' }} to='.' hash='anchor-nuoc-uong'
                  className="hidden md:block hover:text-[#5c4a2a] transition-colors cursor-pointer">Menu</Link>
            {/*<Link from={Route.fullPath} hashScrollIntoView={{ behavior: 'smooth' }} to='.' hash='anchor-do-an'*/}
            {/*      className="hidden md:block hover:text-[#5c4a2a] transition-colors cursor-pointer">Đồ Ăn</Link>*/}
          </div>
        </div>
      </motion.header>

      <div>
        {/* HERO SECTION */}
        <section id='hero' ref={introduceRef}
                 className="pt-13 min-h-screen flex flex-col md:flex-row gap-x-20 relative overflow-x-hidden">

          {/* Decorative circles */}
          <div
            className="absolute top-8 -right-20 w-80 h-80 rounded-full border border-[#b4a078]/15 pointer-events-none"/>
          <div
            className="absolute top-20 right-5 w-48 h-48 rounded-full border border-[#b4a078]/10 pointer-events-none"/>

          <div className="px-4 sm:px-6 md:px-10 pt-12 pb-6 flex flex-col overflow-y-auto touch-pan-y">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex gap-2 mb-4"
            >
              {[
                { label: "Quán nước", hash: "anchor-nuoc-uong-mb" },
                { label: "Gấu bông", hash: "anchor-gaubong" },
              ].map((tag) => (
                <Link
                  key={tag.label}
                  from={Route.fullPath}
                  to='.'
                  hash={tag.hash}
                  hashScrollIntoView={{ behavior: 'smooth' }}
                  className="px-3 py-1 rounded-full border border-[#8c7850]/30 text-[11px] text-[#9a8a70] uppercase tracking-widest hover:border-[#8c7850]/60 hover:text-[#5c4a2a] transition-colors cursor-pointer"
                >
                  {tag.label}
                </Link>
              ))}
            </motion.div>

            <Highlighter action="underline" color="#FF9800">
              <h1 className="text-[72px] pb-1 leading-none font-bold text-[#2c2118] tracking-tight">
                <TextDisplayWrapper delay={0.35} y={20} className='h-20 text-nowrap font-sans'>
                  Út{' '}
                  <em className="text-[#8a6a30] not-italic font-serif">Hạnh</em>
                </TextDisplayWrapper>
              </h1>
            </Highlighter>

            <TextDisplayWrapper
              delay={0.6}
              className="text-[13px] text-[#9a8a70] font-light uppercase tracking-[0.06em] mt-3"
            >
              Ghé thăm quán hôm nay ^^
            </TextDisplayWrapper>
            <motion.div initial={{ width: 0 }}
                        animate={{ width: 'auto', transition: { duration: 0.3, ease: 'easeOut', delay: 0.7 } }}>
              <Separator className='mt-5 mb-2'/>
            </motion.div>

            <TextDisplayWrapper delay={0.8} y={20} childClassName className='h-8'>
              <Clock size={20}/> Hoạt động: 8:00 - 20:00
            </TextDisplayWrapper>
            <TextDisplayWrapper delay={0.85} y={20} childClassName className='h-8'>
              <CalendarCheck2 size={20}/> Mở cửa cả tuần kể cả ngày lễ
            </TextDisplayWrapper>

            <div className='mt-auto'>
              <a href="https://www.facebook.com/profile.php?id=100022385304023">
                <TextDisplayWrapper delay={0.95} y={20} childClassName className='h-8'>
                  <Facebook size={20}/> Hanh Nguyen
                </TextDisplayWrapper>
              </a>
              <TextDisplayWrapper delay={1} y={20} childClassName className='h-8'>
                <MapPin size={20}/> {SHOP_INFO.address}
              </TextDisplayWrapper>
            </div>
          </div>

          {/* Map area */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="m-4 md:m-14 flex-1 text-[#9a8a70] relative rounded-2xl overflow-hidden border border-[#b4a078]/25 min-h-90 flex justify-center items-center p-4 text-base sm:text-lg md:text-base lg:text-xl text-justify italic"
          >
            <div
              className="absolute inset-0"
              onMouseEnter={() => setMapHovered(true)}
              onMouseLeave={() => setMapHovered(false)}
              onTouchStart={() => setMapHovered(true)}
              onTouchEnd={() => setTimeout(() => setMapHovered(false), 1000)}
            >
              <iframe
                key={mode}
                src={mode === "place" ? placeUrl : directionsUrl}
                width="100%"
                height="100%"
                style={{ pointerEvents: mapHovered ? 'auto' : 'none' }}
                className="absolute inset-0 w-full h-full border-0"
                data-lenis-prevent
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Google Maps"
              />

            </div>

            {/* Overlay click-to-activate – ẩn overlay "Ctrl+scroll" bằng cách
                chặn interaction cho đến khi user chủ động hover vào */}
            {!mapHovered && (
              <div
                className="absolute inset-0 z-10 cursor-pointer"
                onClick={() => setMapHovered(true)}
              />
            )}

             Floating controls
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
              <button
                onClick={mode === "place" ? handleDirections : () => setMode("place")}
                className="px-3 sm:px-5 py-1.5 sm:py-2.5 text-nowrap rounded-full text-[10px] sm:text-[13px] font-medium bg-[#2c2118] text-[#faf7f2] hover:bg-[#3d2e1e] transition-colors shadow-lg"
              >
                {mode === "place" ? "🗺 Xem đường đi" : "📍 Xem vị trí"}
              </button>
              <a
                href={googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 sm:px-5 py-1.5 sm:py-2.5 rounded-full text-nowrap text-[10px] sm:text-[13px] font-medium bg-[#faf7f2]/90 text-[#5c4a2a] border border-[#8c7850]/40 hover:bg-[#faf7f2] transition-colors shadow-lg no-underline"
              >
                Mở Google Maps ↗
              </a>
            </div>
          </motion.div>
        </section>

        <MenuSectionPC/>
        <MenuSectionMB/>
      </div>
    </div>
  );
}