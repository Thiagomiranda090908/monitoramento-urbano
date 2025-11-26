// map-section.tsx
"use client"

import React, { useRef, useState, useEffect } from "react"
import {
  MapContainer,
  TileLayer,
  Circle,
  Marker,
  Popup,
  Tooltip,
  useMap,
  useMapEvents,
} from "react-leaflet"
import L, { LatLngExpression } from "leaflet"
import "leaflet/dist/leaflet.css"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"

// Invisible but clickable / draggable area (larger hitbox)
const InvisibleIcon = new L.DivIcon({
  html: "<div style='width:28px;height:28px;background:transparent;'></div>",
  className: "cursor-move",
  iconSize: [28, 28],
  iconAnchor: [14, 14],
})

type Issue = { name: string; description: string; severity: number } // severity 0..4
type Region = {
  id: number
  name: string
  center: { lat: number; lng: number }
  radius?: number
  issues: Issue[]
}

const initialData: Region[] = [
  {
    id: 1,
    name: "Região 1",
    center: { lat: -22.7245, lng: -47.6485 },
    radius: 350,
    issues: [
      { name: "Av. Beira Rio", description: "Falta de rampa de acesso ao passeio público", severity: 3 },
      { name: "Rua do Porto", description: "Ausência de sinalização tátil para deficientes visuais", severity: 4 },
    ],
  },
  {
    id: 2,
    name: "Região 2",
    center: { lat: -22.7175, lng: -47.6375 },
    radius: 300,
    issues: [
      { name: "Rua Moraes Barros", description: "Postes mal posicionados", severity: 2 },
    ],
  },
]

// severity -> colors/label
const severityColor = (s: number) => {
  switch (s) {
    case 0:
      return { fill: "rgba(190,242,100,0.35)", stroke: "#BEF264", label: "Baixa" } // verde lima
    case 1:
      return { fill: "rgba(250,204,21,0.35)", stroke: "#FACC15", label: "Moderada" } // amarelo
    case 2:
      return { fill: "rgba(251,146,60,0.35)", stroke: "#FB923C", label: "Média" } // laranja
    case 3:
      return { fill: "rgba(239,68,68,0.35)", stroke: "#EF4444", label: "Alta" } // vermelho
    case 4:
      return { fill: "rgba(168,85,247,0.35)", stroke: "#A855F7", label: "Máxima" } // roxo
    default:
      return { fill: "rgba(156,163,175,0.35)", stroke: "#9CA3AF", label: "Sem dados" }
  }
}

// Small hook component to capture map instance and expose via ref
function MapRefSetter({ mapRef }: { mapRef: React.MutableRefObject<L.Map | null> }) {
  const map = useMap()
  useEffect(() => {
    mapRef.current = map
    return () => {
      mapRef.current = null
    }
  }, [map])
  return null
}

// Simple click setter to capture last clicked coordinates (optional)
function ClickSetter({ onClick }: { onClick: (latlng: L.LatLng) => void }) {
  useMapEvents({
    click(e) {
      onClick(e.latlng)
    },
  })
  return null
}

