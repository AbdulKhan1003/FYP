import { useMap } from "react-leaflet";
import { useEffect } from "react";
import L from "leaflet";
import "leaflet-routing-machine";

const Routing = ({ from, to }) => {
  const map = useMap();

  useEffect(() => {
    if (!map || !from || !to) return;

    const routingControl = L.Routing.control({
      waypoints: [L.latLng(from), L.latLng(to)],
      routeWhileDragging: false,
      addWaypoints: false,
      draggableWaypoints: false,
      show: false,
      createMarker: () => null,
      lineOptions: {
        styles: [{ color: "black", weight: 2 }],
      },
    }).addTo(map);

    // ❌ Remove the routing container div from the DOM
    const container = document.querySelector(".leaflet-routing-container");
    if (container) {
      container.remove();
    }

    return () => {
  if (routingControl && map.hasLayer(routingControl)) {
    map.removeControl(routingControl);
  }
};
  }, [map, from, to]);

  return null;
};

export default Routing;
