import { client } from "@/sanity/client";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import Link from "next/link";
import {FaArrowLeftLong } from "react-icons/fa6";
import QuickPossessionCard from "@/components/QuickPossessionCard";
import { QuickPossession } from "@/types/propsInterfaces";

interface Community {
  name: string;
  description: string;
  featuredImage: string;
  city: {
    name: string;
  };
}

// interface QuickPossession {
//   _id: string;
//   houseModel: string;
//   houseType: string;
//   city: {
//     name: string;
//   };
//   community: {
//     name: string;
//   };
//   sqft: number;
//   beds: number;
//   baths: number;
//   oldPrice: number;
//   newPrice: number;
//   featuredImage: string;
//   status: "ready" | "pending" | "sold";
//   availability?: number;
//   slug: string;
// }

type Params = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const community = await client.fetch<Community | null>(
    `*[_type == "community" && slug.current == $slug][0]{
      name,
      description,
      "featuredImage": featuredImage.asset->url,
      "city": city->{name}
    }`,
    { slug }
  );

  if (!community) {
    return {
      title: "Community Not Found",
    };
  }

  return {
    title: `${community.name} | ${community.city.name}`,
    description: community.description,
    openGraph: {
      images: [community.featuredImage],
    },
  };
}

// const QuickPossessionCard = ({ possession }: { possession: QuickPossession }) => {
//   const statusConfig = {
//     ready: { color: "bg-emerald-500", text: "Ready to Move in " + possession.availability + " Days", icon: "🟢" },
//     pending: { color: "bg-amber-500", text: "Pending", icon: "🟡" },
//     sold: { color: "bg-red-500", text: "Sold Out", icon: "🔴" }
//   };

//   const currentStatus = statusConfig[possession.status];
//   const hasSavings = possession.oldPrice && possession.oldPrice > possession.newPrice;

//   return (
//     <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-shadow duration-300 group">
//       {/* Featured Image */}
//       <div className="relative w-full aspect-[16/10] overflow-hidden">
//         <Image
//           src={possession.featuredImage}
//           alt={possession.houseModel}
//           fill
//           className="object-cover group-hover:scale-105 transition-transform duration-500"
//         />
//         <div className="absolute inset-0 bg-gradient-to-t from-secondary/40 to-transparent"></div>
        
//         {/* Status Badge */}
//         <div className={`absolute top-4 left-4 ${currentStatus.color} text-white px-3 py-1 rounded-full font-display font-semibold text-sm shadow-lg`}>
//           {currentStatus.icon} {currentStatus.text}
//         </div>

//         {/* Price Badge */}
//         <div className="absolute bottom-4 right-4 bg-white/95 backdrop-blur-sm p-3 rounded-xl shadow-lg border border-white">
//           {hasSavings && (
//             <div className="text-xs font-base text-red-500 line-through mb-1 text-center">
//               ${possession.oldPrice!.toLocaleString()}
//             </div>
//           )}
//           <div className="text-xl font-display font-bold text-green-500 text-center">
//             ${possession.newPrice.toLocaleString()}
//           </div>
//           {hasSavings && (
//             <div className="text-xs font-display font-semibold text-primary text-center mt-1">
//               Save ${(possession.oldPrice! - possession.newPrice).toLocaleString()}
//             </div>
//           )}
//         </div>
//       </div>

//       {/* Content */}
//       <div className="p-6">
//         {/* Header */}
//         <div className="mb-4">
//           <h3 className="text-xl font-display font-bold text-secondary mb-2">
//             {possession.houseModel}
//           </h3>
//           <div className="flex items-center text-sm font-base text-secondary/70">
//             <FaMapMarkerAlt className="w-4 h-4 text-primary mr-2" />
//             {possession.community?.name}, {possession.city?.name}
//           </div>
//         </div>

//         {/* Specs */}
//         <div className="grid grid-cols-3 gap-4 mb-6">
//           <div className="text-center p-3 bg-gradient-to-br from-primary/5 to-primary/10 rounded-xl border border-primary/20">
//             <FaRulerCombined className="w-5 h-5 text-secondary mx-auto mb-2" />
//             <div className="font-display font-bold text-lg text-secondary">{possession.sqft.toLocaleString()}</div>
//             <div className="text-xs font-base text-secondary/60 uppercase tracking-wide">Sq Ft</div>
//           </div>
          
