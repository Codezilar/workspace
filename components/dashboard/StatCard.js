"use client";

import { motion } from "framer-motion";
export default function StatCard({ label, value, accent = false }) {
  return (
    <motion.div
      whileHover={{ y: -3 }}
      className={`glass rounded-2xl p-5 ${accent ? "border-acid/30" : ""}`}
    >
      <p className="text-sm text-mist">{label}</p>
      <p className="mt-3 text-3xl font-semibold">{value}</p>
    </motion.div>
  );
}