export default function MapSection() {
  const [regions, setRegions] = useState<Region[]>(initialData)
  const [selectedRegionId, setSelectedRegionId] = useState<number | null>(null)
  const [editingIssue, setEditingIssue] = useState<{ regionId: number; issueIndex: number } | null>(null)
  const [showRegionModal, setShowRegionModal] = useState(false)
  const [editingRegionId, setEditingRegionId] = useState<number | null>(null)

  // map reference
  const mapRef = useRef<L.Map | null>(null)

  // forms for issue editing/creating
  const [issueFormName, setIssueFormName] = useState("")
  const [issueFormDesc, setIssueFormDesc] = useState("")
  const [issueFormSeverity, setIssueFormSeverity] = useState<number>(2)

  // forms for region editing
  const [regionFormName, setRegionFormName] = useState("")
  const [regionFormLat, setRegionFormLat] = useState<number | "">("")
  const [regionFormLng, setRegionFormLng] = useState<number | "">("")
  const [regionFormRadius, setRegionFormRadius] = useState<number>(300)

  // ---------- Actions ----------
  const computeAvgSeverity = (r: Region) =>
    r.issues.length ? Math.round(r.issues.reduce((s, it) => s + it.severity, 0) / r.issues.length) : 0

  const onDragRegion = (id: number, latlng: L.LatLng) => {
    setRegions(prev => prev.map(r => (r.id === id ? { ...r, center: { lat: latlng.lat, lng: latlng.lng } } : r)))
  }

  // DELETE REGION
  const deleteRegion = (id: number) => {
    if (!confirm("Tem certeza que deseja excluir esta região?")) return
    setRegions(prev => prev.filter(r => r.id !== id))
    if (selectedRegionId === id) setSelectedRegionId(null)
    // fechar modal se estiver aberta para essa região
    if (editingRegionId === id) {
      setShowRegionModal(false)
      setEditingRegionId(null)
    }
  }

  const openIssueEditor = (regionId: number, issueIndex: number) => {
    const region = regions.find(r => r.id === regionId)
    if (!region) return
    const issue = region.issues[issueIndex]
    // if index equals length => new item
    if (issueIndex >= region.issues.length) {
      setEditingIssue({ regionId, issueIndex })
      setIssueFormName("")
      setIssueFormDesc("")
      setIssueFormSeverity(2)
      return
    }
    setEditingIssue({ regionId, issueIndex })
    setIssueFormName(issue?.name ?? "")
    setIssueFormDesc(issue?.description ?? "")
    setIssueFormSeverity(issue?.severity ?? 2)
  }

  const saveIssueEdits = () => {
    if (!editingIssue) return
    const { regionId, issueIndex } = editingIssue
    setRegions(prev =>
      prev.map(r => {
        if (r.id !== regionId) return r
        // new
        if (issueIndex >= r.issues.length) {
          return { ...r, issues: [...r.issues, { name: issueFormName || "Sem nome", description: issueFormDesc || "", severity: issueFormSeverity }] }
        }
        // update
        return {
          ...r,
          issues: r.issues.map((it, i) => (i === issueIndex ? { ...it, name: issueFormName, description: issueFormDesc, severity: issueFormSeverity } : it)),
        }
      })
    )
    setEditingIssue(null)
  }

  const deleteIssue = (regionId: number, idx: number) => {
    setRegions(prev => prev.map(r => (r.id === regionId ? { ...r, issues: r.issues.filter((_, i) => i !== idx) } : r)))
  }

  const openRegionEditor = (regionId: number) => {
    const r = regions.find(x => x.id === regionId)
    if (!r) return
    setEditingRegionId(regionId)
    setRegionFormName(r.name)
    setRegionFormLat(Number(r.center.lat.toFixed(6)))
    setRegionFormLng(Number(r.center.lng.toFixed(6)))
    setRegionFormRadius(r.radius ?? 300)
    setShowRegionModal(true)
  }

  const saveRegionEdits = () => {
    if (!editingRegionId) return
    setRegions(prev => prev.map(r => (r.id === editingRegionId ? { ...r, name: regionFormName, center: { lat: Number(regionFormLat), lng: Number(regionFormLng) }, radius: Number(regionFormRadius) } : r)))
    setShowRegionModal(false)
    setEditingRegionId(null)
  }

  const addRegionAtCenter = () => {
    const center = mapRef.current?.getCenter()
    if (!center) return
    const nextId = Math.max(0, ...regions.map(r => r.id)) + 1
    const newRegion: Region = {
      id: nextId,
      name: `Região ${nextId}`,
      center: { lat: center.lat, lng: center.lng },
      radius: 300,
      issues: [],
    }
    setRegions(prev => [...prev, newRegion])
    setSelectedRegionId(newRegion.id)
    // fly to new
    mapRef.current?.flyTo([newRegion.center.lat, newRegion.center.lng], 15, { duration: 0.6 })
  }

  const addIssueToSelected = (name: string, description: string, severity = 2) => {
    if (!selectedRegionId) return
    setRegions(prev => prev.map(r => (r.id === selectedRegionId ? { ...r, issues: [...r.issues, { name, description, severity }] } : r)))
  }

  // ---------- Map helpers ----------
  const mapInitialCenter: LatLngExpression = [-22.7245, -47.6485]

  // ---------- Render ----------
  return (
    <section id="mapa" className="py-6">
      <div className="container mx-auto">
        <div className="flex gap-4 mb-4 items-center">
          <h2 className="text-xl font-bold">Editor de Regiões — Leaflet</h2>
          <div className="flex gap-2">
            <Button onClick={addRegionAtCenter}>+ Adicionar região (centro do mapa)</Button>
            <Button
              variant="outline"
              onClick={() => {
                const c = mapRef.current?.getCenter()
                if (!c) return alert("Mapa não inicializado")
                alert(`Centro do mapa: ${c.lat.toFixed(6)}, ${c.lng.toFixed(6)}`)
              }}
            >
              Mostrar centro
            </Button>
          </div>
        </div>

        <Card className="h-[650px] overflow-hidden">
          <div className="flex h-full">
            {/* MAP */}
            <div className="flex-1">
              <MapContainer center={mapInitialCenter} zoom={14} style={{ height: "100%", width: "100%" }}>
                <MapRefSetter mapRef={mapRef} />
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                <ClickSetter onClick={() => {/* optional: handle map clicks */}} />

                {regions.map(r => {
                  const avgSeverity = computeAvgSeverity(r)
                  const color = severityColor(avgSeverity)
                  return (
                    <React.Fragment key={r.id}>
                      {/* visual circle */}
                      <Circle
                        center={[r.center.lat, r.center.lng]}
                        radius={r.radius ?? 300}
                        pathOptions={{
                          color: color.stroke,
                          fillColor: color.fill,
                          fillOpacity: 0.6,
                          weight: selectedRegionId === r.id ? 3 : 2,
                        }}
                        // make circle non-interactive so marker above can receive drag/clicks
                        className="pointer-events-none"
                      >
                        <Tooltip direction="top" offset={[0, -10]} opacity={0.95}>
                          <div className="text-sm">
                            <strong>{r.name}</strong>
                            <div>{r.issues.length} locais — prioridade: {color.label}</div>
                          </div>
                        </Tooltip>
                      </Circle>

                      {/* draggable handle (invisible marker) - keeps types explicit */}
                      <Marker
                        position={[r.center.lat, r.center.lng]}
                        icon={InvisibleIcon}
                        draggable={true}
                        zIndexOffset={9999}
                        eventHandlers={{
                          drag: (e: L.LeafletEvent) => {
                            // cast to marker to get latlng
                            const m = (e.target as L.Marker)
                            const latlng = m.getLatLng()
                            onDragRegion(r.id, latlng)
                          },
                          dragend: (e: L.DragEndEvent) => {
                            const m = (e.target as L.Marker)
                            const latlng = m.getLatLng()
                            onDragRegion(r.id, latlng)
                          },
                          click: () => setSelectedRegionId(r.id),
                        }}
                      >
                        <Popup>
                          <div className="max-w-xs">
                            <strong>{r.name}</strong>
                            <div className="text-sm text-muted-foreground">
                              {r.issues.length} locais — prioridade: {severityColor(avgSeverity).label}
                            </div>
                            <div className="flex gap-2 mt-2">
                              <Button size="sm" onClick={() => openRegionEditor(r.id)}>Editar região</Button>
                              <Button size="sm" variant="destructive" onClick={() => deleteRegion(r.id)}>Excluir região</Button>
                              <Button size="sm" variant="ghost" onClick={() => setSelectedRegionId(r.id)}>Abrir painel</Button>
                            </div>
                          </div>
                        </Popup>
                      </Marker>
                    </React.Fragment>
                  )
                })}
              </MapContainer>
            </div>

            {/* SIDEBAR */}
            <aside className="w-96 border-l p-4 overflow-y-auto bg-card">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold">Regiões</h3>
                <div>{regions.length} total</div>
              </div>

              <div className="space-y-3">
                {regions.map(r => {
                  const avgSeverity = computeAvgSeverity(r)
                  const color = severityColor(avgSeverity)
                  return (
                    <div key={r.id} className={`p-3 rounded border ${selectedRegionId === r.id ? "border-primary" : "border-border"}`}>
                      <div className="flex justify-between items-start">
                        <div>
                          <div className="font-semibold">{r.name}</div>
                          <div className="text-xs text-muted-foreground">
                            {r.issues.length} locais • prioridade: {color.label}
                          </div>
                          <div className="text-xs text-muted-foreground">
                            {r.center.lat.toFixed(6)}, {r.center.lng.toFixed(6)}
                          </div>
                        </div>

                        <div className="flex flex-col items-end gap-2">
                          <div className="w-3 h-3 rounded-full" style={{ backgroundColor: color.stroke }} />
                          <div className="flex gap-1">
                            <Button size="sm" variant="ghost" onClick={() => {
                              setSelectedRegionId(r.id)
                              if (mapRef.current) mapRef.current.flyTo([r.center.lat, r.center.lng], 15, { duration: 0.6 })
                            }}>
                              Ver
                            </Button>
                            <Button size="sm" onClick={() => openRegionEditor(r.id)}>Editar</Button>
                            <Button size="sm" variant="destructive" onClick={() => deleteRegion(r.id)}>Excluir</Button>
                          </div>
                        </div>
                      </div>

                      <div className="mt-3 space-y-2">
                        {r.issues.map((it, i) => (
                          <div key={i} className="flex items-start justify-between gap-2">
                            <div>
                              <div className="text-sm font-medium">{it.name}</div>
                              <div className="text-xs text-muted-foreground">{it.description}</div>
                              <div className="text-xs mt-1">Gravidade: {severityColor(it.severity).label}</div>
                            </div>

                            <div className="flex flex-col gap-1">
                              <Button size="sm" variant="ghost" onClick={() => openIssueEditor(r.id, i)}>Editar</Button>
                              <Button size="sm" variant="destructive" onClick={() => deleteIssue(r.id, i)}>Excluir</Button>
                            </div>
                          </div>
                        ))}
                      </div>

                      <div className="mt-3 flex gap-2">
                        <Button size="sm" onClick={() => openIssueEditor(r.id, r.issues.length)}>+ Local</Button>
                        <Button size="sm" variant="outline" onClick={() => { setSelectedRegionId(r.id); addIssueToSelected("Novo problema", "Descrição...", 2) }}>
                          Quick add
                        </Button>
                      </div>
                    </div>
                  )
                })}
              </div>
            </aside>
          </div>
        </Card>
      </div>

      {/* ISSUE MODAL */}
      {editingIssue && (
        <div className="fixed inset-0 z-[99999] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-white text-black rounded-xl w-full max-w-lg p-6 shadow-2xl border border-gray-200">
            <div className="flex justify-between items-center mb-4">
              <h4 className="font-bold text-lg">{editingIssue.issueIndex >= (regions.find(r => r.id === editingIssue.regionId)?.issues.length ?? 0) ? "Adicionar local" : "Editar local"}</h4>
              <Button variant="ghost" size="icon" onClick={() => setEditingIssue(null)}>×</Button>
            </div>

            <div className="space-y-3">
              <Label className="text-xs font-semibold">Nome</Label>
              <Input value={issueFormName} onChange={(e) => setIssueFormName(e.target.value)} />

              <Label className="text-xs font-semibold">Descrição</Label>
              <Textarea value={issueFormDesc} onChange={(e) => setIssueFormDesc(e.target.value)} />

              <Label className="text-xs font-semibold">Gravidade (0 a 4)</Label>
              <select value={issueFormSeverity} onChange={(e) => setIssueFormSeverity(Number(e.target.value))} className="w-full p-2 rounded border">
                <option value={0}>0 — Baixa (verde lima)</option>
                <option value={1}>1 — Moderada (amarelo)</option>
                <option value={2}>2 — Média (laranja)</option>
                <option value={3}>3 — Alta (vermelho)</option>
                <option value={4}>4 — Máxima (roxo)</option>
              </select>

              <div className="flex gap-2 justify-end mt-4">
                <Button variant="outline" onClick={() => setEditingIssue(null)}>Cancelar</Button>
                <Button onClick={saveIssueEdits}>Salvar</Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* REGION EDITOR MODAL */}
      {showRegionModal && editingRegionId != null && (
        <div className="fixed inset-0 z-[99999] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-white text-black rounded-xl w-full max-w-lg p-6 shadow-2xl border border-gray-200">
            <div className="flex justify-between items-center mb-4">
              <h4 className="font-bold text-lg">Editar Região</h4>
              <Button variant="ghost" size="icon" onClick={() => setShowRegionModal(false)}>×</Button>
            </div>

            <div className="space-y-3">
              <Label className="text-xs font-semibold">Nome</Label>
              <Input value={regionFormName} onChange={(e) => setRegionFormName(e.target.value)} />

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <Label className="text-xs font-semibold">Lat</Label>
                  <Input value={regionFormLat} onChange={(e) => setRegionFormLat(e.target.value === "" ? "" : Number(e.target.value))} />
                </div>
                <div>
                  <Label className="text-xs font-semibold">Lng</Label>
                  <Input value={regionFormLng} onChange={(e) => setRegionFormLng(e.target.value === "" ? "" : Number(e.target.value))} />
                </div>
              </div>

              <Label className="text-xs font-semibold">Raio (metros)</Label>
              <Input type="number" value={regionFormRadius} onChange={(e) => setRegionFormRadius(Number(e.target.value))} />

              <div className="flex items-center justify-between gap-2 mt-4">
                <div className="flex gap-2">
                  <Button variant="destructive" onClick={() => deleteRegion(editingRegionId!)}>Excluir região</Button>
                  <Button variant="outline" onClick={() => {
                    // reset fields to current region values
                    const r = regions.find(rr => rr.id === editingRegionId)
                    if (r) {
                      setRegionFormName(r.name)
                      setRegionFormLat(Number(r.center.lat.toFixed(6)))
                      setRegionFormLng(Number(r.center.lng.toFixed(6)))
                      setRegionFormRadius(r.radius ?? 300)
                    }
                  }}>Reverter</Button>
                </div>

                <div className="flex gap-2">
                  <Button variant="outline" onClick={() => setShowRegionModal(false)}>Cancelar</Button>
                  <Button onClick={saveRegionEdits}>Salvar</Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
