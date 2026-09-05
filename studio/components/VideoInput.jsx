import React from 'react'

const PROJECT_ID = '8a36ilal'
const DATASET = 'production'

function getAssetUrl(value) {
  const ref = value?.asset?._ref
  if (!ref || !ref.startsWith('file-')) return ''

  const assetRef = ref.slice('file-'.length)
  const separator = assetRef.lastIndexOf('-')
  if (separator < 1 || separator === assetRef.length - 1) return ''

  const assetId = assetRef.slice(0, separator)
  const extension = assetRef.slice(separator + 1)
  return `https://cdn.sanity.io/files/${PROJECT_ID}/${DATASET}/${assetId}.${extension}`
}

export default function VideoInput(props) {
  const videoUrl = getAssetUrl(props.value)

  return (
    <div>
      {props.renderDefault(props)}
      {videoUrl && (
        <div style={{ marginTop: 12 }}>
          <video
            src={videoUrl}
            controls
            playsInline
            preload="metadata"
            style={{ display: 'block', width: '100%', maxWidth: 640, maxHeight: 360, borderRadius: 8, background: '#111' }}
          />
        </div>
      )}
    </div>
  )
}