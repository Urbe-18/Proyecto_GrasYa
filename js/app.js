/* ================= utilidades ================= */
const $ = s => document.querySelector(s);
const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const soles = n => { n = Math.round((n || 0) * 100) / 100; return 'S/' + (Number.isInteger(n) ? n : n.toFixed(2)); };
const pad = n => String(n).padStart(2, '0');
const iso = d => `${d.getFullYear()}-${pad(d.getMonth()+1)}-${pad(d.getDate())}`;
const hoyISO = (dias = 0) => { const t = new Date(); t.setDate(t.getDate() + dias); return iso(t); };
const horaTxt = h => `${pad(h % 24)}:00`;
const fechaTxt = f => new Date(f + 'T12:00').toLocaleDateString('es-PE', {weekday:'long', day:'numeric', month:'long'});
const uid = () => Math.random().toString(36).slice(2, 10);
const KEY = 'grassya-v3';  // v3: datos de ejemplo en Huánuco
const HUANUCO = [-9.9306, -76.2422];
const ZOOM_INICIAL = 13;
const DIAS_MAX = 30;
const MAX_FOTOS = 8;
const SERVICIOS = ['Estacionamiento','Vestuarios','Duchas','Baños','Iluminación nocturna','Cancha techada','Venta de bebidas',
  'Kiosko / cafetería','Alquiler de pelotas','Alquiler de chalecos','Graderías / tribuna','Vigilancia','Wi-Fi','Parrilla / zona de reunión'];

/* ================= datos de ejemplo ================= */
function datosEjemplo(){
  const L_ = (o) => Object.assign({fotos:[], servicios:[], serviciosOtros:'', descripcion:'', referencia:'', motivo:'', creado:hoyISO(-3)}, o);
  const locales = [
    // Locales ficticios en ubicaciones reales de Huánuco (puntos tomados de OpenStreetMap)
    L_({id:'L1', nombre:'Grass El Golazo', distrito:'Huánuco', direccion:'Calle Antonio Raimondi, Las Moras', referencia:'Urb. Las Moras',
      lat:-9.9157, lng:-76.2386, dueno:'Carlos Ríos', telefono:'987 654 321', email:'carlos@correo.com', estado:'aprobado',
      apertura:8, cierre:23, inicioNoche:18, adelanto:{tipo:'fijo', valor:20},
      politica:'Cancelación gratis hasta 12 h antes. Después, el adelanto no se devuelve pero puedes reprogramar una vez.',
      servicios:['Estacionamiento','Vestuarios','Baños','Iluminación nocturna','Venta de bebidas'],
      canchas:[{id:'C1', nombre:'Cancha 1', tipo:'Fútbol 7', precio:60, recargo:20},{id:'C2', nombre:'Cancha 2', tipo:'Fútbol 5', precio:50, recargo:15}]}),
    L_({id:'L2', nombre:'La Bombonera Sport', distrito:'Amarilis', direccion:'Paucarbamba', referencia:'Zona de Paucarbamba',
      lat:-9.9415, lng:-76.2390, dueno:'María Quispe', telefono:'912 345 678', email:'maria@correo.com', estado:'aprobado',
      apertura:9, cierre:24, inicioNoche:18, adelanto:{tipo:'pct', valor:50},
      politica:'Devolución del 100% hasta 24 h antes. Menos de 24 h: sin devolución.',
      servicios:['Duchas','Vestuarios','Cancha techada','Graderías / tribuna','Wi-Fi'],
      canchas:[{id:'C3', nombre:'Cancha Principal', tipo:'Fútbol 7', precio:70, recargo:20}]}),
    L_({id:'L3', nombre:'Complejo Deportivo Pichanguita', distrito:'Pillco Marca', direccion:'Av. Universitaria, Cayhuayna', referencia:'Cerca a la UNHEVAL',
      lat:-9.9543, lng:-76.2489, dueno:'José Huamán', telefono:'955 111 222', email:'jose@correo.com', estado:'aprobado',
      apertura:7, cierre:22, inicioNoche:18, adelanto:{tipo:'fijo', valor:15},
      politica:'Puedes reprogramar sin costo hasta 6 h antes. No hay devolución del adelanto.',
      servicios:['Baños','Alquiler de pelotas','Alquiler de chalecos','Venta de bebidas'], serviciosOtros:'Árbitro a pedido',
      canchas:[{id:'C4', nombre:'Cancha A', tipo:'Fútbol 6', precio:45, recargo:15},{id:'C5', nombre:'Cancha B', tipo:'Fútbol 6', precio:45, recargo:15},{id:'C6', nombre:'Cancha C (techada)', tipo:'Fútbol 6', precio:55, recargo:15}]}),
    L_({id:'L4', nombre:'Grass Los Cracks', distrito:'Pillco Marca', direccion:'Cayhuayna', lat:-9.9608, lng:-76.2463,
      dueno:'Rosa Mendoza', telefono:'944 222 333', email:'rosa@correo.com', estado:'pendiente', creado:hoyISO(-1),
      apertura:8, cierre:23, inicioNoche:18, adelanto:{tipo:'fijo', valor:20}, politica:'Cancelación gratis hasta 12 h antes.',
      servicios:['Baños','Estacionamiento','Iluminación nocturna'],
      canchas:[{id:'C7', nombre:'Cancha única', tipo:'Fútbol 6', precio:55, recargo:15}]}),
    L_({id:'L5', nombre:'Mundialito Huallaga', distrito:'Amarilis', direccion:'Av. Las Canteras de Llicua', lat:-9.9276, lng:-76.2295,
      dueno:'Luis Paredes', telefono:'933 777 888', email:'luis@correo.com', estado:'pendiente', creado:hoyISO(0),
      apertura:10, cierre:23, inicioNoche:19, adelanto:{tipo:'pct', valor:50}, politica:'Sin devolución. Reprogramación sujeta a disponibilidad.',
      servicios:['Duchas','Kiosko / cafetería','Vigilancia'],
      canchas:[{id:'C8', nombre:'Cancha 1', tipo:'Fútbol 7', precio:50, recargo:10},{id:'C9', nombre:'Cancha 2', tipo:'Fútbol 7', precio:50, recargo:10}]}),
    L_({id:'L6', nombre:'Grass La Cantera', distrito:'Huánuco', direccion:'Jr. Huallayco', lat:-9.9166, lng:-76.2362,
      dueno:'Pedro Ramírez', telefono:'966 444 555', email:'pedro@correo.com', estado:'aprobado',
      apertura:8, cierre:23, inicioNoche:18, adelanto:{tipo:'fijo', valor:15}, politica:'Cancelación gratis hasta 12 h antes.',
      servicios:['Baños','Iluminación nocturna','Venta de bebidas'],
      canchas:[{id:'C10', nombre:'Cancha 1', tipo:'Fútbol 6', precio:45, recargo:10},{id:'C11', nombre:'Cancha 2', tipo:'Fútbol 6', precio:45, recargo:10}]}),
    L_({id:'L7', nombre:'Complejo Universitario Fútbol', distrito:'Pillco Marca', direccion:'Av. Universitaria', referencia:'A una cuadra de la UNHEVAL',
      lat:-9.9488, lng:-76.2507, dueno:'Ana Espinoza', telefono:'977 888 999', email:'ana@correo.com', estado:'aprobado',
      apertura:9, cierre:23, inicioNoche:18, adelanto:{tipo:'pct', valor:30}, politica:'Reprogramación sin costo hasta 6 h antes.',
      servicios:['Vestuarios','Duchas','Estacionamiento','Iluminación nocturna'],
      canchas:[{id:'C12', nombre:'Cancha Sintética', tipo:'Fútbol 7', precio:55, recargo:15}]}),
  ];
  // Las reservas ya no son de ejemplo: viven en Firestore y se comparten entre todos
  return {locales, reservas:[], ajustes:{yape:'999 000 111', titular:'GrassYa', comision:3, piloto:false}};
}

/* ================= reglas de negocio ================= */
const precioHora = (l, c, h) => c.precio + (h >= l.inicioNoche ? c.recargo : 0);
const calcAdelanto = (l, total) => l.adelanto.tipo === 'fijo' ? Math.min(l.adelanto.valor, total) : Math.round(total * l.adelanto.valor) / 100;
const adelantoTxt = l => l.adelanto.tipo === 'fijo' ? soles(l.adelanto.valor) : `${l.adelanto.valor}% del total`;
const horas = l => Array.from({length:Math.max(0, l.cierre - l.apertura)}, (_, i) => l.apertura + i);
const serviciosDe = l => [...(l.servicios || []), ...String(l.serviciosOtros || '').split(',').map(s => s.trim()).filter(Boolean)];
function horaPasada(fecha, h){ const ahora = new Date(); const hoy = iso(ahora); return fecha < hoy || (fecha === hoy && h <= ahora.getHours()); }

let db;
try { db = JSON.parse(localStorage.getItem(KEY)) || datosEjemplo(); } catch { db = datosEjemplo(); }
db.reservas = [];  // las reservas llegan de Firestore (escucharReservas); las viejas de este navegador se ignoran
function guardar(){
  // En este navegador solo se guardan locales, fotos y ajustes. Las reservas van a Firestore.
  try { localStorage.setItem(KEY, JSON.stringify({...db, reservas:[]})); return true; }
  catch { toast('No hay espacio para guardar. Elimina algunas fotos e intenta de nuevo.'); return false; }
}
const local = id => db.locales.find(l => l.id === id);
const cancha = (l, id) => l.canchas.find(c => c.id === id) || {id, nombre:'(cancha eliminada)', tipo:'', precio:0, recargo:0};
const ocupacion = (lid, cid, f, h) => db.reservas.find(r => r.localId === lid && r.canchaId === cid && r.fecha === f && r.hora === h && !['rechazada','cancelada'].includes(r.estado));
const tasaComision = () => db.ajustes.piloto ? 0 : (db.ajustes.comision || 0) / 100;

