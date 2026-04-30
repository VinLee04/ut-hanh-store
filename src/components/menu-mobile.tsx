import { motion } from 'framer-motion'
import { TypographyReveal } from "#/components/satisui/typography-reveal.tsx";
import { CardFlip, CardFlipBack, CardFlipContent, CardFlipFront, CardFlipHeader, CardFlipTitle } from "./ui/card-flip";
import { ImageZoom } from "#/components/image-zoom.tsx";

const MenuSectionMB = () => {
  return (
    // Bọc bằng div relative để đặt anchor absolute, giống menu-pc
    <div className='lg:hidden relative'>
      {/*/!* FIX: Anchors nằm ngoài mọi thứ, vị trí cố định *!/*/}
      {/*<span id="anchor-nuoc-uong" className="absolute top-0 left-0" />*/}
      {/*<span id="anchor-do-an" className="absolute top-1/2 left-0" />*/}

      <div id='anchor-nuoc-uong-mb' className='min-h-screen bg-background pt-20 p-4'>
        <TypographyReveal className="leading-tight">
          This is the default reveal animation. It fades in word by word from the
          bottom as the component scrolls into view.
        </TypographyReveal>

        <div className='space-y-4 mt-8'>
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1, transition: { type: 'spring' } }}
          >
            <CardFlip>
              <CardFlipFront>
                <CardFlipHeader>
                  <CardFlipTitle className="cursor-pointer text-primary">Menu nước</CardFlipTitle>
                </CardFlipHeader>
                <CardFlipContent className="flex gap-x-4">
                  <ImageZoom>
                    <img src='/menu/do-uong-1.jpg' className="w-full h-full rounded-md origin-center" alt='Menu nước mặt 1'/>
                  </ImageZoom>
                </CardFlipContent>
              </CardFlipFront>
              <CardFlipBack className="pb-3">
                <CardFlipHeader>
                  <CardFlipTitle className='text-primary'>Mặt sau</CardFlipTitle>
                </CardFlipHeader>
                <CardFlipContent>
                  <ImageZoom>
                    <img src='/menu/do-uong-2.jpg' className="w-full h-full rounded-md origin-center" alt='Menu nước mặt 2'/>
                  </ImageZoom>
                </CardFlipContent>
              </CardFlipBack>
            </CardFlip>
          </motion.div>

          <span id="anchor-do-an-mb" className="block" />

          <motion.div
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1, transition: { type: 'spring' } }}
          >
            <CardFlip>
              <CardFlipFront>
                <CardFlipHeader>
                  <CardFlipTitle className="cursor-pointer text-primary">Menu đồ ăn</CardFlipTitle>
                </CardFlipHeader>
                <CardFlipContent className="flex gap-x-4">
                  <ImageZoom>
                    <img src='/menu/do-an-1.jpg' className="w-full h-full rounded-md origin-center" alt='Menu đồ ăn mặt 1'/>
                  </ImageZoom>
                </CardFlipContent>
              </CardFlipFront>
              <CardFlipBack className="pb-3">
                <CardFlipHeader>
                  <CardFlipTitle className='text-primary'>Mặt sau</CardFlipTitle>
                </CardFlipHeader>
                <CardFlipContent>
                  <ImageZoom>
                    <img src='/menu/do-an-2.jpg' className="w-full h-full rounded-md origin-center" alt='Menu đồ ăn mặt 2'/>
                  </ImageZoom>
                </CardFlipContent>
              </CardFlipBack>
            </CardFlip>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export default MenuSectionMB;