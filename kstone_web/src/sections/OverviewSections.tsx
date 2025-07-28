import React from 'react';
import { Building2, MapPin, Calendar, Users } from 'lucide-react';
import { FaArrowRight, FaBuilding } from 'react-icons/fa';
import Link from 'next/link';
import Image from 'next/image';

const OverviewSection = () => {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Text Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h2 className="title">
                {/* Crafting Dream Homes Since 2010 */}
                your <span>home</span>, your <span>story</span>
              </h2>
              {/* <p className="content">
                More than walls and a roof — a home is where your life unfolds. It&apos;s where laughter echoes, dreams grow, and memories are made. At SP Home, we don&apos;t just build houses — we shape the spaces that shape you. Explore homes designed not just for living, but for belonging. Let&apos;s create the place you&apos;ll call yours — in every sense of the word.

              </p> */}
              <p className="content">
                At Kstone Homes, we believe a home is more than just four walls
                — it&apos;s where journeys begin, families grow, and memories
                are cherished. Every home we build reflects modern design,
                exceptional craftsmanship, and a deep understanding of what
                transforms a house into a sanctuary. Our promise is simple: to
                deliver thoughtfully designed, lasting spaces that support real
                life. Whether you&apos;re a growing family, a multigenerational
                household, or simply searching for a home that fits your unique
                lifestyle, Kstone Homes is built to serve you for generations.
              </p>
              <p className="content">
                From chef-inspired spice kitchens to sleek quartz countertops,
                open-concept living areas to tranquil private retreats, our
                designs combine everyday comfort with enduring functionality.
                Many of our homes feature multiple master suites — ideal for
                today&apos;s need for flexibility, privacy, and inclusive family
                living. Every detail is crafted with care, because at Kstone
                Homes, we don&apos;t just build houses — we build trust,
                connection, and a place you&apos;ll be proud to call your own.
              </p>
            </div>

            {/* Description */}
            <div className="space-y-4">
              {/* <p className="text-secondary leading-relaxed">
                From luxury apartments to commercial complexes, we bring architectural excellence to every project. Our team of expert architects, engineers, and designers work together to create spaces that not only meet but exceed expectations.
              </p> */}

              {/* Stats */}
              <div className="grid grid-cols-2 gap-8">
                <div className="space-y-2">
                  <div className="flex items-center space-x-3">
                    <Building2 className="text-primary w-6 h-6" />
                    <span className="font-display text-3xl font-semibold text-primary">
                      150+
                    </span>
                  </div>
                  <p className="text-secondary-dark">Projects Completed</p>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center space-x-3">
                    <Users className="text-primary w-6 h-6" />
                    <span className="font-display text-3xl font-semibold text-primary">
                      300+
                    </span>
                  </div>
                  <p className="text-secondary-dark">Happy Families</p>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center space-x-3">
                    <MapPin className="text-primary w-6 h-6" />
                    <span className="font-display text-3xl font-semibold text-primary">
                      20+
                    </span>
                  </div>
                  <p className="text-secondary-dark">Locations</p>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center space-x-3">
                    <Calendar className="text-primary w-6 h-6" />
                    <span className="font-display text-3xl font-semibold text-primary">
                      10+
                    </span>
                  </div>
                  <p className="text-secondary-dark">Years Experience</p>
                </div>
              </div>

              <div className="flex  items-start md:items-center space-x-4 pt-4 md:flex-row flex-col gap-2">
                <Link
                  href="#explore-homes"
                  className={`btn btn-primary w-full md:w-auto justify-center md:justify-start`}
                >
                  Explore
                  <span className="btn-icon">
                    <FaArrowRight size={20} />
                  </span>
                </Link>
                <Link
                  href="/floor-plans"
                  className={`btn btn-outline w-full md:w-auto justify-center md:justify-start`}
                >
                  View Projects
                  <span className="btn-icon">
                    <FaBuilding size={20} />
                  </span>
                </Link>
              </div>
            </div>
          </div>

          {/* Image */}
          <div className="relative">
            <div className="relative overflow-hidden rounded-2xl">
              <Image
                src="/images/ks-showhomes.jpg"
                alt="Modern luxury building"
                width={600}
                height={600}
                className="w-full h-[600px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
            </div>

            {/* Floating Card */}
            <div className="absolute -bottom-8 -left-8 bg-white p-6 rounded-xl shadow-2xl border border-gray-100">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                  <Building2 className="text-primary w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-display text-lg text-primary">
                    Premium Quality
                  </h4>
                  <p className="text-secondary-dark text-sm">
                    Certified Excellence
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OverviewSection;