/* ================= reservas compartidas (Firebase) ================= */
// Cada reserva es un documento de la colección "reservas" con ID cancha_fecha_hora (ej. C1_2026-11-09_20).
// Dos reservas de la misma cancha, día y hora caen en el MISMO ID: la transacción solo deja crear la primera.
let miUid = null, conexion = 'conectando';  // conectando | ok | error
const idReserva = (canchaId, fecha, hora) => `${canchaId}_${fecha}_${hora}`;
const refReserva = id => firebase.firestore().collection('reservas').doc(id);
const OCUPADA = new Error('ocupada');
function conectarReservas(){
  if (typeof firebase === 'undefined' || !firebase.apps.length) { conexion = 'error'; render(true); return; }
  // Login anónimo: da un uid estable por navegador. Recién con el uid se leen y escriben reservas.
  firebase.auth().signInAnonymously()
    .then(cred => { miUid = cred.user.uid; escucharReservas(); })
    .catch(e => { console.error(e); conexion = 'error'; render(true); });
}
function escucharReservas(){
  // Tiempo real: cada vez que alguien reserva, cancela o bloquea, Firestore avisa a todos los navegadores abiertos
  firebase.firestore().collection('reservas').onSnapshot(snap => {
    db.reservas = snap.docs.map(d => ({...d.data(), id:d.id}));
    const primera = conexion !== 'ok'; conexion = 'ok';
    refrescarEnVivo(primera);
  }, e => { console.error(e); conexion = 'error'; render(true); });
}
function listo(){
  if (conexion === 'ok') return true;
  toast(conexion === 'error' ? 'Sin conexión con el servidor de reservas. Recarga la página.' : 'Conectando con el servidor de reservas… intenta en unos segundos.');
  return false;
}
function crearReserva(datos){
  const ref = refReserva(idReserva(datos.canchaId, datos.fecha, datos.hora));
  return firebase.firestore().runTransaction(async tx => {
    if ((await tx.get(ref)).exists) throw OCUPADA;
    tx.set(ref, {...datos, userId:miUid, createdAt:firebase.firestore.FieldValue.serverTimestamp()});
  });
}
async function cancelarReserva(id){
  const r = db.reservas.find(x => x.id === id);
  if (!r) return false;
  if (r.userId !== miUid) { toast('Solo quien hizo la reserva puede cancelarla'); return false; }
  try { await refReserva(id).delete(); return true; } catch (e) { errorReserva(e); return false; }
}
function errorReserva(e){
  if (e === OCUPADA) return toast('Esa cancha ya está reservada a esa hora');
  console.error(e);
  if (e.code === 'permission-denied') return toast('No tienes permiso: solo quien hizo la reserva puede modificarla o cancelarla');
  if (e.code === 'unavailable') return toast('Sin conexión. Revisa tu internet e intenta de nuevo.');
  toast('No se pudo guardar la reserva. Intenta de nuevo.');
}
// Al llegar cambios de otros usuarios se redibuja, salvo donde borraría lo que el usuario está escribiendo
function refrescarEnVivo(primera){
  if (primera) return render(true);
  if (!$('#sheet').hidden) return;
  const ajena = (c, h) => { const oc = ocupacion(st.localSel, c, st.fecha, h); return oc && oc.userId !== miUid; };
  if (st.vista === 'cliente') {
    if ((st.paso === 2 || st.paso === 3) && st.slotSel && ajena(st.slotSel.c, st.slotSel.h)) {
      st.paso = 2; st.slotSel = null; render(true); toast('Esa hora acaba de ocuparse. Elige otra.'); return;
    }
    if (st.paso === 3 || st.paso === 4) return;
    if (st.paso === 1 && document.querySelector('.leaflet-popup')) return;  // no cerrar el popup abierto
  }
  if (st.vista === 'dueno' && st.dueno.sub !== 'calendario') return;
  if (st.vista === 'admin' && st.admin.sub === 'ajustes') return;
  render(true);
}

/* ================= toast y hoja inferior ================= */
let toastT, undoFn;
function toast(msg, undo){
  $('#toastMsg').textContent = msg; undoFn = undo;
  $('#toastUndo').hidden = !undo; $('#toast').hidden = false;
  clearTimeout(toastT); toastT = setTimeout(() => $('#toast').hidden = true, 4500);
}
$('#toastUndo').onclick = () => { if (undoFn) undoFn(); $('#toast').hidden = true; };
function abrirHoja(html){ $('#sheetBody').innerHTML = html; $('#sheet').hidden = false; }
function cerrarHoja(){ $('#sheet').hidden = true; }
$('#sheet').onclick = e => { if (e.target.id === 'sheet') cerrarHoja(); };

/* ================= mapas ================= */
let mapas = [];
function capaBase(m){
  // Mapa vectorial (OpenFreeMap, estilo Positron): se dibuja en el navegador, así que se ve nítido
  // a cualquier zoom y muestra los nombres de jirones y calles de OpenStreetMap. No necesita API key.
  if (L.maplibreGL && window.maplibregl && maplibregl.supported?.() !== false) {
    return L.maplibreGL({style:'https://tiles.openfreemap.org/styles/positron',
      attribution:'<a href="https://openfreemap.org" target="_blank" rel="noopener">OpenFreeMap</a> &copy; <a href="https://www.openmaptiles.org/" target="_blank" rel="noopener">OpenMapTiles</a> &copy; <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener">OpenStreetMap</a>'}).addTo(m);
  }
  // Respaldo sin WebGL: imágenes de Esri (se ven borrosas pasado el zoom 16)
  const esri = 'https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/';
  return L.layerGroup([
    L.tileLayer(esri + 'World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}', {maxZoom:19, maxNativeZoom:16, attribution:'Mapa &copy; Esri, HERE, Garmin, &copy; colaboradores de OpenStreetMap'}),
    L.tileLayer(esri + 'World_Light_Gray_Reference/MapServer/tile/{z}/{y}/{x}', {maxZoom:19, maxNativeZoom:16})]).addTo(m);
}
// Satélite (Esri World Imagery, sin API key). En Huánuco hay fotos reales solo hasta el zoom 17 (ninguna versión de
// Esri tiene más). En 18 y 19 Leaflet amplía la foto del 17: se ve suavizada, pero los nombres y pines siguen nítidos.
const FOTO_MAX_REAL = 17;
let usarSatelite = false;  // se recuerda al volver a dibujar la pantalla
// Nombres de calles sobre el satélite: el mismo mapa vectorial pero solo con sus textos (nítidos a cualquier zoom),
// en blanco con borde oscuro para que se lean sobre la foto. Va en un pane propio, encima de la imagen y sin capturar clics.
function nombresSatelite(m){
  if (!(L.maplibreGL && window.maplibregl)) return null;
  if (!m.getPane('nombres')) { const p = m.createPane('nombres'); p.style.zIndex = 450; p.style.pointerEvents = 'none'; }
  const capa = L.maplibreGL({style:'https://tiles.openfreemap.org/styles/positron', pane:'nombres', interactive:false});
  capa.on('add', () => capa.getMaplibreMap().once('style.load', e => {
    const gl = e.target;
    gl.getStyle().layers.forEach(ly => {
      if (ly.type !== 'symbol') return gl.removeLayer(ly.id);  // fuera fondo, calles y edificios: solo textos
      if (!ly.layout || !ly.layout['text-field']) return;
      gl.setPaintProperty(ly.id, 'text-color', '#ffffff');
      gl.setPaintProperty(ly.id, 'text-halo-color', 'rgba(0,0,0,0.8)');
      gl.setPaintProperty(ly.id, 'text-halo-width', 1.6);
    });
  }));
  return capa;
}
function selectorSatelite(m, mapa){
  const foto = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
    {maxZoom:19, maxNativeZoom:FOTO_MAX_REAL, attribution:'Imágenes &copy; Esri, Maxar, Earthstar Geographics'});
  const nombres = nombresSatelite(m);
  const satelite = nombres ? L.layerGroup([foto, nombres]) : foto;
  L.control.layers({'Mapa':mapa, 'Satélite':satelite}, null, {position:'topright', collapsed:false}).addTo(m);
  if (usarSatelite) { m.removeLayer(mapa); satelite.addTo(m); }
  m.on('baselayerchange', e => { usarSatelite = e.layer === satelite; });
}
const pin = color => L.divIcon({className:'', html:`<div class="pin" style="background:${color}"></div>`, iconSize:[26,26], iconAnchor:[13,26], popupAnchor:[0,-24]});
function nuevoMapa(el, centro, zoom, opciones = {}){
  const m = L.map(el, {maxZoom:19, ...opciones}).setView(centro, zoom);
  selectorSatelite(m, capaBase(m)); mapas.push(m);
  setTimeout(() => { if (mapas.includes(m)) m.invalidateSize({animate:false}); }, 80);
  return m;
}
function montarMapas(){
  mapas.forEach(m => { m.off(); m.stop(); m.remove(); }); mapas = [];
  const els = document.querySelectorAll('[data-mapa]');
  if (!els.length) return;
  if (typeof L === 'undefined') {
    els.forEach(el => { el.classList.add('mapa-aviso'); el.textContent = 'El mapa necesita conexión a internet. Revisa tu conexión y vuelve a cargar la página.'; });
    return;
  }
  els.forEach(el => {
    const tipo = el.dataset.mapa;
    if (tipo === 'lista') mapaLista(el);
    if (tipo === 'punto') { const m = nuevoMapa(el, [+el.dataset.lat, +el.dataset.lng], 16, {scrollWheelZoom:false}); L.marker([+el.dataset.lat, +el.dataset.lng], {icon:pin('#1f8a4c')}).addTo(m); }
    if (tipo === 'elegir') mapaElegir(el);
  });
}
// Círculo verde con el número de locales agrupados; gris si ninguno tiene canchas libres a esa hora
const iconoGrupo = grupo => {
  const hijos = grupo.getAllChildMarkers(), conLibres = hijos.some(x => x.options.libres > 0);
  return L.divIcon({html:`<div><span>${hijos.length}</span></div>`, className:`grupo ${conLibres ? '' : 'grupo-gris'}`, iconSize:[40, 40]});
};
function popupLocal(d){
  // Se arma con nodos (textContent) en lugar de HTML para no inyectar texto del dueño
  const caja = document.createElement('div'); caja.className = 'popup-local';
  const linea = (txt, cls) => { const x = document.createElement('div'); if (cls) x.className = cls; x.textContent = txt; caja.append(x); };
  const t = document.createElement('b'); t.textContent = d.nombre; caja.append(t);
  linea(d.distrito, 'muted small');
  linea(`Desde ${soles(d.desde)}/hora a las ${horaTxt(st.hora)}`);
  linea(`Horario: ${horaTxt(d.apertura)} – ${horaTxt(d.cierre)}`);
  linea(d.libres > 0 ? `${d.libres} cancha(s) libre(s) a esa hora` : 'Sin canchas libres a esa hora', d.libres > 0 ? 'popup-ok' : 'popup-no');
  const a = document.createElement('button'); a.className = 'btn sm full'; a.textContent = 'Reservar'; a.onclick = () => verLocal(d.id);
  caja.append(a);
  return caja;
}
function mapaLista(el){
  const m = nuevoMapa(el, HUANUCO, ZOOM_INICIAL);
  // Si el plugin de agrupación no cargó, los marcadores van directo al mapa
  const capa = typeof L.markerClusterGroup === 'function'
    ? L.markerClusterGroup({iconCreateFunction:iconoGrupo, showCoverageOnHover:false, maxClusterRadius:50}) : m;
  const pts = [];
  (st.mapaDatos || []).forEach(d => {
    L.marker([d.lat, d.lng], {icon:pin(d.libres > 0 ? '#1f8a4c' : '#9aa59c'), libres:d.libres}).addTo(capa).bindPopup(popupLocal(d));
    pts.push([d.lat, d.lng]);
  });
  if (capa !== m) m.addLayer(capa);
  // Arranca en Huánuco; solo se aleja si algún local queda fuera de esa vista
  if (pts.length && !pts.every(p => m.getBounds().contains(p))) m.fitBounds(pts, {padding:[30,30], maxZoom:15});
}
function mapaElegir(el){
  const b = st.borrador, txt = $('#ubTxt');
  const tiene = b.lat != null;
  const m = nuevoMapa(el, tiene ? [b.lat, b.lng] : HUANUCO, tiene ? 17 : ZOOM_INICIAL);
  let marca = null;
  const poner = (ll, centrar) => {
    if (!marca) { marca = L.marker(ll, {icon:pin('#c0392b'), draggable:true}).addTo(m); marca.on('dragend', () => poner(marca.getLatLng(), false)); }
    else marca.setLatLng(ll);
    b.lat = +ll.lat.toFixed(6); b.lng = +ll.lng.toFixed(6);
    txt.textContent = `✔ Ubicación marcada (${b.lat}, ${b.lng}). Puedes arrastrar el pin para ajustarla.`;
    if (centrar) m.setView(ll, 17);
  };
  if (tiene) poner(L.latLng(b.lat, b.lng), false);
  m.on('click', e => poner(e.latlng, false));
  $('#btnGps').onclick = () => {
    if (!navigator.geolocation) { txt.textContent = 'Tu navegador no permite obtener la ubicación. Toca el mapa.'; return; }
    txt.textContent = 'Buscando tu ubicación…';
    navigator.geolocation.getCurrentPosition(p => poner(L.latLng(p.coords.latitude, p.coords.longitude), true),
      () => { txt.textContent = 'No se pudo obtener tu ubicación. Marca el punto tocando el mapa.'; }, {enableHighAccuracy:true, timeout:10000});
  };
  const buscar = () => {
    const q = $('#buscarDir').value.trim(); if (!q) return;
    txt.textContent = 'Buscando…';
    fetch('https://nominatim.openstreetmap.org/search?format=json&limit=1&countrycodes=pe&q=' + encodeURIComponent(q))
      .then(r => r.json())
      .then(res => res.length ? poner(L.latLng(+res[0].lat, +res[0].lon), true) : (txt.textContent = 'No encontramos esa dirección. Prueba con el distrito o toca el mapa.'))
      .catch(() => { txt.textContent = 'No se pudo buscar. Marca el punto tocando el mapa.'; });
  };
  $('#btnBuscar').onclick = buscar;
  $('#buscarDir').onkeydown = e => { if (e.key === 'Enter') { e.preventDefault(); buscar(); } };
}
const mapaPunto = (l, clase = 'bajo') => l.lat != null
  ? `<div class="mapa ${clase}" data-mapa="punto" data-lat="${l.lat}" data-lng="${l.lng}"></div>
     <p class="small" style="margin:6px 0 0"><a href="https://www.google.com/maps/dir/?api=1&destination=${l.lat},${l.lng}" target="_blank" rel="noopener">Cómo llegar (Google Maps) →</a></p>`
  : '<p class="muted small">Sin ubicación registrada.</p>';

