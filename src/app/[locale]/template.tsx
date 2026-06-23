"use client"

import { motion } from "framer-motion"
import { ReactNode } from "react"

export default function Transition({
  children,
  className,
}: {
  children: ReactNode
  className: string
}) {
  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ ease: "easeInOut", duration: 0.75 }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
