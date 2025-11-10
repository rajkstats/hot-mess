"use client"

interface SliderControlProps {
  label: string
  value: number
  onChange: (value: number) => void
  icon: string
}

export function SliderControl({ label, value, onChange, icon }: SliderControlProps) {
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <label className="text-sm font-semibold text-murrey flex items-center gap-2">
          <span className="text-2xl">{icon}</span>
          {label}
        </label>
        <span className="text-lg font-bold text-old-rose">{value}</span>
      </div>
      <input
        type="range"
        min="0"
        max="100"
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full h-3 bg-misty-rose rounded-full appearance-none cursor-pointer accent-murrey hover:accent-old-rose transition-all"
        style={{
          background: `linear-gradient(to right, #ffd9da 0%, #cc7178 ${value}%, #ffd9da ${value}%, #ffd9da 100%)`,
        }}
      />
    </div>
  )
}