/* ================= piezas comunes ================= */
const chips = (l, vacio = 'No ha indicado servicios.') => { const s = serviciosDe(l); return s.length ? `<div class="chips">${s.map(x => `<span class="chip">${esc(x)}</span>`).join('')}</div>` : `<p class="muted small" style="margin:0">${vacio}</p>`; };
const estadoLocal = e => ({aprobado:'<span class="badge b-ok">Publicado</span>', pendiente:'<span class="badge b-pend">En revisión</span>', rechazado:'<span class="badge b-no">Rechazado</span>'}[e]);
const estadoReserva = e => ({confirmada:'<span class="badge b-ok">Confirmada</span>', pendiente:'<span class="badge b-pend">Pago en verificación</span>', rechazada:'<span class="badge b-no">Rechazada</span>', bloqueada:'<span class="badge b-gris">Bloqueada</span>'}[e]);
const fondoFoto = l => l.fotos && l.fotos.length ? `style="background-image:url('${esc(l.fotos[0])}')"` : '';
function galeria(l){
  if (!l.fotos || !l.fotos.length) return `<div class="foto vacia" style="height:220px;margin:0"></div>`;
  return `<div class="galeria"><img class="principal" id="fotoPrincipal" src="${esc(l.fotos[0])}" alt="Foto de ${esc(l.nombre)}">
    ${l.fotos.length > 1 ? `<div class="minis">${l.fotos.map((f, i) => `<img src="${esc(f)}" class="${i ? '' : 'on'}" onclick="verFoto(this)" alt="Foto ${i+1}">`).join('')}</div>` : ''}</div>`;
}
function verFoto(img){ $('#fotoPrincipal').src = img.src; img.parentElement.querySelectorAll('img').forEach(i => i.classList.toggle('on', i === img)); }
const opcHoras = (sel, desde, hasta) => Array.from({length:hasta - desde + 1}, (_, i) => desde + i).map(h => `<option value="${h}" ${h === sel ? 'selected' : ''}>${h === 24 ? '24:00' : horaTxt(h)}</option>`).join('');

/* ================= navegación ================= */
const horaInicial = Math.max(20, new Date().getHours() + 1);  // la próxima hora útil
const st = { vista:'cliente', fecha:horaInicial > 23 ? hoyISO(1) : hoyISO(), hora:horaInicial > 23 ? 20 : horaInicial, distrito:'', localSel:null, slotSel:null, paso:1,
  dueno:{local:'L1', sub:'calendario', fecha:hoyISO()}, admin:{sub:'resumen', filtro:'', ficha:null, desde:hoyISO().slice(0, 8) + '01', hasta:hoyISO()},
  borrador:null, borradorDe:null, mapaDatos:[] };
$('#nav').onclick = e => {
  const v = e.target.dataset.v; if (!v) return;
  st.vista = v; if (v === 'cliente') { st.paso = 1; st.slotSel = null; }
  document.querySelectorAll('#nav button').forEach(b => b.classList.toggle('on', b.dataset.v === v));
  render();
};
$('#reset').onclick = () => {
  abrirHoja(`<h3>¿Restaurar datos de ejemplo?</h3><p>Se borrarán los locales y fotos que hayas creado en este navegador. Las reservas compartidas no se tocan.</p>
    <div class="row"><button class="btn red" style="flex:1" onclick="restaurar()">Sí, restaurar</button><button class="btn sec" onclick="cerrarHoja()">Cancelar</button></div>`);
};
function restaurar(){ db = {...datosEjemplo(), reservas:db.reservas}; guardar(); cerrarHoja(); st.paso = 1; st.dueno.local = 'L1'; st.dueno.sub = 'calendario'; st.borrador = null; st.admin.sub = 'resumen'; render(); toast('Datos de ejemplo restaurados'); }

function render(mantenerScroll){
  const y = window.scrollY;
  const app = $('#app');
  // Al refrescar (p. ej. llega una reserva nueva) el mapa vuelve a donde estaba el usuario
  const vistasMapa = mantenerScroll ? mapas.map(m => ({tipo:m.getContainer().dataset.mapa, centro:m.getCenter(), zoom:m.getZoom()})) : [];
  const aviso = conexion === 'error' ? '<div class="alerta">No hay conexión con el servidor de reservas: la disponibilidad puede no estar al día y no se puede reservar. Revisa tu internet y recarga la página.</div>'
    : conexion === 'conectando' ? '<div class="note" style="margin-bottom:12px">Conectando con el servidor de reservas…</div>' : '';
  if (st.vista === 'cliente') app.innerHTML = aviso + vistaCliente();
  if (st.vista === 'dueno') app.innerHTML = aviso + vistaDueno();
  if (st.vista === 'admin') app.innerHTML = aviso + vistaAdmin();
  montarMapas();
  mapas.forEach((m, i) => { const v = vistasMapa[i]; if (v && v.tipo === m.getContainer().dataset.mapa) m.setView(v.centro, v.zoom, {animate:false}); });
  window.scrollTo({top: mantenerScroll ? y : 0});
}