//           <div className="text-center p-3 bg-gradient-to-br from-secondary/5 to-secondary/10 rounded-xl border border-secondary/20">
//             <FaBed className="w-5 h-5 text-primary mx-auto mb-2" />
//             <div className="font-display font-bold text-lg text-secondary">{possession.beds}</div>
//             <div className="text-xs font-base text-secondary/60 uppercase tracking-wide">Beds</div>
//           </div>
          
//           <div className="text-center p-3 bg-gradient-to-br from-primary/5 to-primary/10 rounded-xl border border-primary/20">
//             <FaBath className="w-5 h-5 text-secondary mx-auto mb-2" />
//             <div className="font-display font-bold text-lg text-secondary">{possession.baths}</div>
//             <div className="text-xs font-base text-secondary/60 uppercase tracking-wide">Baths</div>
//           </div>
//         </div>

//         {/* View Details Button */}
//         <Link 
//           href={`/quick-possessions/${possession.slug}`}
//           className="block w-full bg-primary text-white text-center py-3 rounded-xl font-display font-semibold hover:bg-secondary transition-colors duration-300"
//         >
//           View Details
//         </Link>
//       </div>
//     </div>
//   );
// };

export default async function CommunityPage({ params }: Params) {
  const { slug } = await params;
  
  // Fetch community data
  const community = await client.fetch<Community | null>(
    `*[_type == "community" && slug.current == $slug][0]{
      name,
      description,
      "featuredImage": featuredImage.asset->url,
      "city": city->{name}
    }`,
    { slug }
  );

  if (!community) return notFound();

  // Fetch quick possessions that belong to this community
  const quickPossessions = await client.fetch<QuickPossession[]>(
    `*[_type == "quickPossession" && community->slug.current == $slug]{
      _id,
      houseModel,
      houseType,
      "city": city->{name},
      "community": community->{name},
      sqft,
      beds,
      baths,
      oldPrice,
      newPrice,
      address,
      "featuredImage": featuredImage.asset->url,
      status,
      availability,
      "slug": slug.current
    } | order(_createdAt desc)`,
    { slug }
  );

  return (
    <main className="">
      <PageHeader
        title={community.name}
        subtitle={community.city.name}
        backgroundImage={community.featuredImage}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Communities", href: "/communities" },
          { label: community.name }
        ]}
      />

      <section className="py-16 bg-gradient-to-b from-white to-gray/10">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center ">
            <h2 className="title">
              About {community.name}
            </h2>
            <div className="w-24 md:w-[400px] h-1 bg-gradient-to-r from-primary/30 to-primary mx-auto mb-6"></div>
            <p className="content">
              {community.description}
            </p>
          </div>
        </div>
      </section>

      {/* Quick Possessions Section */}
      {quickPossessions.length > 0 && (
        <section className="pt-0_ bg-gradient-to-bl from-gray-50 to-white">
          <div className="container">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-display font-bold text-secondary mb-4">
                Available Quick Possessions
              </h2>
              <div className="w-24 h-1 bg-gradient-to-r from-primary to-secondary mx-auto mb-6"></div>
              <p className="text-lg font-base text-secondary/70">
                Discover ready-to-move homes in {community.name}
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {quickPossessions.map((item) => (
                <QuickPossessionCard key={item._id} item={item} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Empty State */}
      {quickPossessions.length === 0 && (
        <section className="py-16 bg-gradient-to-b from-gray/5 to-white">
          <div className="container">
            <div className="text-center max-w-2xl mx-auto">
              <h2 className="text-2xl font-display font-bold text-secondary mb-4">
                No Quick Possessions Available
              </h2>
              <p className="text-lg font-base text-secondary/70 mb-8">
                Currently, there are no quick possession properties available in {community.name}. 
                Check back soon for new listings!
              </p>
              <Link 
                href="/quick-possessions" 
                className="btn btn-primary justify-center"
              ><FaArrowLeftLong />
                View All Quick Possessions
              </Link>
            </div>
          </div>
        </section>
      )}
    </main>
  );
}