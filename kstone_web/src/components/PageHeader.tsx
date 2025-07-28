"use client";
import { motion, useScroll, useTransform } from "motion/react";
import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";
import { useRef } from "react";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  backgroundImage: string;
  breadcrumbs: BreadcrumbItem[];
}

export default function PageHeader({ 
  title, 
  subtitle, 
  backgroundImage, 
  breadcrumbs 
}: PageHeaderProps) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  });
  
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0.3]);

  return (
    <section ref={ref} className="page-header relative h-[300px] lg:h-[500px] overflow-hidden">
      {/* Parallax Background Image */}
      <motion.div
        style={{ y, opacity }}
        className="absolute inset-0 w-full h-[120%] bg-cover bg-center"
        initial={{ scale: 1.1 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
      >
        <div
          className="w-full h-full bg-cover bg-center"
          style={{
            backgroundImage: `url(${backgroundImage})`,
          }}
        />
      </motion.div>
      
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/30" />
      
      {/* Content */}
      <div className="relative h-full flex items-center">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl">
            {/* Breadcrumbs */}
            <motion.nav
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex items-center mb-6"
            >
              {breadcrumbs.map((item, index) => (
                <div key={index} className="flex items-center">
                  {index === 0 && (
                    <>
                      <Home className="w-4 h-4 text-offwhite/80 mr-2" />
                      {item.href ? (
                        <Link 
                          href={item.href}
                          className="text-offwhite/80 hover:text-offwhite transition-colors duration-300"
                        >
                          {item.label}
                        </Link>
                      ) : (
                        <span className="text-offwhite/80">{item.label}</span>
                      )}
                    </>
                  )}
                  
                  {index > 0 && (
                    <>
                      <ChevronRight className="w-4 h-4 text-offwhite/60 mx-2" />
                      {item.href ? (
                        <Link 
                          href={item.href}
                          className="text-offwhite/80 hover:text-offwhite transition-colors duration-300 capitalize"
                        >
                          {item.label}
                        </Link>
                      ) : (
                        <span className="text-offwhite font-medium capitalize">
                          {item.label}
                        </span>
                      )}
                    </>
                  )}
                </div>
              ))}
            </motion.nav>

            {/* Title */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="font-display text-4xl md:text-5xl lg:text-6xl text-offwhite mb-4 leading-tight capitalize"
            >
              {title}
            </motion.h1>

            {/* Subtitle */}
            {subtitle && (
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="text-lg md:text-xl text-offwhite/90 max-w-2xl leading-relaxed capitalize"
              >
                {subtitle}
              </motion.p>
            )}
          </div>
        </div>
      </div>

      {/* Bottom gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-primary/50 to-transparent" />
    </section>
  );
}

// Usage Example:
// <PageHeader
//   title="Our Gallery"
//   subtitle="Explore our stunning collection of luxury homes and architectural masterpieces"
//   backgroundImage="/images/gallery-hero.jpg"
//   breadcrumbs={[
//     { label: "Home", href: "/" },
//     { label: "Gallery" }
//   ]}
// />