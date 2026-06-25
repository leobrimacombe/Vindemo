import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import { domaine } from '../data/domaine.js'
import { useLang } from '../i18n/LanguageContext.jsx'

/**
 * ContactMap — carte Leaflet centrée sur le domaine.
 * Marqueur personnalisé (DivIcon) pour éviter le bug d'icônes par défaut des
 * bundlers et s'accorder à la charte couleur.
 */

const pinIcon = L.divIcon({
  className: 'domaine-pin',
  html: `<span style="
      display:block;width:22px;height:22px;border-radius:50% 50% 50% 0;
      transform:rotate(-45deg);background:#5A1A22;
      box-shadow:0 4px 10px rgba(0,0,0,.35);border:2px solid #CBA24A;"></span>`,
  iconSize: [22, 22],
  iconAnchor: [11, 22],
  popupAnchor: [0, -22],
})

export default function ContactMap() {
  const { t } = useLang()
  const { contact } = domaine
  const { lat, lng } = contact.coordonnees

  return (
    <MapContainer
      center={[lat, lng]}
      zoom={15}
      scrollWheelZoom={false}
      className="h-full w-full"
      style={{ minHeight: '100%' }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={[lat, lng]} icon={pinIcon}>
        <Popup>
          <strong>{domaine.nom}</strong>
          <br />
          {contact.adresse.ligne1}
          <br />
          {contact.adresse.ligne2}, {t(contact.adresse.pays)}
        </Popup>
      </Marker>
    </MapContainer>
  )
}