/* =====================================================
   CLIENTE
   ===================================================== */
function pasos(){
  const n = ['Buscar', 'Elegir cancha', 'Pagar adelanto', 'Listo'];
  return `<div class="steps">${n.map((t, i) => `<span class="${i + 1 === st.paso ? 'on' : ''}">${i + 1}. ${t}</span>`).join('')}</div>`;
}
function vistaCliente(){
  if (st.paso === 2 && local(st.localSel)) return clienteLocal();
  if (st.paso === 3 && st.slotSel) return clientePago();
  if (st.paso === 4) return clienteListo();
  st.paso = 1;
  const aprob = db.locales.filter(l => l.estado === 'aprobado' && l.canchas.length);
  const distritos = [...new Set(aprob.map(l => l.distrito))].sort();
  const lista = aprob.filter(l => !st.distrito || l.distrito === st.distrito).map(l => {
    const abierto = st.hora >= l.apertura && st.hora < l.cierre;
    const libres = abierto && !horaPasada(st.fecha, st.hora) ? l.canchas.filter(c => !ocupacion(l.id, c.id, st.fecha, st.hora)).length : 0;
    return {l, abierto, libres, desde:Math.min(...l.canchas.map(c => precioHora(l, c, st.hora)))};
  }).sort((a, b) => b.libres - a.libres);
  st.mapaDatos = lista.filter(x => x.l.lat != null).map(x => ({id:x.l.id, nombre:x.l.nombre, lat:x.l.lat, lng:x.l.lng, libres:x.libres,
    distrito:x.l.distrito, desde:x.desde, apertura:x.l.apertura, cierre:x.l.cierre}));
  const tarjetas = lista.map(({l, abierto, libres, desde}) => {
    const badge = !abierto ? '<span class="badge b-no">Cerrado a esa hora</span>'
      : libres ? `<span class="badge b-ok">${libres} de ${l.canchas.length} libre${libres > 1 ? 's' : ''}</span>` : '<span class="badge b-no">Sin horas libres</span>';
    const sv = serviciosDe(l);
    return `<div class="card local" onclick="verLocal('${l.id}')">
      <div class="foto ${l.fotos.length ? '' : 'vacia'}" ${fondoFoto(l)}></div>
      <div class="row between"><h3 style="margin:0">${esc(l.nombre)}</h3>${badge}</div>
      <div class="muted small">${esc(l.distrito)}${l.direccion ? ' · ' + esc(l.direccion) : ''}</div>
      <div style="margin-top:6px">Desde <b>${soles(desde)}</b>/hora · adelanto ${adelantoTxt(l)}</div>
      ${sv.length ? `<div class="chips" style="margin-top:8px">${sv.slice(0, 4).map(s => `<span class="chip">${esc(s)}</span>`).join('')}${sv.length > 4 ? `<span class="chip">+${sv.length - 4}</span>` : ''}</div>` : ''}
    </div>`;
  }).join('');
  return `${pasos()}
    <h2>¿A qué hora juega tu grupo?</h2>
    <p class="muted" style="margin-top:-6px">Mira en una sola pantalla qué grass está libre, sin preguntar cancha por cancha.</p>
    <div class="card row">
      <label>Fecha<input type="date" value="${st.fecha}" min="${hoyISO()}" max="${hoyISO(DIAS_MAX)}" onchange="st.fecha=this.value||hoyISO();render()"></label>
      <label>Hora<select onchange="st.hora=+this.value;render()">${opcHoras(st.hora, 6, 23)}</select></label>
      <label>Distrito<select onchange="st.distrito=this.value;render()"><option value="">Todos</option>${distritos.map(d => `<option ${d === st.distrito ? 'selected' : ''}>${esc(d)}</option>`).join('')}</select></label>
      <div class="muted small" style="padding-bottom:8px">${fechaTxt(st.fecha)} · ${horaTxt(st.hora)}</div>
    </div>
    ${st.mapaDatos.length ? `<div class="card" style="padding:10px"><div class="mapa" data-mapa="lista"></div>
      <div class="legend" style="padding:0 4px"><span><i style="background:#1f8a4c;border-radius:50%"></i>Con canchas libres</span><span><i style="background:#9aa59c;border-radius:50%"></i>Sin canchas libres a esa hora</span></div></div>` : ''}
    ${misReservas()}
    <div class="grid">${tarjetas || '<p class="muted">No hay locales publicados en esta búsqueda.</p>'}</div>`;
}
function misReservas(){
  const mias = db.reservas.filter(r => r.userId === miUid && r.origen === 'plataforma' && r.fecha >= hoyISO())
    .sort((a, b) => (a.fecha + pad(a.hora)).localeCompare(b.fecha + pad(b.hora)));
  if (!mias.length) return '';
  return `<div class="card"><h3>Mis reservas</h3>${mias.map(r => { const l = local(r.localId); return `<div class="list-item">
    <div><b>${esc(l ? l.nombre : 'Local')}</b> · ${esc(l ? cancha(l, r.canchaId).nombre : '')}
      <div class="muted small">${fechaTxt(r.fecha)} · ${horaTxt(r.hora)}</div></div>
    <div class="row" style="align-items:center">${estadoReserva(r.estado) || ''}<button class="btn sm sec" onclick="pedirCancelar('${esc(r.id)}')">Cancelar</button></div></div>`; }).join('')}</div>`;
}
function pedirCancelar(id){
  const r = db.reservas.find(x => x.id === id), l = r && local(r.localId);
  if (!r) return;
  abrirHoja(`<h3>¿Cancelar tu reserva?</h3><p>${esc(l ? l.nombre : '')} · ${fechaTxt(r.fecha)} a las ${horaTxt(r.hora)}</p>
    ${l ? `<p class="note">Política del local: ${esc(l.politica)}</p>` : ''}
    <div class="row"><button class="btn red" style="flex:1" onclick="confirmarCancelar('${esc(id)}')">Sí, cancelar</button><button class="btn sec" onclick="cerrarHoja()">Volver</button></div>`);
}
async function confirmarCancelar(id){ cerrarHoja(); if (await cancelarReserva(id)) toast('Reserva cancelada; la hora quedó libre'); }
function verLocal(id){ st.localSel = id; st.slotSel = null; st.paso = 2; st.vista = 'cliente'; render(); }

function clienteLocal(){
  const l = local(st.localSel);
  const filas = l.canchas.map(c => `<tr><th>${esc(c.nombre)}${c.tipo ? ' · ' + esc(c.tipo) : ''}<div class="muted" style="font-weight:400">${soles(c.precio)} · noche ${soles(c.precio + c.recargo)}</div></th>${horas(l).map(h => {
    if (ocupacion(l.id, c.id, st.fecha, h)) return `<td><button class="slot s-reservada" disabled>${horaTxt(h)}<br>Reservada</button></td>`;
    if (horaPasada(st.fecha, h)) return `<td><button class="slot s-pasada" disabled>${horaTxt(h)}<br>—</button></td>`;
    const sel = st.slotSel && st.slotSel.c === c.id && st.slotSel.h === h;
    return `<td><button class="slot s-libre ${h >= l.inicioNoche ? 's-noche' : ''} ${sel ? 's-sel' : ''}" onclick="elegirSlot('${c.id}',${h})">${horaTxt(h)}<br>${soles(precioHora(l, c, h))}</button></td>`;
  }).join('')}</tr>`).join('');
  return `${pasos()}
    <button class="link" onclick="st.paso=1;render()">← Volver a la lista</button>
    <h2 style="margin-top:8px">${esc(l.nombre)}</h2>
    <p class="muted" style="margin-top:-8px">${esc(l.distrito)}${l.direccion ? ' · ' + esc(l.direccion) : ''}${l.referencia ? ' (' + esc(l.referencia) + ')' : ''}</p>
    <div class="grid2">
      <div>${galeria(l)}</div>
      <div class="card"><h3>Ubicación</h3>${mapaPunto(l)}</div>
    </div>
    <div class="grid2" style="margin:14px 0">
      <div class="card"><h3>Servicios</h3>${chips(l)}${l.descripcion ? `<p style="margin-bottom:0">${esc(l.descripcion)}</p>` : ''}</div>
      <div class="card"><h3>Horario y política</h3>
        <p style="margin:0 0 6px">Atiende de ${horaTxt(l.apertura)} a ${horaTxt(l.cierre)} · precio de noche desde las ${horaTxt(l.inicioNoche)}</p>
        <p style="margin:0">Adelanto: <b>${adelantoTxt(l)}</b>. ${esc(l.politica)}</p></div>
    </div>
    <div class="card">
      <div class="row between" style="margin-bottom:8px"><h3 style="margin:0">Horas disponibles</h3>
        <label>Fecha<input type="date" value="${st.fecha}" min="${hoyISO()}" max="${hoyISO(DIAS_MAX)}" onchange="st.fecha=this.value||hoyISO();st.slotSel=null;render(true)"></label></div>
      <p class="muted small" style="margin:0 0 6px">${fechaTxt(st.fecha)}. Toca una hora libre.</p>
      <div class="table-wrap"><table class="cal">${filas}</table></div>
      <div class="legend"><span><i style="background:var(--green-l)"></i>Libre (día)</span><span><i style="background:#d3eadc"></i>Libre (noche)</span><span><i style="background:var(--red-l)"></i>Reservada</span><span><i style="background:#f1f3f1"></i>Ya pasó</span></div>
    </div>
    <div class="row" style="justify-content:flex-end">
      ${st.slotSel ? `<span class="muted small" style="padding-bottom:10px">${esc(cancha(l, st.slotSel.c).nombre)} · ${horaTxt(st.slotSel.h)}</span>` : ''}
      <button class="btn" ${st.slotSel ? '' : 'disabled'} onclick="st.paso=3;render()">Continuar al pago</button>
    </div>`;
}
function elegirSlot(c, h){ st.slotSel = {c, h}; render(true); }

