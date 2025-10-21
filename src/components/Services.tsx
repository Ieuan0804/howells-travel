export default function Services() {
  const services = [
    {
      icon: '🚌',
      title: 'Airport Transfers',
      description: 'Reliable and comfortable transfers to and from all major Welsh airports including Cardiff, Bristol, and Birmingham.',
      features: ['Meet & Greet Service', 'Flight Tracking', 'Luggage Assistance', '24/7 Availability']
    },
    {
      icon: '🏰',
      title: 'Heritage Tours',
      description: 'Discover Wales\' rich history with guided tours to castles, historic sites, and cultural landmarks.',
      features: ['Expert Local Guides', 'Historic Castles', 'Cultural Sites', 'Custom Itineraries']
    },
    {
      icon: '🌊',
      title: 'Coastal Adventures',
      description: 'Explore the stunning Welsh coastline from Pembrokeshire to Anglesey with our comfortable minibuses.',
      features: ['Scenic Routes', 'Beach Access', 'Coastal Villages', 'Photo Opportunities']
    },
    {
      icon: '🎉',
      title: 'Event Transportation',
      description: 'Professional transport for weddings, corporate events, and special occasions across Wales.',
      features: ['Wedding Packages', 'Corporate Events', 'Special Occasions', 'Flexible Scheduling']
    },
    {
      icon: '👥',
      title: 'Group Travel',
      description: 'Perfect for sports teams, school groups, and social clubs traveling throughout Wales.',
      features: ['Large Capacity', 'Group Discounts', 'Flexible Routes', 'Experienced Drivers']
    },
    {
      icon: '🏔️',
      title: 'Mountain & Countryside',
      description: 'Venture into the Welsh mountains and countryside with our reliable and safe transportation.',
      features: ['Snowdonia National Park', 'Brecon Beacons', 'Rural Villages', 'Mountain Passes']
    }
  ];

  return (
    <section id="services" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 font-playfair mb-4">
            Our Services
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            From airport transfers to heritage tours, we provide comprehensive minibus travel services 
            across Wales with comfort, reliability, and Welsh hospitality.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-lg p-8 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
            >
              <div className="text-6xl mb-6 text-center">{service.icon}</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4 font-playfair">
                {service.title}
              </h3>
              <p className="text-gray-600 mb-6 leading-relaxed">
                {service.description}
              </p>
              <ul className="space-y-2">
                {service.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center text-gray-700">
                    <svg className="w-5 h-5 text-red-600 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="mt-16 text-center">
          <div className="bg-red-600 rounded-lg p-8 text-white">
            <h3 className="text-3xl font-bold mb-4 font-playfair">
              Ready to Explore Wales?
            </h3>
            <p className="text-xl mb-6">
              Contact us today for a personalized quote and let us plan your perfect Welsh adventure.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="#contact"
                className="bg-white text-red-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-300"
              >
                Get Free Quote
              </a>
              <a
                href="tel:+441234567890"
                className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-red-600 transition-colors duration-300"
              >
                Call Now: +44 1234 567890
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

