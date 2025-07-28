import Link from "next/link";


export default function WhatsAppWidget({number}: {number?: number}) {
  return (
    <div className="fixed bottom-5 right-5 z-20">
        <Link href={`https://wa.me/1${number}?text=Hi%2C%0AI'm%20currently%20exploring%20some%20of%20the%20homes%20listed%20on%20your%20website%2C%20SPHomesYEG.com%2C%20and%20would%20love%20to%20get%20more%20information%20regarding%20property%20details%2C%20pricing%2C%20and%20availability.%20Could%20you%20please%20share%20further%20insights%20or%20connect%20me%20with%20someone%20who%20can%20assist%3F`} target="_blank">
          <span className="icon bg-[#29a71a] inline-flex p-2 rounded-full shadow-lg text-white">
            <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-brand-whatsapp">
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M3 21l1.65 -3.8a9 9 0 1 1 3.4 2.9l-5.05 .9" />
              <path d="M9 10a.5 .5 0 0 0 1 0v-1a.5 .5 0 0 0 -1 0v1a5 5 0 0 0 5 5h1a.5 .5 0 0 0 0 -1h-1a.5 .5 0 0 0 0 1" />
            </svg>
          </span>
        </Link>
      </div>
  );
}