function clientePago(){
  const l = local(st.localSel), c = cancha(l, st.slotSel.c), h = st.slotSel.h;
  const total = precioHora(l, c, h), ad = calcAdelanto(l, total);
  return `${pasos()}
    <button class="link" onclick="st.paso=2;render()">← Cambiar horario</button>
    <h2 style="margin-top:8px">Paga tu adelanto</h2>
    <div class="grid2">
      <div class="card summary">
        <h3>Resumen</h3>
        <div><span>Local</span><span>${esc(l.nombre)}</span></div>
        <div><span>Dirección</span><span>${esc(l.direccion || l.distrito)}</span></div>
        <div><span>Cancha</span><span>${esc(c.nombre)}${c.tipo ? ' · ' + esc(c.tipo) : ''}</span></div>
        <div><span>Fecha</span><span>${fechaTxt(st.fecha)}</span></div>
        <div><span>Hora</span><span>${horaTxt(h)} – ${horaTxt(h + 1)}</span></div>
        <div><span>Precio de la hora${h >= l.inicioNoche ? ' (noche)' : ''}</span><span>${soles(total)}</span></div>
        <div><b>Adelanto a pagar ahora</b><b>${soles(ad)}</b></div>
        <div><span>Saldo a pagar en la cancha</span><span>${soles(total - ad)}</span></div>
        <div class="muted small" style="display:block">Sin cargos extra para ti.</div>
      </div>
      <div class="card">
        <h3>Yape o Plin</h3>
        <div class="yape"><div><div class="muted small">Yapea o plinea a ${esc(db.ajustes.titular)}</div>
          <div class="stat" style="font-size:24px">${esc(db.ajustes.yape)}</div><div class="small">Monto exacto: <b>${soles(ad)}</b></div></div></div>
        <div class="row" style="margin-top:12px">
          <label style="flex:1 1 160px">Nombre del equipo o delegado<input id="pNom" maxlength="60" placeholder="Ej. Promo 2015"></label>
          <label style="flex:1 1 140px">Celular (WhatsApp)<input id="pTel" inputmode="tel" maxlength="15" placeholder="9xx xxx xxx"></label>
        </div>
        <label style="margin-top:10px">Número de operación<input id="pOp" inputmode="numeric" maxlength="30" placeholder="Lo ves en el comprobante de tu app"></label>
        <p class="note">Política del local: ${esc(l.politica)}</p>
        <button class="btn full" id="btnPagar" onclick="enviarPago()">Ya pagué, enviar reserva</button>
      </div>
    </div>`;
}
async function enviarPago(){
  const nom = $('#pNom').value.trim(), tel = $('#pTel').value.trim(), op = $('#pOp').value.trim();
  if (!nom || !/^[\d\s+]{9,15}$/.test(tel)) { toast('Completa tu nombre y un celular válido'); return; }
  if (op.length < 4) { toast('Escribe el número de operación de tu Yape o Plin'); return; }
  if (!listo()) return;
  const l = local(st.localSel), c = cancha(l, st.slotSel.c), h = st.slotSel.h;
  const precio = precioHora(l, c, h), btn = $('#btnPagar');
  btn.disabled = true; btn.textContent = 'Enviando…';
  try {
    await crearReserva({localId:l.id, canchaId:c.id, fecha:st.fecha, hora:h, cliente:nom, telefono:tel, operacion:op,
      precio, adelanto:calcAdelanto(l, precio), estado:'pendiente', origen:'plataforma', nota:'', creado:hoyISO()});
    st.paso = 4; render();
  } catch (e) {
    errorReserva(e);
    if (e === OCUPADA) { st.paso = 2; st.slotSel = null; render(); }
    else { btn.disabled = false; btn.textContent = 'Ya pagué, enviar reserva'; }
  }
}
function clienteListo(){
  const l = local(st.localSel), c = cancha(l, st.slotSel.c);
  return `${pasos()}
    <div class="card" style="text-align:center;padding:32px 16px">
      <div style="font-size:44px">⚽</div>
      <h2>¡Reserva enviada!</h2>
      <p>${esc(c.nombre)} en <b>${esc(l.nombre)}</b><br>${fechaTxt(st.fecha)} a las ${horaTxt(st.slotSel.h)}</p>
      <p class="muted small">Estamos verificando tu pago. Te confirmaremos por WhatsApp.<br>La hora queda separada para ti mientras tanto.</p>
      ${l.lat != null ? `<p><a href="https://www.google.com/maps/dir/?api=1&destination=${l.lat},${l.lng}" target="_blank" rel="noopener">Cómo llegar →</a></p>` : ''}
      <button class="btn" onclick="st.paso=1;st.slotSel=null;render()">Hacer otra reserva</button>
    </div>`;
}

/* =====================================================
   DUEÑO
   ===================================================== */
function vistaDueno(){
  const D = st.dueno;
  if (D.sub === 'nuevo') return editorLocal(true);
  let l = local(D.local) || db.locales[0];
  if (!l) { D.sub = 'nuevo'; return editorLocal(true); }
  D.local = l.id;
  const opc = db.locales.map(x => `<option value="${x.id}" ${x.id === l.id ? 'selected' : ''}>${esc(x.nombre)}</option>`).join('');
  const cabecera = `
    <div class="row between" style="margin-bottom:12px">
      <div><h2 style="margin:0">${esc(l.nombre)}</h2><div class="muted small">${esc(l.dueno)} · ${estadoLocal(l.estado)}</div></div>
      <label>Mi local<select onchange="st.dueno.local=this.value;st.borrador=null;render()">${opc}</select></label>
    </div>
    <div class="tabs">
      <button class="${D.sub === 'calendario' ? 'on' : ''}" onclick="st.dueno.sub='calendario';render()">Calendario</button>
      <button class="${D.sub === 'editar' ? 'on' : ''}" onclick="st.dueno.sub='editar';st.borrador=null;render()">Mi local: datos, mapa, fotos y canchas</button>
      <button onclick="st.dueno.sub='nuevo';st.borrador=null;render()">+ Registrar local nuevo</button>
    </div>
    ${l.estado === 'pendiente' ? '<div class="note" style="margin-bottom:14px">Tu local está en revisión. Los clientes lo verán cuando el administrador lo apruebe. Mientras tanto puedes completar fotos, ubicación y servicios.</div>' : ''}
    ${l.estado === 'rechazado' ? `<div class="alerta">Tu local fue rechazado${l.motivo ? ': ' + esc(l.motivo) : ''}. Corrige los datos y guarda para enviarlo otra vez a revisión.</div>` : ''}`;
  return cabecera + (D.sub === 'editar' ? editorLocal(false, l) : calendarioDueno(l));
}

function calendarioDueno(l){
  const f = st.dueno.fecha;
  const filas = l.canchas.map(c => `<tr><th>${esc(c.nombre)}<div class="muted" style="font-weight:400">${soles(c.precio)} · noche ${soles(c.precio + c.recargo)}</div></th>${horas(l).map(h => {
    const oc = ocupacion(l.id, c.id, f, h);
    if (!oc) return `<td><button class="slot s-libre ${h >= l.inicioNoche ? 's-noche' : ''}" onclick="tocarSlot('${c.id}',${h})">${horaTxt(h)}<br>Libre</button></td>`;
    const cls = oc.estado === 'bloqueada' ? 's-bloq' : oc.estado === 'pendiente' ? 's-pend' : 's-reservada';
    const txt = oc.estado === 'bloqueada' ? 'Bloqueada' : esc(oc.cliente.slice(0, 12));
    return `<td><button class="slot ${cls}" onclick="tocarSlot('${c.id}',${h})">${horaTxt(h)}<br>${txt}</button></td>`;
  }).join('')}</tr>`).join('');
  const delDia = db.reservas.filter(r => r.localId === l.id && r.fecha === f && r.estado === 'confirmada');
  const pend = db.reservas.filter(r => r.localId === l.id && r.estado === 'pendiente').sort((a, b) => (a.fecha + pad(a.hora)).localeCompare(b.fecha + pad(b.hora)));
  const prox = db.reservas.filter(r => r.localId === l.id && r.estado === 'confirmada' && r.fecha >= hoyISO()).sort((a, b) => (a.fecha + pad(a.hora)).localeCompare(b.fecha + pad(b.hora))).slice(0, 12);
  const item = r => `<div class="list-item"><div><b>${esc(r.cliente)}</b> · ${esc(r.telefono)}<div class="muted small">${esc(cancha(l, r.canchaId).nombre)} · ${fechaTxt(r.fecha)} ${horaTxt(r.hora)}</div></div>`;
  return `
    <div class="card">
      <div class="row between" style="margin-bottom:8px">
        <h3 style="margin:0">Calendario</h3>
        <div class="row" style="align-items:center">
          <button class="btn sm sec" onclick="moverDia(-1)">‹</button>
          <input type="date" value="${f}" onchange="st.dueno.fecha=this.value||hoyISO();render(true)">
          <button class="btn sm sec" onclick="moverDia(1)">›</button>
        </div>
      </div>
      <p class="muted small" style="margin:0 0 6px">${fechaTxt(f)}. ¿Separaron por WhatsApp? Toca la hora y bloquéala. Así nadie la paga en la plataforma.</p>
      ${l.canchas.length ? `<div class="table-wrap"><table class="cal">${filas}</table></div>` : '<p class="muted">Agrega una cancha en "Mi local".</p>'}
      <div class="legend"><span><i style="background:var(--green-l)"></i>Libre</span><span><i style="background:var(--amber-l)"></i>Pago en verificación</span><span><i style="background:var(--red-l)"></i>Reservada</span><span><i style="background:var(--gray-l)"></i>Bloqueada por ti</span></div>
      <div class="row" style="margin-top:12px;gap:28px">
        <div><div class="muted small">Reservas confirmadas del día</div><div class="stat">${delDia.length}</div></div>
        <div><div class="muted small">Valor reservado por GrassYa</div><div class="stat">${soles(delDia.reduce((s, r) => s + r.precio, 0))}</div></div>
      </div>
    </div>
    <div class="grid2">
      <div class="card"><h3>Pagos en verificación</h3>
        ${pend.map(r => item(r) + `${estadoReserva('pendiente')}</div>`).join('') || '<p class="muted small" style="margin:0">No hay pagos por verificar.</p>'}
        <p class="muted small" style="margin-bottom:0">GrassYa verifica el Yape/Plin y confirma. La hora ya queda separada mientras tanto.</p></div>
      <div class="card"><h3>Próximas reservas confirmadas</h3>
        ${prox.map(r => item(r) + `<span class="small">Cobrar ${soles(r.precio - r.adelanto)}</span></div>`).join('') || '<p class="muted small" style="margin:0">Sin reservas próximas.</p>'}</div>
    </div>`;
}
function moverDia(d){ const t = new Date(st.dueno.fecha + 'T12:00'); t.setDate(t.getDate() + d); st.dueno.fecha = iso(t); render(true); }

