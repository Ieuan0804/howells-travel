export default function About() {
  const stats = [
    { number: '15+', label: 'Years Experience' },
    { number: '50+', label: 'Happy Customers' },
    { number: '1000+', label: 'Successful Trips' },
    { number: '24/7', label: 'Customer Support' }
  ];

  const values = [
    {
      icon: '🏴󠁧󠁢󠁷󠁬󠁳󠁿',
      title: 'Welsh Heritage',
      description: 'Proudly Welsh-owned and operated, we understand the local culture and hidden gems of our beautiful country.'
    },
    {
      icon: '🛡️',
      title: 'Safety First',
      description: 'All our drivers are fully licensed, experienced, and committed to the highest safety standards on every journey.'
    },
    {
      icon: '💎',
      title: 'Premium Service',
      description: 'Modern, comfortable minibuses with professional drivers ensure your journey is as enjoyable as your destination.'
    },
    {
      icon: '🤝',
      title: 'Personal Touch',
      description: 'We treat every customer like family, providing personalized service that goes beyond just transportation.'
    }
  ];

  return (
    <section id="about" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main About Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
          <div>
            <h2 className="text-4xl font-bold text-gray-900 font-playfair mb-6">
              About Howells Travel
            </h2>
            <p className="text-lg text-gray-600 mb-6 leading-relaxed">
              Founded in 2009, Howells Travel has been proudly serving Wales with premium minibus 
              transportation services. As a family-owned business, we understand the importance of 
              reliable, comfortable, and safe travel for your most important journeys.
            </p>
            <p className="text-lg text-gray-600 mb-6 leading-relaxed">
              Our deep roots in Welsh communities give us unique insights into the best routes, 
              hidden gems, and local attractions that make your journey truly special. From the 
              bustling streets of Cardiff to the serene beauty of Snowdonia, we know Wales like 
              the back of our hand.
            </p>
            <p className="text-lg text-gray-600 leading-relaxed">
              Whether you're planning a corporate event, family gathering, or exploring Wales' 
              rich heritage, our experienced team is dedicated to making your travel experience 
              memorable and stress-free.
            </p>
          </div>
          <div className="relative">
            <img
              src="https://images.unsplash.com/photo-1570125909517-53cb21c89ff2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
              alt="Howells Travel minibus team"
              className="rounded-lg shadow-xl w-full h-96 object-cover"
            />
            <div className="absolute -bottom-6 -right-6 bg-red-600 text-white p-6 rounded-lg shadow-lg">
              <div className="text-3xl font-bold font-playfair">15+</div>
              <div className="text-sm">Years of Excellence</div>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-20">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-4xl font-bold text-red-600 font-playfair mb-2">
                {stat.number}
              </div>
              <div className="text-gray-600 font-medium">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* Values Section */}
        <div>
          <h3 className="text-3xl font-bold text-gray-900 text-center font-playfair mb-12">
            Our Values
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div key={index} className="text-center">
                <div className="text-6xl mb-4">{value.icon}</div>
                <h4 className="text-xl font-bold text-gray-900 mb-3 font-playfair">
                  {value.title}
                </h4>
                <p className="text-gray-600 leading-relaxed">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Welsh Heritage Highlight */}
        <div className="mt-20 bg-gradient-to-r from-red-600 to-gray-800 rounded-lg p-8 text-white">
          <div className="text-center">
            <div className="text-6xl mb-4">🏴󠁧󠁢󠁷󠁬󠁳󠁿</div>
            <h3 className="text-3xl font-bold mb-4 font-playfair">
              Proudly Welsh
            </h3>
            <p className="text-xl max-w-3xl mx-auto leading-relaxed">
              We're not just a travel company - we're ambassadors of Welsh culture and heritage. 
              Our drivers share local stories, recommend authentic Welsh experiences, and ensure 
              your journey through Wales is filled with the warmth and hospitality our country 
              is famous for.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
