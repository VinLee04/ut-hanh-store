import { motion } from 'framer-motion'
import { cn } from "#/lib/utils.ts";

type TextDisplayWrapperProps = {
  children: React.ReactNode
  className?: string
  delay?: number
  y?: number
  childClassName?: boolean
}
const TextDisplayWrapper = ({ children, className, childClassName, delay = 0, y = 10 }: TextDisplayWrapperProps) => {
  return <div className={cn('h-5 overflow-hidden ', className)}>
    <motion.p initial={{y, opacity: 0}} animate={{y: 0, opacity: 1, transition:{type: "spring", stiffness: 400, damping: 50, delay}}} className={childClassName ? 'flex gap-x-2 text-[13px] text-[#9a8a70] font-light tracking-[0.06em] mt-3' : ''}>
      {children}
    </motion.p>
  </div>;
}

export default TextDisplayWrapper;