function tocarSlot(cid, h){
  const l = local(st.dueno.local), c = cancha(l, cid), f = st.dueno.fecha, oc = ocupacion(l.id, cid, f, h);
  const titulo = `<h3>${esc(c.nombre)} · ${horaTxt(h)}</h3><p class="muted small" style="margin-top:-6px">${fechaTxt(f)}</p>`;
  if (!oc) return abrirHoja(`${titulo}
    <label>Motivo (opcional)<input id="blMot" maxlength="80" placeholder="Ej. Separada por WhatsApp – Juan"></label>
    <div class="row" style="margin-top:14px"><button class="btn" style="flex:1" onclick="bloquear('${cid}',${h})">Bloquear esta hora</button><button class="btn sec" onclick="cerrarHoja()">Cancelar</button></div>`);
  if (oc.estado === 'bloqueada') return abrirHoja(`${titulo}<p>Bloqueada: ${esc(oc.nota || 'sin motivo')}</p>
    ${oc.userId === miUid ? '' : '<p class="muted small">La bloqueó otro dispositivo: solo se puede liberar desde allí.</p>'}
    <div class="row">${oc.userId === miUid ? `<button class="btn" style="flex:1" onclick="liberar('${esc(oc.id)}')">Liberar hora</button>` : ''}<button class="btn sec" onclick="cerrarHoja()">Cerrar</button></div>`);
  abrirHoja(`${titulo}<div class="summary">
      <div><span>Cliente</span><span>${esc(oc.cliente)}</span></div>
      <div><span>Celular</span><span>${esc(oc.telefono)}</span></div>
      <div><span>Estado</span><span>${estadoReserva(oc.estado)}</span></div>
      <div><span>Adelanto (lo recibe GrassYa)</span><span>${soles(oc.adelanto)}</span></div>
      <div><span>Saldo a cobrar en cancha</span><b>${soles(oc.precio - oc.adelanto)}</b></div></div>
    <button class="btn sec full" style="margin-top:12px" onclick="cerrarHoja()">Cerrar</button>`);
}
async function bloquear(cid, h){
  const nota = $('#blMot').value.trim() || 'Separada por WhatsApp';
  cerrarHoja();
  if (!listo()) return;
  const datos = {localId:st.dueno.local, canchaId:cid, fecha:st.dueno.fecha, hora:h, cliente:'', telefono:'', precio:0, adelanto:0,
    estado:'bloqueada', origen:'dueno', nota};
  try { await crearReserva(datos); } catch (e) { return errorReserva(e); }
  toast(`${horaTxt(h)} bloqueada`, () => cancelarReserva(idReserva(cid, datos.fecha, h)));
}
async function liberar(id){
  const r = db.reservas.find(x => x.id === id);
  cerrarHoja();
  if (!r || !await cancelarReserva(id)) return;
  const {id:_, userId, createdAt, ...datos} = r;
  toast(`${horaTxt(r.hora)} liberada`, () => crearReserva(datos).catch(errorReserva));
}

