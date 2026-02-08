export default function Footer() {
  return (
    <footer className="bg-zinc-950 text-white pt-24 pb-12">
      <div className="container mx-auto px-6 lg:px-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-20">
          
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-8">
            <div className="text-4xl font-black tracking-tighter">RABIU<span className="text-blue-600">AUTOS</span></div>
            <p className="text-zinc-400 max-w-sm leading-relaxed">
              Redefining the car buying experience with transparency, quality, and a touch of luxury. Your dream car is just a click away.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-6">
            <h4 className="font-bold uppercase tracking-widest text-sm text-blue-500">Inventory</h4>
            <ul className="space-y-4 text-zinc-400 font-medium">
              <li className="hover:text-white cursor-pointer transition-colors">All Vehicles</li>
              <li className="hover:text-white cursor-pointer transition-colors">Luxury SUVs</li>
              <li className="hover:text-white cursor-pointer transition-colors">Electric Cars</li>
              <li className="hover:text-white cursor-pointer transition-colors">New Arrivals</li>
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-6">
            <h4 className="font-bold uppercase tracking-widest text-sm text-blue-500">Contact</h4>
            <ul className="space-y-4 text-zinc-400 font-medium">
              <li>Lagos, Nigeria</li>
              <li>+234 800 RABIU AUTOS</li>
              <li>info@rabiuautos.com</li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-12 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-zinc-500 text-sm">© 2026 Rabiu Autos. All Rights Reserved.</p>
          <div className="flex gap-8 text-zinc-500 text-sm uppercase font-bold tracking-widest">
            <span className="hover:text-white cursor-pointer">Privacy</span>
            <span className="hover:text-white cursor-pointer">Terms</span>
          </div>
        </div>
      </div>
    </footer>
  );
}