const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground mt-12">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-warning rounded flex items-center justify-center">
                <span className="text-xs font-bold">📊</span>
              </div>
              <div>
                <div className="text-xs opacity-80">DASHBOARD</div>
                <div className="text-lg font-bold">JABAR</div>
              </div>
            </div>
            <p className="text-sm opacity-80">
              Dashboard Pangan Provinsi Jawa Barat menyediakan informasi terkini mengenai harga komoditas pangan di seluruh Jawa Barat.
            </p>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4">Menu</h3>
            <ul className="space-y-2 text-sm opacity-80">
              <li><a href="#" className="hover:opacity-100">Beranda</a></li>
              <li><a href="#" className="hover:opacity-100">Dashboard Pangan</a></li>
              <li><a href="#" className="hover:opacity-100">Tentang</a></li>
              <li><a href="#" className="hover:opacity-100">Kontak</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4">Informasi</h3>
            <ul className="space-y-2 text-sm opacity-80">
              <li><a href="#" className="hover:opacity-100">Syarat & Ketentuan</a></li>
              <li><a href="#" className="hover:opacity-100">Kebijakan Privasi</a></li>
              <li><a href="#" className="hover:opacity-100">FAQ</a></li>
              <li><a href="#" className="hover:opacity-100">Bantuan</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-primary-foreground/20 mt-8 pt-8 text-center">
          <p className="text-sm opacity-80">
            © 2024 Dashboard Jabar. Hak Cipta Dilindungi Undang-Undang.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;