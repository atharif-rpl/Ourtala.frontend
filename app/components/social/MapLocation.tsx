// app/components/social/MapLocation.tsx
export default function MapLocation() {
    return (
      <div className="mt-8 pt-6 border-t border-gray-200">
        <h4 className="text-lg font-semibold text-gray-800 mb-4 text-center">Lokasi Kami</h4>
        <div className="rounded-2xl overflow-hidden shadow-lg">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15861.199273622142!2d106.8718302266977!3d-6.355221498155263!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69ecec704c51eb%3A0x71df083600e46255!2sCibubur%2C%20Kec.%20Ciracas%2C%20Kota%20Jakarta%20Timur%2C%20Daerah%20Khusus%20Ibukota%20Jakarta!5e0!3m2!1sid!2sid!4v1759924500641!5m2!1sid!2sid"
            width="100%"
            height="200"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Lokasi Kami"
          />
        </div>
        <p className="text-center text-gray-600 mt-2 text-sm">Daerah Khusus Ibukota Jakarta</p>
      </div>
    )
  }
  