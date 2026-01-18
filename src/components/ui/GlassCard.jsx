import React from 'react';
import { motion } from 'framer-motion';

const GlassCard = ({ children, className = '', animate = true }) => {
    const CardContent = (
        <div className={`glass ${className}`}>
            {children}
        </div>
    );

    if (!animate) return CardContent;

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: "easeOut" }}
        >
            {CardContent}
        </motion.div>
    );
};

export default GlassCard;
