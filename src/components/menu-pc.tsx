import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'framer-motion'
import { useRef, useState } from "react";
import { TypographyReveal } from "#/components/satisui/typography-reveal.tsx";
import { SHOP_INFO } from "#/routes";

const MenuSectionPC = () => {
  const menuRef = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress: menuScrollYProgress } = useScroll({ target: menuRef });
  const [isDrinkMenu, setIsDrinkMenu] = useState(true);

  useMotionValueEvent(menuScrollYProgress, 'change', (value) => {
    setIsDrinkMenu(value < 0.5);
  });

  return (
    <div className="hidden lg:block relative">
      <span id="anchor-nuoc-uong" className="absolute top-0 left-0" />
      {/* do-an anchor ở ~50% chiều cao section = lúc isDrinkMenu = false */}
      <span id="anchor-do-an" className="absolute top-1/2 left-0" />

      <section ref={menuRef} className="min-h-[370vh]">
        <div className='sticky min-h-screen flex flex-col justify-end p-20 top-0 bg-background'>
          <div className='flex justify-between'>
            {/* Bỏ id="nuoc-uong" và id="do-an" khỏi đây */}
            <div className='relative h-[60vh] w-xs shrink-0 menu-image-1 shadow rounded-xl overflow-hidden'>
              <AnimatePresence>
                {isDrinkMenu && (
                  <motion.div
                    key='do-uong-1'
                    initial={{ maxHeight: 0 }}
                    animate={{ maxHeight: '60vh' }}
                    exit={{ maxHeight: 0 }}
                    transition={{ duration: 0.6, ease: 'easeOut' }}
                    className='h-full relative bg-background z-10 w-xs overflow-hidden'
                  >
                    <img src='/menu/2.jpg' className='w-full h-[60vh]'/>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <div className="w-full flex items-center justify-center text-center">
              <TypographyReveal
                mutedColor='#0000004d'
                animationType="colorizeIn"
                revealType="word"
                start="-300px top"
                end="+=1300"
                className="max-w-3xl text-xl lg:text-2xl xl:text-3xl mx-auto p-8 text-justify text-[#8a6a30] font-bold leading-tight @lg:text-5xl @lg:leading-tight"
              >
                {SHOP_INFO.address_detail}
              </TypographyReveal>
            </div>

            {/*<div className='relative h-[60vh] w-xs shrink-0 menu-image-2 shadow rounded-xl overflow-hidden'>*/}
            {/*  <AnimatePresence>*/}
            {/*    {isDrinkMenu && (*/}
            {/*      <motion.div*/}
            {/*        key='do-uong-2'*/}
            {/*        initial={{ maxHeight: 0 }}*/}
            {/*        animate={{ maxHeight: '60vh' }}*/}
            {/*        exit={{ maxHeight: 0 }}*/}
            {/*        transition={{ duration: 0.6, ease: 'easeOut' }}*/}
            {/*        className='h-full relative bg-background z-10 w-xs overflow-hidden'*/}
            {/*      >*/}
            {/*        <img src='/menu/do-uong-2.jpg' className='w-full h-[60vh]'/>*/}
            {/*      </motion.div>*/}
            {/*    )}*/}
            {/*  </AnimatePresence>*/}
            {/*</div>*/}
          </div>
        </div>
      </section>
    </div>
  );
}

export default MenuSectionPC;