/* ---------- editor de local (nuevo o existente) ---------- */
function borradorPara(nuevo, l){
  const clave = nuevo ? 'nuevo' : l.id;
  if (!st.borrador || st.borradorDe !== clave) {
    st.borradorDe = clave;
    st.borrador = nuevo
      ? {id:'L' + uid(), nombre:'', distrito:'', direccion:'', referencia:'', descripcion:'', lat:null, lng:null, dueno:'', telefono:'', email:'',
         estado:'pendiente', motivo:'', apertura:8, cierre:23, inicioNoche:18, adelanto:{tipo:'fijo', valor:20},
         politica:'Cancelación gratis hasta 12 horas antes. Después, el adelanto no se devuelve.', servicios:[], serviciosOtros:'',
         canchas:[{id:'C' + uid(), nombre:'Cancha 1', tipo:'Fútbol 7', precio:50, recargo:15}], fotos:[], creado:hoyISO()}
      : JSON.parse(JSON.stringify(l));
  }
  return st.borrador;
}
function editorLocal(nuevo, l){
  const b = borradorPara(nuevo, l);
  const campo = (id, et, val, extra = '') => `<label>${et}<input id="${id}" value="${esc(val)}" ${extra}></label>`;
  return `
    ${nuevo ? `<button class="link" onclick="st.dueno.sub='calendario';st.borrador=null;render()">← Volver</button>
      <h2 style="margin-top:8px">Registra tu grass</h2><p class="muted" style="margin-top:-6px">Completa los datos. El administrador revisará tu local antes de publicarlo.</p>` : ''}
    <div class="card"><h3>Tus datos de contacto</h3>
      <div class="grid2">${campo('fDueno', 'Nombre del dueño', b.dueno, 'maxlength="60"')}${campo('fTel', 'Celular (WhatsApp)', b.telefono, 'inputmode="tel" maxlength="15"')}${campo('fEmail', 'Correo', b.email, 'type="email" maxlength="80"')}</div></div>
    <div class="card"><h3>Datos del local</h3>
      <div class="grid2">${campo('fNombre', 'Nombre del local', b.nombre, 'maxlength="80"')}${campo('fDistrito', 'Distrito', b.distrito, 'maxlength="60" placeholder="Ej. Amarilis"')}
        ${campo('fDir', 'Dirección', b.direccion, 'maxlength="120" placeholder="Av., calle y número"')}${campo('fRef', 'Referencia', b.referencia, 'maxlength="120" placeholder="Ej. Frente al mercado"')}</div>
      <label style="margin-top:10px">Descripción (opcional)<textarea id="fDesc" rows="2" maxlength="500">${esc(b.descripcion)}</textarea></label></div>
    <div class="card"><h3>Ubicación en el mapa</h3>
      <p class="muted small" style="margin-top:-4px">Busca tu dirección o toca el mapa donde está tu grass. Puedes arrastrar el pin rojo para ajustarlo.</p>
      <div class="row" style="margin-bottom:10px">
        <input id="buscarDir" placeholder="Ej. Jr. Huallayco, Huánuco" style="flex:1 1 240px">
        <button class="btn sec" id="btnBuscar">Buscar</button>
        <button class="btn sec" id="btnGps">📍 Estoy en el local</button>
      </div>
      <div class="mapa alto" data-mapa="elegir"></div>
      <p class="small" id="ubTxt" style="margin-bottom:0">${b.lat != null ? '✔ Ubicación marcada.' : 'Aún no marcas la ubicación.'}</p></div>
    <div class="card"><h3>Servicios que ofreces</h3>
      <div class="servicios-check">${SERVICIOS.map(s => `<label class="check"><input type="checkbox" class="fServ" value="${esc(s)}" ${b.servicios.includes(s) ? 'checked' : ''}> ${esc(s)}</label>`).join('')}</div>
      ${campo('fOtros', 'Otros servicios (separados por coma)', b.serviciosOtros, 'maxlength="300" placeholder="Ej. Árbitro, Venta de rehidratantes"').replace('<label>', '<label style="margin-top:10px">')}</div>
    <div class="card"><h3>Horario, adelanto y política</h3>
      <div class="row">
        <label>Abre<select id="fAp">${opcHoras(b.apertura, 0, 23)}</select></label>
        <label>Cierra<select id="fCi">${opcHoras(b.cierre, 1, 24)}</select></label>
        <label>Precio de noche desde<select id="fNo">${opcHoras(b.inicioNoche, 0, 24)}</select></label>
        <label>Tipo de adelanto<select id="fAt"><option value="fijo" ${b.adelanto.tipo === 'fijo' ? 'selected' : ''}>Monto fijo (S/)</option><option value="pct" ${b.adelanto.tipo === 'pct' ? 'selected' : ''}>Porcentaje (%)</option></select></label>
        <label style="width:100px">Valor<input id="fAv" type="number" min="0" step="0.5" value="${b.adelanto.valor}"></label>
      </div>
      <label style="margin-top:10px">Política de cancelación<textarea id="fPol" rows="2" maxlength="500">${esc(b.politica)}</textarea></label></div>
    <div class="card"><h3>Canchas y precios</h3>
      ${b.canchas.map((c, i) => `<div class="row list-item" data-cancha="${i}">
        <label style="flex:1 1 150px">Nombre<input class="cNom" value="${esc(c.nombre)}" maxlength="60"></label>
        <label style="width:120px">Tipo<input class="cTipo" value="${esc(c.tipo || '')}" maxlength="30" placeholder="Fútbol 7"></label>
        <label style="width:100px">Día S/<input class="cPre" type="number" min="1" step="0.5" value="${c.precio}"></label>
        <label style="width:110px">+Noche S/<input class="cRec" type="number" min="0" step="0.5" value="${c.recargo}"></label>
        <button class="btn sm sec" onclick="quitarCanchaEd(${i})">Quitar</button></div>`).join('')}
      <button class="btn sm sec" style="margin-top:10px" onclick="agregarCanchaEd()">+ Agregar cancha</button></div>
    <div class="card"><h3>Fotos del grass <span class="muted small">(${b.fotos.length} de ${MAX_FOTOS})</span></h3>
      <div class="fotos-ed">${b.fotos.map((f, i) => `<figure><img src="${esc(f)}" alt="Foto ${i + 1}"><figcaption>${i === 0 ? '<span class="badge b-info">Portada</span> ' : `<button class="btn sm sec" onclick="portadaEd(${i})">Portada</button> `}<button class="btn sm sec" onclick="quitarFotoEd(${i})">Eliminar</button></figcaption></figure>`).join('')}</div>
      ${b.fotos.length ? '' : '<p class="muted small">Aún no hay fotos. Los locales con fotos reciben más reservas.</p>'}
      ${b.fotos.length < MAX_FOTOS ? `<label style="margin-top:10px">Agregar fotos (se achican automáticamente)<input type="file" accept="image/*" multiple onchange="subirFotos(this)"></label>` : ''}
      <p class="muted small" id="fotoEstado" style="margin-bottom:0"></p></div>
    <button class="btn full" style="padding:12px" onclick="guardarLocal(${nuevo})">${nuevo ? 'Enviar a revisión' : 'Guardar cambios'}</button>`;
}
function sincronizar(){
  const b = st.borrador, v = id => $('#' + id).value.trim();
  Object.assign(b, {dueno:v('fDueno'), telefono:v('fTel'), email:v('fEmail'), nombre:v('fNombre'), distrito:v('fDistrito'), direccion:v('fDir'),
    referencia:v('fRef'), descripcion:v('fDesc'), serviciosOtros:v('fOtros'), politica:v('fPol'),
    apertura:+v('fAp'), cierre:+v('fCi'), inicioNoche:+v('fNo'), adelanto:{tipo:v('fAt'), valor:Math.max(0, +v('fAv') || 0)},
    servicios:[...document.querySelectorAll('.fServ:checked')].map(x => x.value)});
  document.querySelectorAll('[data-cancha]').forEach(row => {
    const c = b.canchas[+row.dataset.cancha];
    c.nombre = row.querySelector('.cNom').value.trim(); c.tipo = row.querySelector('.cTipo').value.trim();
    c.precio = Math.max(0, +row.querySelector('.cPre').value || 0); c.recargo = Math.max(0, +row.querySelector('.cRec').value || 0);
  });
}
function agregarCanchaEd(){ sincronizar(); const b = st.borrador; b.canchas.push({id:'C' + uid(), nombre:'Cancha ' + (b.canchas.length + 1), tipo:'', precio:50, recargo:15}); render(true); }
function quitarCanchaEd(i){
  sincronizar(); const b = st.borrador;
  if (b.canchas.length === 1) { toast('El local necesita al menos una cancha'); return; }
  b.canchas.splice(i, 1); render(true);
}
function quitarFotoEd(i){ sincronizar(); st.borrador.fotos.splice(i, 1); render(true); }
function portadaEd(i){ sincronizar(); const f = st.borrador.fotos; f.unshift(f.splice(i, 1)[0]); render(true); }
function achicar(file){
  return new Promise((ok, mal) => {
    const url = URL.createObjectURL(file), img = new Image();
    img.onload = () => {
      const k = Math.min(1, 1000 / Math.max(img.width, img.height));
      const cv = document.createElement('canvas'); cv.width = Math.round(img.width * k); cv.height = Math.round(img.height * k);
      cv.getContext('2d').drawImage(img, 0, 0, cv.width, cv.height);
      URL.revokeObjectURL(url); ok(cv.toDataURL('image/jpeg', 0.72));
    };
    img.onerror = () => { URL.revokeObjectURL(url); mal(); };
    img.src = url;
  });
}
async function subirFotos(input){
  sincronizar();
  const b = st.borrador, archivos = [...input.files];
  $('#fotoEstado').textContent = 'Procesando fotos…';
  let malas = 0;
  for (const f of archivos) {
    if (b.fotos.length >= MAX_FOTOS) { toast(`Máximo ${MAX_FOTOS} fotos por local`); break; }
    try { b.fotos.push(await achicar(f)); } catch { malas++; }
  }
  render(true);
  if (malas) toast(`${malas} archivo(s) no son imágenes válidas`);
}
function guardarLocal(nuevo){
  sincronizar();
  const b = st.borrador, err = [];
  if (b.dueno.length < 2) err.push('tu nombre');
  if (!/^[\d\s+]{9,15}$/.test(b.telefono)) err.push('un celular válido');
  if (b.nombre.length < 3) err.push('el nombre del local');
  if (b.distrito.length < 3) err.push('el distrito');
  if (b.lat == null) err.push('la ubicación en el mapa');
  if (b.cierre <= b.apertura) err.push('una hora de cierre posterior a la apertura');
  if (b.adelanto.tipo === 'pct' && b.adelanto.valor > 100) err.push('un adelanto de 100% o menos');
  if (b.canchas.some(c => !c.nombre || c.precio <= 0)) err.push('nombre y precio de cada cancha');
  if (err.length) { toast('Falta: ' + err.join(', ')); return; }
  const anterior = nuevo ? null : JSON.parse(JSON.stringify(local(b.id)));
  if (nuevo) db.locales.push(JSON.parse(JSON.stringify(b)));
  else {
    if (b.estado === 'rechazado') { b.estado = 'pendiente'; b.motivo = ''; }
    Object.assign(local(b.id), JSON.parse(JSON.stringify(b)));
  }
  if (!guardar()) {  // sin espacio: deshacer
    if (nuevo) db.locales.pop(); else Object.assign(local(b.id), anterior);
    return;
  }
  st.dueno.local = b.id; st.dueno.sub = 'editar'; st.borrador = null;
  render();
  toast(nuevo ? 'Local enviado a revisión' : 'Cambios guardados');
}

/* =====================================================
   ADMINISTRADOR
   ===================================================== */
