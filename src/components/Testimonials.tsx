import React from 'react';
import { Star, MapPin } from 'lucide-react';

const Testimonials: React.FC = () => {
  const testimonials = [
    {
      name: "Lupascu Elizabeth",
      rating: 5,
      text: "Cel mai bune prăjituri, recomand din toată inima, toți invitați de la nunta mea au lăudat prăjiturile și le-a plăcut enorm, faptul care m-a încântat.",
      date: "acum 2 luni"
    },
    {
      name: "Duduman Bianca",
      rating: 5,
      text: "Îmi place foarte mult locația. Este chiar în centru și e foarte liniștită zona. E perfect de savurat o cafea bună alături de ceva dulce care e foarte buuun. Recomand cu mare drag. Iar personalul este foarte amabil și atent.",
      date: "acum 7 luni"
    },
    {
      name: "Horia Andrei Butnaru",
      rating: 5,
      text: "Recomand oricând să apelați la Cristine de casă, am luat un tort de ciocolată cu vișine, a fost sublim, ciocolată de calitate, gust echilibrat, servire ireproșabilă.",
      date: "acum o lună"
    },
    {
      name: "Corina Iliescu",
      rating: 5,
      text: "Prăjituri excelente, gustoase și naturale! Apreciez că nu folosiți margarină sau frișcă artificială. Se simte diferența! Iar locația este deosebit de frumoasă.",
      date: "acum 2 luni"
    },
    {
      name: "Onisim Pînzariu",
      rating: 5,
      text: "Printre cele mai bune prăjituri din Suceava. Cristine de Casă și Albinița - printre preferate.",
      date: "acum o lună"
    },
    {
      name: "m'hai ciubotariu",
      rating: 5,
      text: "Torturi foarte frumoase, și se topesc în gură cat sunt de bune! Felicitări!!!",
      date: "acum 7 luni"
    }
  ];

  return (
    <section className="py-16 bg-[#f5f1ec]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* TITLU */}
        <div className="text-center mb-12">
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-800 mb-4" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700 }}>
            Ce spun cei care ne trec pragul
          </h2>
          <p className="text-xl sm:text-2xl text-gray-700 italic mb-6" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500 }}>
            Povestea noastră e scrisă în zeci de gusturi și sute de zâmbete
          </p>
        </div>

        {/* RECENZII GOOGLE MAPS - 6 recenzii REALE */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300"
            >
              {/* Rating Stars */}
              <div className="flex items-center mb-3">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 text-amber-500 fill-current" />
                ))}
              </div>
              
              {/* Testimonial Text - ITALIC */}
              <p className="text-gray-700 italic mb-4 leading-relaxed" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 400 }}>
                "{testimonial.text}"
              </p>
              
              {/* Name - NORMAL (not italic) */}
              <div className="border-t border-gray-200 pt-3">
                <p className="font-semibold text-gray-800" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600 }}>
                  {testimonial.name}
                </p>
                <p className="text-sm text-gray-500" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 400 }}>
                  {testimonial.date}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* LINK GOOGLE MAPS */}
        <div className="text-center">
          <a
            href="https://www.google.com/maps/place/Cristine+de+cas%C4%83/@47.6480988,26.2516202,17z/data=!4m8!3m7!1s0x4734fd86b7b36edt:0xd266af7514616974!8m2!3d47.64809441!4d26.254195!9m1!1b1!16s%2Fg%2F1tra_plbh5?entry=ttu&g_ep=EgoyMD1!MTAwQC4wLKXMD5oASAFQAw%3D%3D"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center bg-amber-600 hover:bg-amber-700 text-white px-8 py-4 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg"
            style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600 }}
          >
            <MapPin className="h-5 w-5 mr-2" />
            Vezi toate recenziile pe Google Maps
          </a>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
