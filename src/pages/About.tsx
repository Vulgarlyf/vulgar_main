
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Users, Target, Award, Zap } from "lucide-react";

const About = () => {
  const stats = [
    { number: "60+", label: "Community Members and counting" },
    { number: "20+", label: "Designs Created" },
    { number: "2+", label: "Countries Shipped" },
    { number: "2025", label: "Founded" }
  ];

  const team = [
    {
      name: "Ebuka (Hotboy)",
      role: "Founder / Creative Director",
      image: "/assets/p1.jpg",
      quote: "Design is rebellion made wearable."
    },
    {
      name: "Divine (Dcreator)",
      role: "Designer",
      image: "/assets/p2.jpg", 
      quote: "We don't follow trends, we create movements."
    },
    
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative h-[70vh] bg-black">
          <div className="absolute inset-0 opacity-90">
            <div className="h-full w-full bg-gradient-to-b from-transparent to-black/50" />
            <img 
              src="/assets/000.jpg" 
              alt="About Vulgar" 
              className="h-full w-full object-cover object-center opacity-60"
            />
          </div>
          <div className="container mx-auto px-4 h-full flex items-center relative z-10">
            <div className="max-w-3xl text-white">
              <h1 className="font-display text-4xl md:text-6xl mb-6 tracking-wider text-emerald-400">
                REDEFINING STREETWEAR
              </h1>
              <p className="text-lg md:text-xl text-white/90 leading-relaxed">
                Born from rebellion, crafted with passion. We're not just a brand – 
                we're a movement that celebrates the bold, the authentic, and the unapologetically different.
              </p>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-16 bg-emerald-600 text-white">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              {stats.map((stat, index) => (
                <div key={index} className="space-y-2">
                  <div className="font-display text-3xl md:text-4xl font-bold">
                    {stat.number}
                  </div>
                  <div className="text-emerald-100 text-sm md:text-base">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Our Story Section */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <h2 className="font-display text-3xl md:text-4xl">OUR STORY</h2>
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>
                    Vulgar was born in 2025 from a simple yet powerful belief: authenticity should never be compromised. 
                    Founded by a collective of creatives who were tired of conforming to mainstream fashion norms, 
                    we set out to create something radically different.
                  </p>
                  <p>
                    Our name might shock some, but it represents our commitment to raw, unfiltered expression. 
                    We celebrate the bold, the unconventional, and the unapologetically real. In a world of 
                    fast fashion and empty trends, we stand for substance.
                  </p>
                  <p>
                    Every piece we create tells a story of rebellion against the ordinary. We're not just making clothes; 
                    we're building a community of individuals who refuse to blend in and aren't afraid to make a statement.
                  </p>
                </div>
              </div>
              <div className="relative">
                <img 
                  src="/assets/image01.png" 
                  alt="Vulgar founders working" 
                  className="w-full h-[500px] object-cover rounded-lg shadow-lg"
                />
                <div className="absolute inset-0 bg-emerald-600/10 rounded-lg"></div>
              </div>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="font-display text-3xl md:text-4xl text-center mb-16">WHAT WE STAND FOR</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="text-center space-y-4 p-6">
                <div className="w-16 h-16 bg-emerald-600 rounded-full flex items-center justify-center mx-auto">
                  <Zap className="text-white h-8 w-8" />
                </div>
                <h3 className="font-display text-xl">AUTHENTICITY</h3>
                <p className="text-muted-foreground text-sm">
                  Be true to yourself, no matter what others think. Our designs reflect 
                  genuine expression without compromise.
                </p>
              </div>
              <div className="text-center space-y-4 p-6">
                <div className="w-16 h-16 bg-emerald-600 rounded-full flex items-center justify-center mx-auto">
                  <Award className="text-white h-8 w-8" />
                </div>
                <h3 className="font-display text-xl">QUALITY</h3>
                <p className="text-muted-foreground text-sm">
                  Premium materials and expert craftsmanship ensure every piece 
                  is built to last and withstand the test of time.
                </p>
              </div>
              <div className="text-center space-y-4 p-6">
                <div className="w-16 h-16 bg-emerald-600 rounded-full flex items-center justify-center mx-auto">
                  <Users className="text-white h-8 w-8" />
                </div>
                <h3 className="font-display text-xl">COMMUNITY</h3>
                <p className="text-muted-foreground text-sm">
                  We're more than a brand; we're a movement. Our community of 
                  rebels and creatives shapes everything we do.
                </p>
              </div>
              <div className="text-center space-y-4 p-6">
                <div className="w-16 h-16 bg-emerald-600 rounded-full flex items-center justify-center mx-auto">
                  <Target className="text-white h-8 w-8" />
                </div>
                <h3 className="font-display text-xl">PURPOSE</h3>
                <p className="text-muted-foreground text-sm">
                  Every design serves a purpose: to empower individuals to 
                  express their unique identity and challenge the status quo.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="font-display text-3xl md:text-4xl mb-4">MEET THE REBELS</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                The creative minds behind the movement, united by a shared vision 
                of authentic expression through bold design.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {team.map((member, index) => (
                <div key={index} className="text-center space-y-4 group">
                  <div className="relative overflow-hidden rounded-lg">
                    <img 
                      src={member.image} 
                      alt={member.name}
                      className="w-full h-[300px] object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-emerald-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                  <div>
                    <h3 className="font-display text-xl">{member.name}</h3>
                    <p className="text-emerald-600 font-medium">{member.role}</p>
                    <p className="text-muted-foreground italic mt-2">"{member.quote}"</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Mission Section */}
        <section className="py-16 md:py-24 bg-black text-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center space-y-8">
              <h2 className="font-display text-3xl md:text-4xl text-emerald-400">OUR MISSION</h2>
              <p className="text-lg leading-relaxed text-white/90">
                To empower individuals to express their true selves through bold, uncompromising fashion. 
                We create more than clothing – we craft statements that challenge the status quo and 
                celebrate the beauty of being different.
              </p>
              <div className="bg-emerald-600 text-white p-8 rounded-lg max-w-3xl mx-auto">
                <blockquote className="text-xl md:text-2xl italic font-light">
                  "Fashion is not about fitting in. It's about standing out and owning who you are, 
                  unapologetically and without compromise."
                </blockquote>
                <cite className="block mt-6 text-emerald-200 text-sm">— The Vulgar Collective</cite>
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-16 bg-emerald-600 text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="font-display text-3xl md:text-4xl mb-6">JOIN THE MOVEMENT</h2>
            <p className="text-emerald-100 max-w-2xl mx-auto mb-8 text-lg">
              Ready to express your true self? Explore our collection and become part of a community 
              that celebrates authenticity, creativity, and the courage to be different.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button asChild size="lg" className="bg-white text-emerald-600 hover:bg-gray-100">
                <Link to="/products">Shop Collection</Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-emerald-600">
                <Link to="/contact">Get in Touch</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default About;