function vistaAdmin(){
  const A = st.admin;
  const pendLoc = db.locales.filter(l => l.estado === 'pendiente').length;
  const pendPag = db.reservas.filter(r => r.estado === 'pendiente').length;
  const tab = (k, t) => `<button class="${A.sub === k ? 'on' : ''}" onclick="st.admin.sub='${k}';render()">${t}</button>`;
  const tabs = `<div class="tabs">${tab('resumen', `Resumen${pendLoc + pendPag ? ` (${pendLoc + pendPag})` : ''}`)}${tab('locales', 'Locales y servicios')}${tab('liquidacion', 'Liquidación')}${tab('ajustes', 'Ajustes')}</div>`;
  if (A.sub === 'ficha' && local(A.ficha)) return tabs + fichaAdmin(local(A.ficha));
  if (A.sub === 'locales') return tabs + localesAdmin();
  if (A.sub === 'liquidacion') return tabs + liquidacionAdmin();
  if (A.sub === 'ajustes') return tabs + ajustesAdmin();
  A.sub = 'resumen';
  return tabs + resumenAdmin();
}
const verFicha = id => { st.admin.sub = 'ficha'; st.admin.ficha = id; render(); };
function liquidacion(desde, hasta){
  const tasa = tasaComision();
  return db.locales.filter(l => l.estado === 'aprobado').map(l => {
    const rs = db.reservas.filter(r => r.localId === l.id && r.estado === 'confirmada' && r.origen === 'plataforma' && r.fecha >= desde && r.fecha <= hasta);
    const total = rs.reduce((s, r) => s + r.precio, 0), ade = rs.reduce((s, r) => s + r.adelanto, 0);
    const com = Math.round(total * tasa * 100) / 100;
    return {l, n:rs.length, total, ade, com, liq:ade - com};
  }).sort((a, b) => b.total - a.total);
}
function resumenAdmin(){
  const pend = db.locales.filter(l => l.estado === 'pendiente');
  const pagos = db.reservas.filter(r => r.estado === 'pendiente');
  const mes = liquidacion(hoyISO().slice(0, 8) + '01', '9999-12-31');
  const card = (t, v) => `<div class="card" style="margin:0"><div class="muted small">${t}</div><div class="stat">${v}</div></div>`;
  return `<h2>Resumen</h2>
    <div class="grid" style="grid-template-columns:repeat(auto-fit,minmax(160px,1fr));margin-bottom:14px">
      ${card('Locales publicados', db.locales.filter(l => l.estado === 'aprobado').length)}${card('Locales por aprobar', pend.length)}
      ${card('Pagos por verificar', pagos.length)}${card('Reservas confirmadas del mes', mes.reduce((s, x) => s + x.n, 0))}
      ${card('Comisión del mes', soles(mes.reduce((s, x) => s + x.com, 0)))}</div>
    <div class="card"><h3>Pagos Yape/Plin por verificar <span class="badge b-pend">${pagos.length}</span></h3>
      <p class="muted small" style="margin-top:-4px">Revisa en tu app que llegó el monto con ese número de operación antes de confirmar.</p>
      ${pagos.map(r => { const l = local(r.localId); return `<div class="list-item">
        <div><b>${esc(r.cliente)}</b> · ${esc(r.telefono)}
          <div class="small">${esc(l ? l.nombre : '')} · ${esc(l ? cancha(l, r.canchaId).nombre : '')} · ${fechaTxt(r.fecha)} ${horaTxt(r.hora)}</div>
          <div class="small">Adelanto <b>${soles(r.adelanto)}</b> · operación <b>${esc(r.operacion)}</b></div></div>
        <div class="row"><button class="btn sm" onclick="decidirPago('${r.id}','confirmada')">Confirmar pago</button><button class="btn sm red" onclick="decidirPago('${r.id}','rechazada')">Rechazar</button></div>
      </div>`; }).join('') || '<p class="muted" style="margin:0">No hay pagos pendientes.</p>'}</div>
    <div class="card"><h3>Locales por aprobar <span class="badge b-pend">${pend.length}</span></h3>
      ${pend.map(l => `<div class="list-item">
        <div style="flex:1 1 300px"><b>${esc(l.nombre)}</b> · ${esc(l.distrito)}
          <div class="muted small">${esc(l.dueno)} · ${esc(l.telefono)} · ${l.canchas.length} cancha(s) · ${l.fotos.length} foto(s) · ${l.lat != null ? 'con ubicación' : 'sin ubicación'}</div>
          <div style="margin-top:6px">${chips(l)}</div></div>
        <div class="row"><button class="btn sm sec" onclick="verFicha('${l.id}')">Revisar todo</button><button class="btn sm" onclick="decidirLocal('${l.id}','aprobado')">Aprobar</button></div>
      </div>`).join('') || '<p class="muted" style="margin:0">No hay locales esperando aprobación.</p>'}</div>`;
}
async function decidirPago(id, estado){
  // Confirmar = cambiar el estado; rechazar = borrar el documento para que la hora quede libre.
  // OJO: las reglas actuales de Firestore no permiten cambiar ni borrar reservas ajenas (falta un rol de administrador).
  const r = db.reservas.find(x => x.id === id);
  if (!r || !listo()) return;
  try {
    if (estado === 'confirmada') await refReserva(id).update({estado});
    else await refReserva(id).delete();
  } catch (e) { return errorReserva(e); }
  toast(estado === 'confirmada' ? `Pago de ${r.cliente} confirmado` : 'Reserva rechazada; la hora quedó libre');
}
function decidirLocal(id, estado, motivo = ''){
  const l = local(id), prev = {estado:l.estado, motivo:l.motivo};
  l.estado = estado; l.motivo = estado === 'rechazado' ? motivo : '';
  guardar(); render(true);
  toast(`${l.nombre}: ${{aprobado:'publicado', rechazado:'rechazado', pendiente:'despublicado'}[estado]}`, () => { Object.assign(l, prev); guardar(); render(true); });
}
function localesAdmin(){
  const F = st.admin.filtro;
  const f = (k, t) => `<button class="${F === k ? 'on' : ''}" onclick="st.admin.filtro='${k}';render(true)">${t}</button>`;
  const lista = db.locales.filter(l => !F || l.estado === F);
  return `<h2>Locales y servicios</h2>
    <div class="tabs">${f('', 'Todos')}${f('pendiente', 'En revisión')}${f('aprobado', 'Publicados')}${f('rechazado', 'Rechazados')}</div>
    <div class="card table-wrap"><table class="datos">
      <thead><tr><th>Local</th><th>Dueño</th><th>Canchas</th><th>Servicios que ofrece</th><th>Estado</th><th></th></tr></thead>
      <tbody>${lista.map(l => `<tr>
        <td><b>${esc(l.nombre)}</b><div class="muted small">${esc(l.distrito)}</div></td>
        <td>${esc(l.dueno)}<div class="muted small">${esc(l.telefono)}</div></td>
        <td>${l.canchas.length}</td>
        <td style="min-width:220px;max-width:340px">${chips(l, '—')}</td>
        <td>${estadoLocal(l.estado)}</td>
        <td><button class="btn sm sec" onclick="verFicha('${l.id}')">Ver ficha</button></td></tr>`).join('') || '<tr><td colspan="6" class="muted">No hay locales.</td></tr>'}</tbody>
    </table></div>`;
}
function fichaAdmin(l){
  const n = db.reservas.filter(r => r.localId === l.id && r.estado === 'confirmada').length;
  return `<button class="link" onclick="st.admin.sub='locales';render()">← Todos los locales</button>
    <div class="row between" style="margin:8px 0 12px"><div><h2 style="margin:0">${esc(l.nombre)}</h2>
      <div class="muted small">${esc(l.distrito)} · registrado ${esc(l.creado || '')} · ${n} reservas confirmadas</div></div>${estadoLocal(l.estado)}</div>
    ${l.estado === 'rechazado' && l.motivo ? `<div class="alerta">Motivo del rechazo: ${esc(l.motivo)}</div>` : ''}
    <div class="card"><h3>Decisión</h3><div class="row">
      ${l.estado !== 'aprobado' ? `<button class="btn" onclick="decidirLocal('${l.id}','aprobado')">Aprobar y publicar</button>` : `<button class="btn sec" onclick="decidirLocal('${l.id}','pendiente')">Despublicar</button>`}
      ${l.estado !== 'rechazado' ? `<input id="motivo" maxlength="200" placeholder="Motivo del rechazo (lo verá el dueño)" style="flex:1 1 240px"><button class="btn red" onclick="decidirLocal('${l.id}','rechazado',$('#motivo').value.trim())">Rechazar</button>` : ''}
    </div></div>
    <div class="grid2">
      <div class="card"><h3>Dueño</h3><div class="summary">
        <div><span>Nombre</span><span>${esc(l.dueno)}</span></div><div><span>Celular</span><span>${esc(l.telefono)}</span></div>
        <div><span>Correo</span><span>${esc(l.email || '—')}</span></div></div></div>
      <div class="card"><h3>Ubicación</h3><p class="small" style="margin-top:0">${esc(l.direccion || 'Sin dirección')}${l.referencia ? ' · ' + esc(l.referencia) : ''}</p>${mapaPunto(l)}</div>
    </div>
    <div class="card" style="margin-top:14px"><h3>Servicios que ofrece</h3>${chips(l)}${l.descripcion ? `<p style="margin-bottom:0">${esc(l.descripcion)}</p>` : ''}</div>
    <div class="grid2">
      <div class="card table-wrap"><h3>Canchas y precios</h3><table class="datos">
        <thead><tr><th>Cancha</th><th>Tipo</th><th>Día</th><th>Noche</th></tr></thead>
        <tbody>${l.canchas.map(c => `<tr><td>${esc(c.nombre)}</td><td>${esc(c.tipo || '—')}</td><td>${soles(c.precio)}</td><td>${soles(c.precio + c.recargo)}</td></tr>`).join('')}</tbody></table></div>
      <div class="card"><h3>Horario y política</h3><div class="summary">
        <div><span>Atención</span><span>${horaTxt(l.apertura)} – ${horaTxt(l.cierre)}</span></div>
        <div><span>Precio de noche desde</span><span>${horaTxt(l.inicioNoche)}</span></div>
        <div><span>Adelanto</span><span>${adelantoTxt(l)}</span></div></div>
        <p class="small" style="margin-bottom:0">${esc(l.politica || 'Sin política registrada.')}</p></div>
    </div>
    <div class="card" style="margin-top:14px"><h3>Fotos (${l.fotos.length})</h3>${l.fotos.length ? galeria(l) : '<p class="muted" style="margin:0">El dueño aún no subió fotos.</p>'}</div>`;
}
function liquidacionAdmin(){
  const A = st.admin, filas = liquidacion(A.desde, A.hasta);
  const T = filas.reduce((a, x) => ({n:a.n + x.n, total:a.total + x.total, ade:a.ade + x.ade, com:a.com + x.com, liq:a.liq + x.liq}), {n:0, total:0, ade:0, com:0, liq:0});
  return `<h2>Liquidación a dueños</h2>
    <div class="card row">
      <label>Desde<input type="date" value="${A.desde}" onchange="st.admin.desde=this.value;render(true)"></label>
      <label>Hasta<input type="date" value="${A.hasta}" onchange="st.admin.hasta=this.value;render(true)"></label>
      <div class="muted small" style="padding-bottom:8px;flex:1 1 260px">${db.ajustes.piloto ? 'Piloto activo: 0% de comisión.' : `Comisión ${db.ajustes.comision}% sobre el valor total de cada reserva, la asume el dueño.`}
        Recibes el adelanto por Yape/Plin y pagas al dueño el adelanto menos tu comisión.</div></div>
    <div class="card table-wrap"><table class="datos">
      <thead><tr><th>Local</th><th>Dueño</th><th>Reservas</th><th>Valor total</th><th>Adelantos cobrados</th><th>Tu comisión</th><th>A pagar al dueño</th></tr></thead>
      <tbody>${filas.map(x => `<tr><td>${esc(x.l.nombre)}</td><td>${esc(x.l.dueno)}<div class="muted small">${esc(x.l.telefono)}</div></td><td>${x.n}</td><td>${soles(x.total)}</td><td>${soles(x.ade)}</td><td>${soles(x.com)}</td><td><b>${soles(x.liq)}</b></td></tr>`).join('')}
        <tr class="total"><td>Total</td><td></td><td>${T.n}</td><td>${soles(T.total)}</td><td>${soles(T.ade)}</td><td>${soles(T.com)}</td><td>${soles(T.liq)}</td></tr></tbody>
    </table></div>`;
}
function ajustesAdmin(){
  const a = db.ajustes;
  return `<h2>Ajustes</h2>
    <div class="card" style="max-width:520px;display:flex;flex-direction:column;gap:12px">
      <label>Número de Yape/Plin donde pagan los clientes<input id="aYape" maxlength="20" value="${esc(a.yape)}"></label>
      <label>Titular que aparece en Yape/Plin<input id="aTit" maxlength="60" value="${esc(a.titular)}"></label>
      <label>Comisión (% sobre el valor total de la reserva)<input id="aCom" type="number" min="0" max="30" step="0.1" value="${a.comision}"></label>
      <label class="check"><input type="checkbox" id="aPil" ${a.piloto ? 'checked' : ''}> Piloto: no cobrar comisión por ahora</label>
      <button class="btn" onclick="guardarAjustes()">Guardar</button>
    </div>`;
}
function guardarAjustes(){
  db.ajustes = {yape:$('#aYape').value.trim(), titular:$('#aTit').value.trim() || 'GrassYa',
    comision:Math.min(30, Math.max(0, +$('#aCom').value || 0)), piloto:$('#aPil').checked};
  guardar(); toast('Ajustes guardados');
}

render();
conectarReservas();
